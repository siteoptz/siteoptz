#!/usr/bin/env node

/**
 * Validation and Testing Suite for AI Tools System
 * 
 * Comprehensive testing for:
 * - Data structure validation
 * - SEO compliance
 * - Schema.org structured data
 * - Performance metrics
 * - Accessibility checks
 */

const fs = require('fs');
const path = require('path');

// Test configuration
const CONFIG = {
  dataDir: path.join(__dirname, '../public/data'),
  pagesDir: path.join(__dirname, '../pages'),
  baseUrl: process.env.BASE_URL || 'https://siteoptz.ai',
  thresholds: {
    seo: 90,
    performance: 80,
    accessibility: 85,
    bestPractices: 85
  }
};

// Color output for terminal
const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m'
};

const log = {
  success: (msg) => console.log(`${colors.green}✅ ${msg}${colors.reset}`),
  error: (msg) => console.log(`${colors.red}❌ ${msg}${colors.reset}`),
  warning: (msg) => console.log(`${colors.yellow}⚠️  ${msg}${colors.reset}`),
  info: (msg) => console.log(`${colors.blue}ℹ️  ${msg}${colors.reset}`)
};

// Validation functions
class DataValidator {
  constructor() {
    this.errors = [];
    this.warnings = [];
  }

  validateToolStructure(tool) {
    const requiredFields = {
      id: 'string',
      slug: 'string',
      name: 'string',
      logo: 'string',
      meta: 'object',
      schema: 'object',
      overview: 'object',
      features: 'array',
      pros: 'array',
      cons: 'array',
      pricing: 'array',
      benchmarks: 'object',
      related_tools: 'array'
    };

    Object.entries(requiredFields).forEach(([field, type]) => {
      if (!tool[field]) {
        this.errors.push(`Tool ${tool.name || 'unknown'}: Missing field '${field}'`);
      } else if (type === 'array' && !Array.isArray(tool[field])) {
        this.errors.push(`Tool ${tool.name}: Field '${field}' must be an array`);
      } else if (type === 'object' && typeof tool[field] !== 'object') {
        this.errors.push(`Tool ${tool.name}: Field '${field}' must be an object`);
      }
    });

    // Validate nested structures
    this.validateMeta(tool);
    this.validatePricing(tool);
    this.validateBenchmarks(tool);
    this.validateSEO(tool);
  }

  validateMeta(tool) {
    if (!tool.meta) return;
    
    if (!tool.meta.title || tool.meta.title.length < 30 || tool.meta.title.length > 60) {
      this.warnings.push(`Tool ${tool.name}: Meta title should be 30-60 characters (current: ${tool.meta.title?.length || 0})`);
    }
    
    if (!tool.meta.description || tool.meta.description.length < 120 || tool.meta.description.length > 160) {
      this.warnings.push(`Tool ${tool.name}: Meta description should be 120-160 characters (current: ${tool.meta.description?.length || 0})`);
    }
  }

  validatePricing(tool) {
    if (!tool.pricing || !Array.isArray(tool.pricing)) return;
    
    tool.pricing.forEach((plan, index) => {
      if (!plan.plan || typeof plan.price_per_month !== 'number' || !Array.isArray(plan.features)) {
        this.errors.push(`Tool ${tool.name}: Invalid pricing plan at index ${index}`);
      }
      
      if (plan.features && plan.features.length < 3) {
        this.warnings.push(`Tool ${tool.name}: Plan '${plan.plan}' should have at least 3 features`);
      }
    });
  }

  validateBenchmarks(tool) {
    if (!tool.benchmarks) return;
    
    const requiredMetrics = ['speed', 'accuracy', 'integration', 'ease_of_use', 'value'];
    
    requiredMetrics.forEach(metric => {
      const value = tool.benchmarks[metric];
      if (typeof value !== 'number' || value < 1 || value > 10) {
        this.errors.push(`Tool ${tool.name}: Invalid benchmark '${metric}' (must be 1-10)`);
      }
    });
  }

  validateSEO(tool) {
    // Check for keyword presence
    const keywords = [
      tool.name.toLowerCase(),
      'ai', 'tool', 'review', 'pricing', 'features'
    ];
    
    const content = JSON.stringify(tool).toLowerCase();
    const missingKeywords = keywords.filter(kw => !content.includes(kw));
    
    if (missingKeywords.length > 0) {
      this.warnings.push(`Tool ${tool.name}: Missing SEO keywords: ${missingKeywords.join(', ')}`);
    }
    
    // Check features count
    if (tool.features && tool.features.length < 10) {
      this.warnings.push(`Tool ${tool.name}: Should have at least 10 features for better SEO`);
    }
    
    // Check pros and cons
    if (tool.pros && tool.pros.length < 5) {
      this.warnings.push(`Tool ${tool.name}: Should have at least 5 pros`);
    }
    
    if (tool.cons && tool.cons.length < 4) {
      this.warnings.push(`Tool ${tool.name}: Should have at least 4 cons`);
    }
  }

