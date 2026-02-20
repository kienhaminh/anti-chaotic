---
name: ai-engineer
type: skill
domain: ai
status: stable
version: "2.0.0"
estimated_tokens: 25000
description: Production-grade GenAI, Agentic Systems, RAG, and Evaluation pipelines. Use for LLM integration, multi-agent workflows, and rigorous testing.
---

# AI Engineer

Guidelines for building production-grade AI systems with robustness, scalability, and engineering reliability.

## Knowledge Graph

- **extends**: [[backend-developer]]
- **requires**: []
- **suggests**: [[vector-db]], [[langchain]], [[openai-integration]], [[evaluation-frameworks]], [[prompt-engineer]]
- **conflicts**: []
- **enhances**: [[frontend-developer]] (AI-powered UIs), [[data-scientist]] (ML pipelines)
- **moc**: [[ai-development-moc]]

---

## 1. Architecture Principles

### 1.1 The AI System Stack

```
┌─────────────────────────────────────────┐
│  Application Layer (UI/API/Agents)      │
├─────────────────────────────────────────┤
│  Orchestration (Workflows, Routing)     │
├─────────────────────────────────────────┤
│  Model Layer (LLMs, Embeddings, VLMs)   │
├─────────────────────────────────────────┤
│  Retrieval (Vector DB, Cache, Search)   │
├─────────────────────────────────────────┤
│  Infrastructure (Observability, Guardrails)
└─────────────────────────────────────────┘
```

### 1.2 Design Patterns

| Pattern | Use When | Trade-offs |
|:--------|:---------|:-----------|
| **Direct LLM Call** | Simple Q&A, low stakes | Fast, cheap, but limited |
| **RAG** | Knowledge-intensive tasks | Better accuracy, higher latency |
| **Multi-Agent** | Complex workflows, parallelization | Scalable, harder to debug |
| **Chain-of-Thought** | Reasoning tasks | Better accuracy, more tokens |
| **Function Calling** | Tool integration | Structured, deterministic |

### 1.3 Request Lifecycle

```
User Request
    ↓
[Input Validation] → Guardrails, PII detection
    ↓
[Intent Routing] → Classify to appropriate handler
    ↓
[Context Assembly] → Retrieve relevant data
    ↓
[Prompt Construction] → Dynamic template rendering
    ↓
[LLM Inference] → With retry, timeout, fallback
    ↓
[Output Validation] → Schema check, safety filter
    ↓
[Response Streaming] → Chunked delivery
    ↓
[Observability] → Log, trace, metrics
```

---

## 2. Agentic Systems

### 2.1 Agent Architecture

```typescript
interface Agent {
  // Identity
  name: string;
  description: string;
  systemPrompt: string;
  
  // Capabilities
  tools: Tool[];
  memory: MemoryStore;
  
  // Behavior
  maxIterations: number;
  reflectionEnabled: boolean;
  
  // Execution
  execute(input: string): Promise<AgentResult>;
}
```

### 2.2 ReAct Pattern (Reasoning + Acting)

```
Thought: I need to find the user's order status
Action: query_database(user_id, "orders")
Observation: {"order_id": "123", "status": "shipped"}
Thought: The order is shipped, I should provide tracking
Action: get_tracking_info("123")
Observation: {"carrier": "UPS", "tracking": "1Z999AA"}
Thought: I have all information needed
Final Answer: Your order #123 has been shipped via UPS (tracking: 1Z999AA)
```

### 2.3 Multi-Agent Patterns

**Supervisor Pattern**
```
                    ┌─────────────┐
User Request →      │ Supervisor  │
                    │  Agent      │
                    └──────┬──────┘
                           │
          ┌────────────────┼────────────────┐
          ↓                ↓                ↓
    ┌──────────┐    ┌──────────┐    ┌──────────┐
    │ Research │    │  Code    │    │  Review  │
    │  Agent   │    │  Agent   │    │  Agent   │
    └────┬─────┘    └────┬─────┘    └────┬─────┘
         │               │               │
         └───────────────┼───────────────┘
                         ↓
                   ┌──────────┐
                   │ Synthesis│
                   └────┬─────┘
                        ↓
                   Final Response
```

**Pipeline Pattern**
```
Raw Input → Extractor → Validator → Processor → Formatter → Output
```

