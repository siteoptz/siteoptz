import { NextApiRequest, NextApiResponse } from 'next';
import { authOptions } from '../auth/[...nextauth]';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Only allow in development or with debug key
  const debugKey = req.query.debug;
  if (process.env.NODE_ENV !== 'development' && debugKey !== 'siteoptz-debug-2024') {
    return res.status(404).json({ error: 'Not found' });
  }

  const debug_info = {
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV,
    
    // Environment variables check
    env_vars: {
      nextauth_url: process.env.NEXTAUTH_URL,
      nextauth_secret_exists: !!process.env.NEXTAUTH_SECRET,
      nextauth_secret_length: process.env.NEXTAUTH_SECRET?.length || 0,
      google_client_id_exists: !!process.env.GOOGLE_CLIENT_ID,
      google_client_id_preview: process.env.GOOGLE_CLIENT_ID?.substring(0, 15) + '...',
      google_client_secret_exists: !!process.env.GOOGLE_CLIENT_SECRET,
      google_client_secret_length: process.env.GOOGLE_CLIENT_SECRET?.length || 0,
    },

    // NextAuth configuration check
    nextauth_config: {
      providers_count: authOptions.providers?.length || 0,
      has_google_provider: authOptions.providers?.some((p: any) => p.id === 'google') || false,
      secret_configured: !!authOptions.secret,
      pages_configured: !!authOptions.pages,
      error_page: authOptions.pages?.error,
      signin_page: authOptions.pages?.signIn,
    },

    // GHL configuration check
    ghl_config: {
      api_key_exists: !!process.env.GHL_API_KEY,
      api_key_length: process.env.GHL_API_KEY?.length || 0,
      location_id_exists: !!process.env.GHL_LOCATION_ID,
      location_id: process.env.GHL_LOCATION_ID,
      pipeline_ids_configured: {
        free_trial: !!process.env.GHL_FREE_TRIAL_PIPELINE_ID,
        starter_trial: !!process.env.GHL_STARTER_TRIAL_PIPELINE_ID,
        pro_trial: !!process.env.GHL_PRO_TRIAL_PIPELINE_ID,
      }
    },

    // OAuth URLs
    oauth_urls: {
      signin_url: `${process.env.NEXTAUTH_URL || 'https://siteoptz.ai'}/api/auth/signin/google`,
      callback_url: `${process.env.NEXTAUTH_URL || 'https://siteoptz.ai'}/api/auth/callback/google`,
      providers_url: `${process.env.NEXTAUTH_URL || 'https://siteoptz.ai'}/api/auth/providers`,
      session_url: `${process.env.NEXTAUTH_URL || 'https://siteoptz.ai'}/api/auth/session`,
    },

    // Configuration validation
    validation: {
      oauth_fully_configured: !!(
        process.env.GOOGLE_CLIENT_ID && 
        process.env.GOOGLE_CLIENT_SECRET && 
        process.env.NEXTAUTH_URL && 
        process.env.NEXTAUTH_SECRET &&
        !process.env.GOOGLE_CLIENT_ID.includes('your-') &&
        !process.env.GOOGLE_CLIENT_SECRET.includes('your-')
      ),
      ghl_configured: !!(process.env.GHL_API_KEY && process.env.GHL_LOCATION_ID),
      ready_for_oauth: true // Will be calculated below
    },

    // Common issues check
    potential_issues: [] as string[]
  };

  // Check for common issues
  if (!debug_info.validation.oauth_fully_configured) {
    debug_info.potential_issues.push('OAuth environment variables not properly configured');
  }

  if (process.env.GOOGLE_CLIENT_ID?.includes('your-')) {
    debug_info.potential_issues.push('GOOGLE_CLIENT_ID contains placeholder text');
  }

  if (process.env.GOOGLE_CLIENT_SECRET?.includes('your-')) {
    debug_info.potential_issues.push('GOOGLE_CLIENT_SECRET contains placeholder text');
  }

  if (!process.env.NEXTAUTH_SECRET || process.env.NEXTAUTH_SECRET.length < 32) {
    debug_info.potential_issues.push('NEXTAUTH_SECRET is missing or too short');
  }

  if (process.env.NEXTAUTH_URL !== 'https://siteoptz.ai') {
    debug_info.potential_issues.push('NEXTAUTH_URL may not match production domain');
  }

  if (debug_info.ghl_config.api_key_exists && !debug_info.ghl_config.location_id_exists) {
    debug_info.potential_issues.push('GHL API key exists but location ID is missing');
  }

  // Update ready status
  debug_info.validation.ready_for_oauth = debug_info.potential_issues.length === 0;

  // Add recommendations
  const recommendations = [];
  if (!debug_info.validation.oauth_fully_configured) {
    recommendations.push('Configure all OAuth environment variables in Vercel');
  }
  if (!debug_info.validation.ready_for_oauth) {
    recommendations.push('Fix identified issues before testing OAuth flow');
  }
  recommendations.push('Test OAuth flow with /api/test/oauth-flow');
  recommendations.push('Monitor Vercel function logs during OAuth attempts');

  res.status(200).json({
    ...debug_info,
    recommendations
  });
}