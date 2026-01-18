# General Backend Patterns & Architecture

# General Backend Patterns & Architecture

> [!NOTE]
> This guide covers **Applied Architecture** (Implementation details). For high-level System Design, Decision Records (ADRs), and detailed Cloud Infrastructure, refer to the **[Lead Architect Skill](../lead-architect/SKILL.md)**.

This reference covers universal principles applicable across all languages and frameworks.

## 1. Architectural Patterns

### Clean Architecture / Hexagonal / Onion

Separation of concerns is paramount.

- **Domain Layer**: Pure business logic. No dependencies on frameworks or DBs.
- **Application Layer**: Use cases / Services. Orchestrates the domain.
- **Adapters (Interface) Layer**: Controllers, API Handlers, CLI.
- **Infrastructure Layer**: DB Implementations, External APIs.

### Domain-Driven Design (DDD)

- **Entities**: Objects with identity (e.g., User, Order).
- **Value Objects**: Immutable objects defined by attributes (e.g., Email, Money).
- **Aggregates**: Clusters of objects treated as a unit (Order + OrderItems).
- **Repositories**: Interface for collection-like access to Aggregates.

## 2. Database Design

### Relational (PostgreSQL, MySQL)

- **Naming**: `snake_case` for tables and columns. Plural table names (`users`, `orders`).
- **Primary Keys**: Use UUIDs (v7 preferred for sorting) or BigInt. Avoid auto-increment for distributed systems.
- **Foreign Keys**: Always define constraints. Index FK columns.
- **Transactions**: Use transactions for atomic operations involving multiple writes.

### NoSQL (MongoDB)

- **Embedding vs. Referencing**:
  - **Embed**: Used together, read together, low cardinality (e.g., OrderItems in Order).
  - **Reference**: High cardinality, updated independently (e.g., User in Order).
- **Schema Validation**: Use JSON Schema validation on the collection level.

### Caching (Redis)

- **Cache-Aside (Lazy Loading)**: App checks cache -> Miss -> Read DB -> Set Cache.
- **TTL**: Always set a Time-To-Live. avoid permanent keys unless necessary.
- **Keys**: Use namespaced keys `app:resource:id` (e.g., `shop:product:123`).

## 3. Security Best Practices (OWASP)

> **Advanced Security**: For Threat Modeling, Zero Trust Architecture, and compliance auditing, see `lead-architect/references/infrastructure.md`.

- **Injection**: Use parameterized queries (SQL) or ORMs. Never string concat user input.
- **Auth**:
  - **Passwords**: Bcrypt, Argon2. Never MD5/SHA1.
  - **JWT**: Short-lived access tokens (15m), Long-lived refresh tokens.
- **Rate Limiting**: Implement Global and Per-User rate limits (Redis Token Bucket).
- **CORS**: Restrict `Access-Control-Allow-Origin` to known domains.

## 4. Scalability

- **Statelessness**: Application servers should be stateless. Store session data in Redis.
- **Async Processing**: Offload heavy tasks (Email, Image Processing) to message queues (RabbitMQ, Kafka, BullMQ, Celery).
- **Idempotency**: API endpoints (especially POST/payment) should handle duplicate requests gracefully.
