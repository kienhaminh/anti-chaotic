# Serving & Optimization

Production deployment patterns for LLM applications.

## 1. Deployment Architectures

### Synchronous API

```python
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel

app = FastAPI()

class QueryRequest(BaseModel):
    query: str
    context: str = None
    max_tokens: int = 500

@app.post("/api/v1/complete")
async def complete(request: QueryRequest):
    try:
        response = await llm.complete(
            request.query,
            max_tokens=request.max_tokens,
            timeout=30
        )
        return {"response": response}
    except TimeoutError:
        raise HTTPException(status_code=504, detail="LLM timeout")
```

### Asynchronous Queue

```python
from celery import Celery
from redis import Redis

app = Celery('llm_tasks', broker='redis://localhost:6379')

@app.task(bind=True, max_retries=3)
def async_complete(self, query: str, webhook_url: str):
    try:
        response = llm.complete(query)
        
        # Send result via webhook
        requests.post(webhook_url, json={
            "status": "complete",
            "response": response
        })
        
    except Exception as exc:
        self.retry(exc=exc, countdown=60)

# Usage
task = async_complete.delay(
    query="Summarize this document...",
    webhook_url="https://example.com/webhook"
)

return {"task_id": task.id, "status": "pending"}
```

### Streaming

```python
from fastapi import StreamingResponse

@app.post("/api/v1/stream")
async def stream_completion(request: QueryRequest):
    async def generate():
        stream = await llm.complete_stream(request.query)
        async for chunk in stream:
            yield f"data: {json.dumps({'token': chunk})}\n\n"
        yield "data: [DONE]\n\n"
    
    return StreamingResponse(
        generate(),
        media_type="text/event-stream"
    )
```

## 2. Caching Strategies

### Exact Match Cache

```python
import hashlib
from redis import Redis

redis = Redis(host='localhost', port=6379, db=0)

def cache_key(prompt: str, model: str, **params) -> str:
    """Generate deterministic cache key"""
    key_data = f"{model}:{prompt}:{sorted(params.items())}"
    return hashlib.sha256(key_data.encode()).hexdigest()

async def cached_complete(prompt: str, model: str = "gpt-4", **kwargs):
    key = cache_key(prompt, model, **kwargs)
    
    # Check cache
    cached = redis.get(key)
    if cached:
        return json.loads(cached)
    
    # Generate
    response = await llm.complete(prompt, model=model, **kwargs)
    
    # Cache with TTL
    redis.setex(
        key,
        timedelta(hours=24),
        json.dumps(response)
    )
    
    return response
```

### Semantic Cache

```python
class SemanticCache:
    """Cache based on semantic similarity"""
    
    def __init__(self, threshold: float = 0.95):
        self.vector_db = VectorDB()
        self.threshold = threshold
    
    async def get(self, query: str) -> str | None:
        query_emb = embed(query)
        
        # Find similar cached queries
        results = self.vector_db.search(query_emb, top_k=1)
        
        if results and cosine_similarity(query_emb, results[0].embedding) > self.threshold:
            return results[0].response
        
        return None
    
    async def set(self, query: str, response: str):
        self.vector_db.upsert({
            "embedding": embed(query),
            "query": query,
            "response": response
        })
```

## 3. Batching

### Dynamic Batching

```python
class DynamicBatcher:
    """Batch requests to improve throughput"""
    
    def __init__(self, max_batch_size: int = 8, max_wait_ms: int = 50):
        self.max_batch_size = max_batch_size
        self.max_wait_ms = max_wait_ms
        self.queue = asyncio.Queue()
        self.results = {}
    
    async def submit(self, prompt: str) -> str:
        request_id = str(uuid.uuid4())
        future = asyncio.Future()
        
        await self.queue.put({
            "id": request_id,
            "prompt": prompt,
            "future": future
        })
        
        return await future
    
    async def process_batches(self):
        while True:
            batch = []
            deadline = asyncio.get_event_loop().time() + (self.max_wait_ms / 1000)
            
            # Collect batch
            while len(batch) < self.max_batch_size:
                timeout = deadline - asyncio.get_event_loop().time()
                if timeout <= 0:
                    break
                
                try:
                    item = await asyncio.wait_for(
                        self.queue.get(),
                        timeout=max(0, timeout)
                    )
                    batch.append(item)
                except asyncio.TimeoutError:
                    break
            
            if batch:
                await self._process_batch(batch)
    
    async def _process_batch(self, batch: list):
        """Process a batch of requests"""
        prompts = [item["prompt"] for item in batch]
        
        # Single batched API call
        responses = await llm.batch_complete(prompts)
        
        # Fulfill futures
        for item, response in zip(batch, responses):
            item["future"].set_result(response)
```

