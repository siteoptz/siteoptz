import { NextApiRequest, NextApiResponse } from 'next';
import { z } from 'zod';
const SiteOptzGoHighLevel = require('../../utils/siteoptz-gohighlevel');
import { sendWelcomeEmail, sendAdminNotificationEmail } from '../../lib/gohighlevel-service';
import { handleUserAction, createUserDataFromRegistration } from '../../lib/user-management-service';

// SiteOptzGoHighLevel class will be initialized inside functions to avoid serverless issues

// Input validation schema
const registerSchema = z.object({
  email: z.string().email('Invalid email address'),
  name: z.string().optional(),
  source: z.string().optional().default('Free Plan Registration'),
  planName: z.string().optional().default('Free Plan'),
  userAgent: z.string().optional(),
  referrer: z.string().optional(),
  registrationMethod: z.enum(['google', 'email']).optional().default('email'),
  aiToolsInterest: z.string().min(1, 'AI tools interest is required'),
  businessSize: z.string().min(1, 'Business size is required')
});

interface RegistrationData {
  email: string;
  name?: string;
  source: string;
  planName: string;
  userAgent?: string;
  referrer?: string;
  registrationMethod: string;
  aiToolsInterest: string;
  businessSize: string;
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
    isNewUser?: boolean;
    action?: string;
    emailSent?: boolean;
    adminNotificationSent?: boolean;
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

// Add free plan subscriber to GoHighLevel using SiteOptzGoHighLevel class
async function addFreeSubscriberToGoHighLevel(data: RegistrationData): Promise<{ success: boolean; contactId?: string; opportunityId?: string }> {
  try {
    console.log('=== SiteOptz GoHighLevel Free Plan Registration ===');
    console.log('Registration Data:', JSON.stringify(data, null, 2));
    
    // Initialize GoHighLevel class inside function to avoid serverless issues
    const gohighlevel = new SiteOptzGoHighLevel(
      process.env.GOHIGHLEVEL_API_KEY,
      process.env.GOHIGHLEVEL_LOCATION_ID
    );
    
    // Prepare data for SiteOptz GoHighLevel integration
    const subscriberData = {
      email: data.email,
      firstName: data.name?.split(' ')[0] || '',
      lastName: data.name?.split(' ').slice(1).join(' ') || '',
      source: `${data.source} - ${data.registrationMethod}`,
      aiToolsInterest: data.aiToolsInterest,
      businessSize: data.businessSize,
      registrationMethod: data.registrationMethod,
      planType: 'free'
    };

    // Use addFreeTrialSubscriber method from our comprehensive class
    const result = await gohighlevel.addFreeTrialSubscriber(subscriberData);
    
    if (result.success) {
      console.log('✅ Successfully added free plan subscriber to GoHighLevel');
      console.log('Contact ID:', result.contact?.id);
      console.log('Pipeline:', result.pipeline);
      
      return { 
        success: true, 
        contactId: result.contact?.id,
        opportunityId: result.pipeline?.id
      };
    } else {
      console.error('❌ Failed to add free plan subscriber to GoHighLevel');
      return { success: false };
    }
  } catch (error) {
    console.error('Error in SiteOptz GoHighLevel free plan registration:', error);
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
    
    console.log('🔍 GoHighLevel Environment Check:');
    console.log('- ENABLE_GHL:', process.env.ENABLE_GHL);
    console.log('- API Key present:', !!process.env.GOHIGHLEVEL_API_KEY);
    console.log('- Location ID present:', !!process.env.GOHIGHLEVEL_LOCATION_ID);
    console.log('- Environment:', process.env.NODE_ENV);
    console.log('- Is Enabled:', isGHLEnabled);
    
    if (!isGHLEnabled) {
      console.log('⚠️ GoHighLevel integration disabled, skipping CRM integration');
      console.log('💡 To enable: Set ENABLE_GHL=true in environment variables');
      return res.status(200).json({
        success: true,
        message: 'Registration successful! (CRM integration disabled)',
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

    // Use new conditional user management service
    const userData = createUserDataFromRegistration(registrationData);
    const userActionResult = await handleUserAction(userData);
    
    console.log('User action completed:', JSON.stringify(userActionResult, null, 2));

    if (!userActionResult.success) {
      console.error('Failed to process user registration:', userActionResult.error);
      // Still return success to user to avoid blocking registration
      return res.status(200).json({
        success: true,
        message: 'Registration successful! Welcome to SiteOptz Free Plan.',
        data: {
          email: registrationData.email
        }
      });
    }

    // Success response with user action details
    res.status(200).json({
      success: true,
      message: userActionResult.isNewUser 
        ? 'Registration successful! Welcome to SiteOptz Free Plan.' 
        : 'Welcome back! Your account has been updated.',
      data: {
        email: registrationData.email,
        contactId: userActionResult.contactId,
        isNewUser: userActionResult.isNewUser,
        action: userActionResult.action,
        emailSent: userActionResult.emailSent,
        adminNotificationSent: userActionResult.adminNotificationSent
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