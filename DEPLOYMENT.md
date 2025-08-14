# SiteOptz Deployment Guide

## Prerequisites

- Node.js 18+ and npm 9+
- Vercel account
- Domain siteoptz.ai configured
- Required API keys and services

## Environment Variables Setup

### Local Development (.env.local)

Copy the following variables to your `.env.local` file:

```bash
# Next.js Configuration
NEXT_PUBLIC_BASE_URL=https://siteoptz.ai
NEXT_PUBLIC_SITE_NAME=SiteOptz

# Email Service Configuration
EMAIL_PROVIDER=sendgrid
SENDGRID_API_KEY=your_sendgrid_api_key_here
POSTMARK_API_TOKEN=your_postmark_api_token_here
FROM_EMAIL=noreply@siteoptz.ai

# Database Configuration
MONGODB_URI=your_mongodb_connection_string_here
DB_NAME=siteoptz

# Security
API_SECRET_KEY=your_secret_key_for_api_authentication

# Development Environment
NODE_ENV=development

# Optional: Analytics
GOOGLE_ANALYTICS_ID=G-XXXXXXXXXX

# Optional: Rate Limiting (Redis for production)
REDIS_URL=redis://localhost:6379
```

### Vercel Dashboard Environment Variables

Add these variables in your Vercel project settings:

1. **Production Environment Variables:**
   - `NEXT_PUBLIC_BASE_URL` = `https://siteoptz.ai`
   - `NEXT_PUBLIC_SITE_NAME` = `SiteOptz`
   - `EMAIL_PROVIDER` = `sendgrid` (or `postmark`)
   - `SENDGRID_API_KEY` = `[Your SendGrid API Key]`
   - `POSTMARK_API_TOKEN` = `[Your Postmark Server Token]`
   - `FROM_EMAIL` = `noreply@siteoptz.ai`
   - `MONGODB_URI` = `[Your MongoDB Atlas Connection String]`
   - `DB_NAME` = `siteoptz`
   - `API_SECRET_KEY` = `[Generate a secure random string]`
   - `NODE_ENV` = `production`
   - `GOOGLE_ANALYTICS_ID` = `[Your GA4 Measurement ID]`

2. **Optional Environment Variables:**
   - `REDIS_URL` = `[Your Redis connection string for rate limiting]`

## Required Services Setup

### 1. Email Service (Choose One)

#### Option A: SendGrid
1. Create account at https://sendgrid.com/
2. Generate API key in Settings > API Keys
3. Verify sender email address
4. Add API key to environment variables

#### Option B: Postmark
1. Create account at https://postmarkapp.com/
2. Create server and get Server Token
3. Verify sender email address
4. Add Server Token to environment variables

### 2. Database (MongoDB)

#### Option A: MongoDB Atlas (Recommended)
1. Create account at https://cloud.mongodb.com/
2. Create new cluster
3. Create database user
4. Get connection string
5. Replace `<password>` with your user password
6. Add connection string to `MONGODB_URI`

#### Option B: Local MongoDB
1. Install MongoDB locally
2. Use connection string: `mongodb://localhost:27017/siteoptz`

### 3. Domain Configuration

1. **Add Domain to Vercel:**
   ```bash
   # In Vercel dashboard
   Project Settings > Domains > Add siteoptz.ai
   ```

2. **DNS Configuration:**
   - Type: A Record
   - Name: @ (or blank)
   - Value: 76.76.19.61 (Vercel IP)
   
   OR
   
   - Type: CNAME
   - Name: @
   - Value: cname.vercel-dns.com

## Deployment Steps

### 1. Install Dependencies
```bash
npm install
```

### 2. Build and Test Locally
```bash
# Run development server
npm run dev

# Test build
npm run build

# Run tests
npm run test

# Check linting and types
npm run optimize
```

### 3. Deploy to Vercel

#### Method A: Vercel CLI
```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Deploy
vercel --prod
```

#### Method B: Git Integration
1. Push code to GitHub repository
2. Connect repository to Vercel
3. Configure environment variables in Vercel dashboard
4. Deploy automatically on push

### 4. Post-Deployment Verification

1. **Check Domain:**
   - Visit https://siteoptz.ai
   - Verify all pages load correctly

2. **Test Email Capture:**
   - Fill out pricing calculator form
   - Check email delivery

3. **Verify SEO:**
   ```bash
   # Test meta tags
   curl -s https://siteoptz.ai | grep -i "meta\|title"
   
   # Check structured data
   # Use Google's Rich Results Test
   ```

4. **Performance Check:**
   - Run Lighthouse audit
   - Check Core Web Vitals

## Monitoring and Analytics

### 1. Set up Google Analytics
1. Create GA4 property
2. Add Measurement ID to environment variables
3. Verify tracking in GA4 dashboard

### 2. Set up Search Console
1. Add property for siteoptz.ai
2. Verify domain ownership
3. Submit sitemap: https://siteoptz.ai/sitemap.xml

### 3. Uptime Monitoring
Consider setting up:
- Vercel Analytics (built-in)
- External monitoring service
- Error tracking (Sentry, LogRocket)

## Troubleshooting

### Common Issues

1. **Email Not Sending:**
   - Check API keys are correct
   - Verify sender email is verified
   - Check rate limits

2. **Database Connection Failed:**
   - Verify MongoDB URI format
   - Check network access in MongoDB Atlas
   - Verify database user permissions

3. **Build Failures:**
   - Check Node.js version (18+)
   - Clear build cache: `npm run clean`
   - Check for TypeScript errors: `npm run type-check`

4. **Domain Not Working:**
   - Check DNS propagation (can take 24-48 hours)
   - Verify Vercel domain configuration
   - Check domain registrar settings

### Environment Variables Checklist

Before deployment, ensure all required variables are set:

- [ ] `NEXT_PUBLIC_BASE_URL`
- [ ] `EMAIL_PROVIDER`
- [ ] Email service API key (`SENDGRID_API_KEY` or `POSTMARK_API_TOKEN`)
- [ ] `FROM_EMAIL`
- [ ] `MONGODB_URI`
- [ ] `API_SECRET_KEY`
- [ ] `NODE_ENV`

## Security Considerations

1. **API Keys:**
   - Never commit API keys to repository
   - Rotate keys regularly
   - Use different keys for development/production

2. **Database:**
   - Enable authentication
   - Use connection string with credentials
   - Restrict network access

3. **Rate Limiting:**
   - Email capture API has built-in rate limiting
   - Consider adding Redis for production
   - Monitor for abuse

## Performance Optimization

1. **Images:**
   - All images are optimized via Next.js
   - WebP/AVIF formats supported
   - CDN delivery via Vercel

2. **Caching:**
   - Static assets cached for 1 year
   - API responses cached for 1 minute
   - Data files cached for 24 hours

3. **Bundle Size:**
   - Automatic code splitting
   - Tree shaking enabled
   - Bundle analysis available: `npm run analyze`

## Backup and Recovery

1. **Database Backups:**
   - MongoDB Atlas: Automatic backups enabled
   - Local MongoDB: Set up regular backups

2. **Code Repository:**
   - Always use version control
   - Tag releases for easy rollback

3. **Environment Variables:**
   - Keep secure backup of all environment variables
   - Document any changes

## Support

For deployment issues:
1. Check Vercel deployment logs
2. Review this documentation
3. Check GitHub issues
4. Contact support team

---

Last Updated: $(date)
Deployment Version: 1.0.0