#!/usr/bin/env node

const fs = require('fs');

console.log('🧹 Cleaning scraped AI tools data...\n');

// Load the scraped data
const scrapedData = JSON.parse(fs.readFileSync('scraping/data/scraped/real-ai-tools.json', 'utf8'));
const scrapedTools = scrapedData.tools;

console.log(`📊 Original scraped tools: ${scrapedTools.length}`);

// Function to validate and clean tool data
function isValidAITool(tool) {
  const name = tool.name.toLowerCase();
  
  // Filter out invalid names
  if (name.length > 50) return false; // Too long to be a tool name
  if (name.includes('everything your business needs')) return false; // Generic description
  if (name.includes('all in one place')) return false; // Generic description
  if (name.includes('discover') && name.includes('tools')) return false; // Generic
  if (name.includes('best') && name.includes('tools')) return false; // Generic
  if (name.includes('latest') && name.includes('tools')) return false; // Generic
  if (name.includes('top') && name.includes('tools')) return false; // Generic
  if (name.includes('free') && name.includes('tools')) return false; // Generic
  if (name.includes('ai tools directory')) return false; // Directory, not a tool
  if (name.includes('browse') || name.includes('explore')) return false; // Navigation
  if (name.includes('login') || name.includes('sign up')) return false; // Auth
  if (name.includes('submit') || name.includes('add tool')) return false; // Actions
  if (name === 'new' || name === 'popular' || name === 'trending') return false; // Categories
  if (name.includes('view all') || name.includes('see all')) return false; // Navigation
  if (name.includes('newsletter') || name.includes('subscribe')) return false; // Marketing
  
  // Must have reasonable name length
  if (name.length < 2) return false;
  
  // Check for common non-tool patterns
  const invalidPatterns = [
    /^\d+[\+\-\*\/]\d+$/, // Math expressions
    /^page \d+$/i, // Page numbers  
    /^category:/i, // Category labels
    /^filter by/i, // Filter options
    /^sort by/i, // Sort options
    /home$/i, // Home links
    /help$/i, // Help links
    /about$/i, // About links
    /contact$/i // Contact links
  ];
  
  if (invalidPatterns.some(pattern => pattern.test(name))) {
    return false;
  }
  
  return true;
}

// Clean tool name
function cleanToolName(name) {
  return name
    .replace(/^#+\s*/, '') // Remove markdown headers
    .replace(/^\*+\s*/, '') // Remove markdown bullets
    .replace(/^\-+\s*/, '') // Remove dashes
    .replace(/\s+/g, ' ') // Normalize whitespace
    .trim();
}

// Generate better tool ID
function generateCleanId(name) {
  return name
    .toLowerCase()
    .replace(/[^\w\s\-]/g, '') // Remove special chars except spaces and hyphens
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/-+/g, '-') // Collapse multiple hyphens
    .replace(/^-+|-+$/g, '') // Trim hyphens
    .substring(0, 50); // Limit length
}

