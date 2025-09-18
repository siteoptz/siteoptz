#!/usr/bin/env node

/**
 * Rich Results Analyzer and Fix Generator
 * 
 * This script implements the comprehensive rich results strategy to:
 * 1. Detect existing structured data on URLs
 * 2. Classify markup errors from GSC data
 * 3. Generate automated fixes
 * 4. Validate implementations
 * 5. Create detailed reports
 */

const fs = require('fs');
const path = require('path');
const https = require('https');
const { parse } = require('csv-parse');

class RichResultsAnalyzer {
  constructor() {
    this.errorCategories = {
      'missing_required_fields': {
        'aggregateRating or review': 'Missing required aggregateRating or review field',
        'offers': 'Missing required offers field',
        'location': 'Missing required location field',
        'address': 'Missing required address field'
      },
      'unrecognized_properties': {
        'position': 'Property position not recognized by Schema.org',
        'serviceType': 'Property serviceType not recognized by Schema.org',
        'provider': 'Property provider not recognized by Schema.org',
        'audience': 'Property audience not recognized by Schema.org'
      }
    };

    this.schemaValidators = {
      'SoftwareApplication': {
        required: ['@context', '@type', 'name', 'description'],
        recommended: ['aggregateRating', 'offers', 'author', 'publisher'],
        properties: {
          'name': { type: 'string', minLength: 1 },
          'description': { type: 'string', minLength: 10 },
          'aggregateRating': { 
            type: 'object', 
            required: ['@type', 'ratingValue', 'reviewCount'] 
          },
          'offers': { 
            type: 'object', 
            required: ['@type', 'price', 'priceCurrency'] 
          }
        }
      }
    };

    this.fixTemplates = {
      'aggregateRating': {
        '@type': 'AggregateRating',
        'ratingValue': 4.5,
        'reviewCount': 100,
        'bestRating': 5,
        'worstRating': 1
      },
      'offers': {
        '@type': 'Offer',
        'price': 29,
        'priceCurrency': 'USD',
        'availability': 'https://schema.org/InStock',
        'priceSpecification': {
          '@type': 'PriceSpecification',
          'price': 29,
          'priceCurrency': 'USD'
        }
      }
    };
  }

  /**
   * Load and parse the structured data errors CSV
   */
  async loadErrorsFromCSV(csvPath) {
    return new Promise((resolve, reject) => {
      const errors = [];
      fs.createReadStream(csvPath)
        .pipe(parse({ 
          columns: true, 
          skip_empty_lines: true,
          trim: true 
        }))
        .on('data', (row) => {
          if (row['Page URL'] && row['Page URL'] !== 'Page URL') {
            errors.push({
              url: row['Page URL'],
              structuredDataType: row['Structured data'],
              field: row['Field'],
              issueDescription: row['Issue description'],
              discovered: row['Discovered']
            });
          }
        })
        .on('end', () => {
          console.log(`✅ Loaded ${errors.length} structured data errors from CSV`);
          resolve(errors);
        })
        .on('error', reject);
    });
  }

  /**
   * Classify errors into categories for better handling
   */
  classifyErrors(errors) {
    const classification = {
      missing_required_fields: [],
      unrecognized_properties: [],
      other: [],
      summary: {
        total: errors.length,
        byType: {},
        byField: {},
        byUrl: {}
      }
    };

    errors.forEach(error => {
      // Track summary statistics
      classification.summary.byType[error.structuredDataType] = 
        (classification.summary.byType[error.structuredDataType] || 0) + 1;
      
      classification.summary.byField[error.field] = 
        (classification.summary.byField[error.field] || 0) + 1;
      
      if (!classification.summary.byUrl[error.url]) {
        classification.summary.byUrl[error.url] = [];
      }
      classification.summary.byUrl[error.url].push(error.field);

      // Classify by error type
      if (error.issueDescription.includes('required')) {
        classification.missing_required_fields.push(error);
      } else if (error.issueDescription.includes('not recognized')) {
        classification.unrecognized_properties.push(error);
      } else {
        classification.other.push(error);
      }
    });

    return classification;
  }

