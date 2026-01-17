# Application Architecture Guide

This guide defines the standards for structuring applications, managing state, and ensuring code quality.

## Architectural Patterns

### 1. Modular Monolith (Default for New Projects)

Start here before considering microservices.

- **Structure**: Group code by **Domain Feature**, not by technical layer (e.g., `features/cart` vs `components/Button`).
- **Boundaries**: Modules should interact via public APIs (explicit interfaces), preventing spaghetti dependencies.
- **Database**: Logical separation of tables (e.g., schemas) per module is recommended.

### 2. Hexagonal / Clean Architecture (Domain-Centric)

Use for complex core logic that must be independent of frameworks.

- **Domain Layer**: Pure business logic (Entities, Value Objects). No external dependencies.
- **Application Layer**: Use Cases / Interactors. Orchestrates domain objects.
- **Adapters Layer (Input/Output)**: Controllers, API Resolvers, Database Repositories, External Clients.
- **Dependency Rule**: Dependencies only point **inward**. Inner layers know nothing of outer layers.

### 3. Domain-Driven Design (DDD)

Use for complex domains with rich behavior.

- **Ubiquitous Language**: Code terminology must match business language exactly.
- **Bounded Contexts**: Define explicit boundaries where a specific model applies.
- **Entities vs. Value Objects**: Entities have identity; Value Objects are defined by their attributes and are immutable.
- **Aggregates**: Cluster of objects treated as a unit for data changes.

## State Management

### Server-Side State

- **Source of Truth**: The database is the primary source of truth.
- **Caching**: Use aggressively but invalidate intelligently (swr, revalidation tags).
- **Optimistic UI**: Update UI immediately, rollback on failure.

### Local State (Client)

- **Ephemerality**: Keep state as close to where it's used as possible. Avoid global state for local concerns.
- **URL as State**: Store filters, pagination, and selection in the URL query params whenever possible for shareability.

### Event Sourcing (Advanced)

- Store _changes_ (events), not just current state.
- Essential for audit trails and complex temporal logic.
- **CQRS**: Segregate Command (Write) and Query (Read) responsibilities for performance.

## Code Quality Standards

### Principles

1.  **SOLID**:
    - **S**ingle Responsibility: One reason to change.
    - **O**pen/Closed: Open for extension, closed for modification.
    - **L**iskov Substitution: Subtypes must be substitutable for base types.
    - **I**nterface Segregation: Many specific interfaces are better than one general-purpose interface.
    - **D**ependency Inversion: Depend on abstractions, not concretions.
2.  **DRY (Don't Repeat Yourself)**: Abstract common logic, but beware of "hasty abstraction".
3.  **YAGNI (You Aren't Gonna Need It)**: Don't build for hypothetical future requirements. Implement what is needed _now_.
4.  **KISS (Keep It Simple, Stupid)**: Complexity is a liability.

### Implementation

- **Type Safety**: Strict typing (TypeScript) is non-negotiable for enterprise stability.
- **Testing**: "Pyramid" approach - many Unit tests, fewer Integration tests, few E2E tests.
- **Error Handling**: Fail fast, handle gracefully. Use Result types or Monads over throwing exceptions for expected errors.
