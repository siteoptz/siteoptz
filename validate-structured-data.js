#!/usr/bin/env node

/**
 * Script to validate structured data on review pages
 * Checks for required aggregateRating and offers fields
 */

const fs = require('fs');
const path = require('path');

// Read the CSV data
function parseCSVData() {
  const csvPath = '/Users/siteoptz/Downloads/siteoptz.ai_structured_data_that_contains_markup_errors_20260508.csv';
  
  if (!fs.existsSync(csvPath)) {
    console.log('CSV file not found at:', csvPath);
    return [];
  }

  const content = fs.readFileSync(csvPath, 'utf8');
  const lines = content.split('\n').slice(1); // Skip header
  
  const errors = [];
  for (const line of lines) {
    if (!line.trim()) continue;
    
    const [pageUrl, structuredData, field, issueDescription, discovered] = line.split(',');
    errors.push({
      pageUrl: pageUrl?.trim(),
      structuredData: structuredData?.trim(), 
      field: field?.trim(),
      issueDescription: issueDescription?.trim(),
      discovered: discovered?.trim()
    });
  }
  
  return errors;
}

// Check aiToolsData.json for tools with missing required data
function checkToolsData() {
  const toolsPath = path.join(process.cwd(), 'public/data/aiToolsData.json');
  
  if (!fs.existsSync(toolsPath)) {
    console.log('❌ aiToolsData.json not found');
    return;
  }

  const tools = JSON.parse(fs.readFileSync(toolsPath, 'utf8'));
  console.log(`📊 Checking ${tools.length} tools for data completeness...\n`);

  let toolsWithMissingRating = 0;
  let toolsWithMissingPricing = 0;
  let toolsWithBadPricing = 0;

  for (const tool of tools) {
    const hasValidRating = tool.rating && 
                          typeof tool.rating === 'number' && 
                          tool.rating >= 1 && 
                          tool.rating <= 5;

    const hasValidPricing = tool.pricing && 
                           Array.isArray(tool.pricing) && 
                           tool.pricing.length > 0 &&
                           tool.pricing[0].price_per_month !== undefined;

    if (!hasValidRating) {
      toolsWithMissingRating++;
      console.log(`⚠️  ${tool.name || tool.slug}: Missing or invalid rating (${tool.rating})`);
    }

    if (!hasValidPricing) {
      toolsWithMissingPricing++;
      console.log(`⚠️  ${tool.name || tool.slug}: Missing or invalid pricing structure`);
    } else {
      // Check if pricing data is properly structured
      const firstPlan = tool.pricing[0];
      if (typeof firstPlan.price_per_month !== 'number' && 
          firstPlan.price_per_month !== 'Free' &&
          firstPlan.price_per_month !== 'Custom') {
        toolsWithBadPricing++;
        console.log(`⚠️  ${tool.name || tool.slug}: Invalid price format (${firstPlan.price_per_month})`);
      }
    }
  }

  console.log('\n📈 Summary:');
  console.log(`Tools with missing/invalid rating: ${toolsWithMissingRating}`);
  console.log(`Tools with missing pricing: ${toolsWithMissingPricing}`);
  console.log(`Tools with bad pricing format: ${toolsWithBadPricing}`);
  console.log(`Tools with complete data: ${tools.length - toolsWithMissingRating - toolsWithMissingPricing}`);
}

// Analyze the CSV errors
function analyzeErrors() {
  const errors = parseCSVData();
  console.log(`🔍 Found ${errors.length} structured data errors\n`);

  // Group by error type
  const errorsByField = {};
  const errorsByUrl = {};

  for (const error of errors) {
    if (!error.field) continue;
    
    // Group by field
    if (!errorsByField[error.field]) {
      errorsByField[error.field] = [];
    }
    errorsByField[error.field].push(error);

    // Group by URL
    if (!errorsByUrl[error.pageUrl]) {
      errorsByUrl[error.pageUrl] = [];
    }
    errorsByUrl[error.pageUrl].push(error);
  }

  console.log('📊 Errors by field type:');
  for (const [field, fieldErrors] of Object.entries(errorsByField)) {
    console.log(`  ${field}: ${fieldErrors.length} pages`);
  }

  console.log('\n🎯 Analysis:');
  const totalPages = Object.keys(errorsByUrl).length;
  console.log(`Total pages with errors: ${totalPages}`);
  
  const aggregateRatingErrors = errorsByField['aggregateRating or review']?.length || 0;
  const offersErrors = errorsByField['offers']?.length || 0;
  
  console.log(`Pages missing aggregateRating: ${aggregateRatingErrors}`);
  console.log(`Pages missing offers: ${offersErrors}`);
  
  if (aggregateRatingErrors === offersErrors && aggregateRatingErrors === totalPages) {
    console.log('\n✅ Pattern identified: ALL pages are missing BOTH required fields');
    console.log('This suggests a systematic issue in the schema generation.');
  }

  // Show some example URLs
  console.log('\n🔍 Sample affected URLs:');
  const sampleUrls = Object.keys(errorsByUrl).slice(0, 5);
  sampleUrls.forEach(url => {
    console.log(`  - ${url}`);
  });
}

// Main execution
console.log('🔍 Structured Data Validator for Review Pages\n');

analyzeErrors();
console.log('\n' + '='.repeat(50) + '\n');
checkToolsData();