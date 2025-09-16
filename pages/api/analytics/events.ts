import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    // For now, just log the analytics event
    // In the future, you could send this to your analytics provider
    console.log('Analytics event:', req.body);
    
    res.status(200).json({ success: true });
  } catch (error) {
    console.error('Analytics error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}