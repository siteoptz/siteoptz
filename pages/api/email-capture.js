import { MongoClient } from 'mongodb';
const { sendEmail } = require('../../lib/email-service');

// GoHighLevel API configuration
const GHL_API_KEY = process.env.GHL_API_KEY || '';
const GHL_LOCATION_ID = process.env.GHL_LOCATION_ID || '';
const GHL_API_BASE = 'https://services.leadconnectorhq.com';

// Database configuration
const MONGODB_URI = process.env.MONGODB_URI;
const DB_NAME = process.env.DB_NAME || 'siteoptz';

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

// Add lead to GoHighLevel CRM
const addToGoHighLevel = async (data) => {
  try {
    console.log('=== GoHighLevel Contact Form Integration Debug ===');
    console.log('API Key exists:', !!GHL_API_KEY);
    console.log('API Key length:', GHL_API_KEY.length);
    console.log('Location ID:', GHL_LOCATION_ID);
    console.log('Environment:', process.env.NODE_ENV);
    
    // Handle different submission types
    let ghlData = {
      locationId: GHL_LOCATION_ID,
    };
    
    if (data.additionalData?.contactForm) {
      // Contact form submission
      const { additionalData } = data;
      ghlData = {
        ...ghlData,
        firstName: additionalData.senderName?.split(' ')[0] || '',
        lastName: additionalData.senderName?.split(' ').slice(1).join(' ') || '',
        email: additionalData.senderEmail,
        phone: additionalData.senderPhone || '',
        tags: [
          'New Lead',  // This tag triggers the 'New Lead Workflow'
          'Contact Form Submission',
          `Inquiry: ${additionalData.inquiryType}`,
          `Subject: ${additionalData.subject}`,
          `Submitted: ${new Date().toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}`
        ],
        customField: {
          company: additionalData.senderCompany || '',
          inquiryType: additionalData.inquiryType,
          subject: additionalData.subject,
          message: additionalData.message,
          submissionDate: new Date().toISOString(),
          source: 'Contact Form - SiteOptz Website'
        },
        source: 'Contact Form - SiteOptz Website',
      };
    } else if (data.additionalData?.subscriberEmail) {
      // Newsletter subscription
      const { additionalData } = data;
      ghlData = {
        ...ghlData,
        firstName: additionalData.subscriberName?.split(' ')[0] || '',
        lastName: additionalData.subscriberName?.split(' ').slice(1).join(' ') || '',
        email: additionalData.subscriberEmail,
        phone: '',
        tags: [
          'New Lead',  // This tag triggers the 'New Lead Workflow'
          'Newsletter Subscription',
          `Source: ${data.source}`,
          ...(additionalData.tool ? [`Tool: ${additionalData.tool}`] : []),
          ...(additionalData.category ? [`Category: ${additionalData.category}`] : []),
          ...(additionalData.useCase ? [`Use Case: ${additionalData.useCase}`] : []),
          `Subscribed: ${new Date().toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}`
        ],
        customField: {
          company: additionalData.subscriberCompany || '',
          useCase: additionalData.useCase || '',
          interests: additionalData.interests?.join(', ') || '',
          tool: additionalData.tool || '',
          category: additionalData.category || '',
          subscriptionDate: new Date().toISOString(),
          source: data.source
        },
        source: 'Newsletter Subscription - SiteOptz Website',
      };
    } else {
      // Pricing quote or other submission
      ghlData = {
        ...ghlData,
        firstName: '',
        lastName: '',
        email: data.email,
        phone: '',
        tags: [
          'New Lead',  // This tag triggers the 'New Lead Workflow'
          'Pricing Quote Request',
          `Tool: ${data.tool}`,
          `Cost: ${data.calculatedCost ? `$${data.calculatedCost}` : 'Custom'}`,
          ...(data.users ? [`Users: ${data.users}`] : []),
          ...(data.planType ? [`Plan: ${data.planType}`] : []),
          `Requested: ${new Date().toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}`
        ],
        customField: {
          tool: data.tool,
          calculatedCost: data.calculatedCost?.toString() || '',
          users: data.users?.toString() || '',
          planType: data.planType || '',
          selectedPlan: data.selectedPlan || '',
          requestDate: new Date().toISOString(),
          source: data.source
        },
        source: 'Pricing Quote - SiteOptz Website',
      };
    }

    console.log('Sending contact form data to GoHighLevel:', JSON.stringify(ghlData, null, 2));

    const response = await fetch(`${GHL_API_BASE}/contacts/`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${GHL_API_KEY}`,
        'Content-Type': 'application/json',
        'Version': '2021-04-15',
      },
      body: JSON.stringify(ghlData),
    });

    console.log('GoHighLevel Contact Form API Response Status:', response.status);
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error('GoHighLevel Contact Form API error:', errorText);
      throw new Error(`GoHighLevel API error: ${response.status} - ${errorText}`);
    }

    const result = await response.json();
    console.log('GoHighLevel Contact Form Success:', result);
    console.log('Contact ID:', result.contact?.id);
    console.log('=======================================================');
    return result;
  } catch (error) {
    console.error('Error adding contact form lead to GoHighLevel:', error);
    return null;
  }
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

// Prepare and send email
const prepareAndSendEmail = async (data) => {
  const { email, tool, calculatedCost, users, planType, source, additionalData } = data;
  
  // Handle different email types
  let subject, htmlContent, textContent;
  
  if (additionalData?.contactForm) {
    // Contact form notification to info@siteoptz.com
    subject = `New Contact Form Submission: ${additionalData.subject}`;
    htmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <title>New Contact Form Submission</title>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: #f8f9fa; padding: 20px; border-radius: 8px; margin-bottom: 20px; }
          .content { background: white; padding: 20px; border: 1px solid #dee2e6; border-radius: 8px; }
          .field { margin-bottom: 15px; padding-bottom: 15px; border-bottom: 1px solid #eee; }
          .field:last-child { border-bottom: none; }
          .label { font-weight: bold; color: #495057; margin-bottom: 5px; }
          .value { color: #212529; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>📧 New Contact Form Submission</h1>
            <p>Received: ${new Date().toLocaleString()}</p>
          </div>
          
          <div class="content">
            <div class="field">
              <div class="label">Name:</div>
              <div class="value">${additionalData.senderName || 'Not provided'}</div>
            </div>
            
            <div class="field">
              <div class="label">Email:</div>
              <div class="value">${additionalData.senderEmail}</div>
            </div>
            
            <div class="field">
              <div class="label">Company:</div>
              <div class="value">${additionalData.senderCompany || 'Not provided'}</div>
            </div>
            
            <div class="field">
              <div class="label">Inquiry Type:</div>
              <div class="value">${additionalData.inquiryType}</div>
            </div>
            
            <div class="field">
              <div class="label">Subject:</div>
              <div class="value">${additionalData.subject}</div>
            </div>
            
            <div class="field">
              <div class="label">Message:</div>
              <div class="value" style="white-space: pre-wrap;">${additionalData.message}</div>
            </div>
          </div>
        </div>
      </body>
      </html>
    `;
    
    textContent = `
New Contact Form Submission

Name: ${additionalData.senderName || 'Not provided'}
Email: ${additionalData.senderEmail}
Company: ${additionalData.senderCompany || 'Not provided'}
Inquiry Type: ${additionalData.inquiryType}
Subject: ${additionalData.subject}

Message:
${additionalData.message}

Received: ${new Date().toLocaleString()}
    `;
  } else if (additionalData?.isConfirmation) {
    // Confirmation email to sender
    subject = `Thank you for contacting SiteOptz - We'll be in touch soon!`;
    htmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <title>Thank you for contacting us</title>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
          .content { background: #f8f9fa; padding: 30px; border-radius: 0 0 10px 10px; }
          .highlight { background: white; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #667eea; }
          .footer { text-align: center; padding: 20px; color: #666; font-size: 14px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Thank You, ${additionalData.name}! 🎉</h1>
            <p>We've received your message and appreciate you reaching out.</p>
          </div>
          
          <div class="content">
            <h2>What happens next?</h2>
            <ul>
              <li>✅ Our team will review your inquiry within 24 hours</li>
              <li>✅ We'll respond with detailed information or next steps</li>
              <li>✅ For urgent matters, we'll prioritize your request</li>
            </ul>
            
            <div class="highlight">
              <h3>Your inquiry summary:</h3>
              <p><strong>Subject:</strong> ${additionalData.originalSubject}</p>
              <p><strong>Message:</strong> ${additionalData.originalMessage.substring(0, 200)}${additionalData.originalMessage.length > 200 ? '...' : ''}</p>
            </div>
            
            <p>In the meantime, feel free to explore our AI tools directory or read our latest reviews.</p>
            
            <p style="text-align: center;">
              <a href="https://siteoptz.ai/tools" style="display: inline-block; background: #667eea; color: white; padding: 12px 30px; text-decoration: none; border-radius: 6px; margin: 10px;">
                Browse AI Tools
              </a>
            </p>
          </div>
          
          <div class="footer">
            <p>© 2025 SiteOptz. All rights reserved.</p>
            <p>If you have any urgent questions, reply directly to this email.</p>
          </div>
        </div>
      </body>
      </html>
    `;
    
    textContent = `
Thank You, ${additionalData.name}!

We've received your message and appreciate you reaching out.

What happens next?
- Our team will review your inquiry within 24 hours
- We'll respond with detailed information or next steps
- For urgent matters, we'll prioritize your request

Your inquiry summary:
Subject: ${additionalData.originalSubject}
Message: ${additionalData.originalMessage.substring(0, 200)}${additionalData.originalMessage.length > 200 ? '...' : ''}

In the meantime, feel free to explore our AI tools directory at https://siteoptz.ai/tools

© 2025 SiteOptz. All rights reserved.
If you have any urgent questions, reply directly to this email.
    `;
  } else if (additionalData?.subscriberEmail) {
    // Newsletter subscription notification to info@siteoptz.com
    subject = `New Newsletter Subscription: ${additionalData.subscriberEmail}`;
    htmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <title>New Newsletter Subscription</title>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: #e3f2fd; padding: 20px; border-radius: 8px; margin-bottom: 20px; }
          .content { background: white; padding: 20px; border: 1px solid #dee2e6; border-radius: 8px; }
          .field { margin-bottom: 10px; }
          .label { font-weight: bold; color: #495057; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>📧 New Newsletter Subscription</h1>
            <p>Someone just subscribed to the SiteOptz newsletter!</p>
          </div>
          
          <div class="content">
            <div class="field">
              <span class="label">Email:</span> ${additionalData.subscriberEmail}
            </div>
            <div class="field">
              <span class="label">Name:</span> ${additionalData.subscriberName || 'Not provided'}
            </div>
            <div class="field">
              <span class="label">Company:</span> ${additionalData.subscriberCompany || 'Not provided'}
            </div>
            <div class="field">
              <span class="label">Use Case:</span> ${additionalData.useCase || 'Not specified'}
            </div>
            <div class="field">
              <span class="label">Interests:</span> ${additionalData.interests?.join(', ') || 'None specified'}
            </div>
            <div class="field">
              <span class="label">Source:</span> ${source}
            </div>
            <div class="field">
              <span class="label">Tool/Category:</span> ${additionalData.tool || additionalData.category || 'General'}
            </div>
            <div class="field">
              <span class="label">Timestamp:</span> ${new Date().toLocaleString()}
            </div>
          </div>
        </div>
      </body>
      </html>
    `;
    
    textContent = `
New Newsletter Subscription

Email: ${additionalData.subscriberEmail}
Name: ${additionalData.subscriberName || 'Not provided'}
Company: ${additionalData.subscriberCompany || 'Not provided'}
Use Case: ${additionalData.useCase || 'Not specified'}
Interests: ${additionalData.interests?.join(', ') || 'None specified'}
Source: ${source}
Tool/Category: ${additionalData.tool || additionalData.category || 'General'}
Timestamp: ${new Date().toLocaleString()}
    `;
  } else {
    // Default pricing quote email
    subject = `Your ${tool} Pricing Quote - ${calculatedCost ? `$${calculatedCost}` : 'Custom Pricing'}`;
    htmlContent = `
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
  }

  try {
    const result = await sendEmail({
      to: email,
      subject,
      html: htmlContent,
      text: textContent
    });
    
    if (result.success) {
      console.log('Email sent successfully to:', email);
      
      // Send notification to info@siteoptz.ai for new submissions
      if (additionalData?.contactForm || additionalData?.subscriberEmail) {
        const notificationEmail = additionalData?.contactForm ? 
          `New Contact: ${additionalData.senderEmail}` : 
          `New Subscriber: ${additionalData.subscriberEmail}`;
          
        await sendEmail({
          to: 'info@siteoptz.ai',
          subject: notificationEmail,
          html: htmlContent,
          text: textContent
        });
      }
      
      return { success: true, provider: 'nodemailer' };
    } else {
      throw new Error(result.error || 'Failed to send email');
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

    // Save to database, send email, and add to GoHighLevel (all in parallel)
    const [dbResult, emailResult, ghlResult] = await Promise.allSettled([
      saveToDatabase(emailData),
      prepareAndSendEmail(emailData),
      addToGoHighLevel(emailData)
    ]);

    // Check results
    const dbSuccess = dbResult.status === 'fulfilled' && dbResult.value.success;
    const emailSuccess = emailResult.status === 'fulfilled' && emailResult.value.success;
    const ghlSuccess = ghlResult.status === 'fulfilled' && !!ghlResult.value;

    console.log('=== Contact Form Processing Results ===');
    console.log('Database:', dbSuccess ? 'success' : 'failed');
    console.log('Email:', emailSuccess ? 'success' : 'failed');
    console.log('GoHighLevel:', ghlSuccess ? 'success' : 'failed');
    console.log('GHL Contact ID:', ghlResult.value?.contact?.id || 'N/A');
    console.log('========================================');

    if (!dbSuccess && !emailSuccess && !ghlSuccess) {
      return res.status(500).json({
        success: false,
        error: 'Failed to process request. Please try again.',
        details: {
          database: dbResult.reason || dbResult.value?.error,
          email: emailResult.reason || emailResult.value?.error,
          gohighlevel: ghlResult.reason || 'Failed to create contact'
        }
      });
    }

    // Success response
    return res.status(200).json({
      success: true,
      message: 'Request processed successfully!',
      details: {
        email: emailSuccess ? 'sent' : 'failed',
        database: dbSuccess ? 'saved' : 'failed',
        gohighlevel: ghlSuccess ? 'created' : 'failed',
        ghlContactId: ghlResult.value?.contact?.id || null,
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