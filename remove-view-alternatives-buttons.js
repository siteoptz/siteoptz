const fs = require('fs');
const path = require('path');
const glob = require('glob');

function removeViewAlternativesButton(filePath) {
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    let updated = false;
    
    // More targeted pattern to match exactly the "View Alternatives" Link component
    // This pattern specifically looks for Links with "View Alternatives" text and border-2 styling
    const viewAlternativesPattern = /<Link[\s\S]*?href="[^"]*alternatives[^"]*"[\s\S]*?className="border-2[^"]*"[\s\S]*?>[\s\S]*?View Alternatives[\s\S]*?<\/Link>/g;
    
    // Alternative pattern for slightly different structures
    const viewAlternativesPattern2 = /<Link[\s\S]{1,200}View Alternatives[\s\S]{1,50}<\/Link>/g;
    
    // Remove View Alternatives button with first pattern
    if (content.includes('View Alternatives')) {
      const beforeRemoval = content;
      content = content.replace(viewAlternativesPattern, '');
      
      // If first pattern didn't work, try second pattern
      if (content === beforeRemoval) {
        content = content.replace(viewAlternativesPattern2, '');
      }
      
      // If we still didn't remove it, try a simpler approach
      if (content === beforeRemoval && content.includes('View Alternatives')) {
        // Find the specific Link block with View Alternatives and remove it
        const lines = content.split('\n');
        const filteredLines = [];
        let insideViewAlternativesLink = false;
        let linkDepth = 0;
        
        for (let i = 0; i < lines.length; i++) {
          const line = lines[i];
          
          // Check if we're starting a Link component with View Alternatives
          if (line.includes('<Link') && 
              (lines.slice(i, i + 5).join('\n').includes('View Alternatives') || 
               line.includes('alternatives'))) {
            insideViewAlternativesLink = true;
            linkDepth = 1;
            continue;
          }
          
          if (insideViewAlternativesLink) {
            // Count nested tags
            const openTags = (line.match(/<[^\/][^>]*>/g) || []).length;
            const closeTags = (line.match(/<\/[^>]*>/g) || []).length;
            linkDepth += openTags - closeTags;
            
            // If we've closed all tags, we're done with this Link
            if (linkDepth <= 0) {
              insideViewAlternativesLink = false;
            }
            continue;
          }
          
          filteredLines.push(line);
        }
        
        content = filteredLines.join('\n');
      }
      
      if (content !== beforeRemoval) {
        updated = true;
      }
    }
    
    // Update the flex container to center the remaining button
    // Change from "flex flex-col sm:flex-row gap-4 justify-center" to "flex justify-center"
    const flexPattern = /className="flex flex-col sm:flex-row gap-4 justify-center"/g;
    if (flexPattern.test(content)) {
      content = content.replace(flexPattern, 'className="flex justify-center"');
      updated = true;
    }
    
    if (updated) {
      fs.writeFileSync(filePath, content, 'utf8');
      console.log(`✅ Removed View Alternatives button from ${path.basename(filePath)}`);
      return true;
    }
    
    return false;
  } catch (error) {
    console.error(`❌ Error processing ${filePath}:`, error.message);
    return false;
  }
}

// Update all SEO component files
const componentsDir = 'seo-optimization/production-components';
const pattern = path.join(componentsDir, '*ReviewPage.tsx');
const files = glob.sync(pattern);

console.log(`Processing ${files.length} SEO component files...`);

let updatedCount = 0;

files.forEach(filePath => {
  if (removeViewAlternativesButton(filePath)) {
    updatedCount++;
  }
});

console.log(`\n🎉 Removed View Alternatives buttons from ${updatedCount} files`);
console.log(`All CTA sections now have centered single buttons`);

if (updatedCount > 0) {
  console.log('\n🔧 Next steps:');
  console.log('1. Run npm run type-check to verify changes');
  console.log('2. Run npm run build to test the build');
  console.log('3. Commit and push changes');
}