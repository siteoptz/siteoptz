# Google OAuth Setup Instructions for SiteOptz.ai

## CRITICAL: Complete These Steps to Fix OAuth

### 1. Install NextAuth Dependencies
```bash
cd siteoptz.ai
npm install
```

### 2. Configure Google OAuth in Google Cloud Console

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Select your project or create a new one
3. Navigate to **APIs & Services** > **Credentials**
4. Click **+ CREATE CREDENTIALS** > **OAuth client ID**
5. Choose **Web application**
6. Configure the OAuth client:

   **Authorized JavaScript origins:**
   - `https://siteoptz.ai`
   - `http://localhost:3000` (for development)

   **Authorized redirect URIs:**
   - `https://siteoptz.ai/api/auth/callback/google`
   - `http://localhost:3000/api/auth/callback/google` (for development)

7. Save the credentials and copy:
   - **Client ID**
   - **Client Secret**

### 3. Update Environment Variables

Edit `/siteoptz.ai/.env.local` and replace the placeholder values:

```env
# Google OAuth Configuration
GOOGLE_CLIENT_ID=your-actual-google-client-id-here
GOOGLE_CLIENT_SECRET=your-actual-google-client-secret-here

# NextAuth Secret (generate a secure random string)
NEXTAUTH_SECRET=generate-a-secure-random-string-here
```

To generate a secure NEXTAUTH_SECRET, run:
```bash
openssl rand -base64 32
```

### 4. Restart the Application

```bash
npm run build
npm start
```

## How the OAuth Flow Works with GoHighLevel

### New User Registration Flow:
1. User clicks "Continue with Google"
2. Google OAuth authenticates the user
3. NextAuth callback checks GoHighLevel for existing contact
4. If no contact exists, creates new GHL contact with:
   - Email from Google account
   - Name from Google profile
   - Default plan tag: `siteoptz-plan-free`
   - Additional tags: `siteoptz-user`, `oauth-signup`, `google-oauth`
5. Session created with user's plan
6. User redirected to appropriate dashboard

### Existing User Login Flow:
1. User clicks "Continue with Google"
2. Google OAuth authenticates the user
3. NextAuth callback searches GoHighLevel for contact by email
4. If contact found, extracts plan from tags:
   - `siteoptz-plan-free` → Free plan
   - `siteoptz-plan-starter` → Starter plan
   - `siteoptz-plan-pro` → Pro plan
   - `siteoptz-plan-enterprise` → Enterprise plan
5. Session created with correct plan
6. User redirected to appropriate dashboard

## Troubleshooting

### Common Issues and Solutions:

1. **"error=OAuthCallback" Error**
   - Ensure NextAuth is installed (`npm install`)
   - Verify Google Client ID and Secret are correct
   - Check redirect URIs match exactly in Google Console
   - Ensure NEXTAUTH_SECRET is set

2. **User Not Found in GoHighLevel**
   - Check GHL API key is valid
   - Verify GHL Location ID is correct
   - Check network connectivity to GHL API

3. **Wrong Plan Assigned**
   - Verify tags in GoHighLevel contact
   - Check tag format: `siteoptz-plan-{plan}`
   - Ensure only one plan tag per contact

4. **Redirect to Wrong Domain**
   - Middleware ensures redirect to siteoptz.ai
   - Never redirects to optz.siteoptz.ai

## Testing the Integration

1. **Test New User Registration:**
   - Use a Google account not in GHL
   - Should create new contact with free plan

2. **Test Existing User Login:**
   - Use email already in GHL with plan tag
   - Should login with correct plan

3. **Test Plan Detection:**
   - Manually add plan tag in GHL
   - Login should reflect updated plan

## Security Considerations

1. Never commit actual credentials to git
2. Use strong NEXTAUTH_SECRET in production
3. Restrict OAuth redirect URIs to your domains only
4. Monitor GHL API usage for anomalies
5. Implement rate limiting for auth endpoints

## Support

If you continue to experience issues:
1. Check browser console for errors
2. Review Next.js server logs
3. Verify all environment variables are set
4. Ensure GHL API is accessible
5. Check Google OAuth consent screen is configured