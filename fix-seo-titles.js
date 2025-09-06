#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Load unified tools data
const { loadUnifiedToolsData } = require('./utils/unifiedDataAdapter');
const unifiedTools = loadUnifiedToolsData(fs, path);

// Also load old format data for fallback
const aiToolsData = JSON.parse(fs.readFileSync(path.join(__dirname, 'public/data/aiToolsData.json'), 'utf8'));

// Helper function to generate descriptive text based on category
function generateTitleDescription(tool) {
  const category = tool.category || tool.overview?.category || '';
  const description = tool.description || tool.overview?.description || '';
  
  // Category-based title descriptions
  const categoryDescriptions = {
    'AI Automation': 'AI Workflow Automation Tool',
    'Content Creation': 'AI Content Creation Platform',
    'Code Generation': 'AI Code Assistant',
    'Data Analysis': 'AI Data Analytics Platform',
    'Email Marketing': 'AI Email Marketing Tool',
    'Image Generation': 'AI Image Generator',
    'Video Generation': 'AI Video Creation Tool',
    'Social Media': 'AI Social Media Management Tool',
    'SEO & Optimization': 'AI SEO Optimization Tool',
    'Productivity': 'AI Productivity Assistant',
    'Research & Education': 'AI Research Assistant',
    'UX': 'AI UX Design Tool',
    'Website Builder': 'AI Website Builder',
    'Writing': 'AI Writing Assistant',
    'Voice AI': 'AI Voice Generation Tool',
    'Finance AI': 'AI Financial Analysis Tool',
    'Health AI': 'AI Healthcare Assistant',
    'Lead Generation': 'AI Lead Generation Tool',
    'Paid Search & PPC': 'AI PPC Management Tool',
    'Best Voice AI Tools': 'AI Voice Technology',
    'AI Education': 'AI Educational Tool',
    'AI For Business': 'AI Business Solution',
    'AI Translator': 'AI Translation Tool',
    'AI Website Builder': 'AI Website Creation Platform'
  };

  // Try category-based description first
  if (categoryDescriptions[category]) {
    return categoryDescriptions[category];
  }

  // Extract key features from description
  if (description) {
    const desc = description.toLowerCase();
    
    if (desc.includes('chatbot') || desc.includes('chat bot')) return 'AI Chatbot Platform';
    if (desc.includes('image generat') || desc.includes('image creat')) return 'AI Image Generator';
    if (desc.includes('video generat') || desc.includes('video creat')) return 'AI Video Creation Tool';
    if (desc.includes('writing') || desc.includes('content writ')) return 'AI Writing Assistant';
    if (desc.includes('voice') || desc.includes('speech') || desc.includes('audio')) return 'AI Voice Technology';
    if (desc.includes('code') || desc.includes('programming') || desc.includes('develop')) return 'AI Code Assistant';
    if (desc.includes('data analy') || desc.includes('analytic')) return 'AI Data Analytics Tool';
    if (desc.includes('website build') || desc.includes('web build')) return 'AI Website Builder';
    if (desc.includes('marketing') || desc.includes('advertis')) return 'AI Marketing Tool';
    if (desc.includes('design') || desc.includes('ui/ux')) return 'AI Design Tool';
    if (desc.includes('research') || desc.includes('academ')) return 'AI Research Assistant';
    if (desc.includes('productiv') || desc.includes('workflow')) return 'AI Productivity Tool';
    if (desc.includes('seo') || desc.includes('search engine')) return 'AI SEO Tool';
    if (desc.includes('social media') || desc.includes('social network')) return 'AI Social Media Tool';
    if (desc.includes('email') || desc.includes('newsletter')) return 'AI Email Tool';
    if (desc.includes('translation') || desc.includes('translate')) return 'AI Translation Tool';
    if (desc.includes('automation') || desc.includes('automat')) return 'AI Automation Tool';
  }

  // Fallback based on tool name patterns
  const toolName = tool.tool_name || tool.name || '';
  const nameLower = toolName.toLowerCase();
  
  if (nameLower.includes('gpt') || nameLower.includes('chat')) return 'AI Chat Assistant';
  if (nameLower.includes('video')) return 'AI Video Tool';
  if (nameLower.includes('image') || nameLower.includes('photo')) return 'AI Image Tool';
  if (nameLower.includes('write') || nameLower.includes('content')) return 'AI Writing Tool';
  if (nameLower.includes('voice') || nameLower.includes('speech')) return 'AI Voice Tool';
  if (nameLower.includes('code') || nameLower.includes('dev')) return 'AI Development Tool';
  if (nameLower.includes('design')) return 'AI Design Tool';
  if (nameLower.includes('market')) return 'AI Marketing Tool';
  
  // Generic fallback
  return 'AI-Powered Solution';
}

