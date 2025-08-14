import { MongoClient } from 'mongodb';

// Email service configuration (you can switch between different providers)
const EMAIL_PROVIDER = process.env.EMAIL_PROVIDER || 'sendgrid'; // 'sendgrid', 'postmark', 'mailgun'

// Database configuration
const MONGODB_URI = process.env.MONGODB_URI;
const DB_NAME = process.env.DB_NAME || 'siteoptz';

// Email service imports and configurations
let emailService;

if (EMAIL_PROVIDER === 'sendgrid') {
  const sgMail = require('@sendgrid/mail');
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
  emailService = sgMail;
} else if (EMAIL_PROVIDER === 'postmark') {
  const postmark = require('postmark');
  emailService = new postmark.ServerClient(process.env.POSTMARK_API_TOKEN);
}

// Rate limiting in-memory store (use Redis in production)
const rateLimitStore = new Map();

// Rate limiting function
const isRateLimited = (ip) => {
  const now = Date.now();
  const windowMs = 15 * 60 * 1000; // 15 minutes
  const maxRequests = 5; // 5 requests per window

  if (!rateLimitStore.has(ip)) {
    rateLimitStore.set(ip, { count: 1, resetTime: now + windowMs });
    return false;
  }

  const data = rateLimitStore.get(ip);
  
  if (now > data.resetTime) {
    rateLimitStore.set(ip, { count: 1, resetTime: now + windowMs });
    return false;
  }

  if (data.count >= maxRequests) {
    return true;
  }

  data.count++;
  return false;
};

// Email validation
const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Save to database
const saveToDatabase = async (data) => {
  if (!MONGODB_URI) {
    console.log('No MongoDB URI provided, skipping database save');
    return { success: true, id: 'mock-id' };
  }

  const client = new MongoClient(MONGODB_URI);
  
  try {
    await client.connect();
    const db = client.db(DB_NAME);
    const collection = db.collection('email_captures');
    
    const document = {
      ...data,
      createdAt: new Date(),
      updatedAt: new Date(),
      status: 'active'
    };
    
    const result = await collection.insertOne(document);
    return { success: true, id: result.insertedId };
  } catch (error) {
    console.error('Database save error:', error);
    return { success: false, error: error.message };
  } finally {
    await client.close();
  }
};

