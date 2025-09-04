#!/usr/bin/env node

const fs = require('fs');

console.log('🏷️ Categorizing cleaned AI tools...\n');

// Load data
const data = JSON.parse(fs.readFileSync('public/data/aiToolsData.json', 'utf8'));

// Define category mappings based on keywords
const categoryMappings = {
  'Content Creation': [
    'content', 'writing', 'blog', 'article', 'copywriting', 'text generation',
    'essay', 'story', 'novel', 'translation', 'summarize', 'summary', 'grammar',
    'pdf', 'document', 'slides', 'presentation', 'markdown', 'notion'
  ],
  'Video Generation': [
    'video', 'videos', 'animation', 'video editing', 'film', 'movie', 'youtube',
    'tiktok', 'shorts', 'clips', 'streaming', 'livestream', 'webcam', 'camera'
  ],
  'Image Generation': [
    'image', 'images', 'photo', 'picture', 'avatar', 'logo', 'design', 'art',
    'drawing', 'sketch', 'illustration', 'graphic', 'visual', 'icon', 'banner',
    'background', 'wallpaper', 'coloring', 'color', 'paint', 'canvas'
  ],
  'Code Generation': [
    'code', 'programming', 'coding', 'developer', 'software', 'api', 'github',
    'repository', 'commit', 'pull request', 'bug', 'debug', 'testing', 'review',
    'documentation', 'javascript', 'python', 'react', 'node', 'sql', 'database'
  ],
  'Voice AI': [
    'voice', 'speech', 'audio', 'sound', 'music', 'podcast', 'recording',
    'microphone', 'speaker', 'text to speech', 'speech to text', 'transcription',
    'dictation', 'pronunciation', 'accent', 'language', 'translate'
  ],
  'AI Automation': [
    'automation', 'workflow', 'process', 'task', 'schedule', 'reminder',
    'integration', 'zapier', 'webhook', 'api', 'batch', 'bulk', 'mass'
  ],
  'Data Analysis': [
    'data', 'analytics', 'analysis', 'statistics', 'chart', 'graph', 'visualization',
    'dashboard', 'report', 'metrics', 'insights', 'trends', 'forecast', 'predict'
  ],
  'SEO & Optimization': [
    'seo', 'optimization', 'search', 'ranking', 'keywords', 'meta', 'sitemap',
    'backlinks', 'organic', 'traffic', 'conversion', 'performance', 'speed'
  ],
  'Research & Education': [
    'research', 'education', 'learning', 'study', 'academic', 'student', 'teacher',
    'course', 'tutorial', 'knowledge', 'information', 'fact', 'reference'
  ],
  'Social Media': [
    'social media', 'social', 'twitter', 'facebook', 'instagram', 'linkedin',
    'hashtag', 'post', 'share', 'like', 'follow', 'engagement', 'influencer'
  ],
  'Finance AI': [
    'finance', 'financial', 'money', 'budget', 'expense', 'investment', 'trading',
    'stock', 'crypto', 'blockchain', 'payment', 'banking', 'loan', 'credit'
  ],
  'Lead Generation': [
    'lead', 'leads', 'prospect', 'sales', 'crm', 'customer', 'client', 'contact',
    'email marketing', 'outreach', 'cold email', 'b2b', 'marketing', 'conversion'
  ],
  'Design': [
    'design', 'designer', 'ui', 'ux', 'interface', 'layout', 'template', 'theme',
    'style', 'aesthetic', 'creative', 'brand', 'identity', 'prototype', 'mockup'
  ]
};

// Function to categorize a tool
function categorizeTools(tool) {
  const searchText = `${tool.name} ${tool.description || ''} ${(tool.features || []).join(' ')}`.toLowerCase();
  
  // Check each category for keyword matches
  for (const [category, keywords] of Object.entries(categoryMappings)) {
    for (const keyword of keywords) {
      if (searchText.includes(keyword)) {
        return category;
      }
    }
  }
  
  // Default to Productivity if no specific category found
  return 'Productivity';
}

// Track changes
let changedTools = 0;
const categoryStats = {};

// Update tools (only new ones, keep original 231 unchanged)
const updatedData = data.map((tool, index) => {
  // Only categorize new tools (after index 230)
  if (index < 231) {
    // Count original categories
    const originalCategory = tool.overview?.category || 'Unknown';
    categoryStats[originalCategory] = (categoryStats[originalCategory] || 0) + 1;
    return tool;
  }
  
  const currentCategory = tool.overview?.category || 'AI Tools';
  const newCategory = categorizeTools(tool);
  
  // Count new categories
  categoryStats[newCategory] = (categoryStats[newCategory] || 0) + 1;
  
  if (currentCategory !== newCategory) {
    changedTools++;
    console.log(`  📂 ${tool.name}: ${currentCategory} → ${newCategory}`);
  }
  
  return {
    ...tool,
    overview: {
      ...tool.overview,
      category: newCategory
    }
  };
});

console.log(`\n✅ Categorization completed!`);
console.log(`📊 Changed ${changedTools} tools`);
console.log(`📈 Total tools: ${updatedData.length}`);

console.log('\n📊 Category distribution:');
Object.entries(categoryStats)
  .sort(([,a], [,b]) => b - a)
  .forEach(([category, count]) => {
    console.log(`  • ${category}: ${count} tools`);
  });

// Save updated data
fs.writeFileSync('public/data/aiToolsData.json', JSON.stringify(updatedData, null, 2));

console.log('\n🎉 Tools have been categorized and saved!');
console.log('📁 Updated aiToolsData.json with proper categories');