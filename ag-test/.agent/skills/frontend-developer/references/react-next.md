# React & Next.js Architecture

**Status**: Definitive Guide
**Stack**: React 18+, Next.js App Router (14+)

## 🏗 Architecture: "Server-Centric" Design

### 1. The Separation: Server vs. Client

- **Default to Server Components (RSC)**: All components are Server by default.
- **Client Components**: Only use `'use client'` when you need:
  - Event listeners (`onClick`, `onChange`)
  - Hooks (`useState`, `useEffect`)
  - Browser-only APIs

### 2. File Structure (Feature-Sliced)

```
app/
├── layout.tsx         # Root layout
├── page.tsx           # Home
├── (auth)/            # Route Group (doesn't affect URL)
│   ├── login/
│   │   └── page.tsx
├── _components/       # Shared UI
└── features/          # Feature Modules
    ├── cart/
    │   ├── components/
    │   ├── hooks/
    │   └── actions.ts # Server Actions
```

## ⚡ Performance Patterns

### 1. Data Fetching

- **No `useEffect`**: Fetch data directly in Server Components using `async/await`.
- **Deduplication**: `fetch` is auto-memoized.
- **Waterfalls**: Use `Promise.all` for parallel fetching, or use `<Suspense>` for streaming.

```tsx
// ✅ GOOD: Streaming
export default async function Page() {
  return (
    <Suspense fallback={<Skeleton />}>
      <UserFeed /> {/* Fetches its own data */}
    </Suspense>
  );
}
```

### 2. Server Actions instead of API Routes

- Colocate mutations with the feature code.
- Use `useFormStatus` for pending states.
- Use `useOptimistic` for instant UI updates.

### 3. Image Optimization

- Required usage of `next/image`.
- **sizes**: mandatory prop for responsive images. `sizes="(max-width: 768px) 100vw, 50vw"`.

## 🧪 Testing

- **Unit**: Vitest/Jest for logic.
- **Integration**: React Testing Library for Client Components.
- **E2E**: Playwright for full flows.
