const FirecrawlApp = require('@mendable/firecrawl-js').default;
const fs = require('fs').promises;
const path = require('path');
const { convertBulkToSiteOptz } = require('./siteoptz-data-adapter');
const { removeDuplicatesFromArray } = require('./duplicate-detector');
require('dotenv').config();

// Initialize Firecrawl
const app = new FirecrawlApp({ apiKey: process.env.FIRECRAWL_API_KEY });

// AI tool sources to scrape
const aiToolSources = [
  {
    url: 'https://futurepedia.io/',
    name: 'futurepedia',
    category: 'directory'
  },
  {
    url: 'https://theresanaiforthat.com/',
    name: 'theresanaiforthat',
    category: 'directory'
  },
  {
    url: 'https://www.toolify.ai/',
    name: 'toolify',
    category: 'directory'
  },
  {
    url: 'https://aitools.fyi/',
    name: 'aitools-fyi',
    category: 'directory'
  },
  {
    url: 'https://www.futuretools.io/',
    name: 'futuretools',
    category: 'directory'
  },
  {
    url: 'https://www.ai-tools.directory/',
    name: 'ai-tools-directory',
    category: 'directory'
  }
];

// LLM extraction schema for AI tools
const extractionSchema = {
  type: 'object',
  properties: {
    tools: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          name: {
            type: 'string',
            description: 'The name of the AI tool'
          },
          description: {
            type: 'string',
            description: 'A detailed description of what the tool does'
          },
          category: {
            type: 'string',
            description: 'The primary category of the tool (e.g., text-generation, image-generation, code-generation)'
          },
          pricing: {
            type: 'object',
            properties: {
              hasFree: {
                type: 'boolean',
                description: 'Whether the tool has a free plan or free trial'
              },
              startingPrice: {
                type: 'number',
                description: 'Starting price per month in USD'
              },
              model: {
                type: 'string',
                enum: ['free', 'freemium', 'paid', 'custom'],
                description: 'Pricing model'
              }
            }
          },
          features: {
            type: 'array',
            items: {
              type: 'string'
            },
            description: 'Key features of the tool'
          },
          website: {
            type: 'string',
            format: 'uri',
            description: 'Official website URL'
          },
          rating: {
            type: 'number',
            minimum: 0,
            maximum: 5,
            description: 'User rating out of 5'
          },
          reviewCount: {
            type: 'integer',
            description: 'Number of user reviews'
          },
          tags: {
            type: 'array',
            items: {
              type: 'string'
            },
            description: 'Tags associated with the tool'
          }
        },
        required: ['name', 'description', 'category']
      }
    }
  },
  required: ['tools']
};

// Category normalization map
const categoryMap = {
  // Text & Writing
  'text': 'text-generation',
  'writing': 'text-generation',
  'content': 'text-generation',
  'copywriting': 'text-generation',
  'text generation': 'text-generation',
  'content creation': 'text-generation',
  'ai writing': 'text-generation',
  
  // Images
  'image': 'image-generation',
  'art': 'image-generation',
  'design': 'image-generation',
  'graphics': 'image-generation',
  'image generation': 'image-generation',
  'ai art': 'image-generation',
  'photo': 'image-generation',
  
  // Video
  'video': 'video-generation',
  'video editing': 'video-generation',
  'video generation': 'video-generation',
  'animation': 'video-generation',
  
  // Audio & Voice
  'audio': 'audio-generation',
  'voice': 'voice-ai',
  'music': 'music-generation',
  'sound': 'audio-generation',
  'speech': 'voice-ai',
  'text-to-speech': 'voice-ai',
  'tts': 'voice-ai',
  
  // Code & Development
  'code': 'code-generation',
  'coding': 'code-generation',
  'programming': 'code-generation',
  'development': 'code-generation',
  'developer tools': 'code-generation',
  'dev tools': 'code-generation',
  
  // Data & Analytics
  'data': 'data-analysis',
  'analytics': 'data-analysis',
  'data analysis': 'data-analysis',
  'business intelligence': 'data-analysis',
  'bi': 'data-analysis',
  
  // Chat & Assistants
  'chatbot': 'chatbots',
  'chat': 'chatbots',
  'conversational ai': 'chatbots',
  'assistant': 'ai-assistants',
  'ai assistant': 'ai-assistants',
  
  // Business & Productivity
  'automation': 'automation',
  'productivity': 'productivity',
  'marketing': 'marketing',
  'seo': 'seo-optimization',
  'social media': 'social-media',
  'email': 'email-marketing',
  'sales': 'sales',
  'crm': 'crm',
  
  // Education & Research
  'research': 'research-education',
  'education': 'research-education',
  'learning': 'research-education',
  'study': 'research-education',
  
  // Other specialized categories
  'translation': 'translation',
  'summarization': 'summarization',
  'presentation': 'presentations',
  'scheduling': 'scheduling',
  'meeting': 'meeting-assistants',
  'hr': 'hr-tools',
  'recruiting': 'hr-tools',
  'resume': 'resume-builders',
  'legal': 'legal',
  'healthcare': 'healthcare',
  'finance': 'finance',
  'customer support': 'customer-support',
  'no-code': 'app-builders',
  'database': 'data-management',
  'workflow': 'workflow-automation'
};

