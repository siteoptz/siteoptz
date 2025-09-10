const fs = require('fs');
const https = require('https');

// Read and parse CSV
const csvContent = fs.readFileSync('siteoptz.ai_permanent_redirects_20250910.csv', 'utf-8');
const lines = csvContent.split('\n').slice(1); // Skip header

let totalUrls = 0;
let status308Count = 0;
let status301Count = 0;
let otherStatusCount = 0;
let errorCount = 0;
const results = [];

// Function to test a single URL
function testUrl(url) {
    return new Promise((resolve) => {
        const urlObj = new URL(url);
        const options = {
            hostname: urlObj.hostname,
            path: urlObj.pathname + urlObj.search,
            method: 'HEAD',
            timeout: 10000,
            headers: {
                'User-Agent': 'Mozilla/5.0 (compatible; RedirectTester/1.0)'
            }
        };

        const req = https.request(options, (res) => {
            resolve({
                url: url,
                status: res.statusCode,
                location: res.headers.location || 'none'
            });
        });

        req.on('error', (err) => {
            resolve({
                url: url,
                status: 'error',
                error: err.message
            });
        });

        req.on('timeout', () => {
            req.destroy();
            resolve({
                url: url,
                status: 'timeout',
                error: 'Request timeout'
            });
        });

        req.end();
    });
}

// Process URLs in batches
async function processBatch(urls, batchSize = 10) {
    const results = [];
    for (let i = 0; i < urls.length; i += batchSize) {
        const batch = urls.slice(i, i + batchSize);
        const batchResults = await Promise.all(batch.map(url => testUrl(url)));
        results.push(...batchResults);
        
        // Log progress
        console.log(`Processed ${Math.min(i + batchSize, urls.length)} of ${urls.length} URLs`);
    }
    return results;
}

async function main() {
    console.log('Starting redirect status verification...\n');
    
    // Extract unique URLs from CSV
    const urlSet = new Set();
    for (const line of lines) {
        if (line.trim()) {
            const parts = line.split(',');
            if (parts[0] && parts[0].startsWith('http')) {
                urlSet.add(parts[0]);
            }
        }
    }
    
    const urls = Array.from(urlSet);
    totalUrls = urls.length;
    
    console.log(`Found ${totalUrls} unique URLs to test\n`);
    
    // Test first 50 URLs as a sample
    const sampleSize = Math.min(50, totalUrls);
    const sampleUrls = urls.slice(0, sampleSize);
    
    console.log(`Testing sample of ${sampleSize} URLs...\n`);
    
    const testResults = await processBatch(sampleUrls, 5);
    
    // Analyze results
    for (const result of testResults) {
        results.push(result);
        
        if (result.status === 308) {
            status308Count++;
            console.log(`❌ 308 Redirect: ${result.url}`);
        } else if (result.status === 301) {
            status301Count++;
        } else if (result.status === 'error' || result.status === 'timeout') {
            errorCount++;
        } else {
            otherStatusCount++;
        }
    }
    
    // Generate report
    console.log('\n' + '='.repeat(60));
    console.log('REDIRECT STATUS VERIFICATION REPORT');
    console.log('='.repeat(60));
    console.log(`\nTotal URLs in CSV: ${totalUrls}`);
    console.log(`URLs Tested: ${sampleSize}`);
    console.log('\nResults Summary:');
    console.log(`  ✅ 301 Redirects: ${status301Count}`);
    console.log(`  ❌ 308 Redirects: ${status308Count}`);
    console.log(`  ℹ️  Other Status: ${otherStatusCount}`);
    console.log(`  ⚠️  Errors: ${errorCount}`);
    
    if (status308Count > 0) {
        console.log('\n⚠️  WARNING: Found ${status308Count} URLs still returning 308 status!');
        console.log('These URLs need to be fixed to return 301 status for better SEO.');
        
        // Save detailed results
        const report = {
            timestamp: new Date().toISOString(),
            totalUrls: totalUrls,
            urlsTested: sampleSize,
            summary: {
                status301: status301Count,
                status308: status308Count,
                other: otherStatusCount,
                errors: errorCount
            },
            urls308: results.filter(r => r.status === 308),
            allResults: results
        };
        
        fs.writeFileSync('redirect-status-verification-report.json', JSON.stringify(report, null, 2));
        console.log('\nDetailed report saved to: redirect-status-verification-report.json');
    } else {
        console.log('\n✅ SUCCESS: No 308 redirects found in the tested sample!');
    }
    
    console.log('\n' + '='.repeat(60));
}

main().catch(console.error);