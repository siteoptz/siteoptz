// GoHighLevel CRM integration service
export async function createGoHighLevelContact(userData: {
  email: string;
  name?: string;
  firstName?: string;
  lastName?: string;
  phone?: string;
  
  // Business Information
  company?: string;
  companySize?: string;
  industry?: string;
  jobTitle?: string;
  
  // AI/Technology Interests
  interests?: string;
  aiToolsInterest?: string[];
  primaryUseCase?: string;
  experienceLevel?: string;
  budget?: string;
  timeline?: string;
  
  // Plan Information
  plan?: string;
  billingCycle?: string;
  provider?: string;
  stripeCustomerId?: string;
  
  // Marketing & Analytics
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  utmTerm?: string;
  utmContent?: string;
  referrer?: string;
  marketingConsent?: boolean;
  newsletterSubscription?: boolean;
  preferredContactMethod?: string;
  
  // System Fields
  isUpgrade?: boolean;
  source?: string;
  registrationDate?: string;
}) {
  console.log('🔄 Starting GoHighLevel contact creation...');
  console.log('Input userData:', JSON.stringify(userData, null, 2));
  console.log('API Key available:', process.env.GOHIGHLEVEL_API_KEY ? 'Yes' : 'No');
  
  let contactData;
  
  try {
    contactData = {
      email: userData.email,
      firstName: userData.firstName || userData.name?.split(' ')[0] || '',
      lastName: userData.lastName || userData.name?.split(' ').slice(1).join(' ') || '',
      name: userData.name || userData.email,
      phone: userData.phone || '',
      companyName: userData.company || '',
      source: userData.source || userData.provider || 'Website Registration',
      tags: [
        // Core Tags
        'New User Registration',
        'SiteOptz User',
        'new-user',
        
        // Plan & Billing Tags
        `plan-${userData.plan || 'free'}`,
        userData.billingCycle ? `billing-${userData.billingCycle}` : 'billing-none',
        userData.provider ? `provider-${userData.provider}` : 'provider-direct',
        
        // Business Information Tags
        userData.company ? `Company: ${userData.company}` : 'No Company',
        userData.companySize ? `Company Size: ${userData.companySize}` : 'Company Size Unknown',
        userData.industry ? `Industry: ${userData.industry}` : 'Industry Unknown',
        userData.jobTitle ? `Job Title: ${userData.jobTitle}` : 'Job Title Unknown',
        
        // AI/Technology Interest Tags
        userData.experienceLevel ? `Experience: ${userData.experienceLevel}` : 'Experience Unknown',
        userData.budget ? `Budget: ${userData.budget}` : 'Budget Unknown',
        userData.primaryUseCase ? `Use Case: ${userData.primaryUseCase}` : 'Use Case Unknown',
        userData.timeline ? `Timeline: ${userData.timeline}` : 'Timeline Unknown',
        
        // Marketing & Consent Tags
        `Marketing Consent: ${userData.marketingConsent ? 'Yes' : 'No'}`,
        `Newsletter: ${userData.newsletterSubscription ? 'Yes' : 'No'}`,
        userData.preferredContactMethod ? `Contact Method: ${userData.preferredContactMethod}` : 'Contact Method Unknown',
        
        // UTM & Source Tags
        userData.utmSource ? `UTM Source: ${userData.utmSource}` : 'No UTM Source',
        userData.utmMedium ? `UTM Medium: ${userData.utmMedium}` : 'No UTM Medium',
        userData.utmCampaign ? `UTM Campaign: ${userData.utmCampaign}` : 'No UTM Campaign',
        userData.referrer ? `Referrer: ${userData.referrer}` : 'No Referrer',
        
        // Dynamic AI Tools Interest Tags
        ...(userData.aiToolsInterest?.map(tool => `Interest: ${tool}`) || []),
        
        // Registration Date Tag
        `Registered: ${new Date().toISOString().split('T')[0]}`
      ].filter(Boolean),
      customFields: [
        // Plan and Billing Information
        {
          key: 'subscription_plan',
          field_value: userData.plan || 'free'
        },
        {
          key: 'billing_cycle',
          field_value: userData.billingCycle || ''
        },
        {
          key: 'stripe_customer_id',
          field_value: userData.stripeCustomerId || ''
        },
        
        // Business Information
        {
          key: 'company_name',
          field_value: userData.company || ''
        },
        {
          key: 'company_size',
          field_value: userData.companySize || ''
        },
        {
          key: 'industry',
          field_value: userData.industry || ''
        },
        {
          key: 'job_title',
          field_value: userData.jobTitle || ''
        },
        
        // AI/Technology Interests
        {
          key: 'ai_tools_interest',
          field_value: userData.aiToolsInterest?.join(', ') || userData.interests || ''
        },
        {
          key: 'primary_use_case',
          field_value: userData.primaryUseCase || ''
        },
        {
          key: 'experience_level',
          field_value: userData.experienceLevel || ''
        },
        {
          key: 'budget',
          field_value: userData.budget || ''
        },
        {
          key: 'timeline',
          field_value: userData.timeline || ''
        },
        
        // Marketing & Analytics
        {
          key: 'utm_source',
          field_value: userData.utmSource || ''
        },
        {
          key: 'utm_medium',
          field_value: userData.utmMedium || ''
        },
        {
          key: 'utm_campaign',
          field_value: userData.utmCampaign || ''
        },
        {
          key: 'utm_term',
          field_value: userData.utmTerm || ''
        },
        {
          key: 'utm_content',
          field_value: userData.utmContent || ''
        },
        {
          key: 'referrer',
          field_value: userData.referrer || ''
        },
        {
          key: 'marketing_consent',
          field_value: userData.marketingConsent ? 'Yes' : 'No'
        },
        {
          key: 'newsletter_subscription',
          field_value: userData.newsletterSubscription ? 'Yes' : 'No'
        },
        {
          key: 'preferred_contact_method',
          field_value: userData.preferredContactMethod || ''
        },
        
        // System Fields
        {
          key: 'registration_date',
          field_value: userData.registrationDate || new Date().toISOString()
        },
        {
          key: 'provider',
          field_value: userData.provider || 'direct'
        },
        {
          key: 'is_upgrade',
          field_value: userData.isUpgrade ? 'Yes' : 'No'
        }
      ]
    };

    // Add locationId to the contact data if available
    if (process.env.GOHIGHLEVEL_LOCATION_ID) {
      (contactData as any).locationId = process.env.GOHIGHLEVEL_LOCATION_ID;
    }
    
    console.log('📤 Sending to GoHighLevel API...');
    console.log('Contact data (with locationId in body):', JSON.stringify(contactData, null, 2));
    
    // GoHighLevel API call - locationId now in request body
    const headers: Record<string, string> = {
      'Authorization': `Bearer ${process.env.GOHIGHLEVEL_API_KEY}`,
      'Content-Type': 'application/json',
      'Version': '2021-07-28'
    };
    
    const response = await fetch('https://services.leadconnectorhq.com/contacts/', {
      method: 'POST',
      headers,
      body: JSON.stringify(contactData)
    });

    console.log('📥 GoHighLevel API response status:', response.status);
    console.log('📥 GoHighLevel API response headers:', response.headers);

    if (response.ok) {
      const result = await response.json();
      console.log('✅ GoHighLevel contact created successfully:', result.contact?.id);
      console.log('Full response:', JSON.stringify(result, null, 2));
      return { success: true, contactId: result.contact?.id };
    } else {
      const error = await response.text();
      console.error('❌ Failed to create GoHighLevel contact. Status:', response.status);
      console.error('❌ Error response:', error);
      
      // For now, return failure and log the contact data for manual review
      // This will be more transparent about the issue
      console.log('🔄 GoHighLevel API failed, logging contact data for manual review:');
      console.log('Contact data that would have been created:', JSON.stringify(contactData, null, 2));
      console.log('📋 Manual action required: Add this contact to GoHighLevel manually');
      console.log('📋 API Error details:', error);
      
      return { success: false, error: `HTTP ${response.status}: ${error}`, contactData: contactData };
    }
  } catch (error) {
    console.error('💥 Network error creating GoHighLevel contact:', error);
    if (contactData) {
      console.log('🔄 GoHighLevel API network error, logging contact data for manual review:');
      console.log('Contact data that would have been created:', JSON.stringify(contactData, null, 2));
      console.log('📋 Manual action required: Add this contact to GoHighLevel manually');
      return { success: false, error: error instanceof Error ? error.message : 'Unknown error', contactData: contactData };
    } else {
      console.log('💥 Error occurred before contact data was prepared');
      return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
    }
  }
}

