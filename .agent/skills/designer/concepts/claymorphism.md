# Claymorphism (Soft 3D)

**Concept**: Friendly, organic, and tactile. It combines rounded corners with double inner shadows to create a "puffy" or "inflated" 3D look.

**Key Characteristics**:

- **Shape**: Very rounded corners (Bubble-like).
- **Lighting**: Multiple internal shadows (one light, one dark) to simulate volume.
- **Feel**: Soft, approachable, child-like or friendly.

**CSS Implementation Guide**:

```css
.clay-card {
  background: #f0f0f3;
  border-radius: 32px;
  box-shadow:
    20px 20px 60px #bebebe,
    /* Darker outer shadow */ -20px -20px 60px #ffffff,
    /* Lighter outer light */ inset 5px 5px 10px #bebebe,
    /* Inner shadow */ inset -5px -5px 10px #ffffff; /* Inner highlight */
}
```

**Usage**:

- NFT projects, Web3, playful apps, educational tools.
