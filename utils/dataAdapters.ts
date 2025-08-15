/**
 * Data adapter utilities to convert between different data formats
 * for component compatibility
 */

// Convert from aiToolsData.json pricing format to simple calculator format
export function convertToSimplePricingFormat(pricing: {
  plan: string;
  price_per_month: number;
  features: string[];
}[]): {
  plan: string;
  price: string;
  details: string;
}[] {
  return pricing.map(p => {
    let price: string;
    
    // Check if this is actually enterprise/custom pricing vs truly free
    const isEnterpriseOrCustom = p.price_per_month === 0 && 
      (p.plan?.toLowerCase().includes('enterprise') || 
       p.plan?.toLowerCase().includes('custom') ||
       p.features?.some((f: string) => f.toLowerCase().includes('custom pricing')));
    
    const isTrulyFree = p.price_per_month === 0 && 
      p.plan?.toLowerCase().includes('free');
    
    if (isEnterpriseOrCustom) {
      price = 'Custom';
    } else if (isTrulyFree) {
      price = 'Free';
    } else if (p.price_per_month === 0) {
      price = 'Custom'; // Default for 0 price when not explicitly free
    } else {
      price = `$${p.price_per_month}/mo`;
    }
    
    return {
      plan: p.plan,
      price,
      details: p.features.join(' • ')
    };
  });
}

// Convert tool data for comparison table
export function prepareComparisonData(tools: any[]) {
  return tools.map(tool => ({
    ...tool,
    // Ensure all required fields exist
    features: tool.features || [],
    pros: tool.pros || [],
    cons: tool.cons || [],
    pricing: tool.pricing || [],
    benchmarks: {
      speed: tool.benchmarks?.speed || 5,
      accuracy: tool.benchmarks?.accuracy || 5,
      integration: tool.benchmarks?.integration || 5,
      ease_of_use: tool.benchmarks?.ease_of_use || 5,
      value: tool.benchmarks?.value || 5
    }
  }));
}

// Format FAQ data for schema markup
export function generateFAQSchema(faqs: any[], toolName?: string) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };
}

// Calculate overall rating from benchmarks
export function calculateOverallRating(benchmarks: {
  speed: number;
  accuracy: number;
  integration: number;
  ease_of_use: number;
  value: number;
}): number {
  const scores = Object.values(benchmarks);
  const average = scores.reduce((a, b) => a + b, 0) / scores.length;
  return Math.round(average * 10) / 10; // Round to 1 decimal
}

// Generate comparison URL
export function generateComparisonUrl(tool1: string, tool2: string): string {
  return `/compare/${tool1}-vs-${tool2}`;
}

// Format price for display
export function formatPrice(price: number): string {
  if (price === 0) return 'Free';
  if (price >= 1000) return `$${(price / 1000).toFixed(1)}k/mo`;
  return `$${price}/mo`;
}

// Get price range for a tool
export function getPriceRange(pricing: { price_per_month: number }[]): string {
  const prices = pricing.map(p => p.price_per_month).filter(p => p > 0);
  
  if (prices.length === 0) return 'Free';
  
  const min = Math.min(...prices);
  const max = Math.max(...prices);
  
  if (min === max) return formatPrice(min);
  
  return `${formatPrice(min)} - ${formatPrice(max)}`;
}

// Filter tools by category or features
export function filterTools(tools: any[], filters: {
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  features?: string[];
  minRating?: number;
}) {
  return tools.filter(tool => {
    // Category filter
    if (filters.category && tool.category !== filters.category) {
      return false;
    }
    
    // Price filter
    const prices = tool.pricing.map((p: any) => p.price_per_month);
    const minToolPrice = Math.min(...prices);
    const maxToolPrice = Math.max(...prices);
    
    if (filters.minPrice !== undefined && maxToolPrice < filters.minPrice) {
      return false;
    }
    
    if (filters.maxPrice !== undefined && minToolPrice > filters.maxPrice) {
      return false;
    }
    
    // Features filter
    if (filters.features && filters.features.length > 0) {
      const toolFeatures = tool.features.map((f: string) => f.toLowerCase());
      const hasAllFeatures = filters.features.every(f => 
        toolFeatures.some((tf: string) => tf.includes(f.toLowerCase()))
      );
      if (!hasAllFeatures) return false;
    }
    
    // Rating filter
    if (filters.minRating !== undefined) {
      const rating = calculateOverallRating(tool.benchmarks);
      if (rating < filters.minRating) return false;
    }
    
    return true;
  });
}

// Sort tools by various criteria
export function sortTools(tools: any[], sortBy: 'name' | 'price' | 'rating' | 'release_year') {
  return [...tools].sort((a, b) => {
    switch (sortBy) {
      case 'name':
        return a.name.localeCompare(b.name);
      
      case 'price':
        const aMinPrice = Math.min(...a.pricing.map((p: any) => p.price_per_month));
        const bMinPrice = Math.min(...b.pricing.map((p: any) => p.price_per_month));
        return aMinPrice - bMinPrice;
      
      case 'rating':
        const aRating = calculateOverallRating(a.benchmarks);
        const bRating = calculateOverallRating(b.benchmarks);
        return bRating - aRating; // Higher rating first
      
      case 'release_year':
        return b.overview.release_year - a.overview.release_year; // Newer first
      
      default:
        return 0;
    }
  });
}

// Generate meta tags for SEO
export function generateMetaTags(tool: any) {
  return {
    title: tool.meta?.title || `${tool.name} Review, Pricing & Features [2025]`,
    description: tool.meta?.description || `Compare ${tool.name} to other AI tools. See pricing, features, and performance benchmarks.`,
    keywords: [
      tool.name,
      `${tool.name} review`,
      `${tool.name} pricing`,
      `${tool.name} features`,
      `${tool.name} alternatives`,
      'AI tools',
      'AI comparison'
    ].join(', '),
    ogImage: tool.logo || '/images/default-tool.png',
    ogType: 'website',
    twitterCard: 'summary_large_image'
  };
}

// Export all adapters
export default {
  convertToSimplePricingFormat,
  prepareComparisonData,
  generateFAQSchema,
  calculateOverallRating,
  generateComparisonUrl,
  formatPrice,
  getPriceRange,
  filterTools,
  sortTools,
  generateMetaTags
};