const fs = require('fs');
const path = require('path');

// List of 404 URLs to analyze and fix
const urls404 = [
  // Category pages with query parameters
  'https://www.siteoptz.ai/tools?category=Finance AI',
  'https://www.siteoptz.ai/tools?category=Lead Generation', 
  'https://www.siteoptz.ai/tools?category=UX',
  'https://www.siteoptz.ai/tools?category=Image Generation',
  'https://www.siteoptz.ai/tools?category=AI Automation',
  'https://www.siteoptz.ai/tools?category=Paid Search &amp; PPC',
  'https://www.siteoptz.ai/tools?category=Video Generation',
  'https://www.siteoptz.ai/tools?category=E-commerce',
  'https://www.siteoptz.ai/tools?category=Email Marketing',
  'https://www.siteoptz.ai/tools?category=Productivity',
  'https://www.siteoptz.ai/tools?category=SEO &amp; Optimization',
  'https://www.siteoptz.ai/tools?category=Code Generation',
  'https://www.siteoptz.ai/tools?category=Content Creation',
  'https://www.siteoptz.ai/tools?category=Best Voice AI Tools',
  'https://www.siteoptz.ai/tools?category=Research &amp; Education',
  'https://www.siteoptz.ai/tools?category=Social Media',
  'https://www.siteoptz.ai/tools?category=Website Builder',
  'https://www.siteoptz.ai/tools?category=Data Analysis',
  'https://www.siteoptz.ai/tools?category=AI Education',
  'https://www.siteoptz.ai/tools?category=AI For Business',
  'https://www.siteoptz.ai/tools?category=AI Translator',
  'https://www.siteoptz.ai/tools?category=AI Website Builder',
  'https://www.siteoptz.ai/tools?category=Health AI',
  'https://www.siteoptz.ai/tools?category=Voice AI',
  'https://www.siteoptz.ai/tools?category=Writing',
  
  // Existing category pages
  'https://www.siteoptz.ai/categories/e-commerce',
  
  // Comparison pages  
  'https://www.siteoptz.ai/compare/chatgpt/vs/perplexity-ai',
  'https://www.siteoptz.ai/compare/jasper-ai/vs/writesonic',
  'https://www.siteoptz.ai/compare/midjourney/vs/chatgpt',
  'https://www.siteoptz.ai/compare/midjourney/vs/dall-e',
  'https://www.siteoptz.ai/compare/copy-ai/vs/writesonic',
  
  // Reviews pages
  'https://www.siteoptz.ai/reviews/planable',
  'https://www.siteoptz.ai/reviews/speechki-text-to-speech-ai',
  'https://www.siteoptz.ai/reviews/text-to-video-stunning-video-creation',
  'https://www.siteoptz.ai/reviews/gpt-4',
  'https://www.siteoptz.ai/reviews/midjourney-v6',
  'https://www.siteoptz.ai/reviews/otter-ai',
  'https://www.siteoptz.ai/reviews/gemini-2-5',
  'https://www.siteoptz.ai/reviews/cohere',
  'https://www.siteoptz.ai/reviews/webbotify-ai-powered-chatbot-platform',
  'https://www.siteoptz.ai/reviews/replicate',
  'https://www.siteoptz.ai/reviews/stable-diffusion-web',
  'https://www.siteoptz.ai/reviews/universe-no-code-custom-website-builder',
  'https://www.siteoptz.ai/reviews/convertfiles-ai-free-image-file-converter',
  'https://www.siteoptz.ai/reviews/tellers-ai-automatic-text-to-video-tool',
  'https://www.siteoptz.ai/reviews/hugging-face',
  'https://www.siteoptz.ai/reviews/videotube',
  'https://www.siteoptz.ai/reviews/explee',
  'https://www.siteoptz.ai/reviews/divedeck-ai-powered-deck-builder',
  'https://www.siteoptz.ai/reviews/unreal-speech-cost-effective-text-to-speech-api',
  'https://www.siteoptz.ai/reviews/kleap',
  'https://www.siteoptz.ai/reviews/character-ai',
  
  // Resources and case studies
  'https://www.siteoptz.ai/case-studies/manufacturing-ai',
  'https://www.siteoptz.ai/resources/automation-toolkit',
  'https://www.siteoptz.ai/resources/ai-strategy-guide',
  'https://www.siteoptz.ai/case-studies/ai-content-creators',
  'https://www.siteoptz.ai/resources/creator-ai-toolkit',
  'https://www.siteoptz.ai/resources/content-ai-comparison',
  'https://www.siteoptz.ai/case-studies/ai-customer-service',
  'https://www.siteoptz.ai/resources/cs-automation-checklist',
  'https://www.siteoptz.ai/resources/security-platform-comparison',
  'https://www.siteoptz.ai/case-studies/ai-cybersecurity',
  'https://www.siteoptz.ai/resources/ai-security-guide',
  'https://www.siteoptz.ai/resources/ai-analytics-guide',
  'https://www.siteoptz.ai/case-studies/predictive-analytics',
  'https://www.siteoptz.ai/resources/analytics-platform-comparison',
  'https://www.siteoptz.ai/tools/data-science-roi',
  'https://www.siteoptz.ai/resources/personalization-strategy',
  'https://www.siteoptz.ai/resources/ecommerce-ai-playbook',
  'https://www.siteoptz.ai/resources/risk-management-ai',
  'https://www.siteoptz.ai/tools/fintech-ai-roi',
  'https://www.siteoptz.ai/resources/algorithmic-trading-guide',
  'https://www.siteoptz.ai/resources/healthcare-ai-guide',
  'https://www.siteoptz.ai/resources/hipaa-ai-compliance',
  'https://www.siteoptz.ai/case-studies/healthcare-ai',
  'https://www.siteoptz.ai/resources/hr-ai-implementation',
  'https://www.siteoptz.ai/case-studies/smart-manufacturing',
  'https://www.siteoptz.ai/resources/industry-40-guide',
  'https://www.siteoptz.ai/resources/predictive-maintenance',
  'https://www.siteoptz.ai/case-studies/sales-ai',
  'https://www.siteoptz.ai/resources/lead-scoring-guide',
  'https://www.siteoptz.ai/resources/sales-ai-playbook',
  'https://www.siteoptz.ai/resources/ai-security-checklist',
  'https://www.siteoptz.ai/case-studies/fortune-500-chatgpt',
  'https://www.siteoptz.ai/resources/chatgpt-enterprise-guide',
  'https://www.siteoptz.ai/resources/ai-implementation-guide',
  'https://www.siteoptz.ai/reports/claude-gpt4-benchmark',
  'https://www.siteoptz.ai/resources/ai-model-selection',
  'https://www.siteoptz.ai/resources/marketing-ai-tools-comparison',
  'https://www.siteoptz.ai/case-studies/marketing-ai-success',
  'https://www.siteoptz.ai/resources/marketing-ai-strategy',
  'https://www.siteoptz.ai/resources/no-code-ai-comparison',
  'https://www.siteoptz.ai/case-studies/no-code-ai-wins',
  'https://www.siteoptz.ai/resources/business-ai-training'
];

