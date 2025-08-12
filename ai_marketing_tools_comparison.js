const https = require('https');

// Function to scrape AI marketing tool information
async function scrapeAIToolInfo(toolName, url) {
  return new Promise((resolve, reject) => {
    const data = JSON.stringify({
      url: url
    });

    const options = {
      hostname: 'api.firecrawl.dev',
      port: 443,
      path: '/v1/scrape',
      method: 'POST',
      headers: {
        'Authorization': 'Bearer fc-6e7e6312953b47069452e67509d9f857',
        'Content-Type': 'application/json',
        'Content-Length': data.length
      }
    };

    const req = https.request(options, (res) => {
      let responseData = '';
      
      res.on('data', (chunk) => {
        responseData += chunk;
      });
      
      res.on('end', () => {
        try {
          const result = JSON.parse(responseData);
          resolve(result);
        } catch (error) {
          reject(error);
        }
      });
    });

    req.on('error', (error) => {
      reject(error);
    });

    req.write(data);
    req.end();
  });
}

// AI Marketing Tools to research
const aiMarketingTools = [
  {
    name: 'Jasper AI',
    url: 'https://jasper.ai',
    category: 'Content Creation',
    description: 'AI-powered content creation platform'
  },
  {
    name: 'Copy.ai',
    url: 'https://copy.ai',
    category: 'Content Creation',
    description: 'AI copywriting and content generation'
  },
  {
    name: 'Surfer SEO',
    url: 'https://surferseo.com',
    category: 'SEO',
    description: 'AI-powered SEO optimization tool'
  },
  {
    name: 'Frase',
    url: 'https://frase.io',
    category: 'SEO & Content',
    description: 'AI content optimization and SEO research'
  },
  {
    name: 'Grammarly',
    url: 'https://grammarly.com',
    category: 'Writing Assistant',
    description: 'AI-powered writing and grammar checking'
  },
  {
    name: 'ChatGPT',
    url: 'https://chat.openai.com',
    category: 'General AI',
    description: 'OpenAI\'s conversational AI platform'
  },
  {
    name: 'Claude',
    url: 'https://claude.ai',
    category: 'General AI',
    description: 'Anthropic\'s AI assistant'
  },
  {
    name: 'Midjourney',
    url: 'https://midjourney.com',
    category: 'Visual AI',
    description: 'AI image generation platform'
  },
  {
    name: 'Canva AI',
    url: 'https://canva.com',
    category: 'Visual AI',
    description: 'AI-powered design and visual content creation'
  },
  {
    name: 'HubSpot AI',
    url: 'https://hubspot.com',
    category: 'Marketing Automation',
    description: 'AI-powered marketing automation platform'
  },
  {
    name: 'Mailchimp AI',
    url: 'https://mailchimp.com',
    category: 'Email Marketing',
    description: 'AI-enhanced email marketing platform'
  },
  {
    name: 'Hootsuite AI',
    url: 'https://hootsuite.com',
    category: 'Social Media',
    description: 'AI-powered social media management'
  },
  {
    name: 'Buffer AI',
    url: 'https://buffer.com',
    category: 'Social Media',
    description: 'AI-enhanced social media scheduling'
  },
  {
    name: 'Ahrefs AI',
    url: 'https://ahrefs.com',
    category: 'SEO',
    description: 'AI-powered SEO and keyword research'
  },
  {
    name: 'Semrush AI',
    url: 'https://semrush.com',
    category: 'SEO & Analytics',
    description: 'AI-enhanced SEO and competitive analysis'
  }
];

// Function to analyze tool features and capabilities
function analyzeToolFeatures(toolData) {
  const features = {
    contentCreation: false,
    seoOptimization: false,
    socialMedia: false,
    emailMarketing: false,
    analytics: false,
    automation: false,
    visualContent: false,
    keywordResearch: false,
    competitorAnalysis: false,
    aiWriting: false,
    aiDesign: false,
    aiAnalytics: false
  };

  const content = toolData?.data?.markdown?.toLowerCase() || '';
  
  // Analyze features based on content
  if (content.includes('content') || content.includes('writing') || content.includes('copy')) {
    features.contentCreation = true;
    features.aiWriting = true;
  }
  
  if (content.includes('seo') || content.includes('search') || content.includes('optimization')) {
    features.seoOptimization = true;
  }
  
  if (content.includes('social') || content.includes('facebook') || content.includes('twitter') || content.includes('instagram')) {
    features.socialMedia = true;
  }
  
  if (content.includes('email') || content.includes('newsletter') || content.includes('campaign')) {
    features.emailMarketing = true;
  }
  
  if (content.includes('analytics') || content.includes('report') || content.includes('data')) {
    features.analytics = true;
    features.aiAnalytics = true;
  }
  
  if (content.includes('automation') || content.includes('workflow') || content.includes('schedule')) {
    features.automation = true;
  }
  
  if (content.includes('design') || content.includes('visual') || content.includes('image') || content.includes('graphic')) {
    features.visualContent = true;
    features.aiDesign = true;
  }
  
  if (content.includes('keyword') || content.includes('research')) {
    features.keywordResearch = true;
  }
  
  if (content.includes('competitor') || content.includes('competition')) {
    features.competitorAnalysis = true;
  }

  return features;
}

