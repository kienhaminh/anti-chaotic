---
description: End-to-end feature implementation workflow (Spec → Design → Code → Test → Deploy)
---

# Feature Implementation Workflow

Orchestrates feature implementation from specification to deployment.

> [!IMPORTANT]
> **MANDATORY**: Read `.agent/rules/documentation.md` before creating any document.

---

## MCP Usage Guidelines

| MCP Tool                                     | When to Use                                       | Example Query                  |
| -------------------------------------------- | ------------------------------------------------- | ------------------------------ |
| `mcp_sequential-thinking_sequentialthinking` | Complex decisions, debugging, architecture design | Break down feature into tasks  |
| `mcp_context7_resolve-library-id`            | Find library ID before querying docs              | "react hook form"              |
| `mcp_context7_query-docs`                    | Research library patterns, APIs, best practices   | "How to setup auth in Next.js" |

---

## Step 0: Quick Specification (Optional)

**Skip if**: User Stories or specs already exist in `docs/`.

> 💡 **MCP**: Use `sequential-thinking` to analyze ambiguous requirements

1. **Invoke `[product-manager]` skill** to clarify requirements
2. Create `feature-spec.md` artifact with: Goal, User, Acceptance Criteria
3. **WAIT** for user confirmation

---

## Step 1: Locate Existing Artifacts

// turbo

> 💡 **MCP**: Use `context7` to research unfamiliar tech in existing codebase

1. Search `docs/` for related: User Stories, SDD, Designs
2. **Invoke `[lead-architect]` skill** to identify scope and dependencies
3. List files to create/modify
4. **WAIT** for user to confirm scope

---

## Step 2: Implementation Plan

// turbo

> 💡 **MCP**: **MUST** use `sequential-thinking` to break down complex features into atomic tasks

1. **Invoke `[lead-architect]` skill** to create task breakdown
2. Create `implementation-plan.md` artifact with phased tasks
3. Save to `docs/050-Tasks/Task-{FeatureName}.md` after approval
4. **WAIT** for user approval

---

## Step 3: Design Review (If UI Feature)

// turbo

**Skip if**: Feature is purely backend/API.

> 💡 **MCP**: Use `context7` with `/radix-ui/*` or `/shadcn/*` for component patterns

1. Check `docs/040-Design/` for existing designs
2. **Invoke `[designer]` skill** for new component specifications
3. **WAIT** for user confirmation

---

## Step 4: Backend Implementation

// turbo

> 💡 **MCP**:
>
> - Use `context7` with `/supabase/supabase`, `/prisma/prisma` for DB patterns
> - Use `sequential-thinking` for complex business logic

1. **Invoke `[backend-developer]` skill** for:
   - Data models/migrations
   - API endpoints/server functions
   - Unit tests (TDD approach)
2. Run tests and verify
3. **WAIT** for user checkpoint

---

## Step 5: Frontend Implementation

// turbo

> 💡 **MCP**: Use `context7` with `/vercel/next.js`, `/tanstack/react-query`, `/react-hook-form/*` for patterns

1. **Invoke `[frontend-developer]` skill** for:
   - Components following design specs
   - State management
   - Component tests
2. **WAIT** for user checkpoint

---

## Step 6: Integration & QA

// turbo

> 💡 **MCP**:
>
> - Use `context7` with `/vitest-dev/vitest`, `/playwright/*` for testing patterns
> - Use `sequential-thinking` to analyze test failures

1. **Invoke `[qa-tester]` skill** for:
   - E2E test execution
   - Acceptance criteria verification
   - Edge case testing
2. Create `qa-report.md` artifact
3. **WAIT** for user to confirm ready

---

## Step 7: Finalize

// turbo

1. **Invoke `[lead-architect]` skill** to:
   - Update MOC files
   - Move task to `docs/050-Tasks/Completed/`
   - Update API/changelog if applicable
2. Present completion summary with next steps

---

## Quick Reference

| Step | Skill              | Output                 |
| ---- | ------------------ | ---------------------- |
| 0    | product-manager    | feature-spec.md        |
| 1-2  | lead-architect     | implementation-plan.md |
| 3    | designer           | Component specs        |
| 4    | backend-developer  | API, Models, Tests     |
| 5    | frontend-developer | Components, Tests      |
| 6    | qa-tester          | qa-report.md           |
| 7    | lead-architect     | Updated docs           |
