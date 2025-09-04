const FirecrawlApp = require('@mendable/firecrawl-js').default;
const fs = require('fs').promises;
const path = require('path');
const { convertBulkToSiteOptz } = require('./siteoptz-data-adapter');
const { removeDuplicatesFromArray } = require('./duplicate-detector');
require('dotenv').config();

// Initialize Firecrawl with API key
const app = new FirecrawlApp({ apiKey: 'fc-6e7e6312953b47069452e67509d9f857' });

// Comprehensive AI tool directory sources from user request
const aiDirectorySources = [
  {
    url: 'https://aidailyhacks.com/',
    name: 'AI Daily Hacks',
    description: 'New and upcoming AI Directory',
    category: 'directory'
  },
  {
    url: 'https://altern.ai/',
    name: 'Altern',
    description: 'Find almost anything related to AI',
    category: 'directory'
  },
  {
    url: 'https://aidir.wiki/',
    name: 'AIDir.wiki',
    description: 'Discover the Latest AI Tools and Software to Take Your Business to the Next Level',
    category: 'directory'
  },
  {
    url: 'https://ainave.com/',
    name: 'ainave',
    description: 'Navigate the world of AI with ease!',
    category: 'directory'
  },
  {
    url: 'https://aipediahub.com/',
    name: 'AI PEDIA HUB',
    description: 'THE LARGEST AI TOOLS DIRECTORY, UPDATED DAILY.',
    category: 'directory'
  },
  {
    url: 'https://aiscout.net/',
    name: 'AI Scout',
    description: 'AI Tools Directory',
    category: 'directory'
  },
  {
    url: 'https://aitoolsarena.com/',
    name: 'AI Tools Arena',
    description: 'Your Ultimate Resource for AI Tools and Insights',
    category: 'directory'
  },
  {
    url: 'https://aitoolsdirectory.com/',
    name: 'AI Tools Directory',
    description: 'Curated list of AI tools',
    category: 'directory'
  },
  {
    url: 'https://aitoolsguru.com/',
    name: 'AI Tools Guru',
    description: 'THE LARGEST AI TOOLS DIRECTORY',
    category: 'directory'
  },
  {
    url: 'https://aitoolslist.com/',
    name: 'AI Tools List',
    description: 'Best AI Tools Rated',
    category: 'directory'
  },
  {
    url: 'https://aitoolsmarketer.com/',
    name: 'AI Tools Marketer',
    description: 'Unlock the Power of AI: Discover, Learn, Compare, and Optimize with the Ultimate AI Tools Directory.',
    category: 'directory'
  },
  {
    url: 'https://aitoptools.com/',
    name: 'AI Top Tools',
    description: 'The place to go for AI Tools',
    category: 'directory'
  },
  {
    url: 'https://allthingsai.com/',
    name: 'All Things AI',
    description: 'The Curated Resource of AI Tools',
    category: 'directory'
  },
  {
    url: 'https://aitools.inc/',
    name: 'aitools.inc',
    description: 'Discover tools to free up your time and 10x your output.',
    category: 'directory'
  },
  {
    url: 'https://basedtools.ai/',
    name: 'Based Tools',
    description: 'The most Based AI Directory.',
    category: 'directory'
  },
  {
    url: 'https://eliteai.tools/',
    name: 'EliteAI Tools',
    description: 'AI tools directory, exclusively featuring high-quality AI tools',
    category: 'directory'
  },
  {
    url: 'https://findmyaitool.com/',
    name: 'Find my AI Tool',
    description: 'Discover AI Tools for Your Business.',
    category: 'directory'
  },
  {
    url: 'https://foundr.ai/',
    name: 'Foundr',
    description: 'Discover The Best AI Tools at Your Fingertips',
    category: 'directory'
  },
  {
    url: 'https://www.futurepedia.io/',
    name: 'FUTUREPEDIA',
    description: 'THE LARGEST AI TOOLS DIRECTORY, UPDATED DAILY',
    category: 'directory'
  },
  {
    url: 'https://www.futuretools.io/',
    name: 'FutureTools',
    description: 'Collects & Organizes All The Best AI Tools So YOU Too Can Become Superhuman!',
    category: 'directory'
  },
  {
    url: 'https://grabon.in/ai-directory/',
    name: 'Grabon AI Directory',
    description: 'The World\'s Best & Largest Directory Of AI Tools',
    category: 'directory'
  },
  {
    url: 'https://godofprompt.ai/',
    name: 'God of Prompt',
    description: '1000+ Best AI Tools for Marketing & Business',
    category: 'directory'
  },
  {
    url: 'https://www.insidr.ai/',
    name: 'Insidr AI Directory',
    description: 'AI Tools Directory',
    category: 'directory'
  },
  {
    url: 'https://neonrev.com/',
    name: 'NeonRev',
    description: 'One of the largest and best AI Tools Directory',
    category: 'directory'
  },
  {
    url: 'https://opentools.ai/',
    name: 'OpenTools',
    description: 'Chat with our GPT to find the right AI tool for you',
    category: 'directory'
  },
  {
    url: 'https://openfuture.ai/',
    name: 'OpenFuture AI',
    description: 'Largest Tools Directory, Fastest Update, The Most Accurate Database',
    category: 'directory'
  },
  {
    url: 'https://poweredbyai.app/',
    name: 'PoweredbyAI',
    description: 'AI TOOLS & PROMPTS!',
    category: 'directory'
  },
  {
    url: 'https://productivity.directory/',
    name: 'Productivity Tools',
    description: 'A curated productivity directory',
    category: 'directory'
  },
  {
    url: 'https://www.pugin.ai/',
    name: 'Pugin',
    description: 'Discover AI Plugins',
    category: 'directory'
  },
  {
    url: 'https://stratup.ai/',
    name: 'Stratup.ai',
    description: 'AI-Powered Startup Ideas and Tools to Fuel Your Entrepreneurial Journey',
    category: 'directory'
  },
  {
    url: 'https://theresanaiforthat.com/',
    name: 'There\'s An AI',
    description: 'No 1 AI Aggregator',
    category: 'directory'
  },
  {
    url: 'https://www.toolify.ai/',
    name: 'Toolify.ai',
    description: 'Best AI Companies and Tools, Auto Updated Daily By ChatGPT',
    category: 'directory'
  },
  {
    url: 'https://topaihub.com/',
    name: 'Top AI Tools Hub',
    description: 'Top AI Tools Directory',
    category: 'directory'
  },
  {
    url: 'https://topai.tools/',
    name: 'TopAI.tools',
    description: 'Discover the best AI tools Everyday',
    category: 'directory'
  },
  {
    url: 'https://toolpilot.ai/',
    name: 'Tool Pilot',
    description: 'Navigate the World of AI Tools',
    category: 'directory'
  },
  {
    url: 'https://toptools.ai/',
    name: 'Top Tools',
    description: 'AI Tools Directory',
    category: 'directory'
  }
];

