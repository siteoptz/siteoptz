#!/usr/bin/env node

/**
 * Build script to populate aiToolsData.json from PRD and keyword data
 * Usage: node scripts/build-tools-data.js [--input-dir ./input] [--output ./data/aiToolsData.json]
 */

const fs = require('fs');
const path = require('path');

// Configuration
const CONFIG = {
  inputDir: process.argv.includes('--input-dir') 
    ? process.argv[process.argv.indexOf('--input-dir') + 1] 
    : './input',
  outputFile: process.argv.includes('--output') 
    ? process.argv[process.argv.indexOf('--output') + 1] 
    : './data/aiToolsData.json',
  verbose: process.argv.includes('--verbose'),
  dryRun: process.argv.includes('--dry-run')
};

// Expected input files
const INPUT_FILES = {
  prd: 'prd.json',           // Product Requirements Document
  keywords: 'keywords.json',  // Keyword data
  pricing: 'pricing.json',    // Pricing information
  features: 'features.json',  // Feature mappings
  metadata: 'metadata.json'   // Additional metadata
};

/**
 * Main build function
 */
async function buildToolsData() {
  try {
    console.log('🚀 Starting AI Tools Data Build Process...');
    
    // Load input data
    const inputData = await loadInputData();
    
    // Process and transform data
    const toolsData = await processToolsData(inputData);
    
    // Generate final structure
    const finalData = {
      metadata: {
        version: "1.0.0",
        lastUpdated: new Date().toISOString(),
        totalTools: toolsData.length,
        buildTimestamp: Date.now(),
        source: "Generated from PRD and keyword data"
      },
      tools: toolsData
    };
    
    // Write output
    if (!CONFIG.dryRun) {
      await writeOutputData(finalData);
      console.log(`✅ Successfully generated ${toolsData.length} tools in ${CONFIG.outputFile}`);
    } else {
      console.log(`🔍 Dry run - would generate ${toolsData.length} tools`);
      console.log(JSON.stringify(finalData, null, 2));
    }
    
  } catch (error) {
    console.error('❌ Build failed:', error.message);
    process.exit(1);
  }
}

/**
 * Load and validate input data files
 */
async function loadInputData() {
  const inputData = {};
  
  for (const [key, filename] of Object.entries(INPUT_FILES)) {
    const filePath = path.join(CONFIG.inputDir, filename);
    
    try {
      if (fs.existsSync(filePath)) {
        const content = fs.readFileSync(filePath, 'utf8');
        inputData[key] = JSON.parse(content);
        if (CONFIG.verbose) {
          console.log(`📁 Loaded ${filename}: ${Object.keys(inputData[key]).length} entries`);
        }
      } else {
        console.warn(`⚠️  Optional file not found: ${filename}`);
        inputData[key] = {};
      }
    } catch (error) {
      throw new Error(`Failed to load ${filename}: ${error.message}`);
    }
  }
  
  // Validate required data
  if (!inputData.prd.tools || !Array.isArray(inputData.prd.tools)) {
    throw new Error('PRD must contain a "tools" array');
  }
  
  return inputData;
}

/**
 * Process and transform input data into final tool structure
 */
async function processToolsData(inputData) {
  const { prd, keywords, pricing, features, metadata } = inputData;
  
  return prd.tools.map(tool => {
    if (CONFIG.verbose) {
      console.log(`🔧 Processing tool: ${tool.name}`);
    }
    
    return {
      // Basic Information
      id: generateToolId(tool.name),
      name: tool.name,
      vendor: tool.vendor || tool.company || 'Unknown',
      category: tool.category || categorizeToolFromKeywords(tool, keywords),
      description: tool.description || generateDescription(tool, keywords),
      
      // Visual Assets
      logo: tool.logo || `/images/tools/${generateToolId(tool.name)}-logo.png`,
      
      // Ratings and Reviews
      rating: parseFloat(tool.rating) || generateEstimatedRating(tool),
      reviewCount: parseInt(tool.reviewCount) || generateEstimatedReviewCount(tool),
      
      // Pricing Information
      pricing: processPricingData(tool, pricing),
      
      // Features
      features: processFeaturesData(tool, features, keywords),
      
      // Use Cases and Audience
      useCases: processUseCases(tool, keywords),
      targetAudience: processTargetAudience(tool, keywords),
      
      // Competitive Analysis
      pros: tool.pros || generateProsFromFeatures(tool, features),
      cons: tool.cons || generateConsFromLimitations(tool),
      
      // SEO and Marketing
      keywords: extractToolKeywords(tool, keywords),
      competitorComparisons: generateCompetitorComparisons(tool, prd.tools),
      
      // Metadata
      lastUpdated: new Date().toISOString(),
      source: tool.source || 'PRD',
      ...extractAdditionalMetadata(tool, metadata)
    };
  });
}

