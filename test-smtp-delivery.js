const nodemailer = require('nodemailer');

async function testSMTPDirectly() {
  console.log('🔧 Testing Direct SMTP Configuration');
  console.log('====================================\n');
  
  // Test SMTP connection directly
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_SMTP_HOST || 'smtp.gmail.com',
    port: parseInt(process.env.EMAIL_SMTP_PORT || '587'),
    secure: false,
    auth: {
      user: process.env.EMAIL_SMTP_USER,
      pass: process.env.EMAIL_SMTP_PASS,
    },
    tls: {
      rejectUnauthorized: false
    }
  });

  console.log('SMTP Configuration:');
  console.log('- Host:', process.env.EMAIL_SMTP_HOST || 'smtp.gmail.com');
  console.log('- Port:', process.env.EMAIL_SMTP_PORT || '587');
  console.log('- User:', process.env.EMAIL_SMTP_USER ? process.env.EMAIL_SMTP_USER.substring(0, 3) + '***@' + process.env.EMAIL_SMTP_USER.split('@')[1] : 'NOT SET');
  console.log('- Pass:', process.env.EMAIL_SMTP_PASS ? '***' + process.env.EMAIL_SMTP_PASS.slice(-4) : 'NOT SET');
  console.log('- From:', process.env.EMAIL_FROM || 'info@siteoptz.ai');
  console.log('');

  try {
    console.log('🔍 Verifying SMTP connection...');
    await transporter.verify();
    console.log('✅ SMTP connection verified successfully!\n');
  } catch (error) {
    console.error('❌ SMTP connection failed:', error.message);
    console.error('Full error:', error);
    return;
  }

  // Send test email to check deliverability
  console.log('📧 Sending test email for deliverability...');
  try {
    const info = await transporter.sendMail({
      from: `"SiteOptz Team" <${process.env.EMAIL_FROM || 'info@siteoptz.ai'}>`,
      to: 'siteoptz@gmail.com',
      subject: 'SMTP Deliverability Test - ' + new Date().toISOString(),
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <title>SMTP Test Email</title>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: #f8f9fa; padding: 20px; border-radius: 8px; margin-bottom: 20px; }
            .content { background: white; padding: 20px; border: 1px solid #dee2e6; border-radius: 8px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>🧪 SMTP Deliverability Test</h1>
              <p>This is a direct SMTP test to verify email delivery.</p>
            </div>
            
            <div class="content">
              <h2>Test Details:</h2>
              <ul>
                <li><strong>Time:</strong> ${new Date().toISOString()}</li>
                <li><strong>From:</strong> ${process.env.EMAIL_FROM || 'info@siteoptz.ai'}</li>
                <li><strong>SMTP Host:</strong> ${process.env.EMAIL_SMTP_HOST || 'smtp.gmail.com'}</li>
                <li><strong>SMTP Port:</strong> ${process.env.EMAIL_SMTP_PORT || '587'}</li>
                <li><strong>Test Type:</strong> Direct SMTP Connection</li>
              </ul>
              
              <h3>✅ If you receive this email:</h3>
              <ul>
                <li>SMTP configuration is working</li>
                <li>Email delivery is successful</li>
                <li>The issue is not with the email server</li>
              </ul>
              
              <h3>🔍 Next Steps:</h3>
              <ul>
                <li>Check if emails are going to spam/junk folder</li>
                <li>Verify the live site has the same environment variables</li>
                <li>Check if the live site is using a different port/domain</li>
              </ul>
            </div>
          </div>
        </body>
        </html>
      `,
      text: `
SMTP Deliverability Test

This is a direct SMTP test to verify email delivery.

Test Details:
- Time: ${new Date().toISOString()}
- From: ${process.env.EMAIL_FROM || 'info@siteoptz.ai'}
- SMTP Host: ${process.env.EMAIL_SMTP_HOST || 'smtp.gmail.com'}
- SMTP Port: ${process.env.EMAIL_SMTP_PORT || '587'}
- Test Type: Direct SMTP Connection

✅ If you receive this email:
- SMTP configuration is working
- Email delivery is successful
- The issue is not with the email server

🔍 Next Steps:
- Check if emails are going to spam/junk folder
- Verify the live site has the same environment variables
- Check if the live site is using a different port/domain
      `
    });

    console.log('✅ Test email sent successfully!');
    console.log('📧 Message ID:', info.messageId);
    console.log('📬 Sent to: siteoptz@gmail.com');
    console.log('\n📁 CHECK YOUR EMAIL (including spam/junk folder)!');
    
  } catch (error) {
    console.error('❌ Failed to send test email:', error.message);
    console.error('Full error:', error);
  }
}

// Run the test
testSMTPDirectly().catch(console.error);