// Normalize category name
function normalizeCategory(category) {
  if (!category) return 'other';
  
  const lowercaseCategory = category.toLowerCase().trim();
  
  // Check for exact match in map
  if (categoryMap[lowercaseCategory]) {
    return categoryMap[lowercaseCategory];
  }
  
  // Check for partial matches
  for (const [key, value] of Object.entries(categoryMap)) {
    if (lowercaseCategory.includes(key) || key.includes(lowercaseCategory)) {
      return value;
    }
  }
  
  // Return cleaned category if no match
  return lowercaseCategory.replace(/[^a-z0-9]+/g, '-');
}

// Clean and validate URL
function cleanUrl(url) {
  if (!url) return null;
  
  try {
    const urlObj = new URL(url);
    return urlObj.href;
  } catch (error) {
    // Try to fix common URL issues
    if (!url.startsWith('http')) {
      return cleanUrl('https://' + url);
    }
    return null;
  }
}

// Generate tool ID
function generateToolId(toolName) {
  return toolName
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

// Process scraped tool data
function processToolData(tool, source) {
  const toolId = generateToolId(tool.name);
  
  return {
    id: toolId,
    name: tool.name.trim(),
    slug: toolId,
    description: tool.description?.trim() || '',
    category: normalizeCategory(tool.category),
    pricing: {
      free: tool.pricing?.hasFree || tool.pricing?.model === 'free',
      freemium: tool.pricing?.model === 'freemium',
      paid: tool.pricing?.model === 'paid',
      custom: tool.pricing?.model === 'custom',
      startingPrice: tool.pricing?.startingPrice || null,
      plans: []
    },
    features: tool.features || [],
    tags: tool.tags || [],
    rating: tool.rating || null,
    reviewCount: tool.reviewCount || 0,
    website: cleanUrl(tool.website),
    source: source.name,
    sourceUrl: source.url,
    lastScraped: new Date().toISOString(),
    pros: [],
    cons: [],
    useCases: [],
    integrations: []
  };
}

// Scrape tools from a single source
async function scrapeSource(source) {
  console.log(`\n📊 Scraping ${source.name}...`);
  
  try {
    // Use Firecrawl v2 API with JSON format extraction
    const scrapeResult = await app.scrapeUrl(source.url, {
      formats: [{
        type: "json",
        prompt: "Extract all AI tools from this page. For each tool, extract its name, description, category, pricing information, features, website URL, rating, and review count. Focus on the main tool listings and ignore navigation, headers, and footers.",
        schema: extractionSchema
      }],
      onlyMainContent: true,
      waitFor: 2000
    });
    
    if (scrapeResult.success && scrapeResult.llm_extraction?.tools) {
      const tools = scrapeResult.llm_extraction.tools;
      console.log(`✅ Found ${tools.length} tools from ${source.name}`);
      
      return tools.map(tool => processToolData(tool, source));
    } else if (scrapeResult.formats?.[0]?.tools) {
      const tools = scrapeResult.formats[0].tools;
      console.log(`✅ Found ${tools.length} tools from ${source.name}`);
      
      return tools.map(tool => processToolData(tool, source));
    } else {
      console.log(`⚠️ No tools extracted from ${source.name}`);
      console.log(`Response data:`, JSON.stringify(scrapeResult, null, 2).substring(0, 500));
      return [];
    }
    
  } catch (error) {
    console.error(`❌ Error scraping ${source.name}:`, error.message);
    return [];
  }
}

// Main scraping function
async function scrapeNewAITools() {
  console.log('🚀 Starting AI tools scraping via Firecrawl...\n');
  
  const allTools = [];
  const scrapedCategories = new Set();
  
  // Scrape each source
  for (const source of aiToolSources) {
    const tools = await scrapeSource(source);
    
    // Add to collection
    allTools.push(...tools);
    
    // Track categories
    tools.forEach(tool => scrapedCategories.add(tool.category));
    
    // Add delay between sources
    await new Promise(resolve => setTimeout(resolve, 2000));
  }
  
  console.log(`\n📈 Scraping Summary:`);
  console.log(`- Total tools scraped: ${allTools.length}`);
  console.log(`- Categories found: ${scrapedCategories.size}`);
  console.log(`- Categories: ${Array.from(scrapedCategories).join(', ')}`);
  
  if (allTools.length === 0) {
    console.log('⚠️ No tools were scraped. Saving empty result.');
    const outputDir = path.join(__dirname, 'data', 'scraped');
    await fs.mkdir(outputDir, { recursive: true });
    
    const outputPath = path.join(outputDir, 'new-ai-tools.json');
    await fs.writeFile(
      outputPath,
      JSON.stringify({
        tools: [],
        totalTools: 0,
        categories: [],
        sources: aiToolSources.map(s => s.name),
        scrapedAt: new Date().toISOString()
      }, null, 2)
    );
    
    console.log(`✅ Empty result saved to: ${outputPath}`);
    return [];
  }
  
  // Convert to SiteOptz.ai format
  console.log(`\n🔄 Converting to SiteOptz.ai format...`);
  const conversionResult = await convertBulkToSiteOptz(allTools, {
    sourceInfo: { timestamp: new Date().toISOString() }
  });
  
  let siteOptzTools = conversionResult.tools;
  
  // Advanced duplicate removal
  console.log(`\n🔍 Removing duplicates using advanced detection...`);
  const deduplicationResult = removeDuplicatesFromArray(siteOptzTools, {
    prioritizeNewer: true,
    prioritizeMoreComplete: true,
    keepBestRated: true
  });
  
  const uniqueTools = deduplicationResult.uniqueTools;
  
  // Final category analysis
  const finalCategories = new Set(uniqueTools.map(t => t.overview?.category).filter(Boolean));
  
  console.log(`\n📊 Final Summary:`);
  console.log(`- Tools after SiteOptz conversion: ${siteOptzTools.length}`);
  console.log(`- Unique tools after advanced deduplication: ${uniqueTools.length}`);
  console.log(`- Advanced duplicates removed: ${deduplicationResult.removedCount}`);
  console.log(`- Final categories: ${finalCategories.size}`);
  console.log(`- Categories: ${Array.from(finalCategories).join(', ')}`);
  
  // Save to file
  const outputDir = path.join(__dirname, 'data', 'scraped');
  await fs.mkdir(outputDir, { recursive: true });
  
  const outputPath = path.join(outputDir, 'new-ai-tools.json');
  await fs.writeFile(
    outputPath,
    JSON.stringify({
      tools: uniqueTools,
      totalTools: uniqueTools.length,
      categories: Array.from(finalCategories),
      sources: aiToolSources.map(s => s.name),
      scrapedAt: new Date().toISOString(),
      conversionStats: {
        originalCount: allTools.length,
        convertedCount: siteOptzTools.length,
        finalCount: uniqueTools.length,
        conversionErrors: conversionResult.errors.length,
        duplicatesRemoved: deduplicationResult.removedCount
      }
    }, null, 2)
  );
  
  console.log(`\n✅ Scraped data saved to: ${outputPath}`);
  
  return uniqueTools;
}

// Export for use in other scripts
module.exports = {
  scrapeNewAITools,
  normalizeCategory,
  generateToolId,
  processToolData
};

// Run if called directly
if (require.main === module) {
  scrapeNewAITools()
    .then(() => {
      console.log('\n🎉 Scraping completed successfully!');
      process.exit(0);
    })
    .catch(error => {
      console.error('\n❌ Fatal error:', error);
      process.exit(1);
    });
}