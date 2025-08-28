const fs = require('fs').promises;
const path = require('path');
const { mergeWithExistingTools } = require('./duplicate-detector');
const { validateSiteOptzTool } = require('./siteoptz-data-adapter');

// Load existing tools data
async function loadExistingTools() {
  const possiblePaths = [
    path.join(__dirname, '../public/data/aiToolsData.json'),
    path.join(__dirname, '../data/tools.json'),
    path.join(__dirname, '../data/ai-tools.json'),
    path.join(__dirname, '../data/tool_data.json')
  ];
  
  for (const filePath of possiblePaths) {
    try {
      const data = await fs.readFile(filePath, 'utf8');
      const parsed = JSON.parse(data);
      
      // Handle different data structures
      if (Array.isArray(parsed)) {
        console.log(`✅ Loaded ${parsed.length} existing tools from ${path.basename(filePath)}`);
        return parsed;
      } else if (parsed.tools && Array.isArray(parsed.tools)) {
        console.log(`✅ Loaded ${parsed.tools.length} existing tools from ${path.basename(filePath)}`);
        return parsed.tools;
      }
    } catch (error) {
      // File doesn't exist or can't be parsed, continue
    }
  }
  
  console.log('⚠️ No existing tools data found, starting fresh');
  return [];
}

// Check if a tool already exists
function toolExists(existingTools, newTool) {
  return existingTools.some(existing => {
    // Check by multiple criteria
    const idMatch = existing.id === newTool.id;
    const slugMatch = existing.slug === newTool.slug;
    const nameMatch = existing.name?.toLowerCase() === newTool.name?.toLowerCase();
    const websiteMatch = existing.website === newTool.website && newTool.website !== null;
    
    return idMatch || slugMatch || nameMatch || websiteMatch;
  });
}

// Merge tool data (prefer newer data but keep existing fields)
function mergeToolData(existingTool, newTool) {
  return {
    ...existingTool,
    ...newTool,
    // Preserve existing data that might be manually curated
    description: newTool.description || existingTool.description,
    features: [...new Set([
      ...(existingTool.features || []),
      ...(newTool.features || [])
    ])],
    tags: [...new Set([
      ...(existingTool.tags || []),
      ...(newTool.tags || [])
    ])],
    pros: existingTool.pros?.length > 0 ? existingTool.pros : newTool.pros,
    cons: existingTool.cons?.length > 0 ? existingTool.cons : newTool.cons,
    integrations: [...new Set([
      ...(existingTool.integrations || []),
      ...(newTool.integrations || [])
    ])],
    // Update timestamps
    lastUpdated: new Date().toISOString(),
    lastScraped: newTool.lastScraped,
    // Keep better rating/review data
    rating: newTool.rating || existingTool.rating,
    reviewCount: Math.max(
      existingTool.reviewCount || 0,
      newTool.reviewCount || 0
    )
  };
}

// Generate SEO metadata for a tool
function generateSEOMetadata(tool) {
  const baseUrl = 'https://siteoptz.ai';
  const toolUrl = `${baseUrl}/reviews/${tool.slug}`;
  
  return {
    meta: {
      title: `${tool.name} Review 2025 - Features, Pricing & Alternatives | SiteOptz`,
      description: tool.description?.substring(0, 155) + '...',
      keywords: [
        tool.name.toLowerCase(),
        `${tool.name.toLowerCase()} review`,
        `${tool.name.toLowerCase()} pricing`,
        `${tool.name.toLowerCase()} alternatives`,
        tool.category,
        'ai tools',
        'siteoptz'
      ].join(', ')
    },
    canonical: toolUrl,
    openGraph: {
      title: `${tool.name} - AI Tool Review & Pricing`,
      description: tool.description?.substring(0, 155) + '...',
      type: 'article',
      url: toolUrl,
      image: `${baseUrl}/images/tools/${tool.slug}-logo.svg`,
      siteName: 'SiteOptz'
    },
    twitter: {
      card: 'summary_large_image',
      title: `${tool.name} - AI Tool Review`,
      description: tool.description?.substring(0, 155) + '...',
      image: `${baseUrl}/images/tools/${tool.slug}-logo.svg`
    },
    structuredData: {
      '@context': 'https://schema.org',
      '@type': 'SoftwareApplication',
      name: tool.name,
      description: tool.description,
      applicationCategory: tool.category,
      url: tool.website,
      aggregateRating: tool.rating ? {
        '@type': 'AggregateRating',
        ratingValue: tool.rating,
        reviewCount: tool.reviewCount || 0,
        bestRating: 5,
        worstRating: 1
      } : undefined,
      offers: {
        '@type': 'Offer',
        price: tool.pricing?.startingPrice || 0,
        priceCurrency: 'USD'
      }
    }
  };
}

