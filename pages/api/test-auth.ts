import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  console.log('🔍 Testing authentication configuration...');
  
  const testResults = {
    timestamp: new Date().toISOString(),
    environment: {
      NODE_ENV: process.env.NODE_ENV,
      NEXTAUTH_URL: process.env.NEXTAUTH_URL || 'Not set',
      NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET ? 'Set' : 'Not set',
    },
    googleOAuth: {
      clientId: process.env.GOOGLE_CLIENT_ID ? 'Set' : 'Not set',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ? 'Set' : 'Not set',
    },
    ghl: {
      enabled: process.env.ENABLE_GHL === 'true',
      apiKey: process.env.GOHIGHLEVEL_API_KEY ? 'Set' : 'Not set',
      locationId: process.env.GOHIGHLEVEL_LOCATION_ID ? 'Set' : 'Not set',
    },
    potentialIssues: []
  };

  // Check for common issues
  if (!process.env.NEXTAUTH_SECRET) {
    testResults.potentialIssues.push('NEXTAUTH_SECRET is not set');
  }

  if (!process.env.NEXTAUTH_URL) {
    testResults.potentialIssues.push('NEXTAUTH_URL is not set (should be http://localhost:3000 for dev)');
  }

  if (!process.env.GOOGLE_CLIENT_ID || !process.env.GOOGLE_CLIENT_SECRET) {
    testResults.potentialIssues.push('Google OAuth credentials incomplete');
  }

  if (process.env.ENABLE_GHL === 'true' && (!process.env.GOHIGHLEVEL_API_KEY || !process.env.GOHIGHLEVEL_LOCATION_ID)) {
    testResults.potentialIssues.push('GoHighLevel is enabled but credentials are incomplete');
  }

  // Test NextAuth endpoints
  const authUrls = {
    signin: `${process.env.NEXTAUTH_URL || 'http://localhost:3000'}/api/auth/signin`,
    session: `${process.env.NEXTAUTH_URL || 'http://localhost:3000'}/api/auth/session`,
    providers: `${process.env.NEXTAUTH_URL || 'http://localhost:3000'}/api/auth/providers`,
  };

  console.log('Auth test results:', testResults);

  res.status(200).json({
    success: true,
    ...testResults,
    authUrls,
    recommendations: [
      'Check server console for detailed NextAuth logs',
      'Verify NEXTAUTH_URL matches your current domain',
      'Ensure NEXTAUTH_SECRET is set to a secure value',
      'Test Google OAuth credentials separately'
    ]
  });
}