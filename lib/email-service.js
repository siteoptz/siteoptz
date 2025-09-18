// Email service with SendGrid and SMTP fallback
let transporter = null;
let sendgridClient = null;

function getTransporter() {
  if (!transporter) {
    const nodemailer = require('nodemailer');
    transporter = nodemailer.createTransport({
      host: process.env.EMAIL_SMTP_HOST || 'smtp.gmail.com',
      port: parseInt(process.env.EMAIL_SMTP_PORT || '587'),
      secure: false, // true for 465, false for other ports
      auth: {
        user: process.env.EMAIL_SMTP_USER,
        pass: process.env.EMAIL_SMTP_PASS,
      },
      tls: {
        // do not fail on invalid certs
        rejectUnauthorized: false
      }
    });
  }
  return transporter;
}

function getSendGridClient() {
  if (!sendgridClient && process.env.SENDGRID_API_KEY) {
    const sgMail = require('@sendgrid/mail');
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);
    sendgridClient = sgMail;
  }
  return sendgridClient;
}

async function sendEmailWithSendGrid({ to, subject, html, text, from, bcc }) {
  try {
    const sgMail = getSendGridClient();
    if (!sgMail) {
      throw new Error('SendGrid client not initialized');
    }

    const msg = {
      to,
      from: from || `"SiteOptz AI" <${process.env.EMAIL_FROM || 'info@siteoptz.ai'}>`,
      subject,
      text,
      html,
    };

    // Add BCC if provided
    if (bcc) {
      msg.bcc = bcc;
    }

    const response = await sgMail.send(msg);
    console.log('SendGrid email sent successfully:', response[0].headers['x-message-id']);
    return { 
      success: true, 
      messageId: response[0].headers['x-message-id'],
      provider: 'sendgrid'
    };
  } catch (error) {
    console.error('SendGrid email sending failed:', error.response?.body || error.message);
    return { 
      success: false, 
      error: error.response?.body?.errors?.[0]?.message || error.message,
      provider: 'sendgrid'
    };
  }
}

async function sendEmailWithSMTP({ to, subject, html, text, from, bcc }) {
  try {
    // Check if SMTP is properly configured
    if (process.env.EMAIL_SMTP_USER === 'disabled_for_testing' || 
        process.env.EMAIL_SMTP_PASS === 'disabled_for_testing' ||
        !process.env.EMAIL_SMTP_USER || 
        !process.env.EMAIL_SMTP_PASS) {
      console.log('📧 SMTP not configured, logging email instead:');
      console.log('To:', to);
      console.log('Subject:', subject);
      console.log('From:', from || process.env.EMAIL_FROM);
      console.log('Text:', text);
      console.log('BCC:', bcc);
      return { 
        success: true, 
        messageId: 'mock-' + Date.now(),
        provider: 'smtp-mock'
      };
    }
    
    const transporter = getTransporter();
    
    const mailOptions = {
      from: from || `"SiteOptz AI" <${process.env.EMAIL_FROM || 'info@siteoptz.ai'}>`,
      to,
      subject,
      text,
      html,
    };

    // Add BCC if provided
    if (bcc) {
      mailOptions.bcc = bcc;
    }

    const info = await transporter.sendMail(mailOptions);
    console.log('SMTP email sent successfully:', info.messageId);
    return { 
      success: true, 
      messageId: info.messageId,
      provider: 'smtp'
    };
  } catch (error) {
    console.error('SMTP email sending failed:', error.message);
    return { 
      success: false, 
      error: error.message,
      provider: 'smtp'
    };
  }
}

async function sendEmail({ to, subject, html, text, from, bcc }) {
  console.log('🔄 Starting email service...');
  console.log('Email parameters:', { to, subject, from, hasHtml: !!html, hasText: !!text, bcc });
  
  // Check environment variables
  console.log('Environment check:');
  console.log('- EMAIL_PROVIDER:', process.env.EMAIL_PROVIDER);
  console.log('- SENDGRID_API_KEY:', process.env.SENDGRID_API_KEY ? 'Set' : 'Missing');
  console.log('- EMAIL_SMTP_USER:', process.env.EMAIL_SMTP_USER ? 'Set' : 'Missing');
  console.log('- EMAIL_SMTP_PASS:', process.env.EMAIL_SMTP_PASS ? 'Set' : 'Missing');
  console.log('- EMAIL_FROM:', process.env.EMAIL_FROM);
  
  // Determine which email provider to use
  const useProvider = process.env.EMAIL_PROVIDER || 'sendgrid';
  
  console.log(`📤 Attempting to send email via ${useProvider.toUpperCase()}`);
  
  try {
    let result;
    
    if (useProvider === 'console') {
      // Console provider for development - logs email instead of sending
      console.log('📧 ========== EMAIL LOG (Console Provider) ==========');
      console.log('To:', to);
      console.log('Subject:', subject);
      console.log('From:', from || `"SiteOptz AI" <${process.env.EMAIL_FROM || 'info@siteoptz.ai'}>`);
      if (bcc) console.log('BCC:', bcc);
      console.log('--- EMAIL CONTENT ---');
      if (text) {
        console.log('TEXT VERSION:');
        console.log(text);
        console.log('');
      }
      if (html) {
        console.log('HTML VERSION:');
        console.log(html);
      }
      console.log('📧 ================================================');
      return { 
        success: true, 
        messageId: 'console-' + Date.now(),
        provider: 'console'
      };
    } else if (useProvider === 'sendgrid' && process.env.SENDGRID_API_KEY) {
      // Try SendGrid first
      result = await sendEmailWithSendGrid({ to, subject, html, text, from, bcc });
      
      if (!result.success) {
        console.log('SendGrid failed, falling back to SMTP...');
        result = await sendEmailWithSMTP({ to, subject, html, text, from, bcc });
      }
    } else {
      // Use SMTP as primary or fallback
      result = await sendEmailWithSMTP({ to, subject, html, text, from, bcc });
      
      if (!result.success && process.env.SENDGRID_API_KEY) {
        console.log('SMTP failed, falling back to SendGrid...');
        result = await sendEmailWithSendGrid({ to, subject, html, text, from, bcc });
      }
    }

    if (result.success) {
      console.log(`Email sent successfully via ${result.provider.toUpperCase()}:`, result.messageId);
    }
    
    return result;
  } catch (error) {
    console.error('All email providers failed:', error.message);
    return { success: false, error: error.message };
  }
}

module.exports = { sendEmail, getTransporter };