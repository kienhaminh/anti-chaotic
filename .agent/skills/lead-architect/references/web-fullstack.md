# Architecture: Web Fullstack

## Stack

- **Frontend**: Next.js (App Router)
- **Backend**: Server Actions + Edge Functions
- **DB**: Postgres (Supabase)

## Structure

```
apps/
  web/
    app/
    components/
packages/
  ui/
  db/
  config/
```

## Data Flow

Client (Zustand) -> Server Action (Zod Validation) -> DB Service (Drizzle) -> Postgres