// Enhanced category detection
function improveCategory(tool) {
  const text = `${tool.name} ${tool.overview.description}`.toLowerCase();
  
  const categoryMappings = {
    'Content Creation': [
      'writer', 'writing', 'content', 'blog', 'article', 'copy', 'text', 'document',
      'essay', 'story', 'book', 'newsletter', 'email', 'social post', 'copywriting'
    ],
    'Image Generation': [
      'image', 'photo', 'picture', 'art', 'artwork', 'design', 'visual', 'graphic',
      'illustration', 'drawing', 'sketch', 'avatar', 'logo', 'banner', 'poster'
    ],
    'Video Generation': [
      'video', 'movie', 'film', 'animation', 'clip', 'trailer', 'editing',
      'youtube', 'tiktok', 'instagram reel', 'shorts', 'cinematic'
    ],
    'Voice AI': [
      'voice', 'speech', 'audio', 'sound', 'music', 'podcast', 'text-to-speech',
      'tts', 'voice over', 'narration', 'synthesis', 'clone', 'speak'
    ],
    'Code Generation': [
      'code', 'programming', 'developer', 'coding', 'software', 'app', 'website',
      'frontend', 'backend', 'api', 'database', 'github', 'git', 'debugging'
    ],
    'Data Analysis': [
      'data', 'analytics', 'analysis', 'chart', 'graph', 'dashboard', 'report',
      'insights', 'metrics', 'statistics', 'business intelligence', 'excel'
    ],
    'SEO & Optimization': [
      'seo', 'search', 'optimization', 'ranking', 'keywords', 'google',
      'traffic', 'organic', 'backlinks', 'serp', 'meta'
    ],
    'Social Media': [
      'social', 'twitter', 'facebook', 'instagram', 'linkedin', 'tiktok',
      'social media', 'post', 'share', 'hashtag', 'influence'
    ],
    'AI Automation': [
      'automation', 'workflow', 'process', 'bot', 'assistant', 'chatbot',
      'automate', 'integrate', 'zapier', 'webhook', 'trigger'
    ]
  };
  
  // Find best category match
  let bestCategory = 'Productivity';
  let bestScore = 0;
  
  for (const [category, keywords] of Object.entries(categoryMappings)) {
    let score = 0;
    for (const keyword of keywords) {
      if (text.includes(keyword)) {
        score += keyword.length; // Longer keywords get higher weight
      }
    }
    
    if (score > bestScore) {
      bestScore = score;
      bestCategory = category;
    }
  }
  
  return bestCategory;
}

// Clean and filter the tools
const cleanedTools = [];

for (const tool of scrapedTools) {
  // Skip invalid tools
  if (!isValidAITool(tool)) {
    continue;
  }
  
  // Clean the tool data
  const cleanedTool = {
    ...tool,
    name: cleanToolName(tool.name),
    id: generateCleanId(tool.name),
    slug: generateCleanId(tool.name),
    overview: {
      ...tool.overview,
      category: improveCategory(tool),
      developer: cleanToolName(tool.name), // Use tool name as developer for consistency
      description: tool.overview.description.length > 20 ? 
                   tool.overview.description : 
                   `${cleanToolName(tool.name)} is an AI-powered tool that helps enhance productivity and workflow efficiency.`
    },
    logo: `/images/tools/${generateCleanId(tool.name)}-logo.svg`,
    meta: {
      title: `${cleanToolName(tool.name)} Review: AI Tool Analysis [2025] | SiteOptz`,
      description: `${cleanToolName(tool.name)} review. ${tool.overview.description.substring(0, 100)}... Features, pricing & alternatives compared.`
    }
  };
  
  cleanedTools.push(cleanedTool);
}

console.log(`✅ Cleaned tools: ${cleanedTools.length}`);
console.log(`📉 Filtered out: ${scrapedTools.length - cleanedTools.length} invalid tools`);

// Show category distribution
const categories = {};
cleanedTools.forEach(tool => {
  const cat = tool.overview.category;
  categories[cat] = (categories[cat] || 0) + 1;
});

console.log('\n📊 Category distribution of cleaned tools:');
Object.entries(categories)
  .sort(([,a], [,b]) => b - a)
  .forEach(([category, count]) => {
    console.log(`  • ${category}: ${count} tools`);
  });

// Show sample of cleaned tools
console.log('\n📋 Sample cleaned tools:');
cleanedTools.slice(0, 10).forEach((tool, i) => {
  console.log(`  ${i+1}. ${tool.name} (${tool.overview.category})`);
});

// Save cleaned data
fs.writeFileSync('scraping/data/scraped/cleaned-ai-tools.json', JSON.stringify({
  tools: cleanedTools,
  metadata: {
    originalCount: scrapedTools.length,
    cleanedCount: cleanedTools.length,
    filteredOut: scrapedTools.length - cleanedTools.length,
    categories: Object.keys(categories).length,
    cleanedAt: new Date().toISOString()
  },
  categoryDistribution: categories
}, null, 2));

console.log('\n💾 Cleaned tools saved to: scraping/data/scraped/cleaned-ai-tools.json');
console.log('🎉 Tool cleaning completed!');