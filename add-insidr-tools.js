import fs from 'fs';
import path from 'path';

// Add new tools from multi-page Insidr scraping to the main aiToolsData.json
function addInsidrToolsToDatabase() {
  console.log('📦 Adding Insidr.ai multi-page scraped tools to main database...\n');
  
  try {
    // Load existing tools
    const existingData = fs.readFileSync('public/data/aiToolsData.json', 'utf8');
    const existingTools = JSON.parse(existingData);
    console.log(`📊 Current database has ${existingTools.length} tools`);
    
    // Find the latest all-new-tools file
    const insidrDir = 'data/insidr-multi-page';
    
    if (!fs.existsSync(insidrDir)) {
      console.log('❌ No insidr-multi-page directory found. Run the multi-page scraper first.');
      return;
    }
    
    const files = fs.readdirSync(insidrDir);
    const newToolsFiles = files.filter(f => f.startsWith('all-new-tools-')).sort().reverse();
    
    if (newToolsFiles.length === 0) {
      console.log('❌ No all-new-tools files found. Run the multi-page scraper first.');
      return;
    }
    
    const latestFile = path.join(insidrDir, newToolsFiles[0]);
    console.log(`📂 Reading new tools from: ${latestFile}`);
    
    const newToolsData = fs.readFileSync(latestFile, 'utf8');
    const newTools = JSON.parse(newToolsData);
    
    if (newTools.length === 0) {
      console.log('ℹ️ No new tools to add.');
      return;
    }
    
    console.log(`✨ Found ${newTools.length} new tools to add\n`);
    
    // Create a map of existing tools for final duplicate check
    const existingMap = new Map();
    existingTools.forEach(tool => {
      existingMap.set(tool.id, tool);
      existingMap.set(tool.name?.toLowerCase(), tool);
    });
    
    // Filter and add only truly new tools
    const toolsToAdd = [];
    const skipped = [];
    
    for (const newTool of newTools) {
      if (!existingMap.has(newTool.id) && !existingMap.has(newTool.name?.toLowerCase())) {
        toolsToAdd.push(newTool);
      } else {
        skipped.push(newTool.name);
      }
    }
    
    if (skipped.length > 0) {
      console.log(`⚠️ Skipped ${skipped.length} tools (already exist):`);
      skipped.forEach(name => console.log(`   - ${name}`));
      console.log('');
    }
    
    if (toolsToAdd.length === 0) {
      console.log('ℹ️ All tools already exist in the database.');
      return;
    }
    
    // Create backup
    const backupFile = `public/data/aiToolsData-backup-${Date.now()}.json`;
    fs.writeFileSync(backupFile, existingData);
    console.log(`💾 Created backup: ${backupFile}`);
    
    // Merge tools
    const mergedTools = [...existingTools, ...toolsToAdd];
    
    // Sort by name for consistency
    mergedTools.sort((a, b) => (a.name || '').localeCompare(b.name || ''));
    
    // Save merged data
    fs.writeFileSync('public/data/aiToolsData.json', JSON.stringify(mergedTools, null, 2));
    
    console.log(`\n✅ Successfully added ${toolsToAdd.length} new tools!`);
    console.log(`📊 Total tools in database: ${mergedTools.length}`);
    
    // Show sample of added tools
    console.log('\n📝 Sample of added tools:');
    toolsToAdd.slice(0, 5).forEach((tool, i) => {
      console.log(`   ${i + 1}. ${tool.name} (${tool.category})`);
    });
    
    // Save summary
    const summary = {
      timestamp: new Date().toISOString(),
      previousCount: existingTools.length,
      newToolsAdded: toolsToAdd.length,
      totalCount: mergedTools.length,
      skippedDuplicates: skipped.length,
      addedTools: toolsToAdd.map(t => ({
        name: t.name,
        category: t.category,
        id: t.id
      }))
    };
    
    const summaryFile = path.join(insidrDir, `add-summary-${Date.now()}.json`);
    fs.writeFileSync(summaryFile, JSON.stringify(summary, null, 2));
    console.log(`\n📄 Summary saved to: ${summaryFile}`);
    
    console.log('\n🎯 Next steps:');
    console.log('   1. Run: npm run validate-images');
    console.log('   2. Run: npm run generate-logos (if needed)');
    console.log('   3. Run: npm run validate-schema');
    console.log('   4. Run: npm run build');
    console.log('   5. Test locally: npm run dev');
    
  } catch (error) {
    console.error('❌ Error adding tools:', error.message);
    process.exit(1);
  }
}

// Run the script
addInsidrToolsToDatabase();