---
description: Analyze ideas with the user and create preliminary high-level documents (Roadmap, PRD).
---

# Brainstorm Workflow

## MCP Usage Guidelines

| MCP Tool                                     | When to Use                                            | Example                                 |
| :------------------------------------------- | :----------------------------------------------------- | :-------------------------------------- |
| `mcp_sequential-thinking_sequentialthinking` | Analyze requirements, feature dependencies, trade-offs | Break down ambiguous requests           |
| `mcp_context7_query-docs`                    | Research library patterns, APIs, best practices        | "How to setup auth in Next.js"          |
| `search_web`                                 | Proactive research for implementation patterns         | "best architecture for agentic systems" |

---

## Step 1: Iterative Requirement Analysis & Research

> [!IMPORTANT]
> **LOOP THIS STEP**: You must cycle through the following sub-steps until the user's requirements are crystal clear and you have sufficient information to build high-quality documents.

**Goal**: Achieve a "Shared Understanding" with the user.

1. **Analyze (Internal)**:
   - Use `mcp_sequential-thinking_sequentialthinking` to breakdown the request and brainstorm solutions.
   - Explore different angles, edge cases, and creative possibilities.
   - Identify gaps in logic, missing features, or ambiguous terms.
   - Formulate specific search queries to fill knowledge gaps.

2. **Research (External)**:
   - Use `search_web` (and `read_url_content` if specific URLs are found) to:
     - Understand domain-specific terms or competitors.
     - Find "best practices" or "standard implementations" for the requested features.
     - Verify technical feasibility.

3. **Clarify (Interaction)**:
   - Based on Analysis and Research, summarize findings.
   - Create an Antigravity Implement Plan Artifact containing:
     - Summary of current understanding.
     - Specific questions to resolve ambiguities (e.g., "For feature Y, do you prefer approach A or B?").
     - Assumptions that need confirmation.
   - **Ask User**: Present the artifact and ask the user to review and answer the questions.
   - **WAIT** for user response.

4. **Evaluation**:
   - If the user provides new info, **GO TO STEP 1.1** (Repeat Loop).
   - If the user confirms "Everything is clear" or "Looks good, proceed", **BREAK LOOP** and go to Step 2.

---

## Document Priority Order

```
Priority 0: Roadmap       ← Project Planning & Timeline
Priority 1: PRD           ← Strategic Overview
```

---

## Step 2: Create Roadmap

// turbo

> 💡 **MCP**: Use `sequential-thinking` for phased planning and risk assessment based on the "Clear Requirements" from Step 1.

1. **Invoke `[product-manager]` skill** to draft:
   - Project timeline and milestones
   - Phase breakdown (MVP, v1.0, v2.0)
   - Key deliverables per phase
2. Create `draft-roadmap.md` artifact
3. After approval → Save to `docs/010-Planning/Roadmap-{ProjectName}.md` (Ask user for ProjectName if unknown)
4. **WAIT** for user response

---

## Step 3: Create PRD

// turbo

1. **Invoke `[product-manager]` skill** to draft:
   - Business objectives and success metrics
   - Target audience/user personas
   - Feature prioritization (MoSCoW)
   - Technical constraints (identified during Research loop)
2. Create `draft-prd.md` artifact
3. After approval → Save to `docs/020-Requirements/PRD-{ProjectName}.md`
4. **WAIT** for user response

---

## Step 4: Transition to Documentation

1. Present summary of created artifacts (Roadmap, PRD).
2. Suggest next step: Run `/documentation` to generate detailed specifications (SDD, Epics, Stories).