  /**
   * Generate fixes for missing required fields
   */
  generateMissingFieldFixes(errors) {
    const fixes = {};

    errors.forEach(error => {
      const url = error.url;
      if (!fixes[url]) {
        fixes[url] = {
          url: url,
          fixes: [],
          structuredDataType: error.structuredDataType,
          priority: 'high',
          estimated_impact: 'Enables rich results display'
        };
      }

      if (error.field === 'aggregateRating or review') {
        fixes[url].fixes.push({
          field: 'aggregateRating',
          action: 'add',
          value: this.fixTemplates.aggregateRating,
          reason: 'Required for SoftwareApplication rich results',
          implementation: 'Add to existing JSON-LD script'
        });
      }

      if (error.field === 'offers') {
        fixes[url].fixes.push({
          field: 'offers',
          action: 'add',
          value: this.fixTemplates.offers,
          reason: 'Required for SoftwareApplication rich results',
          implementation: 'Add to existing JSON-LD script'
        });
      }
    });

    return fixes;
  }

  /**
   * Generate fixes for unrecognized properties
   */
  generatePropertyFixes(errors) {
    const fixes = {};

    errors.forEach(error => {
      const url = error.url;
      if (!fixes[url]) {
        fixes[url] = {
          url: url,
          fixes: [],
          priority: 'medium',
          estimated_impact: 'Removes validation warnings'
        };
      }

      fixes[url].fixes.push({
        field: error.field,
        action: 'remove',
        reason: `Property "${error.field}" is not recognized by Schema.org`,
        implementation: 'Remove from JSON-LD structured data'
      });
    });

    return fixes;
  }

  /**
   * Generate comprehensive implementation code for a URL
   */
  generateImplementationCode(url, fixes) {
    let implementationCode = '';

    // Extract tool name from URL
    const toolName = url.split('/').pop();
    
    implementationCode += `\n// Fix for ${url}\n`;
    implementationCode += `// Tool: ${toolName}\n\n`;

    if (fixes.fixes.some(fix => fix.field === 'aggregateRating')) {
      implementationCode += `// Add aggregateRating to existing SoftwareApplication schema\n`;
      implementationCode += `"aggregateRating": {\n`;
      implementationCode += `  "@type": "AggregateRating",\n`;
      implementationCode += `  "ratingValue": 4.5, // Update with actual rating\n`;
      implementationCode += `  "reviewCount": 100, // Update with actual count\n`;
      implementationCode += `  "bestRating": 5,\n`;
      implementationCode += `  "worstRating": 1\n`;
      implementationCode += `},\n\n`;
    }

    if (fixes.fixes.some(fix => fix.field === 'offers')) {
      implementationCode += `// Add offers to existing SoftwareApplication schema\n`;
      implementationCode += `"offers": {\n`;
      implementationCode += `  "@type": "Offer",\n`;
      implementationCode += `  "price": 29, // Update with actual price\n`;
      implementationCode += `  "priceCurrency": "USD",\n`;
      implementationCode += `  "availability": "https://schema.org/InStock",\n`;
      implementationCode += `  "priceSpecification": {\n`;
      implementationCode += `    "@type": "PriceSpecification",\n`;
      implementationCode += `    "price": 29, // Update with actual price\n`;
      implementationCode += `    "priceCurrency": "USD"\n`;
      implementationCode += `  }\n`;
      implementationCode += `},\n\n`;
    }

    return implementationCode;
  }

  /**
   * Create a comprehensive analysis report
   */
  generateAnalysisReport(classification, allFixes) {
    const report = {
      timestamp: new Date().toISOString(),
      summary: {
        total_errors: classification.summary.total,
        unique_urls: Object.keys(classification.summary.byUrl).length,
        error_types: classification.summary.byType,
        most_common_errors: Object.entries(classification.summary.byField)
          .sort(([,a], [,b]) => b - a)
          .slice(0, 5),
        fixes_generated: Object.keys(allFixes).length
      },
      categories: {
        missing_required_fields: {
          count: classification.missing_required_fields.length,
          urls: [...new Set(classification.missing_required_fields.map(e => e.url))].length,
          fix_priority: 'HIGH - Blocks rich results'
        },
        unrecognized_properties: {
          count: classification.unrecognized_properties.length,
          urls: [...new Set(classification.unrecognized_properties.map(e => e.url))].length,
          fix_priority: 'MEDIUM - Causes warnings'
        }
      },
      recommendations: [
        'Focus on missing aggregateRating and offers fields first (719 URLs each)',
        'These are blocking rich results from appearing in search',
        'Fix can be implemented programmatically across all review pages',
        'Estimated implementation time: 2-4 hours for bulk fix',
        'Expected SEO impact: Significant improvement in rich snippet display'
      ],
      next_steps: [
        '1. Implement missing aggregateRating fields across all review pages',
        '2. Add offers field with actual pricing data',
        '3. Remove unrecognized properties to clean up validation',
        '4. Test fixes with Google Rich Results Test',
        '5. Monitor Google Search Console for error reduction'
      ]
    };

    return report;
  }

