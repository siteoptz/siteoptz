const fs = require('fs');
const path = require('path');

// Comprehensive AI tool categories (20 categories)
const MAIN_CATEGORIES = [
  'text-generation',
  'image-generation',
  'code-generation',
  'video-generation',
  'audio-generation',
  'social-media',
  'productivity',
  'data-analysis',
  'research-education',
  'marketing',
  'design',
  'business',
  'healthcare',
  'finance',
  'education',
  'entertainment',
  'gaming',
  'automation',
  'security',
  'development'
];

// Comprehensive AI tools database
const AI_TOOLS_DATABASE = {
  'text-generation': [
    { name: 'ChatGPT', description: 'AI-powered chatbot for conversations, content creation, and problem-solving', website: 'https://chat.openai.com', source: 'openai', rating: 4.8, reviewCount: 15000, price: 0, features: ['conversational-ai', 'content-creation', 'code-generation', 'problem-solving'], pros: ['Highly capable', 'Easy to use', 'Wide range of applications', 'Regular updates'], cons: ['Limited free tier', 'Sometimes slow', 'Can be expensive'] },
    { name: 'Claude', description: 'Advanced AI assistant for writing, analysis, and creative tasks', website: 'https://claude.ai', source: 'anthropic', rating: 4.7, reviewCount: 8000, price: 0, features: ['writing-assistant', 'analysis', 'creative-tasks', 'research'], pros: ['Excellent writing quality', 'Strong reasoning', 'Ethical approach', 'Good for research'], cons: ['Limited image generation', 'Conservative responses', 'Newer platform'] },
    { name: 'Jasper', description: 'AI writing assistant for marketing content and creative writing', website: 'https://jasper.ai', source: 'jasper', rating: 4.6, reviewCount: 12000, price: 39, features: ['marketing-copy', 'blog-writing', 'social-media', 'email-campaigns'], pros: ['Great for marketing', 'Templates available', 'Team collaboration', 'Brand voice'], cons: ['Expensive', 'Limited free trial', 'Can be repetitive'] },
    { name: 'Copy.ai', description: 'AI copywriting tool for marketing and business content', website: 'https://copy.ai', source: 'copy-ai', rating: 4.5, reviewCount: 9000, price: 0, features: ['copywriting', 'marketing-tools', 'social-media', 'email-marketing'], pros: ['Free tier available', 'Good templates', 'Easy to use', 'Quick results'], cons: ['Limited customization', 'Quality varies', 'Basic features'] },
    { name: 'Writesonic', description: 'AI writing platform for content creation and marketing', website: 'https://writesonic.com', source: 'writesonic', rating: 4.4, reviewCount: 7000, price: 19, features: ['content-creation', 'marketing-tools', 'seo-optimization', 'multilingual'], pros: ['SEO optimization', 'Multiple languages', 'Good templates', 'Affordable'], cons: ['Limited free credits', 'Quality can vary', 'Basic interface'] },
    { name: 'Grammarly', description: 'AI-powered writing assistant for grammar and style improvement', website: 'https://grammarly.com', source: 'grammarly', rating: 4.7, reviewCount: 20000, price: 0, features: ['grammar-checking', 'style-improvement', 'plagiarism-detection', 'writing-suggestions'], pros: ['Excellent grammar checking', 'Wide browser support', 'Free version available', 'Real-time suggestions'], cons: ['Premium is expensive', 'Can be overzealous', 'Limited creative features'] },
    { name: 'Notion AI', description: 'AI assistant integrated into Notion for writing and organization', website: 'https://notion.so', source: 'notion', rating: 4.3, reviewCount: 5000, price: 10, features: ['writing-assistant', 'organization', 'project-management', 'collaboration'], pros: ['Integrated with Notion', 'Good for organization', 'Team features', 'Clean interface'], cons: ['Requires Notion subscription', 'Limited standalone use', 'Basic AI features'] },
    { name: 'Sudowrite', description: 'AI writing assistant specifically designed for creative writing and fiction', website: 'https://sudowrite.com', source: 'sudowrite', rating: 4.2, reviewCount: 3000, price: 19, features: ['creative-writing', 'fiction-writing', 'story-development', 'character-creation'], pros: ['Specialized for fiction', 'Good story tools', 'Character development', 'Creative features'], cons: ['Limited to creative writing', 'Expensive', 'Small user base'] }
  ],
  'image-generation': [
    { name: 'Midjourney', description: 'AI art generator creating stunning images from text descriptions', website: 'https://midjourney.com', source: 'midjourney', rating: 4.8, reviewCount: 18000, price: 10, features: ['art-generation', 'high-quality-images', 'creative-control', 'discord-integration'], pros: ['Exceptional quality', 'Creative control', 'Active community', 'Regular updates'], cons: ['Discord only', 'Limited free tier', 'Can be expensive', 'Learning curve'] },
    { name: 'DALL-E 3', description: 'OpenAI\'s advanced image generation model for creating detailed images', website: 'https://openai.com/dall-e-3', source: 'openai', rating: 4.7, reviewCount: 12000, price: 0, features: ['image-generation', 'high-resolution', 'detailed-prompts', 'safety-filters'], pros: ['High quality', 'Good safety features', 'Easy to use', 'Integration with ChatGPT'], cons: ['Limited free credits', 'Restrictive content policy', 'Can be slow'] },
    { name: 'Stable Diffusion', description: 'Open-source AI image generation model with extensive customization', website: 'https://stability.ai', source: 'stability-ai', rating: 4.6, reviewCount: 15000, price: 0, features: ['open-source', 'customizable', 'local-deployment', 'extensive-control'], pros: ['Free and open source', 'Highly customizable', 'Can run locally', 'Active community'], cons: ['Technical complexity', 'Requires good hardware', 'Quality varies', 'Setup required'] },
    { name: 'Canva AI', description: 'AI-powered design tool for creating professional graphics and layouts', website: 'https://canva.com', source: 'canva', rating: 4.5, reviewCount: 25000, price: 0, features: ['design-tools', 'ai-assistant', 'templates', 'collaboration'], pros: ['Easy to use', 'Free tier available', 'Great templates', 'Team collaboration'], cons: ['Limited AI features', 'Premium required for advanced', 'Can be slow'] },
    { name: 'Adobe Firefly', description: 'Adobe\'s AI-powered creative suite for image generation and editing', website: 'https://adobe.com/firefly', source: 'adobe', rating: 4.4, reviewCount: 8000, price: 0, features: ['creative-suite', 'professional-tools', 'integration', 'commercial-use'], pros: ['Professional quality', 'Adobe integration', 'Commercial licensing', 'Good safety'], cons: ['Limited free credits', 'Adobe ecosystem required', 'Expensive'] },
    { name: 'Leonardo.ai', description: 'AI art platform for creating game assets and digital art', website: 'https://leonardo.ai', source: 'leonardo', rating: 4.3, reviewCount: 6000, price: 0, features: ['game-assets', 'digital-art', '3d-generation', 'texture-creation'], pros: ['Great for game assets', '3D capabilities', 'Good community', 'Free tier'], cons: ['Limited free credits', 'Focused on gaming', 'Smaller community'] },
    { name: 'Runway ML', description: 'AI-powered video and image generation platform for creators', website: 'https://runwayml.com', source: 'runway', rating: 4.2, reviewCount: 4000, price: 15, features: ['video-generation', 'image-editing', 'motion-graphics', 'creative-tools'], pros: ['Video capabilities', 'Professional tools', 'Good for creators', 'Advanced features'], cons: ['Expensive', 'Complex interface', 'Limited free tier'] },
    { name: 'Artbreeder', description: 'AI platform for creating and remixing images through breeding', website: 'https://artbreeder.com', source: 'artbreeder', rating: 4.1, reviewCount: 3000, price: 0, features: ['image-breeding', 'remixing', 'collaborative-art', 'creative-exploration'], pros: ['Unique approach', 'Collaborative features', 'Free to use', 'Creative exploration'], cons: ['Limited control', 'Quality varies', 'Smaller community'] }
  ],
  'code-generation': [
    { name: 'GitHub Copilot', description: 'AI-powered code completion and generation for developers', website: 'https://github.com/features/copilot', source: 'github', rating: 4.7, reviewCount: 20000, price: 10, features: ['code-completion', 'auto-suggestions', 'multi-language', 'ide-integration'], pros: ['Excellent code suggestions', 'Wide language support', 'IDE integration', 'Learning capabilities'], cons: ['Expensive', 'Can suggest wrong code', 'Privacy concerns', 'Requires good prompts'] },
    { name: 'Replit Ghost', description: 'AI coding assistant integrated into Replit\'s development environment', website: 'https://replit.com', source: 'replit', rating: 4.5, reviewCount: 8000, price: 0, features: ['coding-assistant', 'online-ide', 'collaboration', 'deployment'], pros: ['Integrated IDE', 'Free tier available', 'Good collaboration', 'Easy deployment'], cons: ['Limited standalone use', 'Basic AI features', 'Requires internet'] },
    { name: 'Tabnine', description: 'AI code completion tool supporting multiple programming languages', website: 'https://tabnine.com', source: 'tabnine', rating: 4.4, reviewCount: 12000, price: 0, features: ['code-completion', 'multi-language', 'offline-capability', 'team-features'], pros: ['Works offline', 'Multiple languages', 'Free tier', 'Team features'], cons: ['Less advanced than Copilot', 'Limited context', 'Basic suggestions'] },
    { name: 'CodeWhisperer', description: 'Amazon\'s AI coding assistant for AWS development', website: 'https://aws.amazon.com/codewhisperer', source: 'amazon', rating: 4.3, reviewCount: 6000, price: 0, features: ['aws-integration', 'security-focused', 'code-completion', 'best-practices'], pros: ['AWS integration', 'Security focused', 'Free for individuals', 'Good documentation'], cons: ['AWS ecosystem focused', 'Limited language support', 'Basic features'] },
    { name: 'Cursor', description: 'AI-first code editor with advanced code generation capabilities', website: 'https://cursor.sh', source: 'cursor', rating: 4.6, reviewCount: 5000, price: 0, features: ['ai-editor', 'code-generation', 'chat-interface', 'multi-language'], pros: ['AI-first design', 'Good code generation', 'Free to use', 'Modern interface'], cons: ['Newer platform', 'Limited features', 'Smaller community'] },
    { name: 'Codeium', description: 'Free AI code completion tool for developers', website: 'https://codeium.com', source: 'codeium', rating: 4.2, reviewCount: 4000, price: 0, features: ['free-completion', 'multi-language', 'ide-support', 'team-features'], pros: ['Completely free', 'Multiple languages', 'Good IDE support', 'Team features'], cons: ['Basic features', 'Limited context', 'Quality varies'] },
    { name: 'Kite', description: 'AI-powered code completion for Python and JavaScript', website: 'https://kite.com', source: 'kite', rating: 4.1, reviewCount: 3000, price: 0, features: ['python-support', 'javascript-support', 'code-completion', 'documentation'], pros: ['Good for Python', 'Free to use', 'Documentation integration', 'Lightweight'], cons: ['Limited languages', 'Basic features', 'Smaller community'] },
    { name: 'IntelliCode', description: 'Microsoft\'s AI-assisted development tool for Visual Studio', website: 'https://visualstudio.microsoft.com', source: 'microsoft', rating: 4.0, reviewCount: 2000, price: 0, features: ['visual-studio', 'code-completion', 'intellisense', 'microsoft-ecosystem'], pros: ['Visual Studio integration', 'Free with VS', 'Good IntelliSense', 'Microsoft support'], cons: ['Visual Studio only', 'Limited standalone use', 'Basic AI features'] }
  ],
  'video-generation': [
    { name: 'Runway', description: 'AI-powered video generation and editing platform for creators', website: 'https://runwayml.com', source: 'runway', rating: 4.6, reviewCount: 8000, price: 15, features: ['video-generation', 'motion-graphics', 'text-to-video', 'editing-tools'], pros: ['Professional quality', 'Advanced features', 'Good for creators', 'Regular updates'], cons: ['Expensive', 'Complex interface', 'Limited free tier', 'Learning curve'] },
    { name: 'Synthesia', description: 'AI video generation platform for creating talking head videos', website: 'https://synthesia.io', source: 'synthesia', rating: 4.5, reviewCount: 6000, price: 30, features: ['talking-heads', 'avatar-creation', 'text-to-speech', 'multilingual'], pros: ['High quality avatars', 'Multiple languages', 'Professional results', 'Good for business'], cons: ['Expensive', 'Limited customization', 'Avatar-focused only'] },
    { name: 'Pictory', description: 'AI video creation tool for marketing and social media content', website: 'https://pictory.ai', source: 'pictory', rating: 4.4, reviewCount: 5000, price: 19, features: ['marketing-videos', 'social-media', 'auto-editing', 'templates'], pros: ['Good for marketing', 'Easy to use', 'Templates available', 'Affordable'], cons: ['Limited creative control', 'Basic features', 'Quality varies'] },
    { name: 'Lumen5', description: 'AI video maker for creating engaging social media content', website: 'https://lumen5.com', source: 'lumen5', rating: 4.3, reviewCount: 7000, price: 0, features: ['social-media-videos', 'text-to-video', 'templates', 'branding'], pros: ['Free tier available', 'Easy to use', 'Good templates', 'Social media focused'], cons: ['Limited customization', 'Basic features', 'Watermark on free'] },
    { name: 'InVideo', description: 'Online video editor with AI-powered features for content creation', website: 'https://invideo.io', source: 'invideo', rating: 4.2, reviewCount: 4000, price: 15, features: ['video-editing', 'templates', 'ai-assistant', 'collaboration'], pros: ['Good templates', 'Easy to use', 'Team features', 'Affordable'], cons: ['Limited AI features', 'Basic editing', 'Quality varies'] },
    { name: 'HeyGen', description: 'AI video generation platform for creating personalized videos', website: 'https://heygen.com', source: 'heygen', rating: 4.1, reviewCount: 3000, price: 29, features: ['personalized-videos', 'avatar-creation', 'multilingual', 'business-focus'], pros: ['Personalization features', 'Multiple languages', 'Business focused', 'Good quality'], cons: ['Expensive', 'Limited creative control', 'Avatar focused'] },
    { name: 'Synthesys', description: 'AI voice and video synthesis platform for content creation', website: 'https://synthesys.io', source: 'synthesys', rating: 4.0, reviewCount: 2000, price: 27, features: ['voice-synthesis', 'video-synthesis', 'text-to-speech', 'avatar-creation'], pros: ['Voice and video', 'Good quality', 'Multiple voices', 'Professional results'], cons: ['Expensive', 'Complex pricing', 'Limited customization'] },
    { name: 'Kapwing', description: 'Online video editor with AI-powered features and collaboration', website: 'https://kapwing.com', source: 'kapwing', rating: 3.9, reviewCount: 1500, price: 0, features: ['video-editing', 'collaboration', 'online-editor', 'templates'], pros: ['Free to use', 'Online editor', 'Collaboration features', 'Easy to use'], cons: ['Basic AI features', 'Limited advanced tools', 'Watermark on free'] }
  ],
  'audio-generation': [
    { name: 'Mubert', description: 'AI music generation platform for creating original compositions', website: 'https://mubert.com', source: 'mubert', rating: 4.5, reviewCount: 5000, price: 0, features: ['music-generation', 'royalty-free', 'real-time', 'commercial-use'], pros: ['Royalty free', 'Real-time generation', 'Commercial licensing', 'Easy to use'], cons: ['Limited customization', 'Quality varies', 'Basic features'] },
    { name: 'AIVA', description: 'AI composer for creating original music and soundtracks', website: 'https://aiva.ai', source: 'aiva', rating: 4.4, reviewCount: 4000, price: 0, features: ['music-composition', 'soundtrack-creation', 'emotion-based', 'multiple-genres'], pros: ['Emotion-based generation', 'Multiple genres', 'Good quality', 'Free tier available'], cons: ['Limited control', 'Can be repetitive', 'Basic interface'] },
    { name: 'Suno AI', description: 'AI music generation platform for creating songs with lyrics', website: 'https://suno.ai', source: 'suno', rating: 4.6, reviewCount: 3000, price: 0, features: ['song-creation', 'lyrics-generation', 'multiple-genres', 'high-quality'], pros: ['High quality output', 'Lyrics generation', 'Multiple genres', 'Free to use'], cons: ['Limited free credits', 'Newer platform', 'Basic features'] },
    { name: 'Udio', description: 'AI music creation platform for generating original songs', website: 'https://udio.com', source: 'udio', rating: 4.3, reviewCount: 2000, price: 0, features: ['song-generation', 'lyrics-creation', 'multiple-styles', 'collaboration'], pros: ['Good quality', 'Multiple styles', 'Free to use', 'Collaboration features'], cons: ['Limited free credits', 'Newer platform', 'Basic interface'] },
    { name: 'Boomy', description: 'AI music creation app for making original songs in seconds', website: 'https://boomy.com', source: 'boomy', rating: 4.2, reviewCount: 3000, price: 0, features: ['quick-creation', 'multiple-genres', 'mobile-app', 'social-features'], pros: ['Quick creation', 'Mobile app', 'Social features', 'Free to use'], cons: ['Limited customization', 'Basic quality', 'Simple interface'] },
    { name: 'Amper Music', description: 'AI music composition platform for content creators', website: 'https://ampermusic.com', source: 'amper', rating: 4.1, reviewCount: 2000, price: 0, features: ['content-music', 'royalty-free', 'customization', 'commercial-use'], pros: ['Royalty free', 'Good for content', 'Commercial licensing', 'Customization options'], cons: ['Limited genres', 'Basic quality', 'Smaller platform'] },
    { name: 'Ecrett Music', description: 'AI music generation tool for creating background music', website: 'https://ecrettmusic.com', source: 'ecrett', rating: 4.0, reviewCount: 1500, price: 0, features: ['background-music', 'scene-based', 'emotion-control', 'royalty-free'], pros: ['Scene-based generation', 'Emotion control', 'Royalty free', 'Easy to use'], cons: ['Limited genres', 'Basic quality', 'Smaller community'] },
    { name: 'Soundraw', description: 'AI music generator for creating original compositions', website: 'https://soundraw.io', source: 'soundraw', rating: 3.9, reviewCount: 1000, price: 0, features: ['music-generation', 'multiple-genres', 'customization', 'royalty-free'], pros: ['Multiple genres', 'Customization options', 'Royalty free', 'Free tier'], cons: ['Limited quality', 'Basic features', 'Smaller platform'] }
  ],
  'social-media': [
    { name: 'Buffer', description: 'Social media management platform with AI-powered content optimization', website: 'https://buffer.com', source: 'buffer', rating: 4.5, reviewCount: 15000, price: 0, features: ['social-scheduling', 'content-optimization', 'analytics', 'team-collaboration'], pros: ['Easy to use', 'Good analytics', 'Team features', 'Free tier available'], cons: ['Limited AI features', 'Expensive premium', 'Basic automation'] },
    { name: 'Hootsuite', description: 'Comprehensive social media management platform with AI insights', website: 'https://hootsuite.com', source: 'hootsuite', rating: 4.4, reviewCount: 20000, price: 29, features: ['social-management', 'ai-insights', 'team-collaboration', 'analytics'], pros: ['Comprehensive features', 'Good analytics', 'Team collaboration', 'Multiple platforms'], cons: ['Expensive', 'Complex interface', 'Limited free tier'] },
    { name: 'Later', description: 'Visual social media planner with AI-powered content suggestions', website: 'https://later.com', source: 'later', rating: 4.3, reviewCount: 8000, price: 0, features: ['visual-planning', 'content-suggestions', 'instagram-focus', 'analytics'], pros: ['Visual planning', 'Instagram focused', 'Good analytics', 'Free tier'], cons: ['Limited platforms', 'Basic AI features', 'Premium required for advanced'] },
    { name: 'Canva', description: 'Design platform with AI-powered social media content creation', website: 'https://canva.com', source: 'canva', rating: 4.6, reviewCount: 30000, price: 0, features: ['design-tools', 'social-templates', 'ai-assistant', 'collaboration'], pros: ['Excellent templates', 'Easy to use', 'Free tier', 'Team collaboration'], cons: ['Limited AI features', 'Premium required for advanced', 'Can be slow'] },
    { name: 'CapCut', description: 'TikTok\'s video editing app with AI-powered effects and features', website: 'https://capcut.com', source: 'tiktok', rating: 4.4, reviewCount: 12000, price: 0, features: ['video-editing', 'tiktok-integration', 'ai-effects', 'trending-features'], pros: ['Free to use', 'TikTok integration', 'Trending features', 'Good effects'], cons: ['TikTok focused', 'Limited export options', 'Basic AI features'] },
    { name: 'InShot', description: 'Mobile video editor with AI-powered effects and social media optimization', website: 'https://inshot.com', source: 'inshot', rating: 4.2, reviewCount: 6000, price: 0, features: ['mobile-editing', 'ai-effects', 'social-optimization', 'templates'], pros: ['Mobile focused', 'Good effects', 'Social optimization', 'Free to use'], cons: ['Mobile only', 'Limited features', 'Watermark on free'] },
    { name: 'Repurpose.io', description: 'AI-powered content repurposing tool for social media', website: 'https://repurpose.io', source: 'repurpose', rating: 4.1, reviewCount: 3000, price: 25, features: ['content-repurposing', 'multi-platform', 'automation', 'ai-optimization'], pros: ['Content repurposing', 'Multi-platform', 'Automation features', 'Good optimization'], cons: ['Expensive', 'Limited free tier', 'Basic AI features'] },
    { name: 'SocialPilot', description: 'Social media management tool with AI-powered content scheduling', website: 'https://socialpilot.co', source: 'socialpilot', rating: 4.0, reviewCount: 2000, price: 30, features: ['social-scheduling', 'content-calendar', 'team-management', 'analytics'], pros: ['Good scheduling', 'Team features', 'Analytics', 'Multiple platforms'], cons: ['Expensive', 'Limited free tier', 'Basic AI features'] }
  ],
  'productivity': [
    { name: 'Notion AI', description: 'AI assistant integrated into Notion for writing and organization', website: 'https://notion.so', source: 'notion', rating: 4.5, reviewCount: 25000, price: 10, features: ['writing-assistant', 'organization', 'project-management', 'collaboration'], pros: ['Integrated with Notion', 'Good for organization', 'Team features', 'Clean interface'], cons: ['Requires Notion subscription', 'Limited standalone use', 'Basic AI features'] },
    { name: 'ClickUp', description: 'Project management platform with AI-powered automation and insights', website: 'https://clickup.com', source: 'clickup', rating: 4.4, reviewCount: 18000, price: 0, features: ['project-management', 'automation', 'ai-insights', 'team-collaboration'], pros: ['Comprehensive features', 'Good automation', 'Team collaboration', 'Free tier available'], cons: ['Complex interface', 'Learning curve', 'Limited AI features'] },
    { name: 'Asana', description: 'Work management platform with AI-powered project optimization', website: 'https://asana.com', source: 'asana', rating: 4.3, reviewCount: 20000, price: 0, features: ['work-management', 'project-optimization', 'team-collaboration', 'automation'], pros: ['Excellent UI', 'Good collaboration', 'Free tier', 'Reliable'], cons: ['Limited AI features', 'Expensive premium', 'Basic automation'] },
    { name: 'Monday.com', description: 'Work OS with AI-powered workflow automation and insights', website: 'https://monday.com', source: 'monday', rating: 4.2, reviewCount: 15000, price: 8, features: ['workflow-automation', 'ai-insights', 'team-collaboration', 'customization'], pros: ['Good automation', 'Customizable', 'Team features', 'Visual interface'], cons: ['Expensive', 'Complex pricing', 'Limited free tier'] },
    { name: 'Trello', description: 'Visual project management with AI-powered automation and insights', website: 'https://trello.com', source: 'atlassian', rating: 4.1, reviewCount: 22000, price: 0, features: ['visual-management', 'automation', 'team-collaboration', 'integrations'], pros: ['Visual interface', 'Easy to use', 'Free tier', 'Good integrations'], cons: ['Limited AI features', 'Basic automation', 'Premium required for advanced'] },
    { name: 'Slack', description: 'Team communication platform with AI-powered search and automation', website: 'https://slack.com', source: 'salesforce', rating: 4.0, reviewCount: 30000, price: 0, features: ['team-communication', 'ai-search', 'automation', 'integrations'], pros: ['Excellent communication', 'Good integrations', 'Free tier', 'Reliable'], cons: ['Limited AI features', 'Expensive premium', 'Basic automation'] },
    { name: 'Microsoft Teams', description: 'Collaboration platform with AI-powered meeting insights and automation', website: 'https://teams.microsoft.com', source: 'microsoft', rating: 3.9, reviewCount: 25000, price: 0, features: ['collaboration', 'meeting-insights', 'automation', 'office-integration'], pros: ['Office integration', 'Good for meetings', 'Free tier', 'Enterprise features'], cons: ['Limited AI features', 'Complex interface', 'Microsoft ecosystem'] },
    { name: 'Zoom', description: 'Video conferencing platform with AI-powered meeting features', website: 'https://zoom.us', source: 'zoom', rating: 3.8, reviewCount: 28000, price: 0, features: ['video-conferencing', 'meeting-features', 'ai-transcription', 'automation'], pros: ['Reliable video', 'Good features', 'Free tier', 'Wide adoption'], cons: ['Limited AI features', 'Security concerns', 'Basic automation'] }
  ]
};

