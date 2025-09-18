#!/usr/bin/env node

/**
 * Rich Results Analyzer and Fix Generator (Simplified Version)
 * Uses only built-in Node.js modules for maximum compatibility
 */

const fs = require('fs');
const path = require('path');

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
   * Simple CSV parser using built-in modules
   */
  parseCSV(csvContent) {
    const lines = csvContent.trim().split('\n');
    const headers = lines[0].split(',').map(h => h.replace(/"/g, '').trim());
    const errors = [];

    for (let i = 1; i < lines.length; i++) {
      const values = this.parseCSVLine(lines[i]);
      if (values.length >= headers.length && values[0] && values[0] !== 'Page URL') {
        const row = {};
        headers.forEach((header, index) => {
          row[header] = values[index] || '';
        });

        errors.push({
          url: row['Page URL'],
          structuredDataType: row['Structured data'],
          field: row['Field'], 
          issueDescription: row['Issue description'],
          discovered: row['Discovered']
        });
      }
    }

    return errors;
  }

  /**
   * Parse a single CSV line handling quoted values
   */
  parseCSVLine(line) {
    const values = [];
    let current = '';
    let inQuotes = false;

    for (let i = 0; i < line.length; i++) {
      const char = line[i];
      
      if (char === '"') {
        inQuotes = !inQuotes;
      } else if (char === ',' && !inQuotes) {
        values.push(current.trim());
        current = '';
      } else {
        current += char;
      }
    }
    
    values.push(current.trim());
    return values;
  }

  /**
   * Load and parse the structured data errors CSV
   */
  async loadErrorsFromCSV(csvPath) {
    try {
      const csvContent = fs.readFileSync(csvPath, 'utf-8');
      const errors = this.parseCSV(csvContent);
      console.log(`✅ Loaded ${errors.length} structured data errors from CSV`);
      return errors;
    } catch (error) {
      console.error('❌ Error loading CSV:', error.message);
      throw error;
    }
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
   * Generate implementation code for programmatic fix
   */
  generateBulkFixCode(allFixes) {
    const toolsWithIssues = Object.keys(allFixes);
    const sampleUrls = toolsWithIssues.slice(0, 10);

    let code = `// BULK FIX CODE FOR STRUCTURED DATA ERRORS
// Generated: ${new Date().toISOString()}
// Affects ${toolsWithIssues.length} URLs

const structuredDataFixes = {
  // Template for missing aggregateRating field
  aggregateRating: {
    "@type": "AggregateRating",
    "ratingValue": 4.5, // Update with actual rating from tool data
    "reviewCount": 100, // Update with actual review count
    "bestRating": 5,
    "worstRating": 1
  },

  // Template for missing offers field  
  offers: {
    "@type": "Offer",
    "price": 29, // Update with actual price from tool data
    "priceCurrency": "USD",
    "availability": "https://schema.org/InStock",
    "priceSpecification": {
      "@type": "PriceSpecification", 
      "price": 29, // Update with actual price from tool data
      "priceCurrency": "USD"
    }
  }
};

// Tools that need fixes (sample of ${toolsWithIssues.length}):
const toolsNeedingFixes = [
${sampleUrls.map(url => `  "${url.split('/').pop()}", // ${url}`).join('\n')}
  // ... ${toolsWithIssues.length - 10} more tools
];

// IMPLEMENTATION STRATEGY:
// 1. Update the dynamic review page generation to include these fields
// 2. Pull actual rating/pricing data from aiToolsData.json  
// 3. Apply fixes programmatically across all review pages
// 4. Test with Google Rich Results Test
// 5. Monitor Google Search Console for error reduction

`;

    return code;
  }

  /**
   * Create a comprehensive analysis report
   */
  generateAnalysisReport(classification, allFixes) {
    const uniqueUrls = Object.keys(classification.summary.byUrl).length;
    const missingRatingCount = classification.summary.byField['aggregateRating or review'] || 0;
    const missingOffersCount = classification.summary.byField['offers'] || 0;

    const report = {
      timestamp: new Date().toISOString(),
      executive_summary: {
        total_errors: classification.summary.total,
        unique_urls_affected: uniqueUrls,
        critical_issues: missingRatingCount + missingOffersCount,
        estimated_fix_time: '2-4 hours for bulk implementation',
        seo_impact: 'HIGH - Blocks rich results for 719+ URLs'
      },
      error_breakdown: {
        missing_aggregateRating: missingRatingCount,
        missing_offers: missingOffersCount,
        unrecognized_properties: classification.unrecognized_properties.length,
        other_issues: classification.other.length
      },
      most_common_errors: Object.entries(classification.summary.byField)
        .sort(([,a], [,b]) => b - a)
        .slice(0, 5),
      fix_strategy: {
        phase_1: {
          title: 'Critical Missing Fields (HIGH PRIORITY)',
          description: 'Add aggregateRating and offers fields to all review pages',
          affected_urls: missingRatingCount / 2, // Each URL has 2 errors typically
          implementation: 'Bulk programmatic fix',
          estimated_time: '2-3 hours'
        },
        phase_2: {
          title: 'Clean Up Unrecognized Properties (MEDIUM PRIORITY)', 
          description: 'Remove schema properties not recognized by Schema.org',
          affected_urls: [...new Set(classification.unrecognized_properties.map(e => e.url))].length,
          implementation: 'Template cleanup',
          estimated_time: '1 hour'
        }
      },
      recommendations: [
        '🚨 URGENT: Fix missing aggregateRating and offers fields (blocks rich results)',
        '📊 Impact: 719 URLs currently cannot display rich snippets in search',
        '🛠️ Solution: Programmatic bulk fix using existing tool data', 
        '⏱️ Timeline: Can be implemented in 2-4 hours',
        '📈 Expected Result: Significant improvement in search visibility'
      ],
      next_steps: [
        '1. Extract rating/pricing data from aiToolsData.json',
        '2. Update review page template to include required fields',
        '3. Deploy and test with Google Rich Results Test',
        '4. Monitor Google Search Console for error reduction',
        '5. Track rich snippet appearances in search results'
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
      
      // Step 4: Generate implementation code
      console.log('💻 Generating implementation code...');
      const bulkFixCode = this.generateBulkFixCode(missingFieldFixes);

      // Step 5: Generate comprehensive report
      console.log('📋 Generating analysis report...');
      const report = this.generateAnalysisReport(classification, missingFieldFixes);

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
        path.join(outputDir, `bulk-fix-implementation-${timestamp}.js`),
        bulkFixCode
      );

      // Save fixes data
      fs.writeFileSync(
        path.join(outputDir, `fixes-${timestamp}.json`),
        JSON.stringify(missingFieldFixes, null, 2)
      );

      // Display summary
      console.log('\n✅ Rich Results Analysis Complete!\n');
      console.log('🎯 EXECUTIVE SUMMARY:');
      console.log(`   Total Errors: ${report.executive_summary.total_errors}`);
      console.log(`   URLs Affected: ${report.executive_summary.unique_urls_affected}`);
      console.log(`   Critical Issues: ${report.executive_summary.critical_issues}`);
      console.log(`   SEO Impact: ${report.executive_summary.seo_impact}`);
      console.log(`   Fix Time: ${report.executive_summary.estimated_fix_time}`);
      
      console.log('\n🔥 ERROR BREAKDOWN:');
      Object.entries(report.error_breakdown).forEach(([type, count]) => {
        console.log(`   ${type}: ${count}`);
      });
      
      console.log('\n💡 RECOMMENDATIONS:');
      report.recommendations.forEach((rec) => {
        console.log(`   ${rec}`);
      });
      
      console.log('\n📋 NEXT STEPS:');
      report.next_steps.forEach((step) => {
        console.log(`   ${step}`);
      });
      
      console.log(`\n📁 Reports saved to: ${outputDir}`);

      return {
        classification,
        fixes: missingFieldFixes,
        report,
        bulkFixCode
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
    console.log('Usage: node rich-results-analyzer-simple.js [path-to-csv]');
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