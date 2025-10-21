import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Only show in development or with secret key
  if (req.query.key !== 'debug-oauth-2024') {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const config = {
    env: {
      GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID ? '✅ Set' : '❌ Missing',
      GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET ? '✅ Set' : '❌ Missing',
      NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET ? '✅ Set' : '❌ Missing',
      NEXTAUTH_URL: process.env.NEXTAUTH_URL || '❌ Missing',
      GHL_API_KEY: process.env.GHL_API_KEY ? '✅ Set' : '❌ Missing',
      GHL_LOCATION_ID: process.env.GHL_LOCATION_ID ? '✅ Set' : '❌ Missing',
    },
    oauth: {
      callback_url: `${process.env.NEXTAUTH_URL || 'https://siteoptz.ai'}/api/auth/callback/google`,
      signin_url: `${process.env.NEXTAUTH_URL || 'https://siteoptz.ai'}/api/auth/signin/google`,
    },
    diagnostics: {
      nextauth_configured: !!process.env.GOOGLE_CLIENT_ID && !!process.env.GOOGLE_CLIENT_SECRET && !!process.env.NEXTAUTH_SECRET,
      ghl_configured: !!process.env.GHL_API_KEY && !!process.env.GHL_LOCATION_ID,
    }
  };

  // Test GHL connection if configured
  if (process.env.GHL_API_KEY && process.env.GHL_LOCATION_ID) {
    try {
      const testEmail = 'test@example.com';
      const response = await fetch(
        `https://services.leadconnectorhq.com/contacts/search/duplicate?email=${testEmail}`,
        {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${process.env.GHL_API_KEY}`,
            'Version': '2021-07-28',
            'Location-Id': process.env.GHL_LOCATION_ID
          }
        }
      );
      config.diagnostics['ghl_connection'] = response.ok ? '✅ Working' : `❌ Failed (${response.status})`;
    } catch (error) {
      config.diagnostics['ghl_connection'] = '❌ Error';
    }
  }

  res.status(200).json(config);
}