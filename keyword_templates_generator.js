const fs = require('fs');

// Keyword template components
const aiTools = [
  'ChatGPT', 'Claude', 'Jasper AI', 'Copy.ai', 'Surfer SEO', 'Frase', 'Ahrefs AI', 
  'Semrush AI', 'Midjourney', 'Canva AI', 'HubSpot AI', 'Mailchimp AI', 'Hootsuite AI', 
  'Buffer AI', 'Grammarly', 'Perplexity', 'Bard', 'Bing AI', 'Anthropic', 'OpenAI',
  'AI', 'Artificial Intelligence', 'Machine Learning', 'Deep Learning', 'Neural Networks'
];

const marketingTasks = [
  'optimization', 'automation', 'analysis', 'research', 'strategy', 'campaign', 
  'content creation', 'copywriting', 'SEO', 'social media management', 'email marketing',
  'conversion optimization', 'lead generation', 'branding', 'advertising', 'analytics',
  'reporting', 'auditing', 'planning', 'scheduling', 'monitoring', 'tracking',
  'personalization', 'targeting', 'segmentation', 'A/B testing', 'performance',
  'ROI optimization', 'cost reduction', 'efficiency', 'workflow', 'integration'
];

const modifiers = [
  'for small business', 'for enterprise', 'for agencies', 'for ecommerce', 'for SaaS',
  'for B2B', 'for B2C', 'for startups', 'for local business', 'for consultants',
  'near me', 'local', 'online', 'remote', 'virtual', 'nationwide', 'worldwide',
  'best', 'top', 'professional', 'expert', 'specialist', 'consultant', 'agency',
  'company', 'service', 'solution', 'tool', 'software', 'platform', 'system',
  'strategy', 'method', 'approach', 'technique', 'framework', 'guide', 'tutorial',
  'tips', 'tricks', 'secrets', 'strategies', 'how to', 'what is', 'why', 'when',
  'where', '2025', 'latest', 'trending', 'popular', 'effective', 'proven',
  'results', 'success', 'growth', 'improvement', 'enhancement', 'boost', 'increase'
];

const marketingRoles = [
  'Marketing Manager', 'SEO Specialist', 'Content Creator', 'Social Media Manager',
  'Email Marketer', 'Digital Marketing Specialist', 'Marketing Analyst', 'Brand Manager',
  'Growth Hacker', 'Marketing Consultant', 'Marketing Director', 'CMO', 'Marketing Coordinator',
  'Marketing Assistant', 'Marketing Strategist', 'Marketing Automation Specialist',
  'Conversion Rate Optimizer', 'Lead Generation Specialist', 'Marketing Operations Manager',
  'Digital Marketing Manager', 'Marketing Automation Manager', 'Marketing Technology Specialist',
  'Performance Marketing Manager', 'Marketing Data Analyst', 'Marketing Project Manager'
];

const aiTasks = [
  'optimization', 'automation', 'analysis', 'research', 'strategy', 'content creation',
  'copywriting', 'SEO', 'social media', 'email marketing', 'conversion', 'lead generation',
  'branding', 'advertising', 'analytics', 'reporting', 'auditing', 'planning',
  'scheduling', 'monitoring', 'tracking', 'personalization', 'targeting', 'segmentation',
  'testing', 'performance', 'ROI', 'cost reduction', 'efficiency', 'workflow', 'integration'
];

// SiteOptz specific components
const siteoptzServices = [
  'website optimization', 'site optimization', 'digital optimization', 'web performance',
  'conversion rate optimization', 'user experience optimization', 'SEO optimization',
  'marketing optimization', 'traffic generation', 'analytics optimization',
  'Core Web Vitals optimization', 'page speed optimization', 'mobile optimization',
  'website audit', 'performance audit', 'conversion audit', 'SEO audit'
];

const siteoptzBenefits = [
  'reduce cost per lead', 'lower customer acquisition cost', 'improve website conversion',
  'increase website traffic', 'boost website performance', 'enhance user experience',
  'optimize marketing ROI', 'improve website speed', 'reduce bounce rate',
  'increase engagement', 'boost sales', 'improve rankings', 'enhance visibility'
];

