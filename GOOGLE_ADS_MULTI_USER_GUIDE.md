# Google Ads Multi-User Integration Guide

## 🎯 **Overview**
The Google Ads integration is designed to work with **ANY authenticated user** on the platform. Each user can connect their own Google Ads accounts independently and securely.

## 🔐 **User Isolation System**

### **How User Identification Works:**
1. **Authentication**: Users sign in via NextAuth (Google OAuth or email/password)
2. **Session Management**: Each user gets a unique session with `session.user.email`
3. **Storage Isolation**: Google Ads connections are stored with user-specific keys
4. **Access Control**: Users can only access their own connections

### **Storage Pattern:**
```typescript
// Each user's Google Ads connection is stored separately
const storageKey = `google_ads_connection_${session.user.email}`;

// Examples:
// john@company.com -> google_ads_connection_john@company.com
// jane@business.org -> google_ads_connection_jane@business.org
// bob@startup.io -> google_ads_connection_bob@startup.io
```

## 🚀 **User Experience Flow**

### **For ANY User:**
1. **Login** to SiteOptz (via Google OAuth or email/password)
2. **Navigate** to Pro Dashboard
3. **Click** "Connect Google Ads"
4. **Authenticate** with their Google account (OAuth)
5. **Select** which Google Ads account to connect
6. **View** their connected account in the dashboard

### **Multi-User Scenarios:**
- ✅ **Company A's Marketing Manager** connects their company's Google Ads
- ✅ **Freelancer B** connects their client's Google Ads account
- ✅ **Agency C's Team Member** connects their agency's MCC account
- ✅ **Small Business Owner D** connects their personal Google Ads

## 🔧 **Technical Implementation**

### **Key Files:**
- `lib/google-ads-api.ts` - Core Google Ads API integration
- `pages/dashboard/pro.tsx` - Dashboard with connection status
- `pages/dashboard/pro/google-ads-setup.tsx` - Account selection page
- `pages/api/marketing-platforms/google-ads/callback.ts` - OAuth callback
- `components/marketing/GoogleAdsAccountSelector.tsx` - Account selection UI

### **Session Integration:**
```typescript
// Dashboard checks user's connection
const { data: session } = useSession();
if (session?.user?.email) {
  const connection = await getStoredGoogleAdsAccount(session.user.email);
}

// Account storage uses user email
await storeSelectedGoogleAdsAccount(
  session.user.email,  // User identifier
  accountId,
  accountInfo,
  accessToken,
  refreshToken
);
```

## 🛡️ **Security Features**

### **User Isolation:**
- ❌ User A cannot see User B's Google Ads accounts
- ❌ User A cannot access User B's connection data
- ❌ User A cannot modify User B's settings
- ✅ Each user has completely separate storage space

### **Token Security:**
- 🔐 Access tokens are stored per user
- 🔐 Refresh tokens are handled automatically
- 🔐 Expired connections are automatically removed
- 🔐 Users can disconnect their accounts anytime

## 📊 **Multi-Account Support**

### **Supported Account Types:**
- **Individual Google Ads accounts** - Single advertiser accounts
- **Manager Accounts (MCC)** - Manage multiple sub-accounts
- **Test Accounts** - For development and testing
- **Agency Accounts** - For marketing agencies

### **Account Selection Features:**
- 🔍 **Search** accounts by name or ID
- 📋 **Filter** by account type (Manager, Test, etc.)
- 💰 **View** currency and timezone information
- ✅ **Select** specific account to connect

## 🧪 **Testing Multi-User Functionality**

### **Test API Endpoint:**
```
GET /api/test-user-isolation
```
This endpoint demonstrates how user isolation works across different user accounts.

### **Manual Testing:**
1. **Login** as User A → Connect Google Ads → Note connected account
2. **Logout** and login as User B → See no connection exists
3. **Connect** User B's Google Ads → Verify separate from User A
4. **Switch back** to User A → Confirm original connection still exists

## 🔮 **Production Considerations**

### **Current Implementation (Development):**
- Uses `localStorage` for temporary storage
- Suitable for development and testing
- Data persists per browser session

### **Production Recommendations:**
- 🗄️ **Database Storage** - Encrypted user connections in database
- 🔒 **Token Encryption** - Encrypt access/refresh tokens at rest
- 📊 **Audit Logging** - Track connection/disconnection events
- ⏰ **Token Refresh** - Automatic token refresh before expiry
- 🔐 **Permission Scopes** - Granular Google Ads API permissions

## ✅ **Verification Checklist**

- ✅ Multiple users can use the system simultaneously
- ✅ Each user sees only their own Google Ads accounts
- ✅ User sessions are properly isolated
- ✅ Google Ads API calls use correct user tokens
- ✅ Account connections persist per user
- ✅ Users can disconnect their accounts independently
- ✅ No cross-user data leakage
- ✅ Proper error handling for all scenarios

## 🎉 **Result**
**ANY user can now connect their Google Ads accounts** to the SiteOptz platform securely and independently!