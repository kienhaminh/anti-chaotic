---
name: react-nextjs
type: skill
domain: web
status: stable
version: "2.0.0"
estimated_tokens: 18000
description: Next.js App Router and React Server Components. Use for modern React applications.
---

# React & Next.js

Best practices for Next.js with App Router and React Server Components.

## Knowledge Graph

- **extends**: [[frontend-developer]] — Inherits all base frontend rules
- **requires**: [] — TypeScript recommended (built-in support)
- **suggests**: 
  - [[threejs]] — For 3D graphics
  - [[remotion-best-practices]] — For video generation
  - [[tailwind-setup]] — For styling
  - [[nextjs-data-fetching]] — Deep dive on data patterns
- **conflicts**: 
  - [[vue-developer]] — Mutually exclusive
  - [[angular-developer]] — Mutually exclusive
- **enhances**: [[mobile-developer]] — Expo Router shares Next.js patterns
- **moc**: [[web-development-moc]]

## Triggers

- pattern: "next/router|next/navigation|next/headers"
  confidence: high
- pattern: "app/layout\\.tsx|app/page\\.tsx|app/loading\\.tsx"
  confidence: high
- file: "next.config\\.(js|ts|mjs)"
  confidence: high
- dependency: "next"
  confidence: high

## Core Philosophy

1. **Server Components First** — Default to RSC, `'use client'` is the exception
2. **Colocation** — Keep related code close (components, tests, styles)
3. **Progressive Enhancement** — Core works without JS

## Server vs Client Components

| Use Server Component | Use Client Component |
|---------------------|----------------------|
| Data fetching | Event handlers (`onClick`) |
| Backend resources (`fs`, DB) | Browser APIs |
| Sensitive logic (tokens, keys) | `useState`, `useEffect` |
| Large dependencies | Hooks requiring DOM |

## Quick Rules

| Context | Implementation |
|---------|---------------|
| Data fetching | Server Components + `fetch`, or Server Actions |
| Forms | Server Actions + `useFormStatus` |
| Images | Always `next/image` |
| Fonts | Always `next/font` |
| Routes | File-based in `app/` directory |
| Metadata | Export `metadata` object |

## Related Skills (Deep Dives)

- [[nextjs-data-fetching]] — Caching, revalidation, mutations
- [[nextjs-routing]] — Parallel routes, intercepting routes
- [[nextjs-deployment]] — Vercel, Docker, self-hosting
- [[nextjs-testing]] — Testing patterns for App Router

## Capability Extensions

| Add-on | Skill | When to Use |
|--------|-------|-------------|
| 3D/Three.js | [[threejs]] — requires → [[r3f-best-practices]] | 3D product viewers |
| Video | [[remotion-best-practices]] | Programmatic video |
| Auth | [[next-auth]] or [[clerk]] | Authentication |
| Database | [[prisma]] or [[drizzle]] | ORM setup |
| CMS | [[sanity]] or [[contentful]] | Content management |

## Common Patterns

### Loading States
```tsx
// app/posts/loading.tsx — Automatic loading UI
export default function Loading() {
  return <PostSkeleton />;
}
```

### Error Boundaries
```tsx
// app/posts/error.tsx — Automatic error handling
'use client';
export default function Error({ error, reset }) {
  return <ErrorUI error={error} retry={reset} />;
}
```

### Server Actions
```tsx
// Server action in component or separate file
async function createPost(formData: FormData) {
  'use server';
  // Mutate data, revalidate cache
}
```

## Conflicting Patterns (Don't Mix)

| ❌ Avoid | ✅ Use Instead |
|----------|---------------|
| `useEffect` + `fetch` | Server Component + `fetch` |
| Manual `<head>` | `metadata` export |
| `pages/_app.tsx` | `app/layout.tsx` |
| `getServerSideProps` | Server Component |
| `getStaticProps` | `fetch` with `cache: 'force-cache'` |

---

*Extends [[frontend-developer]] | Part of [[web-development-moc]]*
