const fs = require('fs');

// Read the new redirects
const newRedirectsData = JSON.parse(fs.readFileSync('new-301-redirects.json', 'utf-8'));
const newRedirects = newRedirectsData.redirects;

// Read existing vercel.json
const vercelConfig = JSON.parse(fs.readFileSync('vercel.json', 'utf-8'));

// Create a Set of existing redirect sources for faster lookup
const existingRedirectSources = new Set(vercelConfig.redirects.map(r => r.source));

// Filter out redirects that already exist
const uniqueNewRedirects = newRedirects.filter(redirect => 
    !existingRedirectSources.has(redirect.source)
);

console.log(`Total new redirects: ${newRedirects.length}`);
console.log(`Already existing: ${newRedirects.length - uniqueNewRedirects.length}`);
console.log(`To be added: ${uniqueNewRedirects.length}`);

// Add the new redirects at the beginning of the redirects array
// (more specific redirects should come first)
vercelConfig.redirects = [...uniqueNewRedirects, ...vercelConfig.redirects];

// Save the updated vercel.json
fs.writeFileSync('vercel.json', JSON.stringify(vercelConfig, null, 2));

console.log('\n✅ Successfully added 301 redirects to vercel.json');
console.log(`Total redirects in vercel.json: ${vercelConfig.redirects.length}`);

// Create a summary report
const report = {
    timestamp: new Date().toISOString(),
    summary: {
        newRedirectsRequested: newRedirects.length,
        alreadyExisting: newRedirects.length - uniqueNewRedirects.length,
        actuallyAdded: uniqueNewRedirects.length,
        totalRedirectsNow: vercelConfig.redirects.length
    },
    sampleRedirects: uniqueNewRedirects.slice(0, 10).map(r => ({
        source: r.source,
        destination: r.destination,
        statusCode: r.statusCode
    }))
};

fs.writeFileSync('308-to-301-fix-report.json', JSON.stringify(report, null, 2));
console.log('\nReport saved to: 308-to-301-fix-report.json');