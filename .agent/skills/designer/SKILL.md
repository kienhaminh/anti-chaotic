---
name: designer
description: Expert designer (20+ years). Create distinctive interfaces OR review for compliance. Use when building UI, branding, design systems, or auditing accessibility/UX.
---

# Frontend Design Expert

Expert-level design guidance for creating memorable, production-grade interfaces.

## References

Load references based on task context:

| Reference      | Path                           | Purpose                                           |
| -------------- | ------------------------------ | ------------------------------------------------- |
| Branding       | `references/branding.md`       | Creating logos, visual identity, brand guidelines |
| Color Theory   | `references/color-theory.md`   | Choosing palettes, dark mode, semantic colors     |
| Typography     | `references/typography.md`     | Font pairing, scales, text rendering              |
| Layout         | `references/layout.md`         | Grids, spacing, responsive design                 |
| Motion         | `references/motion.md`         | Micro-interactions, transitions, performance      |
| Accessibility  | `references/accessibility.md`  | WCAG compliance, keyboard nav, screen readers     |
| Design Systems | `references/design-systems.md` | Design tokens, component patterns, documentation  |
| Trends         | `references/trends.md`         | 2024-2025 trends, emerging CSS features           |
| Creation       | `references/creation.md`       | New components, pages, creative direction         |
| Review         | `references/review.md`         | Code review, compliance checks, quality audit     |

## Concepts

Distinct visual aesthetics to drive design direction:

| Concept             | Path                           | Description                                 |
| ------------------- | ------------------------------ | ------------------------------------------- |
| Apple Glassmorphism | `concepts/apple-glass.md`      | Premium, translucent depth (VisionOS Style) |
| Neo-Brutalism       | `concepts/neo-brutalism.md`    | Raw, high-contrast, bold borders            |
| Claymorphism        | `concepts/claymorphism.md`     | Soft 3D, inflated shapes, tactile feel      |
| Aurora Gradients    | `concepts/aurora-gradients.md` | Ethereal, moving blurred color meshes       |
| Bento Grids         | `concepts/bento-grids.md`      | Modular, grid-based content layout          |

## Modes of Operation

### 1. Creation Mode

Use when building something new.

**Process:**

1. Clarify purpose and audience
2. Choose aesthetic direction (bold, minimal, playful, etc.)
3. Load relevant references for decisions
4. Build with intentionality

### 2. Review Mode

Use when auditing existing code.

**Process:**

1. Load `references/review.md`
2. Fetch latest Web Interface Guidelines
3. Analyze target files
4. Report in `file:line` format

## Core Design Principles

### Intentionality Over Trends

Every design decision must be purposeful:

- **Why this color?** → Brand meaning, accessibility, contrast
- **Why this font?** → Readability, personality, performance
- **Why this animation?** → User feedback, spatial understanding

### Distinctive Over Generic

Avoid "AI slop" aesthetics:

- ❌ Default purple gradients, Inter everywhere, card-with-shadow templates
- ✅ Committed aesthetic vision, unique typography pairs, contextual layouts

### Technical Excellence

High-quality design = high-quality code:

- Semantic HTML first
- CSS custom properties for theming
- Performance-minded animations
- Accessibility as foundation

## Integration

Works with `frontend-developer` skill for implementation handoff:

- **Designer Role**: Creates visual designs, tokens, and **Motion Specs**.
- **Frontend Role**: Writes the actual CSS/JS code based on these specs.
- **Handoff Artifacts**:
  - Design System Tokens (`docs/040-Design/Design-System/`)
  - Animation Specs (`docs/040-Design/Specs/`)
  - Review Findings (`file:line` reports)

## Templates

| Template    | Path                              | Purpose                                                                                                  |
| ----------- | --------------------------------- | -------------------------------------------------------------------------------------------------------- |
| Motion Spec | `templates/design-motion-spec.md` | Motion Specification - animation timeline, triggers, easing. Use for handoff animation specs to frontend |
