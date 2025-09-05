const fs = require('fs');
const path = require('path');
const glob = require('glob');

function updateAllCTAButtonsInFile(filePath) {
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    let updated = false;
    
    // List of button text variations to replace
    const buttonVariations = [
      "Start Free Trial",
      "Get Started", 
      "Try Free",
      "Free Trial",
      "Book a Call",
      "Schedule a Call",
      "Get Free Trial",
      "Try Now",
      "Start Now",
      "Book Demo",
      "Schedule Demo",
      "Contact Us",
      "Learn More",
      "Get Access",
      "Try Today"
    ];
    
    // Look for button patterns and replace them
    buttonVariations.forEach(buttonText => {
      if (content.includes(`>${buttonText}</a>`)) {
        content = content.replace(new RegExp(`>${buttonText}</a>`, 'g'), `>Talk 1:1 With an AI Implementation Expert</a>`);
        updated = true;
      }
      if (content.includes(`">${buttonText}</`)) {
        content = content.replace(new RegExp(`">${buttonText}<`, 'g'), `">Talk 1:1 With an AI Implementation Expert<`);
        updated = true;
      }
    });
    
    // Also update any href that doesn't point to our booking link
    const currentBookingLink = "https://api.leadconnectorhq.com/widget/booking/yPjkVmsauPst8XlrOQUl";
    
    // Look for href patterns that should point to our booking link but don't
    const hrefPatterns = [
      /href="[^"]*(?:trial|demo|signup|register|contact|book|schedule)[^"]*"/gi,
      /href="[^"]*(?:get-started|start-free|try-now)[^"]*"/gi
    ];
    
    hrefPatterns.forEach(pattern => {
      const matches = content.match(pattern);
      if (matches) {
        matches.forEach(match => {
          if (!match.includes(currentBookingLink)) {
            content = content.replace(match, `href="${currentBookingLink}"`);
            updated = true;
          }
        });
      }
    });
    
    if (updated) {
      fs.writeFileSync(filePath, content, 'utf8');
      console.log(`✅ Updated CTA buttons in ${path.basename(filePath)}`);
      return true;
    }
    
    return false;
  } catch (error) {
    console.error(`❌ Error updating ${filePath}:`, error.message);
    return false;
  }
}

// Update all SEO component files
const componentsDir = 'seo-optimization/production-components';
const pattern = path.join(componentsDir, '*ReviewPage.tsx');
const files = glob.sync(pattern);

console.log(`Found ${files.length} SEO component files to update...`);

let updatedCount = 0;

files.forEach(filePath => {
  if (updateAllCTAButtonsInFile(filePath)) {
    updatedCount++;
  }
});

console.log(`\n🎉 Successfully updated CTA buttons in ${updatedCount} additional files`);
console.log('All button variations now say "Talk 1:1 With an AI Implementation Expert"');
console.log('All buttons now link to: https://api.leadconnectorhq.com/widget/booking/yPjkVmsauPst8XlrOQUl');

if (updatedCount > 0) {
  console.log('\n🔧 Next steps:');
  console.log('1. Run npm run type-check to verify changes');
  console.log('2. Commit and push changes');
}