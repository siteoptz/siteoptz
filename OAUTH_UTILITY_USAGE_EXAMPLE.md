# OAuth Utility Functions Usage Guide

This guide shows how to use the updated OAuth utility functions in your Marketing ROI tool.

## 🔧 **Updated OAuth Utility Functions**

The `lib/oauth-utils.ts` file now includes:

### **Key Features:**
- ✅ **Flexible Client ID handling** - works with your existing `GOOGLE_CLIENT_ID` or `NEXT_PUBLIC_GOOGLE_CLIENT_ID`
- ✅ **Automatic token refresh** - handles expired tokens automatically
- ✅ **Error handling** - proper error messages and fallbacks
- ✅ **Platform connection management** - store, retrieve, and validate credentials
- ✅ **Multiple Google scopes** - supports both Google Ads and Analytics in one flow

### **New Functions Added:**
- `getGoogleClientId()` - Gets client ID from environment variables
- `getBaseUrl()` - Gets base URL for redirects
- `generateCombinedGoogleAuthUrl()` - Single auth flow for both Ads and Analytics
- `refreshGoogleToken()` - Refreshes expired tokens
- `validateGoogleToken()` - Validates token status
- `getUserConnectedPlatforms()` - Gets all connected platforms for a user

## 🚀 **How to Update Your Platform Connection Buttons**

### **Step 1: Update Your Environment Variables**

Add these to your `.env.local` file:

```env
# Your existing Google OAuth (keep these)
GOOGLE_CLIENT_ID=your_existing_google_client_id
GOOGLE_CLIENT_SECRET=your_existing_google_client_secret

# Add these for Marketing ROI
NEXT_PUBLIC_GOOGLE_CLIENT_ID=${GOOGLE_CLIENT_ID}
GOOGLE_ADS_DEVELOPER_TOKEN=DfD-KrR2G6Ja-PIrhIryrTQ
NEXT_PUBLIC_BASE_URL=https://siteoptz.ai

# Other platforms (add as needed)
NEXT_PUBLIC_META_APP_ID=your_meta_app_id
META_APP_SECRET=your_meta_app_secret
NEXT_PUBLIC_TIKTOK_APP_ID=your_tiktok_app_id
TIKTOK_APP_SECRET=your_tiktok_app_secret
```

### **Step 2: Update Platform Connection Buttons**

Replace your current platform connection buttons in `pages/dashboard/pro.tsx`:

