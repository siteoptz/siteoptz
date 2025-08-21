#!/usr/bin/env node

/**
 * Data Merger for Specific AI Tools
 * Merges newly scraped tools with existing SiteOptz.ai database
 */

import fs from 'fs';
import path from 'path';

// Define data directories and files
const DATA_DIR = path.join(process.cwd(), 'data', 'siteoptz');
const PUBLIC_DATA_DIR = path.join(process.cwd(), 'public', 'data');
const SPECIFIC_TOOLS_FILE = path.join(DATA_DIR, 'specific-tools.json');
const EXISTING_TOOLS_FILE = path.join(PUBLIC_DATA_DIR, 'aiToolsData.json');
const OUTPUT_FILE = path.join(PUBLIC_DATA_DIR, 'aiToolsData.json');
const BACKUP_FILE = path.join(PUBLIC_DATA_DIR, 'aiToolsData-backup.json');

/**
 * Create backup of existing data
 */
function createBackup() {
  try {
    if (fs.existsSync(EXISTING_TOOLS_FILE)) {
      fs.copyFileSync(EXISTING_TOOLS_FILE, BACKUP_FILE);
      console.log('✅ Created backup of existing tools data');
      return true;
    }
    return false;
  } catch (error) {
    console.error('❌ Error creating backup:', error.message);
    return false;
  }
}

/**
 * Load and validate existing tools data
 */
function loadExistingTools() {
  try {
    if (!fs.existsSync(EXISTING_TOOLS_FILE)) {
      console.log('⚠️ No existing tools file found, creating new one');
      return [];
    }
    
    const data = fs.readFileSync(EXISTING_TOOLS_FILE, 'utf8');
    const tools = JSON.parse(data);
    
    if (!Array.isArray(tools)) {
      throw new Error('Existing tools data is not an array');
    }
    
    console.log(`📊 Loaded ${tools.length} existing tools`);
    return tools;
  } catch (error) {
    console.error('❌ Error loading existing tools:', error.message);
    return [];
  }
}

/**
 * Load newly scraped tools
 */
function loadNewTools() {
  try {
    if (!fs.existsSync(SPECIFIC_TOOLS_FILE)) {
      throw new Error('Specific tools file not found. Run scraping first.');
    }
    
    const data = fs.readFileSync(SPECIFIC_TOOLS_FILE, 'utf8');
    const tools = JSON.parse(data);
    
    if (!Array.isArray(tools)) {
      throw new Error('New tools data is not an array');
    }
    
    console.log(`📊 Loaded ${tools.length} newly scraped tools`);
    return tools;
  } catch (error) {
    console.error('❌ Error loading new tools:', error.message);
    return [];
  }
}

/**
 * Convert new tool format to existing database format
 */
