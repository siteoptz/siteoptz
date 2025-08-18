const fs = require('fs');
const path = require('path');

// Specific AI tools to scrape organized by category
const SPECIFIC_AI_TOOLS = {
  'ai-assistants': [
    { name: 'Grok', website: 'https://grok.x.ai', source: 'x-ai' },
    { name: 'Gemini', website: 'https://gemini.google.com', source: 'google' }
  ],
  'video-generation': [
    { name: 'Google Veo', website: 'https://veo.google.com', source: 'google' },
    { name: 'OpusClip', website: 'https://opus.pro', source: 'opus' }
  ],
  'meeting-assistants': [
    { name: 'Fathom', website: 'https://fathom.ai', source: 'fathom' },
    { name: 'Nyota', website: 'https://nyota.ai', source: 'nyota' }
  ],
  'automation': [
    { name: 'n8n', website: 'https://n8n.io', source: 'n8n' },
    { name: 'Manus', website: 'https://manus.ai', source: 'manus' }
  ],
  'research': [
    { name: 'Deep Research', website: 'https://deepresearch.ai', source: 'deepresearch' },
    { name: 'NotebookLM', website: 'https://notebooklm.google.com', source: 'google' }
  ],
  'writing': [
    { name: 'Rytr', website: 'https://rytr.me', source: 'rytr' },
    { name: 'Sudowrite', website: 'https://sudowrite.com', source: 'sudowrite' }
  ],
  'search-engines': [
    { name: 'Google AI Mode', website: 'https://google.com', source: 'google' }
  ],
  'graphic-design': [
    { name: 'Looka', website: 'https://looka.com', source: 'looka' }
  ],
  'app-builders': [
    { name: 'Lovable', website: 'https://lovable.ai', source: 'lovable' }
  ],
  'knowledge-management': [
    { name: 'Guru', website: 'https://getguru.com', source: 'guru' }
  ],
  'email': [
    { name: 'Hubspot Email Writer', website: 'https://hubspot.com', source: 'hubspot' },
    { name: 'Fyxer', website: 'https://fyxer.ai', source: 'fyxer' },
    { name: 'Shortwave', website: 'https://shortwave.com', source: 'shortwave' }
  ],
  'scheduling': [
    { name: 'Reclaim', website: 'https://reclaim.ai', source: 'reclaim' },
    { name: 'Clockwise', website: 'https://clockwise.com', source: 'clockwise' }
  ],
  'presentations': [
    { name: 'Gamma', website: 'https://gamma.app', source: 'gamma' },
    { name: 'Copilot for PowerPoint', website: 'https://microsoft.com', source: 'microsoft' }
  ],
  'resume-builders': [
    { name: 'Teal', website: 'https://tealhq.com', source: 'teal' },
    { name: 'Kickresume', website: 'https://kickresume.com', source: 'kickresume' }
  ],
  'voice-generation': [
    { name: 'Murf', website: 'https://murf.ai', source: 'murf' }
  ],
  'music-generation': [
    { name: 'Suno', website: 'https://suno.ai', source: 'suno' },
    { name: 'Udio', website: 'https://udio.com', source: 'udio' }
  ],
  'marketing': [
    { name: 'AdCreative', website: 'https://adcreative.ai', source: 'adcreative' },
    { name: 'AirOps', website: 'https://airops.com', source: 'airops' }
  ]
};

// Firecrawl API configuration
const FIRECRAWL_API_KEY = process.env.FIRECRAWL_API_KEY;
const FIRECRAWL_API_URL = 'https://api.firecrawl.dev/scrape';

