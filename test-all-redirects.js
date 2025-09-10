#!/usr/bin/env node

const fs = require('fs');
const { execSync } = require('child_process');

/**
 * Complete test suite for 301 vs 308 redirects
 * This script will:
 * 1. Extract URLs from vercel.json
 * 2. Test all redirects
 * 3. Generate a comprehensive report
 */

async function runCompleteTest() {
  console.log('🚀 Starting complete redirect test suite...\n');
  
  try {
    // Step 1: Extract URLs from vercel.json
    console.log('📋 Step 1: Extracting URLs from vercel.json...');
    execSync('node extract-vercel-urls.js vercel.json vercel-redirect-urls.txt', { stdio: 'inherit' });
    
    // Step 2: Test all redirects
    console.log('\n🧪 Step 2: Testing all redirects...');
    execSync('node test-301-redirects.js vercel-redirect-urls.txt', { stdio: 'inherit' });
    
    // Step 3: Show summary
    console.log('\n📊 Step 3: Test completed!');
    console.log('Check redirect-test-results.json for detailed results.');
    
  } catch (error) {
    console.error('❌ Test failed:', error.message);
    process.exit(1);
  }
}

// Quick test with sample URLs
async function runQuickTest() {
  console.log('⚡ Running quick test with sample URLs...\n');
  
  try {
    execSync('node test-redirects-simple.js', { stdio: 'inherit' });
  } catch (error) {
    console.error('❌ Quick test failed:', error.message);
    process.exit(1);
  }
}

// Main execution
function main() {
  const args = process.argv.slice(2);
  const command = args[0] || 'complete';
  
  switch (command) {
    case 'complete':
      runCompleteTest();
      break;
    case 'quick':
      runQuickTest();
      break;
    case 'extract':
      execSync('node extract-vercel-urls.js', { stdio: 'inherit' });
      break;
    case 'test':
      const inputFile = args[1] || 'test-urls.txt';
      execSync(`node test-301-redirects.js ${inputFile}`, { stdio: 'inherit' });
      break;
    default:
      console.log('Usage: node test-all-redirects.js [command]');
      console.log('');
      console.log('Commands:');
      console.log('  complete  - Run complete test suite (extract + test all URLs)');
      console.log('  quick     - Run quick test with sample URLs');
      console.log('  extract   - Extract URLs from vercel.json only');
      console.log('  test      - Test URLs from file (default: test-urls.txt)');
      console.log('');
      console.log('Examples:');
      console.log('  node test-all-redirects.js complete');
      console.log('  node test-all-redirects.js quick');
      console.log('  node test-all-redirects.js test vercel-redirect-urls.txt');
      break;
  }
}

if (require.main === module) {
  main();
}

