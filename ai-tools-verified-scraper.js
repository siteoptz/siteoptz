#!/usr/bin/env node

/**
 * AI Tools Verified Scraper - Enhanced with Real Tool Verification
 * 
 * Complete workflow for discovering, crawling, and verifying legitimate AI tools
 * using Firecrawl with advanced verification methods to filter out fake tools.
 */

const https = require('https');
const fs = require('fs');
const path = require('path');

// Enhanced configuration with verification rules
const CONFIG = {
  FIRECRAWL_API_KEY: process.env.FIRECRAWL_API_KEY || 'fc-6e7e6312953b47069452e67509d9f857',
  
  // Discovery sources from PRD - Limited for testing
  DISCOVERY_SOURCES: [
    'https://futuretools.io/',
    'https://theresanaiforthat.com/'
  ],
  
  // Rate limiting from PRD
  RATE_LIMIT: {
    delayBetweenRequests: 1000, // 1 second for faster testing
    maxConcurrentRequests: 2,
    maxRequestsPerSource: 5 // Reduced for testing
  },
  
  // Enhanced validation with verification rules
  VALIDATION: {
    minNameLength: 3,
    minDescriptionLength: 30,
    requiredFields: ['name', 'description', 'website'],
    // Tool verification rules
    FAKE_TOOL_PATTERNS: [
      // Navigation/UI elements
      /^(home|about|contact|privacy|terms|blog|news|support|login|register|search|menu|button)$/i,
      // Pricing tiers (not tools)
      /^(free|freemium|premium|paid|trial|basic|pro|enterprise|starter)$/i,
      // Categories (not tools)
      /^(ai|tools?|software|platform|app|service|solution)$/i,
      // Generic terms
      /^(new|popular|trending|featured|recommended|best|top)$/i,
      // Numbers/symbols
      /^[\d\s\W]+$/,
      // Too short
      /^.{1,2}$/,
      // Common fake patterns
      /^(click here|learn more|get started|try now|sign up|view all)$/i
    ],
    LEGITIMATE_INDICATORS: [
      // Must have actual product features
      'api', 'integration', 'automation', 'analytics', 'dashboard', 'workspace',
      // AI-specific terms
      'neural', 'machine learning', 'nlp', 'computer vision', 'deep learning',
      // Product attributes
      'real-time', 'cloud-based', 'enterprise-grade', 'scalable'
    ]
  }
};

/**
 * Enhanced Firecrawl API Client with verification
 */
class VerifiedFirecrawlClient {
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
 * Enhanced Tool Verifier - Validates legitimate AI tools
 */
class AIToolVerifier {
  constructor() {
    this.verificationCache = new Map();
  }

  /**
   * Comprehensive tool verification
   */
  async verifyTool(tool, content = '') {
    const verificationId = `${tool.name}-${tool.website}`;
    
    // Check cache
    if (this.verificationCache.has(verificationId)) {
      return this.verificationCache.get(verificationId);
    }

    const checks = {
      hasValidName: this.verifyToolName(tool.name),
      hasValidDescription: this.verifyDescription(tool.description),
      hasValidWebsite: await this.verifyWebsite(tool.website),
      hasLegitimateFeatures: this.verifyFeatures(tool.features, tool.description),
      isNotFakePattern: this.checkFakePatterns(tool.name, tool.description),
      hasAIIndicators: this.checkAIIndicators(tool.description, content),
      hasProductContent: this.checkProductContent(tool.description, content)
    };

    // Calculate verification score
    const score = Object.values(checks).filter(Boolean).length / Object.keys(checks).length;
    const isVerified = score >= 0.7; // 70% verification threshold

    const result = {
      isVerified,
      score: Math.round(score * 100),
      checks,
      reason: this.generateVerificationReason(checks)
    };

    // Cache result
    this.verificationCache.set(verificationId, result);
    
    return result;
  }

