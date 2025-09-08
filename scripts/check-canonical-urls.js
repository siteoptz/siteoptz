#!/usr/bin/env node

// Comprehensive canonical URL checker
const fs = require('fs');
const path = require('path');
const { glob } = require('glob');

async function checkCanonicalUrls() {
    console.log('🔍 Checking all pages for proper canonical URL configuration...');
    
    const pageFiles = await glob('pages/**/*.tsx', { cwd: process.cwd() });
    let issuesFound = 0;
    
    pageFiles.forEach(file => {
        const fullPath = path.join(process.cwd(), file);
        const content = fs.readFileSync(fullPath, 'utf-8');
        
        // Check for canonical URL
        const hasCanonical = content.includes('rel="canonical"');
        const hasWwwInCanonical = content.includes('www.siteoptz.ai');
        
        if (!hasCanonical) {
            console.log(`❌ Missing canonical URL: ${file}`);
            issuesFound++;
        } else if (hasWwwInCanonical) {
            console.log(`⚠️  Using www in canonical URL: ${file}`);
            issuesFound++;
        }
    });
    
    if (issuesFound === 0) {
        console.log('✅ All pages have proper canonical URL configuration');
    } else {
        console.log(`
Found ${issuesFound} canonical URL issues`);
    }
}

checkCanonicalUrls().catch(console.error);