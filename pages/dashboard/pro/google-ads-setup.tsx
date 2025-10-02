// pages/dashboard/pro/google-ads-setup.tsx
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import { DashboardHeader } from '@/components/dashboard/DashboardHeader';
import GoogleAdsAccountSelector from '@/components/marketing/GoogleAdsAccountSelector';
import { GoogleAdsAccount } from '@/lib/google-ads-api';
import { UserPlan } from '@/types/userPlan';

export default function GoogleAdsSetupPage() {
  const router = useRouter();
  const { data: session } = useSession();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [accounts, setAccounts] = useState<GoogleAdsAccount[]>([]);
  const [connecting, setConnecting] = useState(false);
  const [tokenData, setTokenData] = useState<{
    access_token: string;
    refresh_token?: string;
    expires_in: number;
    token_type: string;
  } | null>(null);

  useEffect(() => {
    // Extract tokens from URL parameters
    const { access_token, refresh_token, expires_in, token_type } = router.query;
    
    if (access_token) {
      setTokenData({
        access_token: access_token as string,
        refresh_token: refresh_token as string,
        expires_in: parseInt(expires_in as string) || 3600,
        token_type: token_type as string || 'Bearer'
      });
    } else {
      setError('No access token found. Please try connecting again.');
      setLoading(false);
    }
  }, [router.query]);

  useEffect(() => {
    if (tokenData) {
      fetchAccounts();
    }
  }, [tokenData]);

  const fetchAccounts = async () => {
    if (!tokenData) return;
    
    setLoading(true);
    setError(null);
    
    try {
      console.log('🔍 Fetching Google Ads accounts with access token...');
      
      // First validate access using API route
      const validationResponse = await fetch('/api/google-ads/validate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          accessToken: tokenData.access_token,
          refreshToken: tokenData.refresh_token
        })
      });
      
      if (!validationResponse.ok) {
        throw new Error('Failed to validate Google Ads access');
      }
      
      const validation = await validationResponse.json();
      
      if (!validation.valid) {
        throw new Error(validation.error || 'Invalid Google Ads access');
      }
      
      console.log(`✅ Access validated. Found ${validation.accountCount} accounts. Manager access: ${validation.hasManagerAccess}`);
      
      // Fetch all accounts using API route
      const accountsResponse = await fetch('/api/google-ads/accounts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          accessToken: tokenData.access_token,
          refreshToken: tokenData.refresh_token
        })
      });
      
      if (!accountsResponse.ok) {
        const errorData = await accountsResponse.json();
        throw new Error(errorData.error || 'Failed to fetch Google Ads accounts');
      }
      
      const accountsData = await accountsResponse.json();
      
      if (!accountsData.accounts || accountsData.accounts.length === 0) {
        throw new Error('No Google Ads accounts found. Please ensure you have access to Google Ads accounts.');
      }
      
      setAccounts(accountsData.accounts);
      console.log(`📊 Successfully loaded ${accountsData.accounts.length} Google Ads accounts`);
      
    } catch (err) {
      console.error('Error fetching Google Ads accounts:', err);
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch Google Ads accounts';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleAccountSelect = async (selectedAccount: GoogleAdsAccount) => {
    if (!session?.user?.email || !tokenData) {
      setError('Session not found. Please try logging in again.');
      return;
    }
    
    setConnecting(true);
    
    try {
      console.log('🔗 Connecting Google Ads account for user:', session.user.email);
      console.log('🔗 Selected account:', selectedAccount.customer_id, selectedAccount.descriptive_name);
      
      // Store the selected account using API route
      const storeResponse = await fetch('/api/google-ads/store-account', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: session.user.email,
          accountId: selectedAccount.customer_id,
          accountInfo: selectedAccount,
          accessToken: tokenData.access_token,
          refreshToken: tokenData.refresh_token
        })
      });
      
      if (!storeResponse.ok) {
        const errorData = await storeResponse.json();
        throw new Error(errorData.error || 'Failed to store account connection');
      }
      
      const storeData = await storeResponse.json();
      
      // Store connection data in localStorage on client side
      if (typeof window !== 'undefined' && storeData.connectionData) {
        const key = `google_ads_connection_${session.user.email}`;
        localStorage.setItem(key, JSON.stringify(storeData.connectionData));
        console.log(`✅ Stored Google Ads account ${selectedAccount.customer_id} for user ${session.user.email}`);
      }
      
      console.log('✅ Successfully connected Google Ads account');
      
      // Redirect back to dashboard with success
      router.push('/dashboard/pro?success=true&platform=google-ads&connected=true&account=' + selectedAccount.customer_id);
      
    } catch (err) {
      console.error('Error connecting Google Ads account:', err);
      const errorMessage = err instanceof Error ? err.message : 'Failed to connect account';
      setError(errorMessage);
    } finally {
      setConnecting(false);
    }
  };

  const handleRetry = () => {
    if (tokenData) {
      fetchAccounts();
    } else {
      // Redirect back to dashboard to start OAuth flow again
      router.push('/dashboard/pro');
    }
  };

  const handleCancel = () => {
    router.push('/dashboard/pro');
  };

  // Mock userPlan for DashboardHeader (since this is a Pro-only page)
  const mockUserPlan: UserPlan = {
    id: 'pro-user',
    plan: 'pro' as const,
    status: 'active' as const,
    billingCycle: 'monthly' as const,
    startDate: new Date(),
    features: [],
    limitations: [],
    usage: {
      comparisons: 0,
      consultations: 0,
      teamMembers: 0
    },
    limits: {
      dailyComparisons: 1000,
      monthlyConsultations: 10,
      maxTeamMembers: 5
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black">
      <DashboardHeader userPlan={mockUserPlan} />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-6xl mx-auto">
            {/* Header */}
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-white mb-2">
                Connect Google Ads Account
              </h1>
              <p className="text-gray-300">
                Select the Google Ads account you want to connect to your Marketing ROI dashboard.
              </p>
            </div>

            {/* Loading State */}
            {loading && (
              <div className="bg-black border border-gray-800 rounded-lg p-8">
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-cyan-400 mr-4"></div>
                  <span className="text-gray-300">Loading your Google Ads accounts...</span>
                </div>
                <p className="text-gray-400 text-center mt-4">
                  This may take a few moments while we fetch your account information.
                </p>
              </div>
            )}

            {/* Error State */}
            {error && (
              <div className="bg-black border border-gray-800 rounded-lg p-8">
                <div className="text-center">
                  <div className="flex justify-center mb-4">
                    <svg className="w-12 h-12 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h2 className="text-xl font-bold text-white mb-2">Connection Error</h2>
                  <p className="text-gray-300 mb-6">{error}</p>
                  <div className="space-x-4">
                    <button
                      onClick={handleRetry}
                      className="px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-colors"
                    >
                      Try Again
                    </button>
                    <button
                      onClick={handleCancel}
                      className="px-6 py-2 border border-gray-600 text-gray-300 rounded-lg hover:bg-gray-800 transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Success State - Account Selection */}
            {!loading && !error && accounts.length > 0 && (
              <div className="bg-black border border-gray-800 rounded-lg p-8">
                <div className="mb-6">
                  <h2 className="text-xl font-bold text-white mb-2">
                    Select Your Google Ads Account
                  </h2>
                  <p className="text-gray-300">
                    We found {accounts.length} Google Ads account{accounts.length !== 1 ? 's' : ''} associated with your Google account.
                    Please select the one you want to connect.
                  </p>
                </div>

                {/* Account Selection Component */}
                <GoogleAdsAccountSelector
                  isOpen={true}
                  onClose={() => {}} // Don't allow closing this modal
                  onAccountSelect={handleAccountSelect}
                  accounts={accounts}
                  loading={connecting}
                />

                {connecting && (
                  <div className="mt-6 text-center">
                    <div className="inline-flex items-center">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-cyan-400 mr-2"></div>
                      <span className="text-gray-300">Connecting your account...</span>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Instructions */}
            {!loading && !error && (
              <div className="mt-8 bg-gray-900 border border-gray-800 rounded-lg p-6">
                <h3 className="text-lg font-bold text-white mb-3">What happens next?</h3>
                <div className="space-y-2 text-gray-300">
                  <p>• Your selected Google Ads account will be connected to SiteOptz</p>
                  <p>• We&apos;ll be able to fetch your campaign performance data</p>
                  <p>• You can view comprehensive ROI analytics in your dashboard</p>
                  <p>• Your data is stored securely and never shared with third parties</p>
                </div>
              </div>
            )}
          </div>
      </main>
    </div>
  );
}