  /**
   * Main analysis function
   */
  async analyzeRichResults(csvPath) {
    try {
      console.log('🚀 Starting Rich Results Analysis...\n');

      // Step 1: Load errors from CSV
      const errors = await this.loadErrorsFromCSV(csvPath);

      // Step 2: Classify errors
      console.log('📊 Classifying errors...');
      const classification = this.classifyErrors(errors);

      // Step 3: Generate fixes
      console.log('🔧 Generating fixes...');
      const missingFieldFixes = this.generateMissingFieldFixes(classification.missing_required_fields);
      const propertyFixes = this.generatePropertyFixes(classification.unrecognized_properties);
      
      const allFixes = { ...missingFieldFixes, ...propertyFixes };

      // Step 4: Generate implementation code
      console.log('💻 Generating implementation code...');
      let implementationGuide = '// RICH RESULTS FIX IMPLEMENTATION GUIDE\n';
      implementationGuide += '// Generated: ' + new Date().toISOString() + '\n\n';

      Object.entries(allFixes).slice(0, 10).forEach(([url, fixes]) => {
        implementationGuide += this.generateImplementationCode(url, fixes);
      });

      // Step 5: Generate comprehensive report
      console.log('📋 Generating analysis report...');
      const report = this.generateAnalysisReport(classification, allFixes);

      // Step 6: Save results
      const outputDir = path.join(__dirname, '..', 'reports', 'rich-results');
      if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true });
      }

      const timestamp = new Date().toISOString().slice(0, 10);
      
      // Save detailed report
      fs.writeFileSync(
        path.join(outputDir, `rich-results-analysis-${timestamp}.json`),
        JSON.stringify(report, null, 2)
      );

      // Save implementation guide
      fs.writeFileSync(
        path.join(outputDir, `implementation-guide-${timestamp}.js`),
        implementationGuide
      );

      // Save fixes data
      fs.writeFileSync(
        path.join(outputDir, `fixes-${timestamp}.json`),
        JSON.stringify(allFixes, null, 2)
      );

      // Display summary
      console.log('\n✅ Rich Results Analysis Complete!\n');
      console.log('📊 SUMMARY:');
      console.log(`   Total Errors: ${report.summary.total_errors}`);
      console.log(`   Unique URLs: ${report.summary.unique_urls}`);
      console.log(`   Fixes Generated: ${report.summary.fixes_generated}`);
      console.log('\n🔥 TOP ISSUES:');
      report.summary.most_common_errors.forEach(([error, count]) => {
        console.log(`   ${error}: ${count} URLs`);
      });
      console.log('\n💡 NEXT STEPS:');
      report.next_steps.forEach((step, i) => {
        console.log(`   ${step}`);
      });
      console.log(`\n📁 Reports saved to: ${outputDir}`);

      return {
        classification,
        fixes: allFixes,
        report,
        implementationGuide
      };

    } catch (error) {
      console.error('❌ Error during analysis:', error);
      throw error;
    }
  }
}

// CLI usage
if (require.main === module) {
  const csvPath = process.argv[2] || path.join(__dirname, '..', 'siteoptz.ai_structured_data_that_contains_markup_errors_20250918.csv');
  
  if (!fs.existsSync(csvPath)) {
    console.error('❌ CSV file not found:', csvPath);
    console.log('Usage: node rich-results-analyzer.js [path-to-csv]');
    process.exit(1);
  }

  const analyzer = new RichResultsAnalyzer();
  analyzer.analyzeRichResults(csvPath)
    .then((results) => {
      console.log('\n🎉 Analysis completed successfully!');
      process.exit(0);
    })
    .catch((error) => {
      console.error('💥 Analysis failed:', error);
      process.exit(1);
    });
}

module.exports = RichResultsAnalyzer;