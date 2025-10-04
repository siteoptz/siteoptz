// lib/database/models/User.js
import { pool } from '../connection';
import bcrypt from 'bcrypt';

export class User {
  constructor(data = {}) {
    this.id = data.id;
    this.email = data.email;
    this.password_hash = data.password_hash;
    this.first_name = data.first_name;
    this.last_name = data.last_name;
    this.company = data.company;
    this.phone = data.phone;
    this.timezone = data.timezone || 'UTC';
    this.subscription_tier = data.subscription_tier || 'free';
    this.subscription_status = data.subscription_status || 'active';
    this.subscription_expires_at = data.subscription_expires_at;
    this.trial_ends_at = data.trial_ends_at;
    this.email_verified = data.email_verified || false;
    this.email_verified_at = data.email_verified_at;
    this.last_login_at = data.last_login_at;
    this.created_at = data.created_at;
    this.updated_at = data.updated_at;
  }

  static async create(userData) {
    const {
      email,
      password,
      first_name,
      last_name,
      company,
      phone,
      timezone,
      subscription_tier
    } = userData;

    // Hash password
    const password_hash = password ? await bcrypt.hash(password, 12) : null;

    const query = `
      INSERT INTO users (
        email, password_hash, first_name, last_name, company, 
        phone, timezone, subscription_tier
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
      RETURNING *
    `;

    const values = [
      email,
      password_hash,
      first_name,
      last_name,
      company,
      phone,
      timezone || 'UTC',
      subscription_tier || 'free'
    ];

    try {
      const result = await pool.query(query, values);
      return new User(result.rows[0]);
    } catch (error) {
      if (error.code === '23505') { // Unique violation
        throw new Error('Email already exists');
      }
      throw error;
    }
  }

  static async findById(id) {
    const query = 'SELECT * FROM users WHERE id = $1';
    const result = await pool.query(query, [id]);
    
    if (result.rows.length === 0) {
      return null;
    }
    
    return new User(result.rows[0]);
  }

  static async findByEmail(email) {
    const query = 'SELECT * FROM users WHERE email = $1';
    const result = await pool.query(query, [email]);
    
    if (result.rows.length === 0) {
      return null;
    }
    
    return new User(result.rows[0]);
  }

  static async authenticate(email, password) {
    const user = await User.findByEmail(email);
    
    if (!user || !user.password_hash) {
      return null;
    }
    
    const isValid = await bcrypt.compare(password, user.password_hash);
    
    if (!isValid) {
      return null;
    }
    
    // Update last login
    await user.updateLastLogin();
    
    return user;
  }

  async update(updates) {
    const allowedFields = [
      'first_name', 'last_name', 'company', 'phone', 'timezone',
      'subscription_tier', 'subscription_status', 'subscription_expires_at',
      'trial_ends_at', 'email_verified', 'email_verified_at'
    ];

    const setClause = [];
    const values = [];
    let paramCount = 1;

    for (const [key, value] of Object.entries(updates)) {
      if (allowedFields.includes(key)) {
        setClause.push(`${key} = $${paramCount}`);
        values.push(value);
        paramCount++;
      }
    }

    if (setClause.length === 0) {
      return this;
    }

    values.push(this.id);

    const query = `
      UPDATE users 
      SET ${setClause.join(', ')}, updated_at = CURRENT_TIMESTAMP
      WHERE id = $${paramCount}
      RETURNING *
    `;

    const result = await pool.query(query, values);
    
    if (result.rows.length > 0) {
      Object.assign(this, result.rows[0]);
    }
    
    return this;
  }

  async updatePassword(newPassword) {
    const password_hash = await bcrypt.hash(newPassword, 12);
    
    const query = `
      UPDATE users 
      SET password_hash = $1, updated_at = CURRENT_TIMESTAMP
      WHERE id = $2
      RETURNING *
    `;

    const result = await pool.query(query, [password_hash, this.id]);
    
    if (result.rows.length > 0) {
      this.password_hash = result.rows[0].password_hash;
      this.updated_at = result.rows[0].updated_at;
    }
    
    return this;
  }

  async updateLastLogin() {
    const query = `
      UPDATE users 
      SET last_login_at = CURRENT_TIMESTAMP
      WHERE id = $1
      RETURNING last_login_at
    `;

    const result = await pool.query(query, [this.id]);
    
    if (result.rows.length > 0) {
      this.last_login_at = result.rows[0].last_login_at;
    }
    
    return this;
  }

  async verifyEmail() {
    const query = `
      UPDATE users 
      SET email_verified = true, email_verified_at = CURRENT_TIMESTAMP
      WHERE id = $1
      RETURNING email_verified, email_verified_at
    `;

    const result = await pool.query(query, [this.id]);
    
    if (result.rows.length > 0) {
      this.email_verified = result.rows[0].email_verified;
      this.email_verified_at = result.rows[0].email_verified_at;
    }
    
    return this;
  }

  async getOAuthConnections() {
    const query = `
      SELECT * FROM oauth_connections 
      WHERE user_id = $1 AND is_active = true
      ORDER BY platform, created_at
    `;

    const result = await pool.query(query, [this.id]);
    return result.rows;
  }

  async getMarketingAccounts() {
    const query = `
      SELECT ma.*, oc.platform, oc.account_name as oauth_account_name
      FROM marketing_accounts ma
      JOIN oauth_connections oc ON ma.oauth_connection_id = oc.id
      WHERE ma.user_id = $1 AND ma.is_active = true
      ORDER BY ma.platform, ma.account_name
    `;

    const result = await pool.query(query, [this.id]);
    return result.rows;
  }

