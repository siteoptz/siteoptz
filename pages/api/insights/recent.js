// pages/api/insights/recent.js
export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // For now, skip authentication to test the dashboard
    // In production, add proper session validation

    // Mock insights data - in production this would come from your AI insights generation
    const mockInsights = {
      insights: [
        {
          id: 'insight_001',
          type: 'optimization',
          title: 'Increase Google Ads Budget for High-Performing Keywords',
          description: 'Your top 5 keywords are being limited by budget. Increasing budget by 25% could yield 40% more conversions.',
          platform: 'Google Ads',
          confidence_score: 0.92,
          impact_score: 8.5,
          actionable: true,
          automation_possible: true,
          created_at: new Date().toISOString(),
          estimated_impact: '+40% conversions',
          category: 'budget'
        },
        {
          id: 'insight_002',
          type: 'performance',
          title: 'Meta Ads Creative Fatigue Detected',
          description: 'Your top-performing ad creative has seen a 15% CTR decline over the past 7 days. Consider rotating to fresh creative assets.',
          platform: 'Meta Ads',
          confidence_score: 0.88,
          impact_score: 7.2,
          actionable: true,
          automation_possible: false,
          created_at: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
          estimated_impact: '+20% CTR recovery',
          category: 'creative'
        },
        {
          id: 'insight_003',
          type: 'opportunity',
          title: 'Expand to LinkedIn Ads for B2B Targeting',
          description: 'Based on your current audience and conversion data, LinkedIn Ads could provide 25% lower CPL for B2B leads.',
          platform: 'LinkedIn Ads',
          confidence_score: 0.75,
          impact_score: 6.8,
          actionable: true,
          automation_possible: false,
          created_at: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
          estimated_impact: '-25% cost per lead',
          category: 'expansion'
        },
        {
          id: 'insight_004',
          type: 'risk',
          title: 'High CPC Trend in Google Ads Campaign',
          description: 'Campaign "Brand Awareness" has seen 35% CPC increase over 14 days. This may indicate increased competition or quality score issues.',
          platform: 'Google Ads',
          confidence_score: 0.95,
          impact_score: 7.5,
          actionable: true,
          automation_possible: true,
          created_at: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(),
          estimated_impact: 'Cost optimization needed',
          category: 'bidding'
        },
        {
          id: 'insight_005',
          type: 'optimization',
          title: 'Dayparting Opportunity for Better ROAS',
          description: 'Data shows 60% higher conversion rates between 2-6 PM. Adjusting budget allocation to these hours could improve ROAS by 30%.',
          platform: 'Google Ads',
          confidence_score: 0.85,
          impact_score: 8.0,
          actionable: true,
          automation_possible: true,
          created_at: new Date(Date.now() - 8 * 60 * 60 * 1000).toISOString(),
          estimated_impact: '+30% ROAS',
          category: 'schedule'
        }
      ],
      summary: {
        total_insights: 5,
        actionable_insights: 5,
        automated_insights: 3,
        avg_confidence: 0.87
      }
    };

    res.status(200).json(mockInsights);
  } catch (error) {
    console.error('Recent insights error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}