function convertToolFormat(newTool) {
  // Generate slug if not present
  const slug = newTool.slug || newTool.tool_name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
  
  // Convert pricing format
  const convertedPricing = [];
  if (newTool.pricing && Array.isArray(newTool.pricing)) {
    newTool.pricing.forEach(plan => {
      convertedPricing.push({
        tier: plan.plan || 'Unknown',
        price_per_month: plan.price || 0,
        billing_period: plan.billing_period || 'month',
        features: plan.features || [],
        description: `${plan.plan || 'Plan'} features`,
        popular: plan.plan === 'Pro' || plan.plan === 'Professional'
      });
    });
  }
  
  // Add Enterprise plan if not present
  if (!convertedPricing.some(p => p.tier === 'Enterprise')) {
    convertedPricing.push({
      tier: 'Enterprise',
      price_per_month: 'Custom',
      billing_period: 'month',
      features: ['Custom features', 'Dedicated support', 'SLA'],
      description: 'Enterprise-grade features',
      popular: false
    });
  }
  
  // Convert to existing format
  return {
    id: newTool.id,
    name: newTool.tool_name || newTool.name,
    slug: slug,
    logo: newTool.logo_url || newTool.logo || `/images/tools/${newTool.id}-logo.svg`,
    description: newTool.description,
    overview: {
      description: newTool.description,
      category: newTool.category,
      developer: newTool.vendor || newTool.company || newTool.tool_name,
      website: newTool.official_url || newTool.website,
      integrations: newTool.features?.integrations || newTool.integrations || [],
      use_cases: newTool.useCases || newTool.use_cases || []
    },
    features: newTool.features?.core || newTool.features || [],
    pricing: convertedPricing,
    pros: newTool.pros || [],
    cons: newTool.cons || [],
    benchmarks: {
      speed: newTool.rating ? Math.min(newTool.rating * 2, 10) : 8,
      accuracy: newTool.rating ? Math.min(newTool.rating * 2, 10) : 8,
      integration: 7,
      ease_of_use: newTool.rating ? Math.min(newTool.rating * 2, 10) : 8,
      value: newTool.freeTrial || newTool.free_trial ? 9 : 7
    },
    affiliate_link: newTool.affiliate_link || newTool.official_url || newTool.website,
    
    // Additional metadata
    category: newTool.category,
    tags: [
      newTool.category.toLowerCase(),
      'ai tool',
      ...(newTool.targetAudience ? [newTool.targetAudience.toLowerCase()] : [])
    ],
    last_updated: newTool.lastUpdated || new Date().toISOString(),
    rating: newTool.rating || 4.2,
    review_count: newTool.reviewCount || 500,
    free_trial: newTool.freeTrial || newTool.free_trial || false,
    
    // SEO metadata
    seo: {
      title: newTool.metaTags?.title || `${newTool.tool_name} Review 2025 | SiteOptz`,
      description: newTool.metaTags?.description || newTool.description,
      keywords: newTool.metaTags?.keywords || [],
      canonical_url: newTool.canonicalUrl || `https://siteoptz.ai/tools/${slug}`
    }
  };
}

/**
 * Merge tools with duplicate detection
 */
function mergeTools(existingTools, newTools) {
  const merged = [...existingTools];
  const existingIds = new Set(existingTools.map(tool => tool.id));
  const existingNames = new Set(existingTools.map(tool => tool.name.toLowerCase()));
  const existingSlugs = new Set(existingTools.map(tool => tool.slug));
  
  let addedCount = 0;
  let updatedCount = 0;
  let skippedCount = 0;
  
  for (const newTool of newTools) {
    const convertedTool = convertToolFormat(newTool);
    
    // Check for duplicates by ID, name, or slug
    const isDuplicateById = existingIds.has(convertedTool.id);
    const isDuplicateByName = existingNames.has(convertedTool.name.toLowerCase());
    const isDuplicateBySlug = existingSlugs.has(convertedTool.slug);
    
    if (isDuplicateById || isDuplicateByName || isDuplicateBySlug) {
      // Update existing tool
      const existingIndex = merged.findIndex(tool => 
        tool.id === convertedTool.id || 
        tool.name.toLowerCase() === convertedTool.name.toLowerCase() ||
        tool.slug === convertedTool.slug
      );
      
      if (existingIndex !== -1) {
        // Merge data, keeping the best of both
        merged[existingIndex] = {
          ...merged[existingIndex],
          ...convertedTool,
          // Keep original ID and slug if they exist
          id: merged[existingIndex].id,
          slug: merged[existingIndex].slug,
          // Update timestamp
          last_updated: new Date().toISOString()
        };
        updatedCount++;
        console.log(`🔄 Updated existing tool: ${convertedTool.name}`);
      } else {
        skippedCount++;
        console.log(`⏭️ Skipped duplicate: ${convertedTool.name}`);
      }
    } else {
      // Add new tool
      merged.push(convertedTool);
      existingIds.add(convertedTool.id);
      existingNames.add(convertedTool.name.toLowerCase());
      existingSlugs.add(convertedTool.slug);
      addedCount++;
      console.log(`➕ Added new tool: ${convertedTool.name}`);
    }
  }
  
  return {
    tools: merged,
    stats: {
      total: merged.length,
      added: addedCount,
      updated: updatedCount,
      skipped: skippedCount,
      original: existingTools.length,
      new: newTools.length
    }
  };
}

/**
 * Validate merged data
 */
