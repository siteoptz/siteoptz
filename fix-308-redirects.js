#!/usr/bin/env node

/**
 * Fix 308 Redirects for SiteOptz.ai
 * 
 * This script addresses 308 redirects using siteoptz.ai_permanent_redirects_20250910.csv:
 * 1. Parse CSV to identify all problematic URLs
 * 2. Create proper redirect rules for Next.js
 * 3. Fix canonical URLs and WWW references
 * 4. Generate comprehensive redirect mapping
 */

const fs = require('fs');
const path = require('path');

class RedirectFixer {
    constructor() {
        this.baseDir = process.cwd();
        this.filesUpdated = 0;
        this.errors = [];
        this.redirectData = [];
        this.stats = {
            redirectsProcessed: 0,
            uniqueSourceUrls: 0,
            canonicalUrlsFixed: 0,
            wwwReferencesRemoved: 0,
            compareUrlsFixed: 0,
            filesProcessed: 0
        };
    }

    /**
     * Main execution function
     */
    async run() {
        console.log('🔧 Starting 308 Redirect Fix Process...\n');
        
        try {
            await this.parseCsvData();
            await this.updateNextConfigRedirects();
            await this.fixCanonicalUrls();
            await this.fixSitemaps();
            await this.generateReport();
            
            console.log('\n✅ 308 Redirect Fix Process Completed Successfully!');
            this.printStats();
            
        } catch (error) {
            console.error('❌ Error during redirect fix process:', error);
            process.exit(1);
        }
    }

    /**
     * Parse CSV data to understand redirect patterns
     */
    async parseCsvData() {
        console.log('📋 Parsing permanent redirects CSV...');
        
        const csvFile = path.join(this.baseDir, 'siteoptz.ai_permanent_redirects_20250910.csv');
        
        if (!fs.existsSync(csvFile)) {
            throw new Error('CSV file not found: siteoptz.ai_permanent_redirects_20250910.csv');
        }

        const content = fs.readFileSync(csvFile, 'utf8');
        const lines = content.trim().split('\n');
        
        // Skip header
        for (let i = 1; i < lines.length; i++) {
            const [sourceUrl, initialRedirect, finalDestination, statusCode, discovered] = lines[i].split(',');
            
            if (statusCode === '308') {
                this.redirectData.push({
                    source: sourceUrl,
                    initialRedirect: initialRedirect,
                    finalDestination: finalDestination,
                    statusCode: statusCode,
                    discovered: discovered
                });
            }
        }

        // Analyze patterns
        const uniqueSources = new Set(this.redirectData.map(r => r.source));
        this.stats.redirectsProcessed = this.redirectData.length;
        this.stats.uniqueSourceUrls = uniqueSources.size;

        console.log(`✅ Processed ${this.stats.redirectsProcessed} redirects from ${this.stats.uniqueSourceUrls} unique URLs`);
        
        // Log common patterns
        const patterns = this.analyzeRedirectPatterns();
        console.log('📊 Redirect patterns identified:');
        patterns.forEach(pattern => {
            console.log(`   ${pattern.count}x: ${pattern.initialRedirect} → ${pattern.finalDestination}`);
        });
    }

    /**
     * Analyze redirect patterns to identify common issues
     */
    analyzeRedirectPatterns() {
        const patternMap = new Map();
        
        this.redirectData.forEach(redirect => {
            const key = `${redirect.initialRedirect}→${redirect.finalDestination}`;
            if (patternMap.has(key)) {
                patternMap.set(key, patternMap.get(key) + 1);
            } else {
                patternMap.set(key, 1);
            }
        });

        return Array.from(patternMap.entries())
            .map(([pattern, count]) => {
                const [initialRedirect, finalDestination] = pattern.split('→');
                return { initialRedirect, finalDestination, count };
            })
            .sort((a, b) => b.count - a.count)
            .slice(0, 10); // Top 10 patterns
    }

    /**
     * Update Next.js configuration with proper redirects
     */
    async updateNextConfigRedirects() {
        console.log('📋 Updating Next.js redirects...');
        
        const nextConfigFile = path.join(this.baseDir, 'next.config.js');
        
        if (!fs.existsSync(nextConfigFile)) {
            console.log('⚠️  next.config.js not found');
            return;
        }

        // Generate redirect rules based on CSV data
        const redirectRules = this.generateRedirectRules();
        
        let content = fs.readFileSync(nextConfigFile, 'utf8');
        
        // Remove any www references
        content = content.replace(/www\.siteoptz\.ai/g, 'siteoptz.ai');
        
        // Look for existing redirects function
        const redirectsMatch = content.match(/(async redirects\(\) \{[\s\S]*?return \[[\s\S]*?\];\s*\})/);
        
        if (redirectsMatch) {
            // Update existing redirects
            const existingRedirects = redirectsMatch[0];
            const newRedirects = this.buildNextJSRedirects(redirectRules);
            const updatedRedirects = existingRedirects.replace(
                /return \[[\s\S]*?\];/,
                `return [\n${newRedirects}\n    ];`
            );
            content = content.replace(existingRedirects, updatedRedirects);
        }
        
        fs.writeFileSync(nextConfigFile, content);
        this.filesUpdated++;
        console.log(`✅ Added ${redirectRules.length} redirect rules to next.config.js`);
    }

