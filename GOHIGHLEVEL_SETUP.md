# GoHighLevel Integration Setup

## Overview
This document describes the GoHighLevel CRM integration for the SiteOptz lead capture system.

## Current Integration Features

### 1. Automatic Lead Creation
Every form submission on the SiteOptz website automatically creates a new contact in GoHighLevel with:

- **Contact Information**: First name, last name, email, company
- **Lead Tags**:
  - `New Lead` - Triggers the 'New Lead Workflow'
  - `Resource Download` - Identifies source
  - Downloaded resource name
  - Company size
  - Role/position
  - Interest area
  - Timeline
  - Marketing consent status
  - Source month/year

### 2. Email Notifications
- **Primary Email**: Sent to the lead with download link
- **BCC Copy**: Always sent to `info@siteoptz.ai` for tracking
- **Email Provider**: SendGrid (primary) with SMTP fallback

### 3. Workflow Automation
Leads are automatically added to the 'New Lead Workflow' in GoHighLevel for:
- Welcome email sequences
- Lead nurturing campaigns
- Sales follow-up tasks
- Lead scoring and qualification

## Required Environment Variables

Add these to your `.env.local` file:

```bash
# GoHighLevel API Configuration
GHL_API_KEY=your_gohighlevel_api_key_here
GHL_LOCATION_ID=your_gohighlevel_location_id_here

# Email Configuration
SENDGRID_API_KEY=your_sendgrid_api_key_here
EMAIL_FROM=info@siteoptz.ai
EMAIL_PROVIDER=sendgrid

# Optional SMTP Fallback
EMAIL_SMTP_HOST=smtp.gmail.com
EMAIL_SMTP_PORT=587
EMAIL_SMTP_USER=your_email@gmail.com
EMAIL_SMTP_PASS=your_app_specific_password
```

## How to Get GoHighLevel API Credentials

### 1. API Key
1. Log into your GoHighLevel account
2. Navigate to Settings > Integrations > API Keys
3. Create a new API key with full permissions
4. Copy the API key to `GHL_API_KEY`

### 2. Location ID
1. In GoHighLevel, go to Settings > Business Profile
2. Find your Location ID (also called "Sub-Account ID")
3. Copy the Location ID to `GHL_LOCATION_ID`

## Setting Up the 'New Lead Workflow'

### Create the Workflow in GoHighLevel:
1. Go to Automation > Workflows
2. Create a new workflow called "New Lead Workflow"
3. Set trigger: "Tag Added" → "New Lead"
4. Add actions:
   - Send welcome email
   - Add to email campaign
   - Create task for sales team
   - Update lead score
   - Add to appropriate pipeline stage

### Workflow Trigger Tags
The integration automatically adds these tags that can trigger workflows:
- `New Lead` - Main trigger for new lead workflow
- `Resource Download` - Can trigger resource-specific sequences
- `Marketing Consent: Yes/No` - For GDPR compliance

## Testing the Integration

### 1. Test Form Submission
```bash
curl -X POST https://siteoptz.ai/api/download-resource \
  -H "Content-Type: application/json" \
  -d '{
    "firstName": "Test",
    "lastName": "User",
    "email": "test@example.com",
    "company": "Test Company",
    "role": "Marketing Manager",
    "companySize": "10-50",
    "primaryInterest": "ai-chatbot-implementation",
    "resourceType": "ai-chatbot-implementation",
    "timeline": "1-3 months",
    "marketingConsent": true
  }'
```

### 2. Verify in GoHighLevel
1. Check Contacts for new lead
2. Verify tags are applied correctly
3. Confirm workflow was triggered
4. Check workflow history for execution

### 3. Verify Email Delivery
1. Check primary recipient received email
2. Verify info@siteoptz.ai received BCC copy
3. Confirm download links work correctly

## Monitoring and Logs

### Server Logs
The API logs detailed information for each lead capture:
```
=== LEAD CAPTURE SUCCESS ===
Resource download details: {
  email: 'user@example.com',
  company: 'Example Corp',
  role: 'CTO',
  companySize: '50-200',
  resourceType: 'ai-chatbot-implementation',
  resourceTitle: 'Complete Guide to AI Chatbot Implementation',
  timestamp: '2024-08-24T12:00:00.000Z',
  ghlSuccess: true,
  ghlContactId: 'contact_xyz123',
  emailSuccess: true,
  bccSent: 'info@siteoptz.ai',
  workflow: 'New Lead Workflow'
}
===========================
```

### GoHighLevel Activity Log
- View contact activity history
- Check workflow execution logs
- Monitor email delivery status
- Track lead progression through pipeline

## Troubleshooting

### Lead Not Created in GoHighLevel
1. Verify API key is valid and has permissions
2. Check Location ID is correct
3. Ensure GoHighLevel API is accessible
4. Review server logs for error messages

### Workflow Not Triggering
1. Verify "New Lead" tag is being applied
2. Check workflow trigger configuration
3. Ensure workflow is active/published
4. Review workflow history for errors

### Email Not Received
1. Check SendGrid API key is valid
2. Verify email addresses are correct
3. Check spam/junk folders
4. Review SendGrid activity logs
5. Test SMTP fallback if SendGrid fails

### BCC Not Working
1. Verify info@siteoptz.ai is valid recipient
2. Check SendGrid BCC configuration
3. Review email service logs
4. Test with different email provider

## Support

For GoHighLevel support:
- Documentation: https://help.gohighlevel.com
- API Reference: https://developers.gohighlevel.com

For SiteOptz integration issues:
- Check server logs in Vercel dashboard
- Review this documentation
- Contact development team

## Security Notes

- Never commit API keys to version control
- Use environment variables for all sensitive data
- Regularly rotate API keys
- Monitor for unauthorized access
- Implement rate limiting on API endpoints