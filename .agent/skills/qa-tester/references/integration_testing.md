# Integration Testing Insights & Patterns

## Core Philosophy

**"Verify the Handshake"**
Integration tests ensure that your modules speak the same language. The most critical integration is usually between your **Logic Layer** and your **Persistence Layer**.

## Scope of Integration

1.  **Service + Database**: Does the ORM query actually work? adhere to constraints?
2.  **Service + External API**: Does the adapter handle the 3rd party response format correctly?
3.  **Controller + Service**: Does the HTTP layer correctly parse inputs before calling logic?

## Testing Strategy

1.  **Real Database (Containerized)**: Use a real Postgres/MySQL container. Mocks can lie; databases don't.
2.  **Transactional Rollbacks**: If possible, wrap tests in transactions that rollback, or truncate tables between tests.
3.  **Seed Data**: Use factories (e.g., `UserFactory.create()`) to set up complex states quickly.

## Example (API + DB)

```typescript
describe("POST /api/register", () => {
  it("should persist user and return 201", () => {
    // Arrange
    const payload = { email: "test@example.com" };

    // Act
    const response = await api.post("/register", payload);

    // Assert (Response)
    expect(response.status).toBe(201);

    // Assert (Persistence)
    const dbUser = await db.users.find({ email: payload.email });
    expect(dbUser).not.toBeNull();
  });
});
```
