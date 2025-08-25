// Test loading category content like the Next.js page does
const { categoryContent } = require('../content/categoryContent.ts');

const failingCategories = [
  'code-generation',
  'content-creation', 
  'data-analysis',
  'image-generation',
  'productivity',
  'seo-optimization',
  'social-media',
  'video-generation'
];

const toolCategories = [
  'AI Automation',
  'Best Voice AI Tools',
  'Code Generation',
  'Content Creation',
  'Data Analysis',
  'Email Marketing',
  'Image Generation',
  'Paid Search & PPC',
  'Productivity',
  'Research & Education',
  'SEO & Optimization',
  'Social Media',
  'Video Generation',
];

console.log('Testing category loading like Next.js...\n');

failingCategories.forEach(categorySlug => {
  // Find the category from slug (like the page does)
  const category = toolCategories.find(cat => 
    cat.toLowerCase().replace(/[^a-z0-9]+/g, '-') === categorySlug
  );
  
  if (!category) {
    console.log(`❌ ${categorySlug}: Category not found from slug`);
    return;
  }
  
  // Load category content (like the page does)
  const content = categoryContent[category];
  
  if (!content) {
    console.log(`❌ ${categorySlug} (${category}): Content not found`);
    return;
  }
  
  // Check required properties
  const checks = {
    'hero.title': content.hero?.title,
    'faqs': Array.isArray(content.faqs),
    'businessCases': Array.isArray(content.businessCases),
    'seo.title': content.seo?.title,
    'seo.description': content.seo?.description
  };
  
  const failed = Object.entries(checks).filter(([key, value]) => !value);
  
  if (failed.length > 0) {
    console.log(`❌ ${categorySlug} (${category}): Missing ${failed.map(([key]) => key).join(', ')}`);
  } else {
    console.log(`✅ ${categorySlug} (${category}): OK`);
  }
});

console.log('\nDone testing category loading.');