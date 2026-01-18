---
description: Requirement Analysis Workflow (PM → BA → Architect)
---

# Requirement Analysis Workflow

Transforms a raw user request into comprehensive, validated implementation plan.

> [!IMPORTANT]
> **MANDATORY**: Read `.agent/rules/documentation.md` before creating any document.

---

## MCP Usage Guidelines

| MCP Tool                                     | When to Use                                            | Example                           |
| -------------------------------------------- | ------------------------------------------------------ | --------------------------------- |
| `mcp_sequential-thinking_sequentialthinking` | Analyze requirements, feature dependencies, trade-offs | Break down ambiguous requests     |
| `mcp_context7_resolve-library-id`            | Find library ID before querying                        | "mermaid js"                      |
| `mcp_context7_query-docs`                    | Research tech stack options, diagram syntax            | "Mermaid sequence diagram syntax" |

---

## Document Priority Order

```
Priority 0: Roadmap       ← Project Planning & Timeline
Priority 1: PRD           ← Strategic Overview
Priority 2: SDD           ← Technical Overview
Priority 3: Epics         ← Feature Breakdown
Priority 4: Use Cases     ← Functional Details
Priority 5: User Stories  ← Implementation Units
Priority 6: ADRs          ← Technical Decisions (if needed)
```

---

## Step 0: Clarification & Understanding

**Role: Product Manager**

> [!NOTE]
> This step is **MANDATORY**. Do NOT proceed without user confirmation.

> 💡 **MCP**: Use `sequential-thinking` to analyze ambiguous or complex requests

1. **Invoke `[product-manager]` skill** to:
   - Summarize understanding
   - Create clarification questions
2. Create `clarification-questions.md` artifact
3. **WAIT** for user to review and confirm

---

## Step 1: Create Roadmap

// turbo

> 💡 **MCP**: Use `sequential-thinking` for phased planning and risk assessment

1. **Invoke `[product-manager]` skill** to draft:
   - Project timeline and milestones
   - Phase breakdown (MVP, v1.0, v2.0)
   - Key deliverables per phase
2. Create `draft-roadmap.md` artifact
3. After approval → Save to `docs/010-Planning/Roadmap-{ProjectName}.md`
4. **WAIT** for user response

---

## Step 2: Create PRD

// turbo

1. **Invoke `[product-manager]` skill** to draft:
   - Business objectives and success metrics
   - Target audience/user personas
   - Feature prioritization (MoSCoW)
2. Create `draft-prd.md` artifact
3. After approval → Save to `docs/020-Requirements/PRD-{ProjectName}.md`
4. **WAIT** for user response

---

## Step 3: Create SDD

// turbo

> 💡 **MCP**:
>
> - **MUST** use `sequential-thinking` for architectural decisions
> - Use `context7` with `/vercel/next.js`, `/supabase/supabase` for tech stack research

1. **Invoke `[lead-architect]` skill** to draft:
   - High-level system architecture
   - Technology stack decisions
   - Component diagram
   - Data flow overview
2. Create `draft-sdd.md` artifact
3. After approval → Save to `docs/030-Specs/Architecture/SDD-{ProjectName}.md`
4. **WAIT** for user response

---

## Step 4: Create Epics

// turbo

> 💡 **MCP**: Use `sequential-thinking` to analyze feature dependencies

1. **Invoke `[business-analysis]` skill** to:
   - Break PRD features into Epics
   - Define high-level acceptance criteria
2. Create `draft-epics.md` artifact
3. After approval → Save to `docs/022-User-Stories/Epics/Epic-{FeatureName}.md`
4. **WAIT** for user response

---

## Step 5: Create Use Cases

// turbo

> 💡 **MCP**:
>
> - Use `sequential-thinking` for complex flow analysis
> - Use `context7` with `/mermaid-js/mermaid` for diagram syntax

1. **Invoke `[business-analysis]` skill** to detail:
   - Happy path flow
   - Alternative flows
   - Edge cases and error handling
   - Mermaid diagrams where helpful
2. Create `draft-use-cases.md` artifact
3. After approval → Save to `docs/020-Requirements/Use-Cases/UC-{NN}-{Name}.md`
4. **WAIT** for user response

---

## Step 6: Create User Stories

// turbo

> 💡 **MCP**: Use `sequential-thinking` to derive acceptance criteria

1. **Invoke `[business-analysis]` skill** to create:
   - Stories in format: "As a [role], I want [action], so that [value]"
   - Clear Acceptance Criteria
   - Complexity estimates (S/M/L)
2. Create `draft-user-stories.md` artifact
3. After approval → Save to `docs/022-User-Stories/Backlog/Story-{Name}.md`
4. **WAIT** for user response - Ask if ADRs needed

---

## Step 7: Create ADRs (Optional)

// turbo

**Skip if**: User did not request ADRs in Step 6.

> 💡 **MCP**:
>
> - Use `sequential-thinking` to evaluate trade-offs
> - Use `context7` to research technology options

1. **Invoke `[lead-architect]` skill** to document:
   - Context
   - Options considered
   - Decision made
   - Consequences
2. Save to `docs/030-Specs/Architecture/ADR-{NNN}-{Decision}.md`

---

## Step 8: Finalize & Summary

// turbo

1. **Invoke `[product-manager]` skill** to:
   - Update MOC files
   - Add project section to `docs/000-Index.md`
2. Present final summary with all created documents
3. Suggest next steps: `/ui-ux-design` or `/implement-feature`

---

## Quick Reference

| Step | Skill             | Output                     |
| ---- | ----------------- | -------------------------- |
| 0    | product-manager   | clarification-questions.md |
| 1    | product-manager   | Roadmap-{Project}.md       |
| 2    | product-manager   | PRD-{Project}.md           |
| 3    | lead-architect    | SDD-{Project}.md           |
| 4    | business-analysis | Epic-{Feature}.md          |
| 5    | business-analysis | UC-{NN}-{Name}.md          |
| 6    | business-analysis | Story-{Name}.md            |
| 7    | lead-architect    | ADR-{NNN}-{Decision}.md    |
| 8    | product-manager   | Updated MOCs               |
