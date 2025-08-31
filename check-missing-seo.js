const fs = require('fs');

// Get all tools from aiToolsData.json
const toolsData = JSON.parse(fs.readFileSync('public/data/aiToolsData.json', 'utf8'));

// Get all existing SEO components
const seoComponents = fs.readdirSync('seo-optimization/production-components/')
  .filter(file => file.endsWith('ReviewPage.tsx'))
  .map(file => file.replace('ReviewPage.tsx', '').toLowerCase());

// Get tools that don't have SEO components
const missingComponents = [];

toolsData.forEach(tool => {
  const toolSlug = tool.slug || tool.name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
  const componentName = toolSlug.replace(/-/g, '').toLowerCase();
  
  if (!seoComponents.includes(componentName)) {
    missingComponents.push({
      name: tool.name,
      slug: toolSlug,
      componentName: componentName,
      category: tool.category || tool.overview?.category || 'AI Tools'
    });
  }
});

console.log('Tools missing SEO components:');
missingComponents.forEach(tool => {
  console.log(`- ${tool.name} (${tool.slug})`);
});

console.log(`\nTotal missing: ${missingComponents.length}`);
console.log(`Total tools: ${toolsData.length}`);
console.log(`Total existing components: ${seoComponents.length}`);

// Export for use by other scripts
if (typeof module !== 'undefined') {
  module.exports = { missingComponents, toolsData };
}