// Function to find tool data by slug
function findToolBySlug(slug) {
  // First try unified tools
  const unifiedTool = unifiedTools.find(tool => 
    (tool.slug === slug) ||
    (tool.tool_name && tool.tool_name.toLowerCase().replace(/[^a-z0-9]+/g, '-') === slug)
  );
  
  if (unifiedTool) {
    return unifiedTool;
  }
  
  // Fallback to old format
  const oldFormatTool = aiToolsData.find(tool => tool.slug === slug);
  if (oldFormatTool) {
    return {
      tool_name: oldFormatTool.name,
      category: oldFormatTool.overview?.category || '',
      description: oldFormatTool.overview?.description || '',
      slug: oldFormatTool.slug
    };
  }
  
  return null;
}

// Function to extract tool name from component filename
function getToolNameFromFilename(filename) {
  // Convert PascalCase filename to tool name
  // E.g., "UxPilotReviewPage.tsx" -> "UX Pilot"
  return filename
    .replace('ReviewPage.tsx', '')
    .replace(/([A-Z])/g, ' $1')
    .trim()
    .replace(/^Ai\s/, 'AI ')
    .replace(/\sAi(\s|$)/g, ' AI$1')
    .replace(/\sGpt(\s|$)/g, ' GPT$1')
    .replace(/\sApi(\s|$)/g, ' API$1')
    .replace(/\sUi(\s|$)/g, ' UI$1')
    .replace(/\sUx(\s|$)/g, ' UX$1')
    .replace(/\sSeo(\s|$)/g, ' SEO$1');
}

// Function to convert filename to slug
function filenameToSlug(filename) {
  return filename
    .replace('ReviewPage.tsx', '')
    .replace(/([A-Z])/g, '-$1')
    .toLowerCase()
    .replace(/^-/, '');
}

// Main function to fix all titles
async function fixSEOTitles() {
  const componentsDir = path.join(__dirname, 'seo-optimization/production-components');
  
  if (!fs.existsSync(componentsDir)) {
    console.error('SEO components directory not found:', componentsDir);
    return;
  }

  const files = fs.readdirSync(componentsDir).filter(file => file.endsWith('.tsx'));
  let updatedCount = 0;
  let errors = [];

  console.log(`Found ${files.length} SEO component files to check...`);

  for (const file of files) {
    const filePath = path.join(componentsDir, file);
    const content = fs.readFileSync(filePath, 'utf8');
    
    // Check if this file has the empty title issue
    if (content.includes('Review:  | SiteOptz')) {
      try {
        const slug = filenameToSlug(file);
        const toolName = getToolNameFromFilename(file);
        
        // Try to find tool data
        const toolData = findToolBySlug(slug);
        
        let titleDescription;
        if (toolData) {
          titleDescription = generateTitleDescription(toolData);
        } else {
          // Fallback to generic description based on filename
          titleDescription = 'AI-Powered Solution';
          console.warn(`No tool data found for ${slug}, using generic description`);
        }

        // Replace the empty title with a proper one
        const updatedContent = content.replace(
          /(<title>.*?Review:)\s+(\| SiteOptz<\/title>)/g,
          `$1 ${titleDescription} $2`
        );

        // Write the updated content back
        fs.writeFileSync(filePath, updatedContent, 'utf8');
        
        console.log(`✓ Updated ${file}: "${toolName} Review: ${titleDescription} | SiteOptz"`);
        updatedCount++;
        
      } catch (error) {
        console.error(`✗ Error updating ${file}:`, error.message);
        errors.push({ file, error: error.message });
      }
    }
  }

  console.log(`\n✅ Process complete!`);
  console.log(`   Updated: ${updatedCount} files`);
  console.log(`   Errors: ${errors.length} files`);
  
  if (errors.length > 0) {
    console.log(`\nErrors encountered:`);
    errors.forEach(({ file, error }) => {
      console.log(`   ${file}: ${error}`);
    });
  }
}

// Run the fix
fixSEOTitles().catch(console.error);