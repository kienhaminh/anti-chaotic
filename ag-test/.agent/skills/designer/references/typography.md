# Typography Guidelines

Expert typography system for creating distinctive, readable interfaces.

## Font Selection Strategy

### Display vs Body Fonts

| Type    | Purpose              | Characteristics                      |
| ------- | -------------------- | ------------------------------------ |
| Display | Headlines, hero text | Distinctive, expressive, limited use |
| Body    | Paragraphs, UI text  | Highly readable, neutral, versatile  |

### Pairing Principles

1. **Contrast**: Pair serif + sans-serif, or geometric + humanist
2. **Similar x-height**: Ensures visual harmony
3. **Shared era/style**: Art Deco display + geometric body works
4. **Max 2-3 fonts**: Display, body, optional mono

### Quality Indicators

- ✅ Variable font support (weight, width)
- ✅ Full character set (Latin Extended)
- ✅ Good OpenType features (ligatures, tabular nums)
- ✅ Hinting for screen rendering
- ✅ Multiple weights (3+ for body fonts)

## Typographic Scale

### Modular Scale Ratios

| Ratio | Name             | Formula  | Use Case      |
| ----- | ---------------- | -------- | ------------- |
| 1.067 | Minor Second     | Subtle   | Dense UI      |
| 1.125 | Major Second     | Popular  | General use   |
| 1.200 | Minor Third      | Moderate | Editorial     |
| 1.250 | Major Third      | Classic  | Balanced      |
| 1.333 | Perfect Fourth   | Strong   | High contrast |
| 1.414 | Augmented Fourth | Bold     | Hero sections |
| 1.618 | Golden Ratio     | Dramatic | Artistic      |

### Recommended Scale (1.25 base)

```
text-xs:   0.64rem (10px)
text-sm:   0.8rem  (13px)
text-base: 1rem    (16px)
text-lg:   1.25rem (20px)
text-xl:   1.563rem (25px)
text-2xl:  1.953rem (31px)
text-3xl:  2.441rem (39px)
text-4xl:  3.052rem (49px)
text-5xl:  3.815rem (61px)
```

## Line Height & Spacing

### Line Height by Size

| Text Size | Line Height | Reason                |
| --------- | ----------- | --------------------- |
| < 14px    | 1.6-1.8     | Small text needs room |
| 14-18px   | 1.5-1.6     | Body text sweet spot  |
| 18-24px   | 1.4-1.5     | Large body            |
| 24-32px   | 1.3-1.4     | Subheads              |
| > 32px    | 1.1-1.25    | Headlines tight       |

### Line Length (Measure)

- **Optimal**: 45-75 characters (65 ideal)
- **Mobile**: 35-50 characters
- **CSS**: `max-width: 65ch;`

## Text Rendering Best Practices

```css
body {
  /* Smooth anti-aliasing */
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;

  /* Optimize for readability */
  text-rendering: optimizeLegibility;

  /* Better word breaking */
  overflow-wrap: break-word;
  word-break: break-word;
  hyphens: auto;
}

h1,
h2,
h3 {
  /* Balance headline wrapping */
  text-wrap: balance;
}

p {
  /* Prevent orphans/widows */
  text-wrap: pretty;
}
```

## Typographic Details

### Essential Glyphs

| Use            | Wrong      | Correct                      |
| -------------- | ---------- | ---------------------------- |
| Ellipsis       | ...        | … (`&hellip;`)               |
| Quotes         | "text"     | "text" (`&ldquo;` `&rdquo;`) |
| Apostrophe     | it's       | it's (`&rsquo;`)             |
| Em dash        | --         | — (`&mdash;`)                |
| En dash        | - (ranges) | – (`&ndash;`)                |
| Multiplication | x          | × (`&times;`)                |

### Numeric Typography

```css
/* Tabular for tables/data alignment */
.data-table {
  font-variant-numeric: tabular-nums;
}

/* Oldstyle for prose */
.prose {
  font-variant-numeric: oldstyle-nums;
}

/* Slashed zero for code */
.code {
  font-variant-numeric: slashed-zero;
}
```

## Responsive Typography

### Fluid Typography

```css
/* Clamp: min, preferred, max */
h1 {
  font-size: clamp(2rem, 5vw + 1rem, 4rem);
}

body {
  font-size: clamp(1rem, 0.5vw + 0.875rem, 1.125rem);
}
```

### Container Query Typography

```css
@container (min-width: 600px) {
  .card-title {
    font-size: 1.5rem;
  }
}
```

## Font Loading Strategy

```html
<!-- Preload critical font -->
<link
  rel="preload"
  href="/fonts/main.woff2"
  as="font"
  type="font/woff2"
  crossorigin
/>
```

```css
/* Define with fallback stack */
@font-face {
  font-family: "MainFont";
  src: url("/fonts/main.woff2") format("woff2");
  font-display: swap; /* Show fallback immediately */
}

body {
  font-family:
    "MainFont",
    system-ui,
    -apple-system,
    sans-serif;
}
```
