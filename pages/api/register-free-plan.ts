import { NextApiRequest, NextApiResponse } from 'next';
import { z } from 'zod';
const GoHighLevelAPI = require('../../utils/gohighlevel-api');

// Input validation schema
const registerSchema = z.object({
  email: z.string().email('Invalid email address'),
  name: z.string().optional(),
  source: z.string().optional().default('Free Plan Registration'),
  planName: z.string().optional().default('Free Plan'),
  userAgent: z.string().optional(),
  referrer: z.string().optional(),
  registrationMethod: z.enum(['google', 'email']).optional().default('email'),
  aiToolsInterest: z.string().optional().default('general'),
  businessSize: z.string().optional().default('small')
});

interface RegistrationData {
  email: string;
  name?: string;
  source: string;
  planName: string;
  userAgent?: string;
  referrer?: string;
  registrationMethod: string;
  aiToolsInterest?: string;
  businessSize?: string;
  timestamp: string;
  ip_address?: string;
}

interface ApiResponse {
  success: boolean;
  message: string;
  data?: {
    email: string;
    contactId?: string;
    opportunityId?: string;
  };
  error?: string;
}

// Rate limiting (simple in-memory store - use Redis in production)
const rateLimitStore = new Map<string, { count: number; resetTime: number }>();

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const windowMs = 15 * 60 * 1000; // 15 minutes
  const maxRequests = 10; // 10 registrations per 15 minutes per IP
  
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

