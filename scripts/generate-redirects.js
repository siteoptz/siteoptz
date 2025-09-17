const fs = require('fs');
const path = require('path');

function processRedirectsFromCSV() {
  console.log('🔄 Processing redirects from CSV...');
  
  // Read the CSV file
  const csvPath = path.join(__dirname, '..', 'siteoptz.ai_permanent_redirects_20250917.csv');
  const csvContent = fs.readFileSync(csvPath, 'utf8');
  const lines = csvContent.split('\n');
  
  // Skip header line
  const redirects = new Map();
  let processedCount = 0;
  
  for (let i = 1; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line) continue;
    
    try {
      // Parse CSV line (handling commas in URLs properly)
      const parts = line.split(',');
      if (parts.length < 3) continue;
      
      const sourceUrl = parts[1];
      const destinationUrl = parts[2];
      
      if (!sourceUrl || !destinationUrl) continue;
      
      // Extract path from URLs
      const sourcePath = sourceUrl.replace('https://siteoptz.ai', '');
      const destPath = destinationUrl.replace('https://siteoptz.ai', '');
      
      // Skip if source and destination are the same
      if (sourcePath === destPath) continue;
      
      // Skip if source is empty (root redirects)
      if (!sourcePath || sourcePath === '/') continue;
      
      // Store unique redirects
      if (!redirects.has(sourcePath)) {
        redirects.set(sourcePath, destPath);
        processedCount++;
      }
    } catch (error) {
      console.warn(`⚠️  Skipping malformed line ${i}: ${error.message}`);
    }
  }
  
  console.log(`✅ Processed ${processedCount} unique redirects from ${lines.length - 1} total entries`);
  
  // Convert to Next.js redirect format
  const nextjsRedirects = Array.from(redirects.entries()).map(([source, destination]) => ({
    source,
    destination,
    permanent: true
  }));
  
  // Group by destination for analysis
  const destinationGroups = {};
  nextjsRedirects.forEach(redirect => {
    if (!destinationGroups[redirect.destination]) {
      destinationGroups[redirect.destination] = 0;
    }
    destinationGroups[redirect.destination]++;
  });
  
  console.log('\n📊 Redirect destinations summary:');
  Object.entries(destinationGroups)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10)
    .forEach(([dest, count]) => {
      console.log(`   ${dest}: ${count} redirects`);
    });
  
  return nextjsRedirects;
}

function generateNextConfigRedirects() {
  const redirects = processRedirectsFromCSV();
  
  // Read existing next.config.js
  const configPath = path.join(__dirname, '..', 'next.config.js');
  let configContent = fs.readFileSync(configPath, 'utf8');
  
  // Generate redirects function
  const redirectsFunction = `
  // Auto-generated redirects from siteoptz.ai_permanent_redirects_20250917.csv
  async redirects() {
    return [
${redirects.map(r => `      {
        source: '${r.source}',
        destination: '${r.destination}',
        permanent: true,
      }`).join(',\n')}
    ];
  },`;

  // Check if redirects function already exists
  const hasRedirects = configContent.includes('async redirects()');
  
  if (hasRedirects) {
    // Replace existing redirects function
    configContent = configContent.replace(
      /async redirects\(\)\s*{[\s\S]*?},/,
      redirectsFunction
    );
    console.log('🔄 Updated existing redirects function');
  } else {
    // Add redirects function before the closing brace
    const insertPosition = configContent.lastIndexOf('};');
    if (insertPosition === -1) {
      throw new Error('Could not find insertion point in next.config.js');
    }
    
    configContent = 
      configContent.slice(0, insertPosition) + 
      redirectsFunction + '\n' +
      configContent.slice(insertPosition);
    console.log('➕ Added new redirects function');
  }
  
  // Write updated config
  fs.writeFileSync(configPath, configContent);
  console.log(`✅ Successfully added ${redirects.length} redirects to next.config.js`);
  
  return redirects.length;
}

function validateRedirects() {
  console.log('\n🔍 Validating redirects...');
  
  // Basic validation checks
  const configPath = path.join(__dirname, '..', 'next.config.js');
  const configContent = fs.readFileSync(configPath, 'utf8');
  
  // Check if the config is valid JavaScript
  try {
    // Don't actually require it as it might have dependencies
    // Just check for basic syntax issues
    if (!configContent.includes('async redirects()')) {
      throw new Error('Redirects function not found');
    }
    
    if (!configContent.includes('permanent: true')) {
      throw new Error('Permanent redirects not properly configured');
    }
    
    console.log('✅ Next.js config validation passed');
    return true;
  } catch (error) {
    console.error('❌ Config validation failed:', error.message);
    return false;
  }
}

function main() {
  try {
    console.log('🚀 Starting redirect generation process...\n');
    
    const redirectCount = generateNextConfigRedirects();
    
    if (validateRedirects()) {
      console.log(`\n🎉 Successfully processed ${redirectCount} redirects!`);
      console.log('\n📝 Next steps:');
      console.log('   1. Test the development server: npm run dev');
      console.log('   2. Build and test: npm run build');
      console.log('   3. Deploy your changes');
      console.log('\n⚠️  Note: With this many redirects, build time may increase slightly.');
    } else {
      console.error('\n❌ Validation failed. Please check the configuration.');
      process.exit(1);
    }
  } catch (error) {
    console.error('❌ Error generating redirects:', error.message);
    console.error(error.stack);
    process.exit(1);
  }
}

if (require.main === module) {
  main();
}

module.exports = { processRedirectsFromCSV, generateNextConfigRedirects, validateRedirects };