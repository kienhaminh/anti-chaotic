# Architecture: Web Fullstack (Next.js & Supabase)

This guide defines the architectural standards for modern fullstack web applications using the Next.js App Router and Supabase/Postgres ecosystem.

## 1. High-Level Strategy

- **Server-First**: Leverage React Server Components (RSC) to reduce client bundle size and access data directly.
- **Edge-Ready**: Design API routes and middleware to run on Edge runtimes for low latency where possible.
- **Type Safety**: End-to-end type safety from Database (Supabase) to Backend (Actions) to Frontend (Components).

## 2. Project Structure (Monorepo)

We use a Turborepo-style structure to separate concerns and enable code sharing.

```text
.
├── apps/
│   ├── web/                 # Main Next.js Application
│   │   ├── app/             # App Router (Routes & Layouts)
│   │   ├── components/      # Local components specific to this app
│   │   ├── lib/             # App-specific utilities
│   │   └── middleware.ts    # Edge middleware (Auth, Rewrites)
│   └── docs/                # Documentation site (if separate)
└── packages/
    ├── ui/                  # Shared UI Component Library (Shadcn/UI)
    ├── database/            # Database schema, migrations, and typed client
    ├── eslint-config/       # Shared linting rules
    └── typescript-config/   # Shared tsconfig
```

## 3. Core Patterns

### 3.1 Component Architecture (RSC vs Client)

- **Default to Server**: All components are RSC by default. Fetch data here.
- **Leaf Client Components**: Push `use client` down the tree. Ideally, only interactive buttons/forms are client-side.
- **Composition**: Pass Client Components as `children` to Server Components to avoid "waterfalls" of client-side JavaScript.

### 3.2 Data Fetching & Caching

- **Fetch in Components**: Fetch data directly in RSCs where it is needed. Next.js dedupes requests automatically.
- **Server Actions**: Use Server Actions for **Mutations** (POST/PUT/DELETE).
  - Always validate input with **Zod** schema.
  - Return standard `Result<T, E>` objects, not bare data or errors.
- **Revalidation**: Use `revalidateTag` for granular cache invalidation after mutations.

### 3.3 Database Access (Supabase/Postgres)

- **Schema Schema**:
  - `public`: Tables exposed via API (if using PostgREST).
  - `private` / `auth`: Internal schemas.
- **RLS (Row Level Security)**: **MANDATORY**. Never disable RLS. Write policies that rely on `auth.uid()`.
- **Data Access Layer**:
  - Do NOT call DB directly from UI components.
  - Create a clean Data Access Layer (DAL) in `@package/database` or `apps/web/lib/db`.
  - Example: `getUserProfile(userId)` rather than `supabase.from('profiles').select()...` inline.

## 4. State Management

- **Server State**: React Query (TanStack Query) is generally _not_ needed if using App Router deep integration, but useful if you have complex client-side polling/caching needs.
- **URL State**: The URL is the single source of truth for sharable state (search params, filters, active tabs).
- **Global Client State**: Use **Zustand** only for truly global, non-server state (e.g., Sidebar open/close, Audio player status). Use React Context for compound components.

## 5. Security & Performance

### Security

- **Middleware**: Handle Authentication (Session Validation) and Authorization (Role Checks) in `middleware.ts` to protect routes at the edge.
- **Validation**: Every Server Action must start with `inputSchema.parse(data)`.
- **CSP**: Content Security Policy headers should be configured (careful with nonces for streaming).

### Performance (Core Web Vitals)

- **LCP (Largest Contentful Paint)**: Preload critical images, use `next/font`.
- **CLS (Cumulative Layout Shift)**: explicit width/height for media, skeletons for checking states.
- **Streaming**: Use `<Suspense>` boundaries to wrap slow data fetches. Let the shell load instantly.

## 6. Development Workflow

1.  **Migration**: Modify schema in `packages/database` -> `supabase db diff` -> `supabase db push`.
2.  **Type Gen**: Run `supabase gen types` to update TypeScript definitions.
3.  **Implementation**: Build RSC -> Connect to DAL -> Add Server Action for interactivity.
