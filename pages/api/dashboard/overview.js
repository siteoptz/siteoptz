// pages/api/dashboard/overview.js
export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // For now, skip authentication to test the dashboard
    // In production, add proper session validation

    // Mock data for now - in production this would come from your database
    const mockData = {
      metrics: {
        total_revenue: '$24,580',
        total_clicks: '156,847',
        conversion_rate: '3.24%',
        roas: '4.2x'
      },
      trends: {
        revenue: { current: 24580, previous: 21200, change: 15.9 },
        clicks: { current: 156847, previous: 144200, change: 8.8 },
        conversion_rate: { current: 3.24, previous: 3.31, change: -2.1 },
        roas: { current: 4.2, previous: 3.8, change: 10.5 }
      },
      platforms: [
        { name: 'Google Ads', revenue: 12500, percentage: 51 },
        { name: 'Meta Ads', revenue: 7800, percentage: 32 },
        { name: 'LinkedIn Ads', revenue: 2800, percentage: 11 },
        { name: 'TikTok Ads', revenue: 1480, percentage: 6 }
      ],
      recent_activity: [
        {
          id: 1,
          action: 'Google Ads campaign optimized',
          platform: 'Google Ads',
          time: '2 hours ago',
          type: 'optimization',
          impact: '+12% CTR improvement'
        },
        {
          id: 2,
          action: 'New insight generated for Meta campaigns',
          platform: 'Meta Ads',
          time: '4 hours ago',
          type: 'insight',
          impact: 'Budget reallocation opportunity'
        },
        {
          id: 3,
          action: 'Budget automation triggered',
          platform: 'Google Ads',
          time: '6 hours ago',
          type: 'automation',
          impact: '$500 budget increase'
        }
      ],
      connected_accounts: [
        { platform: 'Google Ads', status: 'connected', accounts: 3 },
        { platform: 'Meta Ads', status: 'connected', accounts: 2 },
        { platform: 'TikTok Ads', status: 'disconnected', accounts: 0 },
        { platform: 'LinkedIn Ads', status: 'disconnected', accounts: 0 }
      ]
    };

    res.status(200).json(mockData);
  } catch (error) {
    console.error('Dashboard overview error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}