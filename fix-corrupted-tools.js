const fs = require('fs');

class CorruptedToolsFixer {
  constructor() {
    this.dataPath = './public/data/aiToolsData.json';
    this.toolsData = JSON.parse(fs.readFileSync(this.dataPath, 'utf8'));
    this.stats = { fixed: 0, removed: 0, total: 0 };
  }

  generateSlug(name) {
    return name.toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .replace(/^-|-$/g, '');
  }

  fixCorruptedTool(tool, index) {
    let fixed = false;
    
    // Fix null categories based on tool names
    if (!tool.overview || !tool.overview.category) {
      console.log(`🔧 Fixing null category for: ${tool.name}`);
      
      if (!tool.overview) tool.overview = {};
      
      // Assign categories based on tool names
      const categoryMapping = {
        'Apollo.io': 'Sales',
        'Cosmos AI': 'AI Automation', 
        'Headshot Generator': 'Image Generation',
        'Interview Study': 'Education & Research',
        'Media.io': 'Video Generation',
        'Nando AI': 'Content Creation',
        'Octopus CRM': 'Sales',
        'Predis AI': 'Social Media',
        'Seamless AI': 'Sales'
      };
      
      tool.overview.category = categoryMapping[tool.name] || 'AI Automation';
      fixed = true;
    }
    
    // Fix NaN IDs
    if (!tool.id || tool.id === 'NaN') {
      console.log(`🔧 Fixing NaN ID for: ${tool.name}`);
      tool.id = this.generateSlug(tool.name);
      fixed = true;
    }
    
    // Fix missing slug
    if (!tool.slug || tool.slug === 'NaN') {
      console.log(`🔧 Fixing slug for: ${tool.name}`);
      tool.slug = this.generateSlug(tool.name);
      fixed = true;
    }
    
    // Ensure basic structure exists
    if (!tool.overview) {
      tool.overview = {
        category: 'AI Automation',
        description: `${tool.name} is an AI-powered tool for enhanced productivity and automation.`
      };
      fixed = true;
    }
    
    return fixed;
  }

  fixAllCorruptedTools() {
    console.log('🚀 Starting corrupted tools fix...\n');
    
    let fixedCount = 0;
    this.stats.total = this.toolsData.length;
    
    for (let i = 0; i < this.toolsData.length; i++) {
      const tool = this.toolsData[i];
      
      if (this.fixCorruptedTool(tool, i)) {
        fixedCount++;
        this.stats.fixed++;
      }
    }
    
    // Save updated data
    fs.writeFileSync(this.dataPath, JSON.stringify(this.toolsData, null, 2));
    
    console.log(`\n📊 === CORRUPTED TOOLS FIX SUMMARY ===`);
    console.log(`🔧 Tools fixed: ${this.stats.fixed}`);
    console.log(`📈 Total tools: ${this.stats.total}`);
    console.log(`💾 Updated aiToolsData.json`);
    
    // Verify the fix
    const nullCategories = this.toolsData.filter(tool => !tool.overview?.category).length;
    const nanIds = this.toolsData.filter(tool => !tool.id || tool.id === 'NaN').length;
    
    console.log(`\n✅ Verification:`);
    console.log(`   Tools with null categories: ${nullCategories}`);
    console.log(`   Tools with NaN IDs: ${nanIds}`);
    
    return fixedCount;
  }
}

// Run the fixer
const fixer = new CorruptedToolsFixer();
fixer.fixAllCorruptedTools();