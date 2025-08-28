const fs = require('fs');
const path = require('path');

// Helper function to convert tool name to slug
function createSlug(name) {
  return name.toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-+|-+$/g, '');
}

// Helper function to generate keywords
function generateKeywords(toolName, category) {
  const baseName = toolName.toLowerCase();
  return `${baseName}, ${baseName} review, ${baseName} pricing, ${baseName} alternatives, ${baseName} features, ${category.toLowerCase()}, ai tools, artificial intelligence, software comparison, 2025`;
}

// Helper function to convert pricing from our format to aiToolsData format
function convertPricing(toolPricing) {
  const plans = [];
  
  if (toolPricing.plans && Array.isArray(toolPricing.plans)) {
    toolPricing.plans.forEach(plan => {
      let pricePerMonth = 0;
      
      // Parse price string to extract numeric value
      if (plan.price && typeof plan.price === 'string') {
        const priceMatch = plan.price.match(/\$?(\d+(?:\.\d+)?)/);
        if (priceMatch) {
          pricePerMonth = parseFloat(priceMatch[1]);
        }
      }
      
      plans.push({
        plan: plan.plan_name || plan.name || 'Unknown',
        price_per_month: pricePerMonth,
        features: plan.features_included || []
      });
    });
  } else {
    // Fallback: create basic plans from monthly/yearly pricing
    const monthly = typeof toolPricing.monthly === 'number' ? toolPricing.monthly : 0;
    const yearly = typeof toolPricing.yearly === 'number' ? toolPricing.yearly : monthly;
    
    plans.push({
      plan: 'Monthly',
      price_per_month: monthly,
      features: ['Basic features included']
    });
    
    if (yearly !== monthly) {
      plans.push({
        plan: 'Yearly',
        price_per_month: yearly,
        features: ['All monthly features', 'Annual discount']
      });
    }
    
    plans.push({
      plan: 'Enterprise',
      price_per_month: 0,
      features: ['Custom solutions', 'Priority support']
    });
  }
  
  return plans;
}

// Helper function to convert tool from our format to aiToolsData format
function convertToolToAiToolsFormat(tool, category) {
  const slug = createSlug(tool.tool_name);
  const logoUrl = tool.logo_url || `/images/tools/${slug}-logo.svg`;
  const website = tool.website || '#';
  const basePrice = tool.pricing?.plans?.[0]?.price || tool.pricing?.monthly || 0;
  const priceNumber = typeof basePrice === 'string' ? 
    parseFloat(basePrice.replace(/[^0-9.]/g, '')) || 0 : basePrice;
  
  return {
    id: slug,
    name: tool.tool_name,
    slug: slug,
    logo: logoUrl,
    meta: {
      title: tool.meta_title || `${tool.tool_name} Review, Pricing, Features & Alternatives [2025]`,
      description: tool.meta_description || `Comprehensive review of ${tool.tool_name}. ${tool.description}`,
      keywords: generateKeywords(tool.tool_name, category),
      canonical: `https://siteoptz.ai/tools/${slug}`,
      openGraph: {
        title: `${tool.tool_name} - AI Tool Review & Pricing`,
        description: tool.description,
        type: 'article',
        url: `https://siteoptz.ai/tools/${slug}`,
        image: `https://siteoptz.ai${logoUrl}`,
        site_name: 'SiteOptz'
      },
      twitter: {
        card: 'summary_large_image',
        title: `${tool.tool_name} - AI Tool Review`,
        description: tool.description,
        image: `https://siteoptz.ai${logoUrl}`
      }
    },
    schema: {
      '@type': 'Product',
      '@context': 'https://schema.org',
      name: tool.tool_name,
      description: tool.description,
      image: `https://siteoptz.ai${logoUrl}`,
      url: `https://siteoptz.ai/tools/${slug}`,
      brand: {
        '@type': 'Brand',
        name: tool.vendor || tool.tool_name
      },
      category: null,
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: tool.rating || 4.5,
        reviewCount: Math.floor(Math.random() * 5000) + 1000,
        bestRating: 5,
        worstRating: 1
      },
      offers: {
        '@type': 'Offer',
        price: priceNumber,
        priceCurrency: 'USD',
        availability: 'https://schema.org/InStock',
        url: website,
        description: priceNumber === 0 ? 'Free to start' : `Starts at $${priceNumber}/month`
      }
    },
    overview: {
      developer: tool.vendor || tool.tool_name,
      release_year: 2024,
      category: category,
      description: tool.description,
      website: website,
      support: 'Email, Chat',
      use_cases: tool.use_cases || [],
      integrations: tool.features?.integrations || []
    },
    features: tool.features?.core || [],
    pros: [
      ...tool.features?.core?.slice(0, 3).map(f => f) || [],
      'User-friendly interface',
      'Regular updates',
      'Good customer support'
    ],
    cons: [
      'Learning curve for beginners',
      'Pricing may be high for small businesses',
      'Limited free features'
    ],
    pricing: convertPricing(tool.pricing),
    benchmarks: {
      speed: 8,
      accuracy: 8,
      integration: 7,
      ease_of_use: 8,
      value: 7
    },
    related_tools: [],
    affiliate_link: website,
    search_volume: Math.floor(Math.random() * 10000) + 1000,
    cpc: Math.round((Math.random() * 5 + 1) * 100) / 100,
    use_cases: tool.use_cases || [],
    tags: [
      tool.category?.toLowerCase().replace(/ /g, '-'),
      'ai-tools',
      'automation'
    ]
  };
}

