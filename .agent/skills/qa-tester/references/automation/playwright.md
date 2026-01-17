# Playwright Automation Guide

**Golden Rule**: Use resilient locators and the Page Object Model (POM).

## Page Object Model Pattern

```typescript
// tests/auth.spec.ts
import { test, expect } from "@playwright/test";
import { LoginPage } from "./pages/login-page";

test("User can login with valid credentials", async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.goto();
  await loginPage.login("user@example.com", "password123");

  await expect(page.getByTestId("dashboard-header")).toBeVisible();
});
```

## Best Practices

- **Network Boundaries**: Mock external 3rd party APIs (e.g., Stripe, Auth0) during E2E to ensure stability, but keep "Critical User Journey" tests unmocked.
- **State Setup**: Do not use the UI to seed data. Use API calls in `beforeAll` hooks.
  ```typescript
  test.beforeAll(async ({ request }) => {
    await request.post('/api/seed/user', { data: { ... } });
  });
  ```
- **Dynamic Waiting**: Never use `sleep(1000)`. Use `await expect(...).toBeVisible()` or `waitForResponse()`.
