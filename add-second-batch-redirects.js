const fs = require('fs');

// Read the original new redirects data
const newRedirectsData = JSON.parse(fs.readFileSync('new-301-redirects.json', 'utf-8'));
const allNewRedirects = newRedirectsData.redirects;

// Read current vercel.json
const vercelConfig = JSON.parse(fs.readFileSync('vercel.json', 'utf-8'));
const currentRedirects = vercelConfig.redirects;

console.log(`Current redirects in vercel.json: ${currentRedirects.length}`);
console.log(`Total available from CSV: ${allNewRedirects.length}`);

// Create a Set of current redirect sources for faster lookup
const currentSources = new Set(currentRedirects.map(r => r.source));

// Filter out redirects that are already in vercel.json
const remainingRedirects = allNewRedirects.filter(redirect => 
    !currentSources.has(redirect.source)
);

console.log(`Remaining redirects to add: ${remainingRedirects.length}`);

// Calculate how many we can add
const VERCEL_LIMIT = 2048;
const availableSlots = VERCEL_LIMIT - currentRedirects.length;
console.log(`Available slots: ${availableSlots}`);

// Prioritize remaining redirects by importance
let prioritizedRemaining = [];

// Priority 1: Any remaining root/category/case study pages we missed
const highPriorityPatterns = [
    '/case-studies',
    '/categories', 
    '/analysis/',
    '/tools/',
    '/pricing',
    '/contact',
    '/about',
    '/blog'
];

const highPriority = remainingRedirects.filter(r => 
    highPriorityPatterns.some(pattern => r.source.startsWith(pattern))
);

// Priority 2: Compare pages (most frequent hits)
const compareRedirects = remainingRedirects.filter(r => 
    r.source.startsWith('/compare/') && r.source.includes('/vs/')
);

// Sort compare pages by likely importance (shorter paths first, common tool names)
const commonTools = ['chatgpt', 'claude', 'gemini', 'jasper', 'copy', 'writesonic', 'notion', 'ahrefs'];
const importantCompares = compareRedirects.filter(r => 
    commonTools.some(tool => r.source.toLowerCase().includes(tool))
);

const otherCompares = compareRedirects.filter(r => 
    !commonTools.some(tool => r.source.toLowerCase().includes(tool))
);

// Priority 3: Any other remaining redirects
const otherRedirects = remainingRedirects.filter(r => 
    !r.source.startsWith('/compare/') && 
    !highPriorityPatterns.some(pattern => r.source.startsWith(pattern))
);

// Combine in priority order
prioritizedRemaining = [
    ...highPriority,
    ...importantCompares,
    ...otherCompares,
    ...otherRedirects
];

// Take only what fits in available slots
const batchSize = Math.min(availableSlots, prioritizedRemaining.length);
const redirectsToAdd = prioritizedRemaining.slice(0, batchSize);

console.log(`\nSecond batch breakdown:`);
console.log(`- High priority remaining: ${Math.min(highPriority.length, batchSize)}`);
console.log(`- Important compare pages: ${Math.min(importantCompares.length, Math.max(0, batchSize - highPriority.length))}`);
console.log(`- Other compare pages: ${Math.min(otherCompares.length, Math.max(0, batchSize - highPriority.length - importantCompares.length))}`);
console.log(`- Total adding: ${redirectsToAdd.length}`);

// Add to vercel.json (add new ones at the beginning)
vercelConfig.redirects = [...redirectsToAdd, ...currentRedirects];

console.log(`\nNew total redirects: ${vercelConfig.redirects.length}`);

// Validate we're under the limit
if (vercelConfig.redirects.length > VERCEL_LIMIT) {
    console.error(`❌ ERROR: Would exceed limit! ${vercelConfig.redirects.length} > ${VERCEL_LIMIT}`);
    process.exit(1);
}

// Save updated vercel.json
fs.writeFileSync('vercel.json', JSON.stringify(vercelConfig, null, 2));

console.log(`\n✅ Updated vercel.json with ${vercelConfig.redirects.length} total redirects`);

// Create report
const report = {
    timestamp: new Date().toISOString(),
    batchNumber: 2,
    previousCount: currentRedirects.length,
    addedInThisBatch: redirectsToAdd.length,
    newTotal: vercelConfig.redirects.length,
    vercelLimit: VERCEL_LIMIT,
    remainingCapacity: VERCEL_LIMIT - vercelConfig.redirects.length,
    sampleAdded: redirectsToAdd.slice(0, 20).map(r => ({
        source: r.source,
        destination: r.destination,
        statusCode: r.statusCode
    })),
    breakdown: {
        highPriority: highPriority.length,
        importantCompares: importantCompares.length,
        otherCompares: otherCompares.length,
        otherRedirects: otherRedirects.length
    }
};

fs.writeFileSync('second-batch-redirect-report.json', JSON.stringify(report, null, 2));

console.log(`\n📊 Report saved to: second-batch-redirect-report.json`);
console.log(`📈 Remaining capacity: ${VERCEL_LIMIT - vercelConfig.redirects.length} redirects`);

// Show sample of what was added
console.log(`\nSample of added redirects:`);
redirectsToAdd.slice(0, 10).forEach((redirect, i) => {
    console.log(`${i + 1}. ${redirect.source} → ${redirect.destination} (${redirect.statusCode})`);
});