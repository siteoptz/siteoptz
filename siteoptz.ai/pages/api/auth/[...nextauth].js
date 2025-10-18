// Completely override NextAuth to prevent optz.siteoptz.ai redirects
export default function handler(req, res) {
  const { nextauth } = req.query;
  
  console.log('NextAuth route intercepted:', nextauth);
  
  // Handle all OAuth callbacks
  if (nextauth && (nextauth[0] === 'callback' || nextauth.includes('callback'))) {
    console.log('OAuth callback intercepted, redirecting to dashboard');
    // For OAuth callbacks, redirect to /dashboard which will handle plan-based routing
    return res.redirect(302, '/dashboard');
  }
  
  // Handle signin requests
  if (nextauth && (nextauth[0] === 'signin' || nextauth.includes('signin'))) {
    console.log('Signin request intercepted, redirecting to login');
    return res.redirect(302, '/#login');
  }
  
  // Handle signout requests
  if (nextauth && (nextauth[0] === 'signout' || nextauth.includes('signout'))) {
    console.log('Signout request intercepted, redirecting to homepage');
    return res.redirect(302, '/');
  }
  
  // Block all other NextAuth routes
  console.log('Blocking NextAuth route:', req.url);
  return res.status(404).json({ 
    error: 'NextAuth is disabled',
    message: 'This authentication method is no longer supported. Please use /#login',
    route: req.url
  });
}