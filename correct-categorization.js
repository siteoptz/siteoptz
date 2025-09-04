#!/usr/bin/env node

const fs = require('fs');

console.log('🏷️ Correcting tool categorization to match existing site categories...\n');

// Load data
const data = JSON.parse(fs.readFileSync('public/data/aiToolsData.json', 'utf8'));

// These are the EXACT categories that exist on the live site
const EXISTING_CATEGORIES = [
  'AI Automation',
  'AI Education', 
  'AI Website Builder',
  'Best Voice AI Tools',
  'Code Generation',
  'Content Creation',
  'Data Analysis',
  'Design',
  'E-commerce',
  'Email Marketing',
  'Finance AI',
  'Image Generation',
  'Lead Generation',
  'Paid Search & PPC',
  'Productivity',
  'Research & Education',
  'SEO & Optimization',
  'Social Media',
  'Video Generation',
  'Voice AI',
  'Website Builder'
];

// Enhanced category mapping based on tool names and descriptions
const categoryKeywords = {
  'Content Creation': [
    'content', 'writing', 'blog', 'article', 'copywriting', 'text generation',
    'essay', 'story', 'novel', 'translation', 'translate', 'summarize', 'summary', 
    'grammar', 'pdf', 'document', 'slides', 'presentation', 'markdown', 'notion',
    'transcription', 'transcript'
  ],
  'Video Generation': [
    'video', 'videos', 'animation', 'video editing', 'film', 'movie', 'youtube',
    'tiktok', 'shorts', 'clips', 'streaming', 'livestream', 'webcam', 'camera',
    'editing', 'montage', 'cinema'
  ],
  'Image Generation': [
    'image', 'images', 'photo', 'picture', 'avatar', 'logo', 'design', 'art',
    'drawing', 'sketch', 'illustration', 'graphic', 'visual', 'icon', 'banner',
    'background', 'wallpaper', 'coloring', 'color', 'paint', 'canvas', 'upscaler'
  ],
  'Code Generation': [
    'code', 'programming', 'coding', 'developer', 'software', 'api', 'github',
    'repository', 'commit', 'pull request', 'bug', 'debug', 'testing', 'review',
    'documentation', 'javascript', 'python', 'react', 'node', 'sql', 'database'
  ],
  'Voice AI': [
    'voice', 'speech', 'audio', 'sound', 'music', 'podcast', 'recording',
    'microphone', 'speaker', 'text to speech', 'speech to text', 'transcription',
    'dictation', 'pronunciation', 'accent'
  ],
  'Best Voice AI Tools': [
    'voice synthesis', 'voice cloning', 'voice generation', 'voice assistant',
    'voice ai', 'speech synthesis', 'ai voice'
  ],
  'AI Automation': [
    'automation', 'workflow', 'process', 'task', 'schedule', 'reminder',
    'integration', 'zapier', 'webhook', 'api', 'batch', 'bulk', 'mass',
    'automate', 'automated', 'bot', 'chatbot', 'assistant', 'productivity'
  ],
  'Data Analysis': [
    'data', 'analytics', 'analysis', 'statistics', 'chart', 'graph', 'visualization',
    'dashboard', 'report', 'metrics', 'insights', 'trends', 'forecast', 'predict',
    'business intelligence'
  ],
  'SEO & Optimization': [
    'seo', 'optimization', 'search', 'ranking', 'keywords', 'meta', 'sitemap',
    'backlinks', 'organic', 'traffic', 'conversion', 'performance', 'speed',
    'search engine'
  ],
  'Research & Education': [
    'research', 'education', 'learning', 'study', 'academic', 'student', 'teacher',
    'course', 'tutorial', 'knowledge', 'information', 'fact', 'reference',
    'school', 'lesson'
  ],
  'Social Media': [
    'social media', 'social', 'twitter', 'facebook', 'instagram', 'linkedin',
    'hashtag', 'post', 'share', 'like', 'follow', 'engagement', 'influencer',
    'tiktok', 'reddit'
  ],
  'Finance AI': [
    'finance', 'financial', 'money', 'budget', 'expense', 'investment', 'trading',
    'stock', 'crypto', 'blockchain', 'payment', 'banking', 'loan', 'credit',
    'accounting', 'tax'
  ],
  'Lead Generation': [
    'lead', 'leads', 'prospect', 'sales', 'crm', 'customer', 'client', 'contact',
    'outreach', 'cold email', 'b2b', 'conversion', 'support'
  ],
  'Email Marketing': [
    'email marketing', 'email', 'newsletter', 'campaign', 'automation', 'drip',
    'sequence', 'subscriber', 'mailchimp', 'constant contact'
  ],
  'Design': [
    'design', 'designer', 'ui', 'ux', 'interface', 'layout', 'template', 'theme',
    'style', 'aesthetic', 'creative', 'brand', 'identity', 'prototype', 'mockup'
  ],
  'AI Website Builder': [
    'website builder', 'website', 'site builder', 'web builder', 'landing page',
    'webpage', 'site', 'domain', 'hosting'
  ],
  'E-commerce': [
    'ecommerce', 'e-commerce', 'online store', 'shop', 'shopping', 'retail',
    'product', 'inventory', 'order', 'checkout', 'payment'
  ],
  'Paid Search & PPC': [
    'paid search', 'ppc', 'google ads', 'adwords', 'facebook ads', 'advertising',
    'ad campaign', 'bid', 'cpc', 'cpm', 'roas'
  ]
};

