import { getToken } from 'next-auth/jwt';
import { NextApiRequest } from 'next';

export async function getValidAccessToken(req: NextApiRequest): Promise<string | null> {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  if (!token?.accessToken) return null;

  // Refresh if expired (with 5 min buffer)
  const expiresAt = (token.expiresAt as number) || 0;
  if (Date.now() >= expiresAt - 5 * 60 * 1000 && token.refreshToken) {
    const refreshed = await refreshGoogleToken(token.refreshToken as string);
    if (refreshed?.access_token) return refreshed.access_token;
  }
  return token.accessToken as string;
}

async function refreshGoogleToken(refreshToken: string) {
  try {
    const res = await fetch('https://oauth2.googleapis.com/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        client_id: process.env.GOOGLE_CLIENT_ID!,
        client_secret: process.env.GOOGLE_CLIENT_SECRET!,
        refresh_token: refreshToken,
        grant_type: 'refresh_token',
      }),
    });
    return res.ok ? res.json() : null;
  } catch (error) {
    console.error('Error refreshing Google token:', error);
    return null;
  }
}