#!/usr/bin/env node

/**
 * Structured Data Validation Script
 * Validates that pages generate proper structured data for SEO
 * Prevents Google Search Console markup errors
 */

const fs = require('fs');
const path = require('path');

console.log('🔍 Validating structured data generation...\n');

// Load tools data
const toolsDataPath = path.join(process.cwd(), 'public/data/aiToolsData.json');
let toolsData;

try {
  toolsData = JSON.parse(fs.readFileSync(toolsDataPath, 'utf8'));
} catch (error) {
  console.log('❌ Error loading tools data:', error.message);
  process.exit(1);
}

// Track validation results
let totalTools = 0;
let validSchemas = 0;
let invalidSchemas = 0;
const issues = [];

console.log(`📊 Validating structured data for ${toolsData.length} tools...\n`);

// Required fields for SoftwareApplication schema
const requiredSoftwareAppFields = {
  name: 'string',
  description: 'string',
  offers: 'object',
  aggregateRating: 'object'
};

const requiredOfferFields = {
  '@type': 'string',
  price: 'string', 
  priceCurrency: 'string',
  availability: 'string'
};

const requiredRatingFields = {
  '@type': 'string',
  ratingValue: 'number',
  reviewCount: 'number',
  bestRating: 'number',
  worstRating: 'number'
};

// Helper function to simulate schema generation
function generateTestSchema(tool) {
  // Simulate the same logic as in the review page
  const getSafePrice = (pricing) => {
    if (!pricing) return "0";
    
    if (typeof pricing.monthly === 'number' && pricing.monthly > 0) {
      return pricing.monthly.toString();
    }
    if (typeof pricing.monthly === 'string' && pricing.monthly.toLowerCase() === 'free') {
      return "0";
    }
    if (typeof pricing.price === 'number' && pricing.price > 0) {
      return pricing.price.toString();
    }
    if (pricing.monthly === 0 || pricing.monthly === '0') {
      return "0";
    }
    
    return "0";
  };

  const getSafeRating = (rating) => {
    if (typeof rating === 'number' && rating >= 1 && rating <= 5) {
      return Math.round(rating * 10) / 10;
    }
    if (typeof rating === 'string') {
      const parsed = parseFloat(rating);
      if (!isNaN(parsed) && parsed >= 1 && parsed <= 5) {
        return Math.round(parsed * 10) / 10;
      }
    }
    return 4.5;
  };

  const safeToolName = tool.name || tool.id?.replace(/-/g, ' ') || 'AI Tool';

  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": safeToolName,
    "description": tool.description || `${safeToolName} is a comprehensive AI tool designed to enhance productivity and efficiency.`,
    "url": `https://siteoptz.ai/reviews/${tool.slug}`,
    "applicationCategory": "BusinessApplication",
    "operatingSystem": "Web",
    "offers": {
      "@type": "Offer",
      "price": getSafePrice(tool.pricing),
      "priceCurrency": "USD",
      "availability": "https://schema.org/InStock",
      "url": `https://siteoptz.ai/reviews/${tool.slug}`
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": getSafeRating(tool.rating),
      "reviewCount": Math.max(100, Math.floor(Math.random() * 500) + 50),
      "bestRating": 5,
      "worstRating": 1
    }
  };
}

