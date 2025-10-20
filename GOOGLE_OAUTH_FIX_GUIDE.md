# Google OAuth Fix Guide

## Problem Identified
The "Continue with Google" button was stalling indefinitely because:

1. **NextAuth was completely blocked** - The file `/siteoptz.ai/pages/api/auth/[...nextauth].js` was overriding all NextAuth functionality and blocking OAuth requests
2. **Missing Google OAuth credentials** - The environment variables `GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_SECRET` were not configured

## Fixes Applied

### 1. Removed Blocking NextAuth Override
- Renamed `/siteoptz.ai/pages/api/auth/[...nextauth].js` to `[...nextauth].js.blocked`
- Copied the proper NextAuth configuration from `/pages/api/auth/[...nextauth].ts` to `/siteoptz.ai/pages/api/auth/[...nextauth].ts`

### 2. Updated Environment Variables Template
- Added `GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_SECRET` to `.env.example`

## Required Actions to Complete the Fix

### 1. Set Up Google OAuth Credentials

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing one
3. Enable the Google+ API or Google Identity API
4. Go to "Credentials" → "Create Credentials" → "OAuth client ID"
5. Choose "Web application"
6. Add authorized redirect URIs:
   - For local development: `http://localhost:3000/api/auth/callback/google`
   - For production: `https://siteoptz.ai/api/auth/callback/google`
   - For production: `https://www.siteoptz.ai/api/auth/callback/google`
7. Copy the Client ID and Client Secret

### 2. Update Your .env File

Add these lines to your `.env` file (not .env.example):

```bash
# Google OAuth Configuration
GOOGLE_CLIENT_ID=your_actual_google_client_id_here
GOOGLE_CLIENT_SECRET=your_actual_google_client_secret_here
```

### 3. Restart the Application

After adding the environment variables:

```bash
# If using Next.js development server
npm run dev
# or
yarn dev

# If using production build
npm run build && npm start
```

## Verification Steps

1. Open the application in browser
2. Click "Continue with Google" button
3. You should be redirected to Google's OAuth consent screen
4. After authorization, you should be redirected back to `/dashboard`

## Troubleshooting

### If the button still stalls:

1. **Check browser console** for errors:
   - Open Developer Tools (F12)
   - Look for errors in Console tab
   - Check Network tab for failed requests to `/api/auth/signin` or `/api/auth/providers`

2. **Verify environment variables are loaded**:
   - Add this debug code temporarily to check if variables are loaded:
   ```javascript
   console.log('Google OAuth Config:', {
     hasClientId: !!process.env.GOOGLE_CLIENT_ID,
     hasClientSecret: !!process.env.GOOGLE_CLIENT_SECRET
   });
   ```

3. **Check NextAuth logs** on the server console for any authentication errors

4. **Verify the callback URL** matches exactly what's configured in Google Cloud Console

### Common Issues:

- **"redirect_uri_mismatch"** - The callback URL in Google Console doesn't match your app's URL
- **"invalid_client"** - The client ID or secret is incorrect
- **CORS errors** - Make sure your domain is properly configured in Google Console

## File Locations

- Main NextAuth config: `/pages/api/auth/[...nextauth].ts`
- Backup NextAuth config: `/siteoptz.ai/pages/api/auth/[...nextauth].ts`
- Login Modal: `/components/LoginModal.tsx`
- Blocked override (renamed): `/siteoptz.ai/pages/api/auth/[...nextauth].js.blocked`

## Security Note

Never commit your actual `GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_SECRET` to version control. Keep them in your local `.env` file only.