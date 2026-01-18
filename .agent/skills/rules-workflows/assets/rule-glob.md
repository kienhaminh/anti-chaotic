---
trigger: glob
glob: src/**/*.tsx
---

# React Component Guidelines

## Component Structure

- Use functional components with hooks
- Keep components focused and single-purpose
- Extract reusable logic into custom hooks

## Props

- Define TypeScript interfaces for all props
- Use destructuring in component signature
- Provide default values where appropriate

## State Management

- Use local state for UI-only concerns
- Leverage context for shared state
- Consider React Query for server state
