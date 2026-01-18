# Apple Glassmorphism (VisionOS / modern macOS)

**Concept**: A premium, depth-oriented interface that mimics physical glass materials. It relies heavily on background blurring, translucency, and light interaction to create a sense of hierarchy and spatial awareness.

**Key Characteristics**:

- **Translucency**: High-quality `backdrop-filter: blur()`.
- **Depth**: Multiple layers of glass with varying opacity.
- **Light**: Subtle white borders and inner shadows to simulate edge lighting and thickness.
- **Hierarchy**: Content floats on top of the background, creating a sense of Z-axis layering.

**CSS Implementation Guide**:

```css
.apple-glass {
  /* Base Material */
  background: rgba(255, 255, 255, 0.65); /* Light mode base */
  backdrop-filter: blur(20px) saturate(180%);
  -webkit-backdrop-filter: blur(20px) saturate(180%);

  /* Border / Edge Light */
  border: 1px solid rgba(255, 255, 255, 0.4);

  /* Depth & Volume */
  box-shadow:
    0 4px 30px rgba(0, 0, 0, 0.1),
    /* Drop shadow for lift */ inset 0 0 0 1px rgba(255, 255, 255, 0.2); /* Inner lighting */

  border-radius: 20px;
}

/* Dark Mode Variant */
@media (prefers-color-scheme: dark) {
  .apple-glass {
    background: rgba(30, 30, 30, 0.6);
    border: 1px solid rgba(255, 255, 255, 0.1);
    box-shadow:
      0 4px 30px rgba(0, 0, 0, 0.3),
      inset 0 0 0 1px rgba(255, 255, 255, 0.05);
  }
}
```

**Usage**:

- Sidebars, modal windows, floating controls.
- When you want a "native" application feel.
- Best used with colorful, abstract backgrounds to show off the blur effect.