/**
 * Generate a URL-safe tool ID from the tool name
 */
function generateToolId(name) {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

/**
 * Categorize tool based on keywords and features
 */
function categorizeToolFromKeywords(tool, keywords) {
  const categories = {
    'AI Assistant': ['assistant', 'chatbot', 'conversation', 'chat'],
    'Content Creation': ['content', 'writing', 'blog', 'article', 'copy'],
    'Code Generation': ['code', 'programming', 'development', 'api'],
    'Image Generation': ['image', 'art', 'visual', 'design', 'photo'],
    'Data Analysis': ['data', 'analytics', 'analysis', 'research'],
    'Productivity': ['productivity', 'workflow', 'automation', 'task']
  };
  
  const toolText = `${tool.name} ${tool.description || ''} ${tool.features?.join(' ') || ''}`.toLowerCase();
  
  for (const [category, keywordList] of Object.entries(categories)) {
    if (keywordList.some(keyword => toolText.includes(keyword))) {
      return category;
    }
  }
  
  return 'AI Assistant'; // Default category
}

/**
 * Generate description from tool data and keywords
 */
function generateDescription(tool, keywords) {
  if (tool.description) return tool.description;
  
  const templates = [
    `${tool.name} is an advanced AI tool by ${tool.vendor} designed for ${tool.category?.toLowerCase() || 'various tasks'}.`,
    `A powerful ${tool.category?.toLowerCase() || 'AI'} solution from ${tool.vendor} that helps users accomplish their goals efficiently.`,
    `${tool.vendor}'s ${tool.name} offers cutting-edge AI capabilities for modern workflows.`
  ];
  
  return templates[Math.floor(Math.random() * templates.length)];
}

/**
 * Process pricing data from tool and pricing file
 */
function processPricingData(tool, pricingData) {
  const toolPricing = pricingData[tool.name] || pricingData[generateToolId(tool.name)] || {};
  
  return {
    freeTier: tool.freeTier !== undefined ? tool.freeTier : (toolPricing.freeTier || false),
    startingPrice: tool.startingPrice || toolPricing.startingPrice || 0,
    currency: tool.currency || toolPricing.currency || 'USD',
    billingCycle: tool.billingCycle || toolPricing.billingCycle || 'monthly',
    plans: tool.plans || toolPricing.plans || [
      {
        name: 'Basic',
        price: tool.startingPrice || 0,
        features: ['Basic features'],
        limitations: []
      }
    ],
    enterprise: tool.enterprise || toolPricing.enterprise || {
      available: true,
      contactRequired: true,
      customPricing: true
    }
  };
}

/**
 * Process features data from tool and features mapping
 */
function processFeaturesData(tool, featuresData, keywords) {
  const toolFeatures = featuresData[tool.name] || featuresData[generateToolId(tool.name)] || {};
  
  return {
    core: tool.coreFeatures || toolFeatures.core || generateCoreFeatures(tool, keywords),
    advanced: tool.advancedFeatures || toolFeatures.advanced || generateAdvancedFeatures(tool, keywords),
    integrations: tool.integrations || toolFeatures.integrations || generateIntegrations(tool)
  };
}

/**
 * Generate core features based on tool category and keywords
 */
function generateCoreFeatures(tool, keywords) {
  const categoryFeatures = {
    'AI Assistant': ['Natural language processing', 'Conversational AI', 'Multi-turn dialogue'],
    'Content Creation': ['Text generation', 'Content optimization', 'Writing assistance'],
    'Code Generation': ['Code completion', 'Syntax highlighting', 'Debugging assistance'],
    'Image Generation': ['Image creation', 'Style transfer', 'Image editing'],
    'Data Analysis': ['Data processing', 'Statistical analysis', 'Visualization'],
    'Productivity': ['Task automation', 'Workflow optimization', 'Time tracking']
  };
  
  return categoryFeatures[tool.category] || categoryFeatures['AI Assistant'];
}

/**
 * Generate advanced features based on tool capabilities
 */
function generateAdvancedFeatures(tool, keywords) {
  const advancedFeatures = [
    'API access',
    'Custom model training',
    'Batch processing',
    'Advanced analytics',
    'Team collaboration',
    'Custom integrations'
  ];
  
  // Select random subset based on tool tier
  const featureCount = tool.pricing?.startingPrice > 50 ? 4 : 2;
  return advancedFeatures.slice(0, featureCount);
}

/**
 * Generate integration list based on tool category
 */
function generateIntegrations(tool) {
  const commonIntegrations = ['Slack', 'Discord', 'Zapier', 'API', 'Webhook'];
  const categoryIntegrations = {
    'Content Creation': ['WordPress', 'Google Docs', 'Notion'],
    'Code Generation': ['GitHub', 'VS Code', 'Jupyter'],
    'Productivity': ['Trello', 'Asana', 'Microsoft Office']
  };
  
  return [
    ...commonIntegrations,
    ...(categoryIntegrations[tool.category] || [])
  ].slice(0, 8);
}

/**
 * Process use cases from tool data and keywords
 */
function processUseCases(tool, keywords) {
  if (tool.useCases) return tool.useCases;
  
  const categoryUseCases = {
    'AI Assistant': ['Customer support', 'Content creation', 'Research assistance'],
    'Content Creation': ['Blog writing', 'Marketing copy', 'Social media content'],
    'Code Generation': ['Software development', 'Code review', 'API development'],
    'Image Generation': ['Marketing materials', 'Social media graphics', 'Product design'],
    'Data Analysis': ['Business intelligence', 'Market research', 'Performance tracking'],
    'Productivity': ['Project management', 'Task automation', 'Team coordination']
  };
  
  return categoryUseCases[tool.category] || categoryUseCases['AI Assistant'];
}

/**
 * Process target audience from tool data
 */
function processTargetAudience(tool, keywords) {
  if (tool.targetAudience) return tool.targetAudience;
  
  const categoryAudience = {
    'AI Assistant': ['Businesses', 'Content creators', 'Researchers'],
    'Content Creation': ['Marketers', 'Writers', 'Content creators'],
    'Code Generation': ['Developers', 'Software engineers', 'Technical teams'],
    'Image Generation': ['Designers', 'Marketers', 'Content creators'],
    'Data Analysis': ['Data analysts', 'Business analysts', 'Researchers'],
    'Productivity': ['Project managers', 'Team leaders', 'Small businesses']
  };
  
  return categoryAudience[tool.category] || categoryAudience['AI Assistant'];
}

/**
 * Generate estimated rating based on tool characteristics
 */
function generateEstimatedRating(tool) {
  let rating = 4.0; // Base rating
  
  // Adjust based on pricing tier
  if (tool.startingPrice > 100) rating += 0.3;
  if (tool.freeTier) rating += 0.2;
  
  // Adjust based on vendor reputation
  const premiumVendors = ['OpenAI', 'Google', 'Microsoft', 'Anthropic'];
  if (premiumVendors.includes(tool.vendor)) rating += 0.4;
  
  // Add some randomness but keep realistic
  rating += (Math.random() - 0.5) * 0.6;
  
  return Math.min(Math.max(rating, 3.0), 5.0);
}

/**
 * Generate estimated review count based on tool popularity
 */
function generateEstimatedReviewCount(tool) {
  let baseCount = 1000;
  
  // Popular vendors get more reviews
  const popularVendors = ['OpenAI', 'Google', 'Microsoft'];
  if (popularVendors.includes(tool.vendor)) baseCount *= 10;
  
  // Free tools get more reviews
  if (tool.freeTier) baseCount *= 2;
  
  // Add randomness
  return Math.floor(baseCount + (Math.random() * baseCount));
}

/**
 * Extract tool-specific keywords from keywords data
 */
function extractToolKeywords(tool, keywords) {
  const toolKeywords = keywords[tool.name] || keywords[generateToolId(tool.name)] || {};
  
  return {
    primary: toolKeywords.primary || [tool.name.toLowerCase()],
    secondary: toolKeywords.secondary || [tool.category?.toLowerCase()],
    longtail: toolKeywords.longtail || [`${tool.name.toLowerCase()} review`, `${tool.name.toLowerCase()} pricing`]
  };
}

/**
 * Generate competitor comparisons
 */
function generateCompetitorComparisons(tool, allTools) {
  return allTools
    .filter(t => t.name !== tool.name && t.category === tool.category)
    .slice(0, 3)
    .map(competitor => ({
      name: competitor.name,
      comparisonUrl: `/compare/${generateToolId(tool.name)}-vs-${generateToolId(competitor.name)}`
    }));
}

/**
 * Generate pros from features
 */
function generateProsFromFeatures(tool, features) {
  const commonPros = [
    'User-friendly interface',
    'Robust feature set',
    'Good performance',
    'Regular updates'
  ];
  
  return commonPros.slice(0, 3);
}

/**
 * Generate cons from limitations
 */
function generateConsFromLimitations(tool) {
  const commonCons = [
    'Limited free tier',
    'Learning curve for beginners',
    'Pricing can be expensive for small teams'
  ];
  
  return commonCons.slice(0, 2);
}

/**
 * Extract additional metadata
 */
function extractAdditionalMetadata(tool, metadata) {
  const toolMetadata = metadata[tool.name] || metadata[generateToolId(tool.name)] || {};
  
  return {
    website: tool.website || toolMetadata.website,
    documentation: tool.documentation || toolMetadata.documentation,
    supportEmail: tool.supportEmail || toolMetadata.supportEmail,
    socialMedia: tool.socialMedia || toolMetadata.socialMedia || {},
    apiEndpoint: tool.apiEndpoint || toolMetadata.apiEndpoint,
    status: tool.status || 'active'
  };
}

/**
 * Write the final data to output file
 */
async function writeOutputData(data) {
  // Ensure output directory exists
  const outputDir = path.dirname(CONFIG.outputFile);
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }
  
  // Write formatted JSON
  fs.writeFileSync(CONFIG.outputFile, JSON.stringify(data, null, 2), 'utf8');
  
  // Write backup with timestamp
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  const backupFile = CONFIG.outputFile.replace('.json', `_backup_${timestamp}.json`);
  fs.writeFileSync(backupFile, JSON.stringify(data, null, 2), 'utf8');
  
  if (CONFIG.verbose) {
    console.log(`📄 Output written to: ${CONFIG.outputFile}`);
    console.log(`💾 Backup created: ${backupFile}`);
  }
}

