import { NextApiRequest, NextApiResponse } from 'next';
const SiteOptzGoHighLevel = require('../../utils/siteoptz-gohighlevel');
import { sendWelcomeEmail, sendAdminNotificationEmail } from '../../lib/gohighlevel-service';

interface BusinessInfo {
  aiToolsInterest: string;
  businessSize: string;
  planName: string;
  timestamp: number;
}

interface ApiResponse {
  success: boolean;
  message: string;
  data?: any;
  error?: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ApiResponse>
) {
  if (req.method !== 'POST') {
    return res.status(405).json({
      success: false,
      message: 'Method not allowed',
      error: 'Only POST requests are allowed'
    });
  }

  try {
    const { email, name, businessInfo } = req.body;

    if (!email || !businessInfo) {
      return res.status(400).json({
        success: false,
        message: 'Missing required fields',
        error: 'Email and business info are required'
      });
    }

    console.log('=== Completing OAuth Registration with Business Info ===');
    console.log('Email:', email);
    console.log('Name:', name);
    console.log('Business Info:', businessInfo);

    // Create comprehensive user data object for integrations
    const userData = {
      email: email,
      name: name || undefined,
      provider: 'google',
      plan: 'free',
      // Business information from the modal
      company: `Business Size: ${businessInfo.businessSize}`,
      companySize: businessInfo.businessSize,
      interests: businessInfo.aiToolsInterest,
    };

    let ghlResult: { success: boolean; contactId?: string; opportunityId?: string; error?: string } = { success: false };

    // Check if GoHighLevel integration is enabled
    const isGHLEnabled = process.env.ENABLE_GHL === 'true';
    console.log('🔍 GoHighLevel Environment Check:');
    console.log('- ENABLE_GHL:', process.env.ENABLE_GHL);
    console.log('- API Key present:', !!process.env.GOHIGHLEVEL_API_KEY);
    console.log('- Location ID present:', !!process.env.GOHIGHLEVEL_LOCATION_ID);
    console.log('- Is Enabled:', isGHLEnabled);

    if (isGHLEnabled && process.env.GOHIGHLEVEL_API_KEY && process.env.GOHIGHLEVEL_LOCATION_ID) {
      try {
        // Initialize SiteOptzGoHighLevel class
        const gohighlevel = new SiteOptzGoHighLevel(
          process.env.GOHIGHLEVEL_API_KEY,
          process.env.GOHIGHLEVEL_LOCATION_ID
        );

        // Prepare data for SiteOptz GoHighLevel integration
        const subscriberData = {
          email: userData.email,
          firstName: userData.name?.split(' ')[0] || '',
          lastName: userData.name?.split(' ').slice(1).join(' ') || '',
          source: `OAuth Registration - google (with business info)`,
          aiToolsInterest: businessInfo.aiToolsInterest,
          businessSize: businessInfo.businessSize,
          registrationMethod: 'google',
          planType: 'free'
        };

        // Use addFreeTrialSubscriber method
        const result = await gohighlevel.addFreeTrialSubscriber(subscriberData);

        if (result.success) {
          console.log('✅ Successfully added OAuth user to GoHighLevel with business info');
          console.log('Contact ID:', result.contact?.id);
          console.log('Pipeline:', result.pipeline);
          ghlResult = {
            success: true,
            contactId: result.contact?.id,
            opportunityId: result.pipeline?.id
          };
        } else {
          console.error('❌ Failed to add OAuth user to GoHighLevel');
          ghlResult = { success: false };
        }
      } catch (error) {
        console.error('Error in SiteOptz GoHighLevel OAuth registration:', error);
        ghlResult = { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
      }
    } else {
      console.log('⚠️ GoHighLevel integration disabled or credentials missing');
      ghlResult = { success: false, error: 'Integration disabled' };
    }

    // Send welcome email
    console.log('Attempting to send welcome email...');
    try {
      const welcomeResult = await sendWelcomeEmail(userData);
      if (welcomeResult.success) {
        console.log('✅ Welcome email sent to:', email);
      } else {
        console.error('❌ Failed to send welcome email:', welcomeResult.error);
      }
    } catch (error) {
      console.error('Error sending welcome email:', error);
    }

    // Send admin notification with business information
    console.log('Attempting to send admin notification...');
    try {
      const adminResult = await sendAdminNotificationEmail(userData);
      if (adminResult.success) {
        console.log('✅ Admin notification sent with business info for:', email);
      } else {
        console.error('❌ Failed to send admin notification:', adminResult.error);
      }
    } catch (error) {
      console.error('Error sending admin notification:', error);
    }

    console.log('=== OAuth Registration Completion Success ===');

    return res.status(200).json({
      success: true,
      message: 'OAuth registration completed successfully with business information',
      data: {
        email: email,
        gohighlevel: ghlResult.success,
        businessInfo: businessInfo
      }
    });

  } catch (error) {
    console.error('Error completing OAuth registration:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to complete OAuth registration',
      error: 'An internal error occurred'
    });
  }
}