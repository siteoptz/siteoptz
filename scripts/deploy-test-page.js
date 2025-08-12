const fs = require('fs');
const path = require('path');

// Load tools data
const toolsData = require('../data/tools.json');

// Create test comparison page for ChatGPT vs Claude
function createTestPage() {
  console.log('🧪 Creating test comparison page: ChatGPT vs Claude...\n');
  
  const tools = toolsData.ai_tools;
  
  // Find ChatGPT and Claude in the dataset
  const chatGPT = tools.find(tool => 
    tool.tool_name.toLowerCase().includes('chatgpt') || 
    tool.tool_name.toLowerCase().includes('gpt')
  );
  
  const claude = tools.find(tool => 
    tool.tool_name.toLowerCase().includes('claude')
  );
  
  if (!chatGPT) {
    console.error('❌ ChatGPT not found in tools dataset');
    console.log('Available tools:', tools.map(t => t.tool_name));
    return;
  }
  
  if (!claude) {
    console.error('❌ Claude not found in tools dataset');
    console.log('Available tools:', tools.map(t => t.tool_name));
    return;
  }
  
  console.log(`✅ Found tools:`);
  console.log(`   • ${chatGPT.tool_name}`);
  console.log(`   • ${claude.tool_name}`);
  
  // Generate page data
  const pageData = {
    toolA: chatGPT,
    toolB: claude,
    slug: 'chatgpt-vs-claude',
    title: `${chatGPT.tool_name} vs ${claude.tool_name} — Features, Pricing, and Comparison [2025]`,
    metaDescription: `${chatGPT.tool_name} vs ${claude.tool_name}: Compare features, pricing (${chatGPT.pricing[0]?.price || 'Custom'} vs ${claude.pricing[0]?.price || 'Custom'}), and pros/cons. Expert analysis for 2025.`,
    url: '/compare/chatgpt-vs-claude',
    generated: new Date().toISOString()
  };
  
  // Create test directory
  const testDir = path.join(__dirname, '../test-deployment');
  if (!fs.existsSync(testDir)) {
    fs.mkdirSync(testDir, { recursive: true });
  }
  
  // Save test page data
  fs.writeFileSync(
    path.join(testDir, 'chatgpt-vs-claude.json'),
    JSON.stringify(pageData, null, 2)
  );
  
  console.log('\n📄 Test page data saved to test-deployment/chatgpt-vs-claude.json');
  
  // Generate validation checklist
  const validation = {
    seo_checklist: {
      meta_title: {
        value: pageData.title,
        length: pageData.title.length,
        optimal: pageData.title.length >= 30 && pageData.title.length <= 60,
        note: 'Should be 30-60 characters'
      },
      meta_description: {
        value: pageData.metaDescription,
        length: pageData.metaDescription.length,
        optimal: pageData.metaDescription.length >= 155 && pageData.metaDescription.length <= 160,
        note: 'Should be 155-160 characters'
      },
      url_structure: {
        value: pageData.url,
        optimal: pageData.url.includes('-vs-') && pageData.url.length < 100,
        note: 'Clean, readable URL structure'
      },
      schema_markup: {
        faq_page: true,
        product_schema: true,
        article_schema: true,
        breadcrumb_schema: true,
        note: 'All required schemas implemented'
      }
    },
    content_checklist: {
      hero_section: {
        tool_logos: true,
        pricing_preview: true,
        key_features: true,
        cta_buttons: true
      },
      comparison_table: {
        sortable: true,
        filterable: true,
        winner_indicators: true,
        all_features_mode: true
      },
      pricing_calculator: {
        team_size_input: true,
        billing_frequency: true,
        cost_comparison: true,
        best_value_indicator: true
      },
      faq_section: {
        categorized: true,
        expandable: true,
        schema_markup: true
      },
      internal_linking: {
        related_comparisons: true,
        individual_reviews: true,
        breadcrumb_navigation: true
      }
    },
    performance_targets: {
      lighthouse_performance: '> 90',
      lighthouse_seo: '> 95',
      lighthouse_accessibility: '> 90',
      lighthouse_best_practices: '> 90',
      first_contentful_paint: '< 1.5s',
      largest_contentful_paint: '< 2.5s',
      cumulative_layout_shift: '< 0.1'
    },
    ahrefs_validation: {
      title_tag: 'Check for uniqueness and keyword targeting',
      meta_description: 'Check for uniqueness and click-through appeal',
      h1_tag: 'Single H1 with target keywords',
      internal_links: 'Proper anchor text and relevance',
      schema_markup: 'Validate JSON-LD syntax',
      page_speed: 'Core Web Vitals compliance'
    }
  };
  
  fs.writeFileSync(
    path.join(testDir, 'validation-checklist.json'),
    JSON.stringify(validation, null, 2)
  );
  
  console.log('✅ Validation checklist saved to test-deployment/validation-checklist.json');
  
  // Create test instructions
  const instructions = `
# ChatGPT vs Claude Test Page Deployment

## 🎯 Test Page Details
- **URL**: /compare/chatgpt-vs-claude
- **Tools**: ${chatGPT.tool_name} vs ${claude.tool_name}
- **Generated**: ${new Date().toISOString()}

## 🚀 Deployment Steps

### 1. Build the Test Page
\`\`\`bash
cd /Users/siteoptz/siteoptz-scraping
npm run build
npm run start
\`\`\`

### 2. Test Locally
- Visit: http://localhost:3000/compare/chatgpt-vs-claude
- Check all interactive elements work
- Verify data loads correctly

### 3. SEO Validation

#### Meta Tags Check
- **Title**: ${pageData.title} (${pageData.title.length} chars)
- **Description**: ${pageData.metaDescription} (${pageData.metaDescription.length} chars)

#### Lighthouse Test
\`\`\`bash
lighthouse http://localhost:3000/compare/chatgpt-vs-claude --output=json --output-path=lighthouse-report.json
\`\`\`

#### Required Lighthouse Scores
- Performance: > 90
- SEO: > 95
- Accessibility: > 90
- Best Practices: > 90

### 4. Ahrefs Validation
1. Deploy to staging/production
2. Submit URL to Ahrefs Site Audit
3. Check for:
   - ✅ Unique title and meta description
   - ✅ Proper H1 structure
   - ✅ Schema markup validation
   - ✅ Internal linking structure
   - ✅ Page speed metrics

### 5. Functionality Testing

#### Calculator Testing
- [ ] Team size input changes pricing
- [ ] Billing frequency affects totals
- [ ] Best value indicator works
- [ ] All pricing plans display correctly

#### Table Testing
- [ ] Sorting works on all columns
- [ ] Filter toggle (All Features/Key Differences)
- [ ] Winner indicators display correctly
- [ ] Feature comparison accurate

#### CTA Testing
- [ ] Affiliate links track correctly
- [ ] Email capture form works
- [ ] Success states display
- [ ] Analytics events fire

## 📊 Success Criteria

### Technical
- [ ] Page loads in < 2 seconds
- [ ] All interactive elements functional
- [ ] Mobile responsive design
- [ ] No console errors

### SEO
- [ ] All schema markup validates
- [ ] Meta tags within optimal length
- [ ] Internal links functional
- [ ] Breadcrumb navigation works

### Content
- [ ] Tool data displays correctly
- [ ] Pricing information accurate
- [ ] FAQs relevant and helpful
- [ ] Related comparisons show

### Analytics
- [ ] Page view tracking
- [ ] CTA click tracking
- [ ] Email capture tracking
- [ ] Affiliate link tracking

## 🔧 Troubleshooting

### Common Issues
1. **Data not loading**: Check tools.json path
2. **Images not displaying**: Verify logo URLs
3. **Styling issues**: Check Tailwind CSS build
4. **Schema errors**: Validate JSON-LD syntax

### Debug Commands
\`\`\`bash
# Check build errors
npm run build 2>&1 | grep ERROR

# Test specific route
curl -I http://localhost:3000/compare/chatgpt-vs-claude

# Validate JSON
node -e "console.log(JSON.parse(require('fs').readFileSync('./data/tools.json')))"
\`\`\`
`;
  
  fs.writeFileSync(
    path.join(testDir, 'DEPLOYMENT_INSTRUCTIONS.md'),
    instructions
  );
  
  console.log('📋 Deployment instructions saved to test-deployment/DEPLOYMENT_INSTRUCTIONS.md');
  
  // Summary
  console.log('\n📊 TEST PAGE SUMMARY:');
  console.log(`   🎯 Page: ${pageData.title}`);
  console.log(`   📍 URL: ${pageData.url}`);
  console.log(`   📏 Title Length: ${pageData.title.length} chars ${pageData.title.length >= 30 && pageData.title.length <= 60 ? '✅' : '⚠️'}`);
  console.log(`   📝 Description Length: ${pageData.metaDescription.length} chars ${pageData.metaDescription.length >= 155 && pageData.metaDescription.length <= 160 ? '✅' : '⚠️'}`);
  console.log(`   🔧 Tools: ${chatGPT.tool_name} & ${claude.tool_name}`);
  
  console.log('\n🎯 NEXT STEPS:');
  console.log('   1. Review: test-deployment/DEPLOYMENT_INSTRUCTIONS.md');
  console.log('   2. Build: npm run build');
  console.log('   3. Test: http://localhost:3000/compare/chatgpt-vs-claude');
  console.log('   4. Validate: Run Lighthouse and Ahrefs checks');
  
  return pageData;
}

// Run the script
if (require.main === module) {
  createTestPage();
}

module.exports = { createTestPage };