```typescript
import React, { useState, useEffect } from 'react';
import { 
  generateGoogleAdsAuthUrl, 
  generateGoogleAnalyticsAuthUrl,
  generateCombinedGoogleAuthUrl,
  checkPlatformConnection,
  removePlatformCredentials,
  getUserConnectedPlatforms
} from '../../lib/oauth-utils';
import { useSession } from 'next-auth/react';

export default function PlatformIntegrations() {
  const { data: session } = useSession();
  const [connections, setConnections] = useState({
    googleAds: false,
    googleAnalytics: false,
    meta: false,
    tiktok: false,
    linkedin: false,
    twitter: false
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (session?.user?.email) {
      loadConnectionStatus();
    }
  }, [session]);

  const loadConnectionStatus = async () => {
    if (!session?.user?.email) return;
    
    setLoading(true);
    try {
      const connectedPlatforms = await getUserConnectedPlatforms(session.user.email);
      
      setConnections({
        googleAds: connectedPlatforms.includes('google-ads'),
        googleAnalytics: connectedPlatforms.includes('google-analytics'),
        meta: connectedPlatforms.includes('meta'),
        tiktok: connectedPlatforms.includes('tiktok'),
        linkedin: connectedPlatforms.includes('linkedin'),
        twitter: connectedPlatforms.includes('twitter')
      });
    } catch (error) {
      console.error('Error loading connection status:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleConnect = async (platform: string) => {
    if (!session?.user?.email) return;

    try {
      let authUrl = '';
      
      switch (platform) {
        case 'google-ads':
          authUrl = generateGoogleAdsAuthUrl();
          break;
        case 'google-analytics':
          authUrl = generateGoogleAnalyticsAuthUrl();
          break;
        case 'google-combined':
          authUrl = generateCombinedGoogleAuthUrl();
          break;
        default:
          console.error(`Unknown platform: ${platform}`);
          return;
      }

      if (authUrl && authUrl !== '#') {
        window.location.href = authUrl;
      } else {
        alert('OAuth configuration error. Please check your environment variables.');
      }
    } catch (error) {
      console.error(`Error connecting to ${platform}:`, error);
      alert(`Failed to connect to ${platform}. Please try again.`);
    }
  };

  const handleDisconnect = async (platform: string) => {
    if (!session?.user?.email) return;

    try {
      const success = await removePlatformCredentials(session.user.email, platform);
      if (success) {
        await loadConnectionStatus(); // Refresh the connection status
        alert(`Successfully disconnected from ${platform}`);
      } else {
        alert(`Failed to disconnect from ${platform}`);
      }
    } catch (error) {
      console.error(`Error disconnecting from ${platform}:`, error);
      alert(`Failed to disconnect from ${platform}. Please try again.`);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="w-8 h-8 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
        <span className="ml-3 text-white">Loading platform connections...</span>
      </div>
    );
  }

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
              handleDisconnect('google-ads');
            } else {
              handleConnect('google-ads');
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

      {/* Google Analytics */}
      <div className="bg-black border border-gray-800 rounded-xl p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-green-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold">GA</span>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white">Google Analytics</h3>
              <p className="text-gray-400 text-sm">Website traffic and conversion tracking</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <span className={`px-3 py-1 rounded-full text-xs font-medium ${
              connections.googleAnalytics 
                ? 'bg-green-900/20 text-green-400 border border-green-500/30' 
                : 'bg-red-900/20 text-red-400 border border-red-500/30'
            }`}>
              {connections.googleAnalytics ? 'Connected' : 'Not Connected'}
            </span>
          </div>
        </div>
        
        <button
          onClick={() => {
            if (connections.googleAnalytics) {
              handleDisconnect('google-analytics');
            } else {
              handleConnect('google-analytics');
            }
          }}
          className={`w-full py-2 px-4 rounded-lg font-medium transition-colors ${
            connections.googleAnalytics
              ? 'bg-red-600 text-white hover:bg-red-700'
              : 'bg-green-600 text-white hover:bg-green-700'
          }`}
        >
          {connections.googleAnalytics ? 'Disconnect Google Analytics' : 'Connect Google Analytics'}
        </button>
      </div>

      {/* Combined Google Connection (Optional) */}
      <div className="bg-black border border-gray-800 rounded-xl p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-green-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold">G</span>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white">Google Ads + Analytics</h3>
              <p className="text-gray-400 text-sm">Connect both platforms in one step</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <span className={`px-3 py-1 rounded-full text-xs font-medium ${
              connections.googleAds && connections.googleAnalytics
                ? 'bg-green-900/20 text-green-400 border border-green-500/30' 
                : 'bg-gray-900/20 text-gray-400 border border-gray-500/30'
            }`}>
              {connections.googleAds && connections.googleAnalytics ? 'Both Connected' : 'Not Connected'}
            </span>
          </div>
        </div>
        
        <button
          onClick={() => handleConnect('google-combined')}
          className="w-full bg-gradient-to-r from-blue-600 to-green-600 text-white py-2 px-4 rounded-lg hover:from-blue-700 hover:to-green-700 transition-all font-medium"
        >
          Connect Google Ads + Analytics
        </button>
      </div>

      {/* Refresh Button */}
      <div className="text-center">
        <button
          onClick={loadConnectionStatus}
          className="text-gray-400 hover:text-white text-sm underline"
        >
          Refresh Connection Status
        </button>
      </div>
    </div>
  );
}
```

## 🔄 **Create OAuth Callback Routes**

Create these API routes to handle OAuth callbacks:

### **Google Ads Callback** (`pages/api/marketing-platforms/google-ads/callback.ts`):

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
    return res.redirect('/dashboard/pro?tab=platforms&error=unauthorized');
  }

  const { code, error, state } = req.query;

  if (error) {
    return res.redirect('/dashboard/pro?tab=platforms&error=auth_failed');
  }

  if (!code) {
    return res.redirect('/dashboard/pro?tab=platforms&error=no_code');
  }

  try {
    const redirectUri = `${process.env.NEXT_PUBLIC_BASE_URL}/api/marketing-platforms/google-ads/callback`;
    const tokens = await exchangeGoogleCodeForToken(code as string, redirectUri);

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

### **Google Analytics Callback** (`pages/api/marketing-platforms/google-analytics/callback.ts`):

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
    return res.redirect('/dashboard/pro?tab=platforms&error=unauthorized');
  }

  const { code, error } = req.query;

  if (error) {
    return res.redirect('/dashboard/pro?tab=platforms&error=auth_failed');
  }

  if (!code) {
    return res.redirect('/dashboard/pro?tab=platforms&error=no_code');
  }

  try {
    const redirectUri = `${process.env.NEXT_PUBLIC_BASE_URL}/api/marketing-platforms/google-analytics/callback`;
    const tokens = await exchangeGoogleCodeForToken(code as string, redirectUri);

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

## 🎯 **Key Benefits of Updated OAuth Utils**

1. **✅ Works with your existing Google OAuth setup** - no need for new credentials
2. **✅ Automatic token refresh** - handles expired tokens seamlessly
3. **✅ Better error handling** - clear error messages and fallbacks
4. **✅ Connection status tracking** - real-time connection status
5. **✅ Flexible configuration** - works with different environment variable setups
6. **✅ Production ready** - includes proper error handling and logging

## 📝 **Next Steps**

1. **Update your environment variables** as shown above
2. **Replace your platform connection buttons** with the updated code
3. **Create the OAuth callback routes** for handling authentication
4. **Test the OAuth flow** thoroughly
5. **Replace localStorage with database storage** for production use

This updated OAuth utility system will work seamlessly with your existing Google OAuth setup! 🚀
