// lib/ai-recommendations.ts
// AI-powered recommendations engine for Google Ads optimization

import { GoogleAdsCampaign, GoogleAdsMetrics } from './google-ads-api';

export interface Recommendation {
  id: string;
  type: 'budget' | 'bid' | 'keyword' | 'ad_copy' | 'landing_page' | 'audience' | 'schedule';
  priority: 'high' | 'medium' | 'low';
  title: string;
  description: string;
  impact: string;
  effort: 'low' | 'medium' | 'high';
  estimated_improvement: string;
  action_required: string;
  reasoning: string;
  data_points: any[];
}

export interface CampaignAnalysis {
  campaign_id: string;
  campaign_name: string;
  performance_score: number;
  recommendations: Recommendation[];
  strengths: string[];
  weaknesses: string[];
  opportunities: string[];
}

export interface AccountAnalysis {
  overall_score: number;
  top_performing_campaigns: string[];
  underperforming_campaigns: string[];
  budget_optimization_opportunities: Recommendation[];
  keyword_optimization_opportunities: Recommendation[];
  ad_copy_optimization_opportunities: Recommendation[];
  audience_optimization_opportunities: Recommendation[];
  summary: string;
}

class AIRecommendationsEngine {
  
  // Analyze campaign performance and generate recommendations
  analyzeCampaign(campaign: GoogleAdsCampaign, industryBenchmarks: any = {}): CampaignAnalysis {
    const recommendations: Recommendation[] = [];
    const strengths: string[] = [];
    const weaknesses: string[] = [];
    const opportunities: string[] = [];

    // Calculate performance score (0-100)
    let performanceScore = 0;
    
    // CTR Analysis
    if (campaign.ctr > 3) {
      performanceScore += 20;
      strengths.push(`Excellent CTR of ${campaign.ctr.toFixed(2)}%`);
    } else if (campaign.ctr < 1) {
      performanceScore += 5;
      weaknesses.push(`Low CTR of ${campaign.ctr.toFixed(2)}%`);
      recommendations.push({
        id: `ctr_${campaign.id}`,
        type: 'ad_copy',
        priority: 'high',
        title: 'Improve Ad Copy to Increase CTR',
        description: `Your CTR of ${campaign.ctr.toFixed(2)}% is below industry average. Consider updating ad copy with more compelling headlines and descriptions.`,
        impact: 'High - CTR directly affects Quality Score and CPC',
        effort: 'medium',
        estimated_improvement: '20-40% CTR increase',
        action_required: 'Update ad copy with more compelling headlines, add emotional triggers, and include clear CTAs',
        reasoning: 'Low CTR indicates ads are not resonating with your target audience',
        data_points: [{ metric: 'ctr', current: campaign.ctr, benchmark: 2.5 }]
      });
    } else {
      performanceScore += 15;
    }

    // Conversion Rate Analysis
    if (campaign.conversion_rate > 5) {
      performanceScore += 25;
      strengths.push(`Excellent conversion rate of ${campaign.conversion_rate.toFixed(2)}%`);
    } else if (campaign.conversion_rate < 2) {
      performanceScore += 5;
      weaknesses.push(`Low conversion rate of ${campaign.conversion_rate.toFixed(2)}%`);
      recommendations.push({
        id: `conversion_${campaign.id}`,
        type: 'landing_page',
        priority: 'high',
        title: 'Optimize Landing Page for Conversions',
        description: `Your conversion rate of ${campaign.conversion_rate.toFixed(2)}% is below average. Focus on landing page optimization.`,
        impact: 'High - Direct impact on ROI and cost per conversion',
        effort: 'high',
        estimated_improvement: '30-60% conversion rate increase',
        action_required: 'Improve landing page load speed, add trust signals, optimize form fields, and test different layouts',
        reasoning: 'Low conversion rate suggests landing page experience needs improvement',
        data_points: [{ metric: 'conversion_rate', current: campaign.conversion_rate, benchmark: 3.5 }]
      });
    } else {
      performanceScore += 20;
    }

    // ROAS Analysis
    if (campaign.roas > 4) {
      performanceScore += 25;
      strengths.push(`Excellent ROAS of ${campaign.roas.toFixed(2)}x`);
    } else if (campaign.roas < 2) {
      performanceScore += 5;
      weaknesses.push(`Low ROAS of ${campaign.roas.toFixed(2)}x`);
      recommendations.push({
        id: `roas_${campaign.id}`,
        type: 'bid',
        priority: 'high',
        title: 'Optimize Bidding Strategy for Better ROAS',
        description: `Your ROAS of ${campaign.roas.toFixed(2)}x is below target. Consider adjusting your bidding strategy.`,
        impact: 'High - Direct impact on profitability',
        effort: 'medium',
        estimated_improvement: '25-50% ROAS improvement',
        action_required: 'Switch to Target ROAS bidding, adjust bid adjustments, and focus on high-value keywords',
        reasoning: 'Low ROAS indicates inefficient spend allocation',
        data_points: [{ metric: 'roas', current: campaign.roas, benchmark: 3.0 }]
      });
    } else {
      performanceScore += 20;
    }

    // CPC Analysis
    if (campaign.cpc < 1) {
      performanceScore += 15;
      strengths.push(`Low CPC of $${campaign.cpc.toFixed(2)}`);
    } else if (campaign.cpc > 3) {
      performanceScore += 5;
      weaknesses.push(`High CPC of $${campaign.cpc.toFixed(2)}`);
      recommendations.push({
        id: `cpc_${campaign.id}`,
        type: 'keyword',
        priority: 'medium',
        title: 'Optimize Keywords to Reduce CPC',
        description: `Your CPC of $${campaign.cpc.toFixed(2)} is above average. Focus on keyword optimization.`,
        impact: 'Medium - Lower CPC improves efficiency',
        effort: 'medium',
        estimated_improvement: '15-30% CPC reduction',
        action_required: 'Add negative keywords, improve Quality Score, and focus on long-tail keywords',
        reasoning: 'High CPC suggests competitive keywords or poor Quality Score',
        data_points: [{ metric: 'cpc', current: campaign.cpc, benchmark: 2.0 }]
      });
    } else {
      performanceScore += 10;
    }

    // Budget Analysis
    const budgetUtilization = (campaign.spent / campaign.budget) * 100;
    if (budgetUtilization > 90) {
      opportunities.push('High budget utilization - consider increasing budget');
      recommendations.push({
        id: `budget_${campaign.id}`,
        type: 'budget',
        priority: 'medium',
        title: 'Increase Budget for High-Performing Campaign',
        description: `Your campaign is utilizing ${budgetUtilization.toFixed(1)}% of budget with good performance. Consider increasing budget.`,
        impact: 'Medium - More volume at current performance levels',
        effort: 'low',
        estimated_improvement: '20-40% more conversions',
        action_required: 'Increase daily budget by 20-30% and monitor performance',
        reasoning: 'High budget utilization with good performance indicates opportunity for scale',
        data_points: [{ metric: 'budget_utilization', current: budgetUtilization, benchmark: 80 }]
      });
    } else if (budgetUtilization < 50) {
      weaknesses.push(`Low budget utilization of ${budgetUtilization.toFixed(1)}%`);
      recommendations.push({
        id: `budget_low_${campaign.id}`,
        type: 'bid',
        priority: 'medium',
        title: 'Increase Bids to Improve Budget Utilization',
        description: `Your campaign is only using ${budgetUtilization.toFixed(1)}% of budget. Consider increasing bids.`,
        impact: 'Medium - Better budget utilization',
        effort: 'low',
        estimated_improvement: 'Better budget utilization and potentially more conversions',
        action_required: 'Increase bids by 10-20% to improve ad rank and budget utilization',
        reasoning: 'Low budget utilization suggests bids may be too conservative',
        data_points: [{ metric: 'budget_utilization', current: budgetUtilization, benchmark: 80 }]
      });
    }

    // Status Analysis
    if (campaign.status === 'PAUSED') {
      recommendations.push({
        id: `status_${campaign.id}`,
        type: 'schedule',
        priority: 'low',
        title: 'Review Paused Campaign',
        description: 'This campaign is currently paused. Review performance and consider reactivating if it was performing well.',
        impact: 'Low - No current impact',
        effort: 'low',
        estimated_improvement: 'Potential revenue recovery',
        action_required: 'Review historical performance and decide whether to reactivate',
        reasoning: 'Paused campaigns may have untapped potential',
        data_points: [{ metric: 'status', current: campaign.status }]
      });
    }

    return {
      campaign_id: campaign.id,
      campaign_name: campaign.name,
      performance_score: Math.min(100, performanceScore),
      recommendations,
      strengths,
      weaknesses,
      opportunities
    };
  }

