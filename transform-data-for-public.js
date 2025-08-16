const fs = require('fs');
const path = require('path');

// Read the comprehensive data from root
const sourceData = JSON.parse(fs.readFileSync('aiToolsData.json', 'utf8'));

// Transform each tool to match the expected structure
const transformedData = sourceData.map(tool => {
  // Create slug from tool name
  const slug = (tool.tool_name || tool.name || '').toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');

  // Create id from slug
  const id = slug;

  // Transform pricing array
  const pricing = [];
  if (tool.pricing) {
    if (tool.pricing.monthly !== undefined) {
      pricing.push({
        plan: 'Monthly',
        price_per_month: typeof tool.pricing.monthly === 'string' && tool.pricing.monthly.toLowerCase() === 'free' ? 0 : 
                        typeof tool.pricing.monthly === 'string' && tool.pricing.monthly.toLowerCase() === 'custom' ? 0 :
                        parseFloat(tool.pricing.monthly) || 0,
        features: tool.features?.core?.slice(0, 3) || []
      });
    }
    if (tool.pricing.yearly !== undefined) {
      pricing.push({
        plan: 'Yearly',
        price_per_month: typeof tool.pricing.yearly === 'string' && tool.pricing.yearly.toLowerCase() === 'free' ? 0 : 
                        typeof tool.pricing.yearly === 'string' && tool.pricing.yearly.toLowerCase() === 'custom' ? 0 :
                        Math.round((parseFloat(tool.pricing.yearly) || 0) / 12),
        features: tool.features?.advanced?.slice(0, 3) || []
      });
    }
    if (tool.pricing.enterprise !== undefined) {
      pricing.push({
        plan: 'Enterprise',
        price_per_month: typeof tool.pricing.enterprise === 'string' ? 0 : parseFloat(tool.pricing.enterprise) || 0,
        features: tool.features?.integrations?.slice(0, 3) || []
      });
    }
  }

  // If no pricing, create default
  if (pricing.length === 0) {
    pricing.push({
      plan: 'Free',
      price_per_month: 0,
      features: tool.features?.core?.slice(0, 3) || []
    });
  }

  // Generate benchmarks (mock data for now)
  const benchmarks = {
    ease_of_use: tool.rating ? Math.round(tool.rating * 2) : 8,
    features: tool.features?.core?.length ? Math.min(10, Math.round(tool.features.core.length / 2)) : 7,
    value_for_money: tool.rating ? Math.round(tool.rating * 2) : 7,
    customer_support: tool.rating ? Math.round(tool.rating * 2) : 6,
    integration: tool.features?.integrations?.length ? Math.min(10, tool.features.integrations.length) : 5
  };

  return {
    id,
    name: tool.tool_name || tool.name || '',
    slug,
    logo: tool.logo_url || tool.logo || '/images/tools/placeholder-logo.svg',
    meta: {
      title: `${tool.tool_name || tool.name} Review, Pricing, Features & Alternatives [2025]`,
      description: tool.description || `Comprehensive review of ${tool.tool_name || tool.name}. Compare features, pricing, and alternatives.`
    },
    schema: {
      "@type": "Product",
      "name": tool.tool_name || tool.name || '',
      "image": tool.logo_url || tool.logo || '/images/tools/placeholder-logo.svg',
      "description": tool.description || `AI tool by ${tool.vendor || 'Unknown'}`,
      "brand": tool.vendor || 'Unknown'
    },
    overview: {
      developer: tool.vendor || 'Unknown',
      release_year: 2023,
      category: tool.category || 'AI Tool',
      description: tool.description || `${tool.tool_name || tool.name} is an AI-powered tool designed to enhance productivity and efficiency.`,
      website: tool.affiliate_link || '#',
      support: 'Email, Chat',
      use_cases: tool.use_cases || [],
      integrations: tool.features?.integrations || []
    },
    features: tool.features?.core || [],
    pros: tool.pros || [],
    cons: tool.cons || [],
    pricing,
    benchmarks,
    affiliate_link: tool.affiliate_link || '#',
    search_volume: tool.search_volume || 1000,
    cpc: tool.cpc || 2.5
  };
});

// Write to public/data directory
const outputPath = path.join('public', 'data', 'aiToolsData.json');
fs.writeFileSync(outputPath, JSON.stringify(transformedData, null, 2));

console.log(`Transformed ${transformedData.length} tools and saved to ${outputPath}`);
console.log('Sample tool structure:');
console.log(JSON.stringify(transformedData[0], null, 2));