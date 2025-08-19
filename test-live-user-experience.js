const fetch = require('node-fetch');

// Test with a real email address to verify deliverability
const TEST_EMAIL = 'siteoptz@gmail.com'; // User's actual email

console.log('🔍 Testing Complete User Email Experience');
console.log('==========================================\n');

async function testNewsletterSubscription() {
  console.log('1️⃣ Testing Newsletter Subscription (Footer)');
  console.log('--------------------------------------------');
  
  try {
    const response = await fetch('http://localhost:3006/api/subscribe/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: TEST_EMAIL,
        name: 'Live Test User',
        company: 'SiteOptz Testing',
        useCase: 'Testing email delivery',
        interests: ['ChatGPT', 'Claude'],
        tool: 'General',
        category: 'AI Writing',
        source: 'footer_newsletter'
      }),
    });

    const result = await response.json();
    
    if (response.ok) {
      console.log('✅ Newsletter API - SUCCESS');
      console.log('📧 Welcome email should be sent to:', TEST_EMAIL);
      console.log('Response:', result);
    } else {
      console.error('❌ Newsletter API - FAILED:', result);
    }
  } catch (error) {
    console.error('❌ Network error:', error.message);
  }
  
  console.log('\n');
}

async function testContactForm() {
  console.log('2️⃣ Testing Contact Form');
  console.log('------------------------');
  
  try {
    const response = await fetch('http://localhost:3006/api/email-capture/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: 'info@siteoptz.ai', // Notification email
        tool: 'Contact Form Test',
        calculatedCost: null,
        users: 1,
        planType: 'contact',
        source: 'Contact form test from live user',
        additionalData: {
          contactForm: true,
          senderName: 'Live Test User',
          senderEmail: TEST_EMAIL,
          senderCompany: 'SiteOptz Testing',
          inquiryType: 'general',
          subject: 'Testing Contact Form Email Delivery',
          message: 'This is a test to verify that contact form emails are being received by users.'
        }
      }),
    });

    const result = await response.json();
    
    if (response.ok && result.success) {
      console.log('✅ Contact Form Notification - SUCCESS');
      console.log('📧 Notification sent to info@siteoptz.ai');
      console.log('Response:', result.message);
    } else {
      console.error('❌ Contact Form Notification - FAILED:', result);
    }
  } catch (error) {
    console.error('❌ Network error:', error.message);
  }
  
  console.log('\n');
  
  // Test confirmation email to user
  try {
    console.log('2️⃣b Testing Contact Form Confirmation Email to User');
    console.log('---------------------------------------------------');
    
    const response = await fetch('http://localhost:3006/api/email-capture/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: TEST_EMAIL, // User's email
        tool: 'Contact Form Confirmation',
        calculatedCost: null,
        users: 1,
        planType: 'confirmation',
        source: 'Contact form auto-reply',
        additionalData: {
          isConfirmation: true,
          originalSubject: 'Testing Contact Form Email Delivery',
          originalMessage: 'This is a test to verify that contact form emails are being received by users.',
          name: 'Live Test User'
        }
      }),
    });

    const result = await response.json();
    
    if (response.ok && result.success) {
      console.log('✅ Contact Form Confirmation - SUCCESS');
      console.log('📧 Confirmation email sent to:', TEST_EMAIL);
      console.log('Response:', result.message);
    } else {
      console.error('❌ Contact Form Confirmation - FAILED:', result);
    }
  } catch (error) {
    console.error('❌ Network error:', error.message);
  }
  
  console.log('\n');
}

async function testExpertConsultation() {
  console.log('3️⃣ Testing Expert Consultation (Pricing Calculator)');
  console.log('---------------------------------------------------');
  
  try {
    const response = await fetch('http://localhost:3006/api/expert-consultation/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        firstName: 'Live',
        lastName: 'Test User',
        email: TEST_EMAIL,
        company: 'SiteOptz Testing',
        phone: '555-TEST-123',
        message: 'Testing expert consultation email delivery to verify users receive emails.',
        interestedTools: ['ChatGPT', 'Claude', 'Gemini'],
        budget: '$5K-$15K',
        timeline: 'Short',
        totalCost: 3000,
        billingCycle: 'monthly'
      }),
    });

    const result = await response.json();
    
    if (response.ok && result.success) {
      console.log('✅ Expert Consultation - SUCCESS');
      console.log('📧 Confirmation email sent to:', TEST_EMAIL);
      console.log('📧 Notification email sent to: info@siteoptz.ai');
      console.log('Response:', result.message);
    } else {
      console.error('❌ Expert Consultation - FAILED:', result);
    }
  } catch (error) {
    console.error('❌ Network error:', error.message);
  }
  
  console.log('\n');
}

async function testPricingGuide() {
  console.log('4️⃣ Testing Pricing Guide Download');
  console.log('----------------------------------');
  
  try {
    const response = await fetch('http://localhost:3006/api/download-guide/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        firstName: 'Live',
        lastName: 'Test User',
        email: TEST_EMAIL,
        company: 'SiteOptz Testing',
        role: 'Manager',
        companySize: '51-200',
        primaryInterest: 'Content Generation',
        timeline: 'Short',
        marketingConsent: true
      }),
    });

    const result = await response.json();
    
    if (response.ok && result.success) {
      console.log('✅ Pricing Guide Download - SUCCESS');
      console.log('📧 Guide email sent to:', TEST_EMAIL);
      console.log('📄 Download URL:', result.downloadUrl);
      console.log('Response:', result.message);
    } else {
      console.error('❌ Pricing Guide Download - FAILED:', result);
    }
  } catch (error) {
    console.error('❌ Network error:', error.message);
  }
  
  console.log('\n');
}

async function runCompleteTest() {
  console.log('🧪 Complete Email System Test');
  console.log('Server: http://localhost:3006');
  console.log('Test Email: ' + TEST_EMAIL);
  console.log('Time: ' + new Date().toISOString());
  console.log('==========================================\n');
  
  await testNewsletterSubscription();
  await testContactForm();
  await testExpertConsultation();
  await testPricingGuide();
  
  console.log('='.repeat(60));
  console.log('✅ All API tests completed!');
  console.log('\n📧 CHECK THE FOLLOWING EMAIL ACCOUNTS:');
  console.log('1. User email: ' + TEST_EMAIL);
  console.log('2. Business email: info@siteoptz.ai');
  console.log('\n📁 IMPORTANT: Check spam/junk folders!');
  console.log('\n💡 All 4 email systems tested:');
  console.log('   • Newsletter subscription (/api/subscribe)');
  console.log('   • Contact form (/api/email-capture)');
  console.log('   • Expert consultation (/api/expert-consultation)');
  console.log('   • Pricing guide download (/api/download-guide)');
}

runCompleteTest().catch(console.error);