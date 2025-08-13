// API route for email capture submissions
// Handles form submissions and integrates with email marketing services

export default async function handler(req, res) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const {
      email,
      firstName = '',
      company = '',
      teamSize = '',
      useCase = '',
      timeline = '',
      tools = '',
      source = 'unknown',
      timestamp
    } = req.body;

    // Validate required fields
    if (!email) {
      return res.status(400).json({ error: 'Email is required' });
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: 'Invalid email format' });
    }

    // Prepare data for storage/processing
    const submissionData = {
      email: email.toLowerCase().trim(),
      firstName: firstName.trim(),
      company: company.trim(),
      teamSize,
      useCase,
      timeline,
      tools,
      source,
      timestamp: timestamp || new Date().toISOString(),
      ip: req.headers['x-forwarded-for'] || req.connection.remoteAddress,
      userAgent: req.headers['user-agent']
    };

    // Log submission for debugging (remove in production)
    console.log('Email submission received:', {
      email: submissionData.email,
      source: submissionData.source,
      tools: submissionData.tools
    });

    // Here you would integrate with your preferred email service
    // Examples: Mailchimp, ConvertKit, HubSpot, SendGrid, etc.
    
    // Example integrations:

    // 1. Mailchimp Integration
    await addToMailchimp(submissionData);

    // 2. ConvertKit Integration  
    // await addToConvertKit(submissionData);

    // 3. HubSpot Integration
    // await addToHubSpot(submissionData);

    // 4. Database Storage
    // await saveToDatabase(submissionData);

    // 5. Send notification email to team
    await sendNotificationEmail(submissionData);

    // Return success response
    res.status(200).json({ 
      success: true, 
      message: 'Subscription successful' 
    });

  } catch (error) {
    console.error('Email submission error:', error);
    res.status(500).json({ 
      error: 'Internal server error',
      message: 'Failed to process submission'
    });
  }
}

/**
 * Add subscriber to Mailchimp
 */
async function addToMailchimp(data) {
  const MAILCHIMP_API_KEY = process.env.MAILCHIMP_API_KEY;
  const MAILCHIMP_AUDIENCE_ID = process.env.MAILCHIMP_AUDIENCE_ID;
  const MAILCHIMP_SERVER = process.env.MAILCHIMP_SERVER; // e.g., 'us1'

  if (!MAILCHIMP_API_KEY || !MAILCHIMP_AUDIENCE_ID) {
    console.warn('Mailchimp credentials not configured');
    return;
  }

  try {
    const response = await fetch(
      `https://${MAILCHIMP_SERVER}.api.mailchimp.com/3.0/lists/${MAILCHIMP_AUDIENCE_ID}/members`,
      {
        method: 'POST',
        headers: {
          'Authorization': `Basic ${Buffer.from(`anystring:${MAILCHIMP_API_KEY}`).toString('base64')}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email_address: data.email,
          status: 'subscribed',
          merge_fields: {
            FNAME: data.firstName,
            COMPANY: data.company,
            TEAMSIZE: data.teamSize,
            USECASE: data.useCase,
            TIMELINE: data.timeline,
            TOOLS: data.tools
          },
          tags: [
            'ai-tool-comparison',
            `source-${data.source}`,
            data.useCase ? `usecase-${data.useCase}` : '',
            data.teamSize ? `team-${data.teamSize}` : ''
          ].filter(Boolean)
        }),
      }
    );

    if (!response.ok) {
      const error = await response.json();
      throw new Error(`Mailchimp error: ${error.detail || response.statusText}`);
    }

    console.log('Successfully added to Mailchimp:', data.email);
  } catch (error) {
    console.error('Mailchimp integration error:', error);
    // Don't throw - continue with other integrations
  }
}

/**
 * Add subscriber to ConvertKit
 */
async function addToConvertKit(data) {
  const CONVERTKIT_API_KEY = process.env.CONVERTKIT_API_KEY;
  const CONVERTKIT_FORM_ID = process.env.CONVERTKIT_FORM_ID;

  if (!CONVERTKIT_API_KEY || !CONVERTKIT_FORM_ID) {
    console.warn('ConvertKit credentials not configured');
    return;
  }

  try {
    const response = await fetch(
      `https://api.convertkit.com/v3/forms/${CONVERTKIT_FORM_ID}/subscribe`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          api_key: CONVERTKIT_API_KEY,
          email: data.email,
          first_name: data.firstName,
          fields: {
            company: data.company,
            team_size: data.teamSize,
            use_case: data.useCase,
            timeline: data.timeline,
            tools: data.tools,
            source: data.source
          }
        }),
      }
    );

    if (!response.ok) {
      throw new Error(`ConvertKit error: ${response.statusText}`);
    }

    console.log('Successfully added to ConvertKit:', data.email);
  } catch (error) {
    console.error('ConvertKit integration error:', error);
  }
}

/**
 * Add contact to HubSpot
 */
