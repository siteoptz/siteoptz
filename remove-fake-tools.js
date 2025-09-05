#!/usr/bin/env node

const fs = require('fs');

console.log('🧹 Removing fake tools from the dataset...\n');

// Load current data
const data = JSON.parse(fs.readFileSync('public/data/aiToolsData.json', 'utf8'));
console.log(`📊 Current total tools: ${data.length}`);

// The original 231 tools are legitimate, keep those
const originalTools = data.slice(0, 231);
const recentlyAdded = data.slice(231);

console.log(`📊 Original legitimate tools: ${originalTools.length}`);
console.log(`📊 Recently added tools to review: ${recentlyAdded.length}`);

// Comprehensive list of fake/invalid tool patterns based on the user's examples
const fakeToolPatterns = [
  // Direct examples from user
  'we make ai easy to implement',
  'watch on www.youtube.com',
  'visit',
  'uberduck logo',
  'trusted by 100,000+ subscriber',
  'trending categories',
  'saj adib',
  'runway logo',
  'productivity',
  'privacy',
  'presentations',
  'playground ai logo',
  'other',
  'office & productivity',
  'next page',
  'master chatgpt in 5 minutes',
  'marketing & advertising',
  'marketing',
  'magic school ai logo',
  'looka logo',
  'legal & finance',
  'learn more',
  'in the ai community',
  'ideogram logo',
  'health & wellness',
  'harvard university',
  'gravitywrite logo',
  'go to channel',
  'get deal',
  'gencraft logo',
  'gamma logo',
  'facecheck id logo',
  'education & translation',
  'education',
  'daily life',
  'chatgpt logo',
  'chat',
  'business management',
  'built by matt wolfe',
  'blackbox.ai',
  'ai tool categories',
  'ai detection & anti-detection',
  'aggregators',
  '3d',
  '26647 ais and',
  'email assistant',
  'kevin hutson',
  'more videos',
  'video',
  'video & animation',
  'video generators',
  'video-button',
  
  // Additional patterns for fake tools
  'logo',
  'watch',
  'visit',
  'learn more',
  'get started',
  'sign up',
  'login',
  'subscribe',
  'newsletter',
  'follow',
  'contact',
  'about',
  'help',
  'support',
  'pricing',
  'features',
  'blog',
  'news',
  'updates',
  'community',
  'forum',
  'discord',
  'twitter',
  'facebook',
  'linkedin',
  'instagram',
  'youtube',
  'github',
  'documentation',
  'docs',
  'api',
  'changelog',
  'terms',
  'policy',
  'cookies',
  'gdpr',
  'home',
  'dashboard',
  'profile',
  'settings',
  'account',
  'billing',
  'upgrade',
  'downgrade',
  'cancel',
  'delete',
  'export',
  'import',
  'backup',
  'restore',
  'sync',
  'share',
  'invite',
  'collaborate',
  'team',
  'workspace',
  'project',
  'folder',
  'file',
  'download',
  'upload',
  'save',
  'edit',
  'create',
  'new',
  'add',
  'remove',
  'delete',
  'search',
  'filter',
  'sort',
  'view',
  'show',
  'hide',
  'expand',
  'collapse',
  'refresh',
  'reload',
  'reset',
  'clear',
  'copy',
  'paste',
  'cut',
  'undo',
  'redo',
  'zoom',
  'full screen',
  'minimize',
  'maximize',
  'close'
];

// Additional patterns for categories/generic terms
const genericPatterns = [
  /^[a-z]+$/i, // Single words
  /^\d+$/, // Just numbers
  /logo$/i,
  /^by /i,
  /^built by/i,
  /^created by/i,
  /^made by/i,
  /channel$/i,
  /button$/i,
  /link$/i,
  /page$/i,
  /section$/i,
  /menu$/i,
  /navigation$/i,
  /header$/i,
  /footer$/i,
  /sidebar$/i,
  /widget$/i,
  /component$/i,
  /element$/i,
  /category$/i,
  /categories$/i,
  /& /,
  /^\w{1,2}$/, // Very short names
  /\d{4,}/, // Long numbers
  /www\./,
  /\.com/,
  /\.ai$/,
  /^ai /i,
  /university$/i,
  /college$/i,
  /school$/i
];

// Function to check if a tool is fake/invalid
function isFakeTool(tool) {
  const name = tool.name.toLowerCase().trim();
  
  // Check against specific fake patterns
  if (fakeToolPatterns.some(pattern => name.includes(pattern))) {
    return true;
  }
  
  // Check against generic patterns
  if (genericPatterns.some(pattern => pattern.test(name))) {
    return true;
  }
  
  // Additional checks
  if (name.length < 3) return true; // Too short
  if (name.length > 50) return true; // Too long
  if (name.split(' ').length > 8) return true; // Too many words
  if (name === name.toUpperCase() && name.length > 10) return true; // All caps long strings
  if (name.includes('subscribe') || name.includes('follow')) return true;
  if (name.includes('click') || name.includes('button')) return true;
  if (name.includes('page') || name.includes('section')) return true;
  if (name.includes('menu') || name.includes('navigation')) return true;
  
  return false;
}

// Filter out fake tools from recently added
const legitimateNewTools = recentlyAdded.filter(tool => {
  const isLegitimate = !isFakeTool(tool);
  if (!isLegitimate) {
    console.log(`🗑️ Removing fake tool: "${tool.name}"`);
  }
  return isLegitimate;
});

console.log(`\n📊 Filtering results:`);
console.log(`✅ Legitimate new tools kept: ${legitimateNewTools.length}`);
console.log(`🗑️ Fake tools removed: ${recentlyAdded.length - legitimateNewTools.length}`);

// Show sample of legitimate tools kept
if (legitimateNewTools.length > 0) {
  console.log('\n📋 Legitimate tools kept:');
  legitimateNewTools.forEach((tool, i) => {
    console.log(`  ${i+1}. ${tool.name} (${tool.overview?.category || 'Unknown'})`);
  });
} else {
  console.log('\n⚠️ No legitimate tools found in recent additions');
}

// Create final clean dataset
const cleanData = [...originalTools, ...legitimateNewTools];

// Save cleaned data
fs.writeFileSync('public/data/aiToolsData.json', JSON.stringify(cleanData, null, 2));

console.log(`\n✅ Dataset cleaned successfully!`);
console.log(`📊 Final dataset: ${cleanData.length} tools`);
console.log(`  • Original tools: ${originalTools.length}`);
console.log(`  • Legitimate new tools: ${legitimateNewTools.length}`);
console.log(`🗑️ Total fake tools removed: ${data.length - cleanData.length}`);

if (legitimateNewTools.length > 0) {
  // Show category distribution of kept tools
  const categories = {};
  legitimateNewTools.forEach(tool => {
    const cat = tool.overview?.category || 'Unknown';
    categories[cat] = (categories[cat] || 0) + 1;
  });
  
  console.log('\n📊 Categories of legitimate tools kept:');
  Object.entries(categories)
    .sort(([,a], [,b]) => b - a)
    .forEach(([category, count]) => {
      console.log(`  • ${category}: ${count} tools`);
    });
}

console.log('\n🎉 Cleanup completed! Only legitimate AI tools remain.');