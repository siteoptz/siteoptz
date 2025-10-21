#!/usr/bin/env node

/**
 * OAuth Diagnostic Script for SiteOptz.ai
 * This script helps diagnose OAuth authentication issues
 */

const fs = require('fs');
const path = require('path');
const https = require('https');

console.log('🔍 SiteOptz.ai OAuth Diagnostic Tool\n');
console.log('='.'='.repeat(50));

// Check environment files
function checkEnvFiles() {
  console.log('\n📁 Checking Environment Files:');
  console.log('-'.repeat(50));
  
  const envFiles = ['.env', '.env.local', '.env.production', '.env.vercel'];
  const requiredVars = ['GOOGLE_CLIENT_ID', 'GOOGLE_CLIENT_SECRET', 'NEXTAUTH_SECRET', 'NEXTAUTH_URL'];
  
  for (const envFile of envFiles) {
    const filePath = path.join(process.cwd(), envFile);
    if (fs.existsSync(filePath)) {
      console.log(`\n✅ Found ${envFile}`);
      const content = fs.readFileSync(filePath, 'utf8');
      
      for (const varName of requiredVars) {
        const regex = new RegExp(`^${varName}=(.*)$`, 'm');
        const match = content.match(regex);
        
        if (match) {
          const value = match[1];
          if (value.includes('your-') || value.includes('MUST_BE_SET') || value === '') {
            console.log(`  ❌ ${varName}: NOT CONFIGURED (placeholder value)`);
          } else if (varName.includes('SECRET') || varName.includes('CLIENT_SECRET')) {
            console.log(`  ✅ ${varName}: ****** (configured)`);
          } else {
            console.log(`  ✅ ${varName}: ${value.substring(0, 20)}... (configured)`);
          }
        } else {
          console.log(`  ⚠️  ${varName}: NOT FOUND`);
        }
      }
    } else {
      console.log(`❌ ${envFile} not found`);
    }
  }
}

// Check NextAuth configuration
function checkNextAuthConfig() {
  console.log('\n🔐 NextAuth Configuration:');
  console.log('-'.repeat(50));
  
  const nextAuthPath = path.join(process.cwd(), 'pages/api/auth/[...nextauth].ts');
  if (fs.existsSync(nextAuthPath)) {
    console.log('✅ NextAuth endpoint found');
    
    const content = fs.readFileSync(nextAuthPath, 'utf8');
    
    // Check for Google provider
    if (content.includes('GoogleProvider')) {
      console.log('✅ Google OAuth provider configured');
    } else {
      console.log('❌ Google OAuth provider NOT configured');
    }
    
    // Check for debug mode
    if (content.includes('debug: true')) {
      console.log('✅ Debug mode enabled');
    } else {
      console.log('⚠️  Debug mode disabled (enable for more logs)');
    }
    
    // Check for callbacks
    const callbacks = ['signIn', 'redirect', 'jwt', 'session'];
    for (const callback of callbacks) {
      if (content.includes(`async ${callback}`)) {
        console.log(`✅ ${callback} callback implemented`);
      } else {
        console.log(`⚠️  ${callback} callback not found`);
      }
    }
  } else {
    console.log('❌ NextAuth endpoint not found!');
  }
}

// Check Google OAuth URLs
function checkOAuthURLs() {
  console.log('\n🌐 OAuth URLs Configuration:');
  console.log('-'.repeat(50));
  
  const baseUrl = process.env.NEXTAUTH_URL || 'https://siteoptz.ai';
  console.log(`Base URL: ${baseUrl}`);
  console.log(`\n📍 Required Google OAuth Redirect URIs:`);
  console.log(`  1. ${baseUrl}/api/auth/callback/google`);
  console.log(`  2. http://localhost:3000/api/auth/callback/google (for local testing)`);
  
  console.log(`\n⚠️  IMPORTANT: These EXACT URLs must be added to your Google Cloud Console:`);
  console.log(`  1. Go to https://console.cloud.google.com/`);
  console.log(`  2. Select your project`);
  console.log(`  3. Go to APIs & Services > Credentials`);
  console.log(`  4. Click on your OAuth 2.0 Client ID`);
  console.log(`  5. Add the URLs above to "Authorized redirect URIs"`);
  console.log(`  6. Save changes`);
}