// Organize tools by category
function organizeByCategory(tools) {
  const categories = {};
  
  tools.forEach(tool => {
    const category = tool.category || 'other';
    if (!categories[category]) {
      categories[category] = [];
    }
    categories[category].push(tool);
  });
  
  return categories;
}

// Main merge function with advanced duplicate detection
async function mergeToolsData(newTools) {
  console.log('\n📋 Starting advanced tools data merge process...');
  
  // Load existing tools
  const existingTools = await loadExistingTools();
  console.log(`📊 Existing tools: ${existingTools.length}`);
  console.log(`📊 New tools to process: ${newTools.length}`);
  
  if (newTools.length === 0) {
    console.log('⚠️ No new tools to merge. Keeping existing data.');
    return {
      mergedTools: existingTools,
      stats: { added: 0, updated: 0, skipped: 0, duplicatesFound: [] },
      categories: organizeByCategory(existingTools)
    };
  }
  
  // Validate new tools before merging
  console.log('\n🔍 Validating new tools...');
  const validatedTools = [];
  const validationErrors = [];
  
  for (const tool of newTools) {
    const validation = validateSiteOptzTool(tool);
    if (validation.valid) {
      validatedTools.push(tool);
      if (validation.warnings.length > 0) {
        console.log(`⚠️ ${tool.name}: ${validation.warnings.join(', ')}`);
      }
    } else {
      validationErrors.push({
        tool: tool.name,
        errors: validation.errors
      });
      console.log(`❌ Invalid tool ${tool.name}: ${validation.errors.join(', ')}`);
    }
  }
  
  console.log(`✅ Validated ${validatedTools.length}/${newTools.length} tools`);
  
  if (validatedTools.length === 0) {
    console.log('⚠️ No valid new tools to merge.');
    return {
      mergedTools: existingTools,
      stats: { added: 0, updated: 0, skipped: 0, validationErrors },
      categories: organizeByCategory(existingTools)
    };
  }
  
  // Use advanced duplicate detection and merging
  const mergeResult = await mergeWithExistingTools(validatedTools, existingTools, {
    strictMode: true,
    prioritizeCompleteData: true
  });
  
  const mergedTools = mergeResult.mergedTools;
  const stats = {
    ...mergeResult.stats,
    validationErrors: validationErrors.length
  };
  
  // Organize by category
  const categorizedTools = organizeByCategory(mergedTools);
  const categories = Object.keys(categorizedTools);
  
  console.log(`\n📂 Categories (${categories.length}):`);
  categories.forEach(category => {
    console.log(`  - ${category}: ${categorizedTools[category].length} tools`);
  });
  
  // Save merged data with enhanced structure
  const outputDir = path.join(__dirname, 'data', 'merged');
  await fs.mkdir(outputDir, { recursive: true });
  
  // Save main merged file
  const mainOutput = path.join(outputDir, 'all-tools.json');
  await fs.writeFile(
    mainOutput,
    JSON.stringify({
      tools: mergedTools,
      totalTools: mergedTools.length,
      categories: categories,
      categoryCounts: Object.fromEntries(
        categories.map(cat => [cat, categorizedTools[cat].length])
      ),
      lastUpdated: new Date().toISOString(),
      stats: stats,
      metadata: {
        scrapingComplete: true,
        duplicateDetectionUsed: true,
        validationEnabled: true,
        siteOptzCompatible: true
      }
    }, null, 2)
  );
  
  console.log(`\n✅ Merged data saved to: ${mainOutput}`);
  
  // Save category-specific files
  const categoryDir = path.join(outputDir, 'categories');
  await fs.mkdir(categoryDir, { recursive: true });
  
  for (const [category, tools] of Object.entries(categorizedTools)) {
    const categoryFile = path.join(categoryDir, `${category.replace(/[^a-z0-9]/gi, '-').toLowerCase()}.json`);
    await fs.writeFile(
      categoryFile,
      JSON.stringify({
        category: category,
        tools: tools,
        totalTools: tools.length,
        lastUpdated: new Date().toISOString(),
        seoOptimized: true
      }, null, 2)
    );
  }
  
  console.log(`✅ Category files saved to: ${categoryDir}`);
  
  // Update the main website data file with validation
  const websiteDataPath = path.join(__dirname, '../public/data/aiToolsData.json');
  
  // Ensure all tools have required fields for frontend
  const frontendCompatibleTools = mergedTools.map(tool => ({
    ...tool,
    // Ensure required fields exist
    overview: {
      category: tool.overview?.category || 'other',
      description: tool.overview?.description || tool.description || `${tool.name} is an AI-powered tool.`,
      website: tool.overview?.website || tool.website || '',
      developer: tool.overview?.developer || 'Unknown',
      ...tool.overview
    },
    // Ensure pricing is array format
    pricing: Array.isArray(tool.pricing) ? tool.pricing : [],
    // Ensure features array exists
    features: Array.isArray(tool.features) ? tool.features : [],
    // Ensure tags array exists  
    tags: Array.isArray(tool.tags) ? tool.tags : []
  }));
  
  await fs.writeFile(
    websiteDataPath,
    JSON.stringify(frontendCompatibleTools, null, 2)
  );
  
  console.log(`✅ Website data updated: ${websiteDataPath}`);
  
  // Create summary report
  const summaryPath = path.join(outputDir, 'merge-summary.json');
  const summary = {
    timestamp: new Date().toISOString(),
    totalTools: mergedTools.length,
    newToolsAdded: stats.added,
    toolsUpdated: stats.updated,
    duplicatesSkipped: stats.skipped,
    validationErrors: stats.validationErrors,
    categories: Object.fromEntries(
      Object.entries(categorizedTools).map(([cat, tools]) => [cat, {
        count: tools.length,
        newTools: tools.filter(t => 
          validatedTools.some(vt => vt.id === t.id)
        ).length
      }])
    ),
    dataQuality: {
      toolsWithDescriptions: mergedTools.filter(t => t.overview?.description).length,
      toolsWithPricing: mergedTools.filter(t => t.pricing?.length > 0).length,
      toolsWithFeatures: mergedTools.filter(t => t.features?.length > 0).length,
      toolsWithSEO: mergedTools.filter(t => t.meta?.title).length,
      toolsWithStructuredData: mergedTools.filter(t => t.schema).length
    }
  };
  
  await fs.writeFile(summaryPath, JSON.stringify(summary, null, 2));
  console.log(`📊 Summary report saved to: ${summaryPath}`);
  
  return {
    mergedTools,
    stats,
    categories: categorizedTools,
    summary
  };
}

module.exports = {
  loadExistingTools,
  mergeToolsData,
  toolExists,
  mergeToolData,
  generateSEOMetadata,
  organizeByCategory
};

// Run if called directly
if (require.main === module) {
  (async () => {
    try {
      // Load scraped tools
      const scrapedDataPath = path.join(__dirname, 'data', 'scraped', 'new-ai-tools.json');
      const scrapedData = JSON.parse(await fs.readFile(scrapedDataPath, 'utf8'));
      
      // Merge with existing data
      const result = await mergeToolsData(scrapedData.tools);
      
      console.log('\n🎉 Merge completed successfully!');
      console.log(`📊 Total tools in database: ${result.mergedTools.length}`);
      
    } catch (error) {
      console.error('❌ Error during merge:', error);
      process.exit(1);
    }
  })();
}