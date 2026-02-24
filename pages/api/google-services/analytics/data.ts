// pages/api/google-services/analytics/data.ts
// API endpoint to fetch Google Analytics data

import { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../../auth/[...nextauth]';

interface AnalyticsData {
  properties: Array<{
    propertyId: string;
    displayName: string;
    websiteUrl: string;
    industryCategory: string;
    timeZone: string;
  }>;
  overview: {
    totalUsers: number;
    totalSessions: number;
    bounceRate: number;
    avgSessionDuration: number;
    pageViews: number;
    dateRange: string;
  };
  topPages: Array<{
    pagePath: string;
    pageTitle: string;
    views: number;
    uniquePageviews: number;
    avgTimeOnPage: number;
    bounceRate: number;
  }>;
  trafficSources: Array<{
    source: string;
    medium: string;
    sessions: number;
    users: number;
    newUsers: number;
    bounceRate: number;
  }>;
  realTimeUsers: {
    activeUsers: number;
    activePages: Array<{
      page: string;
      users: number;
    }>;
  };
  conversionGoals: Array<{
    goalName: string;
    completions: number;
    completionRate: number;
    value: number;
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

    // Check if Analytics scope is available
    const googleScope = (session as any).googleScope || '';
    if (!googleScope.includes('https://www.googleapis.com/auth/analytics.readonly')) {
      return res.status(403).json({ error: 'Analytics access not granted' });
    }

    console.log('🔍 Fetching Analytics data for user:', session.user.email);

    // Mock data for now - replace with actual Analytics API calls
    const mockData: AnalyticsData = {
      properties: [
        {
          propertyId: '123456789',
          displayName: 'SiteOptz Website',
          websiteUrl: 'https://siteoptz.ai',
          industryCategory: 'TECHNOLOGY',
          timeZone: 'America/Los_Angeles'
        }
      ],
      overview: {
        totalUsers: 45230,
        totalSessions: 67845,
        bounceRate: 42.3,
        avgSessionDuration: 145.7,
        pageViews: 187340,
        dateRange: 'Last 28 days'
      },
      topPages: [
        {
          pagePath: '/',
          pageTitle: 'SiteOptz - AI Tools Comparison',
          views: 23450,
          uniquePageviews: 18765,
          avgTimeOnPage: 126.4,
          bounceRate: 38.7
        },
        {
          pagePath: '/compare/chatgpt/vs/claude',
          pageTitle: 'ChatGPT vs Claude - Complete Comparison',
          views: 15670,
          uniquePageviews: 12340,
          avgTimeOnPage: 187.3,
          bounceRate: 32.1
        },
        {
          pagePath: '/reviews/notion-ai',
          pageTitle: 'Notion AI Review - Features & Pricing',
          views: 12340,
          uniquePageviews: 9876,
          avgTimeOnPage: 203.8,
          bounceRate: 29.4
        },
        {
          pagePath: '/best-ai-tools',
          pageTitle: 'Best AI Tools 2024 - Complete Guide',
          views: 9876,
          uniquePageviews: 7654,
          avgTimeOnPage: 156.9,
          bounceRate: 35.6
        }
      ],
      trafficSources: [
        {
          source: 'google',
          medium: 'organic',
          sessions: 28765,
          users: 23456,
          newUsers: 18765,
          bounceRate: 39.2
        },
        {
          source: 'google',
          medium: 'cpc',
          sessions: 12340,
          users: 9876,
          newUsers: 8765,
          bounceRate: 45.7
        },
        {
          source: '(direct)',
          medium: '(none)',
          sessions: 8765,
          users: 7654,
          newUsers: 3456,
          bounceRate: 32.1
        },
        {
          source: 'reddit',
          medium: 'referral',
          sessions: 5432,
          users: 4321,
          newUsers: 4000,
          bounceRate: 58.3
        },
        {
          source: 'twitter',
          medium: 'social',
          sessions: 3210,
          users: 2876,
          newUsers: 2543,
          bounceRate: 52.7
        }
      ],
      realTimeUsers: {
        activeUsers: 127,
        activePages: [
          { page: '/', users: 43 },
          { page: '/compare/chatgpt/vs/claude', users: 28 },
          { page: '/reviews/notion-ai', users: 19 },
          { page: '/best-ai-tools', users: 15 },
          { page: '/pricing', users: 12 },
          { page: '/about', users: 10 }
        ]
      },
      conversionGoals: [
        {
          goalName: 'Newsletter Signup',
          completions: 1234,
          completionRate: 2.8,
          value: 0
        },
        {
          goalName: 'Tool Comparison View',
          completions: 5678,
          completionRate: 12.5,
          value: 0
        },
        {
          goalName: 'Contact Form Submit',
          completions: 432,
          completionRate: 0.98,
          value: 25
        },
        {
          goalName: 'Premium Plan Interest',
          completions: 187,
          completionRate: 0.42,
          value: 100
        }
      ]
    };

    return res.status(200).json({
      success: true,
      data: mockData,
      lastUpdated: new Date().toISOString()
    });

  } catch (error) {
    console.error('Error fetching Analytics data:', error);
    return res.status(500).json({ 
      error: 'Failed to fetch Analytics data',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}