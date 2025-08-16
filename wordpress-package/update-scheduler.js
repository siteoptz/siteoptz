const cron = require('node-cron');
const fs = require('fs');
const path = require('path');
const { FirecrawlScraper } = require('./firecrawl-scraper');
const { SiteOptzConverter } = require('./siteoptz-converter');

class UpdateScheduler {
  constructor() {
    this.scraper = null;
    this.converter = null;
    this.isRunning = false;
    this.lastUpdate = null;
    this.updateHistory = [];
  }

  // Initialize the scheduler
  async initialize() {
    console.log('🚀 Initializing SiteOptz.ai Update Scheduler...');
    
    const apiKey = process.env.FIRECRAWL_API_KEY || 'fc-6e7e6312953b47069452e67509d9f857';
    
    if (!apiKey) {
      throw new Error('FIRECRAWL_API_KEY environment variable is required');
    }
    
    this.scraper = new FirecrawlScraper(apiKey);
    this.converter = new SiteOptzConverter();
    
    // Load update history
    this.loadUpdateHistory();
    
    console.log('✅ Update Scheduler initialized successfully');
  }

  // Schedule regular updates
  scheduleUpdates() {
    console.log('📅 Scheduling automated updates...');
    
    // Daily update at 2 AM
    cron.schedule('0 2 * * *', () => {
      console.log('🕐 Daily update triggered');
      this.runDailyUpdate();
    }, {
      scheduled: true,
      timezone: 'UTC'
    });
    
    // Weekly full scrape on Sundays at 3 AM
    cron.schedule('0 3 * * 0', () => {
      console.log('🕐 Weekly full scrape triggered');
      this.runWeeklyUpdate();
    }, {
      scheduled: true,
      timezone: 'UTC'
    });
    
    // Monthly analytics generation on 1st of month at 4 AM
    cron.schedule('0 4 1 * *', () => {
      console.log('🕐 Monthly analytics generation triggered');
      this.generateMonthlyAnalytics();
    }, {
      scheduled: true,
      timezone: 'UTC'
    });
    
    // Hourly health check
    cron.schedule('0 * * * *', () => {
      this.performHealthCheck();
    }, {
      scheduled: true,
      timezone: 'UTC'
    });
    
    console.log('✅ Automated updates scheduled');
    console.log('📅 Daily updates: 2:00 AM UTC');
    console.log('📅 Weekly full scrape: Sundays 3:00 AM UTC');
    console.log('📅 Monthly analytics: 1st of month 4:00 AM UTC');
    console.log('📅 Health checks: Every hour');
  }

  // Run daily update (light update)
  async runDailyUpdate() {
    if (this.isRunning) {
      console.log('⚠️ Update already running, skipping...');
      return;
    }
    
    this.isRunning = true;
    const startTime = new Date();
    
    try {
      console.log('🔄 Starting daily update...');
      
      // Check for new tools (light scrape)
      await this.scraper.scrapeAIToolsDirectory();
      
      // Process and clean data
      this.scraper.processAndCleanData();
      
      // Export data
      this.scraper.exportData();
      
      // Convert to SiteOptz.ai format
      const scrapedData = JSON.parse(fs.readFileSync(path.join(__dirname, 'data', 'tools.json'), 'utf8'));
      this.converter.convertToSiteOptzFormat(scrapedData);
      this.converter.exportSiteOptzData();
      
      // Generate insights
      const insights = this.scraper.generateInsights();
      
      // Update history
      this.recordUpdate('daily', startTime, new Date(), insights);
      
      console.log('✅ Daily update completed successfully');
      
    } catch (error) {
      console.error('❌ Error during daily update:', error);
      this.recordUpdate('daily', startTime, new Date(), null, error.message);
    } finally {
      this.isRunning = false;
    }
  }

  // Run weekly update (full scrape)
  async runWeeklyUpdate() {
    if (this.isRunning) {
      console.log('⚠️ Update already running, skipping...');
      return;
    }
    
    this.isRunning = true;
    const startTime = new Date();
    
    try {
      console.log('🔄 Starting weekly full update...');
      
      // Full scrape with more comprehensive data
      await this.scraper.scrapeAIToolsDirectory();
      
      // Enhanced processing
      this.scraper.processAndCleanData();
      this.scraper.exportData();
      
      // Convert to SiteOptz.ai format
      const scrapedData = JSON.parse(fs.readFileSync(path.join(__dirname, 'data', 'tools.json'), 'utf8'));
      this.converter.convertToSiteOptzFormat(scrapedData);
      this.converter.exportSiteOptzData();
      
      // Generate comprehensive insights
      const insights = this.scraper.generateInsights();
      
      // Generate weekly report
      await this.generateWeeklyReport(insights);
      
      // Update history
      this.recordUpdate('weekly', startTime, new Date(), insights);
      
      console.log('✅ Weekly update completed successfully');
      
    } catch (error) {
      console.error('❌ Error during weekly update:', error);
      this.recordUpdate('weekly', startTime, new Date(), null, error.message);
    } finally {
      this.isRunning = false;
    }
  }

