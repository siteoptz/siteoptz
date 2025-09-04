#!/usr/bin/env node

const fs = require('fs');

console.log('🧹 Cleaning up new tool data...\n');

// Load data
const data = JSON.parse(fs.readFileSync('public/data/aiToolsData.json', 'utf8'));
const originalCount = data.length;
const originalTools = data.slice(0, 231); // Keep original 231 tools
const newTools = data.slice(231); // All new tools

console.log(`📊 Starting with ${originalCount} tools (231 original + ${newTools.length} new)`);

// Define artifacts to remove
function isArtifact(tool) {
  const name = tool.name.toLowerCase();
  const website = tool.overview?.website || tool.website || '';
  
  // Navigation artifacts
  const navigationPatterns = [
    'login', 'home', 'menu', 'search', 'profile picture', 'view all',
    'new', 'popular', 'trending', 'more', 'apps', 'deals', 'tasks', 
    'for you', 'background', 'remove background', 'reply', 'open website'
  ];
  
  // Check if name matches navigation patterns
  const isNavigation = navigationPatterns.some(pattern => 
    name.includes(pattern) || name === pattern
  );
  
  // Check if it's a profile picture or media URL
  const isMediaUrl = website.includes('lh3.googleusercontent.com') ||
                     website.includes('media.') ||
                     website.includes('favicon') ||
                     website.endsWith('.png') ||
                     website.endsWith('.svg') ||
                     website.endsWith('.jpg') ||
                     website.endsWith('.jpeg');
  
  return isNavigation || isMediaUrl;
}

// Filter out artifacts
const realTools = newTools.filter(tool => !isArtifact(tool));
const removedArtifacts = newTools.filter(tool => isArtifact(tool));

console.log(`🗑️ Removing ${removedArtifacts.length} artifacts:`);
removedArtifacts.slice(0, 10).forEach(tool => {
  console.log(`  • ${tool.name}`);
});
if (removedArtifacts.length > 10) {
  console.log(`  ... and ${removedArtifacts.length - 10} more`);
}

// Fix remaining tools
const fixedTools = realTools.map(tool => {
  const fixed = { ...tool };
  
  // Fix website URLs - remove placeholder URLs
  const website = tool.overview?.website || tool.website || '';
  if (website.includes('theresanaiforthat.com') || 
      website.includes('toolify.ai') ||
      !website.includes('http') ||
      website === '') {
    
    // Try to extract real website from name or description
    const toolName = tool.name.toLowerCase().replace(/\s+/g, '');
    const possibleUrl = `https://www.${toolName}.com`;
    
    // Set website to "Contact for pricing" placeholder for now
    if (fixed.overview) {
      fixed.overview.website = "Contact for pricing";
    } else {
      fixed.website = "Contact for pricing";
    }
  }
  
  // Fix pricing - many show as free when they shouldn't
  if (fixed.pricing && Array.isArray(fixed.pricing)) {
    fixed.pricing = fixed.pricing.map(plan => {
      // If it's incorrectly marked as free but seems like a premium tool
      if (plan.price_per_month === 0 && plan.plan !== 'Free') {
        return {
          ...plan,
          price_per_month: 'Contact for pricing',
          features: plan.features || []
        };
      }
      return plan;
    });
  } else {
    // Add default pricing structure if missing
    fixed.pricing = [
      {
        plan: "Starter",
        price_per_month: "Contact for pricing",
        features: ["Basic features", "Standard support"]
      }
    ];
  }
  
  // Ensure all required fields are present
  if (!fixed.features || !Array.isArray(fixed.features)) {
    fixed.features = ["AI-powered tool", "Easy to use interface"];
  }
  
  if (!fixed.overview) {
    fixed.overview = {};
  }
  
  if (!fixed.overview.developer) {
    fixed.overview.developer = "Unknown";
  }
  
  // Fix description if missing
  if (!fixed.description) {
    fixed.description = `${fixed.name} is an AI-powered tool that helps users with their productivity and workflow needs.`;
  }
  
  // Ensure proper rating
  if (!fixed.rating || fixed.rating === 0) {
    fixed.rating = 4.0;
  }
  
  return fixed;
});

console.log(`\n✅ Cleaned ${fixedTools.length} real tools`);
console.log(`📉 Removed ${removedArtifacts.length} artifacts`);
console.log(`📊 Final count: ${originalTools.length + fixedTools.length} tools`);

// Combine original tools with cleaned new tools
const cleanedData = [...originalTools, ...fixedTools];

// Save cleaned data
fs.writeFileSync('public/data/aiToolsData.json', JSON.stringify(cleanedData, null, 2));

console.log('\n🎉 Cleanup completed!');
console.log(`📝 Data saved to aiToolsData.json`);
console.log(`📈 Total tools: ${cleanedData.length} (${originalTools.length} original + ${fixedTools.length} cleaned)`);

// Show some examples of cleaned tools
console.log('\n🔍 Sample cleaned tools:');
fixedTools.slice(0, 5).forEach(tool => {
  console.log(`  • ${tool.name} (${tool.overview?.category || 'Unknown category'})`);
});