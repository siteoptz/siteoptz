# Trial Button Google OAuth + GoHighLevel Integration Setup

This document explains how to configure the trial button Google OAuth integration with GoHighLevel pipelines.

## Overview

The trial buttons (`Start Free Trial` and `Start 7-Day Free Trial`) now trigger a Google OAuth window that:
1. Registers new users via Google OAuth
2. Automatically creates contacts in GoHighLevel
3. Adds users to specific pipelines based on trial type
4. Triggers welcome workflows in GoHighLevel

## Required Environment Variables

Add these variables to your production environment (Vercel):

### Google OAuth (Required)
```bash
GOOGLE_CLIENT_ID=your_google_oauth_client_id
GOOGLE_CLIENT_SECRET=your_google_oauth_client_secret
NEXTAUTH_URL=https://siteoptz.ai
NEXTAUTH_SECRET=your_nextauth_secret_here
```

### GoHighLevel API (Required)
```bash
GHL_API_KEY=your_gohighlevel_api_key_here
GHL_LOCATION_ID=your_gohighlevel_location_id_here
```

### GoHighLevel Pipeline Configuration (Required for Trial Flow)
```bash
# Free Trial Pipeline
GHL_FREE_TRIAL_PIPELINE_ID=your_free_trial_pipeline_id
GHL_FREE_TRIAL_STAGE_ID=your_free_trial_stage_id

# Starter Plan Trial Pipeline  
GHL_STARTER_TRIAL_PIPELINE_ID=your_starter_trial_pipeline_id
GHL_STARTER_TRIAL_STAGE_ID=your_starter_trial_stage_id

# Pro Plan Trial Pipeline
GHL_PRO_TRIAL_PIPELINE_ID=your_pro_trial_pipeline_id
GHL_PRO_TRIAL_STAGE_ID=your_pro_trial_stage_id

# 7-Day Trial Pipeline
GHL_7DAY_TRIAL_PIPELINE_ID=your_7day_trial_pipeline_id
GHL_7DAY_TRIAL_STAGE_ID=your_7day_trial_stage_id
```

### GoHighLevel Workflow Configuration (Optional but Recommended)
```bash
# Welcome Workflow IDs for each trial type
GHL_FREE_TRIAL_WORKFLOW_ID=your_free_trial_workflow_id
GHL_STARTER_TRIAL_WORKFLOW_ID=your_starter_trial_workflow_id
GHL_PRO_TRIAL_WORKFLOW_ID=your_pro_trial_workflow_id
GHL_7DAY_TRIAL_WORKFLOW_ID=your_7day_trial_workflow_id

# Default assignee for new opportunities
GHL_DEFAULT_ASSIGNEE_ID=your_default_assignee_user_id
```

## Google OAuth Setup

1. **Go to Google Cloud Console**: https://console.cloud.google.com/
2. **Create a new project** or select existing one
3. **Enable Google+ API**:
   - Go to "APIs & Services" > "Library"
   - Search for "Google+ API" 
   - Click "Enable"
4. **Create OAuth Credentials**:
   - Go to "APIs & Services" > "Credentials"
   - Click "Create Credentials" > "OAuth 2.0 Client IDs"
   - Application type: "Web application"
   - Add authorized redirect URIs:
     - `https://siteoptz.ai/api/auth/callback/google`
     - `http://localhost:3000/api/auth/callback/google` (for development)
5. **Copy Client ID and Secret** to environment variables

## GoHighLevel Setup

### 1. Get API Credentials
1. Log into your GoHighLevel account
2. Go to Settings > API > API Keys
3. Create a new API key with full permissions
4. Copy the API key and Location ID

### 2. Create Trial Pipelines
Create separate pipelines for each trial type:

1. **Free Trial Pipeline**:
   - Name: "Free Trial Users"
   - Stages: "New Free User" → "Activated" → "Converted" → "Churned"

2. **Starter Trial Pipeline**:
   - Name: "Starter Plan Trials"  
   - Stages: "New Starter Trial" → "Active Trial" → "Converted to Paid" → "Trial Expired"

3. **Pro Trial Pipeline**:
   - Name: "Pro Plan Trials"
   - Stages: "New Pro Trial" → "Active Trial" → "Converted to Paid" → "Trial Expired"

