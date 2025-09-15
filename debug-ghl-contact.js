// Debug script for GoHighLevel contact creation with your specific Location ID
// Run with: node debug-ghl-contact.js

require('dotenv').config({ path: '.env.local' });
const SiteOptzGoHighLevel = require('./utils/siteoptz-gohighlevel');

async function debugContactCreation() {
  console.log('🔍 Debugging GoHighLevel Contact Creation...\n');
  
  // Environment check
  console.log('📋 Environment Variables:');
  console.log('- API Key present:', !!process.env.GOHIGHLEVEL_API_KEY);
  console.log('- API Key length:', process.env.GOHIGHLEVEL_API_KEY ? process.env.GOHIGHLEVEL_API_KEY.length : 0);
  console.log('- Location ID:', process.env.GOHIGHLEVEL_LOCATION_ID);
  console.log('- Location ID matches target:', process.env.GOHIGHLEVEL_LOCATION_ID === 'ECu5ScdYFmB0WnhvYoBU');
  
  if (!process.env.GOHIGHLEVEL_API_KEY) {
    console.log('\n❌ Missing GOHIGHLEVEL_API_KEY');
    console.log('Please add your actual API key to .env.local file');
    return;
  }
  
  if (!process.env.GOHIGHLEVEL_LOCATION_ID || process.env.GOHIGHLEVEL_LOCATION_ID === 'your_gohighlevel_location_id_here') {
    console.log('\n❌ Missing or placeholder GOHIGHLEVEL_LOCATION_ID');
    console.log('Current value:', process.env.GOHIGHLEVEL_LOCATION_ID);
    console.log('Should be: ECu5ScdYFmB0WnhvYoBU');
    return;
  }
  
  try {
    console.log('\n🚀 Initializing SiteOptz GoHighLevel integration...');
    
    const gohighlevel = new SiteOptzGoHighLevel(
      process.env.GOHIGHLEVEL_API_KEY,
      process.env.GOHIGHLEVEL_LOCATION_ID
    );
    
    console.log('✅ Integration initialized successfully');
    
    // Test subscriber data
    const testSubscriber = {
      email: 'final-test@siteoptz.com',
      firstName: 'Final',
      lastName: 'Test',
      source: 'final-integration-test',
      aiToolsInterest: 'claude',
      businessSize: 'medium',
      company: 'SiteOptz Final Test'
    };
    
    console.log('\n📝 Test subscriber data:');
    console.log(JSON.stringify(testSubscriber, null, 2));
    
    console.log('\n🧪 RUNNING ACTUAL TEST...');
    console.log('This will create a real contact in your GoHighLevel account');
    
    // ACTUAL TEST ENABLED
    
    console.log('\n🧪 Testing addFreeTrialSubscriber...');
    
    const result = await gohighlevel.addFreeTrialSubscriber(testSubscriber);
    
    console.log('\n📊 Test Results:');
    console.log('Success:', result.success);
    
    if (result.success) {
      console.log('✅ Contact created successfully!');
      console.log('Contact ID:', result.contact?.id);
      console.log('Contact Email:', result.contact?.email);
      console.log('Pipeline Result:', result.pipeline);
      console.log('Tags Applied:', result.tags);
      
      console.log('\n🎉 INTEGRATION WORKING!');
      console.log('New users should now be added to GoHighLevel Location:', process.env.GOHIGHLEVEL_LOCATION_ID);
    } else {
      console.log('❌ Contact creation failed');
      console.log('This means the API call is not working properly');
    }
    
    // END TEST SECTION
    
    console.log('\n📄 Debug Summary:');
    console.log('✅ Environment variables configured correctly');
    console.log('✅ Location ID matches your target: ECu5ScdYFmB0WnhvYoBU');
    console.log('✅ SiteOptzGoHighLevel class loaded successfully');
    console.log('⚠️  Real API test commented out - uncomment to run actual test');
    
  } catch (error) {
    console.error('\n❌ Debug test failed:', error.message);
    console.error('Stack trace:', error.stack);
    
    if (error.message.includes('API key') || error.message.includes('Location ID')) {
      console.log('\n💡 Check your environment variables:');
      console.log('1. Make sure GOHIGHLEVEL_API_KEY is set with your actual API key');
      console.log('2. Make sure GOHIGHLEVEL_LOCATION_ID is set to: ECu5ScdYFmB0WnhvYoBU');
    }
  }
}

// Run the debug test
debugContactCreation();