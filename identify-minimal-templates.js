const fs = require('fs');
const path = require('path');

function identifyMinimalTemplates() {
  console.log('🔍 Identifying tools with minimal templates...\n');
  
  const componentsDir = './seo-optimization/production-components';
  const files = fs.readdirSync(componentsDir).filter(file => file.endsWith('.tsx'));
  
  const minimalTemplates = [];
  const fullTemplates = [];
  
  for (const file of files) {
    const filePath = path.join(componentsDir, file);
    const content = fs.readFileSync(filePath, 'utf8');
    
    // Check if it uses the minimal template pattern
    if (content.includes('interface') && content.includes('ReviewPageProps') && 
        content.includes('React.FC') && !content.includes('FAQSection')) {
      const toolSlug = file.replace('ReviewPage.tsx', '').toLowerCase()
        .replace(/([A-Z])/g, '-$1').replace(/^-/, '').replace('ten-web', '10web');
      minimalTemplates.push(toolSlug);
    } else if (content.includes('FAQSection') && content.includes('ToolLogo')) {
      const toolSlug = file.replace('ReviewPage.tsx', '').toLowerCase()
        .replace(/([A-Z])/g, '-$1').replace(/^-/, '').replace('ten-web', '10web');
      fullTemplates.push(toolSlug);
    }
  }
  
  console.log(`📊 Summary:`);
  console.log(`✅ Full SEO templates: ${fullTemplates.length}`);
  console.log(`❌ Minimal templates: ${minimalTemplates.length}`);
  console.log(`📁 Total components: ${files.length}`);
  
  console.log(`\n❌ Tools still using minimal templates:`);
  minimalTemplates.sort().forEach((tool, index) => {
    console.log(`${index + 1}. ${tool}`);
  });
  
  return { minimalTemplates, fullTemplates };
}

if (require.main === module) {
  identifyMinimalTemplates();
}

module.exports = { identifyMinimalTemplates };