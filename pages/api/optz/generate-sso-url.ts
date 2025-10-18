import { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../auth/[...nextauth]';
import * as crypto from 'crypto';

// Create a signed SSO token
function createSSOToken(email: string, plan: string): string {
  const secret = process.env.NEXTAUTH_SECRET || 'default-secret';
  const payload = JSON.stringify({
    email,
    plan,
    timestamp: Date.now(),
    expires: Date.now() + (5 * 60 * 1000) // 5 minutes
  });
  
  const hmac = crypto.createHmac('sha256', secret);
  hmac.update(payload);
  const signature = hmac.digest('hex');
  
  const token = Buffer.from(payload).toString('base64url') + '.' + signature;
  return token;
}

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

    const { email, plan } = req.body;

    // Validate the email matches the session
    if (email !== session.user.email) {
      return res.status(403).json({ error: 'Email mismatch' });
    }

    // Validate plan
    const validPlans = ['free', 'starter', 'pro', 'enterprise'];
    if (!validPlans.includes(plan)) {
      return res.status(400).json({ error: 'Invalid plan' });
    }

    // Generate SSO token
    const ssoToken = createSSOToken(email, plan);
    
    // Construct the SSO URL
    const dashboardPaths: Record<string, string> = {
      free: '/dashboard/free',
      starter: '/dashboard/starter',
      pro: '/dashboard/pro',
      enterprise: '/dashboard/enterprise'
    };
    
    const path = dashboardPaths[plan] || dashboardPaths.free;
    const ssoUrl = `https://siteoptz.ai${path}?sso_token=${ssoToken}`;
    
    console.log('Generated SSO URL for:', email, 'Plan:', plan);
    
    return res.status(200).json({
      success: true,
      ssoUrl,
      expires: Date.now() + (5 * 60 * 1000) // 5 minutes
    });

  } catch (error: any) {
    console.error('SSO URL generation error:', error);
    return res.status(500).json({
      error: 'Failed to generate SSO URL',
      details: error.message
    });
  }
}