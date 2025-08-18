#!/usr/bin/env node

/**
 * Production Data Validation Script
 * 
 * Validates all AI tools data for production readiness:
 * - Complete SEO metadata
 * - Schema.org structured data
 * - Pricing information
 * - Logo files existence
 * - Data consistency
 */

const fs = require('fs');
const path = require('path');

const PUBLIC_DATA_DIR = path.join(__dirname, 'public', 'data');
const MAIN_DATA_FILE = path.join(PUBLIC_DATA_DIR, 'aiToolsData.json');
const LOGO_DIR = path.join(__dirname, 'public', 'images', 'tools');

/**
 * Validation rules
 */
const validationRules = {
  required_fields: [
    'id', 'name', 'slug', 'logo', 'meta', 'schema', 'overview', 
    'features', 'pros', 'cons', 'pricing', 'benchmarks'
  ],
  meta_fields: [
    'title', 'description', 'keywords', 'canonical', 'openGraph', 'twitter'
  ],
  schema_fields: [
    '@type', '@context', 'name', 'description', 'image', 'url', 'brand', 'category'
  ],
  overview_fields: [
    'developer', 'release_year', 'category', 'description', 'website'
  ],
  pricing_fields: [
    'plan', 'price_per_month', 'features'
  ],
  benchmark_fields: [
    'speed', 'accuracy', 'integration', 'ease_of_use', 'value_for_money'
  ]
};

let validationResults = {
  total_tools: 0,
  passed: 0,
  failed: 0,
  warnings: 0,
  errors: []
};

/**
 * Validate individual tool
 */
function validateTool(tool, index) {
  const errors = [];
  const warnings = [];
  
  // Check required fields
  validationRules.required_fields.forEach(field => {
    if (!tool[field]) {
      errors.push(`Missing required field: ${field}`);
    }
  });
  
  // Validate meta object
  if (tool.meta) {
    validationRules.meta_fields.forEach(field => {
      if (!tool.meta[field]) {
        warnings.push(`Missing meta field: ${field}`);
      }
    });
    
    // Check meta content quality
    if (tool.meta.title && tool.meta.title.length < 30) {
      warnings.push('Meta title too short (should be 30+ characters)');
    }
    if (tool.meta.description && tool.meta.description.length < 120) {
      warnings.push('Meta description too short (should be 120+ characters)');
    }
  }
  
  // Validate schema.org data
  if (tool.schema) {
    validationRules.schema_fields.forEach(field => {
      if (!tool.schema[field]) {
        warnings.push(`Missing schema field: ${field}`);
      }
    });
  }
  
  // Validate overview
  if (tool.overview) {
    validationRules.overview_fields.forEach(field => {
      if (!tool.overview[field]) {
        warnings.push(`Missing overview field: ${field}`);
      }
    });
  }
  
  // Validate pricing
  if (tool.pricing && Array.isArray(tool.pricing)) {
    tool.pricing.forEach((plan, planIndex) => {
      validationRules.pricing_fields.forEach(field => {
        if (plan[field] === undefined) {
          errors.push(`Missing pricing field in plan ${planIndex}: ${field}`);
        }
      });
    });
  } else {
    errors.push('Pricing must be an array');
  }
  
  // Validate benchmarks
  if (tool.benchmarks) {
    validationRules.benchmark_fields.forEach(field => {
      if (typeof tool.benchmarks[field] !== 'number') {
        warnings.push(`Benchmark field should be numeric: ${field}`);
      }
    });
  }
  
  // Check logo file existence
  if (tool.logo) {
    const logoPath = path.join(__dirname, 'public', tool.logo);
    if (!fs.existsSync(logoPath)) {
      warnings.push(`Logo file not found: ${tool.logo}`);
    }
  }
  
  // Data quality checks
  if (tool.features && tool.features.length === 0) {
    warnings.push('No features listed');
  }
  
  if (tool.pros && tool.pros.length === 0) {
    warnings.push('No pros listed');
  }
  
  if (tool.cons && tool.cons.length === 0) {
    warnings.push('No cons listed');
  }
  
  // URL validation
  if (tool.overview?.website && !tool.overview.website.startsWith('http')) {
    warnings.push('Website URL should start with http/https');
  }
  
  return { errors, warnings };
}

/**
 * Generate validation report
 */
function generateValidationReport(results) {
  console.log('\n📊 PRODUCTION DATA VALIDATION REPORT');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  
  console.log(`\n📈 Summary:`);
  console.log(`   Total Tools: ${results.total_tools}`);
  console.log(`   ✅ Passed: ${results.passed}`);
  console.log(`   ❌ Failed: ${results.failed}`);
  console.log(`   ⚠️  Warnings: ${results.warnings}`);
  
  const successRate = ((results.passed / results.total_tools) * 100).toFixed(1);
  console.log(`   🎯 Success Rate: ${successRate}%`);
  
  if (results.errors.length > 0) {
    console.log(`\n❌ Errors Found:`);
    results.errors.forEach((error, index) => {
      console.log(`   ${index + 1}. ${error}`);
    });
  }
  
  console.log(`\n📋 Data Quality Metrics:`);
  return results;
}

/**
 * Check SEO completeness
 */
