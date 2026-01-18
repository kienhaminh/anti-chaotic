# Unit Testing Insights & Patterns

## Core Philosophy

**"Test Behavior, Not Implementation"**
Unit tests should verify _what_ the code does, not _how_ it does it. This makes refactoring safer.

## The AAA Pattern (Arrange, Act, Assert)

This is the gold standard for readability.

1.  **Arrange**: meticulous setup of inputs and mocks.
2.  **Act**: A single line of code triggering the function.
3.  **Assert**: Clear verification of the output.

## Dealing with Dependencies

**Mock Everything External**

- Database calls? Mock them.
- API requests? Mock them.
- File system? Mock it.
  If you touch the database, it's not a unit test (it's integration).

## Best Practices

1.  **Descriptive Naming**: `it('should return 400 if email is invalid')` is better than `it('test error')`.
2.  **One Concept Per Test**: Don't test validation and success in the same `it` block.
3.  **Boundary Value Analysis**: Always test `0`, `1`, `Max`, `Max+1`, `null`, `undefined`.

## Example (Vitest)

```typescript
import { describe, it, expect, vi } from "vitest";
import { calculateDiscount } from "./pricing.utils";

describe("Pricing Utils", () => {
  it("should apply 10% discount for VIP users", () => {
    // Arrange
    const user = { type: "VIP" };
    const price = 100;

    // Act
    const finalPrice = calculateDiscount(user, price);

    // Assert
    expect(finalPrice).toBe(90);
  });
});
```
