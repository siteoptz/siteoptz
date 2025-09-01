// Unified data adapter for AI tools from multiple sources

// Category mapping for the new dataset
const CATEGORY_MAPPING = {
  'text-generation': 'Content Creation',
  'image-generation': 'Visual Content', 
  'code-generation': 'Development',
  'video-generation': 'Visual Content',
  'audio-generation': 'Best Voice AI Tools',
  'data-analysis': 'Data Analysis',
  'productivity': 'Productivity',
  'research-education': 'Research',
  'paid-search-ppc': 'Paid Search & PPC',
  'voice-ai-assistants': 'Best Voice AI Tools',
  'seo-optimization': 'SEO & Optimization',
  'social-media': 'Social Media'
};

/**
 * Convert new dataset tool format to unified format
 */
function convertNewFormatTool(tool, categoryName) {
  const pricingText = tool.pricing?.text || 'Contact for pricing';
  let monthlyPrice = 'Custom';
  
  if (tool.pricing?.price === 0) {
    monthlyPrice = 'Free';
  } else if (tool.pricing?.price && tool.pricing.price > 0) {
    monthlyPrice = tool.pricing.price;
  }

  return {
    tool_name: tool.name,
    vendor: tool.source || tool.name,
    category: CATEGORY_MAPPING[categoryName] || 'Other',
    description: tool.description,
    features: {
      core: tool.features || [],
      advanced: [],
      integrations: []
    },
    pricing: {
      monthly: monthlyPrice,
      yearly: monthlyPrice === 'Custom' || monthlyPrice === 'Free' ? monthlyPrice : monthlyPrice * 10,
      enterprise: 'Custom',
      price: pricingText,
      tier: 'month',
      yearlyIsMonthlyRate: false // New format uses annual total (monthlyPrice * 10)
    },
    free_trial: true, // Assume most have trials
    pros: tool.pros || [],
    cons: tool.cons || [],
    rating: tool.rating || 4.0,
    use_cases: tool.features || [],
    affiliate_link: tool.website || '#',
    logo_url: `/images/tools/${tool.id}-logo.svg`,
    search_volume: tool.reviewCount || 1000,
    cpc: 2.50,
    toolName: tool.name, // For backward compatibility
    logo: `/images/tools/${tool.id}-logo.svg` // For backward compatibility
  };
}

/**
 * Load and merge all AI tools data - SERVER SIDE ONLY
 * This function is designed to be called only in getStaticProps
 */
