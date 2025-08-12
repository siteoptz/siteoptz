const https = require('https');

// Function to scrape AI tool comparison content
async function scrapeComparisonContent(url) {
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

// AI Tool Comparison Sources to research
const comparisonSources = [
  {
    name: 'G2 AI Marketing Tools',
    url: 'https://www.g2.com/categories/ai-marketing',
    category: 'Review Platform'
  },
  {
    name: 'Capterra AI Marketing',
    url: 'https://www.capterra.com/p/ai-marketing-software/',
    category: 'Review Platform'
  },
  {
    name: 'TrustRadius AI Marketing',
    url: 'https://www.trustradius.com/ai-marketing',
    category: 'Review Platform'
  },
  {
    name: 'Gartner AI Marketing',
    url: 'https://www.gartner.com/en/topics/artificial-intelligence-marketing',
    category: 'Research'
  },
  {
    name: 'Forrester AI Marketing',
    url: 'https://www.forrester.com/topic/artificial-intelligence-marketing',
    category: 'Research'
  },
  {
    name: 'Marketing AI Institute',
    url: 'https://www.marketingaiinstitute.com/',
    category: 'Industry Resource'
  },
  {
    name: 'HubSpot AI Marketing Guide',
    url: 'https://blog.hubspot.com/marketing/ai-marketing',
    category: 'Educational'
  },
  {
    name: 'Neil Patel AI Marketing',
    url: 'https://neilpatel.com/blog/ai-marketing/',
    category: 'Educational'
  },
  {
    name: 'Search Engine Journal AI',
    url: 'https://www.searchenginejournal.com/ai-marketing/',
    category: 'Industry News'
  },
  {
    name: 'Marketing Land AI',
    url: 'https://marketingland.com/topic/artificial-intelligence',
    category: 'Industry News'
  }
];

// AI Tool Categories for Comparison
const aiToolCategories = [
  {
    name: 'Content Creation',
    tools: ['Jasper AI', 'Copy.ai', 'ChatGPT', 'Claude', 'Writesonic', 'Rytr', 'Anyword'],
    comparisonPoints: ['content quality', 'templates', 'brand voice', 'pricing', 'integrations']
  },
  {
    name: 'SEO & Optimization',
    tools: ['Surfer SEO', 'Frase', 'Ahrefs AI', 'Semrush AI', 'Clearscope', 'MarketMuse', 'WordLift'],
    comparisonPoints: ['keyword research', 'content optimization', 'rank tracking', 'competitor analysis', 'technical SEO']
  },
  {
    name: 'Social Media',
    tools: ['Hootsuite AI', 'Buffer AI', 'Later AI', 'Canva AI', 'Loomly', 'Agorapulse', 'Sprout Social'],
    comparisonPoints: ['scheduling', 'content creation', 'analytics', 'engagement', 'automation']
  },
  {
    name: 'Email Marketing',
    tools: ['Mailchimp AI', 'HubSpot AI', 'ConvertKit', 'ActiveCampaign', 'Drip', 'Klaviyo', 'Brevo'],
    comparisonPoints: ['automation', 'personalization', 'deliverability', 'analytics', 'templates']
  },
  {
    name: 'Analytics & Reporting',
    tools: ['Google Analytics AI', 'Mixpanel', 'Amplitude', 'Hotjar', 'Crazy Egg', 'FullStory', 'Lucky Orange'],
    comparisonPoints: ['data accuracy', 'insights', 'visualization', 'real-time tracking', 'predictive analytics']
  },
  {
    name: 'Visual Content',
    tools: ['Midjourney', 'DALL-E', 'Stable Diffusion', 'Canva AI', 'Adobe Firefly', 'Runway ML', 'Leonardo AI'],
    comparisonPoints: ['image quality', 'customization', 'speed', 'cost', 'commercial usage']
  },
  {
    name: 'Marketing Automation',
    tools: ['HubSpot AI', 'Marketo', 'Pardot', 'ActiveCampaign', 'Klaviyo', 'Drip', 'ConvertKit'],
    comparisonPoints: ['workflow complexity', 'lead scoring', 'CRM integration', 'reporting', 'scalability']
  },
  {
    name: 'Chatbots & Conversational AI',
    tools: ['Intercom', 'Drift', 'Chatfuel', 'ManyChat', 'MobileMonkey', 'Landbot', 'Tidio'],
    comparisonPoints: ['conversation quality', 'integration', 'customization', 'analytics', 'pricing']
  }
];

// Function to extract comparison data from content
function extractComparisonData(content) {
  const comparisons = [];
  
  // Look for comparison patterns in content
  const comparisonPatterns = [
    /(\w+)\s+vs\s+(\w+)/gi,
    /(\w+)\s+versus\s+(\w+)/gi,
    /(\w+)\s+compared\s+to\s+(\w+)/gi,
    /(\w+)\s+alternative\s+to\s+(\w+)/gi,
    /best\s+(\w+)\s+for\s+(\w+)/gi,
    /top\s+(\w+)\s+tools/gi
  ];
  
  comparisonPatterns.forEach(pattern => {
    const matches = content.match(pattern);
    if (matches) {
      matches.forEach(match => {
        comparisons.push(match);
      });
    }
  });
  
  return comparisons;
}

// Function to create programmatic content templates
function createProgrammaticContentTemplates(comparisonData, toolCategories) {
  const contentTemplates = {
    comparisonArticles: [],
    toolReviews: [],
    comparisonTables: [],
    decisionGuides: [],
    caseStudies: [],
    tutorials: []
  };

  // Generate comparison article templates
  toolCategories.forEach(category => {
    if (category.tools.length >= 2) {
      // Head-to-head comparisons
      for (let i = 0; i < category.tools.length - 1; i++) {
        for (let j = i + 1; j < category.tools.length; j++) {
          const template = {
            title: `${category.tools[i]} vs ${category.tools[j]}: Complete Comparison [2025]`,
            category: category.name,
            tools: [category.tools[i], category.tools[j]],
            structure: [
              'Introduction and overview',
              'Feature comparison table',
              'Pricing comparison',
              'Pros and cons of each tool',
              'Use case recommendations',
              'Final verdict and recommendation'
            ],
            seoKeywords: [
              `${category.tools[i]} vs ${category.tools[j]}`,
              `${category.tools[i]} alternative`,
              `${category.tools[j]} alternative`,
              `best ${category.name.toLowerCase()} tool`,
              `${category.name.toLowerCase()} comparison`
            ]
          };
          contentTemplates.comparisonArticles.push(template);
        }
      }

      // Multi-tool comparisons
      const template = {
        title: `Best ${category.name} Tools in 2025: Complete Comparison Guide`,
        category: category.name,
        tools: category.tools,
        structure: [
          'Introduction to AI in ' + category.name,
          'Comparison criteria and methodology',
          'Detailed tool reviews',
          'Comparison table',
          'Pricing analysis',
          'Use case recommendations',
          'Final recommendations'
        ],
        seoKeywords: [
          `best ${category.name.toLowerCase()} tools`,
          `${category.name.toLowerCase()} comparison`,
          `top ${category.name.toLowerCase()} software`,
          `ai ${category.name.toLowerCase()} tools`,
          `${category.name.toLowerCase()} review`
        ]
      };
      contentTemplates.comparisonArticles.push(template);
    }
  });

  // Generate tool review templates
  toolCategories.forEach(category => {
    category.tools.forEach(tool => {
      const template = {
        title: `${tool} Review: Complete Guide [2025]`,
        category: category.name,
        tool: tool,
        structure: [
          'Tool overview and features',
          'Key capabilities and benefits',
          'Pricing and plans',
          'Pros and cons',
          'User reviews and ratings',
          'Integration options',
          'Use cases and examples',
          'Final verdict'
        ],
        seoKeywords: [
          `${tool} review`,
          `${tool} pricing`,
          `${tool} features`,
          `${tool} alternatives`,
          `is ${tool} worth it`
        ]
      };
      contentTemplates.toolReviews.push(template);
    });
  });

  // Generate comparison table templates
  toolCategories.forEach(category => {
    const template = {
      title: `${category.name} Tools Comparison Table [2025]`,
      category: category.name,
      tools: category.tools,
      comparisonPoints: category.comparisonPoints,
      structure: [
        'Comparison criteria',
        'Detailed comparison table',
        'Key findings and insights',
        'Recommendations by use case'
      ]
    };
    contentTemplates.comparisonTables.push(template);
  });

  // Generate decision guide templates
  toolCategories.forEach(category => {
    const template = {
      title: `How to Choose the Best ${category.name} Tool: Decision Guide [2025]`,
      category: category.name,
      structure: [
        'Understanding your needs',
        'Key factors to consider',
        'Comparison of top tools',
        'Decision framework',
        'Implementation tips'
      ],
      seoKeywords: [
        `how to choose ${category.name.toLowerCase()} tool`,
        `${category.name.toLowerCase()} tool selection`,
        `best ${category.name.toLowerCase()} for business`,
        `${category.name.toLowerCase()} buying guide`
      ]
    };
    contentTemplates.decisionGuides.push(template);
  });

  return contentTemplates;
}

// Function to create markdown report
function createComparisonResearchReport(comparisonData, contentTemplates, scrapedContent) {
  let markdown = `# AI Tool Comparison Research for Programmatic Content

## Executive Summary
*Generated on: ${new Date().toLocaleString()}*

This report provides comprehensive research on AI tool comparisons for marketing, enabling the creation of programmatic content that drives traffic and conversions.

## Research Sources Analyzed

`;

  scrapedContent.forEach((source, index) => {
    markdown += `### ${index + 1}. ${source.name}
**Category:** ${source.category}  
**URL:** ${source.url}  
**Status:** ${source.data ? 'Successfully scraped' : 'Failed to scrape'}

${source.data ? `**Key Insights:** ${source.data.data?.markdown?.substring(0, 200)}...` : 'Content not available'}

---
`;
  });

  markdown += `## AI Tool Categories for Comparison

`;

  aiToolCategories.forEach(category => {
    markdown += `### ${category.name}
**Tools:** ${category.tools.join(', ')}  
**Comparison Points:** ${category.comparisonPoints.join(', ')}

`;
  });

  markdown += `## Programmatic Content Templates

### Comparison Articles (${contentTemplates.comparisonArticles.length} templates)

`;

  contentTemplates.comparisonArticles.slice(0, 10).forEach((template, index) => {
    markdown += `#### ${index + 1}. ${template.title}
**Category:** ${template.category}  
**Tools:** ${template.tools.join(' vs ')}  
**SEO Keywords:** ${template.seoKeywords.join(', ')}

**Structure:**
${template.structure.map((item, i) => `${i + 1}. ${item}`).join('\n')}

`;
  });

  markdown += `### Tool Reviews (${contentTemplates.toolReviews.length} templates)

`;

  contentTemplates.toolReviews.slice(0, 10).forEach((template, index) => {
    markdown += `#### ${index + 1}. ${template.title}
**Category:** ${template.category}  
**Tool:** ${template.tool}  
**SEO Keywords:** ${template.seoKeywords.join(', ')}

**Structure:**
${template.structure.map((item, i) => `${i + 1}. ${item}`).join('\n')}

`;
  });

  markdown += `### Comparison Tables (${contentTemplates.comparisonTables.length} templates)

`;

  contentTemplates.comparisonTables.forEach((template, index) => {
    markdown += `#### ${index + 1}. ${template.title}
**Category:** ${template.category}  
**Tools:** ${template.tools.join(', ')}  
**Comparison Points:** ${template.comparisonPoints.join(', ')}

`;
  });

  markdown += `### Decision Guides (${contentTemplates.decisionGuides.length} templates)

`;

  contentTemplates.decisionGuides.forEach((template, index) => {
    markdown += `#### ${index + 1}. ${template.title}
**Category:** ${template.category}  
**SEO Keywords:** ${template.seoKeywords.join(', ')}

**Structure:**
${template.structure.map((item, i) => `${i + 1}. ${item}`).join('\n')}

`;
  });

  markdown += `## Content Strategy Recommendations

### High-Priority Content Types
1. **Head-to-Head Comparisons** - Generate the most traffic and engagement
2. **Tool Reviews** - Build authority and trust
3. **Comparison Tables** - Great for quick reference and social sharing
4. **Decision Guides** - Help with conversion and lead generation

### SEO Strategy
- Target long-tail keywords with tool names
- Focus on comparison and review keywords
- Include pricing and alternative keywords
- Use year-specific keywords (2025)

### Content Calendar Suggestions
- **Weekly:** 1-2 comparison articles
- **Bi-weekly:** 1 comprehensive tool review
- **Monthly:** 1 decision guide
- **Quarterly:** Update existing comparisons

## Implementation Framework

### Phase 1: Foundation Content (Months 1-3)
- Create comprehensive tool reviews for top tools in each category
- Develop comparison tables for all categories
- Build decision guides for high-value categories

### Phase 2: Comparison Content (Months 4-6)
- Generate head-to-head comparisons for popular tool combinations
- Create "vs" content for trending tools
- Develop alternative guides for expensive tools

### Phase 3: Advanced Content (Months 7-12)
- Create industry-specific comparisons
- Develop case studies and success stories
- Build comprehensive buying guides

## Technical Implementation

### Content Automation
- Use AI tools to generate initial content drafts
- Create templates for consistent structure
- Automate comparison table generation
- Use data APIs for pricing and feature updates

### SEO Optimization
- Implement schema markup for comparison pages
- Create internal linking between related comparisons
- Optimize for featured snippets
- Build topic clusters around tool categories

### Performance Tracking
- Monitor traffic to comparison pages
- Track conversion rates from comparison content
- Measure engagement metrics
- Analyze competitor comparison content

## Competitive Analysis

### Top Comparison Content Types
1. **"X vs Y" articles** - Most searched and shared
2. **"Best X tools" lists** - High traffic potential
3. **"X alternatives" guides** - Great for capturing competitor traffic
4. **"X pricing" pages** - High commercial intent

### Content Gaps to Fill
- Industry-specific comparisons
- Integration-focused content
- ROI and case study content
- Technical implementation guides

## Revenue Opportunities

### Affiliate Marketing
- Partner with tool providers for affiliate programs
- Create comparison pages with affiliate links
- Develop tool-specific landing pages
- Build email lists through comparison content

### Lead Generation
- Create gated comparison reports
- Offer personalized tool recommendations
- Develop consultation services
- Build tool implementation services

### Content Monetization
- Sponsored comparison content
- Tool provider partnerships
- Premium comparison reports
- Consulting and advisory services

---
*This research provides a comprehensive framework for creating programmatic AI tool comparison content that drives traffic, engagement, and conversions.*
`;

  return markdown;
}

// Main function
async function main() {
  console.log('🚀 Starting AI Tool Comparison Research for Programmatic Content\n');
  
  const scrapedContent = [];
  
  // Scrape comparison sources
  for (let i = 0; i < comparisonSources.length; i++) {
    const source = comparisonSources[i];
    console.log(`📊 Researching ${source.name} (${i + 1}/${comparisonSources.length})...`);
    
    try {
      const data = await scrapeComparisonContent(source.url);
      scrapedContent.push({
        name: source.name,
        category: source.category,
        url: source.url,
        data: data
      });
      console.log(`✅ ${source.name} - Successfully scraped`);
      
      // Add delay to avoid rate limiting
      await new Promise(resolve => setTimeout(resolve, 1000));
      
    } catch (error) {
      console.log(`❌ Failed to scrape ${source.name}: ${error.message}`);
      scrapedContent.push({
        name: source.name,
        category: source.category,
        url: source.url,
        data: null
      });
    }
  }
  
  console.log('\n📄 Creating programmatic content templates...');
  const contentTemplates = createProgrammaticContentTemplates([], aiToolCategories);
  
  console.log('\n📊 Generating comprehensive report...');
  const report = createComparisonResearchReport([], contentTemplates, scrapedContent);
  
  // Save report
  const fs = require('fs');
  fs.writeFileSync('ai_tool_comparison_research.md', report);
  
  console.log('\n✅ AI Tool Comparison Research complete!');
  console.log('📁 Report saved as: ai_tool_comparison_research.md');
  
  console.log('\n📊 Summary:');
  console.log(`- Researched ${comparisonSources.length} comparison sources`);
  console.log(`- Created ${contentTemplates.comparisonArticles.length} comparison article templates`);
  console.log(`- Generated ${contentTemplates.toolReviews.length} tool review templates`);
  console.log(`- Built ${contentTemplates.comparisonTables.length} comparison table templates`);
  console.log(`- Developed ${contentTemplates.decisionGuides.length} decision guide templates`);
  
  console.log('\n🎯 Top Content Opportunities:');
  console.log('1. Head-to-head tool comparisons');
  console.log('2. Comprehensive tool reviews');
  console.log('3. Category comparison guides');
  console.log('4. Decision-making frameworks');
  console.log('5. Industry-specific comparisons');
  
  console.log('\n📈 Content Generation Capacity:');
  const totalTemplates = Object.values(contentTemplates).reduce((sum, arr) => sum + arr.length, 0);
  console.log(`Total templates available: ${totalTemplates}`);
  console.log('Estimated content pieces: 500+ unique articles');
}

main().catch(console.error);
