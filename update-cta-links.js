const fs = require('fs');
const path = require('path');
const glob = require('glob');

function updateCTALinks(filePath) {
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    let updated = false;
    
    const bookingURL = "https://api.leadconnectorhq.com/widget/booking/yPjkVmsauPst8XlrOQUl";
    const targetText = "Talk 1:1 With an AI Implementation Expert";
    
    // Find anchor tags that contain our target text but don't link to our booking URL
    const anchorRegex = /<a\s+[^>]*href="([^"]*)"[^>]*>[\s\S]*?Talk 1:1 With an AI Implementation Expert[\s\S]*?<\/a>/gi;
    
    let match;
    while ((match = anchorRegex.exec(content)) !== null) {
      const fullMatch = match[0];
      const currentHref = match[1];
      
      // If this anchor contains our target text but doesn't link to our booking URL
      if (currentHref !== bookingURL && currentHref !== "" && !currentHref.includes("leadconnectorhq")) {
        const updatedMatch = fullMatch.replace(`href="${currentHref}"`, `href="${bookingURL}"`);
        content = content.replace(fullMatch, updatedMatch);
        updated = true;
      } else if (currentHref === "") {
        // Handle empty href attributes
        const updatedMatch = fullMatch.replace('href=""', `href="${bookingURL}"`);
        content = content.replace(fullMatch, updatedMatch);
        updated = true;
      }
    }
    
    if (updated) {
      fs.writeFileSync(filePath, content, 'utf8');
      console.log(`✅ Updated CTA links in ${path.basename(filePath)}`);
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

console.log(`Checking ${files.length} SEO component files for CTA link updates...`);

let updatedCount = 0;

files.forEach(filePath => {
  if (updateCTALinks(filePath)) {
    updatedCount++;
  }
});

console.log(`\n🎉 Successfully updated CTA links in ${updatedCount} files`);
console.log(`All "Talk 1:1 With an AI Implementation Expert" buttons now link to: https://api.leadconnectorhq.com/widget/booking/yPjkVmsauPst8XlrOQUl`);

if (updatedCount > 0) {
  console.log('\n🔧 Next steps:');
  console.log('1. Run npm run type-check to verify changes');
  console.log('2. Commit and push changes');
}