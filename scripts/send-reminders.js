#!/usr/bin/env node

// Cron job script to send quote expiry reminders
// Run this with: node scripts/send-reminders.js
// Or set up a cron job: 0 9 * * * node /path/to/scripts/send-reminders.js

const fs = require("fs");
const path = require("path");
const nodemailer = require("nodemailer");

async function sendReminders() {
  const quotesFile = path.join(__dirname, "..", "data", "quotes.json");
  
  if (!fs.existsSync(quotesFile)) {
    console.log("No quotes file found");
    return;
  }

  const quotes = JSON.parse(fs.readFileSync(quotesFile, "utf-8"));
  const now = new Date();
  let remindersSent = 0;

  const transporter = nodemailer.createTransporter({
    service: "Gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  for (const quote of quotes) {
    if (!quote.email) continue;
    
    const expiry = new Date(quote.expiresAt);
    const hoursLeft = (expiry - now) / (1000 * 60 * 60);

    if (hoursLeft <= 24 && hoursLeft > 0 && !quote.reminded) {
      const mailOptions = {
        from: `"SiteOptz.ai" <${process.env.EMAIL_USER}>`,
        to: quote.email,
        subject: "⏰ Your discount expires in 24 hours!",
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
            <h2 style="color: #333; margin-bottom: 20px;">Don't Miss Out!</h2>
            <p style="font-size: 16px; line-height: 1.5;">
              Your exclusive discount for <strong>${quote.toolName} - ${quote.selectedPlan}</strong> 
              expires in <strong style="color: #e74c3c;">${Math.round(hoursLeft)} hours</strong>.
            </p>
            <div style="text-align: center; margin: 30px 0;">
              <a href="https://siteoptz.ai/pricing?quoteId=${quote.id}" 
                 style="background: linear-gradient(135deg, #4CAF50, #45a049); color: white; padding: 15px 30px; text-decoration: none; border-radius: 8px; font-weight: bold; display: inline-block; box-shadow: 0 4px 8px rgba(0,0,0,0.2);">
                🚀 Claim Discount Now
              </a>
            </div>
            <p style="color: #666; font-size: 14px; text-align: center;">
              This exclusive offer expires on ${expiry.toLocaleDateString()} at ${expiry.toLocaleTimeString()}.
            </p>
            <hr style="margin: 30px 0; border: none; border-top: 1px solid #eee;">
            <div style="text-align: center; color: #999; font-size: 12px;">
              <p><strong>SiteOptz.ai</strong> - AI Tools Comparison Platform</p>
              <p>Need help? <a href="mailto:support@siteoptz.ai" style="color: #4CAF50;">Contact Support</a></p>
            </div>
          </div>
        `,
      };

      try {
        await transporter.sendMail(mailOptions);
        console.log(`✅ Reminder sent to ${quote.email} for quote ${quote.id}`);
        
        quote.reminded = true;
        remindersSent++;
      } catch (error) {
        console.error(`❌ Failed to send reminder to ${quote.email}:`, error.message);
      }
    }
  }

  // Save updated quotes
  fs.writeFileSync(quotesFile, JSON.stringify(quotes, null, 2));
  
  console.log(`\n📧 Summary: Sent ${remindersSent} reminder emails`);
  console.log(`⏰ Run time: ${new Date().toISOString()}`);
}

// Run if called directly
if (require.main === module) {
  sendReminders().catch(console.error);
}

module.exports = sendReminders;