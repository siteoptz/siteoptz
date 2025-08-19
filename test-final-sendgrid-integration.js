// Load environment variables
require('dotenv').config({ path: '.env.local' });

console.log('🚀 FINAL SENDGRID INTEGRATION TEST');
console.log('===================================\n');

async function testAllAPIs() {
  const testEmail = 'siteoptz@gmail.com';
  
  console.log('🔧 Testing All 4 Email Systems with SendGrid Integration');
  console.log('Provider Priority: SendGrid → SMTP Fallback');
  console.log('Test Email:', testEmail);
  console.log('\n' + '='.repeat(60) + '\n');

  // Test 1: Newsletter Subscription
  console.log('1️⃣ NEWSLETTER SUBSCRIPTION (/api/subscribe)');
  console.log('--------------------------------------------');
  try {
    const response1 = await fetch('http://localhost:3006/api/subscribe/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: testEmail,
        name: 'Final SendGrid Test',
        company: 'SiteOptz',
        useCase: 'Final integration test',
        interests: ['ChatGPT', 'Claude', 'Gemini'],
        source: 'sendgrid_final_test'
      }),
    });

    const result1 = await response1.json();
    console.log(response1.ok ? 
      '✅ Newsletter API - SUCCESS' : 
      '❌ Newsletter API - FAILED: ' + JSON.stringify(result1));
  } catch (error) {
    console.error('❌ Newsletter API - ERROR:', error.message);
  }

  console.log('\n2️⃣ CONTACT FORM (/api/email-capture)');
  console.log('-------------------------------------');
  try {
    const response2 = await fetch('http://localhost:3006/api/email-capture/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: testEmail,
        tool: 'Final SendGrid Test - Contact Form',
        calculatedCost: null,
        users: 1,
        planType: 'confirmation',
        source: 'Final integration test - Contact form',
        additionalData: {
          isConfirmation: true,
          originalSubject: 'Testing SendGrid Integration',
          originalMessage: 'Final test to ensure all email systems work with SendGrid.',
          name: 'Final SendGrid Test User'
        }
      }),
    });

    const result2 = await response2.json();
    console.log(response2.ok ? 
      '✅ Contact Form API - SUCCESS' : 
      '❌ Contact Form API - FAILED: ' + JSON.stringify(result2));
  } catch (error) {
    console.error('❌ Contact Form API - ERROR:', error.message);
  }

  console.log('\n3️⃣ EXPERT CONSULTATION (/api/expert-consultation)');
  console.log('--------------------------------------------------');
  try {
    const response3 = await fetch('http://localhost:3006/api/expert-consultation/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        firstName: 'Final',
        lastName: 'SendGrid Test',
        email: testEmail,
        company: 'SiteOptz Testing',
        phone: '555-FINAL-TEST',
        message: 'Final integration test to verify expert consultation emails work with SendGrid.',
        interestedTools: ['ChatGPT', 'Claude', 'Gemini', 'Jasper AI'],
        budget: '$5K-$15K',
        timeline: 'Short',
        totalCost: 4500,
        billingCycle: 'monthly'
      }),
    });

    const result3 = await response3.json();
    console.log(response3.ok ? 
      '✅ Expert Consultation API - SUCCESS' : 
      '❌ Expert Consultation API - FAILED: ' + JSON.stringify(result3));
  } catch (error) {
    console.error('❌ Expert Consultation API - ERROR:', error.message);
  }

  console.log('\n4️⃣ PRICING GUIDE DOWNLOAD (/api/download-guide)');
  console.log('------------------------------------------------');
  try {
    const response4 = await fetch('http://localhost:3006/api/download-guide/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        firstName: 'Final',
        lastName: 'SendGrid Test',
        email: testEmail,
        company: 'SiteOptz Testing',
        role: 'CEO',
        companySize: '201-1000',
        primaryInterest: 'General AI Strategy',
        timeline: 'Short',
        marketingConsent: true
      }),
    });

    const result4 = await response4.json();
    console.log(response4.ok ? 
      '✅ Pricing Guide API - SUCCESS' : 
      '❌ Pricing Guide API - FAILED: ' + JSON.stringify(result4));
  } catch (error) {
    console.error('❌ Pricing Guide API - ERROR:', error.message);
  }

  console.log('\n' + '='.repeat(60));
  console.log('🎉 ALL EMAIL SYSTEMS TESTED WITH SENDGRID!');
  console.log('='.repeat(60));
  console.log('\n📧 CHECK YOUR EMAIL INBOX:');
  console.log('   • Primary: ' + testEmail);
  console.log('   • Business: info@siteoptz.ai');
  console.log('\n🚀 SENDGRID BENEFITS:');
  console.log('   ✅ Better inbox delivery rates');
  console.log('   ✅ Professional sender reputation');
  console.log('   ✅ Automatic SMTP fallback if SendGrid fails');
  console.log('   ✅ Reduced spam folder placement');
  console.log('\n💡 EMAIL SYSTEM SUMMARY:');
  console.log('   • Primary Provider: SendGrid');
  console.log('   • Fallback Provider: Gmail SMTP');
  console.log('   • All 4 email systems updated');
  console.log('   • Automatic failover implemented');
  console.log('\n📋 NEXT STEPS FOR PRODUCTION:');
  console.log('   1. Deploy updated code to live site');
  console.log('   2. Add SendGrid API key to production environment');
  console.log('   3. Set EMAIL_PROVIDER=sendgrid in production .env');
  console.log('   4. Test forms on live site');
  console.log('\n🎯 ISSUE RESOLUTION:');
  console.log('   ❌ Old Issue: Emails going to spam with Gmail SMTP');
  console.log('   ✅ New Solution: Professional delivery with SendGrid');
  console.log('   ✅ Result: Users should receive emails in inbox');
}

// Run the comprehensive test
testAllAPIs().catch(console.error);