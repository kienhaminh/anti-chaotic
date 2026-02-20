# Deployment Guide

## Hosting with Mintlify & Vercel Integration

Great news! While Mintlify hosts the documentation content, you can seamlessly integrate it with your Vercel-hosted main site using **Subpath Rewrites**.

This allows you to serve your docs at `yoursite.com/docs` (hosted on Vercel) while the content is powered by Mintlify.

### How to Setup

1. **Deploy to Mintlify**:
   - Push this `docs` folder to a GitHub repository.
   - Import it at [dashboard.mintlify.com](https://dashboard.mintlify.com).
   - Your docs will be live at `your-project.mintlify.app`.

2. **Configure Vercel Rewrite** (Optional, if you have a main app):
   - In your main Vercel project (e.g., your landing page or app), add this to `vercel.json`:

   ```json
   {
     "rewrites": [
       {
         "source": "/docs",
         "destination": "https://your-project.mintlify.app/docs"
       },
       {
         "source": "/docs/:match*",
         "destination": "https://your-project.mintlify.app/docs/:match*"
       }
     ]
   }
   ```

## Local Development

Preview your changes locally:

```bash
npx mintlify dev
```

This starts a local server at `http://localhost:3000`.