  /**
   * Verify tool name is legitimate
   */
  verifyToolName(name) {
    if (!name || typeof name !== 'string') return false;
    
    // Check against fake patterns
    for (const pattern of CONFIG.VALIDATION.FAKE_TOOL_PATTERNS) {
      if (pattern.test(name.trim())) {
        return false;
      }
    }

    // Must be at least 3 characters, contain letters
    if (name.length < 3 || !/[a-zA-Z]/.test(name)) {
      return false;
    }

    // Avoid generic terms
    const genericTerms = ['ai tool', 'software', 'platform', 'app', 'service'];
    if (genericTerms.some(term => name.toLowerCase() === term)) {
      return false;
    }

    return true;
  }

  /**
   * Verify description is meaningful
   */
  verifyDescription(description) {
    if (!description || typeof description !== 'string') return false;
    if (description.length < 30) return false;
    
    // Check for meaningful content
    const meaningfulPatterns = [
      /\b(help|assist|automate|generate|create|analyze|optimize|improve|enhance|streamline)\b/i,
      /\b(business|marketing|content|data|customer|sales|productivity|workflow)\b/i,
      /\b(ai|artificial intelligence|machine learning|automation)\b/i
    ];

    return meaningfulPatterns.some(pattern => pattern.test(description));
  }

  /**
   * Verify website URL is legitimate
   */
  async verifyWebsite(website) {
    if (!website) return false;
    
    try {
      const url = new URL(website);
      
      // Blacklist domains that are not tools
      const blacklistedDomains = [
        'google.com', 'facebook.com', 'twitter.com', 'linkedin.com',
        'cookiedatabase.org', 'example.com', 'localhost',
        'aixploria.com', 'opentools.ai', 'dang.ai', 'futuretools.io'
      ];
      
      if (blacklistedDomains.some(domain => url.hostname.includes(domain))) {
        return false;
      }

      // Must have proper TLD
      if (!url.hostname.includes('.') || url.hostname.endsWith('.local')) {
        return false;
      }

      return true;
    } catch {
      return false;
    }
  }

  /**
   * Verify features are legitimate
   */
  verifyFeatures(features, description) {
    if (!Array.isArray(features) || features.length === 0) {
      // If no features extracted, check description for feature indicators
      return /\b(feature|capability|function|tool|integration|api)\b/i.test(description || '');
    }

    // Filter out fake features
    const legitFeatures = features.filter(feature => {
      return feature.length > 10 && 
             !/^(and |the |a |an )/i.test(feature) &&
             !feature.includes('http') &&
             !/^[\d\s\W]+$/.test(feature);
    });

    return legitFeatures.length >= Math.min(2, features.length * 0.5);
  }

  /**
   * Check for fake tool patterns
   */
  checkFakePatterns(name, description) {
    // Check name
    for (const pattern of CONFIG.VALIDATION.FAKE_TOOL_PATTERNS) {
      if (pattern.test(name)) {
        return false;
      }
    }

    // Check description for fake indicators
    const fakeDescriptionPatterns = [
      /^(search for|click|button|link|menu|navigation)/i,
      /^.{1,10}$/,
      /^(terms|privacy|policy|cookie)/i
    ];

    return !fakeDescriptionPatterns.some(pattern => pattern.test(description));
  }

  /**
   * Check for AI indicators
   */
  checkAIIndicators(description, content) {
    const aiTerms = [
      'artificial intelligence', 'ai', 'machine learning', 'ml', 'deep learning',
      'neural network', 'nlp', 'natural language', 'computer vision',
      'automation', 'intelligent', 'smart', 'predictive', 'generative'
    ];

    const text = `${description} ${content}`.toLowerCase();
    return aiTerms.some(term => text.includes(term));
  }

  /**
   * Check for actual product content
   */
  checkProductContent(description, content) {
    const productIndicators = [
      'pricing', 'plans', 'features', 'dashboard', 'api', 'integration',
      'signup', 'login', 'trial', 'demo', 'documentation', 'support'
    ];

    const text = `${description} ${content}`.toLowerCase();
    const matches = productIndicators.filter(indicator => text.includes(indicator));
    
    return matches.length >= 2; // Must have at least 2 product indicators
  }

