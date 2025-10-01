# Optz Subdomain Setup Guide

## 🎯 Overview
This guide covers the complete setup process for the `optz.siteoptz.ai` subdomain, including DNS configuration, Vercel setup, and content deployment.

## 📋 Prerequisites
- Access to your domain provider's DNS settings
- Vercel account with project access
- Git repository access

## 🔧 Step 1: DNS Configuration

### Add CNAME Record
In your domain provider's DNS settings, add the following record:

```
Type: CNAME
Name: optz
Value: cname.vercel-dns.com
TTL: 3600 (or default)
```

### Alternative: A Record (if CNAME not supported)
```
Type: A
Name: optz
Value: 76.76.19.61
TTL: 3600
```

## 🚀 Step 2: Vercel Domain Configuration

### Add Domain to Vercel Project
1. Go to your Vercel dashboard
2. Navigate to your project settings
3. Click on "Domains" tab
4. Click "Add Domain"
5. Enter `optz.siteoptz.ai`
6. Click "Add"

### Verify Domain
- Vercel will automatically provision an SSL certificate
- Domain verification may take 5-10 minutes
- Check the status in the Vercel dashboard

## 📁 Step 3: Content Structure

The subdomain content has been created in the following structure:

```
pages/optz/
├── index.tsx          # Main landing page
├── dashboard.tsx      # Dashboard page
└── analytics.tsx      # Analytics page
```

### Key Features Implemented:
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **SEO Optimized**: Proper meta tags, canonical URLs, and structured data
- **Subdomain Routing**: Automatic routing based on host header
- **Performance Optimized**: Image optimization and caching headers

## ⚙️ Step 4: Next.js Configuration

The `next.config.js` has been updated with:

### Image Domains
```javascript
domains: [
  'siteoptz.ai',
  'optz.siteoptz.ai',  // Added for subdomain
  // ... other domains
]
```

### Subdomain Routing
```javascript
async rewrites() {
  return [
    {
      source: '/:path*',
      destination: '/optz/:path*',
      has: [
        {
          type: 'host',
          value: 'optz.siteoptz.ai',
        },
      ],
    },
  ];
}
```

## 🧪 Step 5: Testing

### Local Testing
```bash
# Test subdomain routing locally
npm run dev

# Add to /etc/hosts (macOS/Linux)
127.0.0.1 optz.siteoptz.ai

# Visit http://optz.siteoptz.ai:3000
```

### Production Testing
1. **DNS Propagation**: Check with `nslookup optz.siteoptz.ai`
2. **SSL Certificate**: Verify HTTPS works
3. **Content Loading**: Test all pages load correctly
4. **Performance**: Run Lighthouse audit

## 📊 Step 6: Monitoring & Analytics

### Google Analytics Setup
Add tracking code to monitor subdomain traffic:

```javascript
// In _app.tsx or _document.tsx
gtag('config', 'GA_MEASUREMENT_ID', {
  custom_map: {
    'custom_parameter_1': 'subdomain'
  }
});
```

### Vercel Analytics
Enable Vercel Analytics in your project settings for additional insights.

## 🔍 Troubleshooting

### Common Issues

#### DNS Not Propagating
- Wait 24-48 hours for full propagation
- Use `dig optz.siteoptz.ai` to check DNS status
- Clear DNS cache: `sudo dscacheutil -flushcache` (macOS)

#### SSL Certificate Issues
- Vercel automatically provisions SSL certificates
- Wait 5-10 minutes after domain verification
- Check Vercel dashboard for certificate status

#### Routing Not Working
- Verify `next.config.js` rewrites configuration
- Check that pages exist in `/pages/optz/` directory
- Test with `curl -H "Host: optz.siteoptz.ai" https://siteoptz.ai`

#### Content Not Loading
- Verify build completed successfully
- Check browser console for errors
- Ensure all imports and dependencies are correct

## 🚀 Deployment Commands

### Deploy to Production
```bash
# Build and deploy
npm run build
vercel --prod

# Or use Git integration
git add .
git commit -m "Add optz subdomain"
git push origin main
```

### Verify Deployment
```bash
# Check deployment status
vercel ls

# View deployment logs
vercel logs [deployment-url]
```

## 📈 Performance Optimization

### Image Optimization
- All images use Next.js Image component
- WebP format with fallbacks
- Lazy loading enabled

### Caching Strategy
- Static assets: 1 year cache
- API responses: 24 hours cache
- HTML pages: 1 hour cache

### CDN Configuration
- Vercel Edge Network automatically enabled
- Global distribution for fast loading

## 🔐 Security Considerations

### Headers Configuration
The following security headers are configured:
- `X-Frame-Options: DENY`
- `X-Content-Type-Options: nosniff`
- `Strict-Transport-Security: max-age=31536000`
- `X-XSS-Protection: 1; mode=block`

### CORS Policy
- Configured for subdomain access
- API endpoints properly secured

## 📝 Next Steps

1. **Content Expansion**: Add more pages as needed
2. **API Integration**: Connect to backend services
3. **User Authentication**: Implement login/signup
4. **Analytics Dashboard**: Add real-time metrics
5. **A/B Testing**: Implement feature flags

## 🆘 Support

If you encounter issues:
1. Check Vercel deployment logs
2. Verify DNS configuration
3. Test locally first
4. Contact support with specific error messages

---

**Status**: ✅ Subdomain setup complete
**Last Updated**: $(date)
**Version**: 1.0.0
