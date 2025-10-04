// lib/ai/recommendation-engine.js
import InsightsGenerator from './insights-generator';
import AutomationExecutor from '../automation/executor';

export class RecommendationEngine {
  constructor() {
    this.insightsGenerator = new InsightsGenerator();
    this.automationExecutor = new AutomationExecutor();
    this.recommendationHistory = [];
  }

  async generateRecommendations(userId, accountData, options = {}) {
    try {
      console.log(`Generating recommendations for user ${userId}`);
      
      // Generate AI insights first
      const insights = await this.insightsGenerator.generateInsights(userId, accountData, options);
      
      // Process insights into actionable recommendations
      const recommendations = await this.processInsightsToRecommendations(insights, accountData);
      
      // Prioritize recommendations
      const prioritizedRecommendations = this.prioritizeRecommendations(recommendations);
      
      // Add automation feasibility
      const enrichedRecommendations = await this.enrichWithAutomationInfo(prioritizedRecommendations);
      
      // Store recommendations
      await this.storeRecommendations(userId, enrichedRecommendations);
      
      return {
        recommendations: enrichedRecommendations,
        insights_summary: insights.executive_summary,
        total_recommendations: enrichedRecommendations.length,
        automated_recommendations: enrichedRecommendations.filter(r => r.automation_possible).length,
        next_review_date: this.calculateNextReviewDate(options.reviewFrequency),
        generated_at: new Date().toISOString()
      };
    } catch (error) {
      console.error('Failed to generate recommendations:', error);
      return this.createFallbackRecommendations(userId, accountData);
    }
  }

  async processInsightsToRecommendations(insights, accountData) {
    const recommendations = [];
    
    // Process optimization opportunities
    if (insights.optimization_opportunities) {
      for (const opportunity of insights.optimization_opportunities) {
        const rec = await this.createRecommendationFromOpportunity(opportunity, accountData);
        if (rec) recommendations.push(rec);
      }
    }
    
    // Process direct recommendations from insights
    if (insights.recommendations) {
      for (const insightRec of insights.recommendations) {
        const rec = await this.createRecommendationFromInsight(insightRec, accountData);
        if (rec) recommendations.push(rec);
      }
    }
    
    // Process budget recommendations
    if (insights.budget_recommendations) {
      for (const budgetRec of insights.budget_recommendations) {
        const rec = await this.createBudgetRecommendation(budgetRec, accountData);
        if (rec) recommendations.push(rec);
      }
    }
    
    // Process risk-based recommendations
    if (insights.risks_and_alerts) {
      for (const risk of insights.risks_and_alerts) {
        const rec = await this.createRiskMitigationRecommendation(risk, accountData);
        if (rec) recommendations.push(rec);
      }
    }
    
    return recommendations;
  }

  async createRecommendationFromOpportunity(opportunity, accountData) {
    const baseRecommendation = {
      id: this.generateRecommendationId(),
      type: 'optimization',
      title: opportunity.title,
      description: opportunity.description,
      platform: opportunity.platform,
      impact_score: this.calculateImpactScore(opportunity),
      effort_level: opportunity.effort_required || 'medium',
      confidence_score: 0.8,
      estimated_roi: opportunity.estimated_impact || 'Not specified',
      created_at: new Date().toISOString(),
      status: 'pending'
    };

    // Determine specific action type and parameters
    const actionType = this.determineActionType(opportunity);
    const parameters = await this.generateActionParameters(opportunity, accountData);

    return {
      ...baseRecommendation,
      action_type: actionType,
      parameters,
      implementation_steps: opportunity.implementation_steps || [],
      automation_possible: this.isAutomationPossible(actionType),
      expected_impact: this.calculateExpectedImpact(opportunity, accountData)
    };
  }

  async createRecommendationFromInsight(insightRec, accountData) {
    return {
      id: this.generateRecommendationId(),
      type: 'insight_based',
      title: insightRec.title,
      description: insightRec.description,
      platform: insightRec.platform,
      priority: insightRec.priority,
      category: insightRec.category,
      impact_score: insightRec.impact_score || 5,
      confidence_score: insightRec.confidence_score || 0.7,
      effort_level: this.calculateEffortLevel(insightRec),
      timeframe: insightRec.timeframe || 'short_term',
      automation_possible: insightRec.automation_possible || false,
      estimated_roi: insightRec.estimated_roi,
      action_type: this.mapCategoryToActionType(insightRec.category),
      parameters: await this.extractParametersFromActions(insightRec.specific_actions, accountData),
      implementation_steps: this.extractImplementationSteps(insightRec.specific_actions),
      created_at: new Date().toISOString(),
      status: 'pending'
    };
  }

