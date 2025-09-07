#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Load tools data
const toolsDataPath = path.join(__dirname, '..', 'public', 'data', 'aiToolsData.json');
const toolsData = JSON.parse(fs.readFileSync(toolsDataPath, 'utf8'));

const logoDir = path.join(__dirname, '..', 'public', 'images', 'tools');

// Create directory if it doesn't exist
if (!fs.existsSync(logoDir)) {
  fs.mkdirSync(logoDir, { recursive: true });
}

// Function to get existing logo files
function getExistingLogos() {
  if (!fs.existsSync(logoDir)) return new Set();
  return new Set(fs.readdirSync(logoDir).map(file => file.toLowerCase()));
}

// Function to generate color based on tool name
function generateColor(name) {
  const colors = [
    '#3B82F6', '#8B5CF6', '#06B6D4', '#10B981', '#F59E0B',
    '#EF4444', '#EC4899', '#84CC16', '#F97316', '#6366F1',
    '#14B8A6', '#F43F5E', '#A855F7', '#0EA5E9', '#22C55E',
    '#FBBF24', '#FB7185', '#4ADE80', '#38BDF8', '#C084FC'
  ];
  
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  return colors[Math.abs(hash) % colors.length];
}

// Function to darken a hex color
function darkenColor(hex, percent) {
  const num = parseInt(hex.replace("#", ""), 16);
  const amt = Math.round(2.55 * percent);
  const R = Math.max(0, Math.min(255, (num >> 16) + amt));
  const G = Math.max(0, Math.min(255, (num >> 8 & 0x00FF) + amt));
  const B = Math.max(0, Math.min(255, (num & 0x0000FF) + amt));
  return "#" + ((R << 16) + (G << 8) + B).toString(16).padStart(6, '0');
}

// SVG template with better design
function createSVGLogo(tool) {
  const color = generateColor(tool.name);
  const darkColor = darkenColor(color, -30);
  const initials = tool.name
    .split(/[\s\-_\.]+/)
    .filter(word => word.length > 0)
    .slice(0, 2)
    .map(word => word.charAt(0))
    .join('')
    .toUpperCase()
    .substring(0, 2);
  
  return `<svg width="64" height="64" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="grad-${tool.slug}" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:${color};stop-opacity:1" />
      <stop offset="100%" style="stop-color:${darkColor};stop-opacity:1" />
    </linearGradient>
    <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="2" stdDeviation="2" flood-opacity="0.3"/>
    </filter>
  </defs>
  <rect width="64" height="64" rx="12" fill="url(#grad-${tool.slug})" filter="url(#shadow)"/>
  <text x="32" y="38" font-family="system-ui, -apple-system, sans-serif" font-size="${initials.length === 1 ? '24' : '18'}" font-weight="600" text-anchor="middle" fill="white">
    ${initials}
  </text>
</svg>`;
}

// Main execution
console.log('🔍 Analyzing missing tool logos...');

const existingLogos = getExistingLogos();
const missingLogos = [];

toolsData.forEach(tool => {
  const expectedLogoFile = `${tool.slug}-logo.svg`.toLowerCase();
  if (!existingLogos.has(expectedLogoFile)) {
    missingLogos.push(tool);
  }
});

console.log(`📊 Analysis complete:`);
console.log(`   • Total tools: ${toolsData.length}`);
console.log(`   • Existing logos: ${existingLogos.size}`);
console.log(`   • Missing logos: ${missingLogos.length}`);

if (missingLogos.length === 0) {
  console.log('✅ All logos already exist!');
  process.exit(0);
}

console.log('\n🎨 Generating missing logos...');

let generated = 0;
missingLogos.forEach(tool => {
  try {
    const svgContent = createSVGLogo(tool);
    const filename = `${tool.slug}-logo.svg`;
    const filepath = path.join(logoDir, filename);
    
    fs.writeFileSync(filepath, svgContent);
    console.log(`✅ Created ${filename} for "${tool.name}"`);
    generated++;
  } catch (error) {
    console.error(`❌ Failed to create logo for ${tool.name}:`, error.message);
  }
});

console.log(`\n🎉 Generated ${generated} missing logos!`);
console.log(`📁 Logos saved to: ${logoDir}`);

// Verify all logos now exist
const finalExistingLogos = getExistingLogos();
const stillMissing = toolsData.filter(tool => {
  const expectedLogoFile = `${tool.slug}-logo.svg`.toLowerCase();
  return !finalExistingLogos.has(expectedLogoFile);
});

if (stillMissing.length === 0) {
  console.log('✅ Success! All tool logos now exist.');
} else {
  console.log(`⚠️  Warning: ${stillMissing.length} logos still missing:`);
  stillMissing.slice(0, 5).forEach(tool => {
    console.log(`   • ${tool.name} (${tool.slug})`);
  });
  if (stillMissing.length > 5) {
    console.log(`   • ...and ${stillMissing.length - 5} more`);
  }
}