// Enhanced extraction schema for real AI tools
const aiToolExtractionSchema = {
  type: 'object',
  properties: {
    tools: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          name: {
            type: 'string',
            description: 'The official name of the AI tool or software'
          },
          description: {
            type: 'string',
            description: 'A comprehensive description of what the AI tool does and its main purpose'
          },
          category: {
            type: 'string',
            description: 'The primary category (e.g., Content Creation, Image Generation, Code Generation, Voice AI, Video Generation, Data Analysis, etc.)'
          },
          subcategory: {
            type: 'string',
            description: 'More specific subcategory if available'
          },
          website: {
            type: 'string',
            format: 'uri',
            description: 'Official website URL of the AI tool'
          },
          pricing: {
            type: 'object',
            properties: {
              model: {
                type: 'string',
                enum: ['free', 'freemium', 'paid', 'custom', 'open-source'],
                description: 'Pricing model type'
              },
              hasFree: {
                type: 'boolean',
                description: 'Whether the tool offers a free plan or trial'
              },
              startingPrice: {
                type: 'number',
                description: 'Starting price per month in USD if available'
              },
              pricingDetails: {
                type: 'string',
                description: 'Additional pricing information'
              }
            }
          },
          features: {
            type: 'array',
            items: {
              type: 'string'
            },
            description: 'Key features and capabilities of the tool'
          },
          useCases: {
            type: 'array',
            items: {
              type: 'string'
            },
            description: 'Primary use cases and applications'
          },
          rating: {
            type: 'number',
            minimum: 0,
            maximum: 5,
            description: 'User rating out of 5 if available'
          },
          reviewCount: {
            type: 'integer',
            description: 'Number of user reviews if available'
          },
          tags: {
            type: 'array',
            items: {
              type: 'string'
            },
            description: 'Relevant tags or keywords'
          },
          developer: {
            type: 'string',
            description: 'Company or developer name'
          },
          launched: {
            type: 'string',
            description: 'Launch date or year if available'
          }
        },
        required: ['name', 'description', 'website']
      }
    }
  },
  required: ['tools']
};

