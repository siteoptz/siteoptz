const fs = require('fs');
const path = require('path');
const glob = require('glob');

const componentsDir = 'seo-optimization/production-components';

function fixApostrophesInFile(filePath) {
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    let updated = false;
    
    // Fix apostrophes in the CTA headline
    if (content.includes("Work Directly With Experts Who've Helped Businesses Scale With AI")) {
      content = content.replace(/Work Directly With Experts Who've Helped Businesses Scale With AI/g, "Work Directly With Experts Who&apos;ve Helped Businesses Scale With AI");
      updated = true;
    }
    
    if (updated) {
      fs.writeFileSync(filePath, content, 'utf8');
      console.log(`✅ Fixed apostrophes in ${path.basename(filePath)}`);
      return true;
    }
    
    return false;
  } catch (error) {
    console.error(`❌ Error fixing ${filePath}:`, error.message);
    return false;
  }
}

// Find all review page files
const pattern = path.join(componentsDir, '*ReviewPage.tsx');
const files = glob.sync(pattern);

console.log(`Found ${files.length} review page components to check for apostrophe fixes...`);

let fixedCount = 0;

files.forEach(filePath => {
  if (fixApostrophesInFile(filePath)) {
    fixedCount++;
  }
});

console.log(`\n🎉 Fixed apostrophes in ${fixedCount} files`);

if (fixedCount > 0) {
  console.log('\n🔧 Next step: Run npm run build to verify fixes');
}