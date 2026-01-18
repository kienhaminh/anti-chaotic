---
description: [End-to-end feature implementation workflow]
---

# Feature Implementation Workflow

Orchestrates feature implementation from specification to deployment.

> [!IMPORTANT]
> **MANDATORY**: Read `.agent/rules/documentation.md` before creating any document.

---

## Tool Usage Guidelines

| Tool                        | When to Use                                       |
| --------------------------- | ------------------------------------------------- |
| `sequential-thinking` (MCP) | Complex decisions, debugging, architecture design |
| `search_web`                | Researching libraries or documentation            |
| `context7` (MCP)            | Retrieving latest library documentation           |

---

## Step 0: Quick Specification

**Skip if**: Specs already exist.

> 💡 **Tip**: Use `sequential-thinking` to analyze ambiguous requirements.

1. **Invoke `[product-manager]` skill** to clarify requirements.
2. Create `feature-spec.md` artifact.
3. **WAIT** for user confirmation.

---

## Step 1: Locate Existing Artifacts

// turbo

1. Search `docs/` for related stories/designs.
2. **Invoke `[lead-architect]` skill** to identify scope.
3. List files to create/modify.
4. **WAIT** for user to confirm scope.

---

## Step 2: Implementation Plan

// turbo

1. **Invoke `[lead-architect]` skill** to create task breakdown.
2. Create `implementation-plan.md` artifact.
3. **WAIT** for user approval.

---

## Step 3: Design Review (Optional)

// turbo

**Skip if**: Backend only.

1. Check `docs/040-Design/`.
2. **Invoke `[designer]` skill** for component specs.
3. **WAIT** for user confirmation.

---

## Step 4: Backend Implementation

// turbo

1. **Invoke `[backend-developer]` skill** for:
   - Schema/Migrations
   - API endpoints
   - Tests
2. **WAIT** for user checkpoint.

---

## Step 5: Frontend Implementation

// turbo

1. **Invoke `[frontend-developer]` skill** for:
   - Components
   - Integration
   - Tests
2. **WAIT** for user checkpoint.

---

## Step 6: QA & Finalize

// turbo

1. **Invoke `[qa-tester]` skill** for E2E tests.
2. **Invoke `[lead-architect]` skill** to update docs/MOC.
3. Present completion summary.

---

## Quick Reference

| Step | Skill              | Output                 |
| ---- | ------------------ | ---------------------- |
| 0    | product-manager    | feature-spec.md        |
| 1-2  | lead-architect     | implementation-plan.md |
| 3    | designer           | Component specs        |
| 4    | backend-developer  | API, Tests             |
| 5    | frontend-developer | Components, Tests      |
| 6    | qa-tester          | qa-report.md           |
