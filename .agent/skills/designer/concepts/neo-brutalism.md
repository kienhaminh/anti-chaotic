# Neo-Brutalism

**Concept**: A raw, unpolished aesthetic that rebels against the refined "tech" look. It uses high contrast, bold borders, and weird colors to stand out.

**Key Characteristics**:

- **Borders**: Thick, hard black borders (`2px - 4px spec`).
- **Shadows**: Hard, unblurred shadows (often offset).
- **Typography**: Default system fonts or eccentric display fonts.
- **Colors**: Clashing, high-saturation, or strictly monochrome.

**CSS Implementation Guide**:

```css
.neo-brutal-card {
  background: white;
  border: 3px solid black;
  box-shadow: 6px 6px 0px 0px black; /* Hard shadow */
  border-radius: 0; /* Or vary broadly */
  transition: transform 0.1s;
}

.neo-brutal-card:active {
  transform: translate(2px, 2px);
  box-shadow: 4px 4px 0px 0px black;
}
```

**Usage**:

- Developer tools, satirical brands, "edgy" startups.
- When you need to grab attention and look "anti-corporate".
