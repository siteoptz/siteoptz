# 🔍 GoHighLevel 403 Error - Deep Troubleshooting Guide

## Current Situation
- **New API Key**: `pit-848fd970-d975-46b3-8c05-9da212a7bd17`
- **Permissions**: "All location permissions"
- **Error**: Still getting HTTP 403 "The token does not have access to this location"
- **Location ID**: `ECu5ScdYFmB0WnhvYoBU`

## 🚨 Advanced Troubleshooting Steps

### Step 1: Verify Location ID Accuracy
The location ID might be incorrect or the location might not exist.

**Check 1: Verify Location ID in GoHighLevel**
1. Log into GoHighLevel
2. Go to **Settings → Company**
3. Look for "Location ID" or "Sub-Account ID"
4. **Copy the exact ID** (case-sensitive)

**Check 2: Verify Location ID in URL**
1. While in GoHighLevel, check the browser URL
2. Look for `/location/[LOCATION_ID]/`
3. Compare with `ECu5ScdYFmB0WnhvYoBU`

**Check 3: Test with Location List API**
```bash
curl -X GET \
  "https://services.leadconnectorhq.com/locations/" \
  -H "Authorization: Bearer pit-848fd970-d975-46b3-8c05-9da212a7bd17" \
  -H "Version: 2021-07-28" \
  -H "Content-Type: application/json"
```

This will show you all accessible locations and their IDs.

### Step 2: Check API Key Scope and Type
Even with "all permissions," the key type matters.

**Verify API Key Details:**
1. Go to **Settings → Integrations → API Keys**
2. Click on `pit-848fd970-d975-46b3-8c05-9da212a7bd17`
3. Check:
   - **Type**: Must be "Location API Key" (NOT "Agency API Key")
   - **Scope**: Should show the specific location `ECu5ScdYFmB0WnhvYoBU`
   - **Status**: Must be "Active"

### Step 3: Test API Key with Different Endpoints
Test various endpoints to isolate the issue:

```bash
# Test 1: Basic API access (no location-specific)
curl -X GET \
  "https://services.leadconnectorhq.com/locations/" \
  -H "Authorization: Bearer pit-848fd970-d975-46b3-8c05-9da212a7bd17" \
  -H "Version: 2021-07-28"

# Test 2: Contacts endpoint with location
curl -X GET \
  "https://services.leadconnectorhq.com/contacts/" \
  -H "Authorization: Bearer pit-848fd970-d975-46b3-8c05-9da212a7bd17" \
  -H "Version: 2021-07-28" \
  -H "Location-Id: ECu5ScdYFmB0WnhvYoBU"

# Test 3: Try without Location-Id header
curl -X GET \
  "https://services.leadconnectorhq.com/contacts/" \
  -H "Authorization: Bearer pit-848fd970-d975-46b3-8c05-9da212a7bd17" \
  -H "Version: 2021-07-28"
```

### Step 4: Check GoHighLevel Account Status
The account or location might have restrictions.

**Check Account Status:**
1. Go to **Settings → Billing**
2. Verify account is active and in good standing
3. Check if there are any API usage limits or restrictions

**Check Location Status:**
1. Go to **Settings → Company**
2. Verify the location is active
3. Check if there are any location-specific restrictions

### Step 5: Verify API Key Creation Process
The key might have been created incorrectly.

**Recreate API Key with Exact Steps:**
1. **Delete the current key**: `pit-848fd970-d975-46b3-8c05-9da212a7bd17`
2. **Ensure you're in the correct location**: URL should show `ECu5ScdYFmB0WnhvYoBU`
3. **Create new key**:
   - Go to **Settings → Integrations → API Keys**
   - Click **"Create API Key"**
   - **Name**: `SiteOptz Integration v2`
   - **Type**: `Location API Key` (NOT Agency)
   - **Location**: Should auto-select `ECu5ScdYFmB0WnhvYoBU`
   - **Permissions**: Select all available permissions
4. **Copy the new key immediately**

### Step 6: Test with GoHighLevel API Documentation
Use the official GoHighLevel API testing tool:

1. Go to [https://highlevel.stoplight.io/](https://highlevel.stoplight.io/)
2. Find the "Contacts" endpoint
3. Use your API key to test directly
4. This will show if the issue is with your implementation or the API key

### Step 7: Check for Sub-Account Issues
You might be in a sub-account that doesn't have API access.

**Verify Sub-Account Access:**
1. Check if you're in a sub-account or main account
2. Some sub-accounts have limited API access
3. Try creating the API key in the main account instead

### Step 8: Contact GoHighLevel Support
If all else fails, this might be a GoHighLevel platform issue.

**Support Information to Provide:**
- API Key: `pit-848fd970-d975-46b3-8c05-9da212a7bd17`
- Location ID: `ECu5ScdYFmB0WnhvYoBU`
- Error: HTTP 403 "The token does not have access to this location"
- Steps taken: All troubleshooting steps completed
- Account type: [Your account type]

## 🔧 Alternative Solutions

### Solution 1: Use Agency API Key
If you have agency-level access:

1. Create an **Agency API Key** instead
2. Use the agency key without the `Location-Id` header
3. The API will use the default location

### Solution 2: Check for API Version Issues
Try different API versions:

```bash
# Try with different version
curl -X GET \
  "https://services.leadconnectorhq.com/contacts/" \
  -H "Authorization: Bearer pit-848fd970-d975-46b3-8c05-9da212a7bd17" \
  -H "Version: 2021-04-15" \
  -H "Location-Id: ECu5ScdYFmB0WnhvYoBU"
```

### Solution 3: Verify Location ID Format
The location ID might need to be in a different format:

```bash
# Try with different location ID formats
# Original: ECu5ScdYFmB0WnhvYoBU
# Try: ecu5scdyfmb0wnhvyobu (lowercase)
# Try: ECu5ScdYFmB0WnhvYoBU (exact case)
```

## 🧪 Diagnostic Script

Run this comprehensive test script:

```javascript
// ghl-diagnostic.js
const fetch = require('node-fetch');

async function runDiagnostics() {
  const apiKey = 'pit-848fd970-d975-46b3-8c05-9da212a7bd17';
  const locationId = 'ECu5ScdYFmB0WnhvYoBU';
  
  console.log('🔍 GoHighLevel API Diagnostic Test');
  console.log('=====================================');
  console.log(`API Key: ${apiKey}`);
  console.log(`Location ID: ${locationId}`);
  console.log('');
  
  // Test 1: Get locations
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
      console.log('Available locations:', locations.locations?.map(l => l.id) || 'None');
      
      // Check if our location is in the list
      const hasLocation = locations.locations?.some(l => l.id === locationId);
      console.log(`Target location ${locationId} found: ${hasLocation ? '✅ Yes' : '❌ No'}`);
    } else {
      console.log('❌ Locations API failed:', locationsResponse.status);
    }
  } catch (error) {
    console.log('❌ Locations API error:', error.message);
  }
  
  console.log('');
  
  // Test 2: Get contacts without location
  console.log('Test 2: Getting contacts without Location-Id header...');
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
  
  // Test 3: Get contacts with location
  console.log('Test 3: Getting contacts with Location-Id header...');
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

runDiagnostics();
```

## 📞 Next Steps

1. **Run the diagnostic script** to identify the exact issue
2. **Check the locations API** to verify accessible locations
3. **Verify location ID accuracy** in GoHighLevel settings
4. **Contact GoHighLevel support** if the issue persists

The diagnostic script will help identify whether:
- The API key is valid
- The location ID is correct
- The location is accessible
- There are permission issues

Let me know the results of the diagnostic test, and I can provide more specific guidance based on the output.
