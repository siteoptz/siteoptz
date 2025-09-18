// OTP Email Template
function generateOTPEmailHTML(code, expirationMinutes = 10) {
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Your One-Time Access Code</title>
      <style>
        body {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
          line-height: 1.6;
          color: #333;
          max-width: 600px;
          margin: 0 auto;
          padding: 20px;
          background-color: #f4f4f4;
        }
        .email-container {
          background-color: #ffffff;
          padding: 40px;
          border-radius: 12px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        }
        .header {
          text-align: center;
          margin-bottom: 40px;
        }
        .logo {
          font-size: 28px;
          font-weight: bold;
          color: #2563eb;
          margin-bottom: 10px;
        }
        .otp-code {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          font-size: 36px;
          font-weight: bold;
          letter-spacing: 8px;
          text-align: center;
          padding: 20px;
          border-radius: 12px;
          margin: 30px 0;
          font-family: 'Courier New', monospace;
        }
        .message {
          text-align: center;
          margin-bottom: 30px;
          font-size: 16px;
          line-height: 1.5;
        }
        .expiration {
          background-color: #fef3c7;
          border: 1px solid #f59e0b;
          color: #92400e;
          padding: 15px;
          border-radius: 8px;
          text-align: center;
          margin: 20px 0;
          font-size: 14px;
        }
        .security-note {
          background-color: #eff6ff;
          border: 1px solid #3b82f6;
          color: #1e40af;
          padding: 15px;
          border-radius: 8px;
          margin: 20px 0;
          font-size: 14px;
        }
        .footer {
          text-align: center;
          margin-top: 40px;
          padding-top: 20px;
          border-top: 1px solid #e5e7eb;
          color: #6b7280;
          font-size: 14px;
        }
        .button {
          display: inline-block;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          padding: 12px 24px;
          text-decoration: none;
          border-radius: 6px;
          font-weight: 500;
          margin: 10px 0;
        }
      </style>
    </head>
    <body>
      <div class="email-container">
        <div class="header">
          <div class="logo">SiteOptz AI</div>
          <h1 style="color: #1f2937; margin: 0; font-size: 24px;">Your One-Time Access Code</h1>
        </div>
        
        <div class="message">
          <p>Use this code to complete your sign-in to SiteOptz AI:</p>
        </div>
        
        <div class="otp-code">
          ${code}
        </div>
        
        <div class="expiration">
          ⏰ This code expires in ${expirationMinutes} minutes
        </div>
        
        <div class="security-note">
          🔒 <strong>Security Notice:</strong> This code is for one-time use only. If you didn't request this code, please ignore this email.
        </div>
        
        <div class="message">
          <p>Enter this code in the sign-in form to access your account.</p>
          <p>Having trouble? Contact our support team.</p>
        </div>
        
        <div class="footer">
          <p>This email was sent by SiteOptz AI</p>
          <p><a href="https://siteoptz.ai" style="color: #3b82f6;">Visit SiteOptz.ai</a></p>
        </div>
      </div>
    </body>
    </html>
  `;
}

function generateOTPEmailText(code, expirationMinutes = 10) {
  return `
SiteOptz AI - Your One-Time Access Code

Your verification code: ${code}

Use this code to complete your sign-in to SiteOptz AI.

IMPORTANT:
- This code expires in ${expirationMinutes} minutes
- This code is for one-time use only
- If you didn't request this code, please ignore this email

Enter this code in the sign-in form to access your account.

Having trouble? Contact our support team.

---
SiteOptz AI
https://siteoptz.ai
  `.trim();
}

module.exports = {
  generateOTPEmailHTML,
  generateOTPEmailText
};