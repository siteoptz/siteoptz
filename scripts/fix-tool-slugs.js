#!/usr/bin/env node

/**
 * Fix Tool Slug Mismatches
 * Updates tool data with correct slugs based on 404 analysis
 */

const fs = require('fs');
const path = require('path');

// Load current data
const toolDataPath = path.join(process.cwd(), 'public/data/aiToolsData.json');
const toolData = JSON.parse(fs.readFileSync(toolDataPath, 'utf8'));

// Load 404 analysis
const analysisPath = path.join(process.cwd(), 'scripts/404-analysis.json');
const analysis = JSON.parse(fs.readFileSync(analysisPath, 'utf8'));

console.log('🔧 FIXING TOOL SLUG MISMATCHES\n');

// Slug fixes - map from 404 slug to correct existing slug
const slugFixes = {
  'gpt-4': 'openai-gpt4',
  'cohere': 'cohere-ai', 
  'replicate': 'replicate-ai',
  'speechki-text-to-speech-ai': 'speechki-texttospeech-ai',
  'convertfiles-ai-free-image-file-converter': 'convertfilesai-free-image-file-converter',
  'webbotify-ai-powered-chatbot-platform': 'webbotify-aipowered-chatbot-platform',
  'divedeck-ai-powered-deck-builder': 'divedeck-aipowered-deck-builder',
  'explee': 'explee-ai',
  'gemini-2-5': 'gemini-25',
  'tellers-ai-automatic-text-to-video-tool': 'tellersai-automatic-texttovideo-tool',
  'otter-ai': 'otterai',
  'videotube': 'videotube-ai',
  'universe-no-code-custom-website-builder': 'universe-nocode-custom-website-builder',
  'stable-diffusion-web': 'stable-diffusion',
  'unreal-speech-cost-effective-text-to-speech-api': 'unreal-speech-costeffective-texttospeech-api',
  'kleap': 'kleap-ai',
  'hugging-face': 'huggingface-transformers',
  'text-to-video-stunning-video-creation': 'texttovideo-stunning-video-creation'
};

console.log('📝 Slug mappings to apply:');
Object.entries(slugFixes).forEach(([oldSlug, newSlug]) => {
  const tool = toolData.find(t => t.slug === newSlug);
  if (tool) {
    console.log(`  ✅ ${oldSlug} -> ${newSlug} (${tool.name})`);
  } else {
    console.log(`  ❌ ${oldSlug} -> ${newSlug} (NOT FOUND)`);
  }
});

// Create redirect mapping for the sitemap generator
const redirectMapping = {};
Object.entries(slugFixes).forEach(([oldSlug, newSlug]) => {
  const tool = toolData.find(t => t.slug === newSlug);
  if (tool) {
    redirectMapping[oldSlug] = newSlug;
  }
});

// Save redirect mapping
fs.writeFileSync(
  path.join(process.cwd(), 'scripts/slug-redirects.json'),
  JSON.stringify(redirectMapping, null, 2)
);

console.log(`\n💾 Created slug redirect mapping with ${Object.keys(redirectMapping).length} entries`);
console.log('📄 Saved to: scripts/slug-redirects.json');

// Now let's identify tools that are completely missing and should be added
const missingTools = ['planable', 'meet-geek', 'character-ai', 'midjourney-v6'];

console.log(`\n❌ COMPLETELY MISSING TOOLS (${missingTools.length}):`);
missingTools.forEach(slug => {
  console.log(`  - ${slug}`);
});

console.log('\n✅ Slug analysis complete! Next steps:');
console.log('  1. Update sitemap to use redirect mapping');
console.log('  2. Create missing tools if needed');
console.log('  3. Create category pages');
console.log('  4. Create ROI calculator pages');