// Send welcome email to new user
export async function sendWelcomeEmail(userData: {
  email: string;
  name?: string;
  plan?: string;
  billingCycle?: string;
}) {
  console.log('📧 Starting welcome email send...');
  console.log('Email userData:', JSON.stringify(userData, null, 2));
  console.log('NEXTAUTH_URL:', process.env.NEXTAUTH_URL);
  const planDetails = {
    free: {
      title: 'Free Plan',
      features: [
        '3 AI tool comparisons per day',
        'Access to basic AI tools directory',
        'Community support',
        'Basic implementation guides'
      ]
    },
    starter: {
      title: 'Starter Plan',
      features: [
        '10 AI tool comparisons per day',
        'Access to 50+ premium AI tools',
        'Email support',
        'Implementation roadmaps',
        'Weekly expert webinars'
      ]
    },
    pro: {
      title: 'Pro Plan',
      features: [
        'Unlimited AI tool comparisons',
        'Access to all premium AI tools',
        'Priority phone & email support',
        'Custom implementation guides',
        'Team collaboration tools',
        '1-on-1 expert consultations'
      ]
    },
    enterprise: {
      title: 'Enterprise Plan',
      features: [
        'Everything in Pro',
        'Unlimited team members',
        'White-label options',
        'Dedicated account manager',
        'Custom integrations',
        'Advanced analytics & reporting'
      ]
    }
  };

  const plan = userData.plan || 'free';
  const details = planDetails[plan as keyof typeof planDetails] || planDetails.free;

  const emailHtml = `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; border-radius: 10px 10px 0 0; }
        .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
        .button { display: inline-block; padding: 12px 30px; background: #667eea; color: white; text-decoration: none; border-radius: 5px; margin: 20px 0; }
        .features { background: white; padding: 20px; border-radius: 8px; margin: 20px 0; }
        .feature-item { padding: 10px 0; border-bottom: 1px solid #eee; }
        .feature-item:last-child { border-bottom: none; }
        .footer { text-align: center; padding: 20px; color: #666; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>Welcome to SiteOptz! 🚀</h1>
          <p style="font-size: 18px;">Your AI Tools Journey Starts Here</p>
        </div>
        
        <div class="content">
          <h2>Hi ${userData.name || 'there'}!</h2>
          
          <p>Welcome to the SiteOptz community! We're thrilled to have you join us on your journey to leverage AI for business growth.</p>
          
          <div class="features">
            <h3>Your ${details.title} includes:</h3>
            ${details.features.map(feature => `
              <div class="feature-item">✅ ${feature}</div>
            `).join('')}
          </div>
          
          <h3>🎯 Next Steps:</h3>
          <ol>
            <li><strong>Explore Your Dashboard</strong> - Access all your features and tools</li>
            <li><strong>Compare AI Tools</strong> - Find the perfect solutions for your needs</li>
            <li><strong>Join Our Community</strong> - Connect with other AI enthusiasts</li>
          </ol>
          
          <div style="text-align: center;">
            <a href="${process.env.NEXTAUTH_URL}/dashboard" class="button">Go to Your Dashboard</a>
          </div>
          
          <h3>Need Help?</h3>
          <p>Our team is here to support you:</p>
          <ul>
            <li>📧 Email: info@siteoptz.ai</li>
            <li>📚 Help Center: ${process.env.NEXTAUTH_URL}/help</li>
            <li>💬 Community: ${process.env.NEXTAUTH_URL}/community</li>
          </ul>
        </div>
        
        <div class="footer">
          <p>© 2024 SiteOptz. Turning AI Into ROI.</p>
          <p style="font-size: 12px;">You're receiving this email because you signed up for SiteOptz.</p>
        </div>
      </div>
    </body>
    </html>
  `;

  try {
    const emailPayload = {
      to: userData.email,
      subject: `Welcome to SiteOptz ${details.title}! 🚀`,
      html: emailHtml,
      text: `Welcome to SiteOptz! Your ${details.title} is now active. Visit ${process.env.NEXTAUTH_URL}/dashboard to get started.`
    };
    
    console.log('📤 Sending welcome email payload:', JSON.stringify(emailPayload, null, 2));
    
    const response = await fetch(`${process.env.NEXTAUTH_URL}/api/send-email`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(emailPayload)
    });

    console.log('📥 Welcome email API response status:', response.status);

    if (response.ok) {
      const result = await response.json();
      console.log('✅ Welcome email sent successfully to:', userData.email);
      console.log('Email result:', JSON.stringify(result, null, 2));
      return { success: true };
    } else {
      const error = await response.text();
      console.error('❌ Failed to send welcome email. Status:', response.status);
      console.error('❌ Error response:', error);
      return { success: false, error: `HTTP ${response.status}: ${error}` };
    }
  } catch (error) {
    console.error('Error sending welcome email:', error);
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}

