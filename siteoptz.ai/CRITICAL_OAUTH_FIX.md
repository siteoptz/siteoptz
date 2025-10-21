# 🚨 CRITICAL: OAuth Authentication Fix for SiteOptz.ai

## THE PROBLEM
Users are getting "OAuthCallback" error when trying to sign in with Google because:
**THE GOOGLE OAUTH CREDENTIALS ARE NOT SET IN VERCEL!**

## ROOT CAUSE IDENTIFIED
After deep investigation, the issue is that the environment variables in Vercel are using placeholder values:
- `GOOGLE_CLIENT_ID` is set to `your-google-client-id-here` (INVALID)
- `GOOGLE_CLIENT_SECRET` is set to `your-google-client-secret-here` (INVALID)

This causes NextAuth to reject the OAuth callback with the exact error you're seeing.

## IMMEDIATE FIX REQUIRED

### Step 1: Get Real Google OAuth Credentials
1. Go to https://console.cloud.google.com/
2. Select your project (or create a new one)
3. Go to **APIs & Services** > **Credentials**
4. Click **+ CREATE CREDENTIALS** > **OAuth 2.0 Client ID**
5. Application type: **Web application**
6. Name: `SiteOptz.ai Production`
7. Authorized redirect URIs - ADD THESE EXACTLY:
   ```
   https://siteoptz.ai/api/auth/callback/google
   http://localhost:3000/api/auth/callback/google
   ```
8. Click **CREATE**
9. Copy the **Client ID** and **Client Secret**

### Step 2: Set Environment Variables in Vercel
1. Go to https://vercel.com/siteoptz/siteoptz-ai/settings/environment-variables
2. Add/Update these variables:

| Variable | Value | Environment |
|----------|-------|-------------|
| `GOOGLE_CLIENT_ID` | Your actual Client ID from Google | Production |
| `GOOGLE_CLIENT_SECRET` | Your actual Client Secret from Google | Production |
| `NEXTAUTH_SECRET` | Generate with: `openssl rand -base64 32` | Production |
| `NEXTAUTH_URL` | `https://siteoptz.ai` | Production |
| `GHL_API_KEY` | `pit-8954f181-e668-4613-80d6-c7b4aa8594b8` | Production |
| `GHL_LOCATION_ID` | `ECu5ScdYFmB0WnhvYoBU` | Production |

### Step 3: Redeploy
1. After setting the variables, go to the Deployments tab
2. Click the three dots on the latest deployment
3. Click **Redeploy**
4. Wait for deployment to complete

### Step 4: Test
1. Clear your browser cookies for siteoptz.ai
2. Go to https://siteoptz.ai/login
3. Click "Continue with Google"
4. Should authenticate successfully and redirect to dashboard

## VERIFICATION SCRIPT
Run this diagnostic script to verify your setup:
```bash
cd /Users/siteoptz/siteoptz/siteoptz.ai
node scripts/diagnose-oauth-issue.js
```

## WHY THIS HAPPENED
The NextAuth configuration has a safety check that prevents authentication if Google OAuth credentials are not properly configured. This is line 131-137 in `[...nextauth].ts`:

```typescript
if (!process.env.GOOGLE_CLIENT_ID || !process.env.GOOGLE_CLIENT_SECRET || 
    process.env.GOOGLE_CLIENT_ID.includes('your-') || 
    process.env.GOOGLE_CLIENT_SECRET.includes('your-')) {
  console.error('❌ Google OAuth not properly configured!');
  return false; // This causes the OAuthCallback error
}
```

## COMMON MISTAKES TO AVOID
1. ❌ Don't use placeholder values like "your-client-id-here"
2. ❌ Don't forget the `/api/auth/callback/google` path in redirect URI
3. ❌ Don't use `http://` for production - use `https://siteoptz.ai`
4. ❌ Don't forget to redeploy after changing environment variables

## EMERGENCY FALLBACK
If OAuth still doesn't work after following these steps:
1. Users can use email/password login at https://siteoptz.ai/auth-login
2. Check Vercel function logs for detailed error messages
3. Run the diagnostic script for troubleshooting

## SUPPORT
If you need the actual Google OAuth credentials and don't have access to create them:
1. Contact your Google Workspace admin
2. Or create a new project in Google Cloud Console
3. The process is free and takes about 5 minutes

---
**Last Updated:** October 21, 2024
**Status:** CRITICAL - Production authentication is broken until this is fixed