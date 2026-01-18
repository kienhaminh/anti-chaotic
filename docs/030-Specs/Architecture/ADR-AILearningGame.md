	# Architecture Decision Records (ADRs): AI Learning Web Game

**Project**: AI Learning Web Game
**Related**: [[SDD-AILearningGame]]

---

## ADR-001: Module Lazy Loading Strategy

**Status**: Accepted
**Date**: 2026-01-18
**Deciders**: Lead Architect

### Context

The AI Learning Web Game includes multiple heavy game engines:

- **Phaser 3**: ~500KB for 2D simulations
- **Three.js**: ~600KB for 3D visualizations
- **Monaco Editor**: ~2MB for code editing
- **Pyodide**: ~15MB for Python execution

Loading all these on initial page load would result in:

- Very slow Time to Interactive (>10s)
- High bandwidth usage for users who may not need all features
- Poor Core Web Vitals scores

### Decision

We will use **Next.js dynamic imports** with `{ ssr: false }` to lazy-load game modules only when the user navigates to them.

```typescript
// Example implementation
import dynamic from 'next/dynamic';

const VisualNovelModule = dynamic(
  () => import('@/modules/visual-novel'),
  { ssr: false, loading: () => <ModuleLoader /> }
);

const SimulationModule = dynamic(
  () => import('@/modules/simulation'),
  { ssr: false, loading: () => <ModuleLoader /> }
);
```

### Consequences

**Positive**:

- Fast initial page load (<3s)
- Users only download what they use
- Better Lighthouse scores
- Reduced server costs

**Negative**:

- Slight delay when entering a game module for the first time
- More complex code splitting configuration
- Need loading states for each module

**Mitigation**:

- Prefetch modules on hover/focus of module cards
- Show engaging loading animations
- Use service worker to cache modules

---

## ADR-002: Local-First Progress Storage

**Status**: Accepted
**Date**: 2026-01-18
**Deciders**: Lead Architect

### Context

We want to:

1. Support offline/guest play
2. Minimize backend API calls (cost)
3. Provide instant feedback on progress
4. Still sync data for logged-in users

### Options Considered

| Option                       | Pros                   | Cons                                |
| ---------------------------- | ---------------------- | ----------------------------------- |
| **A. Server-only**           | Single source of truth | No offline, every action = API call |
| **B. Local-only**            | Fast, offline          | No cross-device sync                |
| **C. Local-first with sync** | Best of both           | Complexity, conflict resolution     |

### Decision

We will implement **Option C: Local-first with sync**.

**Implementation**:

1. All progress written to `localStorage` immediately
2. For logged-in users, sync to Supabase on:
   - Lesson completion
   - Quiz submission
   - Session end (beforeunload)
   - Manual sync button
3. On login, merge local progress with server data
4. Conflict resolution: **Server wins** for XP/achievements, **Latest timestamp wins** for lesson progress

```typescript
// Sync service pseudocode
const syncProgress = async () => {
  const local = getLocalProgress();
  const server = await fetchServerProgress();
  const merged = mergeProgress(local, server);
  await saveToServer(merged);
  saveToLocal(merged);
};
```

### Consequences

**Positive**:

- Works offline for guests
- Instant UI updates
- Reduced API calls
- Better UX

**Negative**:

- Conflict resolution complexity
- Potential data inconsistency window
- Need to handle localStorage limits

**Mitigation**:

- Clear conflict resolution rules
- Periodic background sync
- Compress progress data

---

## ADR-003: Supabase as Backend-as-a-Service

**Status**: Accepted
**Date**: 2026-01-18
**Deciders**: Lead Architect

### Context

For MVP, we need:

- User authentication
- Database for users, progress, achievements
- Potentially real-time features (leaderboards)
- Minimal setup time

### Options Considered

| Option                               | Pros                                        | Cons                          |
| ------------------------------------ | ------------------------------------------- | ----------------------------- |
| **A. Custom backend (Express/Nest)** | Full control                                | More dev time, infrastructure |
| **B. Firebase**                      | Google ecosystem, mature                    | Vendor lock-in, pricing       |
| **C. Supabase**                      | Open-source, PostgreSQL, generous free tier | Newer, smaller community      |
| **D. PlanetScale + Auth0**           | Scalable DB + enterprise auth               | Multiple services, cost       |

