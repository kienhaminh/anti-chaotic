# Modern Angular Architecture

**Status**: Definitive Guide
**Stack**: Angular 17+

## 🏗 Architecture: Standalone & Zone-less

### 1. Standalone Components

- **Ban**: `NgModule` (unless for legacy libs).
- **Enforce**: `standalone: true` in all components, directives, and pipes.
- **Why**: Tree-shaking, easier testing, simplified learning curve.

### 2. Signals (State Management)

- **Signals over Observables**: Use Signals for synchronous state. Use RxJS ONLY for complex asynchronous event streams (debounce, switchMap).
- **Ban**: `Zone.js` (eventually). Prepare for zoneless by using `ChangeDetectionStrategy.OnPush` everywhere.

```typescript
// ✅ GOOD: Signal
@Component({ ... changeDetection: ChangeDetectionStrategy.OnPush })
export class Counter {
  count = signal(0);
  double = computed(() => this.count() * 2);

  increment() {
    this.count.update(c => c + 1);
  }
}
```

### 3. Control Flow Syntax

- **Use**: `@if`, `@for`, `@switch`.
- **Ban**: `*ngIf`, `*ngFor` (legacy structural directives).

## ⚡ Performance Patterns

### 1. Deferrable Views

- Use `@defer` to lazy load components without routing.
- Criteria: `@defer (on viewport)` for below-the-fold content.

### 2. Hydration

- Enable Client Hydration in `app.config.ts`.
- Avoid direct DOM manipulation which breaks hydration.

## 🧪 Testing

- **Harnesses**: Use Component Harnesses for robust tests.
- **Signals**: Test signals by verifying computed outputs.
