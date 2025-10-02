# OAuth Implementation Guide for Marketing ROI Tool

This guide shows how to implement real OAuth connections in your Marketing ROI tool after setting up the OAuth apps.

## 🚀 Quick Implementation Steps

### Step 1: Update Environment Variables

Add these to your `.env.local` file:

```env
# Google Ads & Analytics
NEXT_PUBLIC_GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
GOOGLE_ADS_DEVELOPER_TOKEN=your_developer_token

# Meta (Facebook)
NEXT_PUBLIC_META_APP_ID=your_meta_app_id
META_APP_SECRET=your_meta_app_secret

# TikTok
NEXT_PUBLIC_TIKTOK_APP_ID=your_tiktok_app_id
TIKTOK_APP_SECRET=your_tiktok_app_secret

# LinkedIn
NEXT_PUBLIC_LINKEDIN_CLIENT_ID=your_linkedin_client_id
LINKEDIN_CLIENT_SECRET=your_linkedin_client_secret

# Twitter
NEXT_PUBLIC_TWITTER_API_KEY=your_twitter_api_key
TWITTER_API_SECRET=your_twitter_api_secret

# Base URLs
NEXT_PUBLIC_BASE_URL=https://siteoptz.ai
```

### Step 2: Create OAuth Utility Functions

Create `lib/oauth-utils.ts`:

```typescript
// lib/oauth-utils.ts

export const generateGoogleAdsAuthUrl = () => {
  const params = new URLSearchParams({
    client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!,
    redirect_uri: `${process.env.NEXT_PUBLIC_BASE_URL}/api/marketing-platforms/google-ads/callback`,
    scope: 'https://www.googleapis.com/auth/adwords',
    response_type: 'code',
    access_type: 'offline',
    prompt: 'consent'
  });
  
  return `https://accounts.google.com/oauth/authorize?${params.toString()}`;
};

export const generateMetaAuthUrl = () => {
  const params = new URLSearchParams({
    client_id: process.env.NEXT_PUBLIC_META_APP_ID!,
    redirect_uri: `${process.env.NEXT_PUBLIC_BASE_URL}/api/marketing-platforms/meta/callback`,
    scope: 'ads_read,ads_management,business_management',
    response_type: 'code'
  });
  
  return `https://www.facebook.com/v18.0/dialog/oauth?${params.toString()}`;
};

export const generateTikTokAuthUrl = () => {
  const params = new URLSearchParams({
    app_id: process.env.NEXT_PUBLIC_TIKTOK_APP_ID!,
    redirect_uri: `${process.env.NEXT_PUBLIC_BASE_URL}/api/marketing-platforms/tiktok/callback`,
    scope: 'user.info.basic,ad.get',
    state: 'tiktok_auth_state'
  });
  
  return `https://ads.tiktok.com/marketing_api/auth?${params.toString()}`;
};

export const generateLinkedInAuthUrl = () => {
  const params = new URLSearchParams({
    client_id: process.env.NEXT_PUBLIC_LINKEDIN_CLIENT_ID!,
    redirect_uri: `${process.env.NEXT_PUBLIC_BASE_URL}/api/marketing-platforms/linkedin/callback`,
    scope: 'r_ads,r_ads_reporting',
    response_type: 'code',
    state: 'linkedin_auth_state'
  });
  
  return `https://www.linkedin.com/oauth/v2/authorization?${params.toString()}`;
};

export const generateTwitterAuthUrl = () => {
  const params = new URLSearchParams({
    client_id: process.env.NEXT_PUBLIC_TWITTER_API_KEY!,
    redirect_uri: `${process.env.NEXT_PUBLIC_BASE_URL}/api/marketing-platforms/twitter/callback`,
    scope: 'tweet.read,users.read,offline.access',
    response_type: 'code',
    state: 'twitter_auth_state'
  });
  
  return `https://twitter.com/i/oauth2/authorize?${params.toString()}`;
};
```

### Step 3: Update Platform Connection Buttons

Update `pages/dashboard/pro.tsx`:

```typescript
// Import the OAuth utilities
import { 
  generateGoogleAdsAuthUrl, 
  generateMetaAuthUrl, 
  generateTikTokAuthUrl,
  generateLinkedInAuthUrl,
  generateTwitterAuthUrl 
} from '../../lib/oauth-utils';

