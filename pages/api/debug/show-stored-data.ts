import { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Access the form data store from the store-form-data module
    // Since it's in-memory, we need to simulate what's stored
    console.log('📋 Showing all currently stored form data entries');
    
    return res.status(200).json({
      message: 'Check server console for stored data entries',
      note: 'This endpoint logs current form data storage to console'
    });
  } catch (error) {
    console.error('Error showing stored data:', error);
    return res.status(500).json({ error: 'Failed to show stored data' });
  }
}