export function loadUnifiedToolsData(fs, path) {
  try {
    // Load existing aiToolsData.json
    const existingDataPath = path.join(process.cwd(), 'public/data/aiToolsData.json');
    let existingTools = [];
    
    if (fs.existsSync(existingDataPath)) {
      const existingData = JSON.parse(fs.readFileSync(existingDataPath, 'utf-8'));
      existingTools = existingData.map(tool => ({
        tool_name: tool.name,
        vendor: tool.overview?.developer || tool.name,
        category: tool.category || tool.overview?.category || 'Other',
        description: tool.overview?.description || tool.meta?.description || '',
        features: {
          core: tool.features || [],
          advanced: [],
          integrations: tool.overview?.integrations || []
        },
        pricing: (() => {
          // Find the first non-free plan for more accurate pricing display
          const firstPaidPlan = tool.pricing?.find(p => p.price_per_month > 0);
          const hasFreePlan = tool.pricing?.some(p => p.price_per_month === 0 && !p.plan?.toLowerCase().includes('enterprise'));
          
          // Determine monthly pricing (use first paid plan if available, otherwise first plan)
          const monthlyPlan = firstPaidPlan || tool.pricing?.[0];
          const monthlyPrice = monthlyPlan?.price_per_month;
          
          const monthly = monthlyPrice !== undefined ? 
                         (monthlyPrice === 0 ? 
                          // Check if this is an enterprise/API tool that should show Custom instead of Free
                          (tool.name?.toLowerCase().includes('enterprise') || 
                           tool.name?.toLowerCase().includes('api') ||
                           monthlyPlan?.plan?.toLowerCase().includes('api') ||
                           tool.id?.includes('enterprise')) ? 'Custom' : 'Free'
                         : monthlyPrice) : 'Custom';
          
          // Use second plan for yearly, or same as monthly
          const yearlyPlan = tool.pricing?.[1] || monthlyPlan;
          const yearlyPrice = yearlyPlan?.price_per_month;
          
          const yearly = yearlyPrice !== undefined ? 
                        (yearlyPrice === 0 ? 
                          (tool.name?.toLowerCase().includes('enterprise') || 
                           tool.name?.toLowerCase().includes('api') ||
                           tool.id?.includes('enterprise')) ? 'Custom' : 'Free'
                        : yearlyPrice) : 'Custom';
          
          // Enterprise is typically the last plan or a plan with "enterprise" in the name
          const enterprisePlan = tool.pricing?.find(p => p.plan?.toLowerCase().includes('enterprise')) || 
                                tool.pricing?.[tool.pricing.length - 1];
          const enterprisePrice = enterprisePlan?.price_per_month;
          
          const enterprise = enterprisePrice !== undefined ? 
                           (enterprisePrice === 0 || enterprisePrice === 'Custom' ? 'Custom' : enterprisePrice) : 'Custom';
          
          // Determine display price text
          let price;
          if (firstPaidPlan) {
            price = hasFreePlan ? 
                   `Free plan available, paid from $${firstPaidPlan.price_per_month}/month` :
                   `From $${firstPaidPlan.price_per_month}/month`;
          } else if (monthlyPrice === 0) {
            price = (tool.name?.toLowerCase().includes('enterprise') || 
                    tool.name?.toLowerCase().includes('api') ||
                    monthlyPlan?.plan?.toLowerCase().includes('api') ||
                    tool.id?.includes('enterprise')) ? 'Custom pricing' : 'Free';
          } else if (monthlyPrice) {
            price = `From $${monthlyPrice}/month`;
          } else {
            price = 'Custom';
          }
          
          return {
            monthly,
            yearly,
            enterprise,
            price,
            tier: 'month',
            // Add metadata to indicate if yearly price is monthly rate or annual total
            yearlyIsMonthlyRate: true // Since we're storing price_per_month from yearly plans
          };
        })(),
        free_trial: tool.pricing?.[0]?.price_per_month === 0,
        pros: tool.pros || [],
        cons: tool.cons || [],
        rating: tool.rating ? Math.round(tool.rating * 100) / 100 : 
                Math.round((((tool.benchmarks?.speed || 0) + (tool.benchmarks?.accuracy || 0) + 
                (tool.benchmarks?.integration || 0) + (tool.benchmarks?.ease_of_use || 0) + 
                (tool.benchmarks?.value || 0)) / 5 / 2 || 4.0) * 100) / 100,
        use_cases: tool.overview?.use_cases || [],
        affiliate_link: tool.affiliate_link || tool.overview?.website || '#',
        official_url: tool.overview?.website || tool.affiliate_link || '#',
        logo_url: tool.logo,
        search_volume: tool.search_volume || 1000,
        cpc: tool.cpc || 2.50,
        toolName: tool.name, // For backward compatibility
        logo: tool.logo, // For backward compatibility
        slug: tool.slug,
        id: tool.id
      }));
    }

    // Load new category-based datasets
    const newDataDir = path.join(process.cwd(), 'wordpress-package', 'data');
    const categoryFiles = [
      'text-generation.json',
      'image-generation.json', 
      'code-generation.json',
      'video-generation.json',
      'audio-generation.json',
      'data-analysis.json',
      'productivity.json',
      'research-education.json',
      'paid-search-ppc.json',
      'voice-ai-assistants.json',
      'seo-optimization.json',
      'social-media.json'
    ];

    const newTools = [];
    const existingToolNames = new Set(existingTools.map(t => (t.tool_name || '').toLowerCase()));

    categoryFiles.forEach(filename => {
      const filePath = path.join(newDataDir, filename);
      if (fs.existsSync(filePath)) {
        const categoryData = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
        const categoryName = filename.replace('.json', '');
        
        if (categoryData.tools) {
          categoryData.tools.forEach(tool => {
            // Only add if not already in existing data
            if (!existingToolNames.has(tool.name.toLowerCase())) {
              newTools.push(convertNewFormatTool(tool, categoryName));
            }
          });
        }
      }
    });

    // Combine both datasets
    const allTools = [...existingTools, ...newTools];
    
    // Sort by rating (highest first), then by name
    allTools.sort((a, b) => {
      if (b.rating !== a.rating) {
        return b.rating - a.rating;
      }
      return a.tool_name.localeCompare(b.tool_name);
    });

    return allTools;
  } catch (error) {
    console.error('Error loading unified tools data:', error);
    return [];
  }
}

/**
 * Get tools by category
 */
export function getToolsByCategory(tools, category) {
  if (!category) return tools;
  return tools.filter(tool => 
    tool.category === category || 
    tool.overview?.category === category
  );
}

/**
 * Get all unique categories
 */
export function getAllCategories(tools) {
  const categories = [...new Set(tools.map(tool => tool.category))];
  return categories.sort();
}

/**
 * Search tools by name or description
 */
export function searchTools(tools, query) {
  if (!query) return tools;
  
  const searchTerm = query.toLowerCase();
  return tools.filter(tool => 
    tool.tool_name.toLowerCase().includes(searchTerm) ||
    tool.description.toLowerCase().includes(searchTerm) ||
    tool.vendor.toLowerCase().includes(searchTerm)
  );
}

export default {
  loadUnifiedToolsData,
  getToolsByCategory,
  getAllCategories,
  searchTools
};