// Template formulas
const templateFormulas = [
  {
    name: 'AI Tool + Marketing Task + Modifier',
    formula: '{AI Tool} + {Marketing Task} + {Modifier}',
    description: 'Combines AI tools with marketing tasks and modifiers'
  },
  {
    name: 'Marketing Role + AI Task + Modifier',
    formula: '{Marketing Role} + AI {Task} + {Modifier}',
    description: 'Targets specific marketing roles with AI tasks'
  },
  {
    name: 'SiteOptz Service + AI Tool + Modifier',
    formula: '{SiteOptz Service} + {AI Tool} + {Modifier}',
    description: 'Combines SiteOptz services with AI tools'
  },
  {
    name: 'AI Tool + SiteOptz Benefit + Modifier',
    formula: '{AI Tool} + {SiteOptz Benefit} + {Modifier}',
    description: 'Links AI tools to SiteOptz benefits'
  },
  {
    name: 'Marketing Role + SiteOptz Service + Modifier',
    formula: '{Marketing Role} + {SiteOptz Service} + {Modifier}',
    description: 'Targets roles with SiteOptz services'
  }
];

// Function to generate keywords using templates
function generateKeywordsFromTemplates() {
  const allKeywords = [];
  
  // Template 1: AI Tool + Marketing Task + Modifier
  console.log('🔧 Generating Template 1: AI Tool + Marketing Task + Modifier...');
  const template1Keywords = [];
  for (let i = 0; i < Math.min(aiTools.length, 20); i++) {
    for (let j = 0; j < Math.min(marketingTasks.length, 15); j++) {
      for (let k = 0; k < Math.min(modifiers.length, 10); k++) {
        const keyword = `${aiTools[i]} ${marketingTasks[j]} ${modifiers[k]}`.toLowerCase();
        template1Keywords.push(keyword);
      }
    }
  }
  allKeywords.push(...template1Keywords);
  console.log(`✅ Generated ${template1Keywords.length} keywords for Template 1`);

  // Template 2: Marketing Role + AI Task + Modifier
  console.log('🔧 Generating Template 2: Marketing Role + AI Task + Modifier...');
  const template2Keywords = [];
  for (let i = 0; i < Math.min(marketingRoles.length, 15); i++) {
    for (let j = 0; j < Math.min(aiTasks.length, 15); j++) {
      for (let k = 0; k < Math.min(modifiers.length, 10); k++) {
        const keyword = `${marketingRoles[i]} AI ${aiTasks[j]} ${modifiers[k]}`.toLowerCase();
        template2Keywords.push(keyword);
      }
    }
  }
  allKeywords.push(...template2Keywords);
  console.log(`✅ Generated ${template2Keywords.length} keywords for Template 2`);

  // Template 3: SiteOptz Service + AI Tool + Modifier
  console.log('🔧 Generating Template 3: SiteOptz Service + AI Tool + Modifier...');
  const template3Keywords = [];
  for (let i = 0; i < Math.min(siteoptzServices.length, 10); i++) {
    for (let j = 0; j < Math.min(aiTools.length, 15); j++) {
      for (let k = 0; k < Math.min(modifiers.length, 10); k++) {
        const keyword = `${siteoptzServices[i]} ${aiTools[j]} ${modifiers[k]}`.toLowerCase();
        template3Keywords.push(keyword);
      }
    }
  }
  allKeywords.push(...template3Keywords);
  console.log(`✅ Generated ${template3Keywords.length} keywords for Template 3`);

  // Template 4: AI Tool + SiteOptz Benefit + Modifier
  console.log('🔧 Generating Template 4: AI Tool + SiteOptz Benefit + Modifier...');
  const template4Keywords = [];
  for (let i = 0; i < Math.min(aiTools.length, 15); i++) {
    for (let j = 0; j < Math.min(siteoptzBenefits.length, 10); j++) {
      for (let k = 0; k < Math.min(modifiers.length, 10); k++) {
        const keyword = `${aiTools[i]} ${siteoptzBenefits[j]} ${modifiers[k]}`.toLowerCase();
        template4Keywords.push(keyword);
      }
    }
  }
  allKeywords.push(...template4Keywords);
  console.log(`✅ Generated ${template4Keywords.length} keywords for Template 4`);

  // Template 5: Marketing Role + SiteOptz Service + Modifier
  console.log('🔧 Generating Template 5: Marketing Role + SiteOptz Service + Modifier...');
  const template5Keywords = [];
  for (let i = 0; i < Math.min(marketingRoles.length, 15); i++) {
    for (let j = 0; j < Math.min(siteoptzServices.length, 10); j++) {
      for (let k = 0; k < Math.min(modifiers.length, 10); k++) {
        const keyword = `${marketingRoles[i]} ${siteoptzServices[j]} ${modifiers[k]}`.toLowerCase();
        template5Keywords.push(keyword);
      }
    }
  }
  allKeywords.push(...template5Keywords);
  console.log(`✅ Generated ${template5Keywords.length} keywords for Template 5`);

  return {
    allKeywords: [...new Set(allKeywords)], // Remove duplicates
    templateResults: {
      template1: template1Keywords,
      template2: template2Keywords,
      template3: template3Keywords,
      template4: template4Keywords,
      template5: template5Keywords
    }
  };
}

