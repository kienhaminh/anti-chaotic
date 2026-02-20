---
name: backend-developer
type: skill
domain: infra
status: stable
version: "2.0.0"
estimated_tokens: 35000
description: API design, system architecture, security, and scalability. Use for Node.js, Python, Go, or Java backend systems.
---

# Backend Developer

Expert guidelines for building robust, scalable, and secure distributed systems.

## Knowledge Graph

- **extends**: []
- **requires**: []
- **suggests**: [[devops-engineer]], [[lead-architect]]
- **conflicts**: []
- **enhances**: [[frontend-developer]] (fullstack), [[ai-engineer]] (AI APIs), [[blockchain-engineer]] (Web3 APIs)
- **moc**: [[web-development-moc]]

---

## 1. System Architecture

### 1.1 Architecture Patterns

| Pattern | Best For | Trade-offs |
|:--------|:---------|:-----------|
| **Monolith** | Small-medium teams, rapid iteration | Simple deployment, harder to scale independently |
| **Microservices** | Large teams, independent scaling | Operational complexity, network latency |
| **Modular Monolith** | Mid-size, clean boundaries | Best of both worlds, easier migration |
| **Serverless** | Variable load, event-driven | Cold starts, vendor lock-in |
| **Event-Driven** | Async processing, loose coupling | Eventual consistency, debugging complexity |

### 1.2 Service Boundaries

```
┌─────────────────────────────────────────────────────────────┐
│                        API Gateway                          │
│                  (Auth, Rate Limiting, Routing)              │
└────────────────────────┬────────────────────────────────────┘
                         │
    ┌────────────────────┼────────────────────┐
    ↓                    ↓                    ↓
┌─────────┐      ┌─────────────┐      ┌─────────────┐
│ User    │      │  Order      │      │  Payment    │
│ Service │      │  Service    │      │  Service    │
│         │      │             │      │             │
│ - Auth  │      │ - Cart      │      │ - Stripe    │
│ - Profile│     │ - Checkout  │      │ - Webhooks  │
└────┬────┘      └──────┬──────┘      └──────┬──────┘
     │                  │                    │
     └──────────────────┼────────────────────┘
                        │
              ┌─────────┴──────────┐
              ↓                    ↓
        ┌──────────┐        ┌──────────┐
        │ PostgreSQL│       │  Redis   │
        │ (Users)   │       │ (Cache)  │
        └──────────┘        └──────────┘
```

### 1.3 Communication Patterns

**Synchronous (REST/gRPC)**
- Use for: Real-time requirements, simple request-response
- Timeout: Always set (5-30s depending on operation)
- Circuit breaker: Mandatory for external calls

**Asynchronous (Message Queue)**
- Use for: Background jobs, high throughput, decoupling
- Patterns: Pub/sub, work queues, routing
- Guarantees: At-least-once delivery, idempotent consumers

```python
# Async pattern with retry
@retry(stop=stop_after_attempt(3), wait=wait_exponential(multiplier=1, min=4, max=10))
async def process_order(order_id: str):
    order = await db.orders.find_one({"_id": order_id})
    
    # Idempotent: check if already processed
    if order.status == "processed":
        return {"status": "already_processed"}
    
    # Process
    result = await payment.charge(order.payment_token)
    
    # Update with idempotency key
    await db.orders.update_one(
        {"_id": order_id},
        {"$set": {"status": "processed", "processed_at": now()}}
    )
    
    return result
```

---

## 2. API Design

### 2.1 REST Best Practices

```
GET    /api/v1/users              # List (paginated)
GET    /api/v1/users/:id          # Get one
POST   /api/v1/users              # Create
PUT    /api/v1/users/:id          # Full update
PATCH  /api/v1/users/:id          # Partial update
DELETE /api/v1/users/:id          # Delete
```

