import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  console.log('=== Simple Job Application API Called ===');
  
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    console.log('Processing job application...');
    
    // Just log what we receive without complex processing
    console.log('Content-Type:', req.headers['content-type']);
    console.log('Body type:', typeof req.body);
    
    // Simple success response
    res.status(200).json({
      message: 'Application received successfully (simplified)',
      timestamp: new Date().toISOString()
    });
    
  } catch (error) {
    console.error('Simple job application error:', error);
    res.status(500).json({
      message: 'Application submission failed',
      error: process.env.NODE_ENV === 'development' ? (error instanceof Error ? error.message : String(error)) : 'Internal server error'
    });
  }
}