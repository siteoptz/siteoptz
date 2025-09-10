#!/usr/bin/env node

const https = require('https');
const http = require('http');
const { URL } = require('url');

/**
 * Simple script to test if URLs return 301 instead of 308 redirects
 */

async function testRedirect(url) {
  return new Promise((resolve, reject) => {
    const urlObj = new URL(url);
    const isHttps = urlObj.protocol === 'https:';
    const client = isHttps ? https : http;
    
    const options = {
      hostname: urlObj.hostname,
      port: urlObj.port || (isHttps ? 443 : 80),
      path: urlObj.pathname + urlObj.search,
      method: 'GET',
      headers: {
        'User-Agent': 'Redirect-Tester/1.0'
      },
      timeout: 10000
    };

    const req = client.request(options, (res) => {
      resolve({
        url: url,
        statusCode: res.statusCode,
        location: res.headers.location,
        is301: res.statusCode === 301,
        is308: res.statusCode === 308
      });
    });

    req.on('error', (err) => {
      reject(err);
    });

    req.on('timeout', () => {
      req.destroy();
      reject(new Error('Request timeout'));
    });

    req.end();
  });
}

async function testMultipleUrls(urls) {
  console.log(`Testing ${urls.length} URLs...\n`);
  
  let passed = 0;
  let failed = 0;
  let errors = 0;
  
  for (const url of urls) {
    try {
      const result = await testRedirect(url);
      
      if (result.statusCode === 301) {
        console.log(`✅ ${url} → 301 (PASS)`);
        passed++;
      } else if (result.statusCode === 308) {
        console.log(`❌ ${url} → 308 (FAIL - should be 301)`);
        failed++;
      } else {
        console.log(`⚠️  ${url} → ${result.statusCode} (UNEXPECTED)`);
        failed++;
      }
      
      if (result.location) {
        console.log(`   → ${result.location}`);
      }
      
    } catch (error) {
      console.log(`💥 ${url} → ERROR: ${error.message}`);
      errors++;
    }
  }
  
  console.log('\n' + '='.repeat(50));
  console.log(`Results: ${passed} passed, ${failed} failed, ${errors} errors`);
  console.log(`Pass rate: ${Math.round((passed / urls.length) * 100)}%`);
  
  return { passed, failed, errors, total: urls.length };
}

// Example usage
async function main() {
  // Test some example URLs from your vercel.json
  const testUrls = [
    'https://siteoptz.ai/compare/10web-vs-acquisio',
    'https://siteoptz.ai/compare/10web-vs-adalysis',
    'https://siteoptz.ai/compare/10web-vs-adbeat',
    'https://siteoptz.ai/compare/10web-vs-adcreative-ai',
    'https://siteoptz.ai/compare/10web-vs-adespresso'
  ];
  
  console.log('Testing redirect status codes...\n');
  await testMultipleUrls(testUrls);
}

// Run if called directly
if (require.main === module) {
  main().catch(console.error);
}

module.exports = { testRedirect, testMultipleUrls };

