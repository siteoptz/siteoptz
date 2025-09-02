#!/usr/bin/env node

const AutomatedToolAddition = require('./automated-tool-addition');

async function debugDuplicateDetection() {
  const automation = new AutomatedToolAddition();
  
  const testTool = {
    name: "TestTool Alpha",
    website: "https://testtool-alpha-unique.com",
    description: "Revolutionary AI automation platform for streamlining business processes",
    overview: {
      website: "https://testtool-alpha-unique.com",
      description: "Revolutionary AI automation platform for streamlining business processes"
    }
  };

  console.log(`🔍 Testing duplicate detection for: ${testTool.name}`);
  console.log(`📊 Existing tools count: ${automation.existingTools.length}`);
  
  const duplicates = automation.detectDuplicates(testTool);
  console.log(`🎯 Duplicates found: ${duplicates.length}`);
  
  if (duplicates.length > 0) {
    console.log(`📝 Duplicate types: ${[...new Set(duplicates.map(d => d.type))].join(', ')}`);
    console.log(`🔗 First few duplicates:`, duplicates.slice(0, 3).map(d => ({ 
      type: d.type, 
      existingName: d.existing.name,
      existingWebsite: d.existing.overview?.website 
    })));
  }
}

debugDuplicateDetection().catch(console.error);