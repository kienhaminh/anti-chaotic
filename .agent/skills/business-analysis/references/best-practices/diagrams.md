# Mermaid Diagramming Best Practices

## "Visuals First"

Diagrams are not decorations. They are **specifications**.

## 1. Syntax Verification

**ALWAYS** check `verify_mermaid.py` or use `context7` to confirm syntax if unsure. Mermaid syntax evolves.

## 2. Diagram Selection Guide

| Requirement Type       | Diagram Type  | Mermaid Key       | Why?                               |
| :--------------------- | :------------ | :---------------- | :--------------------------------- |
| **Logic/Workflow**     | Flowchart     | `flowchart TD`    | Decision trees, yes/no paths.      |
| **System Interaction** | Sequence      | `sequenceDiagram` | Who calls whom? APIreq/res cycles. |
| **Data Structure**     | Class Diagram | `classDiagram`    | OOP relationships.                 |
| **Database Schema**    | ER Diagram    | `erDiagram`       | SQL tables and cardinality.        |
| **Lifecycle**          | State Diagram | `stateDiagram-v2` | Status transitions.                |
| **User Journey**       | User Journey  | `journey`         | User sentiment/steps overlay.      |
| **Architecture**       | C4 Context    | `C4Context`       | High-level system overview.        |
| **Project Plan**       | Gantt         | `gantt`           | Timeline and milestones.           |

## 3. Style Guidelines

- **Left-to-Right** (`LR`) for long processes.
- **Top-Down** (`TD`) for hierarchies.
- **Subgraphs**: Use to group related components (e.g., `subgraph Database`).

## 4. Examples Library

### Sequence Diagram (API Call)

_Use for: API endpoints, service-to-service communication._

```mermaid
sequenceDiagram
    autonumber
    participant Client
    participant Server
    participant DB

    Client->>Server: POST /login
    Server->>DB: SELECT * FROM users
    DB-->>Server: User Data
    alt Valid Password
        Server-->>Client: 200 OK (Token)
    else Invalid
        Server-->>Client: 401 Unauthorized
    end
```

### State Diagram (Lifecycle)

_Use for: Order status, Auth state, Ticket workflows._

```mermaid
stateDiagram-v2
    [*] --> Pending
    Pending --> Paid: Payment Success
    Pending --> Failed: Payment Fail
    Paid --> Shipped
    Shipped --> [*]
```

### Class Diagram (OOP/Data)

_Use for: Domain entities, Code architecture._

```mermaid
classDiagram
    class User {
        +String username
        +login()
    }
    class Order {
        +int id
        +Date created
    }
    User "1" *-- "many" Order : places
```

### ER Diagram (Database)

_Use for: SQL Schema, Relationships._

```mermaid
erDiagram
    USER ||--o{ ORDER : places
    USER {
        string username
        string email
    }
    ORDER ||--|{ LINE-ITEM : contains
    ORDER {
        int id
        float total
    }
```

### User Journey Map

_Use for: UX Flows, Customer experience._

```mermaid
journey
    title Buying a Coffee
    section Application
      Log In: 5: Me, Cat
      Find Product: 3: Me
    section Checkout
      Pay: 5: Me
      Receive Receipt: 5: Me
```

### C4 Context (Architecture)

_Use for: High-level System Landscape. Requires `C4Context` library support._

```mermaid
C4Context
    title System Context for Banking App
    Person(customer, "Customer", "A customer of the bank.")
    System(banking_system, "Internet Banking System", "Allows customers to view information.")
    SystemExt(mainframe, "Mainframe Banking System", "Stores all customer information.")
    Rel(customer, banking_system, "Uses")
    Rel(banking_system, mainframe, "Uses")
```

### Flowchart (Logic Tree)

_Use for: Business rules, Algorithms._

```mermaid
flowchart TD
    A[Start] --> B{Is it valid?}
    B -- Yes --> C[Process]
    B -- No --> D[Error]
    C --> E[End]
    D --> E
```
