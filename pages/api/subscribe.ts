import { NextApiRequest, NextApiResponse } from 'next';
import { z } from 'zod';
const { sendEmail } = require('../../lib/email-service');

// GoHighLevel API configuration
const GHL_API_KEY = process.env.GHL_API_KEY || '';
const GHL_LOCATION_ID = process.env.GHL_LOCATION_ID || '';
const GHL_API_BASE = 'https://rest.gohighlevel.com/v1';

// Input validation schema
const subscribeSchema = z.object({
  email: z.string().email('Invalid email address'),
  source: z.string().optional().default('unknown'),
  tool: z.string().optional(),
  category: z.string().optional(),
  interests: z.array(z.string()).optional().default([]),
  name: z.string().optional(),
  company: z.string().optional(),
  useCase: z.string().optional(),
  referrer: z.string().optional()
});

interface SubscriptionData {
  email: string;
  source: string;
  tool?: string;
  category?: string;
  interests: string[];
  name?: string;
  company?: string;
  useCase?: string;
  referrer?: string;
  timestamp: string;
  ip_address?: string;
  user_agent?: string;
}

interface ApiResponse {
  message: string;
  data?: {
    email: string;
    subscription_id?: string;
  };
  error?: string;
}

// Email validation utility
function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Rate limiting (simple in-memory store - use Redis in production)
const rateLimitStore = new Map<string, { count: number; resetTime: number }>();

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const windowMs = 15 * 60 * 1000; // 15 minutes
  const maxRequests = 5; // 5 requests per 15 minutes per IP
  
  const current = rateLimitStore.get(ip);
  
  if (!current || now > current.resetTime) {
    rateLimitStore.set(ip, { count: 1, resetTime: now + windowMs });
    return true;
  }
  
  if (current.count >= maxRequests) {
    return false;
  }
  
  current.count++;
  return true;
}

