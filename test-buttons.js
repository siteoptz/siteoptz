const fetch = require('node-fetch');

async function testExpertConsultationAPI() {
  console.log('🧪 Testing "Connect with an Expert" Button\n');
  
  const testData = {
    firstName: 'John',
    lastName: 'Doe',
    email: 'siteoptz@gmail.com',
    company: 'Test Corp',
    phone: '555-123-4567',
    message: 'We need help implementing AI tools for our content marketing team.',
    interestedTools: ['ChatGPT', 'Jasper AI', 'Claude'],
    budget: '$5K-$15K',
    timeline: 'Short',
    totalCost: 2500,
    billingCycle: 'monthly'
  };

  try {
    const response = await fetch('http://localhost:3004/api/expert-consultation', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(testData),
    });

    const result = await response.json();
    
    if (response.ok && result.success) {
      console.log('✅ Connect with Expert API - SUCCESS!');
      console.log('📧 Confirmation email sent to:', testData.email);
      console.log('📧 Notification email sent to: info@siteoptz.ai');
      console.log('Response:', result.message);
    } else {
      console.error('❌ Connect with Expert API - FAILED:', result);
    }
  } catch (error) {
    console.error('❌ Network error:', error.message);
  }
}

async function testPricingGuideAPI() {
  console.log('\n' + '='.repeat(60) + '\n');
  console.log('📋 Testing "Get Free Pricing Guide" Button\n');
  
  const testData = {
    firstName: 'Jane',
    lastName: 'Smith',
    email: 'siteoptz@gmail.com',
    company: 'Guide Test Inc',
    role: 'Manager',
    companySize: '51-200',
    primaryInterest: 'Content Generation',
    timeline: 'Short',
    marketingConsent: true
  };

  try {
    const response = await fetch('http://localhost:3004/api/download-guide', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(testData),
    });

    const result = await response.json();
    
    if (response.ok && result.success) {
      console.log('✅ Pricing Guide API - SUCCESS!');
      console.log('📧 Guide email sent to:', testData.email);
      console.log('📄 Download URL:', result.downloadUrl);
      console.log('Response:', result.message);
    } else {
      console.error('❌ Pricing Guide API - FAILED:', result);
    }
  } catch (error) {
    console.error('❌ Network error:', error.message);
  }
}

async function runButtonTests() {
  console.log('🔧 Testing Both Button Functionalities');
  console.log('Server: http://localhost:3004');
  console.log('=' .repeat(60) + '\n');
  
  await testExpertConsultationAPI();
  await testPricingGuideAPI();
  
  console.log('\n' + '=' .repeat(60));
  console.log('\n📧 Check emails at: siteoptz@gmail.com and info@siteoptz.ai');
  console.log('📁 Don\'t forget to check spam/junk folders!');
  console.log('\n💡 Both buttons should now be sending emails correctly.');
}

runButtonTests().catch(console.error);