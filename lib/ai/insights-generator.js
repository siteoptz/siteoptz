// lib/ai/insights-generator.js
export class InsightsGenerator {
  constructor() {
    this.anthropicApiKey = process.env.ANTHROPIC_API_KEY;
    this.baseUrl = 'https://api.anthropic.com/v1/messages';
  }

  async generateInsights(userId, accountData, options = {}) {
    try {
      const prompt = this.buildInsightsPrompt(accountData, options);
      
      const response = await this.callClaude({
        model: 'claude-3-sonnet-20240229',
        max_tokens: 3000,
        messages: [
          {
            role: 'user',
            content: prompt
          }
        ]
      });

      return this.parseInsights(response.content[0].text, userId);
    } catch (error) {
      console.error('Failed to generate insights:', error);
      return this.createFallbackInsights(accountData);
    }
  }

  buildInsightsPrompt(accountData, options = {}) {
    const timeframe = options.timeframe || 'last 30 days';
    const focusAreas = options.focusAreas || ['performance', 'optimization', 'risks', 'opportunities'];
    
    return `
You are an expert marketing analytics consultant. Analyze the following marketing data and provide actionable insights.

MARKETING DATA SUMMARY:
${this.formatDataForPrompt(accountData)}

ANALYSIS REQUIREMENTS:
1. Time Period: ${timeframe}
2. Focus Areas: ${focusAreas.join(', ')}
3. Business Context: ${options.businessContext || 'E-commerce/SaaS business'}

Please provide insights in the following JSON format:

{
  "executive_summary": {
    "overall_performance": "Brief summary of overall performance",
    "key_highlights": ["3-5 key highlights"],
    "primary_concerns": ["2-3 main concerns or issues"]
  },
  "performance_analysis": {
    "trends": [
      {
        "metric": "metric_name",
        "trend": "increasing/decreasing/stable",
        "change_percentage": 15.2,
        "significance": "high/medium/low",
        "explanation": "Why this trend is occurring"
      }
    ],
    "anomalies": [
      {
        "platform": "platform_name",
        "metric": "metric_name",
        "anomaly_type": "spike/drop/unusual_pattern",
        "severity": "high/medium/low",
        "potential_causes": ["cause1", "cause2"]
      }
    ]
  },
  "optimization_opportunities": [
    {
      "title": "Opportunity title",
      "description": "Detailed description",
      "platform": "platform_name",
      "impact_potential": "high/medium/low",
      "effort_required": "high/medium/low",
      "estimated_impact": "Quantified benefit if possible",
      "implementation_steps": ["step1", "step2", "step3"]
    }
  ],
  "recommendations": [
    {
      "title": "Recommendation title",
      "description": "Detailed description",
      "priority": "high/medium/low",
      "category": "bidding/targeting/creative/budget/keyword",
      "platform": "platform_name",
      "impact_score": 8.5,
      "confidence_score": 0.85,
      "timeframe": "immediate/short_term/long_term",
      "automation_possible": true,
      "estimated_roi": "2.3x increase in ROAS",
      "specific_actions": [
        {
          "action": "action_description",
          "parameters": {"param1": "value1"},
          "expected_outcome": "outcome_description"
        }
      ]
    }
  ],
  "risks_and_alerts": [
    {
      "title": "Risk title",
      "description": "Risk description",
      "severity": "high/medium/low",
      "platform": "platform_name",
      "probability": "high/medium/low",
      "potential_impact": "Impact description",
      "mitigation_steps": ["step1", "step2"]
    }
  ],
  "competitive_insights": {
    "market_position": "Assessment based on benchmarks",
    "opportunities": ["Competitive opportunities"],
    "threats": ["Competitive threats"]
  },
  "budget_recommendations": [
    {
      "platform": "platform_name",
      "current_allocation": "percentage",
      "recommended_allocation": "percentage",
      "reasoning": "Why this change is recommended"
    }
  ],
  "next_actions": [
    {
      "action": "Specific action to take",
      "timeline": "When to implement",
      "owner": "Who should implement",
      "priority": "high/medium/low"
    }
  ]
}

IMPORTANT GUIDELINES:
- Base insights on actual data patterns and trends
- Provide specific, actionable recommendations
- Include confidence scores for recommendations
- Focus on high-impact, implementable changes
- Consider platform-specific best practices
- Identify automation opportunities where possible
- Be precise with numbers and percentages
- Avoid generic advice - be specific to this data
`;
  }

  formatDataForPrompt(accountData) {
    let formatted = '';
    
    for (const [platform, data] of Object.entries(accountData)) {
      formatted += `\n${platform.toUpperCase()} PLATFORM:\n`;
      
      if (data.metrics) {
        formatted += `Key Metrics:\n`;
        for (const [metric, value] of Object.entries(data.metrics)) {
          formatted += `- ${metric}: ${value}\n`;
        }
      }
      
      if (data.trends) {
        formatted += `Trends:\n`;
        for (const trend of data.trends) {
          formatted += `- ${trend.metric}: ${trend.direction} ${trend.percentage}%\n`;
        }
      }
      
      if (data.campaigns && data.campaigns.length > 0) {
        formatted += `Top Campaigns:\n`;
        data.campaigns.slice(0, 5).forEach(campaign => {
          formatted += `- ${campaign.name}: ${campaign.performance_summary}\n`;
        });
      }
      
      formatted += '\n';
    }
    
    return formatted;
  }

