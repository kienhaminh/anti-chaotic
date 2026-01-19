---
description: Analyze ideas with the user and create preliminary high-level documents (Roadmap, PRD).
---

# Brainstorm Workflow

> [!IMPORTANT]
> **MANDATORY**: Read `.agent/rules/documents.md` before creating any document.

---

## MCP Usage Guidelines

| MCP Tool                                     | When to Use                                            | Example                                 |
| :------------------------------------------- | :----------------------------------------------------- | :-------------------------------------- |
| `mcp_sequential-thinking_sequentialthinking` | Analyze requirements, feature dependencies, trade-offs | Break down ambiguous requests           |
| `mcp_context7_resolve-library-id`            | Find library ID before querying                        | "mermaid js"                            |
| `mcp_context7_query-docs`                    | Research library patterns, APIs, best practices        | "How to setup auth in Next.js"          |
| `search_web`                                 | Proactive research for implementation patterns         | "best architecture for agentic systems" |

---

## Step 1: Deep Research

// turbo

> 💡 **MANDATORY**: Follow `.agent/rules/research.md` before starting any ideation.

1. **Invoke `[research]`** (via `search_web` + `read_url_content`) to:
   - Identify 5-10 key trends in the project's domain.
   - Find "best-in-class" examples of similar products.
   - Identify common pitfalls and modern "Wow Factors".
2. Create `research-insights.md` artifact in `docs/050-Research/`.
3. **WAIT** for user to review the research findings.

---

## Document Priority Order

```
Priority 0: Roadmap       ← Project Planning & Timeline
Priority 1: PRD           ← Strategic Overview
```

---

## Step 2: Clarification & Understanding

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

## Step 3: Create Roadmap

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

## Step 4: Create PRD

// turbo

1. **Invoke `[product-manager]` skill** to draft:
   - Business objectives and success metrics
   - Target audience/user personas
   - Feature prioritization (MoSCoW)
2. Create `draft-prd.md` artifact
3. After approval → Save to `docs/020-Requirements/PRD-{ProjectName}.md`
4. **WAIT** for user response

---

## Step 5: Transition to Documentation

1. Present summary of created artifacts (Roadmap, PRD).
2. Suggest next step: Run `/documentation` to generate detailed specifications (SDD, Epics, Stories).
