const fs = require('fs');
const path = require('path');
const glob = require('glob');

const componentsDir = 'seo-optimization/production-components';

function updateCTAInFile(filePath) {
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    let updated = false;
    
    // Pattern 1: Standard CTA with "Ready to Get Started with [Tool]?"
    const ctaRegex1 = /(\s+<h2 className="text-4xl font-bold text-white mb-6">\s+Ready to Get Started with [^?]+\?\s+<\/h2>\s+<p className="text-xl text-gray-300 mb-8">\s+[^<]+<\/p>)/;
    
    if (ctaRegex1.test(content)) {
      content = content.replace(ctaRegex1, `            <h2 className="text-4xl font-bold text-white mb-6">
              Work Directly With Experts Who've Helped Businesses Scale With AI
            </h2>
            <p className="text-xl text-gray-300 mb-4">
              Not Another Demo. A Real Strategy Session For Your Business.
            </p>
            <p className="text-lg text-gray-400 mb-8">
              Get Your Custom AI Roadmap in 30 Minutes
            </p>`);
      updated = true;
    }
    
    // Pattern 2: Generic CTA patterns
    const ctaRegex2 = /(<h2 className="text-[^"]*">\s*Ready to [^<]*<\/h2>\s*<p className="text-[^"]*">\s*[^<]*<\/p>)/;
    
    if (!updated && ctaRegex2.test(content)) {
      content = content.replace(ctaRegex2, `<h2 className="text-4xl font-bold text-white mb-6">
              Work Directly With Experts Who've Helped Businesses Scale With AI
            </h2>
            <p className="text-xl text-gray-300 mb-4">
              Not Another Demo. A Real Strategy Session For Your Business.
            </p>
            <p className="text-lg text-gray-400 mb-8">
              Get Your Custom AI Roadmap in 30 Minutes
            </p>`);
      updated = true;
    }
    
    // Pattern 3: Different heading variations
    const ctaRegex3 = /(<h2[^>]*>\s*(?:Ready to (?:Start|Get Started|Begin)|Get Started|Start)[^<]*<\/h2>\s*<p[^>]*>\s*[^<]*<\/p>)/;
    
    if (!updated && ctaRegex3.test(content)) {
      content = content.replace(ctaRegex3, `<h2 className="text-4xl font-bold text-white mb-6">
              Work Directly With Experts Who've Helped Businesses Scale With AI
            </h2>
            <p className="text-xl text-gray-300 mb-4">
              Not Another Demo. A Real Strategy Session For Your Business.
            </p>
            <p className="text-lg text-gray-400 mb-8">
              Get Your Custom AI Roadmap in 30 Minutes
            </p>`);
      updated = true;
    }
    
    // Pattern 4: "Join [number] of [users/businesses/teams]" patterns
    const ctaRegex4 = /(<p className="text-xl text-gray-300 mb-8">\s*Join [^<]*<\/p>)/;
    
    if (!updated && ctaRegex4.test(content)) {
      content = content.replace(ctaRegex4, `<p className="text-xl text-gray-300 mb-4">
              Not Another Demo. A Real Strategy Session For Your Business.
            </p>
            <p className="text-lg text-gray-400 mb-8">
              Get Your Custom AI Roadmap in 30 Minutes
            </p>`);
      updated = true;
    }
    
    if (updated) {
      fs.writeFileSync(filePath, content, 'utf8');
      console.log(`✅ Updated CTA in ${path.basename(filePath)}`);
      return true;
    } else {
      // Check if file contains CTA section at all
      if (content.includes('Schedule a Meeting With an AI Specialist') || content.includes('Ready to')) {
        console.log(`⚠️  CTA pattern not matched in ${path.basename(filePath)} - may need manual review`);
      }
      return false;
    }
  } catch (error) {
    console.error(`❌ Error updating ${filePath}:`, error.message);
    return false;
  }
}

// Find all review page files
const pattern = path.join(componentsDir, '*ReviewPage.tsx');
const files = glob.sync(pattern);

console.log(`Found ${files.length} review page components to update...`);

let updatedCount = 0;
let skippedCount = 0;

files.forEach(filePath => {
  if (updateCTAInFile(filePath)) {
    updatedCount++;
  } else {
    skippedCount++;
  }
});

console.log(`\n🎉 Summary:`);
console.log(`✅ Successfully updated CTA sections in ${updatedCount} files`);
console.log(`⚠️  Skipped ${skippedCount} files (already updated or pattern not found)`);
console.log(`📊 Total processed: ${files.length} files`);

if (updatedCount > 0) {
  console.log('\n🔧 Next steps:');
  console.log('1. Run npm run type-check to verify changes');
  console.log('2. Review any files marked with ⚠️  for manual updates if needed');
  console.log('3. Commit and push changes');
}