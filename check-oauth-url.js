#!/usr/bin/env node

/**
 * Check exact OAuth URL being generated
 */

require('dotenv').config({ path: '.env.local' });

console.log('🔍 OAuth URL Generation Check');
console.log('==============================\n');

const clientId = process.env.GOOGLE_CLIENT_ID || process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;
console.log('Client ID being used:', clientId);

// Test different scenarios
const scenarios = [
  { name: 'Local Development', baseUrl: 'http://localhost:3000' },
  { name: 'Production', baseUrl: 'https://siteoptz.ai' },
];

console.log('\n📋 OAuth URLs for each scenario:\n');

scenarios.forEach(scenario => {
  const redirectUri = `${scenario.baseUrl}/api/marketing-platforms/google-ads/callback`;
  
  const params = new URLSearchParams({
    client_id: clientId,
    redirect_uri: redirectUri,
    scope: 'https://www.googleapis.com/auth/adwords https://www.googleapis.com/auth/analytics.readonly',
    response_type: 'code',
    access_type: 'offline',
    prompt: 'consent',
    state: 'google_ads_auth_state'
  });
  
  const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?${params.toString()}`;
  
  console.log(`${scenario.name}:`);
  console.log(`Redirect URI: ${redirectUri}`);
  console.log(`Full URL: ${authUrl}\n`);
});

console.log('==============================');
console.log('⚠️  IMPORTANT: The redirect URI in the OAuth URL MUST exactly match');
console.log('   one of the authorized redirect URIs in Google Cloud Console.\n');
console.log('🔗 Add these exact URIs to your OAuth client:');
console.log('   • http://localhost:3000/api/marketing-platforms/google-ads/callback');
console.log('   • https://siteoptz.ai/api/marketing-platforms/google-ads/callback\n');

// Now let's check what happens when we make the request from browser
console.log('📍 When you click "Connect Google Ads" in the browser:');
console.log('   - If on localhost:3000, redirect URI should be: http://localhost:3000/...');
console.log('   - If on siteoptz.ai, redirect URI should be: https://siteoptz.ai/...');
console.log('\n❌ Common issues:');
console.log('   - Using https://siteoptz.ai redirect when testing on localhost');
console.log('   - Missing the exact redirect URI in Google Cloud Console');
console.log('   - Protocol mismatch (http vs https)');