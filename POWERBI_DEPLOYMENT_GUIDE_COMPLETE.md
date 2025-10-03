# 🚀 Power BI Integration Deployment Guide for optz.siteoptz.ai

## 📋 **Prerequisites**
- Azure account with admin permissions
- Vercel deployment access
- Power BI Pro license (minimum)
- Marketing platform API access (Google Ads, Meta, etc.)

---

## **Phase 1: Azure Power BI Embedded Setup**

### **Step 1.1: Create Azure Resources**

```bash
# Login to Azure CLI
az login

# Create resource group
az group create --name siteoptz-dashboard --location eastus

# Create Power BI Embedded capacity (A1 SKU = $750/month)
az powerbi embedded-capacity create \
  --resource-group siteoptz-dashboard \
  --name siteoptz-capacity \
  --sku A1 \
  --location eastus \
  --administrator your-email@domain.com
```

### **Step 1.2: Register Azure Application**

1. **Go to Azure Portal** → App Registrations → New Registration
2. **Name:** `SiteOptz Power BI Integration`
3. **Supported account types:** Single tenant
4. **Redirect URI:** `https://optz.siteoptz.ai/api/auth/callback/azure-ad`

### **Step 1.3: Configure App Permissions**

```bash
# Add Power BI API permissions
az ad app permission add \
  --id YOUR_APP_ID \
  --api 00000009-0000-0000-c000-000000000000 \
  --api-permissions \
    "Dataset.ReadWrite.All=Role" \
    "Report.ReadWrite.All=Role" \
    "Workspace.ReadWrite.All=Role"

# Grant admin consent
az ad app permission admin-consent --id YOUR_APP_ID
```

### **Step 1.4: Create Client Secret**

```bash
# Create app secret (save this value!)
az ad app credential reset \
  --id YOUR_APP_ID \
  --display-name "SiteOptz Power BI Secret"
```

---

## **Phase 2: Power BI Workspace Setup**

### **Step 2.1: Create Power BI Workspace**

1. **Go to Power BI Service** (app.powerbi.com)
2. **Create Workspace** → `SiteOptz Analytics`
3. **Assign to Embedded Capacity:**
   - Workspace Settings → Premium → Assign to `siteoptz-capacity`

### **Step 2.2: Create Sample Reports**

Create these reports in Power BI Desktop and publish to workspace:

1. **Marketing Overview Dashboard**
   - Campaign performance metrics
   - ROI analysis
   - Multi-platform comparison

2. **Advanced Analytics Report** (Premium)
   - Predictive insights
   - Custom metrics
   - Detailed attribution

3. **Executive Dashboard** (Enterprise)
   - High-level KPIs
   - Strategic insights
   - Custom branding

### **Step 2.3: Configure Row-Level Security**

```sql
-- Create RLS rules in Power BI Desktop
[ClientID] = USERNAME()

-- Or for multi-tenant:
[ClientID] = LOOKUPVALUE(UserMapping[ClientID], UserMapping[Email], USERNAME())
```

---

## **Phase 3: Install Dependencies**

### **Step 3.1: Install NPM Packages**

```bash
# Install Power BI and Azure dependencies
npm install powerbi-client powerbi-client-react @azure/msal-browser @azure/msal-react

# Install additional marketing API clients (optional)
npm install google-ads-api facebook-nodejs-business-sdk @google-analytics/data
```

---

## **Phase 4: Environment Configuration**

### **Step 4.1: Add Environment Variables to Vercel**

```bash
# Set Power BI variables in Vercel
vercel env add POWERBI_CLIENT_ID production
vercel env add POWERBI_CLIENT_SECRET production
vercel env add POWERBI_TENANT_ID production
vercel env add POWERBI_WORKSPACE_ID production
vercel env add POWERBI_MARKETING_DATASET_ID production
vercel env add POWERBI_MARKETING_REPORT_ID production

# Set Azure variables
vercel env add AZURE_SUBSCRIPTION_ID production
vercel env add AZURE_RESOURCE_GROUP production
vercel env add AZURE_POWERBI_CAPACITY_NAME production
```

