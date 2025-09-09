const fs = require('fs');

class ProductivityReorganizer {
  constructor() {
    this.dataPath = './public/data/aiToolsData.json';
    this.backupPath = './public/data/aiToolsData.backup.json';
    this.toolsData = JSON.parse(fs.readFileSync(this.dataPath, 'utf8'));
    this.stats = {
      processed: 0,
      updated: 0,
      errors: 0,
      categoryChanges: {}
    };
    
    // Define the redistribution mapping based on our analysis
    this.redistributionMap = {
      // Data Analysis tools (analytics, BI, reporting)
      'Data Analysis': [
        'BeeSift', 'StatPecker', 'DeepDocs', 'Victoria', 'Kolena', 
        'TestZeus', 'Sourcetable', 'ExcelMatic', 'Excel Whisper',
        'CICube', 'Curiso.ai', 'Vaiz', 'FlowMetr', 'Mirai',
        'Chronicle', 'Constella', 'AI inTime', 'ExtractAny',
        'Unrav.io', 'Comet by Perplexity', 'Ponder', 'Blok',
        'UnSoloMind', 'Athenic AI'
      ],
      
      // Education & Research tools
      'Education & Research': [
        'Google Search', 'Guru', 'The Librarian', 'Docci.ai',
        'ResearchCollab.ai', 'UniScribe', 'Serif.ai', 'IdeaBuddy',
        'Keepmind', 'Mindly', 'Mapify', 'Google Gemini'
      ],
      
      // Voice AI tools
      'Voice AI': [
        'Fathom', 'Jamie AI', 'Nyota', 'Read AI', 'Vowel',
        'AgentVoice', 'Dialbox'
      ],
      
      // Code Generation tools
      'Code Generation': [
        'DevPlan', 'Qodex.ai', 'Open Interface', 'CTRL Sheet',
        'Toolhouse', 'BrowserAct', 'Replit iOS App'
      ],
      
      // AI Website Builder tools
      'AI Website Builder': [
        'Sitekick - Powerful Landing Page Builder', 'Unbounce - AI Landing Page Builder',
        'Webflow\'s AI Site Builder', 'New.website', 'Bravo Studio'
      ],
      
      // Sales tools
      'Sales': [
        'Folk CRM', 'JustCall', 'TicketMine.ai', 'Appointwise',
        'LockedIn AI'
      ],
      
      // Content Creation tools
      'Content Creation': [
        'Microsoft PowerPoint', 'ChatSlide AI', 'GenPPT', 'Presentations.ai'
      ],
      
      // Video Generation tools
      'Video Generation': [
        'DiveDeck - AI-Powered Deck Builder', 'Storyblocker'
      ],
      
      // Email Marketing tools
      'Email Marketing': [
        'Fyxer', 'RPLY'
      ],
      
      // Lead Generation tools
      'Lead Generation': [
        'Explee', 'Foundor.ai'
      ],
      
      // Translation tools
      'Translation': [
        'Translate GPT - for Convenient Translation', 'HumanLayer'
      ],
      
      // Chat tools
      'Chat': [
        'Messync'
      ],
      
      // Image Generation tools
      'Image Generation': [
        'Leonardo AI'
      ],
      
      // Marketing tools
      'Marketing': [
        'Littlebird'
      ],
      
      // Music & Audio tools
      'Music & Audio': [
        'Aerogram'
      ],
      
      // Social Media tools
      'Social Media': [
        'Enjo.ai'
      ],
      
      // AI Automation tools (add writing assistants and workflow tools)
      'AI Automation': [
        'Microsoft Copilot', 'Grammarly', 'Notion AI', 'Motion', 
        'Trace AI', 'Trello Butler', 'SmythOS', 'ActionFlows',
        'Tasker AI', 'AutonomOps AI', 'Macro', 'AgentDock',
        'AgentPass.ai', 'Bit Flows', 'Lazy.so', 'Tapflow',
        'Miniflow', 'HeyBoss', 'Cotypist', 'SenseTask',
        'Fellow.app', 'Hoop', 'ProdPad', 'Teammately'
      ],
      
      // Self-Improvement tools
      'Self-Improvement': [
        'Kickresume', 'Teal', 'WellMeRight', 'Wellpin',
        'JobQuest.ai', 'Plansom', 'Voiset'
      ],
      
      // Finance AI tools
      'Finance AI': [
        'Inabit.ai', 'CloudEagle.ai'
      ],
      
      // UX & Design tools
      'UX & Design': [
        'Drawer AI', 'Eraser IO', 'Figflow', 'Pikr'
      ]
    };
  }

