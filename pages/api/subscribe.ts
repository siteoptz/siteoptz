import { NextApiRequest, NextApiResponse } from 'next';
import { z } from 'zod';

// Input validation schema
const subscribeSchema = z.object({
  email: z.string().email('Invalid email address'),
  source: z.string().optional().default('unknown'),
  tool: z.string().optional(),
  interests: z.array(z.string()).optional().default([]),
  name: z.string().optional(),
  company: z.string().optional(),
  referrer: z.string().optional()
});

interface SubscriptionData {
  email: string;
  source: string;
  tool?: string;
  interests: string[];
  name?: string;
  company?: string;
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

// CRM Integration Functions (implement based on your provider)
async function addToMailchimp(data: SubscriptionData): Promise<{ success: boolean; id?: string }> {
  // Mailchimp integration example
  // const mailchimp = require('@mailchimp/mailchimp_marketing');
  // mailchimp.setConfig({
  //   apiKey: process.env.MAILCHIMP_API_KEY,
  //   server: process.env.MAILCHIMP_SERVER_PREFIX,
  // });
  
  // try {
  //   const response = await mailchimp.lists.addListMember(process.env.MAILCHIMP_LIST_ID, {
  //     email_address: data.email,
  //     status: 'subscribed',
  //     merge_fields: {
  //       FNAME: data.name?.split(' ')[0] || '',
  //       LNAME: data.name?.split(' ').slice(1).join(' ') || '',
  //       COMPANY: data.company || '',
  //       SOURCE: data.source,
  //       TOOL: data.tool || '',
  //       INTERESTS: data.interests.join(', ')
  //     },
  //     tags: [
  //       data.source,
  //       ...(data.tool ? [`tool:${data.tool}`] : []),
  //       ...data.interests.map(interest => `interest:${interest}`)
  //     ]
  //   });
  //   return { success: true, id: response.id };
  // } catch (error) {
  //   console.error('Mailchimp error:', error);
  //   return { success: false };
  // }
  
  // Mock success for now
  console.log('Would add to Mailchimp:', data);
  return { success: true, id: `mc_${Date.now()}` };
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
  // Email service integration (SendGrid, AWS SES, etc.)
  // const sgMail = require('@sendgrid/mail');
  // sgMail.setApiKey(process.env.SENDGRID_API_KEY);
  
  // const welcomeTemplateId = tool 
  //   ? process.env.SENDGRID_TOOL_WELCOME_TEMPLATE 
  //   : process.env.SENDGRID_GENERAL_WELCOME_TEMPLATE;
  
  // try {
  //   await sgMail.send({
  //     to: email,
  //     from: process.env.FROM_EMAIL,
  //     templateId: welcomeTemplateId,
  //     dynamicTemplateData: {
  //       source,
  //       tool_name: tool || '',
  //       unsubscribe_url: `${process.env.NEXT_PUBLIC_BASE_URL}/unsubscribe?email=${encodeURIComponent(email)}`
  //     }
  //   });
  //   return true;
  // } catch (error) {
  //   console.error('Welcome email error:', error);
  //   return false;
  // }
  
  // Mock success for now
  console.log(`Would send welcome email to ${email} for source: ${source}, tool: ${tool}`);
  return true;
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

    const { email, source, tool, interests, name, company, referrer } = validation.data;

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
      interests,
      name: name?.trim(),
      company: company?.trim(),
      referrer,
      timestamp: new Date().toISOString(),
      ip_address: clientIP,
      user_agent: req.headers['user-agent']
    };

    // Choose CRM based on environment or configuration
    const crmProvider = process.env.CRM_PROVIDER || 'mailchimp'; // 'mailchimp' | 'hubspot' | 'both'
    
    let crmSuccess = false;
    let subscriptionId: string | undefined;

    // Add to CRM(s)
    if (crmProvider === 'mailchimp' || crmProvider === 'both') {
      const mailchimpResult = await addToMailchimp(subscriptionData);
      if (mailchimpResult.success) {
        crmSuccess = true;
        subscriptionId = mailchimpResult.id;
      }
    }

    if (crmProvider === 'hubspot' || crmProvider === 'both') {
      const hubspotResult = await addToHubSpot(subscriptionData);
      if (hubspotResult.success) {
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