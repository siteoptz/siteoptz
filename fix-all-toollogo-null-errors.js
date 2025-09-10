#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

function fixToolLogoNullErrors() {
  console.log('🔧 Fixing ToolLogo null errors in comparison pages...');
  
  // Find all comparison pages with ToolLogo issues
  const filesWithIssues = execSync(
    'find pages/compare -name "*.tsx" -exec grep -l "ToolLogo.*logoUrl={tool.*\\.logo}" {} \\;',
    { encoding: 'utf8' }
  ).trim().split('\n').filter(Boolean);
  
  console.log(`📝 Found ${filesWithIssues.length} files to fix`);
  
  let fixedCount = 0;
  let totalReplacements = 0;
  
  filesWithIssues.forEach(filePath => {
    try {
      const content = fs.readFileSync(filePath, 'utf8');
      let updatedContent = content;
      let replacements = 0;
      
      // Fix tool1.logo -> tool1.logo || undefined
      const tool1Regex = /logoUrl=\{tool1\.logo\}/g;
      const tool1Matches = content.match(tool1Regex);
      if (tool1Matches) {
        updatedContent = updatedContent.replace(tool1Regex, 'logoUrl={tool1.logo || undefined}');
        replacements += tool1Matches.length;
      }
      
      // Fix tool2.logo -> tool2.logo || undefined
      const tool2Regex = /logoUrl=\{tool2\.logo\}/g;
      const tool2Matches = content.match(tool2Regex);
      if (tool2Matches) {
        updatedContent = updatedContent.replace(tool2Regex, 'logoUrl={tool2.logo || undefined}');
        replacements += tool2Matches.length;
      }
      
      // Fix any generic tool.logo patterns
      const genericRegex = /logoUrl=\{([a-zA-Z0-9_]+)\.logo\}/g;
      updatedContent = updatedContent.replace(genericRegex, 'logoUrl={$1.logo || undefined}');
      
      if (replacements > 0) {
        fs.writeFileSync(filePath, updatedContent);
        console.log(`✅ Fixed ${replacements} issues in ${filePath}`);
        fixedCount++;
        totalReplacements += replacements;
      }
    } catch (error) {
      console.error(`❌ Error fixing ${filePath}:`, error.message);
    }
  });
  
  console.log(`\n📈 Summary:`);
  console.log(`✅ Files fixed: ${fixedCount}`);
  console.log(`🔧 Total replacements: ${totalReplacements}`);
  console.log(`\n🎯 All ToolLogo null errors should now be fixed!`);
}

fixToolLogoNullErrors();