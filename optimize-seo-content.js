const fs = require('fs');

class SEOContentOptimizer {
  constructor() {
    this.dataPath = './public/data/aiToolsData.json';
    this.toolsData = JSON.parse(fs.readFileSync(this.dataPath, 'utf8'));
    this.stats = { optimized: 0, sizeBefore: 0, sizeAfter: 0 };
  }

  optimizeTool(tool) {
    let optimized = false;
    
    // Optimize long-form description - keep essential, remove verbose parts
    if (tool.overview?.long_description && tool.overview.long_description.length > 500) {
      const sentences = tool.overview.long_description.split('. ');
      tool.overview.long_description = sentences.slice(0, 3).join('. ') + '.';
      optimized = true;
    }

    // Optimize enhanced features - reduce to core info only
    if (tool.enhanced_features && Array.isArray(tool.enhanced_features)) {
      tool.enhanced_features = tool.enhanced_features.slice(0, 3).map(feature => ({
        name: feature.name,
        seoDescription: feature.seoDescription ? feature.seoDescription.substring(0, 200) + '...' : '',
        benefits: feature.benefits ? feature.benefits.slice(0, 2) : []
      }));
      optimized = true;
    }

    // Optimize FAQ - reduce to most important 4 questions
    if (tool.faq && Array.isArray(tool.faq)) {
      tool.faq = tool.faq.slice(0, 4).map(faq => ({
        question: faq.question,
        answer: faq.answer.length > 150 ? faq.answer.substring(0, 150) + '...' : faq.answer
      }));
      optimized = true;
    }

    // Optimize implementation guide - reduce phases
    if (tool.implementation_guide?.phases) {
      tool.implementation_guide.phases = tool.implementation_guide.phases.slice(0, 2).map(phase => ({
        ...phase,
        activities: phase.activities?.slice(0, 2) || []
      }));
      optimized = true;
    }

    // Remove large technical specifications to reduce size
    if (tool.technical_specifications) {
      delete tool.technical_specifications;
      optimized = true;
    }

    // Optimize use cases - keep only 3
    if (tool.use_cases && Array.isArray(tool.use_cases)) {
      tool.use_cases = tool.use_cases.slice(0, 3);
      optimized = true;
    }

    // Remove detailed comparison framework to save space
    if (tool.comparison_framework) {
      delete tool.comparison_framework;
      optimized = true;
    }

    // Keep only essential benefits_roi data
    if (tool.benefits_roi) {
      tool.benefits_roi = {
        roi_metrics: tool.benefits_roi.roi_metrics,
        business_impact: tool.benefits_roi.business_impact ? 
          tool.benefits_roi.business_impact.substring(0, 200) + '...' : undefined
      };
      optimized = true;
    }

    return optimized;
  }

  async optimizeAllTools() {
    console.log('🚀 Optimizing SEO content for build size...\n');

    const sizeBefore = JSON.stringify(this.toolsData).length;
    this.stats.sizeBefore = sizeBefore;

    for (const tool of this.toolsData) {
      if (this.optimizeTool(tool)) {
        this.stats.optimized++;
      }
    }

    const sizeAfter = JSON.stringify(this.toolsData).length;
    this.stats.sizeAfter = sizeAfter;

    // Save optimized data
    fs.writeFileSync(this.dataPath, JSON.stringify(this.toolsData, null, 2));

    const reductionPercent = ((sizeBefore - sizeAfter) / sizeBefore * 100).toFixed(1);

    console.log(`📊 === SEO CONTENT OPTIMIZATION SUMMARY ===`);
    console.log(`✅ Tools optimized: ${this.stats.optimized}`);
    console.log(`📏 Size before: ${(sizeBefore / 1024 / 1024).toFixed(2)} MB`);
    console.log(`📉 Size after: ${(sizeAfter / 1024 / 1024).toFixed(2)} MB`);
    console.log(`🎯 Size reduction: ${reductionPercent}%`);
    console.log(`💾 Updated aiToolsData.json`);
  }
}

// Run the optimizer
const optimizer = new SEOContentOptimizer();
optimizer.optimizeAllTools().then(() => {
  console.log('\n🎉 SEO content optimization completed!');
}).catch(error => {
  console.error('❌ Optimization failed:', error);
});