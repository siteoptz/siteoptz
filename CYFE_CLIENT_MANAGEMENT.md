# Cyfe White-Label Client Management System (Integrated with SiteOptz Plans)

## Overview

This system provides a **fully integrated solution** connecting SiteOptz subscription plans with white-label Cyfe dashboard access. When users subscribe to plans on siteoptz.ai, they automatically get provisioned with dashboard accounts on optz.siteoptz.ai based on their plan tier.

### 🔄 **Automated Integration Flow**
1. **User subscribes** to a plan on siteoptz.ai (free/starter/pro/enterprise)
2. **Stripe webhook** automatically provisions white-label client account
3. **User clicks "Dashboard" button** on their plan dashboard
4. **SSO authentication** logs them directly into optz.siteoptz.ai
5. **Tier-based access** shows dashboards based on their subscription level

## System Components

### 1. Client Management Interface
**Location**: `/settings/clients`

- Create new client accounts
- View all existing clients  
- Manage client status (active/inactive)
- Export client lists
- Reset passwords
- Track login activity

### 2. White-Label Authentication
**Location**: `/optz/` (login page)
**Dashboard**: `/optz/dashboard` (authenticated area)

- Secure login with username/password
- Session management
- Plan-based dashboard access
- Integrated Cyfe dashboards

### 3. API Endpoints

#### Create Client
`POST /api/clients/create`
```json
{
  "email": "client@company.com",
  "companyName": "Client Company",
  "plan": "trial|basic|pro|enterprise",
  "dashboardAccess": ["basic", "marketing"],
  "sendCredentials": true
}
```

#### List Clients  
`GET /api/clients/list`

#### Authenticate Client
`POST /api/optz/authenticate`
```json
{
  "username": "client_username",
  "password": "client_password"
}
```

## User Creation Process

### Step 1: Access Client Management
1. Navigate to `https://siteoptz.ai/settings/clients`
2. Login with admin credentials
3. Click "Create New Client"

### Step 2: Fill Client Information
- **Company Name**: Client's company name
- **Email**: Client contact email
- **Plan**: Choose from trial, basic, pro, enterprise
- **Dashboard Access**: Select available dashboards
- **Send Credentials**: Auto-email login details

### Step 3: Client Account Created
- System generates secure username and password
- Email sent to client with login credentials
- Client appears in management dashboard

### Step 4: Client Access
1. Client visits `https://optz.siteoptz.ai/`
2. Enters provided username and password
3. Gets redirected to personalized dashboard
4. Access to dashboards based on plan level

## Dashboard Access Levels

### Trial Plan
- Basic analytics dashboard
- Limited widgets (5)
- 1 hour refresh rate

### Basic Plan  
- Basic analytics
- Standard widgets (15)
- 30-minute refresh rate

### Pro Plan
- Basic + Marketing + Advanced analytics
- Extended widgets (50)
- 15-minute refresh rate
- Custom integrations

### Enterprise Plan
- All dashboards (Basic + Marketing + Advanced + Executive)
- Unlimited widgets
- 5-minute refresh rate
- White-label branding
- Custom domain support

## Email Configuration

Set these environment variables for email functionality:

```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@domain.com
SMTP_PASSWORD=your-app-password
SMTP_FROM=noreply@siteoptz.ai
```

## Security Features

- **Password Hashing**: Uses bcrypt for secure password storage
- **Session Management**: Client sessions stored securely
- **Plan Validation**: Server-side validation of dashboard access
- **API Protection**: All endpoints require authentication
- **SSL Encryption**: Secure data transmission

## Client Dashboard Features

### Overview Tab
- Key performance metrics
- Revenue, users, conversion rates
- Quick access to available dashboards
- Export and sharing capabilities

### Plan-Specific Dashboards
- **Basic**: Traffic analytics, basic conversion tracking
- **Marketing**: ROI tracking, campaign performance, attribution
- **Advanced**: Predictive analytics, cohort analysis, customer LTV
- **Executive**: Company KPIs, market analysis, financial projections

### Interactive Features
- Real-time data refresh
- Customizable widgets
- Data export functionality
- Mobile-responsive design

## Usage Examples

### Creating a Trial Client
```javascript
// API call to create trial client
fetch('/api/clients/create', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    email: 'demo@company.com',
    companyName: 'Demo Company',
    plan: 'trial',
    dashboardAccess: ['basic'],
    sendCredentials: true
  })
});
```

### Client Login Process
1. Client visits `https://optz.siteoptz.ai/`
2. Enters username: `demo_a3x9` 
3. Enters password: `Ab3$9kL2mN8p`
4. System validates credentials
5. Redirects to dashboard with appropriate access

## Monitoring & Analytics

### Admin Dashboard Metrics
- Total clients by plan
- Active vs inactive clients
- Login activity tracking
- Dashboard usage statistics

### Client Activity Tracking
- Last login timestamps
- Dashboard access patterns
- Feature usage analytics
- Performance metrics

## Troubleshooting

### Common Issues

**Client Can't Login**
- Verify account is active
- Check credentials in admin panel
- Reset password if needed

**Email Not Sending**
- Verify SMTP configuration
- Check email server connectivity
- Validate sender permissions

**Dashboard Not Loading**
- Check client plan permissions
- Verify dashboard access rights
- Review browser console for errors

### Support Contacts
- Technical Support: `support@siteoptz.ai`
- Admin Issues: Access `/settings/clients` dashboard
- Client Issues: Contact admin for account management

## Future Enhancements

- **Custom Branding**: Per-client logo and color schemes
- **API Integration**: Client data import/export APIs  
- **Advanced Analytics**: Custom dashboard builder
- **Mobile App**: Native mobile dashboard access
- **SSO Integration**: Single sign-on with client systems

---

This system provides a complete white-label dashboard solution that scales from trial users to enterprise clients with appropriate access controls and features for each tier.