# Accessibility Guidelines

Decision table and implementation checklist for inclusive design.

## When to Apply Which Standard

| Project Type          | Standard               | Contrast Ratio        | Target                |
| --------------------- | ---------------------- | --------------------- | --------------------- |
| Personal/Hobby        | No minimum             | -                     | -                     |
| Commercial website    | WCAG 2.1 AA            | 4.5:1 text, 3:1 UI    | Most users            |
| Government/Public     | WCAG 2.1 AA (required) | 4.5:1 text, 3:1 UI    | Legal compliance      |
| Enterprise SaaS       | WCAG 2.1 AA+           | 4.5:1+                | Employee productivity |
| Healthcare/Finance    | WCAG 2.1 AAA           | 7:1 text, 4.5:1 large | Critical info access  |
| Kiosk/Public terminal | WCAG 2.1 AAA           | 7:1+                  | Diverse environments  |

## Color & Contrast

### Minimum Ratios

| Element                      | AA    | AAA   |
| ---------------------------- | ----- | ----- |
| Body text                    | 4.5:1 | 7:1   |
| Large text (18pt+/14pt bold) | 3:1   | 4.5:1 |
| UI components                | 3:1   | -     |
| Focus indicators             | 3:1   | -     |

### Color Independence

- ❌ Never use color alone to convey meaning
- ✅ Add icons, patterns, or text labels
- Example: Red error + error icon + error text

## Keyboard Navigation

### Focus Management

```css
/* Visible focus ring */
:focus-visible {
  outline: 2px solid var(--color-focus);
  outline-offset: 2px;
}

/* Remove default only with replacement */
:focus {
  outline: none;
  box-shadow: 0 0 0 3px var(--color-focus);
}
```

### Tab Order

- Logical, follows visual order
- No tabindex > 0 (disrupts natural order)
- Skip links for main content

### Keyboard Patterns

| Component       | Keys                            |
| --------------- | ------------------------------- |
| Button          | Enter, Space                    |
| Link            | Enter                           |
| Checkbox        | Space                           |
| Radio           | Arrows                          |
| Select/Dropdown | Arrows, Enter, Esc              |
| Modal           | Esc to close, trap focus inside |
| Tabs            | Arrows between, Tab to content  |

## Screen Reader Optimization

### Semantic HTML First

```html
<!-- Bad -->
<div class="button" onclick="...">Click</div>

<!-- Good -->
<button type="button">Click</button>
```

### ARIA When Needed

```html
<!-- Icon-only button -->
<button aria-label="Close dialog">
  <svg>...</svg>
</button>

<!-- Live region for updates -->
<div aria-live="polite" aria-atomic="true">3 items added to cart</div>

<!-- Expandable sections -->
<button aria-expanded="false" aria-controls="panel1">Show details</button>
<div id="panel1" hidden>...</div>
```

### Content Order

- Visual order = DOM order
- Hidden decorative images: `aria-hidden="true"` or `alt=""`
- Meaningful images: descriptive `alt`

## Motion & Animation

### Reduced Motion

```css
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

### Safe Animation Types

- ✅ Opacity fades
- ✅ Small scale changes
- ⚠️ Limit parallax/vestibular motion
- ❌ Flashing (3+ times/sec)

## Forms

### Required Labels

```html
<label for="email">Email address</label>
<input
  id="email"
  type="email"
  name="email"
  autocomplete="email"
  aria-required="true"
  aria-describedby="email-hint email-error"
/>
<p id="email-hint">We'll never share your email</p>
<p id="email-error" role="alert">Please enter valid email</p>
```

### Error Handling

- Announce errors on submit (focus first error)
- Inline errors near the field
- Clear error states when corrected

## Testing Checklist

### Automated

- [ ] axe DevTools browser extension
- [ ] Lighthouse accessibility audit
- [ ] eslint-plugin-jsx-a11y (React)

### Manual

- [ ] Tab through entire page
- [ ] Use screen reader (VoiceOver/NVDA)
- [ ] Zoom to 200%
- [ ] Test with high contrast mode
- [ ] Check without CSS loaded

### Screen Readers to Test

| Platform | Reader               |
| -------- | -------------------- |
| macOS    | VoiceOver (built-in) |
| Windows  | NVDA (free), JAWS    |
| iOS      | VoiceOver (built-in) |
| Android  | TalkBack             |