  validateFAQStructure(toolId, faqs) {
    if (!Array.isArray(faqs) || faqs.length < 5) {
      this.warnings.push(`Tool ${toolId}: Should have at least 5 FAQs (current: ${faqs?.length || 0})`);
    }
    
    faqs?.forEach((faq, index) => {
      if (!faq.question || !faq.answer || !faq.schema) {
        this.errors.push(`Tool ${toolId}: Invalid FAQ at index ${index}`);
      }
      
      if (faq.answer && faq.answer.length < 50) {
        this.warnings.push(`Tool ${toolId}: FAQ answer ${index} should be more detailed (50+ characters)`);
      }
      
      // Validate schema structure
      if (faq.schema && (!faq.schema['@type'] || !faq.schema.acceptedAnswer)) {
        this.errors.push(`Tool ${toolId}: Invalid FAQ schema at index ${index}`);
      }
    });
  }

  getReport() {
    return {
      errors: this.errors,
      warnings: this.warnings,
      passed: this.errors.length === 0
    };
  }
}

// Schema.org validation
class SchemaValidator {
  validateProductSchema(tool) {
    const schema = tool.schema;
    const errors = [];
    
    if (!schema['@type'] || schema['@type'] !== 'Product') {
      errors.push(`Invalid @type: expected 'Product', got '${schema['@type']}'`);
    }
    
    const requiredFields = ['name', 'description', 'image', 'brand'];
    requiredFields.forEach(field => {
      if (!schema[field]) {
        errors.push(`Missing required schema field: ${field}`);
      }
    });
    
    return errors;
  }
  
  validateFAQSchema(faqs) {
    const errors = [];
    
    faqs.forEach((faq, index) => {
      if (!faq.schema || faq.schema['@type'] !== 'Question') {
        errors.push(`FAQ ${index}: Invalid or missing Question schema`);
      }
      
      if (!faq.schema?.acceptedAnswer?.['@type'] || 
          faq.schema.acceptedAnswer['@type'] !== 'Answer') {
        errors.push(`FAQ ${index}: Invalid Answer schema`);
      }
    });
    
    return errors;
  }
}

// Performance testing
class PerformanceTester {
  checkFileSize(filePath, maxSizeKB = 500) {
    try {
      const stats = fs.statSync(filePath);
      const sizeKB = stats.size / 1024;
      
      if (sizeKB > maxSizeKB) {
        return {
          passed: false,
          message: `File ${path.basename(filePath)} is ${sizeKB.toFixed(2)}KB (max: ${maxSizeKB}KB)`
        };
      }
      
      return { passed: true, sizeKB };
    } catch (error) {
      return { passed: false, message: `Cannot check file: ${error.message}` };
    }
  }
  
  checkImageOptimization(tool) {
    const warnings = [];
    
    if (tool.logo && !tool.logo.includes('.webp') && !tool.logo.includes('.avif')) {
      warnings.push(`Tool ${tool.name}: Logo should use WebP or AVIF format for better performance`);
    }
    
    return warnings;
  }
  
  estimatePageWeight(tool, faqs) {
    const jsonSize = JSON.stringify({ tool, faqs }).length / 1024;
    const estimatedHTML = 50; // KB
    const estimatedCSS = 30; // KB
    const estimatedJS = 200; // KB
    
    const total = jsonSize + estimatedHTML + estimatedCSS + estimatedJS;
    
    return {
      jsonSize: jsonSize.toFixed(2),
      estimated: total.toFixed(2),
      warning: total > 500 ? 'Page weight might be too high' : null
    };
  }
}

