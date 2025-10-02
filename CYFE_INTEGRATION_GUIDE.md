# Cyfe.com White Label API Integration Guide

## 🎯 **Project Transition: From Custom Build to Cyfe.com**

After encountering persistent hydration errors and complexity issues with the custom Marketing ROI dashboard, we're transitioning to **Cyfe.com's white label API solution** for a more robust and reliable dashboard platform.

## 🚀 **Why Cyfe.com?**

### **Benefits:**
- ✅ **No Hydration Issues** - Fully hosted solution eliminates React hydration problems
- ✅ **White Label Ready** - Custom branding with your logo, domain, and colors
- ✅ **Proven Platform** - Established dashboard solution with 10+ years experience
- ✅ **Easy Integration** - Simple REST API for data pushing
- ✅ **Client Management** - Built-in SSO and client provisioning
- ✅ **Scalable** - Handle multiple clients and dashboards
- ✅ **Cost Effective** - $190/month for 10 clients ($19/client)

### **Features:**
- 📊 **Custom Data Sources** - Push API for your marketing data
- 📈 **Automated Reports** - Scheduled email reports in multiple formats
- 🔔 **Alerts & Monitoring** - Email/SMS alerts for KPI thresholds
- 🎨 **Embedded Analytics** - Embed dashboards or widgets into existing platforms
- 👥 **Client Management** - Separate dashboards per client with SSO

## 📋 **Implementation Plan**

### **Phase 1: Setup & Configuration**
1. **Sign up for Cyfe Agency Plan** ($190/month)
2. **Configure white label settings:**
   - Upload SiteOptz logo
   - Set custom domain (dashboard.siteoptz.ai)
   - Configure brand colors to match SiteOptz theme
   - Set up email templates

### **Phase 2: Data Integration**
1. **Set up Push API endpoints** for marketing data:
   ```javascript
   // Example: Push Google Ads data to Cyfe
   const pushDataToCyfe = async (data) => {
     const response = await fetch('https://api.cyfe.com/widgets/push', {
       method: 'POST',
       headers: {
         'Authorization': 'Bearer YOUR_API_KEY',
         'Content-Type': 'application/json'
       },
       body: JSON.stringify({
         widget_id: 'YOUR_WIDGET_ID',
         data: data
       })
     });
     return response.json();
   };
   ```

2. **Create marketing data widgets:**
   - Google Ads performance metrics
   - Meta Ads campaign data
   - TikTok Ads analytics
   - Google Analytics website data
   - LinkedIn/Twitter campaign metrics
   - ROI calculations and insights

### **Phase 3: Dashboard Templates**
1. **Create marketing ROI dashboard templates:**
   - Overview dashboard with key metrics
   - Platform-specific dashboards (Google Ads, Meta, etc.)
   - Campaign performance dashboards
   - ROI analysis dashboards
   - AI insights integration (via custom widgets)

2. **Configure automated reports:**
   - Daily performance summaries
   - Weekly ROI reports
   - Monthly campaign analysis
   - Quarterly business reviews

### **Phase 4: Client Integration**
1. **Update SiteOptz Pro dashboard** to redirect to Cyfe:
   ```typescript
   // pages/dashboard/pro/index.tsx
   export default function ProDashboard() {
     return (
       <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black">
         <CleanDashboardHeader userPlan={userPlan} />
         <div className="container mx-auto px-4 py-8">
           <div className="max-w-7xl mx-auto">
             <div className="bg-gray-800 rounded-xl p-8 text-center">
               <h1 className="text-3xl font-bold text-white mb-6">
                 Marketing ROI Dashboard
               </h1>
               <p className="text-gray-400 mb-8">
                 Your advanced marketing analytics dashboard is now powered by Cyfe.
               </p>
               <a
                 href={`https://dashboard.siteoptz.ai/login?email=${userEmail}&token=${ssoToken}`}
                 className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
               >
                 Access Dashboard
               </a>
             </div>
           </div>
         </div>
       </div>
     );
   }
   ```

2. **Implement SSO integration** for seamless user experience
3. **Set up client provisioning** for new Pro plan users

## 🔧 **Technical Integration**

### **Push API Implementation**
```javascript
// lib/cyfe-api.js
export class CyfeAPI {
  constructor(apiKey, baseUrl = 'https://api.cyfe.com') {
    this.apiKey = apiKey;
    this.baseUrl = baseUrl;
  }