// Enhanced category mapping for SiteOptz format
const siteOptzCategoryMap = {
  // Content & Writing
  'content creation': 'Content Creation',
  'content': 'Content Creation',
  'writing': 'Content Creation', 
  'text generation': 'Content Creation',
  'copywriting': 'Content Creation',
  'blogging': 'Content Creation',
  'article writing': 'Content Creation',
  'technical writing': 'Content Creation',
  
  // Visual Content
  'image generation': 'Image Generation',
  'image': 'Image Generation',
  'art': 'Image Generation',
  'design': 'Design',
  'graphics': 'Image Generation',
  'photo editing': 'Image Generation',
  'logo design': 'Design',
  
  // Video
  'video generation': 'Video Generation',
  'video': 'Video Generation',
  'video editing': 'Video Generation',
  'animation': 'Video Generation',
  
  // Audio & Voice
  'voice': 'Voice AI',
  'audio': 'Best Voice AI Tools',
  'music': 'Best Voice AI Tools',
  'text-to-speech': 'Voice AI',
  'speech': 'Voice AI',
  'podcast': 'Best Voice AI Tools',
  'voice generation': 'Voice AI',
  'voice synthesis': 'Voice AI',
  
  // Development
  'code generation': 'Code Generation',
  'coding': 'Code Generation',
  'programming': 'Code Generation',
  'development': 'Code Generation',
  'developer tools': 'Code Generation',
  'no-code': 'Code Generation',
  'low-code': 'Code Generation',
  
  // Data & Analytics
  'data analysis': 'Data Analysis',
  'analytics': 'Data Analysis',
  'business intelligence': 'Data Analysis',
  'data science': 'Data Analysis',
  'data visualization': 'Data Analysis',
  
  // Business & Marketing
  'seo': 'SEO & Optimization',
  'marketing': 'Social Media',
  'social media': 'Social Media',
  'email marketing': 'Email Marketing',
  'lead generation': 'Lead Generation',
  'sales': 'Lead Generation',
  'crm': 'Lead Generation',
  'customer support': 'Lead Generation',
  'paid search': 'Paid Search & PPC',
  'ppc': 'Paid Search & PPC',
  'advertising': 'Paid Search & PPC',
  
  // Education & Research
  'education': 'Research & Education',
  'research': 'Research & Education',
  'learning': 'Research & Education',
  'study': 'Research & Education',
  'academic': 'Research & Education',
  
  // Productivity & Automation
  'productivity': 'Productivity',
  'automation': 'AI Automation',
  'workflow': 'AI Automation',
  'task management': 'Productivity',
  'project management': 'Productivity',
  
  // Specialized
  'finance': 'Finance AI',
  'legal': 'Finance AI',
  'healthcare': 'Research & Education',
  'hr': 'Productivity',
  'recruiting': 'Lead Generation',
  'e-commerce': 'E-commerce',
  'website': 'AI Website Builder',
  'website builder': 'AI Website Builder'
};

// Normalize category to SiteOptz format
function normalizeCategoryToSiteOptz(category, subcategory = '') {
  if (!category) return 'Productivity';
  
  const searchText = `${category} ${subcategory}`.toLowerCase().trim();
  
  // Direct match
  if (siteOptzCategoryMap[searchText]) {
    return siteOptzCategoryMap[searchText];
  }
  
  // Check for partial matches
  for (const [key, value] of Object.entries(siteOptzCategoryMap)) {
    if (searchText.includes(key) || key.includes(searchText)) {
      return value;
    }
  }
  
  // Default fallback
  return 'Productivity';
}

// Generate realistic pricing structure
function generatePricingStructure(pricingInfo) {
  const pricing = [];
  
  if (pricingInfo?.hasFree || pricingInfo?.model === 'free') {
    pricing.push({
      plan: "Free",
      price_per_month: 0,
      features: ["Basic features", "Limited usage", "Community support"]
    });
  }
  
  if (pricingInfo?.model === 'freemium' || pricingInfo?.startingPrice) {
    const proPrice = pricingInfo.startingPrice || 29;
    pricing.push({
      plan: "Pro",
      price_per_month: proPrice,
      features: ["Advanced features", "Higher usage limits", "Email support"]
    });
  }
  
  if (pricingInfo?.model === 'paid' || pricing.length > 0) {
    const enterprisePrice = pricingInfo?.startingPrice ? pricingInfo.startingPrice * 3 : 99;
    pricing.push({
      plan: "Enterprise", 
      price_per_month: enterprisePrice,
      features: ["Premium features", "Unlimited usage", "Priority support", "Custom solutions"]
    });
  }
  
  // Default if no pricing info
  if (pricing.length === 0) {
    pricing.push({
      plan: "Contact Sales",
      price_per_month: "Contact for pricing",
      features: ["Custom pricing", "Tailored solutions", "Dedicated support"]
    });
  }
  
  return pricing;
}

