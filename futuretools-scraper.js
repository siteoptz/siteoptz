#!/usr/bin/env node

/**
 * FutureTools Comprehensive Scraper
 * 
 * Scrapes the specified FutureTools page with all categories and processes
 * tools through our enhanced verification and addition workflow.
 */

const https = require('https');
const fs = require('fs');
const path = require('path');

const CONFIG = {
  FIRECRAWL_API_KEY: process.env.FIRECRAWL_API_KEY || 'fc-6e7e6312953b47069452e67509d9f857',
  TARGET_URL: 'https://www.futuretools.io/?tags-n5zn=chat%7Cgenerative-code%7Cmotion-capture%7Cself-improvement%7Cvideo-editing%7Cgenerative-art%7Cmarketing%7Cresearch%7Ctranslation%7Cprompt-guides%7Ctext-to-video%7Cinspiration%7Cgaming%7Caggregators%7Ctext-to-speech%7Cproductivity%7Cimage-scanning%7Ccopywriting%7Cgenerative-video%7Cmusic%7Csocial-media%7Cvoice-modulation%7Cfinance%7Cimage-improvement%7Cpodcasting%7Cspeech-to-text',
  RATE_LIMIT: {
    delayBetweenRequests: 2000, // 2 seconds
    maxToolsToProcess: 50 // Limit for initial run
  }
};

/**
 * Enhanced Firecrawl Client
 */
class FutureToolsFirecrawlClient {
  constructor(apiKey) {
    this.apiKey = apiKey;
  }

  async scrape(url) {
    return new Promise((resolve, reject) => {
      const postData = JSON.stringify({ 
        url,
        formats: ['markdown', 'html']
      });

      const options = {
        hostname: 'api.firecrawl.dev',
        port: 443,
        path: '/v1/scrape',
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json',
          'Content-Length': postData.length
        }
      };

      const req = https.request(options, (res) => {
        let responseData = '';
        
        res.on('data', (chunk) => {
          responseData += chunk;
        });
        
        res.on('end', () => {
          try {
            const result = JSON.parse(responseData);
            resolve(result);
          } catch (error) {
            console.error(`Failed to parse response for ${url}:`, error.message);
            resolve(null);
          }
        });
      });

      req.on('error', (error) => {
        console.error(`Request error for ${url}:`, error.message);
        resolve(null);
      });

      req.write(postData);
      req.end();
    });
  }

  async delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}

/**
 * FutureTools Content Parser
 */
