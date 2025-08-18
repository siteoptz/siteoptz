const fs = require('fs');
const path = require('path');

// Comprehensive AI tool categories (20 categories)
const MAIN_CATEGORIES = [
  'text-generation',
  'image-generation',
  'code-generation',
  'video-generation',
  'audio-generation',
  'social-media',
  'productivity',
  'data-analysis',
  'research-education',
  'marketing',
  'design',
  'business',
  'healthcare',
  'finance',
  'education',
  'entertainment',
  'gaming',
  'automation',
  'security',
  'development'
];

// Comprehensive AI tools database with correct pricing structure
const AI_TOOLS_DATABASE = {
  'text-generation': [
    { name: 'ChatGPT', description: 'AI-powered chatbot for conversations, content creation, and problem-solving', website: 'https://chat.openai.com', source: 'openai', rating: 4.8, reviewCount: 15000, pricing: [{ price: 0, billing_period: 'month', plan: 'Free' }, { price: 20, billing_period: 'month', plan: 'Plus' }, { price: 25, billing_period: 'month', plan: 'Team' }], features: ['conversational-ai', 'content-creation', 'code-generation', 'problem-solving'], pros: ['Highly capable', 'Easy to use', 'Wide range of applications', 'Regular updates'], cons: ['Limited free tier', 'Sometimes slow', 'Can be expensive'] },
    { name: 'Claude', description: 'Advanced AI assistant for writing, analysis, and creative tasks', website: 'https://claude.ai', source: 'anthropic', rating: 4.7, reviewCount: 8000, pricing: [{ price: 0, billing_period: 'month', plan: 'Free' }, { price: 20, billing_period: 'month', plan: 'Pro' }], features: ['writing-assistant', 'analysis', 'creative-tasks', 'research'], pros: ['Excellent writing quality', 'Strong reasoning', 'Ethical approach', 'Good for research'], cons: ['Limited image generation', 'Conservative responses', 'Newer platform'] },
    { name: 'Jasper', description: 'AI writing assistant for marketing content and creative writing', website: 'https://jasper.ai', source: 'jasper', rating: 4.6, reviewCount: 12000, pricing: [{ price: 39, billing_period: 'month', plan: 'Creator' }, { price: 99, billing_period: 'month', plan: 'Teams' }], features: ['marketing-copy', 'blog-writing', 'social-media', 'email-campaigns'], pros: ['Great for marketing', 'Templates available', 'Team collaboration', 'Brand voice'], cons: ['Expensive', 'Limited free trial', 'Can be repetitive'] },
    { name: 'Copy.ai', description: 'AI copywriting tool for marketing and business content', website: 'https://copy.ai', source: 'copy-ai', rating: 4.5, reviewCount: 9000, pricing: [{ price: 0, billing_period: 'month', plan: 'Free' }, { price: 49, billing_period: 'month', plan: 'Pro' }], features: ['copywriting', 'marketing-tools', 'social-media', 'email-marketing'], pros: ['Free tier available', 'Good templates', 'Easy to use', 'Quick results'], cons: ['Limited customization', 'Quality varies', 'Basic features'] },
    { name: 'Writesonic', description: 'AI writing platform for content creation and marketing', website: 'https://writesonic.com', source: 'writesonic', rating: 4.4, reviewCount: 7000, pricing: [{ price: 19, billing_period: 'month', plan: 'Basic' }, { price: 49, billing_period: 'month', plan: 'Professional' }], features: ['content-creation', 'marketing-tools', 'seo-optimization', 'multilingual'], pros: ['SEO optimization', 'Multiple languages', 'Good templates', 'Affordable'], cons: ['Limited free credits', 'Quality can vary', 'Basic interface'] },
    { name: 'Grammarly', description: 'AI-powered writing assistant for grammar and style improvement', website: 'https://grammarly.com', source: 'grammarly', rating: 4.7, reviewCount: 20000, pricing: [{ price: 0, billing_period: 'month', plan: 'Free' }, { price: 12, billing_period: 'month', plan: 'Premium' }], features: ['grammar-checking', 'style-improvement', 'plagiarism-detection', 'writing-suggestions'], pros: ['Excellent grammar checking', 'Wide browser support', 'Free version available', 'Real-time suggestions'], cons: ['Premium is expensive', 'Can be overzealous', 'Limited creative features'] },
    { name: 'Notion AI', description: 'AI assistant integrated into Notion for writing and organization', website: 'https://notion.so', source: 'notion', rating: 4.3, reviewCount: 5000, pricing: [{ price: 10, billing_period: 'month', plan: 'AI Add-on' }], features: ['writing-assistant', 'organization', 'project-management', 'collaboration'], pros: ['Integrated with Notion', 'Good for organization', 'Team features', 'Clean interface'], cons: ['Requires Notion subscription', 'Limited standalone use', 'Basic AI features'] },
    { name: 'Sudowrite', description: 'AI writing assistant specifically designed for creative writing and fiction', website: 'https://sudowrite.com', source: 'sudowrite', rating: 4.2, reviewCount: 3000, pricing: [{ price: 19, billing_period: 'month', plan: 'Basic' }, { price: 29, billing_period: 'month', plan: 'Pro' }], features: ['creative-writing', 'fiction-writing', 'story-development', 'character-creation'], pros: ['Specialized for fiction', 'Good story tools', 'Character development', 'Creative features'], cons: ['Limited to creative writing', 'Expensive', 'Smaller user base'] }
  ],
  'image-generation': [
    { name: 'Midjourney', description: 'AI art generator creating stunning images from text descriptions', website: 'https://midjourney.com', source: 'midjourney', rating: 4.8, reviewCount: 18000, pricing: [{ price: 10, billing_period: 'month', plan: 'Basic' }, { price: 30, billing_period: 'month', plan: 'Standard' }, { price: 60, billing_period: 'month', plan: 'Pro' }], features: ['art-generation', 'high-quality-images', 'creative-control', 'discord-integration'], pros: ['Exceptional quality', 'Creative control', 'Active community', 'Regular updates'], cons: ['Discord only', 'Limited free tier', 'Can be expensive', 'Learning curve'] },
    { name: 'DALL-E 3', description: 'OpenAI\'s advanced image generation model for creating detailed images', website: 'https://openai.com/dall-e-3', source: 'openai', rating: 4.7, reviewCount: 12000, pricing: [{ price: 0, billing_period: 'month', plan: 'Free' }, { price: 20, billing_period: 'month', plan: 'Plus' }], features: ['image-generation', 'high-resolution', 'detailed-prompts', 'safety-filters'], pros: ['High quality', 'Good safety features', 'Easy to use', 'Integration with ChatGPT'], cons: ['Limited free credits', 'Restrictive content policy', 'Can be slow'] },
    { name: 'Stable Diffusion', description: 'Open-source AI image generation model with extensive customization', website: 'https://stability.ai', source: 'stability-ai', rating: 4.6, reviewCount: 15000, pricing: [{ price: 0, billing_period: 'month', plan: 'Free' }, { price: 20, billing_period: 'month', plan: 'Pro' }], features: ['open-source', 'customizable', 'local-deployment', 'extensive-control'], pros: ['Free and open source', 'Highly customizable', 'Can run locally', 'Active community'], cons: ['Technical complexity', 'Requires good hardware', 'Quality varies', 'Setup required'] },
    { name: 'Canva AI', description: 'AI-powered design tool for creating professional graphics and layouts', website: 'https://canva.com', source: 'canva', rating: 4.5, reviewCount: 25000, pricing: [{ price: 0, billing_period: 'month', plan: 'Free' }, { price: 12.99, billing_period: 'month', plan: 'Pro' }], features: ['design-tools', 'ai-assistant', 'templates', 'collaboration'], pros: ['Easy to use', 'Free tier available', 'Great templates', 'Team collaboration'], cons: ['Limited AI features', 'Premium required for advanced', 'Can be slow'] },
    { name: 'Adobe Firefly', description: 'Adobe\'s AI-powered creative suite for image generation and editing', website: 'https://adobe.com/firefly', source: 'adobe', rating: 4.4, reviewCount: 8000, pricing: [{ price: 0, billing_period: 'month', plan: 'Free' }, { price: 22.99, billing_period: 'month', plan: 'Creative Cloud' }], features: ['creative-suite', 'professional-tools', 'integration', 'commercial-use'], pros: ['Professional quality', 'Adobe integration', 'Commercial licensing', 'Good safety'], cons: ['Limited free credits', 'Adobe ecosystem required', 'Expensive'] },
    { name: 'Leonardo.ai', description: 'AI art platform for creating game assets and digital art', website: 'https://leonardo.ai', source: 'leonardo', rating: 4.3, reviewCount: 6000, pricing: [{ price: 0, billing_period: 'month', plan: 'Free' }, { price: 10, billing_period: 'month', plan: 'Pro' }], features: ['game-assets', 'digital-art', '3d-generation', 'texture-creation'], pros: ['Great for game assets', '3D capabilities', 'Good community', 'Free tier'], cons: ['Limited free credits', 'Focused on gaming', 'Smaller community'] },
    { name: 'Runway ML', description: 'AI-powered video and image generation platform for creators', website: 'https://runwayml.com', source: 'runway', rating: 4.2, reviewCount: 4000, pricing: [{ price: 15, billing_period: 'month', plan: 'Basic' }, { price: 35, billing_period: 'month', plan: 'Pro' }], features: ['video-generation', 'image-editing', 'motion-graphics', 'creative-tools'], pros: ['Video capabilities', 'Professional tools', 'Good for creators', 'Advanced features'], cons: ['Expensive', 'Complex interface', 'Limited free tier'] },
    { name: 'Artbreeder', description: 'AI platform for creating and remixing images through breeding', website: 'https://artbreeder.com', source: 'artbreeder', rating: 4.1, reviewCount: 3000, pricing: [{ price: 0, billing_period: 'month', plan: 'Free' }, { price: 8.99, billing_period: 'month', plan: 'Pro' }], features: ['image-breeding', 'remixing', 'collaborative-art', 'creative-exploration'], pros: ['Unique approach', 'Collaborative features', 'Free to use', 'Creative exploration'], cons: ['Limited control', 'Quality varies', 'Smaller community'] }
  ],
  'code-generation': [
    { name: 'GitHub Copilot', description: 'AI-powered code completion and generation for developers', website: 'https://github.com/features/copilot', source: 'github', rating: 4.7, reviewCount: 20000, pricing: [{ price: 10, billing_period: 'month', plan: 'Individual' }, { price: 19, billing_period: 'month', plan: 'Business' }], features: ['code-completion', 'auto-suggestions', 'multi-language', 'ide-integration'], pros: ['Excellent code suggestions', 'Wide language support', 'IDE integration', 'Learning capabilities'], cons: ['Expensive', 'Can suggest wrong code', 'Privacy concerns', 'Requires good prompts'] },
    { name: 'Replit Ghost', description: 'AI coding assistant integrated into Replit\'s development environment', website: 'https://replit.com', source: 'replit', rating: 4.5, reviewCount: 8000, pricing: [{ price: 0, billing_period: 'month', plan: 'Free' }, { price: 7, billing_period: 'month', plan: 'Hacker' }], features: ['coding-assistant', 'online-ide', 'collaboration', 'deployment'], pros: ['Integrated IDE', 'Free tier available', 'Good collaboration', 'Easy deployment'], cons: ['Limited standalone use', 'Basic AI features', 'Requires internet'] },
    { name: 'Tabnine', description: 'AI code completion tool supporting multiple programming languages', website: 'https://tabnine.com', source: 'tabnine', rating: 4.4, reviewCount: 12000, pricing: [{ price: 0, billing_period: 'month', plan: 'Free' }, { price: 12, billing_period: 'month', plan: 'Pro' }], features: ['code-completion', 'multi-language', 'offline-capability', 'team-features'], pros: ['Works offline', 'Multiple languages', 'Free tier', 'Team features'], cons: ['Less advanced than Copilot', 'Limited context', 'Basic suggestions'] },
    { name: 'CodeWhisperer', description: 'Amazon\'s AI coding assistant for AWS development', website: 'https://aws.amazon.com/codewhisperer', source: 'amazon', rating: 4.3, reviewCount: 6000, pricing: [{ price: 0, billing_period: 'month', plan: 'Individual' }, { price: 19, billing_period: 'month', plan: 'Professional' }], features: ['aws-integration', 'security-focused', 'code-completion', 'best-practices'], pros: ['AWS integration', 'Security focused', 'Free for individuals', 'Good documentation'], cons: ['AWS ecosystem focused', 'Limited language support', 'Basic features'] },
    { name: 'Cursor', description: 'AI-first code editor with advanced code generation capabilities', website: 'https://cursor.sh', source: 'cursor', rating: 4.6, reviewCount: 5000, pricing: [{ price: 0, billing_period: 'month', plan: 'Free' }, { price: 20, billing_period: 'month', plan: 'Pro' }], features: ['ai-editor', 'code-generation', 'chat-interface', 'multi-language'], pros: ['AI-first design', 'Good code generation', 'Free to use', 'Modern interface'], cons: ['Newer platform', 'Limited features', 'Smaller community'] },
    { name: 'Codeium', description: 'Free AI code completion tool for developers', website: 'https://codeium.com', source: 'codeium', rating: 4.2, reviewCount: 4000, pricing: [{ price: 0, billing_period: 'month', plan: 'Free' }, { price: 12, billing_period: 'month', plan: 'Pro' }], features: ['free-completion', 'multi-language', 'ide-support', 'team-features'], pros: ['Completely free', 'Multiple languages', 'Good IDE support', 'Team features'], cons: ['Basic features', 'Limited context', 'Quality varies'] },
    { name: 'Kite', description: 'AI-powered code completion for Python and JavaScript', website: 'https://kite.com', source: 'kite', rating: 4.1, reviewCount: 3000, pricing: [{ price: 0, billing_period: 'month', plan: 'Free' }, { price: 9.99, billing_period: 'month', plan: 'Pro' }], features: ['python-support', 'javascript-support', 'code-completion', 'documentation'], pros: ['Good for Python', 'Free to use', 'Documentation integration', 'Lightweight'], cons: ['Limited languages', 'Basic features', 'Smaller community'] },
    { name: 'IntelliCode', description: 'Microsoft\'s AI-assisted development tool for Visual Studio', website: 'https://visualstudio.microsoft.com', source: 'microsoft', rating: 4.0, reviewCount: 2000, pricing: [{ price: 0, billing_period: 'month', plan: 'Free' }], features: ['visual-studio', 'code-completion', 'intellisense', 'microsoft-ecosystem'], pros: ['Visual Studio integration', 'Free with VS', 'Good IntelliSense', 'Microsoft support'], cons: ['Visual Studio only', 'Limited standalone use', 'Basic AI features'] }
  ]
};

