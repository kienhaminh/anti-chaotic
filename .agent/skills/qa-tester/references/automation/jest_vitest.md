# Jest / Vitest Guide

**Core Philosophy**: Isolate logic, integrate flows.

## Implementation Patterns

### Mocking at Boundaries

Mock modules at boundaries (e.g., database clients, mailers) to test logic in isolation.

### Table-Driven Tests

Use `test.each` for covering multiple data inputs efficiently.

```typescript
// price-calculator.test.ts
describe("calculateTotal", () => {
  test.each([
    [100, 10, 110],
    [50, 0, 50],
    [0, 20, 20],
  ])("given subtotal %i and tax %i, returns %i", (subtotal, tax, expected) => {
    expect(calculateTotal(subtotal, tax)).toBe(expected);
  });
});
```
