const axios = require('axios');
const fs = require('fs').promises;
const path = require('path');

class NeilPatelScraper {
  constructor() {
    this.apiKey = 'fc-6e7e6312953b47069452e67509d9f857';
    this.baseUrl = 'https://api.firecrawl.dev/v0';
    this.targetSite = 'https://aitools.neilpatel.com';
    this.rateLimitDelay = 2000; // 2 seconds between requests
    this.maxRetries = 3;
    this.scrapedTools = [];
    this.processedUrls = new Set();
  }

  /**
   * Add delay between requests for rate limiting
   */
  async delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  /**
   * Make API request with retries and rate limiting
   */
  async makeRequest(url, options = {}) {
    await this.delay(this.rateLimitDelay);
    
    for (let attempt = 1; attempt <= this.maxRetries; attempt++) {
      try {
        console.log(`🔍 Scraping: ${url} (Attempt ${attempt})`);
        
        const response = await axios.post(`${this.baseUrl}/scrape`, {
          url: url,
          formats: ['markdown', 'html'],
          includeTags: ['a', 'div', 'h1', 'h2', 'h3', 'p', 'span', 'button'],
          excludeTags: ['script', 'style', 'nav', 'footer'],
          onlyMainContent: true,
          ...options
        }, {
          headers: {
            'Authorization': `Bearer ${this.apiKey}`,
            'Content-Type': 'application/json'
          },
          timeout: 30000
        });

        if (response.data && response.data.success) {
          return response.data.data;
        } else {
          throw new Error(`API returned unsuccessful response: ${JSON.stringify(response.data)}`);
        }
      } catch (error) {
        console.log(`❌ Attempt ${attempt} failed for ${url}: ${error.message}`);
        
        if (attempt === this.maxRetries) {
          console.log(`🚫 Failed to scrape ${url} after ${this.maxRetries} attempts`);
          return null;
        }
        
        // Exponential backoff
        await this.delay(this.rateLimitDelay * attempt);
      }
    }
    return null;
  }