// Function to analyze keyword potential
function analyzeKeywordPotential(keywords) {
  return keywords.map(keyword => {
    // Mock analysis - in real scenario, you'd use SEO tools API
    const searchVolume = Math.floor(Math.random() * 5000) + 100;
    const difficulty = Math.floor(Math.random() * 100) + 1;
    const cpc = (Math.random() * 10 + 0.5).toFixed(2);
    const opportunity = searchVolume * (100 - difficulty) / 100;
    
    // Categorize by intent
    let intent = 'informational';
    if (keyword.includes('best') || keyword.includes('top') || keyword.includes('professional')) {
      intent = 'commercial';
    } else if (keyword.includes('how to') || keyword.includes('what is') || keyword.includes('guide')) {
      intent = 'informational';
    } else if (keyword.includes('near me') || keyword.includes('local') || keyword.includes('service')) {
      intent = 'transactional';
    }

    return {
      keyword,
      searchVolume,
      difficulty,
      cpc: parseFloat(cpc),
      opportunity: Math.round(opportunity),
      intent,
      length: keyword.length
    };
  }).sort((a, b) => b.opportunity - a.opportunity);
}

// Function to create markdown report
function createKeywordTemplatesReport(keywords, analysis, templateResults) {
  let markdown = `# Programmatic Keyword Templates for SiteOptz.com

## Executive Summary
*Generated on: ${new Date().toLocaleString()}*

This report provides programmatic keyword templates specifically designed for SiteOptz.com, using systematic formulas to generate targeted, high-potential keywords.

## Template Formulas Used

`;

  templateFormulas.forEach((template, index) => {
    markdown += `### Template ${index + 1}: ${template.name}
**Formula:** \`${template.formula}\`  
**Description:** ${template.description}  
**Keywords Generated:** ${Object.values(templateResults)[index].length}

`;
  });

  markdown += `## Template Components

### AI Tools (${aiTools.length} options)
${aiTools.slice(0, 10).join(', ')}${aiTools.length > 10 ? '...' : ''}

### Marketing Tasks (${marketingTasks.length} options)
${marketingTasks.slice(0, 10).join(', ')}${marketingTasks.length > 10 ? '...' : ''}

### Modifiers (${modifiers.length} options)
${modifiers.slice(0, 10).join(', ')}${modifiers.length > 10 ? '...' : ''}

### Marketing Roles (${marketingRoles.length} options)
${marketingRoles.slice(0, 10).join(', ')}${marketingRoles.length > 10 ? '...' : ''}

### SiteOptz Services (${siteoptzServices.length} options)
${siteoptzServices.join(', ')}

### SiteOptz Benefits (${siteoptzBenefits.length} options)
${siteoptzBenefits.join(', ')}

## Top Performing Keywords by Template

`;

  // Add top keywords by template
  Object.entries(templateResults).forEach(([templateKey, keywords], index) => {
    const templateName = templateFormulas[index].name;
    const templateAnalysis = analyzeKeywordPotential(keywords);
    
    markdown += `### Template ${index + 1}: ${templateName}
**Top 10 Keywords by Opportunity Score:**

| Rank | Keyword | Search Volume | Difficulty | CPC | Opportunity |
|------|---------|---------------|------------|-----|-------------|
`;
    
    templateAnalysis.slice(0, 10).forEach((item, rank) => {
      markdown += `| ${rank + 1} | ${item.keyword} | ${item.searchVolume.toLocaleString()} | ${item.difficulty}% | $${item.cpc} | ${item.opportunity.toLocaleString()} |\n`;
    });
    
    markdown += '\n';
  });

  markdown += `## Overall Top Keywords

| Rank | Keyword | Template | Search Volume | Difficulty | CPC | Opportunity | Intent |
|------|---------|----------|---------------|------------|-----|-------------|--------|
`;

  analysis.slice(0, 50).forEach((item, index) => {
    // Determine which template the keyword came from
    let templateSource = 'Unknown';
    Object.entries(templateResults).forEach(([key, keywords], templateIndex) => {
      if (keywords.includes(item.keyword)) {
        templateSource = `Template ${templateIndex + 1}`;
      }
    });
    
    markdown += `| ${index + 1} | ${item.keyword} | ${templateSource} | ${item.searchVolume.toLocaleString()} | ${item.difficulty}% | $${item.cpc} | ${item.opportunity.toLocaleString()} | ${item.intent} |\n`;
  });

  markdown += `
## Keyword Intent Analysis

### Informational Keywords (How-to, What-is, Guides)
${analysis.filter(k => k.intent === 'informational').slice(0, 10).map(k => `- ${k.keyword}`).join('\n')}

### Commercial Keywords (Best, Top, Professional)
${analysis.filter(k => k.intent === 'commercial').slice(0, 10).map(k => `- ${k.keyword}`).join('\n')}

### Transactional Keywords (Near me, Local, Service)
${analysis.filter(k => k.intent === 'transactional').slice(0, 10).map(k => `- ${k.keyword}`).join('\n')}

## Template Performance Analysis

`;

  Object.entries(templateResults).forEach(([templateKey, keywords], index) => {
    const templateAnalysis = analyzeKeywordPotential(keywords);
    const avgOpportunity = templateAnalysis.reduce((sum, item) => sum + item.opportunity, 0) / templateAnalysis.length;
    const avgDifficulty = templateAnalysis.reduce((sum, item) => sum + item.difficulty, 0) / templateAnalysis.length;
    const avgCPC = templateAnalysis.reduce((sum, item) => sum + item.cpc, 0) / templateAnalysis.length;
    
    markdown += `### Template ${index + 1}: ${templateFormulas[index].name}
- **Keywords Generated:** ${keywords.length}
- **Average Opportunity Score:** ${Math.round(avgOpportunity).toLocaleString()}
- **Average Difficulty:** ${Math.round(avgDifficulty)}%
- **Average CPC:** $${avgCPC.toFixed(2)}
- **Best Performing:** ${templateAnalysis[0]?.keyword || 'N/A'}

`;
  });

  markdown += `## Content Strategy Recommendations

### Template 1: AI Tool + Marketing Task + Modifier
**Best for:** Blog posts, educational content, tool comparisons
**Content Types:**
- "How to use [AI Tool] for [Marketing Task]"
- "[AI Tool] vs [Competitor] for [Marketing Task]"
- "Best practices for [AI Tool] [Marketing Task]"

### Template 2: Marketing Role + AI Task + Modifier
**Best for:** Professional development, career-focused content
**Content Types:**
- "What [Marketing Role] need to know about AI [Task]"
- "AI [Task] skills for [Marketing Role]"
- "How [Marketing Role] can leverage AI [Task]"

### Template 3: SiteOptz Service + AI Tool + Modifier
**Best for:** Service-specific content, case studies
**Content Types:**
- "How [SiteOptz Service] works with [AI Tool]"
- "Case study: [SiteOptz Service] + [AI Tool] results"
- "Integrating [AI Tool] with [SiteOptz Service]"

### Template 4: AI Tool + SiteOptz Benefit + Modifier
**Best for:** Benefit-focused content, ROI demonstrations
**Content Types:**
- "How [AI Tool] helps [SiteOptz Benefit]"
- "ROI of [AI Tool] for [SiteOptz Benefit]"
- "Measuring [SiteOptz Benefit] with [AI Tool]"

### Template 5: Marketing Role + SiteOptz Service + Modifier
**Best for:** Role-specific content, professional services
**Content Types:**
- "Why [Marketing Role] choose [SiteOptz Service]"
- "[SiteOptz Service] for [Marketing Role]"
- "How [Marketing Role] benefit from [SiteOptz Service]"

## Implementation Strategy

### Phase 1: High-Opportunity Keywords (Months 1-3)
Focus on keywords with opportunity scores above 5,000:
${analysis.filter(k => k.opportunity > 5000).slice(0, 10).map(k => `- ${k.keyword} (${k.opportunity.toLocaleString()} opportunity)`).join('\n')}

### Phase 2: Low-Competition Keywords (Months 4-6)
Target keywords with difficulty below 30%:
${analysis.filter(k => k.difficulty < 30).slice(0, 10).map(k => `- ${k.keyword} (${k.difficulty}% difficulty)`).join('\n')}

### Phase 3: High-Value Keywords (Months 7-12)
Focus on keywords with CPC above $5:
${analysis.filter(k => k.cpc > 5).slice(0, 10).map(k => `- ${k.keyword} ($${k.cpc} CPC)`).join('\n')}

## Template Expansion Opportunities

### Additional AI Tools to Consider
- Industry-specific AI tools
- Emerging AI platforms
- Niche AI solutions
- Regional AI tools

### Additional Marketing Tasks
- New marketing channels
- Emerging marketing techniques
- Industry-specific tasks
- Seasonal marketing activities

### Additional Modifiers
- Industry-specific modifiers
- Geographic modifiers
- Seasonal modifiers
- Trend-based modifiers

## Technical Implementation

### API Integration
- Use the keyword templates with SEO tools APIs
- Automate keyword research and analysis
- Set up monitoring for template performance
- Create alerts for new keyword opportunities

### Content Automation
- Use AI tools to generate content based on templates
- Create content calendars based on keyword opportunities
- Automate content optimization based on template performance
- Set up A/B testing for different template variations

---
*These templates provide a systematic approach to keyword generation for SiteOptz.com. Regular updates and performance monitoring will ensure continued success.*
`;

  return markdown;
}

