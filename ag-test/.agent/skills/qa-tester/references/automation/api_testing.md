# API Automation Guide (Supertest/Fetch)

Test the contract, status codes, and payload schemas.

## Implementation Pattern

```typescript
it("POST /api/orders returns 201 and created order", async () => {
  const response = await request(app)
    .post("/api/orders")
    .send({ productId: "123", quantity: 1 });

  expect(response.status).toBe(201);
  expect(response.body).toHaveProperty("id");
  expect(response.body.status).toBe("created");
});
```

## Checklist

- [ ] **Status Codes**: 2xx for success, 4xx for client error, 5xx for server error.
- [ ] **Schema Validation**: Ensure response structure matches openapi/swagger spec.
- [ ] **Auth Checks**: Verify 401/403 for unauthorized/forbidden access.
