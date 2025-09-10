#!/usr/bin/env node

const fs = require('fs');
const https = require('https');
const http = require('http');
const { URL } = require('url');

/**
 * Test redirect status codes for URLs from a file
 * Usage: node test-301-redirects.js [input-file] [base-url]
 */

class RedirectTester {
  constructor(baseUrl = 'https://siteoptz.ai') {
    this.baseUrl = baseUrl;
    this.results = {
      total: 0,
      passed: 0,
      failed: 0,
      errors: 0,
      details: []
    };
  }

  /**
   * Make HTTP request and follow redirects
   */
  async makeRequest(url, maxRedirects = 5) {
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
        const result = {
          url: url,
          statusCode: res.statusCode,
          location: res.headers.location,
          redirectChain: [url]
        };

        // Follow redirects
        if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
          if (maxRedirects > 0) {
            const nextUrl = res.headers.location.startsWith('http') 
              ? res.headers.location 
              : new URL(res.headers.location, url).href;
            
            result.redirectChain.push(nextUrl);
            this.makeRequest(nextUrl, maxRedirects - 1)
              .then(nextResult => {
                result.finalUrl = nextResult.finalUrl || nextResult.url;
                result.finalStatusCode = nextResult.finalStatusCode || nextResult.statusCode;
                result.redirectChain = [...result.redirectChain, ...nextResult.redirectChain];
                resolve(result);
              })
              .catch(err => {
                result.error = err.message;
                resolve(result);
              });
          } else {
            result.error = 'Max redirects exceeded';
            resolve(result);
          }
        } else {
          result.finalUrl = url;
          result.finalStatusCode = res.statusCode;
          resolve(result);
        }
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

  /**
   * Test a single URL
   */
  async testUrl(url) {
    try {
      console.log(`Testing: ${url}`);
      const result = await this.makeRequest(url);
      
      const testResult = {
        url: url,
        statusCode: result.statusCode,
        finalStatusCode: result.finalStatusCode,
        location: result.location,
        finalUrl: result.finalUrl,
        redirectChain: result.redirectChain,
        is301: result.statusCode === 301,
        is308: result.statusCode === 308,
        error: result.error
      };

      if (result.error) {
        this.results.errors++;
        testResult.status = 'ERROR';
      } else if (result.statusCode === 301) {
        this.results.passed++;
        testResult.status = 'PASS';
      } else if (result.statusCode === 308) {
        this.results.failed++;
        testResult.status = 'FAIL';
      } else {
        this.results.failed++;
        testResult.status = 'UNEXPECTED';
      }

      this.results.details.push(testResult);
      this.results.total++;

      return testResult;
    } catch (error) {
      const testResult = {
        url: url,
        statusCode: null,
        error: error.message,
        status: 'ERROR'
      };
      
      this.results.errors++;
      this.results.total++;
      this.results.details.push(testResult);
      
      return testResult;
    }
  }

  /**
   * Read URLs from file
   */
  readUrlsFromFile(filePath) {
    try {
      const content = fs.readFileSync(filePath, 'utf8');
      const lines = content.split('\n').map(line => line.trim()).filter(line => line);
      
      const urls = [];
      for (const line of lines) {
        // Handle different file formats
        if (line.startsWith('http')) {
          urls.push(line);
        } else if (line.startsWith('/')) {
          urls.push(this.baseUrl + line);
        } else if (line.includes(',')) {
          // CSV format - assume first column is URL
          const parts = line.split(',');
          const url = parts[0].trim();
          if (url.startsWith('http')) {
            urls.push(url);
          } else if (url.startsWith('/')) {
            urls.push(this.baseUrl + url);
          }
        }
      }
      
      return urls;
    } catch (error) {
      throw new Error(`Error reading file ${filePath}: ${error.message}`);
    }
  }

