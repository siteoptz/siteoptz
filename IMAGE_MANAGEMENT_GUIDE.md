# Image Management Guide for SiteOptz

## 🚨 Critical Image Requirements

**ALL tools MUST have working logo images to prevent broken images in production.**

## Image Standards

### Tool Logo Requirements:
- **Format**: SVG preferred, PNG/JPG acceptable
- **Size**: 64x64px optimal, scalable
- **Location**: `public/images/tools/[tool-slug]-logo.svg`
- **Naming**: `{tool-slug}-logo.{extension}`

### Logo Path Format:
```javascript
// In aiToolsData.json
{
  "logo": "/images/tools/tool-name-logo.svg"
}
```

## Automatic Fallback System

The `ToolLogo` component automatically handles missing images:

1. **Primary**: Try specified logo path
2. **Fallback 1**: Try PNG format if SVG fails  
3. **Fallback 2**: Try JPG format if PNG fails
4. **Fallback 3**: Try JPEG format if JPG fails
5. **Fallback 4**: Try placeholder-logo.svg
6. **Final**: Show colored initials if all fail

## Prevention Scripts

### 1. Image Validation (Required Before Deploy)
```bash
npm run validate-images
```

**What it checks:**
- All tools have logo properties
- Referenced logo files exist
- Files are readable and non-empty
- Format consistency

**When to run:**
- Before every deployment
- After adding new tools
- After updating tool data

### 2. Logo Generation (Fixes Missing Images)
```bash
npm run generate-logos
```

**What it does:**
- Scans for missing logo files
- Generates SVG placeholders with tool initials
- Uses consistent colors based on tool name
- Creates professional-looking fallbacks

**When to run:**
- When validation shows missing images
- After adding tools without logos
- For quick fixes before deployment

## Adding New Tools

### ✅ Correct Process:

1. **Add tool to data:**
```json
{
  "id": "new-tool",
  "name": "New Tool",
  "slug": "new-tool",
  "logo": "/images/tools/new-tool-logo.svg"
}
```

2. **Provide actual logo:**
```bash
# Place logo file at:
public/images/tools/new-tool-logo.svg
```

3. **Or generate placeholder:**
```bash
npm run generate-logos
```

4. **Validate before commit:**
```bash
npm run validate-images
```

### ❌ Common Mistakes:

- Adding tools without logo property
- Referencing non-existent logo files
- Using wrong file paths or names
- Not testing images before deployment

## File Organization

```
public/images/tools/
├── tool1-logo.svg
├── tool2-logo.png
├── tool3-logo.jpg
├── placeholder-logo.svg (global fallback)
└── ...
```

## Development Workflow

### Adding New Tools:
1. Add tool data with correct logo path
2. Add actual logo file OR run `npm run generate-logos`
3. Run `npm run validate-images` 
4. Fix any issues before committing
5. Test on a few compare pages

### Before Deployment:
```bash
# Validate everything is correct
npm run validate-images
npm run validate-urls

# Generate any missing logos
npm run generate-logos

# Build and test
npm run build
```

## Troubleshooting

### "Logo not found" errors:
1. Check if file exists in correct location
2. Verify filename matches logo path in data
3. Run `npm run generate-logos` to create placeholder
4. Update tool data if needed

### "Format mismatch" warnings:
1. Update logo path in aiToolsData.json to match actual file
2. Or rename file to match referenced format
3. SVG format is preferred for scalability

### "Empty file" errors:
1. Delete empty/corrupted files
2. Replace with proper logo or run generation script
3. Check file permissions

## Monitoring & Maintenance

### Regular Checks:
- Run validation script weekly
- Monitor server logs for 404 image errors
- Update placeholder generation as needed

### Performance Tips:
- Use SVG for better scalability
- Optimize PNG/JPG files for web
- Lazy load images in components
- Cache headers for static images

## Emergency Fixes

### Production Emergency:
```bash
# Quick fix for broken images in production
npm run generate-logos
git add public/images/tools/
git commit -m "Emergency: Generate missing tool logos"
git push

# Then deploy
npm run build
```

### Bulk Image Issues:
```bash
# 1. Backup current images
cp -r public/images/tools public/images/tools-backup

# 2. Regenerate all missing logos
npm run generate-logos

# 3. Validate results
npm run validate-images

# 4. Commit if successful
git add public/images/tools/
git commit -m "Bulk generate missing tool logos"
```

## Component Usage

### Basic Usage:
```jsx
<ToolLogo toolName="ChatGPT" />
```

### With Custom Logo:
```jsx
<ToolLogo 
  toolName="ChatGPT" 
  logoUrl="/custom/path/logo.svg" 
/>
```

### Different Sizes:
```jsx
<ToolLogo toolName="ChatGPT" size="sm" />  // 32x32
<ToolLogo toolName="ChatGPT" size="md" />  // 48x48 (default)
<ToolLogo toolName="ChatGPT" size="lg" />  // 64x64
<ToolLogo toolName="ChatGPT" size="xl" />  // 80x80
```

## Automated Checks

### Pre-commit Hook (Recommended):
```json
// In package.json
{
  "husky": {
    "hooks": {
      "pre-commit": "npm run validate-images && npm run validate-urls"
    }
  }
}
```

### CI/CD Integration:
```yaml
# In deployment workflow
- name: Validate Images
  run: npm run validate-images

- name: Generate Missing Logos
  run: npm run generate-logos

- name: Commit Generated Logos
  run: |
    git add public/images/tools/
    git commit -m "Auto-generate missing logos" || true
```

## Best Practices

1. **Always validate** before deploying
2. **Generate placeholders** immediately for new tools
3. **Replace placeholders** with real logos when available  
4. **Monitor logs** for image 404s
5. **Test locally** with cleared cache
6. **Document changes** in commit messages
7. **Keep backups** of important logos

Remember: **Prevention is better than fixing broken images in production!**