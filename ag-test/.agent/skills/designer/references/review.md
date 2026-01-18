# UI Review & Auditing

Expert guidelines for auditing UI code and ensuring production quality.

## Guidelines Source

Fetch fresh guidelines before each review:

```
https://raw.githubusercontent.com/vercel-labs/web-interface-guidelines/main/command.md
```

Use `read_url_content` to retrieve. The content contains full rules and output format.

## Audit Decision Table

Select which standards to apply:

| Project Type  | Apply Standards             |
| ------------- | --------------------------- |
| Personal/demo | Basic review only           |
| Commercial    | Full WIG + WCAG AA          |
| Enterprise    | WIG + WCAG AA + performance |
| Public/Gov    | WIG + WCAG AAA + security   |

## Review Workflow

1. **Determine scope**: Which files? Which standards?
2. **Fetch guidelines**: Get latest from URL above
3. **Load references**: `@references/accessibility.md` for a11y checks
4. **Analyze code**: Apply all applicable rules
5. **Report findings**: Use format below

## Standard Audit Checklist

These rules always apply:

### Interactive States

- [ ] All buttons/links have `:hover` state
- [ ] All interactive elements have visible `:focus-visible`
- [ ] No `outline: none` without replacement

### Form Quality

- [ ] Inputs have `autocomplete` attribute
- [ ] Labels are clickable (`for` or wrapped)
- [ ] Placeholders end with `…`
- [ ] Errors announced to screen readers

### Typography

- [ ] Proper glyphs: `…` not `...`, curly quotes
- [ ] `text-wrap: balance` on headings
- [ ] `tabular-nums` on numeric tables

### Performance

- [ ] Images have explicit `width`/`height`
- [ ] Large lists (>50) virtualized
- [ ] No `transition: all`
- [ ] Animations use transform/opacity only

### Accessibility

- [ ] Semantic HTML (buttons, links, sections)
- [ ] Icon buttons have `aria-label`
- [ ] Color not sole indicator
- [ ] Contrast meets target level

## Severity Levels

| Level   | Symbol | When to Use                           |
| ------- | ------ | ------------------------------------- |
| Error   | 🔴     | Breaks functionality or accessibility |
| Warning | 🟡     | Best practice violation               |
| Info    | 🔵     | Suggestion for improvement            |

## Output Format

Group by file. Use clickable `file:line` format.

```text
## src/components/Button.tsx

🔴 src/components/Button.tsx:42 - icon button missing aria-label
🟡 src/components/Button.tsx:18 - transition: all → specify properties
🔵 src/components/Button.tsx:25 - consider adding loading state

## src/layout/Header.tsx

✓ pass
```

**Rules:**

- State issue + location only
- Skip preamble
- Explanations only if fix is non-obvious
- End with pass/fail summary
