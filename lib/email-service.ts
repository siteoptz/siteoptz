// Email Service for Auto-Login Links
import nodemailer from 'nodemailer';
import type { CyfeDashboard } from './cyfe-provisioning';

interface EmailResult {
  success: boolean;
  messageId?: string;
  error?: string;
}

interface AutoLoginEmailParams {
  to: string;
  firstName: string;
  loginUrl: string;
  plan: string;
  dashboards: CyfeDashboard[];
  credentials?: {
    username: string;
    password: string;
  };
}

// Email transporter configuration
const createTransporter = () => {
  // Use SendGrid, AWS SES, or other email service in production
  if (process.env.SENDGRID_API_KEY) {
    return nodemailer.createTransport({
      service: 'SendGrid',
      auth: {
        user: 'apikey',
        pass: process.env.SENDGRID_API_KEY
      }
    });
  }
  
  // Fallback to SMTP configuration
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST || 'smtp.gmail.com',
    port: parseInt(process.env.SMTP_PORT || '587'),
    secure: process.env.SMTP_SECURE === 'true',
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS
    }
  });
};

// Generate plan-specific welcome message
const getPlanWelcomeMessage = (plan: string): string => {
  const messages: Record<string, string> = {
    free: 'Welcome to SiteOptz! Your Basic Analytics dashboard is ready.',
    starter: 'Welcome to SiteOptz Starter! Your Marketing ROI dashboards are ready.',
    pro: 'Welcome to SiteOptz Pro! Your Advanced Analytics suite is ready.',
    enterprise: 'Welcome to SiteOptz Enterprise! Your Executive Command Center is ready.'
  };
  
  return messages[plan] || messages.free;
};

