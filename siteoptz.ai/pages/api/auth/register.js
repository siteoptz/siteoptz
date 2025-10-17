/**
 * Register API Route for SiteOptz.ai
 * Handles new user registration with GoHighLevel
 */

export default async function handler(req, res) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Enable CORS
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  const { name, email, password, plan = 'free' } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({
      success: false,
      error: 'missing_fields',
      message: 'Name, email, and password are required'
    });
  }

  try {
    // GoHighLevel configuration
    const GHL_API_KEY = process.env.GHL_API_KEY || 'pit-8954f181-e668-4613-80d6-c7b4aa8594b8';
    const GHL_LOCATION_ID = process.env.GHL_LOCATION_ID || 'ECu5ScdYFmB0WnhvYoBU';
    const GHL_BASE_URL = 'https://services.leadconnectorhq.com';

    // Check if user already exists
    const searchUrl = `${GHL_BASE_URL}/contacts/?query=${encodeURIComponent(email)}&locationId=${GHL_LOCATION_ID}`;
    
    const searchResponse = await fetch(searchUrl, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${GHL_API_KEY}`,
        'Content-Type': 'application/json',
        'Version': '2021-07-28'
      }
    });

    if (!searchResponse.ok) {
      throw new Error('Failed to search contacts');
    }

    const searchData = await searchResponse.json();
    const existingContacts = searchData.contacts || [];
    
    // Check for exact email match
    const existingContact = existingContacts.find(c => c.email === email);

    if (existingContact) {
      // User already exists - suggest login
      return res.status(409).json({
        success: false,
        error: 'user_exists',
        message: 'An account with this email already exists. Please log in.',
        action: 'redirect_to_login'
      });
    }

    // Create new contact in GoHighLevel
    const [firstName, ...lastNameParts] = name.split(' ');
    const lastName = lastNameParts.join(' ');
    
    const createUrl = `${GHL_BASE_URL}/contacts/`;
    const planTag = `siteoptz-plan-${plan}`;

    const contactData = {
      firstName: firstName,
      lastName: lastName || '',
      email: email,
      phone: '',
      locationId: GHL_LOCATION_ID,
      tags: [planTag, 'siteoptz-user', 'web-signup'],
      customFields: {
        source: 'siteoptz.ai',
        registration_date: new Date().toISOString(),
        plan: plan
      }
    };

    const createResponse = await fetch(createUrl, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${GHL_API_KEY}`,
        'Content-Type': 'application/json',
        'Version': '2021-07-28'
      },
      body: JSON.stringify(contactData)
    });

    if (!createResponse.ok) {
      const errorData = await createResponse.json();
      console.error('GHL create contact error:', errorData);
      throw new Error('Failed to create contact');
    }

    const createData = await createResponse.json();
    const newContact = createData.contact;

    // Create user session data
    const userData = {
      id: newContact.id,
      email: newContact.email,
      name: name,
      plan: plan,
      tags: [planTag, 'siteoptz-user', 'web-signup'],
      authenticated: true,
      isNewUser: true,
      registrationTime: new Date().toISOString()
    };

    // Return success with user data
    return res.status(201).json({
      success: true,
      message: 'Account created successfully! Welcome to SiteOptz.ai!',
      user: userData,
      redirectUrl: `https://optz.siteoptz.ai/dashboard/${plan}`
    });

  } catch (error) {
    console.error('Registration error:', error);
    return res.status(500).json({
      success: false,
      error: 'server_error',
      message: 'An error occurred during registration. Please try again.'
    });
  }
}