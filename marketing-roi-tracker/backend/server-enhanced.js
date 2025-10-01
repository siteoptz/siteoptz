const express = require('express');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');
const cron = require('node-cron');
require('dotenv').config();

const { authenticateToken } = require('./middleware/auth');
const platformIntegrations = require('./services/platformIntegrations');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const db = new sqlite3.Database('./database.db');

// Enhanced database schema
db.serialize(() => {
  // Users table with subscription plan
  db.run(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL,
      company TEXT,
      plan TEXT DEFAULT 'free',
      subscription_status TEXT DEFAULT 'active',
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  // Platform connections table
  db.run(`
    CREATE TABLE IF NOT EXISTS platform_connections (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER NOT NULL,
      platform TEXT NOT NULL,
      access_token TEXT NOT NULL,
      refresh_token TEXT,
      expires_at DATETIME,
      account_id TEXT,
      account_name TEXT,
      status TEXT DEFAULT 'active',
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users(id),
      UNIQUE(user_id, platform, account_id)
    )
  `);

  // Enhanced campaigns table
  db.run(`
    CREATE TABLE IF NOT EXISTS campaigns (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER NOT NULL,
      platform_connection_id INTEGER,
      external_campaign_id TEXT,
      name TEXT NOT NULL,
      type TEXT NOT NULL,
      channel TEXT NOT NULL,
      status TEXT DEFAULT 'active',
      budget DECIMAL(10,2) NOT NULL,
      start_date DATE NOT NULL,
      end_date DATE,
      auto_sync BOOLEAN DEFAULT false,
      last_sync DATETIME,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users(id),
      FOREIGN KEY (platform_connection_id) REFERENCES platform_connections(id)
    )
  `);

  // Enhanced metrics table
  db.run(`
    CREATE TABLE IF NOT EXISTS campaign_metrics (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      campaign_id INTEGER NOT NULL,
      date DATE NOT NULL,
      impressions INTEGER DEFAULT 0,
      clicks INTEGER DEFAULT 0,
      conversions INTEGER DEFAULT 0,
      revenue DECIMAL(10,2) DEFAULT 0,
      cost DECIMAL(10,2) DEFAULT 0,
      ctr DECIMAL(5,2) DEFAULT 0,
      cpa DECIMAL(10,2) DEFAULT 0,
      roas DECIMAL(5,2) DEFAULT 0,
      roi DECIMAL(5,2) DEFAULT 0,
      source TEXT DEFAULT 'manual',
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (campaign_id) REFERENCES campaigns(id),
      UNIQUE(campaign_id, date)
    )
  `);

  // Insights and recommendations table
  db.run(`
    CREATE TABLE IF NOT EXISTS insights (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER NOT NULL,
      campaign_id INTEGER,
      type TEXT NOT NULL,
      title TEXT NOT NULL,
      message TEXT NOT NULL,
      priority TEXT DEFAULT 'medium',
      impact TEXT,
      status TEXT DEFAULT 'active',
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users(id),
      FOREIGN KEY (campaign_id) REFERENCES campaigns(id)
    )
  `);

  // Sync logs table
  db.run(`
    CREATE TABLE IF NOT EXISTS sync_logs (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER NOT NULL,
      platform TEXT NOT NULL,
      status TEXT NOT NULL,
      campaigns_synced INTEGER DEFAULT 0,
      metrics_synced INTEGER DEFAULT 0,
      error_message TEXT,
      started_at DATETIME NOT NULL,
      completed_at DATETIME,
      FOREIGN KEY (user_id) REFERENCES users(id)
    )
  `);
});

// Authentication endpoints
app.post('/api/auth/register', [
  body('email').isEmail(),
  body('password').isLength({ min: 6 }),
  body('name').notEmpty(),
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { name, email, password, company } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    
    db.run(
      `INSERT INTO users (name, email, password, company) VALUES (?, ?, ?, ?)`,
      [name, email, hashedPassword, company],
      function(err) {
        if (err) {
          if (err.message.includes('UNIQUE constraint failed')) {
            return res.status(400).json({ error: 'Email already exists' });
          }
          return res.status(500).json({ error: err.message });
        }

        const token = jwt.sign(
          { userId: this.lastID, email },
          process.env.JWT_SECRET || 'your-secret-key',
          { expiresIn: '7d' }
        );

        res.json({
          token,
          user: {
            id: this.lastID,
            name,
            email,
            company,
            plan: 'free'
          }
        });
      }
    );
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

app.post('/api/auth/login', [
  body('email').isEmail(),
  body('password').exists()
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password } = req.body;

  db.get(
    `SELECT * FROM users WHERE email = ?`,
    [email],
    async (err, user) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }

      if (!user) {
        return res.status(400).json({ error: 'Invalid credentials' });
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ error: 'Invalid credentials' });
      }

      const token = jwt.sign(
        { userId: user.id, email: user.email },
        process.env.JWT_SECRET || 'your-secret-key',
        { expiresIn: '7d' }
      );

      res.json({
        token,
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          company: user.company,
          plan: user.plan
        }
      });
    }
  );
});