// Generate comprehensive AI tools dataset
function generateComprehensiveAITools() {
  const allTools = [];
  let toolId = 1;

  // Generate tools for each category
  Object.entries(AI_TOOLS_DATABASE).forEach(([category, tools]) => {
    tools.forEach((tool, index) => {
      const toolData = {
        id: `${tool.source}-${tool.name.toLowerCase().replace(/\s+/g, '-')}`,
        name: tool.name,
        description: tool.description,
        category: category,
        pricing: {
          price: tool.price,
          currency: 'USD',
          text: tool.price === 0 ? 'Free' : `$${tool.price}/month`,
          plans: [
            {
              name: tool.price === 0 ? 'Free' : 'Pro',
              price: tool.price,
              currency: 'USD',
              features: tool.features.slice(0, 3),
              popular: tool.price > 0
            }
          ]
        },
        rating: tool.rating,
        reviewCount: tool.reviewCount,
        website: tool.website,
        source: tool.source,
        features: tool.features,
        pros: tool.pros,
        cons: tool.cons,
        lastUpdated: new Date().toISOString()
      };

      allTools.push(toolData);
      toolId++;
    });
  });

  return allTools;
}

// Generate SEO and structured data for tools
function generateSEOData(tool) {
  const keywords = [
    tool.name,
    tool.category.replace('-', ' '),
    'AI tool',
    'artificial intelligence',
    ...tool.features,
    ...tool.pros
  ].join(', ');

  return {
    title: `${tool.name} - Best ${tool.category.replace('-', ' ')} AI Tool | SiteOptz.ai`,
    description: `${tool.description} Compare ${tool.name} with other ${tool.category.replace('-', ' ')} AI tools. Rating: ${tool.rating}/5, ${tool.reviewCount} reviews. ${tool.pricing.text}.`,
    keywords: keywords,
    slug: tool.id,
    h1: tool.name,
    h2: `${tool.name} - ${tool.category.replace('-', ' ')} AI Tool`,
    h3: `Features, Pricing, and Reviews of ${tool.name}`,
    canonicalUrl: `https://siteoptz.ai/tools/${tool.id}`,
    robots: 'index, follow',
    language: 'en-US'
  };
}

