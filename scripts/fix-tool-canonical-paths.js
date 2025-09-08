#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

console.log('🔧 Adding canonical paths to all tool calculator pages...');

const toolFiles = [
    { file: 'ai-cost-calculator.tsx', path: '/tools/ai-cost-calculator' },
    { file: 'chatbot-roi-calculator.tsx', path: '/tools/chatbot-roi-calculator' },
    { file: 'content-roi-calculator.tsx', path: '/tools/content-roi-calculator' },
    { file: 'conversion-roi-calculator.tsx', path: '/tools/conversion-roi-calculator' },
    { file: 'enterprise-ai-calculator.tsx', path: '/tools/enterprise-ai-calculator' },
    { file: 'healthcare-ai-roi.tsx', path: '/tools/healthcare-ai-roi' },
    { file: 'manufacturing-roi-calculator.tsx', path: '/tools/manufacturing-roi-calculator' },
    { file: 'marketing-roi-calculator.tsx', path: '/tools/marketing-roi-calculator' },
    { file: 'no-code-ai-roi.tsx', path: '/tools/no-code-ai-roi' },
    { file: 'recruitment-roi-calculator.tsx', path: '/tools/recruitment-roi-calculator' },
    { file: 'sales-ai-roi.tsx', path: '/tools/sales-ai-roi' },
    { file: 'security-roi-calculator.tsx', path: '/tools/security-roi-calculator' }
];

let updatedFiles = 0;

toolFiles.forEach(({ file, path: canonicalPath }) => {
    const filePath = path.join(__dirname, '../pages/tools', file);
    
    if (fs.existsSync(filePath)) {
        let content = fs.readFileSync(filePath, 'utf-8');
        
        // Check if canonicalPath is already added
        if (!content.includes('canonicalPath=')) {
            // Find the ROICalculatorTemplate props and add canonicalPath after category
            const templateMatch = content.match(/(\s+<ROICalculatorTemplate[\s\S]*?category="[^"]*")(\s+fields=)/);
            
            if (templateMatch) {
                const beforeFields = templateMatch[1];
                const fieldsAndAfter = content.substring(templateMatch.index + templateMatch[1].length);
                
                const newContent = beforeFields + `\n      canonicalPath="${canonicalPath}"` + fieldsAndAfter;
                
                fs.writeFileSync(filePath, newContent);
                updatedFiles++;
                console.log(`✅ Added canonical path to ${file}: ${canonicalPath}`);
            } else {
                console.log(`⚠️  Could not find template props in ${file}`);
            }
        } else {
            console.log(`⏭️  Canonical path already exists in ${file}`);
        }
    } else {
        console.log(`❌ File not found: ${file}`);
    }
});

console.log(`\n📊 Updated ${updatedFiles} tool calculator pages with canonical paths`);
console.log('\n🎉 Canonical paths addition completed!');

// Also create a verification script
const verifyScript = `#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

console.log('🔍 Verifying canonical paths in tool calculator pages...');

const toolFiles = [
    'ai-cost-calculator.tsx',
    'chatbot-roi-calculator.tsx', 
    'content-roi-calculator.tsx',
    'conversion-roi-calculator.tsx',
    'enterprise-ai-calculator.tsx',
    'healthcare-ai-roi.tsx',
    'manufacturing-roi-calculator.tsx',
    'marketing-roi-calculator.tsx',
    'no-code-ai-roi.tsx',
    'recruitment-roi-calculator.tsx',
    'sales-ai-roi.tsx',
    'security-roi-calculator.tsx'
];

let verified = 0;
let issues = 0;

toolFiles.forEach(file => {
    const filePath = path.join(__dirname, '../pages/tools', file);
    
    if (fs.existsSync(filePath)) {
        const content = fs.readFileSync(filePath, 'utf-8');
        
        if (content.includes('canonicalPath=')) {
            verified++;
            console.log(\`✅ \${file} has canonical path\`);
        } else {
            issues++;
            console.log(\`❌ \${file} missing canonical path\`);
        }
    } else {
        issues++;
        console.log(\`❌ \${file} not found\`);
    }
});

console.log(\`\\n📊 Verification Results:\`);
console.log(\`✅ Files with canonical paths: \${verified}\`);
console.log(\`❌ Files with issues: \${issues}\`);

if (issues === 0) {
    console.log('\\n🎉 All tool calculator pages have proper canonical paths!');
} else {
    console.log('\\n⚠️  Some files need attention.');
}`;

fs.writeFileSync(path.join(__dirname, 'verify-canonical-paths.js'), verifyScript);
fs.chmodSync(path.join(__dirname, 'verify-canonical-paths.js'), '755');

console.log('\\n📋 Created verification script: scripts/verify-canonical-paths.js');