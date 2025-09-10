#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const https = require('https');
const http = require('http');

console.log('🧪 Testing Redirect Status Codes from CSV...\n');

// Function to test redirect status
function testRedirect(url) {
    return new Promise((resolve) => {
        const urlObj = new URL(url);
        const client = urlObj.protocol === 'https:' ? https : http;
        
        const options = {
            hostname: urlObj.hostname,
            path: urlObj.pathname + urlObj.search,
            method: 'HEAD',
            headers: {
                'User-Agent': 'Mozilla/5.0 (compatible; SiteOptz-RedirectTest/1.0)'
            }
        };

        const req = client.request(options, (res) => {
            resolve({
                url: url,
                statusCode: res.statusCode,
                location: res.headers.location || null
            });
        });

        req.on('error', (err) => {
            resolve({
                url: url,
                statusCode: null,
                error: err.message,
                location: null
            });
        });

        req.setTimeout(10000, () => {
            req.abort();
            resolve({
                url: url,
                statusCode: null,
                error: 'Timeout',
                location: null
            });
        });

        req.end();
    });
}

// Function to parse CSV
function parseCSV(csvContent) {
    const lines = csvContent.split('\n');
    const urls = [];
    
    // Skip header line
    for (let i = 1; i < lines.length; i++) {
        const line = lines[i].trim();
        if (line) {
            // Extract the first URL from the line (Page URL with Redirect Link)
            const match = line.match(/^([^,]+)/);
            if (match) {
                const url = match[1].replace(/^→/, ''); // Remove arrow if present
                if (url.startsWith('https://')) {
                    urls.push(url);
                }
            }
        }
    }
    
    return urls;
}

async function main() {
    try {
        // Read CSV file
        const csvPath = './siteoptz.ai_permanent_redirects_20250910.csv';
        const csvContent = fs.readFileSync(csvPath, 'utf8');
        
        // Parse URLs from CSV
        const urls = parseCSV(csvContent);
        console.log(`📊 Found ${urls.length} URLs to test\n`);
        
        // Take a sample for testing (first 20 URLs)
        const sampleUrls = urls.slice(0, 20);
        console.log('🔍 Testing first 20 URLs from CSV...\n');
        
        const results = [];
        let correct301 = 0;
        let needs308Fix = 0;
        let errors = 0;
        
        // Test each URL
        for (const url of sampleUrls) {
            try {
                const result = await testRedirect(url);
                results.push(result);
                
                const statusText = result.statusCode ? result.statusCode.toString() : 'ERROR';
                
                if (result.statusCode === 301) {
                    console.log(`✅ ${url}: ${statusText} (Correct)`);
                    correct301++;
                } else if (result.statusCode === 308) {
                    console.log(`❌ ${url}: ${statusText} (Needs Fix)`);
                    needs308Fix++;
                } else if (result.error) {
                    console.log(`⚠️  ${url}: ${result.error}`);
                    errors++;
                } else {
                    console.log(`⚠️  ${url}: ${statusText} (Unexpected)`);
                    errors++;
                }
                
                // Small delay to avoid overwhelming the server
                await new Promise(resolve => setTimeout(resolve, 100));
                
            } catch (error) {
                console.log(`⚠️  ${url}: Error - ${error.message}`);
                errors++;
            }
        }
        
        // Generate report
        const report = {
            timestamp: new Date().toISOString(),
            totalTested: sampleUrls.length,
            totalInCSV: urls.length,
            results: {
                correct301: correct301,
                needs308Fix: needs308Fix,
                errors: errors
            },
            successRate: ((correct301 / sampleUrls.length) * 100).toFixed(2),
            urlsTested: sampleUrls,
            detailedResults: results
        };
        
        // Save report
        const reportPath = './csv-redirect-test-report.json';
        fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));
        
        // Summary
        console.log('\n📊 CSV Redirect Test Report:');
        console.log(`   Total Tested: ${sampleUrls.length} (sample from ${urls.length} total)`);
        console.log(`   301 Redirects (Correct): ${correct301}`);
        console.log(`   308 Redirects (Need Fix): ${needs308Fix}`);
        console.log(`   Errors: ${errors}`);
        console.log(`   Success Rate: ${report.successRate}%`);
        console.log(`\n📈 Report saved to: ${reportPath}`);
        
        if (needs308Fix > 0) {
            console.log('\n❌ URLs still returning 308 status codes need to be fixed.');
            console.log('🔧 These redirects should return 301 instead of 308.');
            console.log('🚀 Update your vercel.json redirect rules and redeploy.');
        } else if (correct301 === sampleUrls.length) {
            console.log('\n✅ All tested redirects are working correctly with 301 status codes!');
        }
        
        console.log('\n✅ CSV Redirect Testing Completed!');
        
    } catch (error) {
        console.error('❌ Error during CSV redirect testing:', error.message);
        process.exit(1);
    }
}

if (require.main === module) {
    main();
}

module.exports = { testRedirect, parseCSV };