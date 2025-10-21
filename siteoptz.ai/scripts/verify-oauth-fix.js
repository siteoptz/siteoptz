#!/usr/bin/env node

/**
 * OAuth Fix Verification Script
 * Checks if the OAuth authentication issue has been resolved
 */

const https = require('https');

const SITE_URL = 'https://siteoptz.ai';
const checks = [];

// Color codes for terminal output
const colors = {
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  reset: '\x1b[0m'
};

function log(status, message) {
  const symbol = status === 'success' ? '✅' : status === 'error' ? '❌' : '⚠️';
  const color = status === 'success' ? colors.green : status === 'error' ? colors.red : colors.yellow;
  console.log(`${color}${symbol} ${message}${colors.reset}`);
}

async function makeRequest(path, options = {}) {
  return new Promise((resolve, reject) => {
    const url = new URL(path, SITE_URL);
    https.get(url, options, (res) => {
      let data = '';
      res.on('data', (chunk) => data += chunk);
      res.on('end', () => {
        resolve({
          statusCode: res.statusCode,
          headers: res.headers,
          data
        });
      });
    }).on('error', reject);
  });
}

async function checkEndpoint(name, path, expectedStatus) {
  try {
    const response = await makeRequest(path);
    const success = response.statusCode === expectedStatus;
    checks.push({ name, success, status: response.statusCode });
    
    if (success) {
      log('success', `${name}: ${path} (${response.statusCode})`);
    } else {
      log('error', `${name}: ${path} (Got ${response.statusCode}, expected ${expectedStatus})`);
    }
    return response;
  } catch (error) {
    checks.push({ name, success: false, error: error.message });
    log('error', `${name}: ${path} - ${error.message}`);
    return null;
  }
}

async function verifyOAuthFix() {
  console.log('='.repeat(60));
  console.log('OAuth Authentication Fix Verification');
  console.log('='.repeat(60));
  console.log();
  
  // 1. Check that custom callback handler is removed
  console.log('1. Checking OAuth Callback Handler...');
  const callbackResponse = await checkEndpoint(
    'Custom callback removed',
    '/api/auth/callback/google',
    404  // Should return 404 or be handled by NextAuth
  );
  
  // 2. Check NextAuth providers endpoint
  console.log('\n2. Checking NextAuth Configuration...');
  const providersResponse = await checkEndpoint(
    'NextAuth providers',
    '/api/auth/providers',
    200
  );
  
  if (providersResponse && providersResponse.statusCode === 200) {
    try {
      const data = JSON.parse(providersResponse.data);
      if (data.oauth_configured) {
        log('success', 'Google OAuth is configured');
      } else {
        log('warning', 'Google OAuth is not configured (missing env vars)');
      }
    } catch (e) {
      log('error', 'Could not parse providers response');
    }
  }
  
  // 3. Check NextAuth signin page
  console.log('\n3. Checking NextAuth Signin Page...');
  const signinResponse = await checkEndpoint(
    'NextAuth signin page',
    '/api/auth/signin',
    200
  );
  
  // 4. Check main login page
  console.log('\n4. Checking Login Page...');
  const loginResponse = await checkEndpoint(
    'Login page',
    '/login',
    200
  );
  
  // 5. Check debug endpoint (if accessible)
  console.log('\n5. Checking Debug Endpoint...');
  const debugResponse = await makeRequest('/api/auth/debug?key=debug-oauth-2024');
  if (debugResponse.statusCode === 200) {
    try {
      const debug = JSON.parse(debugResponse.data);
      log('success', 'Debug endpoint accessible');
      
      // Check environment variables
      console.log('\nEnvironment Variables:');
      Object.entries(debug.env).forEach(([key, value]) => {
        const status = value.includes('✅') ? 'success' : 'error';
        log(status, `${key}: ${value}`);
      });
      
      // Check OAuth URLs
      console.log('\nOAuth URLs:');
      log('success', `Callback URL: ${debug.oauth.callback_url}`);
      log('success', `Signin URL: ${debug.oauth.signin_url}`);
      
      // Check diagnostics
      console.log('\nDiagnostics:');
      if (debug.diagnostics.nextauth_configured) {
        log('success', 'NextAuth is properly configured');
      } else {
        log('error', 'NextAuth is NOT properly configured');
      }
      
      if (debug.diagnostics.ghl_configured) {
        log('success', 'GoHighLevel integration configured');
        if (debug.diagnostics.ghl_connection.includes('✅')) {
          log('success', `GHL Connection: ${debug.diagnostics.ghl_connection}`);
        } else {
          log('warning', `GHL Connection: ${debug.diagnostics.ghl_connection}`);
        }
      } else {
        log('warning', 'GoHighLevel integration not configured');
      }
    } catch (e) {
      log('error', 'Could not parse debug response');
    }
  } else if (debugResponse.statusCode === 401) {
    log('warning', 'Debug endpoint requires authentication key');
  }
  
  // Summary
  console.log('\n' + '='.repeat(60));
  console.log('VERIFICATION SUMMARY');
  console.log('='.repeat(60));
  
  const successCount = checks.filter(c => c.success).length;
  const totalCount = checks.length;
  const allPassed = successCount === totalCount;
  
  console.log(`\nChecks Passed: ${successCount}/${totalCount}`);
  
  if (allPassed) {
    console.log(`\n${colors.green}✅ OAuth fix appears to be working correctly!${colors.reset}`);
    console.log('\nNext Steps:');
    console.log('1. Deploy these changes to Vercel');
    console.log('2. Ensure environment variables are set in Vercel:');
    console.log('   - GOOGLE_CLIENT_ID');
    console.log('   - GOOGLE_CLIENT_SECRET');
    console.log('   - NEXTAUTH_SECRET');
    console.log('   - NEXTAUTH_URL=https://siteoptz.ai');
    console.log('3. Verify Google OAuth callback URL is set to:');
    console.log('   https://siteoptz.ai/api/auth/callback/google');
    console.log('4. Test the OAuth flow in production');
  } else {
    console.log(`\n${colors.yellow}⚠️ Some checks failed. Please review the issues above.${colors.reset}`);
    console.log('\nPotential Issues:');
    checks.filter(c => !c.success).forEach(check => {
      console.log(`  - ${check.name}: ${check.error || 'Failed'}`);
    });
  }
  
  console.log('\n' + '='.repeat(60));
}

// Run verification
verifyOAuthFix().catch(error => {
  console.error('Verification script error:', error);
  process.exit(1);
});