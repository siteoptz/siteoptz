import fs from "fs";
import path from "path";
import nodemailer from "nodemailer"; // Or SendGrid/Mailgun

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const quotesFile = path.join(process.cwd(), "data", "quotes.json");
  const quotes = fs.existsSync(quotesFile)
    ? JSON.parse(fs.readFileSync(quotesFile, "utf-8"))
    : [];

  const now = new Date();
  let remindersSent = 0;

  const transporter = nodemailer.createTransporter({
    service: "Gmail", // Or use SendGrid
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  for (const quote of quotes) {
    const expiry = new Date(quote.expiresAt);
    const hoursLeft = (expiry - now) / (1000 * 60 * 60);

    if (hoursLeft <= 24 && hoursLeft > 0 && !quote.reminded && quote.email) {
      const mailOptions = {
        from: `"SiteOptz.ai" <${process.env.EMAIL_USER}>`,
        to: quote.email,
        subject: "Your SiteOptz.ai discount expires soon!",
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #333;">Hi there,</h2>
            <p>Your exclusive discount for the <strong>${quote.selectedPlan}</strong> plan is expiring in less than 24 hours.</p>
            <p>Don't miss out on your savings!</p>
            <div style="text-align: center; margin: 30px 0;">
              <a href="https://siteoptz.ai/pricing?quoteId=${quote.id}" 
                 style="background:#4CAF50;color:white;padding:15px 30px;text-decoration:none;border-radius:5px;font-weight:bold;display:inline-block;">
                Claim My Discount Now
              </a>
            </div>
            <p style="color: #666; font-size: 14px;">
              This link will expire in ${Math.round(hoursLeft)} hours.
            </p>
            <hr style="margin: 30px 0; border: none; border-top: 1px solid #eee;">
            <p style="color: #999; font-size: 12px;">
              SiteOptz.ai - AI Tools Comparison Platform<br>
              <a href="https://siteoptz.ai" style="color: #4CAF50;">Visit our website</a>
            </p>
          </div>
        `,
      };

      try {
        await transporter.sendMail(mailOptions);
        console.log(`Reminder sent to ${quote.email} for quote ${quote.id}`);
        
        // Mark as reminded
        quote.reminded = true;
        remindersSent++;
      } catch (error) {
        console.error(`Failed to send reminder to ${quote.email}:`, error);
      }
    }
  }

  // Save updated quotes with reminder flags
  fs.writeFileSync(quotesFile, JSON.stringify(quotes, null, 2));

  res.status(200).json({ 
    success: true, 
    remindersSent,
    message: `Sent ${remindersSent} reminder emails` 
  });
}