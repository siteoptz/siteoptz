#!/usr/bin/env node

/**
 * URL Format Validation Script
 * Checks for incorrect compare URL formats in the codebase
 */

const { execSync } = require('child_process');

console.log('🔍 Checking for incorrect compare URL formats...\n');

let issuesFound = 0;

// Check for template literals with -vs- format
console.log('🔎 Checking for template literals using -vs- format...');
try {
  const result1 = execSync(
    `find . -name "*.js" -o -name "*.jsx" -o -name "*.ts" -o -name "*.tsx" | grep -v node_modules | grep -v .next | grep -v scripts/validate-url-formats.js | xargs grep -l "\\-vs\\-" | head -10`,
    { encoding: 'utf8' }
  ).trim();
  
  if (result1) {
    console.log(`❌ Found files with potential -vs- patterns:`);
    result1.split('\n').forEach(file => {
      if (file) {
        console.log(`   ${file}`);
        issuesFound++;
      }
    });
  } else {
    console.log(`✅ No -vs- patterns found in template literals`);
  }
} catch (error) {
  console.log(`✅ No -vs- patterns found`);
}

console.log();

// Check for correct /vs/ patterns
console.log('🔎 Verifying correct /vs/ patterns exist...');
try {
  const result2 = execSync(
    `find . -name "*.js" -o -name "*.jsx" -o -name "*.ts" -o -name "*.tsx" | grep -v node_modules | grep -v .next | xargs grep -l "/vs/" | head -5`,
    { encoding: 'utf8' }
  ).trim();
  
  if (result2) {
    const count = result2.split('\n').filter(f => f).length;
    console.log(`✅ Found ${count} files using correct /vs/ format`);
  } else {
    console.log(`⚠️  No /vs/ patterns found - this might indicate an issue`);
    issuesFound++;
  }
} catch (error) {
  console.log(`⚠️  Could not verify /vs/ patterns`);
}

console.log();

// Check specific critical files
console.log('🔎 Checking critical files for URL format compliance...');
const criticalFiles = [
  'pages/compare/[...comparison].tsx',
  'utils/seoMetaGenerator.js',
  'utils/canonicalUrl.ts',
  'utils/dataHelpers.js',
  'utils/seoUtils.js',
  'utils/dataAdapters.ts'
];

criticalFiles.forEach(file => {
  try {
    const result = execSync(`grep -c "/vs/" ${file} 2>/dev/null || echo "0"`, { encoding: 'utf8' }).trim();
    const count = parseInt(result);
    if (count > 0) {
      console.log(`✅ ${file}: ${count} correct /vs/ patterns found`);
    } else {
      console.log(`⚠️  ${file}: No /vs/ patterns found (might need review)`);
    }
  } catch (error) {
    console.log(`❓ ${file}: File not found or not accessible`);
  }
});

console.log('\n' + '='.repeat(60));

if (issuesFound > 0) {
  console.log(`⚠️  POTENTIAL ISSUES DETECTED: ${issuesFound} items need review`);
  console.log('   Please manually verify these files use correct URL format');
  console.log('   Correct format: /compare/tool1/vs/tool2');
  console.log('   Incorrect format: /compare/tool1-vs-tool2');
  console.log('   See URL_FORMAT_GUIDE.md for details');
  process.exit(0); // Don't fail build, just warn
} else {
  console.log('✅ URL FORMAT CHECK PASSED');
  console.log('   All compare URLs appear to use the correct format');
}

console.log('='.repeat(60));