const fs = require('fs');
const path = require('path');

const componentsDir = 'seo-optimization/production-components';
const files = fs.readdirSync(componentsDir).filter(file => file.endsWith('ReviewPage.tsx'));

console.log(`Processing ${files.length} component files...`);

files.forEach(filename => {
  const filepath = path.join(componentsDir, filename);
  let content = fs.readFileSync(filepath, 'utf8');
  
  // Check if SiteOptz section exists
  if (!content.includes('SiteOptz.ai offers expert AI-powered tools')) {
    console.log(`${filename}: No SiteOptz section found, skipping`);
    return;
  }
  
  // Extract the SiteOptz section
  const siteOptzSectionRegex = /(\s*{\/\* SiteOptz\.ai Promotional Section \*\/}[\s\S]*?<\/section>\s*)/;
  const siteOptzMatch = content.match(siteOptzSectionRegex);
  
  if (!siteOptzMatch) {
    console.log(`${filename}: Could not extract SiteOptz section, skipping`);
    return;
  }
  
  const siteOptzSection = siteOptzMatch[1];
  
  // Remove the SiteOptz section from its current location
  content = content.replace(siteOptzSectionRegex, '');
  
  // Find the "Still Have Questions?" section and add SiteOptz section after it
  const stillHaveQuestionsRegex = /(<h2 className="text-4xl font-bold text-white mb-6">\s*Still Have Questions\?\s*<\/h2>[\s\S]*?<\/section>)/;
  
  if (!stillHaveQuestionsRegex.test(content)) {
    console.log(`${filename}: Could not find 'Still Have Questions?' section, skipping`);
    return;
  }
  
  // Insert SiteOptz section after the "Still Have Questions?" section
  const updatedContent = content.replace(
    stillHaveQuestionsRegex,
    '$1' + siteOptzSection
  );
  
  if (updatedContent === content) {
    console.log(`${filename}: No changes made`);
    return;
  }
  
  fs.writeFileSync(filepath, updatedContent);
  console.log(`${filename}: Moved SiteOptz section successfully`);
});

console.log('Done processing all component files.');