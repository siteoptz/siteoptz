# 🔥 Firecrawl AI Tools Scraping Guide

## 📋 **Overview**

This guide will help you use Firecrawl to scrape the top 50 AI tools by category for your SiteOptz.ai website. Firecrawl is a powerful web scraping tool that can extract structured data from AI tool directories and comparison sites.

---

## 🚀 **Step 1: Firecrawl Setup**

### 1.1 Install Firecrawl
```bash
# Install Firecrawl CLI
npm install -g firecrawl

# Or install locally in your project
npm install firecrawl
```

### 1.2 Get API Key
```bash
# 1. Go to https://firecrawl.dev
# 2. Sign up for an account
# 3. Get your API key from the dashboard
# 4. Set environment variable
export FIRECRAWL_API_KEY="your-api-key-here"
```

---

## 🎯 **Step 2: Target AI Tool Sources**

### 2.1 Primary Sources for AI Tools
```javascript
const aiToolSources = [
  // AI Tool Directories
  "https://futurepedia.io/",
  "https://theresanaiforthat.com/",
  "https://ai.tools/",
  "https://aitoolhunt.com/",
  "https://www.aitoolkit.com/",
  "https://www.aitoolguide.com/",
  "https://www.aitoolscout.com/",
  
  // Comparison Sites
  "https://www.g2.com/categories/artificial-intelligence",
  "https://www.capterra.com/c/artificial-intelligence/",
  "https://www.producthunt.com/topics/artificial-intelligence",
  
  // AI Tool Lists
  "https://www.aitoolreport.com/",
  "https://www.aitoolfinder.com/",
  "https://www.aitoolhub.com/"
];
```

### 2.2 AI Tool Categories
```javascript
const aiCategories = [
  "text-generation",
  "image-generation", 
  "video-generation",
  "audio-generation",
  "code-generation",
  "data-analysis",
  "chatbots",
  "automation",
  "productivity",
  "marketing",
  "design",
  "research",
  "education",
  "healthcare",
  "finance",
  "legal",
  "customer-support",
  "translation",
  "summarization",
  "sentiment-analysis"
];
```

---

## 🔧 **Step 3: Firecrawl Configuration**

### 3.1 Basic Configuration
```javascript
// firecrawl-config.js
const firecrawlConfig = {
  apiKey: process.env.FIRECRAWL_API_KEY,
  options: {
    // Scraping options
    includeTags: ["div", "article", "section"],
    excludeTags: ["script", "style", "nav", "footer"],
    
    // Data extraction
    extractMetadata: true,
    extractLinks: true,
    extractImages: true,
    
    // Performance
    maxRequests: 100,
    delay: 1000, // 1 second delay between requests
    
    // Output
    outputFormat: "json",
    saveScreenshots: false,
    saveHtml: false
  }
};
```

### 3.2 Advanced Configuration
```javascript
// advanced-config.js
const advancedConfig = {
  // Custom selectors for different sites
  selectors: {
    "futurepedia.io": {
      toolCards: ".tool-card",
      toolName: ".tool-name",
      toolDescription: ".tool-description",
      toolCategory: ".tool-category",
      toolPricing: ".tool-pricing",
      toolRating: ".tool-rating",
      toolWebsite: ".tool-website"
    },
    "theresanaiforthat.com": {
      toolCards: ".ai-tool",
      toolName: ".tool-title",
      toolDescription: ".tool-desc",
      toolCategory: ".tool-cat",
      toolPricing: ".tool-price",
      toolRating: ".tool-rating",
      toolWebsite: ".tool-link"
    }
  },
  
  // Data transformation rules
  transformations: {
    pricing: (text) => {
      // Extract pricing information
      const priceMatch = text.match(/\$(\d+(?:\.\d{2})?)/);
      return priceMatch ? parseFloat(priceMatch[1]) : null;
    },
    rating: (text) => {
      // Extract rating (1-5 scale)
      const ratingMatch = text.match(/(\d+(?:\.\d)?)\/5/);
      return ratingMatch ? parseFloat(ratingMatch[1]) : null;
    },
    category: (text) => {
      // Normalize category names
      const categoryMap = {
        "text": "text-generation",
        "image": "image-generation",
        "video": "video-generation",
        "audio": "audio-generation",
        "code": "code-generation",
        "data": "data-analysis"
      };
      return categoryMap[text.toLowerCase()] || text.toLowerCase();
    }
  }
};
```

