# Structured Data Management Guide for SiteOptz

## 🚨 Critical Schema Requirements

**ALL review pages MUST have valid structured data to prevent Google Search Console errors and enable rich snippets.**

## Required Schema Types

### Software Application Schema
- **@type**: `SoftwareApplication`
- **name**: Tool name (required)
- **description**: Tool description (required)
- **offers**: Pricing information (required)
- **aggregateRating**: Rating data (required)
- **url**: Official website or review page URL
- **applicationCategory**: `BusinessApplication`
- **operatingSystem**: `Web`

### Review Schema
- **@type**: `Review`
- **itemReviewed**: Reference to the SoftwareApplication
- **author**: Organization information
- **publisher**: Organization information
- **reviewRating**: Rating object
- **reviewBody**: Review content
- **datePublished**: Publication date

## Validation Requirements

### Offers Object Must Include:
```json
{
  "@type": "Offer",
  "price": "0" | "29.99",
  "priceCurrency": "USD",
  "availability": "https://schema.org/InStock",
  "url": "https://example.com"
}
```

### AggregateRating Object Must Include:
```json
{
  "@type": "AggregateRating", 
  "ratingValue": 4.5,
  "reviewCount": 100,
  "bestRating": 5,
  "worstRating": 1
}
```

## Safe Data Handling

### Price Validation:
- Numbers > 0: Use actual price as string
- `0`, `"0"`, `"free"`: Set to `"0"`
- `null`, `undefined`, invalid: Default to `"0"`
- Non-numeric strings: Default to `"0"`

### Rating Validation:
- Must be between 1-5 (inclusive)
- Round to 1 decimal place
- Default to 4.5 if invalid/missing
- Must be numeric type in schema

## Prevention Scripts

### 1. Schema Validation (Required Before Deploy)
```bash
npm run validate-schema
```

**What it checks:**
- All required fields present
- Correct data types
- Valid value ranges
- Proper schema structure

**When to run:**
- Before every deployment
- After updating tool data
- After schema code changes

### 2. Test Schema Generation
The validation script simulates actual schema generation to catch issues before they reach production.

## Common Issues & Fixes

### ❌ "A value for the aggregateRating or review field is required"
**Cause:** Missing or invalid rating data
**Fix:** Ensure tool has valid rating (1-5) or use fallback

### ❌ "A value for the offers field is required"  
**Cause:** Missing or invalid pricing data
**Fix:** Ensure tool has pricing info or use "0" for free tools

### ❌ Invalid data types
**Cause:** String ratings, non-string prices, etc.
**Fix:** Use safe conversion functions

## Safe Schema Generation

### Helper Functions (Already Implemented):
```javascript
// Price safety
const getSafePrice = (pricing) => {
  if (!pricing) return "0";
  if (typeof pricing.monthly === 'number' && pricing.monthly > 0) {
    return pricing.monthly.toString();
  }
  // ... more validation
  return "0"; // Safe fallback
};

// Rating safety  
const getSafeRating = (rating) => {
  if (typeof rating === 'number' && rating >= 1 && rating <= 5) {
    return Math.round(rating * 10) / 10;
  }
  // ... more validation
  return 4.5; // Safe fallback
};
```

## Development Workflow

### Adding New Review Pages:
1. Ensure tool data includes rating and pricing
2. Use safe helper functions in schema generation
3. Run `npm run validate-schema`
4. Test with Google's Rich Results Test tool
5. Deploy only if validation passes

### Updating Existing Tools:
1. Update tool data in source files
2. Run schema validation
3. Fix any validation errors
4. Test schema output
5. Deploy changes

### Before Every Deployment:
```bash
# Complete validation suite
npm run validate-images
npm run validate-urls  
npm run validate-schema
npm run build
```

## Schema Testing

### Google Tools:
- **Rich Results Test**: https://search.google.com/test/rich-results
- **Schema Markup Validator**: https://validator.schema.org/
- **Search Console**: Monitor for structured data errors

### Manual Testing:
1. Build a test page
2. View page source
3. Copy JSON-LD schema
4. Validate in Google's tools
5. Fix any identified issues

## Troubleshooting

### Schema Not Appearing:
1. Check if JSON-LD script tags are in `<Head>`
2. Verify JSON syntax is valid
3. Ensure no JavaScript errors preventing render
4. Test in incognito mode (cache issues)

### Validation Errors:
1. Run local validation script first
2. Check for missing required fields
3. Verify data type correctness
4. Test with minimal valid schema
5. Gradually add complexity

### Google Search Console Errors:
1. Check error details in GSC
2. Identify specific missing/invalid fields
3. Update schema generation logic
4. Re-validate and deploy
5. Request re-crawling in GSC

## Best Practices

1. **Always validate locally** before deployment
2. **Use safe fallbacks** for all data fields
3. **Test edge cases** (missing data, invalid values)
4. **Monitor GSC regularly** for new structured data errors
5. **Keep schemas up-to-date** with Google guidelines
6. **Document schema changes** in commit messages
7. **Test with actual tool data** not just mock data

## Emergency Fixes

### Production Schema Errors:
```bash
# Quick validation and fix
npm run validate-schema

# If issues found, update schema generation
# Test locally first
npm run build

# Deploy fix
git add . && git commit -m "Fix structured data validation errors"
git push
```

### Bulk Schema Issues:
1. Identify common error patterns
2. Update helper functions
3. Run full validation suite
4. Test with sample of affected pages
5. Deploy fix incrementally if possible

## Monitoring & Maintenance

### Regular Checks:
- Run validation weekly
- Monitor GSC for new structured data errors  
- Update schemas when Google changes requirements
- Test major tools with Rich Results Test

### Performance Impact:
- JSON-LD has minimal performance impact
- Validate schema size isn't excessive
- Consider lazy-loading non-critical schemas
- Monitor Core Web Vitals impact

Remember: **Valid structured data improves SEO and enables rich snippets - it's worth the investment!**