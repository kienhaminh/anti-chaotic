# Vue & Nuxt 3 Architecture

**Status**: Definitive Guide
**Stack**: Vue 3 (Composition API), Nuxt 3

## 🏗 Architecture: Composition & Modules

### 1. Composition API Only

- **Ban**: Options API (`data`, `methods`).
- **Enforce**: `<script setup lang="ts">`.
- **Why**: Better TypeScript support, logic reuse via composables.

### 2. Nuxt Directory Structure

```
server/              # API routes (Nitro)
components/          # Auto-imported components
composables/         # Auto-imported logic
pages/               # File-based routing
layouts/             # Layouts
stores/              # Pinia definitions
```

## ⚡ Performance Patterns

### 1. Data Fetching

- **SSR-Friendly**: Use `useFetch` or `useAsyncData`.
- **Keying**: Always provide a unique key if parameters change.
- **Lazy**: `lazy: true` to prevent blocking navigation.

```ts
// ✅ GOOD
const { data, pending } = await useFetch("/api/posts", {
  lazy: true,
  server: false, // If client-only execution is needed
});
```

### 2. State Management (Pinia)

- **Setup Stores**: Use the function syntax (like `setup()`), not the object syntax.
- **Dedupe**: Don't put everything in store. Use `useState` for simple shared state.

### 3. Compute Stability

- Use `computed()` for derived state.
- Use `shallowRef()` for large objects that don't need deep reactivity.

## 🧪 Testing

- **Unit**: Vitest.
- **Component**: Vue Test Utils.
- **E2E**: Nuxt Test Utils (Playwright wrapper).