// More comparison URLs
const comparisonUrls = [
  'https://www.siteoptz.ai/compare/athenic-ai/vs/10web',
  'https://www.siteoptz.ai/compare/athenic-ai/vs/adalysis',
  'https://www.siteoptz.ai/compare/athenic-ai/vs/adcreative-ai',
  'https://www.siteoptz.ai/compare/athenic-ai/vs/adbeat',
  'https://www.siteoptz.ai/compare/athenic-ai/vs/adespresso',
  'https://www.siteoptz.ai/compare/athenic-ai/vs/acquisio',
  'https://www.siteoptz.ai/compare/colossyan-creator/vs/acquisio',
  'https://www.siteoptz.ai/compare/colossyan-creator/vs/adcreative-ai',
  'https://www.siteoptz.ai/compare/colossyan-creator/vs/adbeat',
  'https://www.siteoptz.ai/compare/colossyan-creator/vs/10web',
  'https://www.siteoptz.ai/compare/colossyan-creator/vs/adalysis',
  'https://www.siteoptz.ai/compare/colossyan-creator/vs/adespresso',
  'https://www.siteoptz.ai/compare/contentstudio/vs/coschedule',
  'https://www.siteoptz.ai/compare/contentstudio/vs/buffer',
  'https://www.siteoptz.ai/compare/contentstudio/vs/hootsuite',
  'https://www.siteoptz.ai/compare/copilot-audio-expression/vs/adcreative-ai',
  'https://www.siteoptz.ai/compare/copilot-audio-expression/vs/adbeat',
  'https://www.siteoptz.ai/compare/copilot-audio-expression/vs/acquisio',
  'https://www.siteoptz.ai/compare/copilot-audio-expression/vs/adalysis',
  'https://www.siteoptz.ai/compare/copilot-audio-expression/vs/10web',
  'https://www.siteoptz.ai/compare/copilot-audio-expression/vs/adespresso',
  'https://www.siteoptz.ai/compare/elai-io/vs/adbeat',
  'https://www.siteoptz.ai/compare/elai-io/vs/10web',
  'https://www.siteoptz.ai/compare/elai-io/vs/acquisio',
  'https://www.siteoptz.ai/compare/elai-io/vs/adcreative-ai',
  'https://www.siteoptz.ai/compare/elai-io/vs/adespresso',
  'https://www.siteoptz.ai/compare/elai-io/vs/adalysis',
  'https://www.siteoptz.ai/compare/facecheck-id/vs/adbeat',
  'https://www.siteoptz.ai/compare/facecheck-id/vs/acquisio',
  'https://www.siteoptz.ai/compare/facecheck-id/vs/10web',
  'https://www.siteoptz.ai/compare/facecheck-id/vs/adcreative-ai',
  'https://www.siteoptz.ai/compare/facecheck-id/vs/adespresso',
  'https://www.siteoptz.ai/compare/facecheck-id/vs/adalysis',
  'https://www.siteoptz.ai/compare/google-gemini/vs/adalysis',
  'https://www.siteoptz.ai/compare/google-gemini/vs/10web',
  'https://www.siteoptz.ai/compare/google-gemini/vs/adcreative-ai',
  'https://www.siteoptz.ai/compare/google-gemini/vs/adbeat',
  'https://www.siteoptz.ai/compare/google-gemini/vs/acquisio',
  'https://www.siteoptz.ai/compare/google-gemini/vs/adespresso',
  'https://www.siteoptz.ai/compare/loomly/vs/socialpilot',
  'https://www.siteoptz.ai/compare/loomly/vs/buffer',
  'https://www.siteoptz.ai/compare/loomly/vs/hootsuite',
  'https://www.siteoptz.ai/compare/mangools/vs/adbeat',
  'https://www.siteoptz.ai/compare/mangools/vs/10web',
  'https://www.siteoptz.ai/compare/mangools/vs/acquisio',
  'https://www.siteoptz.ai/compare/mangools/vs/adcreative-ai',
  'https://www.siteoptz.ai/compare/mangools/vs/adespresso',
  'https://www.siteoptz.ai/compare/mangools/vs/adalysis',
  'https://www.siteoptz.ai/compare/playground-ai/vs/adbeat',
  'https://www.siteoptz.ai/compare/playground-ai/vs/adalysis',
  'https://www.siteoptz.ai/compare/playground-ai/vs/adespresso',
  'https://www.siteoptz.ai/compare/playground-ai/vs/acquisio',
  'https://www.siteoptz.ai/compare/playground-ai/vs/adcreative-ai',
  'https://www.siteoptz.ai/compare/playground-ai/vs/10web',
  'https://www.siteoptz.ai/compare/quiki-io/vs/acquisio',
  'https://www.siteoptz.ai/compare/quiki-io/vs/adbeat',
  'https://www.siteoptz.ai/compare/quiki-io/vs/adespresso',
  'https://www.siteoptz.ai/compare/quiki-io/vs/adalysis',
  'https://www.siteoptz.ai/compare/quiki-io/vs/10web',
  'https://www.siteoptz.ai/compare/quiki-io/vs/adcreative-ai',
  'https://www.siteoptz.ai/compare/se-ranking/vs/adespresso',
  'https://www.siteoptz.ai/compare/se-ranking/vs/adalysis',
  'https://www.siteoptz.ai/compare/se-ranking/vs/10web',
  'https://www.siteoptz.ai/compare/se-ranking/vs/acquisio',
  'https://www.siteoptz.ai/compare/se-ranking/vs/adcreative-ai',
  'https://www.siteoptz.ai/compare/se-ranking/vs/adbeat',
  'https://www.siteoptz.ai/compare/seaart-ai/vs/10web',
  'https://www.siteoptz.ai/compare/seaart-ai/vs/adalysis',
  'https://www.siteoptz.ai/compare/seaart-ai/vs/adespresso',
  'https://www.siteoptz.ai/compare/seaart-ai/vs/adbeat',
  'https://www.siteoptz.ai/compare/seaart-ai/vs/acquisio',
  'https://www.siteoptz.ai/compare/seaart-ai/vs/adcreative-ai',
  'https://www.siteoptz.ai/compare/sendible/vs/hootsuite',
  'https://www.siteoptz.ai/compare/sendible/vs/sprout-social',
  'https://www.siteoptz.ai/compare/sendible/vs/loomly',
  'https://www.siteoptz.ai/compare/serpstat/vs/adcreative-ai',
  'https://www.siteoptz.ai/compare/serpstat/vs/adespresso',
  'https://www.siteoptz.ai/compare/serpstat/vs/adalysis',
  'https://www.siteoptz.ai/compare/serpstat/vs/adbeat',
  'https://www.siteoptz.ai/compare/serpstat/vs/10web',
  'https://www.siteoptz.ai/compare/serpstat/vs/acquisio',
  'https://www.siteoptz.ai/compare/social-champ/vs/loomly',
  'https://www.siteoptz.ai/compare/social-champ/vs/buffer',
  'https://www.siteoptz.ai/compare/social-champ/vs/hootsuite',
  'https://www.siteoptz.ai/compare/socialpilot/vs/loomly',
  'https://www.siteoptz.ai/compare/socialpilot/vs/hootsuite',
  'https://www.siteoptz.ai/compare/socialpilot/vs/buffer',
  'https://www.siteoptz.ai/compare/tugan-ai/vs/adespresso',
  'https://www.siteoptz.ai/compare/tugan-ai/vs/adalysis',
  'https://www.siteoptz.ai/compare/tugan-ai/vs/10web',
  'https://www.siteoptz.ai/compare/tugan-ai/vs/adbeat',
  'https://www.siteoptz.ai/compare/tugan-ai/vs/adcreative-ai',
  'https://www.siteoptz.ai/compare/tugan-ai/vs/acquisio'
];