// Process and format tool data for SiteOptz
function formatToolForSiteOptz(tool, source) {
  const toolId = tool.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
  const category = normalizeCategoryToSiteOptz(tool.category, tool.subcategory);
  
  return {
    id: toolId,
    name: tool.name.trim(),
    slug: toolId,
    logo: `/images/tools/${toolId}-logo.svg`,
    meta: {
      title: `${tool.name} Review: ${tool.description?.substring(0, 50)}... [2025] | SiteOptz`,
      description: `${tool.name} review. ${tool.description?.substring(0, 100)}... Features, pricing & alternatives compared.`
    },
    overview: {
      developer: tool.developer || tool.name,
      release_year: tool.launched ? parseInt(tool.launched) || 2024 : 2024,
      description: tool.description || `${tool.name} is an AI-powered tool that helps users enhance their productivity.`,
      category: category,
      website: tool.website
    },
    features: tool.features && tool.features.length > 0 ? tool.features.slice(0, 6) : [
      "AI-powered functionality",
      "User-friendly interface",
      "Fast processing",
      "Reliable performance",
      "Regular updates",
      "Customer support"
    ],
    pros: tool.useCases && tool.useCases.length > 0 ? tool.useCases.slice(0, 4) : [
      "Easy to use",
      "Good performance",
      "Competitive pricing",
      "Regular updates"
    ],
    cons: [
      "Learning curve for beginners",
      "Limited free features",
      "Requires internet connection"
    ],
    pricing: generatePricingStructure(tool.pricing),
    rating: tool.rating || 4.2,
    search_volume: tool.reviewCount || 1000,
    cpc: 2.50,
    benchmarks: {
      speed: 8,
      accuracy: 8,
      integration: 7,
      ease_of_use: 8,
      value: 8
    },
    sourceInfo: {
      scrapedFrom: source.name,
      sourceUrl: source.url,
      scrapedAt: new Date().toISOString()
    }
  };
}

// Scrape tools from a single directory
async function scrapeDirectory(source) {
  console.log(`\n🔍 Scraping ${source.name}...`);
  
  try {
    const scrapeResult = await app.scrapeUrl(source.url, {
      formats: [{
        type: "json",
        prompt: `Extract all legitimate AI tools from this AI tools directory. 
                 Focus on actual AI software tools, applications, and platforms. 
                 Ignore navigation elements, categories, filters, or website UI components.
                 For each AI tool, extract its name, description, category, official website, pricing model, and key features.
                 Only include tools that have a clear purpose and official website.`,
        schema: aiToolExtractionSchema
      }],
      onlyMainContent: true,
      waitFor: 3000,
      timeout: 30000
    });
    
    if (scrapeResult.success) {
      const extractedData = scrapeResult.formats?.[0] || scrapeResult.llm_extraction;
      
      if (extractedData?.tools && Array.isArray(extractedData.tools)) {
        const validTools = extractedData.tools.filter(tool => {
          // Filter out obvious navigation/UI elements
          const name = tool.name?.toLowerCase() || '';
          const invalidNames = [
            'home', 'login', 'sign up', 'menu', 'search', 'filter', 'category',
            'new', 'popular', 'trending', 'more', 'all', 'view all', 'browse',
            'profile', 'settings', 'help', 'about', 'contact', 'pricing'
          ];
          
          if (invalidNames.some(invalid => name === invalid || name.includes('profile picture'))) {
            return false;
          }
          
          // Must have name, description, and website
          return tool.name && tool.description && tool.website && 
                 tool.website.includes('http') && 
                 tool.description.length > 20 &&
                 !tool.website.includes(source.url.split('/')[2]); // Not a self-referential link
        });
        
        console.log(`✅ Found ${validTools.length} valid AI tools from ${source.name}`);
        
        if (validTools.length > 0) {
          return validTools.map(tool => formatToolForSiteOptz(tool, source));
        }
      }
    }
    
    console.log(`⚠️ No valid tools extracted from ${source.name}`);
    return [];
    
  } catch (error) {
    console.error(`❌ Error scraping ${source.name}:`, error.message);
    return [];
  }
}