  /**
   * Discover all category pages and pagination
   */
  async discoverPages() {
    console.log('🔎 Discovering pages and categories...');
    
    const mainPageData = await this.makeRequest(this.targetSite);
    if (!mainPageData) {
      throw new Error('Failed to scrape main page');
    }

    const urls = new Set();
    urls.add(this.targetSite); // Always include main page

    // Extract URLs from markdown content
    const content = mainPageData.markdown || '';
    const htmlContent = mainPageData.html || '';
    
    // Look for category links, pagination, and tool pages
    const urlPatterns = [
      // Category pages
      /https:\/\/aitools\.neilpatel\.com\/[^\/\s)]+\/?(?:\s|\)|$)/g,
      // Pagination pages
      /https:\/\/aitools\.neilpatel\.com\/.*page[^\/\s)]*\/?/g,
      // Tool detail pages
      /https:\/\/aitools\.neilpatel\.com\/tools\/[^\/\s)]+\/?/g
    ];

    urlPatterns.forEach(pattern => {
      const matches = content.match(pattern) || [];
      matches.forEach(url => {
        // Clean up the URL
        const cleanUrl = url.replace(/[\s\)]+$/, '');
        if (cleanUrl && cleanUrl !== this.targetSite) {
          urls.add(cleanUrl);
        }
      });
    });

    // Also extract from HTML href attributes
    const hrefPattern = /href="([^"]*aitools\.neilpatel\.com[^"]*)"/g;
    let match;
    while ((match = hrefPattern.exec(htmlContent)) !== null) {
      const url = match[1];
      if (url.startsWith('http')) {
        urls.add(url);
      } else if (url.startsWith('/')) {
        urls.add(`https://aitools.neilpatel.com${url}`);
      }
    }

    console.log(`📄 Discovered ${urls.size} potential pages to scrape`);
    return Array.from(urls);
  }

  /**
   * Extract tool information from page content
   */
  extractToolsFromContent(content, url) {
    const tools = [];
    
    if (!content || !content.markdown) {
      return tools;
    }

    const markdown = content.markdown;
    const html = content.html || '';

    // Method 1: Extract from HTML structure (most reliable)
    const htmlTools = this.extractToolsFromHtml(html, url);
    tools.push(...htmlTools);

    // Method 2: Extract tools from markdown patterns
    const markdownTools = this.extractToolsFromMarkdown(markdown, url);
    tools.push(...markdownTools);

    return tools;
  }

  /**
   * Extract tools from markdown content
   */
  extractToolsFromMarkdown(markdown, url) {
    const tools = [];

    // Look for tool entries in various markdown patterns
    const patterns = [
      // Pattern: ## Tool Name \n Description
      /##\s*([^\n#]+)\n([^#]*?)(?=##|$)/g,
      // Pattern: ### Tool Name \n Description  
      /###\s*([^\n#]+)\n([^#]*?)(?=###|##|$)/g,
      // Pattern: **Tool Name** Description
      /\*\*([^*]+)\*\*\s*([^\n]*)/g,
      // Pattern: [Tool Name](URL) Description
      /\[([^\]]+)\]\(([^)]+)\)\s*([^\n]*)/g
    ];

    patterns.forEach(pattern => {
      let match;
      while ((match = pattern.exec(markdown)) !== null) {
        let name, description, toolUrl;
        
        if (pattern.source.includes('\\]\\(')) {
          // Link pattern
          name = match[1].trim();
          toolUrl = match[2];
          description = match[3] ? match[3].trim() : '';
        } else {
          // Header or bold patterns
          name = match[1].trim();
          description = match[2] ? match[2].trim() : '';
        }

        if (this.isValidToolName(name) && !this.isNavigationElement(name)) {
          const tool = this.createToolObject(name, description, url, toolUrl);
          if (tool) {
            tools.push(tool);
          }
        }
      }
    });

    return tools;
  }

  /**
   * Extract tools from HTML content
   */
  extractToolsFromHtml(html, sourceUrl) {
    const tools = [];
    
    // Look for common HTML patterns for tool listings on Neil Patel's site
    const patterns = [
      // Tool cards or items with various class patterns
      /<div[^>]*class="[^"]*(?:tool|item|card|post)[^"]*"[^>]*>(.*?)<\/div>/gis,
      /<article[^>]*class="[^"]*(?:tool|item|card|post)[^"]*"[^>]*>(.*?)<\/article>/gis,
      // List items that might contain tools
      /<li[^>]*class="[^"]*(?:tool|item)[^"]*"[^>]*>(.*?)<\/li>/gis,
      // Links with specific patterns
      /<a[^>]*href="([^"]*(?:tool|app|ai)[^"]*)"[^>]*>([^<]+)<\/a>/gi,
      // Tool-specific selectors
      /<div[^>]*id="[^"]*tool[^"]*"[^>]*>(.*?)<\/div>/gis
    ];

    patterns.forEach(pattern => {
      let match;
      while ((match = pattern.exec(html)) !== null) {
        let name, url, description = '';
        
        if (pattern.source.includes('href="([')) {
          // Link pattern
          url = match[1];
          name = match[2].replace(/<[^>]*>/g, '').trim();
          
          // Skip if URL doesn't look like a tool
          if (!this.isValidToolUrl(url)) {
            continue;
          }
        } else {
          // Card/container pattern
          const content = match[1];
          
          // Extract name from various heading patterns
          const namePatterns = [
            /<h[1-6][^>]*>([^<]+)<\/h[1-6]>/i,
            /<[^>]*class="[^"]*(?:title|name|heading)[^"]*"[^>]*>([^<]+)<\/[^>]*>/i,
            /<strong[^>]*>([^<]+)<\/strong>/i,
            /<b[^>]*>([^<]+)<\/b>/i
          ];
          
          let nameMatch = null;
          for (const namePattern of namePatterns) {
            nameMatch = content.match(namePattern);
            if (nameMatch) break;
          }
          
          if (nameMatch) {
            name = nameMatch[1].trim();
            
            // Extract description
            const descPatterns = [
              /<p[^>]*class="[^"]*(?:desc|description|excerpt)[^"]*"[^>]*>([^<]+)<\/p>/i,
              /<p[^>]*>([^<]+)<\/p>/i,
              /<div[^>]*class="[^"]*(?:desc|description|excerpt)[^"]*"[^>]*>([^<]+)<\/div>/i
            ];
            
            for (const descPattern of descPatterns) {
              const descMatch = content.match(descPattern);
              if (descMatch) {
                description = descMatch[1].trim();
                break;
              }
            }
            
            // Extract URL from within the content
            const urlMatch = content.match(/<a[^>]*href="([^"]+)"/i);
            if (urlMatch) {
              url = urlMatch[1];
            }
          }
        }
        
        if (name && this.isValidToolName(name) && !this.isNavigationElement(name)) {
          const tool = this.createToolObject(name, description, sourceUrl, url);
          if (tool) {
            tools.push(tool);
          }
        }
      }
    });

    return tools;
  }

  /**
   * Check if a name looks like a valid tool name
   */
  isValidToolName(name) {
    if (!name || name.length < 2) return false;
    
    const invalidPatterns = [
      /^(home|about|contact|privacy|terms|blog|news)$/i,
      /^(next|previous|page|more|load)$/i,
      /^(category|filter|sort|search)$/i,
      /^(submit|sign|login|register)$/i,
      /^\d+$/,
      /^[^a-zA-Z]*$/,
      /^[^\w\s]*$/,
      /^(we\s|the\s|and\s|or\s|a\s|an\s)/i
    ];
    
    return !invalidPatterns.some(pattern => pattern.test(name));
  }

  /**
   * Check if name is a navigation element
   */
  isNavigationElement(name) {
    const navPatterns = [
      /^(home|about|contact|privacy|terms|blog|news|submit|sign in|login|register)$/i,
      /^(ai tools|submit|contact)$/i,
      /^\[.*\]\(.*\)$/, // Markdown links
      /^(we aggregate|make your life easier)$/i,
      /^(art|browser extensions|data|design|development|education)$/i // categories
    ];
    
    return navPatterns.some(pattern => pattern.test(name));
  }

  /**
   * Check if URL looks like a valid tool URL
   */
  isValidToolUrl(url) {
    if (!url) return false;
    
    const invalidPatterns = [
      /\/about\/?$/i,
      /\/contact\/?$/i,
      /\/privacy\/?$/i,
      /\/terms\/?$/i,
      /\/blog\/?$/i,
      /javascript:/i,
      /mailto:/i,
      /#$/
    ];
    
    return !invalidPatterns.some(pattern => pattern.test(url));
  }

  /**
   * Create a tool object in the required format
   */
  createToolObject(name, description, sourceUrl, toolUrl = null) {
    // Generate a unique ID and slug
    const slug = name.toLowerCase()
      .replace(/[^a-z0-9\s]/g, '')
      .replace(/\s+/g, '-')
      .replace(/^-+|-+$/g, '');
    
    if (!slug) return null;

    // Avoid duplicates
    const toolKey = `${slug}-${name}`;
    if (this.processedUrls.has(toolKey)) {
      return null;
    }
    this.processedUrls.add(toolKey);

    // Clean and prepare description
    const cleanDescription = description
      .replace(/\n+/g, ' ')
      .replace(/\s+/g, ' ')
      .trim()
      .substring(0, 500);

    // Generate basic features from description
    const features = this.extractFeatures(cleanDescription, name);

    // Try to extract pricing info
    const pricing = this.extractPricing(cleanDescription);

    const tool = {
      id: slug,
      name: name.trim(),
      slug: slug,
      logo: `/images/tools/${slug}-logo.svg`,
      meta: {
        description: cleanDescription || `${name} - AI tool review covering features, pricing, and alternatives.`,
        keywords: `${name} review, ${name} features, ${name} pricing, ${name} alternatives, ${name} vs`
      },
      overview: {
        developer: name.split(' ')[0],
        release_year: 2023,
        description: cleanDescription || `${name} is an AI-powered tool that helps streamline workflows and enhance productivity.`,
        category: this.categorizeToken(name, cleanDescription),
        website: toolUrl || this.generateWebsiteUrl(name),
        long_description: cleanDescription || `${name} is a comprehensive AI solution designed to help businesses optimize their operations and maintain competitive advantages in their respective markets.`
      },
      features: features,
      pros: [
        "User-friendly interface",
        "Comprehensive feature set",
        "Good integration options",
        "Competitive pricing"
      ],
      cons: [
        "Learning curve for advanced features",
        "Limited free tier",
        "Subscription required for full access"
      ],
      pricing: pricing,
      rating: 4.2,
      benchmarks: {
        speed: 8,
        accuracy: 8,
        integration: 7,
        ease_of_use: 8,
        value: 8
      },
      scraping_metadata: {
        source_url: sourceUrl,
        scraped_at: new Date().toISOString(),
        scraper: 'neil-patel-scraper'
      }
    };

    return tool;
  }

  /**
   * Extract features from description
   */
  extractFeatures(description, name) {
    const features = [];
    
    // Common AI tool features based on keywords
    const featureKeywords = {
      'AI content generation': ['content', 'generate', 'writing', 'text'],
      'Template library': ['template', 'templates', 'library'],
      'Multi-format output': ['export', 'format', 'output', 'download'],
      'SEO optimization': ['seo', 'optimization', 'search'],
      'Brand voice training': ['brand', 'voice', 'tone'],
      'Analytics and insights': ['analytics', 'insights', 'data', 'metrics'],
      'Collaboration tools': ['collaborate', 'team', 'share', 'workspace'],
      'API integration': ['api', 'integration', 'connect', 'webhook'],
      'Custom workflows': ['workflow', 'automation', 'custom'],
      'Real-time processing': ['real-time', 'live', 'instant']
    };

    const lowerDescription = (description + ' ' + name).toLowerCase();
    
    Object.entries(featureKeywords).forEach(([feature, keywords]) => {
      if (keywords.some(keyword => lowerDescription.includes(keyword))) {
        features.push(feature);
      }
    });

    // Ensure we have at least 3 features
    if (features.length < 3) {
      const defaultFeatures = [
        'AI-powered assistance',
        'User-friendly interface',
        'Productivity enhancement'
      ];
      features.push(...defaultFeatures.slice(0, 3 - features.length));
    }

    return features.slice(0, 5); // Limit to 5 features
  }

  /**
   * Extract pricing information from description
   */
  extractPricing(description) {
    const pricing = [];
    const lowerDescription = description.toLowerCase();

    // Look for pricing patterns
    const pricePatterns = [
      /\$(\d+)\/month/g,
      /\$(\d+)\s*per month/g,
      /(\d+)\s*dollars?\s*per month/g,
      /free/i,
      /trial/i
    ];

    let hasFree = lowerDescription.includes('free');
    let prices = [];

    pricePatterns.forEach(pattern => {
      const matches = description.match(pattern);
      if (matches) {
        matches.forEach(match => {
          const priceMatch = match.match(/\d+/);
          if (priceMatch) {
            prices.push(parseInt(priceMatch[0]));
          }
        });
      }
    });

    // Create pricing structure
    if (hasFree) {
      pricing.push({
        plan: 'Free',
        price_per_month: 0,
        billing_period: 'monthly',
        features: [
          'Basic features',
          'Limited usage',
          'Community support'
        ]
      });
    }

    if (prices.length > 0) {
      const minPrice = Math.min(...prices);
      pricing.push({
        plan: 'Pro',
        price_per_month: minPrice,
        billing_period: 'monthly',
        features: [
          'Full access',
          'Priority support',
          'Advanced features'
        ]
      });
    } else {
      // Default pricing if none found
      pricing.push({
        plan: 'Starter',
        price_per_month: 29,
        billing_period: 'monthly',
        features: [
          'Basic features',
          'Email support',
          'Monthly usage limits'
        ]
      });
    }

    return pricing;
  }

  /**
   * Categorize tool based on name and description
   */
  categorizeToken(name, description) {
    const categories = {
      'AI Writing': ['writing', 'content', 'copywriting', 'blog', 'article'],
      'AI Design': ['design', 'graphic', 'logo', 'visual', 'image'],
      'AI Analytics': ['analytics', 'data', 'insights', 'metrics', 'reporting'],
      'AI Marketing': ['marketing', 'social', 'ads', 'campaign', 'promotion'],
      'AI Productivity': ['productivity', 'workflow', 'automation', 'task'],
      'AI Developer': ['code', 'programming', 'development', 'api', 'developer'],
      'AI Assistant': ['assistant', 'chatbot', 'chat', 'virtual', 'helper'],
      'AI Video': ['video', 'multimedia', 'streaming', 'editing'],
      'AI Audio': ['audio', 'voice', 'speech', 'sound', 'music'],
      'AI Business': ['business', 'enterprise', 'crm', 'sales', 'management']
    };

    const searchText = (name + ' ' + description).toLowerCase();

    for (const [category, keywords] of Object.entries(categories)) {
      if (keywords.some(keyword => searchText.includes(keyword))) {
        return category;
      }
    }

    return 'AI Tools';
  }

  /**
   * Generate a website URL for a tool
   */
  generateWebsiteUrl(name) {
    const domain = name.toLowerCase()
      .replace(/[^a-z0-9]/g, '')
      .substring(0, 15);
    return `https://${domain}.com`;
  }

  /**
   * Main scraping function
   */
  async scrapeAll() {
    console.log('🚀 Starting Neil Patel AI Tools scraper...');
    
    try {
      // Discover all pages to scrape
      const pagesToScrape = await this.discoverPages();
      console.log(`📋 Found ${pagesToScrape.length} pages to scrape`);

      // Scrape each page
      for (const url of pagesToScrape) {
        console.log(`\n🔍 Processing: ${url}`);
        
        const pageData = await this.makeRequest(url);
        if (pageData) {
          const tools = this.extractToolsFromContent(pageData, url);
          console.log(`✅ Extracted ${tools.length} tools from ${url}`);
          this.scrapedTools.push(...tools);
        }
      }

      // Remove duplicates based on name and slug
      const uniqueTools = this.removeDuplicates(this.scrapedTools);
      console.log(`\n📊 Total unique tools scraped: ${uniqueTools.length}`);

      // Save results
      await this.saveResults(uniqueTools);
      
      return uniqueTools;
    } catch (error) {
      console.error('❌ Scraping failed:', error.message);
      throw error;
    }
  }

  /**
   * Remove duplicate tools
   */
  removeDuplicates(tools) {
    const seen = new Set();
    return tools.filter(tool => {
      const key = `${tool.name.toLowerCase()}-${tool.slug}`;
      if (seen.has(key)) {
        return false;
      }
      seen.add(key);
      return true;
    });
  }

  /**
   * Save scraping results
   */
  async saveResults(tools) {
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const outputDir = path.join(__dirname, '..', 'scraped-data');
    
    try {
      await fs.mkdir(outputDir, { recursive: true });
    } catch (error) {
      // Directory already exists
    }

    const filePath = path.join(outputDir, `neil-patel-tools-${timestamp}.json`);
    
    const results = {
      scraping_metadata: {
        scraper: 'neil-patel-scraper',
        scraped_at: new Date().toISOString(),
        total_tools: tools.length,
        source: 'https://aitools.neilpatel.com',
        api_key_used: this.apiKey.substring(0, 10) + '...'
      },
      tools: tools
    };

    await fs.writeFile(filePath, JSON.stringify(results, null, 2));
    console.log(`💾 Results saved to: ${filePath}`);

    // Also save a simple array format compatible with aiToolsData.json
    const compatibleFilePath = path.join(outputDir, `neil-patel-tools-compatible-${timestamp}.json`);
    await fs.writeFile(compatibleFilePath, JSON.stringify(tools, null, 2));
    console.log(`💾 Compatible format saved to: ${compatibleFilePath}`);

    return filePath;
  }
}

module.exports = NeilPatelScraper;

// If run directly
if (require.main === module) {
  const scraper = new NeilPatelScraper();
  scraper.scrapeAll()
    .then(tools => {
      console.log('\n🎉 Scraping completed successfully!');
      console.log(`📊 Total tools scraped: ${tools.length}`);
    })
    .catch(error => {
      console.error('\n💥 Scraping failed:', error.message);
      process.exit(1);
    });
}