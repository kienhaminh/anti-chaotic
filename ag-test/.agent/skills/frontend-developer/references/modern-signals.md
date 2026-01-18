# Modern Signals & Fine-Grained Reactivity

**Stack**: Svelte 5 (Runes), SolidJS, Qwik

## 🧠 The Philosophy: "No Virtual DOM"

Unlike React/Vue, these frameworks target the DOM directly.

- **Fine-Grained**: Only the text node that changes updates. No component re-renders.
- **Mental Model**: Code runs _once_ (setup), then reactivity takes over.

## 🧱 Framework specifics

### Svelte 5 (Runes)

- **State**: `let count = $state(0)`
- **Derived**: `let double = $derived(count * 2)`
- **Side Effects**: `$effect(() => ...)`
- **Snippets**: Replace slots with `{#snippet}`.

### SolidJS

- **Read/Write Split**: `const [count, setCount] = createSignal(0)`
- **DOM Access**: strictly in `onMount`.
- **Control Flow**: Use `<Show>`, `<For>` (don't use map).

### Qwik (Resumability)

- **The Golden Rule**: Do not execute JS on the client unless checking an event.
- **Serialized State**: All state must be serializable (JSON).
- **$**: The optimizer barrier. `onClick$`, `useSignal$`.

## ⚡ Performance Targets

1.  **Hydration**:
    - **Svelte/Solid**: Fast hydration.
    - **Qwik**: No hydration (Resumability).
2.  **Closures**: Avoid creating closures in render loops (except Qwik where `$` handles it).

## 🧪 Testing

- **E2E**: Playwright is the gold standard for all three.
- **Unit**: Vitest.
