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

## Important Notes

- **Single data source**: Only edit `public/data/aiToolsData.json`
- **No complex normalization**: Data should be consistent in the file
- **Required fields**: id, name, slug, features (array), pricing (array), **logo**
- **Arrays only**: features and pricing must always be arrays, never objects
- **Dark theme required**: All pages must use the dark theme styling specified above
- **Logo validation**: MUST run `npm run validate-images` before every deployment