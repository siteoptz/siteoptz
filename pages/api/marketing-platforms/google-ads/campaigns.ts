import { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../auth/[...nextauth]';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const session = await getServerSession(req, res, authOptions);
  if (!session) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'Missing or invalid authorization header' });
    }

    const accessToken = authHeader.substring(7);
    const developerToken = req.headers['developer-token'] as string;

    if (!developerToken) {
      return res.status(400).json({ error: 'Missing developer token' });
    }

    // Fetch campaigns from Google Ads API
    const campaigns = await fetchGoogleAdsCampaigns(accessToken, developerToken);

    return res.status(200).json({
      success: true,
      campaigns,
      lastSync: new Date().toISOString()
    });
  } catch (error) {
    console.error('Google Ads campaigns fetch error:', error);
    return res.status(500).json({ error: 'Failed to fetch campaigns' });
  }
}

async function fetchGoogleAdsCampaigns(accessToken: string, developerToken: string) {
  try {
    // In production, use the Google Ads API client library
    // For demo purposes, return mock data that matches the real API structure
    
    const mockCampaigns = [
      {
        id: '1234567890',
        name: 'Summer Sale 2024',
        status: 'ENABLED',
        startDate: '2024-06-01',
        endDate: '2024-08-31',
        metrics: {
          costMicros: '5420000000', // $5,420 in micros
          impressions: '125000',
          clicks: '3200',
          conversions: '156',
          conversionsValue: '156800000000', // $156,800 in micros
          ctr: '2.56',
          costPerClick: '1690000', // $1.69 in micros
          costPerConversion: '34740000' // $34.74 in micros
        }
      },
      {
        id: '1234567891',
        name: 'Brand Awareness Q4',
        status: 'ENABLED',
        startDate: '2024-10-01',
        endDate: null,
        metrics: {
          costMicros: '3200000000', // $3,200 in micros
          impressions: '89000',
          clicks: '2100',
          conversions: '89',
          conversionsValue: '89000000000', // $89,000 in micros
          ctr: '2.36',
          costPerClick: '1520000', // $1.52 in micros
          costPerConversion: '35960000' // $35.96 in micros
        }
      },
      {
        id: '1234567892',
        name: 'Product Launch Campaign',
        status: 'PAUSED',
        startDate: '2024-01-15',
        endDate: '2024-02-15',
        metrics: {
          costMicros: '1800000000', // $1,800 in micros
          impressions: '45000',
          clicks: '1200',
          conversions: '42',
          conversionsValue: '42000000000', // $42,000 in micros
          ctr: '2.67',
          costPerClick: '1500000', // $1.50 in micros
          costPerConversion: '42860000' // $42.86 in micros
        }
      }
    ];

    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));

    return mockCampaigns;
  } catch (error) {
    console.error('Error fetching Google Ads campaigns:', error);
    throw error;
  }
}
