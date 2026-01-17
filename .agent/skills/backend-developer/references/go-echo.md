# Go - Echo Best Practices

**Official Documentation**: [echo.labstack.com](https://echo.labstack.com/)

## 1. Golden Rules

1.  **Interfaces**: Define interfaces for your Services and Repositories to make handlers testable.
2.  **Middleware**: Use Echo's robust middleware suite (Recover, Logger, CORS).
3.  **Error Handling**: Use `echo.NewHTTPError` to return standard errors that middleware can log.

## 2. Folder Structure

Common Domain-Driven structure.

```
cmd/server/main.go
internal/
├── user/
│   ├── delivery/
│   │   └── http/
│   │       └── handler.go
│   ├── usecase/
│   │   └── service.go
│   ├── repository/
│   │   └── pg_repo.go
│   └── domain.go      # Interface definitions & Models
pkg/
└── database/
```

## 3. Code Patterns

### Handlers

Bind and Validate in one step if using custom validator.

```go
type UserDTO struct {
    Email string `json:"email" validate:"required,email"`
    Name  string `json:"name" validate:"required"`
}

func (h *UserHandler) Register(c echo.Context) error {
    ctx := c.Request().Context()
    var user UserDTO
    if err := c.Bind(&user); err != nil {
        return echo.NewHTTPError(http.StatusBadRequest, err.Error())
    }
    if err := c.Validate(&user); err != nil {
        return echo.NewHTTPError(http.StatusBadRequest, err.Error())
    }

    // Call usecase...
    return c.JSON(http.StatusCreated, user)
}
```

## 4. Security

- **Middleware**: Always Include `middleware.Recover()` and `middleware.Logger()`.
- **CORS**: Be specific.

```go
e.Use(middleware.CORSWithConfig(middleware.CORSConfig{
  AllowOrigins: []string{"https://labstack.com"},
  AllowHeaders: []string{echo.HeaderOrigin, echo.HeaderContentType, echo.HeaderAccept},
}))
```