// Main test runner
async function runTests() {
  console.log('\n🔍 Running Comprehensive Validation Suite\n');
  
  let allPassed = true;
  
  try {
    // Load data
    const aiToolsPath = path.join(CONFIG.dataDir, 'aiToolsData.json');
    const faqPath = path.join(CONFIG.dataDir, 'faqData.json');
    
    const tools = JSON.parse(fs.readFileSync(aiToolsPath, 'utf8'));
    const faqs = JSON.parse(fs.readFileSync(faqPath, 'utf8'));
    
    log.info(`Loaded ${tools.length} tools`);
    
    // 1. Data Structure Validation
    console.log('\n📊 Data Structure Validation\n');
    const dataValidator = new DataValidator();
    const schemaValidator = new SchemaValidator();
    
    tools.forEach(tool => {
      dataValidator.validateToolStructure(tool);
      
      // Validate schema
      const schemaErrors = schemaValidator.validateProductSchema(tool);
      schemaErrors.forEach(error => dataValidator.errors.push(`${tool.name}: ${error}`));
      
      // Validate FAQs
      if (faqs[tool.id]) {
        dataValidator.validateFAQStructure(tool.id, faqs[tool.id]);
        const faqSchemaErrors = schemaValidator.validateFAQSchema(faqs[tool.id]);
        faqSchemaErrors.forEach(error => dataValidator.errors.push(`${tool.name}: ${error}`));
      }
    });
    
    const report = dataValidator.getReport();
    
    if (report.errors.length > 0) {
      console.log('Errors found:');
      report.errors.forEach(error => log.error(error));
      allPassed = false;
    }
    
    if (report.warnings.length > 0) {
      console.log('\nWarnings:');
      report.warnings.forEach(warning => log.warning(warning));
    }
    
    if (report.passed) {
      log.success('All data structure tests passed!');
    }
    
    // 2. Performance Testing
    console.log('\n⚡ Performance Testing\n');
    const perfTester = new PerformanceTester();
    
    // Check file sizes
    const fileSizeCheck = perfTester.checkFileSize(aiToolsPath, 500);
    if (!fileSizeCheck.passed) {
      log.warning(fileSizeCheck.message);
    } else {
      log.success(`Data file size OK: ${fileSizeCheck.sizeKB.toFixed(2)}KB`);
    }
    
    // Check image optimization
    tools.forEach(tool => {
      const imageWarnings = perfTester.checkImageOptimization(tool);
      imageWarnings.forEach(warning => log.warning(warning));
    });
    
    // Estimate page weights
    const sampleTool = tools[0];
    const pageWeight = perfTester.estimatePageWeight(sampleTool, faqs[sampleTool.id]);
    log.info(`Estimated page weight for ${sampleTool.name}: ${pageWeight.estimated}KB`);
    if (pageWeight.warning) {
      log.warning(pageWeight.warning);
    }
    
    // 3. SEO Validation
    console.log('\n🔎 SEO Validation\n');
    
    // Check for unique meta titles
    const titles = tools.map(t => t.meta?.title);
    const duplicateTitles = titles.filter((title, index) => titles.indexOf(title) !== index);
    
    if (duplicateTitles.length > 0) {
      log.error(`Duplicate meta titles found: ${duplicateTitles.length}`);
      allPassed = false;
    } else {
      log.success('All meta titles are unique');
    }
    
    // Check for unique slugs
    const slugs = tools.map(t => t.slug);
    const duplicateSlugs = slugs.filter((slug, index) => slugs.indexOf(slug) !== index);
    
    if (duplicateSlugs.length > 0) {
      log.error(`Duplicate slugs found: ${duplicateSlugs.join(', ')}`);
      allPassed = false;
    } else {
      log.success('All slugs are unique');
    }
    
    // 4. URL Generation Test
    console.log('\n🔗 URL Generation Test\n');
    
    const sampleUrls = [
      `${CONFIG.baseUrl}/tools`,
      `${CONFIG.baseUrl}/tools/${tools[0].slug}`,
      `${CONFIG.baseUrl}/compare/${tools[0].slug}-vs-${tools[1].slug}`
    ];
    
    sampleUrls.forEach(url => {
      log.info(`Generated URL: ${url}`);
    });
    
    // 5. Related Tools Validation
    console.log('\n🔄 Related Tools Validation\n');
    
    let relatedToolsValid = true;
    tools.forEach(tool => {
      if (tool.related_tools) {
        tool.related_tools.forEach(relatedId => {
          const exists = tools.some(t => t.id === relatedId);
          if (!exists) {
            log.error(`Tool ${tool.name}: Related tool '${relatedId}' does not exist`);
            relatedToolsValid = false;
            allPassed = false;
          }
        });
      }
    });
    
    if (relatedToolsValid) {
      log.success('All related tool references are valid');
    }
    
    // Final Report
    console.log('\n📈 Test Summary\n');
    
    const stats = {
      totalTools: tools.length,
      totalFAQs: Object.values(faqs).flat().length,
      averageFeatures: (tools.reduce((sum, t) => sum + (t.features?.length || 0), 0) / tools.length).toFixed(1),
      averagePros: (tools.reduce((sum, t) => sum + (t.pros?.length || 0), 0) / tools.length).toFixed(1),
      averageCons: (tools.reduce((sum, t) => sum + (t.cons?.length || 0), 0) / tools.length).toFixed(1)
    };
    
    console.log('Statistics:');
    Object.entries(stats).forEach(([key, value]) => {
      console.log(`  ${key}: ${value}`);
    });
    
    if (allPassed) {
      console.log('\n');
      log.success('🎉 All tests passed successfully!');
      process.exit(0);
    } else {
      console.log('\n');
      log.error('Some tests failed. Please fix the issues above.');
      process.exit(1);
    }
    
  } catch (error) {
    log.error(`Test runner error: ${error.message}`);
    process.exit(1);
  }
}

// Export for use in other scripts
module.exports = {
  DataValidator,
  SchemaValidator,
  PerformanceTester,
  runTests
};

// Run tests if executed directly
if (require.main === module) {
  runTests();
}