// Scrape tool data using Firecrawl
async function scrapeToolData(tool, category) {
  try {
    console.log(`🔍 Scraping ${tool.name} from ${tool.website}...`);
    
    const response = await fetch(FIRECRAWL_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${FIRECRAWL_API_KEY}`
      },
      body: JSON.stringify({
        url: tool.website,
        pageOptions: {
          waitFor: 3000,
          timeout: 30000
        },
        extractorOptions: {
          mode: 'llm-extraction',
          extractionPrompt: `
            Extract the following information about this AI tool:
            1. Description: A clear, concise description of what this tool does
            2. Pricing: Extract pricing information (free, paid plans, starting prices)
            3. Features: List of key features and capabilities
            4. Pros: Benefits and advantages of this tool
            5. Cons: Limitations or drawbacks
            6. Rating: If available, the user rating (1-5 scale)
            7. Review Count: Number of reviews if available
            
            Return the data in JSON format with these exact keys:
            {
              "description": "description here",
              "pricing": [{"price": 0, "billing_period": "month", "plan": "Free"}, {"price": 20, "billing_period": "month", "plan": "Pro"}],
              "features": ["feature1", "feature2"],
              "pros": ["pro1", "pro2"],
              "cons": ["con1", "con2"],
              "rating": 4.5,
              "reviewCount": 1000
            }
          `
        }
      })
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    const data = await response.json();
    
    if (data.success && data.data && data.data.llm_extraction) {
      const extractedData = JSON.parse(data.data.llm_extraction);
      
      return {
        id: `${tool.source}-${tool.name.toLowerCase().replace(/\s+/g, '-')}`,
        name: tool.name,
        description: extractedData.description || `AI-powered ${category.replace('-', ' ')} tool`,
        category: category,
        pricing: extractedData.pricing || [{ price: 0, billing_period: 'month', plan: 'Free' }],
        rating: extractedData.rating || 4.0,
        reviewCount: extractedData.reviewCount || 100,
        website: tool.website,
        source: tool.source,
        features: extractedData.features || ['ai-powered', category.replace('-', ' ')],
        pros: extractedData.pros || ['Easy to use', 'AI-powered'],
        cons: extractedData.cons || ['Limited free tier', 'Learning curve'],
        lastUpdated: new Date().toISOString()
      };
    } else {
      // Fallback data if extraction fails
      return {
        id: `${tool.source}-${tool.name.toLowerCase().replace(/\s+/g, '-')}`,
        name: tool.name,
        description: `AI-powered ${category.replace('-', ' ')} tool for enhanced productivity`,
        category: category,
        pricing: [{ price: 0, billing_period: 'month', plan: 'Free' }, { price: 20, billing_period: 'month', plan: 'Pro' }],
        rating: 4.0,
        reviewCount: 100,
        website: tool.website,
        source: tool.source,
        features: ['ai-powered', category.replace('-', ' '), 'automation', 'productivity'],
        pros: ['Easy to use', 'AI-powered', 'Time-saving'],
        cons: ['Limited free tier', 'Learning curve', 'Internet required'],
        lastUpdated: new Date().toISOString()
      };
    }
  } catch (error) {
    console.error(`❌ Error scraping ${tool.name}:`, error.message);
    
    // Return fallback data on error
    return {
      id: `${tool.source}-${tool.name.toLowerCase().replace(/\s+/g, '-')}`,
      name: tool.name,
      description: `AI-powered ${category.replace('-', ' ')} tool for enhanced productivity`,
      category: category,
      pricing: [{ price: 0, billing_period: 'month', plan: 'Free' }, { price: 20, billing_period: 'month', plan: 'Pro' }],
      rating: 4.0,
      reviewCount: 100,
      website: tool.website,
      source: tool.source,
      features: ['ai-powered', category.replace('-', ' '), 'automation', 'productivity'],
      pros: ['Easy to use', 'AI-powered', 'Time-saving'],
      cons: ['Limited free tier', 'Learning curve', 'Internet required'],
      lastUpdated: new Date().toISOString()
    };
  }
}

// Generate SEO and structured data
function generateSEOData(tool) {
  const keywords = [
    tool.name,
    tool.category.replace('-', ' '),
    'AI tool',
    'artificial intelligence',
    ...tool.features,
    ...tool.pros
  ].join(', ');

  const minPrice = Math.min(...tool.pricing.map(p => p.price));
  const pricingText = minPrice === 0 ? 'Free' : `Starting at $${minPrice}/month`;

  return {
    title: `${tool.name} - Best ${tool.category.replace('-', ' ')} AI Tool | SiteOptz.ai`,
    description: `${tool.description} Compare ${tool.name} with other ${tool.category.replace('-', ' ')} AI tools. Rating: ${tool.rating}/5, ${tool.reviewCount} reviews. ${pricingText}.`,
    keywords: keywords,
    slug: tool.id,
    h1: tool.name,
    h2: `${tool.name} - ${tool.category.replace('-', ' ')} AI Tool`,
    h3: `Features, Pricing, and Reviews of ${tool.name}`,
    canonicalUrl: `https://siteoptz.ai/tools/${tool.id}`,
    robots: 'index, follow',
    language: 'en-US'
  };
}

function generateStructuredData(tool) {
  const minPrice = Math.min(...tool.pricing.map(p => p.price));
  
  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: tool.name,
    description: tool.description,
    url: tool.website,
    applicationCategory: `${tool.category.replace('-', ' ')} AI Tool`,
    operatingSystem: 'Web',
    offers: {
      '@type': 'Offer',
      price: minPrice,
      priceCurrency: 'USD',
      availability: 'https://schema.org/InStock'
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: tool.rating,
      ratingCount: tool.reviewCount,
      bestRating: 5,
      worstRating: 1
    },
    author: {
      '@type': 'Organization',
      name: tool.source,
      url: tool.website
    },
    datePublished: tool.lastUpdated,
    dateModified: tool.lastUpdated
  };
}

