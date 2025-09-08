#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

console.log('🔧 Fixing SEO component loading issues...');

// Get all affected tools from CSV
const csvPath = '/Users/siteoptz/siteoptz-scraping/siteoptz.ai_duplicate_content_20250908_2.csv';
const csvContent = fs.readFileSync(csvPath, 'utf8');
const lines = csvContent.split('\n').slice(1); // Skip header

const affectedTools = lines
  .filter(line => line.trim())
  .map(line => {
    const url = line.split(',')[0];
    return url.replace('https://siteoptz.ai/reviews/', '');
  });

console.log(`📝 Found ${affectedTools.length} affected tools`);

// Check mapping file
const mappingPath = '/Users/siteoptz/siteoptz/utils/seoComponentMapping.ts';
const mappingContent = fs.readFileSync(mappingPath, 'utf8');

let fixedCount = 0;
let missingCount = 0;

console.log('\n🔍 Checking SEO components:');

// Check each affected tool
for (const tool of affectedTools.slice(0, 20)) { // Test first 20
  const componentPath = `/Users/siteoptz/siteoptz/seo-optimization/production-components/`;
  
  // Check if tool has mapping
  const hasMapping = mappingContent.includes(`'${tool}':`);
  
  if (hasMapping) {
    console.log(`✅ ${tool} - Has mapping`);
    fixedCount++;
  } else {
    console.log(`❌ ${tool} - Missing mapping`);
    missingCount++;
  }
}

console.log(`\n📊 Results:`);
console.log(`✅ Components with mapping: ${fixedCount}`);
console.log(`❌ Components missing mapping: ${missingCount}`);

// The issue might be that components fail to load due to runtime errors
// Let's create a fallback mechanism
console.log('\n🛠️ Creating fallback mechanism...');

const fallbackTemplate = `
// If SEO component fails to load, ensure fallback to template
if (hasSEOVersion && seoData && hasSEOComponent(slug)) {
  try {
    const SEOComponent = dynamic(getSEOComponent(slug), {
      loading: () => <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-white">Loading...</div>
      </div>,
      // Add error boundary
      ssr: false,
    });
    
    return <SEOComponent tool={seoData} />;
  } catch (error) {
    console.error('Failed to load SEO component for:', slug, error);
    // Fall back to default template
  }
}
`;

console.log('\n✨ Fallback mechanism should be added to review template');
console.log('\n🔧 The main issue appears to be dynamic import failures causing Loading screens');
console.log('🎯 Recommended fix: Update review template with better error handling');
