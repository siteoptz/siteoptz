#!/usr/bin/env node

/**
 * Test Redirect Status Codes Script
 * 
 * This script tests redirect URLs to verify they return 301 instead of 308
 */

const https = require('https');
const http = require('http');

class RedirectStatusTester {
    constructor() {
        this.baseUrl = 'https://siteoptz.ai';
        this.testResults = [];
        this.errors = [];
        this.stats = {
            totalTests: 0,
            status301: 0,
            status308: 0,
            otherStatus: 0,
            errors: 0
        };
    }

    /**
     * Main test execution
     */
    async run() {
        console.log('🧪 Testing Redirect Status Codes...\n');
        
        try {
            await this.testCompareRedirects();
            await this.testOtherRedirects();
            await this.generateTestReport();
            
            console.log('\n✅ Redirect Status Code Testing Completed!');
            this.printResults();
            
        } catch (error) {
            console.error('❌ Error during testing:', error.message);
            this.errors.push(error.message);
        }
    }

    /**
     * Test compare redirects
     */
    async testCompareRedirects() {
        console.log('🔍 Testing compare redirects...');
        
        const testUrls = [
            '/compare/10web-vs-acquisio',
            '/compare/10web-vs-adalysis',
            '/compare/10web-vs-adbeat',
            '/compare/37x-vs-10web',
            '/compare/37x-vs-acquisio',
            '/compare/adcreative-ai-vs-10web',
            '/compare/adcreative-ai-vs-adbeat',
            '/compare/aerogram-vs-10web',
            '/compare/aftercare-vs-10web',
            '/compare/ahrefs-ai-vs-10web'
        ];
        
        for (const path of testUrls) {
            const url = `${this.baseUrl}${path}`;
            
            try {
                const result = await this.testUrl(url);
                
                this.testResults.push({
                    type: 'compare-redirect',
                    path,
                    url,
                    status: result.status,
                    location: result.location,
                    success: result.status === 301
                });
                
                this.stats.totalTests++;
                
                if (result.status === 301) {
                    this.stats.status301++;
                    console.log(`✅ ${path}: 301 (Correct)`);
                } else if (result.status === 308) {
                    this.stats.status308++;
                    console.log(`❌ ${path}: 308 (Needs Fix)`);
                } else {
                    this.stats.otherStatus++;
                    console.log(`⚠️  ${path}: ${result.status} (Unexpected)`);
                }
                
            } catch (error) {
                console.error(`❌ Error testing ${path}:`, error.message);
                this.errors.push(`Error testing ${path}: ${error.message}`);
                this.stats.errors++;
            }
        }
    }

    /**
     * Test other redirects
     */
    async testOtherRedirects() {
        console.log('\n🔍 Testing other redirects...');
        
        const testUrls = [
            '/compare/chatgpt-vs-claude',
            '/compare/midjourney-vs-dalle',
            '/compare/notion-vs-obsidian',
            '/compare/slack-vs-discord',
            '/compare/zoom-vs-teams'
        ];
        
        for (const path of testUrls) {
            const url = `${this.baseUrl}${path}`;
            
            try {
                const result = await this.testUrl(url);
                
                this.testResults.push({
                    type: 'other-redirect',
                    path,
                    url,
                    status: result.status,
                    location: result.location,
                    success: result.status === 301
                });
                
                this.stats.totalTests++;
                
                if (result.status === 301) {
                    this.stats.status301++;
                    console.log(`✅ ${path}: 301 (Correct)`);
                } else if (result.status === 308) {
                    this.stats.status308++;
                    console.log(`❌ ${path}: 308 (Needs Fix)`);
                } else if (result.status === 200) {
                    console.log(`ℹ️  ${path}: 200 (No redirect)`);
                } else {
                    this.stats.otherStatus++;
                    console.log(`⚠️  ${path}: ${result.status} (Unexpected)`);
                }
                
            } catch (error) {
                console.error(`❌ Error testing ${path}:`, error.message);
                this.errors.push(`Error testing ${path}: ${error.message}`);
                this.stats.errors++;
            }
        }
    }

    /**
     * Test a single URL
     */
    async testUrl(url) {
        return new Promise((resolve, reject) => {
            const protocol = url.startsWith('https:') ? https : http;
            
            const request = protocol.get(url, (response) => {
                resolve({
                    status: response.statusCode,
                    location: response.headers.location || null
                });
            });
            
            request.on('error', (error) => {
                reject(error);
            });
            
            request.setTimeout(10000, () => {
                request.destroy();
                reject(new Error('Request timeout'));
            });
        });
    }

    /**
     * Generate test report
     */
    async generateTestReport() {
        const report = {
            timestamp: new Date().toISOString(),
            stats: this.stats,
            testResults: this.testResults,
            errors: this.errors,
            summary: {
                totalTests: this.stats.totalTests,
                correct301Redirects: this.stats.status301,
                incorrect308Redirects: this.stats.status308,
                otherStatusCodes: this.stats.otherStatus,
                errors: this.stats.errors,
                successRate: this.stats.totalTests > 0 ? 
                    ((this.stats.status301 / this.stats.totalTests) * 100).toFixed(2) + '%' : '0%'
            }
        };
        
        const reportPath = 'redirect-status-test-report.json';
        require('fs').writeFileSync(reportPath, JSON.stringify(report, null, 2));
        console.log(`\n📊 Test report saved to: ${reportPath}`);
    }

    /**
     * Print results summary
     */
    printResults() {
        console.log('\n📈 Redirect Status Test Results:');
        console.log(`   Total Tests: ${this.stats.totalTests}`);
        console.log(`   301 Redirects (Correct): ${this.stats.status301}`);
        console.log(`   308 Redirects (Need Fix): ${this.stats.status308}`);
        console.log(`   Other Status Codes: ${this.stats.otherStatus}`);
        console.log(`   Errors: ${this.stats.errors}`);
        
        const successRate = this.stats.totalTests > 0 ? 
            ((this.stats.status301 / this.stats.totalTests) * 100).toFixed(2) : 0;
        console.log(`   Success Rate: ${successRate}%`);
        
        if (this.stats.status308 > 0) {
            console.log('\n❌ Redirects that still return 308:');
            this.testResults
                .filter(result => result.status === 308)
                .forEach(result => {
                    console.log(`   - ${result.path} → ${result.location}`);
                });
        }
        
        if (this.errors.length > 0) {
            console.log('\n❌ Errors:');
            this.errors.forEach(error => console.log(`   ${error}`));
        }
        
        console.log('\n🎯 Recommendations:');
        if (this.stats.status308 > 0) {
            console.log('   ⚠️  Some redirects still return 308 status codes.');
            console.log('   🔧 Run the fix script: node fix-308-to-301-redirects.js');
            console.log('   🚀 Deploy the updated vercel.json to Vercel');
        } else if (this.stats.status301 > 0) {
            console.log('   ✅ All redirects are returning 301 status codes!');
            console.log('   🎉 Your redirect configuration is correct.');
        } else {
            console.log('   ℹ️  No redirects found or all URLs return 200 status codes.');
        }
    }
}

// Run the script
if (require.main === module) {
    const tester = new RedirectStatusTester();
    tester.run().catch(console.error);
}

module.exports = RedirectStatusTester;
