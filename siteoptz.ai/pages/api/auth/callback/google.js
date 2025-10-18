// Handle Google OAuth callback
export default function handler(req, res) {
  console.log('Google OAuth callback received');
  
  // Extract user info from the OAuth callback if needed
  // For now, just redirect to the dashboard
  // The dashboard will check authentication and route to the correct plan
  
  // Redirect to our dashboard (NOT optz.siteoptz.ai)
  return res.redirect(302, 'https://siteoptz.ai/dashboard');
}