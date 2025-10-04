# Grafana API Key Setup Guide

## Finding/Creating API Key in Grafana

### Method 1: Through Grafana UI (Recommended)

1. **Login to Grafana**
   - Default: http://localhost:3000
   - Default credentials: admin/admin

2. **Navigate to API Keys**
   - Click the gear icon (⚙️) in left sidebar → **Configuration**
   - Select **API Keys**
   - Or directly go to: http://localhost:3000/org/apikeys

3. **Create New API Key**
   - Click **"Add API key"** or **"New API Key"**
   - Fill in:
     - **Key name**: `siteoptz-integration`
     - **Role**: `Admin` (for full access) or `Editor` (for dashboard management)
     - **Time to live**: Leave empty for no expiration or set desired duration
   - Click **"Add"**

4. **Copy the API Key**
   - **IMPORTANT**: Copy the key immediately - it won't be shown again!
   - The key will look like: `eyJrIjoiT0tTcGFUbGFRZHVBNTdUcmJaOWJnMUlpR0ZIbWFONmFUMjAzNDFsNTIiLCJuIjoic2l0ZW9wdHotaW50ZWdyYXRpb24iLCJpZCI6MX0=`

### Method 2: Through Grafana CLI

```bash
# SSH into your Grafana server or run locally
grafana-cli admin api-keys create \
  --name "siteoptz-integration" \
  --role Admin \
  --seconds 0  # 0 means no expiration
```

### Method 3: Using Service Account (Grafana 9+)

1. **Navigate to Service Accounts**
   - Configuration → Service accounts
   - Or: http://localhost:3000/org/serviceaccounts

2. **Create Service Account**
   - Click **"Add service account"**
   - Name: `siteoptz-service`
   - Role: `Admin` or `Editor`

3. **Generate Token**
   - Click on the service account
   - Go to **"Tokens"** tab
   - Click **"Add token"**
   - Copy the generated token

## Update Your Environment Variables

Once you have the API key, update `.env.local`:

```env
# Grafana Configuration
GRAFANA_API_KEY=eyJrIjoiT0tTcGFUbGFRZHVBNTdUcmJaOWJnMUlpR0ZIbWFONmFUMjAzNDFsNTIiLCJuIjoic2l0ZW9wdHotaW50ZWdyYXRpb24iLCJpZCI6MX0=
NEXT_PUBLIC_GRAFANA_URL=http://localhost:3000  # Or your Grafana URL
GRAFANA_DEFAULT_DASHBOARD_ID=siteoptz-analytics
```

## Verify API Key Works

Test your API key with curl:

```bash
# Test API key
curl -H "Authorization: Bearer YOUR_API_KEY_HERE" \
  http://localhost:3000/api/org

# Should return organization info if successful
```

## Common Grafana URLs

- **Local Grafana**: http://localhost:3000
- **Docker Grafana**: http://localhost:3000 or http://grafana:3000
- **Cloud Grafana**: https://YOUR_INSTANCE.grafana.net

## Troubleshooting

### API Key Not Working
- Check role permissions (needs at least Editor for dashboard access)
- Verify Grafana URL is correct
- Ensure no proxy/firewall blocking requests

### Cannot Find API Keys Menu
- You need Admin privileges in Grafana
- API Keys might be disabled in grafana.ini config

### Using Grafana Cloud
- API URL: `https://YOUR_INSTANCE.grafana.net`
- Need to use Cloud API tokens from: https://grafana.com/orgs/YOUR_ORG/api-keys

## Security Best Practices

1. **Never commit API keys to Git**
   - Keep them in `.env.local` only
   - Add `.env.local` to `.gitignore`

2. **Use appropriate roles**
   - `Viewer`: Read-only dashboard access
   - `Editor`: Create/edit dashboards
   - `Admin`: Full access (use sparingly)

3. **Set expiration dates**
   - For production, set reasonable expiration
   - Rotate keys regularly

4. **Restrict by IP if possible**
   - In Grafana Cloud, you can restrict API key usage by IP