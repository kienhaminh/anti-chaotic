# React & Next.js

Next.js App Router and React Server Components best practices.

## When to Use

Use this guide when:
- Building with Next.js App Router (app/ directory)
- Deciding between Server vs Client Components
- Implementing data fetching, caching, or mutations
- Handling loading states and errors
- Working with Server Actions

## Core Philosophy

1. **Server Components First** — Default to RSC, `'use client'` is the exception
2. **Colocation** — Keep related code close (components, tests, styles)
3. **Progressive Enhancement** — Core works without JS

## Server vs Client Components

| Use Server Component | Use Client Component |
|:---------------------|:---------------------|
| Data fetching | Event handlers (`onClick`) |
| Backend resources (`fs`, DB) | Browser APIs |
| Sensitive logic (tokens, keys) | `useState`, `useEffect` |
| Large dependencies | Hooks requiring DOM |

## Quick Rules

| Context | Implementation |
|:--------|:---------------|
| Data fetching | Server Components + `fetch`, or Server Actions |
| Forms | Server Actions + `useFormStatus` |
| Images | Always `next/image` |
| Fonts | Always `next/font` |
| Routes | File-based in `app/` directory |
| Metadata | Export `metadata` object |

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

## Conflicting Patterns

| ❌ Avoid | ✅ Use Instead |
|:---------|:---------------|
| `useEffect` + `fetch` | Server Component + `fetch` |
| Manual `<head>` | `metadata` export |
| `pages/_app.tsx` | `app/layout.tsx` |
| `getServerSideProps` | Server Component |
| `getStaticProps` | `fetch` with `cache: 'force-cache'` |

## Extensions

- **3D/Three.js** → Load `threejs` capability for 3D product viewers
- **Video** → Load `remotion-best-practices` for programmatic video
- **Auth** → Use `next-auth` or `clerk`
- **Database** → Use `prisma` or `drizzle`

## Triggers

- `next/router|next/navigation|next/headers` pattern detected
- `app/layout.tsx|app/page.tsx|app/loading.tsx` files present
- `next.config.(js|ts|mjs)` file exists
- `next` dependency in package.json