---

## 📊 **Step 4: Scraping Scripts**

### 4.1 Basic Scraping Script
```javascript
// scrape-ai-tools.js
const { Firecrawl } = require('firecrawl');

async function scrapeAITools() {
  const firecrawl = new Firecrawl(process.env.FIRECRAWL_API_KEY);
  
  const tools = [];
  
  // Scrape Futurepedia
  try {
    console.log('Scraping Futurepedia...');
    const futurepediaData = await firecrawl.scrape({
      url: 'https://futurepedia.io/',
      options: {
        includeTags: ['.tool-card'],
        extractMetadata: true
      }
    });
    
    // Process Futurepedia data
    const processedTools = processFuturepediaData(futurepediaData);
    tools.push(...processedTools);
    
  } catch (error) {
    console.error('Error scraping Futurepedia:', error);
  }
  
  // Scrape There's An AI For That
  try {
    console.log('Scraping There\'s An AI For That...');
    const taaftData = await firecrawl.scrape({
      url: 'https://theresanaiforthat.com/',
      options: {
        includeTags: ['.ai-tool'],
        extractMetadata: true
      }
    });
    
    // Process TAAFT data
    const processedTools = processTAAFTData(taaftData);
    tools.push(...processedTools);
    
  } catch (error) {
    console.error('Error scraping TAAFT:', error);
  }
  
  return tools;
}

// Data processing functions
function processFuturepediaData(data) {
  return data.map(item => ({
    name: extractText(item, '.tool-name'),
    description: extractText(item, '.tool-description'),
    category: extractText(item, '.tool-category'),
    pricing: extractPricing(item, '.tool-pricing'),
    rating: extractRating(item, '.tool-rating'),
    website: extractLink(item, '.tool-website'),
    source: 'futurepedia.io'
  }));
}

function processTAAFTData(data) {
  return data.map(item => ({
    name: extractText(item, '.tool-title'),
    description: extractText(item, '.tool-desc'),
    category: extractText(item, '.tool-cat'),
    pricing: extractPricing(item, '.tool-price'),
    rating: extractRating(item, '.tool-rating'),
    website: extractLink(item, '.tool-link'),
    source: 'theresanaiforthat.com'
  }));
}

// Helper functions
function extractText(element, selector) {
  const el = element.querySelector(selector);
  return el ? el.textContent.trim() : '';
}

function extractPricing(element, selector) {
  const text = extractText(element, selector);
  const priceMatch = text.match(/\$(\d+(?:\.\d{2})?)/);
  return priceMatch ? parseFloat(priceMatch[1]) : null;
}

function extractRating(element, selector) {
  const text = extractText(element, selector);
  const ratingMatch = text.match(/(\d+(?:\.\d)?)\/5/);
  return ratingMatch ? parseFloat(ratingMatch[1]) : null;
}

function extractLink(element, selector) {
  const el = element.querySelector(selector);
  return el ? el.href : '';
}

module.exports = { scrapeAITools };
```

### 4.2 Category-Specific Scraping
```javascript
// scrape-by-category.js
const { Firecrawl } = require('firecrawl');

async function scrapeByCategory(category) {
  const firecrawl = new Firecrawl(process.env.FIRECRAWL_API_KEY);
  
  const categoryUrls = {
    'text-generation': [
      'https://futurepedia.io/category/text-generation',
      'https://theresanaiforthat.com/category/text'
    ],
    'image-generation': [
      'https://futurepedia.io/category/image-generation',
      'https://theresanaiforthat.com/category/image'
    ],
    'video-generation': [
      'https://futurepedia.io/category/video-generation',
      'https://theresanaiforthat.com/category/video'
    ],
    'code-generation': [
      'https://futurepedia.io/category/code-generation',
      'https://theresanaiforthat.com/category/code'
    ]
  };
  
  const tools = [];
  const urls = categoryUrls[category] || [];
  
  for (const url of urls) {
    try {
      console.log(`Scraping ${url}...`);
      const data = await firecrawl.scrape({
        url: url,
        options: {
          includeTags: ['.tool-card', '.ai-tool'],
          extractMetadata: true
        }
      });
      
      const processedTools = data.map(item => ({
        name: extractText(item, '.tool-name, .tool-title'),
        description: extractText(item, '.tool-description, .tool-desc'),
        category: category,
        pricing: extractPricing(item, '.tool-pricing, .tool-price'),
        rating: extractRating(item, '.tool-rating'),
        website: extractLink(item, '.tool-website, .tool-link'),
        source: new URL(url).hostname
      }));
      
      tools.push(...processedTools);
      
    } catch (error) {
      console.error(`Error scraping ${url}:`, error);
    }
  }
  
  return tools;
}

module.exports = { scrapeByCategory };
```