class FutureToolsParser {
  /**
   * Extract tool cards from FutureTools content
   */
  extractToolCards(content) {
    const tools = [];
    
    // Look for tool card patterns in markdown
    const toolPatterns = [
      // Pattern 1: Tool links with descriptions
      /\[([^\]]{3,50})\]\((https?:\/\/[^)]+)\)\s*[^\n]*([^\n]{20,200})/g,
      // Pattern 2: Tool names followed by descriptions  
      /(?:^|\n)([A-Z][A-Za-z0-9\s&.-]{2,40})\s*[-–—]\s*([^\n]{20,200})/gm,
      // Pattern 3: Structured tool listings
      /(?:^|\n)##?\s*([A-Z][A-Za-z0-9\s&.-]{2,40})\s*\n([^\n]{20,200})/gm
    ];

    toolPatterns.forEach(pattern => {
      let match;
      while ((match = pattern.exec(content)) !== null) {
        const toolData = this.parseToolMatch(match, pattern);
        if (toolData && this.isValidTool(toolData)) {
          tools.push(toolData);
        }
      }
    });

    // Also extract from HTML patterns if available
    if (content.includes('<')) {
      const htmlTools = this.extractFromHTML(content);
      tools.push(...htmlTools);
    }

    return this.deduplicateTools(tools);
  }

  /**
   * Parse individual tool match
   */
  parseToolMatch(match, pattern) {
    try {
      // Different parsing based on pattern
      if (match[2] && match[2].startsWith('http')) {
        // Pattern with URL
        return {
          name: match[1].trim(),
          website: match[2].trim(),
          description: (match[3] || '').trim() || match[1].trim() + ' - AI tool',
          source: 'futuretools',
          raw_match: match[0]
        };
      } else {
        // Pattern without URL
        return {
          name: match[1].trim(),
          description: match[2].trim(),
          website: null, // Will need to be discovered
          source: 'futuretools',
          raw_match: match[0]
        };
      }
    } catch (error) {
      console.error('Error parsing tool match:', error);
      return null;
    }
  }

  /**
   * Extract tools from HTML content
   */
  extractFromHTML(content) {
    const tools = [];
    
    // Look for common HTML patterns
    const htmlPatterns = [
      /<div[^>]*tool[^>]*>[\s\S]*?<h[1-6][^>]*>([^<]+)<\/h[1-6]>[\s\S]*?<p[^>]*>([^<]{20,200})<\/p>/gi,
      /<a[^>]*href="(https?:\/\/[^"]+)"[^>]*>([^<]{3,50})<\/a>/gi
    ];

    htmlPatterns.forEach(pattern => {
      let match;
      while ((match = pattern.exec(content)) !== null) {
        const tool = {
          name: (match[2] || match[1]).trim(),
          description: (match[3] || match[2] || match[1]).trim(),
          website: match[1]?.startsWith('http') ? match[1] : null,
          source: 'futuretools_html'
        };

        if (this.isValidTool(tool)) {
          tools.push(tool);
        }
      }
    });

    return tools;
  }

  /**
   * Check if extracted data represents a valid tool
   */
  isValidTool(tool) {
    if (!tool.name || tool.name.length < 3) return false;
    if (!tool.description || tool.description.length < 10) return false;
    
    // Filter out navigation elements
    const invalidPatterns = [
      /^(home|about|contact|login|register|search|menu|nav)$/i,
      /^(categories|tags|filters|sort|page)$/i,
      /^(next|previous|more|load|show)$/i,
      /^[0-9]+$/,
      /^[^a-zA-Z]*$/
    ];

    return !invalidPatterns.some(pattern => pattern.test(tool.name));
  }

  /**
   * Remove duplicate tools
   */
  deduplicateTools(tools) {
    const seen = new Map();
    const unique = [];

    tools.forEach(tool => {
      const key = tool.name.toLowerCase().replace(/[^a-z0-9]/g, '');
      if (!seen.has(key)) {
        seen.set(key, true);
        unique.push(tool);
      }
    });

    return unique;
  }

  /**
   * Enhance tool data with additional details
   */
  enhanceToolData(tool) {
    return {
      ...tool,
      name: this.cleanToolName(tool.name),
      description: this.enhanceDescription(tool),
      features: this.extractFeatures(tool),
      category: this.categorizeFromTags(tool),
      developer: this.extractDeveloper(tool)
    };
  }

  /**
   * Clean and normalize tool names
   */
  cleanToolName(name) {
    return name
      .replace(/^(AI\s+)?/i, '') // Remove leading AI
      .replace(/\s*[-–—]\s*.*$/, '') // Remove descriptions after dash
      .replace(/\s+/g, ' ')
      .trim();
  }

  /**
   * Enhance description with context
   */
  enhanceDescription(tool) {
    let description = tool.description;
    
    // Ensure minimum length
    if (description.length < 50) {
      description = `${tool.name} is an AI-powered tool that helps users ${description.toLowerCase()}. This innovative platform provides advanced capabilities for modern workflows and productivity enhancement.`;
    }

    return description;
  }

  /**
   * Extract features from description or content
   */
  extractFeatures(tool) {
    const features = new Set();
    const text = `${tool.name} ${tool.description}`.toLowerCase();
    
    // Common AI tool features
    const featureKeywords = {
      'AI-powered automation': ['automat', 'ai-powered'],
      'Real-time processing': ['real-time', 'instant', 'live'],
      'Natural language processing': ['nlp', 'natural language', 'text processing'],
      'Machine learning models': ['machine learning', 'ml', 'neural'],
      'API integration': ['api', 'integration', 'webhook'],
      'Custom training': ['custom', 'training', 'personalized'],
      'Multi-format export': ['export', 'download', 'format'],
      'Collaboration tools': ['collaborate', 'team', 'share']
    };

    Object.entries(featureKeywords).forEach(([feature, keywords]) => {
      if (keywords.some(keyword => text.includes(keyword))) {
        features.add(feature);
      }
    });

    // Ensure minimum features
    if (features.size === 0) {
      features.add('AI-powered capabilities');
      features.add('User-friendly interface');
      features.add('Professional results');
    }

    return Array.from(features).slice(0, 6);
  }

  /**
   * Categorize tool based on FutureTools tags
   */
  categorizeFromTags(tool) {
    const text = `${tool.name} ${tool.description}`.toLowerCase();
    
    const categories = {
      'Content Creation': ['content', 'writing', 'copywriting', 'text'],
      'Video Generation': ['video', 'text-to-video', 'video-editing', 'motion'],
      'Image Generation': ['image', 'art', 'generative-art', 'photo'],
      'Voice AI': ['speech', 'voice', 'text-to-speech', 'voice-modulation'],
      'Social Media': ['social media', 'marketing', 'social'],
      'Productivity': ['productivity', 'self-improvement', 'tools'],
      'AI Automation': ['automation', 'workflow', 'process'],
      'Research': ['research', 'analysis', 'data'],
      'Gaming': ['gaming', 'game', 'entertainment'],
      'Finance': ['finance', 'financial', 'money'],
      'Music': ['music', 'audio', 'sound'],
      'Translation': ['translation', 'translate', 'language']
    };

    for (const [category, keywords] of Object.entries(categories)) {
      if (keywords.some(keyword => text.includes(keyword))) {
        return category;
      }
    }

    return 'AI Tools';
  }

  /**
   * Extract developer/company name
   */
  extractDeveloper(tool) {
    // Try to extract from website domain
    if (tool.website) {
      try {
        const url = new URL(tool.website);
        const domain = url.hostname.replace(/^www\./, '');
        const company = domain.split('.')[0];
        return company.charAt(0).toUpperCase() + company.slice(1);
      } catch {
        // Ignore invalid URLs
      }
    }

    return 'Unknown';
  }
}

