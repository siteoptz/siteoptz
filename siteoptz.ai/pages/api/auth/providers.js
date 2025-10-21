// API endpoint to get available auth providers
// This helps the frontend know which auth methods are configured

export default function handler(req, res) {
  const providers = [];
  
  // Check if Google OAuth is configured
  if (process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET) {
    providers.push({
      id: 'google',
      name: 'Google',
      type: 'oauth',
      configured: true
    });
  }
  
  // Always have email/password as fallback
  providers.push({
    id: 'credentials',
    name: 'Email/Password',
    type: 'credentials',
    configured: true
  });
  
  res.status(200).json({
    providers,
    oauth_configured: providers.some(p => p.type === 'oauth' && p.configured),
    nextauth_url: process.env.NEXTAUTH_URL || 'https://siteoptz.ai'
  });
}