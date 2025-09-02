const fs = require('fs');

function fixLogoSerialization() {
  console.log('🔧 Fixing logo serialization issues...\n');
  
  const data = JSON.parse(fs.readFileSync('./public/data/aiToolsData.json', 'utf8'));
  let fixed = 0;

  data.forEach((tool, index) => {
    let hasIssues = false;
    
    // If tool has logo but no logo_url, copy logo to logo_url
    if (tool.logo && !tool.hasOwnProperty('logo_url')) {
      tool.logo_url = tool.logo;
      fixed++;
      hasIssues = true;
      console.log(`Added logo_url for ${tool.name || tool.slug}`);
    }
    
    // If tool has no logo or logo_url, add null values
    if (!tool.hasOwnProperty('logo')) {
      tool.logo = null;
      hasIssues = true;
    }
    if (!tool.hasOwnProperty('logo_url')) {
      tool.logo_url = null;
      hasIssues = true;
    }
    
    // Check for any undefined values and replace with null
    Object.keys(tool).forEach(key => {
      if (tool[key] === undefined) {
        tool[key] = null;
        fixed++;
        hasIssues = true;
        console.log(`Fixed undefined ${key} in ${tool.name || tool.slug}`);
      }
    });
    
    if (hasIssues && index === 32) {
      console.log(`\n📋 Tool at index 32 (${tool.name}):`);
      console.log(`- logo: ${tool.logo}`);
      console.log(`- logo_url: ${tool.logo_url}`);
    }
  });

  console.log(`\n📊 Summary:`);
  console.log(`✅ Total properties fixed: ${fixed}`);
  console.log(`📁 Total tools processed: ${data.length}`);

  // Write back the fixed data
  fs.writeFileSync('./public/data/aiToolsData.json', JSON.stringify(data, null, 2));
  console.log('✅ Database updated successfully');
}

if (require.main === module) {
  fixLogoSerialization();
}

module.exports = { fixLogoSerialization };