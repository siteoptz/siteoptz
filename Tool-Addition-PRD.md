# Tool Addition PRD - Automated AI Tool Addition Workflow for SiteOptz.ai

## Overview
This PRD documents the automated system for adding new AI tools to SiteOptz.ai. The system enables scalable, consistent, and SEO-optimized tool additions with built-in quality control and duplicate detection.

## Quick Reference Commands

### Add Single Tool Quickly
```bash
# 1. Create your tool data
echo '[{"name": "Tool Name", "description": "Tool description here", "website": "https://tool-website.com", "developer": "Company Name"}]' > new-tool.json

# 2. Test addition (dry-run)
node automation/automated-tool-addition.js --source json --file new-tool.json --dry-run

# 3. Add tool if dry-run successful
node automation/automated-tool-addition.js --source json --file new-tool.json

# 4. Generate missing logos and fix duplicate content
node scripts/automatic-logo-generator.js
node scripts/fix-duplicate-content-reviews.js

# 5. Build and deploy
npm run build
git add . && git commit -m "Add new AI tool: Tool Name" && git push
```

### Bulk Tool Addition
```bash
# Process CSV file with multiple tools
node automation/workflow-orchestrator.js complete --source csv --file tools.csv

# Process JSON file with auto-publish
node automation/workflow-orchestrator.js complete --source json --file tools.json --auto-publish
```

## System Architecture

### Core Components Location
```
/Users/siteoptz/siteoptz/automation/
├── automated-tool-addition.js    # Main processing engine
├── bulk-tool-processor.js        # Bulk discovery & enrichment
├── workflow-orchestrator.js      # End-to-end pipeline
├── test-data/                    # Example files
│   ├── sample-tools.json
│   └── sample-tools.csv
└── README.md                     # Detailed documentation
```

## Tool Data Format

### Required Fields for New Tools
```json
{
  "name": "Tool Name",                              // Required: Tool name
  "description": "Detailed description (50+ chars)", // Required: Min 50 characters
  "website": "https://tool-website.com",            // Required: Valid URL
  "developer": "Company Name"                       // Required: Developer/company
}
```

### Optional Fields (Auto-generated if not provided)
```json
{
  "features": ["Feature 1", "Feature 2"],           // Auto-generated based on category
  "pricing": [                                      // Default pricing structure created
    {"plan": "Free", "price_per_month": 0},
    {"plan": "Pro", "price_per_month": 29}
  ],
  "pros": ["Advantage 1"],                          // Generated from description
  "cons": ["Limitation 1"],                         // Standard cons added
  "category": "AI Tools"                            // Auto-detected from description
}
```

## Automated Features

### 1. Duplicate Detection
- Checks against all 165+ existing tools
- Detects duplicates by:
  - Exact name match (case-insensitive)
  - Website URL match
  - URL slug match
  - Description similarity (80%+ threshold)

### 2. Automatic Categorization
The system automatically assigns categories based on keywords:
- **SEO & Optimization**: seo, search engine, ranking
- **Social Media**: social media, social
- **Voice AI**: voice, speech, audio
- **Content Creation**: content, writing
- **Video Generation**: video
- **Image Generation**: image, photo
- **AI Automation**: automat
- **Data Analysis**: data, analytic
- **Customer Support**: customer, support
- **Email Marketing**: email, newsletter
- **Sales**: sales, crm
- **Productivity**: productiv, task

### 3. SEO Content Generation
- Meta title with year and branding
- Meta description with keywords
- Enhanced descriptions for better search visibility
- Use cases and implementation examples
- Schema.org structured data

### 4. Quality Validation
- Name validation (2+ characters)
- Description length (50+ characters)
- Valid website URL format
- Minimum 3 features required
- Pricing information required

### 5. TypeScript Component Standards
- **Critical**: SEO components must use correct function signatures
- **Required Pattern**: `function ComponentName({ tool }: ComponentNameProps)` 
- **Forbidden Pattern**: `function ComponentName({ tool }: ComponentNameProps = {})`
- **Reason**: Components receive `tool` prop from `getStaticProps` at build time
- **Impact**: Incorrect signatures cause TypeScript build failures and prevent title tag deployment

### 6. Duplicate Content Prevention
- **Critical**: All review pages must have unique content to avoid SEO penalties
- **Automatic**: Run `node scripts/fix-duplicate-content-reviews.js` after adding tools
- **Purpose**: Creates unique content variations for each tool's review page
- **System Features**:
  - 5 different intro paragraph templates
  - Category-specific user targeting (agencies, enterprises, developers)
  - Tool-specific feature highlighting from database
  - Rating-based value propositions
  - Industry context integration (14 categories supported)
