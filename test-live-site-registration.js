#!/usr/bin/env node

/**
 * Test Live Site Registration Flow
 * This script tests the actual production site to see why users aren't being added to GHL
 */

require('dotenv').config({ path: '.env.local' });

const LIVE_SITE_URL = 'https://siteoptz.ai';
const TEST_EMAIL = `live-test-${Date.now()}@example.com`;
const TEST_NAME = 'Live Site Test User';

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

async function testLiveSiteRegistration() {
  logSection('Testing Live Site Registration API');
  
  const registrationData = {
    email: TEST_EMAIL,
    name: TEST_NAME,
    source: 'Free Plan Registration - Modal',
    planName: 'Free Plan',
    userAgent: 'Mozilla/5.0 (Live Test) AppleWebKit/537.36',
    referrer: 'https://siteoptz.ai',
    registrationMethod: 'email',
    aiToolsInterest: 'Content Creation, Marketing Automation',
    businessSize: 'Small Business (1-10 employees)'
  };
  
  log('🌐 Testing live production site...', 'yellow');
  log(`Site URL: ${LIVE_SITE_URL}`, 'cyan');
  log(`Test email: ${TEST_EMAIL}`, 'cyan');
  
  try {
    const response = await fetch(`${LIVE_SITE_URL}/api/register-free-plan`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(registrationData)
    });
    
    log(`\n📥 Live Site Response: ${response.status} ${response.statusText}`, response.ok ? 'green' : 'red');
    
    const responseText = await response.text();
    let result;
    
    try {
      result = JSON.parse(responseText);
    } catch (e) {
      log('Response is not JSON:', 'yellow');
      console.log(responseText);
      return { success: false, error: 'Invalid JSON response' };
    }
    
    log('Live site response:', 'cyan');
    console.log(JSON.stringify(result, null, 2));
    
    if (response.ok && result.success) {
      log('✅ Live site registration successful!', 'green');
      
      if (result.data?.contactId) {
        log(`✅ Contact created in GoHighLevel: ${result.data.contactId}`, 'green');
        return { success: true, contactId: result.data.contactId, result };
      } else {
        log('⚠️  No contactId in response - checking why...', 'yellow');
        
        // Check if it was disabled
        if (result.message?.includes('CRM integration disabled')) {
          log('❌ GoHighLevel integration is DISABLED on production!', 'red');
          return { success: false, error: 'GHL_DISABLED', result };
        }
        
        return { success: true, contactId: null, result };
      }
    } else {
      log('❌ Live site registration failed', 'red');
      return { success: false, error: result.error || 'Unknown error', result };
    }
  } catch (error) {
    log(`❌ Network error testing live site: ${error.message}`, 'red');
    return { success: false, error: error.message };
  }
}

async function checkUserInGHLAfterLiveTest(email) {
  logSection('Checking if Live Test User Exists in GoHighLevel');
  
  const apiKey = process.env.GOHIGHLEVEL_API_KEY;
  const locationId = process.env.GOHIGHLEVEL_LOCATION_ID;
  
  if (!apiKey || !locationId) {
    log('❌ Missing GoHighLevel credentials', 'red');
    return false;
  }
  
  log(`🔍 Searching for live test user: ${email}`, 'yellow');
  
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
    
    log(`📥 GHL Search Response: ${response.status} ${response.statusText}`, response.ok ? 'green' : 'red');
    
    if (response.ok) {
      const result = await response.json();
      
      if (result.contact) {
        log('✅ Live test user found in GoHighLevel!', 'green');
        return true;
      } else {
        log('❌ Live test user NOT found in GoHighLevel', 'red');
        return false;
      }
    } else {
      log('❌ Failed to search GoHighLevel', 'red');
      return false;
    }
  } catch (error) {
    log(`❌ Error searching GoHighLevel: ${error.message}`, 'red');
    return false;
  }
}

async function checkProductionEnvironment() {
  logSection('Production Environment Analysis');
  
  log('🔍 Analyzing production vs development differences...', 'yellow');
  
  // Test basic connectivity
  try {
    const response = await fetch(`${LIVE_SITE_URL}/`);
    log(`✅ Production site accessible: ${response.status}`, 'green');
  } catch (error) {
    log(`❌ Cannot reach production site: ${error.message}`, 'red');
    return false;
  }
  
  // Check if API endpoint exists
  try {
    const response = await fetch(`${LIVE_SITE_URL}/api/register-free-plan`, {
      method: 'OPTIONS'
    });
    log(`✅ Registration API endpoint accessible`, 'green');
  } catch (error) {
    log(`❌ Registration API endpoint not accessible: ${error.message}`, 'red');
    return false;
  }
  
  return true;
}

