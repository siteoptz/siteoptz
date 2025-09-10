const https = require('https');

// Function to follow redirect chain and show all hops
function traceRedirects(url, maxHops = 5) {
  return new Promise((resolve) => {
    const redirectChain = [];
    
    function makeRequest(currentUrl, hopCount) {
      if (hopCount >= maxHops) {
        resolve({
          chain: redirectChain,
          finalUrl: currentUrl,
          error: 'Max redirects reached'
        });
        return;
      }

      const urlObj = new URL(currentUrl);
      const options = {
        hostname: urlObj.hostname,
        path: urlObj.pathname + urlObj.search,
        method: 'GET',
        timeout: 10000,
        headers: {
          'User-Agent': 'Mozilla/5.0 (compatible; RedirectTracer/1.0)'
        }
      };

      const req = https.request(options, (res) => {
        const hop = {
          url: currentUrl,
          status: res.statusCode,
          location: res.headers.location || null,
          server: res.headers.server || 'unknown',
          via: res.headers.via || null,
          xVercelCache: res.headers['x-vercel-cache'] || null,
          hopNumber: hopCount + 1
        };
        
        redirectChain.push(hop);

        // If it's a redirect, follow it
        if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
          const nextUrl = res.headers.location.startsWith('http') 
            ? res.headers.location 
            : `https://${urlObj.hostname}${res.headers.location}`;
          makeRequest(nextUrl, hopCount + 1);
        } else {
          // Final response
          resolve({
            chain: redirectChain,
            finalUrl: currentUrl,
            finalStatus: res.statusCode
          });
        }
      });

      req.on('error', (err) => {
        resolve({
          chain: redirectChain,
          error: err.message,
          finalUrl: currentUrl
        });
      });

      req.on('timeout', () => {
        req.destroy();
        resolve({
          chain: redirectChain,
          error: 'Request timeout',
          finalUrl: currentUrl
        });
      });

      req.end();
    }

    makeRequest(url, 0);
  });
}

async function investigateRedirects() {
  console.log('='.repeat(80));
  console.log('INVESTIGATING 308 REDIRECT SOURCES');
  console.log('='.repeat(80));

  const testUrls = [
    // URLs that work (return 301)
    'https://siteoptz.ai/about',
    'https://siteoptz.ai/blog',
    
    // URLs that still return 308
    'https://siteoptz.ai/categories',
    'https://siteoptz.ai/tools/ai-cost-calculator',
    
    // For comparison - check tools directory vs specific tool
    'https://siteoptz.ai/tools',
    
    // Compare pages that return 200
    'https://siteoptz.ai/compare/chatgpt/vs/claude'
  ];

  for (const url of testUrls) {
    console.log(`\n🔍 Tracing: ${url}`);
    console.log('-'.repeat(60));
    
    const result = await traceRedirects(url);
    
    if (result.error) {
      console.log(`❌ Error: ${result.error}`);
      continue;
    }

    result.chain.forEach((hop, index) => {
      console.log(`${hop.hopNumber}. ${hop.url}`);
      console.log(`   Status: ${hop.status}`);
      if (hop.location) console.log(`   Location: ${hop.location}`);
      if (hop.server) console.log(`   Server: ${hop.server}`);
      if (hop.xVercelCache) console.log(`   Vercel-Cache: ${hop.xVercelCache}`);
      if (index < result.chain.length - 1) console.log('   ↓');
    });

    console.log(`\n📍 Final: ${result.finalStatus || 'Unknown'} at ${result.finalUrl}`);
  }

  console.log('\n' + '='.repeat(80));
  console.log('ANALYSIS');
  console.log('='.repeat(80));
  
  console.log('\n🔍 Key Questions to Answer:');
  console.log('1. Are 308s coming from domain-level redirects?');
  console.log('2. Are existing pages overriding vercel.json redirects?');
  console.log('3. Is there a redirect precedence issue?');
  console.log('4. Are 308s coming from Next.js internal redirects?');
}

investigateRedirects().catch(console.error);