### 2.4 Tool Design

```typescript
// Good tool: specific, validated, documented
const searchOrders = {
  name: "search_orders",
  description: "Search customer orders by email or order ID. Returns max 10 results.",
  parameters: z.object({
    query: z.string().describe("Email or order ID to search"),
    status: z.enum(["pending", "shipped", "delivered"]).optional()
  }),
  handler: async ({ query, status }) => {
    // Implementation with error handling
  }
};

// Bad tool: vague, unvalidated
const doStuff = {
  name: "do_stuff",
  description: "Does something",
  parameters: z.any(),
  handler: async (input) => { /* ... */ }
};
```

---

## 3. Advanced RAG

### 3.1 Retrieval Pipeline

```
Query → Query Understanding → Retrieval → Reranking → Context Assembly
```

### 3.2 Query Transformation

| Technique | Purpose | Example |
|:----------|:--------|:--------|
| **HyDE** | Improve semantic match | Generate hypothetical answer, then retrieve |
| **Query Expansion** | Increase recall | Add synonyms, related terms |
| **Step-back** | Broaden context | Abstract specific query to general concept |
| **Sub-queries** | Complex questions | Break into atomic retrieval tasks |

### 3.3 Chunking Strategies

```python
# Fixed-size with overlap
chunks = []
window = 1000
overlap = 200
for i in range(0, len(text), window - overlap):
    chunks.append(text[i:i + window])

# Semantic chunking (by meaning)
from semantic_chunker import SemanticChunker
chunker = SemanticChunker(
    embedding_model="text-embedding-3-small",
    max_chunk_size=512,
    similarity_threshold=0.85
)
chunks = chunker.split(text)

# Agentic chunking
# Use LLM to identify natural boundaries
```

### 3.4 Retrieval Methods

```python
# Dense retrieval (embeddings)
results = vector_db.search(
    query_embedding=embed(query),
    top_k=10,
    filter={"status": "published"}
)

# Sparse retrieval (BM25)
from rank_bm25 import BM25Okapi
tokenized_corpus = [doc.split() for doc in corpus]
bm25 = BM25Okapi(tokenized_corpus)
doc_scores = bm25.get_scores(query.split())

# Hybrid (best of both)
dense_results = vector_db.search(query_embedding, top_k=20)
sparse_results = bm25.search(query, top_k=20)
results = reciprocal_rank_fusion(dense_results, sparse_results, k=60)
```

### 3.5 Reranking

```python
# Cross-encoder reranking
from sentence_transformers import CrossEncoder
reranker = CrossEncoder('cross-encoder/ms-marco-MiniLM-L-6-v2')

pairs = [[query, doc.text] for doc in initial_results]
scores = reranker.predict(pairs)
reranked = sorted(zip(initial_results, scores), key=lambda x: x[1], reverse=True)
```

---

## 4. Prompt Engineering at Scale

### 4.1 Prompt Templates

```python
from jinja2 import Template

SYSTEM_PROMPT = Template("""
You are {{ role }}. Your task is to {{ task }}.

{% if constraints %}
Constraints:
{% for c in constraints %}
- {{ c }}
{% endfor %}
{% endif %}

{% if examples %}
Examples:
{% for ex in examples %}
Input: {{ ex.input }}
Output: {{ ex.output }}
{% endfor %}
{% endif %}

Respond in JSON format matching this schema: {{ output_schema }}
""")
```

### 4.2 Few-shot Prompting

```python
def build_few_shot_prompt(query: str, examples: list, k: int = 3) -> str:
    """Dynamically select relevant examples"""
    
    # Retrieve similar examples
    query_embedding = embed(query)
    similarities = [
        cosine_similarity(query_embedding, ex.embedding)
        for ex in examples
    ]
    
    top_examples = sorted(
        zip(examples, similarities),
        key=lambda x: x[1],
        reverse=True
    )[:k]
    
    prompt_parts = ["Here are some examples:\n"]
    for ex, _ in top_examples:
        prompt_parts.append(f"Q: {ex.question}\nA: {ex.answer}\n")
    
    prompt_parts.append(f"Q: {query}\nA:")
    return "\n".join(prompt_parts)
```

### 4.3 Chain-of-Thought

