---
description: Requirement Analysis Workflow (PM -> BA -> Architect)
---

# Requirement Analysis Workflow

This workflow orchestrates the **Product Manager**, **Business Analyst**, and **Lead Architect** skills to transform a raw user request into a comprehensive, validated implementation plan.

> [!IMPORTANT]
> **MANDATORY**: Before creating any document, read and apply `.agent/rules/documentation.md`.

---

## Artifact Usage Guidelines

> [!TIP]
> **Use artifacts proactively** for user review and commenting:
>
> - **Clarification questions** → Create artifact so user can review/comment before answering
> - **Document drafts** → Create artifact first for user review, then save to `docs/` after approval
> - **Tables and checklists** → Use artifacts for easy inline commenting
> - **Tooling** → You MUST use the `write_to_file` tool to create these artifacts.

---

## Document Priority Order

Documents are created from **high-level overview** to **detailed specifics**:

```
Priority 0: Roadmap                                  ← Project Planning & Timeline
Priority 1: PRD (Product Requirements Document)     ← Strategic Overview
Priority 2: SDD (System Design Document)            ← Technical Overview
Priority 3: Epics                                   ← Feature Breakdown
Priority 4: Use Cases                               ← Functional Details
Priority 5: User Stories                            ← Implementation Units
Priority 6: ADRs (if needed)                        ← Technical Decisions
```

---

## Step 0: Clarification & Understanding

**Role: Product Manager**

> [!NOTE]
> This step is **MANDATORY**. Do NOT proceed without user confirmation.

1.  **Summarize Understanding**: Paraphrase the user's request in your own words.
2.  **Create Clarification Artifact**: Present questions in an artifact for easy review:

    **→ Execute `write_to_file` to create artifact: `clarification-questions.md`**

    ```markdown
    # Project Clarification Questions

    ## Understanding Summary

    - **Project**: {ProjectName}
    - **Goal**: {one-line summary}
    - **Target Users**: {who}

    ## Key Features Identified

    - [ ] {feature1}
    - [ ] {feature2}
    - [ ] {feature3}

    ## Questions for Clarification

    | #   | Question                                            | Your Answer |
    | --- | --------------------------------------------------- | ----------- |
    | 1   | What is the primary problem you're trying to solve? |             |
    | 2   | Who is the target user/audience?                    |             |
    | 3   | What does success look like?                        |             |
    | 4   | Any constraints (time, budget, tech stack)?         |             |
    | 5   | Any existing systems to integrate with?             |             |

    ## Confirmation

    - [ ] Understanding is correct
    - [ ] Ready to proceed
    ```

3.  **WAIT** for user to review artifact and confirm.

---

## Step 1: Create Roadmap (Project Planning)

**Role: Product Manager**
// turbo

> After completing, **ASK user** before proceeding to Step 2.

1.  **Draft Roadmap**: Define "When" and project phases
    - Project timeline and milestones
    - Phase breakdown (MVP, v1.0, v2.0, etc.)
    - Key deliverables per phase
    - Dependencies and risks
2.  **Create Draft Artifact**:
    - **→ Execute `write_to_file` to create artifact: `draft-roadmap.md`** for user review
3.  **After User Approval**:
    - **Save to**: `docs/010-Planning/Roadmap-{ProjectName}.md`
4.  **Present to User**:

    ```
    ✅ ROADMAP CREATED
    ──────────────────
    📝 Draft: artifact `draft-roadmap.md` (review & comment)
    📄 Final: docs/010-Planning/Roadmap-{ProjectName}.md

    👉 Review the draft. When ready:
       [Approve & Continue / Request Changes / Stop Here]
    ```

5.  **WAIT** for user response.

---

## Step 2: Create PRD (Strategic Overview)

**Role: Product Manager**
// turbo

> After completing, **ASK user** before proceeding to Step 3.

1.  **Draft PRD**: Define the "Why" and "What"
    - Business objectives and success metrics
    - Target audience/user personas
    - Feature prioritization (MoSCoW)
2.  **Create Draft Artifact**:
    - **→ Execute `write_to_file` to create artifact: `draft-prd.md`** for user review
3.  **After User Approval**:
    - **Save to**: `docs/020-Requirements/PRD-{ProjectName}.md`
4.  **Present to User**:

    ```
    ✅ PRD DRAFTED
    ──────────────
    📝 Draft: artifact `draft-prd.md` (review & comment)
    📄 Final: docs/020-Requirements/PRD-{ProjectName}.md

    👉 Review the draft. When ready:
       [Approve & Continue / Request Changes / Stop Here]
    ```

5.  **WAIT** for user response.

---

## Step 3: Create SDD (Technical Overview)

**Role: Lead Architect**
// turbo

> After completing, **ASK user** before proceeding to Step 4.

1.  **Draft SDD**: Define the "Technical How"
    - High-level system architecture
    - Technology stack decisions
    - Component diagram
    - Data flow overview
2.  **Create Draft Artifact**:
    - **→ Execute `write_to_file` to create artifact: `draft-sdd.md`** for user review
3.  **After User Approval**:
    - **Save to**: `docs/030-Specs/Architecture/SDD-{ProjectName}.md`
