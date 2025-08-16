const fs = require('fs');
const path = require('path');

// Load the new tools data
const newToolsData = JSON.parse(fs.readFileSync(path.join(__dirname, 'data/tools.json'), 'utf8'));
const existingToolsData = JSON.parse(fs.readFileSync(path.join(__dirname, 'aiToolsData.json'), 'utf8'));

// Categories mapping based on tool features and descriptions
const categorizeTools = (tool) => {
  const name = tool.tool_name.toLowerCase();
  const desc = (tool.description || '').toLowerCase();
  const features = JSON.stringify(tool.features || {}).toLowerCase();
  
  if (name.includes('chat') || name.includes('gpt') || name.includes('claude') || desc.includes('conversational')) {
    return 'Content Creation';
  } else if (name.includes('image') || name.includes('dall') || name.includes('midjourney') || desc.includes('image generation')) {
    return 'Visual Content';
  } else if (name.includes('code') || name.includes('copilot') || desc.includes('programming') || desc.includes('developer')) {
    return 'Development';
  } else if (name.includes('seo') || desc.includes('search engine') || desc.includes('optimization')) {
    return 'SEO & Optimization';
  } else if (name.includes('video') || desc.includes('video')) {
    return 'Video';
  } else if (name.includes('voice') || name.includes('audio') || desc.includes('voice') || desc.includes('audio')) {
    return 'Audio';
  } else if (name.includes('email') || desc.includes('email')) {
    return 'Email Marketing';
  } else if (name.includes('social') || desc.includes('social media')) {
    return 'Social Media';
  } else if (name.includes('analytics') || desc.includes('analytics') || desc.includes('data analysis')) {
    return 'Analytics';
  } else if (name.includes('research') || desc.includes('research')) {
    return 'Research';
  } else if (desc.includes('productivity') || desc.includes('workflow')) {
    return 'Productivity';
  } else {
    return 'Content Creation'; // Default category
  }
};

// Transform new tools to match existing format
const transformedNewTools = newToolsData.ai_tools.map(tool => {
  // Check if tool already exists
  const existingTool = existingToolsData.find(t => 
    t.tool_name.toLowerCase() === tool.tool_name.toLowerCase()
  );
  
  if (existingTool) {
    // Merge with existing tool, keeping existing data but adding new fields
    return {
      ...existingTool,
      description: tool.description || existingTool.description,
      best_use_cases: tool.best_use_cases,
      target_audience: tool.target_audience,
      demo_available: tool.demo_available,
      review_count: tool.review_count,
      faq: tool.faq
    };
  }
  
  // Create new tool entry
  return {
    tool_name: tool.tool_name,
    vendor: tool.vendor,
    category: categorizeTools(tool),
    description: tool.description,
    logo_url: tool.logo_url,
    features: tool.features,
    pricing: tool.pricing,
    free_trial: tool.free_trial,
    pros: tool.pros,
    cons: tool.cons,
    official_url: tool.official_url,
    affiliate_link: tool.affiliate_link,
    rating: tool.rating,
    review_count: tool.review_count,
    best_use_cases: tool.best_use_cases,
    target_audience: tool.target_audience,
    demo_available: tool.demo_available,
    faq: tool.faq
  };
});

// Merge with existing tools (avoiding duplicates)
const existingToolNames = existingToolsData.map(t => t.tool_name.toLowerCase());
const newUniqueTools = transformedNewTools.filter(t => 
  !existingToolNames.includes(t.tool_name.toLowerCase())
);

const mergedTools = [...existingToolsData, ...newUniqueTools];

// Save updated tools data
fs.writeFileSync(
  path.join(__dirname, 'aiToolsData.json'),
  JSON.stringify(mergedTools, null, 2)
);

// Create category-specific data files
const categories = [...new Set(mergedTools.map(t => t.category))];

categories.forEach(category => {
  const categoryTools = mergedTools.filter(t => t.category === category);
  const categorySlug = category.toLowerCase().replace(/[^a-z0-9]+/g, '-');
  
  fs.writeFileSync(
    path.join(__dirname, 'data', `category-${categorySlug}.json`),
    JSON.stringify({
      category: category,
      slug: categorySlug,
      tool_count: categoryTools.length,
      tools: categoryTools
    }, null, 2)
  );
});

// Create summary statistics
const summary = {
  total_tools: mergedTools.length,
  new_tools_added: newUniqueTools.length,
  categories: categories.map(cat => ({
    name: cat,
    slug: cat.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
    count: mergedTools.filter(t => t.category === cat).length
  })),
  last_updated: new Date().toISOString()
};

fs.writeFileSync(
  path.join(__dirname, 'data', 'summary.json'),
  JSON.stringify(summary, null, 2)
);

// Update public data for frontend
const publicToolsData = JSON.parse(
  fs.readFileSync(path.join(__dirname, 'public/data/aiToolsData.json'), 'utf8')
);

// Add new tools to public data
newUniqueTools.forEach(tool => {
  const slug = tool.tool_name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
  
  if (!publicToolsData.find(t => t.slug === slug)) {
    publicToolsData.push({
      id: slug,
      name: tool.tool_name,
      slug: slug,
      logo: tool.logo_url || `/images/tools/${slug}-logo.svg`,
      category: tool.category,
      description: tool.description,
      features: tool.features,
      pricing: tool.pricing,
      pros: tool.pros,
      cons: tool.cons,
      rating: tool.rating,
      affiliate_link: tool.affiliate_link,
      official_url: tool.official_url,
      seo: {
        title: `${tool.tool_name} Review, Pricing, Features & Alternatives [2025]`,
        description: `Comprehensive review of ${tool.tool_name}. Compare features, pricing, and alternatives.`,
        keywords: `${tool.tool_name}, ${tool.tool_name} review, ${tool.tool_name} pricing, ${tool.tool_name} alternatives`
      },
      schema: {
        "@type": "Product",
        name: tool.tool_name,
        image: tool.logo_url,
        description: tool.description,
        brand: {
          "@type": "Brand",
          name: tool.vendor
        },
        aggregateRating: tool.rating ? {
          "@type": "AggregateRating",
          ratingValue: tool.rating,
          reviewCount: tool.review_count || 100
        } : undefined
      }
    });
  }
});

fs.writeFileSync(
  path.join(__dirname, 'public/data/aiToolsData.json'),
  JSON.stringify(publicToolsData, null, 2)
);

console.log(`✅ Integration complete!`);
console.log(`📊 Summary:`);
console.log(`   - Total tools: ${summary.total_tools}`);
console.log(`   - New tools added: ${summary.new_tools_added}`);
console.log(`   - Categories: ${summary.categories.length}`);
summary.categories.forEach(cat => {
  console.log(`     • ${cat.name}: ${cat.count} tools`);
});