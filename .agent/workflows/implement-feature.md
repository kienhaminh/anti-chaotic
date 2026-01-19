---
description: Orchestrates feature implementation from specification to deployment.
---

# Feature Implementation Workflow

> [!IMPORTANT]
> **MANDATORY**: Read `.agent/rules/documents.md` before creating any document.

---

## MCP Usage Guidelines

| MCP Tool                                     | When to Use                                       | Example Query                       |
| -------------------------------------------- | ------------------------------------------------- | ----------------------------------- |
| `mcp_sequential-thinking_sequentialthinking` | Complex decisions, debugging, architecture design | Break down feature into tasks       |
| `mcp_context7_resolve-library-id`            | Find library ID before querying docs              | "react hook form"                   |
| `mcp_context7_query-docs`                    | Research UI libraries (shadcn, radix, tailwind)   |
| `search_web`                                 | Research design trends and UX patterns            | "modern SaaS dashboard trends 2026" |
| `generate_image`                             | Create low-fi wireframes or conceptual assets     |

---

## Step 1: Deep Research

// turbo

> 💡 **MANDATORY**: Follow `.agent/rules/research.md` to ensure modern implementation.

1. **Invoke `[research]`** to:
   - Find the most efficient/modern patterns for the requested feature.
   - Check for recent updates in libraries used (Next.js, Prisma, etc.).
   - Identify potential scaling or security issues related to the implementation.
2. Update/Create research documentation in `docs/050-Research/`.
3. **WAIT** for user to review if new critical insights are found.

---

## Step 2: Quick Specification (Optional)

**Skip if**: User Stories or specs already exist in `docs/`.

> 💡 **MCP**: Use `sequential-thinking` to analyze ambiguous requirements

1. **Invoke `[product-manager]` skill** to clarify requirements
2. Create `feature-spec.md` artifact with: Goal, User, Acceptance Criteria
3. **WAIT** for user confirmation

---

## Step 3: Locate Existing Artifacts

// turbo

> 💡 **MCP**: Use `context7` to research unfamiliar tech in existing codebase

1. Search `docs/` for related: User Stories, SDD, Designs
2. **Invoke `[lead-architect]` skill** to identify scope and dependencies
3. List files to create/modify
4. **WAIT** for user to confirm scope

---

## Step 4: Implementation Plan

// turbo

> 💡 **MCP**: **MUST** use `sequential-thinking` to break down complex features into atomic tasks

1. **Invoke `[lead-architect]` skill** to create task breakdown
2. Create `implementation-plan.md` artifact with phased tasks
3. Save to `docs/050-Tasks/Task-{FeatureName}.md` after approval
4. **WAIT** for user approval

---

## Step 5: Design Review (If UI Feature)

// turbo

**Skip if**: Feature is purely backend/API.

> 💡 **MCP**: Use `context7` with `/radix-ui/*` or `/shadcn/*` for component patterns

1. Check `docs/040-Design/` for existing designs
2. **Invoke `[designer]` skill** for new component specifications
3. **WAIT** for user confirmation

---

## Step 6: Backend Implementation

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

## Step 7: Frontend Implementation

// turbo

> 💡 **MCP**: Use `context7` with `/vercel/next.js`, `/tanstack/react-query`, `/react-hook-form/*` for patterns

1. **Invoke `[frontend-developer]` skill** for:
   - Components following design specs
   - State management
   - Component tests
2. **WAIT** for user checkpoint

---

## Step 8: Integration & QA

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

## Step 9: Finalize

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
| 1    | research           | research-insights.md   |
| 2    | product-manager    | feature-spec.md        |
| 3-4  | lead-architect     | implementation-plan.md |
| 5    | designer           | Component specs        |
| 6    | backend-developer  | API, Models, Tests     |
| 7    | frontend-developer | Components, Tests      |
| 8    | qa-tester          | qa-report.md           |
| 9    | lead-architect     | Updated docs           |