// Main comprehensive scraping function
async function comprehensiveAIScrape() {
  console.log('🚀 Starting comprehensive AI tools scraping...\n');
  console.log(`📊 Will scrape ${aiDirectorySources.length} AI tool directories\n`);
  
  const allScrapedTools = [];
  const successfulSources = [];
  const failedSources = [];
  
  // Scrape each directory with rate limiting
  for (let i = 0; i < aiDirectorySources.length; i++) {
    const source = aiDirectorySources[i];
    
    console.log(`\n[${i + 1}/${aiDirectorySources.length}] Processing ${source.name}...`);
    
    try {
      const tools = await scrapeDirectory(source);
      
      if (tools && tools.length > 0) {
        allScrapedTools.push(...tools);
        successfulSources.push({
          name: source.name,
          url: source.url,
          toolsFound: tools.length
        });
        console.log(`✅ Successfully scraped ${tools.length} tools`);
      } else {
        failedSources.push({
          name: source.name, 
          url: source.url,
          reason: 'No valid tools found'
        });
      }
      
      // Rate limiting: 5 second delay between requests
      if (i < aiDirectorySources.length - 1) {
        console.log('⏳ Waiting 5 seconds before next source...');
        await new Promise(resolve => setTimeout(resolve, 5000));
      }
      
    } catch (error) {
      console.error(`❌ Failed to scrape ${source.name}:`, error.message);
      failedSources.push({
        name: source.name,
        url: source.url, 
        reason: error.message
      });
    }
  }
  
  console.log(`\n📊 Scraping Complete!`);
  console.log(`✅ Successful sources: ${successfulSources.length}`);
  console.log(`❌ Failed sources: ${failedSources.length}`);
  console.log(`🔢 Total tools scraped: ${allScrapedTools.length}`);
  
  if (allScrapedTools.length === 0) {
    console.log('⚠️ No tools were successfully scraped');
    return [];
  }
  
  // Remove duplicates based on name and website
  console.log('\n🔍 Removing duplicates...');
  const uniqueTools = [];
  const seenTools = new Set();
  
  for (const tool of allScrapedTools) {
    const key = `${tool.name.toLowerCase()}-${tool.overview.website}`;
    if (!seenTools.has(key)) {
      seenTools.add(key);
      uniqueTools.push(tool);
    }
  }
  
  console.log(`📉 Removed ${allScrapedTools.length - uniqueTools.length} duplicates`);
  console.log(`✅ Final unique tools: ${uniqueTools.length}`);
  
  // Category analysis
  const categories = {};
  uniqueTools.forEach(tool => {
    const cat = tool.overview.category;
    categories[cat] = (categories[cat] || 0) + 1;
  });
  
  console.log('\n📋 Tools by category:');
  Object.entries(categories)
    .sort(([,a], [,b]) => b - a)
    .forEach(([category, count]) => {
      console.log(`  • ${category}: ${count} tools`);
    });
  
  // Save results
  const outputDir = path.join(__dirname, 'data', 'scraped');
  await fs.mkdir(outputDir, { recursive: true });
  
  const timestamp = new Date().toISOString();
  const results = {
    tools: uniqueTools,
    metadata: {
      totalScraped: allScrapedTools.length,
      uniqueTools: uniqueTools.length,
      duplicatesRemoved: allScrapedTools.length - uniqueTools.length,
      successfulSources: successfulSources.length,
      failedSources: failedSources.length,
      categories: Object.keys(categories).length,
      scrapedAt: timestamp
    },
    sources: {
      successful: successfulSources,
      failed: failedSources
    },
    categoryDistribution: categories
  };
  
  const outputPath = path.join(outputDir, 'comprehensive-ai-tools.json');
  await fs.writeFile(outputPath, JSON.stringify(results, null, 2));
  
  console.log(`\n💾 Results saved to: ${outputPath}`);
  console.log('\n🎉 Comprehensive AI scraping completed!');
  
  return uniqueTools;
}

// Export for use in other scripts
module.exports = {
  comprehensiveAIScrape,
  scrapeDirectory,
  formatToolForSiteOptz,
  aiDirectorySources
};

// Run if called directly
if (require.main === module) {
  comprehensiveAIScrape()
    .then((tools) => {
      console.log(`\n✨ Successfully scraped ${tools.length} legitimate AI tools!`);
      process.exit(0);
    })
    .catch(error => {
      console.error('\n💥 Fatal error:', error);
      process.exit(1);
    });
}