---

## 📈 **Step 5: Data Processing & Cleaning**

### 5.1 Data Cleaning Script
```javascript
// clean-ai-tools-data.js
function cleanAIToolsData(tools) {
  return tools
    .filter(tool => {
      // Remove tools without essential data
      return tool.name && tool.description && tool.website;
    })
    .map(tool => {
      // Clean and normalize data
      return {
        id: generateId(tool.name),
        name: cleanText(tool.name),
        description: cleanText(tool.description),
        category: normalizeCategory(tool.category),
        pricing: normalizePricing(tool.pricing),
        rating: normalizeRating(tool.rating),
        website: cleanUrl(tool.website),
        source: tool.source,
        features: extractFeatures(tool.description),
        pros: [],
        cons: [],
        reviewCount: 0,
        lastUpdated: new Date().toISOString()
      };
    })
    .filter((tool, index, self) => {
      // Remove duplicates based on name
      return index === self.findIndex(t => t.name === tool.name);
    });
}

function generateId(name) {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
}

function cleanText(text) {
  return text
    .trim()
    .replace(/\s+/g, ' ')
    .replace(/[^\w\s\-.,!?]/g, '');
}

function normalizeCategory(category) {
  const categoryMap = {
    'text': 'text-generation',
    'image': 'image-generation',
    'video': 'video-generation',
    'audio': 'audio-generation',
    'code': 'code-generation',
    'data': 'data-analysis',
    'chatbot': 'chatbots',
    'automation': 'automation',
    'productivity': 'productivity',
    'marketing': 'marketing',
    'design': 'design'
  };
  
  return categoryMap[category.toLowerCase()] || category.toLowerCase();
}

function normalizePricing(pricing) {
  if (!pricing) return { free: true, plans: [] };
  
  if (typeof pricing === 'number') {
    return {
      free: pricing === 0,
      plans: [{
        name: 'Pro',
        price: pricing,
        currency: 'USD',
        billing: 'monthly',
        features: []
      }]
    };
  }
  
  return pricing;
}

function normalizeRating(rating) {
  if (!rating) return null;
  return Math.min(Math.max(rating, 0), 5);
}

function cleanUrl(url) {
  try {
    const urlObj = new URL(url);
    return urlObj.origin;
  } catch {
    return url;
  }
}

function extractFeatures(description) {
  // Extract potential features from description
  const featureKeywords = [
    'api', 'integration', 'collaboration', 'templates',
    'customization', 'analytics', 'export', 'import',
    'real-time', 'automation', 'scheduling', 'notifications'
  ];
  
  return featureKeywords.filter(keyword => 
    description.toLowerCase().includes(keyword)
  );
}

module.exports = { cleanAIToolsData };
```

---

## 💾 **Step 6: Data Storage & Export**