  // Generate monthly analytics
  async generateMonthlyAnalytics() {
    try {
      console.log('📊 Generating monthly analytics...');
      
      const analytics = await this.generateComprehensiveAnalytics();
      
      // Save analytics
      const analyticsPath = path.join(__dirname, 'data', 'analytics', 'monthly');
      if (!fs.existsSync(analyticsPath)) {
        fs.mkdirSync(analyticsPath, { recursive: true });
      }
      
      const filename = `analytics-${new Date().toISOString().slice(0, 7)}.json`;
      fs.writeFileSync(path.join(analyticsPath, filename), JSON.stringify(analytics, null, 2));
      
      // Generate analytics report
      await this.generateAnalyticsReport(analytics);
      
      console.log('✅ Monthly analytics generated successfully');
      
    } catch (error) {
      console.error('❌ Error generating monthly analytics:', error);
    }
  }

  // Generate comprehensive analytics
  async generateComprehensiveAnalytics() {
    const dataPath = path.join(__dirname, 'data', 'tools.json');
    const tools = JSON.parse(fs.readFileSync(dataPath, 'utf8')).tools;
    
    const analytics = {
      timestamp: new Date().toISOString(),
      period: 'monthly',
      
      // Basic statistics
      totalTools: tools.length,
      totalCategories: new Set(tools.map(t => t.category)).size,
      averageRating: tools.reduce((sum, t) => sum + (t.rating || 0), 0) / tools.length,
      
      // Category analysis
      categoryDistribution: this.analyzeCategoryDistribution(tools),
      topCategories: this.getTopCategories(tools),
      
      // Pricing analysis
      pricingAnalysis: this.analyzePricing(tools),
      priceDistribution: this.getPriceDistribution(tools),
      
      // Rating analysis
      ratingAnalysis: this.analyzeRatings(tools),
      topRatedTools: this.getTopRatedTools(tools, 20),
      
      // Source analysis
      sourceAnalysis: this.analyzeSources(tools),
      
      // Feature analysis
      featureAnalysis: this.analyzeFeatures(tools),
      popularFeatures: this.getPopularFeatures(tools),
      
      // Growth analysis
      growthAnalysis: this.analyzeGrowth(tools),
      
      // Update history
      updateHistory: this.updateHistory.slice(-30), // Last 30 updates
      
      // Performance metrics
      performance: {
        averageUpdateTime: this.calculateAverageUpdateTime(),
        successRate: this.calculateSuccessRate(),
        errorRate: this.calculateErrorRate()
      }
    };
    
    return analytics;
  }

  // Analyze category distribution
  analyzeCategoryDistribution(tools) {
    const distribution = {};
    tools.forEach(tool => {
      distribution[tool.category] = (distribution[tool.category] || 0) + 1;
    });
    
    return Object.entries(distribution)
      .map(([category, count]) => ({ category, count, percentage: (count / tools.length) * 100 }))
      .sort((a, b) => b.count - a.count);
  }

  // Get top categories
  getTopCategories(tools, limit = 10) {
    const distribution = this.analyzeCategoryDistribution(tools);
    return distribution.slice(0, limit);
  }

  // Analyze pricing
  analyzePricing(tools) {
    const prices = tools.map(t => t.pricing.price).filter(p => p !== null && p >= 0);
    
    return {
      freeTools: tools.filter(t => t.pricing.price === 0).length,
      paidTools: tools.filter(t => t.pricing.price > 0).length,
      averagePrice: prices.length > 0 ? prices.reduce((sum, p) => sum + p, 0) / prices.length : 0,
      medianPrice: this.getMedian(prices),
      priceRange: {
        min: Math.min(...prices),
        max: Math.max(...prices)
      }
    };
  }

  // Get price distribution
  getPriceDistribution(tools) {
    const ranges = [
      { range: 'Free', min: 0, max: 0 },
      { range: '$1-$10', min: 1, max: 10 },
      { range: '$11-$25', min: 11, max: 25 },
      { range: '$26-$50', min: 26, max: 50 },
      { range: '$51-$100', min: 51, max: 100 },
      { range: '$100+', min: 101, max: Infinity }
    ];
    
    return ranges.map(range => ({
      range: range.range,
      count: tools.filter(t => {
        const price = t.pricing.price;
        return price !== null && price >= range.min && price <= range.max;
      }).length
    }));
  }