// Update the connection buttons
<button 
  onClick={() => {
    const authUrl = generateGoogleAdsAuthUrl();
    window.open(authUrl, '_blank', 'width=600,height=600');
  }}
  className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
>
  Connect Google Ads
</button>

<button 
  onClick={() => {
    const authUrl = generateMetaAuthUrl();
    window.open(authUrl, '_blank', 'width=600,height=600');
  }}
  className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors"
>
  Connect Meta Ads
</button>

<button 
  onClick={() => {
    const authUrl = generateTikTokAuthUrl();
    window.open(authUrl, '_blank', 'width=600,height=600');
  }}
  className="w-full bg-black text-white py-2 px-4 rounded-lg hover:bg-gray-900 transition-colors"
>
  Connect TikTok Ads
</button>

<button 
  onClick={() => {
    const authUrl = generateLinkedInAuthUrl();
    window.open(authUrl, '_blank', 'width=600,height=600');
  }}
  className="w-full bg-blue-700 text-white py-2 px-4 rounded-lg hover:bg-blue-800 transition-colors"
>
  Connect LinkedIn Ads
</button>

<button 
  onClick={() => {
    const authUrl = generateTwitterAuthUrl();
    window.open(authUrl, '_blank', 'width=600,height=600');
  }}
  className="w-full bg-blue-400 text-white py-2 px-4 rounded-lg hover:bg-blue-500 transition-colors"
>
  Connect Twitter Ads
</button>
```

### Step 4: Create OAuth Callback Routes

Create these API routes:

#### Google Ads Callback (`pages/api/marketing-platforms/google-ads/callback.ts`):

```typescript
import { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../../../auth/[...nextauth]';

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
    return res.redirect('/dashboard/pro?tab=platforms&error=google_ads_auth_failed');
  }

  if (!code) {
    return res.redirect('/dashboard/pro?tab=platforms&error=google_ads_no_code');
  }

  try {
    // Exchange code for tokens
    const tokenResponse = await fetch('https://oauth2.googleapis.com/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!,
        client_secret: process.env.GOOGLE_CLIENT_SECRET!,
        code: code as string,
        grant_type: 'authorization_code',
        redirect_uri: `${process.env.NEXT_PUBLIC_BASE_URL}/api/marketing-platforms/google-ads/callback`,
      }),
    });

    const tokens = await tokenResponse.json();

    if (!tokenResponse.ok) {
      throw new Error(tokens.error || 'Failed to exchange code for tokens');
    }

    // Store tokens securely (implement your storage logic)
    await storePlatformCredentials(session.user.email, 'google-ads', {
      accessToken: tokens.access_token,
      refreshToken: tokens.refresh_token,
      expiresAt: new Date(Date.now() + tokens.expires_in * 1000).toISOString(),
      connectedAt: new Date().toISOString()
    });

    return res.redirect('/dashboard/pro?tab=platforms&success=google_ads_connected');
  } catch (error) {
    console.error('Google Ads OAuth error:', error);
    return res.redirect('/dashboard/pro?tab=platforms&error=google_ads_connection_failed');
  }
}
```

#### Meta Ads Callback (`pages/api/marketing-platforms/meta/callback.ts`):

```typescript
import { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../../../auth/[...nextauth]';

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
    return res.redirect('/dashboard/pro?tab=platforms&error=meta_auth_failed');
  }

  if (!code) {
    return res.redirect('/dashboard/pro?tab=platforms&error=meta_no_code');
  }

  try {
    // Exchange code for access token
    const tokenResponse = await fetch('https://graph.facebook.com/v18.0/oauth/access_token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        client_id: process.env.NEXT_PUBLIC_META_APP_ID!,
        client_secret: process.env.META_APP_SECRET!,
        code: code as string,
        redirect_uri: `${process.env.NEXT_PUBLIC_BASE_URL}/api/marketing-platforms/meta/callback`,
      }),
    });

    const tokens = await tokenResponse.json();

    if (!tokenResponse.ok) {
      throw new Error(tokens.error?.message || 'Failed to exchange code for tokens');
    }

    // Store tokens securely
    await storePlatformCredentials(session.user.email, 'meta-ads', {
      accessToken: tokens.access_token,
      expiresAt: new Date(Date.now() + tokens.expires_in * 1000).toISOString(),
      connectedAt: new Date().toISOString()
    });

    return res.redirect('/dashboard/pro?tab=platforms&success=meta_ads_connected');
  } catch (error) {
    console.error('Meta Ads OAuth error:', error);
    return res.redirect('/dashboard/pro?tab=platforms&error=meta_ads_connection_failed');
  }
}
```

### Step 5: Implement Token Storage

Create `lib/platform-credentials.ts`:

```typescript
// lib/platform-credentials.ts
import { createHash } from 'crypto';

