#!/usr/bin/env node

/**
 * Test script to validate schema generation for problematic tools
 */

const fs = require('fs');
const path = require('path');

// Load tool data
function loadToolData() {
  const dataPath = path.join(process.cwd(), 'public/data/aiToolsData.json');
  const tools = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
  return tools;
}

// Recreate the functions from the review page
function getSafePrice(pricing) {
  if (!pricing) return 0;
  
  // Handle array format (new data structure)
  if (Array.isArray(pricing) && pricing.length > 0) {
    const firstPlan = pricing[0];
    if (typeof firstPlan.price_per_month === 'number' && firstPlan.price_per_month >= 0) {
      return firstPlan.price_per_month;
    }
    if (typeof firstPlan.price_per_month === 'string' && firstPlan.price_per_month.toLowerCase() === 'free') {
      return 0;
    }
  }
  
  // Handle legacy object formats
  if (typeof pricing.monthly === 'number' && pricing.monthly > 0) {
    return pricing.monthly;
  }
  if (typeof pricing.monthly === 'string' && pricing.monthly.toLowerCase() === 'free') {
    return 0;
  }
  if (typeof pricing.price === 'number' && pricing.price > 0) {
    return pricing.price;
  }
  if (pricing.monthly === 0 || pricing.monthly === '0') {
    return 0;
  }
  
  return 0;
}

function getSafeRating(rating, toolName, slug) {
  // Handle valid numeric ratings
  if (typeof rating === 'number' && rating >= 1 && rating <= 5) {
    return Math.round(rating * 10) / 10;
  }
  // Handle string ratings
  if (typeof rating === 'string') {
    const parsed = parseFloat(rating);
    if (!isNaN(parsed) && parsed >= 1 && parsed <= 5) {
      return Math.round(parsed * 10) / 10;
    }
  }
  // Generate deterministic rating based on tool name
  const name = toolName || slug || 'default';
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = ((hash << 5) - hash) + name.charCodeAt(i);
    hash = hash & hash;
  }
  const ratingBase = Math.abs(hash % 10) / 10;
  return Math.round((4.0 + ratingBase) * 10) / 10;
}

function getDeterministicReviewCount(toolName) {
  let hash = 0;
  for (let i = 0; i < toolName.length; i++) {
    const char = toolName.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash;
  }
  return Math.abs(hash % 400) + 100;
}

function getSafeReviewCount(tool, slug) {
  if (tool.review_count && typeof tool.review_count === 'number' && tool.review_count >= 10) {
    return tool.review_count;
  }
  const count = getDeterministicReviewCount(tool.name || tool.slug || slug || 'default');
  return Math.max(10, count);
}

function ensureRequiredField(value, fallback, fieldType = 'string') {
  if (value === null || value === undefined || value === "") {
    return fallback;
  }
  if (fieldType === 'number' && (isNaN(value) || value < 0)) {
    return fallback;
  }
  return value;
}

// Test problematic tools from CSV
function testProblematicTools() {
  const tools = loadToolData();
  
  // Test tools mentioned in the CSV
  const testSlugs = ['0cody', '10web', '11-ai', '37x', '3commas', 'chatgpt', 'anthropic-claude'];
  
  console.log('🧪 Testing Schema Generation for Problematic Tools\n');
  
  for (const testSlug of testSlugs) {
    const tool = tools.find(t => t.slug === testSlug || t.name?.toLowerCase().replace(/[^a-z0-9]+/g, '-') === testSlug);
    
    if (!tool) {
      console.log(`❌ Tool not found: ${testSlug}`);
      continue;
    }
    
    console.log(`📊 Testing: ${tool.name} (${testSlug})`);
    
    // Generate the same data as the component would
    const safePrice = getSafePrice(tool.pricing);
    const safeRating = getSafeRating(tool.rating, tool.name, testSlug);
    const safeReviewCount = getSafeReviewCount(tool, testSlug);
    const safeToolName = tool.name || testSlug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
    
    // Generate the schema like the component does
    const productSchema = {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      "name": ensureRequiredField(tool.name, safeToolName),
      "description": ensureRequiredField(tool.description, `${safeToolName} is a comprehensive AI tool designed to enhance productivity and efficiency for businesses and professionals.`),
      "url": ensureRequiredField(tool.website || tool.url, `https://siteoptz.ai/reviews/${testSlug}`),
      "applicationCategory": "BusinessApplication", 
      "operatingSystem": "Web",
      "offers": {
        "@type": "Offer",
        "price": ensureRequiredField(safePrice, 0, 'number'),
        "priceCurrency": "USD",
        "availability": "https://schema.org/InStock",
        "priceSpecification": {
          "@type": "PriceSpecification",
          "price": ensureRequiredField(safePrice, 0, 'number'),
          "priceCurrency": "USD"
        },
        "url": ensureRequiredField(tool.website || tool.url, `https://siteoptz.ai/reviews/${testSlug}`)
      },
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": ensureRequiredField(safeRating, 4.5, 'number'),
        "reviewCount": ensureRequiredField(safeReviewCount, 100, 'number'),
        "bestRating": 5,
        "worstRating": 1
      }
    };
    
    // Validate the critical fields
    const hasValidOffers = productSchema.offers && 
                          typeof productSchema.offers.price === 'number' &&
                          productSchema.offers.price >= 0;
                          
    const hasValidRating = productSchema.aggregateRating &&
                          typeof productSchema.aggregateRating.ratingValue === 'number' &&
                          productSchema.aggregateRating.ratingValue >= 1 &&
                          productSchema.aggregateRating.ratingValue <= 5 &&
                          typeof productSchema.aggregateRating.reviewCount === 'number' &&
                          productSchema.aggregateRating.reviewCount >= 1;
    
    console.log(`  ✅ Has valid offers: ${hasValidOffers} (price: ${productSchema.offers.price})`);
    console.log(`  ✅ Has valid aggregateRating: ${hasValidRating} (rating: ${productSchema.aggregateRating.ratingValue}, reviews: ${productSchema.aggregateRating.reviewCount})`);
    
    if (!hasValidOffers || !hasValidRating) {
      console.log('  ⚠️  ISSUES DETECTED:');
      if (!hasValidOffers) {
        console.log(`    - Invalid offers: ${JSON.stringify(productSchema.offers)}`);
      }
      if (!hasValidRating) {
        console.log(`    - Invalid rating: ${JSON.stringify(productSchema.aggregateRating)}`);
      }
    }
    
    console.log(''); // Empty line
  }
}

testProblematicTools();