const nodemailer = require('nodemailer');
require('dotenv').config({ path: '.env.local' });

async function sendTestEmail() {
  console.log('Sending test email to verify delivery...\n');
  
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_SMTP_HOST || 'smtp.gmail.com',
    port: parseInt(process.env.EMAIL_SMTP_PORT || '587'),
    secure: false,
    auth: {
      user: process.env.EMAIL_SMTP_USER,
      pass: process.env.EMAIL_SMTP_PASS,
    },
  });

  const testEmail = {
    from: `"SiteOptz Test" <${process.env.EMAIL_FROM || 'info@siteoptz.ai'}>`,
    to: 'info@siteoptz.ai',
    subject: '🧪 SiteOptz Email Test - ' + new Date().toLocaleString(),
    html: `
      <h1>Email Delivery Test</h1>
      <p>This is a test email to verify that SiteOptz email functionality is working correctly.</p>
      <ul>
        <li><strong>Sent at:</strong> ${new Date().toLocaleString()}</li>
        <li><strong>From:</strong> ${process.env.EMAIL_FROM}</li>
        <li><strong>SMTP Host:</strong> ${process.env.EMAIL_SMTP_HOST}</li>
        <li><strong>SMTP Port:</strong> ${process.env.EMAIL_SMTP_PORT}</li>
      </ul>
      <p>If you receive this email, the configuration is working properly!</p>
      <hr>
      <p style="color: #666; font-size: 12px;">
        This is an automated test email from SiteOptz development environment.
      </p>
    `,
    text: `
Email Delivery Test

This is a test email to verify that SiteOptz email functionality is working correctly.

Sent at: ${new Date().toLocaleString()}
From: ${process.env.EMAIL_FROM}
SMTP Host: ${process.env.EMAIL_SMTP_HOST}
SMTP Port: ${process.env.EMAIL_SMTP_PORT}

If you receive this email, the configuration is working properly!
    `
  };

  try {
    console.log('Attempting to send email to:', testEmail.to);
    console.log('From:', testEmail.from);
    console.log('Subject:', testEmail.subject);
    
    const info = await transporter.sendMail(testEmail);
    
    console.log('\\n✅ Email sent successfully!');
    console.log('Message ID:', info.messageId);
    console.log('Response:', info.response);
    console.log('\\n📧 Check your email inbox at info@siteoptz.ai');
    console.log('💡 Also check spam/junk folder if not in inbox');
    
    return true;
  } catch (error) {
    console.error('\\n❌ Failed to send email:', error.message);
    console.error('Full error:', error);
    return false;
  }
}

sendTestEmail().catch(console.error);