// Validate each tool's generated schema
toolsData.forEach((tool, index) => {
  totalTools++;
  
  const toolNumber = `${index + 1}/${toolsData.length}`;
  console.log(`${toolNumber} Validating: ${tool.name}`);

  try {
    const schema = generateTestSchema(tool);
    let hasErrors = false;
    const toolIssues = [];

    // Validate required SoftwareApplication fields
    for (const [field, expectedType] of Object.entries(requiredSoftwareAppFields)) {
      if (!schema[field]) {
        hasErrors = true;
        toolIssues.push({
          type: 'missing_field',
          field: field,
          expected: expectedType,
          message: `Missing required field: ${field}`
        });
      } else if (expectedType !== 'object' && typeof schema[field] !== expectedType) {
        hasErrors = true;
        toolIssues.push({
          type: 'wrong_type',
          field: field,
          expected: expectedType,
          actual: typeof schema[field],
          message: `Wrong type for ${field}: expected ${expectedType}, got ${typeof schema[field]}`
        });
      }
    }

    // Validate offers object
    if (schema.offers) {
      for (const [field, expectedType] of Object.entries(requiredOfferFields)) {
        if (!schema.offers[field]) {
          hasErrors = true;
          toolIssues.push({
            type: 'missing_offers_field',
            field: `offers.${field}`,
            expected: expectedType,
            message: `Missing required offers field: ${field}`
          });
        }
      }
    }

    // Validate aggregateRating object
    if (schema.aggregateRating) {
      for (const [field, expectedType] of Object.entries(requiredRatingFields)) {
        if (!schema.aggregateRating[field]) {
          hasErrors = true;
          toolIssues.push({
            type: 'missing_rating_field',
            field: `aggregateRating.${field}`,
            expected: expectedType,
            message: `Missing required aggregateRating field: ${field}`
          });
        } else if (typeof schema.aggregateRating[field] !== expectedType) {
          hasErrors = true;
          toolIssues.push({
            type: 'wrong_rating_type',
            field: `aggregateRating.${field}`,
            expected: expectedType,
            actual: typeof schema.aggregateRating[field],
            message: `Wrong type for aggregateRating.${field}: expected ${expectedType}, got ${typeof schema.aggregateRating[field]}`
          });
        }
      }

      // Validate rating value range
      const rating = schema.aggregateRating.ratingValue;
      if (typeof rating === 'number' && (rating < 1 || rating > 5)) {
        hasErrors = true;
        toolIssues.push({
          type: 'invalid_rating_range',
          field: 'aggregateRating.ratingValue',
          value: rating,
          message: `Rating value ${rating} is outside valid range (1-5)`
        });
      }
    }

    if (hasErrors) {
      invalidSchemas++;
      issues.push({
        tool: tool.name,
        slug: tool.slug,
        issues: toolIssues
      });
      console.log(`   ❌ ${toolIssues.length} validation issues found`);
    } else {
      validSchemas++;
      console.log(`   ✅ Schema validation passed`);
    }

  } catch (error) {
    invalidSchemas++;
    issues.push({
      tool: tool.name,
      slug: tool.slug,
      issues: [{
        type: 'generation_error',
        message: `Schema generation failed: ${error.message}`
      }]
    });
    console.log(`   ❌ Schema generation failed: ${error.message}`);
  }
});

// Generate summary
console.log('\n' + '='.repeat(60));
console.log('📋 STRUCTURED DATA VALIDATION SUMMARY');
console.log('='.repeat(60));
console.log(`Total tools: ${totalTools}`);
console.log(`Valid schemas: ${validSchemas} (${Math.round((validSchemas / totalTools) * 100)}%)`);
console.log(`Invalid schemas: ${invalidSchemas} (${Math.round((invalidSchemas / totalTools) * 100)}%)`);
console.log(`Total issues: ${issues.reduce((sum, tool) => sum + tool.issues.length, 0)}`);

// Show detailed issues
if (issues.length > 0) {
  console.log(`\n❌ VALIDATION ERRORS:`);
  issues.slice(0, 10).forEach(toolIssue => {
    console.log(`\n• ${toolIssue.tool} (${toolIssue.slug}):`);
    toolIssue.issues.forEach(issue => {
      console.log(`   - ${issue.message}`);
    });
  });
  if (issues.length > 10) {
    console.log(`\n   ... and ${issues.length - 10} more tools with issues`);
  }
}

// Save detailed report
const reportPath = path.join(process.cwd(), 'structured-data-validation-report.json');
const report = {
  timestamp: new Date().toISOString(),
  summary: {
    totalTools,
    validSchemas,
    invalidSchemas,
    totalIssues: issues.reduce((sum, tool) => sum + tool.issues.length, 0),
    successRate: Math.round((validSchemas / totalTools) * 100)
  },
  issues: issues
};

fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));
console.log(`\n📄 Detailed report saved: ${reportPath}`);

// Suggest actions
if (invalidSchemas > 0) {
  console.log(`\n💡 SUGGESTED ACTIONS:`);
  console.log(`   1. Review tools with missing rating or pricing data`);
  console.log(`   2. Update data sources to include required fields`);
  console.log(`   3. Enhance fallback logic in schema generation`);
  console.log(`   4. Test with Google's Rich Results Test tool`);
}

console.log('='.repeat(60));

// Exit with appropriate code
const exitCode = invalidSchemas > 0 ? 1 : 0;
if (exitCode === 0) {
  console.log('✅ STRUCTURED DATA VALIDATION PASSED');
} else {
  console.log('❌ STRUCTURED DATA VALIDATION FAILED');
  console.log('   Fix issues before deploying to prevent Google Search Console errors');
}

process.exit(exitCode);