// Send email based on provider
const sendEmail = async (data) => {
  const { email, tool, calculatedCost, users, planType, source } = data;
  
  const subject = `Your ${tool} Pricing Quote - ${calculatedCost ? `$${calculatedCost}` : 'Custom Pricing'}`;
  
  const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>${subject}</title>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
        .content { background: #f8f9fa; padding: 30px; border-radius: 0 0 10px 10px; }
        .quote-box { background: white; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #667eea; }
        .feature-list { list-style: none; padding: 0; }
        .feature-list li { padding: 8px 0; border-bottom: 1px solid #eee; }
        .cta-button { display: inline-block; background: #667eea; color: white; padding: 12px 30px; text-decoration: none; border-radius: 6px; margin: 20px 0; }
        .footer { text-align: center; padding: 20px; color: #666; font-size: 14px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>Your ${tool} Pricing Quote</h1>
          <p>Thank you for your interest in ${tool}!</p>
        </div>
        
        <div class="content">
          <h2>Quote Summary</h2>
          <div class="quote-box">
            <h3>Configuration Details:</h3>
            <ul class="feature-list">
              <li><strong>Tool:</strong> ${tool}</li>
              ${users ? `<li><strong>Users:</strong> ${users}</li>` : ''}
              ${planType ? `<li><strong>Billing:</strong> ${planType}</li>` : ''}
              ${calculatedCost ? `<li><strong>Estimated Cost:</strong> $${calculatedCost}${planType === 'yearly' ? '/year' : '/month'}</li>` : ''}
              <li><strong>Source:</strong> ${source}</li>
            </ul>
          </div>
          
          <h3>Next Steps:</h3>
          <ol>
            <li>Review your quote details above</li>
            <li>Visit the official ${tool} website to start your free trial</li>
            <li>Contact their support team for enterprise pricing</li>
            <li>Check our comparison guides for alternatives</li>
          </ol>
          
          <a href="https://siteoptz.ai/tools" class="cta-button">Explore More AI Tools</a>
          
          <h3>Why Choose SiteOptz?</h3>
          <ul>
            <li>✅ Unbiased AI tool reviews</li>
            <li>✅ Real pricing comparisons</li>
            <li>✅ Expert recommendations</li>
            <li>✅ Regular updates and new tools</li>
          </ul>
          
          <p><strong>Need help choosing?</strong> Reply to this email and our team will help you find the perfect AI tool for your needs.</p>
        </div>
        
        <div class="footer">
          <p>© 2025 SiteOptz. All rights reserved.</p>
          <p>This email was sent because you requested a pricing quote on our website.</p>
          <p><a href="https://siteoptz.ai/unsubscribe?email=${encodeURIComponent(email)}">Unsubscribe</a> | <a href="https://siteoptz.ai/privacy">Privacy Policy</a></p>
        </div>
      </div>
    </body>
    </html>
  `;

  const textContent = `
Your ${tool} Pricing Quote

Thank you for your interest in ${tool}!

Configuration Details:
- Tool: ${tool}
${users ? `- Users: ${users}` : ''}
${planType ? `- Billing: ${planType}` : ''}
${calculatedCost ? `- Estimated Cost: $${calculatedCost}${planType === 'yearly' ? '/year' : '/month'}` : ''}
- Source: ${source}

Next Steps:
1. Review your quote details above
2. Visit the official ${tool} website to start your free trial
3. Contact their support team for enterprise pricing
4. Check our comparison guides for alternatives

Visit https://siteoptz.ai/tools to explore more AI tools.

Need help choosing? Reply to this email and our team will help you find the perfect AI tool for your needs.

© 2025 SiteOptz. All rights reserved.
Unsubscribe: https://siteoptz.ai/unsubscribe?email=${encodeURIComponent(email)}
  `;

  try {
    if (EMAIL_PROVIDER === 'sendgrid' && emailService) {
      const msg = {
        to: email,
        from: {
          email: process.env.FROM_EMAIL || 'noreply@siteoptz.ai',
          name: 'SiteOptz Team'
        },
        subject,
        text: textContent,
        html: htmlContent,
        trackingSettings: {
          clickTracking: { enable: true },
          openTracking: { enable: true }
        }
      };
      
      await emailService.send(msg);
      return { success: true, provider: 'sendgrid' };
      
    } else if (EMAIL_PROVIDER === 'postmark' && emailService) {
      await emailService.sendEmail({
        From: process.env.FROM_EMAIL || 'noreply@siteoptz.ai',
        To: email,
        Subject: subject,
        HtmlBody: htmlContent,
        TextBody: textContent,
        MessageStream: 'outbound',
        TrackOpens: true,
        TrackLinks: 'HtmlAndText'
      });
      
      return { success: true, provider: 'postmark' };
    } else {
      // Fallback: log email (for development)
      console.log('Email would be sent:', { email, subject, tool });
      return { success: true, provider: 'console' };
    }
  } catch (error) {
    console.error('Email send error:', error);
    return { success: false, error: error.message };
  }
};

export default async function handler(req, res) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ 
      success: false, 
      error: 'Method not allowed. Use POST.' 
    });
  }

  // Get client IP for rate limiting
  const clientIp = req.headers['x-forwarded-for'] || 
                   req.headers['x-real-ip'] || 
                   req.connection.remoteAddress || 
                   'unknown';

  // Rate limiting
  if (isRateLimited(clientIp)) {
    return res.status(429).json({
      success: false,
      error: 'Too many requests. Please try again later.',
      retryAfter: 900 // 15 minutes
    });
  }

  try {
    const { 
      email, 
      tool, 
      calculatedCost, 
      users, 
      planType, 
      selectedPlan,
      source = 'unknown',
      additionalData = {} 
    } = req.body;

    // Validation
    if (!email) {
      return res.status(400).json({
        success: false,
        error: 'Email is required'
      });
    }

    if (!isValidEmail(email)) {
      return res.status(400).json({
        success: false,
        error: 'Please provide a valid email address'
      });
    }

    if (!tool) {
      return res.status(400).json({
        success: false,
        error: 'Tool name is required'
      });
    }

    // Prepare data for storage and email
    const emailData = {
      email: email.toLowerCase().trim(),
      tool,
      calculatedCost,
      users,
      planType,
      selectedPlan,
      source,
      additionalData,
      ip: clientIp,
      userAgent: req.headers['user-agent'],
      timestamp: new Date().toISOString()
    };

    // Save to database (parallel with email sending)
    const [dbResult, emailResult] = await Promise.allSettled([
      saveToDatabase(emailData),
      sendEmail(emailData)
    ]);

    // Check results
    const dbSuccess = dbResult.status === 'fulfilled' && dbResult.value.success;
    const emailSuccess = emailResult.status === 'fulfilled' && emailResult.value.success;

    if (!dbSuccess && !emailSuccess) {
      return res.status(500).json({
        success: false,
        error: 'Failed to process request. Please try again.',
        details: {
          database: dbResult.reason || dbResult.value?.error,
          email: emailResult.reason || emailResult.value?.error
        }
      });
    }

    // Success response
    return res.status(200).json({
      success: true,
      message: 'Quote sent successfully!',
      details: {
        email: emailSuccess ? 'sent' : 'failed',
        database: dbSuccess ? 'saved' : 'failed',
        tool,
        timestamp: new Date().toISOString()
      }
    });

  } catch (error) {
    console.error('Email capture error:', error);
    
    return res.status(500).json({
      success: false,
      error: 'Internal server error. Please try again later.',
      timestamp: new Date().toISOString()
    });
  }
}

// Export configuration for Next.js
export const config = {
  api: {
    bodyParser: {
      sizeLimit: '1mb',
    },
  },
};