### 6.1 Export to JSON
```javascript
// export-tools-data.js
const fs = require('fs');
const path = require('path');

async function exportToolsData(tools, category = 'all') {
  // Create data directory if it doesn't exist
  const dataDir = path.join(__dirname, 'data');
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }
  
  // Export all tools
  const allToolsPath = path.join(dataDir, 'tools.json');
  fs.writeFileSync(allToolsPath, JSON.stringify({
    tools: tools,
    total: tools.length,
    lastUpdated: new Date().toISOString()
  }, null, 2));
  
  // Export by category
  const toolsByCategory = tools.reduce((acc, tool) => {
    const category = tool.category;
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(tool);
    return acc;
  }, {});
  
  for (const [category, categoryTools] of Object.entries(toolsByCategory)) {
    const categoryPath = path.join(dataDir, `${category}.json`);
    fs.writeFileSync(categoryPath, JSON.stringify({
      category: category,
      tools: categoryTools,
      total: categoryTools.length,
      lastUpdated: new Date().toISOString()
    }, null, 2));
  }
  
  // Export summary
  const summaryPath = path.join(dataDir, 'summary.json');
  const summary = {
    totalTools: tools.length,
    categories: Object.keys(toolsByCategory),
    toolsPerCategory: Object.fromEntries(
      Object.entries(toolsByCategory).map(([cat, tools]) => [cat, tools.length])
    ),
    sources: [...new Set(tools.map(t => t.source))],
    lastUpdated: new Date().toISOString()
  };
  
  fs.writeFileSync(summaryPath, JSON.stringify(summary, null, 2));
  
  console.log(`Exported ${tools.length} tools to data/ directory`);
  console.log(`Categories: ${summary.categories.join(', ')}`);
}

module.exports = { exportToolsData };
```

### 6.2 Main Execution Script
```javascript
// main-scraping-script.js
const { scrapeAITools } = require('./scrape-ai-tools');
const { scrapeByCategory } = require('./scrape-by-category');
const { cleanAIToolsData } = require('./clean-ai-tools-data');
const { exportToolsData } = require('./export-tools-data');

async function main() {
  console.log('🚀 Starting AI Tools Scraping...');
  
  try {
    // Scrape all tools
    console.log('📊 Scraping AI tools from multiple sources...');
    const rawTools = await scrapeAITools();
    
    console.log(`📈 Found ${rawTools.length} raw tools`);
    
    // Clean and process data
    console.log('🧹 Cleaning and processing data...');
    const cleanTools = cleanAIToolsData(rawTools);
    
    console.log(`✅ Processed ${cleanTools.length} clean tools`);
    
    // Export data
    console.log('💾 Exporting data...');
    await exportToolsData(cleanTools);
    
    console.log('🎉 Scraping completed successfully!');
    
    // Print summary
    const categories = [...new Set(cleanTools.map(t => t.category))];
    console.log(`\n📊 Summary:`);
    console.log(`- Total tools: ${cleanTools.length}`);
    console.log(`- Categories: ${categories.length}`);
    console.log(`- Categories: ${categories.join(', ')}`);
    
  } catch (error) {
    console.error('❌ Error during scraping:', error);
  }
}

// Run the script
if (require.main === module) {
  main();
}

module.exports = { main };
```

---

## 🎯 **Step 7: Category-Specific Scraping**

### 7.1 Scrape Top 50 by Category
```javascript
// scrape-top-50-by-category.js
const { scrapeByCategory } = require('./scrape-by-category');
const { cleanAIToolsData } = require('./clean-ai-tools-data');
const { exportToolsData } = require('./export-tools-data');

async function scrapeTop50ByCategory() {
  const categories = [
    'text-generation',
    'image-generation',
    'video-generation',
    'code-generation',
    'data-analysis',
    'chatbots',
    'automation',
    'productivity',
    'marketing',
    'design'
  ];
  
  const allTools = [];
  
  for (const category of categories) {
    console.log(`\n🎯 Scraping top 50 ${category} tools...`);
    
    try {
      const categoryTools = await scrapeByCategory(category);
      const cleanCategoryTools = cleanAIToolsData(categoryTools);
      
      // Take top 50 by rating or popularity
      const top50 = cleanCategoryTools
        .sort((a, b) => (b.rating || 0) - (a.rating || 0))
        .slice(0, 50);
      
      allTools.push(...top50);
      
      console.log(`✅ Found ${top50.length} ${category} tools`);
      
    } catch (error) {
      console.error(`❌ Error scraping ${category}:`, error);
    }
  }
  
  // Export all tools
  await exportToolsData(allTools, 'top-50-by-category');
  
  console.log(`\n🎉 Completed! Total tools: ${allTools.length}`);
  
  return allTools;
}

module.exports = { scrapeTop50ByCategory };
```

---

## 📊 **Step 8: Data Analysis & Insights**