**Status Codes**
- `200 OK` — Success
- `201 Created` — Resource created
- `204 No Content` — Success, no body
- `400 Bad Request` — Validation error
- `401 Unauthorized` — Auth required
- `403 Forbidden` — No permission
- `404 Not Found` — Resource doesn't exist
- `409 Conflict` — Resource already exists
- `422 Unprocessable` — Business logic error
- `429 Too Many Requests` — Rate limited
- `500 Internal Error` — Server error

### 2.2 GraphQL

```graphql
# Schema-first design
type User {
  id: ID!
  email: String!
  name: String
  orders: [Order!]! @relation
  createdAt: DateTime!
}

type Query {
  user(id: ID!): User
  users(limit: Int = 20, offset: Int = 0): [User!]!
}

type Mutation {
  createUser(input: CreateUserInput!): User!
  updateUser(id: ID!, input: UpdateUserInput!): User!
}

# N+1 prevention with DataLoader
const userLoader = new DataLoader(async (userIds) => {
  const users = await db.users.findMany({
    where: { id: { in: userIds } }
  });
  return userIds.map(id => users.find(u => u.id === id));
});
```

### 2.3 API Versioning

```
/api/v1/users          # URL versioning (recommended)
/api/v2/users

# or Header versioning
Accept: application/vnd.api+json;version=2

# Never break existing clients
# Deprecation: 6-12 months notice with sunset headers
Sunset: Sat, 31 Dec 2024 23:59:59 GMT
Deprecation: true
Link: </api/v2/users>; rel="successor-version"
```

---

## 3. Database Design

### 3.1 Schema Design

**Relational (3NF)**
```sql
-- Users table
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Orders with FK
CREATE TABLE orders (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    total_amount DECIMAL(10,2) NOT NULL,
    status VARCHAR(50) DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Indexes for query patterns
CREATE INDEX idx_orders_user_id ON orders(user_id);
CREATE INDEX idx_orders_status ON orders(status) WHERE status = 'pending';
CREATE INDEX idx_orders_created_at ON orders(created_at DESC);
```

**Document (MongoDB)**
```javascript
// Denormalized for read-heavy access patterns
{
  _id: ObjectId("..."),
  userId: "user_123",
  items: [
    { productId: "prod_1", name: "T-Shirt", price: 29.99, quantity: 2 }
  ],
  total: 59.98,
  status: "shipped",
  shippingAddress: { /* embedded */ },
  createdAt: ISODate("2024-01-15")
}
```

### 3.2 Query Optimization

```sql
-- EXPLAIN before optimizing
EXPLAIN ANALYZE SELECT * FROM orders WHERE user_id = 'uuid' ORDER BY created_at DESC;

-- Composite indexes for multi-column filters
CREATE INDEX idx_orders_user_created ON orders(user_id, created_at DESC);

-- Partial indexes for hot data
CREATE INDEX idx_orders_pending ON orders(created_at) WHERE status = 'pending';

-- Covering indexes to avoid table lookups
CREATE INDEX idx_users_email_name ON users(email) INCLUDE (name, created_at);
```

### 3.3 Migrations

```python
# Alembic (Python)
"""
Revision ID: 001_create_users
Create Date: 2024-01-15
"""

def upgrade():
    op.create_table(
        'users',
        sa.Column('id', sa.UUID(), nullable=False),
        sa.Column('email', sa.String(), nullable=False),
        sa.PrimaryKeyConstraint('id'),
        sa.UniqueConstraint('email')
    )

def downgrade():
    op.drop_table('users')

# Always make migrations reversible
# Test migrations on copy of production data before deploying
```

---

## 4. Security

### 4.1 Authentication

**JWT (Stateless)**
```python
import jwt
from datetime import datetime, timedelta

def create_token(user_id: str, secret: str) -> str:
    payload = {
        "sub": user_id,
        "iat": datetime.utcnow(),
        "exp": datetime.utcnow() + timedelta(hours=24),
        "type": "access"
    }
    return jwt.encode(payload, secret, algorithm="HS256")

def verify_token(token: str, secret: str) -> dict:
    try:
        return jwt.decode(token, secret, algorithms=["HS256"])
    except jwt.ExpiredSignatureError:
        raise Unauthorized("Token expired")
    except jwt.InvalidTokenError:
        raise Unauthorized("Invalid token")
```

