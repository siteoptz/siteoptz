#!/usr/bin/env node

// Debug script to diagnose OAuth permission issues
console.log('🔍 SiteOptz OAuth Debug Report');
console.log('==============================\n');

// Check environment variables
console.log('1. Environment Variables Check:');
console.log('-------------------------------');
console.log(`NODE_ENV: ${process.env.NODE_ENV || 'not set'}`);
console.log(`NEXTAUTH_URL: ${process.env.NEXTAUTH_URL || 'NOT SET'}`);
console.log(`NEXTAUTH_SECRET: ${process.env.NEXTAUTH_SECRET ? 'SET' : 'NOT SET'}`);
console.log(`GOOGLE_CLIENT_ID: ${process.env.GOOGLE_CLIENT_ID ? 'SET' : 'NOT SET'}`);
console.log(`GOOGLE_CLIENT_SECRET: ${process.env.GOOGLE_CLIENT_SECRET ? 'SET' : 'NOT SET'}`);

// Show GHL configuration status
console.log('\n2. GoHighLevel Configuration:');
console.log('-----------------------------');
console.log(`GHL_API_KEY: ${process.env.GHL_API_KEY ? 'SET' : 'NOT SET'}`);
console.log(`GHL_LOCATION_ID: ${process.env.GHL_LOCATION_ID ? 'SET' : 'NOT SET'}`);

// Common OAuth issues checklist
console.log('\n3. Common OAuth Issues Checklist:');
console.log('----------------------------------');
console.log('❌ Missing Environment Variables:');
if (!process.env.GOOGLE_CLIENT_ID) console.log('  - GOOGLE_CLIENT_ID is not set');
if (!process.env.GOOGLE_CLIENT_SECRET) console.log('  - GOOGLE_CLIENT_SECRET is not set');
if (!process.env.NEXTAUTH_URL) console.log('  - NEXTAUTH_URL is not set');
if (!process.env.NEXTAUTH_SECRET) console.log('  - NEXTAUTH_SECRET is not set');

console.log('\n❌ Potential Google Cloud Console Issues:');
console.log('  - Authorized redirect URIs not configured');
console.log('  - OAuth consent screen not published');
console.log('  - App domain verification missing');
console.log('  - Incorrect OAuth scopes');

console.log('\n❌ Potential Production Issues:');
console.log('  - Environment variables not set in Vercel');
console.log('  - Different environment variables between staging/production');
console.log('  - OAuth app not verified by Google');

console.log('\n4. Expected OAuth Configuration:');
console.log('--------------------------------');
console.log('✅ Google Cloud Console Setup:');
console.log('  - Project created with OAuth credentials');
console.log('  - Authorized redirect URIs:');
console.log('    • https://siteoptz.ai/api/auth/callback/google');
console.log('    • http://localhost:3000/api/auth/callback/google (dev)');
console.log('  - OAuth consent screen configured');
console.log('  - App published/verified if needed');

console.log('\n✅ Vercel Environment Variables:');
console.log('  - GOOGLE_CLIENT_ID: [Your Google OAuth Client ID]');
console.log('  - GOOGLE_CLIENT_SECRET: [Your Google OAuth Client Secret]');
console.log('  - NEXTAUTH_URL: https://siteoptz.ai');
console.log('  - NEXTAUTH_SECRET: [Random secret string]');

console.log('\n5. Troubleshooting Steps:');
console.log('-------------------------');
console.log('1. Check Vercel dashboard environment variables');
console.log('2. Verify Google Cloud Console OAuth configuration');
console.log('3. Check OAuth consent screen status');
console.log('4. Verify authorized redirect URIs');
console.log('5. Test with a different Google account');
console.log('6. Check Vercel function logs for detailed errors');

console.log('\n6. Quick Fix Command:');
console.log('--------------------');
console.log('If environment variables are missing in Vercel:');
console.log('vercel env add GOOGLE_CLIENT_ID');
console.log('vercel env add GOOGLE_CLIENT_SECRET');
console.log('vercel env add NEXTAUTH_URL');
console.log('vercel env add NEXTAUTH_SECRET');
console.log('vercel --prod');

// Check if this is a common configuration issue
if (!process.env.GOOGLE_CLIENT_ID || !process.env.GOOGLE_CLIENT_SECRET) {
  console.log('\n🚨 CRITICAL ISSUE DETECTED:');
  console.log('===========================');
  console.log('Google OAuth credentials are not configured!');
  console.log('This will cause "Access denied" errors for all users.');
  console.log('\nImmediate action required:');
  console.log('1. Set up Google OAuth credentials in Google Cloud Console');
  console.log('2. Add environment variables to Vercel');
  console.log('3. Redeploy the application');
}

// Test OAuth URL generation (if variables are present)
if (process.env.GOOGLE_CLIENT_ID && process.env.NEXTAUTH_URL) {
  console.log('\n7. Test OAuth URLs:');
  console.log('-------------------');
  const baseUrl = process.env.NEXTAUTH_URL || 'https://siteoptz.ai';
  console.log(`OAuth Sign In: ${baseUrl}/api/auth/signin/google`);
  console.log(`OAuth Callback: ${baseUrl}/api/auth/callback/google`);
}

console.log('\n8. Next Steps:');
console.log('--------------');
console.log('1. Run this script in production to check environment variables');
console.log('2. Check Vercel function logs during OAuth attempts');
console.log('3. Test OAuth flow with different Google accounts');
console.log('4. Verify Google Cloud Console configuration');