// Send notification email to admin
export async function sendAdminNotificationEmail(userData: {
  email: string;
  name?: string;
  plan?: string;
  billingCycle?: string;
  company?: string;
  companySize?: string;
  interests?: string;
  provider?: string;
  isUpgrade?: boolean;
}) {
  console.log('📧 Starting admin notification email...');
  console.log('Admin notification userData:', JSON.stringify(userData, null, 2));
  const emailHtml = `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: #28a745; color: white; padding: 20px; border-radius: 10px 10px 0 0; }
        .content { background: #f9f9f9; padding: 30px; }
        .info-box { background: white; padding: 15px; border-left: 4px solid #28a745; margin: 15px 0; }
        .label { font-weight: bold; color: #666; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h2>${userData.isUpgrade ? '💳 Customer Upgrade' : '🎉 New User Registration'}</h2>
        </div>
        
        <div class="content">
          <h3>User Details:</h3>
          <div class="info-box">
            <p><span class="label">Name:</span> ${userData.name || 'Not provided'}</p>
            <p><span class="label">Email:</span> ${userData.email}</p>
            <p><span class="label">Plan:</span> ${(userData.plan || 'free').toUpperCase()}</p>
            <p><span class="label">Billing:</span> ${userData.billingCycle || 'N/A'}</p>
            <p><span class="label">Provider:</span> ${userData.provider || 'Direct Registration'}</p>
          </div>
          
          <h3>Business Information:</h3>
          <div class="info-box">
            <p><span class="label">Company:</span> ${userData.company || 'Not provided'}</p>
            <p><span class="label">Company Size:</span> ${userData.companySize || 'Not provided'}</p>
            <p><span class="label">Interests:</span> ${userData.interests || 'Not provided'}</p>
          </div>
          
          <h3>Actions Taken:</h3>
          <ul>
            <li>✅ User registered in system</li>
            <li>✅ GoHighLevel contact created</li>
            <li>✅ Welcome email sent</li>
          </ul>
          
          <p style="margin-top: 20px;">
            <strong>Next Steps:</strong> Consider reaching out to welcome them personally if they're on a paid plan.
          </p>
        </div>
      </div>
    </body>
    </html>
  `;

  try {
    const adminEmailPayload = {
      to: 'info@siteoptz.ai',
      subject: userData.isUpgrade ? 
        `💳 CUSTOMER UPGRADE: ${userData.email} → ${(userData.plan || 'Free').toUpperCase()} Plan` :
        `🎉 New ${(userData.plan || 'Free').toUpperCase()} User: ${userData.email}`,
      html: emailHtml,
      text: userData.isUpgrade ? 
        `Customer upgrade: ${userData.email} - New Plan: ${userData.plan || 'free'}` :
        `New user registered: ${userData.email} - Plan: ${userData.plan || 'free'}`
    };
    
    console.log('📤 Sending admin notification payload:', JSON.stringify(adminEmailPayload, null, 2));
    
    const response = await fetch(`${process.env.NEXTAUTH_URL}/api/send-email`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(adminEmailPayload)
    });

    console.log('📥 Admin notification API response status:', response.status);

    if (response.ok) {
      const result = await response.json();
      console.log('✅ Admin notification sent successfully');
      console.log('Admin email result:', JSON.stringify(result, null, 2));
      return { success: true };
    } else {
      const error = await response.text();
      console.error('❌ Failed to send admin notification. Status:', response.status);
      console.error('❌ Error response:', error);
      return { success: false, error: `HTTP ${response.status}: ${error}` };
    }
  } catch (error) {
    console.error('Error sending admin notification:', error);
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}