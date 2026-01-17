# UI/UX Creation Guidelines

Expert guide for creating distinctive, production-grade interfaces.

## Design Thinking Process

### Phase 1: Discovery

Before any visual work:

1. **Purpose**: What problem does this solve?
2. **Audience**: Who uses this? What do they expect?
3. **Context**: Where is it used? Device, environment, frequency?
4. **Competition**: What exists? How to differentiate?

### Phase 2: Aesthetic Direction

Choose ONE strong direction:

| Direction              | Characteristics                                | Best For                 |
| ---------------------- | ---------------------------------------------- | ------------------------ |
| Brutally Minimal       | White space, system fonts, zero decoration     | Tools, productivity      |
| Maximalist             | Dense info, layered elements, rich color       | Dashboards, media        |
| Retro-Futuristic       | Neon, scanlines, tech-noir                     | Gaming, creative         |
| Organic Natural        | Earth tones, flowing shapes, textures          | Wellness, sustainability |
| Luxury Refined         | Black/gold, thin type, generous space          | Premium products         |
| Playful Toy-like       | Bright colors, rounded shapes, bouncy motion   | Kids, casual apps        |
| Editorial Magazine     | Strong grid, bold headlines, photo-driven      | Content, portfolios      |
| Brutalist Raw          | Mono fonts, harsh contrast, visible structure  | Art, experimental        |
| Art Deco Geometric     | Gold accents, symmetric patterns, elegant type | Events, luxury           |
| Soft Pastel            | Muted tones, gentle gradients, light feel      | Lifestyle, baby          |
| Industrial Utilitarian | Gray, exposed grid, functional focus           | B2B, enterprise          |

**Pick one. Commit. Execute with precision.**

### Phase 3: Brainstorming

#### Moodboard Elements

- 5-10 reference images (from Dribbble, Awwwards, Behance)
- 3 font candidates
- Color palette draft
- Key interaction moments

#### "One Thing" Exercise

Complete this sentence:

> "When users see this, they will remember **\*\***\_\_\_**\*\***"

Make that ONE thing unforgettable.

## Implementation Excellence

### Typography Execution

```css
/* Load reference: @references/typography.md */
```

- Display font for impact
- Body font for readability
- Proper text-wrap, font-features
- Responsive sizing

### Color Execution

```css
/* Load reference: @references/color-theory.md */
```

- Brand-aligned palette
- Semantic colors defined
- Dark mode prepared
- Contrast verified

### Motion Execution

```css
/* Load reference: @references/motion.md */
```

- **Define Intent**: Why is this moving? (Orientation/Feedback)
- **Use Template**: Create a spec using `.agent/templates/documents/design-motion-spec.md`
- **Spec Output**: Save to `docs/040-Design/Specs/`
- **No Direct Code**: Leave implementation to `frontend-developer`

### Layout Execution

```css
/* Load reference: @references/layout.md */
```

- Grid system applied
- Spacing consistent (8pt)
- Responsive breakpoints
- Safe areas respected

## Quality Checklist

Before deliverySure:

- [ ] Aesthetic direction is clear and committed
- [ ] Typography pairs well and is readable
- [ ] Color palette is harmonious and accessible
- [ ] Motion is purposeful, not gratuitous
- [ ] Layout is responsive and consistent
- [ ] "One thing" is memorable
- [ ] No generic patterns (default gradients, template cards)

## Handoff to Development

When integration with `frontend-developer`:

1. Design tokens documented
2. Component variants defined
3. Interaction states specified
4. Edge cases considered
