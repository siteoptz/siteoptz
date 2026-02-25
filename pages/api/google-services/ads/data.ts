// pages/api/google-services/ads/data.ts
// API endpoint to fetch Google Ads data with MCC support, timeframes, and chart data

import { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../../auth/[...nextauth]';
import { getValidAccessToken } from '../../../../lib/google-token-utils';

interface MCCAccount {
  customerId: string;
  name: string;
  descriptiveName: string;
  currencyCode: string;
  timeZone: string;
  accountType: string;
  testAccount: boolean;
}

interface Campaign {
  id: string;
  name: string;
  status: string;
  impressions: number;
  clicks: number;
  cost: number;
  conversions: number;
  ctr: number;
  cpc: number;
  conversionRate: number;
}

interface ChartDataPoint {
  date: string;
  impressions: number;
  clicks: number;
  cost: number;
  conversions: number;
  ctr: number;
  cpc: number;
}

interface ComparisonData {
  current: {
    period: string;
    impressions: number;
    clicks: number;
    cost: number;
    conversions: number;
    ctr: number;
    cpc: number;
  };
  previous: {
    period: string;
    impressions: number;
    clicks: number;
    cost: number;
    conversions: number;
    ctr: number;
    cpc: number;
  };
  change: {
    impressions: number;
    clicks: number;
    cost: number;
    conversions: number;
    ctr: number;
    cpc: number;
  };
}

interface GoogleAdsData {
  accounts: MCCAccount[];
  selectedAccount?: MCCAccount;
  campaigns: Campaign[];
  summary: {
    totalImpressions: number;
    totalClicks: number;
    totalCost: number;
    totalConversions: number;
    avgCtr: number;
    avgCpc: number;
    conversionRate: number;
  };
  chartData: ChartDataPoint[];
  comparison?: ComparisonData;
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

    const accessToken = await getValidAccessToken(req);
    
    if (!accessToken) {
      return res.status(401).json({ error: 'No Google access token found or token refresh failed' });
    }

    // Check if Google Ads scope is available
    const googleScope = (session as any).googleScope || '';
    if (!googleScope.includes('https://www.googleapis.com/auth/adwords')) {
      return res.status(403).json({ error: 'Google Ads access not granted' });
    }

    // Extract query parameters
    const { 
      accountId, 
      timeframe = 'last_30_days', 
      comparison = 'false' 
    } = req.query;

    console.log('🔍 Fetching Google Ads data for user:', session.user.email);
    console.log('📊 Parameters:', { accountId, timeframe, comparison });

    // Fetch real Google Ads MCC accounts
    console.log('🔍 Attempting to fetch real Google Ads accounts...');
    const { accounts: realAccounts, error: apiError } = await fetchGoogleAdsAccounts(accessToken);
    
    console.log('📊 Google Ads API Response:', {
      realAccountsFound: realAccounts.length,
      apiError,
      accounts: realAccounts.map(acc => ({
        customerId: acc.customerId,
        name: acc.name,
        accountType: acc.accountType,
        testAccount: acc.testAccount
      }))
    });
    
    // Determine if we're using real or mock data
    const isUsingMockData = realAccounts.length === 0;
    
    const accounts: MCCAccount[] = realAccounts.length > 0 ? realAccounts : [
      {
        customerId: '123-456-7890',
        name: 'Demo Account (Mock Data)',
        descriptiveName: 'Demo Google Ads Account - API Connection Failed',
        currencyCode: 'USD',
        timeZone: 'America/Los_Angeles',
        accountType: 'STANDARD',
        testAccount: true
      }
    ];

    const selectedAccount = accountId 
      ? accounts.find(acc => acc.customerId === accountId) || accounts[0]
      : accounts[0];

    // Fetch real campaign data if we have real accounts
    let realCampaigns: Campaign[] = [];
    let realChartData: ChartDataPoint[] = [];
    
    console.log('🔍 Campaign data fetch conditions:', {
      isUsingMockData,
      hasSelectedAccount: !!selectedAccount,
      selectedAccountDetails: selectedAccount ? {
        customerId: selectedAccount.customerId,
        name: selectedAccount.name,
        testAccount: selectedAccount.testAccount,
        accountType: selectedAccount.accountType
      } : null,
      willFetchRealData: !isUsingMockData && selectedAccount && !selectedAccount.testAccount
    });
    
    if (!isUsingMockData && selectedAccount && !selectedAccount.testAccount) {
      console.log('🚀 Fetching real campaign data for account:', selectedAccount.customerId);
      const campaignData = await fetchRealCampaignData(selectedAccount.customerId, accessToken, timeframe as string);
      realCampaigns = campaignData.campaigns;
      realChartData = campaignData.chartData;
      console.log('📊 Real campaign data fetched:', {
        campaignsCount: realCampaigns.length,
        chartDataCount: realChartData.length
      });
    } else {
      console.log('⚠️ Using mock data because:', {
        reason: isUsingMockData ? 'No real accounts found' : 
                !selectedAccount ? 'No account selected' :
                selectedAccount.testAccount ? 'Selected account is test account' : 'Unknown'
      });
    }

    // Generate chart data based on timeframe
    const generateChartData = (timeframe: string): ChartDataPoint[] => {
      const days = timeframe === 'last_7_days' ? 7 : timeframe === 'last_30_days' ? 30 : 90;
      const data: ChartDataPoint[] = [];
      
      for (let i = days - 1; i >= 0; i--) {
        const date = new Date();
        date.setDate(date.getDate() - i);
        
        data.push({
          date: date.toISOString().split('T')[0],
          impressions: Math.floor(Math.random() * 5000) + 1000,
          clicks: Math.floor(Math.random() * 200) + 50,
          cost: Math.round((Math.random() * 500 + 100) * 100) / 100,
          conversions: Math.floor(Math.random() * 10) + 1,
          ctr: Math.round((Math.random() * 5 + 1) * 100) / 100,
          cpc: Math.round((Math.random() * 3 + 0.5) * 100) / 100
        });
      }
      
      return data;
    };

    // Use real chart data if available, otherwise generate mock data
    const chartData = realChartData.length > 0 ? realChartData : generateChartData(timeframe as string);
    
    // Calculate totals from chart data
    const totals = chartData.reduce(
      (acc, day) => ({
        impressions: acc.impressions + day.impressions,
        clicks: acc.clicks + day.clicks,
        cost: acc.cost + day.cost,
        conversions: acc.conversions + day.conversions
      }),
      { impressions: 0, clicks: 0, cost: 0, conversions: 0 }
    );

    // Generate comparison data if requested
    const generateComparison = (): ComparisonData | undefined => {
      if (comparison === 'false') return undefined;
      
      const previousPeriodTotals = {
        impressions: Math.floor(totals.impressions * (0.8 + Math.random() * 0.4)),
        clicks: Math.floor(totals.clicks * (0.8 + Math.random() * 0.4)),
        cost: Math.round(totals.cost * (0.8 + Math.random() * 0.4) * 100) / 100,
        conversions: Math.floor(totals.conversions * (0.8 + Math.random() * 0.4))
      };

      const currentPeriod = timeframe as string;
      const previousPeriod = `Previous ${currentPeriod.replace('last_', '')}`;
      
      return {
        current: {
          period: currentPeriod,
          impressions: totals.impressions,
          clicks: totals.clicks,
          cost: totals.cost,
          conversions: totals.conversions,
          ctr: Math.round((totals.clicks / totals.impressions) * 100 * 100) / 100,
          cpc: Math.round((totals.cost / totals.clicks) * 100) / 100
        },
        previous: {
          period: previousPeriod,
          impressions: previousPeriodTotals.impressions,
          clicks: previousPeriodTotals.clicks,
          cost: previousPeriodTotals.cost,
          conversions: previousPeriodTotals.conversions,
          ctr: Math.round((previousPeriodTotals.clicks / previousPeriodTotals.impressions) * 100 * 100) / 100,
          cpc: Math.round((previousPeriodTotals.cost / previousPeriodTotals.clicks) * 100) / 100
        },
        change: {
          impressions: Math.round(((totals.impressions - previousPeriodTotals.impressions) / previousPeriodTotals.impressions) * 100 * 100) / 100,
          clicks: Math.round(((totals.clicks - previousPeriodTotals.clicks) / previousPeriodTotals.clicks) * 100 * 100) / 100,
          cost: Math.round(((totals.cost - previousPeriodTotals.cost) / previousPeriodTotals.cost) * 100 * 100) / 100,
          conversions: Math.round(((totals.conversions - previousPeriodTotals.conversions) / previousPeriodTotals.conversions) * 100 * 100) / 100,
          ctr: 0, // Will calculate separately
          cpc: 0  // Will calculate separately
        }
      };
    };

    const comparisonData = generateComparison();

    // Use real campaigns if available, otherwise generate mock campaigns
    const campaigns = realCampaigns.length > 0 ? realCampaigns : [
      {
        id: '1234567890',
        name: 'Search Campaign - Brand Terms',
        status: 'ENABLED',
        impressions: Math.floor(totals.impressions * 0.4),
        clicks: Math.floor(totals.clicks * 0.4),
        cost: Math.round(totals.cost * 0.4 * 100) / 100,
        conversions: Math.floor(totals.conversions * 0.4),
        ctr: 3.75,
        cpc: 2.29,
        conversionRate: 2.8
      },
      {
        id: '1234567891', 
        name: 'Display Campaign - Remarketing',
        status: 'ENABLED',
        impressions: Math.floor(totals.impressions * 0.35),
        clicks: Math.floor(totals.clicks * 0.35),
        cost: Math.round(totals.cost * 0.35 * 100) / 100,
        conversions: Math.floor(totals.conversions * 0.35),
        ctr: 2.65,
        cpc: 1.95,
        conversionRate: 1.8
      },
      {
        id: '1234567892',
        name: 'Shopping Campaign - Products',
        status: 'PAUSED',
        impressions: Math.floor(totals.impressions * 0.25),
        clicks: Math.floor(totals.clicks * 0.25),
        cost: Math.round(totals.cost * 0.25 * 100) / 100,
        conversions: Math.floor(totals.conversions * 0.25),
        ctr: 4.12,
        cpc: 2.78,
        conversionRate: 3.2
      }
    ];

    const mockData: GoogleAdsData = {
      accounts: accounts,
      selectedAccount,
      campaigns,
      summary: {
        totalImpressions: totals.impressions,
        totalClicks: totals.clicks,
        totalCost: totals.cost,
        totalConversions: totals.conversions,
        avgCtr: Math.round((totals.clicks / totals.impressions) * 100 * 100) / 100,
        avgCpc: Math.round((totals.cost / totals.clicks) * 100) / 100,
        conversionRate: Math.round((totals.conversions / totals.clicks) * 100 * 100) / 100
      },
      chartData,
      comparison: comparisonData,
      timeframe: timeframe as string
    };

    // TODO: Replace with actual Google Ads API calls
    // const adsData = await fetchGoogleAdsData(accessToken, refreshToken);

    // Determine data source and provide detailed status
    let dataSource = 'mock';
    let statusMessage = 'Using mock data - API connection failed';
    
    if (!isUsingMockData) {
      if (realCampaigns.length > 0) {
        dataSource = 'real';
        statusMessage = `Successfully fetched real data from ${campaigns.length} campaigns`;
      } else if (selectedAccount && !selectedAccount.testAccount) {
        dataSource = 'mixed';
        statusMessage = 'Real accounts found but campaign data unavailable - using mock campaigns with real account info';
      } else {
        dataSource = 'real_accounts_mock_data';
        statusMessage = 'Real accounts connected but using mock campaign data';
      }
    }

    return res.status(200).json({
      success: true,
      data: mockData,
      dataSource,
      statusMessage,
      apiError: isUsingMockData ? apiError : null,
      realDataStats: {
        accountsCount: accounts.length,
        campaignsCount: realCampaigns.length,
        chartDataPoints: realChartData.length,
        selectedAccountType: selectedAccount?.accountType || 'unknown'
      },
      debugInfo: {
        isUsingMockData,
        hasRealAccounts: realAccounts.length > 0,
        realAccountsCount: realAccounts.length,
        selectedAccountId: selectedAccount?.customerId,
        selectedAccountIsTest: selectedAccount?.testAccount,
        hasGoogleAdsDevToken: !!process.env.GOOGLE_ADS_DEVELOPER_TOKEN,
        availableAccounts: accounts.map(acc => ({
          id: acc.customerId,
          name: acc.name,
          isTest: acc.testAccount,
          type: acc.accountType
        }))
      },
      lastUpdated: new Date().toISOString()
    });

  } catch (error) {
    console.error('Error fetching Google Ads data:', error);
    return res.status(500).json({ 
      error: 'Failed to fetch Google Ads data',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}

// Function to fetch real Google Ads accounts from Google Ads API (including MCC child accounts)
async function fetchGoogleAdsAccounts(accessToken: string): Promise<{accounts: MCCAccount[], error: string | null}> {
  try {
    console.log('🔍 Fetching real Google Ads accounts (including MCC child accounts)...');
    console.log('🔧 Using developer token:', process.env.GOOGLE_ADS_DEVELOPER_TOKEN ? 'CONFIGURED' : 'MISSING');
    
    // Try multiple approaches to get Google Ads data
    
    // Approach 1: Try the Google Ads API v14 (current implementation)
    let customerResponse = await fetch('https://googleads.googleapis.com/v14/customers:listAccessibleCustomers', {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'developer-token': process.env.GOOGLE_ADS_DEVELOPER_TOKEN || '',
        'Content-Type': 'application/json',
      },
    });

    // If v14 fails, try v13
    if (!customerResponse.ok) {
      console.log('🔄 Google Ads API v14 failed, trying v13...');
      customerResponse = await fetch('https://googleads.googleapis.com/v13/customers:listAccessibleCustomers', {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'developer-token': process.env.GOOGLE_ADS_DEVELOPER_TOKEN || '',
          'Content-Type': 'application/json',
        },
      });
    }

    if (!customerResponse.ok) {
      const errorText = await customerResponse.text();
      console.error('❌ Failed to fetch accessible customers:', customerResponse.status, errorText);
      console.error('🔧 Developer token configured:', !!process.env.GOOGLE_ADS_DEVELOPER_TOKEN);
      console.error('🔧 Developer token value:', process.env.GOOGLE_ADS_DEVELOPER_TOKEN ? 'PRESENT' : 'MISSING');
      return { 
        accounts: [], 
        error: `Google Ads API error ${customerResponse.status}: ${errorText}. This may indicate that Google Ads API access is not enabled for this account or the developer token needs approval.` 
      };
    }

    const customerData = await customerResponse.json();
    console.log('📊 Accessible customers:', customerData);

    if (!customerData.resourceNames || customerData.resourceNames.length === 0) {
      console.log('No accessible customers found');
      return { accounts: [], error: 'No accessible Google Ads customers found. Your account may not have access to Google Ads or the developer token may not be approved.' };
    }

    // Extract customer IDs from resource names
    const customerIds = customerData.resourceNames.map((resourceName: string) => {
      const match = resourceName.match(/customers\/(\d+)/);
      return match ? match[1] : null;
    }).filter((id: string | null) => id !== null);

    console.log('📊 Customer IDs found:', customerIds);

    const allAccounts: MCCAccount[] = [];
    
    for (const customerId of customerIds) {
      try {
        // Get basic customer info
        const customerDetails = await getCustomerDetails(customerId, accessToken);
        if (customerDetails) {
          allAccounts.push(customerDetails);
        }

        // If this is an MCC account, fetch all child accounts
        if (customerDetails?.accountType === 'MANAGER') {
          console.log(`🏢 Found MCC account ${customerId}, fetching child accounts...`);
          const childAccounts = await fetchMCCChildAccounts(customerId, accessToken);
          allAccounts.push(...childAccounts);
          console.log(`✅ Found ${childAccounts.length} child accounts under MCC ${customerId}`);
        }
        
      } catch (error) {
        console.error(`Error processing customer ${customerId}:`, error);
      }
    }

    console.log(`✅ Successfully fetched ${allAccounts.length} total Google Ads accounts (including MCC children)`);
    return { accounts: allAccounts, error: null };

  } catch (error) {
    console.error('Error fetching Google Ads accounts:', error);
    return { accounts: [], error: `Failed to fetch Google Ads accounts: ${error instanceof Error ? error.message : 'Unknown error'}` };
  }
}

// Helper function to get customer details
async function getCustomerDetails(customerId: string, accessToken: string): Promise<MCCAccount | null> {
  try {
    const accountResponse = await fetch(`https://googleads.googleapis.com/v14/customers/${customerId}/googleAds:search`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'developer-token': process.env.GOOGLE_ADS_DEVELOPER_TOKEN || '',
        'login-customer-id': customerId,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: `
          SELECT 
            customer.id,
            customer.descriptive_name,
            customer.currency_code,
            customer.time_zone,
            customer.test_account,
            customer.manager
          FROM customer 
          WHERE customer.id = ${customerId}
        `
      }),
    });

    if (accountResponse.ok) {
      const accountData = await accountResponse.json();
      if (accountData.results && accountData.results.length > 0) {
        const customer = accountData.results[0].customer;
        return {
          customerId: customer.id,
          name: customer.descriptiveName || `Account ${customer.id}`,
          descriptiveName: customer.descriptiveName || `Google Ads Account ${customer.id}`,
          currencyCode: customer.currencyCode || 'USD',
          timeZone: customer.timeZone || 'America/Los_Angeles',
          accountType: customer.manager ? 'MANAGER' : 'STANDARD',
          testAccount: customer.testAccount || false
        };
      }
    } else {
      console.error(`Failed to fetch account details for ${customerId}:`, accountResponse.status);
    }
    return null;
  } catch (error) {
    console.error(`Error fetching customer details for ${customerId}:`, error);
    return null;
  }
}

