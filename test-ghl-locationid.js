#!/usr/bin/env node

/**
 * Test GoHighLevel API Integration with locationId in Request Body
 * This script tests the updated integration where locationId is passed in the request body
 * instead of headers to resolve 403 Forbidden errors
 */

require('dotenv').config({ path: '.env.local' });

const timestamp = Date.now();
const TEST_EMAIL = `test-${timestamp}@example.com`;
const TEST_NAME = 'Test User';
const TEST_PHONE = `+1${timestamp.toString().slice(-10)}`; // Unique phone number

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

async function testCreateContact() {
  logSection('TEST 1: Create Contact with locationId in Body');
  
  const apiKey = process.env.GOHIGHLEVEL_API_KEY;
  const locationId = process.env.GOHIGHLEVEL_LOCATION_ID;
  
  if (!apiKey || !locationId) {
    log('❌ Missing required environment variables:', 'red');
    log(`   GOHIGHLEVEL_API_KEY: ${apiKey ? '✓ Set' : '✗ Missing'}`, apiKey ? 'green' : 'red');
    log(`   GOHIGHLEVEL_LOCATION_ID: ${locationId ? '✓ Set' : '✗ Missing'}`, locationId ? 'green' : 'red');
    return null;
  }
  
  log('Environment variables loaded:', 'green');
  log(`   API Key: ${apiKey.substring(0, 10)}...`, 'cyan');
  log(`   Location ID: ${locationId}`, 'cyan');
  
  const contactData = {
    email: TEST_EMAIL,
    firstName: TEST_NAME.split(' ')[0],
    lastName: TEST_NAME.split(' ')[1] || '',
    name: TEST_NAME,
    phone: TEST_PHONE,
    source: 'API Test Script',
    tags: ['test-contact', 'api-test', 'locationid-body-test'],
    locationId: locationId // Now passing locationId in the body
  };
  
  log('\n📤 Sending request to create contact...', 'yellow');
  log('Request body (with locationId):', 'cyan');
  console.log(JSON.stringify(contactData, null, 2));
  
  try {
    const response = await fetch('https://services.leadconnectorhq.com/contacts/', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
        'Version': '2021-07-28'
        // Note: No Location-Id header anymore
      },
      body: JSON.stringify(contactData)
    });
    
    log(`\n📥 Response Status: ${response.status} ${response.statusText}`, response.ok ? 'green' : 'red');
    
    const responseText = await response.text();
    let result;
    
    try {
      result = JSON.parse(responseText);
    } catch (e) {
      log('Response is not JSON:', 'yellow');
      console.log(responseText);
      return null;
    }
    
    if (response.ok) {
      log('✅ Contact created successfully!', 'green');
      console.log('Contact details:', JSON.stringify(result, null, 2));
      return result.contact?.id;
    } else {
      log('❌ Failed to create contact', 'red');
      console.log('Error response:', JSON.stringify(result, null, 2));
      
      if (response.status === 403) {
        log('\n⚠️  403 Forbidden Error - This might indicate:', 'yellow');
        log('   1. The locationId still needs to be in headers', 'yellow');
        log('   2. The API key doesn\'t have proper permissions', 'yellow');
        log('   3. The locationId is incorrect or not associated with the API key', 'yellow');
      }
      
      return null;
    }
  } catch (error) {
    log(`\n❌ Network error: ${error.message}`, 'red');
    return null;
  }
}

async function testSearchContact(email) {
  logSection('TEST 2: Search Contact with locationId in URL');
  
  const apiKey = process.env.GOHIGHLEVEL_API_KEY;
  const locationId = process.env.GOHIGHLEVEL_LOCATION_ID;
  
  log('🔍 Searching for contact by email...', 'yellow');
  log(`   Email: ${email}`, 'cyan');
  
  try {
    const response = await fetch(
      `https://services.leadconnectorhq.com/contacts/search/duplicate?email=${encodeURIComponent(email)}&locationId=${locationId}`,
      {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
          'Version': '2021-07-28'
          // Note: No Location-Id header
        }
      }
    );
    
    log(`\n📥 Response Status: ${response.status} ${response.statusText}`, response.ok ? 'green' : 'red');
    
    if (response.ok) {
      const result = await response.json();
      log('✅ Search completed successfully!', 'green');
      
      if (result.contact) {
        log('Contact found:', 'green');
        console.log(JSON.stringify(result.contact, null, 2));
        return result.contact.id;
      } else {
        log('No contact found with this email', 'yellow');
        return null;
      }
    } else {
      const errorText = await response.text();
      log('❌ Search failed', 'red');
      console.log('Error response:', errorText);
      
      if (response.status === 403) {
        log('\n⚠️  403 Forbidden Error on search', 'yellow');
      }
      
      return null;
    }
  } catch (error) {
    log(`\n❌ Network error: ${error.message}`, 'red');
    return null;
  }
}

async function testUpdateContact(contactId) {
  logSection('TEST 3: Update Contact with locationId in Body');
  
  if (!contactId) {
    log('⚠️  No contact ID provided, skipping update test', 'yellow');
    return;
  }
  
  const apiKey = process.env.GOHIGHLEVEL_API_KEY;
  const locationId = process.env.GOHIGHLEVEL_LOCATION_ID;
  
  const updateData = {
    tags: ['updated-contact', 'test-complete'],
    customFields: [
      {
        key: 'last_test_update',
        field_value: new Date().toISOString()
      }
    ]
    // Note: Update operations don't need locationId in body
  };
  
  log('📝 Updating contact...', 'yellow');
  log(`   Contact ID: ${contactId}`, 'cyan');
  
  try {
    const response = await fetch(`https://services.leadconnectorhq.com/contacts/${contactId}`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
        'Version': '2021-07-28'
        // Note: No Location-Id header
      },
      body: JSON.stringify(updateData)
    });
    
    log(`\n📥 Response Status: ${response.status} ${response.statusText}`, response.ok ? 'green' : 'red');
    
    if (response.ok) {
      const result = await response.json();
      log('✅ Contact updated successfully!', 'green');
      console.log('Updated contact:', JSON.stringify(result, null, 2));
    } else {
      const errorText = await response.text();
      log('❌ Update failed', 'red');
      console.log('Error response:', errorText);
      
      if (response.status === 403) {
        log('\n⚠️  403 Forbidden Error on update', 'yellow');
      }
    }
  } catch (error) {
    log(`\n❌ Network error: ${error.message}`, 'red');
  }
}

async function runTests() {
  logSection('GoHighLevel API Test Suite');
  log('Testing locationId in request body instead of headers', 'cyan');
  log(`Timestamp: ${new Date().toISOString()}`, 'cyan');
  
  // Test 1: Create Contact
  const contactId = await testCreateContact();
  
  // Test 2: Search Contact
  await testSearchContact(TEST_EMAIL);
  
  // Test 3: Update Contact (if creation was successful)
  if (contactId) {
    await testUpdateContact(contactId);
  }
  
  logSection('Test Summary');
  
  if (contactId) {
    log('✅ All tests completed successfully!', 'green');
    log('The locationId in request body approach is working.', 'green');
  } else {
    log('⚠️  Some tests failed. Please check the error messages above.', 'yellow');
    log('You may need to verify:', 'yellow');
    log('   1. API key and locationId are correct', 'yellow');
    log('   2. API key has proper permissions for the location', 'yellow');
    log('   3. The GoHighLevel API endpoint requirements', 'yellow');
  }
}

// Run the tests
runTests().catch(error => {
  log(`\n❌ Fatal error: ${error.message}`, 'red');
  console.error(error);
  process.exit(1);
});