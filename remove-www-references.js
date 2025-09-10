#!/usr/bin/env node

/**
 * Remove WWW References Script
 * 
 * This script removes all siteoptz.ai references from the codebase
 * to eliminate 308 redirects and standardize on non-www URLs
 */

const fs = require('fs');
const path = require('path');

class WWWRemover {
    constructor() {
        this.baseDir = process.cwd();
        this.filesUpdated = 0;
        this.errors = [];
        this.stats = {
            wwwReferencesRemoved: 0,
            filesProcessed: 0,
            totalReplacements: 0
        };
    }

    /**
     * Main execution function
     */
    async run() {
        console.log('🔧 Starting WWW Reference Removal Process...\n');
        
        try {
            await this.findAndReplaceWWWReferences();
            await this.updateCanonicalUrls();
            await this.updateSitemaps();
            await this.updateInternalLinks();
            await this.generateReport();
            
            console.log('\n✅ WWW Reference Removal Completed!');
            this.printResults();
            
        } catch (error) {
            console.error('❌ Error during WWW removal:', error.message);
            this.errors.push(error.message);
        }
    }

    /**
     * Find and replace www references in all files
     */
    async findAndReplaceWWWReferences() {
        console.log('🔍 Searching for www references...');
        
        const fileExtensions = ['.js', '.ts', '.tsx', '.jsx', '.php', '.html', '.css', '.scss', '.json', '.md'];
        const excludeDirs = ['node_modules', '.git', '.next', 'dist', 'build'];
        
        const files = this.getAllFiles(this.baseDir, fileExtensions, excludeDirs);
        
        for (const file of files) {
            try {
                const content = fs.readFileSync(file, 'utf8');
                const originalContent = content;
                
                // Replace siteoptz.ai with siteoptz.ai
                let updatedContent = content.replace(/www\.siteoptz\.ai/g, 'siteoptz.ai');
                
                // Replace https://siteoptz.ai with https://siteoptz.ai
                updatedContent = updatedContent.replace(/https:\/\/www\.siteoptz\.ai/g, 'https://siteoptz.ai');
                
                // Replace http://siteoptz.ai with http://siteoptz.ai
                updatedContent = updatedContent.replace(/http:\/\/www\.siteoptz\.ai/g, 'http://siteoptz.ai');
                
                if (updatedContent !== originalContent) {
                    fs.writeFileSync(file, updatedContent);
                    this.filesUpdated++;
                    
                    const replacements = (originalContent.match(/www\.siteoptz\.ai/g) || []).length;
                    this.stats.wwwReferencesRemoved += replacements;
                    this.stats.totalReplacements += replacements;
                    
                    console.log(`✅ Updated: ${path.relative(this.baseDir, file)} (${replacements} replacements)`);
                }
                
                this.stats.filesProcessed++;
                
            } catch (error) {
                console.error(`❌ Error processing ${file}:`, error.message);
                this.errors.push(`Error processing ${file}: ${error.message}`);
            }
        }
    }