## 4. Load Balancing

### Multi-Provider Failover

```python
class ResilientLLM:
    """Route across multiple providers with failover"""
    
    PROVIDERS = [
        {"name": "openai", "model": "gpt-4", "priority": 1},
        {"name": "anthropic", "model": "claude-3-opus", "priority": 2},
        {"name": "together", "model": "llama-3-70b", "priority": 3}
    ]
    
    def __init__(self):
        self.health = {p["name"]: True for p in self.PROVIDERS}
    
    async def complete(self, prompt: str, timeout: float = 30) -> str:
        for provider in sorted(self.PROVIDERS, key=lambda p: p["priority"]):
            if not self.health[provider["name"]]:
                continue
            
            try:
                response = await self._call_provider(
                    provider,
                    prompt,
                    timeout=timeout
                )
                self.health[provider["name"]] = True
                return response
                
            except Exception as e:
                logger.warning(f"{provider['name']} failed: {e}")
                self.health[provider["name"]] = False
                continue
        
        raise AllProvidersFailed("All LLM providers unavailable")
```

## 5. Rate Limiting

### Token Bucket

```python
import time
from threading import Lock

class TokenBucket:
    def __init__(self, rate: float, capacity: int):
        """
        rate: tokens per second
        capacity: maximum burst
        """
        self.rate = rate
        self.capacity = capacity
        self.tokens = capacity
        self.last_update = time.time()
        self.lock = Lock()
    
    def consume(self, tokens: int = 1) -> bool:
        with self.lock:
            now = time.time()
            elapsed = now - self.last_update
            self.tokens = min(
                self.capacity,
                self.tokens + elapsed * self.rate
            )
            self.last_update = now
            
            if self.tokens >= tokens:
                self.tokens -= tokens
                return True
            return False

# Per-user rate limiting
USER_BUCKETS = {}

def get_user_bucket(user_id: str) -> TokenBucket:
    if user_id not in USER_BUCKETS:
        USER_BUCKETS[user_id] = TokenBucket(rate=1, capacity=10)
    return USER_BUCKETS[user_id]

@app.post("/api/complete")
async def rate_limited_complete(request: Request):
    bucket = get_user_bucket(request.user_id)
    
    if not bucket.consume():
        raise HTTPException(
            status_code=429,
            detail="Rate limit exceeded"
        )
    
    return await llm.complete(request.query)
```

## 6. Cost Monitoring

### Real-time Cost Tracking

```python
class CostTracker:
    PRICING = {
        "gpt-4": {"input": 0.03, "output": 0.06},  # per 1k tokens
        "gpt-3.5-turbo": {"input": 0.0015, "output": 0.002},
        "claude-3-opus": {"input": 0.015, "output": 0.075}
    }
    
    def __init__(self):
        self.daily_costs = defaultdict(float)
        self.requests = []
    
    def log_request(
        self,
        model: str,
        input_tokens: int,
        output_tokens: int,
        user_id: str = None
    ):
        pricing = self.PRICING[model]
        cost = (
            input_tokens * pricing["input"] +
            output_tokens * pricing["output"]
        ) / 1000
        
        today = datetime.now().date()
        self.daily_costs[today] += cost
        
        self.requests.append({
            "timestamp": datetime.now(),
            "model": model,
            "cost": cost,
            "user_id": user_id
        })
        
        # Alert if approaching budget
        if self.daily_costs[today] > DAILY_BUDGET * 0.8:
            alert(f"Daily cost at 80%: ${self.daily_costs[today]:.2f}")
    
    def get_user_costs(self, user_id: str, days: int = 30) -> float:
        cutoff = datetime.now() - timedelta(days=days)
        return sum(
            r["cost"] for r in self.requests
            if r["user_id"] == user_id and r["timestamp"] > cutoff
        )
```

