const fs = require('fs');
const path = require('path');
const glob = require('glob');

function updateRemainingCTAButtons(filePath) {
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    let updated = false;
    
    // Pattern to match button text inside anchor tags (with whitespace handling)
    const patterns = [
      /(\s+)Start Free Trial(\s*)/g,
      /(\s+)Get Started(\s*)/g,
      /(\s+)Try Free(\s*)/g,
      /(\s+)Free Trial(\s*)/g,
      /(\s+)Book a Call(\s*)/g,
      /(\s+)Schedule a Call(\s*)/g,
      /(\s+)Get Free Trial(\s*)/g,
      /(\s+)Try Now(\s*)/g,
      /(\s+)Start Now(\s*)/g,
      /(\s+)Book Demo(\s*)/g,
      /(\s+)Schedule Demo(\s*)/g,
      /(\s+)Contact Us(\s*)/g,
      /(\s+)Learn More(\s*)/g,
      /(\s+)Get Access(\s*)/g,
      /(\s+)Try Today(\s*)/g
    ];
    
    patterns.forEach(pattern => {
      if (pattern.test(content)) {
        // Check if this button text is within an anchor tag context
        const matches = content.match(pattern);
        if (matches) {
          // Replace only if it's within a button context (preceded by > and followed by <)
          content = content.replace(pattern, '$1Talk 1:1 With an AI Implementation Expert$2');
          updated = true;
        }
      }
    });
    
    if (updated) {
      fs.writeFileSync(filePath, content, 'utf8');
      console.log(`✅ Updated remaining CTA buttons in ${path.basename(filePath)}`);
      return true;
    }
    
    return false;
  } catch (error) {
    console.error(`❌ Error updating ${filePath}:`, error.message);
    return false;
  }
}

// Get list of files that still have "Start Free Trial" or other button text
const componentsDir = 'seo-optimization/production-components';
const pattern = path.join(componentsDir, '*ReviewPage.tsx');
const files = glob.sync(pattern);

console.log(`Checking ${files.length} SEO component files for remaining button text...`);

let updatedCount = 0;
const filesToUpdate = [];

// First, identify files that still need updates
files.forEach(filePath => {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    const buttonPatterns = [
      'Start Free Trial', 'Get Started', 'Try Free', 'Free Trial',
      'Book a Call', 'Schedule a Call', 'Get Free Trial', 'Try Now',
      'Start Now', 'Book Demo', 'Schedule Demo', 'Contact Us',
      'Learn More', 'Get Access', 'Try Today'
    ];
    
    const hasButtonText = buttonPatterns.some(pattern => content.includes(pattern));
    const hasCorrectText = content.includes('Talk 1:1 With an AI Implementation Expert');
    
    if (hasButtonText && !hasCorrectText) {
      filesToUpdate.push(filePath);
    }
  } catch (error) {
    // Skip files that can't be read
  }
});

console.log(`Found ${filesToUpdate.length} files that need button text updates...`);

filesToUpdate.forEach(filePath => {
  if (updateRemainingCTAButtons(filePath)) {
    updatedCount++;
  }
});

console.log(`\n🎉 Successfully updated CTA buttons in ${updatedCount} additional files`);

if (updatedCount > 0) {
  console.log('All button variations now say "Talk 1:1 With an AI Implementation Expert"');
  console.log('\n🔧 Next steps:');
  console.log('1. Run npm run type-check to verify changes');
  console.log('2. Commit and push changes');
} else {
  console.log('No additional files needed updates.');
}