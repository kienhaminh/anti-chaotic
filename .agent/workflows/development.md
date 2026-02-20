---
description: General coding workflow for implementing changes, bug fixes, or minor features.
---

# Development Workflow

## Step 1: Analyze & Plan

// turbo

1. Understand the requirement or bug report.
2. **MUST** use `mcp_sequential-thinking_sequentialthinking` to:
   - Analyze the existing code structure.
   - Design the solution.
   - Identify potential edge cases and impacts.
3. If the task is complex, create an `implementation_plan.md` artifact.
4. **WAIT** for user confirmation if the plan involves major architectural changes.

---

## Step 2: Execute Code Changes

// turbo

1. Implement the planned changes iteratively.
2. **Backend**: Update models, logic, and APIs as needed.
3. **Frontend**: Update UI components and state management.
4. Ensure code follows project standards and linting rules.

---

## Step 3: Verify & Test

// turbo

1. Run existing tests to ensure no regressions.
2. Add new unit or integration tests for the changes.
3. Perform manual verification (e.g., using the browser tool for UI changes).
4. **MUST** document proof of work in a `walkthrough.md` artifact if the change is significant.

---

## Step 4: Finalize

// turbo

1. Update related documentation (MOCs, API specs, etc.).
2. Clean up any temporary files or comments.
3. Present a summary of changes and verification results.
