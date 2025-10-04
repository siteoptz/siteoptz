// lib/subscription/usage-tracker.js
import { pool } from '../database/connection';
import SubscriptionManager from './tiers';

export class UsageTracker {
  constructor() {
    this.metrics = {
      API_CALLS: 'api_calls',
      INSIGHTS_GENERATED: 'insights_generated',
      AUTOMATIONS_EXECUTED: 'automations_executed',
      DATA_EXTRACTED: 'data_extracted',
      REPORTS_GENERATED: 'reports_generated',
      EXPORTS_CREATED: 'exports_created',
      WEBHOOKS_SENT: 'webhooks_sent'
    };
  }

  async trackApiCall(userId, endpoint, platform = null) {
    return await this.trackUsage(userId, this.metrics.API_CALLS, 1, {
      endpoint,
      platform,
      feature: 'api'
    });
  }

  async trackInsightGeneration(userId, platform = null, insightType = null) {
    const usage = await this.trackUsage(userId, this.metrics.INSIGHTS_GENERATED, 1, {
      platform,
      feature: 'insights',
      insight_type: insightType
    });

    // Check if user is approaching or exceeding their insights limit
    const limit = await this.checkUsageLimit(userId, this.metrics.INSIGHTS_GENERATED);
    
    if (limit.status === 'critical' || limit.status === 'blocked') {
      await this.sendUsageLimitNotification(userId, this.metrics.INSIGHTS_GENERATED, limit);
    }

    return usage;
  }

  async trackAutomationExecution(userId, platform, actionType) {
    return await this.trackUsage(userId, this.metrics.AUTOMATIONS_EXECUTED, 1, {
      platform,
      feature: 'automation',
      action_type: actionType
    });
  }

  async trackDataExtraction(userId, platform, recordCount = 1) {
    return await this.trackUsage(userId, this.metrics.DATA_EXTRACTED, recordCount, {
      platform,
      feature: 'data_extraction'
    });
  }

  async trackReportGeneration(userId, reportType, platform = null) {
    return await this.trackUsage(userId, this.metrics.REPORTS_GENERATED, 1, {
      platform,
      feature: 'reporting',
      report_type: reportType
    });
  }

  async trackExport(userId, exportType, platform = null) {
    const usage = await this.trackUsage(userId, this.metrics.EXPORTS_CREATED, 1, {
      platform,
      feature: 'export',
      export_type: exportType
    });

    // Check export limits
    const limit = await this.checkUsageLimit(userId, this.metrics.EXPORTS_CREATED);
    
    if (limit.status === 'blocked') {
      throw new Error('Export limit exceeded for your subscription tier');
    }

    return usage;
  }

  async trackWebhookSent(userId, webhookUrl, eventType) {
    return await this.trackUsage(userId, this.metrics.WEBHOOKS_SENT, 1, {
      feature: 'webhooks',
      webhook_url: webhookUrl,
      event_type: eventType
    });
  }

  async trackUsage(userId, metricType, value = 1, metadata = {}) {
    const now = new Date();
    const billingPeriod = this.getBillingPeriod(now);

    const query = `
      INSERT INTO usage_tracking (
        user_id, metric_type, metric_value, billing_period, 
        platform, feature, metadata, tracked_at
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
      RETURNING *
    `;

    const values = [
      userId,
      metricType,
      value,
      billingPeriod,
      metadata.platform || null,
      metadata.feature || null,
      metadata,
      now
    ];

    try {
      const result = await pool().query(query, values);
      
      // Real-time usage check for immediate limits
      await this.checkRealtimeUsage(userId, metricType);
      
      return result.rows[0];
    } catch (error) {
      console.error('Failed to track usage:', error);
      throw error;
    }
  }

  async getCurrentUsage(userId, billingPeriod = null) {
    if (!billingPeriod) {
      billingPeriod = this.getBillingPeriod(new Date());
    }

    const query = `
      SELECT 
        metric_type,
        SUM(metric_value) as total_usage,
        COUNT(*) as event_count,
        MAX(tracked_at) as last_tracked
      FROM usage_tracking
      WHERE user_id = $1 AND billing_period = $2
      GROUP BY metric_type
    `;

    const result = await pool().query(query, [userId, billingPeriod]);
    
    const usage = {};
    result.rows.forEach(row => {
      usage[row.metric_type] = {
        total: parseInt(row.total_usage),
        events: parseInt(row.event_count),
        last_tracked: row.last_tracked
      };
    });
    
    return usage;
  }