async function addToHubSpot(data) {
  const HUBSPOT_ACCESS_TOKEN = process.env.HUBSPOT_ACCESS_TOKEN;

  if (!HUBSPOT_ACCESS_TOKEN) {
    console.warn('HubSpot credentials not configured');
    return;
  }

  try {
    const response = await fetch(
      'https://api.hubapi.com/crm/v3/objects/contacts',
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${HUBSPOT_ACCESS_TOKEN}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          properties: {
            email: data.email,
            firstname: data.firstName,
            company: data.company,
            team_size: data.teamSize,
            use_case: data.useCase,
            implementation_timeline: data.timeline,
            requested_tools: data.tools,
            lead_source: data.source
          }
        }),
      }
    );

    if (!response.ok && response.status !== 409) { // 409 = contact already exists
      throw new Error(`HubSpot error: ${response.statusText}`);
    }

    console.log('Successfully added to HubSpot:', data.email);
  } catch (error) {
    console.error('HubSpot integration error:', error);
  }
}

/**
 * Save to database (example with a generic approach)
 */
async function saveToDatabase(data) {
  // This is a placeholder - implement based on your database choice
  // Examples: PostgreSQL, MongoDB, Supabase, PlanetScale, etc.
  
  try {
    // Example for a SQL database:
    // const query = `
    //   INSERT INTO email_submissions 
    //   (email, first_name, company, team_size, use_case, timeline, tools, source, created_at)
    //   VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
    // `;
    // await db.query(query, [
    //   data.email, data.firstName, data.company, data.teamSize,
    //   data.useCase, data.timeline, data.tools, data.source, data.timestamp
    // ]);

    console.log('Database save placeholder for:', data.email);
  } catch (error) {
    console.error('Database save error:', error);
  }
}

/**
 * Send notification email to team
 */
async function sendNotificationEmail(data) {
  // Use your preferred email service (SendGrid, Nodemailer, etc.)
  
  try {
    // Example with SendGrid
    if (process.env.SENDGRID_API_KEY) {
      const sgMail = require('@sendgrid/mail');
      sgMail.setApiKey(process.env.SENDGRID_API_KEY);

      const msg = {
        to: process.env.NOTIFICATION_EMAIL || 'team@siteoptz.ai',
        from: process.env.FROM_EMAIL || 'noreply@siteoptz.ai',
        subject: 'New AI Tool Comparison Request',
        html: generateNotificationHTML(data)
      };

      await sgMail.send(msg);
      console.log('Notification email sent');
    }
  } catch (error) {
    console.error('Notification email error:', error);
  }
}

/**
 * Generate HTML for notification email
 */
function generateNotificationHTML(data) {
  return `
    <h2>New AI Tool Comparison Request</h2>
    <table style="border-collapse: collapse; width: 100%;">
      <tr>
        <td style="border: 1px solid #ddd; padding: 8px; font-weight: bold;">Email:</td>
        <td style="border: 1px solid #ddd; padding: 8px;">${data.email}</td>
      </tr>
      <tr>
        <td style="border: 1px solid #ddd; padding: 8px; font-weight: bold;">Name:</td>
        <td style="border: 1px solid #ddd; padding: 8px;">${data.firstName || 'Not provided'}</td>
      </tr>
      <tr>
        <td style="border: 1px solid #ddd; padding: 8px; font-weight: bold;">Company:</td>
        <td style="border: 1px solid #ddd; padding: 8px;">${data.company || 'Not provided'}</td>
      </tr>
      <tr>
        <td style="border: 1px solid #ddd; padding: 8px; font-weight: bold;">Team Size:</td>
        <td style="border: 1px solid #ddd; padding: 8px;">${data.teamSize || 'Not provided'}</td>
      </tr>
      <tr>
        <td style="border: 1px solid #ddd; padding: 8px; font-weight: bold;">Use Case:</td>
        <td style="border: 1px solid #ddd; padding: 8px;">${data.useCase || 'Not provided'}</td>
      </tr>
      <tr>
        <td style="border: 1px solid #ddd; padding: 8px; font-weight: bold;">Timeline:</td>
        <td style="border: 1px solid #ddd; padding: 8px;">${data.timeline || 'Not provided'}</td>
      </tr>
      <tr>
        <td style="border: 1px solid #ddd; padding: 8px; font-weight: bold;">Tools:</td>
        <td style="border: 1px solid #ddd; padding: 8px;">${data.tools || 'Not specified'}</td>
      </tr>
      <tr>
        <td style="border: 1px solid #ddd; padding: 8px; font-weight: bold;">Source:</td>
        <td style="border: 1px solid #ddd; padding: 8px;">${data.source}</td>
      </tr>
      <tr>
        <td style="border: 1px solid #ddd; padding: 8px; font-weight: bold;">Timestamp:</td>
        <td style="border: 1px solid #ddd; padding: 8px;">${new Date(data.timestamp).toLocaleString()}</td>
      </tr>
    </table>
  `;
}