// Generate HTML email template
const generateEmailHTML = (params: AutoLoginEmailParams): string => {
  const { firstName, loginUrl, plan, dashboards, credentials } = params;
  const welcomeMessage = getPlanWelcomeMessage(plan);
  
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Welcome to SiteOptz Analytics</title>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
    .content { background: #ffffff; padding: 30px; border: 1px solid #e2e8f0; border-radius: 0 0 10px 10px; }
    .button { display: inline-block; padding: 14px 28px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; text-decoration: none; border-radius: 6px; font-weight: 600; margin: 20px 0; }
    .button:hover { opacity: 0.9; }
    .dashboard-list { background: #f7fafc; padding: 15px; border-radius: 6px; margin: 20px 0; }
    .dashboard-item { padding: 8px 0; border-bottom: 1px solid #e2e8f0; }
    .dashboard-item:last-child { border-bottom: none; }
    .credentials-box { background: #fef5e7; border: 1px solid #f39c12; padding: 15px; border-radius: 6px; margin: 20px 0; }
    .footer { text-align: center; color: #718096; font-size: 14px; margin-top: 30px; padding-top: 20px; border-top: 1px solid #e2e8f0; }
    .highlight { color: #667eea; font-weight: 600; }
    .security-note { background: #e8f4f8; padding: 12px; border-left: 3px solid #3182ce; margin: 15px 0; font-size: 14px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1 style="margin: 0; font-size: 28px;">🎉 Welcome to SiteOptz Analytics!</h1>
      <p style="margin: 10px 0 0 0; opacity: 0.9;">${welcomeMessage}</p>
    </div>
    
    <div class="content">
      <p>Hi ${firstName},</p>
      
      <p>Your analytics dashboards have been automatically provisioned and are ready to use!</p>
      
      <div style="text-align: center; margin: 30px 0;">
        <a href="${loginUrl}" class="button" style="color: white;">
          🚀 Access Your Dashboards Instantly
        </a>
        <p style="font-size: 14px; color: #718096; margin-top: 10px;">
          No password required - click and you're in!
        </p>
      </div>
      
      <div class="dashboard-list">
        <h3 style="margin-top: 0; color: #2d3748;">Your ${dashboards.length} Dashboard${dashboards.length > 1 ? 's' : ''}:</h3>
        ${dashboards.map(dashboard => `
          <div class="dashboard-item">
            <strong>${dashboard.name}</strong>
            <span style="color: #718096; font-size: 14px;"> - ${dashboard.widgets} widgets</span>
          </div>
        `).join('')}
      </div>
      
      ${credentials ? `
      <div class="credentials-box">
        <h4 style="margin-top: 0; color: #e67e22;">📋 Manual Login Credentials (Save for backup)</h4>
        <p style="margin: 5px 0;"><strong>Username:</strong> <code>${credentials.username}</code></p>
        <p style="margin: 5px 0;"><strong>Password:</strong> <code>${credentials.password}</code></p>
        <p style="font-size: 13px; color: #7f8c8d; margin-top: 10px;">
          Keep these credentials safe. You can use them to login manually if needed.
        </p>
      </div>
      ` : ''}
      
      <div class="security-note">
        <strong>🔒 Security Note:</strong> This auto-login link expires in 7 days. 
        After that, use your credentials or request a new link from your dashboard.
      </div>
      
      <h3 style="color: #2d3748; margin-top: 30px;">What's Next?</h3>
      <ol style="color: #4a5568; line-height: 1.8;">
        <li>Click the button above to instantly access your dashboards</li>
        <li>Customize your widgets and data sources</li>
        <li>Set up automated reports and alerts</li>
        <li>Connect your marketing platforms for real-time data</li>
      </ol>
      
      <h3 style="color: #2d3748; margin-top: 30px;">Your Plan: <span class="highlight">${plan.charAt(0).toUpperCase() + plan.slice(1)}</span></h3>
      <p style="color: #4a5568;">
        ${plan === 'enterprise' ? 
          'As an Enterprise customer, you have unlimited dashboards and premium support. Your dedicated account manager will contact you within 24 hours.' :
          plan === 'pro' ?
          'Your Pro plan includes advanced analytics, predictive models, and priority support.' :
          plan === 'starter' ?
          'Your Starter plan includes marketing ROI tracking and campaign analytics.' :
          'Your Free plan includes basic analytics to get you started.'}
      </p>
      
      <div style="background: #f0f4f8; padding: 20px; border-radius: 6px; margin-top: 30px;">
        <h4 style="margin-top: 0; color: #2d3748;">Need Help?</h4>
        <p style="color: #4a5568; margin: 10px 0;">
          📧 Email: <a href="mailto:support@siteoptz.ai" style="color: #667eea;">support@siteoptz.ai</a><br>
          📚 Docs: <a href="https://docs.siteoptz.ai" style="color: #667eea;">docs.siteoptz.ai</a><br>
          💬 Chat: Available in your dashboard
        </p>
      </div>
    </div>
    
    <div class="footer">
      <p>© ${new Date().getFullYear()} SiteOptz. All rights reserved.</p>
      <p style="margin-top: 10px;">
        <a href="https://siteoptz.ai/privacy" style="color: #718096;">Privacy Policy</a> | 
        <a href="https://siteoptz.ai/terms" style="color: #718096;">Terms of Service</a>
      </p>
      <p style="font-size: 12px; margin-top: 15px; color: #a0aec0;">
        This email was sent because a new account was created for ${params.to}.<br>
        If you didn't request this, please contact support immediately.
      </p>
    </div>
  </div>
</body>
</html>
  `;
};

// Send auto-login email
export async function sendAutoLoginEmail(params: AutoLoginEmailParams): Promise<EmailResult> {
  try {
    const transporter = createTransporter();
    
    // Test transporter connection
    await transporter.verify();
    
    const mailOptions = {
      from: process.env.EMAIL_FROM || '"SiteOptz Analytics" <noreply@siteoptz.ai>',
      to: params.to,
      subject: `🚀 Your SiteOptz ${params.plan.charAt(0).toUpperCase() + params.plan.slice(1)} Analytics Dashboards are Ready!`,
      html: generateEmailHTML(params),
      text: generatePlainTextEmail(params) // Fallback for plain text
    };
    
    const info = await transporter.sendMail(mailOptions);
    
    console.log('Auto-login email sent:', info.messageId);
    
    return {
      success: true,
      messageId: info.messageId
    };
    
  } catch (error: any) {
    console.error('Email send error:', error);
    return {
      success: false,
      error: error.message
    };
  }
}

// Generate plain text version of email
function generatePlainTextEmail(params: AutoLoginEmailParams): string {
  const { firstName, loginUrl, plan, dashboards, credentials } = params;
  const welcomeMessage = getPlanWelcomeMessage(plan);
  
  let text = `
Welcome to SiteOptz Analytics!
================================

Hi ${firstName},

${welcomeMessage}

Your analytics dashboards have been automatically provisioned and are ready to use!

🚀 ACCESS YOUR DASHBOARDS INSTANTLY:
${loginUrl}

(No password required - just click and you're in!)

YOUR DASHBOARDS (${dashboards.length}):
${dashboards.map(d => `- ${d.name} (${d.widgets} widgets)`).join('\n')}
`;

  if (credentials) {
    text += `

MANUAL LOGIN CREDENTIALS (Save for backup):
Username: ${credentials.username}
Password: ${credentials.password}

Keep these credentials safe. You can use them to login manually if needed.
`;
  }

  text += `

SECURITY NOTE: This auto-login link expires in 7 days.

WHAT'S NEXT?
1. Click the link above to instantly access your dashboards
2. Customize your widgets and data sources
3. Set up automated reports and alerts
4. Connect your marketing platforms for real-time data

YOUR PLAN: ${plan.toUpperCase()}

NEED HELP?
Email: support@siteoptz.ai
Docs: https://docs.siteoptz.ai

---
© ${new Date().getFullYear()} SiteOptz. All rights reserved.

This email was sent because a new account was created for ${params.to}.
If you didn't request this, please contact support immediately.
`;

  return text;
}

// Send password reset email
export async function sendPasswordResetEmail(
  email: string, 
  resetUrl: string
): Promise<EmailResult> {
  try {
    const transporter = createTransporter();
    
    const mailOptions = {
      from: process.env.EMAIL_FROM || '"SiteOptz" <noreply@siteoptz.ai>',
      to: email,
      subject: 'Reset Your SiteOptz Password',
      html: `
        <p>You requested a password reset for your SiteOptz account.</p>
        <p>Click the link below to reset your password:</p>
        <a href="${resetUrl}" style="display: inline-block; padding: 12px 24px; background: #667eea; color: white; text-decoration: none; border-radius: 6px;">Reset Password</a>
        <p>This link expires in 1 hour.</p>
        <p>If you didn't request this, please ignore this email.</p>
      `
    };
    
    const info = await transporter.sendMail(mailOptions);
    
    return {
      success: true,
      messageId: info.messageId
    };
    
  } catch (error: any) {
    return {
      success: false,
      error: error.message
    };
  }
}

// Generic email sending function
export async function sendEmail(options: {
  to: string;
  subject: string;
  html: string;
  text?: string;
  from?: string;
}): Promise<EmailResult> {
  try {
    const transporter = createTransporter();
    
    // Test transporter connection
    await transporter.verify();
    
    const mailOptions = {
      from: options.from || process.env.EMAIL_FROM || '"SiteOptz" <noreply@siteoptz.ai>',
      to: options.to,
      subject: options.subject,
      html: options.html,
      text: options.text || options.html.replace(/<[^>]*>/g, '') // Strip HTML for text fallback
    };
    
    const info = await transporter.sendMail(mailOptions);
    
    console.log('Email sent:', info.messageId);
    
    return {
      success: true,
      messageId: info.messageId
    };
    
  } catch (error: any) {
    console.error('Email send error:', error);
    return {
      success: false,
      error: error.message
    };
  }
}

const emailService = { sendAutoLoginEmail, sendPasswordResetEmail, sendEmail };
export default emailService;