// Helper function to fetch all child accounts from an MCC
async function fetchMCCChildAccounts(mccCustomerId: string, accessToken: string): Promise<MCCAccount[]> {
  try {
    console.log(`🔍 Fetching child accounts for MCC ${mccCustomerId}...`);
    
    const childAccountsResponse = await fetch(`https://googleads.googleapis.com/v14/customers/${mccCustomerId}/googleAds:search`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'developer-token': process.env.GOOGLE_ADS_DEVELOPER_TOKEN || '',
        'login-customer-id': mccCustomerId,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: `
          SELECT 
            customer_client.client_customer,
            customer_client.level,
            customer_client.manager,
            customer_client.descriptive_name,
            customer_client.currency_code,
            customer_client.time_zone,
            customer_client.test_account,
            customer_client.status
          FROM customer_client
          WHERE customer_client.status = 'ENABLED'
        `
      }),
    });

    const childAccounts: MCCAccount[] = [];
    
    if (childAccountsResponse.ok) {
      const childAccountsData = await childAccountsResponse.json();
      console.log(`📊 Child accounts data for MCC ${mccCustomerId}:`, childAccountsData);
      
      if (childAccountsData.results) {
        for (const result of childAccountsData.results) {
          const client = result.customerClient;
          // Extract customer ID from the resource name
          const customerIdMatch = client.clientCustomer.match(/customers\/(\d+)/);
          if (customerIdMatch) {
            const childCustomerId = customerIdMatch[1];
            
            childAccounts.push({
              customerId: childCustomerId,
              name: client.descriptiveName || `Child Account ${childCustomerId}`,
              descriptiveName: client.descriptiveName || `Child Google Ads Account ${childCustomerId}`,
              currencyCode: client.currencyCode || 'USD',
              timeZone: client.timeZone || 'America/Los_Angeles',
              accountType: client.manager ? 'MANAGER' : 'STANDARD',
              testAccount: client.testAccount || false
            });
          }
        }
      }
    } else {
      console.error(`Failed to fetch child accounts for MCC ${mccCustomerId}:`, childAccountsResponse.status);
    }

    return childAccounts;
  } catch (error) {
    console.error(`Error fetching MCC child accounts for ${mccCustomerId}:`, error);
    return [];
  }
}

