# Optz BI Vercel Deployment Guide

## Quick Deploy to optz.siteoptz.ai

Since you've already created the subdomain, here's how to deploy Optz BI to Vercel:

### 1. Deploy from marketing-roi-tracker directory

```bash
cd marketing-roi-tracker
vercel --prod
```

### 2. Configure custom domain in Vercel dashboard

1. Go to your Vercel dashboard
2. Select the optz-bi project
3. Go to Settings → Domains
4. Add `optz.siteoptz.ai` as a custom domain
5. Vercel will provide DNS instructions (should already be set up)

### 3. Environment Variables

Set these in your Vercel project settings:

```
NODE_ENV=production
REACT_APP_API_URL=https://optz.siteoptz.ai/api
JWT_SECRET=your-super-secret-jwt-key
```

### 4. Build Configuration

The `vercel.json` file is already configured to:
- Serve the React frontend from `/`
- Route API calls to `/api/*` to the Node.js backend
- Handle both frontend and backend in one deployment

### 5. Alternative: Deploy via GitHub

1. Connect your GitHub repo to Vercel
2. Set the root directory to `marketing-roi-tracker/`
3. Framework preset: Other
4. Build command: `cd frontend && npm run build`
5. Output directory: `frontend/build`
6. Install command: `cd frontend && npm install && cd ../backend && npm install`

### 6. Test the deployment

Once deployed, test:
- Frontend: `https://optz.siteoptz.ai`
- API: `https://optz.siteoptz.ai/api/health`

## Quick Commands

```bash
# Deploy to Vercel
cd marketing-roi-tracker
vercel --prod

# Check deployment status
vercel ls

# View logs
vercel logs
```

The subdomain should be live at `https://optz.siteoptz.ai` once deployed!