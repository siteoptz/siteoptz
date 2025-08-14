#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Tool data with colors
const tools = [
  { name: 'ChatGPT', slug: 'chatgpt', color: '#10A37F', bgColor: '#FFFFFF' },
  { name: 'Claude', slug: 'claude', color: '#DE9B56', bgColor: '#FFFFFF' },
  { name: 'Jasper AI', slug: 'jasper-ai', color: '#7C3AED', bgColor: '#FFFFFF' },
  { name: 'Copy.ai', slug: 'copy-ai', color: '#FF6B6B', bgColor: '#FFFFFF' },
  { name: 'Writesonic', slug: 'writesonic', color: '#4F46E5', bgColor: '#FFFFFF' },
  { name: 'Surfer SEO', slug: 'surfer-seo', color: '#059669', bgColor: '#FFFFFF' },
  { name: 'Frase', slug: 'frase', color: '#F59E0B', bgColor: '#FFFFFF' },
  { name: 'Midjourney', slug: 'midjourney', color: '#000000', bgColor: '#FFFFFF' },
  { name: 'DALL-E', slug: 'dall-e', color: '#10A37F', bgColor: '#FFFFFF' },
  { name: 'Gemini', slug: 'gemini', color: '#4285F4', bgColor: '#FFFFFF' },
  { name: 'Perplexity AI', slug: 'perplexity-ai', color: '#6366F1', bgColor: '#FFFFFF' },
  { name: 'GitHub Copilot', slug: 'github-copilot', color: '#000000', bgColor: '#FFFFFF' },
  { name: 'Notion AI', slug: 'notion-ai', color: '#000000', bgColor: '#FFFFFF' },
];

// SVG template
function createSVGLogo(tool) {
  const initials = tool.name.split(' ').map(word => word.charAt(0)).join('').toUpperCase();
  
  return `<svg width="64" height="64" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="grad-${tool.slug}" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:${tool.color};stop-opacity:1" />
      <stop offset="100%" style="stop-color:${adjustColor(tool.color, -20)};stop-opacity:1" />
    </linearGradient>
  </defs>
  <rect width="64" height="64" rx="12" fill="url(#grad-${tool.slug})" />
  <text x="32" y="40" font-family="Arial, sans-serif" font-size="20" font-weight="bold" text-anchor="middle" fill="white">
    ${initials}
  </text>
</svg>`;
}

// Function to darken a hex color
function adjustColor(hex, percent) {
  const num = parseInt(hex.replace("#", ""), 16);
  const amt = Math.round(2.55 * percent);
  const R = (num >> 16) + amt;
  const G = (num >> 8 & 0x00FF) + amt;
  const B = (num & 0x0000FF) + amt;
  return "#" + (0x1000000 + (R < 255 ? R < 1 ? 0 : R : 255) * 0x10000 +
    (G < 255 ? G < 1 ? 0 : G : 255) * 0x100 +
    (B < 255 ? B < 1 ? 0 : B : 255)).toString(16).slice(1);
}

// Create directory if it doesn't exist
const logoDir = path.join(__dirname, '..', 'public', 'images', 'tools');
if (!fs.existsSync(logoDir)) {
  fs.mkdirSync(logoDir, { recursive: true });
}

// Generate logos
console.log('🎨 Generating AI tool logos...');

tools.forEach(tool => {
  const svgContent = createSVGLogo(tool);
  const filename = `${tool.slug}-logo.svg`;
  const filepath = path.join(logoDir, filename);
  
  fs.writeFileSync(filepath, svgContent);
  console.log(`✅ Created ${filename}`);
});

// Also create PNG versions using a fallback approach
console.log('\n📸 Creating PNG versions...');

tools.forEach(tool => {
  const filename = `${tool.slug}-logo.png`;
  const filepath = path.join(logoDir, filename);
  
  // Create a simple base64 PNG placeholder (1x1 transparent pixel)
  const transparentPNG = Buffer.from('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChAGA93Io8QAAAABJRU5ErkJggg==', 'base64');
  
  fs.writeFileSync(filepath, transparentPNG);
  console.log(`✅ Created placeholder ${filename}`);
});

console.log('\n🎉 All tool logos generated successfully!');
console.log(`📁 Logos saved to: ${logoDir}`);