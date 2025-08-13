// Data manipulation helpers for sorting, filtering, and transforming tool data

/**
 * Sort tools by various criteria
 * @param {Array} tools - Array of tool objects
 * @param {string} sortBy - Sort criteria (name, price, rating, popularity)
 * @param {string} direction - Sort direction (asc, desc)
 * @returns {Array} Sorted array of tools
 */
export function sortTools(tools, sortBy = 'name', direction = 'asc') {
  const sortedTools = [...tools].sort((a, b) => {
    let valueA, valueB;
    
    switch (sortBy) {
      case 'name':
        valueA = a.name.toLowerCase();
        valueB = b.name.toLowerCase();
        return direction === 'asc' 
          ? valueA.localeCompare(valueB)
          : valueB.localeCompare(valueA);
      
      case 'price':
        valueA = a.pricing.startingPrice || 0;
        valueB = b.pricing.startingPrice || 0;
        break;
      
      case 'rating':
        valueA = a.rating || 0;
        valueB = b.rating || 0;
        break;
      
      case 'popularity':
        valueA = a.reviewCount || 0;
        valueB = b.reviewCount || 0;
        break;
      
      case 'category':
        valueA = a.category.toLowerCase();
        valueB = b.category.toLowerCase();
        return direction === 'asc' 
          ? valueA.localeCompare(valueB)
          : valueB.localeCompare(valueA);
      
      default:
        return 0;
    }
    
    if (direction === 'asc') {
      return valueA - valueB;
    } else {
      return valueB - valueA;
    }
  });
  
  return sortedTools;
}

/**
 * Filter tools based on multiple criteria
 * @param {Array} tools - Array of tool objects
 * @param {Object} filters - Filter criteria object
 * @returns {Array} Filtered array of tools
 */
export function filterTools(tools, filters = {}) {
  return tools.filter(tool => {
    // Price range filter
    if (filters.priceRange) {
      const [minPrice, maxPrice] = filters.priceRange;
      const toolPrice = tool.pricing.startingPrice || 0;
      if (toolPrice < minPrice || toolPrice > maxPrice) {
        return false;
      }
    }
    
    // Category filter
    if (filters.category && filters.category !== 'all') {
      if (tool.category.toLowerCase() !== filters.category.toLowerCase()) {
        return false;
      }
    }
    
    // Rating filter
    if (filters.minRating) {
      if (!tool.rating || tool.rating < filters.minRating) {
        return false;
      }
    }
    
    // Free tier filter
    if (filters.hasFreeTier !== undefined) {
      if (tool.pricing.freeTier !== filters.hasFreeTier) {
        return false;
      }
    }
    
    // Features filter
    if (filters.requiredFeatures && filters.requiredFeatures.length > 0) {
      const allFeatures = [
        ...tool.features.core,
        ...tool.features.advanced,
        ...tool.features.integrations
      ].map(f => f.toLowerCase());
      
      const hasAllFeatures = filters.requiredFeatures.every(required =>
        allFeatures.some(feature => 
          feature.includes(required.toLowerCase())
        )
      );
      
      if (!hasAllFeatures) {
        return false;
      }
    }
    
    // Use case filter
    if (filters.useCase && filters.useCase !== 'all') {
      const hasUseCase = tool.useCases.some(useCase =>
        useCase.toLowerCase().includes(filters.useCase.toLowerCase())
      );
      
      if (!hasUseCase) {
        return false;
      }
    }
    
    // Target audience filter
    if (filters.targetAudience && filters.targetAudience !== 'all') {
      const hasAudience = tool.targetAudience.some(audience =>
        audience.toLowerCase().includes(filters.targetAudience.toLowerCase())
      );
      
      if (!hasAudience) {
        return false;
      }
    }
    
    // Search query filter
    if (filters.searchQuery) {
      const query = filters.searchQuery.toLowerCase();
      const searchableFields = [
        tool.name,
        tool.vendor,
        tool.description,
        tool.tagline,
        ...tool.features.core,
        ...tool.features.advanced,
        ...tool.useCases,
        ...tool.targetAudience
      ].join(' ').toLowerCase();
      
      if (!searchableFields.includes(query)) {
        return false;
      }
    }
    
    return true;
  });
}

/**
 * Get unique values for filter options
 * @param {Array} tools - Array of tool objects
 * @returns {Object} Unique filter options
 */
export function getFilterOptions(tools) {
  const categories = [...new Set(tools.map(tool => tool.category))];
  const vendors = [...new Set(tools.map(tool => tool.vendor))];
  const useCases = [...new Set(tools.flatMap(tool => tool.useCases))];
  const targetAudiences = [...new Set(tools.flatMap(tool => tool.targetAudience))];
  const features = [...new Set(tools.flatMap(tool => [
    ...tool.features.core,
    ...tool.features.advanced,
    ...tool.features.integrations
  ]))];
  
  const priceRange = {
    min: Math.min(...tools.map(tool => tool.pricing.startingPrice || 0)),
    max: Math.max(...tools.map(tool => tool.pricing.startingPrice || 0))
  };
  
  return {
    categories: categories.sort(),
    vendors: vendors.sort(),
    useCases: useCases.sort(),
    targetAudiences: targetAudiences.sort(),
    features: features.sort(),
    priceRange
  };
}

