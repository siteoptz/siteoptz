// lib/database/connection.js
import { Pool } from 'pg';

let pool;

const createPool = () => {
  // Database configuration
  const config = {
    connectionString: process.env.DATABASE_URL,
    ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
    max: 20, // Maximum number of clients in the pool
    idleTimeoutMillis: 30000, // How long a client is allowed to remain idle
    connectionTimeoutMillis: 2000, // How long to wait when connecting a new client
  };

  // If DATABASE_URL is not provided, use individual components
  if (!process.env.DATABASE_URL) {
    config.host = process.env.DB_HOST || 'localhost';
    config.port = parseInt(process.env.DB_PORT || '5432');
    config.database = process.env.DB_NAME || 'siteoptz_dashboard';
    config.user = process.env.DB_USER || 'postgres';
    config.password = process.env.DB_PASSWORD || '';
    delete config.connectionString;
  }

  return new Pool(config);
};

const getPool = () => {
  if (!pool) {
    pool = createPool();
    
    // Handle pool events
    pool.on('connect', (client) => {
      console.log('New database client connected');
    });

    pool.on('error', (err) => {
      console.error('Database pool error:', err);
      // Don't exit the process, but log the error
    });

    pool.on('remove', (client) => {
      console.log('Database client removed');
    });
  }
  
  return pool;
};

// Export the pool instance
export { getPool as pool };

// Database utility functions
export class Database {
  static async query(text, params = []) {
    const client = await getPool().connect();
    try {
      const result = await client.query(text, params);
      return result;
    } finally {
      client.release();
    }
  }

  static async transaction(callback) {
    const client = await getPool().connect();
    try {
      await client.query('BEGIN');
      const result = await callback(client);
      await client.query('COMMIT');
      return result;
    } catch (error) {
      await client.query('ROLLBACK');
      throw error;
    } finally {
      client.release();
    }
  }

  static async testConnection() {
    try {
      const client = await getPool().connect();
      const result = await client.query('SELECT NOW()');
      client.release();
      console.log('Database connection successful:', result.rows[0].now);
      return true;
    } catch (error) {
      console.error('Database connection failed:', error);
      return false;
    }
  }

  static async migrate() {
    try {
      console.log('Running database migrations...');
      
      // Check if tables exist
      const tablesQuery = `
        SELECT table_name 
        FROM information_schema.tables 
        WHERE table_schema = 'public'
      `;
      
      const result = await this.query(tablesQuery);
      const existingTables = result.rows.map(row => row.table_name);
      
      if (existingTables.length === 0) {
        console.log('No tables found. Creating initial schema...');
        // Here you would run your schema.sql file
        // For now, we'll just log that it needs to be done
        console.log('Please run the schema.sql file to create the database tables');
        return false;
      }
      
      console.log(`Found ${existingTables.length} tables:`, existingTables);
      return true;
    } catch (error) {
      console.error('Migration failed:', error);
      return false;
    }
  }

  static async seed() {
    try {
      console.log('Seeding database...');
      
      // Check if subscription plans exist
      const plansResult = await this.query('SELECT COUNT(*) FROM subscription_plans');
      const planCount = parseInt(plansResult.rows[0].count);
      
      if (planCount === 0) {
        console.log('Creating default subscription plans...');
        
        const plansQuery = `
          INSERT INTO subscription_plans (
            name, slug, price_monthly, price_yearly, max_accounts, 
            max_data_retention_days, max_insights_per_month, 
            max_automation_rules, max_api_calls_per_month, features
          ) VALUES 
          ('Free', 'free', 0, 0, 2, 30, 10, 0, 1000, 
           ARRAY['Basic dashboard', 'Limited insights', 'Email support']),
          ('Professional', 'professional', 99, 990, 10, 90, 100, 5, 10000, 
           ARRAY['Advanced dashboard', 'Unlimited insights', 'Basic automation', 'Priority support', 'Custom reports']),
          ('Enterprise', 'enterprise', 299, 2990, 50, 365, 1000, 25, 100000, 
           ARRAY['White-label dashboard', 'Advanced automation', 'Custom integrations', 'Dedicated support', 'API access', 'Custom branding'])
        `;
        
        await this.query(plansQuery);
        console.log('Subscription plans created successfully');
      }
      
      return true;
    } catch (error) {
      console.error('Seeding failed:', error);
      return false;
    }
  }