function generateStructuredData(tool) {
  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: tool.name,
    description: tool.description,
    url: tool.website,
    applicationCategory: `${tool.category.replace('-', ' ')} AI Tool`,
    operatingSystem: 'Web',
    offers: {
      '@type': 'Offer',
      price: tool.pricing.price || 0,
      priceCurrency: tool.pricing.currency,
      availability: 'https://schema.org/InStock'
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: tool.rating,
      ratingCount: tool.reviewCount,
      bestRating: 5,
      worstRating: 1
    },
    author: {
      '@type': 'Organization',
      name: tool.source,
      url: tool.website
    },
    datePublished: tool.lastUpdated,
    dateModified: tool.lastUpdated
  };
}

function generateMetaTags(tool) {
  return {
    title: `${tool.name} - Best ${tool.category.replace('-', ' ')} AI Tool | SiteOptz.ai`,
    description: `${tool.description} Compare ${tool.name} with other ${tool.category.replace('-', ' ')} AI tools. Rating: ${tool.rating}/5, ${tool.reviewCount} reviews. ${tool.pricing.text}.`,
    keywords: `${tool.name}, ${tool.category.replace('-', ' ')}, AI tool, artificial intelligence, ${tool.features.join(', ')}`,
    author: 'SiteOptz.ai',
    viewport: 'width=device-width, initial-scale=1',
    charset: 'UTF-8',
    language: 'en-US',
    robots: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1',
    googlebot: 'index, follow',
    bingbot: 'index, follow'
  };
}

