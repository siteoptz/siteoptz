#!/usr/bin/env node

/**
 * 404 URL Analysis Script
 * Analyzes reported 404 URLs and categorizes issues
 */

const fs = require('fs');
const path = require('path');

// Load tool data
const toolDataPath = path.join(process.cwd(), 'public/data/aiToolsData.json');
const toolData = JSON.parse(fs.readFileSync(toolDataPath, 'utf8'));

// Create slug lookup
const toolSlugs = new Set(toolData.map(tool => tool.slug));
const categories = new Set(toolData.map(tool => tool.category).filter(c => c));

console.log('📊 Available Categories:', [...categories].sort());
console.log('📊 Total Tools:', toolSlugs.size);
console.log('\n' + '='.repeat(60) + '\n');

// Reported 404 URLs
const url404s = [
  'https://www.siteoptz.ai/reviews/planable',
  'https://www.siteoptz.ai/reviews/gpt-4',
  'https://www.siteoptz.ai/tools/content-roi-calculator',
  'https://www.siteoptz.ai/categories/ai-website-builder',
  'https://www.siteoptz.ai/reviews/meet-geek',
  'https://www.siteoptz.ai/compare/contentstudio/vs/coschedule',
  'https://www.siteoptz.ai/tools/manufacturing-roi-calculator',
  'https://www.siteoptz.ai/reviews/text-to-video-stunning-video-creation',
  'https://www.siteoptz.ai/reviews/convertfiles-ai-free-image-file-converter',
  'https://www.siteoptz.ai/tools/healthcare-ai-roi',
  'https://www.siteoptz.ai/tools/sales-ai-roi',
  'https://www.siteoptz.ai/reviews/speechki-text-to-speech-ai',
  'https://www.siteoptz.ai/tools/chatbot-roi-calculator',
  'https://www.siteoptz.ai/reviews/webbotify-ai-powered-chatbot-platform',
  'https://www.siteoptz.ai/categories/lead-generation',
  'https://www.siteoptz.ai/reviews/replicate',
  'https://www.siteoptz.ai/reviews/divedeck-ai-powered-deck-builder',
  'https://www.siteoptz.ai/tools/no-code-ai-roi',
  'https://www.siteoptz.ai/tools/recruitment-roi-calculator',
  'https://www.siteoptz.ai/tools/enterprise-ai-calculator',
  'https://www.siteoptz.ai/reviews/explee',
  'https://www.siteoptz.ai/reviews/gemini-2-5',
  'https://www.siteoptz.ai/categories/ai-translator',
  'https://www.siteoptz.ai/tools/ai-roi-calculator',
  'https://www.siteoptz.ai/reviews/tellers-ai-automatic-text-to-video-tool',
  'https://www.siteoptz.ai/tools/marketing-roi-calculator',
  'https://www.siteoptz.ai/reviews/otter-ai',
  'https://www.siteoptz.ai/categories/writing',
  'https://www.siteoptz.ai/tools/meet-geek',
  'https://www.siteoptz.ai/categories/ai-for-business',
  'https://www.siteoptz.ai/categories/health-ai',
  'https://www.siteoptz.ai/reviews/videotube',
  'https://www.siteoptz.ai/categories/ai-education',
  'https://www.siteoptz.ai/categories/voice-ai',
  'https://www.siteoptz.ai/categories/finance-ai',
  'https://www.siteoptz.ai/reviews/midjourney-v6',
  'https://www.siteoptz.ai/categories/e-commerce',
  'https://www.siteoptz.ai/tools/conversion-roi-calculator',
  'https://www.siteoptz.ai/reviews/universe-no-code-custom-website-builder',
  'https://www.siteoptz.ai/reviews/stable-diffusion-web',
  'https://www.siteoptz.ai/reviews/unreal-speech-cost-effective-text-to-speech-api',
  'https://www.siteoptz.ai/reviews/character-ai',
  'https://www.siteoptz.ai/tools/ai-cost-calculator',
  'https://www.siteoptz.ai/tools/security-roi-calculator',
  'https://www.siteoptz.ai/reviews/kleap',
  'https://www.siteoptz.ai/reviews/cohere',
  'https://www.siteoptz.ai/reviews/hugging-face'
];

// Categorize issues
const issues = {
  missingTools: [],
  missingCategories: [],
  missingROICalculators: [],
  wrongSlugs: [],
  missingComparisons: []
};

for (const url of url404s) {
  const path = url.replace('https://www.siteoptz.ai', '');
  
  if (path.startsWith('/reviews/')) {
    const slug = path.replace('/reviews/', '');
    if (!toolSlugs.has(slug)) {
      // Check for similar slugs
      const similar = [...toolSlugs].filter(s => s.includes(slug.split('-')[0]) || slug.includes(s.split('-')[0]));
      issues.wrongSlugs.push({ url, slug, similar });
    } else {
      issues.missingTools.push({ url, slug });
    }
  }
  else if (path.startsWith('/categories/')) {
    const category = path.replace('/categories/', '').replace(/-/g, ' ');
    const categoryTitleCase = category.split(' ').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');
    
    if (!categories.has(categoryTitleCase) && !categories.has(category)) {
      issues.missingCategories.push({ url, category, categoryTitleCase });
    }
  }
  else if (path.startsWith('/tools/') && path.includes('roi') || path.includes('calculator')) {
    issues.missingROICalculators.push({ url, path });
  }
  else if (path.startsWith('/compare/')) {
    issues.missingComparisons.push({ url, path });
  }
  else if (path.startsWith('/tools/')) {
    const slug = path.replace('/tools/', '');
    issues.missingTools.push({ url, slug });
  }
}

// Report findings
console.log('🔍 404 URL ANALYSIS RESULTS\n');

console.log('❌ MISSING/WRONG TOOL REVIEWS:');
issues.wrongSlugs.forEach(issue => {
  console.log(`  ${issue.slug} -> Similar: ${issue.similar.join(', ') || 'None found'}`);
});

console.log(`\n🏷️  MISSING CATEGORIES (${issues.missingCategories.length}):`);
issues.missingCategories.forEach(issue => {
  console.log(`  ${issue.category} (${issue.categoryTitleCase})`);
});

console.log(`\n🧮 MISSING ROI CALCULATORS (${issues.missingROICalculators.length}):`);
issues.missingROICalculators.forEach(issue => {
  console.log(`  ${issue.path}`);
});

console.log(`\n🔗 MISSING COMPARISONS (${issues.missingComparisons.length}):`);
issues.missingComparisons.forEach(issue => {
  console.log(`  ${issue.path}`);
});

console.log(`\n📄 MISSING TOOL PAGES (${issues.missingTools.length}):`);
issues.missingTools.forEach(issue => {
  console.log(`  ${issue.slug}`);
});

// Summary
const totalIssues = Object.values(issues).reduce((sum, arr) => sum + arr.length, 0);
console.log(`\n📊 SUMMARY: ${totalIssues} total 404 issues found`);
console.log(`  - Wrong slugs: ${issues.wrongSlugs.length}`);  
console.log(`  - Missing categories: ${issues.missingCategories.length}`);
console.log(`  - Missing ROI calculators: ${issues.missingROICalculators.length}`);
console.log(`  - Missing comparisons: ${issues.missingComparisons.length}`);
console.log(`  - Missing tool pages: ${issues.missingTools.length}`);

// Save analysis for fixing
fs.writeFileSync(
  path.join(process.cwd(), 'scripts/404-analysis.json'), 
  JSON.stringify(issues, null, 2)
);

console.log('\n💾 Analysis saved to scripts/404-analysis.json');