  /**
   * Generate human-readable verification reason
   */
  generateVerificationReason(checks) {
    const failed = Object.entries(checks)
      .filter(([_, passed]) => !passed)
      .map(([check, _]) => check);

    if (failed.length === 0) return 'All verification checks passed';
    
    const reasons = {
      hasValidName: 'Invalid or generic tool name',
      hasValidDescription: 'Description too short or not meaningful',
      hasValidWebsite: 'Invalid or blacklisted website',
      hasLegitimateFeatures: 'No legitimate features detected',
      isNotFakePattern: 'Matches fake tool patterns',
      hasAIIndicators: 'No AI-related terminology found',
      hasProductContent: 'No product indicators found'
    };

    return failed.map(check => reasons[check]).join('; ');
  }
}

/**
 * Enhanced Data Extractor with verification
 */
class VerifiedDataExtractor {
  constructor(verifier) {
    this.verifier = verifier;
  }

  /**
   * Extract and verify tool name
   */
  extractToolName(content) {
    const patterns = [
      // Look for actual product names in titles
      /<title>([^|<]+?)(?:\s*[-|]\s*|$)/i,
      /<h1[^>]*>([^<]{3,50})<\/h1>/i,
      /^#\s*([A-Z][A-Za-z0-9\s.-]{2,40})\s*$/m,
      // Product name patterns
      /^([A-Z][A-Za-z0-9\s.-]+)(?:\s*[-–—]\s*(?:AI|Tool|Software|Platform))/im
    ];

    for (const pattern of patterns) {
      const match = content.match(pattern);
      if (match && match[1]) {
        const name = match[1].trim()
          .replace(/\s+/g, ' ')
          .replace(/ Logo$| Icon$/i, '')
          .replace(/^(The |A |An )/i, '');
          
        if (this.verifier.verifyToolName(name)) {
          return name;
        }
      }
    }
    return null;
  }

  /**
   * Extract meaningful description
   */
  extractDescription(content) {
    const patterns = [
      // Meta description
      /<meta\s+(?:name="description"|property="og:description")\s+content="([^"]{30,300})"/i,
      // First meaningful paragraph
      /(?:^|\n)([A-Z][^.\n]{30,300}\.)/m,
      // Product tagline
      /<h2[^>]*>([^<]{30,200})<\/h2>/i
    ];

    for (const pattern of patterns) {
      const match = content.match(pattern);
      if (match && match[1]) {
        const description = match[1].trim();
        if (this.verifier.verifyDescription(description)) {
          return description;
        }
      }
    }

    return null;
  }

  /**
   * Extract legitimate features
   */
  extractFeatures(content, description) {
    const features = [];
    
    // Look for feature lists
    const featurePatterns = [
      /(?:features?|capabilities?|benefits?)[:\s]*\n((?:[•*-]\s*[^\n]{10,100}\n?){2,})/gi,
      /<ul[^>]*>((?:<li[^>]*>[^<]{10,100}<\/li>){2,})<\/ul>/gi
    ];

    featurePatterns.forEach(pattern => {
      let match;
      while ((match = pattern.exec(content)) !== null) {
        const featureText = match[1];
        const featureItems = featureText.match(/(?:[•*-]\s*|<li[^>]*>)([^<\n]{10,100})(?:<\/li>|\n|$)/g);
        
        if (featureItems) {
          featureItems.forEach(item => {
            const feature = item.replace(/^(?:[•*-]\s*|<li[^>]*>)/, '')
                               .replace(/<\/li>$/, '')
                               .trim();
            if (feature.length >= 10 && feature.length <= 100) {
              features.push(feature);
            }
          });
        }
      }
    });

    // Filter and deduplicate
    const validFeatures = [...new Set(features)]
      .filter(f => this.verifier.verifyFeatures([f], description))
      .slice(0, 8);

    return validFeatures;
  }

  /**
   * Extract legitimate website URL
   */
  async extractWebsite(content, sourceUrl) {
    // Look for canonical URL or official links
    const urlPatterns = [
      /<link\s+rel="canonical"\s+href="([^"]+)"/i,
      /(?:official\s+website|homepage)[:\s]+<?([https?:\/\/[^\s>]+)>?/i,
      /<meta\s+property="og:url"\s+content="([^"]+)"/i
    ];

    for (const pattern of urlPatterns) {
      const match = content.match(pattern);
      if (match && match[1]) {
        if (await this.verifier.verifyWebsite(match[1])) {
          return match[1];
        }
      }
    }

    // Fallback to source URL if it's legitimate
    if (await this.verifier.verifyWebsite(sourceUrl)) {
      return sourceUrl;
    }

    return null;
  }
}

