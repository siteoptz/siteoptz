# OTP Production Email Guide

## 🚀 Switch from Console to Email Delivery

Currently, the OTP system shows codes in the development console. To switch to production mode where users receive codes via email, follow these steps:

### **Option 1: Set Email Provider (Recommended)**

Add this to your `.env.local` or environment variables:

```bash
EMAIL_PROVIDER=sendgrid
# OR
EMAIL_PROVIDER=smtp
```

### **Option 2: Configure Email Service**

The system already has email infrastructure. Just configure one of these:

#### **SendGrid (Recommended)**
```bash
EMAIL_PROVIDER=sendgrid
SENDGRID_API_KEY=your_sendgrid_api_key
EMAIL_FROM=noreply@siteoptz.ai
```

#### **SMTP (Alternative)**
```bash
EMAIL_PROVIDER=smtp
EMAIL_SMTP_HOST=smtp.gmail.com
EMAIL_SMTP_PORT=587
EMAIL_SMTP_USER=your_email@gmail.com
EMAIL_SMTP_PASS=your_app_password
EMAIL_FROM=noreply@siteoptz.ai
```

### **Option 3: Production Deployment**

When `NODE_ENV=production`, the system automatically switches to email mode regardless of EMAIL_PROVIDER setting.

```bash
NODE_ENV=production
```

## 📧 Email Template Features

When production mode is active, users will receive:

✅ **Professional HTML email** with SiteOptz branding  
✅ **6-digit code** prominently displayed  
✅ **Security warnings** about one-time use  
✅ **10-minute expiration notice**  
✅ **Responsive design** for mobile devices  
✅ **Plain text fallback** for email clients  

## 🔧 Current Behavior

### **Development Mode (Current)**
- Codes appear in terminal/console where `npm run dev` is running
- Look for messages with 🔑 emoji
- Users see: "check your terminal where you're running 'npm run dev'"

### **Production Mode (After Setup)**
- Codes sent via email to user's inbox
- Professional branded email template
- Users see: "One-time code sent to your-email@example.com. Please check your email inbox (and spam folder if needed)."

## 🛠️ Testing Email Templates

To test the email template in development:

```bash
# Set EMAIL_PROVIDER to 'console' to see full email content in terminal
EMAIL_PROVIDER=console npm run dev
```

This will show the complete HTML email template in your console when OTP is requested.

## 🚨 Important Notes

1. **Email Setup Required**: You need either SendGrid API key or SMTP credentials
2. **DNS Configuration**: For production, ensure proper SPF/DKIM records for email deliverability
3. **Rate Limiting**: Consider implementing rate limiting for OTP requests in production
4. **Error Handling**: System falls back to console mode if email fails
5. **Testing**: Always test email delivery before going live

## 🔄 Quick Switch Commands

```bash
# Switch to email mode immediately
export EMAIL_PROVIDER=sendgrid
# OR
echo "EMAIL_PROVIDER=sendgrid" >> .env.local

# Switch back to console mode
export EMAIL_PROVIDER=console
# OR  
echo "EMAIL_PROVIDER=console" >> .env.local
```

The system will automatically detect the change and use the appropriate delivery method!