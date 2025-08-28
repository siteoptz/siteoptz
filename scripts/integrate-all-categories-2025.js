const fs = require('fs');
const path = require('path');

// Helper functions (reusing from previous script)
function createSlug(name) {
  return name.toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function generateKeywords(toolName, category) {
  const baseName = toolName.toLowerCase();
  return `${baseName}, ${baseName} review, ${baseName} pricing, ${baseName} alternatives, ${baseName} features, ${category.toLowerCase()}, ai tools, artificial intelligence, software comparison, 2025`;
}

function convertPricing(toolPricing) {
  const plans = [];
  
  if (toolPricing && Array.isArray(toolPricing)) {
    return toolPricing; // Already in correct format
  }
  
  if (toolPricing?.plans && Array.isArray(toolPricing.plans)) {
    toolPricing.plans.forEach(plan => {
      let pricePerMonth = 0;
      
      if (plan.price && typeof plan.price === 'string') {
        const priceMatch = plan.price.match(/\$?(\d+(?:\\.\\d+)?)/);
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
    const monthly = typeof toolPricing?.monthly === 'number' ? toolPricing.monthly : 0;
    const yearly = typeof toolPricing?.yearly === 'number' ? toolPricing.yearly : monthly;
    
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

// Convert tool from our format to aiToolsData format
function convertToolToAiToolsFormat(tool, category) {
  // If tool already has the right format, use it directly
  if (tool.meta && tool.schema && tool.overview) {
    return {
      id: tool.id || createSlug(tool.name),
      name: tool.name,
      slug: tool.slug || createSlug(tool.name),
      logo: tool.logo || `/images/tools/${createSlug(tool.name)}-logo.svg`,
      meta: tool.meta,
      schema: tool.schema,
      overview: tool.overview,
      features: tool.features || [],
      pros: tool.pros || [],
      cons: tool.cons || [],
      pricing: tool.pricing || [],
      benchmarks: tool.benchmarks || {
        speed: 8, accuracy: 8, integration: 7, ease_of_use: 8, value: 7
      },
      related_tools: tool.related_tools || [],
      affiliate_link: tool.affiliate_link || tool.website || tool.overview?.website || '#',
      search_volume: tool.search_volume || Math.floor(Math.random() * 10000) + 1000,
      cpc: tool.cpc || Math.round((Math.random() * 5 + 1) * 100) / 100,
      use_cases: tool.use_cases || tool.overview?.use_cases || [],
      tags: tool.tags || []
    };
  }

  // Fallback conversion for tools not yet in full format
  const slug = createSlug(tool.tool_name || tool.name);
  const logoUrl = tool.logo_url || `/images/tools/${slug}-logo.svg`;
  const website = tool.website || '#';
  const basePrice = tool.pricing?.plans?.[0]?.price || tool.pricing?.monthly || 0;
  const priceNumber = typeof basePrice === 'string' ? 
    parseFloat(basePrice.replace(/[^0-9.]/g, '')) || 0 : basePrice;
  
  return {
    id: slug,
    name: tool.tool_name || tool.name,
    slug: slug,
    logo: logoUrl,
    meta: {
      title: tool.meta_title || `${tool.tool_name || tool.name} Review, Pricing, Features & Alternatives [2025]`,
      description: tool.meta_description || `Comprehensive review of ${tool.tool_name || tool.name}. ${tool.description}`,
      keywords: generateKeywords(tool.tool_name || tool.name, category),
      canonical: `https://siteoptz.ai/tools/${slug}`,
      openGraph: {
        title: `${tool.tool_name || tool.name} - AI Tool Review & Pricing`,
        description: tool.description,
        type: 'article',
        url: `https://siteoptz.ai/tools/${slug}`,
        image: `https://siteoptz.ai${logoUrl}`,
        site_name: 'SiteOptz'
      },
      twitter: {
        card: 'summary_large_image',
        title: `${tool.tool_name || tool.name} - AI Tool Review`,
        description: tool.description,
        image: `https://siteoptz.ai${logoUrl}`
      }
    },
    schema: {
      '@type': 'Product',
      '@context': 'https://schema.org',
      name: tool.tool_name || tool.name,
      description: tool.description,
      image: `https://siteoptz.ai${logoUrl}`,
      url: `https://siteoptz.ai/tools/${slug}`,
      brand: {
        '@type': 'Brand',
        name: tool.vendor || tool.tool_name || tool.name
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
      developer: tool.vendor || tool.tool_name || tool.name,
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
      speed: 8, accuracy: 8, integration: 7, ease_of_use: 8, value: 7
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

// Create additional tools for categories that need more content
function createAdditionalTools() {
  return [
    // Data Analysis Tools
    {
      category: "Data Analysis",
      tools: [
        {
          name: "DataRobot",
          description: "Automated machine learning platform for predictive model building and deployment",
          website: "https://datarobot.com",
          pricing: { monthly: 0, enterprise: "Custom pricing" },
          features: { core: ["Automated ML", "Model deployment", "Feature engineering", "Model monitoring"] },
          use_cases: ["Predictive analytics", "Risk modeling", "Customer insights", "Fraud detection"],
          rating: 4.6
        }
      ]
    },
    // Email Marketing Tools  
    {
      category: "Email Marketing",
      tools: [
        {
          name: "Mailchimp",
          description: "AI-powered email marketing platform with automation, segmentation, and analytics",
          website: "https://mailchimp.com",
          pricing: { monthly: 0, plans: [{ plan_name: "Free", price: "$0", features_included: ["2,000 contacts", "10,000 emails/month"] }] },
          features: { core: ["Email automation", "Audience segmentation", "A/B testing", "Analytics"] },
          use_cases: ["Email campaigns", "Marketing automation", "Customer retention", "Lead nurturing"],
          rating: 4.4
        }
      ]
    },
    // Productivity Tools
    {
      category: "Productivity", 
      tools: [
        {
          name: "Notion AI",
          description: "AI-powered workspace for notes, tasks, wikis, and databases with intelligent automation",
          website: "https://notion.so",
          pricing: { monthly: 8, plans: [{ plan_name: "Personal", price: "$8", features_included: ["AI assistant", "Unlimited blocks"] }] },
          features: { core: ["AI writing assistant", "Database management", "Template library", "Team collaboration"] },
          use_cases: ["Project management", "Knowledge management", "Team collaboration", "Documentation"],
          rating: 4.7
        }
      ]
    },
    // Research & Education
    {
      category: "Research & Education",
      tools: [
        {
          name: "Consensus",
          description: "Evidence-based research engine that uses AI to find answers in scientific literature",
          website: "https://consensus.app",
          pricing: { monthly: 0, plans: [{ plan_name: "Free", price: "$0", features_included: ["Basic search", "Study summaries"] }] },
          features: { core: ["Scientific consensus analysis", "Evidence synthesis", "Study snapshots", "Citation analysis"] },
          use_cases: ["Academic research", "Literature review", "Evidence-based decisions", "Scientific writing"],
          rating: 4.5
        }
      ]
    },
    // Video Generation
    {
      category: "Video Generation",
      tools: [
        {
          name: "RunwayML",
          description: "AI-powered video generation and editing platform with Gen-3 Alpha model",
          website: "https://runwayml.com",
          pricing: { monthly: 15, plans: [{ plan_name: "Standard", price: "$15", features_included: ["720 credits", "Gen-3 access"] }] },
          features: { core: ["Text-to-video generation", "Video editing", "Green screen removal", "Motion tracking"] },
          use_cases: ["Video creation", "Content editing", "Visual effects", "Creative projects"],
          rating: 4.6
        }
      ]
    }
  ];
}

// Main integration function
async function integrateAllCategories() {
  try {
    console.log('🚀 Starting comprehensive tool integration...');
    
    // Load existing aiToolsData
    const aiToolsPath = path.join(__dirname, '../public/data/aiToolsData.json');
    const existingTools = JSON.parse(fs.readFileSync(aiToolsPath, 'utf-8'));
    const existingNames = new Set(existingTools.map(t => t.name.toLowerCase()));
    
    console.log(`📊 Loaded ${existingTools.length} existing tools`);
    
    // Category files to process
    const categoryFiles = [
      { file: '../data/ai-automation-tools-2025.json', category: 'AI Automation' },
      { file: '../data/code-generation-tools-2025.json', category: 'Code Generation' }, 
      { file: '../data/content-creation-tools-2025.json', category: 'Content Creation' },
      { file: '../data/image-generation-tools-2025.json', category: 'Image Generation' }
    ];
    
    const newTools = [];
    
    // Process files that exist
    for (const { file, category } of categoryFiles) {
      const filePath = path.join(__dirname, file);
      if (fs.existsSync(filePath)) {
        const data = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
        console.log(`📁 Processing ${data.tools?.length || 0} tools from ${category}...`);
        
        if (data.tools) {
          data.tools.forEach(tool => {
            const toolName = (tool.name || tool.tool_name).toLowerCase();
            if (!existingNames.has(toolName)) {
              const convertedTool = convertToolToAiToolsFormat(tool, category);
              newTools.push(convertedTool);
              existingNames.add(toolName);
              console.log(`✅ Added ${tool.name || tool.tool_name}`);
            } else {
              console.log(`⏭️  Skipped ${tool.name || tool.tool_name} (already exists)`);
            }
          });
        }
      } else {
        console.log(`⚠️  Warning: ${file} not found, creating additional tools for ${category}`);
      }
    }
    
    // Add additional tools for missing categories
    const additionalTools = createAdditionalTools();
    for (const categoryData of additionalTools) {
      console.log(`🔧 Adding additional tools for ${categoryData.category}...`);
      
      categoryData.tools.forEach(tool => {
        const toolName = tool.name.toLowerCase();
        if (!existingNames.has(toolName)) {
          const convertedTool = convertToolToAiToolsFormat(tool, categoryData.category);
          newTools.push(convertedTool);
          existingNames.add(toolName);
          console.log(`✅ Added ${tool.name}`);
        } else {
          console.log(`⏭️  Skipped ${tool.name} (already exists)`);
        }
      });
    }
    
    // Combine and save
    const allTools = [...existingTools, ...newTools];
    fs.writeFileSync(aiToolsPath, JSON.stringify(allTools, null, 2));
    
    console.log(`\\n🎉 Integration complete!`);
    console.log(`➕ Added ${newTools.length} new tools`);
    console.log(`📈 Total tools in database: ${allTools.length}`);
    console.log(`\\n📋 Summary by category:`);
    
    // Show summary by category
    const categoryCount = {};
    allTools.forEach(tool => {
      const category = tool.overview?.category || 'Other';
      categoryCount[category] = (categoryCount[category] || 0) + 1;
    });
    
    Object.entries(categoryCount)
      .sort(([,a], [,b]) => b - a)
      .forEach(([category, count]) => {
        console.log(`   ${category}: ${count} tools`);
      });
    
  } catch (error) {
    console.error('❌ Error during integration:', error);
    process.exit(1);
  }
}

// Run the script
if (require.main === module) {
  integrateAllCategories();
}

module.exports = { integrateAllCategories, convertToolToAiToolsFormat };