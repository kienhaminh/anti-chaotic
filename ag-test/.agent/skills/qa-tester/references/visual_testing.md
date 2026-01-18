# Visual Regression Testing

> **Optional Module**: Consult this guide when pixel-perfect UI stability is required.

## Purpose

Detect unintended visual changes (layout shifts, color changes, broken assets) that functional tests might miss.

## Strategy

1. **Golden Snapshots**: Commit "approved" screenshots of UI states to the repo.
2. **Comparison**: On test run, capture new screenshot and diff pixel-by-pixel.
3. **Threshold**: Allow a small % (e.g., 0.1%) difference for anti-aliasing noise.

## Implementation (Playwright)

```typescript
test("profile card looks correct", async ({ page }) => {
  await page.goto("/profile/123");

  // Mask dynamic content (dates, usernames) to prevent flakes
  await expect(page).toHaveScreenshot("profile-card.png", {
    mask: [page.locator(".timestamp")],
    maxDiffPixelRatio: 0.01,
  });
});
```

## Best Practices

- **Dockerize**: Run visual tests in Docker to ensure font rendering consistency across OSs.
- **Component Level**: Prefer Visual Testing at the Storybook/Component level (using Percy/Chromatic) over full page E2E screenshots.
