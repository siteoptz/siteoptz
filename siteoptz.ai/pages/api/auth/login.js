/**
 * Login API Route for SiteOptz.ai
 * Handles user authentication with GoHighLevel
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

  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      success: false,
      error: 'missing_fields',
      message: 'Email and password are required'
    });
  }

  try {
    // GoHighLevel configuration
    const GHL_API_KEY = process.env.GHL_API_KEY || 'pit-8954f181-e668-4613-80d6-c7b4aa8594b8';
    const GHL_LOCATION_ID = process.env.GHL_LOCATION_ID || 'ECu5ScdYFmB0WnhvYoBU';
    const GHL_BASE_URL = 'https://services.leadconnectorhq.com';

    // Search for contact by email
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
    const contacts = searchData.contacts || [];
    
    // Find exact email match
    const contact = contacts.find(c => c.email === email);

    if (!contact) {
      // User not found - suggest registration
      return res.status(404).json({
        success: false,
        error: 'user_not_found',
        message: 'No account found with this email. Please create an account.',
        action: 'redirect_to_register'
      });
    }

    // For development: simple password check
    // In production, implement proper password verification
    if (password.length < 6) {
      return res.status(401).json({
        success: false,
        error: 'invalid_password',
        message: 'Invalid password. Please try again.'
      });
    }

    // Extract plan from tags
    const planTags = {
      'siteoptz-plan-free': 'free',
      'siteoptz-plan-starter': 'starter',
      'siteoptz-plan-pro': 'pro',
      'siteoptz-plan-enterprise': 'enterprise'
    };

    let userPlan = 'free';
    if (contact.tags && Array.isArray(contact.tags)) {
      for (const tag of contact.tags) {
        if (planTags[tag]) {
          userPlan = planTags[tag];
          break;
        }
      }
    }

    // Create user session data
    const userData = {
      id: contact.id,
      email: contact.email,
      name: `${contact.firstName || ''} ${contact.lastName || ''}`.trim() || contact.name || 'User',
      plan: userPlan,
      tags: contact.tags || [],
      authenticated: true,
      loginTime: new Date().toISOString()
    };

    // Return success with user data
    return res.status(200).json({
      success: true,
      message: 'Login successful',
      user: userData,
      redirectUrl: `https://optz.siteoptz.ai/dashboard/${userPlan}`
    });

  } catch (error) {
    console.error('Login error:', error);
    return res.status(500).json({
      success: false,
      error: 'server_error',
      message: 'An error occurred during login. Please try again.'
    });
  }
}