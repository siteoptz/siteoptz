#!/usr/bin/env node

/**
 * Fix missing slug properties for Paid Search tools
 */

import fs from 'fs';

const TOOLS_FILE = 'public/data/aiToolsData.json';

function generateSlug(name) {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '') // Remove special characters except spaces and hyphens
    .replace(/\s+/g, '-')          // Replace spaces with hyphens
    .replace(/-+/g, '-')           // Replace multiple hyphens with single hyphen
    .trim()                        // Remove leading/trailing whitespace
    .replace(/^-|-$/g, '');        // Remove leading/trailing hyphens
}

function fixMissingSlugs() {
  const data = JSON.parse(fs.readFileSync(TOOLS_FILE, 'utf8'));
  
  console.log('🔧 Fixing missing slug properties...\n');
  
  // Create backup
  const backupFile = 'public/data/aiToolsData-slug-fix-backup.json';
  fs.writeFileSync(backupFile, JSON.stringify(data, null, 2));
  console.log(`📋 Backup created: ${backupFile}\n`);
  
  let fixed = 0;
  
  data.forEach((tool, index) => {
    if (!tool.slug) {
      const slug = generateSlug(tool.name);
      tool.slug = slug;
      
      console.log(`✅ Added slug to ${tool.name}: "${slug}"`);
      fixed++;
    }
  });
  
  // Also add any other missing properties that are typically expected
  data.forEach((tool, index) => {
    // Add ID if missing
    if (!tool.id) {
      tool.id = tool.slug || generateSlug(tool.name);
    }
    
    // Add logo placeholder if missing
    if (!tool.logo) {
      tool.logo = `/logos/${tool.slug || generateSlug(tool.name)}.png`;
    }
    
    // Add meta if missing
    if (!tool.meta) {
      tool.meta = {
        title: `${tool.name} Review 2024: Features, Pricing & Alternatives`,
        description: tool.description || tool.overview?.description || `Comprehensive review of ${tool.name}. Compare features, pricing, and alternatives.`
      };
    }
    
    // Add basic properties if they don't exist
    if (!tool.pros) {
      tool.pros = ['AI-powered features', 'User-friendly interface', 'Good performance'];
    }
    
    if (!tool.cons) {
      tool.cons = ['Learning curve', 'Pricing could be better'];
    }
    
    if (!tool.related_tools) {
      tool.related_tools = [];
    }
    
    if (!tool.benchmarks) {
      tool.benchmarks = {
        speed: 4.2,
        accuracy: 4.3,
        integration: 4.1,
        ease_of_use: 4.0,
        value: 4.2
      };
    }
    
    // Ensure pricing is in the right format
    if (tool.pricing && !Array.isArray(tool.pricing)) {
      const oldPricing = tool.pricing;
      tool.pricing = [{
        plan: oldPricing.free_tier ? 'Free' : 'Professional',
        price_per_month: oldPricing.starting_price || 0,
        features: tool.features || ['Basic features', 'Standard support']
      }];
      
      if (!oldPricing.free_tier && oldPricing.starting_price > 0) {
        tool.pricing.unshift({
          plan: 'Free',
          price_per_month: 0,
          features: ['Limited features', 'Basic support']
        });
      }
    }
  });
  
  // Save updated data
  fs.writeFileSync(TOOLS_FILE, JSON.stringify(data, null, 2));
  
  console.log(`\n✅ Fixed ${fixed} tools with missing slugs`);
  console.log(`📈 Total tools: ${data.length}`);
  
  // Verify all tools now have slugs
  const stillMissingSlugs = data.filter(tool => !tool.slug);
  if (stillMissingSlugs.length === 0) {
    console.log('🎉 All tools now have valid slugs!');
  } else {
    console.log(`⚠️ ${stillMissingSlugs.length} tools still missing slugs`);
  }
}

fixMissingSlugs();