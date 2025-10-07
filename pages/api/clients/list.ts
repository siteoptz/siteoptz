import { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../auth/[...nextauth]';
import { getAllClients } from './create';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const session = await getServerSession(req, res, authOptions);
  if (!session?.user?.email) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  try {
    // Get all clients created by the current user
    // In production, you might want to add role-based filtering
    const clients = await getAllClients();
    
    return res.status(200).json({
      success: true,
      clients: clients.map(client => ({
        id: client.id,
        email: client.email,
        username: client.username,
        companyName: client.companyName,
        plan: client.plan,
        dashboardAccess: client.dashboardAccess,
        createdAt: client.createdAt,
        lastLogin: client.lastLogin,
        isActive: client.isActive,
        apiKey: client.apiKey
      }))
    });
  } catch (error) {
    console.error('Error fetching clients:', error);
    return res.status(500).json({ 
      error: 'Failed to fetch clients',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}