  // Analyze overall account performance
  analyzeAccount(campaigns: GoogleAdsCampaign[], metrics: GoogleAdsMetrics): AccountAnalysis {
    const campaignAnalyses = campaigns.map(campaign => this.analyzeCampaign(campaign));
    
    // Sort campaigns by performance
    const sortedCampaigns = campaignAnalyses.sort((a, b) => b.performance_score - a.performance_score);
    
    const topPerformingCampaigns = sortedCampaigns
      .filter(c => c.performance_score >= 70)
      .map(c => c.campaign_name);
    
    const underperformingCampaigns = sortedCampaigns
      .filter(c => c.performance_score < 50)
      .map(c => c.campaign_name);

    // Aggregate recommendations by type
    const allRecommendations = campaignAnalyses.flatMap(c => c.recommendations);
    
    const budgetOptimization = allRecommendations.filter(r => r.type === 'budget');
    const keywordOptimization = allRecommendations.filter(r => r.type === 'keyword');
    const adCopyOptimization = allRecommendations.filter(r => r.type === 'ad_copy');
    const audienceOptimization = allRecommendations.filter(r => r.type === 'audience');

    // Calculate overall score
    const overallScore = campaignAnalyses.length > 0 
      ? campaignAnalyses.reduce((sum, c) => sum + c.performance_score, 0) / campaignAnalyses.length
      : 0;

    // Generate summary
    const summary = this.generateAccountSummary(metrics, overallScore, topPerformingCampaigns.length, underperformingCampaigns.length);

    return {
      overall_score: Math.round(overallScore),
      top_performing_campaigns: topPerformingCampaigns,
      underperforming_campaigns: underperformingCampaigns,
      budget_optimization_opportunities: budgetOptimization,
      keyword_optimization_opportunities: keywordOptimization,
      ad_copy_optimization_opportunities: adCopyOptimization,
      audience_optimization_opportunities: audienceOptimization,
      summary
    };
  }