function validateMergedData(tools) {
  const errors = [];
  const warnings = [];
  
  // Check for required fields
  tools.forEach((tool, index) => {
    if (!tool.id) errors.push(`Tool at index ${index} missing ID`);
    if (!tool.name) errors.push(`Tool at index ${index} missing name`);
    if (!tool.slug) errors.push(`Tool at index ${index} missing slug`);
    if (!tool.description) warnings.push(`Tool "${tool.name}" missing description`);
    if (!tool.pricing || !Array.isArray(tool.pricing)) warnings.push(`Tool "${tool.name}" missing pricing`);
  });
  
  // Check for duplicate IDs
  const ids = tools.map(tool => tool.id);
  const duplicateIds = ids.filter((id, index) => ids.indexOf(id) !== index);
  if (duplicateIds.length > 0) {
    errors.push(`Duplicate IDs found: ${duplicateIds.join(', ')}`);
  }
  
  // Check for duplicate slugs
  const slugs = tools.map(tool => tool.slug);
  const duplicateSlugs = slugs.filter((slug, index) => slugs.indexOf(slug) !== index);
  if (duplicateSlugs.length > 0) {
    errors.push(`Duplicate slugs found: ${duplicateSlugs.join(', ')}`);
  }
  
  return { errors, warnings };
}

/**
 * Save merged data
 */
function saveMergedData(tools, stats) {
  try {
    // Create directory if it doesn't exist
    if (!fs.existsSync(PUBLIC_DATA_DIR)) {
      fs.mkdirSync(PUBLIC_DATA_DIR, { recursive: true });
    }
    
    // Save merged data
    fs.writeFileSync(OUTPUT_FILE, JSON.stringify(tools, null, 2));
    
    // Save merge summary
    const summary = {
      mergeCompleted: new Date().toISOString(),
      stats: stats,
      totalTools: tools.length,
      dataFile: OUTPUT_FILE,
      backupFile: BACKUP_FILE
    };
    
    const summaryFile = path.join(DATA_DIR, 'merge-summary.json');
    fs.writeFileSync(summaryFile, JSON.stringify(summary, null, 2));
    
    console.log(`✅ Merged data saved to: ${OUTPUT_FILE}`);
    console.log(`📊 Merge summary saved to: ${summaryFile}`);
    
    return true;
  } catch (error) {
    console.error('❌ Error saving merged data:', error.message);
    return false;
  }
}

/**
 * Main merge process
 */
async function mergeSpecificTools() {
  console.log('🔄 Starting AI tools data merge process...\n');
  
  // Create backup
  createBackup();
  
  // Load data
  const existingTools = loadExistingTools();
  const newTools = loadNewTools();
  
  if (newTools.length === 0) {
    console.log('❌ No new tools to merge. Exiting.');
    return;
  }
  
  // Merge tools
  console.log('\n🔄 Merging tools...');
  const result = mergeTools(existingTools, newTools);
  
  // Validate merged data
  console.log('\n🔍 Validating merged data...');
  const validation = validateMergedData(result.tools);
  
  if (validation.errors.length > 0) {
    console.error('❌ Validation errors found:');
    validation.errors.forEach(error => console.error(`   - ${error}`));
    return;
  }
  
  if (validation.warnings.length > 0) {
    console.warn('⚠️ Validation warnings:');
    validation.warnings.forEach(warning => console.warn(`   - ${warning}`));
  }
  
  // Save merged data
  console.log('\n💾 Saving merged data...');
  const saved = saveMergedData(result.tools, result.stats);
  
  if (saved) {
    console.log('\n🎉 Merge Complete!');
    console.log(`📊 Final Statistics:`);
    console.log(`   - Total tools: ${result.stats.total}`);
    console.log(`   - Original tools: ${result.stats.original}`);
    console.log(`   - New tools added: ${result.stats.added}`);
    console.log(`   - Tools updated: ${result.stats.updated}`);
    console.log(`   - Tools skipped (duplicates): ${result.stats.skipped}`);
    console.log(`   - Net increase: +${result.stats.added} tools`);
  } else {
    console.error('❌ Failed to save merged data');
  }
}

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  mergeSpecificTools().catch(console.error);
}

export { mergeSpecificTools };
export default mergeSpecificTools;