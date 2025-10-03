// API endpoint for creating premium Power BI dashboards with custom branding
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

    // Check for premium/enterprise plan
    const userPlan = session.user?.plan || 'free';
    if (!['premium', 'enterprise'].includes(userPlan)) {
      return res.status(403).json({ 
        error: 'Premium dashboard requires Premium or Enterprise plan',
        upgradeUrl: '/upgrade'
      });
    }

    const { clientId, features = [], branding = {} } = req.body;

    // Default features based on plan
    const defaultFeatures = userPlan === 'enterprise' 
      ? ['ai-insights', 'custom-reports', 'enterprise-security', 'api-access', 'white-label']
      : ['ai-insights', 'custom-reports', 'advanced-filters'];

    const finalFeatures = [...new Set([...defaultFeatures, ...features])];

    // Default branding with SiteOptz theme
    const defaultBranding = {
      primaryColor: '#3B82F6',
      secondaryColor: '#1F2937',
      accentColor: '#10B981',
      logo: '/images/siteoptz-logo.png',
      customDomain: userPlan === 'enterprise' ? `${clientId}.siteoptz.ai` : null
    };

    const finalBranding = { ...defaultBranding, ...branding };

    // Generate premium dashboard access
    const premiumAccess = await powerbiService.createPremiumDashboard({
      clientId: clientId || session.user.id,
      features: finalFeatures,
      branding: finalBranding
    });

    // Add additional premium features
    const enhancedAccess = {
      ...premiumAccess,
      features: {
        exportEnabled: true,
        printEnabled: true,
        bookmarksEnabled: finalFeatures.includes('bookmarks'),
        visualHeaderEnabled: true,
        selectionEnabled: true,
        syncing: {
          slicers: true,
          filters: true
        },
        panes: {
          filters: finalFeatures.includes('custom-filters'),
          pageNavigation: true,
          selection: finalFeatures.includes('advanced-selection'),
          bookmarks: finalFeatures.includes('bookmarks'),
          fields: userPlan === 'enterprise'
        }
      },
      customization: {
        theme: finalBranding,
        locale: session.user?.locale || 'en-US',
        contrastMode: session.user?.preferences?.highContrast || false
      },
      analytics: {
        trackingEnabled: true,
        userId: session.user.id,
        plan: userPlan
      }
    };

    res.status(200).json({
      success: true,
      dashboard: enhancedAccess
    });
  } catch (error) {
    console.error('Error creating premium dashboard:', error);
    res.status(500).json({ 
      error: 'Failed to create premium dashboard',
      message: error.message 
    });
  }
}