function categorizeToolCorrectly(tool) {
  const searchText = `${tool.name} ${tool.description || ''} ${(tool.features || []).join(' ')}`.toLowerCase();
  
  // Check each existing category for keyword matches
  for (const [category, keywords] of Object.entries(categoryKeywords)) {
    // Only use categories that exist on the site
    if (!EXISTING_CATEGORIES.includes(category)) continue;
    
    for (const keyword of keywords) {
      if (searchText.includes(keyword)) {
        return category;
      }
    }
  }
  
  // Default fallback categories based on common patterns
  if (searchText.includes('ai') && searchText.includes('tool')) {
    return 'AI Automation';
  }
  
  // Last resort: Productivity (most generic existing category)
  return 'Productivity';
}

// Update tools (focus on the new 90 tools starting from index 231)
let correctedCount = 0;
const categoryStats = {};

const correctedData = data.map((tool, index) => {
  // Keep original tools unchanged (first 231)
  if (index < 231) {
    const originalCategory = tool.overview?.category || 'Unknown';
    categoryStats[originalCategory] = (categoryStats[originalCategory] || 0) + 1;
    return tool;
  }
  
  // Correct new tools (last 90)
  const currentCategory = tool.overview?.category || 'AI Tools';
  const correctCategory = categorizeToolCorrectly(tool);
  
  categoryStats[correctCategory] = (categoryStats[correctCategory] || 0) + 1;
  
  if (currentCategory !== correctCategory) {
    correctedCount++;
    console.log(`  📂 ${tool.name}: ${currentCategory} → ${correctCategory}`);
  }
  
  return {
    ...tool,
    overview: {
      ...tool.overview,
      category: correctCategory
    }
  };
});

console.log(`\n✅ Categorization correction completed!`);
console.log(`📊 Corrected ${correctedCount} tools to match existing site categories`);
console.log(`📈 Total tools: ${correctedData.length}`);

console.log('\n📊 Final category distribution (existing site categories only):');
Object.entries(categoryStats)
  .filter(([category]) => EXISTING_CATEGORIES.includes(category))
  .sort(([,a], [,b]) => b - a)
  .forEach(([category, count]) => {
    console.log(`  • ${category}: ${count} tools`);
  });

// Check for any tools that might still have incorrect categories
const invalidCategories = Object.keys(categoryStats).filter(cat => !EXISTING_CATEGORIES.includes(cat) && cat !== 'Unknown');
if (invalidCategories.length > 0) {
  console.log('\n⚠️ Warning: Some tools have invalid categories:');
  invalidCategories.forEach(cat => {
    console.log(`  • ${cat}: ${categoryStats[cat]} tools`);
  });
}

// Save corrected data
fs.writeFileSync('public/data/aiToolsData.json', JSON.stringify(correctedData, null, 2));

console.log('\n🎉 Tools categorized correctly and saved!');
console.log('📁 All tools now use existing site categories');