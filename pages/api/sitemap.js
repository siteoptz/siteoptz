import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
  try {
    // Try to read the generated sitemap
    const sitemapPath = path.join(process.cwd(), 'public', 'sitemap.xml');
    
    if (fs.existsSync(sitemapPath)) {
      const sitemap = fs.readFileSync(sitemapPath, 'utf8');
      res.setHeader('Content-Type', 'application/xml');
      res.setHeader('Cache-Control', 'public, max-age=86400'); // Cache for 24 hours
      return res.status(200).send(sitemap);
    } else {
      // Generate a basic sitemap if file doesn't exist
      const sitemap = generateBasicSitemap();
      res.setHeader('Content-Type', 'application/xml');
      res.setHeader('Cache-Control', 'public, max-age=3600'); // Cache for 1 hour
      return res.status(200).send(sitemap);
    }
  } catch (error) {
    console.error('Sitemap error:', error);
    const basicSitemap = generateBasicSitemap();
    res.setHeader('Content-Type', 'application/xml');
    return res.status(200).send(basicSitemap);
  }
}

function generateBasicSitemap() {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://siteoptz.ai';
  const currentDate = new Date().toISOString().split('T')[0];
  
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${baseUrl}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>${baseUrl}/tools</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>${baseUrl}/comparisons</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>${baseUrl}/about</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.5</priority>
  </url>
</urlset>`;
}