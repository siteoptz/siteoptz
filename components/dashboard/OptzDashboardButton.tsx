import React, { useState } from 'react';
import { useSession } from 'next-auth/react';
import { ExternalLink, BarChart3, Loader2 } from 'lucide-react';

interface OptzDashboardButtonProps {
  userPlan: 'free' | 'starter' | 'pro' | 'enterprise';
  className?: string;
}

export const OptzDashboardButton: React.FC<OptzDashboardButtonProps> = ({ 
  userPlan, 
  className = '' 
}) => {
  const { data: session } = useSession();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleDashboardAccess = async (e?: React.MouseEvent) => {
    // Prevent any default form submission behavior
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    
    console.log('Dashboard access initiated for:', userPlan);
    
    if (!session?.user?.email) {
      setError('Please log in to access your dashboard');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      // First, ensure the user has a white-label client account
      console.log('Provisioning client for:', session.user.email);
      const provisionResponse = await fetch('/api/optz/provision-client', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include', // Include cookies for session
        body: JSON.stringify({
          email: session.user.email,
          plan: userPlan,
          companyName: session.user.name || extractCompanyFromEmail(session.user.email)
        })
      });

      if (!provisionResponse.ok) {
        console.error('Provision failed with status:', provisionResponse.status);
        throw new Error(`Provision failed: ${provisionResponse.statusText}`);
      }

      const provisionResult = await provisionResponse.json();
      console.log('Provision result:', provisionResult);
      
      if (!provisionResult.success) {
        throw new Error(provisionResult.error || 'Failed to provision dashboard access');
      }

      // Generate secure login token for SSO
      console.log('Generating SSO token for plan:', userPlan);
      const ssoResponse = await fetch('/api/optz/generate-sso-token', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include', // Include cookies for session
        body: JSON.stringify({
          email: session.user.email,
          plan: userPlan
        })
      });

      if (!ssoResponse.ok) {
        console.error('SSO generation failed with status:', ssoResponse.status);
        const errorData = await ssoResponse.json();
        throw new Error(errorData.error || `SSO failed: ${ssoResponse.statusText}`);
      }

      const ssoResult = await ssoResponse.json();
      console.log('SSO result:', ssoResult);
      
      if (ssoResult.success && ssoResult.loginUrl) {
        // Direct redirect to the generated login URL (now pointing to main domain)
        console.log('Redirecting to:', ssoResult.loginUrl);
        window.open(ssoResult.loginUrl, '_blank');
      } else {
        // If SSO fails, redirect to main dashboard as fallback
        console.log('SSO failed, using fallback');
        const fallbackUrl = `/dashboard/${userPlan}?utm_source=optz_access&utm_medium=dashboard_button&fallback=true`;
        window.open(fallbackUrl, '_blank');
      }

    } catch (error) {
      console.error('Dashboard access error:', error);
      setError(error instanceof Error ? error.message : 'Failed to access dashboard');
      
      // Provide fallback option even when there's an error
      setTimeout(() => {
        setError('Opening alternative dashboard in a moment...');
        setTimeout(() => {
          const fallbackUrl = `/dashboard/${userPlan}?utm_source=optz_error&utm_medium=dashboard_button&error=true`;
          console.log('Opening fallback dashboard:', fallbackUrl);
          window.open(fallbackUrl, '_blank');
        }, 1000);
      }, 2000); // Show error for 2 seconds, then notify and redirect
    } finally {
      setIsLoading(false);
    }
  };

  const extractCompanyFromEmail = (email: string): string => {
    const domain = email.split('@')[1];
    const company = domain.split('.')[0];
    return company.charAt(0).toUpperCase() + company.slice(1);
  };

  const getPlanDisplayName = () => {
    const planNames = {
      free: 'Basic Analytics',
      starter: 'Marketing Dashboard',
      pro: 'Advanced Analytics',
      enterprise: 'Executive Dashboard'
    };
    return planNames[userPlan] || 'Dashboard';
  };

  const getPlanDescription = () => {
    const descriptions = {
      free: 'Access your basic analytics dashboard with essential metrics and insights.',
      starter: 'Explore marketing ROI tracking, campaign performance, and attribution analytics.',
      pro: 'Dive into advanced analytics with predictive models and cohort analysis.',
      enterprise: 'Access your executive command center with comprehensive business intelligence.'
    };
    return descriptions[userPlan] || 'Access your personalized dashboard';
  };

  return (
    <div className={`bg-gradient-to-br from-gray-900 to-black border border-gray-800 rounded-xl p-6 ${className}`}>
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg">
            <BarChart3 className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white">{getPlanDisplayName()}</h3>
            <p className="text-sm text-gray-400">White-label Analytics Suite</p>
          </div>
        </div>
        <div className="px-3 py-1 bg-cyan-500/20 text-cyan-400 rounded-full text-xs font-medium">
          {userPlan.toUpperCase()}
        </div>
      </div>

      <p className="text-gray-300 text-sm mb-6">
        {getPlanDescription()}
      </p>

      {error && (
        <div className="mb-4 p-3 bg-red-500/10 border border-red-500/20 rounded-lg">
          <p className="text-red-400 text-sm">{error}</p>
          {error.includes('Failed to access dashboard') && (
            <button
              onClick={() => {
                const fallbackUrl = `/dashboard/${userPlan}?utm_source=optz_manual&utm_medium=dashboard_button&manual=true`;
                window.open(fallbackUrl, '_blank');
              }}
              className="mt-2 text-xs text-cyan-400 hover:text-cyan-300 underline"
            >
              Click here to access alternative dashboard
            </button>
          )}
        </div>
      )}

      <button
        onClick={(e) => handleDashboardAccess(e)}
        disabled={isLoading}
        type="button"
        className="w-full bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 
                   disabled:from-gray-600 disabled:to-gray-700 disabled:cursor-not-allowed
                   text-white font-medium py-3 px-4 rounded-lg transition-all duration-200 
                   flex items-center justify-center space-x-2"
      >
        {isLoading ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            <span>Accessing Dashboard...</span>
          </>
        ) : (
          <>
            <span>Access {getPlanDisplayName()}</span>
            <ExternalLink className="w-4 h-4" />
          </>
        )}
      </button>

      <div className="mt-4 pt-4 border-t border-gray-800">
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-400">Dashboard Features:</span>
          <span className="text-cyan-400">
            {userPlan === 'free' && '5 widgets'}
            {userPlan === 'starter' && '15 widgets'}
            {userPlan === 'pro' && '50 widgets'}
            {userPlan === 'enterprise' && 'Unlimited'}
          </span>
        </div>
        <div className="flex items-center justify-between text-sm mt-2">
          <span className="text-gray-400">Refresh Rate:</span>
          <span className="text-cyan-400">
            {userPlan === 'free' && '1 hour'}
            {userPlan === 'starter' && '30 min'}
            {userPlan === 'pro' && '15 min'}
            {userPlan === 'enterprise' && '5 min'}
          </span>
        </div>
      </div>
    </div>
  );
};