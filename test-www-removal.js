#!/usr/bin/env node

/**
 * Test WWW Removal Script
 * 
 * This script tests the www removal to ensure no 308 redirects remain
 */

const https = require('https');
const http = require('http');

class WWWRemovalTester {
    constructor() {
        this.baseUrl = 'https://siteoptz.ai';
        this.wwwUrl = 'https://siteoptz.ai';
        this.testResults = [];
        this.errors = [];
    }

    /**
     * Main test execution
     */
    async run() {
        console.log('🧪 Testing WWW Removal...\n');
        
        try {
            await this.testWWWRedirects();
            await this.testNonWWWAccess();
            await this.testCanonicalUrls();
            await this.testSitemaps();
            await this.generateTestReport();
            
            console.log('\n✅ WWW Removal Testing Completed!');
            this.printResults();
            
        } catch (error) {
            console.error('❌ Error during testing:', error.message);
            this.errors.push(error.message);
        }
    }

    /**
     * Test www redirects
     */
    async testWWWRedirects() {
        console.log('🔍 Testing www redirects...');
        
        const testUrls = [
            '/',
            '/tools',
            '/compare',
            '/compare/chatgpt/vs/claude',
            '/about',
            '/contact'
        ];
        
        for (const path of testUrls) {
            const wwwUrl = `${this.wwwUrl}${path}`;
            const nonWwwUrl = `${this.baseUrl}${path}`;
            
            try {
                const wwwResult = await this.testUrl(wwwUrl);
                const nonWwwResult = await this.testUrl(nonWwwUrl);
                
                this.testResults.push({
                    path,
                    wwwUrl,
                    nonWwwUrl,
                    wwwStatus: wwwResult.status,
                    wwwRedirects: wwwResult.redirects,
                    nonWwwStatus: nonWwwResult.status,
                    nonWwwRedirects: nonWwwResult.redirects,
                    success: this.evaluateRedirectTest(wwwResult, nonWwwResult)
                });
                
                if (this.evaluateRedirectTest(wwwResult, nonWwwResult)) {
                    console.log(`✅ ${path}: No 308 redirects`);
                } else {
                    console.log(`❌ ${path}: 308 redirects detected`);
                }
                
            } catch (error) {
                console.error(`❌ Error testing ${path}:`, error.message);
                this.errors.push(`Error testing ${path}: ${error.message}`);
            }
        }
    }

    /**
     * Test non-www access
     */
    async testNonWWWAccess() {
        console.log('\n🔍 Testing non-www access...');
        
        const testUrls = [
            '/',
            '/tools',
            '/compare',
            '/sitemap.xml',
            '/robots.txt'
        ];
        
        for (const path of testUrls) {
            const url = `${this.baseUrl}${path}`;
            
            try {
                const result = await this.testUrl(url);
                
                this.testResults.push({
                    type: 'non-www-access',
                    path,
                    url,
                    status: result.status,
                    success: result.status === 200
                });
                
                if (result.status === 200) {
                    console.log(`✅ ${path}: Accessible (${result.status})`);
                } else {
                    console.log(`❌ ${path}: Not accessible (${result.status})`);
                }
                
            } catch (error) {
                console.error(`❌ Error testing ${path}:`, error.message);
                this.errors.push(`Error testing ${path}: ${error.message}`);
            }
        }
    }

    /**
     * Test canonical URLs
     */
    async testCanonicalUrls() {
        console.log('\n🔍 Testing canonical URLs...');
        
        const testUrls = [
            '/',
            '/tools',
            '/compare/chatgpt/vs/claude'
        ];
        
        for (const path of testUrls) {
            const url = `${this.baseUrl}${path}`;
            
            try {
                const result = await this.testUrl(url);
                
                if (result.status === 200) {
                    const canonicalUrl = this.extractCanonicalUrl(result.body);
                    
                    this.testResults.push({
                        type: 'canonical-url',
                        path,
                        url,
                        canonicalUrl,
                        success: canonicalUrl && !canonicalUrl.includes('www.')
                    });
                    
                    if (canonicalUrl && !canonicalUrl.includes('www.')) {
                        console.log(`✅ ${path}: Canonical URL correct (${canonicalUrl})`);
                    } else {
                        console.log(`❌ ${path}: Canonical URL incorrect (${canonicalUrl})`);
                    }
                }
                
            } catch (error) {
                console.error(`❌ Error testing canonical URL for ${path}:`, error.message);
                this.errors.push(`Error testing canonical URL for ${path}: ${error.message}`);
            }
        }
    }