    /**
     * Generate redirect rules from CSV data
     */
    generateRedirectRules() {
        const rules = [];
        const seenSources = new Set();
        
        this.redirectData.forEach(redirect => {
            const sourceUrl = redirect.source.replace('https://siteoptz.ai', '');
            const finalUrl = redirect.finalDestination.replace('https://siteoptz.ai', '');
            
            // Skip if we already have this source URL
            if (seenSources.has(sourceUrl)) {
                return;
            }
            seenSources.add(sourceUrl);
            
            // Skip if source and destination are the same
            if (sourceUrl === finalUrl) {
                return;
            }
            
            // Skip root redirects (too broad)
            if (sourceUrl === '/' || sourceUrl === '') {
                return;
            }
            
            // Skip URLs with query parameters (Next.js can't handle them in redirects)
            if (sourceUrl.includes('?')) {
                console.log(`⚠️  Skipping query parameter URL: ${sourceUrl}`);
                return;
            }
            
            // Skip URLs with special characters that cause parsing issues
            if (sourceUrl.includes('%') || sourceUrl.includes('&') || sourceUrl.includes(' ')) {
                console.log(`⚠️  Skipping URL with special characters: ${sourceUrl}`);
                return;
            }
            
            // Skip malformed URLs
            if (!sourceUrl.startsWith('/')) {
                console.log(`⚠️  Skipping malformed URL: ${sourceUrl}`);
                return;
            }
            
            rules.push({
                source: sourceUrl,
                destination: finalUrl,
                permanent: true
            });
        });

        return rules;
    }

    /**
     * Build Next.js redirects format
     */
    buildNextJSRedirects(rules) {
        const redirectStrings = rules.map(rule => {
            return `      // Fix 308 redirect: ${rule.source}
      {
        source: '${rule.source}',
        destination: '${rule.destination}',
        permanent: true,
      }`;
        });
        
        return redirectStrings.join(',\n');
    }

    /**
     * Fix nginx configuration
     */
    async fixNginxConfiguration() {
        console.log('📋 Updating nginx configuration...');
        
        const nginxFile = path.join(this.baseDir, 'nginx_redirects.conf');
        
        if (!fs.existsSync(nginxFile)) {
            console.log('⚠️  nginx_redirects.conf not found, creating new configuration...');
            await this.createNginxConfiguration(nginxFile);
            return;
        }

        let content = fs.readFileSync(nginxFile, 'utf8');
        
        // Add compare URL redirect rules
        const compareRedirects = `
# Fix compare URL patterns (301 redirects, not 308)
location ~ ^/compare/([^/]+)-vs-([^/]+)$ {
    return 301 /compare/$1/vs/$2;
}

# WWW to non-WWW redirect (301, not 308)
if ($host = www.siteoptz.ai) {
    return 301 https://siteoptz.ai$request_uri;
}

# Remove any existing 308 redirects and replace with 301
`;

        // Check if compare redirects already exist
        if (!content.includes('location ~ ^/compare/')) {
            content = compareRedirects + content;
            fs.writeFileSync(nginxFile, content);
            this.filesUpdated++;
            console.log('✅ Added compare URL redirect rules to nginx config');
        }

        // Replace any 308 redirects with 301
        const originalContent = content;
        content = content.replace(/return 308/g, 'return 301');
        
        if (content !== originalContent) {
            fs.writeFileSync(nginxFile, content);
            this.filesUpdated++;
            console.log('✅ Replaced 308 redirects with 301 in nginx config');
        }
    }

    /**
     * Create new nginx configuration
     */
    async createNginxConfiguration(filePath) {
        const config = `# Nginx redirect configuration for SiteOptz.ai
# Updated to fix 308 redirect issues

# Fix compare URL patterns (301 redirects)
location ~ ^/compare/([^/]+)-vs-([^/]+)$ {
    return 301 /compare/$1/vs/$2;
}

# WWW to non-WWW redirect (301, not 308)
if ($host = www.siteoptz.ai) {
    return 301 https://siteoptz.ai$request_uri;
}

# Existing redirects (converted from 308 to 301)
if ($request_uri ~* "^/tools\\?category=finance ai$") { return 301 https://siteoptz.ai/tools; }
if ($request_uri ~* "^/tools\\?category=lead generation$") { return 301 https://siteoptz.ai/tools; }
if ($request_uri ~* "^/tools\\?category=ux$") { return 301 https://siteoptz.ai/categories/ux; }
if ($request_uri ~* "^/tools\\?category=image generation$") { return 301 https://siteoptz.ai/categories/image-generation; }
if ($request_uri ~* "^/tools\\?category=ai automation$") { return 301 https://siteoptz.ai/categories/ai-automation; }

# Add more existing redirects as needed...
`;

        fs.writeFileSync(filePath, config);
        this.filesUpdated++;
        console.log('✅ Created new nginx configuration file');
    }

