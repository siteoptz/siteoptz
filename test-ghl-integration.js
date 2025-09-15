// Test script for GoHighLevel integration
// Run with: node test-ghl-integration.js

require('dotenv').config({ path: '.env.local' });
const SiteOptzGoHighLevel = require('./utils/siteoptz-gohighlevel');

async function testGoHighLevelIntegration() {
  console.log('🧪 Testing SiteOptz GoHighLevel Integration...\n');
  
  // Check environment variables
  console.log('📋 Environment Check:');
  console.log('- API Key present:', !!process.env.GOHIGHLEVEL_API_KEY);
  console.log('- Location ID present:', !!process.env.GOHIGHLEVEL_LOCATION_ID);
  console.log('- Free Trial Pipeline ID:', process.env.GHL_FREE_TRIAL_PIPELINE_ID || 'not set');
  console.log('- Email Capture Workflow ID:', process.env.GHL_EMAIL_CAPTURE_WORKFLOW_ID || 'not set');
  
  if (!process.env.GOHIGHLEVEL_API_KEY || !process.env.GOHIGHLEVEL_LOCATION_ID) {
    console.log('\n❌ Missing required environment variables. Please set:');
    console.log('- GOHIGHLEVEL_API_KEY');
    console.log('- GOHIGHLEVEL_LOCATION_ID');
    console.log('\nUpdate these in your .env.local file');
    return;
  }
  
  try {
    // Initialize the integration
    const gohighlevel = new SiteOptzGoHighLevel(
      process.env.GOHIGHLEVEL_API_KEY,
      process.env.GOHIGHLEVEL_LOCATION_ID
    );
    
    console.log('\n✅ SiteOptz GoHighLevel class initialized successfully');
    
    // Test data
    const testSubscriber = {
      email: 'test@example.com',
      firstName: 'Test',
      lastName: 'User',
      source: 'integration-test',
      aiToolsInterest: 'chatgpt',
      businessSize: 'small'
    };
    
    console.log('\n📝 Test Data:', testSubscriber);
    console.log('\n🚀 Testing addFreeTrialSubscriber...');
    
    // Note: Uncomment the next lines to actually test with real API calls
    // WARNING: This will create a real contact in your GoHighLevel account
    
    /*
    const result = await gohighlevel.addFreeTrialSubscriber(testSubscriber);
    
    if (result.success) {
      console.log('✅ SUCCESS: Free trial subscriber added');
      console.log('Contact ID:', result.contact?.id);
      console.log('Pipeline:', result.pipeline);
      console.log('Tags:', result.tags);
    } else {
      console.log('❌ FAILED: Could not add free trial subscriber');
    }
    */
    
    console.log('\n📄 Integration Test Summary:');
    console.log('✅ Environment variables configured');
    console.log('✅ SiteOptzGoHighLevel class loaded');
    console.log('✅ Test data prepared');
    console.log('⚠️  Actual API test commented out (uncomment to run real test)');
    
    console.log('\n💡 To run a real test:');
    console.log('1. Uncomment the API test section in this script');
    console.log('2. Make sure your GoHighLevel credentials are correct');
    console.log('3. Run: node test-ghl-integration.js');
    
  } catch (error) {
    console.error('\n❌ Integration test failed:', error.message);
    console.error('Full error:', error);
  }
}

// Run the test
testGoHighLevelIntegration();