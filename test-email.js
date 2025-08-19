const nodemailer = require('nodemailer');
require('dotenv').config({ path: '.env.local' });

async function testEmailConfiguration() {
  console.log('Testing Email Configuration...\n');
  
  // Test with TLS (Port 587)
  console.log('Testing with TLS (Port 587)...');
  const transporterTLS = nodemailer.createTransport({
    host: process.env.EMAIL_SMTP_HOST,
    port: parseInt(process.env.EMAIL_SMTP_PORT),
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.EMAIL_SMTP_USER,
      pass: process.env.EMAIL_SMTP_PASS,
    },
  });

  // Test with SSL (Port 465)
  console.log('Testing with SSL (Port 465)...');
  const transporterSSL = nodemailer.createTransport({
    host: process.env.EMAIL_SMTP_HOST,
    port: parseInt(process.env.EMAIL_SMTP_PORT_SSL || 465),
    secure: true, // true for 465, false for other ports
    auth: {
      user: process.env.EMAIL_SMTP_USER,
      pass: process.env.EMAIL_SMTP_PASS,
    },
  });

  // Verify connections
  try {
    console.log('\nVerifying TLS connection (Port 587)...');
    await transporterTLS.verify();
    console.log('✅ TLS connection successful!');
  } catch (error) {
    console.error('❌ TLS connection failed:', error.message);
  }

  try {
    console.log('\nVerifying SSL connection (Port 465)...');
    await transporterSSL.verify();
    console.log('✅ SSL connection successful!');
  } catch (error) {
    console.error('❌ SSL connection failed:', error.message);
  }

  // Send test email with working configuration
  const testMailOptions = {
    from: process.env.EMAIL_FROM,
    to: process.env.EMAIL_SMTP_USER, // Send to self for testing
    subject: 'Test Email from SiteOptz',
    text: 'This is a test email to verify the email configuration is working correctly.',
    html: '<h1>Test Email</h1><p>This is a test email to verify the email configuration is working correctly.</p><p>Sent from SiteOptz.ai</p>',
  };

  console.log('\nAttempting to send test email...');
  
  // Try TLS first
  try {
    const info = await transporterTLS.sendMail(testMailOptions);
    console.log('✅ Email sent successfully via TLS (Port 587)!');
    console.log('Message ID:', info.messageId);
    console.log('Preview URL:', nodemailer.getTestMessageUrl(info));
  } catch (error) {
    console.error('❌ Failed to send via TLS:', error.message);
    
    // Try SSL if TLS fails
    try {
      const info = await transporterSSL.sendMail(testMailOptions);
      console.log('✅ Email sent successfully via SSL (Port 465)!');
      console.log('Message ID:', info.messageId);
      console.log('Preview URL:', nodemailer.getTestMessageUrl(info));
    } catch (sslError) {
      console.error('❌ Failed to send via SSL:', sslError.message);
    }
  }

  console.log('\n📧 Email Configuration Summary:');
  console.log('Host:', process.env.EMAIL_SMTP_HOST);
  console.log('TLS Port:', process.env.EMAIL_SMTP_PORT);
  console.log('SSL Port:', process.env.EMAIL_SMTP_PORT_SSL);
  console.log('User:', process.env.EMAIL_SMTP_USER);
  console.log('From:', process.env.EMAIL_FROM);
}

testEmailConfiguration().catch(console.error);