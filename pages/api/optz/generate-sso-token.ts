import { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../auth/[...nextauth]';
import { getClientByEmail } from '../clients/create';
import { nanoid } from 'nanoid';

// In production, store tokens in database with expiration
const ssoTokens: Map<string, { 
  email: string; 
  plan: string; 
  username: string;
  expiresAt: Date; 
}> = new Map();

/**
 * Generate SSO token for seamless login to optz.siteoptz.ai
 */
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Verify user session
    const session = await getServerSession(req, res, authOptions);
    if (!session?.user?.email) {
      return res.status(401).json({ error: 'Unauthorized - Please log in' });
    }

    const { email, plan } = req.body;

    // Verify the email matches session
    if (email !== session.user.email) {
      return res.status(403).json({ error: 'Email mismatch - Security violation' });
    }

    // Check if white-label client exists
    const client = await getClientByEmail(email);
    if (!client) {
      return res.status(404).json({ 
        error: 'White-label account not found. Please try again or contact support.' 
      });
    }

    if (!client.isActive) {
      return res.status(403).json({ 
        error: 'Your dashboard account is inactive. Please contact support.' 
      });
    }

    // Verify plan access
    const planHierarchy = { free: 0, starter: 1, pro: 2, enterprise: 3 };
    const clientPlanLevel = planHierarchy[client.plan as keyof typeof planHierarchy] || 0;
    const requestedPlanLevel = planHierarchy[plan as keyof typeof planHierarchy] || 0;

    if (requestedPlanLevel > clientPlanLevel) {
      return res.status(403).json({ 
        error: 'Plan upgrade required. Your current plan does not include this dashboard.' 
      });
    }

    // Generate secure SSO token
    const token = nanoid(32);
    const expiresAt = new Date(Date.now() + 5 * 60 * 1000); // 5 minutes

    // Store token temporarily
    ssoTokens.set(token, {
      email: client.email,
      plan: client.plan,
      username: client.username,
      expiresAt
    });

    // Clean up expired tokens
    cleanupExpiredTokens();

    // Generate login URL with token
    const loginUrl = `https://optz.siteoptz.ai/auth/sso?token=${token}`;

    return res.status(200).json({
      success: true,
      loginUrl,
      expiresIn: 300, // 5 minutes in seconds
      dashboardFeatures: {
        widgets: getDashboardWidgetCount(client.plan),
        refreshRate: getDashboardRefreshRate(client.plan),
        access: client.dashboardAccess
      }
    });

  } catch (error) {
    console.error('SSO token generation error:', error);
    return res.status(500).json({
      success: false,
      error: 'Failed to generate dashboard access token',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}

/**
 * Validate SSO token (exported for use by SSO auth endpoint)
 */
export const validateSSOToken = (token: string) => {
  const tokenData = ssoTokens.get(token);
  
  if (!tokenData) {
    return null;
  }

  if (new Date() > tokenData.expiresAt) {
    ssoTokens.delete(token);
    return null;
  }

  // Token is valid - remove it (single use)
  ssoTokens.delete(token);
  return tokenData;
};

/**
 * Clean up expired tokens
 */
function cleanupExpiredTokens() {
  const now = new Date();
  for (const [token, data] of ssoTokens.entries()) {
    if (now > data.expiresAt) {
      ssoTokens.delete(token);
    }
  }
}

/**
 * Get dashboard widget count by plan
 */
function getDashboardWidgetCount(plan: string): string {
  const limits = {
    free: '5 widgets',
    starter: '15 widgets', 
    pro: '50 widgets',
    enterprise: 'Unlimited'
  };
  return limits[plan as keyof typeof limits] || '5 widgets';
}

/**
 * Get dashboard refresh rate by plan
 */
function getDashboardRefreshRate(plan: string): string {
  const rates = {
    free: '1 hour',
    starter: '30 minutes',
    pro: '15 minutes', 
    enterprise: '5 minutes'
  };
  return rates[plan as keyof typeof rates] || '1 hour';
}