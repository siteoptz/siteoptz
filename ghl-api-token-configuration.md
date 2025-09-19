# 🔧 GoHighLevel API Token Configuration for Location ECu5ScdYFmB0WnhvYoBU

## Overview
This guide provides step-by-step instructions to configure API token permissions in GoHighLevel to access the specific location `ECu5ScdYFmB0WnhvYoBU` for SiteOptz.ai integration.

## 🎯 Current Configuration Details
- **Location ID**: `ECu5ScdYFmB0WnhvYoBU`
- **Current API Key**: `pit-0240a9ce-6ee1-4e06-8222-d6323fa351ba`
- **Issue**: "The token does not have access to this location" (HTTP 403)

## 📋 Step-by-Step Configuration

### Step 1: Access GoHighLevel Dashboard
1. **Log into GoHighLevel**: Go to [https://app.gohighlevel.com](https://app.gohighlevel.com)
2. **Navigate to Location**: Ensure you're in the correct location
3. **Verify Location ID**: Check the URL should contain `ECu5ScdYFmB0WnhvYoBU`
   ```
   https://app.gohighlevel.com/v2/location/ECu5ScdYFmB0WnhvYoBU/...
   ```

### Step 2: Navigate to API Settings
1. **Go to Settings**: Click on the gear icon (⚙️) in the left sidebar
2. **Select Integrations**: Click on "Integrations" from the settings menu
3. **Access API Keys**: Click on "API Keys" or "API Access"

### Step 3: Check Current API Key Status
1. **Find Your API Key**: Look for the key `pit-0240a9ce-6ee1-4e06-8222-d6323fa351ba`
2. **Verify Key Details**:
   - ✅ **Name**: Should be descriptive (e.g., "SiteOptz Integration")
   - ✅ **Type**: Must be "Location API Key" (NOT "Agency API Key")
   - ✅ **Status**: Should be "Active"
   - ✅ **Location**: Should match `ECu5ScdYFmB0WnhvYoBU`

### Step 4: Configure API Key Permissions
Click on your API key to edit permissions. Ensure these permissions are enabled:

#### Required Permissions for SiteOptz Integration:
```
✅ Contacts
   ├── Read (Required for checking existing contacts)
   ├── Write (Required for creating new contacts)
   └── Delete (Optional, for contact management)

✅ Locations
   └── Read (Required for location access validation)

✅ Opportunities (Optional)
   ├── Read (If using pipeline features)
   └── Write (If creating opportunities)

✅ Workflows (Optional)
   └── Read (If triggering workflows)
```

### Step 5: Create New API Key (If Current Key Has Issues)
If the current key cannot be fixed, create a new one:

1. **Click "Create API Key"**
2. **Configure New Key**:
   ```
   Name: SiteOptz AI Integration
   Type: Location API Key
   Description: API key for SiteOptz.ai contact management and lead capture
   ```

3. **Set Permissions**:
   ```
   ✅ Contacts: Read, Write, Delete
   ✅ Locations: Read
   ✅ Opportunities: Read, Write (optional)
   ✅ Workflows: Read (optional)
   ```

4. **Save and Copy**: Copy the new API key immediately (it won't be shown again)

### Step 6: Update Environment Variables
Update your `.env.local` file with the correct configuration:

```bash
# GoHighLevel API Configuration
GOHIGHLEVEL_API_KEY=your_new_or_updated_api_key_here
GOHIGHLEVEL_LOCATION_ID=ECu5ScdYFmB0WnhvYoBU
ENABLE_GHL=true

# Optional: For debugging
GHL_DEBUG=true
```

### Step 7: Test API Key Configuration
Use this curl command to test your API key:

```bash
# Test 1: Basic API Access
curl -X GET \
  "https://services.leadconnectorhq.com/contacts/" \
  -H "Authorization: Bearer YOUR_API_KEY_HERE" \
  -H "Version: 2021-07-28" \
  -H "Location-Id: ECu5ScdYFmB0WnhvYoBU" \
  -H "Content-Type: application/json"

# Test 2: Create Test Contact
curl -X POST \
  "https://services.leadconnectorhq.com/contacts/" \
  -H "Authorization: Bearer YOUR_API_KEY_HERE" \
  -H "Version: 2021-07-28" \
  -H "Location-Id: ECu5ScdYFmB0WnhvYoBU" \
  -H "Content-Type: application/json" \
  -d '{
    "firstName": "Test",
    "lastName": "User",
    "email": "test@siteoptz.ai",
    "tags": ["API Test", "SiteOptz Integration"]
  }'
```

**Expected Results:**
- ✅ **200 OK**: API key is working correctly
- ❌ **403 Forbidden**: Location access issue
- ❌ **401 Unauthorized**: Invalid API key

## 🔍 Troubleshooting Common Issues

### Issue 1: "Agency API Key" Error
**Problem**: Using agency-level API key instead of location-specific key
**Solution**:
1. Delete the agency API key
2. Create a new "Location API Key" specifically for `ECu5ScdYFmB0WnhvYoBU`
3. Ensure you're in the correct location when creating the key

### Issue 2: "Wrong Location" Error
**Problem**: API key was created in a different sub-account
**Solution**:
1. Verify you're in location `ECu5ScdYFmB0WnhvYoBU`
2. Check the URL contains the correct location ID
3. Create a new API key while in the correct location

### Issue 3: "Insufficient Permissions" Error
**Problem**: API key missing required permissions
**Solution**:
1. Edit the existing API key
2. Enable all required permissions:
   - Contacts: Read, Write
   - Locations: Read
3. Save the changes

### Issue 4: "API Key Not Found" Error
**Problem**: API key was deleted or deactivated
**Solution**:
1. Check if the key still exists in GoHighLevel
2. Verify the key status is "Active"
3. Create a new API key if needed

## 🧪 Advanced Testing

### Test API Key with SiteOptz Integration
Use this Node.js script to test the integration:

```javascript
// test-ghl-api.js
const fetch = require('node-fetch');

async function testGHLAPI() {
  const apiKey = 'YOUR_API_KEY_HERE';
  const locationId = 'ECu5ScdYFmB0WnhvYoBU';
  
  try {
    // Test 1: Get contacts
    console.log('Testing API access...');
    const response = await fetch('https://services.leadconnectorhq.com/contacts/', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Version': '2021-07-28',
        'Location-Id': locationId,
        'Content-Type': 'application/json'
      }
    });
    
    if (response.ok) {
      const data = await response.json();
      console.log('✅ API access successful!');
      console.log(`Found ${data.contacts?.length || 0} contacts`);
    } else {
      console.log('❌ API access failed:', response.status, response.statusText);
      const error = await response.text();
      console.log('Error details:', error);
    }
    
    // Test 2: Create test contact
    console.log('\nTesting contact creation...');
    const createResponse = await fetch('https://services.leadconnectorhq.com/contacts/', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Version': '2021-07-28',
        'Location-Id': locationId,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        firstName: 'API Test',
        lastName: 'User',
        email: `test-${Date.now()}@siteoptz.ai`,
        tags: ['API Test', 'SiteOptz Integration']
      })
    });
    
    if (createResponse.ok) {
      const contact = await createResponse.json();
      console.log('✅ Contact creation successful!');
      console.log('Contact ID:', contact.contact?.id);
    } else {
      console.log('❌ Contact creation failed:', createResponse.status);
      const error = await createResponse.text();
      console.log('Error details:', error);
    }
    
  } catch (error) {
    console.error('❌ Test failed:', error.message);
  }
}

testGHLAPI();
```

Run the test:
```bash
node test-ghl-api.js
```

## 📊 Verification Checklist

After configuring the API key, verify these items:

- [ ] **API Key Type**: Location API Key (not Agency)
- [ ] **Location Match**: Key created in location `ECu5ScdYFmB0WnhvYoBU`
- [ ] **Permissions**: Contacts Read/Write, Locations Read
- [ ] **Status**: Active and not expired
- [ ] **Environment**: Updated in `.env.local` file
- [ ] **Test Results**: API calls return 200 OK
- [ ] **Contact Creation**: Can create test contacts
- [ ] **Integration**: SiteOptz forms create GoHighLevel contacts

## 🚀 Next Steps

Once the API key is configured correctly:

1. **Test the Integration**: Submit a test form on SiteOptz.ai
2. **Verify Contact Creation**: Check GoHighLevel for the new contact
3. **Monitor Logs**: Watch for successful API calls in the application logs
4. **Set Up Workflows**: Configure GoHighLevel workflows for new leads
5. **Email Notifications**: Ensure welcome emails are sent to new contacts

## 📞 Support Resources

### GoHighLevel Support
- **Documentation**: [https://highlevel.stoplight.io/](https://highlevel.stoplight.io/)
- **API Reference**: [https://developers.gohighlevel.com](https://developers.gohighlevel.com)
- **Support Portal**: [https://help.gohighlevel.com](https://help.gohighlevel.com)

### SiteOptz Integration Support
- **Check Application Logs**: Review Vercel dashboard for error messages
- **Test API Endpoints**: Use the provided test scripts
- **Environment Variables**: Verify all required variables are set
- **Contact Development Team**: For integration-specific issues

## 🔒 Security Best Practices

1. **Never Share API Keys**: Keep API keys confidential
2. **Use Environment Variables**: Never hardcode API keys in source code
3. **Regular Rotation**: Rotate API keys periodically
4. **Monitor Usage**: Check API key usage logs for unauthorized access
5. **Least Privilege**: Only grant necessary permissions
6. **Secure Storage**: Use secure methods to store API keys

This configuration will enable SiteOptz.ai to successfully create and manage contacts in GoHighLevel location `ECu5ScdYFmB0WnhvYoBU` for all user registrations and lead capture activities.
