#!/usr/bin/env node

/**
 * Integration Test Suite for SiteOptz AI
 * Tests API endpoints, data integrity, and core functionality
 */

const fs = require('fs');
const path = require('path');
const { performance } = require('perf_hooks');
const chalk = require('chalk');

// Test configuration
const CONFIG = {
  baseUrl: process.env.TEST_BASE_URL || 'http://localhost:3000',
  timeout: 10000,
  retries: 3
};

class TestRunner {
  constructor() {
    this.tests = [];
    this.results = {
      passed: 0,
      failed: 0,
      skipped: 0,
      total: 0
    };
    this.startTime = performance.now();
  }

  async runTests() {
    console.log(chalk.blue.bold('🚀 Running SiteOptz Integration Tests\n'));
    
    // Register all tests
    this.registerTests();
    
    // Run tests sequentially
    for (const test of this.tests) {
      await this.runTest(test);
    }
    
    // Print summary
    this.printSummary();
    
    // Exit with appropriate code
    process.exit(this.results.failed > 0 ? 1 : 0);
  }

  registerTests() {
    // API Tests
    this.addTest('API: Tool Data Endpoints', this.testToolDataAPI);
    this.addTest('API: Email Subscription', this.testEmailSubscriptionAPI);
    this.addTest('API: Rate Limiting', this.testRateLimiting);
    
    // Data Integrity Tests
    this.addTest('Data: Tool Data Structure', this.testToolDataStructure);
    this.addTest('Data: FAQ Data Structure', this.testFAQDataStructure);
    this.addTest('Data: Schema Validation', this.testSchemaValidation);
    
    // Template Tests
    this.addTest('Templates: HTML Structure', this.testHTMLTemplates);
    this.addTest('Templates: PHP Structure', this.testPHPTemplates);
    
    // Performance Tests
    this.addTest('Performance: API Response Times', this.testAPIPerformance);
    this.addTest('Performance: Static Asset Loading', this.testStaticAssets);
  }

  addTest(name, testFunction) {
    this.tests.push({ name, testFunction: testFunction.bind(this) });
    this.results.total++;
  }

  async runTest(test) {
    const startTime = performance.now();
    
    try {
      console.log(chalk.yellow(`⏳ ${test.name}`));
      
      await Promise.race([
        test.testFunction(),
        new Promise((_, reject) => 
          setTimeout(() => reject(new Error('Test timeout')), CONFIG.timeout)
        )
      ]);
      
      const duration = (performance.now() - startTime).toFixed(2);
      console.log(chalk.green(`✅ ${test.name} (${duration}ms)`));
      this.results.passed++;
      
    } catch (error) {
      const duration = (performance.now() - startTime).toFixed(2);
      console.log(chalk.red(`❌ ${test.name} (${duration}ms)`));
      console.log(chalk.red(`   Error: ${error.message}`));
      this.results.failed++;
    }
  }

  // API Tests
  async testToolDataAPI() {
    const response = await this.fetch('/api/tools/chatgpt');
    
    if (response.status !== 200) {
      throw new Error(`Expected 200, got ${response.status}`);
    }
    
    const data = await response.json();
    
    if (!data.slug || !data.name || !data.features) {
      throw new Error('Missing required tool data fields');
    }
    
    if (!Array.isArray(data.features) || data.features.length === 0) {
      throw new Error('Features should be a non-empty array');
    }
  }

  async testEmailSubscriptionAPI() {
    const testData = {
      email: 'test@example.com',
      source: 'integration_test',
      tool: 'chatgpt'
    };
    
    const response = await this.fetch('/api/subscribe', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(testData)
    });
    
    if (response.status !== 200) {
      throw new Error(`Expected 200, got ${response.status}`);
    }
    
    const result = await response.json();
    