### Decision

We will use **Option C: Supabase** for MVP.

**Rationale**:

1. **Open-source**: Can self-host if needed later
2. **PostgreSQL**: Standard SQL, easy migrations
3. **Integrated Auth**: No separate auth service
4. **Row Level Security**: Secure by default
5. **Free tier**: 500MB database, 50K monthly active users
6. **Real-time**: Built-in subscriptions for future features

### Consequences

**Positive**:

- Fast development (Auth + DB + Storage in one)
- Lower initial cost
- Exit strategy (open-source, standard PostgreSQL)
- TypeScript SDK with good DX

**Negative**:

- Vendor dependency during MVP
- Some features less mature than Firebase
- Regional availability (fewer regions than AWS)

**Mitigation**:

- Use standard SQL patterns (easy to migrate)
- Abstract data layer for future flexibility
- Monitor Supabase performance

---

## ADR-004: Visual Novel Script Format

**Status**: Proposed
**Date**: 2026-01-18
**Deciders**: Lead Architect, Content Team

### Context

The Visual Novel engine needs a content format that:

- Writers can edit without coding knowledge
- Supports dialogue, choices, branching
- Is version-control friendly
- Can be validated programmatically

### Options Considered

| Option            | Pros                            | Cons                        |
| ----------------- | ------------------------------- | --------------------------- |
| **A. JSON**       | Standard, easy to parse         | Verbose, hard to read/write |
| **B. YAML**       | Human-readable, less verbose    | Indentation sensitive       |
| **C. MDX**        | Markdown + JSX, writer-friendly | Complex parsing             |
| **D. Custom DSL** | Optimized for VN                | Need to build tooling       |

### Decision

We will use **Option B: YAML** for story scripts.

**Format Example**:

```yaml
scene: classroom_intro
background: classroom_day
music: calm_intro

dialogue:
  - character: professor
    expression: smile
    text:
      vi: "Chào mừng các em đến với bài học đầu tiên về AI!"
      en: "Welcome to your first lesson on AI!"

  - character: professor
    expression: thinking
    text:
      vi: "Các em đã bao giờ sử dụng AI chưa?"
      en: "Have you ever used AI before?"

  - choice:
      prompt:
        vi: "Bạn trả lời thế nào?"
        en: "How do you respond?"
      options:
        - text:
            vi: "Có, tôi dùng AI hàng ngày!"
            en: "Yes, I use AI every day!"
          goto: ai_user_path
        - text:
            vi: "Tôi không chắc AI là gì..."
            en: "I'm not sure what AI is..."
          goto: ai_newbie_path
```

### Consequences

**Positive**:

- Human-readable for writers
- Built-in i18n support
- Easy to version control
- YAML parsers available in all languages

**Negative**:

- Indentation errors can break scripts
- Need schema validation
- Slightly larger file size than JSON

**Mitigation**:

- Provide YAML schema for IDE validation
- Build script validator tool
- Create writer documentation

---

## ADR-005: Python Execution Strategy (Phase 3)

**Status**: Proposed
**Date**: 2026-01-18
**Deciders**: Lead Architect

### Context

For the Code Editor module (Phase 3), users need to run Python code for AI experiments. Options:

1. **Server-side execution**: Security risk, infrastructure cost
2. **Client-side WASM (Pyodide)**: Safe sandbox, large download

### Decision

We will use **Pyodide (WebAssembly Python)** for client-side execution.

**Rationale**:

- No server infrastructure needed
- Sandboxed execution (no file/network access)
- Full Python with numpy, scipy available
- User code never leaves their browser

**Trade-offs**:

- ~15MB initial download
- Performance ~3-5x slower than native
- Limited to supported packages

**Mitigation**:

- Lazy-load Pyodide only when entering code module
- Pre-install common packages
- Cache in service worker

---

## Summary

| ADR     | Topic                | Status      |
| ------- | -------------------- | ----------- |
| ADR-001 | Module Lazy Loading  | ✅ Accepted |
| ADR-002 | Local-First Progress | ✅ Accepted |
| ADR-003 | Supabase as BaaS     | ✅ Accepted |
| ADR-004 | YAML Script Format   | 🟡 Proposed |
| ADR-005 | Pyodide for Python   | 🟡 Proposed |