/**
 * Find tool by ID
 * @param {Array} tools - Array of tool objects
 * @param {string} id - Tool ID
 * @returns {Object|null} Tool object or null if not found
 */
export function findToolById(tools, id) {
  return tools.find(tool => tool.id === id) || null;
}

/**
 * Find tools by IDs
 * @param {Array} tools - Array of tool objects
 * @param {Array} ids - Array of tool IDs
 * @returns {Array} Array of tool objects
 */
export function findToolsByIds(tools, ids) {
  return ids.map(id => findToolById(tools, id)).filter(Boolean);
}

/**
 * Get tool alternatives/competitors
 * @param {Array} tools - Array of tool objects
 * @param {string} toolId - Current tool ID
 * @param {number} limit - Number of alternatives to return
 * @returns {Array} Array of alternative tools
 */
export function getToolAlternatives(tools, toolId, limit = 4) {
  const currentTool = findToolById(tools, toolId);
  if (!currentTool) return [];
  
  // Get tools in the same category first
  const sameCategory = tools.filter(tool => 
    tool.id !== toolId && 
    tool.category === currentTool.category
  );
  
  // Get tools from alternative list
  const explicitAlternatives = tools.filter(tool =>
    currentTool.alternatives.includes(tool.name)
  );
  
  // Combine and deduplicate
  const alternatives = [...new Set([...explicitAlternatives, ...sameCategory])];
  
  // Sort by rating and return limited results
  return alternatives
    .sort((a, b) => (b.rating || 0) - (a.rating || 0))
    .slice(0, limit);
}

/**
 * Generate comparison pairs for featured comparisons
 * @param {Array} tools - Array of tool objects
 * @param {number} limit - Number of comparison pairs to return
 * @returns {Array} Array of comparison pair objects
 */
export function generateComparisonPairs(tools, limit = 6) {
  const pairs = [];
  
  // Generate all possible pairs
  for (let i = 0; i < tools.length; i++) {
    for (let j = i + 1; j < tools.length; j++) {
      const toolA = tools[i];
      const toolB = tools[j];
      
      // Calculate relevance score based on category similarity and popularity
      let relevanceScore = 0;
      
      // Same category gets higher score
      if (toolA.category === toolB.category) {
        relevanceScore += 3;
      }
      
      // Popular tools get higher score
      relevanceScore += (toolA.reviewCount || 0) / 10000;
      relevanceScore += (toolB.reviewCount || 0) / 10000;
      
      // High-rated tools get higher score
      relevanceScore += (toolA.rating || 0);
      relevanceScore += (toolB.rating || 0);
      
      pairs.push({
        toolA,
        toolB,
        id: `${toolA.id}-vs-${toolB.id}`,
        url: `/compare/${toolA.id}-vs-${toolB.id}`,
        title: `${toolA.name} vs ${toolB.name}`,
        relevanceScore
      });
    }
  }
  
  // Sort by relevance and return top pairs
  return pairs
    .sort((a, b) => b.relevanceScore - a.relevanceScore)
    .slice(0, limit);
}

/**
 * Generate FAQ data for tool comparisons
 * @param {Object} toolA - First tool object
 * @param {Object} toolB - Second tool object (optional)
 * @returns {Array} Array of FAQ objects
 */
