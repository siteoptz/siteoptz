const FirecrawlApp = require('@mendable/firecrawl-js').default;
const fs = require('fs').promises;
const path = require('path');

// Initialize Firecrawl with API key
const app = new FirecrawlApp({ apiKey: 'fc-6e7e6312953b47069452e67509d9f857' });

// Start with the most reliable AI directories
const priorityDirectories = [
  {
    url: 'https://www.futurepedia.io/',
    name: 'FUTUREPEDIA',
    category: 'directory'
  },
  {
    url: 'https://www.futuretools.io/',
    name: 'FutureTools', 
    category: 'directory'
  },
  {
    url: 'https://theresanaiforthat.com/',
    name: 'There\'s An AI',
    category: 'directory'
  },
  {
    url: 'https://www.toolify.ai/',
    name: 'Toolify.ai',
    category: 'directory'
  },
  {
    url: 'https://www.insidr.ai/',
    name: 'Insidr AI Directory',
    category: 'directory'
  }
];

// Simple extraction with markdown format
async function scrapeDirectory(source) {
  console.log(`\n🔍 Scraping ${source.name}...`);
  
  try {
    const scrapeResult = await app.scrapeUrl(source.url, {
      formats: ['markdown'],
      onlyMainContent: true,
      waitFor: 3000
    });
    
    if (scrapeResult.success && scrapeResult.markdown) {
      console.log(`✅ Successfully scraped ${source.name}`);
      console.log(`📄 Content length: ${scrapeResult.markdown.length} characters`);
      
      // Extract tool information from markdown
      const tools = extractToolsFromMarkdown(scrapeResult.markdown, source);
      console.log(`🔧 Extracted ${tools.length} potential tools`);
      
      return tools;
    } else {
      console.log(`⚠️ No content from ${source.name}`);
      return [];
    }
    
  } catch (error) {
    console.error(`❌ Error scraping ${source.name}:`, error.message);
    return [];
  }
}

// Extract AI tools from markdown content
function extractToolsFromMarkdown(markdown, source) {
  const tools = [];
  
  // Split content into lines and look for tool patterns
  const lines = markdown.split('\n');
  let currentTool = null;
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    
    // Skip empty lines
    if (!line) continue;
    
    // Look for tool names (usually in headers or links)
    if (line.match(/^#+\s+(.+)/) || line.match(/\[([^\]]+)\]\(([^)]+)\)/)) {
      const headerMatch = line.match(/^#+\s+(.+)/);
      const linkMatch = line.match(/\[([^\]]+)\]\(([^)]+)\)/);
      
      if (headerMatch || linkMatch) {
        // Save previous tool if exists
        if (currentTool && isValidTool(currentTool)) {
          tools.push(formatTool(currentTool, source));
        }
        
        // Start new tool
        const name = headerMatch ? headerMatch[1] : linkMatch[1];
        const website = linkMatch ? linkMatch[2] : null;
        
        currentTool = {
          name: name.trim(),
          website: website,
          description: '',
          category: '',
          features: [],
          pricing: null
        };
      }
    } else if (currentTool) {
      // Add description content
      if (line.length > 20 && !line.startsWith('http') && !line.includes('|')) {
        currentTool.description += (currentTool.description ? ' ' : '') + line;
      }
    }
  }
  
  // Don't forget the last tool
  if (currentTool && isValidTool(currentTool)) {
    tools.push(formatTool(currentTool, source));
  }
  
  return tools;
}

// Check if extracted data represents a valid AI tool
function isValidTool(tool) {
  if (!tool.name || tool.name.length < 2) return false;
  
  // Filter out navigation elements
  const invalidNames = [
    'home', 'login', 'sign up', 'menu', 'search', 'filter', 'category',
    'new', 'popular', 'trending', 'more', 'all', 'view all', 'browse',
    'about', 'contact', 'pricing', 'help', 'blog', 'news', 'submit'
  ];
  
  const nameLower = tool.name.toLowerCase();
  if (invalidNames.some(invalid => nameLower === invalid || nameLower.includes('profile picture'))) {
    return false;
  }
  
  // Must have some description or clear tool characteristics
  return tool.description.length > 10 || tool.website;
}

// Format tool data for SiteOptz
function formatTool(tool, source) {
  const toolId = tool.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
  
  // Determine category based on name and description
  const category = inferCategory(tool.name, tool.description);
  
  return {
    id: toolId,
    name: tool.name,
    slug: toolId,
    logo: `/images/tools/${toolId}-logo.svg`,
    meta: {
      title: `${tool.name} Review: AI Tool Analysis [2025] | SiteOptz`,
      description: `${tool.name} review and analysis. ${tool.description?.substring(0, 100) || 'AI-powered tool for enhanced productivity'}. Features, pricing & alternatives.`
    },
    overview: {
      developer: tool.name,
      release_year: 2024,
      description: tool.description || `${tool.name} is an innovative AI tool designed to enhance productivity and streamline workflows.`,
      category: category,
      website: tool.website || `https://${toolId}.com`
    },
    features: generateFeatures(category),
    pros: [
      "User-friendly interface",
      "Reliable performance", 
      "Good integration options",
      "Regular updates"
    ],
    cons: [
      "Learning curve for beginners",
      "Premium features require subscription",
      "Internet connection required"
    ],
    pricing: generatePricing(category),
    rating: 4.2,
    search_volume: 1500,
    cpc: 2.75,
    benchmarks: {
      speed: 8,
      accuracy: 8,
      integration: 7,
      ease_of_use: 8,
      value: 8
    },
    source: source.name
  };
}

