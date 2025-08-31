const fs = require('fs');
const path = require('path');

const componentsDir = 'seo-optimization/production-components';
const files = fs.readdirSync(componentsDir).filter(file => file.endsWith('ReviewPage.tsx'));

console.log(`Processing ${files.length} component files...`);

files.forEach(filename => {
  const filepath = path.join(componentsDir, filename);
  let content = fs.readFileSync(filepath, 'utf8');
  
  // Look for the CTA buttons section in the description/hero area and remove the "Try [tool] Here" button
  const ctaButtonsRegex = /(\s*{\/\* CTA Buttons \*\/}\s*<div className="flex flex-col sm:flex-row gap-4 mb-8">[\s\S]*?<\/div>)/;
  
  if (!ctaButtonsRegex.test(content)) {
    console.log(`${filename}: No CTA buttons section found, skipping`);
    return;
  }
  
  // Extract the CTA buttons section
  const ctaMatch = content.match(ctaButtonsRegex);
  if (!ctaMatch) {
    console.log(`${filename}: Could not extract CTA section, skipping`);
    return;
  }
  
  const originalCTA = ctaMatch[1];
  
  // Remove the "Try [tool] Here" button but keep the "Compare Alternatives" button
  const updatedCTA = originalCTA.replace(
    /<a[\s\S]*?Try.*?Here[\s\S]*?<\/a>\s*/,
    ''
  );
  
  // If we only have the Compare Alternatives button left, center it
  const finalCTA = updatedCTA.replace(
    'flex flex-col sm:flex-row gap-4 mb-8',
    'flex justify-center mb-8'
  );
  
  const updatedContent = content.replace(ctaButtonsRegex, finalCTA);
  
  if (updatedContent === content) {
    console.log(`${filename}: No changes made`);
    return;
  }
  
  fs.writeFileSync(filepath, updatedContent);
  console.log(`${filename}: Removed 'Try [tool] Here' button successfully`);
});

console.log('Done processing all component files.');