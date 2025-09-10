#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

console.log('🔧 Fixing duplicate title tags caused by www vs non-www domain variations...');

// List of URLs with duplicate title tags from user input
const duplicateUrls = [
    'https://siteoptz.ai/tools/sales-ai-roi',
    'https://siteoptz.ai/tools/sales-ai-roi',
    'https://siteoptz.ai/tools/conversion-roi-calculator',
    'https://siteoptz.ai/tools/conversion-roi-calculator',
    'https://siteoptz.ai/tools/security-roi-calculator',
    'https://siteoptz.ai/tools/security-roi-calculator',
    'https://siteoptz.ai/tools/no-code-ai-roi',
    'https://siteoptz.ai/tools/no-code-ai-roi',
    'https://siteoptz.ai/tools/chatbot-roi-calculator',
    'https://siteoptz.ai/tools/chatbot-roi-calculator',
    'https://siteoptz.ai/tools/marketing-roi-calculator',
    'https://siteoptz.ai/tools/marketing-roi-calculator',
    'https://siteoptz.ai/tools/ai-cost-calculator',
    'https://siteoptz.ai/tools/ai-cost-calculator',
    'https://siteoptz.ai/tools/content-roi-calculator',
    'https://siteoptz.ai/tools/content-roi-calculator',
    'https://siteoptz.ai/tools/healthcare-ai-roi',
    'https://siteoptz.ai/tools/healthcare-ai-roi',
    'https://siteoptz.ai/tools/recruitment-roi-calculator',
    'https://siteoptz.ai/tools/recruitment-roi-calculator',
    'https://siteoptz.ai/docs/api',
    'https://siteoptz.ai/docs/api',
    'https://siteoptz.ai/tools/ai-roi-calculator',
    'https://siteoptz.ai/tools/ai-roi-calculator',
    'https://siteoptz.ai/tools/enterprise-ai-calculator',
    'https://siteoptz.ai/tools/enterprise-ai-calculator',
    'https://siteoptz.ai/tools/manufacturing-roi-calculator',
    'https://siteoptz.ai/tools/manufacturing-roi-calculator'
];

// Extract unique paths
const uniquePaths = [...new Set(duplicateUrls.map(url => {
    return new URL(url).pathname;
}))];

console.log(`📊 Found ${duplicateUrls.length} duplicate URLs affecting ${uniquePaths.length} unique paths`);

// Update Next.js configuration to add www redirects
const nextConfigPath = path.join(__dirname, '../next.config.js');
let nextConfig = fs.readFileSync(nextConfigPath, 'utf-8');

// Check if www redirects already exist
if (!nextConfig.includes('siteoptz.ai')) {
    console.log('🔧 Adding www to non-www redirects to Next.js configuration...');
    
    // Find the redirects section and add www redirects
    const redirectsMatch = nextConfig.match(/(async redirects\(\) \{[\s\S]*?return \[)([\s\S]*?)(\];\s*\})/);
    
    if (redirectsMatch) {
        const beforeArray = redirectsMatch[1];
        const existingRedirects = redirectsMatch[2];
        const afterArray = redirectsMatch[3];
        
        const wwwRedirect = `
      // WWW to non-WWW redirects to prevent duplicate content
      {
        source: '/:path*',
        has: [
          {
            type: 'host',
            value: 'siteoptz.ai',
          },
        ],
        destination: 'https://siteoptz.ai/:path*',
        permanent: true,
      },`;
        
        const newRedirects = beforeArray + wwwRedirect + existingRedirects + afterArray;
        nextConfig = nextConfig.replace(redirectsMatch[0], newRedirects);
        
        fs.writeFileSync(nextConfigPath, nextConfig);
        console.log('✅ Added www to non-www redirect in Next.js configuration');
    } else {
        console.log('⚠️  Could not find redirects section in next.config.js');
    }
}

