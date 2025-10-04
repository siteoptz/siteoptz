// lib/automation/executor.js
import { GoogleAdsClient } from '../integrations/google/ads-client';
import { MetaAdsClient } from '../integrations/meta/ads-client';
import { TikTokAdsClient } from '../integrations/tiktok/ads-client';
import { LinkedInAdsClient } from '../integrations/linkedin/ads-client';

export class AutomationExecutor {
  constructor() {
    this.platformClients = {
      google_ads: new GoogleAdsClient(),
      meta: new MetaAdsClient(),
      tiktok: new TikTokAdsClient(),
      linkedin: new LinkedInAdsClient()
    };
    
    this.executionHistory = [];
    this.activeExecutions = new Map();
  }

  async executeAutomatedRecommendation(recommendation, userId) {
    const executionId = this.generateExecutionId();
    
    try {
      this.activeExecutions.set(executionId, {
        recommendation,
        userId,
        startTime: new Date(),
        status: 'running'
      });

      console.log(`Starting automation execution ${executionId} for ${recommendation.platform}`);
      
      const client = this.platformClients[recommendation.platform];
      if (!client) {
        throw new Error(`Unsupported platform: ${recommendation.platform}`);
      }

      // Validate recommendation before execution
      await this.validateRecommendation(recommendation);

      let result;
      switch (recommendation.action_type) {
        case 'bid_adjustment':
          result = await this.executeBidAdjustment(client, recommendation);
          break;
        case 'budget_optimization':
          result = await this.executeBudgetOptimization(client, recommendation);
          break;
        case 'keyword_optimization':
          result = await this.executeKeywordOptimization(client, recommendation);
          break;
        case 'ad_creative_rotation':
          result = await this.executeAdCreativeRotation(client, recommendation);
          break;
        case 'audience_optimization':
          result = await this.executeAudienceOptimization(client, recommendation);
          break;
        case 'dayparting_optimization':
          result = await this.executeDaypartingOptimization(client, recommendation);
          break;
        case 'negative_keyword_addition':
          result = await this.executeNegativeKeywordAddition(client, recommendation);
          break;
        default:
          throw new Error(`Unsupported action type: ${recommendation.action_type}`);
      }

      await this.logExecutionResult(executionId, recommendation, result, 'success');
      
      this.activeExecutions.set(executionId, {
        ...this.activeExecutions.get(executionId),
        status: 'completed',
        result,
        endTime: new Date()
      });

      return { 
        success: true, 
        executionId,
        result,
        message: `Successfully executed ${recommendation.action_type} for ${recommendation.platform}`
      };
    } catch (error) {
      console.error(`Automation execution failed for ${executionId}:`, error);
      
      await this.logExecutionResult(executionId, recommendation, null, 'failed', error.message);
      
      this.activeExecutions.set(executionId, {
        ...this.activeExecutions.get(executionId),
        status: 'failed',
        error: error.message,
        endTime: new Date()
      });

      throw new Error(`Automation execution failed: ${error.message}`);
    }
  }

  async executeBidAdjustment(client, recommendation) {
    const { parameters } = recommendation;
    
    const adjustments = await Promise.all(
      parameters.adjustments.map(async (adjustment) => {
        return await client.adjustBid({
          campaignId: adjustment.campaign_id,
          adGroupId: adjustment.ad_group_id,
          keywordId: adjustment.keyword_id,
          bidAdjustment: adjustment.bid_adjustment,
          adjustmentType: adjustment.type, // percentage, absolute
          reason: recommendation.title
        });
      })
    );

    return {
      type: 'bid_adjustment',
      adjustments_made: adjustments.length,
      details: adjustments,
      estimated_impact: parameters.estimated_impact
    };
  }

  async executeBudgetOptimization(client, recommendation) {
    const { parameters } = recommendation;
    
    const optimizations = await Promise.all(
      parameters.budget_changes.map(async (change) => {
        return await client.updateBudget({
          campaignId: change.campaign_id,
          newBudget: change.new_budget,
          budgetType: change.budget_type, // daily, total
          reason: recommendation.title
        });
      })
    );

    return {
      type: 'budget_optimization',
      campaigns_updated: optimizations.length,
      total_budget_change: parameters.total_budget_change,
      details: optimizations
    };
  }

