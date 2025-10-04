-- Database Schema for White Label Marketing Dashboard Platform
-- Compatible with PostgreSQL

-- Create extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Users table
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255),
    first_name VARCHAR(100),
    last_name VARCHAR(100),
    company VARCHAR(255),
    phone VARCHAR(50),
    timezone VARCHAR(100) DEFAULT 'UTC',
    subscription_tier VARCHAR(50) DEFAULT 'free',
    subscription_status VARCHAR(50) DEFAULT 'active',
    subscription_expires_at TIMESTAMP,
    trial_ends_at TIMESTAMP,
    email_verified BOOLEAN DEFAULT false,
    email_verified_at TIMESTAMP,
    last_login_at TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- OAuth connections table
CREATE TABLE oauth_connections (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    platform VARCHAR(50) NOT NULL, -- 'google_ads', 'meta', 'tiktok', 'linkedin'
    account_id VARCHAR(255) NOT NULL,
    account_name VARCHAR(255),
    account_email VARCHAR(255),
    access_token TEXT, -- Encrypted
    refresh_token TEXT, -- Encrypted
    token_expires_at TIMESTAMP,
    refresh_expires_at TIMESTAMP,
    scopes TEXT[], -- Array of granted scopes
    account_info JSONB, -- Additional account metadata
    is_active BOOLEAN DEFAULT true,
    connection_status VARCHAR(50) DEFAULT 'connected', -- 'connected', 'expired', 'revoked', 'error'
    last_sync_at TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(user_id, platform, account_id)
);

-- Marketing accounts table (specific ad accounts, GA properties, etc.)
CREATE TABLE marketing_accounts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    oauth_connection_id UUID REFERENCES oauth_connections(id) ON DELETE CASCADE,
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    platform VARCHAR(50) NOT NULL,
    account_type VARCHAR(50) NOT NULL, -- 'ads', 'analytics', 'search_console', 'pages'
    external_account_id VARCHAR(255) NOT NULL,
    account_name VARCHAR(255),
    currency VARCHAR(10),
    timezone VARCHAR(100),
    account_metadata JSONB,
    is_active BOOLEAN DEFAULT true,
    sync_enabled BOOLEAN DEFAULT true,
    last_data_sync TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(oauth_connection_id, platform, account_type, external_account_id)
);