### **Step 4.2: Update Local Environment**

```bash
# Copy example environment file
cp .env.example .env.local

# Edit .env.local with your actual values:
POWERBI_CLIENT_ID=12345678-1234-1234-1234-123456789012
POWERBI_CLIENT_SECRET=your_client_secret_here
POWERBI_TENANT_ID=your_tenant_id_here
POWERBI_WORKSPACE_ID=your_workspace_id_here
POWERBI_MARKETING_DATASET_ID=your_dataset_id_here
POWERBI_MARKETING_REPORT_ID=your_report_id_here
```

---

## **Phase 5: Update Application Configuration**

### **Step 5.1: Update Next.js Config for Subdomain**

The `next.config.js` already has subdomain rewrites configured. Verify the configuration:

```javascript
// In next.config.js - already configured
async rewrites() {
  return {
    beforeFiles: [
      {
        source: '/:path*',
        destination: '/optz/:path*', // Routes to /pages/optz/ directory
        has: [
          {
            type: 'host',
            value: 'optz.siteoptz.ai',
          },
        ],
      },
    ],
  };
}
```

### **Step 5.2: Create Subdomain-Specific Dashboard Page**

```bash
# Create optz-specific dashboard page
mkdir -p pages/optz
cp pages/premium-dashboard.tsx pages/optz/premium-dashboard.tsx
```

---

## **Phase 6: Deployment Steps**

### **Step 6.1: Build and Test Locally**

```bash
# Install dependencies (already done)
npm install

# Build the application
npm run build

# Test locally
npm run dev

# Visit http://localhost:3000/premium-dashboard to test
```

### **Step 6.2: Commit and Deploy**

```bash
# Add new files to git
git add .

# Commit changes
git commit -m "Add Power BI Embedded integration for premium dashboard

🚀 Features:
- Power BI service integration with Azure AD authentication
- Premium dashboard with embedded reports
- Plan-based access control (Pro/Premium/Enterprise)
- Marketing data pipeline for multi-platform analytics
- White-label branding service
- Subdomain support for optz.siteoptz.ai

📊 Generated with Claude Code"

# Push to deploy
git push origin main
```

### **Step 6.3: Verify Deployment**

```bash
# Check deployment status
vercel ls

# Test the subdomain
curl -I https://optz.siteoptz.ai/premium-dashboard
```

---

## **Phase 7: Testing and Validation**

### **Step 7.1: Test Authentication Flow**

1. Visit `https://optz.siteoptz.ai/premium-dashboard`
2. Ensure redirects to login if not authenticated
3. Test with different user plan levels
4. Verify proper access restrictions

### **Step 7.2: Test Power BI Integration**

1. **Mock Data Test:**
   ```bash
   # Test API endpoints
   curl -X POST https://optz.siteoptz.ai/api/powerbi/embed-token \
     -H "Content-Type: application/json" \
     -d '{"reportId":"test-report-id"}'
   ```

2. **Production Data Test:**
   - Connect real Power BI workspace
   - Test with actual marketing data
   - Verify row-level security works

### **Step 7.3: Performance Testing**

```bash
# Test dashboard loading times
npm install -g lighthouse

lighthouse https://optz.siteoptz.ai/premium-dashboard \
  --only-categories=performance \
  --chrome-flags="--headless"
```

---

## **Phase 8: Production Configuration**

### **Step 8.1: Configure Marketing APIs**

For production marketing data integration:

1. **Google Ads API:**
   - Get developer token
   - Set up OAuth2 credentials
   - Configure refresh tokens

2. **Meta Marketing API:**
   - Create Meta app
   - Get long-lived access token
   - Set up webhook endpoints

3. **Google Analytics Data API:**
   - Enable GA4 API
   - Create service account
   - Configure property access

### **Step 8.2: Set Up Data Refresh Schedule**