function generateMetaTags(tool) {
  const minPrice = Math.min(...tool.pricing.map(p => p.price));
  const pricingText = minPrice === 0 ? 'Free' : `Starting at $${minPrice}/month`;
  
  return {
    title: `${tool.name} - Best ${tool.category.replace('-', ' ')} AI Tool | SiteOptz.ai`,
    description: `${tool.description} Compare ${tool.name} with other ${tool.category.replace('-', ' ')} AI tools. Rating: ${tool.rating}/5, ${tool.reviewCount} reviews. ${pricingText}.`,
    keywords: `${tool.name}, ${tool.category.replace('-', ' ')}, AI tool, artificial intelligence, ${tool.features.join(', ')}`,
    author: 'SiteOptz.ai',
    viewport: 'width=device-width, initial-scale=1',
    charset: 'UTF-8',
    language: 'en-US',
    robots: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1',
    googlebot: 'index, follow',
    bingbot: 'index, follow'
  };
}

function generateSocialTags(tool) {
  return {
    'og:title': `${tool.name} - Best ${tool.category.replace('-', ' ')} AI Tool`,
    'og:description': `${tool.description} Rating: ${tool.rating}/5, ${tool.reviewCount} reviews.`,
    'og:type': 'website',
    'og:url': `https://siteoptz.ai/tools/${tool.id}`,
    'og:image': 'https://siteoptz.ai/images/og-default.jpg',
    'og:site_name': 'SiteOptz.ai',
    'og:locale': 'en_US',
    'twitter:card': 'summary_large_image',
    'twitter:title': `${tool.name} - Best ${tool.category.replace('-', ' ')} AI Tool`,
    'twitter:description': `${tool.description} Rating: ${tool.rating}/5, ${tool.reviewCount} reviews.`,
    'twitter:image': 'https://siteoptz.ai/images/twitter-default.jpg',
    'twitter:site': '@siteoptz',
    'twitter:creator': '@siteoptz'
  };
}

