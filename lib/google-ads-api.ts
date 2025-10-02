// lib/google-ads-api.ts
// Google Ads API integration for fetching accounts and data

export interface GoogleAdsAccount {
  id: string;
  name: string;
  descriptiveName: string;
  currencyCode: string;
  timeZone: string;
  testAccount: boolean;
  manager: boolean;
  canManageClients: boolean;
  customerId: string;
}

export interface GoogleAdsManagerAccount {
  id: string;
  name: string;
  accounts: GoogleAdsAccount[];
}

// Fetch all accessible Google Ads accounts using the access token
export const fetchGoogleAdsAccounts = async (accessToken: string): Promise<GoogleAdsAccount[]> => {
  try {
    console.log('🔍 Fetching Google Ads accounts...');
    
    // Use Google Ads API to get accessible customers
    const response = await fetch('https://googleads.googleapis.com/v14/customers:listAccessibleCustomers', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'developer-token': process.env.GOOGLE_ADS_DEVELOPER_TOKEN || '',
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Failed to fetch accessible customers:', response.status, errorText);
      throw new Error(`Failed to fetch customers: ${response.status}`);
    }

    const data = await response.json();
    console.log('📊 Accessible customers response:', data);

    if (!data.resourceNames || data.resourceNames.length === 0) {
      console.log('No accessible customers found');
      return [];
    }

    // Extract customer IDs from resource names
    const customerIds = data.resourceNames.map((resourceName: string) => {
      const match = resourceName.match(/customers\/(\d+)/);
      return match ? match[1] : null;
    }).filter(Boolean);

    console.log('👥 Found customer IDs:', customerIds);

    // Fetch detailed information for each customer
    const accounts: GoogleAdsAccount[] = [];
    
    for (const customerId of customerIds) {
      try {
        const accountInfo = await fetchCustomerInfo(accessToken, customerId);
        if (accountInfo) {
          accounts.push(accountInfo);
        }
      } catch (error) {
        console.error(`Error fetching info for customer ${customerId}:`, error);
      }
    }

    console.log(`✅ Successfully fetched ${accounts.length} Google Ads accounts`);
    return accounts;

  } catch (error) {
    console.error('Error fetching Google Ads accounts:', error);
    throw error;
  }
};

// Fetch detailed information for a specific customer
export const fetchCustomerInfo = async (accessToken: string, customerId: string): Promise<GoogleAdsAccount | null> => {
  try {
    const query = `
      SELECT 
        customer.id,
        customer.descriptive_name,
        customer.currency_code,
        customer.time_zone,
        customer.test_account,
        customer.manager,
        customer.can_manage_clients
      FROM customer
      LIMIT 1
    `;

    const response = await fetch(`https://googleads.googleapis.com/v14/customers/${customerId}/googleAds:search`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'developer-token': process.env.GOOGLE_ADS_DEVELOPER_TOKEN || '',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        query: query
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`Failed to fetch customer info for ${customerId}:`, response.status, errorText);
      return null;
    }

    const data = await response.json();
    
    if (!data.results || data.results.length === 0) {
      console.log(`No data found for customer ${customerId}`);
      return null;
    }

    const customer = data.results[0].customer;
    
    return {
      id: customer.id,
      name: customer.descriptiveName || `Account ${customer.id}`,
      descriptiveName: customer.descriptiveName || '',
      currencyCode: customer.currencyCode || 'USD',
      timeZone: customer.timeZone || 'UTC',
      testAccount: customer.testAccount || false,
      manager: customer.manager || false,
      canManageClients: customer.canManageClients || false,
      customerId: customer.id
    };

  } catch (error) {
    console.error(`Error fetching customer info for ${customerId}:`, error);
    return null;
  }
};

