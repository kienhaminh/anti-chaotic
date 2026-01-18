# Layout & Composition

Expert spatial design principles for creating balanced, functional layouts.

## Grid Systems

### 8-Point Grid (Recommended)

All spacing and sizing divisible by 8:

```
4px   - micro (border, small gaps)
8px   - base unit
16px  - component padding
24px  - section gaps
32px  - large gaps
48px  - section spacing
64px  - major sections
```

### Why 8-Point?

- Scales cleanly (÷2, ×2)
- Works with common screen densities (1x, 1.5x, 2x, 3x)
- Aligns with most system fonts' baselines

### Responsive Column Grids

| Breakpoint            | Columns | Gutter | Margin          |
| --------------------- | ------- | ------ | --------------- |
| Mobile (<640px)       | 4       | 16px   | 16px            |
| Tablet (640-1024px)   | 8       | 24px   | 32px            |
| Desktop (1024-1440px) | 12      | 24px   | 64px            |
| Large (>1440px)       | 12      | 32px   | auto (centered) |

## Composition Principles

### Visual Hierarchy

1. **Size**: Larger = more important
2. **Color**: Saturated/contrasting = attention
3. **Position**: Top-left (LTR) = first seen
4. **Whitespace**: Isolated = prominent
5. **Typography**: Weight, style variations

### The Rule of Thirds

Divide canvas into 3×3 grid, place key elements at intersections.

- Hero images: subject at intersection
- CTAs: right-third for natural eye flow

### Gestalt Principles

| Principle     | Description                | Application              |
| ------------- | -------------------------- | ------------------------ |
| Proximity     | Close items seem related   | Group related controls   |
| Similarity    | Similar items seem related | Consistent button styles |
| Continuity    | Eye follows paths          | Align elements           |
| Closure       | Mind completes shapes      | Icon design              |
| Figure/Ground | Foreground vs background   | Cards, modals            |

## Whitespace Strategy

### Types of Space

- **Micro**: Within components (padding, letter-spacing)
- **Macro**: Between components/sections
- **Negative**: Empty space that shapes perception

### Breathing Room Guidelines

```
Component padding: 16-24px
Section spacing: 48-96px
Page margins: 16px (mobile) → 64px+ (desktop)
```

### Active vs Passive Space

- **Active**: Intentionally empty, guides attention
- **Passive**: Leftover, feels unfinished
- Always design space, never leave leftovers

## Layout Patterns

### Common Page Layouts

```
┌──────────────────────────┐
│         Header           │
├──────────────────────────┤
│                          │
│          Hero            │
│                          │
├──────────────────────────┤
│  Card  │  Card  │  Card  │
├──────────────────────────┤
│    Feature Section       │
├──────────────────────────┤
│         Footer           │
└──────────────────────────┘
```

### Dashboard Layout

```
┌────────┬─────────────────┐
│        │     Topbar      │
│  Side  ├─────────────────┤
│  bar   │                 │
│        │  Main Content   │
│        │                 │
└────────┴─────────────────┘
```

## Responsive Strategies

### Mobile-First Breakpoints

```css
/* Base: Mobile */
.container {
  padding: 16px;
}

/* Tablet */
@media (min-width: 640px) {
  .container {
    padding: 32px;
  }
}

/* Desktop */
@media (min-width: 1024px) {
  .container {
    padding: 64px;
    max-width: 1280px;
  }
}
```

### Container Queries (Modern)

```css
.card {
  container-type: inline-size;
}

@container (min-width: 400px) {
  .card-content {
    flex-direction: row;
  }
}
```

## Advanced Techniques

### CSS Grid for Complex Layouts

```css
.bento-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-auto-rows: 200px;
  gap: 16px;
}

.featured {
  grid-column: span 2;
  grid-row: span 2;
}
```

### Subgrid for Alignment

```css
.card-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
}

.card {
  display: grid;
  grid-template-rows: subgrid;
  grid-row: span 3; /* header, content, footer */
}
```

## Safe Areas (Mobile)

```css
.full-bleed {
  padding-top: env(safe-area-inset-top);
  padding-right: env(safe-area-inset-right);
  padding-bottom: env(safe-area-inset-bottom);
  padding-left: env(safe-area-inset-left);
}
```
