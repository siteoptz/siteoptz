#!/usr/bin/env node

/**
 * OAuth Debug Utility Script
 * 
 * This script helps debug OAuth-related issues in the SiteOptz application.
 * It checks environment variables, endpoint availability, and provides 
 * troubleshooting information for Google Ads OAuth flow.
 * 
 * Usage:
 *   node scripts/debug-oauth.js
 *   node scripts/debug-oauth.js --check-endpoints
 *   node scripts/debug-oauth.js --test-env
 */

const fs = require('fs');
const path = require('path');
const https = require('https');
const http = require('http');

// Load environment variables from .env files
function loadEnvFiles() {
  const envFiles = ['.env.local', '.env.development', '.env'];
  let loadedFiles = [];
  
  for (const envFile of envFiles) {
    if (fs.existsSync(envFile)) {
      try {
        const content = fs.readFileSync(envFile, 'utf8');
        const lines = content.split('\n');
        
        for (const line of lines) {
          const trimmedLine = line.trim();
          if (trimmedLine && !trimmedLine.startsWith('#')) {
            const [key, ...valueParts] = trimmedLine.split('=');
            if (key && valueParts.length > 0) {
              const value = valueParts.join('=');
              // Only set if not already set (preserve override order)
              if (!process.env[key]) {
                process.env[key] = value;
              }
            }
          }
        }
        loadedFiles.push(envFile);
      } catch (error) {
        console.error(`Error loading ${envFile}: ${error.message}`);
      }
    }
  }
  
  return loadedFiles;
}

// Load environment variables at startup
const loadedEnvFiles = loadEnvFiles();

// ANSI color codes for better output
const colors = {
  reset: '\x1b[0m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m',
  white: '\x1b[37m'
};

function log(message, color = 'white') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

function logHeader(message) {
  log(`\n🔍 ${message}`, 'cyan');
  log('='.repeat(50), 'cyan');
}

function logSuccess(message) {
  log(`✅ ${message}`, 'green');
}

function logError(message) {
  log(`❌ ${message}`, 'red');
}

function logWarning(message) {
  log(`⚠️  ${message}`, 'yellow');
}

function logInfo(message) {
  log(`ℹ️  ${message}`, 'blue');
}

// Check if environment variables are properly set
function checkEnvironmentVariables() {
  logHeader('Environment Variables Check');
  
  const requiredVars = [
    { name: 'NEXT_PUBLIC_GOOGLE_CLIENT_ID', required: true },
    { name: 'GOOGLE_CLIENT_ID', required: false, fallback: 'NEXT_PUBLIC_GOOGLE_CLIENT_ID' },
    { name: 'GOOGLE_CLIENT_SECRET', required: true },
    { name: 'GOOGLE_ADS_DEVELOPER_TOKEN', required: true },
    { name: 'GOOGLE_ADS_LOGIN_CUSTOMER_ID', required: false },
    { name: 'NEXT_PUBLIC_BASE_URL', required: false, default: 'auto-detected' },
    { name: 'NODE_ENV', required: false, default: 'development' },
    { name: 'PORT', required: false, default: '3001' }
  ];

  let allGood = true;
  
  for (const varInfo of requiredVars) {
    const value = process.env[varInfo.name];
    
    if (value) {
      if (varInfo.name.includes('SECRET') || varInfo.name.includes('TOKEN')) {
        logSuccess(`${varInfo.name}: ***${value.slice(-4)} (${value.length} chars)`);
      } else {
        logSuccess(`${varInfo.name}: ${value}`);
      }
    } else if (varInfo.required) {
      logError(`${varInfo.name}: Missing (REQUIRED)`);
      allGood = false;
    } else {
      const fallbackValue = varInfo.fallback ? process.env[varInfo.fallback] : null;
      if (fallbackValue) {
        logInfo(`${varInfo.name}: Using fallback ${varInfo.fallback}`);
      } else {
        logWarning(`${varInfo.name}: Not set (using default: ${varInfo.default || 'none'})`);
      }
    }
  }
  
  // Check .env files
  logInfo('\nChecking .env files:');
  const envFiles = ['.env.local', '.env.development', '.env'];
  for (const envFile of envFiles) {
    if (fs.existsSync(envFile)) {
      const isLoaded = loadedEnvFiles.includes(envFile);
      logSuccess(`${envFile}: Found${isLoaded ? ' (loaded)' : ''}`);
    } else {
      logWarning(`${envFile}: Not found`);
    }
  }
  
  if (loadedEnvFiles.length > 0) {
    logInfo(`\nLoaded environment variables from: ${loadedEnvFiles.join(', ')}`);
  } else {
    logWarning('\nNo environment files were loaded');
  }
  
  return allGood;
}

