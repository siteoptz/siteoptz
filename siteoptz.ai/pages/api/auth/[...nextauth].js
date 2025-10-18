// COMPLETELY OVERRIDE ALL NextAuth functionality
export default function handler(req, res) {
  const { nextauth } = req.query;
  const path = nextauth ? nextauth.join('/') : '';
  
  console.log('NextAuth route blocked:', path);
  
  // Handle specific routes
  if (path === 'session') {
    // Return fake session to prevent redirects
    return res.status(200).json({
      user: { email: 'bypass@example.com' },
      expires: new Date(Date.now() + 86400000).toISOString()
    });
  }
  
  if (path === 'signin' || path === 'signIn') {
    // Redirect to our login
    return res.redirect(302, '/#login');
  }
  
  if (path === 'callback/google') {
    // Handle Google OAuth callback - redirect to dashboard
    return res.redirect(302, '/dashboard');
  }
  
  if (path === 'csrf') {
    // Return fake CSRF token
    return res.status(200).json({ csrfToken: 'disabled' });
  }
  
  if (path === 'providers') {
    // Return empty providers
    return res.status(200).json({});
  }
  
  // For any other NextAuth route, redirect to login
  return res.redirect(302, '/#login');
}