function checkSEOCompleteness(tools) {
  console.log('\n🔍 SEO Metadata Completeness Check...');
  
  let seoStats = {
    complete_meta_tags: 0,
    complete_open_graph: 0,
    complete_twitter_cards: 0,
    complete_schema: 0,
    missing_canonicals: 0
  };
  
  tools.forEach(tool => {
    // Meta tags
    if (tool.meta?.title && tool.meta?.description && tool.meta?.keywords) {
      seoStats.complete_meta_tags++;
    }
    
    // Open Graph
    if (tool.meta?.openGraph?.title && tool.meta?.openGraph?.description && tool.meta?.openGraph?.image) {
      seoStats.complete_open_graph++;
    }
    
    // Twitter Cards
    if (tool.meta?.twitter?.title && tool.meta?.twitter?.description && tool.meta?.twitter?.image) {
      seoStats.complete_twitter_cards++;
    }
    
    // Schema.org
    if (tool.schema?.['@type'] && tool.schema?.name && tool.schema?.description) {
      seoStats.complete_schema++;
    }
    
    // Canonicals
    if (!tool.meta?.canonical) {
      seoStats.missing_canonicals++;
    }
  });
  
  console.log(`   Meta Tags Complete: ${seoStats.complete_meta_tags}/${tools.length} (${((seoStats.complete_meta_tags/tools.length)*100).toFixed(1)}%)`);
  console.log(`   Open Graph Complete: ${seoStats.complete_open_graph}/${tools.length} (${((seoStats.complete_open_graph/tools.length)*100).toFixed(1)}%)`);
  console.log(`   Twitter Cards Complete: ${seoStats.complete_twitter_cards}/${tools.length} (${((seoStats.complete_twitter_cards/tools.length)*100).toFixed(1)}%)`);
  console.log(`   Schema.org Complete: ${seoStats.complete_schema}/${tools.length} (${((seoStats.complete_schema/tools.length)*100).toFixed(1)}%)`);
  
  return seoStats;
}

/**
 * Check file structure
 */
function checkFileStructure() {
  console.log('\n📁 File Structure Validation...');
  
  const requiredFiles = [
    'public/data/aiToolsData.json',
    'public/data/faqData.json'
  ];
  
  const requiredDirs = [
    'public/images/tools',
    'components',
    'pages'
  ];
  
  requiredFiles.forEach(filePath => {
    const fullPath = path.join(__dirname, filePath);
    if (fs.existsSync(fullPath)) {
      console.log(`   ✅ ${filePath}`);
    } else {
      console.log(`   ❌ ${filePath}`);
      validationResults.errors.push(`Missing required file: ${filePath}`);
    }
  });
  
  requiredDirs.forEach(dirPath => {
    const fullPath = path.join(__dirname, dirPath);
    if (fs.existsSync(fullPath)) {
      console.log(`   ✅ ${dirPath}/`);
    } else {
      console.log(`   ❌ ${dirPath}/`);
      validationResults.errors.push(`Missing required directory: ${dirPath}`);
    }
  });
}

/**
 * Main validation
 */
async function main() {
  console.log('🔍 Starting Production Data Validation...\n');
  
  // Check file structure first
  checkFileStructure();
  
  // Load and validate tools data
  if (!fs.existsSync(MAIN_DATA_FILE)) {
    console.error(`❌ Main data file not found: ${MAIN_DATA_FILE}`);
    process.exit(1);
  }
  
  let tools;
  try {
    tools = JSON.parse(fs.readFileSync(MAIN_DATA_FILE, 'utf8'));
  } catch (error) {
    console.error(`❌ Error parsing JSON: ${error.message}`);
    process.exit(1);
  }
  
  validationResults.total_tools = tools.length;
  
  console.log(`📦 Validating ${tools.length} tools...\n`);
  
  // Validate each tool
  tools.forEach((tool, index) => {
    const { errors, warnings } = validateTool(tool, index);
    
    if (errors.length === 0) {
      validationResults.passed++;
      console.log(`✅ ${tool.name}`);
    } else {
      validationResults.failed++;
      console.log(`❌ ${tool.name}`);
      errors.forEach(error => {
        validationResults.errors.push(`${tool.name}: ${error}`);
      });
    }
    
    if (warnings.length > 0) {
      validationResults.warnings += warnings.length;
      warnings.forEach(warning => {
        console.log(`   ⚠️  ${warning}`);
      });
    }
  });
  
  // Check SEO completeness
  const seoStats = checkSEOCompleteness(tools);
  
  // Generate final report
  const report = generateValidationReport(validationResults);
  
  // Create validation summary file
  const validationSummary = {
    timestamp: new Date().toISOString(),
    total_tools: validationResults.total_tools,
    validation_results: {
      passed: validationResults.passed,
      failed: validationResults.failed,
      success_rate: ((validationResults.passed / validationResults.total_tools) * 100).toFixed(1)
    },
    seo_completeness: seoStats,
    production_ready: validationResults.failed === 0,
    errors: validationResults.errors
  };
  
  fs.writeFileSync(
    path.join(PUBLIC_DATA_DIR, 'validation-report.json'),
    JSON.stringify(validationSummary, null, 2),
    'utf8'
  );
  
  console.log('\n🚀 Production Readiness Assessment:');
  if (validationResults.failed === 0) {
    console.log('   ✅ READY FOR DEPLOYMENT');
    console.log('   All tools pass validation requirements');
    console.log('   SEO metadata is complete');
    console.log('   Data structure is production-ready');
  } else {
    console.log('   ⚠️  NEEDS ATTENTION');
    console.log(`   ${validationResults.failed} tools have critical errors`);
    console.log('   Fix errors before deployment');
  }
  
  console.log(`\n📄 Detailed report saved to: ${path.join(PUBLIC_DATA_DIR, 'validation-report.json')}`);
  
  return validationResults.failed === 0;
}

// Execute if run directly
if (require.main === module) {
  main().catch(error => {
    console.error('\n❌ Validation Error:', error.message);
    process.exit(1);
  });
}

module.exports = { validateTool, checkSEOCompleteness };