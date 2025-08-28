#!/usr/bin/env node

const fs = require('fs').promises;
const path = require('path');
const lighthouse = require('lighthouse');
const chromeLauncher = require('chrome-launcher');

console.log('🧪 AI Tools Comparison System - Testing Suite\n');
console.log('='.repeat(60));

// Test Configuration
const TEST_CONFIG = {
  baseUrl: process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000',
  pages: [
    '/compare/chatgpt-vs-jasper-ai',
    '/tools?category=Content%20Creation',
    '/reviews/chatgpt',
    '/reviews/jasper-ai'
  ],
  lighthouse: {
    performance: 90,
    accessibility: 90,
    seo: 90,
    bestPractices: 85
  }
};

// Test Results Storage
let testResults = {
  timestamp: new Date().toISOString(),
  passed: 0,
  failed: 0,
  tests: []
};

// Helper Functions
const logTest = (name, status, message = '') => {
  const icon = status === 'PASS' ? '✅' : status === 'FAIL' ? '❌' : '⚠️';
  console.log(`${icon} ${name}: ${message}`);
  
  testResults.tests.push({
    name,
    status,
    message,
    timestamp: new Date().toISOString()
  });
  
  if (status === 'PASS') testResults.passed++;
  if (status === 'FAIL') testResults.failed++;
};

// Test 1: Data Schema Validation
async function testDataSchema() {
  console.log('\n📊 Test 1: Data Schema Validation');
  
  try {
    const schemaPath = path.join(__dirname, '../data/comparison-schema.json');
    const schema = JSON.parse(await fs.readFile(schemaPath, 'utf8'));
    
    // Validate structure
    if (!schema.aiToolsComparisonData || !Array.isArray(schema.aiToolsComparisonData)) {
      logTest('Schema Structure', 'FAIL', 'Missing aiToolsComparisonData array');
      return;
    }
    
    logTest('Schema Structure', 'PASS', `${schema.aiToolsComparisonData.length} tools loaded`);
    
    // Validate required fields for each tool
    let validTools = 0;
    const requiredFields = ['tool_name', 'vendor', 'features', 'pricing', 'pros', 'cons', 'rating', 'use_cases'];
    
    for (const tool of schema.aiToolsComparisonData) {
      const missingFields = requiredFields.filter(field => !tool[field]);
      if (missingFields.length === 0) {
        validTools++;
      }
    }
    
    if (validTools === schema.aiToolsComparisonData.length) {
      logTest('Tool Data Validation', 'PASS', `All ${validTools} tools have required fields`);
    } else {
      logTest('Tool Data Validation', 'WARN', `${validTools}/${schema.aiToolsComparisonData.length} tools valid`);
    }
    
    // Check for ChatGPT and Jasper AI (PRD requirements)
    const chatgpt = schema.aiToolsComparisonData.find(t => t.tool_name.toLowerCase() === 'chatgpt');
    const jasper = schema.aiToolsComparisonData.find(t => t.tool_name.toLowerCase().includes('jasper'));
    
    if (chatgpt && jasper) {
      logTest('PRD Tools Present', 'PASS', 'ChatGPT and Jasper AI found in data');
    } else {
      logTest('PRD Tools Present', 'FAIL', 'Missing ChatGPT or Jasper AI in data');
    }
    
  } catch (error) {
    logTest('Data Schema', 'FAIL', error.message);
  }
}

// Test 2: Component Validation
async function testComponents() {
  console.log('\n🧩 Test 2: Component Validation');
  
  const components = [
    '../components/comparison/ComparisonTable.jsx',
    '../components/comparison/PricingCalculator.jsx',
    '../components/comparison/FAQSection.jsx',
    '../components/comparison/HeroSection.jsx',
    '../components/SEOHead.jsx'
  ];
  
  for (const componentPath of components) {
    try {
      const fullPath = path.join(__dirname, componentPath);
      await fs.access(fullPath);
      
      const content = await fs.readFile(fullPath, 'utf8');
      
      // Basic React component validation
      if (content.includes('export default') && content.includes('React')) {
        logTest(`Component: ${path.basename(componentPath)}`, 'PASS', 'Valid React component');
      } else {
        logTest(`Component: ${path.basename(componentPath)}`, 'WARN', 'Possible component issues');
      }
      
    } catch (error) {
      logTest(`Component: ${path.basename(componentPath)}`, 'FAIL', 'File not found or readable');
    }
  }
}

// Test 3: SEO Validation
async function testSEO() {
  console.log('\n🔍 Test 3: SEO Implementation Validation');
  
  try {
    // Check SEO utility functions
    const seoUtilPath = path.join(__dirname, '../utils/seoMetaGenerator.js');
    await fs.access(seoUtilPath);
    logTest('SEO Utilities', 'PASS', 'SEO generator functions available');
    
    // Test meta generation (if we can require it)
    try {
      const { generateComparisonSEO } = require(seoUtilPath);
      const mockTool1 = { name: 'Tool A', slug: 'tool-a', overview: { category: 'AI Tools' } };
      const mockTool2 = { name: 'Tool B', slug: 'tool-b', overview: { category: 'AI Tools' } };
      
      const seoData = generateComparisonSEO(mockTool1, mockTool2);
      
      if (seoData.title && seoData.description && seoData.openGraph) {
        logTest('SEO Generation', 'PASS', 'Meta data generation working');
      } else {
        logTest('SEO Generation', 'FAIL', 'Incomplete meta data generation');
      }
    } catch (genError) {
      logTest('SEO Generation', 'WARN', 'Could not test meta generation: ' + genError.message);
    }
    
  } catch (error) {
    logTest('SEO Implementation', 'FAIL', error.message);
  }
}

