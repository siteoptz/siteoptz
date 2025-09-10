#!/usr/bin/env node

const fs = require('fs');
const { execSync } = require('child_process');

/**
 * Test all comparison redirects from vercel.json
 * This script specifically tests the /compare/*-vs-* redirects
 */

function extractComparisonRedirects(vercelJsonPath) {
  try {
    const vercelConfig = JSON.parse(fs.readFileSync(vercelJsonPath, 'utf8'));
    
    if (!vercelConfig.redirects || !Array.isArray(vercelConfig.redirects)) {
      throw new Error('No redirects found in vercel.json');
    }
    
    // Filter for comparison redirects (source contains -vs- and destination contains /vs/)
    const comparisonRedirects = vercelConfig.redirects.filter(redirect => 
      redirect.source && 
      redirect.destination && 
      redirect.source.includes('-vs-') && 
      redirect.destination.includes('/vs/') &&
      redirect.statusCode === 301
    );
    
    return comparisonRedirects;
  } catch (error) {
    throw new Error(`Error reading vercel.json: ${error.message}`);
  }
}

async function testComparisonRedirects() {
  console.log('🔍 Extracting comparison redirects from vercel.json...');
  
  const redirects = extractComparisonRedirects('vercel.json');
  console.log(`Found ${redirects.length} comparison redirects to test\n`);
  
  if (redirects.length === 0) {
    console.log('No comparison redirects found!');
    return;
  }
  
  // Create test file with source URLs
  const sourceUrls = redirects.map(r => r.source);
  fs.writeFileSync('comparison-redirects-test.txt', sourceUrls.join('\n'));
  
  console.log('🧪 Testing all comparison redirects...');
  console.log('This may take a few minutes for large numbers of redirects...\n');
  
  try {
    execSync('node test-301-redirects.js comparison-redirects-test.txt', { stdio: 'inherit' });
    
    console.log('\n✅ Comparison redirect test completed!');
    console.log('📄 Check redirect-test-results.json for detailed results');
    
    // Show summary of what was tested
    console.log('\n📊 Test Summary:');
    console.log(`- Total comparison redirects tested: ${redirects.length}`);
    console.log('- All redirects should return 301 status codes');
    console.log('- Any 308 status codes indicate a configuration issue');
    
  } catch (error) {
    console.error('❌ Test failed:', error.message);
    process.exit(1);
  }
}

// Quick test with sample
async function quickTest() {
  console.log('⚡ Running quick test with 5 sample comparison redirects...\n');
  
  const redirects = extractComparisonRedirects('vercel.json');
  const sampleRedirects = redirects.slice(0, 5);
  
  if (sampleRedirects.length === 0) {
    console.log('No comparison redirects found!');
    return;
  }
  
  const sourceUrls = sampleRedirects.map(r => r.source);
  fs.writeFileSync('quick-test.txt', sourceUrls.join('\n'));
  
  try {
    execSync('node test-301-redirects.js quick-test.txt', { stdio: 'inherit' });
  } catch (error) {
    console.error('❌ Quick test failed:', error.message);
    process.exit(1);
  }
}

// Show redirect configuration
function showRedirectConfig() {
  console.log('📋 Comparison redirect configuration from vercel.json:\n');
  
  const redirects = extractComparisonRedirects('vercel.json');
  const sampleRedirects = redirects.slice(0, 10);
  
  sampleRedirects.forEach((redirect, index) => {
    console.log(`${index + 1}. ${redirect.source} → ${redirect.destination} (${redirect.statusCode})`);
  });
  
  if (redirects.length > 10) {
    console.log(`... and ${redirects.length - 10} more redirects`);
  }
  
  console.log(`\nTotal comparison redirects: ${redirects.length}`);
  console.log('All redirects are configured with statusCode: 301');
}

// Main execution
function main() {
  const args = process.argv.slice(2);
  const command = args[0] || 'test';
  
  switch (command) {
    case 'test':
      testComparisonRedirects();
      break;
    case 'quick':
      quickTest();
      break;
    case 'config':
      showRedirectConfig();
      break;
    default:
      console.log('Usage: node test-comparison-redirects.js [command]');
      console.log('');
      console.log('Commands:');
      console.log('  test   - Test all comparison redirects (default)');
      console.log('  quick  - Quick test with 5 sample redirects');
      console.log('  config - Show redirect configuration');
      console.log('');
      console.log('Examples:');
      console.log('  node test-comparison-redirects.js test');
      console.log('  node test-comparison-redirects.js quick');
      console.log('  node test-comparison-redirects.js config');
      break;
  }
}

if (require.main === module) {
  main();
}

module.exports = { extractComparisonRedirects, testComparisonRedirects };

