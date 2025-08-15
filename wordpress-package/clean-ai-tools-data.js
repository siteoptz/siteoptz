function cleanAIToolsData(tools) {
  return tools
    .filter(tool => {
      // Remove tools without essential data
      return tool.name && tool.description && tool.website;
    })
    .map(tool => {
      // Clean and normalize data
      return {
        id: generateId(tool.name),
        name: cleanText(tool.name),
        description: cleanText(tool.description),
        category: normalizeCategory(tool.category),
        pricing: normalizePricing(tool.pricing),
        rating: normalizeRating(tool.rating),
        website: cleanUrl(tool.website),
        source: tool.source,
        features: extractFeatures(tool.description),
        pros: [],
        cons: [],
        reviewCount: 0,
        lastUpdated: new Date().toISOString()
      };
    })
    .filter((tool, index, self) => {
      // Remove duplicates based on name
      return index === self.findIndex(t => t.name === tool.name);
    });
}

function generateId(name) {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
}

function cleanText(text) {
  return text
    .trim()
    .replace(/\s+/g, ' ')
    .replace(/[^\w\s\-.,!?]/g, '');
}

function normalizeCategory(category) {
  const categoryMap = {
    'text': 'text-generation',
    'image': 'image-generation',
    'video': 'video-generation',
    'audio': 'audio-generation',
    'code': 'code-generation',
    'data': 'data-analysis',
    'chatbot': 'chatbots',
    'automation': 'automation',
    'productivity': 'productivity',
    'marketing': 'marketing',
    'design': 'design'
  };
  
  return categoryMap[category.toLowerCase()] || category.toLowerCase();
}

function normalizePricing(pricing) {
  if (!pricing) return { free: true, plans: [] };
  
  if (typeof pricing === 'number') {
    return {
      free: pricing === 0,
      plans: [{
        name: 'Pro',
        price: pricing,
        currency: 'USD',
        billing: 'monthly',
        features: []
      }]
    };
  }
  
  return pricing;
}

function normalizeRating(rating) {
  if (!rating) return null;
  return Math.min(Math.max(rating, 0), 5);
}

function cleanUrl(url) {
  try {
    const urlObj = new URL(url);
    return urlObj.origin;
  } catch {
    return url;
  }
}

function extractFeatures(description) {
  // Extract potential features from description
  const featureKeywords = [
    'api', 'integration', 'collaboration', 'templates',
    'customization', 'analytics', 'export', 'import',
    'real-time', 'automation', 'scheduling', 'notifications'
  ];
  
  return featureKeywords.filter(keyword => 
    description.toLowerCase().includes(keyword)
  );
}

module.exports = { cleanAIToolsData };