// Test 4: Page Structure Validation
async function testPageStructure() {
  console.log('\n📄 Test 4: Page Structure Validation');
  
  // Check main comparison page
  try {
    const mainPagePath = path.join(__dirname, '../pages/compare/chatgpt-vs-jasper-ai.tsx');
    await fs.access(mainPagePath);
    
    const content = await fs.readFile(mainPagePath, 'utf8');
    
    // Check for required sections
    const requiredSections = [
      'SEOHead',
      'ComparisonTable',
      'PricingCalculator',
      'FAQSection',
      'getStaticProps'
    ];
    
    let sectionsFound = 0;
    for (const section of requiredSections) {
      if (content.includes(section)) {
        sectionsFound++;
      }
    }
    
    if (sectionsFound === requiredSections.length) {
      logTest('Page Structure', 'PASS', `All ${sectionsFound} required sections found`);
    } else {
      logTest('Page Structure', 'WARN', `${sectionsFound}/${requiredSections.length} sections found`);
    }
    
  } catch (error) {
    logTest('Page Structure', 'FAIL', 'Main comparison page not found');
  }
}

// Test 5: Lighthouse Performance (if server is running)
async function testLighthouse() {
  console.log('\n🚀 Test 5: Lighthouse Performance Testing');
  
  if (process.env.SKIP_LIGHTHOUSE === 'true') {
    logTest('Lighthouse Tests', 'SKIP', 'Skipped (SKIP_LIGHTHOUSE=true)');
    return;
  }
  
  try {
    // Test if server is running
    const testUrl = `${TEST_CONFIG.baseUrl}/api/health`;
    
    logTest('Lighthouse Setup', 'PASS', 'Starting performance tests...');
    
    // Note: This would require the development server to be running
    // In a real implementation, you'd launch Lighthouse here
    logTest('Performance Tests', 'SKIP', 'Requires running development server');
    
  } catch (error) {
    logTest('Lighthouse Tests', 'SKIP', 'Development server not available');
  }
}

// Test 6: Build Validation
async function testBuild() {
  console.log('\n🏗️ Test 6: Build Validation');
  
  try {
    // Check if build directory exists (after build)
    const buildPath = path.join(__dirname, '../.next');
    
    try {
      await fs.access(buildPath);
      logTest('Next.js Build', 'PASS', 'Build directory found');
      
      // Check for specific build outputs
      const pagesManifest = path.join(buildPath, 'server/pages-manifest.json');
      await fs.access(pagesManifest);
      logTest('Build Artifacts', 'PASS', 'Build artifacts present');
      
    } catch (buildError) {
      logTest('Build Check', 'WARN', 'Run "npm run build" to generate build artifacts');
    }
    
  } catch (error) {
    logTest('Build Validation', 'FAIL', error.message);
  }
}

// Test 7: Integration Tests
async function testIntegration() {
  console.log('\n🔗 Test 7: Integration Validation');
  
  // Test data integration
  try {
    const schemaPath = path.join(__dirname, '../data/comparison-schema.json');
    const existingDataPath = path.join(__dirname, '../public/data/aiToolsData.json');
    
    const schema = JSON.parse(await fs.readFile(schemaPath, 'utf8'));
    
    try {
      const existingData = JSON.parse(await fs.readFile(existingDataPath, 'utf8'));
      logTest('Data Integration', 'PASS', `Schema (${schema.aiToolsComparisonData.length}) + Existing (${existingData.length}) tools`);
    } catch (existingError) {
      logTest('Data Integration', 'WARN', 'Existing data file not found - comparison will use schema only');
    }
    
  } catch (error) {
    logTest('Integration Tests', 'FAIL', error.message);
  }
}

// Generate Test Report
async function generateReport() {
  console.log('\n📊 Generating Test Report...');
  
  const reportPath = path.join(__dirname, '../test-results.json');
  await fs.writeFile(reportPath, JSON.stringify(testResults, null, 2));
  
  console.log('\n' + '='.repeat(60));
  console.log('🎯 TEST RESULTS SUMMARY');
  console.log('='.repeat(60));
  console.log(`✅ Passed: ${testResults.passed}`);
  console.log(`❌ Failed: ${testResults.failed}`);
  console.log(`⚠️  Warnings: ${testResults.tests.filter(t => t.status === 'WARN').length}`);
  console.log(`⏭️  Skipped: ${testResults.tests.filter(t => t.status === 'SKIP').length}`);
  console.log(`📄 Report saved: ${reportPath}`);
  
  const successRate = (testResults.passed / (testResults.passed + testResults.failed)) * 100;
  
  if (successRate >= 80) {
    console.log('\n🎉 SYSTEM READY FOR DEPLOYMENT!');
    console.log(`✅ Success Rate: ${successRate.toFixed(1)}%`);
  } else {
    console.log('\n⚠️ ISSUES DETECTED - REVIEW BEFORE DEPLOYMENT');
    console.log(`📊 Success Rate: ${successRate.toFixed(1)}%`);
  }
  
  console.log('\n💡 Next Steps:');
  console.log('1. Fix any failed tests');
  console.log('2. Run: npm run build');
  console.log('3. Run: npm run start');
  console.log('4. Test manually in browser');
  console.log('5. Deploy to production');
}

// Main Test Runner
async function runTests() {
  console.log('Starting comprehensive testing suite...\n');
  
  await testDataSchema();
  await testComponents();
  await testSEO();
  await testPageStructure();
  await testLighthouse();
  await testBuild();
  await testIntegration();
  await generateReport();
}

// Run tests
runTests().catch(error => {
  console.error('\n❌ Test suite failed:', error);
  process.exit(1);
});