```python
COT_PROMPT = """
Solve this step by step:

1. First, identify what information is given
2. Then, determine what needs to be calculated
3. Show your work at each step
4. Finally, provide the answer

Question: {question}

Let's work through this:
"""
```

### 4.4 Structured Output

```python
# Pydantic for structured generation
from pydantic import BaseModel, Field
from typing import Literal

class AnalysisResult(BaseModel):
    sentiment: Literal["positive", "negative", "neutral"]
    confidence: float = Field(ge=0, le=1)
    key_points: list[str] = Field(max_length=5)
    action_items: list[str] = Field(default_factory=list)

# Usage with OpenAI
response = client.chat.completions.create(
    model="gpt-4",
    messages=[{"role": "user", "content": text}],
    response_format={"type": "json_object"},
    functions=[{
        "name": "analyze",
        "parameters": AnalysisResult.schema()
    }],
    function_call={"name": "analyze"}
)
```

---

## 5. Evaluation Framework

### 5.1 LLM-as-Judge

```python
JUDGE_PROMPT = """
Evaluate the following AI response on these criteria:

1. Accuracy (1-5): Is the information correct?
2. Helpfulness (1-5): Does it solve the user's problem?
3. Safety (1-5): Is it safe and appropriate?
4. Conciseness (1-5): Is it appropriately brief?

Context: {context}
User Query: {query}
AI Response: {response}

Provide scores and brief justification for each.
"""

def llm_judge(query: str, response: str, context: str) -> dict:
    evaluation = client.chat.completions.create(
        model="gpt-4",
        messages=[{
            "role": "user",
            "content": JUDGE_PROMPT.format(
                query=query,
                response=response,
                context=context
            )
        }]
    )
    return parse_evaluation(evaluation.choices[0].message.content)
```

### 5.2 Automated Testing

```python
# Test dataset
TEST_CASES = [
    {
        "name": "greeting",
        "input": "Hello!",
        "expected_contains": ["hello", "hi"],
        "expected_not_contains": ["error", "sorry"],
        "max_latency_ms": 1000
    },
    {
        "name": "complex_query",
        "input": "What's the weather in Tokyo and should I bring an umbrella?",
        "expected_tool_calls": ["get_weather"],
        "max_tokens": 200
    }
]

def run_eval(test_cases: list, agent: Agent) -> dict:
    results = []
    for case in test_cases:
        start = time.time()
        response = agent.run(case["input"])
        latency = (time.time() - start) * 1000
        
        # Check assertions
        passed = all([
            all(s in response.lower() for s in case.get("expected_contains", [])),
            all(s not in response.lower() for s in case.get("expected_not_contains", [])),
            latency < case.get("max_latency_ms", 5000)
        ])
        
        results.append({
            "name": case["name"],
            "passed": passed,
            "latency_ms": latency
        })
    
    return {
        "total": len(results),
        "passed": sum(r["passed"] for r in results),
        "failed": sum(not r["passed"] for r in results),
        "avg_latency_ms": sum(r["latency_ms"] for r in results) / len(results)
    }
```

### 5.3 A/B Testing

```python
def ab_test(control_agent, treatment_agent, test_cases, split=0.5):
    """Compare two agent versions"""
    
    results = []
    for case in test_cases:
        # Random assignment
        if random.random() < split:
            agent = treatment_agent
            variant = "treatment"
        else:
            agent = control_agent
            variant = "control"
        
        response = agent.run(case["input"])
        score = llm_judge(case["input"], response, case.get("context", ""))
        
        results.append({
            "variant": variant,
            "score": score,
            "test_case": case["name"]
        })
    
    # Statistical analysis
    control_scores = [r["score"] for r in results if r["variant"] == "control"]
    treatment_scores = [r["score"] for r in results if r["variant"] == "treatment"]
    
    return {
        "control_mean": np.mean(control_scores),
        "treatment_mean": np.mean(treatment_scores),
        "p_value": ttest_ind(control_scores, treatment_scores).pvalue
    }
```

---

## 6. Production Deployment

### 6.1 Deployment Patterns

| Pattern | Latency | Cost | Best For |
|:--------|:--------|:-----|:---------|
| Synchronous | High | Per-request | Low-volume, critical |
| Asynchronous (Queue) | Medium | Batched | High-volume, non-critical |
| Streaming | Progressive | Same | Real-time UX |
| Edge Caching | Low | Lower | Repeatable queries |

