// Check GoHighLevel API connectivity and endpoints
// Run with: node check-ghl-api.js

require('dotenv').config({ path: '.env.local' });
const axios = require('axios');

async function checkGoHighLevelAPI() {
  console.log('🔍 Checking GoHighLevel API Connectivity...\n');
  
  const apiKey = process.env.GOHIGHLEVEL_API_KEY;
  const locationId = process.env.GOHIGHLEVEL_LOCATION_ID;
  
  console.log('📋 Configuration:');
  console.log('- API Key present:', !!apiKey);
  console.log('- API Key length:', apiKey ? apiKey.length : 0);
  console.log('- Location ID:', locationId);
  console.log('- Expected Location ID: ECu5ScdYFmB0WnhvYoBU');
  
  if (!apiKey || apiKey === 'your_gohighlevel_api_key_here') {
    console.log('\n❌ API Key missing or placeholder');
    console.log('Please update GOHIGHLEVEL_API_KEY in .env.local with your actual API key');
    return;
  }
  
  if (!locationId || locationId !== 'ECu5ScdYFmB0WnhvYoBU') {
    console.log('\n❌ Location ID incorrect');
    console.log('Please update GOHIGHLEVEL_LOCATION_ID to: ECu5ScdYFmB0WnhvYoBU');
    return;
  }
  
  // Test API connectivity
  const client = axios.create({
    baseURL: 'https://services.leadconnectorhq.com',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
      'Version': '2021-07-28'
    },
    timeout: 15000
  });
  
  try {
    console.log('\n🌐 Testing API connectivity...');
    
    // Test 1: Get location info (to verify API key and location access)
    console.log('📍 Test 1: Getting location information...');
    try {
      const locationResponse = await client.get(`/locations/${locationId}`);
      console.log('✅ Location API test passed');
      console.log('📄 Location name:', locationResponse.data.location?.name || 'Unknown');
      console.log('📄 Location ID verified:', locationResponse.data.location?.id === locationId);
    } catch (locationError) {
      console.log('❌ Location API test failed:');
      console.log('Status:', locationError.response?.status);
      console.log('Error:', locationError.response?.data?.message || locationError.message);
      
      if (locationError.response?.status === 401) {
        console.log('💡 API key appears to be invalid or expired');
      } else if (locationError.response?.status === 404) {
        console.log('💡 Location ID might be incorrect');
      }
    }
    
    // Test 2: List contacts (to verify read permissions)
    console.log('\n📞 Test 2: Testing contacts API (list existing contacts)...');
    try {
      const contactsResponse = await client.get('/contacts/', {
        params: {
          locationId: locationId,
          limit: 1
        }
      });
      console.log('✅ Contacts read API test passed');
      console.log('📄 Total contacts in response:', contactsResponse.data.contacts?.length || 0);
    } catch (contactsError) {
      console.log('❌ Contacts read API test failed:');
      console.log('Status:', contactsError.response?.status);
      console.log('Error:', contactsError.response?.data?.message || contactsError.message);
    }
    
    // Test 3: Try to create a test contact (the actual issue)
    console.log('\n👤 Test 3: Testing contact creation...');
    console.log('⚠️  This will attempt to create a real test contact');
    
    const testContact = {
      locationId: locationId,
      firstName: 'API',
      lastName: 'Test',
      email: 'api-test@siteoptz.com',
      source: 'API Test',
      tags: ['API Test']
    };
    
    console.log('📝 Test contact data:', JSON.stringify(testContact, null, 2));
    
    try {
      const createResponse = await client.post('/contacts/', testContact);
      console.log('✅ Contact creation test PASSED!');
      console.log('📄 Created contact ID:', createResponse.data.contact?.id);
      console.log('📄 Created contact email:', createResponse.data.contact?.email);
      
      console.log('\n🎉 SUCCESS! GoHighLevel integration should now work');
      console.log('The issue was likely with the API configuration or endpoints');
      
    } catch (createError) {
      console.log('❌ Contact creation test FAILED:');
      console.log('Status:', createError.response?.status);
      console.log('Status Text:', createError.response?.statusText);
      console.log('Error Data:', JSON.stringify(createError.response?.data, null, 2));
      console.log('Error Message:', createError.message);
      
      if (createError.response?.status === 401) {
        console.log('\n💡 Authentication failed - check your API key');
      } else if (createError.response?.status === 403) {
        console.log('\n💡 Permission denied - API key might not have contacts creation permission');
      } else if (createError.response?.status === 422) {
        console.log('\n💡 Validation error - contact data format might be incorrect');
      } else if (createError.response?.status === 429) {
        console.log('\n💡 Rate limited - too many requests');
      }
      
      console.log('\n🔧 Possible solutions:');
      console.log('1. Verify your API key has contacts creation permissions');
      console.log('2. Check if your GoHighLevel plan supports API access');
      console.log('3. Try a different API version (currently using 2021-07-28)');
      console.log('4. Contact GoHighLevel support if the API key is correct');
    }
    
  } catch (error) {
    console.error('\n❌ General API test failed:', error.message);
  }
}

// Run the check
checkGoHighLevelAPI();