const https = require('https');

// Test URLs from second batch - mix of different types
const testUrls = [
  // High priority pages that were added
  'https://siteoptz.ai/categories',
  'https://siteoptz.ai/tools/ai-cost-calculator',
  
  // Important compare pages with common tools
  'https://siteoptz.ai/compare/chatgpt/vs/jasper-ai',
  'https://siteoptz.ai/compare/claude/vs/gemini', 
  'https://siteoptz.ai/compare/copy-ai/vs/writesonic',
  'https://siteoptz.ai/compare/jasper-ai/vs/copy-ai',
  
  // Other compare pages that should now be in vercel.json
  'https://siteoptz.ai/compare/10web/vs/acquisio',
  'https://siteoptz.ai/compare/adalysis/vs/adbeat',
  'https://siteoptz.ai/compare/adcreative-ai/vs/adespresso',
  'https://siteoptz.ai/compare/aerogram/vs/aftercare'
];

function testRedirect(url) {
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
        location: res.headers.location || 'none',
        success: res.statusCode === 301,
        type: getUrlType(url)
      });
    });

    req.on('error', (err) => {
      resolve({
        url: url,
        status: 'error',
        error: err.message,
        success: false,
        type: getUrlType(url)
      });
    });

    req.on('timeout', () => {
      req.destroy();
      resolve({
        url: url,
        status: 'timeout',
        error: 'Request timeout',
        success: false,
        type: getUrlType(url)
      });
    });

    req.end();
  });
}

function getUrlType(url) {
  if (url.includes('/categories') && !url.includes('/vs/')) {
    return 'Category (batch 2)';
  } else if (url.includes('/tools/')) {
    return 'Tool Calculator (batch 2)';
  } else if (url.includes('/compare/') && url.includes('/vs/')) {
    // Check if it contains common tools
    const commonTools = ['chatgpt', 'claude', 'gemini', 'jasper', 'copy', 'writesonic'];
    if (commonTools.some(tool => url.toLowerCase().includes(tool))) {
      return 'Important Compare (batch 2)';
    }
    return 'Compare (batch 2)';
  }
  return 'Other (batch 2)';
}

async function runTests() {
  console.log('='.repeat(70));
  console.log('TESTING SECOND BATCH 301 REDIRECT STATUS CODES');
  console.log('='.repeat(70));
  console.log(`Testing ${testUrls.length} URLs from second batch...\n`);

  // Wait a bit for deployment to complete
  console.log('Waiting 30 seconds for Vercel deployment to complete...\n');
  await new Promise(resolve => setTimeout(resolve, 30000));

  const results = [];
  for (const url of testUrls) {
    console.log(`Testing: ${url}`);
    const result = await testRedirect(url);
    results.push(result);
    
    const status = result.success ? '✅ 301' : `❌ ${result.status}`;
    console.log(`  ${status} → ${result.location}`);
    console.log(`  Type: ${result.type}\n`);
  }

  // Summary
  const successful = results.filter(r => r.success).length;
  const failed = results.filter(r => !r.success).length;

  console.log('='.repeat(70));
  console.log('SECOND BATCH TEST RESULTS');
  console.log('='.repeat(70));
  console.log(`✅ Successful (301): ${successful}/${testUrls.length}`);
  console.log(`❌ Failed: ${failed}/${testUrls.length}`);

  if (failed > 0) {
    console.log('\nFailed URLs:');
    results.filter(r => !r.success).forEach(r => {
      console.log(`  ${r.url} - Status: ${r.status}`);
    });
  }

  // Breakdown by type
  console.log('\nBreakdown by type:');
  const types = [...new Set(results.map(r => r.type))];
  
  types.forEach(type => {
    const typeResults = results.filter(r => r.type === type);
    const typeSuccess = typeResults.filter(r => r.success).length;
    console.log(`  ${type}: ${typeSuccess}/${typeResults.length}`);
  });

  console.log('\n📊 TOTAL PROGRESS:');
  console.log('- First batch: 60 redirects (root/categories/case studies)');  
  console.log('- Second batch: 1352 redirects (tools/compare pages)');
  console.log('- Total in vercel.json: 2048/2048 (max capacity)');
  console.log('- Remaining URLs handled by middleware.ts');

  console.log('\n' + '='.repeat(70));

  // Save detailed results
  const report = {
    timestamp: new Date().toISOString(),
    batchNumber: 2,
    totalTested: testUrls.length,
    successful: successful,
    failed: failed,
    results: results
  };

  require('fs').writeFileSync('second-batch-test-results.json', JSON.stringify(report, null, 2));
  console.log('Detailed results saved to: second-batch-test-results.json');
}

runTests().catch(console.error);