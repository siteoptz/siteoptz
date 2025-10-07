import { NextApiRequest, NextApiResponse } from 'next';
import { validateSSOToken } from './generate-sso-token';

/**
 * Validate SSO token and return client session data
 */
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { token } = req.body;

    if (!token) {
      return res.status(400).json({ error: 'Token is required' });
    }

    // Validate the SSO token
    const tokenData = validateSSOToken(token);

    if (!tokenData) {
      return res.status(401).json({ 
        error: 'Invalid or expired token. Please log in again.' 
      });
    }

    // Return client session data
    return res.status(200).json({
      success: true,
      client: {
        email: tokenData.email,
        username: tokenData.username,
        plan: tokenData.plan
      },
      message: 'Authentication successful'
    });

  } catch (error) {
    console.error('SSO validation error:', error);
    return res.status(500).json({
      success: false,
      error: 'Authentication failed',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}