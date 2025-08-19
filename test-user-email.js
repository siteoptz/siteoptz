const fetch = require('node-fetch');

async function testUserEmailDelivery() {
  console.log('🧪 Testing email delivery to user-entered email address\n');
  
  // Test with different email address
  const testUserEmail = 'siteoptz@gmail.com'; // Different email to test delivery
  
  console.log(`📧 Testing delivery to: ${testUserEmail}\n`);
  
  // Test newsletter subscription
  console.log('1. Testing Newsletter Subscription API...');
  try {
    const response = await fetch('http://localhost:3004/api/subscribe', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: testUserEmail,
        source: 'modal_test',
        name: 'Modal Test User',
        company: 'Test Company',
        tool: 'ChatGPT'
      }),
    });

    const result = await response.json();
    
    if (response.ok) {
      console.log('✅ Newsletter subscription API successful!');
      console.log(`📧 Welcome email should be sent to: ${testUserEmail}`);
    } else {
      console.error('❌ Newsletter API failed:', result);
    }
  } catch (error) {
    console.error('❌ Newsletter API error:', error.message);
  }

  console.log('\n' + '='.repeat(60) + '\n');

  // Test email capture (pricing calculator)
  console.log('2. Testing Email Capture API...');
  try {
    const response = await fetch('http://localhost:3004/api/email-capture', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: testUserEmail,
        tool: 'Claude',
        calculatedCost: 50,
        users: 10,
        planType: 'monthly',
        source: 'pricing_test'
      }),
    });

    const result = await response.json();
    
    if (response.ok) {
      console.log('✅ Email capture API successful!');
      console.log(`📧 Pricing quote should be sent to: ${testUserEmail}`);
    } else {
      console.error('❌ Email capture API failed:', result);
    }
  } catch (error) {
    console.error('❌ Email capture API error:', error.message);
  }

  console.log('\n' + '='.repeat(60));
  console.log('\n🔍 IMPORTANT: Check the following locations for emails:');
  console.log(`📧 Primary inbox: ${testUserEmail}`);
  console.log('📁 Spam/Junk folder');
  console.log('📁 Promotions tab (if using Gmail)');
  console.log('📁 All Mail folder');
  console.log('\n💡 The emails should contain:');
  console.log('   - Welcome email with "Welcome to SiteOptz!" subject');
  console.log('   - Pricing quote with "Your Claude Pricing Quote" subject');
}

testUserEmailDelivery().catch(console.error);