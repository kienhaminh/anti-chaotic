---
description: Generate comprehensive documentation (Architecture, API, Specs) from either Codebase or Requirements.
---

# Documentation Workflow

> [!IMPORTANT]
> **MANDATORY**: Apply `.agent/rules/documents.md` for all document creation.

---

## MCP Usage Guidelines

| MCP Tool                                     | When to Use                                    |
| :------------------------------------------- | :--------------------------------------------- |
| `mcp_sequential-thinking_sequentialthinking` | Analyze complex architecture, design decisions |
| `mcp_context7_query-docs`                    | Research framework patterns, diagram syntax    |

---

## Step 0: Determine Mode

**Determine the source of truth:**

1. **From Codebase**: Reverse engineer docs from existing code.
2. **From Requirements**: Forward engineer detailed specs (SDD, Stories) from PRD/Roadmap.

---

# MODE A: From Codebase

## Step A1: Codebase Discovery

// turbo

> 💡 **MCP**: Use `sequential-thinking` to analyze unfamiliar project structures

1. **Invoke `[lead-architect]` skill** to analyze codebase structure
2. Identify: tech stack, entry points, API routes, DB schemas
3. **WAIT** for user to confirm understanding

---

## Step A2: Legacy Docs Generation (Architecture, API, Schema)

// turbo

1. **Invoke `[lead-architect]` skill** to create:
   - System Context (C4 Context Diagram)
   - Component View (C4 Component Diagram)
2. **Invoke `[backend-developer]` skill** to:
   - Document API endpoints
   - Generate Entity Relationship Diagram (ERD)
3. Save to `docs/030-Specs/` and `docs/030-Specs/Architecture/`

---

# MODE B: From Requirements

**Prerequisite**: Existing PRD (from `/brainstorm`).

## Step B1: Create SDD (System Design Document)

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

---

## Step B2: Create Epics & Use Cases

// turbo

1. **Invoke `[business-analysis]` skill** to:
   - Break PRD features into Epics (`docs/022-User-Stories/Epics/`)
   - Define Use Cases with Mermaid diagrams (`docs/020-Requirements/Use-Cases/`)
2. Create artifacts for review before saving

---

## Step B3: Create User Stories

// turbo

1. **Invoke `[business-analysis]` skill** to create:
   - User Stories with Acceptance Criteria (`docs/022-User-Stories/Backlog/`)
   - Complexity estimates
2. Create `draft-user-stories.md` artifact
3. After approval → Save

---

## Step B4: Create ADRs (Optional)

// turbo

**Skip if**: User did not request ADRs.

1. **Invoke `[lead-architect]` skill** to document technical decisions.
2. Save to `docs/030-Specs/Architecture/ADR-{NNN}-{Decision}.md`

---

# Finalize

## Step X: Finalize

// turbo

1. Create/update MOC files
2. Validate wiki-links and frontmatter
3. Present summary and suggest next steps (`/ui-ux-design` or `/implement-feature`)
