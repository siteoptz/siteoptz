// pages/api/google-services/search-console/data.ts
// API endpoint to fetch Google Search Console data

import { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../../auth/[...nextauth]';

interface SearchConsoleData {
  properties: Array<{
    siteUrl: string;
    permissionLevel: string;
    verified: boolean;
  }>;
  performance: {
    totalClicks: number;
    totalImpressions: number;
    avgCtr: number;
    avgPosition: number;
    dateRange: string;
  };
  topQueries: Array<{
    query: string;
    clicks: number;
    impressions: number;
    ctr: number;
    position: number;
  }>;
  topPages: Array<{
    page: string;
    clicks: number;
    impressions: number;
    ctr: number;
    position: number;
  }>;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const session = await getServerSession(req, res, authOptions);
    
    if (!session?.user?.email) {
      return res.status(401).json({ error: 'Not authenticated' });
    }

    const accessToken = (session as any).accessToken;
    
    if (!accessToken) {
      return res.status(401).json({ error: 'No Google access token found' });
    }

    // Check if Search Console scope is available
    const googleScope = (session as any).googleScope || '';
    if (!googleScope.includes('https://www.googleapis.com/auth/webmasters.readonly')) {
      return res.status(403).json({ error: 'Search Console access not granted' });
    }

    console.log('🔍 Fetching Search Console data for user:', session.user.email);

    // Mock data for now - replace with actual Search Console API calls
    const mockData: SearchConsoleData = {
      properties: [
        {
          siteUrl: 'https://siteoptz.ai/',
          permissionLevel: 'siteOwner',
          verified: true
        },
        {
          siteUrl: 'sc-domain:siteoptz.ai',
          permissionLevel: 'siteOwner', 
          verified: true
        }
      ],
      performance: {
        totalClicks: 15847,
        totalImpressions: 287340,
        avgCtr: 5.52,
        avgPosition: 12.8,
        dateRange: 'Last 28 days'
      },
      topQueries: [
        {
          query: 'ai tools comparison',
          clicks: 2453,
          impressions: 18920,
          ctr: 12.96,
          position: 3.2
        },
        {
          query: 'best ai writing tools',
          clicks: 1876,
          impressions: 24310,
          ctr: 7.71,
          position: 4.8
        },
        {
          query: 'chatgpt vs claude',
          clicks: 1234,
          impressions: 15670,
          ctr: 7.87,
          position: 5.1
        },
        {
          query: 'ai productivity tools',
          clicks: 987,
          impressions: 12450,
          ctr: 7.93,
          position: 6.2
        },
        {
          query: 'siteoptz review',
          clicks: 654,
          impressions: 3210,
          ctr: 20.37,
          position: 2.1
        }
      ],
      topPages: [
        {
          page: '/',
          clicks: 4567,
          impressions: 45230,
          ctr: 10.09,
          position: 4.2
        },
        {
          page: '/compare/chatgpt/vs/claude',
          clicks: 3210,
          impressions: 28750,
          ctr: 11.17,
          position: 3.8
        },
        {
          page: '/reviews/notion-ai',
          clicks: 2145,
          impressions: 19680,
          ctr: 10.90,
          position: 5.4
        },
        {
          page: '/best-ai-tools',
          clicks: 1876,
          impressions: 23450,
          ctr: 8.00,
          position: 6.1
        }
      ]
    };

    return res.status(200).json({
      success: true,
      data: mockData,
      lastUpdated: new Date().toISOString()
    });

  } catch (error) {
    console.error('Error fetching Search Console data:', error);
    return res.status(500).json({ 
      error: 'Failed to fetch Search Console data',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}