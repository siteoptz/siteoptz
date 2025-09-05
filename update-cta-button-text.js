const fs = require('fs');
const path = require('path');
const glob = require('glob');

function updateCTAButtonInFile(filePath) {
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    let updated = false;
    
    // Update the button text from "Schedule a Meeting With an AI Specialist" to "Talk 1:1 With an AI Implementation Expert"
    if (content.includes("Schedule a Meeting With an AI Specialist")) {
      content = content.replace(/Schedule a Meeting With an AI Specialist/g, "Talk 1:1 With an AI Implementation Expert");
      updated = true;
    }
    
    // Also check for any variations
    if (content.includes("Schedule a Meeting With an AI Expert")) {
      content = content.replace(/Schedule a Meeting With an AI Expert/g, "Talk 1:1 With an AI Implementation Expert");
      updated = true;
    }
    
    if (updated) {
      fs.writeFileSync(filePath, content, 'utf8');
      console.log(`✅ Updated CTA button in ${path.basename(filePath)}`);
      return true;
    }
    
    return false;
  } catch (error) {
    console.error(`❌ Error updating ${filePath}:`, error.message);
    return false;
  }
}

// Update main review pages
const reviewPages = [
  'pages/reviews/loomly.tsx',
  'pages/reviews/socialpilot.tsx', 
  'pages/reviews/social-champ.tsx',
  'pages/reviews/sendible.tsx',
  'pages/reviews/contentstudio.tsx'
];

console.log('Updating main review pages...');
let updatedCount = 0;

reviewPages.forEach(filePath => {
  if (fs.existsSync(filePath)) {
    if (updateCTAButtonInFile(filePath)) {
      updatedCount++;
    }
  }
});

// Update all SEO component files
const componentsDir = 'seo-optimization/production-components';
const pattern = path.join(componentsDir, '*ReviewPage.tsx');
const files = glob.sync(pattern);

console.log(`\nUpdating ${files.length} SEO component files...`);

files.forEach(filePath => {
  if (updateCTAButtonInFile(filePath)) {
    updatedCount++;
  }
});

console.log(`\n🎉 Successfully updated CTA button text in ${updatedCount} files`);
console.log('Button text changed from "Schedule a Meeting With an AI Specialist" to "Talk 1:1 With an AI Implementation Expert"');

if (updatedCount > 0) {
  console.log('\n🔧 Next steps:');
  console.log('1. Run npm run type-check to verify changes');
  console.log('2. Commit and push changes');
}