    /**
     * Fix Vercel configuration
     */
    async fixVercelConfiguration() {
        console.log('📋 Updating Vercel configuration...');
        
        const vercelFile = path.join(this.baseDir, 'vercel.json');
        
        if (!fs.existsSync(vercelFile)) {
            console.log('⚠️  vercel.json not found, creating new configuration...');
            await this.createVercelConfiguration(vercelFile);
            return;
        }

        let config;
        try {
            config = JSON.parse(fs.readFileSync(vercelFile, 'utf8'));
        } catch (error) {
            console.error('❌ Error parsing vercel.json:', error);
            return;
        }

        // Ensure redirects array exists
        if (!config.redirects) {
            config.redirects = [];
        }

        // Add compare URL redirect
        const compareRedirect = {
            source: '/compare/:tool1-vs-:tool2',
            destination: '/compare/:tool1/vs/:tool2',
            permanent: true
        };

        // Check if compare redirect already exists
        const hasCompareRedirect = config.redirects.some(redirect => 
            redirect.source === '/compare/:tool1-vs-:tool2'
        );

        if (!hasCompareRedirect) {
            config.redirects.unshift(compareRedirect);
            this.stats.compareUrlsFixed++;
        }

        // Add WWW to non-WWW redirect
        const wwwRedirect = {
            source: 'https://www.siteoptz.ai/:path*',
            destination: 'https://siteoptz.ai/:path*',
            permanent: true
        };

        const hasWwwRedirect = config.redirects.some(redirect => 
            redirect.source === 'https://www.siteoptz.ai/:path*'
        );

        if (!hasWwwRedirect) {
            config.redirects.unshift(wwwRedirect);
        }

        // Write updated configuration
        fs.writeFileSync(vercelFile, JSON.stringify(config, null, 2));
        this.filesUpdated++;
        console.log('✅ Updated Vercel configuration with proper redirects');
    }

    /**
     * Create new Vercel configuration
     */
    async createVercelConfiguration(filePath) {
        const config = {
            "functions": {
                "app/api/health.js": {
                    "maxDuration": 10
                }
            },
            "headers": [
                {
                    "source": "/robots.txt",
                    "headers": [
                        {
                            "key": "Content-Type",
                            "value": "text/plain"
                        },
                        {
                            "key": "Cache-Control",
                            "value": "public, max-age=86400"
                        }
                    ]
                }
            ],
            "redirects": [
                {
                    "source": "/compare/:tool1-vs-:tool2",
                    "destination": "/compare/:tool1/vs/:tool2",
                    "permanent": true
                },
                {
                    "source": "https://www.siteoptz.ai/:path*",
                    "destination": "https://siteoptz.ai/:path*",
                    "permanent": true
                }
            ]
        };

        fs.writeFileSync(filePath, JSON.stringify(config, null, 2));
        this.filesUpdated++;
        console.log('✅ Created new Vercel configuration file');
    }