/**
 * Display usage information
 */
function showUsage() {
  console.log(`
🛠  AI Tools Data Builder

Usage: node scripts/build-tools-data.js [options]

Options:
  --input-dir <dir>     Input directory containing data files (default: ./input)
  --output <file>       Output file path (default: ./data/aiToolsData.json)
  --verbose             Enable verbose logging
  --dry-run             Show what would be generated without writing files
  --help                Show this help message

Required Input Files:
  📁 input/
    ├── prd.json         # Product Requirements Document with tools array
    ├── keywords.json    # Keyword data for each tool
    ├── pricing.json     # Pricing information (optional)
    ├── features.json    # Feature mappings (optional)
    └── metadata.json    # Additional metadata (optional)

Example PRD Structure:
{
  "tools": [
    {
      "name": "ChatGPT",
      "vendor": "OpenAI",
      "category": "AI Assistant",
      "description": "Advanced conversational AI",
      "freeTier": true,
      "startingPrice": 20,
      "rating": 4.5,
      "reviewCount": 50000
    }
  ]
}

Example Keywords Structure:
{
  "ChatGPT": {
    "primary": ["chatgpt", "openai"],
    "secondary": ["ai assistant", "chatbot"],
    "longtail": ["chatgpt review", "chatgpt pricing"]
  }
}
`);
}

// Handle command line arguments
if (process.argv.includes('--help')) {
  showUsage();
  process.exit(0);
}

// Run the build process
if (require.main === module) {
  buildToolsData().catch(error => {
    console.error('❌ Fatal error:', error);
    process.exit(1);
  });
}

module.exports = {
  buildToolsData,
  generateToolId,
  categorizeToolFromKeywords,
  processPricingData,
  processFeaturesData
};