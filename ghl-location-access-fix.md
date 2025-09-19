# 🔧 GoHighLevel Location Access Fix - 403 Error Resolution

## Current Issue
- **Error**: HTTP 403 "The token does not have access to this location"
- **Location ID**: `ECu5ScdYFmB0WnhvYoBU`
- **Status**: New API key created but still getting 403

## 🚨 **Critical Diagnostic Steps**

### Step 1: Verify Location ID Exists
The location ID `ECu5ScdYFmB0WnhvYoBU` might not exist or be accessible.

**Check in GoHighLevel:**
1. Log into GoHighLevel
2. Go to **Settings → Company**
3. Look for "Location ID" or "Sub-Account ID"
4. **Copy the exact ID** (case-sensitive)

**Alternative Method:**
1. Check the URL while in GoHighLevel settings
2. Look for `/location/[LOCATION_ID]/` in the URL
3. This will show the actual location ID

### Step 2: Test API Key with Locations Endpoint
This will show you all accessible locations:

```bash
curl -X GET \
  "https://services.leadconnectorhq.com/locations/" \
  -H "Authorization: Bearer YOUR_NEW_API_KEY" \
  -H "Version: 2021-07-28" \
  -H "Content-Type: application/json"
```

**Expected Result**: Should return a list of locations you have access to.

**What to Look For:**
- Does `ECu5ScdYFmB0WnhvYoBU` appear in the list?
- Are there other location IDs that might be correct?

### Step 3: Check API Key Type and Scope
Even with a new key, verify the configuration:

1. **Go to**: Settings → Integrations → API Keys
2. **Click on your new API key**
3. **Verify**:
   - ✅ **Type**: "Location API Key" (NOT "Agency API Key")
   - ✅ **Scope**: Should show the specific location
   - ✅ **Status**: "Active"
   - ✅ **Permissions**: All required permissions enabled

### Step 4: Test Without Location-Id Header
Try accessing contacts without specifying the location:

```bash
curl -X GET \
  "https://services.leadconnectorhq.com/contacts/" \
  -H "Authorization: Bearer YOUR_NEW_API_KEY" \
  -H "Version: 2021-07-28" \
  -H "Content-Type: application/json"
```

**Expected Result**: Should work if the API key is valid

## 🔍 **Most Likely Causes**

### Cause 1: Wrong Location ID
- The location ID `ECu5ScdYFmB0WnhvYoBU` might be incorrect
- You might be in a different sub-account
- The location might have been deleted or renamed

### Cause 2: API Key Created in Wrong Location
- The API key was created in a different location
- You need to create the key while logged into the correct location

### Cause 3: Account/Location Restrictions
- The location might have API access disabled
- Your account might have location-specific restrictions
- The location might be in a different billing plan

## ⚡ **Immediate Action Plan**

### Action 1: Get the Correct Location ID
1. **Log into GoHighLevel**
2. **Go to Settings → Company**
3. **Copy the exact Location ID**
4. **Compare with `ECu5ScdYFmB0WnhvYoBU`**

### Action 2: Test with Locations API
```bash
curl -X GET \
  "https://services.leadconnectorhq.com/locations/" \
  -H "Authorization: Bearer YOUR_NEW_API_KEY" \
  -H "Version: 2021-07-28"
```

### Action 3: Create API Key in Correct Location
1. **Ensure you're in the correct location** (URL should show the right location ID)
2. **Delete the current API key**
3. **Create a new API key** while in the correct location
4. **Test the new key**

## 🧪 **Comprehensive Test Script**

Run this script to diagnose the exact issue:

```javascript
// ghl-location-diagnostic.js
const fetch = require('node-fetch');

async function diagnoseLocationAccess() {
  const apiKey = 'YOUR_NEW_API_KEY_HERE';
  const locationId = 'ECu5ScdYFmB0WnhvYoBU';
  
  console.log('🔍 GoHighLevel Location Access Diagnostic');
  console.log('==========================================');
  console.log(`API Key: ${apiKey}`);
  console.log(`Location ID: ${locationId}`);
  console.log('');
  
  // Test 1: Get all accessible locations
  console.log('Test 1: Getting accessible locations...');
  try {
    const locationsResponse = await fetch('https://services.leadconnectorhq.com/locations/', {
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Version': '2021-07-28',
        'Content-Type': 'application/json'
      }
    });
    
    if (locationsResponse.ok) {
      const locations = await locationsResponse.json();
      console.log('✅ Locations API accessible');
      console.log('Available locations:');
      locations.locations?.forEach(location => {
        console.log(`  - ${location.id}: ${location.name}`);
      });
      
      // Check if our target location is accessible
      const hasTargetLocation = locations.locations?.some(l => l.id === locationId);
      console.log(`\nTarget location ${locationId} accessible: ${hasTargetLocation ? '✅ Yes' : '❌ No'}`);
      
      if (!hasTargetLocation) {
        console.log('\n🔍 Possible solutions:');
        console.log('1. Check if the location ID is correct');
        console.log('2. Verify you\'re in the right sub-account');
        console.log('3. Create API key in the correct location');
      }
    } else {
      console.log('❌ Locations API failed:', locationsResponse.status);
      const error = await locationsResponse.text();
      console.log('Error:', error);
    }
  } catch (error) {
    console.log('❌ Locations API error:', error.message);
  }
  
  console.log('');
  
  // Test 2: Try contacts without location header
  console.log('Test 2: Testing contacts without Location-Id header...');
  try {
    const contactsResponse = await fetch('https://services.leadconnectorhq.com/contacts/', {
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Version': '2021-07-28',
        'Content-Type': 'application/json'
      }
    });
    
    if (contactsResponse.ok) {
      const contacts = await contactsResponse.json();
      console.log('✅ Contacts API accessible without Location-Id');
      console.log(`Found ${contacts.contacts?.length || 0} contacts`);
    } else {
      console.log('❌ Contacts API failed:', contactsResponse.status);
      const error = await contactsResponse.text();
      console.log('Error:', error);
    }
  } catch (error) {
    console.log('❌ Contacts API error:', error.message);
  }
  
  console.log('');
  
  // Test 3: Try contacts with location header
  console.log('Test 3: Testing contacts with Location-Id header...');
  try {
    const contactsWithLocationResponse = await fetch('https://services.leadconnectorhq.com/contacts/', {
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Version': '2021-07-28',
        'Location-Id': locationId,
        'Content-Type': 'application/json'
      }
    });
    
    if (contactsWithLocationResponse.ok) {
      const contacts = await contactsWithLocationResponse.json();
      console.log('✅ Contacts API accessible with Location-Id');
      console.log(`Found ${contacts.contacts?.length || 0} contacts`);
    } else {
      console.log('❌ Contacts API failed with Location-Id:', contactsWithLocationResponse.status);
      const error = await contactsWithLocationResponse.text();
      console.log('Error:', error);
    }
  } catch (error) {
    console.log('❌ Contacts API error with Location-Id:', error.message);
  }
  
  console.log('');
  console.log('🏁 Diagnostic complete');
}

diagnoseLocationAccess();
```

## 📞 **Next Steps**

1. **Run the diagnostic script** to see what locations are accessible
2. **Verify the correct location ID** in GoHighLevel settings
3. **Create a new API key** in the correct location if needed
4. **Test with the correct location ID**

## 🚨 **If Location ID is Wrong**

If the diagnostic shows that `ECu5ScdYFmB0WnhvYoBU` is not accessible:

1. **Get the correct location ID** from GoHighLevel settings
2. **Update your environment variables**:
   ```bash
   GOHIGHLEVEL_LOCATION_ID=correct_location_id_here
   ```
3. **Create a new API key** in the correct location
4. **Test the integration** again

The diagnostic script will tell you exactly what locations your API key can access, which will help identify if the location ID is correct or if you need to use a different one.

Run the diagnostic and let me know what locations are accessible - this will solve the 403 error!