4. **7-Day Trial Pipeline**:
   - Name: "7-Day Free Trials"
   - Stages: "New 7-Day Trial" → "Day 3 Check-in" → "Conversion Push" → "Converted/Expired"

### 3. Create Welcome Workflows
Set up automated workflow sequences for each trial type:

1. **Free Trial Workflow**:
   - Welcome email with getting started guide
   - Day 3: Feature highlights email
   - Day 7: Success stories and testimonials
   - Day 14: Upgrade to paid plan offer

2. **Starter/Pro Trial Workflows**:
   - Immediate welcome email with trial details
   - Day 1: Implementation checklist
   - Day 3: Personal check-in (task for sales team)
   - Day 5: Advanced features demo
   - Day 7: Conversion call scheduling

3. **7-Day Trial Workflow**:
   - Day 0: Welcome + quick setup guide
   - Day 1: Feature deep-dive email
   - Day 3: Check-in + offer help
   - Day 5: Case studies + social proof
   - Day 6: Final conversion push
   - Day 8: Last chance offer (if not converted)

### 4. Get Pipeline and Workflow IDs
1. **Pipeline IDs**: In GoHighLevel, go to each pipeline settings to find the ID in the URL
2. **Stage IDs**: Click on each stage to see the ID in the URL or use the API
3. **Workflow IDs**: In Workflows section, click on each workflow to find ID
4. **User ID**: Your user profile settings will show your user ID for assignments

## Usage

### Trial Button Components

Use the new trial button components in your React code:

```tsx
import TrialButton, { StartFreeTrialButton, Start7DayTrialButton } from '@/components/TrialButton';

// Standard free trial
<StartFreeTrialButton plan="free" />

// 7-day trial variant
<Start7DayTrialButton plan="starter" />

// Custom trial button
<TrialButton 
  variant="start-free-trial"
  plan="pro"
  size="lg"
  redirectAfterSignIn="/dashboard"
>
  Try Pro Plan Free
</TrialButton>
```

### Button Variants

- `start-free-trial` - Green gradient, for free plan signups
- `start-7-day-trial` - Purple gradient, for time-limited trials

### Plan Types

- `free` - Basic free plan (no payment required)
- `starter` - Starter plan trial (leads to upgrade flow)
- `pro` - Pro plan trial (leads to upgrade flow)

## Testing

### Development Testing
1. Set up environment variables in `.env.local`
2. Use development OAuth redirect URL
3. Test trial button clicks
4. Verify user creation in GoHighLevel
5. Check pipeline assignment
6. Confirm workflow triggers

### Production Testing
1. Deploy to staging/production
2. Test with real Google accounts
3. Verify GoHighLevel integration
4. Test different trial types
5. Monitor conversion tracking

## Analytics Tracking

The system automatically tracks:
- Trial button clicks (`trial_button_click`)
- OAuth flow initiation (`oauth_initiated`) 
- OAuth completion (`oauth_completed`)
- GoHighLevel contact creation (`ghl_contact_created`)
- Pipeline assignment (`ghl_pipeline_assigned`)

View these events in Google Analytics under Events.

## Troubleshooting

### Common Issues

1. **OAuth Error**: Check Google Cloud Console settings and redirect URLs
2. **GoHighLevel Contact Creation Fails**: Verify API key permissions and location ID
3. **Pipeline Assignment Fails**: Check pipeline and stage IDs are correct
4. **Workflow Not Triggering**: Verify workflow IDs and ensure workflows are active

### Debug Logs

Check Vercel function logs for detailed error messages:
- NextAuth callback logs show OAuth flow
- GoHighLevel API responses show integration status
- Console logs track user flow through trial signup

### Environment Variables Checklist

✅ Google OAuth configured  
✅ GoHighLevel API connected  
✅ Pipeline IDs set for all trial types  
✅ Workflow IDs configured  
✅ Production URLs added to OAuth settings  

## Security Notes

- Never commit API keys to version control
- Use environment variables for all sensitive data
- Regularly rotate API keys
- Monitor GoHighLevel API usage limits
- Set up error alerts for failed integrations

## Support

For issues with this integration:
1. Check Vercel function logs
2. Verify environment variables
3. Test GoHighLevel API access
4. Review Google OAuth setup
5. Contact development team if issues persist