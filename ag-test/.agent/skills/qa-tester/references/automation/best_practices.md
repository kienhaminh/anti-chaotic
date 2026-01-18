# Automation Best Practices

## Self-Healing & Resilience

- **Dynamic Waiting**: Never use fixed delays like `sleep(1000)`. Use assertion-based waiting (e.g., `findBy`, `waitFor`).
- **Resilient Selectors**:
  - ❌ Avoid: `div > div > button.red`
  - ✅ Prefer: `role="button"` or `data-testid="submit-order"`
- **TestIDs**: Enforce a strict `data-testid` policy for elements that lack semantic roles.

## Flakiness Prevention

- **Isolation**: Each test must create its own data and clean it up.
- **Environment**: Do not rely on shared staging environments if possible; mock or use ephemeral DBs.
