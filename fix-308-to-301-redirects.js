#!/usr/bin/env node

/**
 * Fix 308 to 301 Redirects Script
 * 
 * This script updates vercel.json to change all redirects from 308 to 301 status codes
 */

const fs = require('fs');
const path = require('path');

class RedirectStatusFixer {
    constructor() {
        this.baseDir = process.cwd();
        this.vercelConfigPath = path.join(this.baseDir, 'vercel.json');
        this.backupPath = path.join(this.baseDir, 'vercel.json.backup');
        this.stats = {
            redirectsUpdated: 0,
            totalRedirects: 0,
            errors: []
        };
    }

    /**
     * Main execution function
     */
    async run() {
        console.log('🔧 Starting 308 to 301 Redirect Fix...\n');
        
        try {
            await this.backupCurrentConfig();
            await this.updateRedirectStatusCodes();
            await this.validateUpdatedConfig();
            await this.generateReport();
            
            console.log('\n✅ 308 to 301 Redirect Fix Completed!');
            this.printResults();
            
        } catch (error) {
            console.error('❌ Error during redirect fix:', error.message);
            this.stats.errors.push(error.message);
        }
    }

    /**
     * Backup current vercel.json
     */
    async backupCurrentConfig() {
        console.log('💾 Creating backup of current vercel.json...');
        
        if (fs.existsSync(this.vercelConfigPath)) {
            const content = fs.readFileSync(this.vercelConfigPath, 'utf8');
            fs.writeFileSync(this.backupPath, content);
            console.log(`✅ Backup created: ${this.backupPath}`);
        } else {
            throw new Error('vercel.json not found');
        }
    }

    /**
     * Update redirect status codes from 308 to 301
     */
    async updateRedirectStatusCodes() {
        console.log('🔄 Updating redirect status codes...');
        
        const content = fs.readFileSync(this.vercelConfigPath, 'utf8');
        let config;
        
        try {
            config = JSON.parse(content);
        } catch (error) {
            throw new Error('Invalid JSON in vercel.json');
        }
        
        if (!config.redirects || !Array.isArray(config.redirects)) {
            throw new Error('No redirects found in vercel.json');
        }
        
        this.stats.totalRedirects = config.redirects.length;
        
        // Update each redirect
        config.redirects.forEach((redirect, index) => {
            if (redirect.permanent === true) {
                // Remove permanent property and add statusCode
                delete redirect.permanent;
                redirect.statusCode = 301;
                this.stats.redirectsUpdated++;
                
                console.log(`✅ Updated redirect ${index + 1}: ${redirect.source} → ${redirect.destination}`);
            } else if (redirect.statusCode === 308) {
                // Change 308 to 301
                redirect.statusCode = 301;
                this.stats.redirectsUpdated++;
                
                console.log(`✅ Updated redirect ${index + 1}: ${redirect.source} → ${redirect.destination}`);
            } else if (!redirect.statusCode && !redirect.permanent) {
                // Add statusCode if missing
                redirect.statusCode = 301;
                this.stats.redirectsUpdated++;
                
                console.log(`✅ Added statusCode to redirect ${index + 1}: ${redirect.source} → ${redirect.destination}`);
            }
        });
        
        // Write updated config
        const updatedContent = JSON.stringify(config, null, 2);
        fs.writeFileSync(this.vercelConfigPath, updatedContent);
        
        console.log(`\n📝 Updated vercel.json with ${this.stats.redirectsUpdated} redirects`);
    }

    /**
     * Validate updated configuration
     */
    async validateUpdatedConfig() {
        console.log('\n🔍 Validating updated configuration...');
        
        const content = fs.readFileSync(this.vercelConfigPath, 'utf8');
        let config;
        
        try {
            config = JSON.parse(content);
        } catch (error) {
            throw new Error('Invalid JSON after update');
        }
        
        // Check for any remaining 308 redirects
        const remaining308s = config.redirects.filter(redirect => 
            redirect.statusCode === 308 || redirect.permanent === true
        );
        
        if (remaining308s.length > 0) {
            console.log(`⚠️  Warning: ${remaining308s.length} redirects still use 308 or permanent: true`);
            remaining308s.forEach(redirect => {
                console.log(`   - ${redirect.source} → ${redirect.destination}`);
            });
        } else {
            console.log('✅ All redirects now use 301 status codes');
        }
        
        // Check for any redirects without status codes
        const missingStatusCodes = config.redirects.filter(redirect => 
            !redirect.statusCode && !redirect.permanent
        );
        
        if (missingStatusCodes.length > 0) {
            console.log(`⚠️  Warning: ${missingStatusCodes.length} redirects missing status codes`);
            missingStatusCodes.forEach(redirect => {
                console.log(`   - ${redirect.source} → ${redirect.destination}`);
            });
        }
    }

    /**
     * Generate fix report
     */
    async generateReport() {
        const report = {
            timestamp: new Date().toISOString(),
            stats: this.stats,
            changes: {
                backupCreated: fs.existsSync(this.backupPath),
                redirectsUpdated: this.stats.redirectsUpdated,
                totalRedirects: this.stats.totalRedirects
            },
            nextSteps: [
                'Deploy the updated vercel.json to Vercel',
                'Test redirects to ensure they return 301 status codes',
                'Monitor Google Search Console for any issues',
                'Update any hardcoded redirect logic if needed'
            ],
            errors: this.stats.errors
        };
        
        const reportPath = path.join(this.baseDir, 'redirect-fix-report.json');
        fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));
        console.log(`\n📊 Report saved to: ${reportPath}`);
    }

    /**
     * Print results summary
     */
    printResults() {
        console.log('\n📈 Redirect Fix Results:');
        console.log(`   Total Redirects: ${this.stats.totalRedirects}`);
        console.log(`   Redirects Updated: ${this.stats.redirectsUpdated}`);
        console.log(`   Backup Created: ${fs.existsSync(this.backupPath) ? 'Yes' : 'No'}`);
        
        if (this.stats.errors.length > 0) {
            console.log(`\n❌ Errors (${this.stats.errors.length}):`);
            this.stats.errors.forEach(error => console.log(`   ${error}`));
        }
        
        console.log('\n🎯 Next Steps:');
        console.log('   1. Deploy the updated vercel.json to Vercel');
        console.log('   2. Test redirects: curl -I https://siteoptz.ai/compare/10web-vs-acquisio');
        console.log('   3. Verify status codes are now 301 instead of 308');
        console.log('   4. Monitor Google Search Console for any issues');
        
        if (this.stats.redirectsUpdated > 0) {
            console.log('\n✅ Success! All redirects updated to use 301 status codes.');
        } else {
            console.log('\n⚠️  No redirects were updated. Check your vercel.json configuration.');
        }
    }
}

// Run the script
if (require.main === module) {
    const fixer = new RedirectStatusFixer();
    fixer.run().catch(console.error);
}

module.exports = RedirectStatusFixer;
