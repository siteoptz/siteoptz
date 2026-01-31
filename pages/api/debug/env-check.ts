import { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  // Only allow this in development or with special debug parameter
  const isDev = process.env.NODE_ENV === 'development';
  const debugKey = req.query.debug;
  
  if (!isDev && debugKey !== 'siteoptz-debug-2024') {
    return res.status(404).json({ error: 'Not found' });
  }

  const envCheck = {
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV,
    oauth_config: {
      google_client_id: {
        exists: !!process.env.GOOGLE_CLIENT_ID,
        starts_with: process.env.GOOGLE_CLIENT_ID?.substring(0, 10) + '...',
        length: process.env.GOOGLE_CLIENT_ID?.length || 0
      },
      google_client_secret: {
        exists: !!process.env.GOOGLE_CLIENT_SECRET,
        length: process.env.GOOGLE_CLIENT_SECRET?.length || 0
      },
      nextauth_url: {
        exists: !!process.env.NEXTAUTH_URL,
        value: process.env.NEXTAUTH_URL
      },
      nextauth_secret: {
        exists: !!process.env.NEXTAUTH_SECRET,
        length: process.env.NEXTAUTH_SECRET?.length || 0
      }
    },
    ghl_config: {
      api_key: {
        exists: !!process.env.GHL_API_KEY,
        length: process.env.GHL_API_KEY?.length || 0
      },
      location_id: {
        exists: !!process.env.GHL_LOCATION_ID,
        value: process.env.GHL_LOCATION_ID
      }
    },
    oauth_ready: !!(
      process.env.GOOGLE_CLIENT_ID && 
      process.env.GOOGLE_CLIENT_SECRET && 
      process.env.NEXTAUTH_URL && 
      process.env.NEXTAUTH_SECRET
    ),
    nextauth_configured: !!(
      process.env.NEXTAUTH_URL &&
      process.env.NEXTAUTH_SECRET &&
      !process.env.GOOGLE_CLIENT_ID?.includes('your-') &&
      !process.env.GOOGLE_CLIENT_SECRET?.includes('your-')
    )
  };

  res.status(200).json(envCheck);
}