// Main function to add discovered tools
async function addDiscoveredTools() {
  try {
    console.log('Starting tool integration...');
    
    // Load existing aiToolsData
    const aiToolsPath = path.join(__dirname, '../public/data/aiToolsData.json');
    const existingTools = JSON.parse(fs.readFileSync(aiToolsPath, 'utf-8'));
    const existingNames = new Set(existingTools.map(t => t.name.toLowerCase()));
    
    console.log(`Loaded ${existingTools.length} existing tools`);
    
    // Load discovered tools
    const discoveredFiles = [
      { file: '../data/new-seo-tools-2025.json', category: 'SEO & Optimization' },
      { file: '../data/new-social-media-tools-2025.json', category: 'Social Media' },
      { file: '../data/paid-search-ppc-tools-2025.json', category: 'Paid Search & PPC' },
      { file: '../data/voice-ai-enterprise-tools-2025.json', category: 'Best Voice AI Tools' }
    ];
    
    const newTools = [];
    
    for (const { file, category } of discoveredFiles) {
      const filePath = path.join(__dirname, file);
      if (fs.existsSync(filePath)) {
        const data = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
        console.log(`Processing ${data.tools?.length || 0} tools from ${category}...`);
        
        if (data.tools) {
          data.tools.forEach(tool => {
            const toolName = tool.tool_name.toLowerCase();
            if (!existingNames.has(toolName)) {
              const convertedTool = convertToolToAiToolsFormat(tool, category);
              newTools.push(convertedTool);
              existingNames.add(toolName); // Prevent duplicates within this batch
              console.log(`✓ Added ${tool.tool_name}`);
            } else {
              console.log(`- Skipped ${tool.tool_name} (already exists)`);
            }
          });
        }
      } else {
        console.log(`Warning: ${file} not found`);
      }
    }
    
    // Combine and save
    const allTools = [...existingTools, ...newTools];
    fs.writeFileSync(aiToolsPath, JSON.stringify(allTools, null, 2));
    
    console.log(`\\n✅ Integration complete!`);
    console.log(`Added ${newTools.length} new tools`);
    console.log(`Total tools in database: ${allTools.length}`);
    
    // Update category mappings
    const categoryMappingPath = path.join(__dirname, '../utils/unifiedDataAdapter.js');
    let categoryCode = fs.readFileSync(categoryMappingPath, 'utf-8');
    
    if (!categoryCode.includes("'paid-search-ppc'")) {
      categoryCode = categoryCode.replace(
        "'social-media': 'Social Media'",
        "'social-media': 'Social Media',\\n  'paid-search-ppc': 'Paid Search & PPC'"
      );
      fs.writeFileSync(categoryMappingPath, categoryCode);
      console.log('✓ Updated category mappings');
    }
    
  } catch (error) {
    console.error('Error during tool integration:', error);
    process.exit(1);
  }
}

// Run the script
addDiscoveredTools();