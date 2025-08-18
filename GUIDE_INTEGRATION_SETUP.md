# AI Tools Guide Integration Setup

This document explains how to set up the AI Tools Comparison Guide lead magnet integration with GoHighLevel CRM and email delivery.

## 🔧 Configuration Required

### 1. GoHighLevel CRM Setup

1. **Get API Key:**
   - Log into your GoHighLevel account
   - Go to Settings > Integrations > API
   - Create a new API key with the following permissions:
     - `contacts.write`
     - `contacts.read`
   - Copy the API key

2. **Get Location ID:**
   - In GoHighLevel, go to Settings > Company
   - Copy your Location ID (usually starts with `loc_`)

3. **Configure Custom Fields (Optional):**
   - Go to Settings > Custom Fields
   - Add custom fields for:
     - `company` (Single Line Text)
     - `downloadedGuide` (Single Line Text)
     - `downloadDate` (Date/Time)

### 2. Email Service Setup

#### Option A: Gmail (Recommended for testing)

1. **Enable 2-Factor Authentication** on your Gmail account
2. **Generate App Password:**
   - Go to Google Account settings
   - Security > 2-Step Verification > App passwords
   - Generate password for "Mail"
   - Use this password in `EMAIL_SMTP_PASS`

#### Option B: SendGrid (Recommended for production)

1. **Create SendGrid Account**
2. **Generate API Key:**
   - Go to Settings > API Keys
   - Create new API key with "Full Access"
3. **Verify Domain** (optional but recommended)

#### Option C: AWS SES (Enterprise option)

1. **Set up AWS SES**
2. **Get SMTP Credentials**
3. **Verify domain and email addresses**

### 3. Environment Variables

Copy `.env.example` to `.env.local` and fill in your values:

```bash
# GoHighLevel Configuration
GHL_API_KEY=your_actual_gohighlevel_api_key
GHL_LOCATION_ID=your_actual_location_id

# Email Configuration (Gmail example)
EMAIL_FROM=guides@yourdomain.com
EMAIL_SMTP_HOST=smtp.gmail.com
EMAIL_SMTP_PORT=587
EMAIL_SMTP_USER=your_email@gmail.com
EMAIL_SMTP_PASS=your_app_specific_password

# Site Configuration
NEXT_PUBLIC_SITE_URL=https://yourdomain.com
```

### 4. PDF Guide Generation

The system expects a PDF file at `/public/guides/ai-tools-comparison-guide-2025.pdf`.

To convert the markdown guide to PDF:

#### Option A: Using Pandoc (Recommended)

```bash
# Install pandoc
brew install pandoc wkhtmltopdf  # macOS
# or
sudo apt-get install pandoc wkhtmltopdf  # Ubuntu

# Convert markdown to PDF
pandoc public/guides/ai-tools-comparison-guide-2025.md \
  -o public/guides/ai-tools-comparison-guide-2025.pdf \
  --pdf-engine=wkhtmltopdf \
  --margin-top=1in \
  --margin-bottom=1in \
  --margin-left=1in \
  --margin-right=1in
```

#### Option B: Online Tools

1. Use an online markdown to PDF converter
2. Upload the markdown file from `/public/guides/ai-tools-comparison-guide-2025.md`
3. Download and save as `/public/guides/ai-tools-comparison-guide-2025.pdf`

#### Option C: Export from the React Component

1. Use a service like Puppeteer to render the React component as PDF
2. This requires additional setup but gives you full control over styling

## 🚀 Implementation

### 1. Install Dependencies

```bash
npm install
# This will install nodemailer and @types/nodemailer
```

### 2. API Route

The API route is already created at `/pages/api/download-guide.ts`. It handles:

- ✅ Form validation
- ✅ GoHighLevel CRM integration
- ✅ Email sending with PDF attachment
- ✅ Error handling
- ✅ Analytics tracking

### 3. Components

Two components are created:

1. **AIToolsGuide.tsx** - The guide preview/landing component
2. **GuideDownloadModal.tsx** - The lead capture form modal

### 4. Integration Points

To integrate the guide into your existing pages:

```jsx
import AIToolsGuide from '../components/AIToolsGuide';
import GuideDownloadModal from '../components/GuideDownloadModal';

function YourPage() {
  const [showModal, setShowModal] = useState(false);

  const handleDownload = (formData) => {
    console.log('Lead captured:', formData);
    // Additional tracking/analytics can go here
  };

  return (
    <>
      <AIToolsGuide />
      
      {/* Add download button wherever needed */}
      <button onClick={() => setShowModal(true)}>
        Download Free Guide
      </button>
      
      <GuideDownloadModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onDownload={handleDownload}
      />
    </>
  );
}
```

## 🧪 Testing

### 1. Test Environment Setup

1. Use a separate GoHighLevel location for testing
2. Use a test email address
3. Set up test environment variables

### 2. Test Checklist

- [ ] Form submission works without errors
- [ ] Lead appears in GoHighLevel CRM
- [ ] Email is sent with PDF attachment
- [ ] Email template renders correctly
- [ ] Analytics events fire correctly
- [ ] Error handling works (test with invalid email)

### 3. Testing the API Endpoint

```bash
# Test with curl
curl -X POST http://localhost:3000/api/download-guide \
  -H "Content-Type: application/json" \
  -d '{
    "firstName": "Test",
    "lastName": "User", 
    "email": "test@example.com",
    "company": "Test Company",
    "role": "Manager",
    "companySize": "51-200",
    "primaryInterest": "Content Generation",
    "timeline": "Short",
    "marketingConsent": true
  }'
```

## 📊 Analytics & Tracking

The integration includes Google Analytics tracking:

```javascript
gtag('event', 'guide_download', {
  event_category: 'Lead Generation',
  event_label: 'AI Tools Comparison Guide',
  value: 1,
  custom_parameters: {
    company_size: formData.companySize,
    role: formData.role,
    primary_interest: formData.primaryInterest,
    timeline: formData.timeline,
  }
});
```

## 🛡️ Security Considerations

1. **API Rate Limiting:** Consider adding rate limiting to prevent abuse
2. **Email Validation:** The API validates email format
3. **Environment Variables:** Never commit actual API keys to git
4. **CORS:** The API is configured for same-origin requests only
5. **Data Privacy:** Inform users how their data will be used

## 🔧 Troubleshooting

### Common Issues

1. **"Invalid API Key" Error:**
   - Check that your GoHighLevel API key is correct
   - Verify the API key has proper permissions

2. **"Email Not Sending" Error:**
   - Check SMTP credentials
   - Verify email service is not blocking the connection
   - Check spam folder

3. **"PDF Not Found" Error:**
   - Ensure the PDF file exists at the correct path
   - Check file permissions

4. **"Failed to Add to CRM" Error:**
   - Check GoHighLevel location ID
   - Verify API key permissions
   - Check if required custom fields exist

### Debug Mode

Add this to your `.env.local` for detailed logging:

```bash
NODE_ENV=development
DEBUG=true
```

## 📈 Performance Optimization

1. **Email Queue:** For high volume, consider using a queue system (Redis + Bull)
2. **CDN:** Host the PDF on a CDN for faster downloads
3. **Caching:** Cache successful API responses
4. **Monitoring:** Set up error monitoring (Sentry, LogRocket, etc.)

## 🔄 Maintenance

1. **Update Guide Quarterly:** Keep the content current
2. **Monitor Analytics:** Track conversion rates and optimize
3. **A/B Test:** Test different email subject lines and content
4. **Cleanup:** Regularly clean up test data from CRM

## 📞 Support

If you encounter issues:

1. Check the console for error messages
2. Verify environment variables are set correctly
3. Test individual components (email, CRM) separately
4. Check the API logs for detailed error information