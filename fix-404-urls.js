const fs = require('fs');
const path = require('path');

// List of 404 URLs to analyze and fix
const urls404 = [
  // Category pages with query parameters
  'https://siteoptz.ai/tools?category=Finance AI',
  'https://siteoptz.ai/tools?category=Lead Generation', 
  'https://siteoptz.ai/tools?category=UX',
  'https://siteoptz.ai/tools?category=Image Generation',
  'https://siteoptz.ai/tools?category=AI Automation',
  'https://siteoptz.ai/tools?category=Paid Search &amp; PPC',
  'https://siteoptz.ai/tools?category=Video Generation',
  'https://siteoptz.ai/tools?category=E-commerce',
  'https://siteoptz.ai/tools?category=Email Marketing',
  'https://siteoptz.ai/tools?category=Productivity',
  'https://siteoptz.ai/tools?category=SEO &amp; Optimization',
  'https://siteoptz.ai/tools?category=Code Generation',
  'https://siteoptz.ai/tools?category=Content Creation',
  'https://siteoptz.ai/tools?category=Best Voice AI Tools',
  'https://siteoptz.ai/tools?category=Research &amp; Education',
  'https://siteoptz.ai/tools?category=Social Media',
  'https://siteoptz.ai/tools?category=Website Builder',
  'https://siteoptz.ai/tools?category=Data Analysis',
  'https://siteoptz.ai/tools?category=AI Education',
  'https://siteoptz.ai/tools?category=AI For Business',
  'https://siteoptz.ai/tools?category=AI Translator',
  'https://siteoptz.ai/tools?category=AI Website Builder',
  'https://siteoptz.ai/tools?category=Health AI',
  'https://siteoptz.ai/tools?category=Voice AI',
  'https://siteoptz.ai/tools?category=Writing',
  
  // Existing category pages
  'https://siteoptz.ai/categories/e-commerce',
  
  // Comparison pages  
  'https://siteoptz.ai/compare/chatgpt/vs/perplexity-ai',
  'https://siteoptz.ai/compare/jasper-ai/vs/writesonic',
  'https://siteoptz.ai/compare/midjourney/vs/chatgpt',
  'https://siteoptz.ai/compare/midjourney/vs/dall-e',
  'https://siteoptz.ai/compare/copy-ai/vs/writesonic',
  
  // Reviews pages
  'https://siteoptz.ai/reviews/planable',
  'https://siteoptz.ai/reviews/speechki-text-to-speech-ai',
  'https://siteoptz.ai/reviews/text-to-video-stunning-video-creation',
  'https://siteoptz.ai/reviews/gpt-4',
  'https://siteoptz.ai/reviews/midjourney-v6',
  'https://siteoptz.ai/reviews/otter-ai',
  'https://siteoptz.ai/reviews/gemini-2-5',
  'https://siteoptz.ai/reviews/cohere',
  'https://siteoptz.ai/reviews/webbotify-ai-powered-chatbot-platform',
  'https://siteoptz.ai/reviews/replicate',
  'https://siteoptz.ai/reviews/stable-diffusion-web',
  'https://siteoptz.ai/reviews/universe-no-code-custom-website-builder',
  'https://siteoptz.ai/reviews/convertfiles-ai-free-image-file-converter',
  'https://siteoptz.ai/reviews/tellers-ai-automatic-text-to-video-tool',
  'https://siteoptz.ai/reviews/hugging-face',
  'https://siteoptz.ai/reviews/videotube',
  'https://siteoptz.ai/reviews/explee',
  'https://siteoptz.ai/reviews/divedeck-ai-powered-deck-builder',
  'https://siteoptz.ai/reviews/unreal-speech-cost-effective-text-to-speech-api',
  'https://siteoptz.ai/reviews/kleap',
  'https://siteoptz.ai/reviews/character-ai',
  
  // Resources and case studies
  'https://siteoptz.ai/case-studies/manufacturing-ai',
  'https://siteoptz.ai/resources/automation-toolkit',
  'https://siteoptz.ai/resources/ai-strategy-guide',
  'https://siteoptz.ai/case-studies/ai-content-creators',
  'https://siteoptz.ai/resources/creator-ai-toolkit',
  'https://siteoptz.ai/resources/content-ai-comparison',
  'https://siteoptz.ai/case-studies/ai-customer-service',
  'https://siteoptz.ai/resources/cs-automation-checklist',
  'https://siteoptz.ai/resources/security-platform-comparison',
  'https://siteoptz.ai/case-studies/ai-cybersecurity',
  'https://siteoptz.ai/resources/ai-security-guide',
  'https://siteoptz.ai/resources/ai-analytics-guide',
  'https://siteoptz.ai/case-studies/predictive-analytics',
  'https://siteoptz.ai/resources/analytics-platform-comparison',
  'https://siteoptz.ai/tools/data-science-roi',
  'https://siteoptz.ai/resources/personalization-strategy',
  'https://siteoptz.ai/resources/ecommerce-ai-playbook',
  'https://siteoptz.ai/resources/risk-management-ai',
  'https://siteoptz.ai/tools/fintech-ai-roi',
  'https://siteoptz.ai/resources/algorithmic-trading-guide',
  'https://siteoptz.ai/resources/healthcare-ai-guide',
  'https://siteoptz.ai/resources/hipaa-ai-compliance',
  'https://siteoptz.ai/case-studies/healthcare-ai',
  'https://siteoptz.ai/resources/hr-ai-implementation',
  'https://siteoptz.ai/case-studies/smart-manufacturing',
  'https://siteoptz.ai/resources/industry-40-guide',
  'https://siteoptz.ai/resources/predictive-maintenance',
  'https://siteoptz.ai/case-studies/sales-ai',
  'https://siteoptz.ai/resources/lead-scoring-guide',
  'https://siteoptz.ai/resources/sales-ai-playbook',
  'https://siteoptz.ai/resources/ai-security-checklist',
  'https://siteoptz.ai/case-studies/fortune-500-chatgpt',
  'https://siteoptz.ai/resources/chatgpt-enterprise-guide',
  'https://siteoptz.ai/resources/ai-implementation-guide',
  'https://siteoptz.ai/reports/claude-gpt4-benchmark',
  'https://siteoptz.ai/resources/ai-model-selection',
  'https://siteoptz.ai/resources/marketing-ai-tools-comparison',
  'https://siteoptz.ai/case-studies/marketing-ai-success',
  'https://siteoptz.ai/resources/marketing-ai-strategy',
  'https://siteoptz.ai/resources/no-code-ai-comparison',
  'https://siteoptz.ai/case-studies/no-code-ai-wins',
  'https://siteoptz.ai/resources/business-ai-training'
];