// GoHighLevel CRM Integration
async function addToGoHighLevel(data: SubscriptionData): Promise<{ success: boolean; id?: string }> {
  try {
    const ghlData = {
      firstName: data.name?.split(' ')[0] || '',
      lastName: data.name?.split(' ').slice(1).join(' ') || '',
      email: data.email,
      phone: '',
      tags: [
        'New Lead',  // This tag triggers the 'New Lead Workflow'
        'Newsletter Subscription',
        `Source: ${data.source}`,
        ...(data.tool ? [`Tool Interest: ${data.tool}`] : []),
        ...(data.category ? [`Category: ${data.category}`] : []),
        ...(data.useCase ? [`Use Case: ${data.useCase}`] : []),
        ...data.interests.map(interest => `Interest: ${interest}`),
        `Subscribed: ${new Date().toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}`
      ],
      customField: {
        company: data.company || '',
        source: data.source,
        toolInterest: data.tool || '',
        category: data.category || '',
        useCase: data.useCase || '',
        interests: data.interests.join(', '),
        subscriptionDate: data.timestamp,
        referrer: data.referrer || ''
      },
      source: 'Newsletter Subscription - SiteOptz Website',
      locationId: GHL_LOCATION_ID,
    };

    const response = await fetch(`${GHL_API_BASE}/contacts/`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${GHL_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(ghlData),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('GoHighLevel API error:', errorText);
      throw new Error(`GoHighLevel API error: ${response.status}`);
    }

    const result = await response.json();
    console.log('Successfully added to GoHighLevel:', result.contact?.id);
    return { success: true, id: result.contact?.id };
  } catch (error) {
    console.error('Error adding lead to GoHighLevel:', error);
    return { success: false };
  }
}

// CRM Integration Functions (implement based on your provider)
async function addToMailchimp(data: SubscriptionData): Promise<{ success: boolean; id?: string }> {
  // Check if Mailchimp is configured
  if (!process.env.MAILCHIMP_API_KEY || !process.env.MAILCHIMP_LIST_ID || !process.env.MAILCHIMP_SERVER_PREFIX) {
    console.log('Mailchimp not configured, skipping...');
    return { success: true, id: `mock_mc_${Date.now()}` };
  }

  try {
    const mailchimp = require('@mailchimp/mailchimp_marketing');
    mailchimp.setConfig({
      apiKey: process.env.MAILCHIMP_API_KEY,
      server: process.env.MAILCHIMP_SERVER_PREFIX,
    });
  
    const response = await mailchimp.lists.addListMember(process.env.MAILCHIMP_LIST_ID, {
      email_address: data.email,
      status: 'subscribed',
      merge_fields: {
        FNAME: data.name?.split(' ')[0] || '',
        LNAME: data.name?.split(' ').slice(1).join(' ') || '',
        COMPANY: data.company || '',
        SOURCE: data.source,
        TOOL: data.tool || '',
        INTERESTS: data.interests.join(', '),
        USECASE: data.useCase || ''
      },
      tags: [
        data.source,
        ...(data.tool ? [`tool:${data.tool}`] : []),
        ...(data.useCase ? [`usecase:${data.useCase}`] : []),
        ...data.interests.map(interest => `interest:${interest}`)
      ]
    });
    
    console.log('Successfully added to Mailchimp:', response.id);
    return { success: true, id: response.id };
  } catch (error: any) {
    // Handle duplicate email gracefully
    if (error.status === 400 && error.response?.body?.title === 'Member Exists') {
      console.log('Email already exists in Mailchimp, updating...');
      try {
        const mailchimp = require('@mailchimp/mailchimp_marketing');
        const emailHash = require('crypto').createHash('md5').update(data.email.toLowerCase()).digest('hex');
        
        await mailchimp.lists.updateListMember(process.env.MAILCHIMP_LIST_ID, emailHash, {
          merge_fields: {
            FNAME: data.name?.split(' ')[0] || '',
            LNAME: data.name?.split(' ').slice(1).join(' ') || '',
            COMPANY: data.company || '',
            SOURCE: data.source,
            TOOL: data.tool || '',
            INTERESTS: data.interests.join(', '),
            USECASE: data.useCase || ''
          }
        });
        
        return { success: true, id: emailHash };
      } catch (updateError) {
        console.error('Mailchimp update error:', updateError);
        return { success: false };
      }
    }
    
    console.error('Mailchimp error:', error);
    return { success: false };
  }
}

async function addToHubSpot(data: SubscriptionData): Promise<{ success: boolean; id?: string }> {
  // HubSpot integration example
  // const hubspot = require('@hubspot/api-client');
  // const hubspotClient = new hubspot.Client({ accessToken: process.env.HUBSPOT_ACCESS_TOKEN });
  
  // try {
  //   const properties = {
  //     email: data.email,
  //     firstname: data.name?.split(' ')[0] || '',
  //     lastname: data.name?.split(' ').slice(1).join(' ') || '',
  //     company: data.company || '',
  //     hs_lead_status: 'NEW',
  //     source: data.source,
  //     tool_interest: data.tool || '',
  //     interests: data.interests.join('; ')
  //   };
  
  //   const response = await hubspotClient.crm.contacts.basicApi.create({
  //     properties,
  //     associations: []
  //   });
  //   return { success: true, id: response.id };
  // } catch (error) {
  //   console.error('HubSpot error:', error);
  //   return { success: false };
  // }
  
  // Mock success for now
  console.log('Would add to HubSpot:', data);
  return { success: true, id: `hs_${Date.now()}` };
}

async function logToDatabase(data: SubscriptionData): Promise<boolean> {
  // Database logging (implement with your preferred DB)
  // Example with Prisma:
  // try {
  //   await prisma.subscription.create({
  //     data: {
  //       email: data.email,
  //       source: data.source,
  //       tool: data.tool,
  //       interests: data.interests,
  //       name: data.name,
  //       company: data.company,
  //       referrer: data.referrer,
  //       timestamp: new Date(data.timestamp),
  //       ip_address: data.ip_address,
  //       user_agent: data.user_agent
  //     }
  //   });
  //   return true;
  // } catch (error) {
  //   console.error('Database error:', error);
  //   return false;
  // }
  
  // Mock success for now
  console.log('Would log to database:', data);
  return true;
}

async function sendWelcomeEmail(email: string, source: string, tool?: string): Promise<boolean> {
  try {
    // Email HTML content
    const htmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <title>Welcome to SiteOptz Newsletter</title>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
          .content { background: #f8f9fa; padding: 30px; border-radius: 0 0 10px 10px; }
          .highlight { background: white; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #667eea; }
          .footer { text-align: center; padding: 20px; color: #666; font-size: 14px; }
          .cta-button { display: inline-block; background: #667eea; color: white; padding: 12px 30px; text-decoration: none; border-radius: 6px; margin: 10px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Welcome to SiteOptz! 🎉</h1>
            <p>Your trusted guide to the best AI tools</p>
          </div>
          
          <div class="content">
            <h2>Thank you for subscribing!</h2>
            <p>You're now part of our community of 50,000+ AI enthusiasts who receive:</p>
            <ul>
              <li>✅ Weekly AI tool reviews and comparisons</li>
              <li>✅ Exclusive insights and tips</li>
              <li>✅ Early access to new features</li>
              <li>✅ Special offers and discounts</li>
            </ul>
            
            ${tool ? `
            <div class="highlight">
              <h3>You showed interest in ${tool}</h3>
              <p>We'll send you specific updates about ${tool} and similar tools to help you make the best choice.</p>
            </div>
            ` : ''}
            
            <p style="text-align: center;">
              <a href="https://siteoptz.ai/tools" class="cta-button">Explore AI Tools</a>
              <a href="https://siteoptz.ai/compare" class="cta-button">Compare Tools</a>
            </p>
            
            <p>Have questions? Simply reply to this email and our team will help you out!</p>
          </div>
          
          <div class="footer">
            <p>© 2025 SiteOptz. All rights reserved.</p>
            <p>You received this because you subscribed via ${source}</p>
            <p><a href="https://siteoptz.ai/unsubscribe?email=${encodeURIComponent(email)}">Unsubscribe</a> | <a href="https://siteoptz.ai/privacy">Privacy Policy</a></p>
          </div>
        </div>
      </body>
      </html>
    `;

    const textContent = `
Welcome to SiteOptz!

Thank you for subscribing!

You're now part of our community of 50,000+ AI enthusiasts who receive:
- Weekly AI tool reviews and comparisons
- Exclusive insights and tips
- Early access to new features
- Special offers and discounts

${tool ? `You showed interest in ${tool}. We'll send you specific updates about ${tool} and similar tools.\n\n` : ''}
Explore AI Tools: https://siteoptz.ai/tools
Compare Tools: https://siteoptz.ai/compare

Have questions? Simply reply to this email!

© 2025 SiteOptz. All rights reserved.
Unsubscribe: https://siteoptz.ai/unsubscribe?email=${encodeURIComponent(email)}
    `;

    // Use centralized email service (SendGrid with SMTP fallback)
    const result = await sendEmail({
      to: email,
      subject: `Welcome to SiteOptz Newsletter${tool ? ` - ${tool} Updates` : ''}`,
      text: textContent,
      html: htmlContent,
      from: process.env.EMAIL_FROM || 'info@siteoptz.ai',
      bcc: 'info@siteoptz.ai' // BCC for tracking
    });

    console.log('Welcome email sent successfully:', result.messageId);
    return result.success;
  } catch (error) {
    console.error('Welcome email error:', error);
    return false;
  }
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ApiResponse>
) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ 
      message: 'Method not allowed',
      error: 'Only POST requests are allowed'
    });
  }

  try {
    // Get client IP for rate limiting
    const clientIP = (req.headers['x-forwarded-for'] as string)?.split(',')[0] || 
                     (req.headers['x-real-ip'] as string) || 
                     req.socket.remoteAddress || 
                     'unknown';

    // Rate limiting check
    if (!checkRateLimit(clientIP)) {
      return res.status(429).json({
        message: 'Rate limit exceeded',
        error: 'Too many subscription attempts. Please try again later.'
      });
    }

    // Validate request body
    const validation = subscribeSchema.safeParse(req.body);
    
    if (!validation.success) {
      return res.status(400).json({
        message: 'Validation failed',
        error: validation.error.errors.map(err => err.message).join(', ')
      });
    }

    const { email, source, tool, category, interests, name, company, useCase, referrer } = validation.data;

    // Additional email validation
    if (!isValidEmail(email)) {
      return res.status(400).json({
        message: 'Invalid email',
        error: 'Please provide a valid email address'
      });
    }

    // Check for disposable email domains (optional)
    const disposableDomains = ['tempmail.org', '10minutemail.com', 'guerrillamail.com'];
    const emailDomain = email.split('@')[1].toLowerCase();
    if (disposableDomains.includes(emailDomain)) {
      return res.status(400).json({
        message: 'Invalid email domain',
        error: 'Disposable email addresses are not allowed'
      });
    }

    // Prepare subscription data
    const subscriptionData: SubscriptionData = {
      email: email.toLowerCase().trim(),
      source,
      tool,
      category,
      interests,
      name: name?.trim(),
      company: company?.trim(),
      useCase,
      referrer,
      timestamp: new Date().toISOString(),
      ip_address: clientIP,
      user_agent: req.headers['user-agent']
    };

    // Add to GoHighLevel CRM (primary)
    const ghlResult = await addToGoHighLevel(subscriptionData);
    let crmSuccess = ghlResult.success;
    let subscriptionId = ghlResult.id;

    // Optional: Also add to other CRMs if configured
    const crmProvider = process.env.CRM_PROVIDER || 'gohighlevel'; // 'mailchimp' | 'hubspot' | 'gohighlevel' | 'both'
    
    if (crmProvider === 'mailchimp' || crmProvider === 'both') {
      const mailchimpResult = await addToMailchimp(subscriptionData);
      if (mailchimpResult.success && !crmSuccess) {
        crmSuccess = true;
        subscriptionId = mailchimpResult.id;
      }
    }

    if (crmProvider === 'hubspot' || crmProvider === 'both') {
      const hubspotResult = await addToHubSpot(subscriptionData);
      if (hubspotResult.success && !crmSuccess) {
        crmSuccess = true;
        subscriptionId = subscriptionId || hubspotResult.id;
      }
    }

    // Log to database
    await logToDatabase(subscriptionData);

    // Send welcome email
    if (crmSuccess) {
      await sendWelcomeEmail(email, source, tool);
    }

    // Also send notification to info@siteoptz.ai about new subscription
    try {
      await sendEmail({
        to: 'info@siteoptz.ai',
        subject: `New Newsletter Subscription: ${email}`,
        html: `
          <h2>New Newsletter Subscription</h2>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Name:</strong> ${name || 'Not provided'}</p>
          <p><strong>Company:</strong> ${company || 'Not provided'}</p>
          <p><strong>Source:</strong> ${source}</p>
          <p><strong>Tool Interest:</strong> ${tool || 'None'}</p>
          <p><strong>Category:</strong> ${category || 'None'}</p>
          <p><strong>Use Case:</strong> ${useCase || 'Not specified'}</p>
          <p><strong>Interests:</strong> ${interests.join(', ') || 'None'}</p>
          <p><strong>Timestamp:</strong> ${subscriptionData.timestamp}</p>
        `,
        text: `New Newsletter Subscription\n\nEmail: ${email}\nName: ${name || 'Not provided'}\nCompany: ${company || 'Not provided'}\nSource: ${source}\nTool: ${tool || 'None'}\nCategory: ${category || 'None'}\nUse Case: ${useCase || 'Not specified'}\nInterests: ${interests.join(', ') || 'None'}\nTimestamp: ${subscriptionData.timestamp}`,
        from: process.env.EMAIL_FROM || 'info@siteoptz.ai',
        bcc: null // No BCC needed for internal notification
      });
    } catch (notificationError) {
      console.error('Failed to send notification email:', notificationError);
      // Don't fail the request if notification fails
    }

    // Analytics tracking (Google Analytics, Mixpanel, etc.)
    // You can add analytics tracking here
    console.log('Subscription analytics:', {
      event: 'email_subscription',
      email_domain: emailDomain,
      source,
      tool,
      interests: interests.length,
      timestamp: subscriptionData.timestamp
    });

    // Success response
    res.status(200).json({
      message: 'Subscription successful! Check your email for confirmation.',
      data: {
        email: subscriptionData.email,
        subscription_id: subscriptionId
      }
    });

  } catch (error) {
    console.error('Subscription error:', error);
    
    // Don't expose internal errors to client
    res.status(500).json({
      message: 'Subscription failed',
      error: 'An internal error occurred. Please try again later.'
    });
  }
}

// Export configuration for API route
export const config = {
  api: {
    bodyParser: {
      sizeLimit: '1mb',
    },
  },
}