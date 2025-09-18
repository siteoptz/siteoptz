#!/usr/bin/env node

/**
 * Rich Results Testing and Validation Tool
 * 
 * This script tests URLs for rich results compliance and validates fixes
 */

const https = require('https');
const http = require('http');
const fs = require('fs');
const path = require('path');

class RichResultsTester {
  constructor() {
    this.testResults = {
      tested: 0,
      passed: 0,
      failed: 0,
      errors: [],
      results: []
    };
  }

  /**
   * Fetch HTML content from a URL
   */
  async fetchURL(url) {
    return new Promise((resolve, reject) => {
      const client = url.startsWith('https') ? https : http;
      
      const req = client.get(url, { timeout: 10000 }, (res) => {
        let data = '';
        
        res.on('data', chunk => {
          data += chunk;
        });
        
        res.on('end', () => {
          resolve({
            statusCode: res.statusCode,
            html: data
          });
        });
      });
      
      req.on('error', reject);
      req.on('timeout', () => {
        req.destroy();
        reject(new Error('Request timeout'));
      });
    });
  }

  /**
   * Extract JSON-LD structured data from HTML
   */
  extractStructuredData(html) {
    const jsonLdRegex = /<script[^>]*type=["\']application\/ld\+json["\'][^>]*>(.*?)<\/script>/gis;
    const structuredData = [];
    let match;

    while ((match = jsonLdRegex.exec(html)) !== null) {
      try {
        const jsonContent = match[1].trim();
        const parsed = JSON.parse(jsonContent);
        structuredData.push(parsed);
      } catch (error) {
        console.warn('Failed to parse JSON-LD:', error.message);
      }
    }

    return structuredData;
  }

  /**
   * Validate SoftwareApplication schema for rich results
   */
  validateSoftwareApplication(schema) {
    const results = {
      valid: true,
      errors: [],
      warnings: [],
      hasRequiredFields: {
        aggregateRating: false,
        offers: false,
        name: false,
        description: false
      }
    };

    // Check if it's a SoftwareApplication
    if (schema['@type'] !== 'SoftwareApplication') {
      return results; // Not relevant for our validation
    }

    // Required fields for rich results
    const requiredFields = ['name', 'description'];
    const recommendedFields = ['aggregateRating', 'offers'];

    // Check required fields
    requiredFields.forEach(field => {
      if (!schema[field] || schema[field] === '') {
        results.errors.push(`Missing required field: ${field}`);
        results.valid = false;
      } else {
        results.hasRequiredFields[field] = true;
      }
    });

    // Check recommended fields for rich results
    recommendedFields.forEach(field => {
      if (!schema[field]) {
        results.warnings.push(`Missing recommended field for rich results: ${field}`);
      } else {
        results.hasRequiredFields[field] = true;
      }
    });

    // Validate aggregateRating structure
    if (schema.aggregateRating) {
      const rating = schema.aggregateRating;
      if (!rating['@type'] || rating['@type'] !== 'AggregateRating') {
        results.errors.push('aggregateRating missing @type: AggregateRating');
        results.valid = false;
      }
      if (!rating.ratingValue) {
        results.errors.push('aggregateRating missing ratingValue');
        results.valid = false;
      }
      if (!rating.reviewCount) {
        results.warnings.push('aggregateRating missing reviewCount');
      }
    }

    // Validate offers structure
    if (schema.offers) {
      const offers = schema.offers;
      if (!offers['@type'] || offers['@type'] !== 'Offer') {
        results.errors.push('offers missing @type: Offer');
        results.valid = false;
      }
      if (!offers.price) {
        results.errors.push('offers missing price');
        results.valid = false;
      }
      if (!offers.priceCurrency) {
        results.errors.push('offers missing priceCurrency');
        results.valid = false;
      }
    }

    return results;
  }

  /**
   * Test a single URL for rich results compliance
   */
  async testURL(url) {
    try {
      console.log(`🔍 Testing: ${url}`);
      
      const response = await this.fetchURL(url);
      
      if (response.statusCode !== 200) {
        throw new Error(`HTTP ${response.statusCode}`);
      }

      const structuredData = this.extractStructuredData(response.html);
      
      if (structuredData.length === 0) {
        return {
          url,
          status: 'no_structured_data',
          error: 'No JSON-LD structured data found'
        };
      }

      // Find SoftwareApplication schemas
      const softwareApps = structuredData.filter(schema => 
        schema['@type'] === 'SoftwareApplication'
      );

      if (softwareApps.length === 0) {
        return {
          url,
          status: 'no_software_app',
          error: 'No SoftwareApplication schema found',
          foundSchemas: structuredData.map(s => s['@type'])
        };
      }

      // Validate the first SoftwareApplication schema
      const validation = this.validateSoftwareApplication(softwareApps[0]);
      
      return {
        url,
        status: validation.valid ? 'passed' : 'failed',
        validation,
        schema: softwareApps[0],
        allSchemas: structuredData.length
      };

    } catch (error) {
      return {
        url,
        status: 'error',
        error: error.message
      };
    }
  }

  /**
   * Test multiple URLs and generate report
   */
  async testUrls(urls, options = {}) {
    const { maxConcurrent = 5, delay = 1000 } = options;
    
    console.log(`🚀 Testing ${urls.length} URLs for rich results compliance...\n`);
    
    // Process URLs in batches
    for (let i = 0; i < urls.length; i += maxConcurrent) {
      const batch = urls.slice(i, i + maxConcurrent);
      
      const batchPromises = batch.map(url => this.testURL(url));
      const batchResults = await Promise.all(batchPromises);
      
      batchResults.forEach(result => {
        this.testResults.tested++;
        this.testResults.results.push(result);
        
        if (result.status === 'passed') {
          this.testResults.passed++;
          console.log(`✅ ${result.url} - PASSED`);
        } else {
          this.testResults.failed++;
          console.log(`❌ ${result.url} - ${result.status.toUpperCase()}: ${result.error || 'Validation failed'}`);
        }
      });
      
      // Add delay between batches to avoid overwhelming the server
      if (i + maxConcurrent < urls.length) {
        await new Promise(resolve => setTimeout(resolve, delay));
      }
    }

    return this.generateReport();
  }

  /**
   * Generate comprehensive test report
   */
  generateReport() {
    const report = {
      timestamp: new Date().toISOString(),
      summary: {
        total_tested: this.testResults.tested,
        passed: this.testResults.passed,
        failed: this.testResults.failed,
        success_rate: this.testResults.tested > 0 ? 
          Math.round((this.testResults.passed / this.testResults.tested) * 100) : 0
      },
      issues_found: {
        missing_aggregateRating: 0,
        missing_offers: 0,
        missing_required_fields: 0,
        no_structured_data: 0,
        http_errors: 0
      },
      detailed_results: this.testResults.results
    };

    // Analyze issues
    this.testResults.results.forEach(result => {
      if (result.status === 'no_structured_data') {
        report.issues_found.no_structured_data++;
      } else if (result.status === 'error') {
        report.issues_found.http_errors++;
      } else if (result.validation) {
        if (!result.validation.hasRequiredFields.aggregateRating) {
          report.issues_found.missing_aggregateRating++;
        }
        if (!result.validation.hasRequiredFields.offers) {
          report.issues_found.missing_offers++;
        }
        if (result.validation.errors.length > 0) {
          report.issues_found.missing_required_fields++;
        }
      }
    });

    return report;
  }

  /**
   * Test URLs from the error CSV
   */
  async testFromErrorCSV(csvPath, sampleSize = 20) {
    try {
      const csvContent = fs.readFileSync(csvPath, 'utf-8');
      const lines = csvContent.trim().split('\n');
      
      // Extract unique URLs
      const urls = [...new Set(
        lines.slice(1) // Skip header
          .map(line => line.split(',')[0].replace(/"/g, ''))
          .filter(url => url && url.startsWith('http'))
      )];

      // Take a sample for testing
      const testUrls = urls.slice(0, sampleSize);
      
      console.log(`Found ${urls.length} unique URLs, testing sample of ${testUrls.length}...\n`);
      
      const report = await this.testUrls(testUrls);
      
      // Save report
      const outputDir = path.join(__dirname, '..', 'reports', 'rich-results');
      if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true });
      }
      
      const timestamp = new Date().toISOString().slice(0, 10);
      const reportPath = path.join(outputDir, `validation-report-${timestamp}.json`);
      fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));
      
