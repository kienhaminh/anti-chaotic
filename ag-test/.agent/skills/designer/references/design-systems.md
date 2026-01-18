# Design Systems Guide

Expert guide for creating and maintaining scalable design systems.

## Design Tokens

### Token Hierarchy

```
Global Tokens (primitives)
    ↓
Semantic Tokens (purpose)
    ↓
Component Tokens (specific)
```

### Token Categories

| Category    | Examples                                  |
| ----------- | ----------------------------------------- |
| Color       | `color.blue.500`, `color.surface.primary` |
| Typography  | `font.family.body`, `font.size.lg`        |
| Spacing     | `space.4`, `space.8`                      |
| Border      | `border.radius.md`, `border.width.thin`   |
| Shadow      | `shadow.sm`, `shadow.lg`                  |
| Motion      | `duration.fast`, `ease.out`               |
| Breakpoints | `breakpoint.md`, `breakpoint.lg`          |
| Z-index     | `z.modal`, `z.tooltip`                    |

### Token Naming Convention

```
{category}.{property}.{variant}.{state}

Examples:
color.background.surface
color.background.surface.hover
font.size.heading.xl
space.padding.component.md
```

### CSS Implementation

```css
:root {
  /* Primitives */
  --color-blue-500: #3b82f6;
  --color-blue-600: #2563eb;

  /* Semantic */
  --color-primary: var(--color-blue-500);
  --color-primary-hover: var(--color-blue-600);

  /* Component-specific (optional) */
  --button-bg: var(--color-primary);
  --button-bg-hover: var(--color-primary-hover);
}
```

## Component Architecture

### Atomic Design Levels

| Level     | Description         | Examples               |
| --------- | ------------------- | ---------------------- |
| Atoms     | Basic elements      | Button, Input, Icon    |
| Molecules | Simple combinations | Search bar, Form field |
| Organisms | Complex sections    | Header, Card, Modal    |
| Templates | Page layouts        | Dashboard, Settings    |
| Pages     | Specific instances  | Home, Profile          |

### Component API Design

```typescript
interface ButtonProps {
  // Variants (visual)
  variant: "primary" | "secondary" | "ghost" | "danger";
  size: "sm" | "md" | "lg";

  // States
  isLoading?: boolean;
  isDisabled?: boolean;

  // Content
  children: ReactNode;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;

  // Behavior
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
}
```

### Variant Strategy

```
Base styles (always applied)
    + Variant styles (visual appearance)
    + Size styles (dimensions)
    + State styles (hover, focus, disabled)
```

## Documentation Standards

### Component Doc Template

```markdown
# Button

Primary action element for user interactions.

## Usage Guidelines

- Use primary for main CTAs (1 per view)
- Use secondary for alternative actions
- Use ghost for tertiary/toolbar actions

## Variants

[Visual examples of each variant]

## Props

| Prop | Type | Default | Description |
| ---- | ---- | ------- | ----------- |

## Accessibility

- Uses native `<button>` element
- Focus visible by default
- Loading state announces via aria-busy

## Examples

[Code snippets for common use cases]
```

## Figma ↔ Code Sync

### Token Export Format

```json
{
  "color": {
    "primary": {
      "value": "#3b82f6",
      "type": "color"
    }
  },
  "spacing": {
    "4": {
      "value": "16px",
      "type": "spacing"
    }
  }
}
```

### Sync Workflow

1. Designers update tokens in Figma
2. Export via Tokens Studio / Style Dictionary
3. Generate CSS/JS token files
4. Review PR with visual diff
5. Merge and deploy

## Versioning & Changelog

### Semantic Versioning

```
MAJOR.MINOR.PATCH

1.0.0 → 1.0.1  (patch: bug fix)
1.0.0 → 1.1.0  (minor: new component)
1.0.0 → 2.0.0  (major: breaking change)
```

### Breaking Changes

- Removed component/prop
- Changed prop name/type
- Visual changes affecting layout
- Token name changes

### Changelog Format

```markdown
## [1.2.0] - 2024-01-15

### Added

- New `Tooltip` component

### Changed

- Button hover states now use scale transform

### Deprecated

- `Button` `loading` prop → use `isLoading`

### Fixed

- Modal focus trap edge case
```

## Quality Checklist

### For Each Component

- [ ] Follows token system (no hard-coded values)
- [ ] All variants documented
- [ ] Accessibility tested
- [ ] Dark mode compatible
- [ ] RTL tested (if applicable)
- [ ] Unit tests for logic
- [ ] Visual regression tests