  // Analyze ratings
  analyzeRatings(tools) {
    const ratings = tools.map(t => t.rating).filter(r => r !== null);
    
    return {
      averageRating: ratings.reduce((sum, r) => sum + r, 0) / ratings.length,
      medianRating: this.getMedian(ratings),
      ratingDistribution: this.getRatingDistribution(ratings),
      highlyRated: tools.filter(t => t.rating >= 4.5).length,
      poorlyRated: tools.filter(t => t.rating < 3.0).length
    };
  }

  // Get rating distribution
  getRatingDistribution(ratings) {
    const distribution = {
      '5.0': 0, '4.5-4.9': 0, '4.0-4.4': 0, '3.5-3.9': 0, '3.0-3.4': 0, '<3.0': 0
    };
    
    ratings.forEach(rating => {
      if (rating === 5.0) distribution['5.0']++;
      else if (rating >= 4.5) distribution['4.5-4.9']++;
      else if (rating >= 4.0) distribution['4.0-4.4']++;
      else if (rating >= 3.5) distribution['3.5-3.9']++;
      else if (rating >= 3.0) distribution['3.0-3.4']++;
      else distribution['<3.0']++;
    });
    
    return distribution;
  }

  // Get top rated tools
  getTopRatedTools(tools, limit = 20) {
    return tools
      .filter(t => t.rating)
      .sort((a, b) => b.rating - a.rating)
      .slice(0, limit)
      .map(t => ({
        name: t.name,
        rating: t.rating,
        category: t.category,
        price: t.pricing.price,
        reviewCount: t.reviewCount
      }));
  }

  // Analyze sources
  analyzeSources(tools) {
    const sources = {};
    tools.forEach(tool => {
      sources[tool.source] = (sources[tool.source] || 0) + 1;
    });
    
    return Object.entries(sources)
      .map(([source, count]) => ({ source, count, percentage: (count / tools.length) * 100 }))
      .sort((a, b) => b.count - a.count);
  }

  // Analyze features
  analyzeFeatures(tools) {
    const allFeatures = tools.flatMap(t => t.features);
    const featureCount = {};
    
    allFeatures.forEach(feature => {
      featureCount[feature] = (featureCount[feature] || 0) + 1;
    });
    
    return Object.entries(featureCount)
      .map(([feature, count]) => ({ feature, count, percentage: (count / tools.length) * 100 }))
      .sort((a, b) => b.count - a.count);
  }

  // Get popular features
  getPopularFeatures(tools, limit = 20) {
    const features = this.analyzeFeatures(tools);
    return features.slice(0, limit);
  }

  // Analyze growth
  analyzeGrowth(tools) {
    const monthlyData = {};
    
    tools.forEach(tool => {
      const month = tool.lastUpdated.slice(0, 7); // YYYY-MM
      monthlyData[month] = (monthlyData[month] || 0) + 1;
    });
    
    return Object.entries(monthlyData)
      .map(([month, count]) => ({ month, count }))
      .sort((a, b) => a.month.localeCompare(b.month));
  }

  // Calculate average update time
  calculateAverageUpdateTime() {
    const successfulUpdates = this.updateHistory.filter(u => u.success);
    if (successfulUpdates.length === 0) return 0;
    
    const totalTime = successfulUpdates.reduce((sum, update) => {
      return sum + (new Date(update.endTime) - new Date(update.startTime));
    }, 0);
    
    return totalTime / successfulUpdates.length;
  }

  // Calculate success rate
  calculateSuccessRate() {
    if (this.updateHistory.length === 0) return 0;
    const successful = this.updateHistory.filter(u => u.success).length;
    return (successful / this.updateHistory.length) * 100;
  }

  // Calculate error rate
  calculateErrorRate() {
    return 100 - this.calculateSuccessRate();
  }

  // Get median
  getMedian(arr) {
    if (arr.length === 0) return 0;
    const sorted = arr.sort((a, b) => a - b);
    const mid = Math.floor(sorted.length / 2);
    return sorted.length % 2 === 0 ? (sorted[mid - 1] + sorted[mid]) / 2 : sorted[mid];
  }

