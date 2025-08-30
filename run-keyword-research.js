#!/usr/bin/env node

// Simple runner for keyword research
import('./dataforseo-advanced.js')
  .then(module => module.default)
  .then(DataForSEOClient => {
    const researcher = new DataForSEOClient();
    return researcher.runComprehensiveResearch()
      .then(({ allResults, relatedKeywords }) => {
        const report = researcher.generateReport(allResults, relatedKeywords);
        return researcher.saveResults({
          ...report,
          generated_at: new Date().toISOString(),
          config: {
            location: "United States", 
            language: "English",
            total_cost: researcher.totalCost
          }
        });
      });
  })
  .then(filepath => {
    console.log(`\n✅ Research complete! Results saved to: ${require('path').basename(filepath)}`);
  })
  .catch(error => {
    console.error(`\n❌ Research failed:`, error.message);
    process.exit(1);
  });