**Sessions (Stateful)**
```python
# Redis-backed sessions
import redis

session_store = redis.Redis(host='localhost', port=6379, db=0)

def create_session(user_id: str) -> str:
    session_id = secrets.token_urlsafe(32)
    session_store.setex(
        f"session:{session_id}",
        timedelta(days=7),
        json.dumps({"user_id": user_id})
    )
    return session_id
```

### 4.2 Authorization (RBAC/ABAC)

```python
# Role-Based Access Control
class RBACMiddleware:
    def __init__(self, required_role: str):
        self.required_role = required_role
    
    async def __call__(self, request: Request):
        user = request.state.user
        
        if self.required_role not in user.roles:
            raise Forbidden(f"Requires {self.required_role} role")
        
        return await self.handler(request)

# Permission check decorator
@require_permission("orders:write")
async def create_order(request: Request):
    # Only users with orders:write can access
    pass
```

### 4.3 Input Validation

```python
from pydantic import BaseModel, EmailStr, validator
import re

class CreateUserRequest(BaseModel):
    email: EmailStr
    password: str
    name: str
    
    @validator('password')
    def validate_password(cls, v):
        if len(v) < 12:
            raise ValueError('Password must be at least 12 characters')
        if not re.search(r'[A-Z]', v):
            raise ValueError('Password must contain uppercase')
        if not re.search(r'[a-z]', v):
            raise ValueError('Password must contain lowercase')
        if not re.search(r'\d', v):
            raise ValueError('Password must contain digit')
        return v
    
    @validator('name')
    def validate_name(cls, v):
        # Prevent injection
        if re.search(r'[<>"\']', v):
            raise ValueError('Invalid characters in name')
        return v.strip()

# Sanitize all inputs
def sanitize_input(value: str) -> str:
    """Remove potentially dangerous characters"""
    return bleach.clean(value, tags=[], strip=True)
```

### 4.4 Secrets Management

```python
# NEVER: API_KEY = "sk-12345"  # ❌

# ALWAYS use environment variables
import os
from pydantic import BaseSettings

class Settings(BaseSettings):
    database_url: str
    jwt_secret: str
    stripe_key: str
    
    class Config:
        env_file = ".env"
        env_file_encoding = "utf-8"

settings = Settings()

# Or use secret managers
import boto3

def get_secret(secret_name: str) -> str:
    client = boto3.client('secretsmanager')
    response = client.get_secret_value(SecretId=secret_name)
    return response['SecretString']
```

---

## 5. Testing

### 5.1 Unit Tests

```python
import pytest
from unittest.mock import Mock, patch

class TestUserService:
    def test_create_user_hashes_password(self):
        # Arrange
        password = "SecurePass123!"
        
        # Act
        user = UserService.create_user(email="test@example.com", password=password)
        
        # Assert
        assert user.password_hash != password
        assert bcrypt.checkpw(password.encode(), user.password_hash)
    
    @patch('services.email.send')
    def test_create_user_sends_welcome_email(self, mock_send):
        UserService.create_user(email="test@example.com", password="pass")
        mock_send.assert_called_once_with(to="test@example.com", template="welcome")
```

### 5.2 Integration Tests

```python
import pytest
from httpx import AsyncClient

@pytest.fixture
async def client():
    async with AsyncClient(app=app, base_url="http://test") as client:
        yield client

@pytest.fixture
async def test_user(db):
    user = await User.create(email="test@example.com", password="hash")
    yield user
    await user.delete()

async def test_create_order(client, test_user, auth_headers):
    response = await client.post(
        "/api/v1/orders",
        json={"items": [{"product_id": "123", "quantity": 2}]},
        headers=auth_headers
    )
    
    assert response.status_code == 201
    data = response.json()
    assert data["user_id"] == str(test_user.id)
    assert data["status"] == "pending"
```

