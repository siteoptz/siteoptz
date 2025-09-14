# GoHighLevel Integration for SiteOptz Free Plan Subscribers

This document explains the GoHighLevel CRM integration that automatically adds new subscribers to the SiteOptz free plan as contacts in GoHighLevel.

## Overview

When users register for the SiteOptz free plan (either through Google OAuth or email/password), they are automatically added as contacts in GoHighLevel CRM with appropriate tags, custom fields, and pipeline assignments.

## Features

### 🎯 **Automatic Contact Creation**
- Every free plan registration creates a new contact in GoHighLevel
- Handles both Google OAuth and email/password registrations
- Updates existing contacts if they already exist
- Prevents duplicate registrations

### 🏷️ **Smart Tagging System**
- `New Lead` - Triggers automated workflows in GoHighLevel
- `Free Plan Subscriber` - Identifies the subscription type
- `SiteOptz Free User` - Brand-specific identification
- `AI Tool Discovery` - Interest-based categorization
- `Registration Method: google/email` - Tracks registration source
- `Lead Magnet - Free Plan` - Marketing attribution

### 📊 **Custom Field Tracking**
- `registration_method` - Google OAuth or Email/Password
- `plan_type` - Set to "free" for all free plan subscribers
- `registration_date` - ISO timestamp of registration
- `user_agent` - Browser information for analytics
- `referrer` - Source page that led to registration

### 🎯 **Pipeline Management**
- Automatically adds contacts to specified pipeline
- Assigns to appropriate pipeline stage
- Creates opportunities for tracking conversion

## API Endpoints

### `/api/register-free-plan`
**POST** endpoint that handles free plan registrations and GoHighLevel integration.

#### Request Body
```json
{
  "email": "user@example.com",
  "name": "John Doe", // Optional
  "source": "Free Plan Registration - Modal",
  "planName": "Free Plan - AI Tool Discovery",
  "userAgent": "Mozilla/5.0...",
  "referrer": "https://siteoptz.ai/why-us",
  "registrationMethod": "google" // or "email"
}
```

#### Response
```json
{
  "success": true,
  "message": "Registration successful! Welcome to SiteOptz Free Plan.",
  "data": {
    "email": "user@example.com",
    "contactId": "ghl_contact_id_123",
    "opportunityId": "ghl_opportunity_id_456"
  }
}
```

## Environment Variables

Add these variables to your `.env.local` file:

```bash
# GoHighLevel CRM Integration
GOHIGHLEVEL_API_KEY=your-gohighlevel-api-key
GOHIGHLEVEL_LOCATION_ID=your-location-id
ENABLE_GHL=true

# Optional: GoHighLevel Pipeline Configuration
GHL_FREE_PLAN_PIPELINE_ID=your-free-plan-pipeline-id
GHL_FREE_PLAN_STAGE_ID=your-free-plan-stage-id

# Legacy (for backwards compatibility with existing integrations)
GHL_API_KEY=your-gohighlevel-api-key
GHL_LOCATION_ID=your-location-id
```

## Setup Instructions

### 1. GoHighLevel API Key
1. Log into your GoHighLevel account
2. Go to Settings → API Keys
3. Create a new API key with the following permissions:
   - `contacts.write`
   - `contacts.read`
   - `opportunities.write`
   - `pipelines.read`
   - `pipelines.write`

### 2. Location ID
1. In GoHighLevel, go to Settings → Company
2. Copy your Location ID from the URL or settings page

### 3. Pipeline Setup (Optional)
1. Create a "Free Plan Subscribers" pipeline in GoHighLevel
2. Set up stages like: "New Registration", "Onboarded", "Active User", "Upgrade Candidate"
3. Copy the Pipeline ID and first Stage ID

### 4. Environment Configuration
1. Copy `.env.local.example` to `.env.local`
2. Fill in your GoHighLevel credentials
3. Set `ENABLE_GHL=true` to activate the integration

