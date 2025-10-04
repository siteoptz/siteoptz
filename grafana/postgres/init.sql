-- Create marketing analytics database schema
CREATE SCHEMA IF NOT EXISTS marketing;

-- Marketing campaigns table
CREATE TABLE IF NOT EXISTS marketing_campaigns (
    id SERIAL PRIMARY KEY,
    campaign_id VARCHAR(100) UNIQUE NOT NULL,
    campaign_name VARCHAR(255) NOT NULL,
    platform VARCHAR(50) NOT NULL,
    status VARCHAR(20) DEFAULT 'active',
    date DATE NOT NULL,
    spend DECIMAL(10, 2) DEFAULT 0,
    revenue DECIMAL(10, 2) DEFAULT 0,
    impressions INTEGER DEFAULT 0,
    clicks INTEGER DEFAULT 0,
    conversions INTEGER DEFAULT 0,
    ctr DECIMAL(5, 4) DEFAULT 0,
    cpc DECIMAL(10, 2) DEFAULT 0,
    cpa DECIMAL(10, 2) DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Google Ads metrics table
CREATE TABLE IF NOT EXISTS google_ads_metrics (
    id SERIAL PRIMARY KEY,
    campaign_id VARCHAR(100) NOT NULL,
    date DATE NOT NULL,
    impressions INTEGER DEFAULT 0,
    clicks INTEGER DEFAULT 0,
    cost DECIMAL(10, 2) DEFAULT 0,
    conversions INTEGER DEFAULT 0,
    conversion_value DECIMAL(10, 2) DEFAULT 0,
    search_impression_share DECIMAL(5, 2),
    quality_score INTEGER,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(campaign_id, date)
);

-- Meta Ads metrics table
CREATE TABLE IF NOT EXISTS meta_ads_metrics (
    id SERIAL PRIMARY KEY,
    campaign_id VARCHAR(100) NOT NULL,
    date DATE NOT NULL,
    reach INTEGER DEFAULT 0,
    impressions INTEGER DEFAULT 0,
    clicks INTEGER DEFAULT 0,
    spend DECIMAL(10, 2) DEFAULT 0,
    purchases INTEGER DEFAULT 0,
    purchase_value DECIMAL(10, 2) DEFAULT 0,
    frequency DECIMAL(5, 2),
    cpm DECIMAL(10, 2),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(campaign_id, date)
);

-- Google Analytics metrics table
CREATE TABLE IF NOT EXISTS google_analytics_metrics (
    id SERIAL PRIMARY KEY,
    date DATE NOT NULL,
    users INTEGER DEFAULT 0,
    new_users INTEGER DEFAULT 0,
    sessions INTEGER DEFAULT 0,
    pageviews INTEGER DEFAULT 0,
    pages_per_session DECIMAL(5, 2),
    avg_session_duration DECIMAL(10, 2),
    bounce_rate DECIMAL(5, 2),
    goal_completions INTEGER DEFAULT 0,
    goal_value DECIMAL(10, 2) DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(date)
);

-- TikTok Ads metrics table
CREATE TABLE IF NOT EXISTS tiktok_ads_metrics (
    id SERIAL PRIMARY KEY,
    campaign_id VARCHAR(100) NOT NULL,
    date DATE NOT NULL,
    impressions INTEGER DEFAULT 0,
    clicks INTEGER DEFAULT 0,
    spend DECIMAL(10, 2) DEFAULT 0,
    video_views INTEGER DEFAULT 0,
    video_watched_2s INTEGER DEFAULT 0,
    video_watched_6s INTEGER DEFAULT 0,
    conversions INTEGER DEFAULT 0,
    conversion_value DECIMAL(10, 2) DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(campaign_id, date)
);

-- LinkedIn Ads metrics table
CREATE TABLE IF NOT EXISTS linkedin_ads_metrics (
    id SERIAL PRIMARY KEY,
    campaign_id VARCHAR(100) NOT NULL,
    date DATE NOT NULL,
    impressions INTEGER DEFAULT 0,
    clicks INTEGER DEFAULT 0,
    spend DECIMAL(10, 2) DEFAULT 0,
    leads INTEGER DEFAULT 0,
    social_actions INTEGER DEFAULT 0,
    follows INTEGER DEFAULT 0,
    conversions INTEGER DEFAULT 0,
    conversion_value DECIMAL(10, 2) DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(campaign_id, date)
);

-- Aggregated performance view
CREATE OR REPLACE VIEW marketing_performance AS
SELECT 
    date,
    SUM(spend) as total_spend,
    SUM(revenue) as total_revenue,
    SUM(impressions) as total_impressions,
    SUM(clicks) as total_clicks,
    SUM(conversions) as total_conversions,
    AVG(ctr) as avg_ctr,
    (SUM(revenue) - SUM(spend)) as profit,
    CASE 
        WHEN SUM(spend) > 0 THEN ((SUM(revenue) - SUM(spend)) / SUM(spend) * 100)
        ELSE 0 
    END as roi_percentage
FROM marketing_campaigns
GROUP BY date
ORDER BY date DESC;

-- Insert sample data for testing
INSERT INTO marketing_campaigns (campaign_id, campaign_name, platform, status, date, spend, revenue, impressions, clicks, conversions, ctr, cpc, cpa)
VALUES
    ('google_001', 'SiteOptz Pro Plan - Search', 'Google Ads', 'active', CURRENT_DATE - INTERVAL '30 days', 1500.00, 4500.00, 50000, 2500, 45, 0.05, 0.60, 33.33),
    ('meta_001', 'AI Tools Awareness', 'Meta Ads', 'active', CURRENT_DATE - INTERVAL '30 days', 2000.00, 3500.00, 100000, 3000, 35, 0.03, 0.67, 57.14),
    ('google_002', 'Power BI Integration', 'Google Ads', 'active', CURRENT_DATE - INTERVAL '29 days', 1200.00, 5000.00, 40000, 2000, 50, 0.05, 0.60, 24.00),
    ('tiktok_001', 'Marketing Analytics Demo', 'TikTok Ads', 'active', CURRENT_DATE - INTERVAL '29 days', 800.00, 2000.00, 200000, 5000, 20, 0.025, 0.16, 40.00),
    ('linkedin_001', 'Enterprise Solutions', 'LinkedIn Ads', 'active', CURRENT_DATE - INTERVAL '28 days', 3000.00, 12000.00, 30000, 1500, 30, 0.05, 2.00, 100.00);

-- Generate more sample data for the last 30 days
INSERT INTO marketing_campaigns (campaign_id, campaign_name, platform, status, date, spend, revenue, impressions, clicks, conversions, ctr, cpc, cpa)
SELECT 
    'sample_' || generate_series || '_' || platform,
    'Campaign ' || generate_series || ' - ' || platform,
    platform,
    CASE WHEN random() > 0.2 THEN 'active' ELSE 'paused' END,
    CURRENT_DATE - (generate_series || ' days')::interval,
    (random() * 2000 + 500)::decimal(10,2),
    (random() * 6000 + 1000)::decimal(10,2),
    (random() * 100000 + 10000)::integer,
    (random() * 5000 + 500)::integer,
    (random() * 100 + 10)::integer,
    (random() * 0.08 + 0.01)::decimal(5,4),
    (random() * 2 + 0.3)::decimal(10,2),
    (random() * 100 + 20)::decimal(10,2)
FROM generate_series(1, 25),
     (VALUES ('Google Ads'), ('Meta Ads'), ('TikTok Ads'), ('LinkedIn Ads'), ('Twitter Ads')) AS p(platform)
ON CONFLICT (campaign_id) DO NOTHING;

-- Create indexes for better query performance
CREATE INDEX idx_campaigns_date ON marketing_campaigns(date);
CREATE INDEX idx_campaigns_platform ON marketing_campaigns(platform);
CREATE INDEX idx_campaigns_status ON marketing_campaigns(status);
CREATE INDEX idx_google_ads_date ON google_ads_metrics(date);
CREATE INDEX idx_meta_ads_date ON meta_ads_metrics(date);
CREATE INDEX idx_ga_date ON google_analytics_metrics(date);

-- Create update trigger for updated_at column
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_campaigns_updated_at BEFORE UPDATE
    ON marketing_campaigns FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();