## 7. Performance Optimization

### Connection Pooling

```python
from aiohttp import ClientSession, TCPConnector

# Reuse connections
connector = TCPConnector(limit=100, limit_per_host=20)
session = ClientSession(connector=connector)

async def optimized_call(prompt: str):
    async with session.post(
        API_URL,
        json={"prompt": prompt},
        headers={"Authorization": f"Bearer {API_KEY}"}
    ) as response:
        return await response.json()
```

### Pre-warming

```python
async def prewarm_models():
    """Send warmup requests to reduce cold start latency"""
    warmup_prompts = [
        "Hello",
        "What is the weather?",
        "Summarize this"
    ]
    
    await asyncio.gather(*[
        llm.complete(p, priority="low")
        for p in warmup_prompts
    ])
```

### Model Distillation

```python
# Use small model for simple tasks
# Large model only when needed

def route_by_complexity(query: str) -> str:
    classification = classifier.predict(query)
    
    if classification == "simple":
        return "gpt-3.5-turbo"
    elif classification == "medium":
        return "claude-3-sonnet"
    else:
        return "gpt-4"
```

## 8. Monitoring

### Key Metrics

```python
from prometheus_client import Counter, Histogram, Gauge

# Request metrics
request_count = Counter(
    'llm_requests_total',
    'Total requests',
    ['model', 'status']
)

request_duration = Histogram(
    'llm_request_duration_seconds',
    'Request latency',
    ['model']
)

tokens_used = Counter(
    'llm_tokens_total',
    'Total tokens',
    ['model', 'type']  # input/output
)

cache_hit_rate = Gauge(
    'llm_cache_hit_rate',
    'Cache hit percentage'
)

# Usage tracking
@app.middleware("http")
async def track_metrics(request, call_next):
    start = time.time()
    
    response = await call_next(request)
    
    duration = time.time() - start
    request_duration.labels(model="gpt-4").observe(duration)
    
    return response
```

## 9. Scaling Strategies

### Horizontal Scaling

```yaml
# docker-compose.yml
version: '3'
services:
  api:
    build: .
    deploy:
      replicas: 3
    environment:
      - REDIS_URL=redis://redis:6379
  
  worker:
    build: .
    command: celery -A tasks worker --concurrency=4
    deploy:
      replicas: 2
  
  redis:
    image: redis:alpine
```

### Auto-scaling

```yaml
# kubernetes hpa
apiVersion: autoscaling/v2
kind: HorizontalPodAutoscaler
metadata:
  name: llm-api
spec:
  scaleTargetRef:
    apiVersion: apps/v1
    kind: Deployment
    name: llm-api
  minReplicas: 2
  maxReplicas: 10
  metrics:
  - type: Resource
    resource:
      name: cpu
      target:
        type: Utilization
        averageUtilization: 70
  - type: Pods
    pods:
      metric:
        name: llm_requests_per_second
      target:
        type: AverageValue
        averageValue: "100"
```

## 10. Deployment Checklist

### Pre-deployment
- [ ] Load testing completed
- [ ] Failover tested
- [ ] Rate limits configured
- [ ] Monitoring dashboards ready
- [ ] Alerting rules set up
- [ ] Rollback plan documented

### Security
- [ ] API authentication enabled
- [ ] Input validation implemented
- [ ] Output filtering configured
- [ ] Audit logging enabled
- [ ] Secrets management in place

### Operations
- [ ] Health checks implemented
- [ ] Graceful shutdown handled
- [ ] Log aggregation configured
- [ ] Cost tracking enabled
- [ ] Documentation updated