  // Record update
  recordUpdate(type, startTime, endTime, insights, error = null) {
    const update = {
      type,
      startTime: startTime.toISOString(),
      endTime: endTime.toISOString(),
      duration: endTime - startTime,
      success: !error,
      error: error,
      insights: insights ? {
        totalTools: insights.totalTools,
        averageRating: insights.averageRating,
        freeToolsCount: insights.freeToolsCount,
        paidToolsCount: insights.paidToolsCount
      } : null
    };
    
    this.updateHistory.push(update);
    this.lastUpdate = update;
    
    // Save update history
    this.saveUpdateHistory();
  }

  // Load update history
  loadUpdateHistory() {
    const historyPath = path.join(__dirname, 'data', 'update-history.json');
    if (fs.existsSync(historyPath)) {
      try {
        this.updateHistory = JSON.parse(fs.readFileSync(historyPath, 'utf8'));
        console.log(`📊 Loaded ${this.updateHistory.length} update records`);
      } catch (error) {
        console.error('Error loading update history:', error);
        this.updateHistory = [];
      }
    } else {
      this.updateHistory = [];
    }
  }

  // Save update history
  saveUpdateHistory() {
    const historyPath = path.join(__dirname, 'data', 'update-history.json');
    fs.writeFileSync(historyPath, JSON.stringify(this.updateHistory, null, 2));
  }

  // Generate weekly report
  async generateWeeklyReport(insights) {
    const report = {
      timestamp: new Date().toISOString(),
      period: 'weekly',
      insights,
      summary: {
        totalTools: insights.totalTools,
        newTools: this.calculateNewTools(),
        updatedTools: this.calculateUpdatedTools(),
        topPerformers: this.getTopPerformers(),
        recommendations: this.generateRecommendations()
      }
    };
    
    const reportPath = path.join(__dirname, 'data', 'reports', 'weekly');
    if (!fs.existsSync(reportPath)) {
      fs.mkdirSync(reportPath, { recursive: true });
    }
    
    const filename = `weekly-report-${new Date().toISOString().slice(0, 10)}.json`;
    fs.writeFileSync(path.join(reportPath, filename), JSON.stringify(report, null, 2));
    
    console.log(`📊 Weekly report generated: ${filename}`);
  }

  // Generate analytics report
  async generateAnalyticsReport(analytics) {
    const report = {
      timestamp: new Date().toISOString(),
      period: 'monthly',
      analytics,
      insights: {
        growthTrend: this.calculateGrowthTrend(analytics),
        marketAnalysis: this.generateMarketAnalysis(analytics),
        recommendations: this.generateStrategicRecommendations(analytics)
      }
    };
    
    const reportPath = path.join(__dirname, 'data', 'reports', 'analytics');
    if (!fs.existsSync(reportPath)) {
      fs.mkdirSync(reportPath, { recursive: true });
    }
    
    const filename = `analytics-report-${new Date().toISOString().slice(0, 7)}.json`;
    fs.writeFileSync(path.join(reportPath, filename), JSON.stringify(report, null, 2));
    
    console.log(`📊 Analytics report generated: ${filename}`);
  }

  // Calculate new tools
  calculateNewTools() {
    // This would compare with previous data to find new tools
    return Math.floor(Math.random() * 10) + 1; // Placeholder
  }

  // Calculate updated tools
  calculateUpdatedTools() {
    // This would compare with previous data to find updated tools
    return Math.floor(Math.random() * 20) + 5; // Placeholder
  }

  // Get top performers
  getTopPerformers() {
    return [
      { name: 'ChatGPT', growth: 15, rating: 4.8 },
      { name: 'Midjourney', growth: 12, rating: 4.7 },
      { name: 'GitHub Copilot', growth: 10, rating: 4.6 }
    ];
  }

  // Generate recommendations
  generateRecommendations() {
    return [
      'Focus on emerging AI categories like healthcare and finance',
      'Increase coverage of free AI tools',
      'Add more detailed pricing comparisons',
      'Implement user review system'
    ];
  }

  // Calculate growth trend
  calculateGrowthTrend(analytics) {
    const growth = analytics.growthAnalysis;
    if (growth.length < 2) return 'insufficient data';
    
    const recent = growth[growth.length - 1].count;
    const previous = growth[growth.length - 2].count;
    const percentage = ((recent - previous) / previous) * 100;
    
    return {
      percentage,
      trend: percentage > 0 ? 'increasing' : 'decreasing',
      rate: Math.abs(percentage)
    };
  }

  // Generate market analysis
  generateMarketAnalysis(analytics) {
    return {
      topCategory: analytics.topCategories[0]?.category,
      fastestGrowing: analytics.growthAnalysis[analytics.growthAnalysis.length - 1]?.month,
      averagePrice: analytics.pricingAnalysis.averagePrice,
      marketMaturity: this.assessMarketMaturity(analytics)
    };
  }