  async executeKeywordOptimization(client, recommendation) {
    const { parameters } = recommendation;
    const results = {
      keywords_added: 0,
      keywords_paused: 0,
      keywords_modified: 0,
      details: []
    };

    // Add new keywords
    if (parameters.keywords_to_add) {
      for (const keyword of parameters.keywords_to_add) {
        const result = await client.addKeyword({
          adGroupId: keyword.ad_group_id,
          keyword: keyword.text,
          matchType: keyword.match_type,
          bid: keyword.bid,
          reason: recommendation.title
        });
        results.keywords_added++;
        results.details.push(result);
      }
    }

    // Pause underperforming keywords
    if (parameters.keywords_to_pause) {
      for (const keyword of parameters.keywords_to_pause) {
        const result = await client.pauseKeyword({
          keywordId: keyword.keyword_id,
          reason: `Poor performance: ${keyword.reason}`
        });
        results.keywords_paused++;
        results.details.push(result);
      }
    }

    // Modify existing keywords
    if (parameters.keywords_to_modify) {
      for (const keyword of parameters.keywords_to_modify) {
        const result = await client.updateKeyword({
          keywordId: keyword.keyword_id,
          bid: keyword.new_bid,
          matchType: keyword.new_match_type,
          reason: recommendation.title
        });
        results.keywords_modified++;
        results.details.push(result);
      }
    }

    return {
      type: 'keyword_optimization',
      ...results
    };
  }

  async executeAdCreativeRotation(client, recommendation) {
    const { parameters } = recommendation;
    const results = {
      ads_paused: 0,
      ads_created: 0,
      details: []
    };

    // Pause underperforming ads
    if (parameters.ads_to_pause) {
      for (const ad of parameters.ads_to_pause) {
        const result = await client.pauseAd({
          adId: ad.ad_id,
          reason: `Poor performance: CTR ${ad.ctr}%, CVR ${ad.conversion_rate}%`
        });
        results.ads_paused++;
        results.details.push(result);
      }
    }

    // Create new ads
    if (parameters.new_ads) {
      for (const adData of parameters.new_ads) {
        const result = await client.createAd({
          adGroupId: adData.ad_group_id,
          headlines: adData.headlines,
          descriptions: adData.descriptions,
          urls: adData.urls,
          reason: recommendation.title
        });
        results.ads_created++;
        results.details.push(result);
      }
    }

    return {
      type: 'ad_creative_rotation',
      ...results
    };
  }

  async executeAudienceOptimization(client, recommendation) {
    const { parameters } = recommendation;
    const results = {
      audiences_added: 0,
      audiences_excluded: 0,
      bid_adjustments_made: 0,
      details: []
    };

    // Add high-performing audiences
    if (parameters.audiences_to_add) {
      for (const audience of parameters.audiences_to_add) {
        const result = await client.addAudience({
          campaignId: audience.campaign_id,
          audienceId: audience.audience_id,
          bidAdjustment: audience.bid_adjustment,
          reason: recommendation.title
        });
        results.audiences_added++;
        results.details.push(result);
      }
    }

    // Exclude poor-performing audiences
    if (parameters.audiences_to_exclude) {
      for (const audience of parameters.audiences_to_exclude) {
        const result = await client.excludeAudience({
          campaignId: audience.campaign_id,
          audienceId: audience.audience_id,
          reason: `Poor performance: ${audience.reason}`
        });
        results.audiences_excluded++;
        results.details.push(result);
      }
    }

    return {
      type: 'audience_optimization',
      ...results
    };
  }

  async executeDaypartingOptimization(client, recommendation) {
    const { parameters } = recommendation;
    
    const result = await client.updateSchedule({
      campaignId: parameters.campaign_id,
      schedule: parameters.optimized_schedule,
      bidAdjustments: parameters.bid_adjustments_by_time,
      reason: recommendation.title
    });

    return {
      type: 'dayparting_optimization',
      campaign_id: parameters.campaign_id,
      schedule_updated: true,
      details: result
    };
  }

  async executeNegativeKeywordAddition(client, recommendation) {
    const { parameters } = recommendation;
    const results = {
      negative_keywords_added: 0,
      details: []
    };

    for (const negativeKeyword of parameters.negative_keywords) {
      const result = await client.addNegativeKeyword({
        campaignId: negativeKeyword.campaign_id,
        adGroupId: negativeKeyword.ad_group_id,
        keyword: negativeKeyword.text,
        matchType: negativeKeyword.match_type,
        level: negativeKeyword.level, // campaign or ad_group
        reason: `Search term optimization: ${negativeKeyword.reason}`
      });
      results.negative_keywords_added++;
      results.details.push(result);
    }

    return {
      type: 'negative_keyword_addition',
      ...results
    };
  }

