# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

SiteOptz is a Next.js application for comparing AI tools. It features tool comparisons, pricing calculators, and detailed reviews across 100+ AI tools.

## Architecture

- **Next.js 14.2.31** with TypeScript
- **Main data source**: `public/data/aiToolsData.json` (single source of truth)
- **Components**: React components in `/components/` directory
- **Pages**: Dynamic routing with `/compare/[tool1]/vs/[tool2]` format
- **SEO**: Schema markup and meta tags for all pages

## Adding New AI Tools (Simplified Process)

### Quick Method:
```bash
# 1. Edit the tool object in simple-add-tool.js
# 2. Run the script
node simple-add-tool.js

# 3. Test and deploy
npm run build
git add . && git commit -m "Add new AI tool" && git push
```

### Manual Method:
1. Open `public/data/aiToolsData.json`
2. Add new tool object following this format:
```json
{
  "id": "tool-id",
  "name": "Tool Name",
  "slug": "tool-slug", 
  "description": "Tool description",
  "features": ["Feature 1", "Feature 2"],
  "pricing": [
    {"plan": "Free", "price_per_month": 0, "features": []},
    {"plan": "Pro", "price_per_month": 29, "features": []}
  ],
  "pros": ["Advantage 1"],
  "cons": ["Limitation 1"],
  "rating": 4.5,
  "benchmarks": {"speed": 8, "accuracy": 8, "integration": 7, "ease_of_use": 8, "value": 8}
}
```

## Build Commands

```bash
# Development
npm run dev

# Production build  
npm run build

# Type checking
npm run type-check

# Linting
npm run lint

# URL format validation (run before deploying)
npm run validate-urls

# Image validation (REQUIRED before deploying)
npm run validate-images

# Generate missing logos (fixes broken images)
npm run generate-logos

# Schema validation (REQUIRED before deploying)
npm run validate-schema
```

## Design System Requirements

### Dark Theme Styling (MANDATORY)
**ALL new pages MUST use the dark theme styling:**
- **Background**: `bg-gradient-to-br from-black via-gray-900 to-black`
- **Cards/Containers**: `bg-black border border-gray-800`
- **Text Colors**: 
  - Primary text: `text-white`
  - Secondary text: `text-gray-300` or `text-gray-400`
  - Accent/Links: `text-cyan-400`
- **Buttons**: `bg-gradient-to-r from-blue-600 to-purple-600 text-white`
- **Hover States**: `hover:from-blue-700 hover:to-purple-700`

This dark theme is mandatory for visual consistency across the entire site.

## URL Format Requirements (CRITICAL)

**Compare Page URLs MUST follow this format:**
```
✅ CORRECT: /compare/tool1/vs/tool2
❌ WRONG:   /compare/tool1-vs-tool2
```

**When working with compare pages:**
- Canonical URLs: `/compare/${tool1.slug}/vs/${tool2.slug}`
- OpenGraph URLs: `https://siteoptz.ai/compare/${tool1.slug}/vs/${tool2.slug}`
- Internal links: Same format
- See URL_FORMAT_GUIDE.md for complete details

**Files to check:** `pages/compare/`, `utils/seoMetaGenerator.js`, `utils/canonicalUrl.ts`, `utils/dataHelpers.js`, `utils/seoUtils.js`, `utils/dataAdapters.ts`

## Image Requirements (CRITICAL)

**ALL tools MUST have working logo images:**
- **Format**: `/images/tools/[tool-slug]-logo.svg`
- **Required validation**: Run `npm run validate-images` before deploying
- **Auto-fix**: Run `npm run generate-logos` for missing images
- See IMAGE_MANAGEMENT_GUIDE.md for complete details

**When adding new tools:**
1. Add logo property: `"logo": "/images/tools/tool-name-logo.svg"`
2. Place actual logo file OR run `npm run generate-logos`
3. Always run `npm run validate-images` before committing

## Rich Results & Structured Data Requirements (CRITICAL)

**ALL pages MUST implement proper structured data for SEO rich results:**

### Required Schema Types for Tool Pages
1. **SoftwareApplication Schema** (PRIMARY)
2. **Review Schema** 
3. **FAQPage Schema**
4. **BreadcrumbList Schema**

### Mandatory SoftwareApplication Fields
```json
{
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "Tool Name",
  "description": "Tool description",
  "url": "https://tool-website.com",
  "applicationCategory": "BusinessApplication",
  "operatingSystem": "Web",
  "offers": {
    "@type": "Offer",
    "price": 29,
    "priceCurrency": "USD",
    "availability": "https://schema.org/InStock",
    "priceSpecification": {
      "@type": "PriceSpecification",
      "price": 29,
      "priceCurrency": "USD"
    }
  },
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": 4.5,
    "reviewCount": 100,
    "bestRating": 5,
    "worstRating": 1
  },
  "author": {
    "@type": "Organization",
    "name": "SiteOptz",
    "url": "https://siteoptz.ai"
  },
  "publisher": {
    "@type": "Organization",
    "name": "SiteOptz",
    "url": "https://siteoptz.ai"
  }
}
```

### Critical Implementation Rules
- **NEVER omit** `aggregateRating` or `offers` fields (causes GSC errors)
- **Use actual data** from `aiToolsData.json` for pricing and ratings
- **Handle free tools**: Use appropriate pricing structure for $0 tools
- **Include all 4 schema types** on review pages for maximum SEO benefit
- **Validate implementation** before deployment

### Rich Results Validation Commands
```bash
# Test structured data implementation
node scripts/test-rich-results.js test-url https://siteoptz.ai/reviews/[tool-name]

# Analyze rich results compliance
node scripts/rich-results-analyzer-simple.js

# Test sample of URLs
node scripts/test-rich-results.js test-csv [path-to-csv] [sample-size]
```

### Tools for Ongoing Monitoring
- **Rich Results Analyzer**: `scripts/rich-results-analyzer-simple.js`
- **Rich Results Tester**: `scripts/test-rich-results.js` 
- **Reports Directory**: `reports/rich-results/`

### SEO Impact
- **Rich snippets** in search results (ratings, pricing)
- **Enhanced CTR** from improved search listings
- **Competitive advantage** over tools without structured data
- **700+ pages** currently benefit from rich results

## Important Notes

- **Single data source**: Only edit `public/data/aiToolsData.json`
- **No complex normalization**: Data should be consistent in the file
- **Required fields**: id, name, slug, features (array), pricing (array), **logo**
- **Arrays only**: features and pricing must always be arrays, never objects
- **Dark theme required**: All pages must use the dark theme styling specified above
- **Logo validation**: MUST run `npm run validate-images` before every deployment
- **Rich results validation**: MUST test structured data on new pages before deployment