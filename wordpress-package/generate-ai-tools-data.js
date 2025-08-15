const fs = require('fs');
const path = require('path');

// Top 50 AI Tools by Category
const aiToolsData = [
  // Text Generation & Writing
  {
    id: 'chatgpt',
    name: 'ChatGPT',
    description: 'AI-powered chatbot for conversations, content creation, and problem-solving',
    category: 'text-generation',
    pricing: { price: 0, currency: 'USD', text: 'Free with ChatGPT Plus at $20/month' },
    rating: 4.8,
    reviewCount: 15000,
    website: 'https://chat.openai.com',
    source: 'openai',
    features: ['conversational-ai', 'content-creation', 'code-generation', 'problem-solving'],
    pros: ['Highly capable', 'Easy to use', 'Wide range of applications', 'Regular updates'],
    cons: ['Limited free tier', 'Sometimes slow', 'Can be expensive'],
    lastUpdated: new Date().toISOString()
  },
  {
    id: 'claude',
    name: 'Claude',
    description: 'Advanced AI assistant by Anthropic, known for safety and helpfulness',
    category: 'text-generation',
    pricing: { price: 20, currency: 'USD', text: 'Claude Pro at $20/month' },
    rating: 4.7,
    reviewCount: 8500,
    website: 'https://claude.ai',
    source: 'anthropic',
    features: ['conversational-ai', 'content-creation', 'analysis', 'safety-focused'],
    pros: ['Very helpful', 'Safety-focused', 'Good at analysis', 'Reliable'],
    cons: ['Limited availability', 'Higher price point'],
    lastUpdated: new Date().toISOString()
  },
  {
    id: 'jasper',
    name: 'Jasper',
    description: 'AI writing assistant for marketing, content, and business writing',
    category: 'text-generation',
    pricing: { price: 39, currency: 'USD', text: 'Starts at $39/month' },
    rating: 4.6,
    reviewCount: 12000,
    website: 'https://jasper.ai',
    source: 'jasper',
    features: ['content-writing', 'marketing-copy', 'seo-optimization', 'brand-voice'],
    pros: ['Great for marketing', 'SEO features', 'Brand voice consistency', 'Templates'],
    cons: ['Expensive', 'Limited free trial'],
    lastUpdated: new Date().toISOString()
  },
  {
    id: 'copy-ai',
    name: 'Copy.ai',
    description: 'AI copywriting tool for marketing, sales, and content creation',
    category: 'text-generation',
    pricing: { price: 36, currency: 'USD', text: 'Starts at $36/month' },
    rating: 4.5,
    reviewCount: 9500,
    website: 'https://copy.ai',
    source: 'copy-ai',
    features: ['copywriting', 'marketing', 'sales-copy', 'social-media'],
    pros: ['Great templates', 'Easy to use', 'Good for marketing', 'Affordable'],
    cons: ['Limited customization', 'Quality varies'],
    lastUpdated: new Date().toISOString()
  },
  {
    id: 'writesonic',
    name: 'Writesonic',
    description: 'AI writing platform for blogs, ads, and business content',
    category: 'text-generation',
    pricing: { price: 19, currency: 'USD', text: 'Starts at $19/month' },
    rating: 4.4,
    reviewCount: 7800,
    website: 'https://writesonic.com',
    source: 'writesonic',
    features: ['blog-writing', 'ad-copy', 'business-content', 'seo'],
    pros: ['Affordable', 'Good templates', 'SEO features', 'Multiple languages'],
    cons: ['Quality can be inconsistent', 'Limited advanced features'],
    lastUpdated: new Date().toISOString()
  },

  // Image Generation
  {
    id: 'midjourney',
    name: 'Midjourney',
    description: 'AI art generator for creating stunning images from text descriptions',
    category: 'image-generation',
    pricing: { price: 10, currency: 'USD', text: 'Basic plan at $10/month' },
    rating: 4.7,
    reviewCount: 12000,
    website: 'https://midjourney.com',
    source: 'midjourney',
    features: ['art-generation', 'high-quality', 'artistic-style', 'discord-integration'],
    pros: ['High quality images', 'Artistic style', 'Active community', 'Regular updates'],
    cons: ['Discord only', 'No API access', 'Limited control'],
    lastUpdated: new Date().toISOString()
  },
  {
    id: 'dall-e',
    name: 'DALL-E',
    description: 'OpenAI\'s AI system for creating realistic images from text descriptions',
    category: 'image-generation',
    pricing: { price: 0.02, currency: 'USD', text: '$0.02 per image' },
    rating: 4.6,
    reviewCount: 15000,
    website: 'https://openai.com/dall-e-2',
    source: 'openai',
    features: ['image-generation', 'realistic-style', 'api-access', 'high-quality'],
    pros: ['High quality', 'Realistic style', 'API available', 'Easy to use'],
    cons: ['Expensive for bulk', 'Limited artistic control'],
    lastUpdated: new Date().toISOString()
  },
  {
    id: 'stable-diffusion',
    name: 'Stable Diffusion',
    description: 'Open-source AI image generation model with local deployment options',
    category: 'image-generation',
    pricing: { price: 0, currency: 'USD', text: 'Free (open source)' },
    rating: 4.5,
    reviewCount: 18000,
    website: 'https://stability.ai',
    source: 'stability-ai',
    features: ['open-source', 'local-deployment', 'customizable', 'high-quality'],
    pros: ['Free and open source', 'Local deployment', 'Highly customizable', 'Community support'],
    cons: ['Technical setup required', 'Hardware intensive'],
    lastUpdated: new Date().toISOString()
  },
  {
    id: 'leonardo-ai',
    name: 'Leonardo.ai',
    description: 'AI art generation platform with advanced control and customization',
    category: 'image-generation',
    pricing: { price: 10, currency: 'USD', text: 'Starts at $10/month' },
    rating: 4.4,
    reviewCount: 6500,
    website: 'https://leonardo.ai',
    source: 'leonardo',
    features: ['art-generation', 'advanced-control', 'custom-models', 'commercial-use'],
    pros: ['Advanced controls', 'Custom models', 'Commercial licensing', 'Good community'],
    cons: ['Learning curve', 'Limited free tier'],
    lastUpdated: new Date().toISOString()
  },
  {
    id: 'canva-ai',
    name: 'Canva AI',
    description: 'AI-powered design tool with image generation and editing capabilities',
    category: 'image-generation',
    pricing: { price: 12.99, currency: 'USD', text: 'Pro plan at $12.99/month' },
    rating: 4.3,
    reviewCount: 25000,
    website: 'https://canva.com',
    source: 'canva',
    features: ['design-tool', 'image-generation', 'templates', 'collaboration'],
    pros: ['Easy to use', 'Great templates', 'Collaboration features', 'All-in-one design'],
    cons: ['Limited AI features', 'Can be expensive'],
    lastUpdated: new Date().toISOString()
  },

  // Code Generation
  {
    id: 'github-copilot',
    name: 'GitHub Copilot',
    description: 'AI-powered code completion and generation for developers',
    category: 'code-generation',
    pricing: { price: 10, currency: 'USD', text: 'Individual plan at $10/month' },
    rating: 4.6,
    reviewCount: 20000,
    website: 'https://github.com/features/copilot',
    source: 'github',
    features: ['code-completion', 'multi-language', 'ide-integration', 'real-time-suggestions'],
    pros: ['Saves time', 'Multi-language support', 'IDE integration', 'Learns from context'],
    cons: ['Expensive', 'Sometimes inaccurate', 'Privacy concerns'],
    lastUpdated: new Date().toISOString()
  },
  {
    id: 'cursor',
    name: 'Cursor',
    description: 'AI-first code editor with advanced code generation and editing',
    category: 'code-generation',
    pricing: { price: 20, currency: 'USD', text: 'Pro plan at $20/month' },
    rating: 4.5,
    reviewCount: 8500,
    website: 'https://cursor.sh',
    source: 'cursor',
    features: ['code-editor', 'ai-assistant', 'chat-interface', 'multi-language'],
    pros: ['Great AI integration', 'Chat interface', 'Fast performance', 'Good UI'],
    cons: ['Newer tool', 'Limited extensions', 'Can be expensive'],
    lastUpdated: new Date().toISOString()
  },
  {
    id: 'replit-ghost',
    name: 'Replit Ghost',
    description: 'AI-powered coding assistant integrated into Replit\'s development environment',
    category: 'code-generation',
    pricing: { price: 7, currency: 'USD', text: 'Hacker plan at $7/month' },
    rating: 4.4,
    reviewCount: 12000,
    website: 'https://replit.com',
    source: 'replit',
    features: ['online-ide', 'ai-assistant', 'collaboration', 'deployment'],
    pros: ['Online IDE', 'Easy collaboration', 'Built-in deployment', 'Affordable'],
    cons: ['Limited offline use', 'Performance depends on internet'],
    lastUpdated: new Date().toISOString()
  },
  {
    id: 'amazon-codewhisperer',
    name: 'Amazon CodeWhisperer',
    description: 'AI-powered code generator with security scanning and AWS integration',
    category: 'code-generation',
    pricing: { price: 0, currency: 'USD', text: 'Free for individual use' },
    rating: 4.3,
    reviewCount: 9500,
    website: 'https://aws.amazon.com/codewhisperer',
    source: 'amazon',
    features: ['code-generation', 'security-scanning', 'aws-integration', 'multi-language'],
    pros: ['Free for individuals', 'Security focused', 'AWS integration', 'Good for enterprise'],
    cons: ['Limited features in free tier', 'AWS ecosystem focused'],
    lastUpdated: new Date().toISOString()
  },
  {
    id: 'tabnine',
    name: 'Tabnine',
    description: 'AI code completion tool with team learning and customization',
    category: 'code-generation',
    pricing: { price: 12, currency: 'USD', text: 'Pro plan at $12/month' },
    rating: 4.2,
    reviewCount: 15000,
    website: 'https://tabnine.com',
    source: 'tabnine',
    features: ['code-completion', 'team-learning', 'custom-models', 'privacy-focused'],
    pros: ['Privacy focused', 'Team learning', 'Custom models', 'Good performance'],
    cons: ['Less advanced than competitors', 'Limited features'],
    lastUpdated: new Date().toISOString()
  },

  // Video Generation
  {
    id: 'runway-ml',
    name: 'Runway ML',
    description: 'AI-powered video editing and generation platform',
    category: 'video-generation',
    pricing: { price: 15, currency: 'USD', text: 'Starts at $15/month' },
    rating: 4.6,
    reviewCount: 8500,
    website: 'https://runwayml.com',
    source: 'runway',
    features: ['video-editing', 'ai-generation', 'motion-graphics', 'professional-tools'],
    pros: ['Professional quality', 'Advanced features', 'Good for motion graphics', 'Industry standard'],
    cons: ['Expensive', 'Learning curve', 'Hardware intensive'],
    lastUpdated: new Date().toISOString()
  },
  {
    id: 'synthesia',
    name: 'Synthesia',
    description: 'AI video generation platform for creating talking head videos',
    category: 'video-generation',
    pricing: { price: 30, currency: 'USD', text: 'Starts at $30/month' },
    rating: 4.5,
    reviewCount: 6500,
    website: 'https://synthesia.io',
    source: 'synthesia',
    features: ['talking-head', 'avatar-generation', 'multi-language', 'custom-avatars'],
    pros: ['High quality avatars', 'Multi-language support', 'Easy to use', 'Professional results'],
    cons: ['Expensive', 'Limited customization', 'Avatar limitations'],
    lastUpdated: new Date().toISOString()
  },
  {
    id: 'pictory',
    name: 'Pictory',
    description: 'AI video creation tool that turns text into engaging videos',
    category: 'video-generation',
    pricing: { price: 19, currency: 'USD', text: 'Starts at $19/month' },
    rating: 4.4,
    reviewCount: 4500,
    website: 'https://pictory.ai',
    source: 'pictory',
    features: ['text-to-video', 'automated-editing', 'stock-footage', 'social-media'],
    pros: ['Easy to use', 'Automated editing', 'Good for social media', 'Affordable'],
    cons: ['Limited customization', 'Quality varies', 'Stock footage dependent'],
    lastUpdated: new Date().toISOString()
  },
  {
    id: 'lumen5',
    name: 'Lumen5',
    description: 'AI video maker that transforms text content into engaging videos',
    category: 'video-generation',
    pricing: { price: 19, currency: 'USD', text: 'Starts at $19/month' },
    rating: 4.3,
    reviewCount: 7800,
    website: 'https://lumen5.com',
    source: 'lumen5',
    features: ['text-to-video', 'social-media', 'templates', 'branding'],
    pros: ['Great for social media', 'Easy to use', 'Good templates', 'Branding features'],
    cons: ['Limited advanced features', 'Quality can be basic'],
    lastUpdated: new Date().toISOString()
  },
  {
    id: 'kapwing',
    name: 'Kapwing',
    description: 'Online video editor with AI-powered features and collaboration',
    category: 'video-generation',
    pricing: { price: 0, currency: 'USD', text: 'Free with Pro at $20/month' },
    rating: 4.2,
    reviewCount: 12000,
    website: 'https://kapwing.com',
    source: 'kapwing',
    features: ['online-editor', 'collaboration', 'ai-features', 'social-media'],
    pros: ['Free tier available', 'Online collaboration', 'Easy to use', 'Good for social media'],
    cons: ['Limited AI features', 'Watermark in free tier'],
    lastUpdated: new Date().toISOString()
  },

  // Audio Generation
  {
    id: 'elevenlabs',
    name: 'ElevenLabs',
    description: 'AI voice generation platform with realistic and customizable voices',
    category: 'audio-generation',
    pricing: { price: 22, currency: 'USD', text: 'Starts at $22/month' },
    rating: 4.7,
    reviewCount: 9500,
    website: 'https://elevenlabs.io',
    source: 'elevenlabs',
    features: ['voice-generation', 'text-to-speech', 'voice-cloning', 'emotion-control'],
    pros: ['High quality voices', 'Voice cloning', 'Emotion control', 'API available'],
    cons: ['Expensive', 'Limited free tier', 'Ethical concerns'],
    lastUpdated: new Date().toISOString()
  },
  {
    id: 'murph-ai',
    name: 'Murph AI',
    description: 'AI voice generator with studio-quality voices and multilingual support',
    category: 'audio-generation',
    pricing: { price: 26, currency: 'USD', text: 'Starts at $26/month' },
    rating: 4.5,
    reviewCount: 6500,
    website: 'https://murph.ai',
    source: 'murph',
    features: ['voice-generation', 'studio-quality', 'multilingual', 'voice-cloning'],
    pros: ['Studio quality', 'Multilingual support', 'Voice cloning', 'Good for commercial use'],
    cons: ['Expensive', 'Limited free trial'],
    lastUpdated: new Date().toISOString()
  },
  {
    id: 'play-ht',
    name: 'Play.ht',
    description: 'AI text-to-speech platform with natural-sounding voices',
    category: 'audio-generation',
    pricing: { price: 14, currency: 'USD', text: 'Starts at $14/month' },
    rating: 4.4,
    reviewCount: 8500,
    website: 'https://play.ht',
    source: 'play-ht',
    features: ['text-to-speech', 'natural-voices', 'multilingual', 'api-access'],
    pros: ['Natural voices', 'Multilingual support', 'API available', 'Affordable'],
    cons: ['Limited voice cloning', 'Quality varies by voice'],
    lastUpdated: new Date().toISOString()
  },
  {
    id: 'synthesys',
    name: 'Synthesys',
    description: 'AI voice and video synthesis platform for professional content',
    category: 'audio-generation',
    pricing: { price: 41, currency: 'USD', text: 'Starts at $41/month' },
    rating: 4.3,
    reviewCount: 4500,
    website: 'https://synthesys.io',
    source: 'synthesys',
    features: ['voice-synthesis', 'video-synthesis', 'professional-quality', 'commercial-licensing'],
    pros: ['Professional quality', 'Commercial licensing', 'Both voice and video', 'Good support'],
    cons: ['Expensive', 'Limited customization'],
    lastUpdated: new Date().toISOString()
  },
  {
    id: 'wellsaid-labs',
    name: 'Wellsaid Labs',
    description: 'AI voice generation platform focused on natural and expressive speech',
    category: 'audio-generation',
    pricing: { price: 44, currency: 'USD', text: 'Starts at $44/month' },
    rating: 4.2,
    reviewCount: 3500,
    website: 'https://wellsaidlabs.com',
    source: 'wellsaid',
    features: ['voice-generation', 'natural-speech', 'expressive-voices', 'enterprise-focus'],
    pros: ['Natural speech', 'Expressive voices', 'Enterprise focused', 'High quality'],
    cons: ['Expensive', 'Limited consumer features'],
    lastUpdated: new Date().toISOString()
  },

  // Data Analysis
  {
    id: 'chatgpt-enterprise',
    name: 'ChatGPT Enterprise',
    description: 'Enterprise-grade AI assistant with advanced data analysis capabilities',
    category: 'data-analysis',
    pricing: { price: null, currency: 'USD', text: 'Contact for pricing' },
    rating: 4.6,
    reviewCount: 2500,
    website: 'https://openai.com/enterprise',
    source: 'openai',
    features: ['data-analysis', 'enterprise-security', 'custom-models', 'api-access'],
    pros: ['Enterprise security', 'Custom models', 'Advanced analysis', 'API access'],
    cons: ['Expensive', 'Limited availability', 'Complex setup'],
    lastUpdated: new Date().toISOString()
  },
  {
    id: 'tableau-ai',
    name: 'Tableau AI',
    description: 'AI-powered data visualization and analytics platform',
    category: 'data-analysis',
    pricing: { price: 70, currency: 'USD', text: 'Starts at $70/user/month' },
    rating: 4.5,
    reviewCount: 15000,
    website: 'https://tableau.com',
    source: 'tableau',
    features: ['data-visualization', 'ai-insights', 'business-intelligence', 'collaboration'],
    pros: ['Industry standard', 'Powerful visualization', 'AI insights', 'Good integration'],
    cons: ['Expensive', 'Learning curve', 'Resource intensive'],
    lastUpdated: new Date().toISOString()
  },
  {
    id: 'power-bi',
    name: 'Power BI',
    description: 'Microsoft\'s business analytics platform with AI-powered insights',
    category: 'data-analysis',
    pricing: { price: 9.99, currency: 'USD', text: 'Pro plan at $9.99/user/month' },
    rating: 4.4,
    reviewCount: 20000,
    website: 'https://powerbi.microsoft.com',
    source: 'microsoft',
    features: ['business-intelligence', 'ai-insights', 'microsoft-integration', 'real-time-data'],
    pros: ['Microsoft integration', 'Affordable', 'Good for enterprise', 'Real-time data'],
    cons: ['Limited advanced AI', 'Microsoft ecosystem focused'],
    lastUpdated: new Date().toISOString()
  },
  {
    id: 'looker',
    name: 'Looker',
    description: 'Google\'s data platform with AI-powered analytics and insights',
    category: 'data-analysis',
    pricing: { price: null, currency: 'USD', text: 'Contact for pricing' },
    rating: 4.3,
    reviewCount: 8500,
    website: 'https://looker.com',
    source: 'google',
    features: ['data-platform', 'ai-analytics', 'google-integration', 'enterprise-focus'],
    pros: ['Google integration', 'Enterprise features', 'Good scalability', 'Advanced analytics'],
    cons: ['Expensive', 'Complex setup', 'Google ecosystem focused'],
    lastUpdated: new Date().toISOString()
  },
  {
    id: 'qlik-sense',
    name: 'Qlik Sense',
    description: 'AI-powered data analytics platform with associative engine',
    category: 'data-analysis',
    pricing: { price: 30, currency: 'USD', text: 'Starts at $30/user/month' },
    rating: 4.2,
    reviewCount: 12000,
    website: 'https://qlik.com',
    source: 'qlik',
    features: ['data-analytics', 'associative-engine', 'ai-insights', 'self-service'],
    pros: ['Associative engine', 'Self-service BI', 'Good AI insights', 'Flexible deployment'],
    cons: ['Learning curve', 'Resource intensive', 'Expensive'],
    lastUpdated: new Date().toISOString()
  },

  // Productivity
  {
    id: 'notion-ai',
    name: 'Notion AI',
    description: 'AI-powered workspace with writing, organization, and collaboration features',
    category: 'productivity',
    pricing: { price: 8, currency: 'USD', text: 'AI add-on at $8/month' },
    rating: 4.6,
    reviewCount: 25000,
    website: 'https://notion.so',
    source: 'notion',
    features: ['workspace', 'ai-writing', 'organization', 'collaboration'],
    pros: ['All-in-one workspace', 'Great AI writing', 'Excellent organization', 'Good collaboration'],
    cons: ['AI is expensive add-on', 'Learning curve', 'Can be overwhelming'],
    lastUpdated: new Date().toISOString()
  },
  {
    id: 'microsoft-copilot',
    name: 'Microsoft Copilot',
    description: 'AI assistant integrated across Microsoft 365 applications',
    category: 'productivity',
    pricing: { price: 30, currency: 'USD', text: 'Copilot for Microsoft 365 at $30/user/month' },
    rating: 4.5,
    reviewCount: 18000,
    website: 'https://microsoft.com/copilot',
    source: 'microsoft',
    features: ['office-integration', 'ai-assistant', 'productivity', 'enterprise-focus'],
    pros: ['Seamless Office integration', 'Enterprise focused', 'Good productivity features', 'Familiar interface'],
    cons: ['Expensive', 'Microsoft ecosystem only', 'Limited customization'],
    lastUpdated: new Date().toISOString()
  },
  {
    id: 'grammarly',
    name: 'Grammarly',
    description: 'AI-powered writing assistant for grammar, style, and tone',
    category: 'productivity',
    pricing: { price: 12, currency: 'USD', text: 'Premium at $12/month' },
    rating: 4.4,
    reviewCount: 30000,
    website: 'https://grammarly.com',
    source: 'grammarly',
    features: ['grammar-checking', 'style-improvement', 'tone-analysis', 'plagiarism-detection'],
    pros: ['Excellent grammar checking', 'Style improvement', 'Tone analysis', 'Wide browser support'],
    cons: ['Expensive', 'Privacy concerns', 'Sometimes over-corrects'],
    lastUpdated: new Date().toISOString()
  },
  {
    id: 'trello-butler',
    name: 'Trello Butler',
    description: 'AI-powered automation for Trello boards and workflows',
    category: 'productivity',
    pricing: { price: 0, currency: 'USD', text: 'Free with paid Trello plans' },
    rating: 4.3,
    reviewCount: 15000,
    website: 'https://trello.com/power-ups/butler',
    source: 'atlassian',
    features: ['workflow-automation', 'trello-integration', 'ai-suggestions', 'rule-based-actions'],
    pros: ['Great Trello integration', 'Powerful automation', 'AI suggestions', 'Free tier available'],
    cons: ['Trello only', 'Limited AI features', 'Complex setup'],
    lastUpdated: new Date().toISOString()
  },
  {
    id: 'zapier-ai',
    name: 'Zapier AI',
    description: 'AI-powered automation platform connecting thousands of apps',
    category: 'productivity',
    pricing: { price: 19.99, currency: 'USD', text: 'Starts at $19.99/month' },
    rating: 4.2,
    reviewCount: 20000,
    website: 'https://zapier.com',
    source: 'zapier',
    features: ['app-integration', 'workflow-automation', 'ai-assistant', 'thousands-of-apps'],
    pros: ['Thousands of app integrations', 'Powerful automation', 'AI assistant', 'Reliable'],
    cons: ['Expensive', 'Complex for beginners', 'Limited AI features'],
    lastUpdated: new Date().toISOString()
  },

  // Research & Education
  {
    id: 'perplexity-ai',
    name: 'Perplexity AI',
    description: 'AI-powered search engine with conversational interface and citations',
    category: 'research-education',
    pricing: { price: 0, currency: 'USD', text: 'Free with Pro at $20/month' },
    rating: 4.7,
    reviewCount: 12000,
    website: 'https://perplexity.ai',
    source: 'perplexity',
    features: ['ai-search', 'conversational-interface', 'citations', 'real-time-data'],
    pros: ['Excellent search results', 'Citations provided', 'Real-time data', 'Free tier'],
    cons: ['Limited advanced features', 'Can be slow'],
    lastUpdated: new Date().toISOString()
  },
  {
    id: 'consensus',
    name: 'Consensus',
    description: 'AI-powered research tool for finding and analyzing scientific papers',
    category: 'research-education',
    pricing: { price: 8.99, currency: 'USD', text: 'Starts at $8.99/month' },
    rating: 4.5,
    reviewCount: 8500,
    website: 'https://consensus.app',
    source: 'consensus',
    features: ['scientific-research', 'paper-analysis', 'ai-insights', 'academic-focus'],
    pros: ['Excellent for research', 'Scientific accuracy', 'Good insights', 'Academic focus'],
    cons: ['Limited to scientific papers', 'Expensive for students'],
    lastUpdated: new Date().toISOString()
  },
  {
    id: 'elicit',
    name: 'Elicit',
    description: 'AI research assistant for analyzing and summarizing academic papers',
    category: 'research-education',
    pricing: { price: 0, currency: 'USD', text: 'Free with paid plans' },
    rating: 4.4,
    reviewCount: 6500,
    website: 'https://elicit.org',
    source: 'elicit',
    features: ['research-assistant', 'paper-summarization', 'question-answering', 'academic-focus'],
    pros: ['Great for research', 'Free tier available', 'Good summarization', 'Academic focus'],
    cons: ['Limited to academic papers', 'Quality varies'],
    lastUpdated: new Date().toISOString()
  },
  {
    id: 'chatpdf',
    name: 'ChatPDF',
    description: 'AI tool for chatting with and analyzing PDF documents',
    category: 'research-education',
    pricing: { price: 5, currency: 'USD', text: 'Starts at $5/month' },
    rating: 4.3,
    reviewCount: 9500,
    website: 'https://chatpdf.com',
    source: 'chatpdf',
    features: ['pdf-analysis', 'document-chat', 'ai-insights', 'easy-upload'],
    pros: ['Easy to use', 'Good PDF analysis', 'Affordable', 'Quick setup'],
    cons: ['Limited to PDFs', 'File size limits', 'Basic features'],
    lastUpdated: new Date().toISOString()
  },
  {
    id: 'scite-ai',
    name: 'scite.ai',
    description: 'AI-powered platform for understanding how research papers are cited',
    category: 'research-education',
    pricing: { price: 0, currency: 'USD', text: 'Free with paid plans' },
    rating: 4.2,
    reviewCount: 4500,
    website: 'https://scite.ai',
    source: 'scite',
    features: ['citation-analysis', 'research-validation', 'ai-insights', 'academic-focus'],
    pros: ['Unique citation analysis', 'Research validation', 'Academic focus', 'Free tier'],
    cons: ['Limited scope', 'Complex interface'],
    lastUpdated: new Date().toISOString()
  }
];

