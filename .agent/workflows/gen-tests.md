---
description: Generate unit, E2E, security, and performance tests using the qa-tester skill.
---

# Generate Tests Workflow

> [!IMPORTANT]
> **MANDATORY**: Apply `.agent/rules/documents.md` for all document creation and directory structure. All QA documents MUST be stored under `docs/035-QA/`.

---

## Step 1: Discovery & Strategy

// turbo

1. **Invoke `[qa-tester]` skill** to analyze the `docs/` folder and current codebase structure.
2. Ask the user which type of tests they want to generate:
   - **Unit Tests**: For specific functions or utilities (e.g., `tests/unit/`).
   - **E2E Tests**: For user flows (e.g., `tests/e2e/`).
   - **Security Tests**: For vulnerability assessments.
   - **Performance Tests**: For load and responsiveness checks.
3. Identify the specific files or features that need testing based on user input.

---

## Step 2: Test Plan & Case Generation

// turbo

1. **Invoke `[qa-tester]` skill** to create/update the Test Plan and Test Cases:
   - For **Unit Tests**: Identify edge cases, boundary conditions, and happy paths.
   - For **E2E Tests**: valid/invalid user flows.
   - For **Security**: potential injection points, auth flaws.
2. Generate the test documentation in `docs/035-QA/Test-Cases/` following the naming convention `TC-{Feature}-{NNN}.md`.
3. Create a `draft-test-docs.md` artifact with the proposed test cases for review.

---

## Step 3: Test Code Generation

1. **Wait** for user approval of the test cases.
2. **Invoke `[qa-tester]` skill** to generate the actual test code.
   - Use the project's existing testing framework (e.g., Jest, Playwright, Vitest).
   - Ensure mocks and stubs are correctly implemented for unit tests.
   - Ensure selectors and interaction steps are robust for E2E tests.
3. Save the generated test code to the appropriate directories (e.g., `tests/unit/`, `tests/e2e/`).

---

## Step 4: Verification & Reporting

1. Run the generated tests using the project's test runner.
2. If tests fail:
   - Analyze the failure.
   - **Invoke `[qa-tester]` skill** to fix the test code or report the bug if it's a real issue.
3. **Mandatory**:
   - Update `docs/035-QA/QA-MOC.md`.
   - Update `docs/000-Index.md` if needed.
