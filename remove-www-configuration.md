# Remove WWW Configuration to Avoid 308 Redirects

## 🎯 **Objective**
Remove www configuration in Vercel to eliminate 308 redirects and standardize on non-www URLs.

## 📊 **Current Issues**
- 308 redirects from `siteoptz.ai` to `siteoptz.ai`
- SEO impact from redirect chains
- Slower page load times
- Potential duplicate content issues

## 🔧 **Solution Steps**

### **1. Vercel Domain Configuration**

#### **Remove WWW Domain from Vercel:**
1. Go to your Vercel dashboard
2. Navigate to your project settings
3. Go to "Domains" section
4. **Remove** `siteoptz.ai` from the domain list
5. Keep only `siteoptz.ai` as the primary domain

#### **Set Primary Domain:**
- Ensure `siteoptz.ai` is set as the primary domain
- Remove any www subdomain configurations

### **2. DNS Configuration**

#### **Update DNS Records:**
```dns
# Remove these records:
siteoptz.ai CNAME cname.vercel-dns.com

# Keep only:
siteoptz.ai A 76.76.19.61
siteoptz.ai AAAA 2606:4700:3030::6815:2b5c
```

### **3. Update Vercel Configuration**

#### **Current vercel.json (No Changes Needed):**
Your current `vercel.json` is already correctly configured without www redirects. The redirects section only handles compare URL patterns, not www redirects.

### **4. Update Application Code**

#### **Remove WWW References:**
Update all hardcoded www references in your codebase:

```bash
# Search for www references
grep -r "www\.siteoptz\.ai" . --exclude-dir=node_modules

# Replace with non-www
find . -type f -name "*.js" -o -name "*.ts" -o -name "*.tsx" -o -name "*.php" | \
xargs sed -i '' 's/www\.siteoptz\.ai/siteoptz.ai/g'
```

### **5. Update Canonical URLs**

#### **Ensure All Canonical URLs Use Non-WWW:**
```javascript
// In your Next.js app
const canonicalUrl = `https://siteoptz.ai${router.asPath}`;

// In meta tags
<link rel="canonical" href="https://siteoptz.ai/current-page" />
```

### **6. Update Sitemaps**

#### **Ensure Sitemaps Use Non-WWW:**
```xml
<!-- In sitemap.xml -->
<url>
  <loc>https://siteoptz.ai/</loc>
  <lastmod>2024-01-01</lastmod>
</url>
```

### **7. Update Internal Links**

#### **Search and Replace WWW References:**
```bash
# Find all www references
grep -r "www\.siteoptz\.ai" . --exclude-dir=node_modules --exclude-dir=.git

# Replace in specific file types
find . -name "*.js" -o -name "*.ts" -o -name "*.tsx" -o -name "*.php" -o -name "*.html" | \
xargs sed -i '' 's/www\.siteoptz\.ai/siteoptz.ai/g'
```

## 🚀 **Implementation Steps**

### **Step 1: Remove WWW from Vercel (IMMEDIATE)**
1. Go to Vercel Dashboard → Project → Settings → Domains
2. Remove `siteoptz.ai` from domain list
3. Ensure `siteoptz.ai` is primary domain

### **Step 2: Update DNS (IMMEDIATE)**
1. Go to your DNS provider
2. Remove CNAME record for `siteoptz.ai`
3. Keep only A/AAAA records for `siteoptz.ai`

### **Step 3: Update Code (NEXT)**
1. Run the search and replace commands above
2. Update all hardcoded www references
3. Test locally to ensure no www references remain

### **Step 4: Test and Verify (FINAL)**
1. Test `siteoptz.ai` - should not redirect
2. Test `siteoptz.ai` - should work normally
3. Check Google Search Console for any issues
4. Monitor for 308 redirect errors

## ⚠️ **Important Notes**

### **SEO Considerations:**
- **Before removing www**: Ensure all your content is accessible via non-www
- **After removing www**: Monitor Google Search Console for any indexing issues
- **Canonical URLs**: All should point to non-www version

### **User Experience:**
- **Bookmarks**: Users with www bookmarks will need to update them
- **Social Media**: Update any social media links to use non-www
- **Email Signatures**: Update any email signatures with www links

### **Testing:**
```bash
# Test URLs
curl -I https://siteoptz.ai
curl -I https://siteoptz.ai

# Should return 200 for both (no redirects)
```

## 📈 **Expected Results**

### **Before (With WWW):**
```
siteoptz.ai → 308 → siteoptz.ai → 200
```

### **After (Without WWW):**
```
siteoptz.ai → 404 (or no response)
siteoptz.ai → 200
```

## 🔍 **Monitoring**

### **Check for Success:**
1. **No 308 redirects** from www to non-www
2. **Faster page loads** (no redirect chain)
3. **Clean SEO** (no duplicate content issues)
4. **Consistent URLs** across all pages

### **Tools to Monitor:**
- Google Search Console
- Vercel Analytics
- PageSpeed Insights
- Redirect checker tools

## 🎯 **Quick Action Items**

1. ✅ **Remove siteoptz.ai from Vercel domains**
2. ✅ **Remove www CNAME record from DNS**
3. ✅ **Search and replace www references in code**
4. ✅ **Update canonical URLs to non-www**
5. ✅ **Test and verify no 308 redirects**

This will completely eliminate the 308 redirects and standardize your site on the non-www version.