```javascript
// Add to vercel.json for scheduled functions
{
  "crons": [
    {
      "path": "/api/powerbi/refresh-data",
      "schedule": "0 */6 * * *"
    }
  ]
}
```

### **Step 8.3: Configure Monitoring**

```bash
# Add monitoring to Vercel
vercel --prod

# Set up alerts for:
# - Power BI API failures
# - Authentication errors
# - Data refresh failures
# - Performance degradation
```

---

## **Phase 9: User Access Management**

### **Step 9.1: Update User Plan Management**

Ensure your user management system can:
- Assign plan levels (pro/premium/enterprise)
- Restrict dashboard access by plan
- Handle plan upgrades/downgrades
- Track usage analytics

### **Step 9.2: Create Admin Dashboard**

Create an admin interface to:
- Manage Power BI report assignments
- Monitor user activity
- Configure data sources
- View system health

---

## **Phase 10: Launch Checklist**

### **Pre-Launch**
- [ ] Azure Power BI Embedded capacity is running
- [ ] All environment variables configured in Vercel
- [ ] Power BI reports published to workspace
- [ ] Row-level security configured
- [ ] Authentication flow tested
- [ ] Plan-based access restrictions verified
- [ ] Performance benchmarks met
- [ ] Error handling tested
- [ ] Backup and recovery procedures in place

### **Launch Day**
- [ ] Deploy final version to production
- [ ] Test all user flows on optz.siteoptz.ai
- [ ] Verify SSL certificate working
- [ ] Monitor error logs
- [ ] Check performance metrics
- [ ] Test with real user accounts
- [ ] Validate billing integration

### **Post-Launch**
- [ ] Monitor Azure costs and usage
- [ ] Track user adoption metrics
- [ ] Gather user feedback
- [ ] Optimize performance based on real usage
- [ ] Plan for scaling based on demand

---

## **🔧 Troubleshooting**

### **Common Issues**

1. **Power BI Embed Token Errors**
   ```bash
   # Check Azure app permissions
   az ad app permission list --id YOUR_APP_ID
   
   # Verify capacity is running
   az powerbi embedded-capacity show --resource-group siteoptz-dashboard --name siteoptz-capacity
   ```

2. **Subdomain Not Working**
   ```bash
   # Check DNS resolution
   nslookup optz.siteoptz.ai
   
   # Verify Vercel alias
   vercel alias ls | grep optz
   ```

3. **Authentication Issues**
   - Verify NEXTAUTH_URL is set correctly
   - Check Azure app redirect URIs
   - Ensure session configuration is correct

### **Performance Optimization**

1. **Reduce Bundle Size**
   ```bash
   # Analyze bundle
   npm install -g @next/bundle-analyzer
   ANALYZE=true npm run build
   ```

2. **Optimize Power BI Loading**
   - Use report bookmarks for faster initial loads
   - Implement lazy loading for multiple reports
   - Cache embed tokens appropriately

---

## **💰 Cost Estimation**

### **Monthly Costs**
- **Power BI Embedded A1:** $750/month
- **Azure compute:** $50-100/month
- **Vercel Pro:** $20/month
- **Total:** ~$820-870/month

### **Revenue Projection**
- **10 Premium users @ $197/month:** $1,970
- **5 Enterprise users @ $497/month:** $2,485
- **Total Revenue:** $4,455/month
- **Net Profit:** ~$3,585/month

---

## **🎯 Success Metrics**

- **User Adoption:** 60% of pro users use dashboard within 30 days
- **Engagement:** Average session >5 minutes
- **Performance:** Page load <3 seconds
- **Reliability:** 99.9% uptime
- **Revenue:** 25% increase in pro plan conversions

---

## **📞 Support Contacts**

- **Azure Support:** Azure Portal → Help + Support
- **Power BI Support:** Power BI Admin Portal → Help
- **Vercel Support:** vercel.com/support
- **Emergency:** Create incident in Azure Portal

This deployment guide provides a complete roadmap for launching Power BI integration on optz.siteoptz.ai. Follow each phase sequentially for best results.