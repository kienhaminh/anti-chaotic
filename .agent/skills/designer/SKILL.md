---
name: designer
type: skill
domain: design
status: stable
version: "2.0.0"
estimated_tokens: 12000
description: UI/UX, branding, design systems, and accessibility. Use for creating interfaces, visual identity, and motion design.
---

# Designer

Expert design guidance for production-grade interfaces and design systems.

## Knowledge Graph

- **extends**: []
- **requires**: []
- **suggests**: [[frontend-developer]], [[tailwind-setup]], [[framer-motion]]
- **conflicts**: []
- **enhances**: [[frontend-developer]] (implementation of designs)
- **moc**: []

## Core Principles

### Intentionality Over Trends
- **Why this color?** — Brand meaning, accessibility, contrast
- **Why this font?** — Readability, personality, performance
- **Why this animation?** — User feedback, spatial understanding

### Distinctive Over Generic
- ❌ Default gradients, Inter everywhere, card templates
- ✅ Committed aesthetic, unique typography, contextual layouts

### Technical Excellence
- Semantic HTML first
- CSS custom properties for theming
- Performance-minded animations
- Accessibility as foundation

## References

| Reference | Purpose |
|:----------|:--------|
| `branding.md` | Logos, visual identity |
| `color-theory.md` | Palettes, dark mode |
| `typography.md` | Font pairing, scales |
| `layout.md` | Grids, responsive design |
| `motion.md` | Micro-interactions |
| `accessibility.md` | WCAG compliance |
| `design-systems.md` | Tokens, components |

## Visual Concepts

| Concept | Description |
|:--------|:------------|
| Apple Glassmorphism | Premium, translucent depth |
| Neo-Brutalism | Raw, high-contrast, bold borders |
| Claymorphism | Soft 3D, tactile feel |
| Aurora Gradients | Ethereal, moving color meshes |
| Bento Grids | Modular, grid-based layouts |

## Asset Creation Workflow

1. **Generate** with `generate_image` (follow `.agent/rules/nano-banana.md`)
2. **Process** with `scripts/remove_background.py`
3. **Deliver** to [[frontend-developer]] for implementation

## Integration

- **Designer**: Creates visual designs, tokens, Motion Specs
- **[[frontend-developer]]**: Implements CSS/JS from specs

## Related Skills

- [[frontend-developer]] — Implementation partner
- [[threejs]] — 3D visual experiences

---

*Design foundation | Works closely with [[frontend-developer]]*