## Integration Points

### RegisterModal Component
The main registration modal (`components/RegisterModal.tsx`) automatically calls the GoHighLevel API for both:
- **Email Registration**: When users sign up with email/password
- **Google OAuth**: When users register via Google OAuth

### Existing Integrations
The system also integrates with:
- **Newsletter Subscriptions**: `/api/subscribe.ts`
- **Email Capture**: `/api/email-capture.js`
- **Contact Forms**: All existing contact forms

## Data Flow

```
User Registration (Free Plan)
           ↓
    RegisterModal Component
           ↓
   /api/register-free-plan
           ↓
    GoHighLevel API Class
           ↓
   Create/Update Contact
           ↓
    Add Tags & Custom Fields
           ↓
   Assign to Pipeline (if configured)
           ↓
    Create Opportunity (optional)
           ↓
   Return Success Response
```

## Error Handling

The integration includes comprehensive error handling:

- **Rate Limiting**: 10 registrations per 15 minutes per IP
- **Validation**: Email format and required field validation
- **Graceful Degradation**: Registration succeeds even if GoHighLevel fails
- **Logging**: Detailed console logs for debugging
- **Retry Logic**: Built into the GoHighLevel API class

## Testing

### Manual Testing
1. Set `ENABLE_GHL=true` in your environment
2. Fill in valid GoHighLevel credentials
3. Register for the free plan via the modal
4. Check GoHighLevel for the new contact

### Development Mode
When `ENABLE_GHL=false` or credentials are missing:
- Registration still works normally
- GoHighLevel integration is skipped
- Logs indicate integration is disabled

## Monitoring

### Success Indicators
- Contact appears in GoHighLevel with correct tags
- Custom fields are populated correctly
- Contact is assigned to the right pipeline stage
- Console logs show successful integration

### Debug Information
The integration provides detailed logging:
```javascript
console.log('=== GoHighLevel Free Plan Registration Debug ===');
console.log('Contact created/updated successfully:', contactId);
console.log('=== Free Plan GoHighLevel Integration Success ===');
```

## Workflows in GoHighLevel

### Recommended Automation
1. **New Lead Workflow**: Triggered by "New Lead" tag
   - Send welcome email
   - Add to nurture sequence
   - Notify sales team

2. **Free Plan Onboarding**: Triggered by "Free Plan Subscriber" tag
   - Send onboarding email series
   - Provide access to free resources
   - Schedule follow-up for upgrade opportunities

3. **Upgrade Campaign**: For engaged free users
   - Track usage and engagement
   - Send targeted upgrade offers
   - Personalized outreach for high-value prospects

## Maintenance

### Regular Checks
- Monitor API rate limits
- Review error logs for failed integrations
- Update pipeline stages as needed
- Clean up test contacts periodically

### Updates
- Keep GoHighLevel API wrapper updated
- Monitor for API version changes
- Test integration after GoHighLevel updates

## Security

### Best Practices
- Store API keys securely in environment variables
- Never commit credentials to version control
- Use HTTPS for all API calls
- Implement rate limiting and validation
- Log security events appropriately

### Data Privacy
- Only collect necessary user information
- Follow GDPR/CCPA compliance requirements
- Provide clear privacy policy
- Allow users to request data deletion

## Support

### Troubleshooting
1. **Check Environment Variables**: Ensure all required variables are set
2. **Verify API Permissions**: Confirm API key has necessary permissions
3. **Review Console Logs**: Look for detailed error messages
4. **Test API Connectivity**: Use the GoHighLevel API class directly

### Common Issues
- **Invalid API Key**: Check key format and permissions
- **Wrong Location ID**: Verify location ID in GoHighLevel settings
- **Rate Limiting**: Reduce registration frequency during testing
- **Pipeline Not Found**: Verify pipeline and stage IDs are correct

For additional support, contact the development team or refer to the GoHighLevel API documentation.