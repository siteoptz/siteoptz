#!/usr/bin/env node

/**
 * Automatic Logo Generator for SiteOptz.ai
 * 
 * This script ensures all tools in the database have corresponding logo files.
 * It should be run automatically whenever tools are added to prevent broken image issues.
 */

const fs = require('fs');
const path = require('path');

class AutomaticLogoGenerator {
  constructor() {
    this.toolsDataPath = path.join(__dirname, '..', 'public', 'data', 'aiToolsData.json');
    this.logoDir = path.join(__dirname, '..', 'public', 'images', 'tools');
    this.placeholderLogoPath = path.join(__dirname, '..', 'public', 'images', 'placeholder-logo.svg');
    
    this.colors = [
      '#3B82F6', '#8B5CF6', '#06B6D4', '#10B981', '#F59E0B',
      '#EF4444', '#EC4899', '#84CC16', '#F97316', '#6366F1',
      '#14B8A6', '#F43F5E', '#A855F7', '#0EA5E9', '#22C55E',
      '#FBBF24', '#FB7185', '#4ADE80', '#38BDF8', '#C084FC',
      '#0891B2', '#9333EA', '#059669', '#DC2626', '#BE185D'
    ];
  }

  loadToolsData() {
    try {
      const data = fs.readFileSync(this.toolsDataPath, 'utf8');
      return JSON.parse(data);
    } catch (error) {
      console.error('❌ Failed to load tools data:', error.message);
      throw error;
    }
  }

  ensureDirectories() {
    if (!fs.existsSync(this.logoDir)) {
      fs.mkdirSync(this.logoDir, { recursive: true });
      console.log('📁 Created logo directory');
    }
  }

  getExistingLogos() {
    if (!fs.existsSync(this.logoDir)) return new Set();
    return new Set(
      fs.readdirSync(this.logoDir)
        .filter(file => file.endsWith('.svg'))
        .map(file => file.toLowerCase())
    );
  }

  generateColor(name) {
    let hash = 0;
    for (let i = 0; i < name.length; i++) {
      hash = name.charCodeAt(i) + ((hash << 5) - hash);
    }
    return this.colors[Math.abs(hash) % this.colors.length];
  }

  darkenColor(hex, percent) {
    const num = parseInt(hex.replace("#", ""), 16);
    const amt = Math.round(2.55 * percent);
    const R = Math.max(0, Math.min(255, (num >> 16) + amt));
    const G = Math.max(0, Math.min(255, (num >> 8 & 0x00FF) + amt));
    const B = Math.max(0, Math.min(255, (num & 0x0000FF) + amt));
    return "#" + ((R << 16) + (G << 8) + B).toString(16).padStart(6, '0');
  }

  generateInitials(name) {
    // Clean the name and get meaningful initials
    const cleanName = name
      .replace(/[^\w\s]/g, ' ')  // Replace non-alphanumeric with spaces
      .replace(/\s+/g, ' ')      // Normalize spaces
      .trim();
    
    const words = cleanName.split(' ').filter(word => word.length > 0);
    
    if (words.length === 1) {
      // Single word: take first 2 characters
      return words[0].substring(0, 2).toUpperCase();
    } else {
      // Multiple words: take first letter of first two words
      return words.slice(0, 2).map(word => word.charAt(0)).join('').toUpperCase();
    }
  }

  createSVGLogo(tool) {
    const color = this.generateColor(tool.name);
    const darkColor = this.darkenColor(color, -30);
    const initials = this.generateInitials(tool.name);
    
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

  generateMissingLogos() {
    console.log('🔍 Checking for missing logos...');
    
    const toolsData = this.loadToolsData();
    const existingLogos = this.getExistingLogos();
    const missingTools = [];

    toolsData.forEach(tool => {
      const expectedLogoFile = `${tool.slug}-logo.svg`.toLowerCase();
      if (!existingLogos.has(expectedLogoFile)) {
        missingTools.push(tool);
      }
    });

    if (missingTools.length === 0) {
      console.log('✅ All logos already exist!');
      return { generated: 0, total: toolsData.length };
    }

    console.log(`📊 Found ${missingTools.length} missing logos out of ${toolsData.length} total tools`);
    console.log('🎨 Generating missing logos...');

    let generated = 0;
    let errors = 0;

    missingTools.forEach(tool => {
      try {
        const svgContent = this.createSVGLogo(tool);
        const filename = `${tool.slug}-logo.svg`;
        const filepath = path.join(this.logoDir, filename);
        
        fs.writeFileSync(filepath, svgContent);
        console.log(`✅ Created ${filename} for "${tool.name}"`);
        generated++;
      } catch (error) {
        console.error(`❌ Failed to create logo for ${tool.name}:`, error.message);
        errors++;
      }
    });

    return { generated, errors, total: toolsData.length };
  }

  createPlaceholderLogo() {
    const placeholderSVG = `<svg width="64" height="64" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="grad-placeholder" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#9CA3AF;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#6B7280;stop-opacity:1" />
    </linearGradient>
  </defs>
  <rect width="64" height="64" rx="12" fill="url(#grad-placeholder)"/>
  <text x="32" y="38" font-family="system-ui, -apple-system, sans-serif" font-size="18" font-weight="600" text-anchor="middle" fill="white">
    AI
  </text>
</svg>`;

    if (!fs.existsSync(this.placeholderLogoPath)) {
      fs.writeFileSync(this.placeholderLogoPath, placeholderSVG);
      console.log('✅ Created placeholder logo');
    }
  }

  run(options = {}) {
    const { silent = false } = options;
    
    if (!silent) {
      console.log('🚀 Automatic Logo Generator Starting...');
    }

    try {
      this.ensureDirectories();
      this.createPlaceholderLogo();
      
      const result = this.generateMissingLogos();
      
      if (!silent) {
        console.log('\n📋 Summary:');
        console.log(`   • Total tools: ${result.total}`);
        console.log(`   • Generated logos: ${result.generated}`);
        console.log(`   • Errors: ${result.errors || 0}`);
        
        if (result.generated > 0) {
          console.log(`\n🎉 Successfully generated ${result.generated} missing logos!`);
        }
        
        console.log(`📁 Logos directory: ${this.logoDir}`);
      }
      
      return result;
    } catch (error) {
      console.error('❌ Logo generation failed:', error.message);
      throw error;
    }
  }
}

// CLI execution
if (require.main === module) {
  const args = process.argv.slice(2);
  const silent = args.includes('--silent');
  
  const generator = new AutomaticLogoGenerator();
  
  try {
    const result = generator.run({ silent });
    process.exit(result.errors > 0 ? 1 : 0);
  } catch (error) {
    process.exit(1);
  }
}

module.exports = AutomaticLogoGenerator;