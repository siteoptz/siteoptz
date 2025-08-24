import { NextApiRequest, NextApiResponse } from 'next';
import { sendEmail } from '../../lib/email-service';
import fs from 'fs';
import path from 'path';

// GoHighLevel API configuration
const GHL_API_KEY = process.env.GHL_API_KEY || '';
const GHL_LOCATION_ID = process.env.GHL_LOCATION_ID || '';
const GHL_API_BASE = 'https://rest.gohighlevel.com/v1';

// Email configuration
const EMAIL_FROM = process.env.EMAIL_FROM || 'info@siteoptz.ai';

interface LeadData {
  firstName: string;
  lastName: string;
  email: string;
  company: string;
  role: string;
  companySize: string;
  primaryInterest: string;
  timeline: string;
  marketingConsent: boolean;
}

// Generate text version for email
function generateEmailText(leadData: LeadData) {
  return `
Hi ${leadData.firstName},

Thank you for downloading our comprehensive Enterprise AI Tools Landscape 2025 report. This strategic intelligence document contains everything you need to make informed decisions about AI tool adoption and implementation.

🎯 Your Personalized Insights
Based on your interest in ${leadData.primaryInterest} and your ${leadData.timeline === 'Immediate' ? 'immediate implementation timeline' : `${leadData.timeline} timeline`}, pay special attention to:
- Section 4: Strategic Tool Evaluation Framework (page 12)
- Section 5: ${leadData.primaryInterest} Analysis (page 18)  
- Section 6: Implementation Roadmap for ${leadData.companySize} companies (page 28)

📄 Download Your Guide: ${process.env.NEXT_PUBLIC_SITE_URL}/guides/ai-tools-comparison-guide-2025.pdf

What's Inside Your Guide:
✓ Comprehensive analysis of 93+ AI tools across all categories
✓ Strategic evaluation framework for tool selection
✓ Real-world implementation roadmaps and timelines
✓ ROI calculators and total cost of ownership models
✓ Risk assessment matrices and mitigation strategies
✓ Vendor comparison charts and competitive positioning
✓ Industry-specific recommendations and use cases
✓ Future market projections and emerging technologies

💡 Quick Start Tip: Begin with the Executive Summary (page 3) for key insights, then jump to your specific use case section for detailed recommendations tailored to ${leadData.companySize} organizations.

Next Steps:
1. Review the Executive Summary - Get the key insights in 5 minutes
2. Identify Your Use Cases - Use our framework to prioritize AI initiatives
3. Build Your Business Case - Leverage our ROI calculators and benchmarks
4. Plan Your Implementation - Follow our proven 18-month roadmap

If you have any questions about the report or need help with your AI strategy, feel free to reply to this email or schedule a consultation:
📅 Schedule a Free AI Strategy Consultation: ${process.env.NEXT_PUBLIC_SITE_URL}/consultation

Best regards,
The SiteOptz Research Team

© 2025 SiteOptz. All rights reserved.
You received this email because you downloaded our AI Tools Guide at ${leadData.email}
  `;
}

// Add lead to GoHighLevel CRM
async function addToGoHighLevel(leadData: LeadData) {
  try {
    const ghlData = {
      firstName: leadData.firstName,
      lastName: leadData.lastName,
      email: leadData.email,
      phone: '', // Optional, not collected in form
      tags: [
        'AI Tools Guide Download',
        `Company Size: ${leadData.companySize}`,
        `Role: ${leadData.role}`,
        `Interest: ${leadData.primaryInterest}`,
        `Timeline: ${leadData.timeline}`,
        leadData.marketingConsent ? 'Marketing Consent: Yes' : 'Marketing Consent: No'
      ],
      customField: {
        company: leadData.company,
        downloadedGuide: 'Enterprise AI Tools Landscape 2025',
        downloadDate: new Date().toISOString(),
      },
      source: 'AI Tools Comparison Guide',
    };

    const response = await fetch(`${GHL_API_BASE}/contacts/`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${GHL_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...ghlData,
        locationId: GHL_LOCATION_ID,
      }),
    });

    if (!response.ok) {
      console.error('GoHighLevel API error:', await response.text());
      throw new Error(`GoHighLevel API error: ${response.status}`);
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error('Error adding lead to GoHighLevel:', error);
    // Don't throw - we still want to send the email even if CRM fails
    return null;
  }
}