### 5.3 Contract Tests (Pact)

```python
# Consumer (Frontend)
from pact import Consumer, Provider

pact = Consumer('web-app').has_pact_with(Provider('api'))

@pact.given('user exists').upon_receiving('get user').with_request('GET', '/users/123').will_respond_with(200, body={
    'id': '123',
    'email': 'test@example.com'
})
def test_get_user():
    with pact:
        result = user_service.get_user('123')
        assert result.email == 'test@example.com'
```

---

## 6. Performance & Scaling

### 6.1 Caching Strategies

```python
import redis
from functools import wraps

cache = redis.Redis(host='localhost', port=6379, db=0)

def cached(ttl: int = 300):
    def decorator(func):
        @wraps(func)
        async def wrapper(*args, **kwargs):
            # Build cache key
            cache_key = f"{func.__name__}:{hash(args)}:{hash(tuple(kwargs.items()))}"
            
            # Try cache
            cached_value = cache.get(cache_key)
            if cached_value:
                return json.loads(cached_value)
            
            # Execute and cache
            result = await func(*args, **kwargs)
            cache.setex(cache_key, ttl, json.dumps(result))
            
            return result
        return wrapper
    return decorator

@cached(ttl=60)
async def get_user(user_id: str):
    return await db.users.find_one({"_id": user_id})

# Cache invalidation
async def update_user(user_id: str, data: dict):
    await db.users.update_one({"_id": user_id}, {"$set": data})
    cache.delete(f"get_user:{hash((user_id,))}:...")
```

### 6.2 Connection Pooling

```python
# Database
from sqlalchemy import create_engine

engine = create_engine(
    DATABASE_URL,
    pool_size=20,           # Default connections
    max_overflow=10,        # Extra under load
    pool_timeout=30,        # Wait for available
    pool_recycle=3600,      # Recycle after 1 hour
)

# HTTP clients
import httpx

async_client = httpx.AsyncClient(
    limits=httpx.Limits(max_connections=100, max_keepalive_connections=20),
    timeout=httpx.Timeout(30.0)
)
```

### 6.3 Rate Limiting

```python
from slowapi import Limiter
from slowapi.util import get_remote_address

limiter = Limiter(key_func=get_remote_address)

@app.get("/api/users")
@limiter.limit("100/minute")  # Per IP
async def list_users(request: Request):
    return await get_users()

@app.post("/api/login")
@limiter.limit("5/minute")    # Stricter for auth
async def login(request: Request):
    return await authenticate(request)

# User-specific limits
@limiter.limit(lambda: f"{current_user.id}:1000/hour")
async def api_endpoint():
    pass
```

---

## 7. Observability

### 7.1 Structured Logging

```python
import structlog
import logging

structlog.configure(
    processors=[
        structlog.stdlib.filter_by_level,
        structlog.stdlib.add_logger_name,
        structlog.stdlib.add_log_level,
        structlog.stdlib.PositionalArgumentsFormatter(),
        structlog.processors.TimeStamper(fmt="iso"),
        structlog.processors.StackInfoRenderer(),
        structlog.processors.format_exc_info,
        structlog.processors.UnicodeDecoder(),
        structlog.processors.JSONRenderer()
    ],
    context_class=dict,
    logger_factory=structlog.stdlib.LoggerFactory(),
    wrapper_class=structlog.stdlib.BoundLogger,
    cache_logger_on_first_use=True,
)

logger = structlog.get_logger()

# Usage
logger.info(
    "order_created",
    order_id=order.id,
    user_id=user.id,
    amount=order.total,
    items_count=len(order.items)
)
# {"event": "order_created", "order_id": "...", "user_id": "...", ...}
```

### 7.2 Distributed Tracing

