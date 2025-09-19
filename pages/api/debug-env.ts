import { NextApiRequest, NextApiResponse } from 'next';

// Simple endpoint to check if environment variables are set in production
export default function handler(req: NextApiRequest, res: NextApiResponse) {
  // Only allow in development or with a secret key for security
  const debugSecret = req.query.secret;
  const isDev = process.env.NODE_ENV === 'development';
  const isAuthorized = debugSecret === process.env.DEBUG_SECRET || isDev;
  
  if (!isAuthorized) {
    return res.status(403).json({ error: 'Unauthorized' });
  }

  const envCheck = {
    NODE_ENV: process.env.NODE_ENV,
    ENABLE_GHL: process.env.ENABLE_GHL,
    HAS_GOHIGHLEVEL_API_KEY: !!process.env.GOHIGHLEVEL_API_KEY,
    HAS_GOHIGHLEVEL_LOCATION_ID: !!process.env.GOHIGHLEVEL_LOCATION_ID,
    HAS_NEXTAUTH_URL: !!process.env.NEXTAUTH_URL,
    GOHIGHLEVEL_API_KEY_PREVIEW: process.env.GOHIGHLEVEL_API_KEY ? 
      process.env.GOHIGHLEVEL_API_KEY.substring(0, 10) + '...' : 'Not set',
    GOHIGHLEVEL_LOCATION_ID_PREVIEW: process.env.GOHIGHLEVEL_LOCATION_ID ? 
      process.env.GOHIGHLEVEL_LOCATION_ID.substring(0, 8) + '...' : 'Not set',
    timestamp: new Date().toISOString()
  };

  return res.status(200).json(envCheck);
}