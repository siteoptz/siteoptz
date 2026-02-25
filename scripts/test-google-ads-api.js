// Test script to debug Google Ads API issues
// Run with: node scripts/test-google-ads-api.js

const https = require('https');
const querystring = require('querystring');

async function testGoogleAdsAPI() {
  console.log('🧪 Testing Google Ads API Configuration...\n');
  
  // Check environment variables
  console.log('📋 Environment Variables:');
  console.log('- GOOGLE_ADS_DEVELOPER_TOKEN:', process.env.GOOGLE_ADS_DEVELOPER_TOKEN ? '✅ Present' : '❌ Missing');
  console.log('- GOOGLE_CLIENT_ID:', process.env.GOOGLE_CLIENT_ID ? '✅ Present' : '❌ Missing');
  console.log('- GOOGLE_CLIENT_SECRET:', process.env.GOOGLE_CLIENT_SECRET ? '✅ Present' : '❌ Missing');
  console.log();

  // Instructions for manual testing
  console.log('🔧 To test with real user session:');
  console.log('1. Log in to your dashboard at http://localhost:3000/dashboard/free');
  console.log('2. Open browser developer tools');
  console.log('3. Go to Console tab');
  console.log('4. Look for the debug information panel at the bottom of the page');
  console.log('5. Check the following in the console logs:');
  console.log('   - "🔧 Google Ads Debug Info:" entries');
  console.log('   - Real account counts');
  console.log('   - API errors');
  console.log('   - Token availability');
  console.log();
  
  console.log('📊 What to look for:');
  console.log('- Data Source: Should show "real" if MCC accounts are found');
  console.log('- Real Accounts: Should be > 0 if accounts are accessible');
  console.log('- Has Dev Token: Should be "Yes" for API access');
  console.log('- Selected Test Account: Should be "No" for real data');
  console.log();
  
  console.log('🚨 Common Issues:');
  console.log('1. Developer Token missing or not approved by Google');
  console.log('2. OAuth scopes not including Google Ads API');
  console.log('3. Account doesn\'t have access to Google Ads');
  console.log('4. MCC account has no child accounts');
  console.log();
  
  console.log('💡 Next Steps:');
  console.log('1. Test the dashboard and check browser console');
  console.log('2. Verify Google Ads Developer Token approval status');
  console.log('3. Check OAuth consent screen includes all required scopes');
  console.log('4. Ensure test user has Google Ads account access');
}

testGoogleAdsAPI().catch(console.error);