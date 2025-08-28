#!/usr/bin/env node

const fs = require('fs').promises;
const path = require('path');

console.log('🧪 AI Tools Comparison System - Validation\n');
console.log('='.repeat(60));

// Test Results Storage
let results = {
  passed: 0,
  failed: 0,
  warnings: 0
};

const log = (status, message) => {
  const icon = status === 'PASS' ? '✅' : status === 'FAIL' ? '❌' : '⚠️';
  console.log(`${icon} ${message}`);
  
  if (status === 'PASS') results.passed++;
  else if (status === 'FAIL') results.failed++;
  else results.warnings++;
};

async function validateSystem() {
  console.log('📊 Validating AI Tools Comparison System...\n');
  
  // Test 1: Data Schema
  try {
    const schemaPath = path.join(__dirname, '../data/comparison-schema.json');
    const schema = JSON.parse(await fs.readFile(schemaPath, 'utf8'));
    
    if (schema.aiToolsComparisonData && Array.isArray(schema.aiToolsComparisonData)) {
      log('PASS', `Data Schema: ${schema.aiToolsComparisonData.length} tools loaded`);
      
      // Check for PRD tools
      const chatgpt = schema.aiToolsComparisonData.find(t => t.tool_name.toLowerCase() === 'chatgpt');
      const jasper = schema.aiToolsComparisonData.find(t => t.tool_name.toLowerCase().includes('jasper'));
      
      if (chatgpt && jasper) {
        log('PASS', 'PRD Requirements: ChatGPT and Jasper AI data present');
      } else {
        log('FAIL', 'PRD Requirements: Missing ChatGPT or Jasper AI data');
      }
    } else {
      log('FAIL', 'Data Schema: Invalid structure');
    }
  } catch (error) {
    log('FAIL', `Data Schema: ${error.message}`);
  }
  
  // Test 2: Components
  const components = [
    'components/comparison/ComparisonTable.jsx',
    'components/comparison/PricingCalculator.jsx', 
    'components/comparison/FAQSection.jsx',
    'components/comparison/HeroSection.jsx',
    'components/SEOHead.jsx'
  ];
  
  for (const comp of components) {
    try {
      await fs.access(path.join(__dirname, '..', comp));
      log('PASS', `Component: ${path.basename(comp)} exists`);
    } catch {
      log('FAIL', `Component: ${path.basename(comp)} missing`);
    }
  }
  
  // Test 3: SEO Utils
  try {
    await fs.access(path.join(__dirname, '../utils/seoMetaGenerator.js'));
    log('PASS', 'SEO Utils: Meta generator available');
  } catch {
    log('FAIL', 'SEO Utils: Meta generator missing');
  }
  
  // Test 4: Main Comparison Page
  try {
    const pagePath = path.join(__dirname, '../pages/compare/chatgpt-vs-jasper-ai.tsx');
    const content = await fs.readFile(pagePath, 'utf8');
    
    const requiredSections = ['SEOHead', 'ComparisonTable', 'PricingCalculator', 'FAQSection'];
    let found = 0;
    
    requiredSections.forEach(section => {
      if (content.includes(section)) found++;
    });
    
    if (found === requiredSections.length) {
      log('PASS', `Main Page: All ${found} required sections present`);
    } else {
      log('WARN', `Main Page: ${found}/${requiredSections.length} sections found`);
    }
  } catch {
    log('FAIL', 'Main Page: ChatGPT vs Jasper comparison page missing');
  }
  
  // Test 5: Analytics
  try {
    await fs.access(path.join(__dirname, '../utils/analytics.js'));
    log('PASS', 'Analytics: Tracking system available');
  } catch {
    log('FAIL', 'Analytics: Tracking system missing');
  }
  
  // Test 6: Package.json validation
  try {
    const packagePath = path.join(__dirname, '../package.json');
    const pkg = JSON.parse(await fs.readFile(packagePath, 'utf8'));
    
    const requiredDeps = ['next', 'react'];
    const hasRequired = requiredDeps.every(dep => 
      pkg.dependencies?.[dep] || pkg.devDependencies?.[dep]
    );
    
    if (hasRequired) {
      log('PASS', 'Dependencies: Required packages available');
    } else {
      log('WARN', 'Dependencies: Some required packages may be missing');
    }
  } catch {
    log('WARN', 'Dependencies: Could not validate package.json');
  }
  
  console.log('\n' + '='.repeat(60));
  console.log('📊 VALIDATION SUMMARY');
  console.log('='.repeat(60));
  console.log(`✅ Passed: ${results.passed}`);
  console.log(`❌ Failed: ${results.failed}`);
  console.log(`⚠️  Warnings: ${results.warnings}`);
  
  const total = results.passed + results.failed + results.warnings;
  const successRate = total > 0 ? (results.passed / total) * 100 : 0;
  
  console.log(`📊 Success Rate: ${successRate.toFixed(1)}%`);
  
  if (results.failed === 0 && results.passed > 0) {
    console.log('\n🎉 SYSTEM VALIDATION SUCCESSFUL!');
    console.log('✅ All core components implemented');
    console.log('✅ Ready for deployment testing');
  } else if (results.failed > 0) {
    console.log('\n⚠️ ISSUES DETECTED');
    console.log('🔧 Fix failed items before deployment');
  }
  
  console.log('\n💡 Next Steps:');
  console.log('1. Run: npm run build');
  console.log('2. Test manually in browser'); 
  console.log('3. Run Lighthouse performance test');
  console.log('4. Deploy to staging environment');
  console.log('5. Final validation & go-live');
}

validateSystem().catch(console.error);