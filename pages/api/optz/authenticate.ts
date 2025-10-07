import { NextApiRequest, NextApiResponse } from 'next';
import { validateClientLogin } from '../clients/create';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ error: 'Username and password are required' });
    }

    // Validate client credentials
    const client = await validateClientLogin(username, password);

    if (!client) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    if (!client.isActive) {
      return res.status(403).json({ error: 'Account is inactive. Please contact support.' });
    }

    // Return client session data
    return res.status(200).json({
      success: true,
      client: {
        id: client.id,
        username: client.username,
        companyName: client.companyName,
        plan: client.plan,
        dashboardAccess: client.dashboardAccess,
        whitelabelSettings: client.whitelabelSettings
      },
      message: 'Authentication successful'
    });

  } catch (error) {
    console.error('Authentication error:', error);
    return res.status(500).json({ 
      error: 'Authentication failed',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}