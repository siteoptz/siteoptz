#!/usr/bin/env node

const fs = require('fs');

console.log('🔍 Filtering B12 extracted tools for legitimacy...\n');

// Load extracted tools
const extractedData = JSON.parse(fs.readFileSync('scraping/data/b12/extracted-tools.json', 'utf8'));
const tools = extractedData.tools;

console.log(`📊 Total extracted tools: ${tools.length}`);

// More sophisticated fake detection patterns
const fakePatterns = [
  // Generic categories and directories
  /^ai tools?$/i,
  /^tools?$/i,
  /^directory$/i,
  /^ai directory$/i,
  /^tools directory$/i,
  /^ai tools directory$/i,
  /^artificial intelligence$/i,
  /^machine learning$/i,
  /^deep learning$/i,
  
  // Generic UI elements
  /^(home|about|contact|login|sign up|register)$/i,
  /^(menu|search|filter|sort|browse|explore)$/i,
  /^(new|popular|trending|featured|all|more)$/i,
  /^(view all|see all|show all|load more)$/i,
  /^(categories?|list|index)$/i,
  
  // Generic actions
  /^(learn more|get started|try now|visit|click here)$/i,
  /^(read more|see more|show more|find out)$/i,
  /^(subscribe|newsletter|follow|share)$/i,
  /^(help|support|faq|docs|documentation)$/i,
  
  // Generic business terms
  /^(pricing|plans|pro|premium|enterprise|business)$/i,
  /^(free|trial|demo|beta|alpha)$/i,
  /^(blog|news|updates|releases|changelog)$/i,
  /^(company|team|career|jobs)$/i,
  
  // Generic tech terms
  /^(api|sdk|plugin|integration|app|platform)$/i,
  /^(dashboard|analytics|insights|reports?)$/i,
  /^(automation|workflow|process)$/i,
  
  // Overly generic descriptions
  /^(productivity|efficiency|optimization)$/i,
  /^(content|creation|generation)$/i,
  /^(social media|marketing|advertising)$/i,
  
  // Navigation elements
  /^page \d+$/i,
  /^next$/i,
  /^previous$/i,
  /^back$/i,
  /^forward$/i,
  /^\d+$/,
  
  // Logo/branding elements
  /logo$/i,
  /^logo/i,
  /icon$/i,
  /^icon/i,
  /brand$/i,
  /^brand/i,
  
  // Developer/creator names
  /^by /i,
  /^built by/i,
  /^created by/i,
  /^made by/i,
  /^developed by/i,
  
  // Generic one word terms
  /^(ai|ml|nlp|gpt|bot|app|tool|software|platform|service|solution|system)$/i,
  
  // Very short or very long names
  /^.{1,2}$/,
  /^.{51,}$/
];

// Function to check if a tool is likely fake/generic
function isFakeTool(tool) {
  const name = tool.name.toLowerCase().trim();
  
  // Check against fake patterns
  if (fakePatterns.some(pattern => pattern.test(name))) {
    return true;
  }
  
  // Additional checks
  if (name.includes('directory') && name.split(' ').length <= 3) return true;
  if (name.includes('tools') && name.split(' ').length <= 2) return true;
  if (name.includes('ai') && name.split(' ').length <= 2 && !name.includes('.')) return true;
  if (name.split(' ').length > 10) return true; // Too many words
  
  // Check for generic descriptions
  const desc = tool.overview.description.toLowerCase();
  if (desc.includes('generate a free') && desc.includes('website') && desc.length < 50) return true;
  if (desc.includes('directory of') || desc.includes('list of')) return true;
  if (desc.includes('collection of') || desc.includes('database of')) return true;
  
  return false;
}

// Function to check if tool has legitimate characteristics
function isLegitimateAITool(tool) {
  const name = tool.name.toLowerCase();
  const desc = tool.overview.description.toLowerCase();
  
  // Positive indicators for legitimate AI tools
  const legitimateIndicators = [
    // Specific AI functionality
    /text.*to.*speech/,
    /speech.*to.*text/,
    /text.*to.*image/,
    /image.*to.*text/,
    /text.*to.*video/,
    /natural language/,
    /computer vision/,
    /neural network/,
    /deep learning/,
    /machine learning/,
    /artificial intelligence/,
    /conversational ai/,
    /chatbot/,
    /virtual assistant/,
    /content generation/,
    /content creation/,
    /code generation/,
    /code completion/,
    /automated/,
    /prediction/,
    /classification/,
    /sentiment analysis/,
    /recommendation/,
    /personalization/,
    /optimization/,
    
    // Tool-specific naming patterns
    /\.ai$/,
    /\.com$/,
    /gpt/,
    /bot$/,
    /ai$/,
    /ml$/,
    /assistant$/,
    /generator$/,
    /analyzer$/,
    /optimizer$/,
    /creator$/,
    /builder$/,
    /writer$/,
    /editor$/,
    /translator$/,
    /converter$/
  ];
  
  const hasLegitimateIndicator = legitimateIndicators.some(pattern => 
    pattern.test(name) || pattern.test(desc)
  );
  
  // Must have URL or substantial description
  const hasSubstance = tool.overview.website !== `https://${tool.id}.com` || 
                      desc.length > 30;
  
  // Must have reasonable name length and word count
  const reasonableName = name.length >= 3 && name.length <= 50 && 
                         name.split(' ').length <= 8;
  
  return hasLegitimateIndicator && hasSubstance && reasonableName;
}

// Filter tools
const filteredTools = tools.filter(tool => {
  const isFake = isFakeTool(tool);
  const isLegit = isLegitimateAITool(tool);
  
  if (isFake) {
    console.log(`🗑️ Removing fake: "${tool.name}"`);
    return false;
  }
  
  if (!isLegit) {
    console.log(`❌ Not legitimate AI tool: "${tool.name}"`);
    return false;
  }
  
  console.log(`✅ Keeping: "${tool.name}"`);
  return true;
});

console.log(`\n📊 Filtering results:`);
console.log(`✅ Legitimate tools kept: ${filteredTools.length}`);
console.log(`🗑️ Tools filtered out: ${tools.length - filteredTools.length}`);

// Show sample of kept tools
console.log(`\n📋 Sample of legitimate tools kept:`);
filteredTools.slice(0, 20).forEach((tool, i) => {
  console.log(`  ${i+1}. ${tool.name} (${tool.overview.category})`);
});

// Save filtered results
const filteredData = {
  ...extractedData,
  tools: filteredTools,
  metadata: {
    ...extractedData.metadata,
    originalCount: tools.length,
    filteredCount: filteredTools.length,
    filteredAt: new Date().toISOString()
  }
};

fs.writeFileSync('scraping/data/b12/filtered-tools.json', JSON.stringify(filteredData, null, 2));

console.log(`\n💾 Filtered tools saved to: scraping/data/b12/filtered-tools.json`);
console.log(`🎉 Ready to add ${filteredTools.length} legitimate AI tools!`);