  async callClaude(payload) {
    const response = await fetch(this.baseUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': this.anthropicApiKey,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(`Claude API error: ${response.status} - ${error}`);
    }

    return await response.json();
  }

  parseInsights(content, userId) {
    try {
      // Try to extract JSON from the response
      const jsonMatch = content.match(/\{[\s\S]*\}/);
      if (!jsonMatch) {
        throw new Error('No JSON found in response');
      }
      
      const insights = JSON.parse(jsonMatch[0]);
      
      // Validate and enhance the insights
      return {
        ...insights,
        user_id: userId,
        generated_at: new Date().toISOString(),
        confidence_score: this.calculateOverallConfidence(insights),
        insights_count: this.countInsights(insights),
        actionable_items: this.extractActionableItems(insights)
      };
    } catch (error) {
      console.error('Failed to parse Claude response:', error);
      throw new Error(`Insights parsing failed: ${error.message}`);
    }
  }

  calculateOverallConfidence(insights) {
    const recommendations = insights.recommendations || [];
    if (recommendations.length === 0) return 0.5;
    
    const avgConfidence = recommendations.reduce((sum, rec) => 
      sum + (rec.confidence_score || 0.5), 0) / recommendations.length;
    
    return Math.round(avgConfidence * 100) / 100;
  }

  countInsights(insights) {
    let count = 0;
    count += (insights.optimization_opportunities || []).length;
    count += (insights.recommendations || []).length;
    count += (insights.risks_and_alerts || []).length;
    return count;
  }

  extractActionableItems(insights) {
    const actionable = [];
    
    // Extract from recommendations
    (insights.recommendations || []).forEach(rec => {
      if (rec.automation_possible) {
        actionable.push({
          type: 'automated_recommendation',
          title: rec.title,
          priority: rec.priority,
          actions: rec.specific_actions || []
        });
      } else {
        actionable.push({
          type: 'manual_recommendation',
          title: rec.title,
          priority: rec.priority,
          description: rec.description
        });
      }
    });
    
    // Extract from optimization opportunities
    (insights.optimization_opportunities || []).forEach(opp => {
      actionable.push({
        type: 'optimization',
        title: opp.title,
        priority: opp.impact_potential,
        steps: opp.implementation_steps || []
      });
    });
    
    return actionable;
  }

  createFallbackInsights(accountData) {
    return {
      executive_summary: {
        overall_performance: "Unable to generate AI insights at this time",
        key_highlights: ["Data analysis completed", "Manual review recommended"],
        primary_concerns: ["Insights generation temporarily unavailable"]
      },
      performance_analysis: {
        trends: [],
        anomalies: []
      },
      optimization_opportunities: [],
      recommendations: [],
      risks_and_alerts: [],
      competitive_insights: {
        market_position: "Analysis unavailable",
        opportunities: [],
        threats: []
      },
      budget_recommendations: [],
      next_actions: [{
        action: "Review marketing data manually",
        timeline: "Today",
        owner: "Marketing team",
        priority: "medium"
      }],
      generated_at: new Date().toISOString(),
      confidence_score: 0.1,
      insights_count: 0,
      actionable_items: [],
      fallback: true
    };
  }

  async generateCampaignInsights(campaignData, platform) {
    const prompt = `
Analyze this ${platform} campaign performance data and provide specific insights:

${JSON.stringify(campaignData, null, 2)}

Focus on:
1. Performance trends
2. Optimization opportunities  
3. Budget efficiency
4. Audience insights
5. Creative performance

Provide actionable recommendations in JSON format.
`;

    try {
      const response = await this.callClaude({
        model: 'claude-3-sonnet-20240229',
        max_tokens: 2000,
        messages: [{ role: 'user', content: prompt }]
      });

      return this.parseInsights(response.content[0].text);
    } catch (error) {
      console.error('Failed to generate campaign insights:', error);
      return this.createFallbackInsights({ [platform]: campaignData });
    }
  }

  async generateCompetitiveInsights(industryData, competitorData) {
    const prompt = `
Analyze competitive landscape and provide strategic insights:

Industry Data: ${JSON.stringify(industryData, null, 2)}
Competitor Data: ${JSON.stringify(competitorData, null, 2)}

Provide insights on:
1. Market positioning
2. Competitive advantages
3. Gap opportunities
4. Threat assessment
5. Strategic recommendations

Return in JSON format with specific action items.
`;

    try {
      const response = await this.callClaude({
        model: 'claude-3-sonnet-20240229',
        max_tokens: 2000,
        messages: [{ role: 'user', content: prompt }]
      });

      return this.parseInsights(response.content[0].text);
    } catch (error) {
      console.error('Failed to generate competitive insights:', error);
      return this.createFallbackInsights({ competitive: competitorData });
    }
  }
}

export default InsightsGenerator;