  static async cleanup() {
    try {
      console.log('Cleaning up old data...');
      
      // Clean up old usage tracking data (older than 12 months)
      const oldUsageQuery = `
        DELETE FROM usage_tracking 
        WHERE tracked_at < NOW() - INTERVAL '12 months'
      `;
      
      const usageResult = await this.query(oldUsageQuery);
      console.log(`Cleaned up ${usageResult.rowCount} old usage records`);
      
      // Clean up old marketing data based on user retention settings
      const oldDataQuery = `
        DELETE FROM marketing_data md
        USING users u, subscription_plans sp
        WHERE md.user_id = u.id 
        AND u.subscription_tier = sp.slug
        AND md.date < CURRENT_DATE - INTERVAL '1 day' * sp.max_data_retention_days
      `;
      
      const dataResult = await this.query(oldDataQuery);
      console.log(`Cleaned up ${dataResult.rowCount} old marketing data records`);
      
      // Clean up expired insights (older than 90 days or past valid_until date)
      const oldInsightsQuery = `
        DELETE FROM ai_insights 
        WHERE (valid_until IS NOT NULL AND valid_until < NOW())
        OR (valid_until IS NULL AND created_at < NOW() - INTERVAL '90 days')
      `;
      
      const insightsResult = await this.query(oldInsightsQuery);
      console.log(`Cleaned up ${insightsResult.rowCount} expired insights`);
      
      return true;
    } catch (error) {
      console.error('Cleanup failed:', error);
      return false;
    }
  }

  static async getStats() {
    try {
      const stats = {};
      
      // User statistics
      const userStatsQuery = `
        SELECT 
          COUNT(*) as total_users,
          COUNT(*) FILTER (WHERE subscription_tier = 'free') as free_users,
          COUNT(*) FILTER (WHERE subscription_tier = 'professional') as pro_users,
          COUNT(*) FILTER (WHERE subscription_tier = 'enterprise') as enterprise_users,
          COUNT(*) FILTER (WHERE created_at >= NOW() - INTERVAL '30 days') as new_users_30d
        FROM users
      `;
      
      const userStats = await this.query(userStatsQuery);
      stats.users = userStats.rows[0];
      
      // Connection statistics
      const connectionStatsQuery = `
        SELECT 
          COUNT(*) as total_connections,
          COUNT(DISTINCT user_id) as users_with_connections,
          platform,
          COUNT(*) as platform_count
        FROM oauth_connections 
        WHERE is_active = true
        GROUP BY platform
      `;
      
      const connectionStats = await this.query(connectionStatsQuery);
      stats.connections = connectionStats.rows;
      
      // Data statistics
      const dataStatsQuery = `
        SELECT 
          COUNT(*) as total_data_points,
          COUNT(DISTINCT user_id) as users_with_data,
          platform,
          COUNT(*) as platform_data_count
        FROM marketing_data 
        WHERE date >= CURRENT_DATE - INTERVAL '30 days'
        GROUP BY platform
      `;
      
      const dataStats = await this.query(dataStatsQuery);
      stats.data = dataStats.rows;
      
      return stats;
    } catch (error) {
      console.error('Failed to get database stats:', error);
      return null;
    }
  }

  static async close() {
    if (pool) {
      await pool.end();
      pool = null;
      console.log('Database pool closed');
    }
  }
}

// Graceful shutdown handling
process.on('SIGINT', async () => {
  console.log('Received SIGINT, closing database connections...');
  await Database.close();
  process.exit(0);
});

process.on('SIGTERM', async () => {
  console.log('Received SIGTERM, closing database connections...');
  await Database.close();
  process.exit(0);
});

export default Database;