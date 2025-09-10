#!/usr/bin/env node

/**
 * Test Redirect Fixes for SiteOptz.ai
 * 
 * This script tests the redirect fixes to ensure they work properly
 */

const https = require('https');
const http = require('http');

class RedirectTester {
    constructor() {
        this.baseUrl = 'https://siteoptz.ai';
        this.testResults = [];
        this.errors = [];
    }

    /**
     * Main test execution
     */
    async run() {
        console.log('🧪 Testing Redirect Fixes...\n');
        
        try {
            await this.testCompareUrlRedirects();
            await this.testWwwToNonWwwRedirects();
            await this.testCanonicalUrls();
            await this.generateTestReport();
            
            console.log('\n✅ Redirect Testing Completed!');
            this.printResults();
            
        } catch (error) {
            console.error('❌ Error during testing:', error);
            process.exit(1);
        }
    }

    /**
     * Test compare URL redirects
     */
    async testCompareUrlRedirects() {
        console.log('🔗 Testing Compare URL Redirects...');
        
        const testUrls = [
            '/compare/0cody-vs-adbeat',
            '/compare/chatgpt-vs-claude',
            '/compare/midjourney-vs-dalle',
            '/compare/10web-vs-acquisio'
        ];

        for (const url of testUrls) {
            await this.testRedirect(url, url.replace('-vs-', '/vs/'));
        }
    }

    /**
     * Test WWW to non-WWW redirects
     */
    async testWwwToNonWwwRedirects() {
        console.log('🌐 Testing WWW to Non-WWW Redirects...');
        
        const testUrls = [
            '/',
            '/tools',
            '/compare',
            '/reviews/chatgpt',
            '/categories/ai-writing'
        ];

        for (const url of testUrls) {
            const wwwUrl = `https://siteoptz.ai${url}`;
            const nonWwwUrl = `https://siteoptz.ai${url}`;
            await this.testRedirect(wwwUrl, nonWwwUrl);
        }
    }

    /**
     * Test canonical URLs
     */
    async testCanonicalUrls() {
        console.log('📋 Testing Canonical URLs...');
        
        const testUrls = [
            '/',
            '/tools',
            '/compare/chatgpt/vs/claude',
            '/reviews/chatgpt',
            '/categories/ai-writing'
        ];

        for (const url of testUrls) {
            await this.testCanonicalUrl(url);
        }
    }

    /**
     * Test individual redirect
     */
    async testRedirect(sourceUrl, expectedUrl) {
        return new Promise((resolve) => {
            const url = sourceUrl.startsWith('http') ? sourceUrl : `${this.baseUrl}${sourceUrl}`;
            const client = url.startsWith('https') ? https : http;
            
            const req = client.request(url, { method: 'HEAD' }, (res) => {
                const result = {
                    source: sourceUrl,
                    expected: expectedUrl,
                    actual: res.headers.location || 'No redirect',
                    status: res.statusCode,
                    success: false
                };

                if (res.statusCode === 301 || res.statusCode === 302) {
                    if (res.headers.location === expectedUrl) {
                        result.success = true;
                        console.log(`✅ ${sourceUrl} → ${expectedUrl} (${res.statusCode})`);
                    } else {
                        console.log(`❌ ${sourceUrl} → Expected: ${expectedUrl}, Got: ${res.headers.location} (${res.statusCode})`);
                    }
                } else if (res.statusCode === 200) {
                    if (sourceUrl === expectedUrl) {
                        result.success = true;
                        console.log(`✅ ${sourceUrl} (200 - Direct access)`);
                    } else {
                        console.log(`❌ ${sourceUrl} - Expected redirect but got 200`);
                    }
                } else {
                    console.log(`❌ ${sourceUrl} - Unexpected status: ${res.statusCode}`);
                }

                this.testResults.push(result);
                resolve();
            });

            req.on('error', (error) => {
                console.log(`❌ ${sourceUrl} - Error: ${error.message}`);
                this.errors.push(`${sourceUrl}: ${error.message}`);
                resolve();
            });

            req.setTimeout(10000, () => {
                console.log(`❌ ${sourceUrl} - Timeout`);
                this.errors.push(`${sourceUrl}: Timeout`);
                req.destroy();
                resolve();
            });

            req.end();
        });
    }

