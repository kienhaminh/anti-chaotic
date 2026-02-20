---
name: design-moc
type: moc
domain: design
status: stable
version: "2.0.0"
description: Hub for design skills — UI/UX, design systems, branding, and accessibility.
---

# Design MOC

Complete skill graph for product and interface design.

## Overview

This domain covers:
- **UI Design**: Interfaces, components, visual systems
- **UX Design**: User flows, research, usability
- **Design Systems**: Tokens, components, documentation
- **Accessibility**: WCAG compliance, inclusive design
- **Motion**: Animations, micro-interactions

## Skill Graph

```
                        [[design-moc]]
                            │
                    ┌───────┴───────┐
                    ▼               ▼
            [[designer]]      [[brand-
                    │           designer]]
        ┌───────────┼───────────┐
        ▼           ▼           ▼
[[ui-design]] [[ux-research]] [[motion-
                                    design]]
        │                           │
        ▼                           ▼
[[design-system]]             [[framer-motion]]
        │
        ▼
[[accessibility]]
```

## Design Stacks

### 🎨 UI Implementation
```
[[designer]]                    (~6k tokens)
    ↓ enhances
[[frontend-developer]]          (~2k tokens)
    ↓ suggests
[[tailwind-setup]]              (~1k tokens)
────────────────────────────────────────────
Total Context: ~9k tokens
```

### ♿ Accessible Product
```
[[designer]]                    (~6k tokens)
    ↓ requires
[[accessibility]]               (~2k tokens)
    ↓ enhances
[[frontend-developer]]          (~2k tokens)
────────────────────────────────────────────
Total Context: ~10k tokens
```

### 🎬 Motion Design
```
[[designer]]                    (~6k tokens)
    ↓ suggests
[[motion-design]]               (~3k tokens)
    ↓ requires
[[frontend-developer]]          (~2k tokens)
────────────────────────────────────────────
Total Context: ~11k tokens
```

## Quick Reference

| I want to... | Start Here |
|:-------------|:-----------|
| Design interface | [[designer]] |
| Create design system | [[designer]] + [[frontend-developer]] |
| Add animations | [[designer]] suggests [[framer-motion]] |
| Ensure accessibility | [[designer]] requires [[accessibility]] |

## Cross-Domain Skills

| Skill | Bridges To | Use Case |
|:------|:-----------|:---------|
| [[frontend-developer]] | Web MOC | Implement designs |
| [[mobile-developer]] | Mobile MOC | Mobile UI |
| [[marketer]] | Marketing | Brand consistency |

## Related MOCs

- [[web-development-moc]] — Implementation
- [[mobile-development-moc]] — Mobile design
- [[video-production-moc]] — Motion graphics

---

*Entry point for design | [[agent-skills-index]]*
