const fs = require('fs');

// Read vercel.json
const vercelConfig = JSON.parse(fs.readFileSync('vercel.json', 'utf-8'));
const redirects = vercelConfig.redirects;

console.log(`Total redirects: ${redirects.length}`);

// Look for specific patterns that might conflict
const problematicUrls = [
    '/categories',
    '/tools/ai-cost-calculator'
];

console.log('\n🔍 ANALYZING REDIRECT CONFLICTS');
console.log('='.repeat(60));

problematicUrls.forEach(url => {
    console.log(`\nChecking: ${url}`);
    
    // Find all redirects that match this source
    const matches = redirects.filter(r => r.source === url);
    console.log(`Found ${matches.length} exact matches:`);
    
    matches.forEach((match, index) => {
        console.log(`  ${index + 1}. ${match.source} → ${match.destination} (${match.statusCode})`);
    });
    
    // Check for similar/conflicting patterns
    const similar = redirects.filter(r => 
        r.source.startsWith(url) && r.source !== url
    );
    
    if (similar.length > 0) {
        console.log(`Found ${similar.length} similar patterns:`);
        similar.slice(0, 5).forEach((sim, index) => {
            console.log(`  ${index + 1}. ${sim.source} → ${sim.destination} (${sim.statusCode})`);
        });
        if (similar.length > 5) {
            console.log(`  ... and ${similar.length - 5} more`);
        }
    }
});

// Check for duplicate sources
console.log('\n🔍 CHECKING FOR DUPLICATE SOURCES');
console.log('='.repeat(60));

const sourceMap = new Map();
redirects.forEach((redirect, index) => {
    if (sourceMap.has(redirect.source)) {
        const existing = sourceMap.get(redirect.source);
        console.log(`❌ DUPLICATE FOUND:`);
        console.log(`  First:  ${existing.source} → ${existing.destination} (${existing.statusCode}) [index ${existing.index}]`);
        console.log(`  Second: ${redirect.source} → ${redirect.destination} (${redirect.statusCode}) [index ${index}]`);
    } else {
        sourceMap.set(redirect.source, { ...redirect, index });
    }
});

// Check redirect order and status code patterns
console.log('\n🔍 ANALYZING STATUS CODE PATTERNS');
console.log('='.repeat(60));

const statusCounts = {};
redirects.forEach(redirect => {
    statusCounts[redirect.statusCode] = (statusCounts[redirect.statusCode] || 0) + 1;
});

console.log('Status code distribution:');
Object.entries(statusCounts).forEach(([status, count]) => {
    console.log(`  ${status}: ${count} redirects`);
});

// Check the working vs non-working URLs
console.log('\n🔍 COMPARING WORKING VS NON-WORKING REDIRECTS');
console.log('='.repeat(60));

const workingUrls = ['/about', '/blog', '/careers'];
const nonWorkingUrls = ['/categories', '/tools/ai-cost-calculator'];

console.log('Working redirects (return 301):');
workingUrls.forEach(url => {
    const match = redirects.find(r => r.source === url);
    if (match) {
        const index = redirects.indexOf(match);
        console.log(`  ${url} → ${match.destination} (${match.statusCode}) [index ${index}]`);
    } else {
        console.log(`  ${url} → NOT FOUND in redirects`);
    }
});

console.log('\nNon-working redirects (return 308):');
nonWorkingUrls.forEach(url => {
    const match = redirects.find(r => r.source === url);
    if (match) {
        const index = redirects.indexOf(match);
        console.log(`  ${url} → ${match.destination} (${match.statusCode}) [index ${index}]`);
    } else {
        console.log(`  ${url} → NOT FOUND in redirects`);
    }
});

console.log('\n' + '='.repeat(60));