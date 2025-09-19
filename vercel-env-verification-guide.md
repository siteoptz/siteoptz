# 🔧 Vercel Environment Variables Verification Guide

## Step 1: Access Vercel Dashboard

1. **Go to Vercel Dashboard**
   - Visit: https://vercel.com/dashboard
   - Sign in with your account

2. **Find Your Project**
   - Look for "siteoptz-ai" or similar project name
   - Click on the project

## Step 2: Navigate to Environment Variables

1. **Click Settings Tab**
   - At the top of your project page, click "Settings"

2. **Click Environment Variables**
   - In the left sidebar, click "Environment Variables"

## Step 3: Verify Required Variables

Check that these **EXACT** variables exist with **EXACT** values:

### ✅ Variable 1: ENABLE_GHL
- **Name**: `ENABLE_GHL` (all caps, underscore)
- **Value**: `true` (lowercase, no quotes)
- **Environment**: ☑️ Production (must be checked)

### ✅ Variable 2: GOHIGHLEVEL_API_KEY
- **Name**: `GOHIGHLEVEL_API_KEY` (all caps, underscores)
- **Value**: `pit-8954f181-e668-4613-80d6-c7b4aa8594b8` (no quotes, no spaces)
- **Environment**: ☑️ Production (must be checked)

### ✅ Variable 3: GOHIGHLEVEL_LOCATION_ID
- **Name**: `GOHIGHLEVEL_LOCATION_ID` (all caps, underscores)
- **Value**: `ECu5ScdYFmB0WnhvYoBU` (no quotes, no spaces)
- **Environment**: ☑️ Production (must be checked)

## Step 4: Common Issues to Check

### ❌ **Issue 1: Wrong Environment Selected**
- Make sure "Production" is checked, not just "Preview" or "Development"

### ❌ **Issue 2: Case Sensitivity**
- Variable names must be EXACTLY as shown (all caps)
- `enable_ghl` ≠ `ENABLE_GHL`

### ❌ **Issue 3: Extra Characters**
- No leading/trailing spaces
- No quotes around values
- No special characters

### ❌ **Issue 4: Not Redeployed**
- Changes only take effect after redeployment

## Step 5: Fix Common Issues

### If Variables Are Missing:
1. Click "Add New" for each missing variable
2. Enter exact name and value as shown above
3. Check "Production" environment
4. Click "Save"

### If Variables Exist But Wrong:
1. Click the "..." menu next to the variable
2. Click "Edit"
3. Fix the name/value
4. Make sure "Production" is checked
5. Click "Save"

## Step 6: Force Redeployment

After making changes:

1. **Go to Deployments Tab**
   - Click "Deployments" at the top

2. **Redeploy Latest**
   - Find the most recent deployment
   - Click the "..." menu
   - Click "Redeploy"
   - Confirm redeployment

## Step 7: Test After Deployment

Wait 1-2 minutes for deployment to complete, then test:

### Option A: Use Diagnostic Endpoint
```
https://siteoptz.ai/api/debug-ghl-production?secret=debug123
```

### Option B: Test Registration
1. Go to https://siteoptz.ai
2. Click "Get Started"
3. Fill out registration form
4. Check if user appears in GoHighLevel

## Step 8: Verification Checklist

- [ ] All 3 environment variables exist
- [ ] Variable names match exactly (case-sensitive)
- [ ] Values are correct (no quotes/spaces)
- [ ] "Production" environment is selected
- [ ] Application has been redeployed
- [ ] Diagnostic endpoint returns correct values
- [ ] Registration creates GoHighLevel contacts

## 🚨 If Still Not Working

1. **Take Screenshots** of your Vercel environment variables page
2. **Check Vercel Function Logs**:
   - Go to Functions tab in Vercel
   - Click on a recent function execution
   - Look for error messages

3. **Verify API Key Permissions**:
   - Test the API key directly in GoHighLevel
   - Ensure it has contact creation permissions

4. **Check Network Issues**:
   - Vercel might have IP restrictions
   - GoHighLevel might be blocking Vercel IPs

## Next Steps

Once you've verified/fixed the environment variables:
1. Redeploy the application
2. Test the diagnostic endpoint
3. Test actual user registration
4. Confirm users appear in GoHighLevel

---

**Need Help?** 
- Take screenshots of your Vercel environment variables
- Share the diagnostic endpoint response
- Test with a real registration attempt