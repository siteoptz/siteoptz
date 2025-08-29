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
```

## Important Notes

- **Single data source**: Only edit `public/data/aiToolsData.json`
- **No complex normalization**: Data should be consistent in the file
- **Required fields**: id, name, slug, features (array), pricing (array)
- **Arrays only**: features and pricing must always be arrays, never objects