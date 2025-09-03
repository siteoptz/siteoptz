// Comprehensive redirects for all 404 URLs
const redirects404Fix = [
  // HIGH PRIORITY: Specific non-existent tool redirects (must be first)
  {
    source: '/compare/google-ads/vs/microsoft-ads',
    destination: '/compare',
    permanent: true,
  },
  {
    source: '/compare/google-ads/vs/facebook-ads',
    destination: '/compare',
    permanent: true,
  },
  {
    source: '/compare/facebook-ads/vs/google-ads',
    destination: '/compare',
    permanent: true,
  },
  {
    source: '/compare/microsoft-ads/vs/google-ads',
    destination: '/compare',
    permanent: true,
  },

  // Tool redirects - map to existing tools or fallback
  {
    source: '/tools/copy.ai',
    destination: '/tools/copy-ai',
    permanent: true,
  },
  {
    source: '/tools/character.ai',
    destination: '/tools/anthropic-claude',
    permanent: true,
  },
  {
    source: '/tools/perplexity',
    destination: '/tools/perplexity-ai',
    permanent: true,
  },
  {
    source: '/tools/mangools',
    destination: '/tools/semrush',
    permanent: true,
  },
  {
    source: '/tools/videotube',
    destination: '/tools/synthesia',
    permanent: true,
  },
  {
    source: '/tools/kleap',
    destination: '/tools/kleap-ai',
    permanent: true,
  },
  {
    source: '/tools/otter.ai',
    destination: '/tools/otterai',
    permanent: true,
  },
  {
    source: '/tools/explee',
    destination: '/tools/explee-ai',
    permanent: true,
  },
  {
    source: '/tools/gemini-2.5',
    destination: '/tools/gemini',
    permanent: true,
  },
  {
    source: '/tools/midjourney-v6',
    destination: '/tools/midjourney',
    permanent: true,
  },
  {
    source: '/tools/scite.ai',
    destination: '/tools/scite-ai',
    permanent: true,
  },
  {
    source: '/tools/murf-ai',
    destination: '/tools/murph-ai',
    permanent: true,
  },
  {
    source: '/tools/loomly',
    destination: '/reviews/loomly',
    permanent: true,
  },
  {
    source: '/tools/hugging-face',
    destination: '/tools/huggingface-transformers',
    permanent: true,
  },
  {
    source: '/tools/socialpilot',
    destination: '/reviews/socialpilot',
    permanent: true,
  },
  {
    source: '/tools/morningscore',
    destination: '/tools/semrush',
    permanent: true,
  },
  {
    source: '/tools/contentstudio',
    destination: '/reviews/contentstudio',
    permanent: true,
  },
  {
    source: '/tools/social-champ',
    destination: '/reviews/social-champ',
    permanent: true,
  },
  {
    source: '/tools/cohere',
    destination: '/tools/cohere-ai',
    permanent: true,
  },
  {
    source: '/tools/sendible',
    destination: '/reviews/sendible',
    permanent: true,
  },
  {
    source: '/tools/serpstat',
    destination: '/tools/semrush',
    permanent: true,
  },
  {
    source: '/tools/leonardo.ai',
    destination: '/tools/leonardo-ai',
    permanent: true,
  },
  {
    source: '/tools/planable',
    destination: '/tools/buffer',
    permanent: true,
  },
  {
    source: '/tools/se-ranking',
    destination: '/tools/semrush',
    permanent: true,
  },
  {
    source: '/tools/adcreative.ai',
    destination: '/tools/adcreative-ai',
    permanent: true,
  },
  {
    source: '/tools/reclaim.ai',
    destination: '/tools/reclaim-ai',
    permanent: true,
  },
  {
    source: '/tools/speechify',
    destination: '/tools/elevenlabs',
    permanent: true,
  },
  {
    source: '/tools/stable-diffusion-web',
    destination: '/tools/stable-diffusion',
    permanent: true,
  },
  {
    source: '/tools/gpt-4',
    destination: '/tools/openai-gpt4',
    permanent: true,
  },
  {
    source: '/tools/replicate',
    destination: '/tools/replicate-ai',
    permanent: true,
  },
  {
    source: '/tools/play.ht',
    destination: '/tools/play-ht',
    permanent: true,
  },
  {
    source: '/tools/gemini',
    destination: '/tools/gemini',
    permanent: true,
  },
  
  // Category redirects with trailing slash handling
  {
    source: '/categories/writing-copywriting',
    destination: '/categories/content-creation',
    permanent: true,
  },
  {
    source: '/categories/writing-copywriting/',
    destination: '/categories/content-creation',
    permanent: true,
  },
  {
    source: '/categories/marketing-digital',
    destination: '/categories/email-marketing',
    permanent: true,
  },
  {
    source: '/categories/marketing-digital/',
    destination: '/categories/email-marketing',
    permanent: true,
  },
  {
    source: '/categories/business-productivity',
    destination: '/categories/productivity',
    permanent: true,
  },
  {
    source: '/categories/business-productivity/',
    destination: '/categories/productivity',
    permanent: true,
  },
  {
    source: '/categories/development-technology',
    destination: '/categories/code-generation',
    permanent: true,
  },
  {
    source: '/categories/development-technology/',
    destination: '/categories/code-generation',
    permanent: true,
  },
  {
    source: '/categories/voice-ai-tools',
    destination: '/categories/best-voice-ai-tools',
    permanent: true,
  },
  {
    source: '/categories/voice-ai-tools/',
    destination: '/categories/best-voice-ai-tools',
    permanent: true,
  },
  
  // Comparison page redirects
  {
    source: '/compare/chatgpt-vs-claude',
    destination: '/compare/chatgpt/vs/claude',
    permanent: true,
  },
  {
    source: '/compare/claude-vs-gemini',
    destination: '/compare/claude/vs/gemini',
    permanent: true,
  },
  {
    source: '/compare/jasper-ai-vs-copy-ai',
    destination: '/compare/jasper-ai/vs/copy-ai',
    permanent: true,
  },
  
  // Legacy/Invalid URLs
  {
    source: '/category/uncategorized',
    destination: '/categories',
    permanent: true,
  },
  {
    source: '/category/uncategorized/',
    destination: '/categories',
    permanent: true,
  },
  {
    source: '/category/uncategorized/feed',
    destination: '/',
    permanent: true,
  },
  {
    source: '/category/uncategorized/feed/',
    destination: '/',
    permanent: true,
  },
  {
    source: '/sample-page',
    destination: '/',
    permanent: true,
  },
  {
    source: '/sample-page/',
    destination: '/',
    permanent: true,
  },
  {
    source: '/feed',
    destination: '/',
    permanent: true,
  },
  {
    source: '/feed/',
    destination: '/',
    permanent: true,
  },
  {
    source: '/comparisons',
    destination: '/compare',
    permanent: true,
  },
  
  // Blog date-based URLs
  {
    source: '/2025/08/14/hello-world',
    destination: '/blog',
    permanent: true,
  },
  {
    source: '/2025/08/14/hello-world/',
    destination: '/blog',
    permanent: true,
  },
  
  // Author redirect
  {
    source: '/author/antoniositeoptz-com',
    destination: '/about',
    permanent: true,
  },
  {
    source: '/author/antoniositeoptz-com/',
    destination: '/about',
    permanent: true,
  },
  
  // Webinar/Resource URLs that don't exist
  {
    source: '/webinars/download/ai-analytics-toolkit',
    destination: '/resources',
    permanent: true,
  },
  {
    source: '/webinars/download/ai-analytics-toolkit/',
    destination: '/resources',
    permanent: true,
  },
  {
    source: '/webinars/download/no-code-ai-resources',
    destination: '/resources',
    permanent: true,
  },
  {
    source: '/webinars/download/no-code-ai-resources/',
    destination: '/resources',
    permanent: true,
  },
  {
    source: '/webinars/download/ai-compliance-framework',
    destination: '/resources',
    permanent: true,
  },
  {
    source: '/webinars/download/ai-compliance-framework/',
    destination: '/resources',
    permanent: true,
  },
  {
    source: '/webinars/download/ai-content-marketing-resources',
    destination: '/resources',
    permanent: true,
  },
  {
    source: '/webinars/download/ai-content-marketing-resources/',
    destination: '/resources',
    permanent: true,
  },
  {
    source: '/webinars/register/:path*',
    destination: '/webinars',
    permanent: true,
  },
  {
    source: '/webinars/watch/:path*',
    destination: '/webinars',
    permanent: true,
  },
  {
    source: '/webinars/monthly-tools-series',
    destination: '/webinars',
    permanent: true,
  },
  {
    source: '/webinars/monthly-tools-series/',
    destination: '/webinars',
    permanent: true,
  },
  
  // Case studies redirects
  {
    source: '/case-studies/[id]',
    destination: '/case-studies',
    permanent: true,
  },
  {
    source: '/case-studies/hr-ai-success',
    destination: '/case-studies',
    permanent: true,
  },
  {
    source: '/case-studies/hr-ai-success/',
    destination: '/case-studies',
    permanent: true,
  },
  {
    source: '/case-studies/:path*',
    destination: '/case-studies',
    permanent: true,
  },
  
  // Resources redirects
  {
    source: '/resources/:path*',
    destination: '/resources',
    permanent: true,
  },
  
  // Tools with www subdomain
  {
    source: '/tools/sdxl',
    destination: '/tools/stable-diffusion',
    permanent: true,
  },
  {
    source: '/tools/sdxl/',
    destination: '/tools/stable-diffusion',
    permanent: true,
  },
  {
    source: '/tools/fintech-ai-roi',
    destination: '/tools',
    permanent: true,
  },
  {
    source: '/tools/fintech-ai-roi/',
    destination: '/tools',
    permanent: true,
  },
  {
    source: '/tools/data-science-roi',
    destination: '/tools',
    permanent: true,
  },
  {
    source: '/tools/data-science-roi/',
    destination: '/tools',
    permanent: true,
  },
  {
    source: '/tools/:slug/',
    destination: '/tools/:slug',
    permanent: true,
  },
  
  // Podcast/Career redirects
  {
    source: '/podcast/ai-leadership',
    destination: '/podcasts',
    permanent: true,
  },
  {
    source: '/podcast/ai-leadership/',
    destination: '/podcasts',
    permanent: true,
  },
  {
    source: '/podcasts/transcripts/:path*',
    destination: '/podcasts',
    permanent: true,
  },
  {
    source: '/podcasts/[slug]',
    destination: '/podcasts',
    permanent: true,
  },
  
  // Careers redirects
  {
    source: '/careers/apply',
    destination: '/careers',
    permanent: true,
  },
  {
    source: '/careers/apply/',
    destination: '/careers',
    permanent: true,
  },
  
  // Industries redirects
  {
    source: '/industries/retail-e-commerce',
    destination: '/industries',
    permanent: true,
  },
  {
    source: '/industries/[industry]',
    destination: '/industries',
    permanent: true,
  },
  
  // Reviews redirects
  {
    source: '/reviews/tableau',
    destination: '/reviews',
    permanent: true,
  },
  {
    source: '/reviews/[toolName]',
    destination: '/reviews',
    permanent: true,
  },
  
  // Compare page variants with www
  {
    source: '/compare/:tool1/vs/:tool2/',
    destination: '/compare/:tool1/vs/:tool2',
    permanent: true,
  },
  
  // Best practices/Trends/Guides
  {
    source: '/best-practices',
    destination: '/resources',
    permanent: true,
  },
  {
    source: '/best-practices/',
    destination: '/resources',
    permanent: true,
  },
  {
    source: '/trends',
    destination: '/resources',
    permanent: true,
  },
  {
    source: '/trends/',
    destination: '/resources',
    permanent: true,
  },
  {
    source: '/guides',
    destination: '/resources',
    permanent: true,
  },
  {
    source: '/guides/',
    destination: '/resources',
    permanent: true,
  },
  
  // Reports redirect
  {
    source: '/reports/:path*',
    destination: '/resources',
    permanent: true,
  },
  
  // Cookies page
  {
    source: '/cookies',
    destination: '/privacy',
    permanent: true,
  },
  {
    source: '/cookies/',
    destination: '/privacy',
    permanent: true,
  },
  
  // Tool variants with www
  {
    source: '/tools/claude-3-opus',
    destination: '/tools/claude',
    permanent: true,
  },
  {
    source: '/tools/claude-3-opus/',
    destination: '/tools/claude',
    permanent: true,
  },
  {
    source: '/tools/gpt4-turbo',
    destination: '/tools/openai-gpt4',
    permanent: true,
  },
  {
    source: '/tools/gpt4-turbo/',
    destination: '/tools/openai-gpt4',
    permanent: true,
  },
  
  // Additional tool name variations with www
  {
    source: '/tools/mangools',
    destination: '/tools/semrush',
    permanent: true,
  },
  {
    source: '/tools/mangools/',
    destination: '/tools/semrush',
    permanent: true,
  },
  {
    source: '/tools/planable',
    destination: '/tools/buffer',
    permanent: true,
  },
  {
    source: '/tools/planable/',
    destination: '/tools/buffer',
    permanent: true,
  },
  {
    source: '/tools/sendible',
    destination: '/reviews/sendible',
    permanent: true,
  },
  {
    source: '/tools/sendible/',
    destination: '/reviews/sendible',
    permanent: true,
  },
  {
    source: '/tools/loomly',
    destination: '/reviews/loomly',
    permanent: true,
  },
  {
    source: '/tools/loomly/',
    destination: '/reviews/loomly',
    permanent: true,
  },
  {
    source: '/tools/se-ranking',
    destination: '/tools/semrush',
    permanent: true,
  },
  {
    source: '/tools/se-ranking/',
    destination: '/tools/semrush',
    permanent: true,
  },
  {
    source: '/tools/murf-ai',
    destination: '/tools/murph-ai',
    permanent: true,
  },
  {
    source: '/tools/murf-ai/',
    destination: '/tools/murph-ai',
    permanent: true,
  },
  {
    source: '/tools/socialpilot',
    destination: '/reviews/socialpilot',
    permanent: true,
  },
  {
    source: '/tools/socialpilot/',
    destination: '/reviews/socialpilot',
    permanent: true,
  },
  {
    source: '/tools/social-champ',
    destination: '/reviews/social-champ',
    permanent: true,
  },
  {
    source: '/tools/social-champ/',
    destination: '/reviews/social-champ',
    permanent: true,
  },
  {
    source: '/tools/contentstudio',
    destination: '/reviews/contentstudio',
    permanent: true,
  },
  {
    source: '/tools/contentstudio/',
    destination: '/reviews/contentstudio',
    permanent: true,
  },
  {
    source: '/tools/serpstat',
    destination: '/tools/semrush',
    permanent: true,
  },
  {
    source: '/tools/serpstat/',
    destination: '/tools/semrush',
    permanent: true,
  },
  
  // Categories with dynamic paths
  {
    source: '/categories/[category]',
    destination: '/categories',
    permanent: true,
  },
  
  // Generic tool slug handler
  {
    source: '/tools/[slug]',
    destination: '/tools',
    permanent: true,
  },
  
  // All comparison redirects
  {
    source: '/compare/surfer-seo-vs-dall-e',
    destination: '/compare',
    permanent: true,
  },
  {
    source: '/compare/elicit-vs-dall-e',
    destination: '/compare',
    permanent: true,
  },
  {
    source: '/compare/murph-ai-vs-frase',
    destination: '/compare',
    permanent: true,
  },
  {
    source: '/compare/chatpdf-vs-jasper-ai',
    destination: '/compare',
    permanent: true,
  },
  {
    source: '/compare/chatpdf-vs-frase',
    destination: '/compare',
    permanent: true,
  },
  {
    source: '/compare/elicit-vs-frase',
    destination: '/compare',
    permanent: true,
  },
  {
    source: '/compare/qlik-sense-vs-midjourney',
    destination: '/compare',
    permanent: true,
  },
  {
    source: '/compare/jasper-ai-vs-frase',
    destination: '/compare',
    permanent: true,
  },
  {
    source: '/compare/frase-vs-surfer-seo',
    destination: '/compare',
    permanent: true,
  },
  {
    source: '/compare/tableau-ai-vs-jasper-ai',
    destination: '/compare',
    permanent: true,
  },
  {
    source: '/compare/surfer-seo-vs-jasper-ai',
    destination: '/compare',
    permanent: true,
  },
  {
    source: '/compare/hubspot-ai-vs-dall-e',
    destination: '/compare',
    permanent: true,
  },
  {
    source: '/compare/buffer-ai-vs-chatgpt',
    destination: '/compare',
    permanent: true,
  },
  {
    source: '/compare/lumen5-vs-jasper-ai',
    destination: '/compare',
    permanent: true,
  },
  {
    source: '/compare/elicit-vs-jasper-ai',
    destination: '/compare',
    permanent: true,
  },
  {
    source: '/compare/copy.ai/vs/writesonic',
    destination: '/compare/copy-ai/vs/writesonic',
    permanent: true,
  },
  {
    source: '/compare/copy.ai/vs/writesonic/',
    destination: '/compare/copy-ai/vs/writesonic',
    permanent: true,
  },
  {
    source: '/compare/synthesia-vs-jasper-ai',
    destination: '/compare',
    permanent: true,
  },
  {
    source: '/compare/elevenlabs-vs-surfer-seo',
    destination: '/compare',
    permanent: true,
  },
  {
    source: '/compare/murph-ai-vs-jasper-ai',
    destination: '/compare',
    permanent: true,
  },
  {
    source: '/compare/chatpdf-vs-dall-e',
    destination: '/compare',
    permanent: true,
  },
  {
    source: '/compare/jasper-ai-vs-surfer-seo',
    destination: '/compare',
    permanent: true,
  },
  {
    source: '/compare/chatgpt-vs-surfer-seo',
    destination: '/compare',
    permanent: true,
  },
  {
    source: '/compare/jasper-ai-vs-dall-e',
    destination: '/compare',
    permanent: true,
  },
  {
    source: '/compare/murph-ai-vs-surfer-seo',
    destination: '/compare',
    permanent: true,
  },
  {
    source: '/compare/murph-ai-vs-chatgpt',
    destination: '/compare',
    permanent: true,
  },
  {
    source: '/compare/hubspot-ai-vs-midjourney',
    destination: '/compare',
    permanent: true,
  },
  {
    source: '/compare/qlik-sense-vs-dall-e',
    destination: '/compare',
    permanent: true,
  },
  {
    source: '/compare/buffer-ai-vs-jasper-ai',
    destination: '/compare',
    permanent: true,
  },
  {
    source: '/compare/tableau-ai-vs-chatgpt',
    destination: '/compare',
    permanent: true,
  },
  {
    source: '/compare/buffer-ai-vs-surfer-seo',
    destination: '/compare',
    permanent: true,
  },
  {
    source: '/compare/mailchimp-ai-vs-frase',
    destination: '/compare',
    permanent: true,
  },
  {
    source: '/compare/synthesia-vs-midjourney',
    destination: '/compare',
    permanent: true,
  },
  {
    source: '/compare/tableau-ai-vs-dall-e',
    destination: '/compare',
    permanent: true,
  },
  {
    source: '/compare/qlik-sense-vs-chatgpt',
    destination: '/compare',
    permanent: true,
  },
  {
    source: '/compare/mailchimp-ai-vs-surfer-seo',
    destination: '/compare',
    permanent: true,
  },
  {
    source: '/compare/surfer-seo-vs-hootsuite-ai',
    destination: '/compare',
    permanent: true,
  },
  {
    source: '/compare/tableau-ai-vs-midjourney',
    destination: '/compare',
    permanent: true,
  },
  {
    source: '/compare/murph-ai-vs-dall-e',
    destination: '/compare',
    permanent: true,
  },
  {
    source: '/compare/elicit-vs-surfer-seo',
    destination: '/compare',
    permanent: true,
  },
  {
    source: '/compare/hubspot-ai-vs-jasper-ai',
    destination: '/compare',
    permanent: true,
  },
  {
    source: '/compare/frase-vs-midjourney',
    destination: '/compare',
    permanent: true,
  },
  {
    source: '/compare/hubspot-ai-vs-chatgpt',
    destination: '/compare',
    permanent: true,
  },
  {
    source: '/compare/mailchimp-ai-vs-midjourney',
    destination: '/compare',
    permanent: true,
  },
  {
    source: '/compare/elevenlabs-vs-jasper-ai',
    destination: '/compare',
    permanent: true,
  },
  {
    source: '/compare/synthesia-vs-frase',
    destination: '/compare',
    permanent: true,
  },
  {
    source: '/compare/lumen5-vs-dall-e',
    destination: '/compare',
    permanent: true,
  },
  {
    source: '/compare/surfer-seo-vs-frase',
    destination: '/compare',
    permanent: true,
  },
  {
    source: '/compare/frase-vs-hootsuite-ai',
    destination: '/compare',
    permanent: true,
  },
  {
    source: '/compare/lumen5-vs-chatgpt',
    destination: '/compare',
    permanent: true,
  },
  {
    source: '/compare/synthesia-vs-chatgpt',
    destination: '/compare',
    permanent: true,
  },
  {
    source: '/compare/hubspot-ai-vs-surfer-seo',
    destination: '/compare',
    permanent: true,
  },
  {
    source: '/compare/buffer-ai-vs-midjourney',
    destination: '/compare',
    permanent: true,
  },
  {
    source: '/compare/tableau-ai-vs-surfer-seo',
    destination: '/compare',
    permanent: true,
  },
  {
    source: '/compare/buffer-ai-vs-frase',
    destination: '/compare',
    permanent: true,
  },
  {
    source: '/compare/jasper-ai-vs-midjourney',
    destination: '/compare',
    permanent: true,
  },
  {
    source: '/compare/chatgpt-vs-dall-e',
    destination: '/compare',
    permanent: true,
  },
  {
    source: '/compare/jasper-ai-vs-hootsuite-ai',
    destination: '/compare',
    permanent: true,
  },
  {
    source: '/compare/mailchimp-ai-vs-chatgpt',
    destination: '/compare',
    permanent: true,
  },
  {
    source: '/compare/lumen5-vs-frase',
    destination: '/compare',
    permanent: true,
  },
  {
    source: '/compare/frase-vs-chatgpt',
    destination: '/compare',
    permanent: true,
  },
  {
    source: '/compare/chatpdf-vs-surfer-seo',
    destination: '/compare',
    permanent: true,
  },
  {
    source: '/compare/elevenlabs-vs-chatgpt',
    destination: '/compare',
    permanent: true,
  },
  {
    source: '/compare/hubspot-ai-vs-frase',
    destination: '/compare',
    permanent: true,
  },
  {
    source: '/compare/lumen5-vs-midjourney',
    destination: '/compare',
    permanent: true,
  },
  {
    source: '/compare/qlik-sense-vs-surfer-seo',
    destination: '/compare',
    permanent: true,
  },
  {
    source: '/compare/synthesia-vs-dall-e',
    destination: '/compare',
    permanent: true,
  },
  {
    source: '/compare/synthesia-vs-surfer-seo',
    destination: '/compare',
    permanent: true,
  },
  {
    source: '/compare/elevenlabs-vs-dall-e',
    destination: '/compare',
    permanent: true,
  },
  {
    source: '/compare/elevenlabs-vs-frase',
    destination: '/compare',
    permanent: true,
  },
  {
    source: '/compare/chatgpt-vs-frase',
    destination: '/compare',
    permanent: true,
  },
  {
    source: '/compare/elevenlabs-vs-midjourney',
    destination: '/compare',
    permanent: true,
  },
  {
    source: '/compare/chatpdf-vs-chatgpt',
    destination: '/compare',
    permanent: true,
  },
  {
    source: '/compare/lumen5-vs-surfer-seo',
    destination: '/compare',
    permanent: true,
  },
  {
    source: '/compare/elicit-vs-chatgpt',
    destination: '/compare',
    permanent: true,
  },
  {
    source: '/compare/mailchimp-ai-vs-dall-e',
    destination: '/compare',
    permanent: true,
  },
  {
    source: '/compare/elicit-vs-midjourney',
    destination: '/compare',
    permanent: true,
  },
  {
    source: '/compare/surfer-seo-vs-midjourney',
    destination: '/compare',
    permanent: true,
  },
  {
    source: '/compare/qlik-sense-vs-jasper-ai',
    destination: '/compare',
    permanent: true,
  },
  {
    source: '/compare/tableau-ai-vs-frase',
    destination: '/compare',
    permanent: true,
  },
  {
    source: '/compare/chatgpt-vs-hootsuite-ai',
    destination: '/compare',
    permanent: true,
  },
  {
    source: '/compare/chatgpt-vs-jasper-ai',
    destination: '/compare',
    permanent: true,
  },
  {
    source: '/compare/chatpdf-vs-midjourney',
    destination: '/compare',
    permanent: true,
  },
  {
    source: '/compare/jasper-ai-vs-chatgpt',
    destination: '/compare',
    permanent: true,
  },
  {
    source: '/compare/buffer-ai-vs-dall-e',
    destination: '/compare',
    permanent: true,
  },
  {
    source: '/compare/frase-vs-dall-e',
    destination: '/compare',
    permanent: true,
  },
  {
    source: '/compare/frase-vs-jasper-ai',
    destination: '/compare',
    permanent: true,
  },
  {
    source: '/compare/mailchimp-ai-vs-jasper-ai',
    destination: '/compare',
    permanent: true,
  },
  {
    source: '/compare/chatgpt-vs-midjourney',
    destination: '/compare',
    permanent: true,
  },
  {
    source: '/compare/murph-ai-vs-midjourney',
    destination: '/compare',
    permanent: true,
  },
  {
    source: '/compare/surfer-seo-vs-chatgpt',
    destination: '/compare',
    permanent: true,
  },
  {
    source: '/compare/jasper-ai/vs/copy.ai',
    destination: '/compare/jasper-ai/vs/copy-ai',
    permanent: true,
  },
  {
    source: '/compare/chatgpt-vs-gemini',
    destination: '/compare/chatgpt/vs/gemini',
    permanent: true,
  },
  
  // Fix all /vs/alternatives URLs (these don't exist, redirect to main compare page)
  {
    source: '/compare/:tool/vs/alternatives',
    destination: '/compare',
    permanent: true,
  },
  {
    source: '/compare/facebook-ads/vs/:tool',
    destination: '/compare',
    permanent: true,
  },
  {
    source: '/compare/:tool/vs/facebook-ads',
    destination: '/compare',
    permanent: true,
  },
  {
    source: '/compare/microsoft-ads/vs/:tool',
    destination: '/compare',
    permanent: true,
  },
  {
    source: '/compare/:tool/vs/microsoft-ads',
    destination: '/compare',
    permanent: true,
  },
  {
    source: '/compare/bing-ads/vs/:tool',
    destination: '/compare',
    permanent: true,
  },
  {
    source: '/compare/:tool/vs/bing-ads',
    destination: '/compare',
    permanent: true,
  }
];

module.exports = redirects404Fix;