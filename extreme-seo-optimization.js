const fs = require('fs');

class ExtremeSEOOptimizer {
  constructor() {
    this.dataPath = './public/data/aiToolsData.json';
    this.toolsData = JSON.parse(fs.readFileSync(this.dataPath, 'utf8'));
    this.stats = { optimized: 0, sizeBefore: 0, sizeAfter: 0 };
  }

  optimizeTool(tool) {
    let optimized = false;
    
    // Drastically reduce long-form description
    if (tool.overview?.long_description && tool.overview.long_description.length > 200) {
      const sentences = tool.overview.long_description.split('. ');
      tool.overview.long_description = sentences[0] + '.';
      optimized = true;
    }

    // Keep only 2 enhanced features with minimal descriptions
    if (tool.enhanced_features && Array.isArray(tool.enhanced_features)) {
      tool.enhanced_features = tool.enhanced_features.slice(0, 2).map(feature => ({
        name: feature.name,
        seoDescription: feature.seoDescription ? feature.seoDescription.substring(0, 100) + '...' : '',
        benefits: feature.benefits ? feature.benefits.slice(0, 1) : []
      }));
      optimized = true;
    }

    // Reduce FAQ to 2 questions only
    if (tool.faq && Array.isArray(tool.faq)) {
      tool.faq = tool.faq.slice(0, 2).map(faq => ({
        question: faq.question,
        answer: faq.answer.length > 80 ? faq.answer.substring(0, 80) + '...' : faq.answer
      }));
      optimized = true;
    }

    // Remove implementation guide entirely
    if (tool.implementation_guide) {
      delete tool.implementation_guide;
      optimized = true;
    }

    // Remove technical specifications
    if (tool.technical_specifications) {
      delete tool.technical_specifications;
      optimized = true;
    }

    // Keep only 2 use cases with minimal content
    if (tool.use_cases && Array.isArray(tool.use_cases)) {
      tool.use_cases = tool.use_cases.slice(0, 2).map(useCase => ({
        title: useCase.title,
        description: useCase.description ? useCase.description.substring(0, 100) + '...' : '',
        audience: useCase.audience,
        outcomes: useCase.outcomes ? useCase.outcomes.slice(0, 2) : []
      }));
      optimized = true;
    }

    // Remove comparison framework entirely
    if (tool.comparison_framework) {
      delete tool.comparison_framework;
      optimized = true;
    }

    // Severely reduce benefits_roi
    if (tool.benefits_roi) {
      tool.benefits_roi = {
        roi_metrics: tool.benefits_roi.roi_metrics,
        business_impact: tool.benefits_roi.business_impact ? 
          tool.benefits_roi.business_impact.substring(0, 100) + '...' : undefined
      };
      optimized = true;
    }

    // Remove seo_content entirely (this was likely the biggest contributor)
    if (tool.seo_content) {
      delete tool.seo_content;
      optimized = true;
    }

    // Keep meta simple
    if (tool.meta) {
      tool.meta = {
        description: tool.meta.description,
        keywords: tool.meta.keywords ? tool.meta.keywords.split(',').slice(0, 5).join(',') : undefined
      };
      optimized = true;
    }

    return optimized;
  }

  async optimizeAllTools() {
    console.log('🚀 EXTREME SEO content optimization for Vercel build...\n');

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

    console.log(`📊 === EXTREME SEO OPTIMIZATION SUMMARY ===`);
    console.log(`✅ Tools optimized: ${this.stats.optimized}`);
    console.log(`📏 Size before: ${(sizeBefore / 1024 / 1024).toFixed(2)} MB`);
    console.log(`📉 Size after: ${(sizeAfter / 1024 / 1024).toFixed(2)} MB`);
    console.log(`🎯 Size reduction: ${reductionPercent}%`);
    console.log(`💾 Updated aiToolsData.json with EXTREME optimization`);
    console.log(`\n⚠️  Note: This removes most SEO content to fit Vercel limits`);
  }
}

// Run the extreme optimizer
const optimizer = new ExtremeSEOOptimizer();
optimizer.optimizeAllTools().then(() => {
  console.log('\n🎉 EXTREME SEO optimization completed!');
}).catch(error => {
  console.error('❌ Optimization failed:', error);
});