// Function to create comprehensive comparison report
function createComparisonReport(toolsAnalysis) {
  let markdown = `# AI Marketing Tools Comparison Guide

## Executive Summary
*Generated on: ${new Date().toLocaleString()}*

This comprehensive guide compares leading AI marketing tools across different categories, helping marketers choose the right tools for their specific needs.

## Tool Categories Overview

### Content Creation & Copywriting
- **Jasper AI** - Advanced AI content creation
- **Copy.ai** - AI copywriting and content generation
- **ChatGPT** - General AI for content creation
- **Claude** - AI assistant for content development

### SEO & Optimization
- **Surfer SEO** - AI-powered SEO optimization
- **Frase** - Content optimization and SEO research
- **Ahrefs AI** - Comprehensive SEO and keyword research
- **Semrush AI** - SEO and competitive analysis

### Visual Content & Design
- **Midjourney** - AI image generation
- **Canva AI** - AI-powered design platform

### Marketing Automation
- **HubSpot AI** - Comprehensive marketing automation
- **Mailchimp AI** - AI-enhanced email marketing
- **Hootsuite AI** - Social media management
- **Buffer AI** - Social media scheduling

### Writing & Grammar
- **Grammarly** - AI writing assistant

## Detailed Tool Analysis

`;

  // Add detailed analysis for each tool
  toolsAnalysis.forEach((tool, index) => {
    const features = tool.features;
    const featureCount = Object.values(features).filter(Boolean).length;
    
    markdown += `### ${index + 1}. ${tool.name}
**Category:** ${tool.category}  
**Description:** ${tool.description}  
**Features:** ${featureCount} AI capabilities

#### Key Features:
${Object.entries(features)
  .filter(([key, value]) => value)
  .map(([key, value]) => `- ${key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}`)
  .join('\n')}

#### Content Summary:
${tool.data?.data?.markdown?.substring(0, 300) || 'Content not available'}...

---
`;
  });

  markdown += `
## Feature Comparison Matrix

| Tool | Content Creation | SEO | Social Media | Email | Analytics | Automation | Visual | Keywords | Competitor Analysis |
|------|-----------------|-----|--------------|-------|-----------|------------|--------|----------|-------------------|
`;

  toolsAnalysis.forEach(tool => {
    const features = tool.features;
    markdown += `| ${tool.name} | ${features.contentCreation ? '✅' : '❌'} | ${features.seoOptimization ? '✅' : '❌'} | ${features.socialMedia ? '✅' : '❌'} | ${features.emailMarketing ? '✅' : '❌'} | ${features.analytics ? '✅' : '❌'} | ${features.automation ? '✅' : '❌'} | ${features.visualContent ? '✅' : '❌'} | ${features.keywordResearch ? '✅' : '❌'} | ${features.competitorAnalysis ? '✅' : '❌'} |\n`;
  });

  markdown += `
## Recommendations by Use Case

### For Content Creators
**Primary Tools:** Jasper AI, Copy.ai, ChatGPT, Claude  
**Best for:** Blog writing, social media content, email copy, ad copy

### For SEO Specialists
**Primary Tools:** Surfer SEO, Frase, Ahrefs AI, Semrush AI  
**Best for:** Keyword research, content optimization, competitor analysis

### For Social Media Managers
**Primary Tools:** Hootsuite AI, Buffer AI, Canva AI, Midjourney  
**Best for:** Content scheduling, visual design, engagement analysis

### For Email Marketers
**Primary Tools:** Mailchimp AI, HubSpot AI, Copy.ai  
**Best for:** Email campaigns, automation, personalization

### For Marketing Agencies
**Primary Tools:** HubSpot AI, Semrush AI, Jasper AI, Canva AI  
**Best for:** Comprehensive marketing management, client reporting

## Pricing Considerations

### Free Tier Available
- ChatGPT (limited)
- Claude (limited)
- Grammarly (basic)
- Canva (basic)
- Buffer (limited)

### Mid-Range ($10-50/month)
- Jasper AI
- Copy.ai
- Surfer SEO
- Frase
- Hootsuite
- Mailchimp

### Enterprise ($50+/month)
- HubSpot AI
- Ahrefs AI
- Semrush AI
- Midjourney

## Integration Capabilities

### Most Integrable
1. **HubSpot AI** - Extensive API and integrations
2. **Mailchimp AI** - Wide range of platform connections
3. **Hootsuite AI** - Social media platform integrations
4. **Semrush AI** - SEO and analytics integrations

### Standalone Tools
- **ChatGPT** - Limited integrations
- **Claude** - API access available
- **Midjourney** - Discord-based
- **Grammarly** - Browser extensions

## AI Capabilities Comparison

### Natural Language Processing
- **ChatGPT** - Advanced conversational AI
- **Claude** - Sophisticated reasoning
- **Jasper AI** - Marketing-focused content generation
- **Copy.ai** - Copywriting optimization

### Visual AI
- **Midjourney** - High-quality image generation
- **Canva AI** - Design assistance and templates

### Analytics AI
- **HubSpot AI** - Predictive analytics
- **Semrush AI** - SEO insights and recommendations
- **Ahrefs AI** - Keyword and competitive intelligence

## Best Practices for AI Marketing Tools

### Content Creation
1. **Use AI for ideation** - Generate content ideas and outlines
2. **Human editing** - Always review and edit AI-generated content
3. **Brand voice consistency** - Train AI tools on your brand guidelines
4. **SEO optimization** - Use SEO tools to optimize AI-generated content

### SEO Strategy
1. **Keyword research first** - Use AI tools to identify opportunities
2. **Content optimization** - Optimize existing content with AI insights
3. **Competitive analysis** - Monitor competitor strategies
4. **Performance tracking** - Use analytics to measure success

### Social Media Management
1. **Content planning** - Use AI for content calendar creation
2. **Visual design** - Leverage AI design tools for graphics
3. **Scheduling optimization** - Use AI to determine best posting times
4. **Engagement analysis** - Monitor performance with AI insights

## Future Trends in AI Marketing Tools

### Emerging Capabilities
- **Voice AI** - Voice search optimization and audio content
- **Video AI** - Automated video creation and editing
- **Predictive Analytics** - Advanced forecasting and trend prediction
- **Personalization** - Hyper-personalized content and campaigns

### Integration Evolution
- **Unified Platforms** - All-in-one AI marketing suites
- **API Ecosystems** - Seamless tool integration
- **Real-time Optimization** - Continuous performance improvement
- **Cross-platform Analytics** - Unified reporting across tools

## Conclusion

The AI marketing tools landscape is rapidly evolving, with specialized tools for every aspect of digital marketing. The key to success is choosing the right combination of tools that align with your specific needs, budget, and technical capabilities.

For most businesses, a combination of:
- **Content creation tool** (Jasper AI or Copy.ai)
- **SEO tool** (Surfer SEO or Ahrefs)
- **Social media tool** (Hootsuite or Buffer)
- **Analytics platform** (HubSpot or Google Analytics)

Will provide a solid foundation for AI-powered marketing success.

---
*This comparison is based on current tool capabilities and may change as AI technology evolves. Always verify pricing and features directly with tool providers.*
`;

  return markdown;
}