  async checkUsageLimit(userId, metricType) {
    const user = await this.getUserInfo(userId);
    const subscription = SubscriptionManager.getTierBySlug(user.subscription_tier);
    
    if (!subscription) {
      throw new Error('Invalid subscription tier');
    }

    const usage = await this.getCurrentUsage(userId);
    const limitField = `max_${metricType}_per_month`;
    const limit = subscription.limits[limitField];
    const current = usage[metricType]?.total || 0;
    
    if (limit === null || limit === undefined) {
      return { 
        within_limits: true, 
        unlimited: true,
        status: 'unlimited'
      };
    }
    
    const status = SubscriptionManager.checkUsageStatus(current, limit);
    
    return {
      within_limits: current < limit,
      current,
      limit,
      remaining: Math.max(0, limit - current),
      percentage_used: (current / limit) * 100,
      status: status.status,
      user_tier: user.subscription_tier
    };
  }

  async checkAllUsageLimits(userId) {
    const limits = {};
    
    for (const metricType of Object.values(this.metrics)) {
      try {
        limits[metricType] = await this.checkUsageLimit(userId, metricType);
      } catch (error) {
        console.error(`Failed to check limit for ${metricType}:`, error);
        limits[metricType] = { 
          within_limits: false, 
          error: error.message 
        };
      }
    }
    
    return limits;
  }

  async checkRealtimeUsage(userId, metricType) {
    const limit = await this.checkUsageLimit(userId, metricType);
    
    if (limit.status === 'blocked') {
      throw new Error(`${metricType} limit exceeded. Please upgrade your subscription.`);
    }
    
    if (limit.status === 'critical') {
      console.warn(`User ${userId} is at ${Math.round(limit.percentage_used)}% of ${metricType} limit`);
    }
    
    return limit;
  }

  async enforceUsageLimit(userId, metricType, requiredAmount = 1) {
    const limit = await this.checkUsageLimit(userId, metricType);
    
    if (!limit.within_limits || limit.remaining < requiredAmount) {
      const error = new Error(`Insufficient ${metricType} quota. Required: ${requiredAmount}, Available: ${limit.remaining || 0}`);
      error.code = 'USAGE_LIMIT_EXCEEDED';
      error.details = limit;
      throw error;
    }
    
    return limit;
  }

  async getUsageHistory(userId, options = {}) {
    const {
      metricType = null,
      startDate = null,
      endDate = null,
      groupBy = 'day',
      limit = 100
    } = options;

    let query = `
      SELECT 
        DATE_TRUNC($3, tracked_at) as period,
        metric_type,
        SUM(metric_value) as total_usage,
        COUNT(*) as event_count
      FROM usage_tracking
      WHERE user_id = $1
    `;

    const values = [userId, limit, groupBy];
    let paramCount = 4;

    if (metricType) {
      query += ` AND metric_type = $${paramCount}`;
      values.push(metricType);
      paramCount++;
    }

    if (startDate) {
      query += ` AND tracked_at >= $${paramCount}`;
      values.push(startDate);
      paramCount++;
    }

    if (endDate) {
      query += ` AND tracked_at <= $${paramCount}`;
      values.push(endDate);
      paramCount++;
    }

    query += `
      GROUP BY period, metric_type
      ORDER BY period DESC, metric_type
      LIMIT $2
    `;

    const result = await pool().query(query, values);
    return result.rows;
  }

  async getTopUsers(metricType, options = {}) {
    const {
      period = 'current_month',
      limit = 10,
      subscriptionTier = null
    } = options;

    let dateFilter = '';
    if (period === 'current_month') {
      dateFilter = "AND ut.billing_period = DATE_TRUNC('month', CURRENT_DATE)";
    } else if (period === 'last_30_days') {
      dateFilter = "AND ut.tracked_at >= CURRENT_DATE - INTERVAL '30 days'";
    }

    let query = `
      SELECT 
        u.id,
        u.email,
        u.subscription_tier,
        SUM(ut.metric_value) as total_usage,
        COUNT(*) as event_count
      FROM usage_tracking ut
      JOIN users u ON ut.user_id = u.id
      WHERE ut.metric_type = $1 ${dateFilter}
    `;

    const values = [metricType];
    let paramCount = 2;

    if (subscriptionTier) {
      query += ` AND u.subscription_tier = $${paramCount}`;
      values.push(subscriptionTier);
      paramCount++;
    }

    query += `
      GROUP BY u.id, u.email, u.subscription_tier
      ORDER BY total_usage DESC
      LIMIT $${paramCount}
    `;

    values.push(limit);

    const result = await pool().query(query, values);
    return result.rows;
  }

