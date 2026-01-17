# Color Theory for UI Design

Expert guide to color selection, harmony, and application in digital interfaces.

## Color Psychology

### Emotional Associations by Hue

| Color  | Positive                        | Negative             | Best For                        |
| ------ | ------------------------------- | -------------------- | ------------------------------- |
| Red    | Energy, passion, urgency        | Danger, aggression   | CTAs, sales, alerts             |
| Orange | Creativity, warmth, fun         | Caution, cheap       | E-commerce, entertainment       |
| Yellow | Optimism, clarity, warmth       | Anxiety, cowardice   | Highlights, warnings            |
| Green  | Growth, health, success         | Envy, inexperience   | Finance, wellness, confirmation |
| Blue   | Trust, calm, professional       | Cold, sadness        | Corporate, tech, healthcare     |
| Purple | Luxury, creativity, wisdom      | Decadence, moodiness | Beauty, premium brands          |
| Pink   | Playful, romantic, feminine     | Immature, weak       | Fashion, beauty, youth          |
| Black  | Elegance, power, sophistication | Death, evil          | Luxury, fashion                 |
| White  | Clean, simple, pure             | Sterile, empty       | Minimalist, healthcare          |
| Gray   | Neutral, balanced, mature       | Dull, indecisive     | Professional, backgrounds       |

### Cultural Considerations

| Culture     | Red              | White    | Yellow    | Green             |
| ----------- | ---------------- | -------- | --------- | ----------------- |
| Western     | Love, danger     | Purity   | Happiness | Nature            |
| Eastern     | Luck, prosperity | Mourning | Royalty   | Infidelity (some) |
| Middle East | Danger           | Purity   | Joy       | Fertility         |

## Color Harmony Schemes

### 1. Monochromatic

- **How**: Single hue, vary saturation/lightness
- **Use**: Elegant, cohesive, easy to implement
- **Tip**: Add one accent color for contrast

### 2. Analogous

- **How**: 3-5 adjacent colors on wheel
- **Use**: Harmonious, natural feel
- **Tip**: Pick one dominant, others as support

### 3. Complementary

- **How**: Opposite colors on wheel
- **Use**: High contrast, vibrant
- **Tip**: Use 70-30 ratio, never 50-50

### 4. Split-Complementary

- **How**: Base + two adjacents to its complement
- **Use**: Contrast with less tension
- **Tip**: Great for beginners

### 5. Triadic

- **How**: Three evenly spaced colors
- **Use**: Vibrant, balanced
- **Tip**: Let one dominate, two accent

### 6. Tetradic (Rectangle)

- **How**: Two complementary pairs
- **Use**: Rich, varied palette
- **Tip**: Most complex, requires careful balance

## Palette Generation Workflow

1. **Start with brand meaning** → Select primary hue
2. **Choose harmony type** → Generate base palette
3. **Add neutrals** → Gray scale from tinted primary
4. **Define semantic colors** → Success, error, warning, info
5. **Create shades** → 9-11 steps (50-900) per color
6. **Test contrast** → WCAG AA minimum

## Color Scale Generation

```
color-50:  lightest (backgrounds)
color-100: very light
color-200: light
color-300: light-medium
color-400: medium-light
color-500: base (primary shade)
color-600: medium-dark
color-700: dark
color-800: very dark
color-900: darkest (text)
color-950: near black
```

## Contrast Requirements (WCAG)

| Level | Normal Text | Large Text | UI Components |
| ----- | ----------- | ---------- | ------------- |
| AA    | 4.5:1       | 3:1        | 3:1           |
| AAA   | 7:1         | 4.5:1      | Not defined   |

### Tools for Checking

- WebAIM Contrast Checker
- Stark (Figma plugin)
- axe DevTools

## Dark Mode Strategy

### Approach 1: Invert Lightness

- Swap 50↔900, 100↔800, etc.
- Primary hue stays, lightness inverts

### Approach 2: Semantic Tokens

```css
--color-surface: light → dark --color-on-surface: dark → light
  --color-primary: adjust saturation + 10%;
```

### Dark Mode Do's & Don'ts

- ✅ Reduce saturation slightly (colors feel brighter on dark)
- ✅ Use elevation via subtle lightness increase
- ✅ Test in actual dark environment
- ❌ Pure black (#000) backgrounds (use #121212+)
- ❌ Same colors as light mode (adjust for contrast)

## CSS Implementation

```css
:root {
  color-scheme: light dark;

  /* Semantic color tokens */
  --color-surface: light-dark(#fff, #1a1a1a);
  --color-on-surface: light-dark(#1a1a1a, #f5f5f5);
  --color-primary: light-dark(#2563eb, #60a5fa);
}
```
