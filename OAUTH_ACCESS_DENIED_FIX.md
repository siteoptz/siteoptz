# OAuth "Access Denied" Issue - Complete Fix

## 🚨 ROOT CAUSE IDENTIFIED

The "Access denied. You do not have permission to sign in." error is caused by **missing OAuth environment variables** in production. The environment variables for Google OAuth are not configured in Vercel, causing NextAuth to fail during the authentication process.

## Issue Details

When users click "Start 7-day trial" and go through Google OAuth, they encounter:
```
Authentication Error
Access denied. You do not have permission to sign in.
```

This happens because:
1. **Environment variables are missing** in Vercel production environment
2. **Google OAuth credentials are not configured**
3. **NextAuth cannot authenticate users** without proper configuration

## 🔧 IMMEDIATE FIX REQUIRED

### Step 1: Configure Google OAuth in Google Cloud Console

1. **Go to Google Cloud Console**: https://console.cloud.google.com/
2. **Select/Create Project** for SiteOptz
3. **Enable Google+ API**:
   - Navigate to "APIs & Services" > "Library"
   - Search for "Google+ API" and enable it
4. **Create OAuth 2.0 Credentials**:
   - Go to "APIs & Services" > "Credentials"
   - Click "Create Credentials" > "OAuth 2.0 Client IDs"
   - Application type: "Web application"
   - Name: "SiteOptz Production OAuth"
   
5. **Configure Authorized Redirect URIs**:
   ```
   https://siteoptz.ai/api/auth/callback/google
   http://localhost:3000/api/auth/callback/google (for development)
   ```

6. **Copy Client ID and Secret** (you'll need these for Vercel)

### Step 2: Configure OAuth Consent Screen

1. **Go to "OAuth consent screen"** in Google Cloud Console
2. **Configure the consent screen**:
   - App name: "SiteOptz"
   - User support email: support@siteoptz.ai
   - Developer contact: support@siteoptz.ai
   - App domain: siteoptz.ai
   - Authorized domains: siteoptz.ai
3. **Add required scopes**:
   - userinfo.email
   - userinfo.profile
4. **Publish the app** (move from testing to production)

### Step 3: Configure Environment Variables in Vercel

#### Option A: Using Vercel Dashboard
1. **Go to Vercel Dashboard**: https://vercel.com/siteoptz/siteoptz/settings/environment-variables
2. **Add these environment variables**:

```bash
# Required OAuth Variables
GOOGLE_CLIENT_ID=your_google_client_id_from_step_1
GOOGLE_CLIENT_SECRET=your_google_client_secret_from_step_1
NEXTAUTH_URL=https://siteoptz.ai
NEXTAUTH_SECRET=generate_a_random_32_character_string

# Required GHL Variables (if using GoHighLevel)
GHL_API_KEY=your_gohighlevel_api_key
GHL_LOCATION_ID=your_gohighlevel_location_id
```

#### Option B: Using Vercel CLI
```bash
# Install Vercel CLI if not already installed
npm i -g vercel

# Add environment variables
vercel env add GOOGLE_CLIENT_ID production
vercel env add GOOGLE_CLIENT_SECRET production
vercel env add NEXTAUTH_URL production
vercel env add NEXTAUTH_SECRET production

# Deploy with new environment variables
vercel --prod
```

### Step 4: Generate NEXTAUTH_SECRET

Generate a secure random secret:
```bash
# Using Node.js
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"

# Using OpenSSL
openssl rand -hex 32

# Or use an online generator (make sure it's 32+ characters)
```

### Step 5: Redeploy Application

After configuring environment variables:
```bash
# Trigger a new deployment
vercel --prod

# Or push to main branch to trigger auto-deployment
git add .
git commit -m "Fix OAuth environment variables"
git push origin main
```

## 🧪 Testing the Fix

### Test 1: Environment Variables Check
Create and run this test script in production:

```javascript
// Save as test-oauth-env.js in your project
export default function handler(req, res) {
  const config = {
    google_client_id: !!process.env.GOOGLE_CLIENT_ID,
    google_client_secret: !!process.env.GOOGLE_CLIENT_SECRET,
    nextauth_url: process.env.NEXTAUTH_URL,
    nextauth_secret: !!process.env.NEXTAUTH_SECRET,
    configured: !!(
      process.env.GOOGLE_CLIENT_ID && 
      process.env.GOOGLE_CLIENT_SECRET && 
      process.env.NEXTAUTH_URL && 
      process.env.NEXTAUTH_SECRET
    )
  };
  
  res.status(200).json(config);
}
```

### Test 2: OAuth Flow Test
1. Navigate to: `https://siteoptz.ai`
2. Click "Start 7-Day Free Trial"
3. Should redirect to Google OAuth consent screen
4. Complete OAuth flow
5. Should redirect to dashboard (no access denied error)

### Test 3: Multiple Account Test
- Test with different Google accounts
- Test with both personal and business Google accounts
- Ensure no "Access denied" errors occur

## 📋 Verification Checklist

Before marking this as fixed, verify:

- ✅ **Google Cloud Console**: OAuth credentials created
- ✅ **Google Cloud Console**: Authorized redirect URIs configured
- ✅ **Google Cloud Console**: OAuth consent screen published
- ✅ **Vercel**: All 4 required environment variables set
- ✅ **Vercel**: Application redeployed with new variables
- ✅ **Testing**: OAuth flow works with test accounts
- ✅ **Testing**: No "Access denied" errors
- ✅ **Testing**: Users are redirected to dashboard after OAuth

## 🔍 Debug Commands

If issues persist after the fix:

```bash
# Check environment variables in production
curl https://siteoptz.ai/api/auth/providers

# Check NextAuth configuration
curl https://siteoptz.ai/api/auth/csrf

# Monitor Vercel function logs
vercel logs --prod

# Test OAuth URL generation
node debug-oauth-issue.js
```

## 📱 Common Post-Fix Issues

### Issue: OAuth Consent Screen Warning
**Solution**: Publish the OAuth app in Google Cloud Console

### Issue: Domain Verification Required
**Solution**: Verify siteoptz.ai domain in Google Cloud Console

### Issue: Still Getting Access Denied
**Solution**: 
1. Clear browser cache and cookies
2. Check Vercel function logs
3. Verify environment variables are live in production

## 🎯 Expected Outcome

After implementing this fix:
1. **Users can complete OAuth flow** without errors
2. **Trial signups work correctly** through Google OAuth
3. **Users are redirected to dashboard** after successful authentication
4. **GHL integration works** (if configured) for lead tracking
5. **No more "Access denied" errors**

## 🚀 Immediate Action Plan

1. **Now**: Configure Google OAuth credentials
2. **Now**: Add environment variables to Vercel
3. **Now**: Redeploy application
4. **Test**: Verify OAuth flow works
5. **Monitor**: Check for any remaining issues

The root cause is clear and the fix is straightforward - this should resolve the OAuth access denied issue immediately once the environment variables are properly configured.