  private generateAccountSummary(metrics: GoogleAdsMetrics, overallScore: number, topCampaigns: number, underperformingCampaigns: number): string {
    let summary = `Your Google Ads account has an overall performance score of ${overallScore.toFixed(0)}/100. `;
    
    if (overallScore >= 80) {
      summary += "Excellent performance! Your campaigns are well-optimized. ";
    } else if (overallScore >= 60) {
      summary += "Good performance with room for improvement. ";
    } else {
      summary += "There are significant optimization opportunities. ";
    }

    summary += `You have ${topCampaigns} high-performing campaigns and ${underperformingCampaigns} campaigns that need attention. `;
    
    if (metrics.total_roas > 3) {
      summary += "Your ROAS is strong, indicating good profitability. ";
    } else if (metrics.total_roas < 2) {
      summary += "Your ROAS needs improvement to ensure profitability. ";
    }

    if (metrics.average_ctr > 2.5) {
      summary += "Your CTR is above average, showing good ad relevance. ";
    } else {
      summary += "Consider improving ad copy to increase CTR. ";
    }

    if (metrics.average_conversion_rate > 3) {
      summary += "Your conversion rate is solid. ";
    } else {
      summary += "Focus on landing page optimization to improve conversions. ";
    }

    return summary;
  }

  // Generate specific recommendations based on data patterns
  generateSmartRecommendations(campaigns: GoogleAdsCampaign[], metrics: GoogleAdsMetrics): Recommendation[] {
    const recommendations: Recommendation[] = [];

    // High spend, low conversion campaigns
    const highSpendLowConversion = campaigns.filter(c => 
      c.spent > 100 && c.conversion_rate < 2
    );

    if (highSpendLowConversion.length > 0) {
      recommendations.push({
        id: 'high_spend_low_conversion',
        type: 'landing_page',
        priority: 'high',
        title: 'Optimize High-Spend, Low-Conversion Campaigns',
        description: `${highSpendLowConversion.length} campaigns are spending heavily but converting poorly.`,
        impact: 'High - Significant cost savings and revenue improvement',
        effort: 'high',
        estimated_improvement: '40-70% improvement in cost per conversion',
        action_required: 'Audit landing pages, improve user experience, and test different offers',
        reasoning: 'High spend with low conversions indicates landing page or targeting issues',
        data_points: highSpendLowConversion.map(c => ({ 
          campaign: c.name, 
          spend: c.spent, 
          conversion_rate: c.conversion_rate 
        }))
      });
    }

    // Low CTR campaigns
    const lowCTRCampaigns = campaigns.filter(c => c.ctr < 1.5);
    if (lowCTRCampaigns.length > 0) {
      recommendations.push({
        id: 'low_ctr_campaigns',
        type: 'ad_copy',
        priority: 'high',
        title: 'Improve Ad Copy for Low CTR Campaigns',
        description: `${lowCTRCampaigns.length} campaigns have CTR below 1.5%.`,
        impact: 'High - Better Quality Score and lower CPCs',
        effort: 'medium',
        estimated_improvement: '30-50% CTR improvement',
        action_required: 'Rewrite ad copy with more compelling headlines and clear value propositions',
        reasoning: 'Low CTR indicates ads are not resonating with target audience',
        data_points: lowCTRCampaigns.map(c => ({ 
          campaign: c.name, 
          ctr: c.ctr 
        }))
      });
    }

    // Budget optimization opportunities
    const underutilizedCampaigns = campaigns.filter(c => 
      (c.spent / c.budget) < 0.7 && c.conversion_rate > 3
    );

    if (underutilizedCampaigns.length > 0) {
      recommendations.push({
        id: 'budget_optimization',
        type: 'budget',
        priority: 'medium',
        title: 'Scale High-Performing, Underutilized Campaigns',
        description: `${underutilizedCampaigns.length} campaigns are performing well but not using full budget.`,
        impact: 'Medium - More volume at good performance levels',
        effort: 'low',
        estimated_improvement: '25-40% more conversions',
        action_required: 'Increase budgets by 20-30% for these campaigns',
        reasoning: 'Good performance with low budget utilization indicates scaling opportunity',
        data_points: underutilizedCampaigns.map(c => ({ 
          campaign: c.name, 
          budget_utilization: (c.spent / c.budget) * 100,
          conversion_rate: c.conversion_rate 
        }))
      });
    }

    return recommendations;
  }
}

// Export singleton instance
export const aiRecommendationsEngine = new AIRecommendationsEngine();

// Helper functions
export const analyzeCampaign = (campaign: GoogleAdsCampaign) => {
  return aiRecommendationsEngine.analyzeCampaign(campaign);
};

export const analyzeAccount = (campaigns: GoogleAdsCampaign[], metrics: GoogleAdsMetrics) => {
  return aiRecommendationsEngine.analyzeAccount(campaigns, metrics);
};

export const generateSmartRecommendations = (campaigns: GoogleAdsCampaign[], metrics: GoogleAdsMetrics) => {
  return aiRecommendationsEngine.generateSmartRecommendations(campaigns, metrics);
};
