# OAuth Setup Guide for Marketing Platforms

This guide will walk you through setting up OAuth applications for each marketing platform to enable real API connections in your Marketing ROI tool.

## 📋 Prerequisites

Before starting, ensure you have:
- Admin access to each marketing platform account
- A registered business entity (required for most advertising APIs)
- A valid website domain for redirect URIs
- SSL certificate for your domain (HTTPS required)

---

## 🔵 Google Ads API Setup

### Step 1: Create Google Cloud Project
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing one
3. Note your **Project ID**

### Step 2: Enable Google Ads API
1. Navigate to **APIs & Services** > **Library**
2. Search for "Google Ads API"
3. Click **Enable**
4. Also enable "Google Analytics Reporting API"

### Step 3: Create OAuth 2.0 Credentials
1. Go to **APIs & Services** > **Credentials**
2. Click **Create Credentials** > **OAuth 2.0 Client ID**
3. Choose **Web application**
4. Configure:
   - **Name**: `SiteOptz Marketing ROI Tool`
   - **Authorized JavaScript origins**: 
     - `https://siteoptz.ai`
     - `https://www.siteoptz.ai`
   - **Authorized redirect URIs**:
     - `https://siteoptz.ai/api/marketing-platforms/google-ads/callback`
     - `https://siteoptz.ai/api/marketing-platforms/google-analytics/callback`

