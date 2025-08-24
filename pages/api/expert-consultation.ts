import { NextApiRequest, NextApiResponse } from 'next';
import { sendEmail } from '../../lib/email-service';

// GoHighLevel API configuration
const GHL_API_KEY = process.env.GHL_API_KEY || '';
const GHL_LOCATION_ID = process.env.GHL_LOCATION_ID || '';
const GHL_API_BASE = 'https://rest.gohighlevel.com/v1';

interface ExpertConsultationData {
  firstName: string;
  lastName: string;
  email: string;
  company: string;
  phone?: string;
  message?: string;
  interestedTools: string[];
  budget?: string;
  timeline?: string;
  totalCost?: number;
  billingCycle?: string;
}

interface ApiResponse {
  message: string;
  success: boolean;
  error?: string;
}

// Add lead to GoHighLevel CRM
async function addToGoHighLevel(data: ExpertConsultationData) {
  try {
    console.log('=== GoHighLevel Consultation Integration Debug ===');
    console.log('API Key exists:', !!GHL_API_KEY);
    console.log('API Key length:', GHL_API_KEY.length);
    console.log('Location ID:', GHL_LOCATION_ID);
    console.log('Environment:', process.env.NODE_ENV);
    const ghlData = {
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      phone: data.phone || '',
      tags: [
        'New Lead',  // This tag triggers the 'New Lead Workflow'
        'Expert Consultation Request',
        `Company: ${data.company}`,
        ...(data.budget ? [`Budget: ${data.budget}`] : []),
        ...(data.timeline ? [`Timeline: ${data.timeline}`] : []),
        ...(data.interestedTools.length > 0 ? [`Tools: ${data.interestedTools.join(', ')}`] : []),
        ...(data.totalCost ? [`Estimated Cost: $${data.totalCost}`] : []),
        `Requested: ${new Date().toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}`
      ],
      customField: {
        company: data.company,
        consultationType: 'AI Expert Consultation',
        requestDate: new Date().toISOString(),
        budget: data.budget || '',
        timeline: data.timeline || '',
        interestedTools: data.interestedTools.join(', '),
        totalCost: data.totalCost?.toString() || '',
        billingCycle: data.billingCycle || '',
        message: data.message || ''
      },
      source: 'Expert Consultation Request - SiteOptz Website',
      locationId: GHL_LOCATION_ID,
    };

    console.log('Sending consultation data to GoHighLevel:', JSON.stringify(ghlData, null, 2));

    const response = await fetch(`${GHL_API_BASE}/contacts/`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${GHL_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(ghlData),
    });

    console.log('GoHighLevel Consultation API Response Status:', response.status);
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error('GoHighLevel Consultation API error:', errorText);
      throw new Error(`GoHighLevel API error: ${response.status} - ${errorText}`);
    }

    const result = await response.json();
    console.log('GoHighLevel Consultation Success:', result);
    console.log('Contact ID:', result.contact?.id);
    console.log('===================================================');
    return result;
  } catch (error) {
    console.error('Error adding consultation request to GoHighLevel:', error);
    return null;
  }
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ApiResponse>
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ 
      success: false, 
      message: 'Method not allowed',
      error: 'Only POST requests are allowed'
    });
  }

  try {
    const data: ExpertConsultationData = req.body;
    
    // Validate required fields
    if (!data.firstName || !data.lastName || !data.email || !data.company) {
      return res.status(400).json({
        success: false,
        message: 'Missing required fields',
        error: 'First name, last name, email, and company are required'
      });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid email format',
        error: 'Please provide a valid email address'
      });
    }

    // Email content for the user (confirmation)
    const userEmailHtml = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <title>Your AI Expert Consultation Request</title>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
          .content { background: #f8f9fa; padding: 30px; border-radius: 0 0 10px 10px; }
          .highlight { background: white; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #667eea; }
          .footer { text-align: center; padding: 20px; color: #666; font-size: 14px; }
          .cta-button { display: inline-block; background: #667eea; color: white; padding: 12px 30px; text-decoration: none; border-radius: 6px; margin: 10px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Thank You, ${data.firstName}! 🤝</h1>
            <p>Your AI expert consultation request has been received</p>
          </div>
          
          <div class="content">
            <h2>What happens next?</h2>
            <ul>
              <li>✅ Our AI expert will review your requirements within 4 hours</li>
              <li>✅ We'll contact you within 24 hours to schedule your consultation</li>
              <li>✅ You'll receive a personalized AI strategy recommendation</li>
            </ul>
            
            <div class="highlight">
              <h3>Your Request Summary:</h3>
              <p><strong>Company:</strong> ${data.company}</p>
              <p><strong>Email:</strong> ${data.email}</p>
              ${data.phone ? `<p><strong>Phone:</strong> ${data.phone}</p>` : ''}
              ${data.budget ? `<p><strong>Budget Range:</strong> ${data.budget}</p>` : ''}
              ${data.timeline ? `<p><strong>Timeline:</strong> ${data.timeline}</p>` : ''}
              ${data.interestedTools.length > 0 ? `<p><strong>Interested Tools:</strong> ${data.interestedTools.join(', ')}</p>` : ''}
              ${data.totalCost ? `<p><strong>Estimated Cost:</strong> $${data.totalCost}${data.billingCycle === 'annual' ? '/year' : '/month'}</p>` : ''}
              ${data.message ? `<p><strong>Message:</strong><br>${data.message}</p>` : ''}
            </div>
            
            <p>In the meantime, feel free to explore our AI tools directory or read our latest comparison guides.</p>
            
            <p style="text-align: center;">
              <a href="https://siteoptz.ai/tools" class="cta-button">Browse AI Tools</a>
              <a href="https://siteoptz.ai/compare" class="cta-button">Tool Comparisons</a>
            </p>
          </div>
          
          <div class="footer">
            <p>© 2025 SiteOptz. All rights reserved.</p>
            <p>If you have urgent questions, reply directly to this email.</p>
          </div>
        </div>
      </body>
      </html>
    `;

    const userEmailText = `
Thank You, ${data.firstName}!

Your AI expert consultation request has been received.

What happens next?
- Our AI expert will review your requirements within 4 hours
- We'll contact you within 24 hours to schedule your consultation  
- You'll receive a personalized AI strategy recommendation

Your Request Summary:
Company: ${data.company}
Email: ${data.email}
${data.phone ? `Phone: ${data.phone}` : ''}
${data.budget ? `Budget Range: ${data.budget}` : ''}
${data.timeline ? `Timeline: ${data.timeline}` : ''}
${data.interestedTools.length > 0 ? `Interested Tools: ${data.interestedTools.join(', ')}` : ''}
${data.totalCost ? `Estimated Cost: $${data.totalCost}${data.billingCycle === 'annual' ? '/year' : '/month'}` : ''}
${data.message ? `Message: ${data.message}` : ''}

Explore more: https://siteoptz.ai/tools

© 2025 SiteOptz. All rights reserved.
    `;

    // Email content for the team (notification)
    const teamEmailHtml = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <title>New AI Expert Consultation Request</title>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: #e3f2fd; padding: 20px; border-radius: 8px; margin-bottom: 20px; }
          .content { background: white; padding: 20px; border: 1px solid #dee2e6; border-radius: 8px; }
          .field { margin-bottom: 15px; padding-bottom: 15px; border-bottom: 1px solid #eee; }
          .field:last-child { border-bottom: none; }
          .label { font-weight: bold; color: #495057; margin-bottom: 5px; }
          .value { color: #212529; }
          .priority { background: #fff3cd; padding: 15px; border-left: 4px solid #ffc107; margin: 20px 0; border-radius: 4px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>🎯 New AI Expert Consultation Request</h1>
            <p>A new client is requesting an AI strategy consultation</p>
            <p><strong>Received:</strong> ${new Date().toLocaleString()}</p>
          </div>
          
          <div class="content">
            <div class="field">
              <div class="label">Contact Information:</div>
              <div class="value">
                ${data.firstName} ${data.lastName}<br>
                ${data.email}<br>
                ${data.phone ? `${data.phone}<br>` : ''}
                ${data.company}
              </div>
            </div>
            
            <div class="field">
              <div class="label">Project Details:</div>
              <div class="value">
                ${data.budget ? `Budget Range: ${data.budget}<br>` : ''}
                ${data.timeline ? `Timeline: ${data.timeline}<br>` : ''}
                ${data.interestedTools.length > 0 ? `Interested Tools: ${data.interestedTools.join(', ')}<br>` : ''}
                ${data.totalCost ? `Estimated Cost: $${data.totalCost}${data.billingCycle === 'annual' ? '/year' : '/month'}<br>` : ''}
              </div>
            </div>
            
            ${data.message ? `
            <div class="field">
              <div class="label">Client Message:</div>
              <div class="value" style="white-space: pre-wrap;">${data.message}</div>
            </div>
            ` : ''}
            
            <div class="priority">
              <strong>⏰ Action Required:</strong><br>
              Please contact ${data.firstName} within 24 hours to schedule their consultation.
            </div>
          </div>
        </div>
      </body>
      </html>
    `;

    // Send confirmation email to user
    const userEmailResult = await sendEmail({
      to: data.email,
      subject: `${data.firstName}, Your AI Consultation Request is Confirmed 🤖`,
      html: userEmailHtml,
      text: userEmailText,
      from: process.env.EMAIL_FROM || 'info@siteoptz.ai',
      bcc: 'info@siteoptz.ai' // BCC for tracking
    });

    // Add to GoHighLevel CRM (non-blocking)
    const ghlResult = await addToGoHighLevel(data);
    
    // Send notification email to team
    const teamEmailResult = await sendEmail({
      to: 'info@siteoptz.ai',
      subject: `New AI Expert Consultation: ${data.firstName} ${data.lastName} (${data.company})`,
      html: teamEmailHtml,
      text: `New AI Expert Consultation Request

Contact: ${data.firstName} ${data.lastName}
Email: ${data.email}
Company: ${data.company}
${data.phone ? `Phone: ${data.phone}` : ''}
${data.budget ? `Budget: ${data.budget}` : ''}
${data.timeline ? `Timeline: ${data.timeline}` : ''}
${data.interestedTools.length > 0 ? `Tools: ${data.interestedTools.join(', ')}` : ''}
${data.totalCost ? `Estimated Cost: $${data.totalCost}${data.billingCycle === 'annual' ? '/year' : '/month'}` : ''}

${data.message ? `Message: ${data.message}` : ''}

Received: ${new Date().toLocaleString()}
Action Required: Contact within 24 hours`,
      from: process.env.EMAIL_FROM || 'info@siteoptz.ai',
      bcc: null // No BCC needed for team notification
    });

    console.log('Expert consultation processing completed:', {
      userEmail: userEmailResult.success,
      teamEmail: teamEmailResult.success,
      ghlSuccess: !!ghlResult,
      ghlContactId: ghlResult?.contact?.id || 'N/A',
      contact: `${data.firstName} ${data.lastName} (${data.email})`
    });

    return res.status(200).json({
      success: true,
      message: 'Thank you! An AI expert will contact you within 24 hours to schedule your consultation.'
    });

  } catch (error) {
    console.error('Expert consultation API error:', error);
    
    return res.status(500).json({
      success: false,
      message: 'Failed to process your request',
      error: 'Please try again or contact support directly.'
    });
  }
}