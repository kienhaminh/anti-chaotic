# Go - Gin Best Practices

**Official Documentation**: [gin-gonic.com](https://gin-gonic.com/)

## 1. Golden Rules

1.  **Error Handling**: Go has no exceptions. Return errors explicitly. Use custom error types/constants.
2.  **Context**: Always pass `context.Context` to DB and Service layers for timeout/cancellation control.
3.  **Structure**: Avoid global variables. Use dependency injection (manual or fx) for handlers.

## 2. Folder Structure (Standard Go Layout)

Based on [golang-standards/project-layout](https://github.com/golang-standards/project-layout)

```
cmd/
└── api/
    └── main.go           # Entry point
internal/
├── domain/               # Enterprise logic (Entities, Interfaces)
│   └── user.go
├── handler/              # HTTP Handlers (Gin specific)
│   └── user_handler.go
├── service/              # Business Logic (Implementation of Interfaces)
│   └── user_service.go
└── repository/           # DB Access (Implementation of Interfaces)
    └── postgres/
        └── user_repo.go
pkg/                      # Publicly sharable code
└── utils/
go.mod
```

## 3. Code Patterns

### Validation (Binding)

Use `binding` tag (validator v10) in structs.

```go
type CreateUserRequest struct {
    Email    string `json:"email" binding:"required,email"`
    Password string `json:"password" binding:"required,min=8"`
}

func (h *UserHandler) Create(c *gin.Context) {
    var req CreateUserRequest
    if err := c.ShouldBindJSON(&req); err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
        return
    }
    // ... call service
}
```

### DB Access (GORM or sqlc)

- **GORM**: Good for rapid dev.
- **sqlc**: Generates type-safe code from SQL. Preferred for performance/control.

```go
// Direct SQL/sqlc style is clearer than complex ORM magic
func (r *UserRepository) GetByID(ctx context.Context, id int64) (*domain.User, error) {
    row := r.db.QueryRowContext(ctx, "SELECT id, email FROM users WHERE id = $1", id)
    var u domain.User
    if err := row.Scan(&u.ID, &u.Email); err != nil {
        return nil, err
    }
    return &u, nil
}
```

## 4. Security

- **Gin Mode**: Set `GIN_MODE=release` in production.
- **Trusted Proxies**: Configure `router.SetTrustedProxies()` if behind Nginx/LoadBalancer.
