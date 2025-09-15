// Debug script to test production GoHighLevel integration
// This will help identify issues with the live environment

console.log('🔍 Testing Production GoHighLevel Integration...\n');

// Test function to call your production API endpoints
async function testProductionIntegration() {
  const testData = {
    email: 'production-test@siteoptz.com',
    name: 'Production Test',
    source: 'debug-production-script',
    interests: ['chatgpt'],
    tool: 'claude',
    category: 'AI Tools',
    company: 'Test Company',
    useCase: 'testing'
  };

  console.log('📝 Test data:', JSON.stringify(testData, null, 2));
  console.log('\n🚀 Testing email subscription endpoint...');

  try {
    // Replace with your actual production domain
    const productionDomain = 'https://siteoptz.ai'; // Update this to your actual domain
    
    const response = await fetch(`${productionDomain}/api/subscribe`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'User-Agent': 'Debug-Script/1.0'
      },
      body: JSON.stringify(testData)
    });

    console.log('📊 Response Status:', response.status);
    console.log('📊 Response Status Text:', response.statusText);

    if (!response.ok) {
      const errorText = await response.text();
      console.error('❌ API Error Response:', errorText);
      return;
    }

    const result = await response.json();
    console.log('✅ API Response:', JSON.stringify(result, null, 2));

    if (result.success) {
      console.log('🎉 SUCCESS: Email subscription API is working');
      if (result.crmIntegrations?.gohighlevel?.success) {
        console.log('🎉 GoHighLevel integration SUCCESS');
        console.log('📄 Contact ID:', result.crmIntegrations.gohighlevel.id);
      } else {
        console.log('❌ GoHighLevel integration FAILED');
        console.log('📄 Error details:', result.crmIntegrations?.gohighlevel);
      }
    } else {
      console.log('❌ FAILED: Email subscription API failed');
    }

  } catch (error) {
    console.error('❌ Network Error:', error.message);
    console.log('\n💡 This could be due to:');
    console.log('1. Incorrect production domain');
    console.log('2. API endpoint not deployed');
    console.log('3. Network connectivity issues');
  }
}

// Test registration endpoint too
async function testProductionRegistration() {
  const testData = {
    email: 'production-reg-test@siteoptz.com',
    name: 'Production Registration Test',
    source: 'Free Plan Registration - Modal',
    planName: 'Free Plan',
    userAgent: 'Debug-Script/1.0',
    referrer: '',
    registrationMethod: 'email',
    aiToolsInterest: 'chatgpt',
    businessSize: 'small'
  };

  console.log('\n🚀 Testing registration endpoint...');
  console.log('📝 Test data:', JSON.stringify(testData, null, 2));

  try {
    const productionDomain = 'https://siteoptz.ai'; // Update this to your actual domain
    
    const response = await fetch(`${productionDomain}/api/register-free-plan`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'User-Agent': 'Debug-Script/1.0'
      },
      body: JSON.stringify(testData)
    });

    console.log('📊 Response Status:', response.status);
    console.log('📊 Response Status Text:', response.statusText);

    if (!response.ok) {
      const errorText = await response.text();
      console.error('❌ API Error Response:', errorText);
      return;
    }

    const result = await response.json();
    console.log('✅ API Response:', JSON.stringify(result, null, 2));

    if (result.success) {
      console.log('🎉 SUCCESS: Registration API is working');
      if (result.data?.contactId) {
        console.log('🎉 GoHighLevel integration SUCCESS');
        console.log('📄 Contact ID:', result.data.contactId);
      } else {
        console.log('⚠️  Registration succeeded but no GoHighLevel contact ID returned');
      }
    } else {
      console.log('❌ FAILED: Registration API failed');
    }

  } catch (error) {
    console.error('❌ Network Error:', error.message);
  }
}

// Instructions for manual testing
console.log('📋 MANUAL TESTING INSTRUCTIONS:');
console.log('1. Update the productionDomain variable above to your actual domain');
console.log('2. Run this script: node debug-production-ghl.js');
console.log('3. Check the output for any errors or failures');
console.log('4. If you see errors, check your Vercel function logs');
console.log('');
console.log('📋 VERCEL FUNCTION LOGS:');
console.log('1. Go to https://vercel.com/dashboard');
console.log('2. Select your SiteOptz project');
console.log('3. Go to Functions tab');
console.log('4. Look for /api/subscribe and /api/register-free-plan');
console.log('5. Click "View Function Logs" for detailed error information');
console.log('');

// Run the tests
// Uncomment these lines to run actual tests:
// await testProductionIntegration();
// await testProductionRegistration();

console.log('⚠️  Tests are commented out - uncomment the lines at the bottom to run actual tests');
console.log('📚 This script is ready to help debug your production integration!');