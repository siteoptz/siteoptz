// API endpoint to generate Power BI embed tokens for authenticated users
import { PowerBIAnalyticsService } from '@/lib/powerbi-service';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/pages/api/auth/[...nextauth]';

const powerbiService = new PowerBIAnalyticsService();

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Get user session
    const session = await getServerSession(req, res, authOptions);
    
    if (!session) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    // Check if user has pro plan access
    const userPlan = session.user?.plan || 'free';
    if (!['pro', 'premium', 'enterprise'].includes(userPlan)) {
      return res.status(403).json({ 
        error: 'Power BI dashboard access requires a Pro plan or higher',
        upgradeUrl: '/upgrade'
      });
    }

    const { reportId } = req.body;

    if (!reportId) {
      return res.status(400).json({ error: 'Report ID is required' });
    }

    // Determine user role based on plan
    const userRole = userPlan === 'enterprise' ? 'EnterpriseUser' : 
                     userPlan === 'premium' ? 'PremiumUser' : 'ProUser';

    // Generate embed token with row-level security
    const embedConfig = await powerbiService.getEmbedToken(
      reportId, 
      session.user.id,
      userRole
    );

    // Log usage for analytics
    console.log(`Power BI embed token generated for user ${session.user.id} (${userPlan} plan)`);

    res.status(200).json({
      success: true,
      embedToken: embedConfig.token,
      embedUrl: embedConfig.embedUrl,
      reportId: embedConfig.reportId,
      expiration: embedConfig.expiration
    });
  } catch (error) {
    console.error('Error generating embed token:', error);
    res.status(500).json({ 
      error: 'Failed to generate embed token',
      message: error.message 
    });
  }
}