    if (!result.message || !result.data) {
      throw new Error('Missing response data structure');
    }
  }

  async testRateLimiting() {
    const requests = [];
    
    // Send multiple requests rapidly
    for (let i = 0; i < 10; i++) {
      requests.push(
        this.fetch('/api/subscribe', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: `test${i}@example.com` })
        })
      );
    }
    
    const responses = await Promise.all(requests);
    const rateLimited = responses.some(r => r.status === 429);
    
    if (!rateLimited) {
      throw new Error('Rate limiting not working - expected 429 status');
    }
  }

  // Data Integrity Tests
  async testToolDataStructure() {
    const dataPath = path.join(process.cwd(), 'data', 'tool_data.json');
    
    if (!fs.existsSync(dataPath)) {
      throw new Error('tool_data.json not found');
    }
    
    const data = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
    
    if (!Array.isArray(data) || data.length === 0) {
      throw new Error('Tool data should be a non-empty array');
    }
    
    const requiredFields = ['slug', 'name', 'description', 'features', 'pros', 'cons', 'pricing'];
    
    for (const tool of data) {
      for (const field of requiredFields) {
        if (!(field in tool)) {
          throw new Error(`Tool ${tool.name || 'unknown'} missing required field: ${field}`);
        }
      }
      
      // Validate slug format
      if (!/^[a-z0-9-]+$/.test(tool.slug)) {
        throw new Error(`Invalid slug format for tool: ${tool.slug}`);
      }
      
      // Validate arrays
      if (!Array.isArray(tool.features) || !Array.isArray(tool.pros) || !Array.isArray(tool.cons)) {
        throw new Error(`Features, pros, and cons must be arrays for tool: ${tool.name}`);
      }
    }
  }

  async testFAQDataStructure() {
    const dataPath = path.join(process.cwd(), 'data', 'faq_data.json');
    
    if (!fs.existsSync(dataPath)) {
      throw new Error('faq_data.json not found');
    }
    
    const data = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
    
    if (!Array.isArray(data)) {
      throw new Error('FAQ data should be an array');
    }
    
    for (const toolFAQ of data) {
      if (!toolFAQ.tool_slug || !toolFAQ.faq) {
        throw new Error('FAQ entry missing tool_slug or faq field');
      }
      
      if (!Array.isArray(toolFAQ.faq)) {
        throw new Error('FAQ field should be an array');
      }
      
      for (const faq of toolFAQ.faq) {
        if (!faq.question || !faq.answer) {
          throw new Error('FAQ entry missing question or answer');
        }
      }
    }
  }

  async testSchemaValidation() {
    // Test JSON-LD schema structure for tools
    const toolDataPath = path.join(process.cwd(), 'data', 'tool_data.json');
    const tools = JSON.parse(fs.readFileSync(toolDataPath, 'utf8'));
    
    for (const tool of tools) {
      if (!tool.schema) {
        throw new Error(`Tool ${tool.name} missing schema field`);
      }
      
      const schema = tool.schema;
      const requiredSchemaFields = ['@context', '@type', 'name'];
      
      for (const field of requiredSchemaFields) {
        if (!(field in schema)) {
          throw new Error(`Schema for ${tool.name} missing required field: ${field}`);
        }
      }
      
      if (schema['@context'] !== 'https://schema.org') {
        throw new Error(`Invalid schema context for ${tool.name}`);
      }
      
      if (schema['@type'] !== 'SoftwareApplication') {
        throw new Error(`Invalid schema type for ${tool.name}`);
      }
    }
  }

  // Template Tests
  async testHTMLTemplates() {
    const templatesDir = path.join(process.cwd(), 'wordpress-package', 'theme', 'templates');
    const requiredTemplates = ['tool_detail.html', 'comparison.html'];
    
    for (const template of requiredTemplates) {
      const templatePath = path.join(templatesDir, template);
      
      if (!fs.existsSync(templatePath)) {
        throw new Error(`Template not found: ${template}`);
      }
      
      const content = fs.readFileSync(templatePath, 'utf8');
      
      // Check for essential template variables
      if (template === 'tool_detail.html') {
        const requiredVars = ['{{tool.name}}', '{{tool.description}}', '{{tool.features}}'];
        for (const variable of requiredVars) {
          if (!content.includes(variable)) {
            throw new Error(`Template ${template} missing variable: ${variable}`);
          }
        }
      }
      
      // Check for proper HTML structure
      if (!content.includes('<!DOCTYPE html>') || !content.includes('<html')) {
        throw new Error(`Template ${template} missing proper HTML structure`);
      }
    }
  }

  async testPHPTemplates() {
    const phpDir = path.join(process.cwd(), 'wordpress-package', 'theme');
    const requiredFiles = ['single-tool.php', 'page-comparison.php'];
    
    for (const file of requiredFiles) {
      const filePath = path.join(phpDir, file);
      
      if (!fs.existsSync(filePath)) {
        throw new Error(`PHP file not found: ${file}`);
      }
      
      const content = fs.readFileSync(filePath, 'utf8');
      
      // Check for PHP opening tag
      if (!content.includes('<?php')) {
        throw new Error(`PHP file ${file} missing opening tag`);
      }
      
      // Check for WordPress functions
      if (!content.includes('get_field') && !content.includes('the_field')) {
        throw new Error(`PHP file ${file} missing ACF functions`);
      }
    }
  }

  // Performance Tests
  async testAPIPerformance() {
    const endpoints = ['/api/tools/chatgpt', '/api/tools/claude'];
    
    for (const endpoint of endpoints) {
      const startTime = performance.now();
      const response = await this.fetch(endpoint);
      const endTime = performance.now();
      
      const duration = endTime - startTime;
      
      if (response.status !== 200) {
        throw new Error(`Endpoint ${endpoint} returned ${response.status}`);
      }
      
      if (duration > 1000) { // 1 second threshold
        throw new Error(`Endpoint ${endpoint} too slow: ${duration.toFixed(2)}ms`);
      }
    }
  }

  async testStaticAssets() {
    const assets = [
      '/styles/components.css',
      '/styles/utilities.css'
    ];
    
    for (const asset of assets) {
      const response = await this.fetch(asset);
      
      if (response.status === 404) {
        console.log(chalk.yellow(`⚠️  Static asset not found (expected): ${asset}`));
        continue;
      }
      
      if (response.status !== 200) {
        throw new Error(`Static asset ${asset} returned ${response.status}`);
      }
    }
  }

  // Utility Methods
  async fetch(url, options = {}) {
    const fullUrl = url.startsWith('http') ? url : `${CONFIG.baseUrl}${url}`;
    
    try {
      const fetch = (await import('node-fetch')).default;
      return await fetch(fullUrl, {
        timeout: CONFIG.timeout,
        ...options
      });
    } catch (error) {
      throw new Error(`Fetch failed for ${url}: ${error.message}`);
    }
  }

  printSummary() {
    const duration = ((performance.now() - this.startTime) / 1000).toFixed(2);
    
    console.log('\n' + chalk.blue.bold('📊 Test Summary'));
    console.log(chalk.blue('═'.repeat(50)));
    
    console.log(`Total Tests: ${this.results.total}`);
    console.log(chalk.green(`Passed: ${this.results.passed}`));
    console.log(chalk.red(`Failed: ${this.results.failed}`));
    console.log(chalk.yellow(`Skipped: ${this.results.skipped}`));
    console.log(`Duration: ${duration}s`);
    
    if (this.results.failed === 0) {
      console.log('\n' + chalk.green.bold('🎉 All tests passed!'));
    } else {
      console.log('\n' + chalk.red.bold('❌ Some tests failed'));
    }
    
    console.log(chalk.blue('═'.repeat(50)));
  }
}

// Run tests if called directly
if (require.main === module) {
  const runner = new TestRunner();
  runner.runTests().catch(error => {
    console.error(chalk.red('Fatal error:'), error.message);
    process.exit(1);
  });
}

module.exports = TestRunner;

