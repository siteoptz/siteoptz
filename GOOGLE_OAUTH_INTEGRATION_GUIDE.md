# Google OAuth Integration Guide for Marketing ROI Tool

This guide shows how to integrate the Marketing ROI tool with your existing Google OAuth setup.

## 🔧 **Current Setup Analysis**

Your existing Google OAuth configuration in `pages/api/auth/[...nextauth].ts`:
```typescript
GoogleProvider({
  clientId: process.env.GOOGLE_CLIENT_ID || '',
  clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
})
```

## 🚀 **Integration Options**

### **Option 1: Extend Existing Google OAuth App (Recommended)**

This is the easiest approach - use your existing Google OAuth credentials with additional scopes.

#### **Step 1: Update Google Cloud Console**

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Navigate to **APIs & Services > Credentials**
3. Find your existing OAuth 2.0 Client ID
4. Click **Edit**
5. Add these **Authorized redirect URIs**:
   ```
   https://siteoptz.ai/api/marketing-platforms/google-ads/callback
   https://siteoptz.ai/api/marketing-platforms/google-analytics/callback
   ```
6. **Enable these APIs** in **APIs & Services > Library**:
   - **Google Ads API** (requires approval)
   - **Google Analytics Reporting API**
   - **Google Analytics Data API**

#### **Step 2: Environment Variables**

Add these to your `.env.local` file:

```env
# Existing Google OAuth (keep these)
GOOGLE_CLIENT_ID=your_existing_google_client_id
GOOGLE_CLIENT_SECRET=your_existing_google_client_secret

# Marketing ROI specific
GOOGLE_ADS_DEVELOPER_TOKEN=DfD-KrR2G6Ja-PIrhIryrTQ
NEXT_PUBLIC_GOOGLE_CLIENT_ID=${GOOGLE_CLIENT_ID}

# Other platforms (add as needed)
NEXT_PUBLIC_META_APP_ID=your_meta_app_id
META_APP_SECRET=your_meta_app_secret

NEXT_PUBLIC_TIKTOK_APP_ID=your_tiktok_app_id
TIKTOK_APP_SECRET=your_tiktok_app_secret

NEXT_PUBLIC_LINKEDIN_CLIENT_ID=your_linkedin_client_id
LINKEDIN_CLIENT_SECRET=your_linkedin_client_secret

NEXT_PUBLIC_TWITTER_API_KEY=your_twitter_api_key
TWITTER_API_SECRET=your_twitter_api_secret

# Base URL
NEXT_PUBLIC_BASE_URL=https://siteoptz.ai
```

#### **Step 3: Update Platform Connection Buttons**

Update your platform connection buttons in `pages/dashboard/pro.tsx` to use real OAuth URLs:

```typescript
// Replace the alert() calls with actual OAuth URLs
import { generateGoogleAdsAuthUrl, generateGoogleAnalyticsAuthUrl } from '../../lib/oauth-utils';

// Google Ads button
<button
  onClick={() => {
    window.location.href = generateGoogleAdsAuthUrl();
  }}
  className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
>
  Connect Google Ads
</button>

// Google Analytics button
<button
  onClick={() => {
    window.location.href = generateGoogleAnalyticsAuthUrl();
  }}
  className="w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors"
>
  Connect Google Analytics
</button>
```

### **Option 2: Create Separate Google OAuth App**

If you prefer to keep Marketing ROI OAuth separate from your main app OAuth:

#### **Step 1: Create New Google OAuth App**

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or use existing one
3. Navigate to **APIs & Services > Credentials**
4. Click **Create Credentials > OAuth 2.0 Client ID**
5. Configure:
   - **Application type**: Web application
   - **Name**: SiteOptz Marketing ROI Tool
   - **Authorized redirect URIs**:
     ```
     https://siteoptz.ai/api/marketing-platforms/google-ads/callback
     https://siteoptz.ai/api/marketing-platforms/google-analytics/callback
     ```

#### **Step 2: Environment Variables**

```env
# Existing Google OAuth (for main app)
GOOGLE_CLIENT_ID=your_existing_google_client_id
GOOGLE_CLIENT_SECRET=your_existing_google_client_secret

# New Marketing ROI Google OAuth
NEXT_PUBLIC_GOOGLE_CLIENT_ID=your_new_marketing_roi_client_id
GOOGLE_CLIENT_SECRET_MARKETING=your_new_marketing_roi_client_secret
GOOGLE_ADS_DEVELOPER_TOKEN=DfD-KrR2G6Ja-PIrhIryrTQ
```

## 🔄 **OAuth Flow Implementation**

### **Step 1: Create Callback Routes**

Create these API routes:

#### **Google Ads Callback** (`pages/api/marketing-platforms/google-ads/callback.ts`):
```typescript
import { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/pages/api/auth/[...nextauth]';
import { exchangeGoogleCodeForToken, storePlatformCredentials } from '@/lib/oauth-utils';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const session = await getServerSession(req, res, authOptions);
  if (!session || !session.user || !session.user.email) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const { code, error } = req.query;

  if (error) {
    return res.redirect('/dashboard/pro?tab=platforms&error=auth_failed');
  }

  if (!code) {
    return res.redirect('/dashboard/pro?tab=platforms&error=no_code');
  }

  try {
    const tokens = await exchangeGoogleCodeForToken(
      code as string,
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/marketing-platforms/google-ads/callback`
    );

    await storePlatformCredentials(session.user.email, 'google-ads', {
      access_token: tokens.access_token,
      refresh_token: tokens.refresh_token,
      expires_at: Date.now() + (tokens.expires_in * 1000),
      scope: tokens.scope
    });

    return res.redirect('/dashboard/pro?tab=platforms&success=google_ads_connected');
  } catch (error) {
    console.error('Google Ads OAuth error:', error);
    return res.redirect('/dashboard/pro?tab=platforms&error=token_exchange_failed');
  }
}
```

#### **Google Analytics Callback** (`pages/api/marketing-platforms/google-analytics/callback.ts`):
```typescript
import { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/pages/api/auth/[...nextauth]';
import { exchangeGoogleCodeForToken, storePlatformCredentials } from '@/lib/oauth-utils';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const session = await getServerSession(req, res, authOptions);
  if (!session || !session.user || !session.user.email) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const { code, error } = req.query;

  if (error) {
    return res.redirect('/dashboard/pro?tab=platforms&error=auth_failed');
  }

  if (!code) {
    return res.redirect('/dashboard/pro?tab=platforms&error=no_code');
  }

  try {
    const tokens = await exchangeGoogleCodeForToken(
      code as string,
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/marketing-platforms/google-analytics/callback`
    );

    await storePlatformCredentials(session.user.email, 'google-analytics', {
      access_token: tokens.access_token,
      refresh_token: tokens.refresh_token,
      expires_at: Date.now() + (tokens.expires_in * 1000),
      scope: tokens.scope
    });

    return res.redirect('/dashboard/pro?tab=platforms&success=google_analytics_connected');
  } catch (error) {
    console.error('Google Analytics OAuth error:', error);
    return res.redirect('/dashboard/pro?tab=platforms&error=token_exchange_failed');
  }
}
```

### **Step 2: Update Platform Integrations Component**

Update `components/dashboard/PlatformIntegrations.tsx` to show connection status:

```typescript
import React, { useState, useEffect } from 'react';
import { generateGoogleAdsAuthUrl, generateGoogleAnalyticsAuthUrl } from '../../lib/oauth-utils';

export default function PlatformIntegrations() {
  const [connections, setConnections] = useState({
    googleAds: false,
    googleAnalytics: false,
    meta: false,
    tiktok: false
  });

  useEffect(() => {
    // Check connection status from your database
    checkConnectionStatus();
  }, []);

  const checkConnectionStatus = async () => {
    // Implement based on your database
    // This would check if tokens exist and are valid
  };

  return (
    <div className="space-y-6">
      {/* Google Ads */}
      <div className="bg-black border border-gray-800 rounded-xl p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold">GA</span>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white">Google Ads</h3>
              <p className="text-gray-400 text-sm">Campaign performance and ROI tracking</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <span className={`px-3 py-1 rounded-full text-xs font-medium ${
              connections.googleAds 
                ? 'bg-green-900/20 text-green-400 border border-green-500/30' 
                : 'bg-red-900/20 text-red-400 border border-red-500/30'
            }`}>
              {connections.googleAds ? 'Connected' : 'Not Connected'}
            </span>
          </div>
        </div>
        
        <button
          onClick={() => {
            if (connections.googleAds) {
              // Disconnect logic
            } else {
              window.location.href = generateGoogleAdsAuthUrl();
            }
          }}
          className={`w-full py-2 px-4 rounded-lg font-medium transition-colors ${
            connections.googleAds
              ? 'bg-red-600 text-white hover:bg-red-700'
              : 'bg-blue-600 text-white hover:bg-blue-700'
          }`}
        >
          {connections.googleAds ? 'Disconnect Google Ads' : 'Connect Google Ads'}
        </button>
      </div>

      {/* Similar structure for other platforms... */}
    </div>
  );
}
```

## 🔐 **Security Considerations**

1. **Environment Variables**: Never commit OAuth secrets to version control
2. **Token Storage**: Encrypt tokens before storing in database
3. **Token Refresh**: Implement automatic token refresh logic
4. **Scope Validation**: Verify users have granted necessary permissions
5. **Rate Limiting**: Implement rate limiting for API calls

## 📊 **Testing the Integration**

1. **Local Testing**: Use `localhost:3000` for development
2. **Production Testing**: Ensure HTTPS and correct redirect URIs
3. **Token Validation**: Test token refresh and error handling
4. **User Experience**: Test the complete OAuth flow

## 🚨 **Common Issues**

### **Redirect URI Mismatch**
- Ensure redirect URIs in Google Cloud Console match exactly
- Include both HTTP (dev) and HTTPS (production) URIs

### **Scope Issues**
- Verify required scopes are requested and granted
- Google Ads API requires specific scopes and approval

### **Token Expiration**
- Implement token refresh logic
- Handle expired tokens gracefully

### **Rate Limiting**
- Google APIs have rate limits
- Implement exponential backoff for retries

## 📝 **Next Steps**

1. **Choose Integration Option** (Option 1 recommended)
2. **Update Google Cloud Console** with new redirect URIs
3. **Add Environment Variables** to your `.env.local`
4. **Create Callback Routes** for OAuth handling
5. **Update Platform Connection Buttons** to use real OAuth URLs
6. **Test OAuth Flow** thoroughly
7. **Implement Token Storage** in your database
8. **Add Error Handling** for failed connections

This integration will allow your Marketing ROI tool to securely connect to Google Ads and Analytics using your existing OAuth infrastructure!
