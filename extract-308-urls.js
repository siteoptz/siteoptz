const fs = require('fs');

// Read the CSV file
const csvContent = fs.readFileSync('siteoptz.ai_permanent_redirects_20250910.csv', 'utf-8');
const lines = csvContent.split('\n').slice(1); // Skip header

// Extract unique URLs with 308 status
const urls308 = new Set();
const redirectData = [];

for (const line of lines) {
    if (line.trim()) {
        const parts = line.split(',');
        const url = parts[0];
        const statusCode = parts[3];
        
        if (statusCode === '308' && url && url.startsWith('http')) {
            // Extract path from URL
            try {
                const urlObj = new URL(url);
                const path = urlObj.pathname;
                urls308.add(path);
                redirectData.push({
                    path: path,
                    url: url,
                    destination: parts[2] // Final destination
                });
            } catch (e) {
                console.error('Invalid URL:', url);
            }
        }
    }
}

// Get existing vercel.json
const vercelConfig = JSON.parse(fs.readFileSync('vercel.json', 'utf-8'));
const existingRedirects = new Set(vercelConfig.redirects.map(r => r.source));

// Find paths that need to be added
const pathsToAdd = [];
for (const path of urls308) {
    if (!existingRedirects.has(path)) {
        pathsToAdd.push(path);
    }
}

console.log(`\nFound ${urls308.size} unique paths with 308 status`);
console.log(`${pathsToAdd.length} paths need to be added to vercel.json\n`);

// Group paths by pattern
const rootPaths = [];
const caseStudyPaths = [];
const categoryPaths = [];
const otherPaths = [];

for (const path of pathsToAdd) {
    if (path.startsWith('/case-studies')) {
        caseStudyPaths.push(path);
    } else if (path.startsWith('/categories')) {
        categoryPaths.push(path);
    } else if (path === '/' || ['/about', '/blog', '/careers', '/contact', '/pricing', '/resources', '/testimonials', '/why-us'].includes(path)) {
        rootPaths.push(path);
    } else {
        otherPaths.push(path);
    }
}

// Create new redirect rules
const newRedirects = [];

// Add root and main page redirects
for (const path of rootPaths) {
    newRedirects.push({
        source: path,
        destination: '/tools',
        statusCode: 301
    });
}

// Add case studies redirects
for (const path of caseStudyPaths) {
    newRedirects.push({
        source: path,
        destination: '/tools',
        statusCode: 301
    });
}

// Add category redirects
for (const path of categoryPaths) {
    newRedirects.push({
        source: path,
        destination: '/tools',
        statusCode: 301
    });
}

// Add other redirects
for (const path of otherPaths) {
    newRedirects.push({
        source: path,
        destination: '/tools',
        statusCode: 301
    });
}

// Output the new redirects
console.log('New redirect rules to add:\n');
console.log(JSON.stringify(newRedirects, null, 2));

// Save to a file for review
fs.writeFileSync('new-301-redirects.json', JSON.stringify({
    summary: {
        total308Paths: urls308.size,
        pathsToAdd: pathsToAdd.length,
        rootPaths: rootPaths.length,
        caseStudyPaths: caseStudyPaths.length,
        categoryPaths: categoryPaths.length,
        otherPaths: otherPaths.length
    },
    redirects: newRedirects,
    allPaths: Array.from(urls308).sort()
}, null, 2));

console.log('\n✅ Redirect rules saved to new-301-redirects.json');
console.log('Review the file and then we can add them to vercel.json');