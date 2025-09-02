#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

/**
 * Filter insidr-comprehensive-tools.json against existing aiToolsData.json
 * to identify genuinely new tools that should be added to SiteOptz
 */

function filterNewTools() {
  console.log('🔍 Filtering new tools from insidr-comprehensive-tools.json...\n');

  // Load existing tools database
  const dataPath = path.join(__dirname, 'public/data/aiToolsData.json');
  const existingTools = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
  
  // Load scraped tools from insidr.ai
  const insiderPath = path.join(__dirname, 'insidr-comprehensive-tools.json');
  const insiderTools = JSON.parse(fs.readFileSync(insiderPath, 'utf8'));

  console.log(`📊 Database Stats:`);
  console.log(`   Existing tools in SiteOptz: ${existingTools.length}`);
  console.log(`   Tools scraped from insidr.ai: ${insiderTools.length}\n`);

  // Create lookup sets for efficient duplicate detection
  const existingNames = new Set(existingTools.map(tool => tool.name.toLowerCase().trim()));
  const existingWebsites = new Set(existingTools.map(tool => {
    if (tool.overview?.website) {
      return tool.overview.website.toLowerCase().replace(/\/$/, '');
    }
    return null;
  }).filter(Boolean));
  const existingSlugs = new Set(existingTools.map(tool => tool.slug));

  // Filter for genuinely new tools
  const newTools = [];
  const duplicates = [];

  insiderTools.forEach(tool => {
    const normalizedName = tool.name.toLowerCase().trim();
    const normalizedWebsite = tool.website ? tool.website.toLowerCase().replace(/\/$/, '') : null;
    const proposedSlug = tool.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

    let isDuplicate = false;
    let duplicateReason = '';

    // Check for duplicates by name
    if (existingNames.has(normalizedName)) {
      isDuplicate = true;
      duplicateReason = 'name match';
    }
    // Check for duplicates by website
    else if (normalizedWebsite && existingWebsites.has(normalizedWebsite)) {
      isDuplicate = true;
      duplicateReason = 'website match';
    }
    // Check for duplicates by slug
    else if (existingSlugs.has(proposedSlug)) {
      isDuplicate = true;
      duplicateReason = 'slug conflict';
    }

    if (isDuplicate) {
      duplicates.push({
        name: tool.name,
        website: tool.website,
        reason: duplicateReason
      });
    } else {
      newTools.push(tool);
    }
  });

  // Display results
  console.log('🆕 NEW TOOLS TO ADD:');
  if (newTools.length === 0) {
    console.log('   No new tools found - all are duplicates');
  } else {
    newTools.forEach((tool, index) => {
      console.log(`   ${index + 1}. ${tool.name} (${tool.category}) - ${tool.website}`);
    });
  }

  console.log(`\n⚠️  DUPLICATE TOOLS FOUND (${duplicates.length}):`);
  duplicates.forEach((tool, index) => {
    console.log(`   ${index + 1}. ${tool.name} - ${tool.reason} (${tool.website})`);
  });

  // Save filtered results
  const outputPath = path.join(__dirname, 'new-tools-to-add.json');
  fs.writeFileSync(outputPath, JSON.stringify(newTools, null, 2));

  console.log(`\n📁 Results saved to: ${outputPath}`);
  console.log(`\n📈 Summary:`);
  console.log(`   🆕 New tools to add: ${newTools.length}`);
  console.log(`   ⚠️  Duplicate tools skipped: ${duplicates.length}`);
  console.log(`   📊 Total scraped tools: ${insiderTools.length}`);

  return {
    newTools,
    duplicates,
    newToolsCount: newTools.length,
    duplicatesCount: duplicates.length
  };
}

// Run the filtering
filterNewTools();