      console.log('\n📊 TEST SUMMARY:');
      console.log(`   URLs Tested: ${report.summary.total_tested}`);
      console.log(`   Passed: ${report.summary.passed} (${report.summary.success_rate}%)`);
      console.log(`   Failed: ${report.summary.failed}`);
      
      console.log('\n🔍 ISSUES FOUND:');
      Object.entries(report.issues_found).forEach(([issue, count]) => {
        if (count > 0) {
          console.log(`   ${issue}: ${count}`);
        }
      });
      
      console.log(`\n📁 Report saved to: ${reportPath}`);
      
      return report;
      
    } catch (error) {
      console.error('❌ Error testing URLs:', error);
      throw error;
    }
  }
}

// CLI usage
if (require.main === module) {
  const command = process.argv[2];
  const tester = new RichResultsTester();
  
  if (command === 'test-csv') {
    const csvPath = process.argv[3] || path.join(__dirname, '..', 'siteoptz.ai_structured_data_that_contains_markup_errors_20250918.csv');
    const sampleSize = parseInt(process.argv[4]) || 20;
    
    tester.testFromErrorCSV(csvPath, sampleSize)
      .then(() => {
        console.log('\n🎉 Testing completed!');
        process.exit(0);
      })
      .catch(error => {
        console.error('💥 Testing failed:', error);
        process.exit(1);
      });
      
  } else if (command === 'test-url') {
    const url = process.argv[3];
    if (!url) {
      console.error('Usage: node test-rich-results.js test-url <URL>');
      process.exit(1);
    }
    
    tester.testURL(url)
      .then(result => {
        console.log('\n📋 Test Result:');
        console.log(JSON.stringify(result, null, 2));
        process.exit(0);
      })
      .catch(error => {
        console.error('💥 Testing failed:', error);
        process.exit(1);
      });
      
  } else {
    console.log(`
🧪 Rich Results Testing Tool

Usage:
  node test-rich-results.js test-csv [csv-path] [sample-size]
  node test-rich-results.js test-url <URL>

Examples:
  node test-rich-results.js test-csv
  node test-rich-results.js test-csv errors.csv 10
  node test-rich-results.js test-url https://siteoptz.ai/reviews/chatgpt
`);
    process.exit(1);
  }
}

module.exports = RichResultsTester;