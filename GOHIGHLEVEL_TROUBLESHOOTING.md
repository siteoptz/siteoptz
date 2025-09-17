# GoHighLevel API Key Troubleshooting Guide

## Current Issue
- **Error**: HTTP 403 "The token does not have access to this location"
- **API Key**: pit-0240a9ce-6ee1-4e06-8222-d6323fa351ba
- **Location ID**: ECu5ScdYFmB0WnhvYoBU

## Step-by-Step Fix

### Step 1: Verify You're in the Correct Location
1. Log into your GoHighLevel account
2. Check the URL in your browser - it should contain your location ID
3. The URL should look like: `https://app.gohighlevel.com/v2/location/ECu5ScdYFmB0WnhvYoBU/...`
4. If the location ID in the URL doesn't match `ECu5ScdYFmB0WnhvYoBU`, you're in the wrong location

### Step 2: Check API Key Type and Location
1. Go to **Settings → Integrations → API Keys**
2. Find the API key: `pit-0240a9ce-6ee1-4e06-8222-d6323fa351ba`
3. Verify:
   - ✅ **Type**: Should be "Location API Key" (NOT "Agency API Key")
   - ✅ **Status**: Should be "Active" 
   - ✅ **Location**: Should match your current location
   - ✅ **Permissions**: Should include "Contacts" with "Create" permission

### Step 3: Check API Key Permissions
1. Click on the API key to view details
2. Ensure these permissions are enabled:
   - ✅ **Contacts**: Read, Write, Delete
   - ✅ **Opportunities**: Read, Write (if needed)
   - ✅ **Locations**: Read (required for location access)

### Step 4: Verify Location ID
1. Go to **Settings → Company**
2. The Location ID should be displayed
3. Alternative: Check the URL while in settings - look for `/location/LOCATION_ID/`
4. Confirm it matches: `ECu5ScdYFmB0WnhvYoBU`

### Step 5: Create New API Key (If Needed)
If the current key has issues:

1. Go to **Settings → Integrations → API Keys**
2. Click **"Create API Key"**
3. Set these options:
   - **Name**: SiteOptz Integration
   - **Type**: Location API Key
   - **Permissions**: 
     - Contacts: Read, Write, Delete
     - Locations: Read
4. Copy the new API key and update your environment

### Step 6: Test API Key Manually
Use this curl command to test (replace with your actual API key):

```bash
curl -X GET \
  "https://services.leadconnectorhq.com/contacts/" \
  -H "Authorization: Bearer pit-0240a9ce-6ee1-4e06-8222-d6323fa351ba" \
  -H "Version: 2021-07-28" \
  -H "Location-Id: ECu5ScdYFmB0WnhvYoBU" \
  -H "Content-Type: application/json"
```

**Expected Results:**
- ✅ **Success (200)**: Returns contact list or empty array
- ❌ **403 Error**: API key/location mismatch
- ❌ **401 Error**: Invalid API key

## Common Issues and Solutions

### Issue: "Agency API Key Used"
- **Problem**: Using agency-level key for location-specific operation
- **Solution**: Create a Location API Key instead

### Issue: "Wrong Location"
- **Problem**: API key created in different sub-account/location
- **Solution**: Switch to correct location or create new key in current location

### Issue: "Insufficient Permissions"
- **Problem**: API key missing required permissions
- **Solution**: Edit API key permissions to include Contacts Read/Write

### Issue: "Expired/Disabled Key"
- **Problem**: API key was deactivated
- **Solution**: Reactivate or create new API key

## Next Steps After Fix

Once the API key works:

1. Update the API key in your environment file
2. Test the integration again with the test script
3. The contact creation should work automatically
4. New user registrations will create GoHighLevel contacts

## Fallback Option

If you cannot resolve the API key issue immediately:

1. The system will continue logging contact data to the console
2. You can manually add contacts to GoHighLevel using the logged data
3. Email notifications will continue working normally
4. User registration is not blocked by this issue

## Contact Information

If you need help with GoHighLevel API setup:
- Check GoHighLevel documentation: https://highlevel.stoplight.io/
- Contact GoHighLevel support for API key issues
- Verify your GoHighLevel plan includes API access