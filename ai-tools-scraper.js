#!/usr/bin/env node

/**
 * AI Tools Scraper - Following PRD Requirements
 * 
 * Complete workflow for discovering, crawling, and integrating new AI tools
 * using Firecrawl with duplicate detection and data validation.
 */

const https = require('https');
const fs = require('fs');
const path = require('path');

// Configuration from PRD
const CONFIG = {
  FIRECRAWL_API_KEY: process.env.FIRECRAWL_API_KEY || 'fc-6e7e6312953b47069452e67509d9f857',
  
  // Discovery sources from PRD
  DISCOVERY_SOURCES: [
    'https://aixploria.com/en/',
    'https://opentools.ai/',
    'https://dang.ai/',
    'https://futuretools.io/'
  ],
  
  // Rate limiting from PRD
  RATE_LIMIT: {
    delayBetweenRequests: 2000, // 2 seconds
    maxConcurrentRequests: 3,
    maxRequestsPerSource: 20
  },
  
  // Data validation from PRD
  VALIDATION: {
    minNameLength: 2,
    minDescriptionLength: 10,
    requiredFields: ['name', 'description', 'website']
  }
};

/**
 * Firecrawl API Client
 */
class FirecrawlClient {
  constructor(apiKey) {
    this.apiKey = apiKey;
  }

