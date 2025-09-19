#!/usr/bin/env node

/**
 * Detailed Production GoHighLevel Integration Test
 * This script performs comprehensive testing to find why users aren't being added to GHL in production
 */

require('dotenv').config({ path: '.env.local' });

const LIVE_SITE_URL = 'https://siteoptz.ai';
const TEST_EMAIL = `prod-debug-${Date.now()}@example.com`;

// Color codes
const colors = {
  reset: '\x1b[0m', bright: '\x1b[1m', red: '\x1b[31m', green: '\x1b[32m',
  yellow: '\x1b[33m', blue: '\x1b[34m', cyan: '\x1b[36m'
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

function logSection(title) {
  console.log('\n' + '='.repeat(60));
  log(title, 'bright');
  console.log('='.repeat(60));
}

async function step1_checkProductionEnvironment() {
  logSection('STEP 1: Check Production Environment Variables');
  
  try {
    // Deploy the diagnostic endpoint first by pushing code
    log('📤 Testing production environment diagnostic...', 'yellow');
    
    const response = await fetch(`${LIVE_SITE_URL}/api/debug-ghl-production?secret=debug123`);
    
    if (response.status === 404) {
      log('⚠️  Diagnostic endpoint not deployed yet. Need to deploy new code.', 'yellow');
      return { deployed: false };
    }
    
    const result = await response.json();
    log('📥 Production Environment Status:', 'cyan');
    console.log(JSON.stringify(result, null, 2));
    
    return {
      deployed: true,
      envVarsSet: result.envVars?.HAS_API_KEY && result.envVars?.HAS_LOCATION_ID,
      ghlEnabled: result.integrationStatus?.isGHLEnabled,
      apiWorking: result.apiTest?.success,
      result
    };
  } catch (error) {
    log(`❌ Error checking production environment: ${error.message}`, 'red');
    return { deployed: false, error: error.message };
  }
}

async function step2_testProductionRegistration() {
  logSection('STEP 2: Test Production Registration with Detailed Logging');
  
  const registrationData = {
    email: TEST_EMAIL,
    name: 'Production Debug User',
    source: 'Free Plan Registration - Modal',
    planName: 'Free Plan',
    userAgent: 'Mozilla/5.0 (Production Debug) AppleWebKit/537.36',
    referrer: 'https://siteoptz.ai',
    registrationMethod: 'email',
    aiToolsInterest: 'Content Creation, Marketing Automation',
    businessSize: 'Small Business (1-10 employees)'
  };
  
  log('📤 Sending registration to production...', 'yellow');
  log(`Email: ${TEST_EMAIL}`, 'cyan');
  
  try {
    const response = await fetch(`${LIVE_SITE_URL}/api/register-free-plan`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(registrationData)
    });
    
    const result = await response.json();
    
    log(`📥 Registration Response (${response.status}):`, 'cyan');
    console.log(JSON.stringify(result, null, 2));
    
    // Analyze the response
    const analysis = {
      success: result.success,
      hasContactId: !!(result.data?.contactId),
      isNewUser: result.data?.isNewUser,
      action: result.data?.action,
      emailSent: result.data?.emailSent,
      adminNotificationSent: result.data?.adminNotificationSent
    };
    
    log('\n📊 Registration Analysis:', 'cyan');
    console.log(JSON.stringify(analysis, null, 2));
    
    return { response: result, analysis, testEmail: TEST_EMAIL };
  } catch (error) {
    log(`❌ Registration test failed: ${error.message}`, 'red');
    return { error: error.message };
  }
}

