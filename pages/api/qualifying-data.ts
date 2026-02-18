import { NextApiRequest, NextApiResponse } from 'next';
import { storeQualifyingData, retrieveQualifyingData, clearQualifyingData } from '../../lib/signup-bridge';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;
  
  try {
    switch (method) {
      case 'POST':
        // Store qualifying data before OAuth
        const { email, name, phone, business, bottlenecks, currentAIUsage, priorityOutcome } = req.body;
        
        if (!email || !name || !bottlenecks || !currentAIUsage || !priorityOutcome) {
          return res.status(400).json({ error: 'Missing required fields' });
        }
        
        const key = storeQualifyingData(email, {
          email,
          name,
          phone,
          business,
          bottlenecks,
          currentAIUsage,
          priorityOutcome,
          timestamp: Date.now()
        });
        
        res.status(200).json({ success: true, key });
        break;
        
      case 'GET':
        // Retrieve qualifying data during OAuth callback
        const { email: getEmail } = req.query;
        
        if (!getEmail || typeof getEmail !== 'string') {
          return res.status(400).json({ error: 'Email required' });
        }
        
        const data = retrieveQualifyingData(getEmail);
        res.status(200).json({ data });
        break;
        
      case 'DELETE':
        // Clear qualifying data after processing
        const { email: deleteEmail } = req.body;
        
        if (!deleteEmail) {
          return res.status(400).json({ error: 'Email required' });
        }
        
        clearQualifyingData(deleteEmail);
        res.status(200).json({ success: true });
        break;
        
      default:
        res.setHeader('Allow', ['POST', 'GET', 'DELETE']);
        res.status(405).json({ error: `Method ${method} not allowed` });
    }
  } catch (error) {
    console.error('Qualifying data API error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}