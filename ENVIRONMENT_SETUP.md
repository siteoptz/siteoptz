# Environment Setup for Dashboard & GoHighLevel Integration

## Required Environment Variables

Add these to your `.env.local` file:

### Stripe Configuration
```bash
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...

# Price IDs for different plans
STRIPE_STARTER_MONTHLY_PRICE_ID=price_...
STRIPE_STARTER_YEARLY_PRICE_ID=price_...
STRIPE_PRO_MONTHLY_PRICE_ID=price_...
STRIPE_PRO_YEARLY_PRICE_ID=price_...
STRIPE_ENTERPRISE_MONTHLY_PRICE_ID=price_...
STRIPE_ENTERPRISE_YEARLY_PRICE_ID=price_...
```

### GoHighLevel Integration
```bash
GOHIGHLEVEL_API_KEY=your_ghl_api_key_here
```

### Email Configuration
```bash
# Option 1: SendGrid (recommended)
SENDGRID_API_KEY=SG.your_sendgrid_api_key
EMAIL_PROVIDER=sendgrid

# Option 2: SMTP Fallback
EMAIL_SMTP_HOST=smtp.gmail.com
EMAIL_SMTP_PORT=587
EMAIL_SMTP_USER=your_email@gmail.com
EMAIL_SMTP_PASS=your_app_password

# Default sender email
EMAIL_FROM=info@siteoptz.ai
```

### Next Auth
```bash
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your_nextauth_secret
```

## Features Implemented

### 1. Dashboard Subscription Tier Display Fix
- ✅ Fixed hardcoded 'free' plan in user plan API
- ✅ Added Stripe integration to fetch actual subscription status
- ✅ Proper plan mapping (free, starter, pro, enterprise)
- ✅ Plan-specific features and limitations

### 2. GoHighLevel Contact Creation
- ✅ Automatic contact creation on subscription checkout
- ✅ Includes plan, billing cycle, company info, interests
- ✅ Proper tagging and custom fields
- ✅ Error handling and fallback

### 3. Email Notifications
- ✅ Welcome email to new subscribers with plan details
- ✅ Alert email to info@siteoptz.ai with user details
- ✅ Plan-specific feature lists in welcome emails
- ✅ SendGrid and SMTP fallback support

### 4. Stripe Webhook Integration
- ✅ Handles `checkout.session.completed` events
- ✅ Handles `customer.subscription.updated` events
- ✅ Handles `customer.subscription.deleted` events
- ✅ Triggers GoHighLevel contact creation and email notifications

## Setup Instructions

1. **Configure Stripe Webhooks**:
   - Add webhook endpoint: `https://yourdomain.com/api/webhook/stripe`
   - Select events: `checkout.session.completed`, `customer.subscription.updated`, `customer.subscription.deleted`
   - Copy webhook secret to `STRIPE_WEBHOOK_SECRET`

2. **GoHighLevel Setup**:
   - Get API key from GoHighLevel settings
   - Add to `GOHIGHLEVEL_API_KEY` environment variable

3. **Email Setup**:
   - For SendGrid: Get API key and add to `SENDGRID_API_KEY`
   - For SMTP: Configure your SMTP credentials

4. **Testing**:
   - Test with Stripe test mode first
   - Use test API keys and webhook endpoints
   - Verify emails are being sent and GoHighLevel contacts are created

## File Structure

```
pages/api/
├── user/plan.ts              # Fetches actual subscription from Stripe
├── upgrade/subscription.ts   # Enhanced with user info collection
├── webhook/stripe.ts         # Handles Stripe webhooks
└── send-email.ts            # Email sending API

pages/dashboard/
├── free.tsx                 # Free plan dashboard
├── starter.tsx              # Starter plan dashboard  
├── pro.tsx                  # Pro plan dashboard
└── enterprise.tsx           # Enterprise plan dashboard

lib/
└── email-service.js         # Email service with SendGrid/SMTP
```

## Dashboard Features by Plan

### Free Plan
- 3 comparisons/day
- Basic tool access
- Community support

### Starter Plan
- 10 comparisons/day
- 50+ AI tools access
- Email support
- Implementation guides

### Pro Plan
- Unlimited comparisons
- All AI tools access
- Priority support
- Team collaboration (10 members)
- Expert consultations

### Enterprise Plan
- Everything in Pro
- Unlimited team members
- White-label options
- Dedicated account manager
- Custom integrations

## Current Status

### ✅ Working Features
- **NextAuth Integration**: SignIn callback is properly triggering GoHighLevel and email functions
- **Email Service**: Configured with fallback mechanism that logs emails during development
- **GoHighLevel Service**: Configured with fallback mechanism that logs contact data during development
- **Error Handling**: Comprehensive logging and graceful failure handling

### ⚠️ Development Mode
The integration is currently running in development/testing mode with:
- **Email**: Logging emails to console instead of sending (SMTP credentials disabled)
- **GoHighLevel**: Logging contact data to console instead of creating (API permissions issue)

### 🔧 Production Configuration Required

#### 1. GoHighLevel API Setup
Current issue: `"The token does not have access to this location"`

**To fix:**
```bash
# Verify these in your GoHighLevel account:
GOHIGHLEVEL_API_KEY=your_correct_api_key
GOHIGHLEVEL_LOCATION_ID=your_correct_location_id

# Ensure the API key has permissions for:
# - Contacts: Create, Read, Update
# - Location access for the specified location ID
```

#### 2. Email Configuration
**Option A: SendGrid (Recommended)**
```bash
SENDGRID_API_KEY=SG.your_actual_sendgrid_api_key
EMAIL_PROVIDER=sendgrid
EMAIL_FROM=info@siteoptz.ai
```

**Option B: SMTP**
```bash
EMAIL_PROVIDER=smtp
EMAIL_SMTP_HOST=smtp.gmail.com
EMAIL_SMTP_PORT=587
EMAIL_SMTP_USER=your_actual_email@gmail.com
EMAIL_SMTP_PASS=your_actual_app_password
EMAIL_FROM=info@siteoptz.ai
```

## Troubleshooting

1. **Dashboard shows 'Free' for upgraded users**:
   - Check Stripe API keys in environment
   - Verify webhook is receiving events
   - Check console logs for Stripe API errors

2. **GoHighLevel contacts not created**:
   - Current status: API returns 403 "The token does not have access to this location"
   - Contact data is being logged to console for manual review
   - Check GoHighLevel API key permissions and location access
   - Verify `GOHIGHLEVEL_API_KEY` and `GOHIGHLEVEL_LOCATION_ID` are correct

3. **Emails not sending**:
   - Current status: Emails are being logged to console in development mode
   - For production: Configure SendGrid API key or valid SMTP credentials
   - Check spam folders for test emails once configured

## Testing the Integration

With current development setup, when a user registers/signs in:

1. **Console Output**: Check the development server logs for:
   ```
   === SIGNIN CALLBACK TRIGGERED ===
   🔄 Starting GoHighLevel contact creation...
   📤 Sending to GoHighLevel API...
   🔄 GoHighLevel API failed, logging contact data for manual review:
   📧 Starting welcome email send...
   📧 SMTP not configured, logging email instead:
   ```

2. **NextAuth Integration**: The signIn callback is working correctly
3. **Data Logging**: All user registration data is being captured and logged
4. **Graceful Failures**: Both GoHighLevel and email services fail gracefully without blocking user registration