async function step3_verifyInGoHighLevel(email) {
  logSection('STEP 3: Direct GoHighLevel Verification');
  
  const apiKey = process.env.GOHIGHLEVEL_API_KEY;
  const locationId = process.env.GOHIGHLEVEL_LOCATION_ID;
  
  if (!apiKey || !locationId) {
    log('❌ Missing local GoHighLevel credentials for verification', 'red');
    return { error: 'Missing credentials' };
  }
  
  log(`🔍 Searching GoHighLevel for: ${email}`, 'yellow');
  
  try {
    const response = await fetch(
      `https://services.leadconnectorhq.com/contacts/search/duplicate?email=${encodeURIComponent(email)}&locationId=${locationId}`,
      {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
          'Version': '2021-07-28'
        }
      }
    );
    
    log(`📥 GHL Search Response: ${response.status}`, response.ok ? 'green' : 'red');
    
    if (response.ok) {
      const result = await response.json();
      
      if (result.contact) {
        log('✅ Contact found in GoHighLevel!', 'green');
        log('Contact Details:', 'cyan');
        console.log(JSON.stringify(result.contact, null, 2));
        return { found: true, contact: result.contact };
      } else {
        log('❌ Contact NOT found in GoHighLevel', 'red');
        return { found: false };
      }
    } else {
      const errorText = await response.text();
      log(`❌ GHL API Error: ${errorText}`, 'red');
      return { error: errorText };
    }
  } catch (error) {
    log(`❌ GHL verification failed: ${error.message}`, 'red');
    return { error: error.message };
  }
}

async function step4_compareWithLocal() {
  logSection('STEP 4: Compare Production vs Local Environment');
  
  log('🏠 Local Environment:', 'bright');
  log(`  ENABLE_GHL: ${process.env.ENABLE_GHL}`, 'green');
  log(`  API Key: ${process.env.GOHIGHLEVEL_API_KEY ? process.env.GOHIGHLEVEL_API_KEY.substring(0, 10) + '...' : 'Not set'}`, 'green');
  log(`  Location ID: ${process.env.GOHIGHLEVEL_LOCATION_ID || 'Not set'}`, 'green');
  
  // Test local registration
  log('\n🧪 Testing local registration for comparison...', 'yellow');
  
  try {
    const localTestEmail = `local-compare-${Date.now()}@example.com`;
    const response = await fetch('http://localhost:3000/api/register-free-plan', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: localTestEmail,
        name: 'Local Compare User',
        source: 'Free Plan Registration - Modal',
        planName: 'Free Plan',
        registrationMethod: 'email',
        aiToolsInterest: 'Testing',
        businessSize: 'Small Business'
      })
    });
    
    const result = await response.json();
    
    log('🏠 Local Registration Result:', 'cyan');
    log(`  Success: ${result.success}`, result.success ? 'green' : 'red');
    log(`  Has Contact ID: ${!!(result.data?.contactId)}`, result.data?.contactId ? 'green' : 'red');
    log(`  Contact ID: ${result.data?.contactId || 'None'}`, 'cyan');
    
    return { success: result.success, hasContactId: !!(result.data?.contactId) };
  } catch (error) {
    log(`❌ Local test failed: ${error.message}`, 'red');
    return { error: error.message };
  }
}