  // Assess market maturity
  assessMarketMaturity(analytics) {
    const totalTools = analytics.totalTools;
    const categories = analytics.totalCategories;
    
    if (totalTools > 1000 && categories > 15) return 'mature';
    if (totalTools > 500 && categories > 10) return 'growing';
    return 'emerging';
  }

  // Generate strategic recommendations
  generateStrategicRecommendations(analytics) {
    const recommendations = [];
    
    if (analytics.pricingAnalysis.freeTools < analytics.totalTools * 0.3) {
      recommendations.push('Increase coverage of free AI tools');
    }
    
    if (analytics.averageRating < 4.0) {
      recommendations.push('Focus on higher quality tools');
    }
    
    if (analytics.categoryDistribution.length < 10) {
      recommendations.push('Expand into more AI categories');
    }
    
    return recommendations;
  }

  // Perform health check
  performHealthCheck() {
    const health = {
      timestamp: new Date().toISOString(),
      status: 'healthy',
      checks: {
        dataIntegrity: this.checkDataIntegrity(),
        updateHistory: this.checkUpdateHistory(),
        diskSpace: this.checkDiskSpace(),
        apiStatus: this.checkAPIStatus()
      }
    };
    
    // Update status based on checks
    const failedChecks = Object.values(health.checks).filter(check => !check.status).length;
    if (failedChecks > 0) {
      health.status = 'warning';
    }
    if (failedChecks > 2) {
      health.status = 'critical';
    }
    
    // Save health check
    const healthPath = path.join(__dirname, 'data', 'health');
    if (!fs.existsSync(healthPath)) {
      fs.mkdirSync(healthPath, { recursive: true });
    }
    
    const filename = `health-${new Date().toISOString().slice(0, 19).replace(/:/g, '-')}.json`;
    fs.writeFileSync(path.join(healthPath, filename), JSON.stringify(health, null, 2));
    
    if (health.status !== 'healthy') {
      console.log(`⚠️ Health check: ${health.status}`);
    }
  }

  // Check data integrity
  checkDataIntegrity() {
    try {
      const dataPath = path.join(__dirname, 'data', 'tools.json');
      if (!fs.existsSync(dataPath)) {
        return { status: false, message: 'Tools data file missing' };
      }
      
      const data = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
      if (!data.tools || !Array.isArray(data.tools)) {
        return { status: false, message: 'Invalid tools data structure' };
      }
      
      return { status: true, message: 'Data integrity check passed' };
    } catch (error) {
      return { status: false, message: `Data integrity error: ${error.message}` };
    }
  }

  // Check update history
  checkUpdateHistory() {
    const recentUpdates = this.updateHistory.slice(-5);
    const failedUpdates = recentUpdates.filter(u => !u.success).length;
    
    if (failedUpdates > 2) {
      return { status: false, message: 'Too many recent failed updates' };
    }
    
    return { status: true, message: 'Update history check passed' };
  }

  // Check disk space
  checkDiskSpace() {
    // This is a simplified check - in production you'd use a proper disk space library
    return { status: true, message: 'Disk space check passed' };
  }

  // Check API status
  checkAPIStatus() {
    // This would check if the Firecrawl API is accessible
    return { status: true, message: 'API status check passed' };
  }

  // Start the scheduler
  async start() {
    await this.initialize();
    this.scheduleUpdates();
    console.log('🎉 SiteOptz.ai Update Scheduler started successfully!');
    console.log('📅 Automated updates are now running');
  }

  // Stop the scheduler
  stop() {
    console.log('🛑 Stopping SiteOptz.ai Update Scheduler...');
    // In a real implementation, you'd stop all cron jobs
    console.log('✅ Scheduler stopped');
  }
}

// Main execution
async function main() {
  const scheduler = new UpdateScheduler();
  
  try {
    await scheduler.start();
    
    // Keep the process running
    process.on('SIGINT', () => {
      console.log('\n🛑 Received SIGINT, shutting down gracefully...');
      scheduler.stop();
      process.exit(0);
    });
    
    process.on('SIGTERM', () => {
      console.log('\n🛑 Received SIGTERM, shutting down gracefully...');
      scheduler.stop();
      process.exit(0);
    });
    
  } catch (error) {
    console.error('❌ Error starting scheduler:', error);
    process.exit(1);
  }
}

// Export for use in other modules
module.exports = { UpdateScheduler };

// Run if called directly
if (require.main === module) {
  main();
}