// More comparison URLs
const comparisonUrls = [
  'https://siteoptz.ai/compare/athenic-ai/vs/10web',
  'https://siteoptz.ai/compare/athenic-ai/vs/adalysis',
  'https://siteoptz.ai/compare/athenic-ai/vs/adcreative-ai',
  'https://siteoptz.ai/compare/athenic-ai/vs/adbeat',
  'https://siteoptz.ai/compare/athenic-ai/vs/adespresso',
  'https://siteoptz.ai/compare/athenic-ai/vs/acquisio',
  'https://siteoptz.ai/compare/colossyan-creator/vs/acquisio',
  'https://siteoptz.ai/compare/colossyan-creator/vs/adcreative-ai',
  'https://siteoptz.ai/compare/colossyan-creator/vs/adbeat',
  'https://siteoptz.ai/compare/colossyan-creator/vs/10web',
  'https://siteoptz.ai/compare/colossyan-creator/vs/adalysis',
  'https://siteoptz.ai/compare/colossyan-creator/vs/adespresso',
  'https://siteoptz.ai/compare/contentstudio/vs/coschedule',
  'https://siteoptz.ai/compare/contentstudio/vs/buffer',
  'https://siteoptz.ai/compare/contentstudio/vs/hootsuite',
  'https://siteoptz.ai/compare/copilot-audio-expression/vs/adcreative-ai',
  'https://siteoptz.ai/compare/copilot-audio-expression/vs/adbeat',
  'https://siteoptz.ai/compare/copilot-audio-expression/vs/acquisio',
  'https://siteoptz.ai/compare/copilot-audio-expression/vs/adalysis',
  'https://siteoptz.ai/compare/copilot-audio-expression/vs/10web',
  'https://siteoptz.ai/compare/copilot-audio-expression/vs/adespresso',
  'https://siteoptz.ai/compare/elai-io/vs/adbeat',
  'https://siteoptz.ai/compare/elai-io/vs/10web',
  'https://siteoptz.ai/compare/elai-io/vs/acquisio',
  'https://siteoptz.ai/compare/elai-io/vs/adcreative-ai',
  'https://siteoptz.ai/compare/elai-io/vs/adespresso',
  'https://siteoptz.ai/compare/elai-io/vs/adalysis',
  'https://siteoptz.ai/compare/facecheck-id/vs/adbeat',
  'https://siteoptz.ai/compare/facecheck-id/vs/acquisio',
  'https://siteoptz.ai/compare/facecheck-id/vs/10web',
  'https://siteoptz.ai/compare/facecheck-id/vs/adcreative-ai',
  'https://siteoptz.ai/compare/facecheck-id/vs/adespresso',
  'https://siteoptz.ai/compare/facecheck-id/vs/adalysis',
  'https://siteoptz.ai/compare/google-gemini/vs/adalysis',
  'https://siteoptz.ai/compare/google-gemini/vs/10web',
  'https://siteoptz.ai/compare/google-gemini/vs/adcreative-ai',
  'https://siteoptz.ai/compare/google-gemini/vs/adbeat',
  'https://siteoptz.ai/compare/google-gemini/vs/acquisio',
  'https://siteoptz.ai/compare/google-gemini/vs/adespresso',
  'https://siteoptz.ai/compare/loomly/vs/socialpilot',
  'https://siteoptz.ai/compare/loomly/vs/buffer',
  'https://siteoptz.ai/compare/loomly/vs/hootsuite',
  'https://siteoptz.ai/compare/mangools/vs/adbeat',
  'https://siteoptz.ai/compare/mangools/vs/10web',
  'https://siteoptz.ai/compare/mangools/vs/acquisio',
  'https://siteoptz.ai/compare/mangools/vs/adcreative-ai',
  'https://siteoptz.ai/compare/mangools/vs/adespresso',
  'https://siteoptz.ai/compare/mangools/vs/adalysis',
  'https://siteoptz.ai/compare/playground-ai/vs/adbeat',
  'https://siteoptz.ai/compare/playground-ai/vs/adalysis',
  'https://siteoptz.ai/compare/playground-ai/vs/adespresso',
  'https://siteoptz.ai/compare/playground-ai/vs/acquisio',
  'https://siteoptz.ai/compare/playground-ai/vs/adcreative-ai',
  'https://siteoptz.ai/compare/playground-ai/vs/10web',
  'https://siteoptz.ai/compare/quiki-io/vs/acquisio',
  'https://siteoptz.ai/compare/quiki-io/vs/adbeat',
  'https://siteoptz.ai/compare/quiki-io/vs/adespresso',
  'https://siteoptz.ai/compare/quiki-io/vs/adalysis',
  'https://siteoptz.ai/compare/quiki-io/vs/10web',
  'https://siteoptz.ai/compare/quiki-io/vs/adcreative-ai',
  'https://siteoptz.ai/compare/se-ranking/vs/adespresso',
  'https://siteoptz.ai/compare/se-ranking/vs/adalysis',
  'https://siteoptz.ai/compare/se-ranking/vs/10web',
  'https://siteoptz.ai/compare/se-ranking/vs/acquisio',
  'https://siteoptz.ai/compare/se-ranking/vs/adcreative-ai',
  'https://siteoptz.ai/compare/se-ranking/vs/adbeat',
  'https://siteoptz.ai/compare/seaart-ai/vs/10web',
  'https://siteoptz.ai/compare/seaart-ai/vs/adalysis',
  'https://siteoptz.ai/compare/seaart-ai/vs/adespresso',
  'https://siteoptz.ai/compare/seaart-ai/vs/adbeat',
  'https://siteoptz.ai/compare/seaart-ai/vs/acquisio',
  'https://siteoptz.ai/compare/seaart-ai/vs/adcreative-ai',
  'https://siteoptz.ai/compare/sendible/vs/hootsuite',
  'https://siteoptz.ai/compare/sendible/vs/sprout-social',
  'https://siteoptz.ai/compare/sendible/vs/loomly',
  'https://siteoptz.ai/compare/serpstat/vs/adcreative-ai',
  'https://siteoptz.ai/compare/serpstat/vs/adespresso',
  'https://siteoptz.ai/compare/serpstat/vs/adalysis',
  'https://siteoptz.ai/compare/serpstat/vs/adbeat',
  'https://siteoptz.ai/compare/serpstat/vs/10web',
  'https://siteoptz.ai/compare/serpstat/vs/acquisio',
  'https://siteoptz.ai/compare/social-champ/vs/loomly',
  'https://siteoptz.ai/compare/social-champ/vs/buffer',
  'https://siteoptz.ai/compare/social-champ/vs/hootsuite',
  'https://siteoptz.ai/compare/socialpilot/vs/loomly',
  'https://siteoptz.ai/compare/socialpilot/vs/hootsuite',
  'https://siteoptz.ai/compare/socialpilot/vs/buffer',
  'https://siteoptz.ai/compare/tugan-ai/vs/adespresso',
  'https://siteoptz.ai/compare/tugan-ai/vs/adalysis',
  'https://siteoptz.ai/compare/tugan-ai/vs/10web',
  'https://siteoptz.ai/compare/tugan-ai/vs/adbeat',
  'https://siteoptz.ai/compare/tugan-ai/vs/adcreative-ai',
  'https://siteoptz.ai/compare/tugan-ai/vs/acquisio'
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