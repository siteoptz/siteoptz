#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

console.log('🔧 Adding canonical paths to all ROI calculator tool pages...');

// Get all tool pages that use ROICalculatorTemplate
const toolsDir = path.join(__dirname, '../pages/tools');
const toolFiles = fs.readdirSync(toolsDir)
    .filter(file => file.endsWith('.tsx') && !file.startsWith('[') && file !== 'index.tsx' && file !== 'compare.tsx' && file !== 'comprehensive-comparison.tsx');

let updatedFiles = 0;

toolFiles.forEach(fileName => {
    const filePath = path.join(toolsDir, fileName);
    let content = fs.readFileSync(filePath, 'utf-8');
    
    // Check if it uses ROICalculatorTemplate
    if (content.includes('ROICalculatorTemplate') && !content.includes('canonicalPath')) {
        const toolPath = `/tools/${path.basename(fileName, '.tsx')}`;
        
        // Find the ROICalculatorTemplate call and add canonicalPath
        const templateMatch = content.match(/(<ROICalculatorTemplate\s+[\s\S]*?)(\s+fields=)/);
        
        if (templateMatch) {
            const beforeFields = templateMatch[1];
            const fieldsAndAfter = content.substring(templateMatch.index + templateMatch[1].length);
            
            const newContent = beforeFields + `\n      canonicalPath="${toolPath}"` + fieldsAndAfter;
            
            fs.writeFileSync(filePath, newContent);
            updatedFiles++;
            console.log(`✅ Added canonical path to ${fileName}: ${toolPath}`);
        }
    }
});

console.log(`\n📊 Updated ${updatedFiles} tool calculator pages with canonical paths`);

// Also update the docs/api.tsx if it exists
const apiPath = path.join(__dirname, '../pages/docs/api.tsx');
if (fs.existsSync(apiPath)) {
    let apiContent = fs.readFileSync(apiPath, 'utf-8');
    
    if (!apiContent.includes('rel="canonical"')) {
        // Find Head section and add canonical
        const headMatch = apiContent.match(/(<Head>[\s\S]*?)(<\/Head>)/);
        if (headMatch) {
            const beforeCloseHead = apiContent.substring(0, headMatch.index + headMatch[1].length);
            const afterHead = apiContent.substring(headMatch.index + headMatch[1].length);
            
            const canonicalTag = `        <link rel="canonical" href="https://siteoptz.ai/docs/api" />\n`;
            
            const newApiContent = beforeCloseHead + canonicalTag + afterHead;
            fs.writeFileSync(apiPath, newApiContent);
            console.log('✅ Added canonical URL to docs/api.tsx');
        }
    }
}

console.log('\n🎉 Canonical path addition completed!');
console.log('\nNext steps:');
console.log('1. Run: npm run build');
console.log('2. Test canonical URLs in page source');
console.log('3. Verify www redirects work properly');