/**
 * Main Verified AI Tools Discovery Workflow
 */
class VerifiedAIToolsDiscoveryWorkflow {
  constructor() {
    this.firecrawl = new VerifiedFirecrawlClient(CONFIG.FIRECRAWL_API_KEY);
    this.verifier = new AIToolVerifier();
    this.extractor = new VerifiedDataExtractor(this.verifier);
    
    this.stats = {
      discovered: 0,
      crawled: 0,
      verified: 0,
      rejected: 0,
      added: 0,
      errors: 0
    };
  }

  async run() {
    console.log('🔍 Starting Verified AI Tools Discovery (Anti-Fake)\n');
    console.log('━'.repeat(65));
    console.log(`📡 Discovery Sources: ${CONFIG.DISCOVERY_SOURCES.length}`);
    console.log(`🛡️  Verification: Advanced fake tool filtering`);
    console.log(`⏱️  Rate Limit: ${CONFIG.RATE_LIMIT.delayBetweenRequests}ms between requests`);
    console.log('━'.repeat(65) + '\n');

    const verifiedTools = [];

    for (const source of CONFIG.DISCOVERY_SOURCES) {
      console.log(`🔍 Discovering from: ${source}`);
      
      try {
        const result = await this.firecrawl.scrape(source);
        
        if (result && result.success && result.data) {
          this.stats.discovered++;
          
          const content = result.data.markdown || '';
          const toolLinks = this.extractToolLinks(content, source);
          console.log(`  ✓ Found ${toolLinks.length} potential tool pages`);
          
          // Crawl and verify tools
          for (const toolLink of toolLinks.slice(0, CONFIG.RATE_LIMIT.maxRequestsPerSource)) {
            await this.firecrawl.delay(CONFIG.RATE_LIMIT.delayBetweenRequests);
            
            const toolData = await this.crawlAndVerifyTool(toolLink, source);
            if (toolData) {
              verifiedTools.push(toolData);
            }
          }
        }
        
        await this.firecrawl.delay(CONFIG.RATE_LIMIT.delayBetweenRequests);
      } catch (error) {
        this.stats.errors++;
        console.log(`  ✗ Error: ${error.message}`);
      }
    }

    // Save verified tools
    console.log(`\n💎 Verification Complete`);
    const verifiedToolsPath = path.join(process.cwd(), 'verified-ai-tools.json');
    
    if (verifiedTools.length > 0) {
      fs.writeFileSync(verifiedToolsPath, JSON.stringify(verifiedTools, null, 2));
      console.log(`  ✓ Saved ${verifiedTools.length} verified tools to: ${verifiedToolsPath}`);
    }

    // Generate report
    const reportPath = this.generateReport(verifiedTools);
    console.log(`  ✓ Report saved to: ${reportPath}`);

    // Final summary
    console.log('\n' + '━'.repeat(65));
    console.log('🎉 Verified Discovery Complete!');
    console.log('━'.repeat(65));
    console.log(`🔍 Sources Processed: ${this.stats.discovered}`);
    console.log(`🌐 Tools Crawled: ${this.stats.crawled}`);
    console.log(`✅ Tools Verified: ${this.stats.verified}`);
    console.log(`❌ Tools Rejected: ${this.stats.rejected}`);
    console.log(`⚠️  Errors: ${this.stats.errors}`);
    console.log(`💎 Legitimate Tools Found: ${verifiedTools.length}`);
    console.log('━'.repeat(65));

    return verifiedTools;
  }