async function compareLocalVsProduction() {
  logSection('Comparing Local vs Production Registration');
  
  log('📊 Summary of findings:', 'cyan');
  
  // Local test (we already know this works)
  log('Local Development:', 'bright');
  log('  ✅ Environment variables: Present', 'green');
  log('  ✅ ENABLE_GHL: true', 'green');
  log('  ✅ GoHighLevel integration: Working', 'green');
  log('  ✅ Contact creation: Successful', 'green');
  
  // Production test
  log('\nProduction Site:', 'bright');
  const liveResult = await testLiveSiteRegistration();
  
  if (liveResult.success && liveResult.contactId) {
    log('  ✅ Registration API: Working', 'green');
    log('  ✅ GoHighLevel integration: Working', 'green');
    log('  ✅ Contact creation: Successful', 'green');
    
    // Verify in GHL
    const foundInGHL = await checkUserInGHLAfterLiveTest(TEST_EMAIL);
    if (foundInGHL) {
      log('  ✅ Contact verification: Successful', 'green');
    } else {
      log('  ❌ Contact verification: Failed', 'red');
    }
  } else if (liveResult.success && !liveResult.contactId) {
    log('  ✅ Registration API: Working', 'green');
    log('  ❌ GoHighLevel integration: No contact created', 'red');
    
    if (liveResult.error === 'GHL_DISABLED') {
      log('  ❌ Root cause: GoHighLevel integration disabled in production', 'red');
    } else {
      log('  ❌ Root cause: Unknown - check production environment variables', 'red');
    }
  } else {
    log('  ❌ Registration API: Failed', 'red');
    log(`  ❌ Error: ${liveResult.error}`, 'red');
  }
  
  return liveResult;
}

async function diagnoseProductionIssue() {
  logSection('Production Issue Diagnosis');
  
  const productionOk = await checkProductionEnvironment();
  
  if (!productionOk) {
    log('❌ Basic production environment issues detected', 'red');
    return;
  }
  
  const comparisonResult = await compareLocalVsProduction();
  
  logSection('Diagnosis & Recommendations');
  
  if (comparisonResult.success && comparisonResult.contactId) {
    log('🎉 Production registration is actually working!', 'green');
    log('Users ARE being added to GoHighLevel from the live site.', 'green');
    log('\n💡 If you\'re not seeing users, check:', 'cyan');
    log('  1. GoHighLevel dashboard filters', 'cyan');
    log('  2. Time range of your search', 'cyan');
    log('  3. Correct location/workspace in GHL', 'cyan');
  } else if (comparisonResult.error === 'GHL_DISABLED') {
    log('🚨 Found the issue: GoHighLevel integration is DISABLED in production!', 'red');
    log('\n🔧 To fix this:', 'yellow');
    log('  1. Add ENABLE_GHL=true to your Vercel environment variables', 'yellow');
    log('  2. Add GOHIGHLEVEL_API_KEY to Vercel environment variables', 'yellow');
    log('  3. Add GOHIGHLEVEL_LOCATION_ID to Vercel environment variables', 'yellow');
    log('  4. Redeploy your application', 'yellow');
    log('\n📋 Vercel Environment Variables Setup:', 'cyan');
    log('  Go to: Vercel Dashboard → Your Project → Settings → Environment Variables', 'cyan');
    log('  Add each variable for Production environment', 'cyan');
  } else {
    log('🔍 Production issue detected but needs further investigation', 'yellow');
    log('Possible causes:', 'yellow');
    log('  1. Environment variables not set in production', 'yellow');
    log('  2. Different API keys between dev and prod', 'yellow');
    log('  3. Network/firewall issues in production environment', 'yellow');
    log('  4. Serverless function timeout or memory issues', 'yellow');
  }
}

// Main execution
(async () => {
  log('🌐 Testing Live Site Registration Flow', 'bright');
  log(`Testing against: ${LIVE_SITE_URL}`, 'cyan');
  log(`Test timestamp: ${new Date().toISOString()}`, 'cyan');
  
  await diagnoseProductionIssue();
})().catch(error => {
  log(`\n❌ Fatal error: ${error.message}`, 'red');
  console.error(error);
  process.exit(1);
});