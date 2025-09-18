import { NextApiRequest, NextApiResponse } from 'next';
import { handleUserAction, createUserDataFromRegistration, createUserDataFromStripeCustomer } from '../../lib/user-management-service';

interface TestResponse {
  success: boolean;
  scenario: string;
  result: any;
  message: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<TestResponse>
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ 
      success: false,
      scenario: 'invalid_method',
      result: null,
      message: 'Method not allowed. Use POST.' 
    });
  }

  try {
    const { scenario, email, name, plan } = req.body;

    if (!scenario || !email) {
      return res.status(400).json({
        success: false,
        scenario: 'validation_error',
        result: null,
        message: 'Missing required fields: scenario and email'
      });
    }

    let userData;
    let testResult;

    switch (scenario) {
      case 'new_registration':
        // Test new user registration (should create contact + send welcome email)
        userData = createUserDataFromRegistration({
          email: email,
          name: name || 'Test User',
          businessSize: 'Test Business Size',
          aiToolsInterest: 'Test Interest',
          registrationMethod: 'test'
        });
        
        testResult = await handleUserAction(userData);
        
        return res.status(200).json({
          success: true,
          scenario: 'new_registration',
          result: testResult,
          message: testResult.isNewUser 
            ? '✅ New user detected - contact created and welcome email sent'
            : '⚠️ User already exists - contact updated, no welcome email'
        });

      case 'upgrade_existing':
        // Test upgrade for existing user (should update contact, no welcome email)
        userData = createUserDataFromStripeCustomer(
          {
            email: email,
            name: name || 'Test User',
            id: 'test_stripe_customer',
            metadata: {
              company: 'Test Company',
              company_size: 'Test Size',
              interests: 'Test Interests'
            }
          },
          plan || 'pro',
          'monthly'
        );
        
        testResult = await handleUserAction(userData);
        
        return res.status(200).json({
          success: true,
          scenario: 'upgrade_existing',
          result: testResult,
          message: testResult.isNewUser 
            ? '🆕 New customer from upgrade - welcome email sent'
            : '🔄 Existing customer upgraded - contact updated, no welcome email'
        });

      case 'oauth_signin':
        // Test OAuth signin (conditional: new user gets welcome, existing doesn't)
        userData = {
          email: email,
          name: name || 'Test OAuth User',
          company: 'OAuth Registration',
          companySize: 'Not collected',
          interests: 'Not collected',
          plan: 'free',
          provider: 'google',
          isUpgrade: false
        };
        
        testResult = await handleUserAction(userData);
        
        return res.status(200).json({
          success: true,
          scenario: 'oauth_signin',
          result: testResult,
          message: testResult.isNewUser 
            ? '🆕 New OAuth user - contact created and welcome email sent'
            : '👋 Existing OAuth user - no welcome email sent'
        });

      default:
        return res.status(400).json({
          success: false,
          scenario: 'invalid_scenario',
          result: null,
          message: 'Invalid scenario. Use: new_registration, upgrade_existing, or oauth_signin'
        });
    }

  } catch (error) {
    console.error('Test API error:', error);
    return res.status(500).json({
      success: false,
      scenario: 'error',
      result: null,
      message: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}

export const config = {
  api: {
    bodyParser: {
      sizeLimit: '1mb',
    },
  },
};