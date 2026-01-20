import { NextApiRequest, NextApiResponse } from 'next';

// Debug endpoint to check environment variables (without exposing sensitive data)
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const envCheck = {
    // Check if variables exist (without exposing their values)
    GHL_API_KEY: !!process.env.GHL_API_KEY,
    GHL_LOCATION_ID: !!process.env.GHL_LOCATION_ID,
    GHL_FREE_TRIAL_PIPELINE_ID: !!process.env.GHL_FREE_TRIAL_PIPELINE_ID,
    GHL_FREE_TRIAL_STAGE_ID: !!process.env.GHL_FREE_TRIAL_STAGE_ID,
    GHL_STARTER_TRIAL_PIPELINE_ID: !!process.env.GHL_STARTER_TRIAL_PIPELINE_ID,
    GHL_STARTER_TRIAL_STAGE_ID: !!process.env.GHL_STARTER_TRIAL_STAGE_ID,
    GOOGLE_CLIENT_ID: !!process.env.GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET: !!process.env.GOOGLE_CLIENT_SECRET,
    NEXTAUTH_URL: !!process.env.NEXTAUTH_URL,
    NEXTAUTH_SECRET: !!process.env.NEXTAUTH_SECRET,
    
    // Show partial values (safe to expose)
    NODE_ENV: process.env.NODE_ENV,
    VERCEL_ENV: process.env.VERCEL_ENV,
    GHL_API_KEY_PREFIX: process.env.GHL_API_KEY ? process.env.GHL_API_KEY.substring(0, 8) + '...' : 'NOT_SET',
    GHL_LOCATION_ID_PREFIX: process.env.GHL_LOCATION_ID ? process.env.GHL_LOCATION_ID.substring(0, 8) + '...' : 'NOT_SET'
  };

  return res.status(200).json({
    message: 'Environment variables check',
    timestamp: new Date().toISOString(),
    deployment: process.env.VERCEL_GIT_COMMIT_SHA || 'local',
    environment: envCheck
  });
}