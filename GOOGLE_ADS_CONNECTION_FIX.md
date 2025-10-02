# Google Ads Connection Fix & Implementation Plan

## 🔧 **Phase 1: Fix Connection Errors**

### **Issue Analysis:**
The "Failed to fetch" errors are likely caused by:
1. **Environment variable configuration issues**
2. **Redirect URI mismatches**
3. **Missing Google Ads API scopes**
4. **Client-side vs Server-side OAuth handling**

### **Step 1: Environment Variables Setup**

Create/update your `.env.local` file:

```env
# Google OAuth Configuration
GOOGLE_CLIENT_ID=809428295933-mj14of35mgnfaq8un84u3487eac075ee.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=your_google_client_secret_here
NEXT_PUBLIC_GOOGLE_CLIENT_ID=809428295933-mj14of35mgnfaq8un84u3487eac075ee.apps.googleusercontent.com

# Google Ads API
GOOGLE_ADS_DEVELOPER_TOKEN=DfD-KrR2G6Ja-PIrhIryrTQ
GOOGLE_ADS_LOGIN_CUSTOMER_ID=your_login_customer_id

# Base URLs
NEXT_PUBLIC_BASE_URL=https://siteoptz.ai
NODE_ENV=production
```

### **Step 2: Google Cloud Console Configuration**

1. **Go to [Google Cloud Console](https://console.cloud.google.com/)**
2. **Navigate to APIs & Services > Credentials**
3. **Edit your OAuth 2.0 Client ID**
4. **Add these Authorized redirect URIs:**
   ```
   https://siteoptz.ai/api/marketing-platforms/google-ads/callback
   https://siteoptz.ai/api/marketing-platforms/google-ads/mcc-callback
   http://localhost:3000/api/marketing-platforms/google-ads/callback (for development)
   http://localhost:3000/api/marketing-platforms/google-ads/mcc-callback (for development)
   ```
5. **Enable these APIs:**
   - Google Ads API
   - Google Analytics Reporting API
   - Google Analytics Data API

### **Step 3: Enhanced OAuth Error Handling**

Update the OAuth utility functions with better error handling and debugging.
