# Cyfe API Integration Steps for optz.siteoptz.ai

## 🎯 **Goal: Link Cyfe API to optz.siteoptz.ai for Widget Access**

This guide provides step-by-step instructions to integrate Cyfe's white label API with your `optz.siteoptz.ai` subdomain for seamless widget access.

## 📋 **Prerequisites**

1. **Cyfe Agency Account** ($190/month)
2. **optz.siteoptz.ai subdomain** already configured
3. **SSL certificate** for optz.siteoptz.ai
4. **Cyfe API credentials** (API key and widget IDs)

## 🚀 **Step 1: Set Up Cyfe White Label Configuration**

### **1.1 Configure White Label Settings**
```bash
# Login to Cyfe Agency Dashboard
# Navigate to: Settings > White Label
```

**Configure the following:**
- **Domain:** `optz.siteoptz.ai`
- **Logo:** Upload SiteOptz logo
- **Brand Colors:** 
  - Primary: `#3B82F6` (Blue)
  - Secondary: `#1F2937` (Dark Gray)
  - Accent: `#10B981` (Green)
- **Email Templates:** Customize with SiteOptz branding

### **1.2 Get API Credentials**
```javascript
// From Cyfe Dashboard > API Settings
const CYFE_CONFIG = {
  apiKey: 'your-cyfe-api-key',
  baseUrl: 'https://api.cyfe.com',
  whiteLabelDomain: 'optz.siteoptz.ai',
  clientId: 'your-client-id'
};
```

## 🔧 **Step 2: Create API Integration Layer**

### **2.1 Create Cyfe API Service**
```javascript
// lib/cyfe-api-service.js
export class CyfeAPIService {
  constructor() {
    this.apiKey = process.env.CYFE_API_KEY;
    this.baseUrl = process.env.CYFE_BASE_URL || 'https://api.cyfe.com';
    this.whiteLabelDomain = process.env.CYFE_WHITE_LABEL_DOMAIN || 'optz.siteoptz.ai';
  }

  // Get all available widgets
  async getAllWidgets() {
    const response = await fetch(`${this.baseUrl}/widgets`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${this.apiKey}`,
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch widgets: ${response.statusText}`);
    }

    return response.json();
  }

  // Get specific widget data
  async getWidgetData(widgetId) {
    const response = await fetch(`${this.baseUrl}/widgets/${widgetId}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${this.apiKey}`,
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch widget ${widgetId}: ${response.statusText}`);
    }

    return response.json();
  }

  // Push data to widget
  async pushDataToWidget(widgetId, data) {
    const response = await fetch(`${this.baseUrl}/widgets/${widgetId}/push`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${this.apiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        data: data,
        timestamp: new Date().toISOString()
      })
    });

    if (!response.ok) {
      throw new Error(`Failed to push data to widget ${widgetId}: ${response.statusText}`);
    }

    return response.json();
  }

  // Generate SSO token for user
  async generateSSOToken(userEmail, userId) {
    const response = await fetch(`${this.baseUrl}/auth/sso/generate`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${this.apiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: userEmail,
        user_id: userId,
        domain: this.whiteLabelDomain
      })
    });

    if (!response.ok) {
      throw new Error(`Failed to generate SSO token: ${response.statusText}`);
    }

    return response.json();
  }
}
```

### **2.2 Create Widget Management API Routes**
```javascript
// pages/api/cyfe/widgets.js
import { CyfeAPIService } from '@/lib/cyfe-api-service';

const cyfeService = new CyfeAPIService();

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const widgets = await cyfeService.getAllWidgets();
    res.status(200).json(widgets);
  } catch (error) {
    console.error('Error fetching widgets:', error);
    res.status(500).json({ error: 'Failed to fetch widgets' });
  }
}
```

```javascript
// pages/api/cyfe/widgets/[widgetId].js
import { CyfeAPIService } from '@/lib/cyfe-api-service';

const cyfeService = new CyfeAPIService();

