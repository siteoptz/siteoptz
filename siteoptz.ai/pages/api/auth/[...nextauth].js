// Disable NextAuth - Use custom GoHighLevel authentication instead
export default function handler(req, res) {
  // Redirect to custom auth endpoints
  const { nextauth } = req.query;
  
  if (nextauth && nextauth[0] === 'signin') {
    // Redirect to homepage with login hash
    return res.redirect(302, '/#login');
  }
  
  if (nextauth && nextauth[0] === 'callback') {
    // Redirect OAuth callbacks to homepage
    // This prevents the optz.siteoptz.ai redirect
    return res.redirect(302, '/');
  }
  
  // For any other NextAuth routes, return an error
  return res.status(404).json({ 
    error: 'NextAuth is disabled. Please use the custom authentication at /#login' 
  });
}