interface PlatformCredentials {
  accessToken: string;
  refreshToken?: string;
  expiresAt?: string;
  connectedAt: string;
  [key: string]: any;
}

// In production, use a proper database like PostgreSQL or MongoDB
const credentialsStorage = new Map<string, PlatformCredentials>();

export async function storePlatformCredentials(
  userId: string,
  platform: string,
  credentials: PlatformCredentials
): Promise<void> {
  const key = `${userId}:${platform}`;
  
  // Encrypt sensitive data before storing
  const encryptedCredentials = {
    ...credentials,
    accessToken: encryptToken(credentials.accessToken),
    refreshToken: credentials.refreshToken ? encryptToken(credentials.refreshToken) : undefined,
  };
  
  credentialsStorage.set(key, encryptedCredentials);
  
  // In production, save to database:
  // await db.platformCredentials.upsert({
  //   where: { userId_platform: { userId, platform } },
  //   update: encryptedCredentials,
  //   create: { userId, platform, ...encryptedCredentials }
  // });
}

export async function getPlatformCredentials(
  userId: string,
  platform: string
): Promise<PlatformCredentials | null> {
  const key = `${userId}:${platform}`;
  const encrypted = credentialsStorage.get(key);
  
  if (!encrypted) {
    return null;
  }
  
  // Decrypt sensitive data
  return {
    ...encrypted,
    accessToken: decryptToken(encrypted.accessToken),
    refreshToken: encrypted.refreshToken ? decryptToken(encrypted.refreshToken) : undefined,
  };
}

function encryptToken(token: string): string {
  // In production, use proper encryption like AES-256-GCM
  return createHash('sha256').update(token).digest('hex');
}

function decryptToken(encryptedToken: string): string {
  // In production, implement proper decryption
  // For now, return the encrypted token (this is just for demo)
  return encryptedToken;
}
```

### Step 6: Add Success/Error Handling

Update the Platforms tab to show connection status:

```typescript
// Add to your Platforms tab component
const [connectionStatus, setConnectionStatus] = useState<Record<string, string>>({});

useEffect(() => {
  // Check URL parameters for success/error messages
  const urlParams = new URLSearchParams(window.location.search);
  const success = urlParams.get('success');
  const error = urlParams.get('error');
  
  if (success) {
    setConnectionStatus(prev => ({
      ...prev,
      [success]: 'connected'
    }));
  }
  
  if (error) {
    setConnectionStatus(prev => ({
      ...prev,
      [error]: 'error'
    }));
  }
}, []);

// Update the connection status indicators
<span className={`px-2 py-1 rounded-full text-xs ${
  connectionStatus['google_ads_connected'] === 'connected' 
    ? 'bg-green-900 text-green-400' 
    : 'bg-gray-800 text-gray-400'
}`}>
  {connectionStatus['google_ads_connected'] === 'connected' ? 'Connected' : 'Disconnected'}
</span>
```

### Step 7: Test the Implementation

1. **Set up environment variables** with real OAuth app credentials
2. **Test each platform connection** one at a time
3. **Verify tokens are stored** correctly
4. **Test token refresh** mechanisms
5. **Implement data fetching** from each platform

### Step 8: Production Considerations

1. **Use a proper database** for storing credentials
2. **Implement proper encryption** for sensitive data
3. **Add rate limiting** for API calls
4. **Monitor API usage** and costs
5. **Implement error handling** and retry logic
6. **Add logging** for debugging
7. **Set up monitoring** for API health

This implementation provides a solid foundation for real OAuth connections. Start with one platform, test thoroughly, and then expand to others.
