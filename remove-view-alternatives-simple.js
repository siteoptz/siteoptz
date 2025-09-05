const fs = require('fs');
const path = require('path');
const glob = require('glob');

function removeViewAlternativesButton(filePath) {
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    let updated = false;
    
    // Only process files that actually contain "View Alternatives"
    if (!content.includes('View Alternatives')) {
      return false;
    }
    
    // Split content by lines for easier processing
    const lines = content.split('\n');
    const newLines = [];
    let skipLines = false;
    let linkDepth = 0;
    let i = 0;
    
    while (i < lines.length) {
      const line = lines[i];
      
      // Check if this line starts a Link component that contains "View Alternatives"
      if (line.trim().includes('<Link') && !skipLines) {
        // Look ahead to see if this Link contains "View Alternatives"
        let linkContent = line;
        let j = i + 1;
        let tempLinkDepth = (line.match(/<Link/g) || []).length - (line.match(/<\/Link>/g) || []).length;
        
        // Collect the full Link component
        while (j < lines.length && tempLinkDepth > 0) {
          linkContent += '\n' + lines[j];
          tempLinkDepth += (lines[j].match(/<Link/g) || []).length - (lines[j].match(/<\/Link>/g) || []).length;
          j++;
        }
        
        // If this Link contains "View Alternatives", skip it entirely
        if (linkContent.includes('View Alternatives')) {
          i = j; // Skip to after the Link component
          updated = true;
          continue;
        }
      }
      
      newLines.push(line);
      i++;
    }
    
    if (updated) {
      let newContent = newLines.join('\n');
      
      // Now update the flex container to center the remaining button
      // Change from "flex flex-col sm:flex-row gap-4 justify-center" to "flex justify-center"
      newContent = newContent.replace(
        /className="flex flex-col sm:flex-row gap-4 justify-center"/g,
        'className="flex justify-center"'
      );
      
      fs.writeFileSync(filePath, newContent, 'utf8');
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