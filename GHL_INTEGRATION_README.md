# GoHighLevel Integration with Cyfe White-Label Dashboards

## Overview
This integration automatically provisions Cyfe white-label dashboards when new contacts are created in GoHighLevel (GHL). Users receive auto-login links via email and can access their dashboards without any password prompts.

## Features

### 🚀 Automatic User Provisioning
- When GHL creates a contact → User automatically created in database
- Cyfe dashboards provisioned based on plan tags
- SSO token generated for passwordless access
- Welcome email sent with auto-login link

### 🏷️ Plan Mapping from GHL Tags
```
GHL Tag           → Plan      → Dashboards
"free-plan"       → Free      → 1 Basic Dashboard
"starter-plan"    → Starter   → 2 Dashboards (Basic + Marketing)
"pro-plan"        → Pro       → 4 Dashboards (Full Suite)
"enterprise-plan" → Enterprise → Unlimited Dashboards
```

### 🔐 Passwordless Auto-Login
- Click email link → Instantly logged in
- No password prompts
- 7-day token validity
- Automatic session persistence (24 hours)

## Setup Instructions

### 1. Configure Environment Variables
Copy `.env.ghl.example` to `.env.local` and fill in your values:

```bash
cp .env.ghl.example .env.local
```

Required variables:
- `GHL_API_KEY`: Your GoHighLevel API key
- `GHL_WEBHOOK_SECRET`: Secret for webhook signature verification
- `CYFE_API_KEY`: Your Cyfe API key
- `SENDGRID_API_KEY` or SMTP settings for emails

### 2. Set Up GHL Webhook

In your GoHighLevel account:

1. Go to **Settings → Webhooks**
2. Create new webhook with:
   - **URL**: `https://siteoptz.ai/api/webhooks/ghl/contact-created`
   - **Event**: `contact.created`
   - **Secret**: Use the same value as `GHL_WEBHOOK_SECRET`

### 3. Configure GHL Custom Fields

Add these custom fields to your GHL contacts (optional but recommended):
- `optz_user_id`: Text field (auto-populated)
- `optz_plan`: Text field (auto-populated)
- `optz_dashboard_count`: Number field (auto-populated)
- `optz_login_url`: URL field (auto-populated)

### 4. Set Up Contact Tags

Ensure your GHL workflows apply the correct plan tags:
- `free-plan`
- `starter-plan`
- `pro-plan`
- `enterprise-plan`

## Usage

### Automatic Flow

1. **Contact Created in GHL** (with appropriate plan tag)
   ↓
2. **Webhook Triggered** → `/api/webhooks/ghl/contact-created`
   ↓
3. **User Provisioned**:
   - Database user created
   - Cyfe dashboards created
   - SSO token generated
   ↓
4. **Email Sent** with auto-login link
   ↓
5. **User Clicks Link** → Instantly logged into dashboards

### Manual Testing

Test the webhook endpoint:
```bash
curl -X POST https://siteoptz.ai/api/webhooks/ghl/contact-created \
  -H "Content-Type: application/json" \
  -H "x-ghl-signature: your_signature" \
  -d '{
    "event": "contact.created",
    "data": {
      "id": "test-contact-id",
      "email": "test@example.com",
      "firstName": "John",
      "lastName": "Doe",
      "tags": ["pro-plan"]
    }
  }'
```

## Component Usage

### AutoLoginDashboard Component

Embed auto-login dashboards in your app:

```tsx
import { AutoLoginDashboard, DashboardPresets } from '@/components/dashboard/AutoLoginDashboard';

// Basic usage
<AutoLoginDashboard 
  dashboardId="advanced_analytics"
  height="600px"
  userEmail={session.user.email}
  plan="pro"
/>

// Using presets
<DashboardPresets.AdvancedAnalytics 
  userEmail={session.user.email}
  autoRefresh={true}
  refreshInterval={300}
/>
```

### Generate Auto-Login URLs

```typescript
import { CyfeSSOMiddleware } from '@/lib/cyfe-sso-middleware';

// Generate auto-login URL
const loginUrl = CyfeSSOMiddleware.generateCyfeLoginUrl({
  email: 'user@example.com',
  plan: 'pro',
  dashboardId: 'advanced_analytics'
});
// Result: https://optz.siteoptz.ai/sso/login?sso_token=...&auto_login=true
```

## Email Templates

The system sends beautifully formatted HTML emails with:
- Welcome message based on plan
- Auto-login button (no password required)
- List of provisioned dashboards
- Backup credentials (optional)
- Security information
- Next steps guide

## Security Features

1. **Webhook Signature Verification**: All GHL webhooks verified with HMAC-SHA256
2. **Token Expiration**: Auto-login tokens expire after 7 days
3. **Secure Password Generation**: 16-character random passwords with special characters
4. **JWT Tokens**: Industry-standard JWT for SSO tokens
5. **HTTPS Only**: All URLs use HTTPS
6. **HttpOnly Cookies**: Session cookies are HttpOnly and Secure

## API Endpoints

### Webhook Endpoint
`POST /api/webhooks/ghl/contact-created`
- Processes new GHL contacts
- Provisions users and dashboards
- Sends welcome emails

### SSO Endpoints
- `GET /sso/auto-login`: Handles auto-login from email links
- `POST /api/optz/generate-sso-url`: Generates SSO URLs
- `POST /api/optz/generate-embed-token`: Generates embed tokens

## Dashboard Templates

### Free Plan (1 Dashboard)
- Basic Analytics

### Starter Plan (2 Dashboards)
- Basic Analytics
- Marketing ROI

### Pro Plan (4 Dashboards)
- Basic Analytics
- Marketing ROI
- Advanced Analytics
- Revenue Attribution

### Enterprise Plan (Unlimited)
- Executive Dashboard
- Marketing Command Center
- Sales Pipeline Analytics
- Customer Success Metrics
- Financial Overview
- Custom Dashboards

## Troubleshooting

### Webhook Not Triggering
1. Verify webhook URL in GHL settings
2. Check webhook secret matches `.env.local`
3. Ensure contact has valid plan tag
4. Check GHL webhook logs

### Email Not Sending
1. Verify email service credentials
2. Check spam folder
3. Review email service logs
4. Test with different email provider

### Auto-Login Not Working
1. Check token expiration (7 days)
2. Verify subdomain configuration
3. Check browser cookies enabled
4. Review SSO middleware logs

### Dashboard Not Loading
1. Verify Cyfe API credentials
2. Check dashboard provisioning logs
3. Ensure plan limits not exceeded
4. Test embed token generation

## Support

For issues or questions:
- Email: support@siteoptz.ai
- Documentation: https://docs.siteoptz.ai
- GitHub Issues: https://github.com/siteoptz/siteoptz/issues

## License

Proprietary - SiteOptz © 2024