  async validateRecommendation(recommendation) {
    // Validate recommendation structure
    if (!recommendation.platform || !recommendation.action_type || !recommendation.parameters) {
      throw new Error('Invalid recommendation structure');
    }

    // Validate account access
    const client = this.platformClients[recommendation.platform];
    const accountAccess = await client.validateAccountAccess(recommendation.account_id);
    
    if (!accountAccess.valid) {
      throw new Error(`Cannot access ${recommendation.platform} account: ${accountAccess.error}`);
    }

    // Validate permissions
    const hasPermissions = await client.validatePermissions(
      recommendation.account_id,
      this.getRequiredPermissions(recommendation.action_type)
    );

    if (!hasPermissions) {
      throw new Error(`Insufficient permissions for ${recommendation.action_type} on ${recommendation.platform}`);
    }

    // Validate budget limits
    if (recommendation.action_type === 'budget_optimization') {
      await this.validateBudgetLimits(recommendation);
    }

    return true;
  }

  getRequiredPermissions(actionType) {
    const permissionMap = {
      'bid_adjustment': ['CAMPAIGN_WRITE', 'ADGROUP_WRITE'],
      'budget_optimization': ['CAMPAIGN_WRITE'],
      'keyword_optimization': ['ADGROUP_WRITE', 'KEYWORD_WRITE'],
      'ad_creative_rotation': ['ADGROUP_WRITE', 'AD_WRITE'],
      'audience_optimization': ['CAMPAIGN_WRITE', 'AUDIENCE_WRITE'],
      'dayparting_optimization': ['CAMPAIGN_WRITE'],
      'negative_keyword_addition': ['CAMPAIGN_WRITE', 'KEYWORD_WRITE']
    };

    return permissionMap[actionType] || [];
  }

  async validateBudgetLimits(recommendation) {
    const totalChange = recommendation.parameters.budget_changes.reduce(
      (sum, change) => sum + Math.abs(change.new_budget - change.current_budget), 0
    );

    const userLimits = await this.getUserAutomationLimits(recommendation.user_id);
    
    if (totalChange > userLimits.max_budget_change) {
      throw new Error(`Budget change ${totalChange} exceeds limit ${userLimits.max_budget_change}`);
    }
  }

  async getUserAutomationLimits(userId) {
    // Fetch from database or return defaults
    return {
      max_budget_change: 1000,
      max_bid_adjustment: 50, // percentage
      max_daily_executions: 10
    };
  }

  generateExecutionId() {
    return `exec_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  async logExecutionResult(executionId, recommendation, result, status, error = null) {
    const logEntry = {
      execution_id: executionId,
      user_id: recommendation.user_id,
      platform: recommendation.platform,
      action_type: recommendation.action_type,
      recommendation_id: recommendation.id,
      status,
      result,
      error,
      executed_at: new Date().toISOString(),
      execution_time: Date.now() - this.activeExecutions.get(executionId)?.startTime?.getTime()
    };

    this.executionHistory.push(logEntry);
    
    // Store in database
    // await this.saveExecutionLog(logEntry);
  }

  async getExecutionHistory(userId, options = {}) {
    let history = this.executionHistory.filter(entry => entry.user_id === userId);
    
    if (options.platform) {
      history = history.filter(entry => entry.platform === options.platform);
    }
    
    if (options.status) {
      history = history.filter(entry => entry.status === options.status);
    }
    
    if (options.limit) {
      history = history.slice(-options.limit);
    }
    
    return history;
  }

  async getActiveExecutions(userId) {
    const userExecutions = [];
    
    for (const [executionId, execution] of this.activeExecutions.entries()) {
      if (execution.userId === userId && execution.status === 'running') {
        userExecutions.push({
          executionId,
          ...execution
        });
      }
    }
    
    return userExecutions;
  }

  async cancelExecution(executionId, userId) {
    const execution = this.activeExecutions.get(executionId);
    
    if (!execution || execution.userId !== userId) {
      throw new Error('Execution not found or unauthorized');
    }
    
    if (execution.status !== 'running') {
      throw new Error('Execution is not running');
    }
    
    // Mark as cancelled
    this.activeExecutions.set(executionId, {
      ...execution,
      status: 'cancelled',
      endTime: new Date()
    });
    
    await this.logExecutionResult(executionId, execution.recommendation, null, 'cancelled', 'User cancelled');
    
    return { success: true, message: 'Execution cancelled' };
  }
}

export default AutomationExecutor;