# Platform: Vercel & Supabase

## CI/CD Pipeline (GitHub Actions)

1.  **Pull Request**:
    - `npm run lint`
    - `npm run typecheck`
    - `npm run test:unit`
    - Vercel Preview Deployment (Automatic)

2.  **Merge to Main**:
    - Supabase Migration (`supabase migration up`)
    - Vercel Production Deployment

## Secrets

- **Required**: `NEXT_PUBLIC_SUPABASE_URL`, `SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY` (CI only), `DATABASE_URL`.
