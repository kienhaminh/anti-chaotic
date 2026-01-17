# Core Performance & Accessibility Standards

**Status**: Mandaory
**Applies To**: ALL Frameworks (React, Vue, Angular, Svelte, etc.)

## 🚀 Performance: The "Zero-Overhead" Standard

### 1. Core Web Vitals (The Holy Trinity)

You must optimize for these metrics _before_ writing business logic.

- **LCP (Largest Contentful Paint)**: < 2.5s
  - **Strategy**: The LCP element (usually Hero Image or H1) must be in the initial HTML.
  - **Ban**: Never lazy-load the LCP image. Never use client-side rendering for the LCP element.
  - **Code**: `<img fetchpriority="high" decoding="sync" ... />`

- **INP (Interaction to Next Paint)**: < 200ms
  - **Strategy**: Break up long tasks.
  - **Ban**: `useEffect` or watchers that run heavy computation on input. Yield to main thread (`scheduler.yield()` or `setTimeout(..., 0)`).

- **CLS (Cumulative Layout Shift)**: < 0.1
  - **Strategy**: Rigidly defined dimensions for all media and containers.
  - **Ban**: Images without `width/height`. Ad containers without `min-height`.

### 2. Bundle Analysis

- **Budget**: Initial JS < 50KB (gzip).
- **Tree-Shaking**: Import specific functions, not whole libraries.
  - ✅ `import { map } from 'lodash-es'`
  - ❌ `import _ from 'lodash'`
- **Splitting**: Route-level splitting is mandatory. Component-level splitting for heavy interactions (modals, charts).

### 3. Image Optimization

- **Formats**: AVIF > WebP > JPG/PNG.
- **Responsive**: Use `srcset` and `sizes`.
- **Lazy**: `loading="lazy"` for everything below the fold.

---

## ♿ Accessibility: The "Keyboard First" Standard

**Rule**: If you can't use it with `Tab` + `Enter`/`Space`, it is broken.

### 1. Semantic HTML

- **Buttons**: Use `<button>`, not `<div onClick>`.
- **Links**: Use `<a>` with `href`, not `<button onClick="go()">`.
- **Landmarks**: `<main>`, `<nav>`, `<aside>`, `<header>`, `<footer>`.

### 2. Focus Management

- **Visible Focus**: Never remove `outline` without replacing it with a custom high-contrast focus style.
- **Trap Focus**: Modals must trap focus inside them.

### 3. ARIA (Last Resort)

- Use ARIA only when HTML is insufficient.
- **No ARIA > Bad ARIA**.
- **Images**: `alt=""` for decorative, descriptive text for informational.

---

## 🔒 Security Basics

- **XSS**: Sanitize all `innerHTML`.
- **Deps**: Audit `npm audit` regularly.
- **HTTPS**: Enforce HSTS.
