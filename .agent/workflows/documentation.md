---
description: Generate comprehensive documentation (Architecture, API, Specs) from either Codebase or Requirements.
---

# Documentation Workflow

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
3. **Clarify & Confirm**:
   - **CRITICAL**: If the codebase structure is unclear or ambiguous, **ASK** the user for clarification.
   - Summarize findings and **WAIT** for user to confirm understanding

---

## Step A2: Technical Documentation (Architecture, API, Schema)

// turbo

1. **Invoke `[lead-architect]` skill** to create:
   - System Context (C4 Context Diagram)
   - Component View (C4 Component Diagram)
   - **Sequence Diagrams** for critical business flows
2. **Invoke `[backend-developer]` skill** to:
   - Document API endpoints (OpenAPI/Swagger styled)
   - Generate Entity Relationship Diagram (ERD)
   - Document key algorithms or data processing pipelines
3. Save to `docs/030-Specs/` and `docs/030-Specs/Architecture/`

---

## Step A3: Functional Documentation (Reverse Engineering)

// turbo

**Objective**: Derive business logic and requirements from the existing implementation.

1. **Invoke `[business-analysis]` skill** to:
   - Analyze the codebase (controllers, services, frontend views) to understand user flows.
   - **Reverse Engineer** the PRD/Functional Specs:
     - Identify high-level Epics.
     - Document implied User Stories & Acceptance Criteria.
     - Create Use Case definitions for main features.
2. **Draft Artifacts**:
   - `docs/020-Requirements/Reverse-Engineered-Specs.md`
   - `docs/022-User-Stories/Implied-User-Stories.md`
3. **Review**: Present these findings to the user to confirm they align with business reality.

---

## Step A4: Operational & Quality Documentation

// turbo

**Objective**: Document how to run, test, and deploy the system.

1. **Invoke `[devops-engineer]` skill** to create:
   - **Infrastructure**: Document cloud resources, Docker setup (`docs/030-Specs/Architecture/Infrastructure.md`).
   - **Deployment**: CI/CD pipelines and release process (`docs/030-Specs/Architecture/Deployment.md`).
   - **Configuration**: Environment variables reference (`docs/030-Specs/Configuration.md`).
2. **Invoke `[qa-tester]` skill** to create:
   - **Test Strategy**: Overview of testing tools and approach (`docs/035-QA/Test-Plans/Strategy.md`).
   - **Coverage Report**: Summary of current test coverage and gaps (`docs/035-QA/Reports/Coverage.md`).
3. **Invoke `[backend-developer]` skill** to create/update:
   - **Onboarding**: `docs/060-Manuals/Admin-Guide/Setup-Guide.md` (Prerequisites, installation, running locally).
   - **Scripts**: Document usage of `package.json` scripts (`docs/060-Manuals/Admin-Guide/Scripts.md`).

---

## Step A5: Project Planning & Strategy

// turbo

**Objective**: Establish high-level strategy and roadmap based on current state.

1. **Invoke `[product-manager]` skill** to:
   - **Analyze Maturity**: Assess current feature set against typical market standards.
   - **Reverse Engineer Roadmap**: Draft `docs/010-Planning/Roadmap.md` based on implemented vs. missing features.
   - **Define Objectives**: Draft `docs/010-Planning/OKRs.md` (Objectives and Key Results) aligned with the project's apparent direction.
   - **Status Report**: Create a snapshot of current progress (`docs/010-Planning/Sprints/Current-Status.md`).
2. **Review**: Present these strategic documents to the user for alignment.

---

# MODE B: From Requirements

**Prerequisite**: Existing PRD (from `/brainstorm`).

## Step B1: Create SDD (System Design Document)

// turbo

> 💡 **MCP**:
>
> - **MUST** use `sequential-thinking` for architectural decisions
> - Use `context7` with `/vercel/next.js`, `/supabase/supabase` for tech stack research

1. **Analyze Requirements**: Review the PRD/Roadmap. If there are ambiguities, **ASK** the user to clarify.
2. **Invoke `[lead-architect]` skill** to draft:
   - High-level system architecture
   - Technology stack decisions
   - Component diagram
   - Data flow overview
3. Create `draft-sdd.md` artifact
4. After approval → Save to `docs/030-Specs/Architecture/SDD-{ProjectName}.md`

---

## Step B2: Create Epics & Use Cases

// turbo

1. **Invoke `[business-analysis]` skill** to:
   - Break PRD features into Epics (`docs/022-User-Stories/Epics/`)
   - Define Use Cases with Mermaid diagrams (`docs/020-Requirements/Use-Cases/`)
   - **Note**: If requirements are vague, ask for clarification.
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