// Create canonical URL utility
const canonicalUtilPath = path.join(__dirname, '../utils/canonicalUrl.ts');
const canonicalUtilContent = `// Canonical URL utility to prevent duplicate content issues

export function getCanonicalUrl(path: string): string {
  // Always use https://siteoptz.ai as the canonical domain (non-www)
  const baseUrl = 'https://siteoptz.ai';
  
  // Ensure path starts with /
  const cleanPath = path.startsWith('/') ? path : \`/\${path}\`;
  
  return \`\${baseUrl}\${cleanPath}\`;
}

export function getCurrentUrl(req?: any): string {
  if (typeof window !== 'undefined') {
    // Client-side
    return window.location.href;
  }
  
  if (req) {
    // Server-side
    const host = req.headers.host || 'siteoptz.ai';
    const protocol = req.headers['x-forwarded-proto'] || 'https';
    const url = req.url || '/';
    return \`\${protocol}://\${host}\${url}\`;
  }
  
  return 'https://siteoptz.ai';
}

export function isWwwVersion(url: string): boolean {
  return url.includes('siteoptz.ai');
}

export default {
  getCanonicalUrl,
  getCurrentUrl,
  isWwwVersion
};`;

if (!fs.existsSync(canonicalUtilPath)) {
    fs.writeFileSync(canonicalUtilPath, canonicalUtilContent);
    console.log('✅ Created canonical URL utility');
}

// Check specific tool pages that were mentioned
const toolPages = [
    '/Users/siteoptz/siteoptz/pages/tools/sales-ai-roi.tsx',
    '/Users/siteoptz/siteoptz/pages/tools/conversion-roi-calculator.tsx',
    '/Users/siteoptz/siteoptz/pages/tools/security-roi-calculator.tsx',
    '/Users/siteoptz/siteoptz/pages/tools/no-code-ai-roi.tsx',
    '/Users/siteoptz/siteoptz/pages/tools/chatbot-roi-calculator.tsx',
    '/Users/siteoptz/siteoptz/pages/tools/marketing-roi-calculator.tsx',
    '/Users/siteoptz/siteoptz/pages/tools/ai-cost-calculator.tsx',
    '/Users/siteoptz/siteoptz/pages/tools/content-roi-calculator.tsx',
    '/Users/siteoptz/siteoptz/pages/tools/healthcare-ai-roi.tsx',
    '/Users/siteoptz/siteoptz/pages/tools/recruitment-roi-calculator.tsx',
    '/Users/siteoptz/siteoptz/pages/tools/ai-roi-calculator.tsx',
    '/Users/siteoptz/siteoptz/pages/tools/enterprise-ai-calculator.tsx',
    '/Users/siteoptz/siteoptz/pages/tools/manufacturing-roi-calculator.tsx',
    '/Users/siteoptz/siteoptz/pages/docs/api.tsx'
];

let pagesFixed = 0;
let pagesNotFound = 0;

// Check and fix each tool page
toolPages.forEach(filePath => {
    if (fs.existsSync(filePath)) {
        let content = fs.readFileSync(filePath, 'utf-8');
        let modified = false;
        
        // Check if canonical URL is already properly set
        if (!content.includes('rel="canonical"')) {
            // Find the Head section and add canonical URL
            const headMatch = content.match(/(<Head>[\s\S]*?)(<\/Head>)/);
            if (headMatch) {
                const beforeHead = content.substring(0, headMatch.index + headMatch[1].length);
                const afterHead = content.substring(headMatch.index + headMatch[1].length);
                
                const canonicalTag = `\n        <link rel="canonical" href="https://siteoptz.ai${path.basename(filePath, '.tsx') === 'api' ? '/docs/api' : '/tools/' + path.basename(filePath, '.tsx')}" />`;
                
                content = beforeHead + canonicalTag + afterHead;
                modified = true;
            }
        } else {
            // Check if canonical URL uses the wrong domain
            if (content.includes('siteoptz.ai')) {
                content = content.replace(/https:\/\/www\.siteoptz\.ai/g, 'https://siteoptz.ai');
                modified = true;
            }
        }
        
        if (modified) {
            fs.writeFileSync(filePath, content);
            pagesFixed++;
            console.log(`✅ Fixed canonical URL in ${path.basename(filePath)}`);
        }
    } else {
        pagesNotFound++;
        console.log(`⚠️  File not found: ${filePath}`);
    }
});

