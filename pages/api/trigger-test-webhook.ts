import { NextApiRequest, NextApiResponse } from 'next';

// Test endpoint to manually trigger webhook processing
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  console.log('=== MANUAL WEBHOOK TRIGGER TEST ===');
  
  // Simulate a Stripe webhook event
  const testEvent = {
    id: 'evt_test_' + Date.now(),
    type: 'checkout.session.completed',
    data: {
      object: {
        id: 'cs_test_' + Date.now(),
        mode: 'subscription',
        customer: 'cus_test_123',
        subscription: 'sub_test_123',
        customer_email: 'test@example.com'
      }
    }
  };

  console.log('Simulating webhook event:', JSON.stringify(testEvent, null, 2));

  try {
    // Call our webhook endpoint internally
    const response = await fetch(`${process.env.NEXTAUTH_URL || 'http://localhost:3000'}/api/webhook/stripe`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'stripe-signature': 'test_signature'
      },
      body: JSON.stringify(testEvent)
    });

    const result = await response.text();
    console.log('Webhook response status:', response.status);
    console.log('Webhook response:', result);

    res.status(200).json({
      success: true,
      message: 'Test webhook triggered',
      webhookResponse: {
        status: response.status,
        body: result
      }
    });
  } catch (error) {
    console.error('Error triggering test webhook:', error);
    res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}