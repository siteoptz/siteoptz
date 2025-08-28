const fs = require('fs').promises;
const path = require('path');

// Calculate average rating
function calculateAverageRating(tools) {
  const validRatings = tools.filter(t => t.rating && t.rating > 0);
  if (validRatings.length === 0) return 0;
  
  const sum = validRatings.reduce((acc, t) => acc + t.rating, 0);
  return (sum / validRatings.length).toFixed(2);
}

// Analyze pricing distribution
function analyzePricing(tools) {
  const pricing = {
    free: 0,
    freemium: 0,
    paid: 0,
    custom: 0,
    unknown: 0,
    priceRanges: {
      free: [],
      under10: [],
      under25: [],
      under50: [],
      under100: [],
      over100: [],
      custom: []
    }
  };
  
  tools.forEach(tool => {
    if (!tool.pricing) {
      pricing.unknown++;
      return;
    }
    
    if (tool.pricing.free) {
      pricing.free++;
      pricing.priceRanges.free.push(tool.name);
    } else if (tool.pricing.freemium) {
      pricing.freemium++;
      pricing.priceRanges.free.push(tool.name);
    } else if (tool.pricing.custom) {
      pricing.custom++;
      pricing.priceRanges.custom.push(tool.name);
    } else if (tool.pricing.startingPrice !== null) {
      pricing.paid++;
      const price = tool.pricing.startingPrice;
      
      if (price === 0) {
        pricing.priceRanges.free.push(tool.name);
      } else if (price < 10) {
        pricing.priceRanges.under10.push(tool.name);
      } else if (price < 25) {
        pricing.priceRanges.under25.push(tool.name);
      } else if (price < 50) {
        pricing.priceRanges.under50.push(tool.name);
      } else if (price < 100) {
        pricing.priceRanges.under100.push(tool.name);
      } else {
        pricing.priceRanges.over100.push(tool.name);
      }
    } else {
      pricing.unknown++;
    }
  });
  
  return pricing;
}

// Analyze feature trends
function analyzeFeatures(tools) {
  const featureFrequency = {};
  const commonFeatures = [];
  
  tools.forEach(tool => {
    if (tool.features && Array.isArray(tool.features)) {
      tool.features.forEach(feature => {
        const normalizedFeature = feature.toLowerCase().trim();
        featureFrequency[normalizedFeature] = (featureFrequency[normalizedFeature] || 0) + 1;
      });
    }
  });
  
  // Sort by frequency and get top features
  const sortedFeatures = Object.entries(featureFrequency)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 20);
  
  sortedFeatures.forEach(([feature, count]) => {
    commonFeatures.push({
      feature: feature,
      count: count,
      percentage: ((count / tools.length) * 100).toFixed(1) + '%'
    });
  });
  
  return {
    totalUniqueFeatures: Object.keys(featureFrequency).length,
    topFeatures: commonFeatures,
    averageFeaturesPerTool: (tools.reduce((sum, t) => 
      sum + (t.features?.length || 0), 0) / tools.length).toFixed(1)
  };
}

// Analyze categories
function analyzeCategories(tools) {
  const categoryStats = {};
  
  tools.forEach(tool => {
    const category = tool.category || 'uncategorized';
    
    if (!categoryStats[category]) {
      categoryStats[category] = {
        count: 0,
        tools: [],
        avgRating: 0,
        avgReviewCount: 0,
        topRated: null,
        mostReviewed: null,
        pricingBreakdown: {
          free: 0,
          paid: 0
        }
      };
    }
    
    categoryStats[category].count++;
    categoryStats[category].tools.push(tool.name);
    
    if (tool.pricing?.free) {
      categoryStats[category].pricingBreakdown.free++;
    } else {
      categoryStats[category].pricingBreakdown.paid++;
    }
  });
  
  // Calculate averages and find top tools per category
  Object.keys(categoryStats).forEach(category => {
    const categoryTools = tools.filter(t => t.category === category);
    const stats = categoryStats[category];
    
    // Average rating
    const validRatings = categoryTools.filter(t => t.rating);
    if (validRatings.length > 0) {
      stats.avgRating = (validRatings.reduce((sum, t) => 
        sum + t.rating, 0) / validRatings.length).toFixed(2);
      
      // Top rated tool
      const topRated = validRatings.sort((a, b) => b.rating - a.rating)[0];
      stats.topRated = {
        name: topRated.name,
        rating: topRated.rating
      };
    }
    
    // Average review count
    const validReviews = categoryTools.filter(t => t.reviewCount);
    if (validReviews.length > 0) {
      stats.avgReviewCount = Math.round(validReviews.reduce((sum, t) => 
        sum + t.reviewCount, 0) / validReviews.length);
      
      // Most reviewed tool
      const mostReviewed = validReviews.sort((a, b) => b.reviewCount - a.reviewCount)[0];
      stats.mostReviewed = {
        name: mostReviewed.name,
        reviewCount: mostReviewed.reviewCount
      };
    }
  });
  
  return categoryStats;
}

