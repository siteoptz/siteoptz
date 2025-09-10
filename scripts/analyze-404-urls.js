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
  'https://siteoptz.ai/reviews/planable',
  'https://siteoptz.ai/reviews/gpt-4',
  'https://siteoptz.ai/tools/content-roi-calculator',
  'https://siteoptz.ai/categories/ai-website-builder',
  'https://siteoptz.ai/reviews/meet-geek',
  'https://siteoptz.ai/compare/contentstudio/vs/coschedule',
  'https://siteoptz.ai/tools/manufacturing-roi-calculator',
  'https://siteoptz.ai/reviews/text-to-video-stunning-video-creation',
  'https://siteoptz.ai/reviews/convertfiles-ai-free-image-file-converter',
  'https://siteoptz.ai/tools/healthcare-ai-roi',
  'https://siteoptz.ai/tools/sales-ai-roi',
  'https://siteoptz.ai/reviews/speechki-text-to-speech-ai',
  'https://siteoptz.ai/tools/chatbot-roi-calculator',
  'https://siteoptz.ai/reviews/webbotify-ai-powered-chatbot-platform',
  'https://siteoptz.ai/categories/lead-generation',
  'https://siteoptz.ai/reviews/replicate',
  'https://siteoptz.ai/reviews/divedeck-ai-powered-deck-builder',
  'https://siteoptz.ai/tools/no-code-ai-roi',
  'https://siteoptz.ai/tools/recruitment-roi-calculator',
  'https://siteoptz.ai/tools/enterprise-ai-calculator',
  'https://siteoptz.ai/reviews/explee',
  'https://siteoptz.ai/reviews/gemini-2-5',
  'https://siteoptz.ai/categories/ai-translator',
  'https://siteoptz.ai/tools/ai-roi-calculator',
  'https://siteoptz.ai/reviews/tellers-ai-automatic-text-to-video-tool',
  'https://siteoptz.ai/tools/marketing-roi-calculator',
  'https://siteoptz.ai/reviews/otter-ai',
  'https://siteoptz.ai/categories/writing',
  'https://siteoptz.ai/tools/meet-geek',
  'https://siteoptz.ai/categories/ai-for-business',
  'https://siteoptz.ai/categories/health-ai',
  'https://siteoptz.ai/reviews/videotube',
  'https://siteoptz.ai/categories/ai-education',
  'https://siteoptz.ai/categories/voice-ai',
  'https://siteoptz.ai/categories/finance-ai',
  'https://siteoptz.ai/reviews/midjourney-v6',
  'https://siteoptz.ai/categories/e-commerce',
  'https://siteoptz.ai/tools/conversion-roi-calculator',
  'https://siteoptz.ai/reviews/universe-no-code-custom-website-builder',
  'https://siteoptz.ai/reviews/stable-diffusion-web',
  'https://siteoptz.ai/reviews/unreal-speech-cost-effective-text-to-speech-api',
  'https://siteoptz.ai/reviews/character-ai',
  'https://siteoptz.ai/tools/ai-cost-calculator',
  'https://siteoptz.ai/tools/security-roi-calculator',
  'https://siteoptz.ai/reviews/kleap',
  'https://siteoptz.ai/reviews/cohere',
  'https://siteoptz.ai/reviews/hugging-face'
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
  const path = url.replace('https://siteoptz.ai', '');
  
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