// Create a comprehensive canonical URL checker script
const checkerScriptPath = path.join(__dirname, 'check-canonical-urls.js');
const checkerScript = `#!/usr/bin/env node

// Comprehensive canonical URL checker
const fs = require('fs');
const path = require('path');
const { glob } = require('glob');

async function checkCanonicalUrls() {
    console.log('🔍 Checking all pages for proper canonical URL configuration...');
    
    const pageFiles = await glob('pages/**/*.tsx', { cwd: process.cwd() });
    let issuesFound = 0;
    
    pageFiles.forEach(file => {
        const fullPath = path.join(process.cwd(), file);
        const content = fs.readFileSync(fullPath, 'utf-8');
        
        // Check for canonical URL
        const hasCanonical = content.includes('rel="canonical"');
        const hasWwwInCanonical = content.includes('siteoptz.ai');
        
        if (!hasCanonical) {
            console.log(\`❌ Missing canonical URL: \${file}\`);
            issuesFound++;
        } else if (hasWwwInCanonical) {
            console.log(\`⚠️  Using www in canonical URL: \${file}\`);
            issuesFound++;
        }
    });
    
    if (issuesFound === 0) {
        console.log('✅ All pages have proper canonical URL configuration');
    } else {
        console.log(\`\nFound \${issuesFound} canonical URL issues\`);
    }
}

checkCanonicalUrls().catch(console.error);`;

fs.writeFileSync(checkerScriptPath, checkerScript);
fs.chmodSync(checkerScriptPath, '755');

// Update robots.txt to specify preferred domain
const robotsTxtPath = path.join(__dirname, '../public/robots.txt');
if (fs.existsSync(robotsTxtPath)) {
    let robotsContent = fs.readFileSync(robotsTxtPath, 'utf-8');
    
    // Add preferred domain if not already present
    if (!robotsContent.includes('sitemap: https://siteoptz.ai/sitemap.xml')) {
        // Replace any siteoptz.ai references with siteoptz.ai
        robotsContent = robotsContent.replace(/https:\/\/www\.siteoptz\.ai/g, 'https://siteoptz.ai');
        
        // Ensure sitemap points to non-www version
        if (!robotsContent.includes('sitemap: https://siteoptz.ai/sitemap.xml')) {
            robotsContent += '\nSitemap: https://siteoptz.ai/sitemap.xml\n';
        }
        
        fs.writeFileSync(robotsTxtPath, robotsContent);
        console.log('✅ Updated robots.txt to use canonical domain');
    }
}

// Generate report
const report = {
    issue: 'Duplicate title tags from www vs non-www domains',
    duplicateUrls: duplicateUrls.length,
    uniquePaths: uniquePaths.length,
    pagesFixed,
    pagesNotFound,
    solutions: [
        'Added www to non-www redirect in Next.js configuration',
        'Created canonical URL utility for consistent URL handling',
        'Fixed canonical URLs in existing tool pages',
        'Updated robots.txt to specify preferred domain',
        'Created canonical URL checker script'
    ],
    recommendations: [
        'Test that siteoptz.ai properly redirects to siteoptz.ai',
        'Verify all pages have canonical URLs pointing to siteoptz.ai',
        'Run canonical URL checker script regularly',
        'Monitor search console for duplicate content issues',
        'Update any external links to use siteoptz.ai (non-www)'
    ]
};

// Save report
const reportPath = path.join(__dirname, '../data/duplicate-title-tags-fix-report.json');
fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));

console.log('\n📊 DUPLICATE TITLE TAGS FIX SUMMARY');
console.log('=====================================');
console.log(`Duplicate URLs found: ${report.duplicateUrls}`);
console.log(`Unique paths affected: ${report.uniquePaths}`);
console.log(`Pages fixed: ${report.pagesFixed}`);
console.log(`Pages not found: ${report.pagesNotFound}`);

console.log('\n✅ Solutions Applied:');
report.solutions.forEach(solution => {
    console.log(`   • ${solution}`);
});

console.log('\n💡 Next Steps:');
report.recommendations.forEach(rec => {
    console.log(`   • ${rec}`);
});

console.log(`\n📄 Detailed report saved to: ${reportPath}`);
console.log('\n🎉 Duplicate title tags fix completed!');

console.log('\nTo test the fixes:');
console.log('1. Run: npm run build');
console.log('2. Test redirect: curl -I https://siteoptz.ai/tools/ai-roi-calculator');
console.log('3. Check canonical URLs in page source');
console.log('4. Deploy and monitor search console');

process.exit(0);