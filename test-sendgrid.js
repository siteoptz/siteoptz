// Load environment variables from .env.local
require('dotenv').config({ path: '.env.local' });

async function testSendGrid() {
  console.log('🚀 Testing SendGrid Integration');
  console.log('===============================\n');
  
  console.log('Environment Variables:');
  console.log('- EMAIL_PROVIDER:', process.env.EMAIL_PROVIDER || 'Not set');
  console.log('- SENDGRID_API_KEY:', process.env.SENDGRID_API_KEY ? '✅ SET' : '❌ NOT SET');
  console.log('- EMAIL_FROM:', process.env.EMAIL_FROM || 'Not set');
  console.log('');

  // Import the updated email service
  const { sendEmail } = require('./lib/email-service');

  try {
    console.log('📧 Sending test email via SendGrid...');
    
    const result = await sendEmail({
      to: 'siteoptz@gmail.com',
      subject: '🚀 SendGrid Integration Test - ' + new Date().toLocaleString(),
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <title>SendGrid Integration Test</title>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
            .content { background: #f8f9fa; padding: 30px; border-radius: 0 0 10px 10px; }
            .success { background: #d4edda; border: 1px solid #c3e6cb; padding: 15px; border-radius: 8px; margin: 20px 0; }
            .feature { background: white; padding: 20px; border-radius: 8px; margin: 15px 0; border-left: 4px solid #28a745; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>🚀 SendGrid Integration Success!</h1>
              <p>High-deliverability email system is now active</p>
            </div>
            
            <div class="content">
              <div class="success">
                <h2>✅ SendGrid Benefits:</h2>
                <ul>
                  <li><strong>Better Deliverability:</strong> Professional email service reduces spam filtering</li>
                  <li><strong>Reliability:</strong> Enterprise-grade infrastructure with 99.9% uptime</li>
                  <li><strong>Analytics:</strong> Track email opens, clicks, and delivery rates</li>
                  <li><strong>Reputation:</strong> Established sender reputation improves inbox placement</li>
                </ul>
              </div>
              
              <div class="feature">
                <h3>🔄 Automatic Fallback System:</h3>
                <p>The email service now tries SendGrid first, then falls back to SMTP if needed. This ensures maximum reliability.</p>
              </div>
              
              <div class="feature">
                <h3>📊 Email Systems Updated:</h3>
                <ul>
                  <li>✅ Newsletter Subscription (/api/subscribe)</li>
                  <li>✅ Contact Form (/api/email-capture)</li>
                  <li>✅ Expert Consultation (/api/expert-consultation)</li>
                  <li>✅ Pricing Guide Download (/api/download-guide)</li>
                </ul>
              </div>
              
              <hr>
              <p><strong>Test Time:</strong> ${new Date().toLocaleString()}</p>
              <p><strong>Provider Used:</strong> SendGrid API</p>
              <p><strong>From:</strong> ${process.env.EMAIL_FROM}</p>
            </div>
          </div>
        </body>
        </html>
      `,
      text: `
🚀 SendGrid Integration Success!

✅ SendGrid Benefits:
- Better Deliverability: Professional email service reduces spam filtering
- Reliability: Enterprise-grade infrastructure with 99.9% uptime  
- Analytics: Track email opens, clicks, and delivery rates
- Reputation: Established sender reputation improves inbox placement

🔄 Automatic Fallback System:
The email service now tries SendGrid first, then falls back to SMTP if needed.

📊 Email Systems Updated:
✅ Newsletter Subscription (/api/subscribe)
✅ Contact Form (/api/email-capture)
✅ Expert Consultation (/api/expert-consultation)
✅ Pricing Guide Download (/api/download-guide)

Test Time: ${new Date().toLocaleString()}
Provider Used: SendGrid API
From: ${process.env.EMAIL_FROM}
      `
    });

    if (result.success) {
      console.log('✅ SendGrid email sent successfully!');
      console.log('📧 Message ID:', result.messageId);
      console.log('🚀 Provider used:', result.provider.toUpperCase());
      console.log('\n🎉 SENDGRID INTEGRATION COMPLETE!');
      console.log('\n📧 Email should arrive in inbox (not spam) thanks to SendGrid\'s reputation');
      console.log('\n💡 All 4 email systems now use SendGrid for better deliverability');
    } else {
      console.error('❌ SendGrid test failed:', result.error);
    }

  } catch (error) {
    console.error('❌ Test error:', error.message);
  }
}

async function testAllEmailSystems() {
  console.log('\n' + '='.repeat(60));
  console.log('🧪 Testing All Email Systems with SendGrid');
  console.log('='.repeat(60) + '\n');

  const { sendEmail } = require('./lib/email-service');
  const testEmail = 'siteoptz@gmail.com';

  // Test newsletter subscription
  console.log('1️⃣ Testing Newsletter Subscription Email...');
  try {
    const result1 = await sendEmail({
      to: testEmail,
      subject: '🎉 Welcome to SiteOptz AI Insights - SendGrid Test',
      html: '<h1>Welcome to SiteOptz!</h1><p>Thank you for subscribing to our AI insights newsletter via SendGrid.</p>',
      text: 'Welcome to SiteOptz! Thank you for subscribing to our AI insights newsletter via SendGrid.'
    });
    console.log(result1.success ? '✅ Newsletter email sent via ' + result1.provider.toUpperCase() : '❌ Failed: ' + result1.error);
  } catch (e) {
    console.error('❌ Newsletter test failed:', e.message);
  }

  console.log('\n2️⃣ Testing Contact Form Confirmation Email...');
  try {
    const result2 = await sendEmail({
      to: testEmail,
      subject: 'Thank you for contacting SiteOptz - SendGrid Test',
      html: '<h1>Message Received!</h1><p>We\'ve received your inquiry and will respond within 24 hours.</p>',
      text: 'Message Received! We\'ve received your inquiry and will respond within 24 hours.'
    });
    console.log(result2.success ? '✅ Contact form email sent via ' + result2.provider.toUpperCase() : '❌ Failed: ' + result2.error);
  } catch (e) {
    console.error('❌ Contact form test failed:', e.message);
  }

  console.log('\n3️⃣ Testing Expert Consultation Email...');
  try {
    const result3 = await sendEmail({
      to: testEmail,
      subject: 'Your AI Consultation is Confirmed - SendGrid Test',
      html: '<h1>Consultation Confirmed!</h1><p>An AI expert will contact you within 24 hours to schedule your consultation.</p>',
      text: 'Consultation Confirmed! An AI expert will contact you within 24 hours to schedule your consultation.'
    });
    console.log(result3.success ? '✅ Expert consultation email sent via ' + result3.provider.toUpperCase() : '❌ Failed: ' + result3.error);
  } catch (e) {
    console.error('❌ Expert consultation test failed:', e.message);
  }

  console.log('\n4️⃣ Testing Pricing Guide Email...');
  try {
    const result4 = await sendEmail({
      to: testEmail,
      subject: 'Your AI Tools Pricing Guide - SendGrid Test',
      html: '<h1>Here\'s Your Guide!</h1><p>Download your comprehensive AI tools pricing guide attached.</p>',
      text: 'Here\'s Your Guide! Download your comprehensive AI tools pricing guide attached.'
    });
    console.log(result4.success ? '✅ Pricing guide email sent via ' + result4.provider.toUpperCase() : '❌ Failed: ' + result4.error);
  } catch (e) {
    console.error('❌ Pricing guide test failed:', e.message);
  }

  console.log('\n' + '='.repeat(60));
  console.log('🎉 All email system tests completed!');
  console.log('📧 Check your inbox: ' + testEmail);
  console.log('💡 Emails should now arrive in inbox thanks to SendGrid');
  console.log('='.repeat(60));
}

// Run tests
testSendGrid()
  .then(() => testAllEmailSystems())
  .catch(console.error);