    /**
     * Update canonical URLs to use non-www
     */
    async updateCanonicalUrls() {
        console.log('\n🔗 Updating canonical URLs...');
        
        const canonicalFiles = [
            'src/app/layout.tsx',
            'src/app/layout.js',
            'src/pages/_app.tsx',
            'src/pages/_app.js',
            'src/pages/_document.tsx',
            'src/pages/_document.js',
            'theme/header.php',
            'theme/functions.php'
        ];
        
        for (const file of canonicalFiles) {
            const filePath = path.join(this.baseDir, file);
            if (fs.existsSync(filePath)) {
                try {
                    let content = fs.readFileSync(filePath, 'utf8');
                    const originalContent = content;
                    
                    // Update canonical URL patterns
                    content = content.replace(
                        /<link[^>]*rel=["']canonical["'][^>]*href=["']https:\/\/www\.siteoptz\.ai([^"']*)["'][^>]*>/g,
                        '<link rel="canonical" href="https://siteoptz.ai$1">'
                    );
                    
                    // Update meta property="og:url"
                    content = content.replace(
                        /<meta[^>]*property=["']og:url["'][^>]*content=["']https:\/\/www\.siteoptz\.ai([^"']*)["'][^>]*>/g,
                        '<meta property="og:url" content="https://siteoptz.ai$1">'
                    );
                    
                    if (content !== originalContent) {
                        fs.writeFileSync(filePath, content);
                        console.log(`✅ Updated canonical URLs in: ${file}`);
                    }
                    
                } catch (error) {
                    console.error(`❌ Error updating canonical URLs in ${file}:`, error.message);
                }
            }
        }
    }

    /**
     * Update sitemaps to use non-www
     */
    async updateSitemaps() {
        console.log('\n🗺️  Updating sitemaps...');
        
        const sitemapFiles = [
            'public/sitemap.xml',
            'public/sitemap-main.xml',
            'public/sitemap-tools.xml',
            'public/sitemap-comparisons.xml',
            'src/app/sitemap.ts',
            'src/app/sitemap.js'
        ];
        
        for (const file of sitemapFiles) {
            const filePath = path.join(this.baseDir, file);
            if (fs.existsSync(filePath)) {
                try {
                    let content = fs.readFileSync(filePath, 'utf8');
                    const originalContent = content;
                    
                    // Update sitemap URLs
                    content = content.replace(/https:\/\/www\.siteoptz\.ai/g, 'https://siteoptz.ai');
                    
                    if (content !== originalContent) {
                        fs.writeFileSync(filePath, content);
                        console.log(`✅ Updated sitemap: ${file}`);
                    }
                    
                } catch (error) {
                    console.error(`❌ Error updating sitemap ${file}:`, error.message);
                }
            }
        }
    }

    /**
     * Update internal links
     */
    async updateInternalLinks() {
        console.log('\n🔗 Updating internal links...');
        
        const linkFiles = [
            'src/components',
            'src/pages',
            'src/app',
            'theme',
            'templates'
        ];
        
        for (const dir of linkFiles) {
            const dirPath = path.join(this.baseDir, dir);
            if (fs.existsSync(dirPath)) {
                const files = this.getAllFiles(dirPath, ['.js', '.ts', '.tsx', '.jsx', '.php', '.html'], []);
                
                for (const file of files) {
                    try {
                        let content = fs.readFileSync(file, 'utf8');
                        const originalContent = content;
                        
                        // Update internal link patterns
                        content = content.replace(
                            /href=["']https:\/\/www\.siteoptz\.ai([^"']*)["']/g,
                            'href="https://siteoptz.ai$1"'
                        );
                        
                        content = content.replace(
                            /src=["']https:\/\/www\.siteoptz\.ai([^"']*)["']/g,
                            'src="https://siteoptz.ai$1"'
                        );
                        
                        if (content !== originalContent) {
                            fs.writeFileSync(file, content);
                            console.log(`✅ Updated internal links in: ${path.relative(this.baseDir, file)}`);
                        }
                        
                    } catch (error) {
                        console.error(`❌ Error updating internal links in ${file}:`, error.message);
                    }
                }
            }
        }
    }

    /**
     * Get all files with specified extensions
     */
    getAllFiles(dir, extensions, excludeDirs) {
        const files = [];
        
        const walkDir = (currentDir) => {
            const items = fs.readdirSync(currentDir);
            
            for (const item of items) {
                const fullPath = path.join(currentDir, item);
                const stat = fs.statSync(fullPath);
                
                if (stat.isDirectory()) {
                    if (!excludeDirs.includes(item)) {
                        walkDir(fullPath);
                    }
                } else if (stat.isFile()) {
                    const ext = path.extname(item);
                    if (extensions.includes(ext)) {
                        files.push(fullPath);
                    }
                }
            }
        };
        
        walkDir(dir);
        return files;
    }

    /**
     * Generate removal report
     */
    async generateReport() {
        const report = {
            timestamp: new Date().toISOString(),
            stats: this.stats,
            filesUpdated: this.filesUpdated,
            errors: this.errors,
            recommendations: [
                'Remove siteoptz.ai from Vercel domain settings',
                'Remove www CNAME record from DNS',
                'Test all URLs to ensure no 308 redirects',
                'Update Google Search Console if needed',
                'Monitor for any remaining www references'
            ]
        };
        
        const reportPath = path.join(this.baseDir, 'www-removal-report.json');
        fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));
        console.log(`\n📊 Report saved to: ${reportPath}`);
    }

    /**
     * Print results summary
     */
    printResults() {
        console.log('\n📈 WWW Removal Results:');
        console.log(`   Files Processed: ${this.stats.filesProcessed}`);
        console.log(`   Files Updated: ${this.filesUpdated}`);
        console.log(`   WWW References Removed: ${this.stats.wwwReferencesRemoved}`);
        console.log(`   Total Replacements: ${this.stats.totalReplacements}`);
        
        if (this.errors.length > 0) {
            console.log(`\n❌ Errors (${this.errors.length}):`);
            this.errors.forEach(error => console.log(`   ${error}`));
        }
        
        console.log('\n🎯 Next Steps:');
        console.log('   1. Remove siteoptz.ai from Vercel domain settings');
        console.log('   2. Remove www CNAME record from DNS');
        console.log('   3. Test URLs to ensure no 308 redirects');
        console.log('   4. Update any remaining hardcoded www references');
        console.log('   5. Monitor Google Search Console for issues');
    }
}

// Run the script
if (require.main === module) {
    const remover = new WWWRemover();
    remover.run().catch(console.error);
}

module.exports = WWWRemover;
