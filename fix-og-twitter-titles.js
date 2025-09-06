#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Function to extract title description from main title tag
function extractTitleDescription(content) {
  const titleMatch = content.match(/<title>.*?Review:\s*(.*?)\s*\|\s*SiteOptz<\/title>/);
  if (titleMatch && titleMatch[1]) {
    return titleMatch[1].trim();
  }
  return null;
}

// Main function to fix OG and Twitter titles
async function fixOGTwitterTitles() {
  const componentsDir = path.join(__dirname, 'seo-optimization/production-components');
  
  if (!fs.existsSync(componentsDir)) {
    console.error('SEO components directory not found:', componentsDir);
    return;
  }

  const files = fs.readdirSync(componentsDir).filter(file => file.endsWith('.tsx'));
  let updatedCount = 0;
  let errors = [];

  console.log(`Found ${files.length} SEO component files to check for OG/Twitter titles...`);

  for (const file of files) {
    const filePath = path.join(componentsDir, file);
    const content = fs.readFileSync(filePath, 'utf8');
    
    // Check if this file has empty OG or Twitter titles
    if (content.includes('og:title.*Review:  |') || 
        content.includes('twitter:title.*Review:  |') ||
        content.includes('content=".*Review:  |')) {
      try {
        
        // Extract the description from the main title tag
        const titleDescription = extractTitleDescription(content);
        
        if (!titleDescription) {
          console.warn(`No title description found in ${file}, skipping`);
          continue;
        }

        // Replace empty OG titles
        let updatedContent = content.replace(
          /(property="og:title" content=".*?Review:)\s+(\| SiteOptz")/g,
          `$1 ${titleDescription} $2`
        );

        // Replace empty Twitter titles  
        updatedContent = updatedContent.replace(
          /(name="twitter:title" content=".*?Review:)\s+(\| SiteOptz")/g,
          `$1 ${titleDescription} $2`
        );

        // Only write if content changed
        if (updatedContent !== content) {
          fs.writeFileSync(filePath, updatedContent, 'utf8');
          console.log(`✓ Updated OG/Twitter titles in ${file}: "${titleDescription}"`);
          updatedCount++;
        }
        
      } catch (error) {
        console.error(`✗ Error updating ${file}:`, error.message);
        errors.push({ file, error: error.message });
      }
    }
  }

  console.log(`\n✅ OG/Twitter titles update complete!`);
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
fixOGTwitterTitles().catch(console.error);