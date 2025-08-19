const fetch = require('node-fetch');

async function testSubscribeAPI() {
  console.log('Testing newsletter subscription API...\n');
  
  const testData = {
    email: 'info@siteoptz.ai',
    source: 'footer_newsletter',
    name: 'Test User',
    company: 'Test Company',
    useCase: 'Testing email functionality',
    interests: ['AI Tools', 'Automation'],
    tool: 'ChatGPT'
  };

  try {
    const response = await fetch('http://localhost:3004/api/subscribe', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(testData),
    });

    const result = await response.json();
    
    if (response.ok) {
      console.log('✅ API call successful!');
      console.log('Response:', result);
    } else {
      console.error('❌ API call failed:', result);
    }
  } catch (error) {
    console.error('❌ Network error:', error.message);
  }
}

async function testEmailCaptureAPI() {
  console.log('\nTesting email capture API (pricing calculator)...\n');
  
  const testData = {
    email: 'info@siteoptz.ai',
    tool: 'ChatGPT',
    calculatedCost: 20,
    users: 5,
    planType: 'monthly',
    source: 'pricing_calculator',
    additionalData: {
      subscriberEmail: 'info@siteoptz.ai',
      subscriberName: 'Test User',
      subscriberCompany: 'Test Company',
      useCase: 'Testing pricing calculator',
      interests: ['AI Tools']
    }
  };

  try {
    const response = await fetch('http://localhost:3004/api/email-capture', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(testData),
    });

    const result = await response.json();
    
    if (response.ok) {
      console.log('✅ API call successful!');
      console.log('Response:', result);
    } else {
      console.error('❌ API call failed:', result);
    }
  } catch (error) {
    console.error('❌ Network error:', error.message);
  }
}

async function runTests() {
  console.log('🚀 Starting API Email Tests\n');
  console.log('Make sure the Next.js development server is running on port 3004\n');
  console.log('=' .repeat(50) + '\n');
  
  await testSubscribeAPI();
  console.log('\n' + '=' .repeat(50) + '\n');
  await testEmailCaptureAPI();
  
  console.log('\n' + '=' .repeat(50));
  console.log('\n✅ Tests completed! Check your email at info@siteoptz.ai');
}

runTests().catch(console.error);