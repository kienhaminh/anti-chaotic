# Tech Stack: Node.js & TypeScript

## Best Practices

- **Runtime**: Node.js LTS or Edge Runtime.
- **Frameworks**: Hono, Fastify, Express, or Next.js Route Handlers.
- **Language**: TypeScript (Strict).

## Database Pattern (Drizzle/Prisma)

- **ORM**: Use Drizzle or Prisma.
- **Migrations**: Always commit migration files.
- **Env**: Use `zod` to validate `process.env`.

## Error Handling

```ts
// Global Error Handler usage
app.use((err, req, res, next) => {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({ error: err.message });
  }
  console.error(err);
  return res.status(500).json({ error: "Internal Server Error" });
});
```

## Security

- **Helmet**: Use helmet for security headers.
- **Cors**: Configure specific origins, never `*` in prod.
