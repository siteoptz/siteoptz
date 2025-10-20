# Google Console OAuth Setup - MUST BE EXACT

## Step 1: Go to Google Cloud Console
https://console.cloud.google.com/

## Step 2: Select Your Project
Make sure you're in the correct project that has your OAuth credentials.

## Step 3: Navigate to OAuth 2.0 Client
1. Go to "APIs & Services" → "Credentials"
2. Find your OAuth 2.0 Client ID (should be: 809428295933-hgpoif5v674qqegqo6pggoeuvt7p3rdo.apps.googleusercontent.com)
3. Click on it to edit

## Step 4: Configure Authorized JavaScript origins
Add these EXACTLY (no trailing slashes):
```
https://siteoptz.ai
http://localhost:3000
```

## Step 5: Configure Authorized redirect URIs
Add these EXACTLY (must be exact, including the path):
```
https://siteoptz.ai/api/auth/callback/google
http://localhost:3000/api/auth/callback/google
```

## Step 6: Save Changes
Click "SAVE" at the bottom of the page.

## Step 7: Wait for Propagation
Changes can take 5-10 minutes to propagate through Google's systems.

## Common Mistakes to Avoid:
- ❌ DON'T add trailing slashes to origins (https://siteoptz.ai/ is WRONG)
- ❌ DON'T forget the /api/auth/callback/google path in redirect URIs
- ❌ DON'T use http:// for production domain
- ❌ DON'T forget to click SAVE

## Testing:
1. After saving, wait 5-10 minutes
2. Test in incognito/private browser window
3. Check browser console for errors
4. Check network tab for redirect issues