// Add free plan subscriber to GoHighLevel as contact
async function addFreeSubscriberToGoHighLevel(data: RegistrationData): Promise<{ success: boolean; contactId?: string; opportunityId?: string }> {
  try {
    console.log('=== GoHighLevel Free Plan Registration Debug ===');
    console.log('Registration Data:', JSON.stringify(data, null, 2));
    
    // Initialize GoHighLevel API
    const ghl = new GoHighLevelAPI();
    
    // Prepare contact data
    const contactData = {
      firstName: data.name?.split(' ')[0] || '',
      lastName: data.name?.split(' ').slice(1).join(' ') || '',
      email: data.email,
      phone: '',
      tags: [
        'New Lead',  // This tag triggers the 'New Lead Workflow'
        'Free Plan Subscriber',
        `Registration Method: ${data.registrationMethod}`,
        `Plan: ${data.planName}`,
        `Source: ${data.source}`,
        `AI Interest: ${data.aiToolsInterest || 'general'}`,
        `Business Size: ${data.businessSize || 'small'}`,
        `Registered: ${new Date().toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}`
      ],
      customFields: [
        {
          key: 'registration_method',
          value: data.registrationMethod
        },
        {
          key: 'plan_type',
          value: 'free'
        },
        {
          key: 'registration_date',
          value: data.timestamp
        },
        {
          key: 'user_agent',
          value: data.userAgent || ''
        },
        {
          key: 'referrer',
          value: data.referrer || ''
        },
        {
          key: 'ai_tools_interest',
          value: data.aiToolsInterest || 'general'
        },
        {
          key: 'business_size',
          value: data.businessSize || 'small'
        }
      ],
      source: `Free Plan Registration - ${data.registrationMethod === 'google' ? 'Google OAuth' : 'Email/Password'}`,
    };

    console.log('Creating/updating contact in GoHighLevel:', JSON.stringify(contactData, null, 2));

    // Create or update contact
    const contactResult = await ghl.createOrUpdateContact(contactData);
    const contactId = contactResult.contact?.id;

    if (!contactId) {
      throw new Error('Failed to create contact in GoHighLevel');
    }

    console.log('Contact created/updated successfully:', contactId);

    // Add tags specifically for free plan subscribers
    try {
      await ghl.addTagsToContact(contactId, [
        'SiteOptz Free User',
        'AI Tool Discovery',
        'Lead Magnet - Free Plan'
      ]);
    } catch (tagError) {
      console.error('Failed to add additional tags:', tagError);
      // Don't fail the whole process for tag errors
    }

    // Create an opportunity for the free plan registration
    let opportunityId = null;
    try {
      const opportunityData = {
        name: `${data.name || data.email} - Free Plan Registration`,
        contactId: contactId,
        status: 'open',
        monetaryValue: 0, // Free plan has no immediate monetary value
        source: `Free Plan Registration - SiteOptz Website`,
        customFields: [
          {
            key: 'plan_type',
            value: 'free'
          },
          {
            key: 'registration_method',
            value: data.registrationMethod
          }
        ]
      };
      
      console.log('Creating opportunity for free plan registration:', JSON.stringify(opportunityData, null, 2));
      
      // Use the pipeline and stage from environment variables if available
      const pipelineId = process.env.GHL_FREE_PLAN_PIPELINE_ID || process.env.GHL_PIPELINE_ID;
      const stageId = process.env.GHL_FREE_PLAN_STAGE_ID || process.env.GHL_PIPELINE_STAGE_ID;
      
      if (pipelineId && stageId) {
        await ghl.addContactToPipeline(contactId, pipelineId, stageId);
        console.log('Contact added to free plan pipeline');
      }
      
      // Note: Opportunity creation might need to be done through a different endpoint
      // depending on your GoHighLevel setup
    } catch (oppError) {
      console.error('Error creating opportunity for free plan:', oppError);
      // Don't fail the registration for opportunity errors
    }

    console.log('=== Free Plan GoHighLevel Integration Success ===');
    console.log('Contact ID:', contactId);
    console.log('Opportunity ID:', opportunityId);
    console.log('====================================================');
    
    return { 
      success: true, 
      contactId: contactId,
      opportunityId: opportunityId || undefined 
    };
  } catch (error) {
    console.error('Error adding free plan subscriber to GoHighLevel:', error);
    return { success: false };
  }
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ApiResponse>
) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ 
      success: false,
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
        success: false,
        message: 'Rate limit exceeded',
        error: 'Too many registration attempts. Please try again later.'
      });
    }

    // Validate request body
    const validation = registerSchema.safeParse(req.body);
    
    if (!validation.success) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        error: validation.error.errors.map(err => err.message).join(', ')
      });
    }

    const { email, name, source, planName, userAgent, referrer, registrationMethod, aiToolsInterest, businessSize } = validation.data;

    // Check if GoHighLevel integration is enabled
    const isGHLEnabled = process.env.ENABLE_GHL === 'true';
    
    if (!isGHLEnabled) {
      console.log('GoHighLevel integration disabled, skipping CRM integration');
      return res.status(200).json({
        success: true,
        message: 'Registration successful!',
        data: {
          email: email.toLowerCase().trim()
        }
      });
    }

    // Check for required GoHighLevel environment variables
    if (!process.env.GOHIGHLEVEL_API_KEY || !process.env.GOHIGHLEVEL_LOCATION_ID) {
      console.error('GoHighLevel credentials missing');
      return res.status(500).json({
        success: false,
        message: 'CRM integration configuration error',
        error: 'Missing required configuration'
      });
    }

    // Prepare registration data
    const registrationData: RegistrationData = {
      email: email.toLowerCase().trim(),
      name: name?.trim(),
      source,
      planName,
      userAgent,
      referrer,
      registrationMethod,
      aiToolsInterest,
      businessSize,
      timestamp: new Date().toISOString(),
      ip_address: clientIP
    };

    // Add to GoHighLevel CRM
    const ghlResult = await addFreeSubscriberToGoHighLevel(registrationData);

    if (!ghlResult.success) {
      console.error('Failed to add subscriber to GoHighLevel');
      // Still return success to user, but log the error
      return res.status(200).json({
        success: true,
        message: 'Registration successful! Welcome to SiteOptz Free Plan.',
        data: {
          email: registrationData.email
        }
      });
    }

    // Success response
    res.status(200).json({
      success: true,
      message: 'Registration successful! Welcome to SiteOptz Free Plan.',
      data: {
        email: registrationData.email,
        contactId: ghlResult.contactId,
        opportunityId: ghlResult.opportunityId
      }
    });

  } catch (error) {
    console.error('Free plan registration error:', error);
    
    // Don't expose internal errors to client
    res.status(500).json({
      success: false,
      message: 'Registration failed',
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
};