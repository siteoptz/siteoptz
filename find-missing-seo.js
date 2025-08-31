const fs = require('fs');

// Get all tools from aiToolsData.json
const toolsData = JSON.parse(fs.readFileSync('public/data/aiToolsData.json', 'utf8'));

// Get slugs from SEO mapping
const mappingContent = fs.readFileSync('utils/seoComponentMapping.ts', 'utf8');
const seoSlugs = [];
const matches = mappingContent.match(/'([^']+)':\s*\(\)/g);
if (matches) {
  matches.forEach(match => {
    const slug = match.match(/'([^']+)':/)[1];
    seoSlugs.push(slug);
  });
}

// Find missing tools
const missingTools = [];
toolsData.forEach(tool => {
  const slug = tool.slug || tool.name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
  if (!seoSlugs.includes(slug)) {
    missingTools.push({
      name: tool.name,
      slug: slug,
      category: tool.category || tool.overview?.category || 'AI Tools'
    });
  }
});

console.log('Tools missing SEO components:');
missingTools.forEach(tool => {
  console.log(`- ${tool.name} (${tool.slug}) - ${tool.category}`);
});

console.log(`\nTotal missing: ${missingTools.length}`);
console.log(`Total tools: ${toolsData.length}`);
console.log(`Total mapped: ${seoSlugs.length}`);

// Export for other scripts
module.exports = { missingTools, toolsData };