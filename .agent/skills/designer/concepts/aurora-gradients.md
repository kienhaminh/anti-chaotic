# Aurora / Mesh Gradients

**Concept**: Ethereal, flowing, and mood-setting. Focuses on soft, moving gradients that blend multiple colors seamlessly.

**Key Characteristics**:

- **Backgrounds**: Multiple radial gradients blurred together.
- **Motion**: Slow, liquid movement of color blobs.
- **Overlay**: Often paired with Glassmorphism.

**CSS Implementation Guide**:

```css
.aurora-bg {
  background-color: #ff9a9e;
  background-image:
    radial-gradient(at 40% 20%, hsla(28, 100%, 74%, 1) 0px, transparent 50%),
    radial-gradient(at 80% 0%, hsla(189, 100%, 56%, 1) 0px, transparent 50%),
    radial-gradient(at 0% 50%, hsla(355, 100%, 93%, 1) 0px, transparent 50%);
  filter: blur(40px);
}
```

**Usage**:

- SaaS landing pages, login screens, emotional branding.