- **Impact**: Prevents Google duplicate content penalties and improves search rankings

## Step-by-Step Workflows

### Workflow 1: Adding Tools from CSV
```bash
# 1. Prepare CSV file with headers: name,description,website,developer
# 2. Run complete workflow
node automation/workflow-orchestrator.js complete --source csv --file your-tools.csv

# 3. Review staging summary
cat data/staging/staging-*.json

# 4. If satisfied, the tools are added. Build and test:
npm run build
npm run dev  # Test locally

# 5. Commit and deploy
git add .
git commit -m "Add new AI tools from CSV import"
git push
```

### Workflow 2: Adding Tools from JSON
```bash
# 1. Create JSON file with tool array
# 2. Validate and add tools
node automation/automated-tool-addition.js --source json --file tools.json --dry-run
node automation/automated-tool-addition.js --source json --file tools.json

# 3. Build, test, and deploy
npm run build && git add . && git commit -m "Add new AI tools" && git push
```

### Workflow 3: Web Discovery (Future Enhancement)
```bash
# Discover tools from web sources
node automation/workflow-orchestrator.js complete --source discover

# Tools will be discovered from:
# - G2.com
# - Capterra
# - AlternativeTo
# - Product Hunt
```

## File Outputs

### Generated Files Location
```
/Users/siteoptz/siteoptz/
├── public/data/aiToolsData.json          # Updated tool database
├── seo-optimization/production-components/
│   └── [tool-slug]-review.tsx            # Generated review page
└── data/
    ├── workflows/workflow-[id]/          # Workflow outputs
    │   ├── enriched-tools.json
    │   └── workflow-summary.json
    └── staging/staging-[id].json         # Tools ready for review
```

## Common Use Cases

### Use Case 1: Client Provides Tool List
```bash
# Client sends CSV with 50 tools
# Process with validation
node automation/workflow-orchestrator.js complete --source csv --file client-tools.csv --batch-size 10

# Review results
# Auto-generated production components in seo-optimization/production-components/
```

### Use Case 2: Quick Single Tool Addition
```bash
# Marketing team needs to add trending tool quickly
node automation/automated-tool-addition.js --source json --file urgent-tool.json
npm run build && git push
```

### Use Case 3: Bulk Import with Review
```bash
# Import without auto-publish for manual review
node automation/workflow-orchestrator.js complete --source json --file tools.json

# Review staging files
# Make manual adjustments if needed
# Then publish
```

## Troubleshooting

### Issue: "Cannot find module 'csv-parser'"
```bash
npm install csv-parser
```

### Issue: Duplicate Detection False Positives
```bash
# Debug duplicate detection
node automation/debug-duplicates.js
```

### Issue: Build Fails After Adding Tools
```bash
# Check for syntax errors in generated components
npm run type-check
npm run lint

# If errors, review generated files in:
ls -la seo-optimization/production-components/*.tsx
```

### Issue: Tools Not Appearing on Site
```bash
# Verify tools were added to database
grep "YourToolName" public/data/aiToolsData.json

# Rebuild and clear cache
npm run build
rm -rf .next
npm run dev
```

### Issue: TypeScript Errors in Generated Components
```bash
# ERROR: Property 'tool' is missing in type '{}' but required
# CAUSE: Generated component has incorrect function signature with default parameter

# 1. Check for problematic pattern in generated files
grep -r "= {})" seo-optimization/production-components/

# 2. Fix automatically using sed (bulk fix)
find seo-optimization/production-components/ -name "*.tsx" -exec sed -i '' 's/: [A-Za-z]*Props = {})/: &Props)/g' {} \;

# 3. Verify fix and test build
npm run build

# 4. If build still fails, manually check specific files mentioned in error
```

### Issue: Missing Title Tags After Deployment
```bash
# CAUSE: TypeScript build errors prevented proper deployment
# SOLUTION: Fix component signatures and rebuild

# 1. Identify files with missing title tag functionality
grep -r "tool?.name" seo-optimization/production-components/ | grep -v "tool.name"

# 2. Fix component interfaces and signatures
# Components using getStaticProps need required tool prop, not optional

# 3. Test build after fixes
npm run build
```

### Issue: Missing Tool Logos (404 Errors)
```bash
# CAUSE: New tools added without corresponding logo files
# SOLUTION: Run automatic logo generator

# 1. Generate all missing logos automatically
node scripts/automatic-logo-generator.js

# 2. Verify logos were created
ls public/images/tools/ | wc -l

# 3. Test specific logo URLs
curl -I https://siteoptz.ai/images/tools/tool-name-logo.svg

# 4. Add to automated workflow (prevent future occurrences)
# Always run logo generator after adding tools
```