// Get accounts hierarchy (manager accounts with their sub-accounts)
export const fetchAccountsHierarchy = async (accessToken: string): Promise<GoogleAdsManagerAccount[]> => {
  try {
    const allAccounts = await fetchGoogleAdsAccounts(accessToken);
    
    // Separate manager accounts from regular accounts
    const managerAccounts = allAccounts.filter(account => account.manager);
    const regularAccounts = allAccounts.filter(account => !account.manager);
    
    console.log(`📊 Found ${managerAccounts.length} manager accounts and ${regularAccounts.length} regular accounts`);
    
    // For now, return a simplified structure
    // In a full implementation, you'd fetch the actual hierarchy using the customer_client_link table
    const hierarchy: GoogleAdsManagerAccount[] = [];
    
    if (managerAccounts.length > 0) {
      // Group regular accounts under the first manager account for simplicity
      hierarchy.push({
        id: managerAccounts[0].id,
        name: managerAccounts[0].name,
        accounts: regularAccounts
      });
      
      // Add other manager accounts as separate entities
      for (let i = 1; i < managerAccounts.length; i++) {
        hierarchy.push({
          id: managerAccounts[i].id,
          name: managerAccounts[i].name,
          accounts: []
        });
      }
    } else if (regularAccounts.length > 0) {
      // If no manager accounts, create a virtual group
      hierarchy.push({
        id: 'individual_accounts',
        name: 'Individual Accounts',
        accounts: regularAccounts
      });
    }
    
    return hierarchy;
    
  } catch (error) {
    console.error('Error fetching accounts hierarchy:', error);
    throw error;
  }
};

// Validate Google Ads access and get basic account info
export const validateGoogleAdsAccess = async (accessToken: string): Promise<{
  valid: boolean;
  accountCount: number;
  hasManagerAccess: boolean;
  error?: string;
}> => {
  try {
    const accounts = await fetchGoogleAdsAccounts(accessToken);
    const hasManagerAccess = accounts.some(account => account.manager || account.canManageClients);
    
    return {
      valid: true,
      accountCount: accounts.length,
      hasManagerAccess
    };
    
  } catch (error) {
    console.error('Error validating Google Ads access:', error);
    return {
      valid: false,
      accountCount: 0,
      hasManagerAccess: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    };
  }
};

// Store selected Google Ads account for a user
export const storeSelectedGoogleAdsAccount = async (
  userId: string,
  accountId: string,
  accountInfo: GoogleAdsAccount,
  accessToken: string,
  refreshToken?: string
) => {
  try {
    // In a real implementation, this would store in your database
    // For now, store in localStorage with the existing pattern
    
    const connectionData = {
      platform: 'google-ads',
      accountId: accountId,
      accountInfo: accountInfo,
      accessToken: accessToken,
      refreshToken: refreshToken,
      connectedAt: new Date().toISOString(),
      userId: userId,
      expiresAt: Date.now() + (3600 * 1000) // 1 hour default expiry
    };
    
    // Store the connection (only on client side)
    if (typeof window !== 'undefined') {
      const key = `google_ads_connection_${userId}`;
      localStorage.setItem(key, JSON.stringify(connectionData));
      console.log(`✅ Stored Google Ads account ${accountId} for user ${userId}`);
    } else {
      console.log(`⚠️ Server-side storage attempt - would store in database in production`);
    }
    
    return true;
    
  } catch (error) {
    console.error('Error storing Google Ads account:', error);
    return false;
  }
};

// Get stored Google Ads account for a user
export const getStoredGoogleAdsAccount = async (userId: string): Promise<{
  connected: boolean;
  accountInfo?: GoogleAdsAccount;
  accountId?: string;
  connectedAt?: string;
  accessToken?: string;
  refreshToken?: string;
} | null> => {
  try {
    // Only works on client side
    if (typeof window === 'undefined') {
      console.log('Server-side request - would check database in production');
      return { connected: false };
    }
    
    const key = `google_ads_connection_${userId}`;
    const stored = localStorage.getItem(key);
    
    if (!stored) {
      console.log(`No stored Google Ads connection found for user: ${userId}`);
      return { connected: false };
    }
    
    const data = JSON.parse(stored);
    
    // Check if connection has expired
    if (data.expiresAt && Date.now() > data.expiresAt) {
      console.log(`Google Ads connection expired for user: ${userId}`);
      // Remove expired connection
      localStorage.removeItem(key);
      return { connected: false };
    }
    
    console.log(`✅ Found valid Google Ads connection for user: ${userId}`);
    return {
      connected: true,
      accountInfo: data.accountInfo,
      accountId: data.accountId,
      connectedAt: data.connectedAt,
      accessToken: data.accessToken,
      refreshToken: data.refreshToken
    };
    
  } catch (error) {
    console.error('Error getting stored Google Ads account:', error);
    return { connected: false };
  }
};