    /**
     * Test canonical URL in page content
     */
    async testCanonicalUrl(url) {
        return new Promise((resolve) => {
            const fullUrl = `${this.baseUrl}${url}`;
            
            const req = https.request(fullUrl, (res) => {
                let data = '';
                
                res.on('data', (chunk) => {
                    data += chunk;
                });
                
                res.on('end', () => {
                    const result = {
                        url: url,
                        hasCanonical: false,
                        canonicalUrl: null,
                        hasWww: false,
                        success: false
                    };

                    // Check for canonical link tag
                    const canonicalMatch = data.match(/<link[^>]*rel=["']canonical["'][^>]*href=["']([^"']+)["'][^>]*>/i);
                    if (canonicalMatch) {
                        result.hasCanonical = true;
                        result.canonicalUrl = canonicalMatch[1];
                        result.hasWww = result.canonicalUrl.includes('siteoptz.ai');
                        
                        if (!result.hasWww && result.canonicalUrl.includes('siteoptz.ai')) {
                            result.success = true;
                            console.log(`✅ ${url} - Canonical: ${result.canonicalUrl}`);
                        } else {
                            console.log(`❌ ${url} - Canonical has www: ${result.canonicalUrl}`);
                        }
                    } else {
                        console.log(`❌ ${url} - No canonical URL found`);
                    }

                    this.testResults.push(result);
                    resolve();
                });
            });

            req.on('error', (error) => {
                console.log(`❌ ${url} - Error: ${error.message}`);
                this.errors.push(`${url}: ${error.message}`);
                resolve();
            });

            req.setTimeout(10000, () => {
                console.log(`❌ ${url} - Timeout`);
                this.errors.push(`${url}: Timeout`);
                req.destroy();
                resolve();
            });

            req.end();
        });
    }

    /**
     * Generate test report
     */
    async generateTestReport() {
        const report = {
            timestamp: new Date().toISOString(),
            summary: {
                totalTests: this.testResults.length,
                successfulTests: this.testResults.filter(r => r.success).length,
                failedTests: this.testResults.filter(r => !r.success).length,
                errors: this.errors.length
            },
            results: this.testResults,
            errors: this.errors,
            recommendations: this.generateRecommendations()
        };

        const fs = require('fs');
        const reportFile = 'redirect-test-report.json';
        fs.writeFileSync(reportFile, JSON.stringify(report, null, 2));
        
        console.log(`\n📊 Test report saved to: ${reportFile}`);
    }

    /**
     * Generate recommendations based on test results
     */
    generateRecommendations() {
        const recommendations = [];
        
        const failedRedirects = this.testResults.filter(r => !r.success && r.status);
        const failedCanonicals = this.testResults.filter(r => !r.success && r.hasCanonical !== undefined);
        
        if (failedRedirects.length > 0) {
            recommendations.push('Fix failed redirects in nginx/Vercel configuration');
        }
        
        if (failedCanonicals.length > 0) {
            recommendations.push('Update canonical URLs to remove www references');
        }
        
        if (this.errors.length > 0) {
            recommendations.push('Investigate connection errors and timeouts');
        }
        
        if (recommendations.length === 0) {
            recommendations.push('All tests passed! Redirect fixes are working correctly.');
        }
        
        return recommendations;
    }

    /**
     * Print test results
     */
    printResults() {
        const successful = this.testResults.filter(r => r.success).length;
        const total = this.testResults.length;
        
        console.log('\n📈 Test Results:');
        console.log(`   Total Tests: ${total}`);
        console.log(`   Successful: ${successful}`);
        console.log(`   Failed: ${total - successful}`);
        console.log(`   Errors: ${this.errors.length}`);
        console.log(`   Success Rate: ${((successful / total) * 100).toFixed(1)}%`);
        
        if (this.errors.length > 0) {
            console.log('\n⚠️  Errors:');
            this.errors.forEach(error => console.log(`   - ${error}`));
        }
    }
}

// Run the tests
if (require.main === module) {
    const tester = new RedirectTester();
    tester.run().catch(console.error);
}

module.exports = RedirectTester;