export default async function handler(req, res) {
  const { widgetId } = req.query;

  if (req.method === 'GET') {
    try {
      const widgetData = await cyfeService.getWidgetData(widgetId);
      res.status(200).json(widgetData);
    } catch (error) {
      console.error(`Error fetching widget ${widgetId}:`, error);
      res.status(500).json({ error: 'Failed to fetch widget data' });
    }
  } else if (req.method === 'POST') {
    try {
      const result = await cyfeService.pushDataToWidget(widgetId, req.body);
      res.status(200).json(result);
    } catch (error) {
      console.error(`Error pushing data to widget ${widgetId}:`, error);
      res.status(500).json({ error: 'Failed to push data to widget' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
```

```javascript
// pages/api/cyfe/sso/generate.js
import { CyfeAPIService } from '@/lib/cyfe-api-service';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/pages/api/auth/[...nextauth]';

const cyfeService = new CyfeAPIService();

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const session = await getServerSession(req, res, authOptions);
    
    if (!session) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const ssoData = await cyfeService.generateSSOToken(
      session.user.email,
      session.user.id || session.user.email
    );

    res.status(200).json(ssoData);
  } catch (error) {
    console.error('Error generating SSO token:', error);
    res.status(500).json({ error: 'Failed to generate SSO token' });
  }
}
```

## 🌐 **Step 3: Create optz.siteoptz.ai Dashboard Interface**

### **3.1 Create Widget Dashboard Page**
```javascript
// pages/optz/dashboard.tsx
import React, { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';

export default function OptzDashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [widgets, setWidgets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [ssoToken, setSsoToken] = useState(null);

  useEffect(() => {
    if (status === 'loading') return;
    
    if (!session) {
      router.push('/api/auth/signin');
      return;
    }

    // Fetch widgets and generate SSO token
    const fetchData = async () => {
      try {
        // Generate SSO token
        const ssoResponse = await fetch('/api/cyfe/sso/generate', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          }
        });
        
        if (ssoResponse.ok) {
          const ssoData = await ssoResponse.json();
          setSsoToken(ssoData.token);
        }

        // Fetch available widgets
        const widgetsResponse = await fetch('/api/cyfe/widgets');
        if (widgetsResponse.ok) {
          const widgetsData = await widgetsResponse.json();
          setWidgets(widgetsData);
        }
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [session, status, router]);

  if (status === 'loading' || loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black flex items-center justify-center">
        <div className="text-white text-xl">Loading Dashboard...</div>
      </div>
    );
  }

  if (!session) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-white mb-2">
              Marketing ROI Dashboard
            </h1>
            <p className="text-gray-400">
              Powered by SiteOptz Analytics
            </p>
          </div>

          {/* Widget Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {widgets.map((widget) => (
              <div key={widget.id} className="bg-gray-800 rounded-lg p-6 border border-gray-700">
                <h3 className="text-lg font-semibold text-white mb-2">
                  {widget.name}
                </h3>
                <p className="text-gray-400 text-sm mb-4">
                  {widget.description}
                </p>
                <div className="flex items-center justify-between">
                  <span className={`px-2 py-1 rounded text-xs font-medium ${
                    widget.status === 'active' 
                      ? 'bg-green-900/20 text-green-400 border border-green-500/30'
                      : 'bg-red-900/20 text-red-400 border border-red-500/30'
                  }`}>
                    {widget.status}
                  </span>
                  <button
                    onClick={() => window.open(`https://optz.siteoptz.ai/widget/${widget.id}?token=${ssoToken}`, '_blank')}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
                  >
                    View Widget
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Full Dashboard Access */}
          <div className="bg-gray-800 rounded-lg p-8 border border-gray-700">
            <h2 className="text-2xl font-bold text-white mb-4">
              Full Dashboard Access
            </h2>
            <p className="text-gray-400 mb-6">
              Access your complete marketing analytics dashboard with all widgets and reports.
            </p>
            <button
              onClick={() => window.open(`https://optz.siteoptz.ai/dashboard?token=${ssoToken}`, '_blank')}
              className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all"
            >
              Open Full Dashboard
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
```

### **3.2 Create Widget Viewer Component**
```javascript
// components/optz/WidgetViewer.jsx
import React, { useState, useEffect } from 'react';

export default function WidgetViewer({ widgetId, token }) {
  const [widgetData, setWidgetData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWidgetData = async () => {
      try {
        const response = await fetch(`/api/cyfe/widgets/${widgetId}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (!response.ok) {
          throw new Error('Failed to fetch widget data');
        }

        const data = await response.json();
        setWidgetData(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchWidgetData();
  }, [widgetId, token]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-white">Loading widget...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-red-400">Error: {error}</div>
      </div>
    );
  }

  return (
    <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
      <h3 className="text-lg font-semibold text-white mb-4">
        {widgetData?.name || 'Widget'}
      </h3>
      <div className="widget-content">
        {/* Render widget content based on type */}
        {widgetData?.type === 'chart' && (
          <div className="h-64 bg-gray-700 rounded flex items-center justify-center">
            <span className="text-gray-400">Chart Widget</span>
          </div>
        )}
        {widgetData?.type === 'table' && (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-600">
                  {widgetData?.columns?.map((col, index) => (
                    <th key={index} className="text-left py-2 px-3 text-gray-300">
                      {col}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {widgetData?.data?.map((row, index) => (
                  <tr key={index} className="border-b border-gray-600">
                    {row.map((cell, cellIndex) => (
                      <td key={cellIndex} className="py-2 px-3 text-white">
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
```

## 🔐 **Step 4: Environment Configuration**

### **4.1 Update .env.local**
```bash
# Cyfe API Configuration
CYFE_API_KEY=your_cyfe_api_key_here
CYFE_BASE_URL=https://api.cyfe.com
CYFE_WHITE_LABEL_DOMAIN=optz.siteoptz.ai
CYFE_CLIENT_ID=your_client_id_here

# SSO Configuration
CYFE_SSO_SECRET=your_sso_secret_here
NEXTAUTH_URL=https://optz.siteoptz.ai
```

### **4.2 Update next.config.js**
```javascript
// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  // ... existing config
  
  async rewrites() {
    return [
      {
        source: '/api/cyfe/:path*',
        destination: 'https://api.cyfe.com/:path*'
      }
    ];
  },

  async headers() {
    return [
      {
        source: '/api/cyfe/:path*',
        headers: [
          {
            key: 'Access-Control-Allow-Origin',
            value: 'https://optz.siteoptz.ai'
          },
          {
            key: 'Access-Control-Allow-Methods',
            value: 'GET, POST, PUT, DELETE, OPTIONS'
          },
          {
            key: 'Access-Control-Allow-Headers',
            value: 'Content-Type, Authorization'
          }
        ]
      }
    ];
  }
};

module.exports = nextConfig;
```

## 🚀 **Step 5: Deployment Steps**

### **5.1 Deploy to Vercel**
```bash
# 1. Set environment variables in Vercel
vercel env add CYFE_API_KEY
vercel env add CYFE_BASE_URL
vercel env add CYFE_WHITE_LABEL_DOMAIN
vercel env add CYFE_CLIENT_ID
vercel env add CYFE_SSO_SECRET

# 2. Deploy the application
vercel --prod
```

### **5.2 Configure DNS**
```bash
# Ensure optz.siteoptz.ai points to your Vercel deployment
# DNS Record: CNAME optz.siteoptz.ai -> your-vercel-app.vercel.app
```

### **5.3 SSL Certificate**
```bash
# Vercel automatically handles SSL for custom domains
# Verify SSL is active at: https://optz.siteoptz.ai
```

## 📊 **Step 6: Widget Data Integration**

### **6.1 Marketing Data Widgets**
```javascript
// lib/marketing-widgets.js
export const MARKETING_WIDGETS = {
  GOOGLE_ADS_OVERVIEW: 'google-ads-overview-widget-id',
  GOOGLE_ADS_CAMPAIGNS: 'google-ads-campaigns-widget-id',
  META_ADS_OVERVIEW: 'meta-ads-overview-widget-id',
  META_ADS_CAMPAIGNS: 'meta-ads-campaigns-widget-id',
  TIKTOK_ADS_OVERVIEW: 'tiktok-ads-overview-widget-id',
  GOOGLE_ANALYTICS: 'google-analytics-widget-id',
  ROI_SUMMARY: 'roi-summary-widget-id',
  AI_INSIGHTS: 'ai-insights-widget-id'
};

export async function pushMarketingData(platform, data) {
  const cyfeService = new CyfeAPIService();
  const widgetId = MARKETING_WIDGETS[`${platform.toUpperCase()}_OVERVIEW`];
  
  if (!widgetId) {
    throw new Error(`No widget configured for platform: ${platform}`);
  }

  return cyfeService.pushDataToWidget(widgetId, data);
}
```

### **6.2 Scheduled Data Updates**
```javascript
// pages/api/cyfe/update-marketing-data.js
import { pushMarketingData } from '@/lib/marketing-widgets';
import { getGoogleAdsData } from '@/lib/google-ads-api';
import { getMetaAdsData } from '@/lib/meta-ads-api';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Update Google Ads data
    const googleAdsData = await getGoogleAdsData();
    await pushMarketingData('GOOGLE_ADS', googleAdsData);

    // Update Meta Ads data
    const metaAdsData = await getMetaAdsData();
    await pushMarketingData('META_ADS', metaAdsData);

    // Update other platforms...

    res.status(200).json({ 
      message: 'Marketing data updated successfully',
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Error updating marketing data:', error);
    res.status(500).json({ error: 'Failed to update marketing data' });
  }
}
```

## ✅ **Step 7: Testing & Verification**

### **7.1 Test API Endpoints**
```bash
# Test widget fetching
curl -X GET https://optz.siteoptz.ai/api/cyfe/widgets \
  -H "Authorization: Bearer YOUR_API_KEY"

# Test SSO token generation
curl -X POST https://optz.siteoptz.ai/api/cyfe/sso/generate \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_SESSION_TOKEN"

# Test data pushing
curl -X POST https://optz.siteoptz.ai/api/cyfe/widgets/WIDGET_ID \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -d '{"data": {"metric": "value"}}'
```

### **7.2 Verify Widget Access**
1. **Login to optz.siteoptz.ai**
2. **Navigate to dashboard**
3. **Click on individual widgets**
4. **Verify SSO authentication works**
5. **Test full dashboard access**

## 🎯 **Final Result**

After completing these steps, you'll have:

✅ **Fully integrated Cyfe API** with optz.siteoptz.ai  
✅ **White-labeled dashboard** with SiteOptz branding  
✅ **SSO authentication** for seamless user experience  
✅ **Individual widget access** through API endpoints  
✅ **Full dashboard access** with all widgets  
✅ **Automated data updates** from marketing platforms  
✅ **Scalable solution** for multiple clients  

**Access URLs:**
- **Dashboard:** https://optz.siteoptz.ai/dashboard
- **Individual Widget:** https://optz.siteoptz.ai/widget/{widgetId}
- **API Endpoints:** https://optz.siteoptz.ai/api/cyfe/*

This integration provides a professional, scalable marketing ROI dashboard solution without the technical complexity of custom development.

