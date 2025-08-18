# 📧 Email Setup Guide for Guide Downloads

The download guide feature is working, but emails aren't being sent because the email service isn't configured with real credentials. Here's how to fix it:

## 🔍 Current Status

Your `.env.local` currently has:
```
SENDGRID_API_KEY=your_sendgrid_api_key_here  # ❌ Placeholder value
FROM_EMAIL=noreply@siteoptz.ai               # ✅ Good
```

## ⚡ Quick Fix Options

### Option 1: SendGrid (Recommended for Production)

1. **Sign up for SendGrid** at https://sendgrid.com
2. **Get API Key**:
   - Go to Settings > API Keys
   - Create new API key with "Full Access"
   - Copy the key (starts with `SG.`)
3. **Update your `.env.local`**:
   ```bash
   SENDGRID_API_KEY=SG.your_real_sendgrid_api_key_here
   FROM_EMAIL=noreply@siteoptz.ai
   ```
4. **Verify domain** (optional but recommended):
   - Go to Settings > Sender Authentication
   - Verify `siteoptz.ai` domain

### Option 2: Gmail SMTP (Good for Testing)

1. **Enable 2FA** on your Gmail account
2. **Generate App Password**:
   - Go to Google Account Settings
   - Security > 2-Step Verification > App passwords
   - Generate password for "Mail"
3. **Update your `.env.local`**:
   ```bash
   # Comment out SendGrid and add:
   EMAIL_SMTP_HOST=smtp.gmail.com
   EMAIL_SMTP_PORT=587
   EMAIL_SMTP_USER=your_email@gmail.com
   EMAIL_SMTP_PASS=your_16_character_app_password
   EMAIL_FROM=your_email@gmail.com
   ```

### Option 3: Other SMTP Providers

For other email providers, use these SMTP settings:

**Mailgun:**
```bash
EMAIL_SMTP_HOST=smtp.mailgun.org
EMAIL_SMTP_PORT=587
EMAIL_SMTP_USER=your_mailgun_smtp_username
EMAIL_SMTP_PASS=your_mailgun_smtp_password
```

**AWS SES:**
```bash
EMAIL_SMTP_HOST=email-smtp.us-east-1.amazonaws.com
EMAIL_SMTP_PORT=587
EMAIL_SMTP_USER=your_ses_smtp_username
EMAIL_SMTP_PASS=your_ses_smtp_password
```

## 🧪 Testing

After updating your `.env.local`:

1. **Restart your development server**:
   ```bash
   npm run dev
   ```

2. **Test the download**:
   - Go to `/compare` page
   - Click "Download Free Guide"
   - Fill out the form
   - Submit

3. **Check the console logs**:
   - Look for "Email configuration:" in the terminal
   - Should show your email method as 'sendgrid' or 'smtp'

4. **Check your email**:
   - Should receive the guide with PDF attachment
   - Check spam folder if not in inbox

## 🔧 Debugging

If emails still aren't working:

1. **Check the console logs** for:
   ```
   Email configuration: {
     hasEmailFrom: true,
     hasEmailPass: true,
     hasSendGridKey: true,
     emailMethod: 'sendgrid'
   }
   ```

2. **Common issues**:
   - **SendGrid**: API key is invalid or doesn't have permissions
   - **Gmail**: App password is wrong or 2FA not enabled
   - **Domain**: Sender domain not verified (for production)

3. **Test with curl**:
   ```bash
   curl -X POST http://localhost:3000/api/download-guide \
     -H "Content-Type: application/json" \
     -d '{
       "firstName": "Test",
       "lastName": "User",
       "email": "your_test_email@gmail.com",
       "company": "Test Company",
       "role": "Manager",
       "companySize": "51-200",
       "primaryInterest": "Content Generation",
       "timeline": "Short",
       "marketingConsent": true
     }'
   ```

## 🚀 Production Deployment

For Vercel deployment, add environment variables:

1. **Go to Vercel Dashboard** > Your Project > Settings > Environment Variables
2. **Add the same variables** from your `.env.local`
3. **Redeploy** your project

## 💡 Recommendations

- **SendGrid** for production (reliable, good deliverability)
- **Gmail SMTP** for testing only (has daily limits)
- **Custom domain** for better deliverability (`guides@siteoptz.ai`)
- **SPF/DKIM records** for your domain to improve delivery rates

## 📞 Need Help?

If you're still having issues:
1. Check the browser developer console for API errors
2. Check the terminal/Vercel logs for server errors
3. Try a different email provider
4. Test with a personal email first

The lead capture is working regardless - emails are just the bonus follow-up! 🎯