  // Find tool by name and update its category
  updateToolCategory(toolName, newCategory) {
    for (let tool of this.toolsData) {
      if (tool.name === toolName || 
          tool.name?.toLowerCase() === toolName.toLowerCase() ||
          tool.slug === toolName.toLowerCase().replace(/\s+/g, '-')) {
        
        // Update overview category (primary)
        if (tool.overview) {
          const oldCategory = tool.overview.category;
          tool.overview.category = newCategory;
          
          // Track changes
          if (!this.stats.categoryChanges[newCategory]) {
            this.stats.categoryChanges[newCategory] = [];
          }
          this.stats.categoryChanges[newCategory].push({
            tool: tool.name,
            from: oldCategory
          });
        }
        
        // Update root-level category if it exists
        if (tool.category) {
          tool.category = newCategory;
        }
        
        this.stats.updated++;
        return true;
      }
    }
    return false;
  }

  async reorganizeTools() {
    console.log('🚀 Starting Productivity tools reorganization...\n');
    
    // Create backup
    console.log('📦 Creating backup...');
    fs.writeFileSync(this.backupPath, JSON.stringify(this.toolsData, null, 2));
    console.log('✅ Backup saved to:', this.backupPath);
    
    // Process redistribution
    console.log('\n📊 Processing category redistribution...\n');
    
    for (const [newCategory, toolNames] of Object.entries(this.redistributionMap)) {
      console.log(`\n🏷️  Moving tools to ${newCategory}:`);
      let categoryCount = 0;
      
      for (const toolName of toolNames) {
        if (this.updateToolCategory(toolName, newCategory)) {
          categoryCount++;
          console.log(`   ✓ ${toolName}`);
        } else {
          console.log(`   ✗ ${toolName} (not found)`);
          this.stats.errors++;
        }
        this.stats.processed++;
      }
      
      console.log(`   Moved ${categoryCount} tools to ${newCategory}`);
    }
    
    // Save updated data
    fs.writeFileSync(this.dataPath, JSON.stringify(this.toolsData, null, 2));
    
    // Print summary
    console.log('\n' + '='.repeat(60));
    console.log('📊 REORGANIZATION SUMMARY');
    console.log('='.repeat(60));
    console.log(`✅ Tools processed: ${this.stats.processed}`);
    console.log(`📝 Tools updated: ${this.stats.updated}`);
    console.log(`❌ Tools not found: ${this.stats.errors}`);
    
    console.log('\n📈 Category Changes:');
    for (const [category, tools] of Object.entries(this.stats.categoryChanges)) {
      console.log(`\n${category}: ${tools.length} tools`);
    }
    
    // Count remaining Productivity tools
    const remainingProductivity = this.toolsData.filter(
      tool => tool.overview?.category === 'Productivity'
    ).length;
    
    console.log('\n📍 Final Statistics:');
    console.log(`   Productivity tools before: 200`);
    console.log(`   Productivity tools after: ${remainingProductivity}`);
    console.log(`   Tools redistributed: ${this.stats.updated}`);
    
    console.log('\n✅ Reorganization completed successfully!');
    console.log('💾 Updated aiToolsData.json');
  }
}

// Run the reorganization
const reorganizer = new ProductivityReorganizer();
reorganizer.reorganizeTools().then(() => {
  console.log('\n🎉 All done! The categories have been reorganized.');
}).catch(error => {
  console.error('❌ Reorganization failed:', error);
});