4.  **Present to User**:

    ```
    ✅ SDD DRAFTED
    ──────────────
    📝 Draft: artifact `draft-sdd.md` (review & comment)
    📄 Final: docs/030-Specs/Architecture/SDD-{ProjectName}.md

    👉 Review the draft. When ready:
       [Approve & Continue / Request Changes / Stop Here]
    ```

5.  **WAIT** for user response.

---

## Step 4: Create Epics (Feature Breakdown)

**Role: Business Analyst**
// turbo

> After completing, **ASK user** before proceeding to Step 5.

1.  **Draft Epics**: Break PRD features into Epics
    - One Epic per major feature/module
    - Include high-level acceptance criteria
2.  **Create Draft Artifacts**:
    - **→ Execute `write_to_file` to create artifact: `draft-epics.md`** containing all Epics for user review
3.  **After User Approval**:
    - **Save to**: `docs/022-User-Stories/Epics/Epic-{FeatureName}.md` (one file per Epic)
4.  **Present to User**:

    ```
    ✅ EPICS DRAFTED
    ────────────────
    📝 Draft: artifact `draft-epics.md` (review & comment)
    📄 Final: {N} files in docs/022-User-Stories/Epics/

    👉 Review the draft. When ready:
       [Approve & Continue / Request Changes / Stop Here]
    ```

5.  **WAIT** for user response.

---

## Step 5: Create Use Cases (Functional Details)

**Role: Business Analyst**
// turbo

> After completing, **ASK user** before proceeding to Step 6.

1.  **Draft Use Cases**: Detail each Epic's functionality
    - Happy path flow
    - Alternative flows
    - Edge cases and error handling
    - Include Mermaid diagrams where helpful
2.  **Create Draft Artifacts**:
    - **→ Execute `write_to_file` to create artifact: `draft-use-cases.md`** for user review
3.  **After User Approval**:
    - **Save to**: `docs/020-Requirements/Use-Cases/UC-{NN}-{Name}.md`
4.  **Present to User**:

    ```
    ✅ USE CASES DRAFTED
    ────────────────────
    📝 Draft: artifact `draft-use-cases.md` (review & comment)
    📄 Final: {N} files in docs/020-Requirements/Use-Cases/

    👉 Review the draft. When ready:
       [Approve & Continue / Request Changes / Stop Here]
    ```

5.  **WAIT** for user response.

---

## Step 6: Create User Stories (Implementation Units)

**Role: Business Analyst**
// turbo

> After completing, **ASK user** if ADRs are needed.

1.  **Draft User Stories**: Break Use Cases into dev-ready stories
    - Follow format: "As a [role], I want [action], so that [value]"
    - Include clear Acceptance Criteria
    - Estimate complexity (S/M/L)
2.  **Create Draft Artifacts**:
    - **→ Execute `write_to_file` to create artifact: `draft-user-stories.md`** for user review
3.  **After User Approval**:
    - **Save to**: `docs/022-User-Stories/Backlog/Story-{Name}.md`
4.  **Present to User**:

    ```
    ✅ USER STORIES DRAFTED
    ───────────────────────
    📝 Draft: artifact `draft-user-stories.md` (review & comment)
    📄 Final: {N} files in docs/022-User-Stories/Backlog/

    👉 Review the draft. When ready:
       [Approve & Continue / Request Changes / Stop Here]

    💡 Any technical decisions that need ADRs?
       (e.g., database choice, auth strategy, API design)
    ```

5.  **WAIT** for user response.

---

## Step 7: Create ADRs (Technical Decisions) - Optional

**Role: Lead Architect**
// turbo

> Only if user requested ADRs in Step 6.

1.  **Identify Decisions**: List technical decisions that need documentation
2.  **Create ADRs**: For each decision:
    - Context
    - Options considered
    - Decision made
    - Consequences
3.  **Output**:
    - **Files**: `docs/030-Specs/Architecture/ADR-{NNN}-{Decision}.md`

---

## Step 8: Finalize & Summary

**Role: Product Manager**
// turbo

1.  **Update MOC Files**: Ensure all MOCs reference new documents
2.  **Update Index**: Add project section to `docs/000-Index.md`
3.  **Present Final Summary**:

    ```
    ✅ REQUIREMENT ANALYSIS COMPLETE
    ════════════════════════════════

    📁 Documents Created:
    ├── Roadmap: docs/010-Planning/Roadmap-{ProjectName}.md
    ├── PRD: docs/020-Requirements/PRD-{ProjectName}.md
    ├── SDD: docs/030-Specs/Architecture/SDD-{ProjectName}.md
    ├── Epics: {N} files in docs/022-User-Stories/Epics/
    ├── Use Cases: {N} files in docs/020-Requirements/Use-Cases/
    ├── Stories: {N} files in docs/022-User-Stories/Backlog/
    └── ADRs: {N} files in docs/030-Specs/Architecture/ (if any)

    📋 Updated MOCs:
    ├── docs/010-Planning/Planning-MOC.md
    ├── docs/020-Requirements/Requirements-MOC.md
    ├── docs/022-User-Stories/Stories-MOC.md
    └── docs/030-Specs/Specs-MOC.md

    🚀 Next Steps:
    1. Review documents for accuracy
    2. Run /ui-ux-design-from-doc for design phase
    3. Move Stories to Active-Sprint when ready
    ```

---

## Quick Reference

> 📖 For detailed folder structure and naming conventions, see `.agent/rules/documentation.md`
