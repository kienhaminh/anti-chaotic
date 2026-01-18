---
description: Transform requirement into UI/UX design (System → Components → Prototypes)
---

# UI/UX Design Workflow

Transform requirements into comprehensive UI/UX design deliverables.

> [!IMPORTANT]
> **MANDATORY**: Apply `.agent/rules/documentation.md` for all documentation structure.

---

## MCP Usage Guidelines

| MCP Tool                  | When to Use                                     |
| ------------------------- | ----------------------------------------------- |
| `mcp_context7_query-docs` | Research UI libraries (shadcn, radix, tailwind) |
| `generate_image`          | Create low-fi wireframes or conceptual assets   |

---

## Step 0: Discovery & Context

// turbo

1. **Invoke `[designer]` skill** to:
   - Check if Design System exists in `docs/`
   - Analyze requirements/PRD
   - Determine design scope (New System vs New Feature)
2. **WAIT** for analysis result

---

## Step 1: Design System (If Needed)

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

## Step 2: Component & Flow Design

// turbo

1. **Invoke `[designer]` skill** to:
   - Map user flows based on User Stories
   - Define necessary components (Reuse vs New)
   - Create component specifications
2. Create flow and component documentation
3. **WAIT** for user review

---

## Step 3: Prototyping

// turbo

> 💡 **MCP**: Use `generate_image` for visual concept validation if needed

1. **Invoke `[frontend-developer]` skill** to:
   - Build HTML/CSS prototypes in `prototype/` (keep it simple)
   - Or create interactive mockups
2. **Invoke `[designer]` skill** to:
   - Review for accessibility (Contrast, Semantic HTML)
   - Check alignment with Design System

---

## Step 4: Review & Handoff

// turbo

1. Present prototypes to user
2. Collect and apply feedback
3. Update MOC files and finalize docs
4. **Handoff**: Trigger `/implement-feature` if approved

---

## Quick Reference

| Step | Skill              | Output              |
| ---- | ------------------ | ------------------- |
| 0    | designer           | Scope analysis      |
| 1    | designer           | Design System docs  |
| 2    | designer           | Flow/Component docs |
| 3    | frontend-developer | HTML Prototypes     |