  /**
   * Test all URLs from file
   */
  async testUrlsFromFile(filePath, concurrency = 5) {
    console.log(`Reading URLs from: ${filePath}`);
    const urls = this.readUrlsFromFile(filePath);
    console.log(`Found ${urls.length} URLs to test`);
    
    if (urls.length === 0) {
      console.log('No URLs found in file');
      return;
    }

    // Process URLs in batches to avoid overwhelming the server
    for (let i = 0; i < urls.length; i += concurrency) {
      const batch = urls.slice(i, i + concurrency);
      const promises = batch.map(url => this.testUrl(url));
      
      await Promise.all(promises);
      
      // Progress update
      const progress = Math.min(i + concurrency, urls.length);
      console.log(`Progress: ${progress}/${urls.length} (${Math.round(progress/urls.length*100)}%)`);
    }
  }

  /**
   * Generate test report
   */
  generateReport() {
    const report = {
      summary: {
        total: this.results.total,
        passed: this.results.passed,
        failed: this.results.failed,
        errors: this.results.errors,
        passRate: this.results.total > 0 ? Math.round((this.results.passed / this.results.total) * 100) : 0
      },
      details: this.results.details
    };

    return report;
  }

  /**
   * Print results to console
   */
  printResults() {
    console.log('\n' + '='.repeat(60));
    console.log('REDIRECT TEST RESULTS');
    console.log('='.repeat(60));
    
    console.log(`Total URLs tested: ${this.results.total}`);
    console.log(`✅ 301 Redirects: ${this.results.passed}`);
    console.log(`❌ 308 Redirects: ${this.results.failed}`);
    console.log(`⚠️  Errors: ${this.results.errors}`);
    console.log(`📊 Pass Rate: ${this.results.total > 0 ? Math.round((this.results.passed / this.results.total) * 100) : 0}%`);
    
    if (this.results.failed > 0) {
      console.log('\n❌ FAILED TESTS (308 or other status codes):');
      this.results.details
        .filter(r => r.status === 'FAIL' || r.status === 'UNEXPECTED')
        .forEach(r => {
          console.log(`  ${r.url} → ${r.statusCode} ${r.statusCode === 308 ? '(308 - should be 301)' : '(unexpected status)'}`);
        });
    }
    
    if (this.results.errors > 0) {
      console.log('\n⚠️  ERRORS:');
      this.results.details
        .filter(r => r.status === 'ERROR')
        .forEach(r => {
          console.log(`  ${r.url} → ${r.error}`);
        });
    }
  }

  /**
   * Save results to JSON file
   */
  saveResults(filename = 'redirect-test-results.json') {
    const report = this.generateReport();
    fs.writeFileSync(filename, JSON.stringify(report, null, 2));
    console.log(`\n📄 Detailed results saved to: ${filename}`);
  }
}

// Main execution
async function main() {
  const args = process.argv.slice(2);
  
  if (args.length === 0) {
    console.log('Usage: node test-301-redirects.js <input-file> [base-url]');
    console.log('');
    console.log('Examples:');
    console.log('  node test-301-redirects.js urls.txt');
    console.log('  node test-301-redirects.js urls.txt https://example.com');
    console.log('  node test-301-redirects.js vercel-redirects.csv');
    process.exit(1);
  }

  const inputFile = args[0];
  const baseUrl = args[1] || 'https://siteoptz.ai';
  
  if (!fs.existsSync(inputFile)) {
    console.error(`Error: File ${inputFile} not found`);
    process.exit(1);
  }

  const tester = new RedirectTester(baseUrl);
  
  try {
    await tester.testUrlsFromFile(inputFile);
    tester.printResults();
    tester.saveResults();
    
    // Exit with error code if any tests failed
    if (tester.results.failed > 0 || tester.results.errors > 0) {
      process.exit(1);
    }
  } catch (error) {
    console.error('Error:', error.message);
    process.exit(1);
  }
}

// Run if called directly
if (require.main === module) {
  main();
}

module.exports = RedirectTester;