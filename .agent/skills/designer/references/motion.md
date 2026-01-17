# Motion & Animation

Expert guidelines for purposeful, performant motion design.

## Animation Principles

### The 12 Principles (Adapted for UI)

| Principle        | UI Application                         |
| ---------------- | -------------------------------------- |
| Timing           | Duration based on distance/importance  |
| Spacing          | Easing curves for natural feel         |
| Staging          | Draw attention to what matters         |
| Anticipation     | Prepare user for action (hover states) |
| Follow-through   | Settle after motion (slight bounce)    |
| Secondary action | Supporting animations                  |
| Exaggeration     | Subtle emphasis, not cartoon           |
| Solid drawing    | Consistent 3D space (shadows)          |

## Easing Curves

### Standard Curves

```css
/* Enter: Start slow, end fast */
--ease-out: cubic-bezier(0, 0, 0.2, 1);

/* Exit: Start fast, end slow */
--ease-in: cubic-bezier(0.4, 0, 1, 1);

/* Move: Slow start and end */
--ease-in-out: cubic-bezier(0.4, 0, 0.2, 1);

/* Emphasized: More dramatic */
--ease-emphasized: cubic-bezier(0.2, 0, 0, 1);
```

### When to Use

| Action             | Curve       | Reason                       |
| ------------------ | ----------- | ---------------------------- |
| Element entering   | ease-out    | Arrives with energy, settles |
| Element leaving    | ease-in     | Accelerates away             |
| State change       | ease-in-out | Smooth transition            |
| Important entrance | emphasized  | Demands attention            |

## Duration Guidelines

### By Distance

| Distance           | Duration  |
| ------------------ | --------- |
| Small (< 100px)    | 100-150ms |
| Medium (100-400px) | 150-250ms |
| Large (400px+)     | 250-400ms |
| Complex/Full-page  | 300-500ms |

### By Element

| Element          | Duration          |
| ---------------- | ----------------- |
| Hover effects    | 100-150ms         |
| Buttons, toggles | 150-200ms         |
| Modals, drawers  | 250-300ms         |
| Page transitions | 300-500ms         |
| Loading states   | Variable/infinite |

## Micro-Interactions

### Feedback Patterns

```css
/* Button press */
.button:active {
  transform: scale(0.98);
  transition: transform 100ms ease-out;
}

/* Toggle switch */
.toggle {
  transition: background-color 200ms ease-in-out;
}
.toggle-thumb {
  transition: transform 200ms ease-emphasized;
}

/* Form validation */
.input-error {
  animation: shake 300ms ease-in-out;
}

@keyframes shake {
  0%,
  100% {
    transform: translateX(0);
  }
  25% {
    transform: translateX(-4px);
  }
  75% {
    transform: translateX(4px);
  }
}
```

### Skeleton Loaders

```css
.skeleton {
  background: linear-gradient(
    90deg,
    var(--color-surface) 0%,
    var(--color-surface-elevated) 50%,
    var(--color-surface) 100%
  );
  background-size: 200% 100%;
  animation: shimmer 1.5s infinite;
}

@keyframes shimmer {
  0% {
    background-position: 200% 0;
  }
  100% {
    background-position: -200% 0;
  }
}
```

## Performance Best Practices

### Only Animate These Properties

```css
/* GPU-accelerated, no layout recalc */
transform: translate(), scale(), rotate()
opacity: 0-1
filter: blur(), brightness()
```

### Avoid Animating

```css
/* Trigger layout recalculation */
width, height, padding, margin
top, left, right, bottom
font-size, line-height
```

### Force GPU Acceleration

```css
.animated-element {
  will-change: transform, opacity;
  transform: translateZ(0); /* Fallback */
}
```

## Accessibility: Reduced Motion

```css
/* Always respect user preference */
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}

/* Or provide alternatives */
@media (prefers-reduced-motion: no-preference) {
  .fancy-animation {
    animation: bounce 300ms ease-out;
  }
}
```

## View Transitions API (Modern)

```css
/* Define transition behavior */
::view-transition-old(root),
::view-transition-new(root) {
  animation-duration: 300ms;
}

/* Named transitions */
.card {
  view-transition-name: card;
}

::view-transition-group(card) {
  animation-timing-function: ease-emphasized;
}
```

```javascript
document.startViewTransition(() => {
  // Update DOM here
});
```

## Common Patterns

### Staggered List

```css
.list-item {
  opacity: 0;
  transform: translateY(20px);
  animation: fadeInUp 300ms ease-out forwards;
}

.list-item:nth-child(1) {
  animation-delay: 0ms;
}
.list-item:nth-child(2) {
  animation-delay: 50ms;
}
.list-item:nth-child(3) {
  animation-delay: 100ms;
}
/* ... */

@keyframes fadeInUp {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
```
