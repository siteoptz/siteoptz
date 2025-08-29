const fs = require('fs');
const path = require('path');

/**
 * Simple tool validation and cleanup script
 * Ensures all tools in aiToolsData.json follow the correct format
 */

function validateAndCleanTools() {
  const dataPath = path.join(__dirname, 'public/data/aiToolsData.json');
  
  if (!fs.existsSync(dataPath)) {
    console.error('❌ aiToolsData.json not found');
    return;
  }
  
  const tools = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
  const cleanedTools = [];
  
  console.log(`📊 Validating ${tools.length} tools...`);
  
  tools.forEach((tool, index) => {
    const issues = [];
    
    // Required fields
    if (!tool.id) issues.push('Missing id');
    if (!tool.name) issues.push('Missing name');
    if (!tool.slug) issues.push('Missing slug');
    if (!tool.description && !tool.overview?.description) issues.push('Missing description');
    
    // Fix data types
    const cleanedTool = {
      id: tool.id || `tool-${index}`,
      name: tool.name || 'Unknown Tool',
      slug: tool.slug || tool.name?.toLowerCase().replace(/[^a-z0-9]+/g, '-') || `tool-${index}`,
      description: tool.description || tool.overview?.description || '',
      logo: tool.logo || `/images/tools/${tool.id || `tool-${index}`}-logo.svg`,
      category: tool.category || tool.overview?.category || 'Other',
      website: tool.website || tool.overview?.website || '#',
      
      // Ensure features is array
      features: Array.isArray(tool.features) ? tool.features : 
                (tool.features?.core ? [...(tool.features.core || []), ...(tool.features.advanced || [])] : []),
      
      // Ensure pricing is array
      pricing: Array.isArray(tool.pricing) ? tool.pricing : 
               (tool.pricing?.tiers ? tool.pricing.tiers.map(tier => ({
                 plan: tier.name || tier.plan || 'Plan',
                 price_per_month: tier.price === 'Custom' ? 'Custom' : 
                                 typeof tier.price === 'string' && tier.price.replace(/[$,]/g, '') === '0' ? 0 :
                                 typeof tier.price === 'number' ? tier.price :
                                 parseInt((tier.price || '0').toString().replace(/[$,]/g, '')) || 0,
                 features: Array.isArray(tier.features) ? tier.features : []
               })) : []),
      
      // Ensure arrays
      pros: Array.isArray(tool.pros) ? tool.pros : [],
      cons: Array.isArray(tool.cons) ? tool.cons : [],
      
      // Add defaults for missing fields
      rating: tool.rating || 4.0,
      review_count: tool.review_count || 100,
      
      benchmarks: tool.benchmarks || {
        speed: 7,
        accuracy: 7, 
        integration: 7,
        ease_of_use: 7,
        value: 7
      },
      
      // Keep meta and overview for SEO
      meta: tool.meta || {
        title: `${tool.name} Review, Pricing, Features & Alternatives [2025]`,
        description: `Comprehensive review of ${tool.name}. ${tool.description || tool.overview?.description || ''} Compare features, pricing, and alternatives.`
      },
      
      overview: tool.overview || {
        developer: tool.name,
        release_year: 2024,
        description: tool.description || ''
      }
    };
    
    if (issues.length > 0) {
      console.log(`⚠️  ${tool.name}: ${issues.join(', ')}`);
    }
    
    cleanedTools.push(cleanedTool);
  });
  
  // Write cleaned data back
  fs.writeFileSync(dataPath, JSON.stringify(cleanedTools, null, 2));
  
  console.log(`✅ Validated and cleaned ${cleanedTools.length} tools`);
  console.log(`📁 Updated: ${dataPath}`);
}

// Run if called directly
if (require.main === module) {
  validateAndCleanTools();
}

module.exports = { validateAndCleanTools };