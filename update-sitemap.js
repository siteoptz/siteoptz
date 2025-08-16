const fs = require('fs');
const path = require('path');

// Load the summary data
const summaryData = JSON.parse(
  fs.readFileSync(path.join(__dirname, 'data/summary.json'), 'utf8')
);

// Load existing tools data
const toolsData = JSON.parse(
  fs.readFileSync(path.join(__dirname, 'aiToolsData.json'), 'utf8')
);

// Generate sitemap XML
const generateSitemap = () => {
  const baseUrl = 'https://www.siteoptz.ai';
  const currentDate = new Date().toISOString().split('T')[0];
  
  let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <!-- Homepage -->
  <url>
    <loc>${baseUrl}/</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
  
  <!-- Tools Directory -->
  <url>
    <loc>${baseUrl}/tools</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>
  
  <!-- Categories Index -->
  <url>
    <loc>${baseUrl}/categories</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>
  
  <!-- Compare Index -->
  <url>
    <loc>${baseUrl}/compare</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
  
  <!-- Reviews Index -->
  <url>
    <loc>${baseUrl}/reviews</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
  
  <!-- Data Room -->
  <url>
    <loc>${baseUrl}/data-room</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>`;

  // Add category pages
  summaryData.categories.forEach(category => {
    sitemap += `
  <!-- ${category.name} Category -->
  <url>
    <loc>${baseUrl}/categories/${category.slug}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`;
  });

  // Add tool review pages
  toolsData.forEach(tool => {
    const toolSlug = tool.tool_name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
    sitemap += `
  <!-- ${tool.tool_name} Review -->
  <url>
    <loc>${baseUrl}/reviews/${toolSlug}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
  </url>`;
  });

  // Add tool detail pages
  toolsData.forEach(tool => {
    const toolSlug = tool.tool_name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
    sitemap += `
  <!-- ${tool.tool_name} Details -->
  <url>
    <loc>${baseUrl}/tools/${toolSlug}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.6</priority>
  </url>`;
  });

  sitemap += `
</urlset>`;

  return sitemap;
};

// Generate robots.txt
const generateRobotsTxt = () => {
  return `User-agent: *
Allow: /

# Sitemap
Sitemap: https://www.siteoptz.ai/sitemap.xml

# Crawl delay (optional)
Crawl-delay: 1

# Disallow admin areas (if any)
Disallow: /admin/
Disallow: /api/
Disallow: /_next/
Disallow: /node_modules/

# Allow all public pages
Allow: /
Allow: /tools/
Allow: /categories/
Allow: /reviews/
Allow: /compare/
Allow: /data-room
Allow: /contact
Allow: /about`;
};

// Write sitemap.xml to public directory
const sitemapContent = generateSitemap();
fs.writeFileSync(path.join(__dirname, 'public/sitemap.xml'), sitemapContent);

// Write robots.txt to public directory
const robotsContent = generateRobotsTxt();
fs.writeFileSync(path.join(__dirname, 'public/robots.txt'), robotsContent);

// Generate a sitemap index for large sites (if needed)
const generateSitemapIndex = () => {
  const baseUrl = 'https://www.siteoptz.ai';
  const currentDate = new Date().toISOString().split('T')[0];
  
  return `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <sitemap>
    <loc>${baseUrl}/sitemap.xml</loc>
    <lastmod>${currentDate}</lastmod>
  </sitemap>
</sitemapindex>`;
};

// Stats
const totalUrls = 6 + summaryData.categories.length + (toolsData.length * 2); // base pages + categories + reviews + tools

console.log('✅ Sitemap and robots.txt generated successfully!');
console.log(`📊 Sitemap Statistics:`);
console.log(`   - Total URLs: ${totalUrls}`);
console.log(`   - Categories: ${summaryData.categories.length}`);
console.log(`   - Tool Reviews: ${toolsData.length}`);
console.log(`   - Tool Details: ${toolsData.length}`);
console.log(`   - Base Pages: 6`);
console.log(`📁 Files created:`);
console.log(`   - public/sitemap.xml`);
console.log(`   - public/robots.txt`);