  async pushData(widgetId, data) {
    const response = await fetch(`${this.baseUrl}/widgets/push`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${this.apiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        widget_id: widgetId,
        data: data,
        timestamp: new Date().toISOString()
      })
    });
    
    if (!response.ok) {
      throw new Error(`Cyfe API error: ${response.statusText}`);
    }
    
    return response.json();
  }

  async pushGoogleAdsData(campaigns, metrics) {
    const data = {
      campaigns: campaigns.map(campaign => ({
        name: campaign.name,
        spend: campaign.metrics.cost,
        revenue: campaign.metrics.conversions_value,
        roi: campaign.metrics.conversions_value / campaign.metrics.cost,
        conversions: campaign.metrics.conversions,
        clicks: campaign.metrics.clicks,
        impressions: campaign.metrics.impressions
      })),
      summary: {
        total_spend: metrics.total_spend,
        total_revenue: metrics.total_revenue,
        total_roas: metrics.total_roas,
        total_conversions: metrics.total_conversions
      }
    };

    return this.pushData('google-ads-widget', data);
  }
}
```

### **SSO Integration**
```javascript
// lib/cyfe-sso.js
export async function generateSSOToken(userEmail, userId) {
  // Generate secure token for Cyfe SSO
  const payload = {
    email: userEmail,
    user_id: userId,
    timestamp: Date.now(),
    exp: Math.floor(Date.now() / 1000) + (60 * 60) // 1 hour expiry
  };
  
  return jwt.sign(payload, process.env.CYFE_SSO_SECRET);
}

export function getCyfeDashboardUrl(userEmail, ssoToken) {
  return `https://dashboard.siteoptz.ai/login?email=${encodeURIComponent(userEmail)}&token=${ssoToken}`;
}
```

## 📊 **Dashboard Templates**

### **1. Marketing ROI Overview**
- Total spend across all platforms
- Total revenue and ROAS
- Conversion rates and costs
- Top performing campaigns
- Platform comparison charts

### **2. Google Ads Dashboard**
- Campaign performance metrics
- Keyword performance
- Ad group analytics
- Budget utilization
- Quality score trends

### **3. Meta Ads Dashboard**
- Campaign ROAS by objective
- Audience performance
- Creative performance
- Budget pacing
- Frequency analysis

### **4. AI Insights Dashboard**
- Performance recommendations
- Budget optimization suggestions
- Keyword expansion opportunities
- Audience targeting insights
- Competitive analysis

## 💰 **Pricing & ROI**

### **Cyfe Costs:**
- **Agency Plan:** $190/month
- **10 Clients included:** $19/client
- **Additional clients:** $19/client
- **No setup fees or hidden costs**

### **Benefits:**
- ✅ **Faster Time to Market** - No development time for dashboard
- ✅ **Reduced Maintenance** - Cyfe handles all updates and fixes
- ✅ **Better User Experience** - Proven, reliable platform
- ✅ **Scalable Solution** - Easy to add new clients
- ✅ **Professional Appearance** - White-labeled branding

## 🚀 **Next Steps**

1. **Schedule Cyfe Demo** - Contact Cyfe sales team
2. **Set up Agency Account** - Sign up for $190/month plan
3. **Configure White Label** - Set up branding and domain
4. **Implement Push API** - Connect marketing data sources
5. **Update SiteOptz Integration** - Redirect Pro users to Cyfe
6. **Launch to Clients** - Start provisioning client dashboards

## 📞 **Contact Information**

- **Cyfe Sales:** Schedule demo at cyfe.com
- **Documentation:** https://www.cyfe.com/api/
- **Support:** Available through Cyfe platform

---

**This transition will provide a more robust, scalable, and professional solution for your marketing ROI dashboard needs while eliminating the technical complexity and hydration issues we encountered with the custom build.**