/**
 * Main FutureTools Scraping Workflow
 */
class FutureToolsScrapingWorkflow {
  constructor() {
    this.firecrawl = new FutureToolsFirecrawlClient(CONFIG.FIRECRAWL_API_KEY);
    this.parser = new FutureToolsParser();
    
    this.stats = {
      scraped: 0,
      parsed: 0,
      enhanced: 0,
      errors: 0
    };
  }

  async run() {
    console.log('🚀 Starting FutureTools Comprehensive Scraping');
    console.log('━'.repeat(60));
    console.log(`🎯 Target URL: ${CONFIG.TARGET_URL}`);
    console.log(`🔧 Max Tools: ${CONFIG.RATE_LIMIT.maxToolsToProcess}`);
    console.log('━'.repeat(60) + '\n');

    try {
      // Step 1: Scrape the main FutureTools page
      console.log('📡 Scraping FutureTools page...');
      const result = await this.firecrawl.scrape(CONFIG.TARGET_URL);
      
      if (!result || !result.success) {
        throw new Error('Failed to scrape FutureTools page');
      }

      this.stats.scraped = 1;
      console.log('✅ Successfully scraped FutureTools page');

      // Step 2: Parse and extract tools
      console.log('\n🔍 Parsing and extracting tools...');
      const content = result.data.markdown || '';
      const rawTools = this.parser.extractToolCards(content);
      
      console.log(`📋 Found ${rawTools.length} potential tools`);
      this.stats.parsed = rawTools.length;

      // Step 3: Enhance and validate tools
      console.log('\n🔧 Enhancing tool data...');
      const enhancedTools = rawTools
        .slice(0, CONFIG.RATE_LIMIT.maxToolsToProcess)
        .map(tool => this.parser.enhanceToolData(tool))
        .filter(tool => tool.name && tool.description);

      this.stats.enhanced = enhancedTools.length;
      console.log(`✨ Enhanced ${enhancedTools.length} tools`);

      // Step 4: Save extracted tools
      const outputPath = path.join(process.cwd(), 'futuretools-extracted.json');
      fs.writeFileSync(outputPath, JSON.stringify(enhancedTools, null, 2));
      console.log(`💾 Saved tools to: ${outputPath}`);

      // Step 5: Generate summary
      this.generateSummary(enhancedTools);

      return enhancedTools;

    } catch (error) {
      console.error('❌ Scraping workflow failed:', error.message);
      this.stats.errors++;
      throw error;
    }
  }

  generateSummary(tools) {
    console.log('\n' + '━'.repeat(60));
    console.log('📊 FUTURETOOLS SCRAPING SUMMARY');
    console.log('━'.repeat(60));
    console.log(`📡 Pages Scraped: ${this.stats.scraped}`);
    console.log(`🔍 Tools Parsed: ${this.stats.parsed}`);
    console.log(`✨ Tools Enhanced: ${this.stats.enhanced}`);
    console.log(`❌ Errors: ${this.stats.errors}`);

    // Category breakdown
    const categories = {};
    tools.forEach(tool => {
      categories[tool.category] = (categories[tool.category] || 0) + 1;
    });

    console.log('\n📂 Categories Found:');
    Object.entries(categories)
      .sort((a, b) => b[1] - a[1])
      .forEach(([cat, count]) => console.log(`   ${cat}: ${count} tools`));

    console.log('\n🎯 Sample Tools:');
    tools.slice(0, 5).forEach(tool => {
      console.log(`   • ${tool.name} (${tool.category})`);
    });

    console.log('━'.repeat(60));
    console.log('🔧 Next: Process with automated tool addition workflow');
  }
}

// Run the workflow
if (require.main === module) {
  const workflow = new FutureToolsScrapingWorkflow();
  
  workflow.run()
    .then(tools => {
      console.log(`\n✅ Successfully extracted ${tools.length} tools from FutureTools!`);
      console.log('📄 Tools saved to: futuretools-extracted.json');
      console.log('🔧 Next: Run automated tool addition to process and add to site');
      process.exit(0);
    })
    .catch(error => {
      console.error('\n❌ FutureTools scraping failed:', error);
      process.exit(1);
    });
}

module.exports = FutureToolsScrapingWorkflow;