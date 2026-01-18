# E2E Testing Insights & Patterns

## Core Philosophy

**"Simulate the Real User"**
E2E tests don't care about your code; they care about your UI. They are the final gatekeeper before production.

## The Page Object Model (POM)

POM is mandatory for maintainable E2E suites. It decouples the _test logic_ from the _page structure_.

- **Page Class**: Contains selectors (`this.submitBtn`) and actions (`async submit()`).
- **Test File**: Reads like a user story (`await loginPage.login()`).

## Resilient Selectors

**Avoid Implementation Details**

- ❌ `div > .btn-primary` (Brittle: breaks if CSS changes)
- ✅ `getByRole('button', { name: 'Submit' })` (Resilient: relies on accessibility tree)
- ✅ `getByTestId('submit-order')` (Explicit contract)

## State Management

- **Login**: Don't log in via UI for every test. Use API calls to set the session cookie, then visit the page.
- **Data**: Create unique data per test (e.g., `user_${timestamp}`) to avoid collision.

## Example (Playwright)

```typescript
// pages/CheckoutPage.ts
export class CheckoutPage {
  constructor(private page: Page) {}
  async placeOrder() {
    await this.page.getByRole("button", { name: "Place Order" }).click();
  }
}

// tests/checkout.spec.ts
test("Guest checkout flow", async ({ page }) => {
  const checkout = new CheckoutPage(page);
  await page.goto("/cart");
  await checkout.placeOrder();
  await expect(page.getByText("Thank you!")).toBeVisible();
});
```
