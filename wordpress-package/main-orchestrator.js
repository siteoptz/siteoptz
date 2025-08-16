const { FirecrawlScraper } = require('./firecrawl-scraper');
const { SiteOptzConverter } = require('./siteoptz-converter');
const { UpdateScheduler } = require('./update-scheduler');

class SiteOptzOrchestrator {
  constructor() {
    this.scraper = null;
    this.converter = null;
    this.scheduler = null;
    this.isRunning = false;
  }

  // Initialize all components
  async initialize() {
    console.log('🚀 Initializing SiteOptz.ai AI Tools Orchestrator...');
    
    const apiKey = process.env.FIRECRAWL_API_KEY || 'fc-6e7e6312953b47069452e67509d9f857';
    
    if (!apiKey) {
      throw new Error('FIRECRAWL_API_KEY environment variable is required');
    }
    
    // Initialize components
    this.scraper = new FirecrawlScraper(apiKey);
    this.converter = new SiteOptzConverter();
    this.scheduler = new UpdateScheduler();
    
    console.log('✅ All components initialized successfully');
  }

  // Run complete scraping and conversion pipeline
  async runCompletePipeline() {
    if (this.isRunning) {
      console.log('⚠️ Pipeline already running, skipping...');
      return;
    }
    
    this.isRunning = true;
    const startTime = new Date();
    
    try {
      console.log('🔄 Starting complete SiteOptz.ai pipeline...');
      
      // Step 1: Scrape AI Tools Directory
      console.log('\n📊 Step 1: Scraping AI Tools Directory...');
      await this.scraper.scrapeAIToolsDirectory();
      
      // Step 2: Process and clean data
      console.log('\n🧹 Step 2: Processing and cleaning data...');
      this.scraper.processAndCleanData();
      
      // Step 3: Export raw data
      console.log('\n📁 Step 3: Exporting raw data...');
      this.scraper.exportData();
      
      // Step 4: Generate insights
      console.log('\n📈 Step 4: Generating insights...');
      const insights = this.scraper.generateInsights();
      
      // Step 5: Convert to SiteOptz.ai format
      console.log('\n🔄 Step 5: Converting to SiteOptz.ai format...');
      const scrapedData = JSON.parse(require('fs').readFileSync(require('path').join(__dirname, 'data', 'tools.json'), 'utf8'));
      this.converter.convertToSiteOptzFormat(scrapedData);
      
      // Step 6: Export SiteOptz.ai data
      console.log('\n📁 Step 6: Exporting SiteOptz.ai data...');
      this.converter.exportSiteOptzData();
      
      // Step 7: Generate static pages
      console.log('\n📄 Step 7: Generating static pages...');
      const pages = this.converter.generateStaticPages();
      
      const endTime = new Date();
      const duration = endTime - startTime;
      
      console.log('\n🎉 Complete pipeline finished successfully!');
      console.log(`⏱️ Total duration: ${duration / 1000} seconds`);
      console.log(`📊 Tools processed: ${insights.totalTools}`);
      console.log(`⭐ Average rating: ${insights.averageRating.toFixed(2)}`);
      console.log(`💰 Free tools: ${insights.freeToolsCount}`);
      console.log(`💳 Paid tools: ${insights.paidToolsCount}`);
      
      return {
        success: true,
        duration,
        insights,
        pages
      };
      
    } catch (error) {
      console.error('❌ Error in complete pipeline:', error);
      return {
        success: false,
        error: error.message,
        duration: new Date() - startTime
      };
    } finally {
      this.isRunning = false;
    }
  }

  // Run scraping only
  async runScrapingOnly() {
    console.log('🔄 Running scraping only...');
    
    try {
      await this.scraper.scrapeAIToolsDirectory();
      this.scraper.processAndCleanData();
      this.scraper.exportData();
      
      const insights = this.scraper.generateInsights();
      console.log('✅ Scraping completed successfully!');
      
      return {
        success: true,
        insights
      };
      
    } catch (error) {
      console.error('❌ Error in scraping:', error);
      return {
        success: false,
        error: error.message
      };
    }
  }

  // Run conversion only
  async runConversionOnly() {
    console.log('🔄 Running conversion only...');
    
    try {
      const scrapedData = JSON.parse(require('fs').readFileSync(require('path').join(__dirname, 'data', 'tools.json'), 'utf8'));
      this.converter.convertToSiteOptzFormat(scrapedData);
      this.converter.exportSiteOptzData();
      
      console.log('✅ Conversion completed successfully!');
      
      return {
        success: true
      };
      
    } catch (error) {
      console.error('❌ Error in conversion:', error);
      return {
        success: false,
        error: error.message
      };
    }
  }

  // Start automated scheduler
  async startScheduler() {
    console.log('🔄 Starting automated scheduler...');
    
    try {
      await this.scheduler.start();
      
      return {
        success: true,
        message: 'Scheduler started successfully'
      };
      
    } catch (error) {
      console.error('❌ Error starting scheduler:', error);
      return {
        success: false,
        error: error.message
      };
    }
  }

  // Stop scheduler
  async stopScheduler() {
    console.log('🛑 Stopping scheduler...');
    
    try {
      this.scheduler.stop();
      
      return {
        success: true,
        message: 'Scheduler stopped successfully'
      };
      
    } catch (error) {
      console.error('❌ Error stopping scheduler:', error);
      return {
        success: false,
        error: error.message
      };
    }
  }