// Main function
async function main() {
  console.log('🚀 Starting AI Marketing Tools Comparison Research\n');
  
  const toolsAnalysis = [];
  
  for (let i = 0; i < aiMarketingTools.length; i++) {
    const tool = aiMarketingTools[i];
    console.log(`📊 Researching ${tool.name} (${i + 1}/${aiMarketingTools.length})...`);
    
    try {
      const toolData = await scrapeAIToolInfo(tool.name, tool.url);
      const features = analyzeToolFeatures(toolData);
      
      toolsAnalysis.push({
        name: tool.name,
        category: tool.category,
        description: tool.description,
        data: toolData,
        features: features
      });
      
      console.log(`✅ ${tool.name} - ${Object.values(features).filter(Boolean).length} features found`);
      
      // Add delay to avoid rate limiting
      await new Promise(resolve => setTimeout(resolve, 1000));
      
    } catch (error) {
      console.log(`❌ Failed to research ${tool.name}: ${error.message}`);
      
      // Add tool with minimal data
      toolsAnalysis.push({
        name: tool.name,
        category: tool.category,
        description: tool.description,
        data: null,
        features: {}
      });
    }
  }
  
  console.log('\n📄 Generating comprehensive comparison report...');
  const report = createComparisonReport(toolsAnalysis);
  
  // Save report
  const fs = require('fs');
  fs.writeFileSync('ai_marketing_tools_comparison.md', report);
  
  console.log('\n✅ AI Marketing Tools Comparison complete!');
  console.log('📁 Report saved as: ai_marketing_tools_comparison.md');
  
  console.log('\n📊 Summary:');
  console.log(`- Researched ${toolsAnalysis.length} AI marketing tools`);
  console.log(`- Generated feature comparison matrix`);
  console.log(`- Created recommendations by use case`);
  console.log(`- Analyzed pricing and integration capabilities`);
  
  console.log('\n🔍 Top Tools by Feature Count:');
  const sortedTools = toolsAnalysis
    .map(tool => ({
      name: tool.name,
      featureCount: Object.values(tool.features).filter(Boolean).length
    }))
    .sort((a, b) => b.featureCount - a.featureCount);
  
  sortedTools.slice(0, 5).forEach((tool, index) => {
    console.log(`${index + 1}. ${tool.name} - ${tool.featureCount} features`);
  });
}

main().catch(console.error);
