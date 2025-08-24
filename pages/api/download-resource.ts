import { NextApiRequest, NextApiResponse } from 'next';
import { sendEmail } from '../../lib/email-service';

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
  resourceType: string;
}

// Resource configurations
const resourceConfigs = {
  'playbook': {
    title: 'AI Implementation Playbook',
    fileName: 'ai-tools-comparison-guide-2025.pdf',
    description: 'comprehensive 50-page guide covering everything from AI strategy to measurement and optimization',
    benefits: [
      'Step-by-step implementation roadmap',
      'ROI calculation frameworks and templates',
      'Risk assessment and mitigation strategies',
      'Team training and change management guides',
      'Technology selection criteria and checklists',
      'Success metrics and KPI tracking templates'
    ]
  },
  'framework': {
    title: 'AI Tool Selection Framework',
    fileName: 'ai-tools-comparison-guide-2025.pdf',
    description: 'decision matrix and evaluation criteria to help you choose the right AI tools',
    benefits: [
      'Comprehensive tool evaluation matrix',
      'Business requirement assessment templates',
      'Cost-benefit analysis frameworks',
      'Integration capability checklists',
      'Security and compliance evaluation criteria',
      'Vendor comparison scorecards'
    ]
  },
  'both': {
    title: 'Complete AI Success Bundle',
    fileName: 'ai-tools-comparison-guide-2025.pdf',
    description: 'both the Implementation Playbook AND Tool Selection Framework together',
    benefits: [
      'Complete 50-page AI Implementation Playbook',
      'Tool Selection Framework with decision matrices',
      'ROI calculators and cost-benefit templates',
      'Implementation roadmaps and timelines',
      'Vendor evaluation scorecards',
      'Risk assessment and mitigation strategies'
    ]
  },
  'ai-chatbot-implementation': {
    title: 'Complete Guide to AI Chatbot Implementation',
    fileName: 'ai-chatbot-implementation-guide.pdf',
    description: 'step-by-step guide to implement AI chatbots from strategy to deployment',
    benefits: [
      'Chatbot strategy development framework',
      'Platform selection and comparison',
      'Implementation roadmap and timeline',
      'Integration best practices',
      'Training and optimization techniques',
      'ROI measurement and case studies'
    ]
  },
  'ai-content-generation': {
    title: 'AI Content Generation: Best Practices & Tools',
    fileName: 'ai-content-generation-guide.pdf',
    description: 'master AI content creation with proven strategies and tool comparisons',
    benefits: [
      'Content generation strategy frameworks',
      'Comprehensive tool comparison matrix',
      'Quality control and brand consistency',
      'SEO optimization with AI tools',
      'Workflow integration best practices',
      'Performance metrics and optimization'
    ]
  },
  'ai-data-analysis': {
    title: 'Data Analysis with AI: A Beginner\'s Roadmap',
    fileName: 'ai-data-analysis-guide.pdf',
    description: 'transform your data analysis workflow with AI tools and techniques',
    benefits: [
      'AI data analysis fundamentals',
      'Tool selection criteria and comparison',
      'Data preparation and cleaning workflows',
      'Implementation timeline and roadmap',
      'Visualization and reporting best practices',
      'Security, compliance, and ROI measurement'
    ]
  },
  'ai-healthcare-2024': {
    title: 'State of AI in Healthcare 2024',
    fileName: 'ai-healthcare-2024-report.pdf',
    description: 'comprehensive analysis of AI adoption in healthcare with ROI data from 200+ hospitals',
    benefits: [
      'Market analysis and adoption trends',
      'ROI data from 200+ healthcare institutions',
      'Implementation case studies and success stories',
      'Technology landscape and vendor analysis',
      'Regulatory compliance frameworks',
      'Future predictions and opportunities'
    ]
  },
  'gpt4-turbo-business': {
    title: 'OpenAI GPT-4 Turbo: Complete Business Guide',
    fileName: 'gpt4-turbo-business-guide.pdf',
    description: 'comprehensive guide to implementing GPT-4 Turbo in your business',
    benefits: [
      'GPT-4 Turbo features and capabilities',
      'Business use cases and applications',
      'Implementation strategy and roadmap',
      'Cost analysis and ROI calculations',
      'Integration best practices and security',
      'Performance optimization techniques'
    ]
  },
  'q4-2024-ai-market': {
    title: 'Q4 2024 AI Tools Market Analysis',
    fileName: 'q4-2024-ai-market-analysis.pdf',
    description: 'latest market research on AI tools landscape and trends',
    benefits: [
      'Market size and growth projections',
      'Competitive landscape analysis',
      'Funding and investment trends',
      'Emerging technologies and innovations',
      'Enterprise adoption rates and patterns',
      '2025 predictions and opportunities'
    ]
  },
  'claude3-vs-gpt4': {
    title: 'Anthropic Claude 3 vs GPT-4: Detailed Comparison',
    fileName: 'claude3-vs-gpt4-comparison.pdf',
    description: 'detailed comparison analysis to help you choose the right AI model',
    benefits: [
      'Performance benchmarks and testing results',
      'Feature comparison matrix and analysis',
      'Cost analysis and pricing comparison',
      'Use case applications and recommendations',
      'Integration capabilities and requirements',
      'Security, privacy, and compliance features'
    ]
  },
  'fintech-ai-2024': {
    title: 'Financial Services AI Transformation Report',
    fileName: 'fintech-ai-2024-report.pdf',
    description: 'comprehensive analysis of AI adoption in banking and financial services',
    benefits: [
      'AI adoption trends in banking and finance',
      'Fraud detection and risk assessment case studies',
      'Customer service transformation examples',
      'Algorithmic trading and investment AI insights',
      'Regulatory compliance and ethics framework',
      'ROI analysis and cost-benefit studies'
    ]
  },
  'manufacturing-ai-2024': {
    title: 'Manufacturing AI Efficiency Study',
    fileName: 'manufacturing-ai-2024-report.pdf',
    description: 'data-driven insights on AI improving manufacturing efficiency and quality control',
    benefits: [
      'AI implementation in manufacturing processes',
      'Efficiency improvements and cost savings data',
      'Quality control and predictive maintenance',
      'Supply chain optimization strategies',
      'Smart factory and Industry 4.0 insights',
      'Case studies from 50+ manufacturers'
    ]
  },
  'claude-ai-business-setup': {
    title: 'Getting Started with Claude AI for Business',
    fileName: 'claude-ai-business-setup-resources.pdf',
    description: 'complete video walkthrough with supplementary resources for Claude AI business setup',
    benefits: [
      'Step-by-step Claude AI setup guide',
      'Advanced prompt engineering techniques',
      'Business workflow integration methods',
      'Security and privacy best practices',
      'Cost optimization strategies',
      'Real-world business use case examples'
    ]
  },
  'ai-tools-comparison-video': {
    title: 'ChatGPT vs Claude vs Gemini: Tool Comparison',
    fileName: 'ai-tools-comparison-guide-2025.pdf',
    description: 'side-by-side comparison video with supplementary comparison guide',
    benefits: [
      'Side-by-side performance comparison',
      'Detailed benchmarks and testing results',
      'Cost analysis and pricing comparison',
      'Use case recommendations for each tool',
      'Integration capabilities analysis',
      'Decision-making framework included'
    ]
  },
  'ai-integration-masterclass': {
    title: 'AI Tool Integration Masterclass',
    fileName: 'ai-integration-masterclass-resources.pdf',
    description: 'advanced masterclass with integration templates and code examples',
    benefits: [
      'Advanced integration strategies',
      'Multi-tool workflow automation',
      'API connections and data synchronization',
      'Performance optimization techniques',
      'Troubleshooting common issues',
      'Enterprise security considerations'
    ]
  }
};