  // Generate analytics report
  async generateAnalyticsReport() {
    console.log('📊 Generating analytics report...');
    
    try {
      const analytics = await this.scheduler.generateComprehensiveAnalytics();
      
      return {
        success: true,
        analytics
      };
      
    } catch (error) {
      console.error('❌ Error generating analytics:', error);
      return {
        success: false,
        error: error.message
      };
    }
  }

  // Get system status
  getSystemStatus() {
    return {
      isRunning: this.isRunning,
      components: {
        scraper: !!this.scraper,
        converter: !!this.converter,
        scheduler: !!this.scheduler
      },
      lastUpdate: this.scheduler?.lastUpdate,
      updateHistory: this.scheduler?.updateHistory?.slice(-5) || []
    };
  }

  // Validate data integrity
  validateDataIntegrity() {
    try {
      const fs = require('fs');
      const path = require('path');
      
      const checks = {
        toolsData: false,
        siteoptzData: false,
        categories: false,
        comparisons: false,
        sitemap: false
      };
      
      // Check tools.json
      const toolsPath = path.join(__dirname, 'data', 'tools.json');
      if (fs.existsSync(toolsPath)) {
        const toolsData = JSON.parse(fs.readFileSync(toolsPath, 'utf8'));
        checks.toolsData = toolsData.tools && Array.isArray(toolsData.tools) && toolsData.tools.length > 0;
      }
      
      // Check SiteOptz data
      const siteoptzPath = path.join(__dirname, 'data', 'siteoptz', 'tools.json');
      if (fs.existsSync(siteoptzPath)) {
        const siteoptzData = JSON.parse(fs.readFileSync(siteoptzPath, 'utf8'));
        checks.siteoptzData = siteoptzData.tools && Array.isArray(siteoptzData.tools) && siteoptzData.tools.length > 0;
      }
      
      // Check categories
      const categoriesPath = path.join(__dirname, 'data', 'siteoptz');
      if (fs.existsSync(categoriesPath)) {
        const files = fs.readdirSync(categoriesPath);
        checks.categories = files.some(f => f.endsWith('.json') && f !== 'tools.json' && f !== 'comparisons.json');
      }
      
      // Check comparisons
      const comparisonsPath = path.join(__dirname, 'data', 'siteoptz', 'comparisons.json');
      if (fs.existsSync(comparisonsPath)) {
        const comparisonsData = JSON.parse(fs.readFileSync(comparisonsPath, 'utf8'));
        checks.comparisons = comparisonsData.comparisons && Array.isArray(comparisonsData.comparisons);
      }
      
      // Check sitemap
      const sitemapPath = path.join(__dirname, 'data', 'siteoptz', 'sitemap.json');
      if (fs.existsSync(sitemapPath)) {
        const sitemapData = JSON.parse(fs.readFileSync(sitemapPath, 'utf8'));
        checks.sitemap = sitemapData.urls && Array.isArray(sitemapData.urls);
      }
      
      const allValid = Object.values(checks).every(check => check);
      
      return {
        valid: allValid,
        checks,
        message: allValid ? 'All data integrity checks passed' : 'Some data integrity checks failed'
      };
      
    } catch (error) {
      return {
        valid: false,
        error: error.message,
        message: 'Data integrity validation failed'
      };
    }
  }
}

// Main execution function
async function main() {
  const args = process.argv.slice(2);
  const command = args[0] || 'help';
  
  const orchestrator = new SiteOptzOrchestrator();
  
  try {
    await orchestrator.initialize();
    
    switch (command) {
      case 'scrape':
        console.log('🎯 Running scraping only...');
        await orchestrator.runScrapingOnly();
        break;
        
      case 'convert':
        console.log('🎯 Running conversion only...');
        await orchestrator.runConversionOnly();
        break;
        
      case 'pipeline':
        console.log('🎯 Running complete pipeline...');
        await orchestrator.runCompletePipeline();
        break;
        
      case 'scheduler':
        console.log('🎯 Starting automated scheduler...');
        await orchestrator.startScheduler();
        break;
        
      case 'stop':
        console.log('🎯 Stopping scheduler...');
        await orchestrator.stopScheduler();
        break;
        
      case 'analytics':
        console.log('🎯 Generating analytics report...');
        await orchestrator.generateAnalyticsReport();
        break;
        
      case 'status':
        console.log('🎯 Getting system status...');
        const status = orchestrator.getSystemStatus();
        console.log('System Status:', JSON.stringify(status, null, 2));
        break;
        
      case 'validate':
        console.log('🎯 Validating data integrity...');
        const validation = orchestrator.validateDataIntegrity();
        console.log('Data Integrity:', JSON.stringify(validation, null, 2));
        break;
        
      case 'help':
      default:
        console.log(`
🚀 SiteOptz.ai AI Tools Orchestrator

Usage: node main-orchestrator.js [command]

Commands:
  scrape     - Run scraping only (scrape aitoolsdirectory.com)
  convert    - Run conversion only (convert to SiteOptz.ai format)
  pipeline   - Run complete pipeline (scrape + convert + export)
  scheduler  - Start automated scheduler (daily/weekly updates)
  stop       - Stop automated scheduler
  analytics  - Generate analytics report
  status     - Get system status
  validate   - Validate data integrity
  help       - Show this help message

Environment Variables:
  FIRECRAWL_API_KEY - Your Firecrawl API key

Examples:
  node main-orchestrator.js pipeline
  node main-orchestrator.js scheduler
  node main-orchestrator.js status
        `);
        break;
    }
    
  } catch (error) {
    console.error('❌ Error in main execution:', error);
    process.exit(1);
  }
}

// Export for use in other modules
module.exports = { SiteOptzOrchestrator };

// Run if called directly
if (require.main === module) {
  main();
}