// Platform connection endpoints
app.get('/api/platforms/auth-url/:platform', authenticateToken, (req, res) => {
  const { platform } = req.params;
  const redirectUri = `${req.protocol}://${req.get('host')}/api/platforms/callback/${platform}`;

  try {
    const authUrl = platformIntegrations.generateAuthUrl(platform, req.user.userId, redirectUri);
    res.json({ authUrl });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.get('/api/platforms/callback/:platform', async (req, res) => {
  const { platform } = req.params;
  const { code, state } = req.query;

  try {
    const stateData = JSON.parse(Buffer.from(state, 'base64').toString());
    const redirectUri = `${req.protocol}://${req.get('host')}/api/platforms/callback/${platform}`;
    
    const tokenData = await platformIntegrations.exchangeCodeForToken(platform, code, redirectUri);
    
    // Store platform connection
    db.run(
      `INSERT OR REPLACE INTO platform_connections 
       (user_id, platform, access_token, refresh_token, expires_at, account_id) 
       VALUES (?, ?, ?, ?, ?, ?)`,
      [
        stateData.userId,
        platform,
        tokenData.access_token,
        tokenData.refresh_token,
        tokenData.expires_in ? new Date(Date.now() + tokenData.expires_in * 1000) : null,
        tokenData.account_id || 'default'
      ],
      function(err) {
        if (err) {
          console.error('Error storing platform connection:', err);
          return res.redirect(`${process.env.FRONTEND_URL || 'http://localhost:3000'}/integrations?error=connection_failed`);
        }

        res.redirect(`${process.env.FRONTEND_URL || 'http://localhost:3000'}/integrations?success=connected&platform=${platform}`);
      }
    );
  } catch (error) {
    console.error('Platform callback error:', error);
    res.redirect(`${process.env.FRONTEND_URL || 'http://localhost:3000'}/integrations?error=auth_failed`);
  }
});

app.get('/api/platforms/connections', authenticateToken, (req, res) => {
  db.all(
    `SELECT platform, account_id, account_name, status, created_at 
     FROM platform_connections 
     WHERE user_id = ? AND status = 'active'`,
    [req.user.userId],
    (err, connections) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.json(connections);
    }
  );
});

// Enhanced campaign endpoints with auto-sync
app.get('/api/campaigns', authenticateToken, (req, res) => {
  db.all(
    `SELECT c.*, 
            pc.platform as connected_platform,
            SUM(cm.revenue) as total_revenue,
            SUM(cm.cost) as total_cost,
            SUM(cm.conversions) as total_conversions,
            SUM(cm.clicks) as total_clicks,
            SUM(cm.impressions) as total_impressions,
            AVG(cm.ctr) as avg_ctr,
            AVG(cm.cpa) as avg_cpa,
            AVG(cm.roas) as avg_roas,
            AVG(cm.roi) as avg_roi
     FROM campaigns c
     LEFT JOIN platform_connections pc ON c.platform_connection_id = pc.id
     LEFT JOIN campaign_metrics cm ON c.id = cm.campaign_id
     WHERE c.user_id = ?
     GROUP BY c.id
     ORDER BY c.created_at DESC`,
    [req.user.userId],
    (err, rows) => {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      
      const campaignsWithROI = rows.map(campaign => {
        const revenue = campaign.total_revenue || 0;
        const cost = campaign.total_cost || campaign.budget;
        const roi = cost > 0 ? ((revenue - cost) / cost * 100) : 0;
        const roas = cost > 0 ? (revenue / cost) : 0;
        const cpa = campaign.total_conversions > 0 ? (cost / campaign.total_conversions) : 0;
        const ctr = campaign.total_impressions > 0 ? ((campaign.total_clicks / campaign.total_impressions) * 100) : 0;
        const conversionRate = campaign.total_clicks > 0 ? ((campaign.total_conversions / campaign.total_clicks) * 100) : 0;
        
        return {
          ...campaign,
          roi: roi.toFixed(2),
          roas: roas.toFixed(2),
          cpa: cpa.toFixed(2),
          ctr: ctr.toFixed(2),
          conversionRate: conversionRate.toFixed(2),
          isConnected: !!campaign.connected_platform,
          lastSync: campaign.last_sync
        };
      });
      
      res.json(campaignsWithROI);
    }
  );
});

app.post('/api/campaigns', authenticateToken, (req, res) => {
  const { name, type, channel, budget, start_date, end_date, platform_connection_id, auto_sync } = req.body;
  
  db.run(
    `INSERT INTO campaigns (user_id, name, type, channel, budget, start_date, end_date, platform_connection_id, auto_sync) 
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [req.user.userId, name, type, channel, budget, start_date, end_date, platform_connection_id, auto_sync],
    function(err) {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      res.json({ id: this.lastID, message: 'Campaign created successfully' });
    }
  );
});

// Sync campaign data from connected platforms
app.post('/api/campaigns/:id/sync', authenticateToken, async (req, res) => {
  const { id } = req.params;
  
  try {
    // Get campaign and platform connection details
    const campaign = await new Promise((resolve, reject) => {
      db.get(
        `SELECT c.*, pc.platform, pc.access_token, pc.account_id 
         FROM campaigns c
         JOIN platform_connections pc ON c.platform_connection_id = pc.id
         WHERE c.id = ? AND c.user_id = ?`,
        [id, req.user.userId],
        (err, row) => {
          if (err) reject(err);
          else resolve(row);
        }
      );
    });

    if (!campaign) {
      return res.status(404).json({ error: 'Campaign not found or not connected' });
    }

    // Log sync start
    const syncLogId = await new Promise((resolve, reject) => {
      db.run(
        `INSERT INTO sync_logs (user_id, platform, status, started_at) VALUES (?, ?, 'running', ?)`,
        [req.user.userId, campaign.platform, new Date().toISOString()],
        function(err) {
          if (err) reject(err);
          else resolve(this.lastID);
        }
      );
    });

    let syncedData = [];
    
    // Fetch data based on platform
    switch (campaign.platform) {
      case 'google_ads':
        syncedData = await platformIntegrations.fetchGoogleAdsCampaigns(
          campaign.access_token, 
          campaign.account_id
        );
        break;
      case 'meta_ads':
        syncedData = await platformIntegrations.fetchMetaAdsCampaigns(
          campaign.access_token, 
          campaign.account_id
        );
        break;
      case 'tiktok_ads':
        syncedData = await platformIntegrations.fetchTikTokAdsCampaigns(
          campaign.access_token, 
          campaign.account_id
        );
        break;
      default:
        throw new Error('Unsupported platform');
    }

    // Store synced metrics
    let metricsInserted = 0;
    for (const data of syncedData) {
      if (data.campaignId === campaign.external_campaign_id || data.name === campaign.name) {
        await new Promise((resolve, reject) => {
          db.run(
            `INSERT OR REPLACE INTO campaign_metrics 
             (campaign_id, date, impressions, clicks, conversions, revenue, cost, ctr, cpa, roas, roi, source)
             VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'auto_sync')`,
            [
              id, data.date, data.impressions, data.clicks, data.conversions, 
              data.revenue, data.cost, data.ctr || 0, data.cpa || 0, data.roas || 0, data.roi || 0
            ],
            (err) => {
              if (err) reject(err);
              else {
                metricsInserted++;
                resolve();
              }
            }
          );
        });
      }
    }

    // Update campaign sync timestamp
    db.run(
      `UPDATE campaigns SET last_sync = ? WHERE id = ?`,
      [new Date().toISOString(), id]
    );

    // Update sync log
    db.run(
      `UPDATE sync_logs SET status = 'completed', metrics_synced = ?, completed_at = ? WHERE id = ?`,
      [metricsInserted, new Date().toISOString(), syncLogId]
    );

    res.json({ 
      message: 'Sync completed successfully', 
      metricsInserted,
      lastSync: new Date().toISOString()
    });

  } catch (error) {
    console.error('Sync error:', error);
    
    // Update sync log with error
    db.run(
      `UPDATE sync_logs SET status = 'failed', error_message = ?, completed_at = ? WHERE id = ?`,
      [error.message, new Date().toISOString(), req.params.syncLogId]
    );

    res.status(500).json({ error: 'Sync failed: ' + error.message });
  }
});

// Insights and recommendations endpoint
app.get('/api/insights', authenticateToken, async (req, res) => {
  try {
    // Get user's campaign data
    const campaigns = await new Promise((resolve, reject) => {
      db.all(
        `SELECT c.*, 
                SUM(cm.revenue) as total_revenue,
                SUM(cm.cost) as total_cost,
                SUM(cm.conversions) as total_conversions
         FROM campaigns c
         LEFT JOIN campaign_metrics cm ON c.id = cm.campaign_id
         WHERE c.user_id = ?
         GROUP BY c.id`,
        [req.user.userId],
        (err, rows) => {
          if (err) reject(err);
          else resolve(rows);
        }
      );
    });

    // Generate AI insights
    const aiInsights = platformIntegrations.generateInsights(campaigns);

    // Store new insights in database
    for (const insight of aiInsights.insights) {
      db.run(
        `INSERT INTO insights (user_id, type, title, message, priority, impact) VALUES (?, ?, ?, ?, ?, ?)`,
        [req.user.userId, insight.type, insight.title, insight.message, 'medium', insight.impact]
      );
    }

    for (const recommendation of aiInsights.recommendations) {
      db.run(
        `INSERT INTO insights (user_id, type, title, message, priority, impact) VALUES (?, ?, ?, ?, ?, ?)`,
        [req.user.userId, recommendation.type, recommendation.title, recommendation.message, recommendation.priority, recommendation.expectedImpact]
      );
    }

    // Get stored insights
    db.all(
      `SELECT * FROM insights WHERE user_id = ? AND status = 'active' ORDER BY created_at DESC LIMIT 10`,
      [req.user.userId],
      (err, storedInsights) => {
        if (err) {
          return res.status(500).json({ error: err.message });
        }

        res.json({
          insights: aiInsights.insights,
          recommendations: aiInsights.recommendations,
          history: storedInsights
        });
      }
    );

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Dashboard endpoint with enhanced metrics
app.get('/api/dashboard', authenticateToken, (req, res) => {
  db.all(
    `SELECT 
        COUNT(DISTINCT c.id) as total_campaigns,
        COUNT(DISTINCT CASE WHEN c.status = 'active' THEN c.id END) as active_campaigns,
        COUNT(DISTINCT CASE WHEN pc.id IS NOT NULL THEN c.id END) as connected_campaigns,
        SUM(cm.revenue) as total_revenue,
        SUM(cm.cost) as total_cost,
        SUM(cm.conversions) as total_conversions,
        AVG(CASE WHEN cm.cost > 0 THEN ((cm.revenue - cm.cost) / cm.cost * 100) END) as avg_roi,
        COUNT(DISTINCT pc.platform) as connected_platforms
     FROM campaigns c
     LEFT JOIN campaign_metrics cm ON c.id = cm.campaign_id
     LEFT JOIN platform_connections pc ON c.platform_connection_id = pc.id
     WHERE c.user_id = ?`,
    [req.user.userId],
    (err, row) => {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      
      const dashboardData = {
        totalCampaigns: row[0].total_campaigns || 0,
        activeCampaigns: row[0].active_campaigns || 0,
        connectedCampaigns: row[0].connected_campaigns || 0,
        connectedPlatforms: row[0].connected_platforms || 0,
        totalRevenue: row[0].total_revenue || 0,
        totalCost: row[0].total_cost || 0,
        totalConversions: row[0].total_conversions || 0,
        avgROI: row[0].avg_roi ? row[0].avg_roi.toFixed(2) : '0.00',
        overallROI: row[0].total_cost > 0 ? 
          (((row[0].total_revenue - row[0].total_cost) / row[0].total_cost) * 100).toFixed(2) : '0.00'
      };
      
      res.json(dashboardData);
    }
  );
});

// Automated sync scheduler (runs every hour)
cron.schedule('0 * * * *', async () => {
  console.log('Running automated campaign sync...');
  
  // Get all campaigns with auto_sync enabled
  db.all(
    `SELECT c.id, c.user_id, c.name, pc.platform, pc.access_token, pc.account_id
     FROM campaigns c
     JOIN platform_connections pc ON c.platform_connection_id = pc.id
     WHERE c.auto_sync = true AND c.status = 'active' AND pc.status = 'active'`,
    async (err, campaigns) => {
      if (err) {
        console.error('Auto-sync query error:', err);
        return;
      }

      for (const campaign of campaigns) {
        try {
          // Simulate the sync process for each campaign
          console.log(`Auto-syncing campaign: ${campaign.name} (${campaign.platform})`);
          // Add actual sync logic here
        } catch (error) {
          console.error(`Auto-sync failed for campaign ${campaign.id}:`, error);
        }
      }
    }
  );
});

// All existing endpoints remain the same...
// (Include all the previous campaign and analytics endpoints here)

app.listen(PORT, () => {
  console.log(`Enhanced Optz BI server running on port ${PORT}`);
  console.log('Features enabled:');
  console.log('- User authentication');
  console.log('- Platform integrations (Google Ads, Meta, TikTok, Google Analytics)');
  console.log('- Automated data sync');
  console.log('- AI-powered insights and recommendations');
});