---
description: Transform requirements into comprehensive UI/UX design deliverables.
---

# UI/UX Design Workflow

## MCP Usage Guidelines

| MCP Tool                  | When to Use                                     |
| ------------------------- | ----------------------------------------------- |
| `mcp_context7_query-docs` | Research UI libraries (shadcn, radix, tailwind) |
| `search_web`              | Research design trends and UX patterns          |
| `generate_image`          | Create low-fi wireframes or conceptual assets   |

---

## Step 1: Deep Research

// turbo

> 💡 **MANDATORY**: Follow `.agent/rules/research.md` for visual and UX excellence.

1. **Invoke `[designer]` skill** and `search_web` to:
   - Identify "Design of the Year" level trends for the specific sector.
   - Find innovative UX patterns (micro-interactions, navigation).
   - Gather reference images/styles for the mood board.
2. Create `design-research.md` in `docs/050-Research/`.
3. **WAIT** for user to approve the creative direction.

---

## Step 2: Discovery & Context

// turbo

1. **Invoke `[designer]` skill** to:
   - Check if Design System exists in `docs/`
   - Analyze requirements/PRD
   - Determine design scope (New System vs New Feature)
2. **WAIT** for analysis result

---

## Step 3: Design System (If Needed)

// turbo

**Skip if**: Design system already exists.

> 💡 **MCP**: Use `context7` with `/tailwindcss/tailwindcss` or `/shadcn/ui` for config

1. **Invoke `[designer]` skill** to define:
   - Typography, Colors, Spacing scale
   - Component primitives (Buttons, Inputs, Cards)
   - Motion principles
2. Create/Update Design System documentation
3. **WAIT** for user approval

---

## Step 4: Component & Flow Design

// turbo

1. **Invoke `[designer]` skill** to:
   - Map user flows based on User Stories
   - Define necessary components (Reuse vs New)
   - Create component specifications
2. Create flow and component documentation
3. **WAIT** for user review

---

## Step 5: Prototyping

// turbo

> 💡 **MCP**: Use `generate_image` for visual concept validation if needed

1. **Invoke `[frontend-developer]` skill** to:
   - Build HTML/CSS prototypes in `prototype/` (keep it simple)
   - Or create interactive mockups
2. **Invoke `[designer]` skill** to:
   - Review for accessibility (Contrast, Semantic HTML)
   - Check alignment with Design System

---

## Step 6: Review & Handoff

// turbo

1. Present prototypes to user
2. Collect and apply feedback
3. Update MOC files and finalize docs
4. **Handoff**: Trigger `/implement-feature` if approved

---

## Quick Reference

| Step | Skill              | Output              |
| ---- | ------------------ | ------------------- |
| 1    | designer           | Design Research     |
| 2    | designer           | Scope analysis      |
| 3    | designer           | Design System docs  |
| 4    | designer           | Flow/Component docs |
| 5    | frontend-developer | HTML Prototypes     |
