# Accessibility (A11y) Testing Guide

> **Optional Module**: Consult this guide when accessibility compliance (WCAG) is required.

## Core Tools

- **axe-core**: The engine for finding accessibility defects.
- **jest-axe**: For unit/integration level checks.
- **cypress-axe** / **@axe-core/playwright**: For E2E injection.

## Implementation Pattern (Playwright)

```typescript
import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

test("landing page should not have any automatically detectable accessibility issues", async ({
  page,
}) => {
  await page.goto("/");

  const accessibilityScanResults = await new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
    .analyze();

  expect(accessibilityScanResults.violations).toEqual([]);
});
```

## Common Violations to Watch

1. **Color Contrast**: Text vs Background ratio must be at least 4.5:1.
2. **Alt Text**: All non-decorative images must have `alt` attributes.
3. **Labels**: Form inputs must have implicit or explicit `<label>` or `aria-label`.
4. **Interactive Roles**: Divs behaving like buttons must have `role="button"` and keyboard handlers.
