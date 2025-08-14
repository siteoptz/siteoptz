export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { email, name, company, useCase, toolName, category, source } = req.body;

    // Validate required fields
    if (!email || !name) {
      return res.status(400).json({ 
        message: 'Email and name are required' 
      });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ 
        message: 'Invalid email format' 
      });
    }

    // Prepare subscriber data
    const subscriberData = {
      email_address: email,
      status: 'subscribed',
      merge_fields: {
        FNAME: name,
        LNAME: '',
        COMPANY: company || '',
        USECASE: useCase || 'general',
        TOOLNAME: toolName || '',
        CATEGORY: category || '',
        SOURCE: source || 'comparison_page'
      },
      tags: [
        'ai-tools-comparison',
        'comparison-page'
      ]
    };

    // Add tool-specific tag if provided
    if (toolName) {
      subscriberData.tags.push(`tool-${toolName.toLowerCase().replace(/\s+/g, '-')}`);
    }

    // Add category tag if provided
    if (category) {
      subscriberData.tags.push(`category-${category.toLowerCase().replace(/\s+/g, '-')}`);
    }

    // For now, we'll use a mock implementation
    // In production, you would integrate with Mailchimp API
    const mailchimpApiKey = process.env.MAILCHIMP_API_KEY;
    const mailchimpListId = process.env.MAILCHIMP_LIST_ID;
    const mailchimpServerPrefix = process.env.MAILCHIMP_SERVER_PREFIX;

    if (mailchimpApiKey && mailchimpListId && mailchimpServerPrefix) {
      // Real Mailchimp integration
      const mailchimpUrl = `https://${mailchimpServerPrefix}.api.mailchimp.com/3.0/lists/${mailchimpListId}/members`;
      
      const response = await fetch(mailchimpUrl, {
        method: 'POST',
        headers: {
          'Authorization': `apikey ${mailchimpApiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(subscriberData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('Mailchimp API error:', errorData);
        
        // Handle specific Mailchimp errors
        if (errorData.title === 'Member Exists') {
          return res.status(200).json({ 
            message: 'You are already subscribed!',
            alreadySubscribed: true
          });
        }
        
        throw new Error(`Mailchimp API error: ${errorData.title}`);
      }

      const result = await response.json();
      
      // Track successful subscription
      console.log('Successfully subscribed:', {
        email,
        toolName,
        category,
        source,
        timestamp: new Date().toISOString()
      });

      return res.status(200).json({
        message: 'Successfully subscribed!',
        subscriberId: result.id
      });

    } else {
      // Mock implementation for development
      console.log('Mock subscription:', {
        email,
        name,
        company,
        useCase,
        toolName,
        category,
        source,
        timestamp: new Date().toISOString()
      });

      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));

      // Store in localStorage for development (this won't work server-side, but good for demo)
      // In a real app, you'd store this in a database
      
      return res.status(200).json({
        message: 'Successfully subscribed! (Mock)',
        subscriberId: `mock_${Date.now()}`,
        mock: true
      });
    }

  } catch (error) {
    console.error('Subscription error:', error);
    
    return res.status(500).json({
      message: 'Failed to subscribe. Please try again later.',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
}