function analyzeUrls() {
  console.log('=== 404 URL ANALYSIS ===\n');
  
  // Category URLs with query parameters
  const categoryUrls = urls404.filter(url => url.includes('/tools?category='));
  console.log('Category URLs that need redirects:');
  categoryUrls.forEach(url => {
    const categoryParam = decodeURIComponent(url.split('category=')[1]);
    const categorySlug = categoryParam.toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/&.*$/, '')  // Remove HTML entities
      .replace(/[^a-z0-9-]/g, '');
    console.log(`  ${url} -> /categories/${categorySlug}`);
  });
  
  console.log('\n');
  
  // Comparison URLs 
  const compUrls = [...urls404.filter(url => url.includes('/compare/')), ...comparisonUrls];
  console.log('Comparison URLs that need generation:');
  compUrls.forEach(url => {
    console.log(`  ${url}`);
  });
  
  console.log('\n');
  
  // Review URLs
  const reviewUrls = urls404.filter(url => url.includes('/reviews/'));
  console.log('Review URLs that need generation:');
  reviewUrls.forEach(url => {
    console.log(`  ${url}`);
  });
  
  console.log('\n');
  
  // Resources and case studies
  const resourceUrls = urls404.filter(url => url.includes('/resources/') || url.includes('/case-studies/') || url.includes('/reports/'));
  console.log('Resource/Case Study URLs that need generation:');
  resourceUrls.forEach(url => {
    console.log(`  ${url}`);
  });
  
  console.log('\n=== SUMMARY ===');
  console.log(`Category redirects needed: ${categoryUrls.length}`);
  console.log(`Comparison pages needed: ${compUrls.length}`);
  console.log(`Review pages needed: ${reviewUrls.length}`);
  console.log(`Resource pages needed: ${resourceUrls.length}`);
  console.log(`Total 404s to fix: ${urls404.length + comparisonUrls.length}`);
}

analyzeUrls();