### 6.2 Load Balancing & Fallbacks

```python
class LLMRouter:
    def __init__(self):
        self.providers = {
            "gpt-4": OpenAIProvider(),
            "claude-3": AnthropicProvider(),
            "llama": TogetherProvider()  # Fallback
        }
        self.health = {k: True for k in self.providers}
    
    async def complete(self, prompt: str, priority: str = "quality") -> str:
        # Route by priority
        if priority == "quality":
            order = ["gpt-4", "claude-3", "llama"]
        elif priority == "speed":
            order = ["claude-3", "gpt-4", "llama"]
        else:  # cost
            order = ["llama", "claude-3", "gpt-4"]
        
        for provider_name in order:
            if not self.health[provider_name]:
                continue
            
            try:
                provider = self.providers[provider_name]
                return await provider.complete(prompt, timeout=30)
            except Exception as e:
                logger.warning(f"{provider_name} failed: {e}")
                self.health[provider_name] = False
                continue
        
        raise AllProvidersFailed()
```

### 6.3 Circuit Breaker

```python
from circuitbreaker import circuit

@circuit(failure_threshold=5, recovery_timeout=60)
async def call_llm(prompt: str):
    """Automatically stop calling if failing too much"""
    return await llm_client.complete(prompt)
```

---

## 7. Observability

### 7.1 Structured Logging

```python
import structlog

logger = structlog.get_logger()

def log_llm_call(prompt: str, response: str, metadata: dict):
    logger.info(
        "llm_completion",
        prompt_tokens=len(prompt) // 4,  # Approximate
        completion_tokens=len(response) // 4,
        model=metadata["model"],
        latency_ms=metadata["latency"],
        cache_hit=metadata.get("cache_hit", False),
        user_id=metadata.get("user_id"),
        session_id=metadata.get("session_id")
    )
```

### 7.2 Tracing

```python
from opentelemetry import trace

tracer = trace.get_tracer("ai-agent")

@tracer.start_as_current_span("agent_execution")
def run_agent(query: str):
    with tracer.start_as_current_span("retrieval") as span:
        context = retrieve(query)
        span.set_attribute("retrieval.count", len(context))
    
    with tracer.start_as_current_span("llm_call") as span:
        response = llm.complete(query, context=context)
        span.set_attribute("tokens.used", response.usage.total_tokens)
    
    return response
```

### 7.3 Metrics

```python
from prometheus_client import Counter, Histogram, Gauge

# Counters
llm_requests_total = Counter('llm_requests_total', 'Total LLM requests', ['model', 'status'])
cache_hits_total = Counter('cache_hits_total', 'Cache hit count')

# Histograms
llm_latency_seconds = Histogram('llm_latency_seconds', 'Request latency', ['model'])
tokens_per_request = Histogram('tokens_per_request', 'Tokens per request', ['model', 'type'])

# Gauges
active_requests = Gauge('active_requests', 'Currently processing requests')
available_context_window = Gauge('available_context_window', 'Remaining tokens in context')
```

---

## 8. Safety & Guardrails

### 8.1 Input Validation

```python
from presidio_analyzer import AnalyzerEngine
from presidio_anonymizer import AnonymizerEngine

analyzer = AnalyzerEngine()
anonymizer = AnonymizerEngine()

def sanitize_input(text: str) -> tuple[str, list]:
    """Detect and optionally remove PII"""
    results = analyzer.analyze(text=text, language='en')
    
    detected_entities = [r.entity_type for r in results]
    
    if detected_entities:
        anonymized = anonymizer.anonymize(
            text=text,
            analyzer_results=results
        )
        return anonymized.text, detected_entities
    
    return text, []
```

### 8.2 Output Filtering

```python
# Content moderation
from openai import OpenAI

client = OpenAI()

def moderate_content(text: str) -> dict:
    response = client.moderations.create(input=text)
    result = response.results[0]
    
    return {
        "flagged": result.flagged,
        "categories": {
            k: v for k, v in result.categories.__dict__.items() if v
        }
    }

# Custom guardrails
FORBIDDEN_PATTERNS = [
    r"\b(password|secret|key)\s*[:=]\s*\S+",  # Credentials
    r"\b\d{4}[\s-]?\d{4}[\s-]?\d{4}[\s-]?\d{4}\b",  # Credit cards
]

def check_output(text: str) -> tuple[bool, list]:
    violations = []
    for pattern in FORBIDDEN_PATTERNS:
        if re.search(pattern, text, re.IGNORECASE):
            violations.append(f"Matched forbidden pattern: {pattern}")
    
    return len(violations) == 0, violations
```