// Analyze data sources
function analyzeSources(tools) {
  const sourceStats = {};
  
  tools.forEach(tool => {
    const source = tool.source || 'unknown';
    
    if (!sourceStats[source]) {
      sourceStats[source] = {
        count: 0,
        categories: new Set(),
        avgRating: 0,
        tools: []
      };
    }
    
    sourceStats[source].count++;
    sourceStats[source].categories.add(tool.category);
    sourceStats[source].tools.push(tool.name);
  });
  
  // Convert sets to arrays and calculate averages
  Object.keys(sourceStats).forEach(source => {
    const sourceTools = tools.filter(t => t.source === source);
    const stats = sourceStats[source];
    
    stats.categories = Array.from(stats.categories);
    
    const validRatings = sourceTools.filter(t => t.rating);
    if (validRatings.length > 0) {
      stats.avgRating = (validRatings.reduce((sum, t) => 
        sum + t.rating, 0) / validRatings.length).toFixed(2);
    }
  });
  
  return sourceStats;
}

// Generate growth metrics
function generateGrowthMetrics(tools) {
  const now = new Date();
  const metrics = {
    totalTools: tools.length,
    toolsAddedToday: 0,
    toolsAddedThisWeek: 0,
    toolsAddedThisMonth: 0,
    recentlyUpdated: [],
    newestTools: []
  };
  
  tools.forEach(tool => {
    const scrapedDate = tool.lastScraped ? new Date(tool.lastScraped) : null;
    
    if (scrapedDate) {
      const daysDiff = Math.floor((now - scrapedDate) / (1000 * 60 * 60 * 24));
      
      if (daysDiff === 0) {
        metrics.toolsAddedToday++;
      }
      if (daysDiff <= 7) {
        metrics.toolsAddedThisWeek++;
      }
      if (daysDiff <= 30) {
        metrics.toolsAddedThisMonth++;
      }
    }
  });
  
  // Get newest tools
  metrics.newestTools = tools
    .filter(t => t.lastScraped)
    .sort((a, b) => new Date(b.lastScraped) - new Date(a.lastScraped))
    .slice(0, 10)
    .map(t => ({
      name: t.name,
      category: t.category,
      addedOn: t.lastScraped
    }));
  
  // Get recently updated tools
  metrics.recentlyUpdated = tools
    .filter(t => t.lastUpdated)
    .sort((a, b) => new Date(b.lastUpdated) - new Date(a.lastUpdated))
    .slice(0, 10)
    .map(t => ({
      name: t.name,
      category: t.category,
      updatedOn: t.lastUpdated
    }));
  
  return metrics;
}

// Main analytics generation
async function generateAnalytics(tools) {
  console.log('📊 Generating comprehensive analytics...');
  
  const analytics = {
    timestamp: new Date().toISOString(),
    overview: {
      totalTools: tools.length,
      totalCategories: new Set(tools.map(t => t.category)).size,
      averageRating: calculateAverageRating(tools),
      totalReviews: tools.reduce((sum, t) => sum + (t.reviewCount || 0), 0)
    },
    pricing: analyzePricing(tools),
    features: analyzeFeatures(tools),
    categories: analyzeCategories(tools),
    sources: analyzeSources(tools),
    growth: generateGrowthMetrics(tools),
    topTools: {
      byRating: tools
        .filter(t => t.rating)
        .sort((a, b) => b.rating - a.rating)
        .slice(0, 20)
        .map(t => ({
          name: t.name,
          category: t.category,
          rating: t.rating,
          reviewCount: t.reviewCount
        })),
      byReviews: tools
        .filter(t => t.reviewCount)
        .sort((a, b) => b.reviewCount - a.reviewCount)
        .slice(0, 20)
        .map(t => ({
          name: t.name,
          category: t.category,
          rating: t.rating,
          reviewCount: t.reviewCount
        }))
    }
  };
  
  // Save analytics
  const analyticsDir = path.join(__dirname, 'data', 'analytics');
  await fs.mkdir(analyticsDir, { recursive: true });
  
  const analyticsPath = path.join(analyticsDir, 'latest-analytics.json');
  await fs.writeFile(analyticsPath, JSON.stringify(analytics, null, 2));
  
  // Also save timestamped version
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  const timestampPath = path.join(analyticsDir, `analytics-${timestamp}.json`);
  await fs.writeFile(timestampPath, JSON.stringify(analytics, null, 2));
  
  console.log(`✅ Analytics saved to: ${analyticsPath}`);
  
  return analytics;
}

module.exports = {
  generateAnalytics,
  calculateAverageRating,
  analyzePricing,
  analyzeFeatures,
  analyzeCategories,
  analyzeSources,
  generateGrowthMetrics
};