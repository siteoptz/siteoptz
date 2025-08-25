const fs = require('fs');
const path = require('path');

// Read and parse the category content file
const filePath = path.join(__dirname, '..', 'content', 'categoryContent.ts');
const content = fs.readFileSync(filePath, 'utf8');

// Extract the categoryContent object
const match = content.match(/export const categoryContent: Record<string, any> = (\{[\s\S]*\});/);
if (!match) {
  console.error('Could not find categoryContent object');
  process.exit(1);
}

// Check specific failing categories
const failingCategories = ['Code Generation', 'Content Creation', 'Data Analysis', 'Image Generation', 'Productivity', 'SEO & Optimization', 'Social Media', 'Video Generation'];

console.log('Checking category data structure...\n');

failingCategories.forEach(cat => {
  // Check if category exists in content
  const categoryRegex = new RegExp(`"${cat.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}":\\s*\\{`, 'g');
  const categoryMatch = categoryRegex.exec(content);
  
  if (!categoryMatch) {
    console.log(`❌ ${cat}: MISSING from categoryContent`);
    return;
  }
  
  // Check for faqs array
  const faqsRegex = new RegExp(`"${cat.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}":[\\s\\S]*?faqs:\\s*\\[`, 'g');
  const faqsMatch = faqsRegex.exec(content);
  
  // Check for businessCases array  
  const businessCasesRegex = new RegExp(`"${cat.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}":[\\s\\S]*?businessCases:\\s*\\[`, 'g');
  const businessCasesMatch = businessCasesRegex.exec(content);
  
  let status = '✅';
  let issues = [];
  
  if (!faqsMatch) {
    status = '❌';
    issues.push('Missing faqs array');
  }
  
  if (!businessCasesMatch) {
    status = '❌';
    issues.push('Missing businessCases array');
  }
  
  if (issues.length > 0) {
    console.log(`${status} ${cat}: ${issues.join(', ')}`);
  } else {
    console.log(`${status} ${cat}: OK`);
  }
});

console.log('\nDone checking categories.');