// Test script for GoHighLevel integration
// Run this to test your GoHighLevel API connection and subscriber addition

require('dotenv').config({ path: '.env.gohighlevel' });
const SiteOptzGoHighLevel = require('./utils/siteoptz-gohighlevel');

async function testGoHighLevelIntegration() {
  console.log('🧪 Testing GoHighLevel Integration for SiteOptz.ai\n');

  // Check environment variables
  if (!process.env.GOHIGHLEVEL_API_KEY) {
    console.error('❌ GOHIGHLEVEL_API_KEY not found in environment variables');
    console.log('Please add GOHIGHLEVEL_API_KEY to your .env.gohighlevel file');
    return;
  }

  if (!process.env.GOHIGHLEVEL_LOCATION_ID) {
    console.error('❌ GOHIGHLEVEL_LOCATION_ID not found in environment variables');
    console.log('Please add GOHIGHLEVEL_LOCATION_ID to your .env.gohighlevel file');
    return;
  }

  try {
    const goHighLevel = new SiteOptzGoHighLevel();

    console.log('✅ GoHighLevel client initialized successfully');
    console.log(`📍 Location ID: ${process.env.GOHIGHLEVEL_LOCATION_ID}`);
    console.log(`🔑 API Key: ${process.env.GOHIGHLEVEL_API_KEY.substring(0, 10)}...\n`);

    // Test 1: Get pipelines
    console.log('📋 Testing: Get Pipelines');
    const pipelines = await goHighLevel.getPipelines();
    console.log(`✅ Found ${pipelines.length} pipelines`);
    pipelines.forEach(pipeline => {
      console.log(`   - ${pipeline.name} (ID: ${pipeline.id})`);
    });
    console.log('');

    // Test 2: Get workflows
    console.log('🔄 Testing: Get Workflows');
    const workflows = await goHighLevel.getWorkflows();
    console.log(`✅ Found ${workflows.length} workflows`);
    workflows.forEach(workflow => {
      console.log(`   - ${workflow.name} (ID: ${workflow.id})`);
    });
    console.log('');

    // Test 3: Add free trial subscriber
    console.log('🆓 Testing: Add Free Trial Subscriber');
    const freeTrialData = {
      email: 'test-freetrial@siteoptz.ai',
      firstName: 'Test',
      lastName: 'FreeTrial',
      source: 'test-integration',
      aiToolsInterest: 'chatgpt',
      businessSize: 'small'
    };

    const freeTrialResult = await goHighLevel.addFreeTrialSubscriber(freeTrialData);
    console.log('✅ Free trial subscriber added successfully');
    console.log(`   Contact ID: ${freeTrialResult.contact.id}`);
    console.log(`   Pipeline: ${freeTrialResult.pipeline.id}`);
    console.log(`   Tags: ${freeTrialResult.tags.join(', ')}\n`);

    // Test 4: Add starter plan subscriber
    console.log('🚀 Testing: Add Starter Plan Subscriber');
    const starterData = {
      email: 'test-starter@siteoptz.ai',
      firstName: 'Test',
      lastName: 'Starter',
      source: 'test-integration',
      implementationPriority: 'high',
      teamSize: '5-10',
      currentTools: 'none'
    };

    const starterResult = await goHighLevel.addStarterPlanSubscriber(starterData);
    console.log('✅ Starter plan subscriber added successfully');
    console.log(`   Contact ID: ${starterResult.contact.id}`);
    console.log(`   Pipeline: ${starterResult.pipeline.id}`);
    console.log(`   Tags: ${starterResult.tags.join(', ')}\n`);

    // Test 5: Add pro plan subscriber
    console.log('🏆 Testing: Add Pro Plan Subscriber');
    const proData = {
      email: 'test-pro@siteoptz.ai',
      firstName: 'Test',
      lastName: 'Pro',
      source: 'test-integration',
      consultingHours: 4,
      timeline: '3-months',
      budget: 'medium'
    };

    const proResult = await goHighLevel.addProPlanSubscriber(proData);
    console.log('✅ Pro plan subscriber added successfully');
    console.log(`   Contact ID: ${proResult.contact.id}`);
    console.log(`   Pipeline: ${proResult.pipeline.id}`);
    console.log(`   Tags: ${proResult.tags.join(', ')}\n`);

    // Test 6: Add enterprise subscriber
    console.log('🎯 Testing: Add Enterprise Subscriber');
    const enterpriseData = {
      email: 'test-enterprise@siteoptz.ai',
      firstName: 'Test',
      lastName: 'Enterprise',
      source: 'test-integration',
      companySize: 'enterprise',
      scope: 'full-transformation',
      decisionMakers: 'cto',
      budget: 'enterprise'
    };

    const enterpriseResult = await goHighLevel.addEnterpriseSubscriber(enterpriseData);
    console.log('✅ Enterprise subscriber added successfully');
    console.log(`   Contact ID: ${enterpriseResult.contact.id}`);
    console.log(`   Pipeline: ${enterpriseResult.pipeline.id}`);
    console.log(`   Tags: ${enterpriseResult.tags.join(', ')}\n`);

    // Test 7: Add webinar registrant
    console.log('📅 Testing: Add Webinar Registrant');
    const webinarData = {
      email: 'test-webinar@siteoptz.ai',
      firstName: 'Test',
      lastName: 'Webinar',
      source: 'test-integration',
      webinarTitle: 'AI Tools Masterclass 2025',
      webinarDate: '2025-02-15',
      webinarTime: '2:00 PM EST',
      company: 'Test Company',
      role: 'CTO',
      experience: 'intermediate'
    };

    const webinarResult = await goHighLevel.addWebinarRegistrant(webinarData);
    console.log('✅ Webinar registrant added successfully');
    console.log(`   Contact ID: ${webinarResult.contact.id}`);
    console.log(`   Pipeline: ${webinarResult.pipeline.id}`);
    console.log(`   Tags: ${webinarResult.tags.join(', ')}\n`);

    console.log('🎉 All tests completed successfully!');
    console.log('\n📊 Test Summary:');
    console.log(`   ✅ Pipelines: ${pipelines.length} found`);
    console.log(`   ✅ Workflows: ${workflows.length} found`);
    console.log(`   ✅ Free Trial: Contact ${freeTrialResult.contact.id} added`);
    console.log(`   ✅ Starter Plan: Contact ${starterResult.contact.id} added`);
    console.log(`   ✅ Pro Plan: Contact ${proResult.contact.id} added`);
    console.log(`   ✅ Enterprise: Contact ${enterpriseResult.contact.id} added`);
    console.log(`   ✅ Webinar: Contact ${webinarResult.contact.id} added`);

  } catch (error) {
    console.error('❌ Test failed:', error.message);
    
    if (error.response) {
      console.error('Response status:', error.response.status);
      console.error('Response data:', error.response.data);
    }
    
    console.log('\n🔧 Troubleshooting:');
    console.log('1. Check your API key and location ID');
    console.log('2. Verify your pipeline and workflow IDs');
    console.log('3. Ensure your GoHighLevel account has API access');
    console.log('4. Check the GoHighLevel API documentation for any changes');
  }
}

// Run the test
testGoHighLevelIntegration();
