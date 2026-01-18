---
trigger: model_decision
description: Always run tests to ensure no regressions when implementing new features or fixing bugs
---

# Testing and Regression Rule

> [!IMPORTANT]
> This rule is **MANDATORY** when implementing new features, fixing bugs, or performing major refactors. Ensuring system stability is a top priority.

## Critical Rules (MUST Follow)

1. **MUST** run existing tests before starting any work to establish a baseline.
2. **MUST** run tests after completing changes to ensure no regressions were introduced.
3. **MUST** add new tests for any new features implemented.
4. **MUST** add reproduction tests for any bug fixes to ensure the bug does not return.
5. **MUST** report test results (pass/fail) in the task summary and walkthrough.
6. **MUST NOT** proceed to finalize a task if tests are failing, unless explicitly instructed by the user after explaining the failure and its impact.

## Decision Flow

```
┌─────────────────────────────────────────────────────────────┐
│ WHEN implementing a feature or fixing a bug:                │
├─────────────────────────────────────────────────────────────┤
│ 1. Run baseline tests.                                      │
│    Are they passing?                                        │
│    NO  → Notify user of existing failures before proceeding. │
│    YES → Continue.                                          │
├─────────────────────────────────────────────────────────────┤
│ 2. Implement changes (Feature/Fix/Refactor).                │
├─────────────────────────────────────────────────────────────┤
│ 3. Add/Update tests for the new code.                       │
├─────────────────────────────────────────────────────────────┤
│ 4. Run ALL relevant tests.                                  │
│    Are they passing?                                        │
│    NO  → Analyze failures, fix code/tests, repeat step 4.   │
│    YES → Continue.                                          │
├─────────────────────────────────────────────────────────────┤
│ 5. Document test results in Walkthrough/Task Summary.       │
└─────────────────────────────────────────────────────────────┘
```

## Running Tests

- Use `npm test` to run the test suite.
- For specific tests, use `npm test -- <path_to_test_file>`.
- If the project uses a different test runner (e.g., `pytest`, `jest`, `vitest`), adapt the command accordingly based on `package.json` or project documentation.

## What to do on Failure

1. **Analyze logs**: Look for the specific assertion failure or error message.
2. **Determine Root Cause**: Is it a bug in the code, a bug in the test, or a change in requirements?
3. **Fix and Re-run**: Apply the necessary fix and run the tests again.
4. **Communicate**: If a failure is expected or cannot be fixed easily, notify the user with a detailed explanation.