### 8.1 Generate Insights
```javascript
// generate-insights.js
function generateInsights(tools) {
  const insights = {
    totalTools: tools.length,
    categories: {},
    pricing: {
      free: 0,
      paid: 0,
      freemium: 0
    },
    ratings: {
      average: 0,
      distribution: {}
    },
    sources: {},
    topTools: []
  };
  
  // Category analysis
  tools.forEach(tool => {
    const category = tool.category;
    if (!insights.categories[category]) {
      insights.categories[category] = 0;
    }
    insights.categories[category]++;
  });
  
  // Pricing analysis
  tools.forEach(tool => {
    if (tool.pricing.free) {
      insights.pricing.free++;
    } else if (tool.pricing.plans.length > 0) {
      insights.pricing.paid++;
    } else {
      insights.pricing.freemium++;
    }
  });
  
  // Rating analysis
  const ratings = tools.filter(t => t.rating).map(t => t.rating);
  insights.ratings.average = ratings.length > 0 
    ? ratings.reduce((a, b) => a + b, 0) / ratings.length 
    : 0;
  
  // Source analysis
  tools.forEach(tool => {
    const source = tool.source;
    if (!insights.sources[source]) {
      insights.sources[source] = 0;
    }
    insights.sources[source]++;
  });
  
  // Top tools by rating
  insights.topTools = tools
    .filter(t => t.rating)
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 10)
    .map(t => ({
      name: t.name,
      category: t.category,
      rating: t.rating,
      website: t.website
    }));
  
  return insights;
}

module.exports = { generateInsights };
```

---

## 🚀 **Step 9: Integration with Your Website**

### 9.1 Update Your Data Files
```javascript
// update-website-data.js
const fs = require('fs');
const path = require('path');

async function updateWebsiteData() {
  // Read scraped data
  const toolsData = JSON.parse(
    fs.readFileSync(path.join(__dirname, 'data/tools.json'), 'utf8')
  );
  
  // Convert to your website format
  const websiteTools = toolsData.tools.map(tool => ({
    id: tool.id,
    name: tool.name,
    description: tool.description,
    category: tool.category,
    pricing: tool.pricing,
    features: tool.features,
    pros: tool.pros,
    cons: tool.cons,
    rating: tool.rating,
    reviewCount: tool.reviewCount,
    website: tool.website,
    documentation: tool.documentation || '',
    support: tool.support || '',
    customFields: {
      source: tool.source,
      lastUpdated: tool.lastUpdated
    }
  }));
  
  // Write to your website data directory
  const websiteDataPath = path.join(__dirname, '../data/tool_data.json');
  fs.writeFileSync(websiteDataPath, JSON.stringify({
    tools: websiteTools,
    lastUpdated: new Date().toISOString()
  }, null, 2));
  
  console.log(`✅ Updated website data with ${websiteTools.length} tools`);
}

module.exports = { updateWebsiteData };
```

---

## 📋 **Step 10: Usage Instructions**

### 10.1 Run the Scraping
```bash
# Set your API key
export FIRECRAWL_API_KEY="your-api-key-here"

# Run the main scraping script
node main-scraping-script.js

# Or run category-specific scraping
node scrape-top-50-by-category.js
```

### 10.2 Schedule Regular Updates
```bash
# Add to crontab for daily updates
0 2 * * * cd /path/to/your/project && node main-scraping-script.js
```

### 10.3 Monitor Results
```bash
# Check the generated files
ls -la data/
cat data/summary.json
```

---

## 🆘 **Troubleshooting**

### Common Issues:
1. **Rate limiting**: Add delays between requests
2. **Blocked requests**: Use rotating proxies
3. **Data quality**: Implement better cleaning rules
4. **Missing data**: Add fallback sources

### Best Practices:
1. **Respect robots.txt**
2. **Add delays between requests**
3. **Handle errors gracefully**
4. **Validate data quality**
5. **Keep backups of scraped data**

---

**🎉 You now have a complete Firecrawl setup to scrape the top 50 AI tools by category!**

**Next steps:**
1. Set up your Firecrawl API key
2. Run the scraping scripts
3. Clean and process the data
4. Integrate with your website
5. Set up regular updates

**Need help?** Check the troubleshooting section or reach out for support!