// Function to fetch real campaign data using GAQL queries
async function fetchRealCampaignData(
  customerId: string, 
  accessToken: string, 
  timeframe: string
): Promise<{campaigns: Campaign[], chartData: ChartDataPoint[]}> {
  try {
    console.log('🔍 Fetching real campaign data for customer:', customerId);
    
    // Convert timeframe to date range for GAQL
    const getDateRange = (timeframe: string) => {
      switch (timeframe) {
        case 'last_7_days':
          return 'LAST_7_DAYS';
        case 'last_30_days':
          return 'LAST_30_DAYS';
        case 'last_90_days':
          return 'LAST_90_DAYS';
        default:
          return 'LAST_30_DAYS';
      }
    };

    const dateRange = getDateRange(timeframe);

    // GAQL query for campaign performance data
    const campaignQuery = {
      query: `
        SELECT 
          campaign.id,
          campaign.name,
          campaign.status,
          metrics.impressions,
          metrics.clicks,
          metrics.cost_micros,
          metrics.conversions,
          metrics.ctr,
          metrics.average_cpc
        FROM campaign 
        WHERE segments.date DURING ${dateRange}
        AND campaign.status != 'REMOVED'
        ORDER BY metrics.impressions DESC
        LIMIT 50
      `
    };

    const campaignResponse = await fetch(
      `https://googleads.googleapis.com/v14/customers/${customerId}/googleAds:search`,
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'developer-token': process.env.GOOGLE_ADS_DEVELOPER_TOKEN || '',
          'login-customer-id': customerId,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(campaignQuery),
      }
    );

    const campaigns: Campaign[] = [];

    if (campaignResponse.ok) {
      const campaignData = await campaignResponse.json();
      console.log('📊 Campaign data received:', campaignData.results?.length || 0, 'campaigns');

      if (campaignData.results) {
        for (const result of campaignData.results) {
          const campaign = result.campaign;
          const metrics = result.metrics;

          campaigns.push({
            id: campaign.id.toString(),
            name: campaign.name,
            status: campaign.status,
            impressions: parseInt(metrics.impressions || '0'),
            clicks: parseInt(metrics.clicks || '0'),
            cost: parseFloat(metrics.costMicros || '0') / 1000000, // Convert micros to currency
            conversions: parseFloat(metrics.conversions || '0'),
            ctr: parseFloat(metrics.ctr || '0') * 100, // Convert to percentage
            cpc: parseFloat(metrics.averageCpc || '0') / 1000000, // Convert micros to currency
            conversionRate: metrics.clicks > 0 ? (parseFloat(metrics.conversions || '0') / parseInt(metrics.clicks)) * 100 : 0
          });
        }
      }
    } else {
      const errorText = await campaignResponse.text();
      console.error('❌ Failed to fetch campaign data:', {
        status: campaignResponse.status,
        statusText: campaignResponse.statusText,
        customerId,
        error: errorText,
        hasDevToken: !!process.env.GOOGLE_ADS_DEVELOPER_TOKEN
      });
    }

    // GAQL query for daily performance data (for charts)
    const dailyQuery = {
      query: `
        SELECT 
          segments.date,
          metrics.impressions,
          metrics.clicks,
          metrics.cost_micros,
          metrics.conversions,
          metrics.ctr,
          metrics.average_cpc
        FROM campaign 
        WHERE segments.date DURING ${dateRange}
        AND campaign.status != 'REMOVED'
      `
    };

    const dailyResponse = await fetch(
      `https://googleads.googleapis.com/v14/customers/${customerId}/googleAds:search`,
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'developer-token': process.env.GOOGLE_ADS_DEVELOPER_TOKEN || '',
          'login-customer-id': customerId,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dailyQuery),
      }
    );

    const chartData: ChartDataPoint[] = [];

    if (dailyResponse.ok) {
      const dailyData = await dailyResponse.json();
      console.log('📊 Daily data received:', dailyData.results?.length || 0, 'data points');

      if (dailyData.results) {
        // Group data by date and aggregate metrics
        const dateMap = new Map<string, any>();
        
        for (const result of dailyData.results) {
          const date = result.segments.date;
          const metrics = result.metrics;
          
          if (!dateMap.has(date)) {
            dateMap.set(date, {
              date,
              impressions: 0,
              clicks: 0,
              cost: 0,
              conversions: 0,
              ctr: 0,
              cpc: 0
            });
          }
          
          const existing = dateMap.get(date);
          existing.impressions += parseInt(metrics.impressions || '0');
          existing.clicks += parseInt(metrics.clicks || '0');
          existing.cost += parseFloat(metrics.costMicros || '0') / 1000000;
          existing.conversions += parseFloat(metrics.conversions || '0');
        }

        // Convert to array and calculate CTR/CPC
        for (const [date, data] of dateMap) {
          chartData.push({
            date,
            impressions: data.impressions,
            clicks: data.clicks,
            cost: Math.round(data.cost * 100) / 100,
            conversions: data.conversions,
            ctr: data.impressions > 0 ? Math.round((data.clicks / data.impressions) * 100 * 100) / 100 : 0,
            cpc: data.clicks > 0 ? Math.round((data.cost / data.clicks) * 100) / 100 : 0
          });
        }

        // Sort by date
        chartData.sort((a, b) => a.date.localeCompare(b.date));
      }
    } else {
      const errorText = await dailyResponse.text();
      console.error('❌ Failed to fetch daily data:', {
        status: dailyResponse.status,
        statusText: dailyResponse.statusText,
        customerId,
        error: errorText,
        hasDevToken: !!process.env.GOOGLE_ADS_DEVELOPER_TOKEN
      });
    }

    console.log(`✅ Successfully fetched ${campaigns.length} campaigns and ${chartData.length} chart data points`);
    return { campaigns, chartData };

  } catch (error) {
    console.error('Error fetching real campaign data:', error);
    return { campaigns: [], chartData: [] };
  }
}