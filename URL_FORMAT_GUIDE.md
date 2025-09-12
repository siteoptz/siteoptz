# URL Format Guide for SiteOptz

## 🚨 Critical URL Format Rules

### Compare Page URLs

**✅ CORRECT FORMAT:**
```
/compare/tool1/vs/tool2
```

**❌ INCORRECT FORMAT (DO NOT USE):**
```
/compare/tool1-vs-tool2
/compare/tool1_vs_tool2
/compare/tool1-versus-tool2
```

## Why This Matters

1. **SEO Consistency**: Canonical URLs must match actual page URLs
2. **User Experience**: Clean, readable URLs
3. **Technical Requirements**: Next.js dynamic routing expects `/compare/[tool1]/vs/[tool2]` format
4. **Middleware**: Automatic redirects handle incorrect formats, but canonical URLs must be correct

## Implementation Guidelines

### When Creating New Compare Pages

#### ✅ DO:
```javascript
// Canonical URL generation
const canonicalUrl = `/compare/${tool1.slug}/vs/${tool2.slug}`;

// Breadcrumb URLs
{ name: `${tool1.name} vs ${tool2.name}`, url: `/compare/${tool1.slug}/vs/${tool2.slug}` }

// OpenGraph URLs  
url: `https://siteoptz.ai/compare/${tool1.slug}/vs/${tool2.slug}`

// Links in components
<Link href={`/compare/${tool1.slug}/vs/${tool2.slug}`}>
```

#### ❌ DON'T:
```javascript
// WRONG - Using hyphens between tool names
const canonicalUrl = `/compare/${tool1.slug}-vs-${tool2.slug}`;

// WRONG - Using underscores
const canonicalUrl = `/compare/${tool1.slug}_vs_${tool2.slug}`;

// WRONG - Using word separators
const canonicalUrl = `/compare/${tool1.slug}-versus-${tool2.slug}`;
```

## Files to Check When Adding Compare Functionality

### 1. Page Components (`pages/compare/`)
```javascript
// In [...comparison].tsx or any new compare page
canonicalUrl={buildCanonicalUrl(`/compare/${tool1.slug}/vs/${tool2.slug}`)}
```

### 2. SEO Meta Generation (`utils/seoMetaGenerator.js`)
```javascript
canonical: `/compare/${tool1.slug}/vs/${tool2.slug}`,
url: `https://siteoptz.ai/compare/${tool1.slug}/vs/${tool2.slug}`
```

### 3. Data Helpers (`utils/dataHelpers.js`)
```javascript
url: `${baseUrl}/compare/${tools[i].slug}/vs/${tools[j].slug}`,
```

### 4. SEO Utils (`utils/seoUtils.js`)
```javascript
return `${baseUrl}/compare/${tool1.toLowerCase().replace(/\s+/g, '-')}/vs/${tool2.toLowerCase().replace(/\s+/g, '-')}`;
```

### 5. Data Adapters (`utils/dataAdapters.ts`)
```javascript
return `/compare/${tool1}/vs/${tool2}`;
```

### 6. Canonical URL Utils (`utils/canonicalUrl.ts`)
```javascript
return buildCanonicalUrl(`/compare/${tool1}/vs/${tool2}`);
```

## Testing Checklist

Before deploying any compare page functionality:

### ✅ Verification Steps:

1. **URL Structure**: Confirm URLs follow `/compare/tool1/vs/tool2` format
2. **Canonical Tags**: Check HTML output contains correct canonical URLs
3. **OpenGraph URLs**: Verify og:url meta tags use correct format
4. **Internal Links**: Ensure all internal links use correct format
5. **Breadcrumbs**: Check breadcrumb URLs match page format
6. **Sitemaps**: Verify sitemap generation uses correct URLs

### 🧪 Test Commands:
```bash
# Build and check for errors
npm run build

# Check for incorrect URL patterns in codebase
grep -r "compare/.*-vs-" --include="*.js" --include="*.jsx" --include="*.ts" --include="*.tsx" .

# Verify canonical URLs in generated HTML
curl localhost:3000/compare/tool1/vs/tool2 | grep "canonical"
```

## Common Mistakes to Avoid

### 1. Copy-Paste Errors
- Always double-check URL format when copying from existing code
- Old code might contain incorrect formats

### 2. Template Generation
- When using templates or generators, ensure URL format is correct
- Test generated pages immediately

### 3. Third-Party Integrations
- External tools may suggest incorrect formats
- Always use our standard format regardless of suggestions

### 4. SEO Tools Configuration
- Configure SEO tools to expect `/tool1/vs/tool2` format
- Update any hardcoded URL patterns in analytics

## Quick Reference

### Correct URL Components:
- Base: `/compare/`
- Tool 1: `${tool1.slug}`
- Separator: `/vs/`
- Tool 2: `${tool2.slug}`
- Full: `/compare/${tool1.slug}/vs/${tool2.slug}`

### Functions That Generate Correct URLs:
- `buildCanonicalUrl()` in `utils/canonicalUrl.ts`
- `getComparisonCanonicalUrl()` in `utils/canonicalUrl.ts`
- `generateComparisonUrl()` in `utils/dataAdapters.ts`

## Middleware Safety Net

The middleware in `middleware.ts` automatically redirects incorrect formats:
- `/compare/tool1-vs-tool2` → `/compare/tool1/vs/tool2`
- This handles user errors and old bookmarks
- **But canonical URLs must still be correct from the start**

## Emergency Fix Procedure

If incorrect URLs are discovered:

1. **Immediate**: Update canonical URLs in affected files
2. **Check**: Run grep search for similar patterns
3. **Test**: Build and verify fixes
4. **Deploy**: Push changes immediately
5. **Monitor**: Check for any remaining 404s in logs

## Developer Responsibilities

- **Before Code Review**: Verify all URLs follow correct format
- **During Review**: Check URL patterns in any compare-related changes
- **After Deployment**: Monitor for canonical URL errors in logs

Remember: **Consistency is key** - all URLs, links, and canonical references must use the same `/compare/tool1/vs/tool2` format.