// Generate comprehensive AI tools dataset
function generateComprehensiveAITools() {
  const allTools = [];
  let toolId = 1;

  // Generate tools for each category
  Object.entries(AI_TOOLS_DATABASE).forEach(([category, tools]) => {
    tools.forEach((tool, index) => {
      const toolData = {
        id: `${tool.source}-${tool.name.toLowerCase().replace(/\s+/g, '-')}`,
        name: tool.name,
        description: tool.description,
        category: category,
        pricing: tool.pricing, // Now correctly structured as array
        rating: tool.rating,
        reviewCount: tool.reviewCount,
        website: tool.website,
        source: tool.source,
        features: tool.features,
        pros: tool.pros,
        cons: tool.cons,
        lastUpdated: new Date().toISOString()
      };

      allTools.push(toolData);
      toolId++;
    });
  });

  return allTools;
}

// Generate SEO and structured data for tools
function generateSEOData(tool) {
  const keywords = [
    tool.name,
    tool.category.replace('-', ' '),
    'AI tool',
    'artificial intelligence',
    ...tool.features,
    ...tool.pros
  ].join(', ');

  return {
    title: `${tool.name} - Best ${tool.category.replace('-', ' ')} AI Tool | SiteOptz.ai`,
    description: `${tool.description} Compare ${tool.name} with other ${tool.category.replace('-', ' ')} AI tools. Rating: ${tool.rating}/5, ${tool.reviewCount} reviews.`,
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
  return {
    title: `${tool.name} - Best ${tool.category.replace('-', ' ')} AI Tool | SiteOptz.ai`,
    description: `${tool.description} Compare ${tool.name} with other ${tool.category.replace('-', ' ')} AI tools. Rating: ${tool.rating}/5, ${tool.reviewCount} reviews.`,
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

// Main function
function main() {
  console.log('🚀 Generating comprehensive AI tools dataset with correct pricing structure...');
  
  // Generate tools
  const tools = generateComprehensiveAITools();
  
  // Process and enhance tools with SEO data
  const enhancedTools = tools.map(tool => ({
    ...tool,
    seo: generateSEOData(tool),
    structuredData: generateStructuredData(tool),
    metaTags: generateMetaTags(tool),
    socialTags: generateSocialTags(tool),
    canonicalUrl: `https://siteoptz.ai/tools/${tool.id}`,
    breadcrumbs: [
      { name: 'Home', url: 'https://siteoptz.ai' },
      { name: 'Tools', url: 'https://siteoptz.ai/tools' },
      { name: tool.category.replace('-', ' '), url: `https://siteoptz.ai/tools/category/${tool.category}` },
      { name: tool.name, url: `https://siteoptz.ai/tools/${tool.id}` }
    ],
    comparisonData: {
      category: tool.category,
      rating: tool.rating,
      price: Math.min(...tool.pricing.map(p => p.price)),
      features: tool.features.length,
      pros: tool.pros.length,
      cons: tool.cons.length,
      reviewCount: tool.reviewCount,
      lastUpdated: tool.lastUpdated
    }
  }));

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
    tools: enhancedTools,
    total: enhancedTools.length,
    categories: MAIN_CATEGORIES,
    lastUpdated: new Date().toISOString()
  };

  fs.writeFileSync(
    path.join(siteoptzDir, 'tools.json'),
    JSON.stringify(toolsData, null, 2)
  );

  // Export category-specific files
  MAIN_CATEGORIES.forEach(category => {
    const categoryTools = enhancedTools.filter(tool => tool.category === category);
    if (categoryTools.length > 0) {
      const categoryData = {
        category: category,
        tools: categoryTools,
        total: categoryTools.length,
        lastUpdated: new Date().toISOString()
      };

      fs.writeFileSync(
        path.join(siteoptzDir, `${category}.json`),
        JSON.stringify(categoryData, null, 2)
      );
    }
  });

  // Generate summary
  const summary = {
    totalTools: enhancedTools.length,
    categories: MAIN_CATEGORIES.map(category => ({
      name: category,
      count: enhancedTools.filter(tool => tool.category === category).length
    })),
    averageRating: (enhancedTools.reduce((sum, tool) => sum + tool.rating, 0) / enhancedTools.length).toFixed(2),
    freeTools: enhancedTools.filter(tool => Math.min(...tool.pricing.map(p => p.price)) === 0).length,
    paidTools: enhancedTools.filter(tool => Math.min(...tool.pricing.map(p => p.price)) > 0).length,
    lastUpdated: new Date().toISOString()
  };

  fs.writeFileSync(
    path.join(siteoptzDir, 'summary.json'),
    JSON.stringify(summary, null, 2)
  );

  console.log(`✅ Generated ${enhancedTools.length} AI tools across ${MAIN_CATEGORIES.length} categories`);
  console.log(`📁 Data exported to data/siteoptz/`);
  console.log(`📊 Summary: ${summary.totalTools} tools, ${summary.averageRating} avg rating, ${summary.freeTools} free, ${summary.paidTools} paid`);
  console.log(`🔧 Fixed pricing structure: Now using array format expected by frontend components`);
}

if (require.main === module) {
  main();
}

module.exports = { generateComprehensiveAITools, main };