async function step5_generateSolution(envCheck, regTest, ghlVerify, localTest) {
  logSection('STEP 5: Diagnosis & Solution');
  
  log('📋 Summary of Findings:', 'bright');
  
  // Environment status
  if (envCheck.envVarsSet) {
    log('✅ Production environment variables are set', 'green');
  } else {
    log('❌ Production environment variables missing or incorrect', 'red');
  }
  
  if (envCheck.ghlEnabled) {
    log('✅ GoHighLevel integration enabled in production', 'green');
  } else {
    log('❌ GoHighLevel integration disabled in production', 'red');
  }
  
  if (envCheck.apiWorking) {
    log('✅ Production can connect to GoHighLevel API', 'green');
  } else {
    log('❌ Production cannot connect to GoHighLevel API', 'red');
  }
  
  // Registration status
  if (regTest.analysis?.success) {
    log('✅ Production registration API working', 'green');
  } else {
    log('❌ Production registration API failing', 'red');
  }
  
  if (regTest.analysis?.hasContactId) {
    log('✅ Production creating GoHighLevel contacts', 'green');
  } else {
    log('❌ Production NOT creating GoHighLevel contacts', 'red');
  }
  
  // GoHighLevel verification
  if (ghlVerify.found) {
    log('✅ User was actually created in GoHighLevel', 'green');
  } else {
    log('❌ User was NOT created in GoHighLevel', 'red');
  }
  
  // Local comparison
  if (localTest.hasContactId) {
    log('✅ Local environment working correctly', 'green');
  } else {
    log('❌ Local environment also failing', 'red');
  }
  
  // Generate specific solution
  log('\n🔧 Recommended Actions:', 'bright');
  
  if (!envCheck.envVarsSet) {
    log('1. 🚨 CRITICAL: Set environment variables in Vercel production', 'red');
    log('   - ENABLE_GHL=true', 'yellow');
    log('   - GOHIGHLEVEL_API_KEY=your-api-key', 'yellow');
    log('   - GOHIGHLEVEL_LOCATION_ID=your-location-id', 'yellow');
  } else if (!envCheck.apiWorking) {
    log('1. 🚨 CRITICAL: GoHighLevel API credentials invalid in production', 'red');
    log('   - Verify API key has correct permissions', 'yellow');
    log('   - Check if API key is expired or revoked', 'yellow');
    log('   - Verify location ID is correct', 'yellow');
  } else if (!regTest.analysis?.hasContactId && localTest.hasContactId) {
    log('1. 🚨 CRITICAL: Production-specific issue found', 'red');
    log('   - Check Vercel function logs for errors', 'yellow');
    log('   - Verify serverless function timeout settings', 'yellow');
    log('   - Check for network/firewall restrictions in Vercel', 'yellow');
  } else if (regTest.analysis?.hasContactId && !ghlVerify.found) {
    log('1. ✅ Production is working! Contact was created.', 'green');
    log('   - Check GoHighLevel filters and search criteria', 'yellow');
    log('   - Verify you\'re looking in the correct location/workspace', 'yellow');
  } else {
    log('1. 🔍 Need deeper investigation', 'yellow');
    log('   - Enable debug logging in production', 'yellow');
    log('   - Check Vercel function logs', 'yellow');
    log('   - Monitor real user registrations', 'yellow');
  }
  
  log('\n2. 📊 Monitor real registrations:', 'cyan');
  log('   - Check Vercel function logs during actual user registrations', 'cyan');
  log('   - Set up monitoring alerts for failed GoHighLevel integrations', 'cyan');
  log('   - Test with different email addresses and data', 'cyan');
}

async function runCompleteTest() {
  log('🚀 Starting Comprehensive Production GoHighLevel Test', 'bright');
  log(`Testing against: ${LIVE_SITE_URL}`, 'cyan');
  log(`Timestamp: ${new Date().toISOString()}`, 'cyan');
  
  // Step 1: Check production environment
  const envCheck = await step1_checkProductionEnvironment();
  
  // Step 2: Test production registration
  const regTest = await step2_testProductionRegistration();
  
  // Step 3: Verify in GoHighLevel
  const ghlVerify = regTest.testEmail ? await step3_verifyInGoHighLevel(regTest.testEmail) : { error: 'No email to verify' };
  
  // Step 4: Compare with local
  const localTest = await step4_compareWithLocal();
  
  // Step 5: Generate solution
  await step5_generateSolution(envCheck, regTest, ghlVerify, localTest);
  
  logSection('🎯 TEST COMPLETE');
  log('All diagnostic information has been gathered.', 'green');
  log('Follow the recommended actions above to resolve the issue.', 'cyan');
}

// Run the test
runCompleteTest().catch(error => {
  log(`\n❌ Fatal error: ${error.message}`, 'red');
  console.error(error);
  process.exit(1);
});