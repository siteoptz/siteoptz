# Claude Memory Bootstrap

This document provides cross-session project memory for Claude Code interactions with the SiteOptz repository.

## Project Overview

**SiteOptz** is a comprehensive AI tool comparison platform built with Next.js 14.2.31 and TypeScript. The platform features detailed comparisons, pricing calculators, and reviews across 100+ AI tools.

### Core Architecture
- **Framework**: Next.js with TypeScript and Tailwind CSS
- **Data Source**: Single source of truth in `public/data/aiToolsData.json`
- **Routing**: Dynamic comparison URLs `/compare/tool1/vs/tool2`
- **Styling**: Mandatory dark theme with specific gradient backgrounds
- **Deployment**: Vercel with automated CI/CD

## Critical Requirements

### URL Format (MANDATORY)
- Compare pages MUST use: `/compare/${tool1.slug}/vs/${tool2.slug}`
- Never use: `/compare/tool1-vs-tool2` format
- All canonical and OpenGraph URLs must follow this format

### Image Management (CRITICAL)
- All tools require logo: `/images/tools/[tool-slug]-logo.svg`
- Run `npm run validate-images` before every deployment
- Use `npm run generate-logos` to create missing logos

### Rich Results & SEO (ESSENTIAL)
- All tool pages require 4 schema types: SoftwareApplication, Review, FAQPage, BreadcrumbList
- Never omit `aggregateRating` or `offers` fields from SoftwareApplication
- Use actual pricing/rating data from aiToolsData.json
- Validate with `npm run validate-schema`

### Dark Theme Styling (MANDATORY)
- Background: `bg-gradient-to-br from-black via-gray-900 to-black`
- Cards: `bg-black border border-gray-800`
- Text: Primary `text-white`, Secondary `text-gray-300/400`
- Buttons: `bg-gradient-to-r from-blue-600 to-purple-600`

## Development Commands

### Essential Build Commands
```bash
npm run dev                    # Development server
npm run build                  # Production build
npm run type-check            # TypeScript validation
npm run lint                  # ESLint check
npm run validate-urls         # URL format validation
npm run validate-images       # Image validation (REQUIRED)
npm run generate-logos        # Generate missing logos
npm run validate-schema       # Schema validation (REQUIRED)
```

### Agent Stack Commands
```bash
npm run agent:memory:check    # Cross-session memory validation
npm run agent:plan           # Planning templates
npm run agent:review         # Five-lane code review
npm run agent:security       # Security scanning
npm run agent:ui-review      # UI/design validation
npm run agent:suppressions:validate  # Suppression validation
```

## Data Management

### Tool Addition Process
1. **Simple method**: Edit `simple-add-tool.js` and run `node simple-add-tool.js`
2. **Manual method**: Add to `public/data/aiToolsData.json` following schema
3. **Required fields**: id, name, slug, features[], pricing[], logo
4. **Validation**: Always run all validation commands before committing

### Schema Requirements
```json
{
  "id": "tool-id",
  "name": "Tool Name", 
  "slug": "tool-slug",
  "description": "Description",
  "features": ["Feature 1", "Feature 2"],
  "pricing": [{"plan": "Free", "price_per_month": 0, "features": []}],
  "logo": "/images/tools/tool-name-logo.svg",
  "rating": 4.5,
  "benchmarks": {"speed": 8, "accuracy": 8, "integration": 7}
}
```

## Common Issues and Solutions

### Hydration Errors
- Often caused by SSR/client-side data mismatches
- Check component state initialization
- Verify data consistency in aiToolsData.json

### 404 Errors
- Usually from incorrect URL format or missing slugs
- Validate compare page URLs match required format
- Ensure all tools have proper slugs

### Image Issues
- Missing logos cause component failures
- Always run `npm run validate-images` 
- Use `npm run generate-logos` for batch creation

### Rich Results Failures
- Missing required schema fields
- Incorrect data types in structured data
- Use Google's Rich Results Test for validation

## Recent Important Changes

### URL Format Migration
- Migrated from `/compare/tool1-vs-tool2` to `/compare/tool1/vs/tool2`
- All redirects and canonicals updated
- Legacy format still redirects properly

### Rich Results Implementation
- Full structured data implementation across 700+ pages
- SoftwareApplication schema with proper offers/ratings
- Enhanced SEO performance with rich snippets

### Agent Stack Integration
- Standardized multi-agent workflow
- Five-lane code review system
- Security scanning and suppression management
- Progressive enforcement starting warn-only

## File Locations

### Key Files
- `CLAUDE.md` - Main project instructions
- `public/data/aiToolsData.json` - Single source of truth
- `utils/seoMetaGenerator.js` - SEO and structured data
- `utils/canonicalUrl.ts` - URL generation
- `components/` - React components

### Agent Stack
- `docs/agent-stack/` - Agent documentation and policies
- `scripts/agent/` - Agent implementation scripts
- `.github/workflows/agent-*.yml` - CI automation

## Environment Context

### Development Environment
- Node.js >= 18.0.0
- npm as package manager
- TypeScript strict mode
- ESLint + Prettier + Husky

### Production Environment  
- Vercel deployment
- Automatic builds on push
- Environment variables in Vercel dashboard
- CDN and edge optimization

## Security Considerations

### Protected Areas
- No explicit auth/payment systems currently
- API routes for external integrations
- Environment variables for API keys
- Input validation on all forms

### Agent Stack Security
- Secret scanning enabled
- Dependency vulnerability monitoring
- Suppression framework for managed exceptions
- Progressive enforcement model

## Performance Standards

### Bundle Limits
- Client bundle: 512kB
- Server bundle: 1MB
- Image optimization required
- Core Web Vitals compliance

### SEO Requirements
- Structured data on all tool pages
- Proper meta tags and canonicals
- Mobile-responsive design
- Performance scoring > 90

## Troubleshooting Guide

1. **Build failures**: Check TypeScript errors and missing dependencies
2. **URL issues**: Verify format compliance and slug consistency  
3. **Image problems**: Run validation and generation scripts
4. **SEO issues**: Validate structured data and meta tags
5. **Agent stack**: Check suppression files and enforcement policy

## Next Steps

When working on SiteOptz:
1. Always check current todo list and enforcement policy
2. Follow URL format requirements strictly
3. Run all validation commands before committing
4. Use dark theme styling for new components
5. Implement proper structured data on new pages

This memory should be referenced for context in all SiteOptz interactions.