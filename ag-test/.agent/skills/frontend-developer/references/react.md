# Tech Stack: React & Next.js (Expert Guide)

> **RESEARCH FIRST**: Before implementing, use `mcp_context7_query-docs` or `web_search` to verify you are using the latest version of Next.js features and React hooks patterns.

You are an expert in React's internal mechanisms (Fiber, Reconciliation). You don't just "use hooks"; you understand _closure traps_ and _dependency arrays_.

## 🌟 Core Philosophy

- **UI = f(state)**: The UI is a pure projection of the application state.
- **Unidirectional Data Flow**: Props go down, events go up.
- **Escape Hatches are Dangerous**: Refs and `useEffect` are escape hatches. Use them only when you cannot derive behavior from rendering.

## 🏗 Advanced Patterns

### 1. Compound Components

Avoid prop drilling and giant configuration objects.

```tsx
// Bad: <Select options={[{...}]} onChange={...} />

// Good:
<Select onValueChange={setValue}>
  <SelectTrigger>{value}</SelectTrigger>
  <SelectContent>
    <SelectItem value="apple">Apple</SelectItem>
    <SelectItem value="banana">Banana</SelectItem>
  </SelectContent>
</Select>
```

### 2. Custom Hooks as Logic Layer

Extract _all_ logic into custom hooks. Keep components focused on _rendering_.

```tsx
// Component
function UserProfile() {
  const { user, loading, error } = useUserProfile(id);
  // ... render ...
}

// Hook
function useUserProfile(id: string) {
  // ... query, transformation, side effects ...
  return { user, loading, error };
}
```

### 3. Server Components (RSC) vs Client Components

- **Default to Server Components**: Fetch data, access DB, keep secrets.
- **"Client Boundary" at the Leaves**: Add `'use client'` only when you need interactivity (onClick, useState, useEffect).
- **Pattern**: Pass Server Component data as _props_ to Client Components.

## 📦 State Management Strategy

1.  **Server State**: **React Query (TanStack Query)** or **SWR**.
    - _Never_ put API data in `useState` unless you are transforming it heavily for UI state.
    - Use `staleTime` and `gcTime` aggressively.
2.  **Global UI State**: **Zustand** (preferred) or Context API.
    - Context is for _Dependency Injection_ (Themes, Auth, Toast).
    - Zustand is for _Data Stores_ (Cart, Multi-step Form Data).
3.  **Local State**: `useState` / `useReducer`.
4.  **Form State**: **React Hook Form**.
    - Uncontrolled components for performance (no re-render on every keystroke).
    - **Zod** for schema validation.

## 🚀 Performance Optimization

1.  **Referential Stability**:
    - Objects/Arrays declared in render body = new reference every render.
    - `useMemo` for derived objects/arrays passed as props.
    - `useCallback` for functions passed as props to memoized children.
2.  **Virtualization**:
    - Rendering lists > 50 items? Use `react-window` or `tanstack-virtual`.
3.  **Code Splitting**:
    - `lazy()` and `<Suspense>` for heavy route components or heavy libraries (charts, maps).

## 🛡 Anti-Patterns to Avoid

1.  **Prop Drilling**: Passing props through 5 layers. -> Use Composition or Context.
2.  **Effect Chaining**: `useEffect` triggering state change, triggering another `useEffect`. -> Combine logic or derive state.
3.  **Stale Closures**: Forgetting dependencies in `useEffect` or `useCallback`.
4.  **"God Components"**: Components with > 200 lines or > 5 hook calls.

## 🧪 Testing (React Testing Library)

- **Priority**: `screen.findByRole('button', { name: /save/i })`
- **User Event**: Use `userEvent.type()` instead of `fireEvent.change()`.
- **Wrappers**: Create a custom `render` function that wraps components in all Providers (Auth, QueryClient, Theme).
