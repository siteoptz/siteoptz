import { NextApiRequest, NextApiResponse } from 'next';
import { sendWelcomeEmail, sendAdminNotificationEmail } from '../../lib/gohighlevel-service';
const SiteOptzGoHighLevel = require('../../utils/siteoptz-gohighlevel');

// Test endpoint to simulate upgrade notifications
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { email, plan = 'starter', billingCycle = 'monthly', name = 'Test User' } = req.body;

    if (!email) {
      return res.status(400).json({ error: 'Email is required' });
    }

    console.log('=== TESTING UPGRADE NOTIFICATIONS ===');
    console.log('Email:', email);
    console.log('Plan:', plan);
    console.log('Billing cycle:', billingCycle);

    const results = {
      gohighlevel: { success: false },
      welcomeEmail: { success: false },
      adminNotification: { success: false }
    };

    // 1. Test GoHighLevel integration
    try {
      console.log('Testing GoHighLevel integration...');
      
      // Check if GoHighLevel integration is enabled
      const isGHLEnabled = process.env.ENABLE_GHL === 'true';
      console.log('GoHighLevel enabled:', isGHLEnabled);
      
      if (isGHLEnabled && process.env.GOHIGHLEVEL_API_KEY && process.env.GOHIGHLEVEL_LOCATION_ID) {
        const gohighlevel = new SiteOptzGoHighLevel(
          process.env.GOHIGHLEVEL_API_KEY,
          process.env.GOHIGHLEVEL_LOCATION_ID
        );
        
        const subscriberData = {
          email: email,
          firstName: name.split(' ')[0] || '',
          lastName: name.split(' ').slice(1).join(' ') || '',
          phone: '',
          source: `Test ${plan} Plan Upgrade`,
          company: `Test ${plan} Plan Customer`,
          companySize: 'Test Company Size',
          aiToolsInterest: 'Test AI Tools Interest',
          billingCycle: billingCycle,
          stripeCustomerId: 'test_customer_id'
        };

        let result;
        switch (plan) {
          case 'starter':
            result = await gohighlevel.addStarterPlanSubscriber(subscriberData);
            break;
          case 'pro':
            result = await gohighlevel.addProPlanSubscriber(subscriberData);
            break;
          case 'enterprise':
            result = await gohighlevel.addEnterpriseSubscriber(subscriberData);
            break;
          default:
            result = await gohighlevel.addFreeTrialSubscriber(subscriberData);
        }
        
        results.gohighlevel = { 
          success: result.success, 
          contactId: result.contact?.id,
          error: result.success ? undefined : 'GoHighLevel integration failed'
        };
      } else {
        results.gohighlevel = { success: false, error: 'GoHighLevel not configured' };
      }
    } catch (error) {
      console.error('GoHighLevel test error:', error);
      results.gohighlevel = { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
    }

    // 2. Test welcome email
    try {
      console.log('Testing welcome email...');
      const userData = {
        email: email,
        name: name,
        provider: 'stripe',
        plan: plan,
        company: `Test ${plan} Plan Customer`,
        companySize: 'Test Company Size',
        interests: 'Test AI Tools Interest',
        billingCycle: billingCycle,
        isUpgrade: true
      };

      const welcomeResult = await sendWelcomeEmail(userData);
      results.welcomeEmail = welcomeResult;
    } catch (error) {
      console.error('Welcome email test error:', error);
      results.welcomeEmail = { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
    }

    // 3. Test admin notification
    try {
      console.log('Testing admin notification...');
      const userData = {
        email: email,
        name: name,
        provider: 'stripe',
        plan: plan,
        company: `Test ${plan} Plan Customer`,
        companySize: 'Test Company Size',
        interests: 'Test AI Tools Interest',
        billingCycle: billingCycle,
        stripeCustomerId: 'test_customer_id',
        isUpgrade: true
      };

      const adminResult = await sendAdminNotificationEmail(userData);
      results.adminNotification = adminResult;
    } catch (error) {
      console.error('Admin notification test error:', error);
      results.adminNotification = { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
    }

    console.log('=== TEST RESULTS ===');
    console.log(JSON.stringify(results, null, 2));

    res.status(200).json({
      success: true,
      message: 'Upgrade notification test completed',
      results: results
    });

  } catch (error) {
    console.error('Test upgrade notifications error:', error);
    res.status(500).json({
      success: false,
      error: 'Test failed',
      message: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}