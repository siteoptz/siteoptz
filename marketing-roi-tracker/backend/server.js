const express = require('express');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const db = new sqlite3.Database('./database.db');

db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL,
      company TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS campaigns (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER NOT NULL,
      name TEXT NOT NULL,
      type TEXT NOT NULL,
      channel TEXT NOT NULL,
      status TEXT DEFAULT 'active',
      budget DECIMAL(10,2) NOT NULL,
      start_date DATE NOT NULL,
      end_date DATE,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users(id)
    )
  `);

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
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (campaign_id) REFERENCES campaigns(id)
    )
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS roi_calculations (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      campaign_id INTEGER NOT NULL,
      period TEXT NOT NULL,
      total_revenue DECIMAL(10,2) NOT NULL,
      total_cost DECIMAL(10,2) NOT NULL,
      roi_percentage DECIMAL(5,2) NOT NULL,
      roas DECIMAL(5,2) NOT NULL,
      cpa DECIMAL(10,2),
      calculated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (campaign_id) REFERENCES campaigns(id)
    )
  `);
});

app.get('/api/campaigns', (req, res) => {
  const userId = req.query.userId || 1;
  
  db.all(
    `SELECT c.*, 
            SUM(cm.revenue) as total_revenue,
            SUM(cm.cost) as total_cost,
            SUM(cm.conversions) as total_conversions,
            SUM(cm.clicks) as total_clicks,
            SUM(cm.impressions) as total_impressions
     FROM campaigns c
     LEFT JOIN campaign_metrics cm ON c.id = cm.campaign_id
     WHERE c.user_id = ?
     GROUP BY c.id
     ORDER BY c.created_at DESC`,
    [userId],
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
          conversionRate: conversionRate.toFixed(2)
        };
      });
      
      res.json(campaignsWithROI);
    }
  );
});

app.post('/api/campaigns', (req, res) => {
  const { name, type, channel, budget, start_date, end_date, user_id = 1 } = req.body;
  
  db.run(
    `INSERT INTO campaigns (user_id, name, type, channel, budget, start_date, end_date) 
     VALUES (?, ?, ?, ?, ?, ?, ?)`,
    [user_id, name, type, channel, budget, start_date, end_date],
    function(err) {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      res.json({ id: this.lastID, message: 'Campaign created successfully' });
    }
  );
});

app.get('/api/campaigns/:id', (req, res) => {
  const { id } = req.params;
  
  db.get(
    `SELECT c.*, 
            SUM(cm.revenue) as total_revenue,
            SUM(cm.cost) as total_cost,
            SUM(cm.conversions) as total_conversions,
            SUM(cm.clicks) as total_clicks,
            SUM(cm.impressions) as total_impressions
     FROM campaigns c
     LEFT JOIN campaign_metrics cm ON c.id = cm.campaign_id
     WHERE c.id = ?
     GROUP BY c.id`,
    [id],
    (err, campaign) => {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      
      if (!campaign) {
        res.status(404).json({ error: 'Campaign not found' });
        return;
      }
      
      const revenue = campaign.total_revenue || 0;
      const cost = campaign.total_cost || campaign.budget;
      const roi = cost > 0 ? ((revenue - cost) / cost * 100) : 0;
      const roas = cost > 0 ? (revenue / cost) : 0;
      const cpa = campaign.total_conversions > 0 ? (cost / campaign.total_conversions) : 0;
      
      res.json({
        ...campaign,
        roi: roi.toFixed(2),
        roas: roas.toFixed(2),
        cpa: cpa.toFixed(2)
      });
    }
  );
});

app.get('/api/campaigns/:id/metrics', (req, res) => {
  const { id } = req.params;
  
  db.all(
    `SELECT * FROM campaign_metrics 
     WHERE campaign_id = ? 
     ORDER BY date DESC`,
    [id],
    (err, rows) => {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      res.json(rows);
    }
  );
});

app.post('/api/campaigns/:id/metrics', (req, res) => {
  const { id } = req.params;
  const { date, impressions, clicks, conversions, revenue, cost } = req.body;
  
  db.run(
    `INSERT INTO campaign_metrics (campaign_id, date, impressions, clicks, conversions, revenue, cost) 
     VALUES (?, ?, ?, ?, ?, ?, ?)`,
    [id, date, impressions, clicks, conversions, revenue, cost],
    function(err) {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      res.json({ id: this.lastID, message: 'Metrics added successfully' });
    }
  );
});

app.get('/api/dashboard', (req, res) => {
  const userId = req.query.userId || 1;
  
  db.all(
    `SELECT 
        COUNT(DISTINCT c.id) as total_campaigns,
        COUNT(DISTINCT CASE WHEN c.status = 'active' THEN c.id END) as active_campaigns,
        SUM(cm.revenue) as total_revenue,
        SUM(cm.cost) as total_cost,
        SUM(cm.conversions) as total_conversions,
        AVG(CASE WHEN cm.cost > 0 THEN ((cm.revenue - cm.cost) / cm.cost * 100) END) as avg_roi
     FROM campaigns c
     LEFT JOIN campaign_metrics cm ON c.id = cm.campaign_id
     WHERE c.user_id = ?`,
    [userId],
    (err, row) => {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      
      const dashboardData = {
        totalCampaigns: row[0].total_campaigns || 0,
        activeCampaigns: row[0].active_campaigns || 0,
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

app.get('/api/analytics/roi-trend', (req, res) => {
  const userId = req.query.userId || 1;
  const period = req.query.period || 30;
  
  db.all(
    `SELECT 
        DATE(cm.date) as date,
        SUM(cm.revenue) as revenue,
        SUM(cm.cost) as cost,
        SUM(cm.conversions) as conversions
     FROM campaign_metrics cm
     INNER JOIN campaigns c ON cm.campaign_id = c.id
     WHERE c.user_id = ? 
       AND cm.date >= date('now', '-${period} days')
     GROUP BY DATE(cm.date)
     ORDER BY date`,
    [userId],
    (err, rows) => {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      
      const trendData = rows.map(row => ({
        date: row.date,
        revenue: row.revenue || 0,
        cost: row.cost || 0,
        roi: row.cost > 0 ? ((row.revenue - row.cost) / row.cost * 100) : 0,
        conversions: row.conversions || 0
      }));
      
      res.json(trendData);
    }
  );
});

app.get('/api/analytics/channel-performance', (req, res) => {
  const userId = req.query.userId || 1;
  
  db.all(
    `SELECT 
        c.channel,
        COUNT(DISTINCT c.id) as campaigns,
        SUM(cm.revenue) as revenue,
        SUM(cm.cost) as cost,
        SUM(cm.conversions) as conversions,
        SUM(cm.clicks) as clicks,
        SUM(cm.impressions) as impressions
     FROM campaigns c
     LEFT JOIN campaign_metrics cm ON c.id = cm.campaign_id
     WHERE c.user_id = ?
     GROUP BY c.channel`,
    [userId],
    (err, rows) => {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      
      const channelData = rows.map(row => ({
        channel: row.channel,
        campaigns: row.campaigns,
        revenue: row.revenue || 0,
        cost: row.cost || 0,
        roi: row.cost > 0 ? ((row.revenue - row.cost) / row.cost * 100) : 0,
        conversions: row.conversions || 0,
        ctr: row.impressions > 0 ? ((row.clicks / row.impressions) * 100) : 0
      }));
      
      res.json(channelData);
    }
  );
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});