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

<function_calls>
<invoke name="TodoWrite">
<parameter name="todos">[{"content": "Create Azure Power BI Embedded setup", "status": "pending", "activeForm": "Setting up Azure Power BI"}, {"content": "Configure environment variables for production", "status": "pending", "activeForm": "Configuring environment"}, {"content": "Update Next.js configuration for subdomain", "status": "pending", "activeForm": "Updating Next.js config"}, {"content": "Install required npm dependencies", "status": "in_progress", "activeForm": "Installing dependencies"}, {"content": "Deploy to Vercel with new configuration", "status": "pending", "activeForm": "Deploying to production"}, {"content": "Test Power BI integration on subdomain", "status": "pending", "activeForm": "Testing integration"}]