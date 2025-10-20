# Google OAuth Fix - Deployment Checklist

## CRITICAL ISSUES IDENTIFIED & FIXED

### 1. Missing Google OAuth Credentials (PRIMARY CAUSE)
- **Problem**: The .env.local file has placeholder values instead of actual Google credentials
- **Solution**: Real Google OAuth credentials MUST be added to Vercel

### 2. Broken NextAuth Callback Route
- **Problem**: vercel.json was redirecting ALL /api/auth/* paths to /auth-login, breaking OAuth callbacks
- **Fixed**: Removed the problematic redirect in vercel.json

### 3. Missing Login Page
- **Problem**: NextAuth configured to use /login but page didn't exist
- **Fixed**: Created proper /login page with Google OAuth support

## DEPLOYMENT STEPS (MUST DO IN ORDER)

### Step 1: Set Up Google OAuth Credentials
1. Go to https://console.cloud.google.com/
2. Select your project (or create new one)
3. Navigate to "APIs & Services" > "Credentials"
4. Click "Create Credentials" > "OAuth 2.0 Client ID"
5. Application type: "Web application"
6. Name: "SiteOptz.ai Production"
7. Add Authorized redirect URIs:
   - `https://siteoptz.ai/api/auth/callback/google`
   - `http://localhost:3000/api/auth/callback/google` (for local testing)
8. Save and copy the Client ID and Client Secret

### Step 2: Configure Vercel Environment Variables
1. Go to https://vercel.com/dashboard
2. Select the siteoptz.ai project
3. Go to Settings > Environment Variables
4. Add/Update these variables for Production:
   ```
   GOOGLE_CLIENT_ID=<your-actual-client-id>
   GOOGLE_CLIENT_SECRET=<your-actual-client-secret>
   NEXTAUTH_SECRET=<generate-with: openssl rand -base64 32>
   NEXTAUTH_URL=https://siteoptz.ai
   GHL_API_KEY=pit-8954f181-e668-4613-80d6-c7b4aa8594b8
   GHL_LOCATION_ID=ECu5ScdYFmB0WnhvYoBU
   ```

### Step 3: Deploy the Fixed Code
1. Commit all changes:
   ```bash
   git add .
   git commit -m "Fix Google OAuth: Remove blocking redirects, add login page, fix configuration"
   git push origin main
   ```
2. Vercel will auto-deploy from the main branch
3. Wait for deployment to complete (usually 2-3 minutes)

### Step 4: Verify the Fix
1. Go to https://siteoptz.ai/login
2. Click "Continue with Google"
3. Should redirect to Google's OAuth consent screen
4. After authorization, should redirect back to dashboard

## TESTING CHECKLIST

- [ ] Login page loads at https://siteoptz.ai/login
- [ ] Google OAuth button is visible and clickable
- [ ] Clicking button redirects to Google
- [ ] Google OAuth consent screen appears
- [ ] After authorization, redirects to dashboard
- [ ] User session is created successfully
- [ ] Dashboard shows correct user information

## TROUBLESHOOTING

### If still getting OAuthCallback error:
1. Check Vercel logs for specific error messages
2. Verify environment variables are set correctly in Vercel
3. Confirm Google OAuth redirect URIs match exactly
4. Check browser console for any client-side errors

### Common Issues:
- **"Invalid redirect_uri"**: The callback URL in Google Console doesn't match
- **"Missing credentials"**: Environment variables not set in Vercel
- **"Invalid grant"**: NEXTAUTH_SECRET changed or mismatched
- **Still redirecting to auth-login**: Clear browser cache and cookies

## FILES MODIFIED

1. `/vercel.json` - Removed problematic OAuth redirect
2. `/pages/login.js` - Created proper OAuth login page
3. `/.env.production` - Template for production environment variables
4. `/pages/api/auth/[...nextauth].ts` - Already configured correctly

## IMMEDIATE ACTION REQUIRED

The OAuth will NOT work until you:
1. Add real Google OAuth credentials to Vercel
2. Generate and add a secure NEXTAUTH_SECRET
3. Deploy these changes to production

This has been broken for over a week - these steps MUST be completed TODAY.