  async createBudgetRecommendation(budgetRec, accountData) {
    const currentBudget = this.getCurrentBudget(budgetRec.platform, accountData);
    const newAllocation = parseFloat(budgetRec.recommended_allocation.replace('%', ''));
    const currentAllocation = parseFloat(budgetRec.current_allocation.replace('%', ''));
    
    return {
      id: this.generateRecommendationId(),
      type: 'budget_optimization',
      title: `Optimize ${budgetRec.platform} budget allocation`,
      description: budgetRec.reasoning,
      platform: budgetRec.platform,
      action_type: 'budget_optimization',
      parameters: {
        budget_changes: [{
          campaign_id: 'all',
          current_budget: currentBudget * (currentAllocation / 100),
          new_budget: currentBudget * (newAllocation / 100),
          budget_type: 'daily',
          change_percentage: ((newAllocation - currentAllocation) / currentAllocation) * 100
        }],
        total_budget_change: currentBudget * ((newAllocation - currentAllocation) / 100)
      },
      impact_score: Math.abs(newAllocation - currentAllocation) / 10, // Higher difference = higher impact
      confidence_score: 0.75,
      effort_level: 'low',
      automation_possible: true,
      estimated_roi: `${Math.abs(newAllocation - currentAllocation)}% budget efficiency improvement`,
      created_at: new Date().toISOString(),
      status: 'pending'
    };
  }

  async createRiskMitigationRecommendation(risk, accountData) {
    return {
      id: this.generateRecommendationId(),
      type: 'risk_mitigation',
      title: `Mitigate risk: ${risk.title}`,
      description: risk.description,
      platform: risk.platform,
      action_type: this.mapRiskToActionType(risk),
      parameters: await this.generateRiskMitigationParameters(risk, accountData),
      impact_score: this.mapSeverityToImpactScore(risk.severity),
      confidence_score: this.mapProbabilityToConfidence(risk.probability),
      effort_level: 'medium',
      automation_possible: this.isRiskMitigationAutomatable(risk),
      estimated_roi: `Prevent potential ${risk.potential_impact}`,
      implementation_steps: risk.mitigation_steps || [],
      created_at: new Date().toISOString(),
      status: 'pending'
    };
  }

  prioritizeRecommendations(recommendations) {
    return recommendations.sort((a, b) => {
      // Priority score calculation
      const scoreA = this.calculatePriorityScore(a);
      const scoreB = this.calculatePriorityScore(b);
      
      return scoreB - scoreA; // Higher score = higher priority
    });
  }

  calculatePriorityScore(recommendation) {
    let score = 0;
    
    // Impact score weight (40%)
    score += (recommendation.impact_score || 5) * 0.4;
    
    // Confidence score weight (30%)
    score += (recommendation.confidence_score || 0.5) * 10 * 0.3;
    
    // Automation bonus (20%)
    if (recommendation.automation_possible) {
      score += 2;
    }
    
    // Effort penalty (10%)
    const effortPenalty = {
      'low': 0,
      'medium': -0.5,
      'high': -1
    };
    score += (effortPenalty[recommendation.effort_level] || 0) * 0.1;
    
    // Type-based priority
    const typePriority = {
      'risk_mitigation': 1.2,
      'budget_optimization': 1.1,
      'optimization': 1.0,
      'insight_based': 0.9
    };
    score *= (typePriority[recommendation.type] || 1.0);
    
    return score;
  }

  async enrichWithAutomationInfo(recommendations) {
    return Promise.all(recommendations.map(async (rec) => {
      if (rec.automation_possible) {
        const automationInfo = await this.getAutomationInfo(rec);
        return {
          ...rec,
          automation_info: automationInfo
        };
      }
      return rec;
    }));
  }

  async getAutomationInfo(recommendation) {
    return {
      execution_time: this.estimateExecutionTime(recommendation),
      prerequisites: this.getAutomationPrerequisites(recommendation),
      rollback_possible: this.isRollbackPossible(recommendation),
      monitoring_required: this.getMonitoringRequirements(recommendation),
      safety_checks: this.getSafetyChecks(recommendation)
    };
  }