### 8.3 Rate Limiting

```python
from ratelimit import limits, sleep_and_retry

# Per-user rate limiting
USER_LIMITS = {}

def check_rate_limit(user_id: str, max_requests: int = 100, window: int = 3600):
    now = time.time()
    key = f"rate_limit:{user_id}"
    
    # Get current count from Redis/cache
    current = cache.get(key, default=[])
    
    # Remove old entries outside window
    current = [t for t in current if now - t < window]
    
    if len(current) >= max_requests:
        raise RateLimitExceeded(f"Limit: {max_requests} per {window}s")
    
    current.append(now)
    cache.set(key, current, ex=window)
```

---

## 9. Cost Optimization

### 9.1 Caching Strategies

```python
import hashlib
from functools import lru_cache

# Semantic caching (similar queries)
class SemanticCache:
    def __init__(self, threshold: float = 0.95):
        self.store = {}  # embedding -> response
        self.threshold = threshold
    
    def get(self, query: str) -> str | None:
        query_emb = embed(query)
        
        for cached_emb, response in self.store.items():
            similarity = cosine_similarity(query_emb, cached_emb)
            if similarity > self.threshold:
                return response
        
        return None
    
    def set(self, query: str, response: str):
        self.store[embed(query)] = response

# Exact match caching
@lru_cache(maxsize=1000)
def cached_llm_call(prompt_hash: str):
    # Implementation
    pass
```

### 9.2 Model Tiering

```python
TIER_STRATEGY = {
    "simple": {  # Classification, extraction
        "model": "gpt-3.5-turbo",
        "max_tokens": 150
    },
    "standard": {  # General Q&A
        "model": "claude-3-sonnet",
        "max_tokens": 500
    },
    "complex": {  # Reasoning, code
        "model": "gpt-4",
        "max_tokens": 2000
    }
}

def route_by_complexity(query: str) -> dict:
    """Use cheap model to classify complexity"""
    classification = client.classify(
        query,
        classes=["simple", "standard", "complex"]
    )
    return TIER_STRATEGY[classification]
```

### 9.3 Token Optimization

```python
# Prompt compression
from prompt_compressor import Compressor

compressor = Compressor()
long_context = compressor.compress(
    documents,
    target_ratio=0.5,  # Keep 50% of tokens
    method="semantic"  # or "extractive"
)

# Selective context inclusion
def select_relevant_chunks(query: str, chunks: list, max_tokens: int) -> list:
    query_emb = embed(query)
    
    # Score by relevance
    scored = [
        (chunk, cosine_similarity(query_emb, chunk.embedding))
        for chunk in chunks
    ]
    scored.sort(key=lambda x: x[1], reverse=True)
    
    # Take top-k within token budget
    selected = []
    token_count = 0
    for chunk, score in scored:
        if token_count + chunk.token_count > max_tokens:
            break
        selected.append(chunk)
        token_count += chunk.token_count
    
    return selected
```

---

## 10. Reference Materials

### Dynamic Stack Loading

- **Agentic Patterns**: [ReAct, Plan-and-Solve, Multi-Agent](references/agentic-patterns.md)
- **Advanced RAG**: [Hybrid search, reranking, query transformation](references/rag-advanced.md)
- **Evaluation**: [LLM-as-judge, automated testing](references/evaluation.md)
- **Serving**: [Caching, batching, streaming](references/serving-optimization.md)
- **LLM Fundamentals**: [Prompting, tokenization, APIs](references/llm.md)

### Related Skills

- [[backend-developer]] — API and infrastructure foundation
- [[vector-db]] — For RAG implementations
- [[frontend-developer]] — AI-powered user interfaces
- [[prompt-engineer]] — Deep prompt engineering expertise
- [[data-scientist]] — ML model training and evaluation

---

*Extends [[backend-developer]] | Part of [[ai-development-moc]]*
