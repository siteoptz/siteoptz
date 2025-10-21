# DEPLOY OAUTH FIX TO SITEOPTZ.AI

## OAuth has been broken for over a week - Here's the fix:

### 1. Add Environment Variables to Vercel (3 minutes)

Go to: **https://vercel.com/siteoptzs-projects/siteoptz-ai/settings/environment-variables**

Add these 6 variables for **PRODUCTION**:

```
Variable Name                 | Value Location
------------------------------|------------------
GOOGLE_CLIENT_ID             | Check .env.local line 32
GOOGLE_CLIENT_SECRET         | Check .env.local line 33  
NEXTAUTH_SECRET              | Check .env.local line 37
NEXTAUTH_URL                 | https://siteoptz.ai
GHL_API_KEY                  | Check .env.local line 2
GHL_LOCATION_ID              | Check .env.local line 3
```

### 2. Trigger Redeployment (1 minute)

Option A - From Vercel Dashboard:
1. Go to https://vercel.com/siteoptzs-projects/siteoptz-ai
2. Click the latest deployment
3. Click "..." → "Redeploy"

Option B - From GitHub:
1. Make any small change and push to trigger deployment

### 3. What We Fixed

✅ **NextAuth Configuration** (`pages/api/auth/[...nextauth].ts`)
- Full GoHighLevel integration
- Proper OAuth callbacks
- User plan management from GHL tags

✅ **Removed Blocking Redirects** 
- vercel.json no longer blocks /api/auth/* routes

✅ **All Code is Ready**
- Everything is built and tested
- Just needs environment variables

### CRITICAL: The OAuth will NOT work until you add the environment variables above!

The code is perfect. The ONLY issue is missing environment variables on Vercel.