  async executeRecommendation(recommendationId, userId, options = {}) {
    const recommendation = await this.getRecommendation(recommendationId);
    
    if (!recommendation || recommendation.user_id !== userId) {
      throw new Error('Recommendation not found or unauthorized');
    }

    if (recommendation.status !== 'pending') {
      throw new Error(`Recommendation is ${recommendation.status} and cannot be executed`);
    }

    try {
      // Update status to executing
      await this.updateRecommendationStatus(recommendationId, 'executing');

      let result;
      if (recommendation.automation_possible && !options.manual) {
        // Execute through automation engine
        result = await this.automationExecutor.executeAutomatedRecommendation(recommendation, userId);
      } else {
        // Create manual task
        result = await this.createManualTask(recommendation, userId);
      }

      // Update status based on result
      const newStatus = result.success ? 'completed' : 'failed';
      await this.updateRecommendationStatus(recommendationId, newStatus, result);

      return result;
    } catch (error) {
      await this.updateRecommendationStatus(recommendationId, 'failed', { error: error.message });
      throw error;
    }
  }

  async createManualTask(recommendation, userId) {
    const task = {
      id: this.generateTaskId(),
      user_id: userId,
      recommendation_id: recommendation.id,
      title: recommendation.title,
      description: recommendation.description,
      steps: recommendation.implementation_steps || [],
      platform: recommendation.platform,
      priority: recommendation.priority || 'medium',
      estimated_time: this.estimateManualTime(recommendation),
      created_at: new Date().toISOString(),
      status: 'pending'
    };

    // Store task in database
    await this.storeManualTask(task);

    return {
      success: true,
      type: 'manual_task',
      task_id: task.id,
      message: 'Manual task created successfully'
    };
  }

  // Utility methods
  generateRecommendationId() {
    return `rec_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  generateTaskId() {
    return `task_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  calculateNextReviewDate(frequency = 'weekly') {
    const now = new Date();
    const intervals = {
      daily: 1,
      weekly: 7,
      biweekly: 14,
      monthly: 30
    };
    
    const days = intervals[frequency] || 7;
    now.setDate(now.getDate() + days);
    return now.toISOString();
  }

  determineActionType(opportunity) {
    const title = opportunity.title.toLowerCase();
    
    if (title.includes('bid') || title.includes('cpc')) return 'bid_adjustment';
    if (title.includes('budget')) return 'budget_optimization';
    if (title.includes('keyword')) return 'keyword_optimization';
    if (title.includes('ad') || title.includes('creative')) return 'ad_creative_rotation';
    if (title.includes('audience') || title.includes('targeting')) return 'audience_optimization';
    if (title.includes('schedule') || title.includes('time')) return 'dayparting_optimization';
    if (title.includes('negative')) return 'negative_keyword_addition';
    
    return 'general_optimization';
  }

  isAutomationPossible(actionType) {
    const automatable = [
      'bid_adjustment',
      'budget_optimization',
      'keyword_optimization',
      'negative_keyword_addition',
      'dayparting_optimization'
    ];
    
    return automatable.includes(actionType);
  }

  calculateImpactScore(opportunity) {
    const impact = opportunity.impact_potential?.toLowerCase();
    const impactMap = { high: 8, medium: 5, low: 2 };
    return impactMap[impact] || 5;
  }

  createFallbackRecommendations(userId, accountData) {
    return {
      recommendations: [],
      insights_summary: {
        overall_performance: "Unable to generate recommendations",
        key_highlights: [],
        primary_concerns: []
      },
      total_recommendations: 0,
      automated_recommendations: 0,
      next_review_date: this.calculateNextReviewDate(),
      generated_at: new Date().toISOString(),
      fallback: true
    };
  }

  // Placeholder methods for database operations
  async storeRecommendations(userId, recommendations) {
    // Store in database
    this.recommendationHistory.push({
      userId,
      recommendations,
      created_at: new Date().toISOString()
    });
  }

  async getRecommendation(recommendationId) {
    // Get from database
    return null;
  }

  async updateRecommendationStatus(recommendationId, status, result = null) {
    // Update in database
    console.log(`Updating recommendation ${recommendationId} to ${status}`);
  }

  async storeManualTask(task) {
    // Store task in database
    console.log('Manual task created:', task.id);
  }
}

export default RecommendationEngine;