// pages/api/google-services/analytics/data.ts
// API endpoint to fetch Google Analytics data with property selection, timeframes, and chart data

import { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../../auth/[...nextauth]';

interface AnalyticsProperty {
  propertyId: string;
  displayName: string;
  websiteUrl: string;
  industryCategory: string;
  timeZone: string;
  currencyCode: string;
}

interface AnalyticsOverview {
  totalUsers: number;
  totalSessions: number;
  bounceRate: number;
  avgSessionDuration: number;
  pageViews: number;
  dateRange: string;
  newUsers: number;
  returningUsers: number;
  conversionRate: number;
  revenuePerUser: number;
}

interface TopPage {
  pagePath: string;
  pageTitle: string;
  views: number;
  uniquePageviews: number;
  avgTimeOnPage: number;
  bounceRate: number;
  entrances: number;
  exits: number;
}

interface TrafficSource {
  source: string;
  medium: string;
  sessions: number;
  users: number;
  newUsers: number;
  bounceRate: number;
  avgSessionDuration: number;
  conversions: number;
}

interface AnalyticsChartDataPoint {
  date: string;
  users: number;
  sessions: number;
  pageViews: number;
  bounceRate: number;
  avgSessionDuration: number;
  conversions: number;
}

interface AnalyticsComparisonData {
  current: {
    period: string;
    users: number;
    sessions: number;
    pageViews: number;
    bounceRate: number;
    avgSessionDuration: number;
    conversions: number;
  };
  previous: {
    period: string;
    users: number;
    sessions: number;
    pageViews: number;
    bounceRate: number;
    avgSessionDuration: number;
    conversions: number;
  };
  change: {
    users: number;
    sessions: number;
    pageViews: number;
    bounceRate: number;
    avgSessionDuration: number;
    conversions: number;
  };
}

interface AnalyticsData {
  properties: AnalyticsProperty[];
  selectedProperty?: AnalyticsProperty;
  overview: AnalyticsOverview;
  topPages: TopPage[];
  trafficSources: TrafficSource[];
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
  chartData: AnalyticsChartDataPoint[];
  comparison?: AnalyticsComparisonData;
  timeframe: string;
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

    // Extract query parameters
    const { 
      propertyId, 
      timeframe = 'last_30_days', 
      comparison = 'false' 
    } = req.query;

    console.log('🔍 Fetching Analytics data for user:', session.user.email);
    console.log('📊 Parameters:', { propertyId, timeframe, comparison });

    // Generate enhanced mock data with multiple properties, chart data, and comparisons
    const mockProperties: AnalyticsProperty[] = [
      {
        propertyId: '123456789',
        displayName: 'SiteOptz Main Website',
        websiteUrl: 'https://siteoptz.ai',
        industryCategory: 'TECHNOLOGY',
        timeZone: 'America/Los_Angeles',
        currencyCode: 'USD'
      },
      {
        propertyId: '123456790',
        displayName: 'SiteOptz Blog',
        websiteUrl: 'https://blog.siteoptz.ai',
        industryCategory: 'TECHNOLOGY',
        timeZone: 'America/Los_Angeles',
        currencyCode: 'USD'
      },
      {
        propertyId: '123456791',
        displayName: 'SiteOptz Europe',
        websiteUrl: 'https://eu.siteoptz.ai',
        industryCategory: 'TECHNOLOGY',
        timeZone: 'Europe/London',
        currencyCode: 'EUR'
      }
    ];

    const selectedProperty = propertyId 
      ? mockProperties.find(prop => prop.propertyId === propertyId) || mockProperties[0]
      : mockProperties[0];

    // Generate chart data based on timeframe
    const generateAnalyticsChartData = (timeframe: string): AnalyticsChartDataPoint[] => {
      const days = timeframe === 'last_7_days' ? 7 : timeframe === 'last_30_days' ? 30 : 90;
      const data: AnalyticsChartDataPoint[] = [];
      
      for (let i = days - 1; i >= 0; i--) {
        const date = new Date();
        date.setDate(date.getDate() - i);
        
        data.push({
          date: date.toISOString().split('T')[0],
          users: Math.floor(Math.random() * 2000) + 500,
          sessions: Math.floor(Math.random() * 2500) + 600,
          pageViews: Math.floor(Math.random() * 8000) + 2000,
          bounceRate: Math.round((Math.random() * 30 + 30) * 100) / 100,
          avgSessionDuration: Math.round((Math.random() * 200 + 100) * 100) / 100,
          conversions: Math.floor(Math.random() * 50) + 10
        });
      }
      
      return data;
    };

    const chartData = generateAnalyticsChartData(timeframe as string);
    
    // Calculate totals from chart data
    const totals = chartData.reduce(
      (acc, day) => ({
        users: acc.users + day.users,
        sessions: acc.sessions + day.sessions,
        pageViews: acc.pageViews + day.pageViews,
        conversions: acc.conversions + day.conversions
      }),
      { users: 0, sessions: 0, pageViews: 0, conversions: 0 }
    );

    // Generate comparison data if requested
    const generateAnalyticsComparison = (): AnalyticsComparisonData | undefined => {
      if (comparison === 'false') return undefined;
      
      const previousPeriodTotals = {
        users: Math.floor(totals.users * (0.8 + Math.random() * 0.4)),
        sessions: Math.floor(totals.sessions * (0.8 + Math.random() * 0.4)),
        pageViews: Math.floor(totals.pageViews * (0.8 + Math.random() * 0.4)),
        conversions: Math.floor(totals.conversions * (0.8 + Math.random() * 0.4))
      };

      const currentPeriod = timeframe as string;
      const previousPeriod = `Previous ${currentPeriod.replace('last_', '')}`;
      
      const currentAvgSessionDuration = 145.7;
      const previousAvgSessionDuration = 138.2;
      const currentBounceRate = 42.3;
      const previousBounceRate = 45.1;
      
      return {
        current: {
          period: currentPeriod,
          users: totals.users,
          sessions: totals.sessions,
          pageViews: totals.pageViews,
          conversions: totals.conversions,
          bounceRate: currentBounceRate,
          avgSessionDuration: currentAvgSessionDuration
        },
        previous: {
          period: previousPeriod,
          users: previousPeriodTotals.users,
          sessions: previousPeriodTotals.sessions,
          pageViews: previousPeriodTotals.pageViews,
          conversions: previousPeriodTotals.conversions,
          bounceRate: previousBounceRate,
          avgSessionDuration: previousAvgSessionDuration
        },
        change: {
          users: Math.round(((totals.users - previousPeriodTotals.users) / previousPeriodTotals.users) * 100 * 100) / 100,
          sessions: Math.round(((totals.sessions - previousPeriodTotals.sessions) / previousPeriodTotals.sessions) * 100 * 100) / 100,
          pageViews: Math.round(((totals.pageViews - previousPeriodTotals.pageViews) / previousPeriodTotals.pageViews) * 100 * 100) / 100,
          conversions: Math.round(((totals.conversions - previousPeriodTotals.conversions) / previousPeriodTotals.conversions) * 100 * 100) / 100,
          bounceRate: Math.round(((currentBounceRate - previousBounceRate) / previousBounceRate) * 100 * 100) / 100,
          avgSessionDuration: Math.round(((currentAvgSessionDuration - previousAvgSessionDuration) / previousAvgSessionDuration) * 100 * 100) / 100
        }
      };
    };

    const comparisonData = generateAnalyticsComparison();

    const mockData: AnalyticsData = {
      properties: mockProperties,
      selectedProperty,
      overview: {
        totalUsers: totals.users,
        totalSessions: totals.sessions,
        bounceRate: 42.3,
        avgSessionDuration: 145.7,
        pageViews: totals.pageViews,
        dateRange: `${(timeframe as string).replace('_', ' ').replace('last ', 'Last ')}`,
        newUsers: Math.floor(totals.users * 0.65),
        returningUsers: Math.floor(totals.users * 0.35),
        conversionRate: Math.round((totals.conversions / totals.sessions) * 100 * 100) / 100,
        revenuePerUser: Math.round(Math.random() * 25 + 5) / 100
      },
      topPages: [
        {
          pagePath: '/',
          pageTitle: 'SiteOptz - AI Tools Comparison',
          views: Math.floor(totals.pageViews * 0.25),
          uniquePageviews: Math.floor(totals.pageViews * 0.20),
          avgTimeOnPage: 126.4,
          bounceRate: 38.7,
          entrances: Math.floor(totals.pageViews * 0.22),
          exits: Math.floor(totals.pageViews * 0.18)
        },
        {
          pagePath: '/compare/chatgpt/vs/claude',
          pageTitle: 'ChatGPT vs Claude - Complete Comparison',
          views: Math.floor(totals.pageViews * 0.18),
          uniquePageviews: Math.floor(totals.pageViews * 0.15),
          avgTimeOnPage: 187.3,
          bounceRate: 32.1,
          entrances: Math.floor(totals.pageViews * 0.16),
          exits: Math.floor(totals.pageViews * 0.14)
        },
        {
          pagePath: '/reviews/notion-ai',
          pageTitle: 'Notion AI Review - Features & Pricing',
          views: Math.floor(totals.pageViews * 0.15),
          uniquePageviews: Math.floor(totals.pageViews * 0.12),
          avgTimeOnPage: 203.8,
          bounceRate: 29.4,
          entrances: Math.floor(totals.pageViews * 0.13),
          exits: Math.floor(totals.pageViews * 0.11)
        },
        {
          pagePath: '/best-ai-tools',
          pageTitle: 'Best AI Tools 2024 - Complete Guide',
          views: Math.floor(totals.pageViews * 0.12),
          uniquePageviews: Math.floor(totals.pageViews * 0.10),
          avgTimeOnPage: 156.9,
          bounceRate: 35.6,
          entrances: Math.floor(totals.pageViews * 0.11),
          exits: Math.floor(totals.pageViews * 0.09)
        }
      ],
      trafficSources: [
        {
          source: 'google',
          medium: 'organic',
          sessions: Math.floor(totals.sessions * 0.45),
          users: Math.floor(totals.users * 0.42),
          newUsers: Math.floor(totals.users * 0.35),
          bounceRate: 39.2,
          avgSessionDuration: 156.8,
          conversions: Math.floor(totals.conversions * 0.35)
        },
        {
          source: 'google',
          medium: 'cpc',
          sessions: Math.floor(totals.sessions * 0.20),
          users: Math.floor(totals.users * 0.18),
          newUsers: Math.floor(totals.users * 0.16),
          bounceRate: 45.7,
          avgSessionDuration: 142.3,
          conversions: Math.floor(totals.conversions * 0.25)
        },
        {
          source: '(direct)',
          medium: '(none)',
          sessions: Math.floor(totals.sessions * 0.15),
          users: Math.floor(totals.users * 0.16),
          newUsers: Math.floor(totals.users * 0.08),
          bounceRate: 32.1,
          avgSessionDuration: 178.4,
          conversions: Math.floor(totals.conversions * 0.18)
        },
        {
          source: 'reddit',
          medium: 'referral',
          sessions: Math.floor(totals.sessions * 0.12),
          users: Math.floor(totals.users * 0.14),
          newUsers: Math.floor(totals.users * 0.13),
          bounceRate: 58.3,
          avgSessionDuration: 98.7,
          conversions: Math.floor(totals.conversions * 0.12)
        },
        {
          source: 'twitter',
          medium: 'social',
          sessions: Math.floor(totals.sessions * 0.08),
          users: Math.floor(totals.users * 0.10),
          newUsers: Math.floor(totals.users * 0.09),
          bounceRate: 52.7,
          avgSessionDuration: 124.6,
          conversions: Math.floor(totals.conversions * 0.10)
        }
      ],
      realTimeUsers: {
        activeUsers: Math.floor(Math.random() * 150) + 50,
        activePages: [
          { page: '/', users: Math.floor(Math.random() * 50) + 20 },
          { page: '/compare/chatgpt/vs/claude', users: Math.floor(Math.random() * 30) + 10 },
          { page: '/reviews/notion-ai', users: Math.floor(Math.random() * 25) + 8 },
          { page: '/best-ai-tools', users: Math.floor(Math.random() * 20) + 5 },
          { page: '/pricing', users: Math.floor(Math.random() * 15) + 3 },
          { page: '/about', users: Math.floor(Math.random() * 10) + 2 }
        ]
      },
      conversionGoals: [
        {
          goalName: 'Newsletter Signup',
          completions: Math.floor(totals.conversions * 0.35),
          completionRate: 2.8,
          value: 0
        },
        {
          goalName: 'Tool Comparison View',
          completions: Math.floor(totals.conversions * 0.45),
          completionRate: 12.5,
          value: 0
        },
        {
          goalName: 'Contact Form Submit',
          completions: Math.floor(totals.conversions * 0.12),
          completionRate: 0.98,
          value: 25
        },
        {
          goalName: 'Premium Plan Interest',
          completions: Math.floor(totals.conversions * 0.08),
          completionRate: 0.42,
          value: 100
        }
      ],
      chartData,
      comparison: comparisonData,
      timeframe: timeframe as string
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