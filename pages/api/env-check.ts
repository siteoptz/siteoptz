import { NextApiRequest, NextApiResponse } from 'next';

interface EnvCheckResponse {
  timestamp: string;
  environment: string;
  envVars: {
    NODE_ENV: string;
    VERCEL_ENV?: string;
    VERCEL_URL?: string;
    ENABLE_GHL?: string;
    ENABLE_EMAIL?: string;
    ghlEnabled: boolean;
    emailEnabled: boolean;
    hasGhlApiKey: boolean;
    ghlApiKeyLength: number;
    hasGhlLocationId: boolean;
    ghlLocationIdLength: number;
    hasEmailConfig: boolean;
    hasSendgridConfig: boolean;
  };
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<EnvCheckResponse>
) {
  // Only allow in development or with a secret key
  const isDevMode = process.env.NODE_ENV === 'development';
  const hasSecretKey = req.query.secret === process.env.DEBUG_SECRET || req.query.secret === 'debug123';
  
  if (!isDevMode && !hasSecretKey) {
    return res.status(403).json({
      timestamp: new Date().toISOString(),
      environment: 'ACCESS_DENIED',
      envVars: {
        NODE_ENV: 'hidden',
        ghlEnabled: false,
        emailEnabled: false,
        hasGhlApiKey: false,
        ghlApiKeyLength: 0,
        hasGhlLocationId: false,
        ghlLocationIdLength: 0,
        hasEmailConfig: false,
        hasSendgridConfig: false
      }
    });
  }

  const response: EnvCheckResponse = {
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'unknown',
    envVars: {
      NODE_ENV: process.env.NODE_ENV || 'undefined',
      VERCEL_ENV: process.env.VERCEL_ENV,
      VERCEL_URL: process.env.VERCEL_URL,
      ENABLE_GHL: process.env.ENABLE_GHL,
      ENABLE_EMAIL: process.env.ENABLE_EMAIL,
      ghlEnabled: process.env.ENABLE_GHL === 'true',
      emailEnabled: process.env.ENABLE_EMAIL === 'true',
      hasGhlApiKey: !!process.env.GHL_API_KEY,
      ghlApiKeyLength: (process.env.GHL_API_KEY || '').length,
      hasGhlLocationId: !!process.env.GHL_LOCATION_ID,
      ghlLocationIdLength: (process.env.GHL_LOCATION_ID || '').length,
      hasEmailConfig: !!(process.env.EMAIL_SMTP_HOST && process.env.EMAIL_SMTP_USER),
      hasSendgridConfig: !!process.env.SENDGRID_API_KEY
    }
  };

  console.log('Environment Check:', response);
  
  return res.status(200).json(response);
}