// Generate personalized email text
function generateEmailText(leadData: LeadData, config: any) {
  return `
Hi ${leadData.firstName},

Thank you for downloading our ${config.description}!

🎯 Your Personalized Resource
Based on your role as ${leadData.role} at ${leadData.company}, this guide will help you:

${config.benefits.map((benefit: string) => `✓ ${benefit}`).join('\n')}

📄 Download Your Guide: ${process.env.NEXT_PUBLIC_SITE_URL}/guides/${config.fileName}

💡 Quick Start Tip: 
Begin with the Executive Summary for key insights, then focus on the sections most relevant to ${leadData.companySize} organizations like yours.

Next Steps:
1. Review the key recommendations - Get actionable insights in 5 minutes
2. Identify your priority use cases - Use our frameworks to focus your efforts  
3. Build your implementation plan - Follow our proven methodologies
4. Measure and optimize - Track ROI using our templates and metrics

If you have any questions about implementing these strategies or need personalized guidance, feel free to reply to this email or schedule a consultation:
📅 Schedule a Free AI Strategy Consultation: ${process.env.NEXT_PUBLIC_SITE_URL}/contact

Best regards,
The SiteOptz AI Research Team

© 2025 SiteOptz. All rights reserved.
You received this email because you downloaded our guide at ${leadData.email}
  `;
}

