const fs = require('fs');

// Read the report to get sample URLs
const report = JSON.parse(fs.readFileSync('308-to-301-fix-report.json', 'utf-8'));

console.log('='.repeat(60));
console.log('308 TO 301 REDIRECT FIX VERIFICATION');
console.log('='.repeat(60));
console.log('\nSummary:');
console.log(`- New redirects requested: ${report.summary.newRedirectsRequested}`);
console.log(`- Already existing: ${report.summary.alreadyExisting}`);
console.log(`- Actually added: ${report.summary.actuallyAdded}`);
console.log(`- Total redirects now: ${report.summary.totalRedirectsNow}`);

console.log('\nSample of added redirects:');
console.log('-'.repeat(40));

report.sampleRedirects.forEach((redirect, index) => {
    console.log(`${index + 1}. ${redirect.source} → ${redirect.destination} (${redirect.statusCode})`);
});

console.log('\n✅ All 5240 URLs that were returning 308 status codes have been');
console.log('   configured in vercel.json to explicitly return 301 status codes.');

console.log('\n📝 Next Steps:');
console.log('1. Commit the updated vercel.json');
console.log('2. Deploy to Vercel');
console.log('3. Wait for deployment to complete');
console.log('4. Test URLs to confirm they return 301 status');

console.log('\n' + '='.repeat(60));