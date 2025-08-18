#!/usr/bin/env node

/**
 * Create placeholder SVG logos for new AI tools
 */

const fs = require('fs');
const path = require('path');

const LOGO_DIR = path.join(__dirname, 'public', 'images', 'tools');

// New tools that need logos
const newToolLogos = [
  'anthropic-claude',
  'openai-gpt4', 
  'adobe-firefly',
  'huggingface-transformers',
  'replicate-ai',
  'cohere-ai',
  'stability-ai-stable-diffusion', 
  'anthropic-chatgpt-alternative'
];

/**
 * Generate SVG logo with tool name
 */
function generateSVGLogo(toolName, color = '#3B82F6') {
  const initials = toolName
    .split('-')
    .map(word => word.charAt(0).toUpperCase())
    .join('')
    .substring(0, 2);
  
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect width="64" height="64" rx="12" fill="${color}"/>
  <text x="32" y="40" text-anchor="middle" fill="white" font-family="Arial, sans-serif" font-size="20" font-weight="bold">${initials}</text>
</svg>`;
}

// Color scheme for different tool types
const colorScheme = {
  'anthropic-claude': '#FF6B35',
  'openai-gpt4': '#10A37F', 
  'adobe-firefly': '#FF0000',
  'huggingface-transformers': '#FFD21E',
  'replicate-ai': '#000000',
  'cohere-ai': '#39C5BB',
  'stability-ai-stable-diffusion': '#000000',
  'anthropic-chatgpt-alternative': '#7C3AED'
};

// Create logos directory if it doesn't exist
if (!fs.existsSync(LOGO_DIR)) {
  fs.mkdirSync(LOGO_DIR, { recursive: true });
}

console.log('🎨 Creating placeholder logos...\n');

newToolLogos.forEach((toolId, index) => {
  const logoPath = path.join(LOGO_DIR, `${toolId}-logo.svg`);
  
  if (!fs.existsSync(logoPath)) {
    const color = colorScheme[toolId] || '#3B82F6';
    const svgContent = generateSVGLogo(toolId, color);
    
    fs.writeFileSync(logoPath, svgContent, 'utf8');
    console.log(`  ${index + 1}. Created logo for ${toolId}`);
  } else {
    console.log(`  ${index + 1}. Logo already exists for ${toolId}`);
  }
});

console.log('\n✅ Placeholder logos created successfully!');
console.log(`📁 Location: ${LOGO_DIR}`);