export function generateComparisonFAQs(toolA, toolB = null) {
  const faqs = [];
  
  if (toolB) {
    // Comparison FAQs
    faqs.push(
      {
        question: `What's the main difference between ${toolA.name} and ${toolB.name}?`,
        answer: `${toolA.name} focuses on ${toolA.tagline.toLowerCase()}, while ${toolB.name} specializes in ${toolB.tagline.toLowerCase()}. The main differences lie in their feature sets, pricing models, and target use cases.`
      },
      {
        question: `Which is better for my team: ${toolA.name} or ${toolB.name}?`,
        answer: `The choice depends on your specific needs. ${toolA.name} is better for ${toolA.useCases.slice(0, 2).join(' and ')}, while ${toolB.name} excels at ${toolB.useCases.slice(0, 2).join(' and ')}. Consider your budget, team size, and primary use cases.`
      },
      {
        question: `How do ${toolA.name} and ${toolB.name} pricing compare?`,
        answer: `${toolA.name} starts at $${toolA.pricing.startingPrice || 'free'} per month, while ${toolB.name} starts at $${toolB.pricing.startingPrice || 'free'} per month. Both offer ${toolA.pricing.freeTier && toolB.pricing.freeTier ? 'free tiers and ' : ''}multiple pricing plans to suit different needs.`
      }
    );
  } else {
    // Single tool FAQs
    faqs.push(
      {
        question: `What is ${toolA.name} and what does it do?`,
        answer: `${toolA.name} is ${toolA.description}. It's designed for ${toolA.targetAudience.slice(0, 2).join(' and ')} who need ${toolA.useCases.slice(0, 2).join(' and ')}.`
      },
      {
        question: `How much does ${toolA.name} cost?`,
        answer: `${toolA.name} ${toolA.pricing.freeTier ? 'offers a free tier and ' : ''}starts at $${toolA.pricing.startingPrice || 0} per month. They offer multiple plans including ${toolA.pricing.plans.map(p => p.name).join(', ')} to suit different needs and budgets.`
      },
      {
        question: `What are the main features of ${toolA.name}?`,
        answer: `${toolA.name}'s core features include ${toolA.features.core.slice(0, 3).join(', ')}. Advanced features include ${toolA.features.advanced.slice(0, 2).join(' and ')}.`
      }
    );
  }
  
  return faqs;
}

/**
 * Calculate feature comparison matrix
 * @param {Array} tools - Array of tool objects to compare
 * @returns {Object} Feature comparison matrix
 */
export function generateFeatureMatrix(tools) {
  // Get all unique features across all tools
  const allFeatures = [...new Set(
    tools.flatMap(tool => [
      ...tool.features.core,
      ...tool.features.advanced,
      ...tool.features.integrations
    ])
  )].sort();
  
  // Create matrix
  const matrix = allFeatures.map(feature => {
    const row = {
      feature,
      category: categorizeFeature(feature),
      tools: {}
    };
    
    tools.forEach(tool => {
      const hasFeature = [
        ...tool.features.core,
        ...tool.features.advanced,
        ...tool.features.integrations
      ].some(f => f.toLowerCase() === feature.toLowerCase());
      
      row.tools[tool.id] = {
        hasFeature,
        tier: getFeatureTier(feature, tool)
      };
    });
    
    return row;
  });
  
  return {
    features: allFeatures,
    matrix,
    tools: tools.map(tool => ({ id: tool.id, name: tool.name }))
  };
}

/**
 * Categorize a feature into a logical group
 * @param {string} feature - Feature name
 * @returns {string} Feature category
 */
function categorizeFeature(feature) {
  const feature_lower = feature.toLowerCase();
  
  if (feature_lower.includes('api') || feature_lower.includes('integration')) {
    return 'Integrations';
  }
  if (feature_lower.includes('team') || feature_lower.includes('collaboration')) {
    return 'Collaboration';
  }
  if (feature_lower.includes('security') || feature_lower.includes('sso')) {
    return 'Security';
  }
  if (feature_lower.includes('analytics') || feature_lower.includes('reporting')) {
    return 'Analytics';
  }
  if (feature_lower.includes('template') || feature_lower.includes('preset')) {
    return 'Templates';
  }
  
  return 'Core Features';
}

/**
 * Determine which tier a feature belongs to for a specific tool
 * @param {string} feature - Feature name
 * @param {Object} tool - Tool object
 * @returns {string} Feature tier (core, advanced, integration)
 */
function getFeatureTier(feature, tool) {
  if (tool.features.core.some(f => f.toLowerCase() === feature.toLowerCase())) {
    return 'core';
  }
  if (tool.features.advanced.some(f => f.toLowerCase() === feature.toLowerCase())) {
    return 'advanced';
  }
  if (tool.features.integrations.some(f => f.toLowerCase() === feature.toLowerCase())) {
    return 'integration';
  }
  return 'unknown';
}

/**
 * Export commonly used filter and sort combinations
 */
export const COMMON_FILTERS = {
  FREE_TOOLS: { hasFreeTier: true },
  PREMIUM_TOOLS: { hasFreeTier: false },
  HIGH_RATED: { minRating: 4.0 },
  CONVERSATIONAL_AI: { category: 'Conversational AI' },
  CONTENT_CREATION: { category: 'Content Creation' },
  UNDER_50: { priceRange: [0, 50] },
  ENTERPRISE: { priceRange: [100, 1000] }
};

export const SORT_OPTIONS = [
  { value: 'name', label: 'Name (A-Z)', direction: 'asc' },
  { value: 'name', label: 'Name (Z-A)', direction: 'desc' },
  { value: 'price', label: 'Price (Low to High)', direction: 'asc' },
  { value: 'price', label: 'Price (High to Low)', direction: 'desc' },
  { value: 'rating', label: 'Rating (High to Low)', direction: 'desc' },
  { value: 'popularity', label: 'Most Popular', direction: 'desc' },
  { value: 'category', label: 'Category', direction: 'asc' }
];