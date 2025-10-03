// API endpoint to list available Power BI reports
import { PowerBIAnalyticsService } from '@/lib/powerbi-service';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/pages/api/auth/[...nextauth]';

const powerbiService = new PowerBIAnalyticsService();

export default async function handler(req, res) {
  if (req.method !== 'GET') {
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
        error: 'Power BI reports require a Pro plan or higher',
        upgradeUrl: '/upgrade'
      });
    }

    // Get available reports
    const reportsResponse = await powerbiService.getReports();
    
    // Filter reports based on user plan
    const availableReports = reportsResponse.value?.filter(report => {
      // Basic reports for all pro users
      const basicReports = ['Marketing Overview', 'Campaign Performance', 'ROI Analysis'];
      
      // Premium reports for premium+ users
      const premiumReports = ['Advanced Analytics', 'Custom Metrics', 'Predictive Analysis'];
      
      // Enterprise reports for enterprise users
      const enterpriseReports = ['Executive Dashboard', 'Multi-Account View', 'Custom Reports'];
      
      if (userPlan === 'enterprise') {
        return true; // All reports
      } else if (userPlan === 'premium') {
        return basicReports.includes(report.name) || premiumReports.includes(report.name);
      } else {
        return basicReports.includes(report.name);
      }
    }) || [];

    res.status(200).json({
      success: true,
      reports: availableReports.map(report => ({
        id: report.id,
        name: report.name,
        description: report.description || 'Marketing analytics report',
        embedUrl: report.embedUrl,
        createdDateTime: report.createdDateTime,
        modifiedDateTime: report.modifiedDateTime,
        isFromPbix: report.isFromPbix,
        isOwnedByMe: report.isOwnedByMe,
        planTier: getPlanTierForReport(report.name)
      }))
    });
  } catch (error) {
    console.error('Error fetching reports:', error);
    res.status(500).json({ 
      error: 'Failed to fetch reports',
      message: error.message 
    });
  }
}

function getPlanTierForReport(reportName) {
  const basicReports = ['Marketing Overview', 'Campaign Performance', 'ROI Analysis'];
  const premiumReports = ['Advanced Analytics', 'Custom Metrics', 'Predictive Analysis'];
  const enterpriseReports = ['Executive Dashboard', 'Multi-Account View', 'Custom Reports'];
  
  if (enterpriseReports.includes(reportName)) return 'enterprise';
  if (premiumReports.includes(reportName)) return 'premium';
  if (basicReports.includes(reportName)) return 'pro';
  return 'basic';
}