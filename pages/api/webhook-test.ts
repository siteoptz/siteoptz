import { NextApiRequest, NextApiResponse } from 'next';

// Simple webhook test endpoint to verify connectivity
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  console.log('=== WEBHOOK TEST ENDPOINT CALLED ===');
  console.log('Time:', new Date().toISOString());
  console.log('Method:', req.method);
  console.log('Headers:', JSON.stringify(req.headers, null, 2));
  console.log('Body:', JSON.stringify(req.body, null, 2));
  console.log('Query:', JSON.stringify(req.query, null, 2));
  console.log('=================================');
  
  res.status(200).json({ 
    success: true,
    message: 'Webhook test received',
    timestamp: new Date().toISOString(),
    method: req.method,
    hasBody: !!req.body,
    bodyKeys: req.body ? Object.keys(req.body) : []
  });
}