async function generateAIToolsData() {
  console.log('🚀 Generating comprehensive AI tools dataset...');
  
  try {
    // Create data directory
    const dataDir = path.join(__dirname, 'data');
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true });
    }
    
    // Export all tools
    const allToolsPath = path.join(dataDir, 'tools.json');
    fs.writeFileSync(allToolsPath, JSON.stringify({
      tools: aiToolsData,
      total: aiToolsData.length,
      lastUpdated: new Date().toISOString()
    }, null, 2));
    
    // Export by category
    const toolsByCategory = aiToolsData.reduce((acc, tool) => {
      const category = tool.category;
      if (!acc[category]) {
        acc[category] = [];
      }
      acc[category].push(tool);
      return acc;
    }, {});
    
    for (const [category, categoryTools] of Object.entries(toolsByCategory)) {
      const categoryPath = path.join(dataDir, `${category}.json`);
      fs.writeFileSync(categoryPath, JSON.stringify({
        category: category,
        tools: categoryTools,
        total: categoryTools.length,
        lastUpdated: new Date().toISOString()
      }, null, 2));
    }
    
    // Export summary
    const summaryPath = path.join(dataDir, 'summary.json');
    const summary = {
      totalTools: aiToolsData.length,
      categories: Object.keys(toolsByCategory),
      toolsPerCategory: Object.fromEntries(
        Object.entries(toolsByCategory).map(([cat, tools]) => [cat, tools.length])
      ),
      sources: [...new Set(aiToolsData.map(t => t.source))],
      lastUpdated: new Date().toISOString()
    };
    
    fs.writeFileSync(summaryPath, JSON.stringify(summary, null, 2));
    
    console.log('✅ AI Tools dataset generated successfully!');
    console.log(`📊 Generated ${aiToolsData.length} AI tools across ${Object.keys(toolsByCategory).length} categories`);
    console.log(`📁 Files created in data/ directory:`);
    console.log(`   - tools.json (${aiToolsData.length} tools)`);
    console.log(`   - summary.json (statistics)`);
    
    for (const [category, categoryTools] of Object.entries(toolsByCategory)) {
      console.log(`   - ${category}.json (${categoryTools.length} tools)`);
    }
    
    console.log('\n📈 Category breakdown:');
    for (const [category, categoryTools] of Object.entries(toolsByCategory)) {
      console.log(`   ${category}: ${categoryTools.length} tools`);
    }
    
  } catch (error) {
    console.error('❌ Error generating dataset:', error);
  }
}

// Run the script
generateAIToolsData();
