---
description: Standard workflow for deploying to staging environment
---

# Deploy to Staging

This workflow guides through deploying the application to staging.

## Step 1: Run Tests

Ensure all tests pass before deployment:

```bash
npm run test
```

## Step 2: Build Application

Build the production bundle:

```bash
npm run build
```

## Step 3: Deploy to Staging

Deploy the built application:

```bash
npm run deploy:staging
```

## Step 4: Verify Deployment

- Check the staging URL is accessible
- Verify key functionality works
- Review logs for any errors