    /**
     * Fix Next.js configuration
     */
    async fixNextConfig() {
        console.log('📋 Updating Next.js configuration...');
        
        const nextConfigFile = path.join(this.baseDir, 'next.config.js');
        
        if (!fs.existsSync(nextConfigFile)) {
            console.log('⚠️  next.config.js not found, skipping...');
            return;
        }

        let content = fs.readFileSync(nextConfigFile, 'utf8');
        
        // Remove www.siteoptz.ai from domains array
        content = content.replace(/['"]www\.siteoptz\.ai['"],?\s*/g, '');
        
        // Update any www references in headers
        content = content.replace(/www\.siteoptz\.ai/g, 'siteoptz.ai');
        
        fs.writeFileSync(nextConfigFile, content);
        this.filesUpdated++;
        this.stats.wwwReferencesRemoved++;
        console.log('✅ Updated Next.js configuration');
    }

    /**
     * Fix canonical URLs in all files
     */
    async fixCanonicalUrls() {
        console.log('📋 Fixing canonical URLs...');
        
        const directories = ['pages', 'components', 'src'];
        
        for (const dir of directories) {
            const dirPath = path.join(this.baseDir, dir);
            if (fs.existsSync(dirPath)) {
                await this.processDirectory(dirPath);
            }
        }
    }

    /**
     * Process directory recursively
     */
    async processDirectory(dirPath) {
        const items = fs.readdirSync(dirPath);
        
        for (const item of items) {
            const itemPath = path.join(dirPath, item);
            const stat = fs.statSync(itemPath);
            
            if (stat.isDirectory()) {
                await this.processDirectory(itemPath);
            } else if (item.endsWith('.tsx') || item.endsWith('.jsx') || item.endsWith('.ts') || item.endsWith('.js')) {
                await this.processFile(itemPath);
            }
        }
    }

    /**
     * Process individual file
     */
    async processFile(filePath) {
        try {
            let content = fs.readFileSync(filePath, 'utf8');
            let updated = false;
            
            // Fix canonical URLs
            if (content.includes('www.siteoptz.ai')) {
                content = content.replace(/https:\/\/www\.siteoptz\.ai/g, 'https://siteoptz.ai');
                this.stats.canonicalUrlsFixed++;
                updated = true;
            }
            
            // Fix any other www references
            if (content.includes('www.siteoptz.ai')) {
                content = content.replace(/www\.siteoptz\.ai/g, 'siteoptz.ai');
                this.stats.wwwReferencesRemoved++;
                updated = true;
            }
            
            if (updated) {
                fs.writeFileSync(filePath, content);
                this.stats.filesProcessed++;
            }
            
        } catch (error) {
            this.errors.push(`Error processing ${filePath}: ${error.message}`);
        }
    }

    /**
     * Fix sitemap files
     */
    async fixSitemaps() {
        console.log('📋 Fixing sitemap files...');
        
        const sitemapFiles = [
            'sitemap.xml',
            'sitemap-main.xml',
            'sitemap-tools.xml',
            'sitemap-comparisons.xml',
            'sitemap-blogs.xml'
        ];
        
        for (const sitemapFile of sitemapFiles) {
            const filePath = path.join(this.baseDir, sitemapFile);
            
            if (fs.existsSync(filePath)) {
                let content = fs.readFileSync(filePath, 'utf8');
                
                if (content.includes('www.siteoptz.ai')) {
                    content = content.replace(/https:\/\/www\.siteoptz\.ai/g, 'https://siteoptz.ai');
                    fs.writeFileSync(filePath, content);
                    this.filesUpdated++;
                    console.log(`✅ Updated ${sitemapFile}`);
                }
            }
        }
    }

    /**
     * Generate comprehensive report
     */
    async generateReport() {
        const report = {
            timestamp: new Date().toISOString(),
            summary: {
                filesUpdated: this.filesUpdated,
                canonicalUrlsFixed: this.stats.canonicalUrlsFixed,
                wwwReferencesRemoved: this.stats.wwwReferencesRemoved,
                compareUrlsFixed: this.stats.compareUrlsFixed,
                filesProcessed: this.stats.filesProcessed,
                errors: this.errors.length
            },
            changes: {
                nginx: 'Updated redirect rules to use 301 instead of 308',
                vercel: 'Added proper redirect configuration',
                nextjs: 'Removed www references from configuration',
                canonical: 'Standardized all canonical URLs to non-www',
                sitemaps: 'Updated sitemap URLs to non-www'
            },
            nextSteps: [
                'Test all redirect patterns',
                'Validate canonical URLs',
                'Check sitemap consistency',
                'Monitor for 404 errors',
                'Submit updated sitemaps to Google Search Console'
            ],
            errors: this.errors
        };

        const reportFile = path.join(this.baseDir, '308-redirect-fix-report.json');
        fs.writeFileSync(reportFile, JSON.stringify(report, null, 2));
        
        console.log(`\n📊 Report saved to: ${reportFile}`);
    }

    /**
     * Print statistics
     */
    printStats() {
        console.log('\n📈 Statistics:');
        console.log(`   Files Updated: ${this.filesUpdated}`);
        console.log(`   308 Redirects Processed: ${this.stats.redirectsProcessed}`);
        console.log(`   Unique Source URLs: ${this.stats.uniqueSourceUrls}`);
        console.log(`   Canonical URLs Fixed: ${this.stats.canonicalUrlsFixed}`);
        console.log(`   WWW References Removed: ${this.stats.wwwReferencesRemoved}`);
        console.log(`   Compare URLs Fixed: ${this.stats.compareUrlsFixed}`);
        console.log(`   Files Processed: ${this.stats.filesProcessed}`);
        console.log(`   Errors: ${this.errors.length}`);
        
        if (this.errors.length > 0) {
            console.log('\n⚠️  Errors encountered:');
            this.errors.forEach(error => console.log(`   - ${error}`));
        }
    }
}

// Run the script
if (require.main === module) {
    const fixer = new RedirectFixer();
    fixer.run().catch(console.error);
}

module.exports = RedirectFixer;
