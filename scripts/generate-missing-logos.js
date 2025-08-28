#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Missing logos identified from the broken image list
const missingLogos = [
  'adalysis-logo.svg',
  'acquisio-logo.svg', 
  'murf-ai-logo.svg',
  'mailchimp-logo.svg',
  'flux-logo.svg',
  'moz-logo.svg',
  'runwayml-logo.svg',
  'later-logo.svg',
  'speechmatics-logo.svg',
  'otter-ai-logo.svg',
  'hootsuite-logo.svg',
  'ahrefs-logo.svg',
  'sprout-social-logo.svg',
  'screaming-frog-logo.svg',
  'datarobot-logo.svg',
  'rev-logo.svg',
  'windsurf-logo.svg',
  'deepgram-logo.svg',
  'buffer-logo.svg'
];

// Tool name mappings for better display names
const toolNameMap = {
  'adalysis-logo.svg': 'Adalysis',
  'acquisio-logo.svg': 'Acquisio',
  'murf-ai-logo.svg': 'Murf AI',
  'mailchimp-logo.svg': 'Mailchimp',
  'flux-logo.svg': 'Flux',
  'moz-logo.svg': 'Moz',
  'runwayml-logo.svg': 'RunwayML',
  'later-logo.svg': 'Later',
  'speechmatics-logo.svg': 'Speechmatics',
  'otter-ai-logo.svg': 'Otter AI',
  'hootsuite-logo.svg': 'Hootsuite',
  'ahrefs-logo.svg': 'Ahrefs',
  'sprout-social-logo.svg': 'Sprout Social',
  'screaming-frog-logo.svg': 'Screaming Frog',
  'datarobot-logo.svg': 'DataRobot',
  'rev-logo.svg': 'Rev',
  'windsurf-logo.svg': 'Windsurf',
  'deepgram-logo.svg': 'Deepgram',
  'buffer-logo.svg': 'Buffer'
};

// Brand colors for different tool categories
const brandColors = {
  'adalysis': '#FF6B35',
  'acquisio': '#00B4D8',
  'murf-ai': '#6C5CE7',
  'mailchimp': '#FFE01B',
  'flux': '#FF6B6B',
  'moz': '#1E88E5',
  'runwayml': '#00D9FF',
  'later': '#4ECDC4',
  'speechmatics': '#6366F1',
  'otter-ai': '#007ACC',
  'hootsuite': '#1DA1F2',
  'ahrefs': '#FF7A00',
  'sprout-social': '#59CB59',
  'screaming-frog': '#4CAF50',
  'datarobot': '#1976D2',
  'rev': '#FF4757',
  'windsurf': '#00BCD4',
  'deepgram': '#5C6BC0',
  'buffer': '#168DD1'
};

function generateLogoSVG(toolName, fileName) {
  const toolKey = fileName.replace('-logo.svg', '');
  const color = brandColors[toolKey] || '#4F46E5';
  const initials = toolName.split(' ')
    .map(word => word[0])
    .join('')
    .substring(0, 2)
    .toUpperCase();

  return `<svg width="120" height="120" viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="gradient-${toolKey}" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:${color};stop-opacity:1" />
      <stop offset="100%" style="stop-color:${adjustBrightness(color, -20)};stop-opacity:1" />
    </linearGradient>
  </defs>
  
  <!-- Background circle -->
  <circle cx="60" cy="60" r="50" fill="url(#gradient-${toolKey})" stroke="#ffffff" stroke-width="2"/>
  
  <!-- Tool initials -->
  <text x="60" y="75" font-family="Arial, sans-serif" font-size="32" font-weight="bold" 
        text-anchor="middle" fill="white" opacity="0.95">${initials}</text>
  
  <!-- Subtle accent -->
  <circle cx="60" cy="60" r="45" fill="none" stroke="rgba(255,255,255,0.2)" stroke-width="1"/>
  
  <!-- Small accent dot -->
  <circle cx="85" cy="35" r="4" fill="rgba(255,255,255,0.4)"/>
</svg>`;
}

// Helper function to adjust color brightness
function adjustBrightness(color, percent) {
  const num = parseInt(color.replace("#", ""), 16);
  const amt = Math.round(2.55 * percent);
  const R = (num >> 16) + amt;
  const G = (num >> 8 & 0x00FF) + amt;
  const B = (num & 0x0000FF) + amt;
  
  return "#" + (0x1000000 + (R < 255 ? R < 1 ? 0 : R : 255) * 0x10000 +
    (G < 255 ? G < 1 ? 0 : G : 255) * 0x100 +
    (B < 255 ? B < 1 ? 0 : B : 255)).toString(16).slice(1);
}

async function generateMissingLogos() {
  try {
    console.log('🎨 Generating missing tool logos...\n');
    
    const outputDir = path.join(__dirname, '../public/images/tools');
    
    // Ensure output directory exists
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    let generated = 0;
    let skipped = 0;

    for (const fileName of missingLogos) {
      const filePath = path.join(outputDir, fileName);
      
      // Skip if logo already exists
      if (fs.existsSync(filePath)) {
        console.log(`⏭️  Skipped ${fileName} (already exists)`);
        skipped++;
        continue;
      }

      const toolName = toolNameMap[fileName] || fileName.replace('-logo.svg', '').replace(/-/g, ' ');
      const svgContent = generateLogoSVG(toolName, fileName);
      
      fs.writeFileSync(filePath, svgContent, 'utf8');
      console.log(`✅ Generated ${fileName} for ${toolName}`);
      generated++;
    }

    console.log(`\n🎉 Logo generation complete!`);
    console.log(`📊 Generated: ${generated} new logos`);
    console.log(`⏭️  Skipped: ${skipped} existing logos`);
    console.log(`📁 Total logos in directory: ${fs.readdirSync(outputDir).filter(f => f.endsWith('.svg')).length}`);

  } catch (error) {
    console.error('❌ Error generating logos:', error.message);
    process.exit(1);
  }
}

// Run if called directly
if (require.main === module) {
  generateMissingLogos();
}

module.exports = { generateMissingLogos, generateLogoSVG };