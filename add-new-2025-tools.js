const fs = require('fs');
const path = require('path');

/**
 * Add new AI tools discovered from 2025 research
 */

function addNew2025Tools() {
  const mainDataPath = path.join(__dirname, 'public/data/aiToolsData.json');
  
  // Load existing tools
  let existingTools = [];
  if (fs.existsSync(mainDataPath)) {
    existingTools = JSON.parse(fs.readFileSync(mainDataPath, 'utf8'));
  }
  
  const existingIds = new Set(existingTools.map(t => t.id?.toLowerCase()));
  const existingNames = new Set(existingTools.map(t => t.name?.toLowerCase()));
  
  // New tools discovered from 2025 research
  const newTools2025 = [
    {
      id: 'videotube-ai',
      name: 'VideoTube',
      slug: 'videotube-ai',
      logo: '/images/tools/videotube-ai-logo.svg',
      meta: {
        title: 'VideoTube AI Review, Pricing, Features & Alternatives [2025]',
        description: 'Comprehensive review of VideoTube AI. Turn text, images, or product pages into professional viral videos in no time. Compare features, pricing, and alternatives.',
        keywords: 'videotube ai, videotube ai review, videotube ai pricing, video generation ai',
        canonical: 'https://siteoptz.ai/tools/videotube-ai'
      },
      overview: {
        developer: 'VideoTube',
        release_year: 2024,
        category: 'Video Generation',
        description: 'Turn text, images, or product pages into professional viral videos in no time',
        website: 'https://videotube.ai',
        use_cases: ['Social media content', 'Marketing videos', 'Product demonstrations'],
        integrations: ['Social media platforms', 'E-commerce sites']
      },
      features: [
        'Text-to-video conversion',
        'Image-to-video transformation',
        'Product page video creation',
        'Professional templates',
        'Viral video optimization',
        'Multiple export formats',
        'Social media integration'
      ],
      pros: [
        'Quick video generation',
        'Professional quality output',
        'Multiple input formats',
        'Optimized for social media'
      ],
      cons: [
        'Limited customization options',
        'Requires internet connection'
      ],
      pricing: [
        { plan: 'Free', price_per_month: 0, features: ['Basic video generation', '5 videos/month'] },
        { plan: 'Pro', price_per_month: 29, features: ['Unlimited videos', 'HD quality', 'Premium templates'] },
        { plan: 'Business', price_per_month: 99, features: ['Team collaboration', 'API access', 'Priority support'] }
      ],
      rating: 4.2,
      review_count: 150,
      benchmarks: {
        speed: 9,
        accuracy: 8,
        integration: 7,
        ease_of_use: 9,
        value: 8
      },
      search_volume: 2500,
      cpc: 3.20,
      affiliate_link: 'https://videotube.ai',
      free_trial: true
    },
    {
      id: 'lockedin-ai',
      name: 'LockedIn AI',
      slug: 'lockedin-ai',
      logo: '/images/tools/lockedin-ai-logo.svg',
      meta: {
        title: 'LockedIn AI Review, Pricing, Features & Alternatives [2025]',
        description: 'Comprehensive review of LockedIn AI. Go into your job interviews with absolute confidence thanks to an AI co-pilot. Compare features, pricing, and alternatives.',
        keywords: 'lockedin ai, lockedin ai review, interview ai assistant, job interview preparation',
        canonical: 'https://siteoptz.ai/tools/lockedin-ai'
      },
      overview: {
        developer: 'LockedIn AI',
        release_year: 2024,
        category: 'Human Resources',
        description: 'Go into your job interviews with absolute confidence thanks to an AI co-pilot',
        website: 'https://lockedinai.com',
        use_cases: ['Job interview preparation', 'Interview coaching', 'Career development'],
        integrations: ['Calendar apps', 'Video conferencing tools']
      },
      features: [
        'AI interview coach',
        'Real-time guidance',
        'Interview question practice',
        'Confidence building',
        'Performance analytics',
        'Industry-specific coaching',
        'Mock interview sessions'
      ],
      pros: [
        'Builds interview confidence',
        'Real-time assistance',
        'Personalized coaching',
        'Industry-specific preparation'
      ],
      cons: [
        'Limited to interview scenarios',
        'Requires practice time'
      ],
      pricing: [
        { plan: 'Free', price_per_month: 0, features: ['Basic coaching', '3 sessions/month'] },
        { plan: 'Premium', price_per_month: 19, features: ['Unlimited sessions', 'Advanced analytics', 'Industry coaching'] },
        { plan: 'Enterprise', price_per_month: 99, features: ['Team accounts', 'Custom coaching', 'Priority support'] }
      ],
      rating: 4.3,
      review_count: 89,
      benchmarks: {
        speed: 8,
        accuracy: 8,
        integration: 6,
        ease_of_use: 9,
        value: 8
      },
      search_volume: 1200,
      cpc: 4.50,
      affiliate_link: 'https://lockedinai.com',
      free_trial: true
    },
    {
      id: 'macaron-ai',
      name: 'Macaron AI',
      slug: 'macaron-ai',
      logo: '/images/tools/macaron-ai-logo.svg',
      meta: {
        title: 'Macaron AI Review, Pricing, Features & Alternatives [2025]',
        description: 'Comprehensive review of Macaron AI. The world\'s first personal AI agent for comprehensive task management. Compare features, pricing, and alternatives.',
        keywords: 'macaron ai, macaron ai review, personal ai agent, ai assistant',
        canonical: 'https://siteoptz.ai/tools/macaron-ai'
      },
      overview: {
        developer: 'Macaron AI',
        release_year: 2025,
        category: 'AI Assistants',
        description: 'The world\'s first personal AI agent for comprehensive task management and assistance',
        website: 'https://macaron.ai',
        use_cases: ['Personal task management', 'Schedule optimization', 'Productivity enhancement'],
        integrations: ['Calendar apps', 'Email platforms', 'Task management tools']
      },
      features: [
        'Personal AI agent',
        'Task automation',
        'Schedule management',
        'Email integration',
        'Smart reminders',
        'Context-aware assistance',
        'Multi-platform sync'
      ],
      pros: [
        'Comprehensive personal assistance',
        'Intelligent task prioritization',
        'Natural language interaction',
        'Cross-platform integration'
      ],
      cons: [
        'New platform with limited track record',
        'May require significant setup'
      ],
      pricing: [
        { plan: 'Beta', price_per_month: 0, features: ['Basic AI agent', 'Limited integrations'] },
        { plan: 'Personal', price_per_month: 15, features: ['Full AI agent', 'All integrations', 'Priority support'] },
        { plan: 'Professional', price_per_month: 45, features: ['Advanced features', 'Team sharing', 'API access'] }
      ],
      rating: 4.1,
      review_count: 42,
      benchmarks: {
        speed: 8,
        accuracy: 7,
        integration: 8,
        ease_of_use: 8,
        value: 7
      },
      search_volume: 800,
      cpc: 3.80,
      affiliate_link: 'https://macaron.ai',
      free_trial: true
    },
    {
      id: 'lanta-ai',
      name: 'Lanta AI',
      slug: 'lanta-ai', 
      logo: '/images/tools/lanta-ai-logo.svg',
      meta: {
        title: 'Lanta AI Review, Pricing, Features & Alternatives [2025]',
        description: 'Comprehensive review of Lanta AI. Create professional AI videos from text, images, and even videos. Compare features, pricing, and alternatives.',
        keywords: 'lanta ai, lanta ai review, ai video creation, professional video generation',
        canonical: 'https://siteoptz.ai/tools/lanta-ai'
      },
      overview: {
        developer: 'Lanta AI',
        release_year: 2024,
        category: 'Video Generation',
        description: 'Create professional AI videos from text, images, and even videos',
        website: 'https://lantaai.com',
        use_cases: ['Professional video creation', 'Content marketing', 'Educational videos'],
        integrations: ['Social media platforms', 'Video hosting services']
      },
      features: [
        'Text-to-video generation',
        'Image-to-video conversion',
        'Video-to-video transformation',
        'Professional templates',
        'HD/4K output',
        'Voice synthesis',
        'Multi-language support'
      ],
      pros: [
        'Multiple input formats',
        'Professional quality',
        'Easy to use interface',
        'High-resolution output'
      ],
      cons: [
        'Processing time for complex videos',
        'Limited free tier'
      ],
      pricing: [
        { plan: 'Starter', price_per_month: 0, features: ['3 videos/month', 'SD quality'] },
        { plan: 'Creator', price_per_month: 39, features: ['Unlimited videos', 'HD quality', 'Premium templates'] },
        { plan: 'Business', price_per_month: 129, features: ['4K quality', 'API access', 'Team collaboration'] }
      ],
      rating: 4.4,
      review_count: 78,
      benchmarks: {
        speed: 7,
        accuracy: 9,
        integration: 7,
        ease_of_use: 8,
        value: 8
      },
      search_volume: 1500,
      cpc: 4.20,
      affiliate_link: 'https://lantaai.com',
      free_trial: true
    },
    {
      id: 'explee-ai',
      name: 'Explee',
      slug: 'explee-ai',
      logo: '/images/tools/explee-ai-logo.svg',
      meta: {
        title: 'Explee AI Review, Pricing, Features & Alternatives [2025]',
        description: 'Comprehensive review of Explee AI. Find thousands of potential customers in seconds with AI-powered lead generation. Compare features, pricing, and alternatives.',
        keywords: 'explee ai, explee review, ai lead generation, customer discovery',
        canonical: 'https://siteoptz.ai/tools/explee-ai'
      },
      overview: {
        developer: 'Explee',
        release_year: 2024,
        category: 'Marketing',
        description: 'Find thousands of potential customers in seconds with AI-powered lead generation',
        website: 'https://explee.com',
        use_cases: ['Lead generation', 'Customer discovery', 'Sales prospecting'],
        integrations: ['CRM systems', 'Email platforms', 'Sales tools']
      },
      features: [
        'AI-powered lead generation',
        'Customer discovery',
        'Real-time prospecting',
        'Contact enrichment',
        'Lead scoring',
        'Export capabilities',
        'CRM integration'
      ],
      pros: [
        'Fast customer discovery',
        'High-quality leads',
        'Easy integration',
        'Real-time results'
      ],
      cons: [
        'Requires data verification',
        'Limited to certain markets'
      ],
      pricing: [
        { plan: 'Free', price_per_month: 0, features: ['50 leads/month', 'Basic search'] },
        { plan: 'Starter', price_per_month: 49, features: ['500 leads/month', 'Advanced filters'] },
        { plan: 'Growth', price_per_month: 149, features: ['2000 leads/month', 'API access', 'CRM integration'] }
      ],
      rating: 4.0,
      review_count: 124,
      benchmarks: {
        speed: 9,
        accuracy: 7,
        integration: 8,
        ease_of_use: 8,
        value: 7
      },
      search_volume: 2200,
      cpc: 5.50,
      affiliate_link: 'https://explee.com',
      free_trial: true
    }
  ];

  console.log(`🆕 Adding ${newTools2025.length} new AI tools from 2025 research...`);
  
  // Filter out tools that already exist
  const trulyNewTools = newTools2025.filter(tool => {
    const id = tool.id.toLowerCase();
    const name = tool.name.toLowerCase();
    
    if (existingIds.has(id) || existingNames.has(name)) {
      console.log(`⚠️  Skipping ${tool.name} - already exists`);
      return false;
    }
    return true;
  });
  
  console.log(`✅ Found ${trulyNewTools.length} genuinely new tools to add:`);
  trulyNewTools.forEach(tool => {
    console.log(`  • ${tool.name} (${tool.overview.category})`);
  });
  
  if (trulyNewTools.length === 0) {
    console.log('ℹ️  No new tools to add - all were already in database');
    return { added: 0, total: existingTools.length };
  }
  
  // Add new tools to existing data
  const allTools = [...existingTools, ...trulyNewTools];
  
  // Sort by rating (descending)
  allTools.sort((a, b) => (b.rating || 0) - (a.rating || 0));
  
  // Save updated data
  fs.writeFileSync(mainDataPath, JSON.stringify(allTools, null, 2));
  
  console.log(`\n🎉 Successfully added ${trulyNewTools.length} new AI tools!`);
  console.log(`📊 Total tools in database: ${allTools.length}`);
  
  return {
    added: trulyNewTools.length,
    total: allTools.length,
    newTools: trulyNewTools.map(t => ({ name: t.name, category: t.overview.category }))
  };
}

// Run if called directly
if (require.main === module) {
  try {
    const result = addNew2025Tools();
    console.log('\n📋 Summary:');
    if (result.newTools) {
      result.newTools.forEach(tool => {
        console.log(`  ✅ ${tool.name} (${tool.category})`);
      });
    }
  } catch (error) {
    console.error('❌ Error adding tools:', error.message);
  }
}

module.exports = { addNew2025Tools };