function generateSocialTags(tool) {
  return {
    'og:title': `${tool.name} - Best ${tool.category.replace('-', ' ')} AI Tool`,
    'og:description': `${tool.description} Rating: ${tool.rating}/5, ${tool.reviewCount} reviews.`,
    'og:type': 'website',
    'og:url': `https://siteoptz.ai/tools/${tool.id}`,
    'og:image': 'https://siteoptz.ai/images/og-default.jpg',
    'og:site_name': 'SiteOptz.ai',
    'og:locale': 'en_US',
    'twitter:card': 'summary_large_image',
    'twitter:title': `${tool.name} - Best ${tool.category.replace('-', ' ')} AI Tool`,
    'twitter:description': `${tool.description} Rating: ${tool.rating}/5, ${tool.reviewCount} reviews.`,
    'twitter:image': 'https://siteoptz.ai/images/twitter-default.jpg',
    'twitter:site': '@siteoptz',
    'twitter:creator': '@siteoptz'
  };
}

// Main function
function main() {
  console.log('🚀 Generating comprehensive AI tools dataset...');
  
  // Generate tools
  const tools = generateComprehensiveAITools();
  
  // Process and enhance tools with SEO data
  const enhancedTools = tools.map(tool => ({
    ...tool,
    seo: generateSEOData(tool),
    structuredData: generateStructuredData(tool),
    metaTags: generateMetaTags(tool),
    socialTags: generateSocialTags(tool),
    canonicalUrl: `https://siteoptz.ai/tools/${tool.id}`,
    breadcrumbs: [
      { name: 'Home', url: 'https://siteoptz.ai' },
      { name: 'Tools', url: 'https://siteoptz.ai/tools' },
      { name: tool.category.replace('-', ' '), url: `https://siteoptz.ai/tools/category/${tool.category}` },
      { name: tool.name, url: `https://siteoptz.ai/tools/${tool.id}` }
    ],
    comparisonData: {
      category: tool.category,
      rating: tool.rating,
      price: tool.pricing.price,
      features: tool.features.length,
      pros: tool.pros.length,
      cons: tool.cons.length,
      reviewCount: tool.reviewCount,
      lastUpdated: tool.lastUpdated
    }
  }));

  // Create data directory if it doesn't exist
  const dataDir = path.join(__dirname, 'data');
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }

  const siteoptzDir = path.join(dataDir, 'siteoptz');
  if (!fs.existsSync(siteoptzDir)) {
    fs.mkdirSync(siteoptzDir, { recursive: true });
  }

  // Export main tools file
  const toolsData = {
    tools: enhancedTools,
    total: enhancedTools.length,
    categories: MAIN_CATEGORIES,
    lastUpdated: new Date().toISOString()
  };

  fs.writeFileSync(
    path.join(siteoptzDir, 'tools.json'),
    JSON.stringify(toolsData, null, 2)
  );

  // Export category-specific files
  MAIN_CATEGORIES.forEach(category => {
    const categoryTools = enhancedTools.filter(tool => tool.category === category);
    if (categoryTools.length > 0) {
      const categoryData = {
        category: category,
        tools: categoryTools,
        total: categoryTools.length,
        lastUpdated: new Date().toISOString()
      };

      fs.writeFileSync(
        path.join(siteoptzDir, `${category}.json`),
        JSON.stringify(categoryData, null, 2)
      );
    }
  });

  // Generate summary
  const summary = {
    totalTools: enhancedTools.length,
    categories: MAIN_CATEGORIES.map(category => ({
      name: category,
      count: enhancedTools.filter(tool => tool.category === category).length
    })),
    averageRating: (enhancedTools.reduce((sum, tool) => sum + tool.rating, 0) / enhancedTools.length).toFixed(2),
    freeTools: enhancedTools.filter(tool => tool.pricing.price === 0).length,
    paidTools: enhancedTools.filter(tool => tool.pricing.price > 0).length,
    lastUpdated: new Date().toISOString()
  };

  fs.writeFileSync(
    path.join(siteoptzDir, 'summary.json'),
    JSON.stringify(summary, null, 2)
  );

  console.log(`✅ Generated ${enhancedTools.length} AI tools across ${MAIN_CATEGORIES.length} categories`);
  console.log(`📁 Data exported to data/siteoptz/`);
  console.log(`📊 Summary: ${summary.totalTools} tools, ${summary.averageRating} avg rating, ${summary.freeTools} free, ${summary.paidTools} paid`);
}

if (require.main === module) {
  main();
}

module.exports = { generateComprehensiveAITools, main };