```python
from opentelemetry import trace
from opentelemetry.exporter.otlp.proto.grpc.trace_exporter import OTLPSpanExporter
from opentelemetry.sdk.trace import TracerProvider
from opentelemetry.sdk.trace.export import BatchSpanProcessor

trace.set_tracer_provider(TracerProvider())
tracer = trace.get_tracer(__name__)

otlp_exporter = OTLPSpanExporter(endpoint="http://jaeger:4317")
span_processor = BatchSpanProcessor(otlp_exporter)
trace.get_tracer_provider().add_span_processor(span_processor)

@app.get("/api/orders/{order_id}")
async def get_order(order_id: str):
    with tracer.start_as_current_span("get_order") as span:
        span.set_attribute("order.id", order_id)
        
        with tracer.start_as_current_span("fetch_from_db"):
            order = await db.orders.find_one({"_id": order_id})
        
        with tracer.start_as_current_span("enrich_data"):
            order.items = await fetch_items(order.item_ids)
        
        return order
```

### 7.3 Health Checks

```python
from fastapi import FastAPI
from pydantic import BaseModel

class HealthStatus(BaseModel):
    status: str
    version: str
    checks: dict

@app.get("/health", response_model=HealthStatus)
async def health_check():
    checks = {
        "database": await check_database(),
        "cache": await check_cache(),
        "queue": await check_queue()
    }
    
    all_healthy = all(c["status"] == "ok" for c in checks.values())
    
    return HealthStatus(
        status="healthy" if all_healthy else "degraded",
        version=APP_VERSION,
        checks=checks
    )

async def check_database():
    try:
        await db.execute("SELECT 1")
        return {"status": "ok", "latency_ms": 5}
    except Exception as e:
        return {"status": "error", "message": str(e)}
```

---

## 8. Error Handling

### 8.1 Exception Hierarchy

```python
class AppException(Exception):
    """Base application exception"""
    status_code = 500
    error_code = "internal_error"
    
    def __init__(self, message: str, details: dict = None):
        self.message = message
        self.details = details or {}

class ValidationError(AppException):
    status_code = 400
    error_code = "validation_error"

class NotFoundError(AppException):
    status_code = 404
    error_code = "not_found"

class ConflictError(AppException):
    status_code = 409
    error_code = "conflict"

# Error handler
@app.exception_handler(AppException)
async def app_exception_handler(request: Request, exc: AppException):
    return JSONResponse(
        status_code=exc.status_code,
        content={
            "error": exc.error_code,
            "message": exc.message,
            "details": exc.details,
            "request_id": request.state.request_id
        }
    )
```

### 8.2 Global Error Handling

```python
@app.middleware("http")
async def error_handling_middleware(request: Request, call_next):
    request_id = str(uuid.uuid4())
    request.state.request_id = request_id
    
    try:
        response = await call_next(request)
        response.headers["X-Request-ID"] = request_id
        return response
        
    except Exception as e:
        logger.exception("Unhandled error", request_id=request_id, path=request.url.path)
        
        return JSONResponse(
            status_code=500,
            content={
                "error": "internal_error",
                "message": "An unexpected error occurred",
                "request_id": request_id  # For debugging, not in production
            }
        )
```

---

## 9. Stack-Specific Guides

| Stack | Reference |
|:------|:----------|
| Node.js (Express) | `references/node-express.md` |
| Node.js (NestJS) | `references/node-nestjs.md` |
| Python (FastAPI) | `references/python-fastapi.md` |
| Python (Django) | `references/python-django.md` |
| Go (Gin/Echo) | `references/go-gin.md`, `references/go-echo.md` |
| Java (Spring Boot) | `references/java-springboot.md` |
| General Patterns | `references/general-patterns.md` |

## Related Skills

- [[ai-engineer]] — LLM/AI integration patterns
- [[devops-engineer]] — Deployment and infrastructure
- [[frontend-developer]] — Fullstack development
- [[blockchain-engineer]] — Web3 and smart contract integration
- [[lead-architect]] — System design and architecture decisions

---

*Part of [[web-development-moc]] | Foundation for AI, DevOps, and Blockchain*
