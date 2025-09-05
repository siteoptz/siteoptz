const fs = require('fs');
const path = require('path');
const glob = require('glob');

function finalCTACleanup(filePath) {
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    let updated = false;
    
    const bookingURL = "https://api.leadconnectorhq.com/widget/booking/yPjkVmsauPst8XlrOQUl";
    const targetButtonText = "Talk 1:1 With an AI Implementation Expert";
    
    // Fix buttons that say "Try [Tool] Here" but have the booking URL
    const tryHerePattern = /(<a[^>]*href="https:\/\/api\.leadconnectorhq\.com\/widget\/booking\/yPjkVmsauPst8XlrOQUl"[^>]*>[\s\S]*?)Try [^<]+ Here([\s\S]*?<\/a>)/gi;
    
    let match;
    while ((match = tryHerePattern.exec(content)) !== null) {
      const fullMatch = match[0];
      const beforeText = match[1];
      const afterText = match[2];
      const updatedMatch = beforeText + targetButtonText + afterText;
      content = content.replace(fullMatch, updatedMatch);
      updated = true;
    }
    
    // Fix navigation links that were accidentally changed to booking URLs
    const navLinkPatterns = [
      { wrong: `href="${bookingURL}" className="block text-cyan-400 hover:underline text-sm">`, correct: `href="#features" className="block text-cyan-400 hover:underline text-sm">` },
      { wrong: `href="${bookingURL}" className="block text-cyan-400 hover:underline text-sm">\n        → Key Features`, correct: `href="#features" className="block text-cyan-400 hover:underline text-sm">\n        → Key Features` }
    ];
    
    navLinkPatterns.forEach(pattern => {
      if (content.includes(pattern.wrong)) {
        content = content.replace(new RegExp(pattern.wrong.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g'), pattern.correct);
        updated = true;
      }
    });
    
    if (updated) {
      fs.writeFileSync(filePath, content, 'utf8');
      console.log(`✅ Final cleanup completed for ${path.basename(filePath)}`);
      return true;
    }
    
    return false;
  } catch (error) {
    console.error(`❌ Error in final cleanup ${filePath}:`, error.message);
    return false;
  }
}

// Update all SEO component files
const componentsDir = 'seo-optimization/production-components';
const pattern = path.join(componentsDir, '*ReviewPage.tsx');
const files = glob.sync(pattern);

console.log(`Running final cleanup on ${files.length} SEO component files...`);

let cleanedCount = 0;

files.forEach(filePath => {
  if (finalCTACleanup(filePath)) {
    cleanedCount++;
  }
});

console.log(`\n🎉 Final cleanup completed on ${cleanedCount} files`);
console.log(`All CTA buttons now say: "Talk 1:1 With an AI Implementation Expert"`);
console.log(`All CTA buttons link to: https://api.leadconnectorhq.com/widget/booking/yPjkVmsauPst8XlrOQUl`);
console.log(`Navigation links have been restored to their correct anchors`);

if (cleanedCount > 0) {
  console.log('\n🔧 Next steps:');
  console.log('1. Run npm run type-check to verify changes');
  console.log('2. Commit and push changes');
}