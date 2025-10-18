import { CyfeAPIService } from '../../../../lib/cyfe-api-service';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../../auth/[...nextauth]';

const cyfeService = new CyfeAPIService();

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    console.log(`❌ Method ${req.method} not allowed for SSO generate`);
    return res.status(405).json({ 
      error: 'Method not allowed',
      allowedMethods: ['POST']
    });
  }

  try {
    // Verify user authentication
    const session = await getServerSession(req, res, authOptions);
    
    if (!session) {
      console.log('❌ Unauthorized access to SSO generate');
      return res.status(401).json({ 
        error: 'Unauthorized', 
        message: 'Please sign in to generate SSO token' 
      });
    }

    console.log(`🔐 SSO token generation requested by: ${session.user.email}`);

    try {
      const ssoData = await cyfeService.generateSSOToken(
        session.user.email,
        session.user.id || session.user.email
      );

      // Add additional metadata for the dashboard
      const enhancedSSOData = {
        ...ssoData,
        user: {
          email: session.user.email,
          name: session.user.name,
          id: session.user.id || session.user.email
        },
        domain: 'siteoptz.ai',
        dashboardUrls: {
          full: `https://siteoptz.ai/dashboard?token=${ssoData.token}`,
          widgets: `https://siteoptz.ai/widgets?token=${ssoData.token}`,
          embed: `https://siteoptz.ai/embed?token=${ssoData.token}`
        },
        expires: new Date(Date.now() + 3600000).toISOString(), // 1 hour
        generatedAt: new Date().toISOString()
      };

      console.log(`✅ SSO token generated successfully for: ${session.user.email}`);
      res.status(200).json({
        success: true,
        data: enhancedSSOData,
        message: 'SSO token generated successfully',
        timestamp: new Date().toISOString()
      });
    } catch (error) {
      console.error('❌ Error generating SSO token:', error);
      res.status(500).json({ 
        error: 'Failed to generate SSO token', 
        message: error.message,
        timestamp: new Date().toISOString()
      });
    }
  } catch (error) {
    console.error('❌ Unexpected error in SSO generate:', error);
    res.status(500).json({ 
      error: 'Internal server error', 
      message: 'An unexpected error occurred',
      timestamp: new Date().toISOString()
    });
  }
}