// Check if API endpoints are accessible
async function checkEndpoints() {
  logHeader('API Endpoints Check');
  
  const port = process.env.PORT || '3001';
  const baseUrl = `http://localhost:${port}`;
  
  const endpoints = [
    '/api/google-ads/validate',
    '/api/google-ads/accounts', 
    '/api/google-ads/store-account',
    '/api/marketing-platforms/google-ads/callback',
    '/api/marketing-platforms/google-ads/accounts'
  ];
  
  logInfo(`Checking endpoints on ${baseUrl}`);
  
  for (const endpoint of endpoints) {
    try {
      const result = await checkEndpoint(baseUrl + endpoint);
      if (result.status === 404) {
        logError(`${endpoint}: Not Found (404)`);
      } else if (result.status === 405) {
        logSuccess(`${endpoint}: Exists (405 Method Not Allowed is expected)`);
      } else {
        logInfo(`${endpoint}: Status ${result.status} - ${result.statusText}`);
      }
    } catch (error) {
      if (error.code === 'ECONNREFUSED') {
        logError(`${endpoint}: Server not running on ${baseUrl}`);
      } else {
        logError(`${endpoint}: ${error.message}`);
      }
    }
  }
}

// Helper function to check a single endpoint
function checkEndpoint(url) {
  return new Promise((resolve, reject) => {
    const urlObj = new URL(url);
    const client = urlObj.protocol === 'https:' ? https : http;
    
    const req = client.request({
      hostname: urlObj.hostname,
      port: urlObj.port,
      path: urlObj.pathname,
      method: 'HEAD',
      timeout: 5000
    }, (res) => {
      resolve({
        status: res.statusCode,
        statusText: res.statusMessage,
        headers: res.headers
      });
    });
    
    req.on('error', reject);
    req.on('timeout', () => {
      req.destroy();
      reject(new Error('Request timeout'));
    });
    
    req.end();
  });
}

// Check file system structure
function checkFileStructure() {
  logHeader('File Structure Check');
  
  const criticalFiles = [
    'lib/oauth-utils.ts',
    'lib/google-ads-api.ts',
    'pages/api/google-ads/validate.ts',
    'pages/api/google-ads/accounts.ts',
    'pages/api/google-ads/store-account.ts',
    'pages/api/marketing-platforms/google-ads/callback.ts',
    'pages/dashboard/pro/google-ads-setup.tsx',
    'components/marketing/GoogleAdsAccountSelector.tsx'
  ];
  
  for (const file of criticalFiles) {
    if (fs.existsSync(file)) {
      logSuccess(`${file}: Found`);
    } else {
      logError(`${file}: Missing`);
    }
  }
}

// Generate OAuth URL for testing
function generateTestOAuthUrl() {
  logHeader('OAuth URL Generation Test');
  
  const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || process.env.GOOGLE_CLIENT_ID;
  const port = process.env.PORT || '3001';
  const baseUrl = `http://localhost:${port}`;
  
  if (!clientId) {
    logError('Cannot generate OAuth URL: Google Client ID not found');
    return;
  }
  
  const redirectUri = `${baseUrl}/api/marketing-platforms/google-ads/callback`;
  
  const params = new URLSearchParams({
    client_id: clientId,
    redirect_uri: redirectUri,
    scope: 'https://www.googleapis.com/auth/adwords https://www.googleapis.com/auth/analytics.readonly',
    response_type: 'code',
    access_type: 'offline',
    prompt: 'consent',
    state: 'google_ads_auth_state',
    include_granted_scopes: 'true'
  });
  
  const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?${params.toString()}`;
  
  logSuccess('OAuth URL generated successfully:');
  log(authUrl, 'blue');
  
  logInfo('\nURL Components:');
  logInfo(`Client ID: ${clientId.substring(0, 20)}...`);
  logInfo(`Redirect URI: ${redirectUri}`);
  logInfo(`Scope: Google Ads + Analytics`);
}

// Main function
async function main() {
  const args = process.argv.slice(2);
  
  log('🚀 SiteOptz OAuth Debug Utility', 'magenta');
  log('================================\n', 'magenta');
  
  if (args.includes('--help') || args.includes('-h')) {
    log('Usage:', 'yellow');
    log('  node scripts/debug-oauth.js                 - Run all checks');
    log('  node scripts/debug-oauth.js --check-endpoints - Check API endpoints only');
    log('  node scripts/debug-oauth.js --test-env      - Check environment only');
    log('  node scripts/debug-oauth.js --generate-url  - Generate test OAuth URL');
    return;
  }
  
  try {
    if (args.includes('--test-env')) {
      checkEnvironmentVariables();
    } else if (args.includes('--check-endpoints')) {
      await checkEndpoints();
    } else if (args.includes('--generate-url')) {
      generateTestOAuthUrl();
    } else {
      // Run all checks
      const envOk = checkEnvironmentVariables();
      checkFileStructure();
      
      if (envOk) {
        generateTestOAuthUrl();
      }
      
      logInfo('\nTo check if server is running:');
      logInfo('  npm run dev');
      logInfo('  node scripts/debug-oauth.js --check-endpoints');
    }
    
    log('\n🎉 Debug check complete!', 'green');
    
  } catch (error) {
    logError(`\nDebug script failed: ${error.message}`);
    process.exit(1);
  }
}

// Run if called directly
if (require.main === module) {
  main();
}

module.exports = {
  checkEnvironmentVariables,
  checkEndpoints,
  checkFileStructure,
  generateTestOAuthUrl
};