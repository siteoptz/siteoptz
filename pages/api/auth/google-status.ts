import { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const isConfigured = !!(
    process.env.GOOGLE_CLIENT_ID && 
    process.env.GOOGLE_CLIENT_SECRET &&
    process.env.GOOGLE_CLIENT_ID !== 'your_google_oauth_client_id' &&
    process.env.GOOGLE_CLIENT_SECRET !== 'your_google_oauth_client_secret'
  );

  res.status(200).json({
    configured: isConfigured,
    message: isConfigured 
      ? 'Google OAuth is configured' 
      : 'Google OAuth is not configured. Please use email/password authentication or contact support.'
  });
}