### Step 4: Get Google Ads Developer Token
1. Go to [Google Ads API Center](https://ads.google.com/aw/apicenter)
2. Apply for API access (can take 24-48 hours)
3. Developer Token **DfD-KrR2G6Ja-PIrhIryrTQ**

### Step 5: Environment Variables
Add to your `.env.local`:
```env
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
GOOGLE_ADS_DEVELOPER_TOKEN=your_developer_token
GOOGLE_ADS_REFRESH_TOKEN=your_refresh_token
```

---

## 📘 Meta (Facebook) Marketing API Setup

### Step 1: Create Facebook App
1. Go to [Facebook Developers](https://developers.facebook.com/)
2. Click **Create App** > **Business**
3. Fill in:
   - **App Name**: `SiteOptz Marketing ROI`
   - **App Contact Email**: your email
   - **Business Manager Account**: your business account

### Step 2: Add Marketing API Product
1. In your app dashboard, click **Add Product**
2. Find **Marketing API** and click **Set Up**
3. Review and accept the terms

### Step 3: Configure App Settings
1. Go to **Settings** > **Basic**
2. Add **App Domains**:
   - `siteoptz.ai`
   - `www.siteoptz.ai`
3. Add **Privacy Policy URL**: `https://siteoptz.ai/privacy`
4. Add **Terms of Service URL**: `https://siteoptz.ai/terms`

### Step 4: Create OAuth App
1. Go to **Settings** > **Advanced**
2. Enable **OAuth Redirect URIs**:
   - `https://siteoptz.ai/api/marketing-platforms/meta/callback`
3. Add **Valid OAuth Redirect URIs**:
   - `https://siteoptz.ai/api/marketing-platforms/meta/callback`

### Step 5: Get App Credentials
1. Go to **Settings** > **Basic**
2. Copy **App ID** and **App Secret**
3. Generate **App Access Token**

### Step 6: Request Permissions
1. Go to **App Review** > **Permissions and Features**
2. Request these permissions:
   - `ads_read` - Read ads data
   - `ads_management` - Manage ads
   - `business_management` - Manage business accounts
   - `pages_read_engagement` - Read page insights

### Step 7: Environment Variables
Add to your `.env.local`:
```env
META_APP_ID=your_meta_app_id
META_APP_SECRET=your_meta_app_secret
META_ACCESS_TOKEN=your_access_token
META_CLIENT_TOKEN=your_client_token
```

---

## 🎵 TikTok Marketing API Setup

### Step 1: Apply for TikTok for Business
1. Go to [TikTok for Business](https://business.tiktok.com/)
2. Sign up or log in to your business account
3. Complete business verification

### Step 2: Create Marketing API App
1. Go to [TikTok Marketing API](https://ads.tiktok.com/marketing_api/)
2. Click **Create App**
3. Fill in:
   - **App Name**: `SiteOptz Marketing ROI`
   - **App Category**: `Marketing Tools`
   - **Description**: `Marketing ROI tracking and analytics tool`

### Step 3: Configure OAuth Settings
1. In your app settings, add **Redirect URI**:
   - `https://siteoptz.ai/api/marketing-platforms/tiktok/callback`
2. Set **Scope**: `user.info.basic,ad.get`

### Step 4: Get App Credentials
1. Copy **App ID** and **App Secret**
2. Generate **Access Token**

### Step 5: Environment Variables
Add to your `.env.local`:
```env
TIKTOK_APP_ID=your_tiktok_app_id
TIKTOK_APP_SECRET=your_tiktok_app_secret
TIKTOK_ACCESS_TOKEN=your_access_token
```

---

## 📊 Google Analytics 4 API Setup

### Step 1: Enable Analytics Reporting API
1. In your Google Cloud Project (same as Google Ads)
2. Go to **APIs & Services** > **Library**
3. Enable **Google Analytics Reporting API**
4. Enable **Google Analytics Data API** (for GA4)

### Step 2: Create Service Account
1. Go to **APIs & Services** > **Credentials**
2. Click **Create Credentials** > **Service Account**
3. Fill in:
   - **Name**: `SiteOptz Analytics Service`
   - **Description**: `Service account for Google Analytics data access`

### Step 3: Generate Service Account Key
1. Click on your service account
2. Go to **Keys** tab
3. Click **Add Key** > **Create New Key** > **JSON**
4. Download the JSON file (keep it secure!)

### Step 4: Grant Access in Google Analytics
1. Go to [Google Analytics](https://analytics.google.com/)
2. Select your property
3. Go to **Admin** > **Property Access Management**
4. Click **+** > **Add Users**
5. Add your service account email (from JSON file)
6. Grant **Editor** permissions

### Step 5: Environment Variables
Add to your `.env.local`:
```env
GOOGLE_ANALYTICS_SERVICE_ACCOUNT_EMAIL=your_service_account_email
GOOGLE_ANALYTICS_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nyour_private_key\n-----END PRIVATE KEY-----\n"
GOOGLE_ANALYTICS_PROPERTY_ID=your_property_id
```

---

## 🔗 LinkedIn Marketing API Setup

### Step 1: Create LinkedIn App
1. Go to [LinkedIn Developer Portal](https://developer.linkedin.com/)
2. Click **Create App**
3. Fill in:
   - **App Name**: `SiteOptz Marketing ROI`
   - **LinkedIn Page**: your company page
   - **Privacy Policy URL**: `https://siteoptz.ai/privacy`
   - **App Logo**: upload your logo

### Step 2: Request Marketing API Access
1. Go to **Products** tab
2. Request **Marketing Developer Platform**
3. Fill out the application form
4. Wait for approval (can take 7-14 days)

### Step 3: Configure OAuth Settings
1. Go to **Auth** tab
2. Add **Redirect URLs**:
   - `https://siteoptz.ai/api/marketing-platforms/linkedin/callback`

### Step 4: Get App Credentials
1. Copy **Client ID** and **Client Secret**
2. Generate **Access Token**

### Step 5: Environment Variables
Add to your `.env.local`:
```env
LINKEDIN_CLIENT_ID=your_linkedin_client_id
LINKEDIN_CLIENT_SECRET=your_linkedin_client_secret
LINKEDIN_ACCESS_TOKEN=your_access_token
```

---

## 🐦 Twitter Ads API Setup

### Step 1: Apply for Twitter Developer Account
1. Go to [Twitter Developer Portal](https://developer.twitter.com/)
2. Apply for developer account
3. Complete the application process

### Step 2: Create Twitter App
1. Go to **Developer Portal** > **Projects & Apps**
2. Click **Create App**
3. Fill in:
   - **App Name**: `SiteOptz Marketing ROI`
   - **App Description**: `Marketing ROI tracking and analytics tool`

### Step 3: Enable Ads API
1. Go to **Developer Portal** > **API Keys**
2. Enable **Ads API** access
3. Request elevated access if needed

### Step 4: Configure OAuth Settings
1. Go to **App Settings** > **Authentication Settings**
2. Enable **OAuth 2.0**
3. Add **Callback URL**:
   - `https://siteoptz.ai/api/marketing-platforms/twitter/callback`

### Step 5: Environment Variables
Add to your `.env.local`:
```env
TWITTER_API_KEY=your_twitter_api_key
TWITTER_API_SECRET=your_twitter_api_secret
TWITTER_ACCESS_TOKEN=your_access_token
TWITTER_ACCESS_TOKEN_SECRET=your_access_token_secret
```

---

## 🔧 Implementation Steps

### Step 1: Update Environment Variables
Create a `.env.local` file with all the credentials:

```env
# Google Ads & Analytics
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
GOOGLE_ADS_DEVELOPER_TOKEN=your_developer_token

# Meta (Facebook)
META_APP_ID=your_meta_app_id
META_APP_SECRET=your_meta_app_secret

# TikTok
TIKTOK_APP_ID=your_tiktok_app_id
TIKTOK_APP_SECRET=your_tiktok_app_secret

# LinkedIn
LINKEDIN_CLIENT_ID=your_linkedin_client_id
LINKEDIN_CLIENT_SECRET=your_linkedin_client_secret

# Twitter
TWITTER_API_KEY=your_twitter_api_key
TWITTER_API_SECRET=your_twitter_api_secret
```

### Step 2: Create OAuth Callback Routes
Create these API routes:
- `/api/marketing-platforms/google-ads/callback`
- `/api/marketing-platforms/meta/callback`
- `/api/marketing-platforms/tiktok/callback`
- `/api/marketing-platforms/linkedin/callback`
- `/api/marketing-platforms/twitter/callback`

### Step 3: Update Connection Buttons
Replace the alert messages with actual OAuth flows:

```javascript
// Example for Google Ads
const handleGoogleAdsConnect = () => {
  const authUrl = `https://accounts.google.com/oauth/authorize?` +
    `client_id=${process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}&` +
    `redirect_uri=${encodeURIComponent(process.env.NEXT_PUBLIC_GOOGLE_REDIRECT_URI)}&` +
    `scope=https://www.googleapis.com/auth/adwords&` +
    `response_type=code&` +
    `access_type=offline`;
  
  window.open(authUrl, '_blank');
};
```

### Step 4: Implement Data Fetching
Create API routes to fetch data from each platform:
- `/api/marketing-platforms/google-ads/campaigns`
- `/api/marketing-platforms/meta/campaigns`
- `/api/marketing-platforms/tiktok/campaigns`

---

## 🔒 Security Best Practices

### 1. Environment Variables
- Never commit `.env.local` to version control
- Use different credentials for development and production
- Rotate secrets regularly

### 2. OAuth Security
- Use HTTPS for all redirect URIs
- Implement PKCE for mobile apps
- Validate state parameters to prevent CSRF attacks

### 3. Data Storage
- Encrypt stored access tokens
- Implement token refresh mechanisms
- Store only necessary data

### 4. Rate Limiting
- Implement rate limiting for API calls
- Cache responses when possible
- Monitor API usage

---

## 📞 Support & Resources

### Official Documentation
- [Google Ads API](https://developers.google.com/google-ads/api/docs)
- [Meta Marketing API](https://developers.facebook.com/docs/marketing-api/)
- [TikTok Marketing API](https://ads.tiktok.com/marketing_api/docs/)
- [LinkedIn Marketing API](https://docs.microsoft.com/en-us/linkedin/marketing/)
- [Twitter Ads API](https://developer.twitter.com/en/docs/twitter-ads-api)

### Getting Help
- Check platform-specific developer communities
- Review API status pages for outages
- Contact platform support for API access issues

---

## ⚠️ Important Notes

1. **Approval Times**: Some APIs require manual approval and can take days or weeks
2. **Business Verification**: Most advertising APIs require business verification
3. **Rate Limits**: Each platform has different rate limits and quotas
4. **Costs**: Some APIs may have usage costs or minimum spend requirements
5. **Compliance**: Ensure compliance with platform policies and data privacy laws

This guide should help you set up OAuth applications for all major marketing platforms. Start with one platform at a time and test thoroughly before moving to the next one.