  extractToolLinks(content, sourceUrl) {
    const links = [];
    const linkPattern = /\[([^\]]{3,50})\]\((https?:\/\/[^\)]+)\)/g;
    let match;
    
    while ((match = linkPattern.exec(content)) !== null) {
      const name = match[1].trim();
      const url = match[2].trim();
      
      // Pre-filter obviously fake links
      if (this.verifier.verifyToolName(name) && this.looksLikeToolPage(name, url, sourceUrl)) {
        links.push({ name, url });
      }
    }

    return links;
  }

  looksLikeToolPage(name, url, sourceUrl) {
    // Skip images
    if (url.match(/\.(png|jpg|jpeg|gif|svg|webp|ico)$/i)) return false;
    
    // Skip same domain
    try {
      const sourceHost = new URL(sourceUrl).hostname;
      const linkHost = new URL(url).hostname;
      if (linkHost === sourceHost) return false;
    } catch {
      return false;
    }

    return true;
  }

  async crawlAndVerifyTool(toolLink, source) {
    console.log(`  🔍 Verifying: ${toolLink.name}`);
    this.stats.crawled++;

    try {
      const result = await this.firecrawl.scrape(toolLink.url);
      
      if (result && result.success && result.data) {
        const content = result.data.markdown || '';
        
        // Extract tool information
        const tool = {
          name: this.extractor.extractToolName(content) || toolLink.name,
          description: this.extractor.extractDescription(content),
          website: await this.extractor.extractWebsite(content, toolLink.url),
          features: this.extractor.extractFeatures(content),
          pricing: [], // Will be populated later if needed
          source: source,
          discovered_at: new Date().toISOString()
        };

        // Verify the tool
        const verification = await this.verifier.verifyTool(tool, content);
        
        if (verification.isVerified) {
          console.log(`    ✅ VERIFIED (${verification.score}%): ${tool.name}`);
          this.stats.verified++;
          return {
            ...tool,
            verification
          };
        } else {
          console.log(`    ❌ REJECTED (${verification.score}%): ${tool.name} - ${verification.reason}`);
          this.stats.rejected++;
          return null;
        }
      }
    } catch (error) {
      console.log(`    ⚠️  Error: ${error.message}`);
      this.stats.errors++;
    }

    return null;
  }

  generateReport(tools) {
    const timestamp = new Date().toISOString();
    const reportDir = path.join(process.cwd(), 'verified-reports');
    
    if (!fs.existsSync(reportDir)) {
      fs.mkdirSync(reportDir, { recursive: true });
    }

    const report = {
      timestamp,
      summary: {
        totalCrawled: this.stats.crawled,
        verified: this.stats.verified,
        rejected: this.stats.rejected,
        verificationRate: `${((this.stats.verified / this.stats.crawled) * 100).toFixed(1)}%`,
        errors: this.stats.errors
      },
      verifiedTools: tools.map(t => ({
        name: t.name,
        description: t.description.substring(0, 100) + '...',
        website: t.website,
        verificationScore: t.verification.score,
        source: t.source
      })),
      rejectionReasons: {} // Could be populated with rejection analysis
    };

    const reportPath = path.join(reportDir, `verified-report-${Date.now()}.json`);
    fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));

    return reportPath;
  }
}

// Run the verified workflow
if (require.main === module) {
  const workflow = new VerifiedAIToolsDiscoveryWorkflow();
  
  workflow.run()
    .then(tools => {
      console.log(`\n✨ Successfully discovered and verified ${tools.length} legitimate AI tools!`);
      console.log(`📁 Verified tools saved to: verified-ai-tools.json`);
      console.log(`🔧 Next: Process with automated tool addition following PRD guidelines`);
      process.exit(0);
    })
    .catch(error => {
      console.error('\n❌ Verified workflow failed:', error);
      process.exit(1);
    });
}

module.exports = VerifiedAIToolsDiscoveryWorkflow;