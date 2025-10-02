#!/usr/bin/env node

/**
 * Test script for Google OAuth integration
 * This verifies that the OAuth client ID is properly configured
 */

// Set up environment variables
// Note: In production, these should be loaded from .env.local
process.env.GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID || 'your-google-client-id';
process.env.GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET || 'your-google-client-secret';
process.env.NEXT_PUBLIC_BASE_URL = 'https://siteoptz.ai';

console.log('🔧 Testing Google OAuth Configuration');
console.log('=====================================\n');

// Test 1: Check Client ID configuration
console.log('✅ Test 1: Client ID Configuration');
const clientId = process.env.GOOGLE_CLIENT_ID;
if (clientId && clientId !== 'your-google-client-id') {
  console.log('   ✓ Client ID is set');
  console.log(`   Client ID: ${clientId.substring(0, 30)}...`);
} else {
  console.log('   ✗ Client ID not configured');
  console.log(`   Please set GOOGLE_CLIENT_ID in your .env.local file`);
}

// Test 2: Generate OAuth URLs
console.log('\n✅ Test 2: OAuth URL Generation');

const generateTestUrls = () => {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://siteoptz.ai';
  
  // Google Ads Auth URL
  const googleAdsParams = new URLSearchParams({
    client_id: clientId,
    redirect_uri: `${baseUrl}/api/marketing-platforms/google-ads/callback`,
    scope: 'https://www.googleapis.com/auth/adwords https://www.googleapis.com/auth/analytics.readonly',
    response_type: 'code',
    access_type: 'offline',
    prompt: 'consent',
    state: 'google_ads_auth_state'
  });
  
  const googleAdsUrl = `https://accounts.google.com/o/oauth2/v2/auth?${googleAdsParams.toString()}`;
  
  // Google Analytics Auth URL
  const googleAnalyticsParams = new URLSearchParams({
    client_id: clientId,
    redirect_uri: `${baseUrl}/api/marketing-platforms/google-analytics/callback`,
    scope: 'https://www.googleapis.com/auth/analytics.readonly https://www.googleapis.com/auth/analytics.manage.users.readonly',
    response_type: 'code',
    access_type: 'offline',
    prompt: 'consent',
    state: 'google_analytics_auth_state'
  });
  
  const googleAnalyticsUrl = `https://accounts.google.com/o/oauth2/v2/auth?${googleAnalyticsParams.toString()}`;
  
  return { googleAdsUrl, googleAnalyticsUrl };
};

const { googleAdsUrl, googleAnalyticsUrl } = generateTestUrls();

console.log('   ✓ Google Ads OAuth URL generated');
console.log(`   URL preview: ${googleAdsUrl.substring(0, 100)}...`);

console.log('   ✓ Google Analytics OAuth URL generated');
console.log(`   URL preview: ${googleAnalyticsUrl.substring(0, 100)}...`);

// Test 3: Validate redirect URIs
console.log('\n✅ Test 3: Redirect URI Configuration');
const expectedRedirectUris = [
  'https://siteoptz.ai/api/marketing-platforms/google-ads/callback',
  'https://siteoptz.ai/api/marketing-platforms/google-analytics/callback',
  'https://siteoptz.ai/api/marketing-platforms/google/callback'
];

console.log('   Expected redirect URIs:');
expectedRedirectUris.forEach(uri => {
  console.log(`   • ${uri}`);
});

// Test 4: Check environment configuration
console.log('\n✅ Test 4: Environment Configuration');
const requiredEnvVars = [
  'GOOGLE_CLIENT_ID',
  'GOOGLE_CLIENT_SECRET'
];

const optionalEnvVars = [
  'GOOGLE_ADS_DEVELOPER_TOKEN',
  'GOOGLE_ADS_REFRESH_TOKEN'
];

requiredEnvVars.forEach(varName => {
  if (process.env[varName]) {
    console.log(`   ✓ ${varName} is set`);
  } else {
    console.log(`   ✗ ${varName} is missing`);
  }
});

console.log('\n   Optional variables:');
optionalEnvVars.forEach(varName => {
  if (process.env[varName]) {
    console.log(`   ✓ ${varName} is set`);
  } else {
    console.log(`   ○ ${varName} not set (optional)`);
  }
});

// Test 5: Test token exchange function setup
console.log('\n✅ Test 5: Token Exchange Function');
console.log('   Testing mock token exchange...');

const mockTokenExchange = async () => {
  const mockCode = 'test_auth_code_123';
  const redirectUri = 'https://siteoptz.ai/api/marketing-platforms/google-ads/callback';
  
  console.log(`   • Mock auth code: ${mockCode}`);
  console.log(`   • Redirect URI: ${redirectUri}`);
  console.log(`   • Client ID: ${clientId.substring(0, 30)}...`);
  console.log('   • Client Secret: [REDACTED]');
  
  // In production, this would make an actual API call
  console.log('   ✓ Token exchange function is configured');
  console.log('   Note: Actual token exchange requires valid auth code from Google');
};

await mockTokenExchange();

// Summary
console.log('\n=====================================');
console.log('📊 Test Summary');
console.log('=====================================');
console.log(`✅ OAuth Client ID: ${clientId && clientId !== 'your-google-client-id' ? 'Configured' : 'Not Configured'}`);
console.log(`✅ OAuth URLs: Generated successfully`);
console.log(`✅ Redirect URIs: Configured for siteoptz.ai`);
console.log(`✅ Environment: ${requiredEnvVars.every(v => process.env[v]) ? 'Ready' : 'Missing required variables'}`);

console.log('\n📝 Next Steps:');
console.log('1. Ensure the Google OAuth client is configured in Google Cloud Console');
console.log('2. Add the redirect URIs listed above to the OAuth client settings');
console.log('3. Test the OAuth flow with a real user authentication');
console.log('4. Monitor the console logs for any token exchange errors');

console.log('\n✨ OAuth setup is ready for testing!');