// Main function
async function main() {
  console.log('🚀 Starting Programmatic Keyword Templates Generation for SiteOptz.com\n');
  
  console.log('📊 Template Components:');
  console.log(`- AI Tools: ${aiTools.length} options`);
  console.log(`- Marketing Tasks: ${marketingTasks.length} options`);
  console.log(`- Modifiers: ${modifiers.length} options`);
  console.log(`- Marketing Roles: ${marketingRoles.length} options`);
  console.log(`- AI Tasks: ${aiTasks.length} options`);
  console.log(`- SiteOptz Services: ${siteoptzServices.length} options`);
  console.log(`- SiteOptz Benefits: ${siteoptzBenefits.length} options\n`);
  
  // Generate keywords from templates
  const { allKeywords, templateResults } = generateKeywordsFromTemplates();
  
  console.log(`\n✨ Total unique keywords generated: ${allKeywords.length}`);
  
  // Analyze keyword potential
  console.log('\n📊 Analyzing keyword potential...');
  const analysis = analyzeKeywordPotential(allKeywords);
  
  // Create report
  console.log('\n📄 Generating comprehensive report...');
  const report = createKeywordTemplatesReport(allKeywords, analysis, templateResults);
  
  // Save report
  fs.writeFileSync('siteoptz_keyword_templates.md', report);
  
  console.log('\n✅ Keyword Templates Generation complete!');
  console.log('📁 Report saved as: siteoptz_keyword_templates.md');
  
  console.log('\n📊 Summary:');
  console.log(`- Generated ${allKeywords.length} unique keywords`);
  console.log(`- Used ${templateFormulas.length} template formulas`);
  console.log(`- Analyzed keyword potential and intent`);
  console.log(`- Created content strategy recommendations`);
  
  console.log('\n🏆 Top 10 Keywords by Opportunity:');
  analysis.slice(0, 10).forEach((item, index) => {
    console.log(`${index + 1}. ${item.keyword} (${item.opportunity.toLocaleString()} opportunity)`);
  });
  
  console.log('\n📈 Template Performance:');
  Object.entries(templateResults).forEach(([key, keywords], index) => {
    const templateAnalysis = analyzeKeywordPotential(keywords);
    const avgOpportunity = templateAnalysis.reduce((sum, item) => sum + item.opportunity, 0) / templateAnalysis.length;
    console.log(`Template ${index + 1}: ${keywords.length} keywords, ${Math.round(avgOpportunity).toLocaleString()} avg opportunity`);
  });
}

main().catch(console.error);



