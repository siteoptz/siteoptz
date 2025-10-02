#!/usr/bin/env node

/**
 * OAuth Diagnostic Script
 * This will help identify the issue with the Google OAuth setup
 */

require('dotenv').config({ path: '.env.local' });

console.log('🔍 Google OAuth Diagnostic Report');
console.log('==================================\n');

// Check environment variables
console.log('1. Environment Variables Check:');
console.log('--------------------------------');
const clientId = process.env.GOOGLE_CLIENT_ID;
const clientSecret = process.env.GOOGLE_CLIENT_SECRET;
const nextPublicClientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;

console.log(`GOOGLE_CLIENT_ID: ${clientId ? '✅ Set' : '❌ Missing'}`);
if (clientId) {
  console.log(`  Value: ${clientId}`);
}

console.log(`GOOGLE_CLIENT_SECRET: ${clientSecret ? '✅ Set' : '❌ Missing'}`);
if (clientSecret) {
  console.log(`  Value: ${clientSecret.substring(0, 10)}...`);
}

console.log(`NEXT_PUBLIC_GOOGLE_CLIENT_ID: ${nextPublicClientId ? '✅ Set' : '❌ Missing'}`);
if (nextPublicClientId) {
  console.log(`  Value: ${nextPublicClientId}`);
}

// Check if client IDs match
if (clientId && nextPublicClientId && clientId !== nextPublicClientId) {
  console.log('\n⚠️  WARNING: GOOGLE_CLIENT_ID and NEXT_PUBLIC_GOOGLE_CLIENT_ID don\'t match!');
}

// Generate test URLs
console.log('\n2. OAuth URLs for Testing:');
console.log('--------------------------------');
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://siteoptz.ai';

// For localhost testing
const localhostRedirectUri = 'http://localhost:3000/api/marketing-platforms/google-ads/callback';
const productionRedirectUri = 'https://siteoptz.ai/api/marketing-platforms/google-ads/callback';

console.log('Redirect URIs to configure in Google Cloud Console:');
console.log(`  • ${productionRedirectUri}`);
console.log(`  • ${localhostRedirectUri} (for local development)`);

// Test token exchange manually
console.log('\n3. Token Exchange Test:');
console.log('--------------------------------');
console.log('To test token exchange manually:');
console.log('1. Ensure these exact redirect URIs are in Google Cloud Console');
console.log('2. The client ID and secret must match exactly');
console.log('3. The redirect URI in the request must match exactly (including http vs https)');

// Generate correct OAuth URL
console.log('\n4. Correct OAuth URL:');
console.log('--------------------------------');
const params = new URLSearchParams({
  client_id: clientId || 'CLIENT_ID_NOT_SET',
  redirect_uri: productionRedirectUri,
  scope: 'https://www.googleapis.com/auth/adwords https://www.googleapis.com/auth/analytics.readonly',
  response_type: 'code',
  access_type: 'offline',
  prompt: 'consent',
  state: 'google_ads_auth_state'
});

const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?${params.toString()}`;
console.log('Production OAuth URL:');
console.log(authUrl.substring(0, 200) + '...');

// Local development URL
const localParams = new URLSearchParams({
  client_id: clientId || 'CLIENT_ID_NOT_SET',
  redirect_uri: localhostRedirectUri,
  scope: 'https://www.googleapis.com/auth/adwords https://www.googleapis.com/auth/analytics.readonly',
  response_type: 'code',
  access_type: 'offline',
  prompt: 'consent',
  state: 'google_ads_auth_state'
});

const localAuthUrl = `https://accounts.google.com/o/oauth2/v2/auth?${localParams.toString()}`;
console.log('\nLocal Development OAuth URL:');
console.log(localAuthUrl.substring(0, 200) + '...');

// Common issues
console.log('\n5. Common Issues & Solutions:');
console.log('--------------------------------');
console.log('❌ "invalid_client" error means:');
console.log('   • Client ID doesn\'t exist in Google Cloud Console');
console.log('   • Client Secret doesn\'t match');
console.log('   • OAuth client was deleted or disabled');
console.log('\n✅ To fix:');
console.log('   1. Go to https://console.cloud.google.com/');
console.log('   2. Select your project');
console.log('   3. Go to "APIs & Services" > "Credentials"');
console.log('   4. Find or create OAuth 2.0 Client ID');
console.log('   5. Add BOTH redirect URIs listed above');
console.log('   6. Copy the exact Client ID and Client Secret');
console.log('   7. Update .env.local with the correct values');

// Check if running locally or in production
console.log('\n6. Current Environment:');
console.log('--------------------------------');
console.log(`NODE_ENV: ${process.env.NODE_ENV || 'not set'}`);
console.log(`Base URL: ${baseUrl}`);

if (process.env.NODE_ENV === 'development' || !process.env.NODE_ENV) {
  console.log('\n📝 For local development:');
  console.log('   Make sure http://localhost:3000/api/marketing-platforms/google-ads/callback');
  console.log('   is added to your OAuth client\'s authorized redirect URIs');
}

console.log('\n==================================');
console.log('📋 Action Items:');
console.log('1. Verify the OAuth client exists in Google Cloud Console');
console.log('2. Ensure redirect URIs match exactly (including protocol)');
console.log('3. Confirm Client ID: ' + (clientId || 'NOT SET'));
console.log('4. Update .env.local if needed and restart the dev server');
console.log('==================================\n');