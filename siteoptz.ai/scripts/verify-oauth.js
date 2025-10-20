#!/usr/bin/env node

/**
 * OAuth Configuration Verification Script
 * Run this to check if OAuth is properly configured
 */

const fs = require('fs');
const path = require('path');

console.log('========================================');
console.log('  Google OAuth Configuration Checker');
console.log('========================================\n');

let errors = [];
let warnings = [];
let success = [];

// Check for environment variables
console.log('1. Checking Environment Variables...');

const checkEnvVar = (name, isRequired = true) => {
  const value = process.env[name];
  if (!value || value.includes('your-') || value.includes('MUST_BE_SET')) {
    if (isRequired) {
      errors.push(`❌ ${name} is not properly configured`);
    } else {
      warnings.push(`⚠️  ${name} is not set (optional)`);
    }
    return false;
  }
  success.push(`✅ ${name} is configured`);
  return true;
};

// Check required OAuth variables
checkEnvVar('GOOGLE_CLIENT_ID');
checkEnvVar('GOOGLE_CLIENT_SECRET');
checkEnvVar('NEXTAUTH_SECRET');
checkEnvVar('NEXTAUTH_URL');

// Check GHL variables (optional but recommended)
checkEnvVar('GHL_API_KEY', false);
checkEnvVar('GHL_LOCATION_ID', false);

// Check vercel.json for problematic redirects
console.log('\n2. Checking vercel.json configuration...');
const vercelPath = path.join(__dirname, '..', 'vercel.json');
if (fs.existsSync(vercelPath)) {
  const vercelConfig = JSON.parse(fs.readFileSync(vercelPath, 'utf8'));
  
  if (vercelConfig.redirects) {
    const problematicRedirect = vercelConfig.redirects.find(r => 
      r.source && r.source.includes('/api/auth')
    );
    
    if (problematicRedirect) {
      errors.push('❌ vercel.json contains redirect that blocks OAuth callbacks');
      console.log('   Problem:', JSON.stringify(problematicRedirect, null, 2));
    } else {
      success.push('✅ No problematic OAuth redirects in vercel.json');
    }
  }
}

// Check for required files
console.log('\n3. Checking required files...');
const requiredFiles = [
  'pages/api/auth/[...nextauth].ts',
  'pages/login.js',
  'pages/_app.js'
];

requiredFiles.forEach(file => {
  const filePath = path.join(__dirname, '..', file);
  if (fs.existsSync(filePath)) {
    success.push(`✅ ${file} exists`);
  } else {
    errors.push(`❌ Missing required file: ${file}`);
  }
});

// Check NextAuth configuration
console.log('\n4. Checking NextAuth configuration...');
const nextAuthPath = path.join(__dirname, '..', 'pages/api/auth/[...nextauth].ts');
if (fs.existsSync(nextAuthPath)) {
  const content = fs.readFileSync(nextAuthPath, 'utf8');
  
  if (content.includes('GoogleProvider')) {
    success.push('✅ Google Provider is configured');
  } else {
    errors.push('❌ Google Provider not found in NextAuth config');
  }
  
  if (content.includes('secret: process.env.NEXTAUTH_SECRET')) {
    success.push('✅ NextAuth secret is properly referenced');
  } else {
    warnings.push('⚠️  NextAuth secret configuration might be incorrect');
  }
}

// Print summary
console.log('\n========================================');
console.log('  Summary');
console.log('========================================\n');

if (success.length > 0) {
  console.log('✅ Successful checks:');
  success.forEach(s => console.log('  ', s));
}

if (warnings.length > 0) {
  console.log('\n⚠️  Warnings:');
  warnings.forEach(w => console.log('  ', w));
}

if (errors.length > 0) {
  console.log('\n❌ Errors found:');
  errors.forEach(e => console.log('  ', e));
  
  console.log('\n🔧 TO FIX:');
  console.log('1. Set up Google OAuth credentials in Google Cloud Console');
  console.log('2. Add environment variables to Vercel Dashboard');
  console.log('3. Ensure all required files are present');
  console.log('4. Deploy the changes to production');
  
  process.exit(1);
} else {
  console.log('\n✅ All checks passed! OAuth should be working correctly.');
  console.log('If you\'re still having issues, check the Vercel deployment logs.');
}

// Test URL construction
console.log('\n========================================');
console.log('  OAuth URLs');
console.log('========================================\n');
const baseUrl = process.env.NEXTAUTH_URL || 'https://siteoptz.ai';
console.log('Login Page:', `${baseUrl}/login`);
console.log('OAuth Callback:', `${baseUrl}/api/auth/callback/google`);
console.log('NextAuth Signin:', `${baseUrl}/api/auth/signin`);
console.log('\nMake sure the callback URL is added to Google OAuth authorized redirect URIs!');