  async scrape(url) {
    return new Promise((resolve, reject) => {
      const postData = JSON.stringify({ 
        url,
        formats: ['markdown']
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
 * Data Extractor - Following PRD extraction patterns
 */
class DataExtractor {
  /**
   * Extract tool name from content - PRD pattern
   */
  extractToolName(content) {
    // Pattern from PRD: "ToolName - AI Tool" or "ToolName: AI Platform"
    const patterns = [
      /^([A-Z][A-Za-z0-9\s&]+)(?:\s*[-–—]\s*|:?\s*)(?:AI|Tool|Software|Platform)/im,
      /^#\s*([A-Z][A-Za-z0-9\s&]+)\s*$/m,
      /<h1[^>]*>([^<]+)<\/h1>/i
    ];

    for (const pattern of patterns) {
      const match = content.match(pattern);
      if (match && match[1]) {
        const name = match[1].trim();
        // Clean up common suffixes
        return name.replace(/ Logo$| Icon$/i, '').trim();
      }
    }
    return null;
  }

  /**
   * Extract pricing from content - PRD pattern
   */
  extractPricing(content) {
    // Pattern from PRD: "$X" or "$X/month"
    const pricingData = [];
    const pricingMatch = content.match(/\$(\d+(?:\.\d+)?)\s*(?:\/\s*(?:month|mo)|per month)?/gi);
    
    if (pricingMatch) {
      pricingMatch.forEach(price => {
        const amount = price.match(/\$(\d+(?:\.\d+)?)/);
        if (amount) {
          pricingData.push({
            price: parseFloat(amount[1]),
            text: price
          });
        }
      });
    }

    // Look for free tier
    if (content.match(/\bfree\s+(plan|tier|version|trial)\b/i)) {
      pricingData.push({ price: 0, text: 'Free' });
    }

    return pricingData;
  }

  /**
   * Extract features from content - PRD pattern
   */
  extractFeatures(content) {
    const features = [];
    // Pattern from PRD: "Features:" or "Capabilities:"
    const featureMatches = content.match(/(?:features?|capabilities?|functions?)[:\s]+([^.\n]+)/gi);
    
    if (featureMatches) {
      featureMatches.forEach(match => {
        const feature = match.replace(/^(?:features?|capabilities?|functions?)[:\s]+/i, '').trim();
        if (feature.length > 5 && feature.length < 100) {
          features.push(feature);
        }
      });
    }

    // Also look for bullet points
    const bulletPoints = content.match(/[•*-]\s+([^•*\-\n]{10,100})/g);
    if (bulletPoints) {
      bulletPoints.forEach(point => {
        const feature = point.replace(/^[•*-]\s+/, '').trim();
        if (!features.includes(feature)) {
          features.push(feature);
        }
      });
    }

    return features.slice(0, 10); // Limit to 10 features
  }

  /**
   * Extract description from content
   */
  extractDescription(content) {
    // Look for meta description
    const metaMatch = content.match(/<meta\s+name="description"\s+content="([^"]+)"/i);
    if (metaMatch) return metaMatch[1];

    // Look for first paragraph after title
    const paragraphMatch = content.match(/^#{1,3}\s+[^\n]+\n+([^\n]{20,300})/m);
    if (paragraphMatch) return paragraphMatch[1].trim();

    // Look for any descriptive text
    const sentences = content.match(/[A-Z][^.!?]{20,200}[.!?]/g);
    if (sentences && sentences.length > 0) {
      return sentences[0];
    }

    return null;
  }

  /**
   * Extract tool website from content
   */
  extractWebsite(content, sourceUrl) {
    // Look for official website links
    const websitePatterns = [
      /(?:official\s+)?website[:\s]+<?([https?:\/\/[^\s>]+)>?/i,
      /visit\s+(?:us\s+)?at[:\s]+<?([https?:\/\/[^\s>]+)>?/i,
      /learn\s+more[:\s]+<?([https?:\/\/[^\s>]+)>?/i
    ];

    for (const pattern of websitePatterns) {
      const match = content.match(pattern);
      if (match && match[1]) {
        return match[1];
      }
    }

    // Extract from first external link
    const linkMatch = content.match(/https?:\/\/(?!(?:www\.)?(?:aixploria|opentools|dang|futuretools))[a-z0-9.-]+\.[a-z]{2,}/i);
    if (linkMatch) {
      return linkMatch[0];
    }

    return sourceUrl;
  }
}

/**
 * Duplicate Detector - Following PRD methods
 */
class DuplicateDetector {
  constructor() {
    this.existingTools = this.loadExistingTools();
  }

  loadExistingTools() {
    try {
      const dataPath = path.join(process.cwd(), 'public/data/aiToolsData.json');
      if (fs.existsSync(dataPath)) {
        return JSON.parse(fs.readFileSync(dataPath, 'utf8'));
      }
    } catch (error) {
      console.error('Error loading existing tools:', error.message);
    }
    return [];
  }

  /**
   * Check for duplicates using PRD methods
   */
  isDuplicate(tool) {
    // 1. Exact ID matching
    if (this.existingTools.some(existing => existing.id === tool.id)) {
      return true;
    }

    // 2. Name similarity (Levenshtein distance)
    const toolNameLower = tool.name.toLowerCase();
    for (const existing of this.existingTools) {
      if (!existing.name) continue;
      const similarity = this.calculateSimilarity(toolNameLower, existing.name.toLowerCase());
      if (similarity > 0.8) { // 80% similarity threshold from PRD
        return true;
      }
    }

    // 3. Domain matching
    if (tool.website) {
      const toolDomain = this.extractDomain(tool.website);
      for (const existing of this.existingTools) {
        if (existing.website && this.extractDomain(existing.website) === toolDomain) {
          return true;
        }
      }
    }

    return false;
  }

  extractDomain(url) {
    try {
      const urlObj = new URL(url);
      return urlObj.hostname.replace(/^www\./, '');
    } catch {
      return null;
    }
  }

  calculateSimilarity(str1, str2) {
    const longer = str1.length > str2.length ? str1 : str2;
    const shorter = str1.length > str2.length ? str2 : str1;
    
    if (longer.length === 0) return 1.0;
    
    const distance = this.levenshteinDistance(longer, shorter);
    return (longer.length - distance) / longer.length;
  }

  levenshteinDistance(str1, str2) {
    const matrix = [];
    
    for (let i = 0; i <= str2.length; i++) {
      matrix[i] = [i];
    }
    
    for (let j = 0; j <= str1.length; j++) {
      matrix[0][j] = j;
    }
    
    for (let i = 1; i <= str2.length; i++) {
      for (let j = 1; j <= str1.length; j++) {
        if (str2.charAt(i - 1) === str1.charAt(j - 1)) {
          matrix[i][j] = matrix[i - 1][j - 1];
        } else {
          matrix[i][j] = Math.min(
            matrix[i - 1][j - 1] + 1,
            matrix[i][j - 1] + 1,
            matrix[i - 1][j] + 1
          );
        }
      }
    }
    
    return matrix[str2.length][str1.length];
  }
}

/**
 * Data Validator - Following PRD validation requirements
 */
class DataValidator {
  validate(tool) {
    // Check required fields from PRD
    for (const field of CONFIG.VALIDATION.requiredFields) {
      if (!tool[field] || tool[field].length < 1) {
        return false;
      }
    }

    // Check minimum lengths
    if (tool.name.length < CONFIG.VALIDATION.minNameLength) {
      return false;
    }

    if (tool.description.length < CONFIG.VALIDATION.minDescriptionLength) {
      return false;
    }

    // Validate URL format
    if (tool.website) {
      try {
        new URL(tool.website);
      } catch {
        return false;
      }
    }

    return true;
  }
}

/**
 * Database Manager - Transform to SiteOptz format and save
 */
class DatabaseManager {
  transformToSiteOptzFormat(tool) {
    const slug = tool.name.toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');

    return {
      id: slug,
      name: tool.name,
      slug: slug,
      logo: `/images/tools/${slug}-logo.svg`,
      description: tool.description,
      website: tool.website,
      category: tool.category || 'AI Tools',
      features: tool.features || [],
      pricing: this.transformPricing(tool.pricing),
      pros: tool.pros || ['To be evaluated'],
      cons: tool.cons || ['To be evaluated'],
      rating: tool.rating || 4.0,
      benchmarks: {
        speed: 7,
        accuracy: 7,
        integration: 7,
        ease_of_use: 7,
        value: 7
      },
      meta: {
        title: `${tool.name} Review, Pricing, Features & Alternatives [2025]`,
        description: tool.description
      },
      overview: {
        developer: tool.developer || 'Unknown',
        release_year: tool.release_year || 2024,
        description: tool.description,
        category: tool.category || 'AI Tools'
      }
    };
  }

  transformPricing(pricingData) {
    if (!pricingData || pricingData.length === 0) {
      return [{
        plan: 'Check website',
        price_per_month: 0,
        features: ['Visit website for pricing details']
      }];
    }

    const plans = [];
    
    // Find free plan
    const freePlan = pricingData.find(p => p.price === 0);
    if (freePlan) {
      plans.push({
        plan: 'Free',
        price_per_month: 0,
        features: ['Basic features']
      });
    }

    // Find paid plans
    const paidPlans = pricingData.filter(p => p.price > 0).sort((a, b) => a.price - b.price);
    
    if (paidPlans.length > 0) {
      plans.push({
        plan: 'Pro',
        price_per_month: paidPlans[0].price,
        features: ['Full features']
      });
    }

    if (paidPlans.length > 1) {
      plans.push({
        plan: 'Enterprise',
        price_per_month: paidPlans[paidPlans.length - 1].price,
        features: ['Enterprise features']
      });
    }

    return plans.length > 0 ? plans : [{
      plan: 'Check website',
      price_per_month: 0,
      features: ['Visit website for pricing details']
    }];
  }

  async saveTools(tools) {
    const dataPath = path.join(process.cwd(), 'public/data/aiToolsData.json');
    
    try {
      let existingData = [];
      if (fs.existsSync(dataPath)) {
        existingData = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
      }

      // Add new tools
      const updatedData = [...existingData, ...tools];
      
      // Save backup
      const backupPath = dataPath.replace('.json', `-backup-${Date.now()}.json`);
      if (existingData.length > 0) {
        fs.writeFileSync(backupPath, JSON.stringify(existingData, null, 2));
      }

      // Save updated data
      fs.writeFileSync(dataPath, JSON.stringify(updatedData, null, 2));
      
      return true;
    } catch (error) {
      console.error('Error saving tools:', error.message);
      return false;
    }
  }
}

/**
 * Report Generator - Following PRD reporting requirements
 */
class ReportGenerator {
  generateReport(stats, tools) {
    const timestamp = new Date().toISOString();
    const reportDir = path.join(process.cwd(), 'discovery-reports');
    
    // Create reports directory if it doesn't exist
    if (!fs.existsSync(reportDir)) {
      fs.mkdirSync(reportDir, { recursive: true });
    }

    const report = {
      timestamp,
      stats: {
        discovered: stats.discovered,
        crawled: stats.crawled,
        validated: stats.validated,
        added: stats.added,
        duplicates: stats.duplicates,
        errors: stats.errors
      },
      summary: {
        successRate: `${((stats.validated / stats.discovered) * 100).toFixed(1)}%`,
        duplicateRate: `${((stats.duplicates / stats.discovered) * 100).toFixed(1)}%`,
        errorRate: `${((stats.errors / stats.discovered) * 100).toFixed(1)}%`
      },
      tools: tools.map(t => ({
        name: t.name,
        website: t.website,
        source: t.source
      }))
    };

    // Save individual report
    const reportPath = path.join(reportDir, `report-${Date.now()}.json`);
    fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));

    // Update summary
    const summaryPath = path.join(reportDir, 'summary.json');
    let summary = { reports: [] };
    
    if (fs.existsSync(summaryPath)) {
      summary = JSON.parse(fs.readFileSync(summaryPath, 'utf8'));
    }

    summary.reports.push({
      timestamp,
      file: path.basename(reportPath),
      stats: report.stats
    });

    fs.writeFileSync(summaryPath, JSON.stringify(summary, null, 2));

    return reportPath;
  }
}

/**
 * Main Workflow Orchestrator
 */
class AIToolsDiscoveryWorkflow {
  constructor() {
    this.firecrawl = new FirecrawlClient(CONFIG.FIRECRAWL_API_KEY);
    this.extractor = new DataExtractor();
    this.duplicateDetector = new DuplicateDetector();
    this.validator = new DataValidator();
    this.dbManager = new DatabaseManager();
    this.reportGenerator = new ReportGenerator();
    
    this.stats = {
      discovered: 0,
      crawled: 0,
      validated: 0,
      added: 0,
      duplicates: 0,
      errors: 0
    };
  }

  async run() {
    console.log('🚀 Starting AI Tools Discovery Workflow (PRD Compliant)\n');
    console.log('━'.repeat(60));
    console.log(`📡 Discovery Sources: ${CONFIG.DISCOVERY_SOURCES.length}`);
    console.log(`⏱️  Rate Limit: ${CONFIG.RATE_LIMIT.delayBetweenRequests}ms between requests`);
    console.log(`✅ Validation: ${CONFIG.VALIDATION.requiredFields.join(', ')}`);
    console.log('━'.repeat(60) + '\n');

    const allTools = [];

    // Step 1: Discovery Phase
    console.log('📡 Step 1: Discovery Phase\n');
    for (const source of CONFIG.DISCOVERY_SOURCES) {
      console.log(`🔍 Discovering from: ${source}`);
      
      try {
        const result = await this.firecrawl.scrape(source);
        
        if (result && result.success && result.data) {
          this.stats.discovered++;
          
          // Extract tool information
          const content = result.data.markdown || '';
          
          // Find tool links
          const toolLinks = this.extractToolLinks(content, source);
          console.log(`  ✓ Found ${toolLinks.length} potential tool pages`);
          
          // Step 2: Crawling Phase - crawl individual tool pages
          for (const toolLink of toolLinks.slice(0, CONFIG.RATE_LIMIT.maxRequestsPerSource)) {
            await this.firecrawl.delay(CONFIG.RATE_LIMIT.delayBetweenRequests);
            
            const toolData = await this.crawlToolPage(toolLink, source);
            if (toolData) {
              allTools.push(toolData);
            }
          }
        } else {
          this.stats.errors++;
          console.log(`  ✗ Failed to discover from ${source}`);
        }
        
        await this.firecrawl.delay(CONFIG.RATE_LIMIT.delayBetweenRequests);
      } catch (error) {
        this.stats.errors++;
        console.log(`  ✗ Error: ${error.message}`);
      }
    }

    // Step 3: Data Extraction Phase (already done during crawling)
    console.log(`\n📋 Step 3: Data Extraction Phase`);
    console.log(`  ✓ Extracted ${allTools.length} tools`);

    // Step 4: Validation Phase
    console.log(`\n✅ Step 4: Validation Phase`);
    const validTools = [];
    for (const tool of allTools) {
      if (this.validator.validate(tool)) {
        this.stats.validated++;
        validTools.push(tool);
      }
    }
    console.log(`  ✓ ${validTools.length} tools passed validation`);

    // Step 5: Duplicate Detection Phase
    console.log(`\n🔍 Step 5: Duplicate Detection Phase`);
    const uniqueTools = [];
    for (const tool of validTools) {
      if (!this.duplicateDetector.isDuplicate(tool)) {
        uniqueTools.push(tool);
      } else {
        this.stats.duplicates++;
      }
    }
    console.log(`  ✓ ${uniqueTools.length} unique tools`);
    console.log(`  ✓ ${this.stats.duplicates} duplicates filtered`);

    // Step 6: Save discovered tools for manual review (don't auto-add to database yet)
    console.log(`\n💾 Step 6: Saving Discovered Tools for Review`);
    const discoveredToolsPath = path.join(process.cwd(), 'discovered-tools.json');
    
    if (uniqueTools.length > 0) {
      fs.writeFileSync(discoveredToolsPath, JSON.stringify(uniqueTools, null, 2));
      console.log(`  ✓ Saved ${uniqueTools.length} discovered tools to: ${discoveredToolsPath}`);
    } else {
      console.log(`  ✓ No new tools discovered`);
    }

    // Step 7: Reporting Phase
    console.log(`\n📊 Step 7: Reporting Phase`);
    const reportPath = this.reportGenerator.generateReport(this.stats, uniqueTools);
    console.log(`  ✓ Report saved to: ${reportPath}`);

    // Final summary
    console.log('\n' + '━'.repeat(60));
    console.log('🎉 Discovery Complete!');
    console.log('━'.repeat(60));
    console.log(`🔍 Sources Processed: ${this.stats.discovered}`);
    console.log(`🌐 Tools Crawled: ${this.stats.crawled}`);
    console.log(`✅ Tools Validated: ${this.stats.validated}`);
    console.log(`🔄 Duplicates Filtered: ${this.stats.duplicates}`);
    console.log(`❌ Errors: ${this.stats.errors}`);
    console.log(`💎 Unique Tools Found: ${uniqueTools.length}`);
    console.log('━'.repeat(60));

    return uniqueTools;
  }

  extractToolLinks(content, sourceUrl) {
    const links = [];
    const linkPattern = /\[([^\]]+)\]\((https?:\/\/[^\)]+)\)/g;
    let match;
    
    while ((match = linkPattern.exec(content)) !== null) {
      const name = match[1].trim();
      const url = match[2].trim();
      
      // Filter for potential tool pages
      if (this.looksLikeToolPage(name, url, sourceUrl)) {
        links.push({ name, url });
      }
    }

    return links;
  }

  looksLikeToolPage(name, url, sourceUrl) {
    // Skip if it's an image
    if (url.match(/\.(png|jpg|jpeg|gif|svg|webp|ico)$/i)) {
      return false;
    }

    // Skip if name starts with image markdown
    if (name.startsWith('![')) {
      return false;
    }

    // Skip common navigation links
    const skipPatterns = [
      /^(home|about|contact|privacy|terms|blog|news|support|login|register)$/i,
      /^(facebook|twitter|linkedin|youtube|instagram|github)$/i
    ];

    for (const pattern of skipPatterns) {
      if (pattern.test(name)) {
        return false;
      }
    }

    // Skip if it's the same domain as source
    try {
      const sourceHost = new URL(sourceUrl).hostname;
      const linkHost = new URL(url).hostname;
      
      // Allow subdomain variations but skip main domain pages
      if (linkHost === sourceHost && url.includes('/en/')) {
        return true; // This might be a tool page on aixploria
      }
      
      if (linkHost === sourceHost) {
        return false;
      }
    } catch {
      return false;
    }

    return true;
  }

  async crawlToolPage(toolLink, source) {
    console.log(`  🌐 Crawling: ${toolLink.name}`);
    this.stats.crawled++;

    try {
      const result = await this.firecrawl.scrape(toolLink.url);
      
      if (result && result.success && result.data) {
        const content = result.data.markdown || '';
        
        // Extract tool information using PRD patterns
        const tool = {
          name: this.extractor.extractToolName(content) || toolLink.name,
          description: this.extractor.extractDescription(content) || `${toolLink.name} - AI tool`,
          website: this.extractor.extractWebsite(content, toolLink.url) || toolLink.url,
          features: this.extractor.extractFeatures(content),
          pricing: this.extractor.extractPricing(content),
          source: source,
          discovered_at: new Date().toISOString()
        };

        return tool;
      }
    } catch (error) {
      console.log(`    ✗ Error crawling ${toolLink.name}: ${error.message}`);
      this.stats.errors++;
    }

    return null;
  }
}

// Run the workflow
if (require.main === module) {
  const workflow = new AIToolsDiscoveryWorkflow();
  
  workflow.run()
    .then(tools => {
      console.log(`\n✨ Successfully discovered ${tools.length} new AI tools!`);
      console.log(`📄 Review the discovered tools in: discovered-tools.json`);
      console.log(`🔧 Next step: Use automated tool addition script to process them`);
      process.exit(0);
    })
    .catch(error => {
      console.error('\n❌ Workflow failed:', error);
      process.exit(1);
    });
}

module.exports = AIToolsDiscoveryWorkflow;