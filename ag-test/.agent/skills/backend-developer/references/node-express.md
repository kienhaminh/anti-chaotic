# Node.js - Express.js Best Practices

**Official Documentation**: [expressjs.com](https://expressjs.com/) - Consult for Middleware syntax and Router API.

## 1. Golden Rules

1.  **Always use Async/Await**: Avoid strict callbacks. Use `express-async-errors` (or Node 20+ support) to handle async errors globally.
2.  **Environment Variables**: Never hardcode config. Use strict parsing (e.g., `dotenv` + `envalid`/`zod`).
3.  **Middleware Order**: Global Middleware (Cors/Helmet) -> Routes -> 404 Handler -> Global Error Handler.

## 2. Folder Structure (Feature-based)

```
src/
├── config/             # Environment variables & constants
├── modules/            # Feature modules
│   ├── users/
│   │   ├── users.controller.ts  # Route definitions
│   │   ├── users.service.ts     # Business logic
│   │   ├── users.repository.ts  # DB access (TypeORM/Prisma)
│   │   └── dtos/                # Validation classes
│   └── auth/
├── shared/             # Shared utilities, middlewares, guards
│   ├── middlewares/
│   └── utils/
├── app.ts              # App cleanup & middleware setup
└── server.ts           # Entry point
```

## 3. Code Patterns

### Validation (Zod)

Use Zod for strict runtime validation of request bodies.

```typescript
import { z } from "zod";

export const CreateUserSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

// Use in middleware...
```

### Error Handling

Centralize error handling with a custom Error class.

```typescript
// middleware/error.middleware.ts
export const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  res.status(statusCode).json({ status: "error", message });
};
```

## 4. Security (Helmet & CORS)

- **Helmet**: Mandatory. `app.use(helmet())`.
- **CORS**: whitelist specific origins.
- **Rate Limit**: `express-rate-limit` for public endpoints.
