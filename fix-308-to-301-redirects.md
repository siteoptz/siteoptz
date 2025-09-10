# Fix 308 to 301 Redirects at Server Level

## 🎯 **Problem**
- Current redirects are returning **308 (Permanent Redirect)** status codes
- Need to change to **301 (Moved Permanently)** status codes
- 308 redirects can cause SEO issues and slower page loads

## 🔧 **Solution: Update Vercel Configuration**

### **1. Update vercel.json Redirects**

The issue is that Vercel's `"permanent": true` setting uses 308 redirects by default. We need to explicitly set the status code to 301.

#### **Current Configuration (308 redirects):**
```json
{
  "source": "/compare/10web-vs-acquisio",
  "destination": "/compare/10web/vs/acquisio",
  "permanent": true
}
```

#### **Updated Configuration (301 redirects):**
```json
{
  "source": "/compare/10web-vs-acquisio",
  "destination": "/compare/10web/vs/acquisio",
  "statusCode": 301
}
```

### **2. Complete Vercel.json Update**

Replace the entire redirects section in your `vercel.json`:

```json
{
  "functions": {
    "app/api/health.js": {
      "maxDuration": 10
    }
  },
  "headers": [
    {
      "source": "/robots.txt",
      "headers": [
        {
          "key": "Content-Type",
          "value": "text/plain"
        },
        {
          "key": "Cache-Control",
          "value": "public, max-age=86400"
        }
      ]
    },
    {
      "source": "/sitemap.xml",
      "headers": [
        {
          "key": "Content-Type",
          "value": "application/xml"
        },
        {
          "key": "Cache-Control",
          "value": "public, max-age=3600"
        }
      ]
    },
    {
      "source": "/sitemap-main.xml",
      "headers": [
        {
          "key": "Content-Type",
          "value": "application/xml"
        },
        {
          "key": "Cache-Control",
          "value": "public, max-age=3600"
        }
      ]
    },
    {
      "source": "/sitemap-tools.xml",
      "headers": [
        {
          "key": "Content-Type",
          "value": "application/xml"
        },
        {
          "key": "Cache-Control",
          "value": "public, max-age=3600"
        }
      ]
    },
    {
      "source": "/sitemap-comparisons.xml",
      "headers": [
        {
          "key": "Content-Type",
          "value": "application/xml"
        },
        {
          "key": "Cache-Control",
          "value": "public, max-age=3600"
        }
      ]
    }
  ],
  "redirects": [
    {
      "source": "/compare/10web-vs-acquisio",
      "destination": "/compare/10web/vs/acquisio",
      "statusCode": 301
    },
    {
      "source": "/compare/10web-vs-adalysis",
      "destination": "/compare/10web/vs/adalysis",
      "statusCode": 301
    },
    {
      "source": "/compare/10web-vs-adbeat",
      "destination": "/compare/10web/vs/adbeat",
      "statusCode": 301
    }
    // ... continue with all other redirects using statusCode: 301
  ]
}
```

## 🚀 **Implementation Steps**

### **Step 1: Update vercel.json**
1. Replace all `"permanent": true` with `"statusCode": 301`
2. Deploy the updated configuration
3. Test the redirects

### **Step 2: Alternative - Use Next.js Redirects**
If you're using Next.js, you can also handle redirects in `next.config.js`:

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: '/compare/10web-vs-acquisio',
        destination: '/compare/10web/vs/acquisio',
        permanent: true, // This will use 301 in Next.js
      },
      {
        source: '/compare/10web-vs-adalysis',
        destination: '/compare/10web/vs/adalysis',
        permanent: true,
      },
      // ... continue with all redirects
    ];
  },
};

module.exports = nextConfig;
```

### **Step 3: Test the Changes**
```bash
# Test a redirect URL
curl -I https://siteoptz.ai/compare/10web-vs-acquisio

# Should return:
# HTTP/1.1 301 Moved Permanently
# Location: /compare/10web/vs/acquisio
```

## 📊 **Status Code Differences**

### **308 (Permanent Redirect) - Current:**
- Preserves the HTTP method (POST, PUT, etc.)
- Can cause issues with some browsers and SEO tools
- Not as widely supported as 301

### **301 (Moved Permanently) - Target:**
- Standard redirect status code
- Better SEO support
- Widely supported by all browsers and tools
- Preferred by search engines

## 🔧 **Automated Fix Script**

I'll create a script to automatically update your vercel.json file:

```bash
# Run the fix script
node fix-308-to-301-redirects.js
```

## ⚠️ **Important Notes**

1. **Deploy Immediately**: After updating vercel.json, deploy to Vercel
2. **Test Thoroughly**: Verify all redirects return 301 status codes
3. **Monitor SEO**: Check Google Search Console for any issues
4. **Update Sitemaps**: Ensure sitemaps reflect the new redirect behavior

## 🎯 **Expected Results**

### **Before (308 redirects):**
```
curl -I https://siteoptz.ai/compare/10web-vs-acquisio
HTTP/1.1 308 Permanent Redirect
Location: /compare/10web/vs/acquisio
```

### **After (301 redirects):**
```
curl -I https://siteoptz.ai/compare/10web-vs-acquisio
HTTP/1.1 301 Moved Permanently
Location: /compare/10web/vs/acquisio
```

This change will improve your SEO performance and ensure better compatibility with all browsers and SEO tools.