  async sendUsageLimitNotification(userId, metricType, limitInfo) {
    try {
      const user = await this.getUserInfo(userId);
      const message = this.createLimitNotificationMessage(metricType, limitInfo);
      
      // Create notification record
      const notificationQuery = `
        INSERT INTO notifications (
          user_id, type, title, message, priority, 
          related_type, channels
        ) VALUES ($1, $2, $3, $4, $5, $6, $7)
        RETURNING *
      `;

      const priority = limitInfo.status === 'blocked' ? 'urgent' : 'high';
      const title = limitInfo.status === 'blocked' ? 
        `${metricType} limit exceeded` : 
        `Approaching ${metricType} limit`;

      const values = [
        userId,
        'usage_limit',
        title,
        message,
        priority,
        'usage_tracking',
        ['in_app', 'email']
      ];

      await pool().query(notificationQuery, values);
      
      // TODO: Integrate with email service, Slack, etc.
      console.log(`Usage notification sent to user ${userId}: ${title}`);
      
    } catch (error) {
      console.error('Failed to send usage limit notification:', error);
    }
  }

  createLimitNotificationMessage(metricType, limitInfo) {
    const { current, limit, percentage_used, status, user_tier } = limitInfo;
    
    if (status === 'blocked') {
      return `You've reached your ${metricType} limit (${current}/${limit}). Please upgrade your ${user_tier} plan to continue using this feature.`;
    } else if (status === 'critical') {
      return `You're at ${Math.round(percentage_used)}% of your ${metricType} limit (${current}/${limit}). Consider upgrading to avoid service interruption.`;
    } else {
      return `You've used ${Math.round(percentage_used)}% of your ${metricType} limit (${current}/${limit}).`;
    }
  }

  async resetUsage(userId, metricType = null, billingPeriod = null) {
    if (!billingPeriod) {
      billingPeriod = this.getBillingPeriod(new Date());
    }

    let query = 'DELETE FROM usage_tracking WHERE user_id = $1 AND billing_period = $2';
    const values = [userId, billingPeriod];

    if (metricType) {
      query += ' AND metric_type = $3';
      values.push(metricType);
    }

    const result = await pool().query(query, values);
    return result.rowCount;
  }

  async getUsageAnalytics(options = {}) {
    const {
      startDate = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
      endDate = new Date(),
      groupBy = 'day'
    } = options;

    const query = `
      SELECT 
        DATE_TRUNC($3, tracked_at) as period,
        metric_type,
        COUNT(DISTINCT user_id) as unique_users,
        SUM(metric_value) as total_usage,
        AVG(metric_value) as avg_usage,
        COUNT(*) as total_events
      FROM usage_tracking
      WHERE tracked_at BETWEEN $1 AND $2
      GROUP BY period, metric_type
      ORDER BY period DESC, metric_type
    `;

    const result = await pool().query(query, [startDate, endDate, groupBy]);
    return result.rows;
  }

  getBillingPeriod(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    return `${year}-${month}-01`;
  }

  async getUserInfo(userId) {
    const query = 'SELECT * FROM users WHERE id = $1';
    const result = await pool().query(query, [userId]);
    
    if (result.rows.length === 0) {
      throw new Error('User not found');
    }
    
    return result.rows[0];
  }

  // Cleanup old usage data
  async cleanup(retentionDays = 365) {
    const cutoffDate = new Date(Date.now() - retentionDays * 24 * 60 * 60 * 1000);
    
    const query = `
      DELETE FROM usage_tracking 
      WHERE tracked_at < $1
    `;

    const result = await pool().query(query, [cutoffDate]);
    console.log(`Cleaned up ${result.rowCount} old usage tracking records`);
    
    return result.rowCount;
  }
}

export default UsageTracker;