# GoHighLevel Integration Troubleshooting Guide

## 🚨 Issue: User OAuth Works But Not Added to GHL

The OAuth flow is working correctly (users can sign in), but users are not being created in GoHighLevel CRM.

## 🔍 Diagnostic Steps

### Step 1: Check Environment Variables in Production

Test if GHL credentials are properly set in Vercel:

```bash
# Test via API endpoint
curl "https://siteoptz.ai/api/debug/ghl-test?debug=siteoptz-debug-2024"
```

**Expected Response:**
```json
{
  "ghl_configured": true,
  "api_key_length": 64,
  "location_id": "your-location-id",
  "connection_test": {
    "success": true,
    "status": 200
  }
}
```

### Step 2: Test GHL API Connection

```bash
# Test basic GHL API connectivity
curl "https://siteoptz.ai/api/debug/ghl-test?action=connection&debug=siteoptz-debug-2024"
```

**Possible Issues:**
- ❌ `401 Unauthorized`: Invalid API key
- ❌ `403 Forbidden`: API key lacks permissions
- ❌ `404 Not Found`: Wrong endpoint or location ID
- ✅ `200 Success`: API is working

### Step 3: Test Contact Search

```bash
# Search for a specific user
curl "https://siteoptz.ai/api/debug/ghl-test?action=search&email=test@example.com&debug=siteoptz-debug-2024"
```

### Step 4: Test Contact Creation Manually

```bash
# Manual contact creation test
curl -X POST "https://siteoptz.ai/api/test/ghl-manual" \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "name": "Test User", 
    "plan": "free",
    "trial": true,
    "action": "force_create"
  }'
```

### Step 5: Check Vercel Function Logs

1. Go to Vercel dashboard → Functions → View logs
2. Look for OAuth callback logs during sign-in attempts
3. Search for GHL-related error messages

## 🔧 Common Issues & Solutions

### Issue 1: Environment Variables Not Set

**Symptoms:**
```json
{
  "ghl_configured": false,
  "api_key_length": 0
}
```

**Solution:**
```bash
# Add missing environment variables in Vercel
vercel env add GHL_API_KEY production
vercel env add GHL_LOCATION_ID production
vercel --prod
```

### Issue 2: Invalid API Key

**Symptoms:**
```json
{
  "connection_test": {
    "success": false,
    "status": 401,
    "error": "Unauthorized"
  }
}
```

**Solutions:**
1. **Generate new API key** in GHL Settings → API
2. **Verify API key permissions** (needs contact management)
3. **Update Vercel environment variables** with new key

### Issue 3: Wrong Location ID

**Symptoms:**
```json
{
  "connection_test": {
    "success": false, 
    "status": 403,
    "error": "Access denied to location"
  }
}
```

**Solutions:**
1. **Check Location ID** in GHL Settings → General
2. **Verify API key has access** to the specific location
3. **Update LOCATION_ID** environment variable

### Issue 4: API Rate Limits

**Symptoms:**
```json
{
  "connection_test": {
    "success": false,
    "status": 429,
    "error": "Too Many Requests"
  }
}
```

**Solutions:**
1. **Implement retry logic** with exponential backoff
2. **Add rate limiting** to OAuth callback
3. **Monitor API usage** in GHL dashboard

### Issue 5: Custom Fields Validation

**Symptoms:**
```json
{
  "create_contact": {
    "success": false,
    "status": 400,
    "error": "Invalid custom field"
  }
}
```

**Solutions:**
1. **Check custom field names** in GHL Settings → Custom Fields
2. **Verify field types** (text, number, etc.)
3. **Remove unsupported fields** from contact creation

## 🛠️ Debugging Tools

### Production Debug Endpoints

1. **Environment Check:**
   ```
   GET /api/debug/ghl-test?debug=siteoptz-debug-2024
   ```

2. **Connection Test:**
   ```
   GET /api/debug/ghl-test?action=connection&debug=siteoptz-debug-2024
   ```

3. **Search Test:**
   ```
   GET /api/debug/ghl-test?action=search&email=USER_EMAIL&debug=siteoptz-debug-2024
   ```

4. **Manual Contact Creation:**
   ```
   POST /api/test/ghl-manual
   Body: {"email": "test@example.com", "name": "Test User", "action": "force_create"}
   ```

### Local Development Testing

```bash
# Run local test with environment variables
node -e "
const testEmail = 'test@example.com';
console.log('Testing GHL with:', testEmail);
// Add your test code here
"
```

## 🔍 Investigation Checklist

### GHL Configuration ✅

- [ ] **API Key exists** in Vercel environment variables
- [ ] **Location ID exists** in Vercel environment variables  
- [ ] **API Key has correct permissions** (contact management)
- [ ] **Location ID is correct** (matches GHL dashboard)

### API Connectivity ✅

- [ ] **Basic connection test passes** (status 200)
- [ ] **Search endpoint works** (can search for contacts)
- [ ] **Create endpoint works** (can create test contacts)
- [ ] **No rate limiting issues** (under API limits)

### OAuth Flow ✅

- [ ] **OAuth callback executes** (check Vercel logs)
- [ ] **GHL search function runs** (should see log messages)
- [ ] **GHL create function runs** (should see log messages)
- [ ] **No errors in signin callback** (check error handling)

### Data Validation ✅

- [ ] **Email format is valid** (passes validation)
- [ ] **Name field is present** (not empty)
- [ ] **Tags are valid** (no special characters)
- [ ] **Custom fields match GHL setup** (field names exist)

## 🚀 Quick Fix Commands

### Emergency Fix (If GHL is completely broken)

```javascript
// Temporarily disable GHL in NextAuth callback
// In pages/api/auth/[...nextauth].ts
const GHL_DISABLED = true; // Add this flag temporarily

if (GHL_DISABLED) {
  console.log('⚠️ GHL temporarily disabled for debugging');
  return true; // Allow OAuth to continue
}
```

### Enable Verbose Logging

```javascript
// Add to GHL functions for debugging
console.log('🔧 GHL Debug:', {
  api_key_length: process.env.GHL_API_KEY?.length,
  location_id: process.env.GHL_LOCATION_ID,
  email: email,
  timestamp: new Date().toISOString()
});
```

## 📊 Expected Behavior

### Successful OAuth + GHL Flow:

1. **User clicks "Start 7-Day Trial"**
2. **Google OAuth completes successfully**
3. **NextAuth callback executes**
4. **GHL search finds no existing contact**
5. **GHL creates new contact** 
6. **Contact appears in GHL dashboard**
7. **User redirected to dashboard**

### Logs You Should See:

```
🔥 OAuth Sign In Attempt: user@example.com
🔍 Searching for existing contact: user@example.com  
ℹ️ No GHL contact found for: user@example.com
🆕 New user via OAuth: user@example.com Plan: free Trial: true
✅ Created new GHL contact: user@example.com Plan: free Trial: true
```

## 🎯 Next Steps

1. **Run diagnostic endpoints** to identify the specific issue
2. **Check Vercel function logs** during OAuth attempts
3. **Test manual contact creation** to isolate the problem
4. **Fix identified issues** (credentials, permissions, etc.)
5. **Re-test OAuth flow** with real user account
6. **Monitor GHL dashboard** for new contacts

The most common issue is missing or incorrect environment variables in production. Start with the environment check and work through each diagnostic step systematically.