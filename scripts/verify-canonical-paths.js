#!/usr/bin/env node

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
            console.log(`✅ ${file} has canonical path`);
        } else {
            issues++;
            console.log(`❌ ${file} missing canonical path`);
        }
    } else {
        issues++;
        console.log(`❌ ${file} not found`);
    }
});

console.log(`\n📊 Verification Results:`);
console.log(`✅ Files with canonical paths: ${verified}`);
console.log(`❌ Files with issues: ${issues}`);

if (issues === 0) {
    console.log('\n🎉 All tool calculator pages have proper canonical paths!');
} else {
    console.log('\n⚠️  Some files need attention.');
}