// Generate HTML email template
function generateEmailHTML(leadData: LeadData) {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Your AI Tools Guide is Ready</title>
    <style>
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            background-color: #f5f5f5;
        }
        .container {
            background-color: white;
            border-radius: 10px;
            padding: 40px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        }
        .header {
            background: linear-gradient(135deg, #1e293b 0%, #475569 100%);
            color: white;
            padding: 30px;
            border-radius: 10px 10px 0 0;
            margin: -40px -40px 30px -40px;
            text-align: center;
        }
        .logo {
            font-size: 24px;
            font-weight: bold;
            margin-bottom: 10px;
        }
        h1 {
            font-size: 28px;
            font-weight: 300;
            margin: 0;
        }
        .subtitle {
            font-size: 16px;
            opacity: 0.9;
            margin-top: 5px;
        }
        .content {
            margin: 30px 0;
        }
        .highlight-box {
            background-color: #f0f9ff;
            border-left: 4px solid #3b82f6;
            padding: 20px;
            margin: 25px 0;
            border-radius: 5px;
        }
        .cta-button {
            display: inline-block;
            background-color: #3b82f6;
            color: white;
            text-decoration: none;
            padding: 15px 40px;
            border-radius: 5px;
            font-weight: 600;
            margin: 20px 0;
            text-align: center;
        }
        .stats {
            display: flex;
            justify-content: space-around;
            margin: 30px 0;
            text-align: center;
        }
        .stat {
            flex: 1;
        }
        .stat-number {
            font-size: 24px;
            font-weight: bold;
            color: #3b82f6;
        }
        .stat-label {
            font-size: 12px;
            color: #666;
            text-transform: uppercase;
            letter-spacing: 1px;
        }
        .checklist {
            list-style: none;
            padding: 0;
            margin: 20px 0;
        }
        .checklist li {
            padding: 10px 0;
            padding-left: 30px;
            position: relative;
        }
        .checklist li:before {
            content: "✓";
            position: absolute;
            left: 0;
            color: #10b981;
            font-weight: bold;
            font-size: 18px;
        }
        .footer {
            margin-top: 40px;
            padding-top: 20px;
            border-top: 1px solid #e5e5e5;
            font-size: 12px;
            color: #666;
            text-align: center;
        }
        .social-links {
            margin: 20px 0;
        }
        .social-links a {
            margin: 0 10px;
            color: #666;
            text-decoration: none;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <div class="logo">SITEOPTZ</div>
            <h1>Your Strategic Intelligence Report is Ready</h1>
            <div class="subtitle">Enterprise AI Tools Landscape 2025</div>
        </div>
        
        <div class="content">
            <p>Hi ${leadData.firstName},</p>
            
            <p>Thank you for downloading our comprehensive <strong>Enterprise AI Tools Landscape 2025</strong> report. This strategic intelligence document contains everything you need to make informed decisions about AI tool adoption and implementation.</p>
            
            <div class="highlight-box">
                <strong>🎯 Your Personalized Insights</strong><br>
                Based on your interest in <strong>${leadData.primaryInterest}</strong> and your ${leadData.timeline === 'Immediate' ? 'immediate implementation timeline' : `${leadData.timeline} timeline`}, 
                pay special attention to:
                <ul style="margin: 10px 0 0 0;">
                    <li>Section 4: Strategic Tool Evaluation Framework (page 12)</li>
                    <li>Section 5: ${leadData.primaryInterest} Analysis (page 18)</li>
                    <li>Section 6: Implementation Roadmap for ${leadData.companySize} companies (page 28)</li>
                </ul>
            </div>
            
            <div style="text-align: center; margin: 30px 0;">
                <a href="${process.env.NEXT_PUBLIC_SITE_URL}/guides/ai-tools-comparison-guide-2025.pdf" class="cta-button">
                    📄 Download Your Guide (PDF, 4.2MB)
                </a>
            </div>
            
            <div class="stats">
                <div class="stat">
                    <div class="stat-number">200+</div>
                    <div class="stat-label">Tools Analyzed</div>
                </div>
                <div class="stat">
                    <div class="stat-number">45</div>
                    <div class="stat-label">Pages</div>
                </div>
                <div class="stat">
                    <div class="stat-number">300%</div>
                    <div class="stat-label">Avg ROI</div>
                </div>
            </div>
            
            <h3>What's Inside Your Guide:</h3>
            <ul class="checklist">
                <li>Comprehensive analysis of 93+ AI tools across all categories</li>
                <li>Strategic evaluation framework for tool selection</li>
                <li>Real-world implementation roadmaps and timelines</li>
                <li>ROI calculators and total cost of ownership models</li>
                <li>Risk assessment matrices and mitigation strategies</li>
                <li>Vendor comparison charts and competitive positioning</li>
                <li>Industry-specific recommendations and use cases</li>
                <li>Future market projections and emerging technologies</li>
            </ul>
            
            <div style="background-color: #fef3c7; padding: 20px; border-radius: 5px; margin: 25px 0;">
                <strong>💡 Quick Start Tip:</strong><br>
                Begin with the Executive Summary (page 3) for key insights, then jump to your specific use case section for detailed recommendations tailored to ${leadData.companySize} organizations.
            </div>
            
            <h3>Next Steps:</h3>
            <ol>
                <li><strong>Review the Executive Summary</strong> - Get the key insights in 5 minutes</li>
                <li><strong>Identify Your Use Cases</strong> - Use our framework to prioritize AI initiatives</li>
                <li><strong>Build Your Business Case</strong> - Leverage our ROI calculators and benchmarks</li>
                <li><strong>Plan Your Implementation</strong> - Follow our proven 18-month roadmap</li>
            </ol>
            
            ${leadData.marketingConsent ? `
            <div style="background-color: #f0f9ff; padding: 20px; border-radius: 5px; margin: 25px 0;">
                <strong>📧 Stay Updated:</strong><br>
                You'll receive our monthly AI Insights newsletter with the latest tools, trends, and implementation strategies. 
                Each edition includes exclusive case studies and early access to our research.
            </div>
            ` : ''}
            
            <p>If you have any questions about the report or need help with your AI strategy, feel free to reply to this email or schedule a consultation:</p>
            
            <div style="text-align: center; margin: 30px 0;">
                <a href="${process.env.NEXT_PUBLIC_SITE_URL}/consultation" style="color: #3b82f6; text-decoration: none; font-weight: 600;">
                    📅 Schedule a Free AI Strategy Consultation
                </a>
            </div>
            
            <p>Best regards,<br>
            <strong>The SiteOptz Research Team</strong></p>
        </div>
        
        <div class="footer">
            <div class="social-links">
                <a href="https://linkedin.com/company/siteoptz">LinkedIn</a>
                <a href="https://twitter.com/siteoptz">Twitter</a>
                <a href="${process.env.NEXT_PUBLIC_SITE_URL}">Website</a>
            </div>
            
            <p>© 2025 SiteOptz. All rights reserved.</p>
            <p>You received this email because you downloaded our AI Tools Guide at ${leadData.email}</p>
            ${leadData.marketingConsent ? `
            <p><a href="${process.env.NEXT_PUBLIC_SITE_URL}/unsubscribe?email=${encodeURIComponent(leadData.email)}" style="color: #666;">Unsubscribe</a> | 
            <a href="${process.env.NEXT_PUBLIC_SITE_URL}/preferences?email=${encodeURIComponent(leadData.email)}" style="color: #666;">Update Preferences</a></p>
            ` : ''}
        </div>
    </div>
</body>
</html>
  `;
}

// Send email with the guide
async function sendGuideEmail(leadData: LeadData) {
  try {
    const result = await sendEmail({
      to: leadData.email,
      subject: `${leadData.firstName}, Your Enterprise AI Tools Guide is Ready 📊`,
      html: generateEmailHTML(leadData),
      text: generateEmailText(leadData),
      from: `"SiteOptz AI" <${EMAIL_FROM}>`,
      bcc: 'info@siteoptz.ai' // Always BCC info@siteoptz.ai for tracking
    });

    if (result.success) {
      const messageId = 'messageId' in result ? result.messageId : 'success';
      console.log('Email sent:', messageId);
      return { messageId, success: true };
    } else {
      console.error('Email send failed:', result.error);
      return { messageId: 'failed', error: result.error, success: false };
    }
  } catch (error) {
    console.error('Error sending email:', error);
    return { messageId: 'failed', error: error instanceof Error ? error.message : 'Unknown error', success: false };
  }
}

// Main API handler
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  console.log('Download guide API called:', req.method);
  
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const leadData: LeadData = req.body;
    console.log('Lead data received:', { email: leadData.email, company: leadData.company });
    
    // Validate required fields
    if (!leadData.firstName || !leadData.lastName || !leadData.email || !leadData.company || !leadData.role || !leadData.companySize) {
      return res.status(400).json({ error: 'Missing required fields' });
    }
    
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(leadData.email)) {
      return res.status(400).json({ error: 'Invalid email format' });
    }
    
    // Add to GoHighLevel CRM (non-blocking)
    const ghlPromise = addToGoHighLevel(leadData);
    
    // Send email with guide (non-blocking if it fails)
    const emailResult = await sendGuideEmail(leadData);
    
    // Wait for GoHighLevel to complete (but don't block on failure)
    const ghlResult = await ghlPromise;
    
    // Log the download for analytics
    console.log('Guide download:', {
      email: leadData.email,
      company: leadData.company,
      role: leadData.role,
      companySize: leadData.companySize,
      primaryInterest: leadData.primaryInterest,
      timeline: leadData.timeline,
      timestamp: new Date().toISOString(),
      ghlSuccess: !!ghlResult,
      emailSuccess: emailResult.success || false,
    });
    
    // Return success response
    res.status(200).json({
      success: true,
      message: 'Guide sent successfully',
      downloadUrl: `${process.env.NEXT_PUBLIC_SITE_URL}/guides/ai-tools-comparison-guide-2025.pdf`,
    });
  } catch (error) {
    console.error('API error:', error);
    
    // Provide more specific error details for debugging
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    const errorDetails = {
      error: 'Failed to process request',
      message: errorMessage,
      timestamp: new Date().toISOString(),
      hasGhlConfig: !!GHL_API_KEY && !!GHL_LOCATION_ID,
    };
    
    console.error('Detailed error info:', errorDetails);
    
    res.status(500).json(errorDetails);
  }
}