-- Marketing data points table
CREATE TABLE marketing_data (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    marketing_account_id UUID REFERENCES marketing_accounts(id) ON DELETE CASCADE,
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    date DATE NOT NULL,
    platform VARCHAR(50) NOT NULL,
    account_type VARCHAR(50) NOT NULL,
    campaign_id VARCHAR(255),
    campaign_name VARCHAR(255),
    ad_group_id VARCHAR(255),
    ad_group_name VARCHAR(255),
    
    -- Core metrics (normalized across platforms)
    impressions BIGINT DEFAULT 0,
    clicks BIGINT DEFAULT 0,
    spend DECIMAL(15,2) DEFAULT 0,
    conversions DECIMAL(10,2) DEFAULT 0,
    conversion_value DECIMAL(15,2) DEFAULT 0,
    
    -- Calculated metrics
    ctr DECIMAL(5,4), -- Click-through rate
    cpc DECIMAL(10,2), -- Cost per click
    cpm DECIMAL(10,2), -- Cost per thousand impressions
    roas DECIMAL(10,2), -- Return on ad spend
    cost_per_conversion DECIMAL(10,2),
    
    -- Additional metrics (platform-specific)
    additional_metrics JSONB,
    
    -- Dimensions
    dimensions JSONB,
    
    -- Metadata
    data_source VARCHAR(100),
    extracted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- AI insights table
CREATE TABLE ai_insights (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    insight_type VARCHAR(100) NOT NULL, -- 'optimization', 'performance', 'trend', 'risk', 'opportunity'
    title VARCHAR(255) NOT NULL,
    description TEXT,
    platform VARCHAR(50),
    account_ids UUID[], -- Array of marketing_account_ids this applies to
    
    -- Scoring
    confidence_score DECIMAL(3,2) DEFAULT 0.5, -- 0.00 to 1.00
    impact_score DECIMAL(3,1) DEFAULT 5.0, -- 1.0 to 10.0
    
    -- Classification
    category VARCHAR(100), -- 'bidding', 'targeting', 'creative', 'budget', 'keyword', 'audience'
    priority VARCHAR(50) DEFAULT 'medium', -- 'high', 'medium', 'low'
    
    -- Status tracking
    status VARCHAR(50) DEFAULT 'pending', -- 'pending', 'reviewed', 'accepted', 'rejected', 'implemented'
    actionable BOOLEAN DEFAULT false,
    automation_possible BOOLEAN DEFAULT false,
    
    -- Data and metadata
    insight_data JSONB, -- Full insight analysis from Claude
    source_data JSONB, -- Data that generated this insight
    
    -- Timestamps
    valid_until TIMESTAMP, -- When this insight expires
    reviewed_at TIMESTAMP,
    implemented_at TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Recommendations table
CREATE TABLE recommendations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    insight_id UUID REFERENCES ai_insights(id) ON DELETE SET NULL,
    marketing_account_id UUID REFERENCES marketing_accounts(id) ON DELETE CASCADE,
    
    -- Recommendation details
    title VARCHAR(255) NOT NULL,
    description TEXT,
    action_type VARCHAR(100) NOT NULL, -- 'bid_adjustment', 'budget_optimization', etc.
    platform VARCHAR(50) NOT NULL,
    
    -- Prioritization
    priority VARCHAR(50) DEFAULT 'medium',
    impact_score DECIMAL(3,1) DEFAULT 5.0,
    confidence_score DECIMAL(3,2) DEFAULT 0.5,
    effort_level VARCHAR(50) DEFAULT 'medium', -- 'low', 'medium', 'high'
    
    -- Implementation
    automation_possible BOOLEAN DEFAULT false,
    parameters JSONB, -- Action parameters for automation
    implementation_steps TEXT[],
    estimated_roi TEXT,
    timeframe VARCHAR(50), -- 'immediate', 'short_term', 'long_term'
    
    -- Status tracking
    status VARCHAR(50) DEFAULT 'pending', -- 'pending', 'approved', 'rejected', 'executing', 'completed', 'failed'
    execution_id UUID, -- Link to automation execution
    
    -- Results
    implementation_result JSONB,
    actual_impact JSONB,
    
    -- Timestamps
    expires_at TIMESTAMP,
    approved_at TIMESTAMP,
    executed_at TIMESTAMP,
    completed_at TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Automation rules table
CREATE TABLE automation_rules (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    marketing_account_id UUID REFERENCES marketing_accounts(id) ON DELETE CASCADE,
    
    -- Rule definition
    rule_name VARCHAR(255) NOT NULL,
    rule_type VARCHAR(100) NOT NULL, -- 'bid_adjustment', 'budget_optimization', etc.
    description TEXT,
    platform VARCHAR(50) NOT NULL,
    
    -- Rule logic
    conditions JSONB NOT NULL, -- Trigger conditions
    actions JSONB NOT NULL, -- Actions to execute
    constraints JSONB, -- Safety constraints (max change %, etc.)
    
    -- Configuration
    is_active BOOLEAN DEFAULT true,
    frequency VARCHAR(50) DEFAULT 'daily', -- 'hourly', 'daily', 'weekly'
    max_executions_per_day INTEGER DEFAULT 1,
    
    -- Execution tracking
    last_triggered TIMESTAMP,
    last_execution_id UUID,
    execution_count INTEGER DEFAULT 0,
    success_count INTEGER DEFAULT 0,
    
    -- Metadata
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Automation executions table
CREATE TABLE automation_executions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    rule_id UUID REFERENCES automation_rules(id) ON DELETE SET NULL,
    recommendation_id UUID REFERENCES recommendations(id) ON DELETE SET NULL,
    marketing_account_id UUID REFERENCES marketing_accounts(id) ON DELETE CASCADE,
    
    -- Execution details
    execution_type VARCHAR(50) NOT NULL, -- 'rule_based', 'recommendation', 'manual'
    action_type VARCHAR(100) NOT NULL,
    platform VARCHAR(50) NOT NULL,
    
    -- Request data
    parameters JSONB,
    conditions_met JSONB, -- What conditions triggered this
    
    -- Execution results
    status VARCHAR(50) DEFAULT 'pending', -- 'pending', 'running', 'completed', 'failed', 'cancelled'
    result JSONB,
    error_message TEXT,
    
    -- Performance tracking
    changes_made INTEGER DEFAULT 0,
    estimated_impact JSONB,
    actual_impact JSONB, -- Measured after execution
    
    -- Timestamps
    started_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    completed_at TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Usage tracking table
CREATE TABLE usage_tracking (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    
    -- Usage metrics
    metric_type VARCHAR(100) NOT NULL, -- 'api_calls', 'insights_generated', 'automations_executed', 'data_extracted'
    metric_value INTEGER NOT NULL DEFAULT 1,
    
    -- Context
    platform VARCHAR(50),
    feature VARCHAR(100),
    endpoint VARCHAR(255),
    
    -- Billing period
    billing_period DATE, -- YYYY-MM-01 for monthly tracking
    
    -- Metadata
    metadata JSONB,
    tracked_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Subscription plans table
CREATE TABLE subscription_plans (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(100) NOT NULL UNIQUE,
    slug VARCHAR(50) NOT NULL UNIQUE,
    description TEXT,
    
    -- Pricing
    price_monthly DECIMAL(10,2) NOT NULL,
    price_yearly DECIMAL(10,2),
    
    -- Limits
    max_accounts INTEGER NOT NULL,
    max_data_retention_days INTEGER NOT NULL,
    max_insights_per_month INTEGER NOT NULL,
    max_automation_rules INTEGER NOT NULL,
    max_api_calls_per_month INTEGER NOT NULL,
    
    -- Features
    features TEXT[],
    
    -- Status
    is_active BOOLEAN DEFAULT true,
    is_public BOOLEAN DEFAULT true,
    
    -- Timestamps
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- User sessions table
CREATE TABLE user_sessions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    session_token VARCHAR(255) UNIQUE NOT NULL,
    expires_at TIMESTAMP NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- API keys table
CREATE TABLE api_keys (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    key_hash VARCHAR(255) NOT NULL,
    key_prefix VARCHAR(20) NOT NULL,
    
    -- Permissions
    scopes TEXT[],
    rate_limit INTEGER DEFAULT 1000, -- requests per hour
    
    -- Status
    is_active BOOLEAN DEFAULT true,
    last_used_at TIMESTAMP,
    
    -- Timestamps
    expires_at TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Notifications table
CREATE TABLE notifications (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    
    -- Notification content
    type VARCHAR(100) NOT NULL, -- 'insight', 'automation_result', 'system', 'billing'
    title VARCHAR(255) NOT NULL,
    message TEXT,
    
    -- Context
    related_id UUID, -- insight_id, execution_id, etc.
    related_type VARCHAR(100), -- 'insight', 'execution', etc.
    platform VARCHAR(50),
    
    -- Status
    is_read BOOLEAN DEFAULT false,
    priority VARCHAR(50) DEFAULT 'normal', -- 'low', 'normal', 'high', 'urgent'
    
    -- Delivery
    channels TEXT[] DEFAULT ARRAY['in_app'], -- 'in_app', 'email', 'slack', 'webhook'
    delivered_at TIMESTAMP,
    
    -- Timestamps
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    read_at TIMESTAMP
);

-- Webhook endpoints table
CREATE TABLE webhook_endpoints (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    
    -- Endpoint configuration
    url VARCHAR(500) NOT NULL,
    secret VARCHAR(255) NOT NULL,
    events TEXT[] NOT NULL, -- Array of event types to listen for
    
    -- Status
    is_active BOOLEAN DEFAULT true,
    last_success_at TIMESTAMP,
    last_failure_at TIMESTAMP,
    failure_count INTEGER DEFAULT 0,
    
    -- Timestamps
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for better performance
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_subscription ON users(subscription_tier, subscription_status);

CREATE INDEX idx_oauth_connections_user ON oauth_connections(user_id);
CREATE INDEX idx_oauth_connections_platform ON oauth_connections(platform, is_active);

CREATE INDEX idx_marketing_accounts_user ON marketing_accounts(user_id);
CREATE INDEX idx_marketing_accounts_connection ON marketing_accounts(oauth_connection_id);

CREATE INDEX idx_marketing_data_user_date ON marketing_data(user_id, date);
CREATE INDEX idx_marketing_data_account_date ON marketing_data(marketing_account_id, date);
CREATE INDEX idx_marketing_data_platform_date ON marketing_data(platform, date);
CREATE INDEX idx_marketing_data_campaign_date ON marketing_data(campaign_id, date) WHERE campaign_id IS NOT NULL;
CREATE INDEX idx_marketing_data_composite ON marketing_data(user_id, platform, date);

CREATE INDEX idx_ai_insights_user_status ON ai_insights(user_id, status);
CREATE INDEX idx_ai_insights_type_created ON ai_insights(insight_type, created_at);

CREATE INDEX idx_recommendations_user_status ON recommendations(user_id, status);
CREATE INDEX idx_recommendations_platform_priority ON recommendations(platform, priority);

CREATE INDEX idx_automation_rules_user_active ON automation_rules(user_id, is_active);
CREATE INDEX idx_automation_executions_user_created ON automation_executions(user_id, created_at);

CREATE INDEX idx_usage_tracking_user_period ON usage_tracking(user_id, billing_period, metric_type);

CREATE INDEX idx_notifications_user_unread ON notifications(user_id, is_read, created_at);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Apply updated_at triggers to relevant tables
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_oauth_connections_updated_at BEFORE UPDATE ON oauth_connections
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_marketing_accounts_updated_at BEFORE UPDATE ON marketing_accounts
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_ai_insights_updated_at BEFORE UPDATE ON ai_insights
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_recommendations_updated_at BEFORE UPDATE ON recommendations
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_automation_rules_updated_at BEFORE UPDATE ON automation_rules
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_subscription_plans_updated_at BEFORE UPDATE ON subscription_plans
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_api_keys_updated_at BEFORE UPDATE ON api_keys
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_webhook_endpoints_updated_at BEFORE UPDATE ON webhook_endpoints
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Insert default subscription plans
INSERT INTO subscription_plans (name, slug, price_monthly, price_yearly, max_accounts, max_data_retention_days, max_insights_per_month, max_automation_rules, max_api_calls_per_month, features) VALUES
('Free', 'free', 0, 0, 2, 30, 10, 0, 1000, ARRAY['Basic dashboard', 'Limited insights', 'Email support']),
('Professional', 'professional', 99, 990, 10, 90, 100, 5, 10000, ARRAY['Advanced dashboard', 'Unlimited insights', 'Basic automation', 'Priority support', 'Custom reports']),
('Enterprise', 'enterprise', 299, 2990, 50, 365, 1000, 25, 100000, ARRAY['White-label dashboard', 'Advanced automation', 'Custom integrations', 'Dedicated support', 'API access', 'Custom branding']);