  async getSubscriptionInfo() {
    const query = `
      SELECT sp.* 
      FROM subscription_plans sp
      WHERE sp.slug = $1
    `;

    const result = await pool.query(query, [this.subscription_tier]);
    
    if (result.rows.length === 0) {
      // Return free plan as default
      const freeQuery = "SELECT * FROM subscription_plans WHERE slug = 'free'";
      const freeResult = await pool.query(freeQuery);
      return freeResult.rows[0] || null;
    }
    
    return result.rows[0];
  }

  async getCurrentUsage(billingPeriod = null) {
    if (!billingPeriod) {
      const now = new Date();
      billingPeriod = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-01`;
    }

    const query = `
      SELECT 
        metric_type,
        SUM(metric_value) as total_usage
      FROM usage_tracking
      WHERE user_id = $1 AND billing_period = $2
      GROUP BY metric_type
    `;

    const result = await pool.query(query, [this.id, billingPeriod]);
    
    const usage = {};
    result.rows.forEach(row => {
      usage[row.metric_type] = parseInt(row.total_usage);
    });
    
    return usage;
  }

  async trackUsage(metricType, value = 1, metadata = {}) {
    const now = new Date();
    const billingPeriod = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-01`;

    const query = `
      INSERT INTO usage_tracking (
        user_id, metric_type, metric_value, billing_period, 
        platform, feature, metadata
      ) VALUES ($1, $2, $3, $4, $5, $6, $7)
      RETURNING *
    `;

    const values = [
      this.id,
      metricType,
      value,
      billingPeriod,
      metadata.platform || null,
      metadata.feature || null,
      metadata
    ];

    const result = await pool.query(query, values);
    return result.rows[0];
  }

  async checkUsageLimit(metricType) {
    const subscription = await this.getSubscriptionInfo();
    const usage = await this.getCurrentUsage();
    
    const limitField = `max_${metricType}_per_month`;
    const limit = subscription[limitField];
    const current = usage[metricType] || 0;
    
    if (limit === null || limit === undefined) {
      return { within_limits: true, unlimited: true };
    }
    
    return {
      within_limits: current < limit,
      current,
      limit,
      remaining: Math.max(0, limit - current),
      percentage_used: (current / limit) * 100
    };
  }

  async getRecentInsights(limit = 10) {
    const query = `
      SELECT * FROM ai_insights
      WHERE user_id = $1
      ORDER BY created_at DESC
      LIMIT $2
    `;

    const result = await pool.query(query, [this.id, limit]);
    return result.rows;
  }

  async getActiveRecommendations() {
    const query = `
      SELECT * FROM recommendations
      WHERE user_id = $1 AND status IN ('pending', 'approved')
      ORDER BY priority DESC, impact_score DESC, created_at DESC
    `;

    const result = await pool.query(query, [this.id]);
    return result.rows;
  }

  async getAutomationRules() {
    const query = `
      SELECT ar.*, ma.account_name, ma.platform
      FROM automation_rules ar
      JOIN marketing_accounts ma ON ar.marketing_account_id = ma.id
      WHERE ar.user_id = $1
      ORDER BY ar.is_active DESC, ar.created_at DESC
    `;

    const result = await pool.query(query, [this.id]);
    return result.rows;
  }

  async delete() {
    const query = 'DELETE FROM users WHERE id = $1';
    await pool.query(query, [this.id]);
    return true;
  }

  // Helper methods
  get fullName() {
    return `${this.first_name || ''} ${this.last_name || ''}`.trim();
  }

  get isEmailVerified() {
    return this.email_verified;
  }

  get isSubscriptionActive() {
    if (this.subscription_status !== 'active') {
      return false;
    }
    
    if (this.subscription_expires_at) {
      return new Date(this.subscription_expires_at) > new Date();
    }
    
    return true;
  }

  get isTrialActive() {
    if (!this.trial_ends_at) {
      return false;
    }
    
    return new Date(this.trial_ends_at) > new Date();
  }

  toJSON() {
    const { password_hash, ...userData } = this;
    return userData;
  }

  static async getAll(options = {}) {
    const { limit = 50, offset = 0, subscription_tier, search } = options;
    
    let query = 'SELECT * FROM users';
    let conditions = [];
    let values = [];
    let paramCount = 1;

    if (subscription_tier) {
      conditions.push(`subscription_tier = $${paramCount}`);
      values.push(subscription_tier);
      paramCount++;
    }

    if (search) {
      conditions.push(`(email ILIKE $${paramCount} OR first_name ILIKE $${paramCount} OR last_name ILIKE $${paramCount})`);
      values.push(`%${search}%`);
      paramCount++;
    }

    if (conditions.length > 0) {
      query += ` WHERE ${conditions.join(' AND ')}`;
    }

    query += ` ORDER BY created_at DESC LIMIT $${paramCount} OFFSET $${paramCount + 1}`;
    values.push(limit, offset);

    const result = await pool.query(query, values);
    return result.rows.map(row => new User(row));
  }

  static async count(filters = {}) {
    let query = 'SELECT COUNT(*) FROM users';
    let conditions = [];
    let values = [];
    let paramCount = 1;

    if (filters.subscription_tier) {
      conditions.push(`subscription_tier = $${paramCount}`);
      values.push(filters.subscription_tier);
      paramCount++;
    }

    if (conditions.length > 0) {
      query += ` WHERE ${conditions.join(' AND ')}`;
    }

    const result = await pool.query(query, values);
    return parseInt(result.rows[0].count);
  }
}

export default User;