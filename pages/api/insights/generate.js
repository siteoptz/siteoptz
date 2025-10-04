// pages/api/insights/generate.js
import InsightsGenerator from '../../../lib/ai/insights-generator';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { accountData, options = {} } = req.body;

    if (!accountData) {
      return res.status(400).json({ error: 'Account data is required' });
    }

    // Initialize Claude AI insights generator
    const insightsGenerator = new InsightsGenerator();
    
    // Generate insights using Claude
    const insights = await insightsGenerator.generateInsights(
      'demo-user', // In production, get from session
      accountData,
      options
    );

    res.status(200).json({
      success: true,
      insights,
      generated_at: new Date().toISOString()
    });

  } catch (error) {
    console.error('Insights generation error:', error);
    
    // Return fallback insights if Claude API fails
    const fallbackInsights = {
      executive_summary: {
        overall_performance: "Unable to generate AI insights at this time",
        key_highlights: ["Analysis completed with limited data"],
        primary_concerns: ["AI insights temporarily unavailable"]
      },
      performance_analysis: { trends: [], anomalies: [] },
      optimization_opportunities: [],
      recommendations: [],
      risks_and_alerts: [],
      competitive_insights: { market_position: "Analysis unavailable", opportunities: [], threats: [] },
      budget_recommendations: [],
      next_actions: [],
      generated_at: new Date().toISOString(),
      confidence_score: 0.1,
      insights_count: 0,
      actionable_items: [],
      fallback: true,
      error_message: error.message
    };

    res.status(200).json({
      success: false,
      insights: fallbackInsights,
      error: 'Failed to generate insights, returned fallback data'
    });
  }
}