### Issue: Duplicate Content on Review Pages
```bash
# CAUSE: Review pages using identical template content causing SEO penalties
# SOLUTION: Run duplicate content fixer to create unique variations

# 1. Generate unique content for all review pages
node scripts/fix-duplicate-content-reviews.js

# 2. Verify content variations were created
# Check that intro paragraphs differ between tools
grep -A 5 "Looking for a comprehensive" seo-optimization/production-components/*ReviewPage.tsx

# 3. Test build after content generation
npm run build

# 4. Verify uniqueness of generated content
# Each tool should have different intro text, features, and value propositions

# 5. Add to automated workflow (prevent future occurrences)
# Always run duplicate content fixer after adding new tools
```

## Best Practices

### Before Adding Tools
1. **Backup database**: `cp public/data/aiToolsData.json public/data/aiToolsData.backup.json`
2. **Test with dry-run**: Always use `--dry-run` first
3. **Validate data**: Ensure descriptions are 50+ chars

### During Addition
1. **Use batch processing**: For 20+ tools, use batch size of 10-20
2. **Monitor output**: Check for duplicate warnings
3. **Review staging**: Check staging files before final publish

### After Addition
1. **Generate missing logos**: `node scripts/automatic-logo-generator.js`
2. **Fix duplicate content**: `node scripts/fix-duplicate-content-reviews.js`
3. **Test build**: `npm run build`
4. **Verify locally**: `npm run dev` and check /reviews/[tool-slug]
5. **Commit descriptively**: Include tool names in commit message

### Component Generation Rules
1. **Always validate TypeScript signatures**: Check generated components for correct function signatures
2. **Required pattern for getStaticProps components**: `({ tool }: Props)` NOT `({ tool }: Props = {})`
3. **Interface consistency**: Ensure all SEO components have proper TypeScript interfaces with required tool prop
4. **Build validation**: Always run `npm run build` after generating new components to catch TypeScript errors early
5. **Title tag verification**: Test that `tool.name` appears in page titles, not `tool?.name` patterns that indicate missing props

### Duplicate Content Prevention Rules
1. **Mandatory content generation**: Always run `node scripts/fix-duplicate-content-reviews.js` after adding new tools
2. **Content uniqueness verification**: Check that new review pages have unique intro paragraphs and descriptions
3. **Category-appropriate language**: Ensure generated content matches the tool's category context
4. **Feature integration**: Verify that actual tool features are incorporated into generated content
5. **SEO validation**: Confirm that schema markup includes tool-specific descriptions, not generic templates
6. **Build testing**: Always test build after content generation to ensure no TypeScript errors
7. **Content quality check**: Review generated content to ensure it provides real value to users

## PRD Objectives Met

✅ **Scalability**: Process hundreds of tools in batches
✅ **Automation**: End-to-end workflow from discovery to publishing  
✅ **Consistency**: Uniform data structure and component generation
✅ **Quality Control**: Validation, duplicate detection, staging review
✅ **SEO Optimization**: Meta tags, structured data, keyword optimization
✅ **Flexibility**: Multiple input formats (CSV, JSON, API-ready)
✅ **Safety**: Dry-run mode, error recovery, backup recommendations

## Future Enhancements

1. **Firecrawl Integration**: Real web scraping for tool discovery
2. **Claude API Integration**: Enhanced content generation
3. **Automated Screenshots**: Capture tool interfaces
4. **Pricing Updates**: Automated pricing synchronization
5. **Review Import**: Import user reviews from external sources
6. **API Endpoint**: REST API for programmatic tool addition
7. **Webhook Support**: Trigger additions from external events
8. **Monitoring Dashboard**: Track automation runs and success rates

## Support & Maintenance

### Regular Tasks
- Weekly: Review staging directory for unprocessed tools
- Monthly: Audit for duplicate tools
- Quarterly: Update categorization keywords

### File Locations Reference
- **Main database**: `/public/data/aiToolsData.json`
- **Automation scripts**: `/automation/`
- **Generated components**: `/seo-optimization/production-components/`
- **Test data**: `/automation/test-data/`
- **Workflow outputs**: `/data/workflows/`
- **Staging area**: `/data/staging/`

---

**Last Updated**: September 2, 2025
**System Status**: ✅ Production Ready
**Total Tools**: 165+
**Categories**: 15+

## Quick Contact
For issues or enhancements to this automation system, reference this PRD and the implementation in `/automation/` directory.