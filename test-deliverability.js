const nodemailer = require('nodemailer');
require('dotenv').config({ path: '.env.local' });

async function testEmailDeliverability() {
  console.log('🔍 Testing Email Deliverability Configuration\n');
  
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_SMTP_HOST || 'smtp.gmail.com',
    port: parseInt(process.env.EMAIL_SMTP_PORT || '587'),
    secure: false,
    auth: {
      user: process.env.EMAIL_SMTP_USER,
      pass: process.env.EMAIL_SMTP_PASS,
    },
  });

  // Test email to external address
  const testEmail = {
    from: `"SiteOptz Team" <${process.env.EMAIL_FROM}>`,
    to: 'siteoptz@gmail.com', // External test email
    subject: '🔍 SiteOptz Deliverability Test - ' + new Date().toLocaleTimeString(),
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #333;">SiteOptz Email Deliverability Test</h2>
        <p>This email tests whether SiteOptz emails are being delivered to user email addresses.</p>
        
        <div style="background: #f5f5f5; padding: 20px; border-radius: 5px; margin: 20px 0;">
          <h3>Email Configuration Details:</h3>
          <ul>
            <li><strong>SMTP Host:</strong> ${process.env.EMAIL_SMTP_HOST}</li>
            <li><strong>SMTP Port:</strong> ${process.env.EMAIL_SMTP_PORT}</li>
            <li><strong>From Email:</strong> ${process.env.EMAIL_FROM}</li>
            <li><strong>Auth User:</strong> ${process.env.EMAIL_SMTP_USER}</li>
            <li><strong>Timestamp:</strong> ${new Date().toLocaleString()}</li>
          </ul>
        </div>

        <h3 style="color: #667eea;">What this test confirms:</h3>
        <ul>
          <li>✅ SMTP connection is working</li>
          <li>✅ Authentication is successful</li>
          <li>✅ Emails are being sent to user addresses (not just info@siteoptz.ai)</li>
          <li>✅ HTML formatting is working</li>
        </ul>

        <div style="background: #e8f4f8; padding: 15px; border-left: 4px solid #667eea; margin: 20px 0;">
          <strong>🎉 If you receive this email, the modal email functionality is working correctly!</strong>
        </div>

        <hr style="margin: 30px 0;">
        <p style="color: #666; font-size: 12px;">
          This is a test email from SiteOptz development environment.<br>
          Sent to verify that users receive emails from website modals.
        </p>
      </div>
    `,
    text: `
SiteOptz Email Deliverability Test

This email tests whether SiteOptz emails are being delivered to user email addresses.

Email Configuration:
- SMTP Host: ${process.env.EMAIL_SMTP_HOST}
- SMTP Port: ${process.env.EMAIL_SMTP_PORT}  
- From Email: ${process.env.EMAIL_FROM}
- Auth User: ${process.env.EMAIL_SMTP_USER}
- Timestamp: ${new Date().toLocaleString()}

What this test confirms:
✅ SMTP connection is working
✅ Authentication is successful  
✅ Emails are being sent to user addresses (not just info@siteoptz.ai)

🎉 If you receive this email, the modal email functionality is working correctly!

This is a test email from SiteOptz development environment.
Sent to verify that users receive emails from website modals.
    `
  };

  try {
    console.log('📧 Sending deliverability test email...');
    console.log('From:', testEmail.from);
    console.log('To:', testEmail.to);
    console.log('Subject:', testEmail.subject);
    
    const info = await transporter.sendMail(testEmail);
    
    console.log('\n✅ Email sent successfully!');
    console.log('Message ID:', info.messageId);
    console.log('Server Response:', info.response);
    
    console.log('\n🔍 Deliverability Check Results:');
    console.log('✅ SMTP Configuration: Working');
    console.log('✅ Authentication: Successful');
    console.log('✅ Email Sending: Successful');
    console.log('✅ Target Address: External (siteoptz@gmail.com)');
    
    console.log('\n📧 Please check the following locations:');
    console.log('1. Primary inbox: siteoptz@gmail.com');
    console.log('2. Spam/Junk folder');
    console.log('3. Gmail Promotions tab');
    console.log('4. Gmail Social/Updates tabs');
    console.log('5. All Mail folder');
    
    console.log('\n💡 Possible reasons for non-delivery:');
    console.log('• Gmail spam filtering (most common)');
    console.log('• Domain reputation (new sender)');
    console.log('• Email client filtering rules');
    console.log('• Delayed delivery (can take a few minutes)');
    
    return true;
  } catch (error) {
    console.error('\n❌ Email sending failed:', error.message);
    console.error('Full error:', error);
    return false;
  }
}

testEmailDeliverability().catch(console.error);