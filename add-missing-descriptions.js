const fs = require('fs');
const path = require('path');

// Read the current data
const toolsData = JSON.parse(fs.readFileSync(path.join(__dirname, 'aiToolsData.json'), 'utf8'));

// Define descriptions for tools missing them
const descriptions = {
  "ChatGPT": "ChatGPT is OpenAI's advanced conversational AI that offers natural language understanding, code generation, creative writing, and problem-solving capabilities powered by GPT-4.",
  "Jasper AI": "Jasper AI is an enterprise-grade AI writing assistant that helps create marketing copy, blog posts, social media content, and business documents with brand voice customization.",
  "Surfer SEO": "Surfer SEO is an AI-powered content optimization platform that analyzes top-ranking pages to provide data-driven recommendations for improving search engine rankings.",
  "Frase": "Frase is an AI content optimization tool that helps create SEO-optimized content by analyzing competitors, generating briefs, and providing real-time optimization suggestions.",
  "Midjourney": "Midjourney is a leading AI image generation platform that creates stunning artwork, illustrations, and designs from text prompts with exceptional artistic quality.",
  "DALL-E": "DALL-E is OpenAI's AI image generation system that creates realistic images and art from natural language descriptions with precise control over style and composition.",
  "Hootsuite AI": "Hootsuite AI enhances social media management with AI-powered content creation, optimal posting time recommendations, and automated social listening capabilities.",
  "Buffer AI": "Buffer AI is a social media management platform with AI-driven content suggestions, engagement analytics, and automated scheduling for optimal reach.",
  "Ahrefs AI": "Ahrefs AI combines traditional SEO tools with AI-powered content analysis, keyword research automation, and competitive intelligence for comprehensive digital marketing.",
  "Semrush AI": "Semrush AI offers AI-enhanced SEO, content marketing, and competitive research tools with automated insights and recommendations for digital marketing success.",
  "Mailchimp AI": "Mailchimp AI provides intelligent email marketing automation with AI-driven content creation, audience segmentation, and predictive analytics for campaign optimization.",
  "HubSpot AI": "HubSpot AI integrates artificial intelligence across CRM, marketing, sales, and service hubs to automate workflows and provide predictive insights.",
  "Claude": "Claude is Anthropic's advanced AI assistant known for thoughtful, nuanced responses, strong analytical capabilities, and ethical AI principles.",
  "Copy.ai": "Copy.ai is an AI-powered copywriting tool that generates marketing copy, blog posts, social media content, and sales materials in seconds.",
  "Writesonic": "Writesonic is an AI writing assistant that creates SEO-optimized content, landing pages, product descriptions, and marketing copy with built-in templates."
};

// Update tools with missing descriptions
toolsData.forEach(tool => {
  if (!tool.description && descriptions[tool.tool_name]) {
    tool.description = descriptions[tool.tool_name];
    console.log(`Added description for ${tool.tool_name}`);
  }
});

// Save the updated data
fs.writeFileSync(
  path.join(__dirname, 'aiToolsData.json'),
  JSON.stringify(toolsData, null, 2)
);

console.log('Descriptions added successfully!');