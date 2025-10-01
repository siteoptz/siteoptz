const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./database.db');

const seedData = () => {
  db.serialize(() => {
    db.run(`INSERT OR IGNORE INTO users (id, name, email, password, company) 
            VALUES (1, 'John Doe', 'john@example.com', 'password123', 'Acme Corp')`);
    
    const campaigns = [
      { name: 'Summer Sale 2024', type: 'Promotional', channel: 'Google Ads', budget: 5000, start_date: '2024-06-01', end_date: '2024-08-31', status: 'completed' },
      { name: 'Black Friday Campaign', type: 'Seasonal', channel: 'Facebook Ads', budget: 8000, start_date: '2024-11-20', end_date: '2024-11-30', status: 'active' },
      { name: 'Brand Awareness Q1', type: 'Branding', channel: 'Instagram', budget: 3000, start_date: '2024-01-01', end_date: '2024-03-31', status: 'completed' },
      { name: 'Product Launch - Widget X', type: 'Product Launch', channel: 'LinkedIn', budget: 6000, start_date: '2024-09-01', end_date: '2024-10-31', status: 'active' },
      { name: 'Holiday Email Campaign', type: 'Email', channel: 'Email', budget: 1500, start_date: '2024-12-01', end_date: '2024-12-31', status: 'active' },
      { name: 'SEO Content Marketing', type: 'Content', channel: 'Organic Search', budget: 4000, start_date: '2024-01-01', end_date: '2024-12-31', status: 'active' },
      { name: 'YouTube Video Ads', type: 'Video', channel: 'YouTube', budget: 7000, start_date: '2024-07-01', end_date: '2024-09-30', status: 'completed' },
      { name: 'Twitter Engagement', type: 'Social', channel: 'Twitter', budget: 2000, start_date: '2024-10-01', end_date: '2024-12-31', status: 'active' }
    ];
    
    campaigns.forEach((campaign, index) => {
      const id = index + 1;
      db.run(
        `INSERT OR IGNORE INTO campaigns (id, user_id, name, type, channel, budget, start_date, end_date, status) 
         VALUES (?, 1, ?, ?, ?, ?, ?, ?, ?)`,
        [id, campaign.name, campaign.type, campaign.channel, campaign.budget, campaign.start_date, campaign.end_date, campaign.status]
      );
      
      const days = 30;
      const baseDate = new Date(campaign.start_date);
      
      for (let i = 0; i < days; i++) {
        const currentDate = new Date(baseDate);
        currentDate.setDate(baseDate.getDate() + i);
        const dateStr = currentDate.toISOString().split('T')[0];
        
        if (currentDate > new Date(campaign.end_date || '2024-12-31')) break;
        
        const impressions = Math.floor(Math.random() * 10000) + 5000;
        const clicks = Math.floor(impressions * (Math.random() * 0.05 + 0.02));
        const conversions = Math.floor(clicks * (Math.random() * 0.15 + 0.05));
        const cost = (campaign.budget / 30) * (0.8 + Math.random() * 0.4);
        const revenue = conversions * (50 + Math.random() * 150);
        
        db.run(
          `INSERT INTO campaign_metrics (campaign_id, date, impressions, clicks, conversions, revenue, cost) 
           VALUES (?, ?, ?, ?, ?, ?, ?)`,
          [id, dateStr, impressions, clicks, conversions, revenue.toFixed(2), cost.toFixed(2)]
        );
      }
    });
    
    console.log('Demo data seeded successfully!');
  });
};

seedData();

setTimeout(() => {
  db.close();
}, 5000);