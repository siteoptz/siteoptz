import type { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  console.log('=== Test Job Application API Called ===');
  console.log('Method:', req.method);
  
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    console.log('Headers:', req.headers['content-type']);
    console.log('Body exists:', !!req.body);
    
    // Simple response without any complex processing
    res.status(200).json({
      message: 'Test API working',
      timestamp: new Date().toISOString(),
      method: req.method
    });
    
  } catch (error) {
    console.error('Test API error:', error);
    res.status(500).json({
      message: 'Test API failed',
      error: error instanceof Error ? error.message : String(error)
    });
  }
}