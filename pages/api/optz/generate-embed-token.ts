import { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../auth/[...nextauth]';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Get session
    const session = await getServerSession(req, res, authOptions);
    
    if (!session?.user?.email) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const { email, plan, dashboardId } = req.body;

    // Validate the email matches the session
    if (email !== session.user.email) {
      return res.status(403).json({ error: 'Email mismatch' });
    }

    // Generate embed token
    const token = CyfeSSOMiddleware.generateToken({
      email,
      plan,
      username: email.split('@')[0],
      companyName: session.user.name || 'Company',
      dashboards: [],
      expiresIn: '1h' // Short-lived for embed security
    });

    // Generate embed URL
    const embedUrl = CyfeSSOMiddleware.generateEmbedUrl({
      dashboardId,
      token,
      height: '600px',
      width: '100%'
    });

    console.log('Generated embed URL for:', email, 'Dashboard:', dashboardId);

    return res.status(200).json({
      success: true,
      embedUrl,
      token
    });

  } catch (error: any) {
    console.error('Embed token generation error:', error);
    return res.status(500).json({
      error: 'Failed to generate embed token',
      details: error.message
    });
  }
}