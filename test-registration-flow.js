#!/usr/bin/env node

/**
 * Test Registration Flow - Get Started Integration
 * This script tests the complete registration flow to see why users aren't being added to GHL
 */

require('dotenv').config({ path: '.env.local' });

const TEST_EMAIL = `getstarted-test-${Date.now()}@example.com`;
const TEST_NAME = 'Get Started Test User';

// Color codes for console output
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m'
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

function logSection(title) {
  console.log('\n' + '='.repeat(60));
  log(title, 'bright');
  console.log('='.repeat(60));
}

async function testRegistrationAPI() {
  logSection('Testing /api/register-free-plan Endpoint');
  
  // Simulate the exact data that RegisterModal.tsx sends
  const registrationData = {
    email: TEST_EMAIL,
    name: TEST_NAME,
    source: 'Free Plan Registration - Modal',
    planName: 'Free Plan',
    userAgent: 'Mozilla/5.0 (Test) AppleWebKit/537.36',
    referrer: 'https://siteoptz.ai',
    registrationMethod: 'email',
    aiToolsInterest: 'Content Creation, Marketing Automation',
    businessSize: 'Small Business (1-10 employees)'
  };
  
  log('📤 Sending registration request...', 'yellow');
  log('Registration data:', 'cyan');
  console.log(JSON.stringify(registrationData, null, 2));
  
  try {
    const response = await fetch('http://localhost:3000/api/register-free-plan', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(registrationData)
    });
    
    log(`\n📥 Response Status: ${response.status} ${response.statusText}`, response.ok ? 'green' : 'red');
    
    const responseText = await response.text();
    let result;
    
    try {
      result = JSON.parse(responseText);
    } catch (e) {
      log('Response is not JSON:', 'yellow');
      console.log(responseText);
      return false;
    }
    
    log('Response body:', 'cyan');
    console.log(JSON.stringify(result, null, 2));
    
    if (response.ok && result.success) {
      log('✅ Registration API successful!', 'green');
      
      // Check if user was actually added to GHL
      if (result.data?.contactId) {
        log(`✅ Contact created in GoHighLevel: ${result.data.contactId}`, 'green');
      } else {
        log('⚠️  No contactId in response - user may not have been added to GHL', 'yellow');
      }
      
      return true;
    } else {
      log('❌ Registration API failed', 'red');
      
      if (result.error) {
        log(`Error: ${result.error}`, 'red');
      }
      
      return false;
    }
  } catch (error) {
    log(`\n❌ Network error: ${error.message}`, 'red');
    return false;
  }
}

async function checkUserInGHL() {
  logSection('Checking if User Exists in GoHighLevel');
  
  const apiKey = process.env.GOHIGHLEVEL_API_KEY;
  const locationId = process.env.GOHIGHLEVEL_LOCATION_ID;
  
  if (!apiKey || !locationId) {
    log('❌ Missing GoHighLevel credentials', 'red');
    return false;
  }
  
  log(`🔍 Searching for user: ${TEST_EMAIL}`, 'yellow');
  
  try {
    const response = await fetch(
      `https://services.leadconnectorhq.com/contacts/search/duplicate?email=${encodeURIComponent(TEST_EMAIL)}&locationId=${locationId}`,
      {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
          'Version': '2021-07-28'
        }
      }
    );
    
    log(`📥 GHL Search Response: ${response.status} ${response.statusText}`, response.ok ? 'green' : 'red');
    
    if (response.ok) {
      const result = await response.json();
      
      if (result.contact) {
        log('✅ User found in GoHighLevel!', 'green');
        log('Contact details:', 'cyan');
        console.log(JSON.stringify(result.contact, null, 2));
        return true;
      } else {
        log('❌ User NOT found in GoHighLevel', 'red');
        log('This indicates the registration did not create a GHL contact', 'yellow');
        return false;
      }
    } else {
      const errorText = await response.text();
      log('❌ Failed to search GoHighLevel', 'red');
      console.log('Error:', errorText);
      return false;
    }
  } catch (error) {
    log(`❌ Error searching GoHighLevel: ${error.message}`, 'red');
    return false;
  }
}

async function checkEnvironmentConfig() {
  logSection('Environment Configuration Check');
  
  const requiredVars = [
    'ENABLE_GHL',
    'GOHIGHLEVEL_API_KEY',
    'GOHIGHLEVEL_LOCATION_ID',
    'NEXTAUTH_URL'
  ];
  
  let allPresent = true;
  
  for (const varName of requiredVars) {
    const value = process.env[varName];
    if (value) {
      log(`✅ ${varName}: ${varName.includes('KEY') ? value.substring(0, 10) + '...' : value}`, 'green');
    } else {
      log(`❌ ${varName}: Missing`, 'red');
      allPresent = false;
    }
  }
  
  log(`\nEnvironment Status: ${allPresent ? 'All Good' : 'Issues Found'}`, allPresent ? 'green' : 'red');
  return allPresent;
}

async function runDiagnostics() {
  logSection('Get Started Registration Flow Diagnostics');
  log(`Testing with email: ${TEST_EMAIL}`, 'cyan');
  log(`Timestamp: ${new Date().toISOString()}`, 'cyan');
  
  // Step 1: Check environment
  const envOk = await checkEnvironmentConfig();
  
  if (!envOk) {
    log('\n❌ Environment configuration issues detected. Please fix before proceeding.', 'red');
    return;
  }
  
  // Step 2: Test registration API
  const registrationOk = await testRegistrationAPI();
  
  // Step 3: Check if user was actually added to GHL
  const userInGHL = await checkUserInGHL();
  
  // Summary
  logSection('Diagnosis Summary');
  
  if (registrationOk && userInGHL) {
    log('✅ Registration flow is working correctly!', 'green');
    log('Users should be getting added to GoHighLevel.', 'green');
  } else if (registrationOk && !userInGHL) {
    log('⚠️  Registration API succeeds but user not in GoHighLevel', 'yellow');
    log('Possible issues:', 'yellow');
    log('  1. GoHighLevel integration disabled in the API', 'yellow');
    log('  2. API key permissions insufficient', 'yellow');
    log('  3. Error in the user creation process', 'yellow');
    log('  4. Silent failure in GoHighLevel integration', 'yellow');
  } else if (!registrationOk) {
    log('❌ Registration API is failing', 'red');
    log('This explains why users are not being added to GoHighLevel.', 'red');
  }
  
  log('\n💡 Next Steps:', 'cyan');
  log('1. Check the server logs when a real user registers', 'cyan');
  log('2. Verify that ENABLE_GHL=true is working correctly', 'cyan');
  log('3. Test with the actual frontend registration form', 'cyan');
}

// Check if server is running
async function checkServerStatus() {
  try {
    const response = await fetch('http://localhost:3000/', { method: 'GET' });
    return response.status === 200;
  } catch (error) {
    log('❌ Server not running on localhost:3000', 'red');
    log('Please start the development server with: npm run dev', 'yellow');
    return false;
  }
}

// Main execution
(async () => {
  const serverRunning = await checkServerStatus();
  
  if (!serverRunning) {
    log('Please start your Next.js development server and try again.', 'yellow');
    process.exit(1);
  }
  
  await runDiagnostics();
})().catch(error => {
  log(`\n❌ Fatal error: ${error.message}`, 'red');
  console.error(error);
  process.exit(1);
});