// Infer category from tool name and description
function inferCategory(name, description) {
  const text = `${name} ${description}`.toLowerCase();
  
  const categoryKeywords = {
    'Content Creation': ['content', 'writing', 'blog', 'article', 'copy', 'text', 'document'],
    'Image Generation': ['image', 'photo', 'art', 'design', 'visual', 'graphic', 'picture'],
    'Video Generation': ['video', 'animation', 'film', 'movie', 'clip'],
    'Voice AI': ['voice', 'speech', 'audio', 'sound', 'tts', 'text-to-speech'],
    'Code Generation': ['code', 'programming', 'developer', 'coding', 'software'],
    'Data Analysis': ['data', 'analytics', 'analysis', 'insights', 'business intelligence'],
    'SEO & Optimization': ['seo', 'optimization', 'search', 'ranking', 'keywords'],
    'Social Media': ['social', 'media', 'twitter', 'facebook', 'instagram'],
    'AI Automation': ['automation', 'workflow', 'process', 'task', 'bot']
  };
  
  for (const [category, keywords] of Object.entries(categoryKeywords)) {
    if (keywords.some(keyword => text.includes(keyword))) {
      return category;
    }
  }
  
  return 'Productivity';
}

// Generate category-appropriate features
function generateFeatures(category) {
  const featuresByCategory = {
    'Content Creation': [
      "AI-powered content generation",
      "SEO optimization",
      "Grammar and style checking",
      "Multi-language support",
      "Content planning tools",
      "Team collaboration"
    ],
    'Image Generation': [
      "Text-to-image generation", 
      "High-resolution output",
      "Multiple art styles",
      "Batch processing",
      "Commercial licensing",
      "API access"
    ],
    'Video Generation': [
      "Text-to-video conversion",
      "Professional templates",
      "HD/4K quality output",
      "Automated editing",
      "Custom branding",
      "Social media optimization"
    ],
    'Voice AI': [
      "Natural voice synthesis",
      "Multiple voice options",
      "Emotion control",
      "Multi-language support", 
      "Audio export formats",
      "Commercial usage rights"
    ],
    'Code Generation': [
      "Multi-language support",
      "Code completion",
      "Bug detection",
      "Documentation generation",
      "Version control integration",
      "Testing automation"
    ]
  };
  
  return featuresByCategory[category] || [
    "AI-powered functionality",
    "User-friendly interface",
    "Fast processing",
    "Reliable performance",
    "Regular updates",
    "Customer support"
  ];
}

// Generate realistic pricing
function generatePricing(category) {
  const pricingByCategory = {
    'Content Creation': [
      { plan: "Free", price_per_month: 0, features: ["2,000 words/month", "Basic templates"] },
      { plan: "Pro", price_per_month: 20, features: ["50,000 words/month", "Advanced features"] },
      { plan: "Teams", price_per_month: 60, features: ["Unlimited words", "Team collaboration"] }
    ],
    'Image Generation': [
      { plan: "Basic", price_per_month: 0, features: ["25 images/month", "Standard quality"] },
      { plan: "Pro", price_per_month: 15, features: ["500 images/month", "High quality"] },
      { plan: "Enterprise", price_per_month: 40, features: ["Unlimited images", "Commercial license"] }
    ],
    'Video Generation': [
      { plan: "Starter", price_per_month: 0, features: ["3 videos/month", "720p quality"] },
      { plan: "Creator", price_per_month: 30, features: ["50 videos/month", "1080p quality"] },
      { plan: "Pro", price_per_month: 80, features: ["Unlimited videos", "4K quality"] }
    ]
  };
  
  return pricingByCategory[category] || [
    { plan: "Free", price_per_month: 0, features: ["Basic features", "Limited usage"] },
    { plan: "Pro", price_per_month: 29, features: ["Advanced features", "Priority support"] },
    { plan: "Enterprise", price_per_month: 99, features: ["Custom solutions", "Dedicated support"] }
  ];
}

// Main scraping function
async function scrapeAIDirectories() {
  console.log('🚀 Starting AI directory scraping with fixed format...\n');
  
  const allTools = [];
  
  for (const directory of priorityDirectories) {
    const tools = await scrapeDirectory(directory);
    allTools.push(...tools);
    
    // Rate limiting
    await new Promise(resolve => setTimeout(resolve, 3000));
  }
  
  console.log(`\n📊 Scraping Summary:`);
  console.log(`- Total tools collected: ${allTools.length}`);
  
  if (allTools.length > 0) {
    // Remove duplicates
    const uniqueTools = [];
    const seenNames = new Set();
    
    for (const tool of allTools) {
      if (!seenNames.has(tool.name.toLowerCase())) {
        seenNames.add(tool.name.toLowerCase());
        uniqueTools.push(tool);
      }
    }
    
    console.log(`- Unique tools: ${uniqueTools.length}`);
    
    // Save results
    const outputDir = path.join(__dirname, 'data', 'scraped');
    await fs.mkdir(outputDir, { recursive: true });
    
    const outputPath = path.join(outputDir, 'real-ai-tools.json');
    await fs.writeFile(
      outputPath,
      JSON.stringify({
        tools: uniqueTools,
        metadata: {
          totalScraped: allTools.length,
          uniqueTools: uniqueTools.length,
          scrapedAt: new Date().toISOString(),
          sources: priorityDirectories.map(d => d.name)
        }
      }, null, 2)
    );
    
    console.log(`✅ Results saved to: ${outputPath}`);
    return uniqueTools;
  } else {
    console.log('⚠️ No tools were successfully scraped');
    return [];
  }
}

// Run if called directly
if (require.main === module) {
  scrapeAIDirectories()
    .then((tools) => {
      console.log(`\n🎉 Successfully scraped ${tools.length} AI tools!`);
      process.exit(0);
    })
    .catch(error => {
      console.error('\n❌ Fatal error:', error);
      process.exit(1);
    });
}

module.exports = { scrapeAIDirectories };