    /**
     * Test sitemaps
     */
    async testSitemaps() {
        console.log('\n🔍 Testing sitemaps...');
        
        const sitemapUrls = [
            '/sitemap.xml',
            '/sitemap-main.xml',
            '/sitemap-tools.xml',
            '/sitemap-comparisons.xml'
        ];
        
        for (const path of sitemapUrls) {
            const url = `${this.baseUrl}${path}`;
            
            try {
                const result = await this.testUrl(url);
                
                if (result.status === 200) {
                    const hasWWWReferences = result.body.includes('siteoptz.ai');
                    
                    this.testResults.push({
                        type: 'sitemap',
                        path,
                        url,
                        hasWWWReferences,
                        success: !hasWWWReferences
                    });
                    
                    if (!hasWWWReferences) {
                        console.log(`✅ ${path}: No www references`);
                    } else {
                        console.log(`❌ ${path}: Contains www references`);
                    }
                }
                
            } catch (error) {
                console.error(`❌ Error testing sitemap ${path}:`, error.message);
                this.errors.push(`Error testing sitemap ${path}: ${error.message}`);
            }
        }
    }

    /**
     * Test a single URL
     */
    async testUrl(url) {
        return new Promise((resolve, reject) => {
            const protocol = url.startsWith('https:') ? https : http;
            const redirects = [];
            
            const makeRequest = (currentUrl, maxRedirects = 5) => {
                if (maxRedirects <= 0) {
                    reject(new Error('Too many redirects'));
                    return;
                }
                
                const request = protocol.get(currentUrl, (response) => {
                    let body = '';
                    
                    response.on('data', (chunk) => {
                        body += chunk;
                    });
                    
                    response.on('end', () => {
                        if (response.statusCode >= 300 && response.statusCode < 400) {
                            const location = response.headers.location;
                            if (location) {
                                redirects.push({
                                    from: currentUrl,
                                    to: location,
                                    status: response.statusCode
                                });
                                makeRequest(location, maxRedirects - 1);
                            } else {
                                resolve({
                                    status: response.statusCode,
                                    redirects,
                                    body: body.substring(0, 1000) // Limit body size
                                });
                            }
                        } else {
                            resolve({
                                status: response.statusCode,
                                redirects,
                                body: body.substring(0, 1000) // Limit body size
                            });
                        }
                    });
                });
                
                request.on('error', (error) => {
                    reject(error);
                });
                
                request.setTimeout(10000, () => {
                    request.destroy();
                    reject(new Error('Request timeout'));
                });
            };
            
            makeRequest(url);
        });
    }

    /**
     * Evaluate redirect test results
     */
    evaluateRedirectTest(wwwResult, nonWwwResult) {
        // Check if www URL has 308 redirects
        const has308Redirects = wwwResult.redirects.some(redirect => 
            redirect.status === 308
        );
        
        // Check if non-www URL is accessible
        const nonWwwAccessible = nonWwwResult.status === 200;
        
        return !has308Redirects && nonWwwAccessible;
    }

    /**
     * Extract canonical URL from HTML
     */
    extractCanonicalUrl(html) {
        const canonicalMatch = html.match(/<link[^>]*rel=["']canonical["'][^>]*href=["']([^"']*)["'][^>]*>/i);
        return canonicalMatch ? canonicalMatch[1] : null;
    }

    /**
     * Generate test report
     */
    async generateTestReport() {
        const report = {
            timestamp: new Date().toISOString(),
            testResults: this.testResults,
            errors: this.errors,
            summary: {
                totalTests: this.testResults.length,
                successfulTests: this.testResults.filter(r => r.success).length,
                failedTests: this.testResults.filter(r => !r.success).length,
                errorCount: this.errors.length
            }
        };
        
        const reportPath = 'www-removal-test-report.json';
        require('fs').writeFileSync(reportPath, JSON.stringify(report, null, 2));
        console.log(`\n📊 Test report saved to: ${reportPath}`);
    }

    /**
     * Print results summary
     */
    printResults() {
        const successfulTests = this.testResults.filter(r => r.success).length;
        const totalTests = this.testResults.length;
        
        console.log('\n📈 Test Results:');
        console.log(`   Total Tests: ${totalTests}`);
        console.log(`   Successful: ${successfulTests}`);
        console.log(`   Failed: ${totalTests - successfulTests}`);
        console.log(`   Errors: ${this.errors.length}`);
        
        if (this.errors.length > 0) {
            console.log('\n❌ Errors:');
            this.errors.forEach(error => console.log(`   ${error}`));
        }
        
        const failedTests = this.testResults.filter(r => !r.success);
        if (failedTests.length > 0) {
            console.log('\n❌ Failed Tests:');
            failedTests.forEach(test => {
                console.log(`   ${test.path || test.type}: ${test.wwwStatus || test.status}`);
            });
        }
        
        console.log('\n🎯 Recommendations:');
        if (successfulTests === totalTests) {
            console.log('   ✅ All tests passed! WWW removal successful.');
        } else {
            console.log('   ⚠️  Some tests failed. Review the results above.');
            console.log('   🔧 Check Vercel domain settings and DNS configuration.');
            console.log('   🔍 Verify no www references remain in code.');
        }
    }
}

// Run the script
if (require.main === module) {
    const tester = new WWWRemovalTester();
    tester.run().catch(console.error);
}

module.exports = WWWRemovalTester;