// Check for common issues
function checkCommonIssues() {
  console.log('\n⚠️  Common Issues & Solutions:');
  console.log('-'.repeat(50));
  
  const issues = [
    {
      error: 'OAuthCallback error',
      causes: [
        'Google OAuth credentials not set in Vercel',
        'Redirect URI mismatch in Google Console',
        'NEXTAUTH_SECRET not set or invalid',
        'NEXTAUTH_URL doesn\'t match production URL'
      ],
      solutions: [
        'Set GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET in Vercel Dashboard',
        'Ensure redirect URIs in Google Console match exactly',
        'Generate NEXTAUTH_SECRET: openssl rand -base64 32',
        'Set NEXTAUTH_URL=https://siteoptz.ai in Vercel'
      ]
    },
    {
      error: 'Configuration error',
      causes: [
        'Missing environment variables',
        'Invalid OAuth credentials'
      ],
      solutions: [
        'Check all required env vars are set in Vercel',
        'Regenerate OAuth credentials in Google Console'
      ]
    }
  ];
  
  for (const issue of issues) {
    console.log(`\n🔴 ${issue.error}:`);
    console.log('  Possible causes:');
    issue.causes.forEach(cause => console.log(`    - ${cause}`));
    console.log('  Solutions:');
    issue.solutions.forEach(solution => console.log(`    ✅ ${solution}`));
  }
}

// Generate Vercel deployment checklist
function generateChecklist() {
  console.log('\n✅ Vercel Deployment Checklist:');
  console.log('-'.repeat(50));
  
  const checklist = [
    'Go to https://vercel.com/siteoptz/siteoptz-ai/settings/environment-variables',
    'Add/Update GOOGLE_CLIENT_ID (from Google Console)',
    'Add/Update GOOGLE_CLIENT_SECRET (from Google Console)',
    'Add/Update NEXTAUTH_SECRET (generate with: openssl rand -base64 32)',
    'Add/Update NEXTAUTH_URL = https://siteoptz.ai',
    'Add/Update GHL_API_KEY (optional, for GoHighLevel)',
    'Add/Update GHL_LOCATION_ID (optional, for GoHighLevel)',
    'Redeploy the application after setting variables',
    'Clear browser cookies and cache',
    'Test OAuth flow at https://siteoptz.ai/login'
  ];
  
  checklist.forEach((item, index) => {
    console.log(`  ${index + 1}. ${item}`);
  });
}

// Test live endpoint
async function testLiveEndpoint() {
  console.log('\n🌐 Testing Live Endpoints:');
  console.log('-'.repeat(50));
  
  const endpoints = [
    'https://siteoptz.ai/api/auth/providers',
    'https://siteoptz.ai/api/auth/csrf'
  ];
  
  for (const endpoint of endpoints) {
    await new Promise((resolve) => {
      https.get(endpoint, (res) => {
        if (res.statusCode === 200) {
          console.log(`✅ ${endpoint} - Status: ${res.statusCode}`);
        } else {
          console.log(`❌ ${endpoint} - Status: ${res.statusCode}`);
        }
        resolve();
      }).on('error', (err) => {
        console.log(`❌ ${endpoint} - Error: ${err.message}`);
        resolve();
      });
    });
  }
}

// Main execution
async function main() {
  checkEnvFiles();
  checkNextAuthConfig();
  checkOAuthURLs();
  checkCommonIssues();
  generateChecklist();
  await testLiveEndpoint();
  
  console.log('\n' + '='.repeat(50));
  console.log('🏁 Diagnostic complete!\n');
  console.log('📌 Next Steps:');
  console.log('1. Fix any ❌ issues identified above');
  console.log('2. Ensure all environment variables are set in Vercel');
  console.log('3. Verify Google OAuth redirect URIs match exactly');
  console.log('4. Redeploy and test the authentication flow');
  console.log('\nNeed help? Check the deployment instructions:');
  console.log('cat OAUTH_FIX_DEPLOYMENT_INSTRUCTIONS.md');
}

// Run diagnostic
main().catch(console.error);