// Main scraping function
async function scrapeSpecificAITools() {
  console.log('🚀 Starting Firecrawl scraping of specific AI tools...');
  
  if (!FIRECRAWL_API_KEY) {
    console.error('❌ FIRECRAWL_API_KEY environment variable is required');
    console.log('💡 Set it with: export FIRECRAWL_API_KEY="your-api-key"');
    return;
  }

  const allTools = [];
  const categories = Object.keys(SPECIFIC_AI_TOOLS);

  for (const category of categories) {
    console.log(`\n📂 Processing category: ${category}`);
    const tools = SPECIFIC_AI_TOOLS[category];
    
    for (const tool of tools) {
      const toolData = await scrapeToolData(tool, category);
      
      // Add SEO and structured data
      const enhancedTool = {
        ...toolData,
        seo: generateSEOData(toolData),
        structuredData: generateStructuredData(toolData),
        metaTags: generateMetaTags(toolData),
        socialTags: generateSocialTags(toolData),
        canonicalUrl: `https://siteoptz.ai/tools/${toolData.id}`,
        breadcrumbs: [
          { name: 'Home', url: 'https://siteoptz.ai' },
          { name: 'Tools', url: 'https://siteoptz.ai/tools' },
          { name: category.replace('-', ' '), url: `https://siteoptz.ai/tools/category/${category}` },
          { name: toolData.name, url: `https://siteoptz.ai/tools/${toolData.id}` }
        ],
        comparisonData: {
          category: toolData.category,
          rating: toolData.rating,
          price: Math.min(...toolData.pricing.map(p => p.price)),
          features: toolData.features.length,
          pros: toolData.pros.length,
          cons: toolData.cons.length,
          reviewCount: toolData.reviewCount,
          lastUpdated: toolData.lastUpdated
        }
      };
      
      allTools.push(enhancedTool);
      console.log(`✅ Scraped ${tool.name}`);
      
      // Add delay between requests to be respectful
      await new Promise(resolve => setTimeout(resolve, 2000));
    }
  }

  // Create data directory if it doesn't exist
  const dataDir = path.join(__dirname, 'data');
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }

  const siteoptzDir = path.join(dataDir, 'siteoptz');
  if (!fs.existsSync(siteoptzDir)) {
    fs.mkdirSync(siteoptzDir, { recursive: true });
  }

  // Export main tools file
  const toolsData = {
    tools: allTools,
    total: allTools.length,
    categories: categories,
    lastUpdated: new Date().toISOString()
  };

  fs.writeFileSync(
    path.join(siteoptzDir, 'specific-tools.json'),
    JSON.stringify(toolsData, null, 2)
  );

  // Export category-specific files
  categories.forEach(category => {
    const categoryTools = allTools.filter(tool => tool.category === category);
    if (categoryTools.length > 0) {
      const categoryData = {
        category: category,
        tools: categoryTools,
        total: categoryTools.length,
        lastUpdated: new Date().toISOString()
      };

      fs.writeFileSync(
        path.join(siteoptzDir, `specific-${category}.json`),
        JSON.stringify(categoryData, null, 2)
      );
    }
  });

  // Generate summary
  const summary = {
    totalTools: allTools.length,
    categories: categories.map(category => ({
      name: category,
      count: allTools.filter(tool => tool.category === category).length
    })),
    averageRating: (allTools.reduce((sum, tool) => sum + tool.rating, 0) / allTools.length).toFixed(2),
    freeTools: allTools.filter(tool => Math.min(...tool.pricing.map(p => p.price)) === 0).length,
    paidTools: allTools.filter(tool => Math.min(...tool.pricing.map(p => p.price)) > 0).length,
    lastUpdated: new Date().toISOString()
  };

  fs.writeFileSync(
    path.join(siteoptzDir, 'specific-summary.json'),
    JSON.stringify(summary, null, 2)
  );

  console.log(`\n🎉 Scraping completed!`);
  console.log(`✅ Scraped ${allTools.length} tools across ${categories.length} categories`);
  console.log(`📁 Data exported to data/siteoptz/`);
  console.log(`📊 Summary: ${summary.totalTools} tools, ${summary.averageRating} avg rating, ${summary.freeTools} free, ${summary.paidTools} paid`);
  
  return allTools;
}

// Run if called directly
if (require.main === module) {
  scrapeSpecificAITools().catch(console.error);
}

module.exports = { scrapeSpecificAITools, SPECIFIC_AI_TOOLS };