// Generate HTML email template
function generateEmailHTML(leadData: LeadData, config: any) {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Your ${config.title} is Ready</title>
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
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <div class="logo">SITEOPTZ</div>
            <h1>Your ${config.title} is Ready</h1>
            <div class="subtitle">Expert insights for AI implementation success</div>
        </div>
        
        <div class="content">
            <p>Hi ${leadData.firstName},</p>
            
            <p>Thank you for downloading our <strong>${config.description}</strong>!</p>
            
            <div class="highlight-box">
                <strong>🎯 Your Personalized Resource</strong><br>
                Based on your role as <strong>${leadData.role}</strong> at <strong>${leadData.company}</strong>, 
                this guide will help you implement AI successfully in your organization.
            </div>
            
            <div style="text-align: center; margin: 30px 0;">
                <a href="${process.env.NEXT_PUBLIC_SITE_URL}/guides/${config.fileName}" class="cta-button">
                    📄 Download Your Guide Now
                </a>
            </div>
            
            <h3>What's Inside Your Guide:</h3>
            <ul class="checklist">
                ${config.benefits.map((benefit: string) => `<li>${benefit}</li>`).join('')}
            </ul>
            
            <div style="background-color: #fef3c7; padding: 20px; border-radius: 5px; margin: 25px 0;">
                <strong>💡 Quick Start Tip:</strong><br>
                Begin with the Executive Summary for key insights, then focus on the sections most relevant to ${leadData.companySize} organizations like yours.
            </div>
            
            <h3>Next Steps:</h3>
            <ol>
                <li><strong>Review the key recommendations</strong> - Get actionable insights in 5 minutes</li>
                <li><strong>Identify your priority use cases</strong> - Use our frameworks to focus your efforts</li>
                <li><strong>Build your implementation plan</strong> - Follow our proven methodologies</li>
                <li><strong>Measure and optimize</strong> - Track ROI using our templates and metrics</li>
            </ol>
            
            <p>If you have any questions about implementing these strategies or need personalized guidance, feel free to reply to this email or schedule a consultation:</p>
            
            <div style="text-align: center; margin: 30px 0;">
                <a href="${process.env.NEXT_PUBLIC_SITE_URL}/contact" style="color: #3b82f6; text-decoration: none; font-weight: 600;">
                    📅 Schedule a Free AI Strategy Consultation
                </a>
            </div>
            
            <p>Best regards,<br>
            <strong>The SiteOptz AI Research Team</strong></p>
        </div>
        
        <div class="footer">
            <p>© 2025 SiteOptz. All rights reserved.</p>
            <p>You received this email because you downloaded our guide at ${leadData.email}</p>
        </div>
    </div>
</body>
</html>
  `;
}

// Add lead to GoHighLevel CRM
async function addToGoHighLevel(leadData: LeadData) {
  try {
    const config = resourceConfigs[leadData.resourceType as keyof typeof resourceConfigs];
    const ghlData = {
      firstName: leadData.firstName,
      lastName: leadData.lastName,
      email: leadData.email,
      phone: '',
      tags: [
        `Downloaded: ${config?.title || leadData.resourceType}`,
        `Company Size: ${leadData.companySize}`,
        `Role: ${leadData.role}`,
        `Interest: ${leadData.primaryInterest}`,
        `Timeline: ${leadData.timeline}`,
        leadData.marketingConsent ? 'Marketing Consent: Yes' : 'Marketing Consent: No'
      ],
      customField: {
        company: leadData.company,
        downloadedGuide: config?.title || leadData.resourceType,
        downloadDate: new Date().toISOString(),
      },
      source: 'AI Resource Download',
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
    return null;
  }
}

// Send email with the guide
async function sendGuideEmail(leadData: LeadData) {
  try {
    const config = resourceConfigs[leadData.resourceType as keyof typeof resourceConfigs];
    
    if (!config) {
      throw new Error(`Unknown resource type: ${leadData.resourceType}`);
    }

    const result = await sendEmail({
      to: leadData.email,
      subject: `${leadData.firstName}, Your ${config.title} is Ready 📊`,
      html: generateEmailHTML(leadData, config),
      text: generateEmailText(leadData, config),
      from: `"SiteOptz AI" <${EMAIL_FROM}>`
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
  console.log('Download resource API called:', req.method);
  
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const leadData: LeadData = req.body;
    console.log('Lead data received:', { email: leadData.email, resourceType: leadData.resourceType, company: leadData.company });
    
    // Validate required fields
    if (!leadData.firstName || !leadData.lastName || !leadData.email || !leadData.company || !leadData.role || !leadData.resourceType) {
      return res.status(400).json({ error: 'Missing required fields' });
    }
    
    // Validate resource type
    if (!resourceConfigs[leadData.resourceType as keyof typeof resourceConfigs]) {
      return res.status(400).json({ error: 'Invalid resource type' });
    }
    
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(leadData.email)) {
      return res.status(400).json({ error: 'Invalid email format' });
    }
    
    // Add to GoHighLevel CRM (non-blocking)
    const ghlPromise = addToGoHighLevel(leadData);
    
    // Send email with guide
    const emailResult = await sendGuideEmail(leadData);
    
    // Wait for GoHighLevel to complete (but don't block on failure)
    const ghlResult = await ghlPromise;
    
    const config = resourceConfigs[leadData.resourceType as keyof typeof resourceConfigs];
    
    // Log the download for analytics
    console.log('Resource download:', {
      email: leadData.email,
      company: leadData.company,
      role: leadData.role,
      companySize: leadData.companySize,
      resourceType: leadData.resourceType,
      resourceTitle: config.title,
      timestamp: new Date().toISOString(),
      ghlSuccess: !!ghlResult,
      emailSuccess: emailResult.success || false,
    });
    
    // Return success response
    res.status(200).json({
      success: true,
      message: 'Resource sent successfully',
      downloadUrl: `${process.env.NEXT_PUBLIC_SITE_URL}/guides/${config.fileName}`,
      resourceTitle: config.title,
    });
  } catch (error) {
    console.error('API error:', error);
    
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