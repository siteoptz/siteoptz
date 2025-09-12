#!/usr/bin/env node

/**
 * Generate Missing Tool Logos Script
 * Creates SVG placeholder logos for tools that don't have logo files
 */

const fs = require('fs');
const path = require('path');

console.log('🎨 Generating missing tool logos...\n');

// Load tools data
const toolsDataPath = path.join(process.cwd(), 'public/data/aiToolsData.json');
const toolsData = JSON.parse(fs.readFileSync(toolsDataPath, 'utf8'));

// Directories
const imagesDir = path.join(process.cwd(), 'public/images/tools');
const missingLogos = [];
let generatedCount = 0;

// Ensure images directory exists
if (!fs.existsSync(imagesDir)) {
  fs.mkdirSync(imagesDir, { recursive: true });
  console.log('✅ Created images/tools directory');
}

// Check which logos are missing
toolsData.forEach(tool => {
  const logoPath = tool.logo;
  if (logoPath) {
    // Convert logo path to filesystem path
    const filePath = path.join(process.cwd(), 'public', logoPath.replace(/^\//, ''));
    
    // Check if file exists in any format
    const extensions = ['.svg', '.png', '.jpg', '.jpeg'];
    const basePath = filePath.replace(/\.(svg|png|jpg|jpeg)$/, '');
    
    const exists = extensions.some(ext => {
      return fs.existsSync(basePath + ext);
    });
    
    if (!exists) {
      missingLogos.push({
        name: tool.name,
        slug: tool.slug,
        logoPath: logoPath,
        filePath: filePath
      });
    }
  }
});

console.log(`📊 Found ${missingLogos.length} tools with missing logos\n`);

// Generate SVG logos for missing tools
missingLogos.forEach((tool, index) => {
  console.log(`${index + 1}/${missingLogos.length} Generating logo for: ${tool.name}`);
  
  // Generate initials
  const getInitials = (name) => {
    if (!name) return 'AI';
    
    const cleanName = name
      .replace(/\s+(AI|GPT|Bot|App|Tool|Platform|Studio|Pro|Plus|Labs?)$/i, '')
      .trim();
    
    const words = cleanName.split(/[\s\-\.]+/).filter(w => w.length > 0);
    
    if (words.length === 0) return 'AI';
    
    if (words.length === 1) {
      return words[0].substring(0, 2).toUpperCase();
    } else {
      return (words[0][0] + (words[1] ? words[1][0] : '')).toUpperCase();
    }
  };

  // Generate consistent color
  const getColor = (name) => {
    const colors = [
      '#3B82F6', '#8B5CF6', '#10B981', '#F59E0B',
      '#EF4444', '#EC4899', '#06B6D4', '#84CC16',
      '#F97316', '#6366F1', '#14B8A6', '#F59E0B'
    ];
    
    let hash = 0;
    for (let i = 0; i < name.length; i++) {
      hash = ((hash << 5) - hash) + name.charCodeAt(i);
      hash = hash & hash;
    }
    
    return colors[Math.abs(hash) % colors.length];
  };

  const initials = getInitials(tool.name);
  const color = getColor(tool.name);
  const lighterColor = color + '20'; // Add transparency for gradient

  // Create SVG content
  const svgContent = `<svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="grad-${tool.slug}" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:${color};stop-opacity:1" />
      <stop offset="100%" style="stop-color:${color};stop-opacity:0.8" />
    </linearGradient>
  </defs>
  <rect width="64" height="64" rx="12" fill="url(#grad-${tool.slug})" />
  <text x="32" y="40" font-family="system-ui, -apple-system, sans-serif" font-size="20" font-weight="bold" fill="white" text-anchor="middle">${initials}</text>
</svg>`;

  // Write SVG file
  try {
    fs.writeFileSync(tool.filePath, svgContent);
    generatedCount++;
    console.log(`   ✅ Generated: ${path.basename(tool.filePath)}`);
  } catch (error) {
    console.log(`   ❌ Failed to generate: ${tool.name} - ${error.message}`);
  }
});

console.log('\n' + '='.repeat(60));
console.log(`🎉 Logo generation complete!`);
console.log(`   Generated: ${generatedCount} new logos`);
console.log(`   Failed: ${missingLogos.length - generatedCount} logos`);
console.log(`   Total tools: ${toolsData.length}`);

// Generate summary report
const reportPath = path.join(process.cwd(), 'logo-generation-report.json');
const report = {
  timestamp: new Date().toISOString(),
  totalTools: toolsData.length,
  missingLogos: missingLogos.length,
  generatedLogos: generatedCount,
  failedLogos: missingLogos.length - generatedCount,
  generatedFiles: missingLogos
    .slice(0, generatedCount)
    .map(tool => ({
      name: tool.name,
      slug: tool.slug,
      logoPath: tool.logoPath
    }))
};

fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));
console.log(`📋 Report saved: ${reportPath}`);
console.log('='.repeat(60));