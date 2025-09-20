const fs = require('fs');
const path = require('path');

function cleanScrapedData(inputFile) {
  const data = JSON.parse(fs.readFileSync(inputFile, 'utf8'));
  
  const cleanedTools = data.filter(tool => {
    // Remove tools that are clearly not actual tools
    const name = tool.name.toLowerCase();
    
    // Filter out image alt texts, contact info, and navigation
    const invalidPatterns = [
      /^!\[/,  // Image markdown
      /^(email|phone|twitter|support)/,
      /^(submit|contact|let's get|in touch)/,
      /^\w{1,2}$/,  // Single or double letters
      /^(us|ai)$/i,
      /^(with|get|in|the|and|or|a|an)\s/,
      /support@/,
      /\.com$/,
      /let's get.*in touch/i,
      /contact.*us/i,
      /touch.*us/i
    ];
    
    const isInvalid = invalidPatterns.some(pattern => pattern.test(name));
    
    // Also check if it has meaningful content
    const hasValidDescription = tool.overview.description && 
                               tool.overview.description !== '\\\\' && 
                               tool.overview.description.trim().length > 0;
    
    // Keep tools that don't match invalid patterns and seem legitimate
    return !isInvalid && tool.name.length > 2;
  });
  
  // Clean up descriptions
  cleanedTools.forEach(tool => {
    if (tool.overview.description === '\\\\' || !tool.overview.description) {
      tool.overview.description = `${tool.name} is an AI-powered tool that helps streamline workflows and enhance productivity.`;
      tool.overview.long_description = `${tool.name} is a comprehensive AI solution designed to help businesses optimize their operations and maintain competitive advantages in their respective markets.`;
      tool.meta.description = `${tool.name} - AI tool review covering features, pricing, and alternatives.`;
    }
  });
  
  console.log(`Cleaned data: ${data.length} -> ${cleanedTools.length} tools`);
  
  // Save cleaned data
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  const outputFile = inputFile.replace('.json', '-cleaned.json');
  
  fs.writeFileSync(outputFile, JSON.stringify(cleanedTools, null, 2));
  console.log(`Cleaned data saved to: ${outputFile}`);
  
  // Print summary
  console.log('\nExtracted Tools:');
  cleanedTools.forEach((tool, index) => {
    console.log(`${index + 1}. ${tool.name}`);
  });
  
  return cleanedTools;
}

// Get the most recent scraped file
const scrapedDir = '/Users/siteoptz/siteoptz-scraping/scraped-data';
const files = fs.readdirSync(scrapedDir)
  .filter(file => file.includes('compatible') && file.endsWith('.json'))
  .sort()
  .reverse();

if (files.length > 0) {
  const latestFile = path.join(scrapedDir, files[0]);
  console.log(`Processing: ${latestFile}`);
  cleanScrapedData(latestFile);
} else {
  console.log('No compatible scraped files found');
}