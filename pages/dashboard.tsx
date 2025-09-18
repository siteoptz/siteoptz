import React from 'react';
import { GetServerSideProps } from 'next';
import { getServerSession } from 'next-auth/next';
import { authOptions } from './api/auth/[...nextauth]';
import { useUserPlan } from '../hooks/useUserPlan';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import { DashboardHeader } from '../components/dashboard/DashboardHeader';
import { FreePlanDashboard } from '../components/dashboard/FreePlanDashboard';
import { CheckCircle } from 'lucide-react';
import Link from 'next/link';

export default function Dashboard() {
  const { userPlan, loading } = useUserPlan();
  const { data: session } = useSession();
  const router = useRouter();
  const { upgraded, registration } = router.query;

  // Check for OAuth registration attempts by existing users
  React.useEffect(() => {
    const checkOAuthRegistration = async () => {
      if (registration === 'true' && session?.user?.email) {
        console.log('🔍 Dashboard detected OAuth registration attempt for:', session.user.email);
        
        try {
          // Check if user already exists in GoHighLevel
          const lookupResponse = await fetch('/api/user/ghl-lookup', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              email: session.user.email
            }),
          });

          const lookupResult = await lookupResponse.json();
          console.log('📥 Dashboard lookup result:', lookupResult);
          
          if (lookupResult.exists) {
            // User already exists - this is a registration attempt by existing user
            console.log('❌ Existing user attempted OAuth registration - redirecting to error page');
            window.location.href = '/auth/error?error=UserExists&message=User already exists. Please sign in instead.';
            return;
          } else {
            console.log('✅ New user confirmed via dashboard validation');
            
            // Get business info from sessionStorage and process registration
            const storedData = sessionStorage.getItem('pendingOAuthRegistration');
            if (storedData) {
              const registrationData = JSON.parse(storedData);
              console.log('📋 Found stored registration data:', registrationData);
              
              // Clean up sessionStorage
              sessionStorage.removeItem('pendingOAuthRegistration');
              
              // Process the registration
              try {
                const registrationResponse = await fetch('/api/register-free-plan', {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify({
                    email: session.user.email,
                    name: session.user.name || '',
                    source: 'Free Plan Registration - Google OAuth',
                    planName: registrationData.planName || 'Free Plan',
                    userAgent: navigator.userAgent,
                    referrer: document.referrer,
                    registrationMethod: 'google',
                    aiToolsInterest: registrationData.aiToolsInterest,
                    businessSize: registrationData.businessSize
                  }),
                });

                const registrationResult = await registrationResponse.json();
                
                if (registrationResult.success) {
                  console.log('✅ OAuth user registered in GoHighLevel from dashboard:', registrationResult.data);
                } else {
                  console.warn('GoHighLevel OAuth registration failed from dashboard:', registrationResult.error);
                }
              } catch (regError) {
                console.error('Registration processing error:', regError);
              }
            }
          }
        } catch (error) {
          console.error('OAuth registration validation error:', error);
        }
        
        // Remove registration parameter from URL
        const newQuery = { ...router.query };
        delete newQuery.registration;
        router.replace({ pathname: router.pathname, query: newQuery }, undefined, { shallow: true });
      }
    };

    if (session) {
      checkOAuthRegistration();
    }
  }, [session, registration, router]);

  // Redirect to plan-specific dashboard
  React.useEffect(() => {
    if (!loading && userPlan) {
      router.push(`/dashboard/${userPlan.plan}`);
    }
  }, [loading, userPlan, router]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black flex items-center justify-center">
        <div className="text-white text-center">
          <div className="w-8 h-8 border-2 border-white/20 border-t-white rounded-full animate-spin mx-auto mb-4"></div>
          <p>Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  if (!userPlan) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black flex items-center justify-center">
        <div className="text-center text-white">
          <h1 className="text-2xl font-bold mb-4">Please log in</h1>
          <p className="text-gray-300">You need to be logged in to access the dashboard.</p>
          <Link href="/#login" className="inline-block mt-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-lg">
            Log In
          </Link>
        </div>
      </div>
    );
  }


  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black">
      <DashboardHeader userPlan={userPlan} />

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">
            Welcome to your {userPlan.plan} dashboard!
          </h1>
          <p className="text-gray-300">
            Here&apos;s your AI tools overview and available features.
          </p>
        </div>

        {/* Upgrade Success Message */}
        {upgraded === 'true' && (
          <div className="mb-8 bg-green-500/10 border border-green-500/20 rounded-xl p-4">
            <div className="flex items-center">
              <CheckCircle className="w-6 h-6 text-green-400 mr-3" />
              <div>
                <h3 className="text-green-400 font-semibold">Upgrade Successful!</h3>
                <p className="text-green-300">Welcome to your new plan. Explore all the new features available to you.</p>
              </div>
            </div>
          </div>
        )}

        {/* Plan-specific Dashboard Content */}
        {userPlan.plan === 'free' && <FreePlanDashboard userPlan={userPlan} />}
        
        {/* TODO: Add StarterPlanDashboard, ProPlanDashboard, EnterprisePlanDashboard */}
        {userPlan.plan !== 'free' && (
          <div className="bg-black border border-gray-800 rounded-xl p-8 text-center">
            <h2 className="text-2xl font-bold text-white mb-4">
              {userPlan.plan.charAt(0).toUpperCase() + userPlan.plan.slice(1)} Dashboard
            </h2>
            <p className="text-gray-300">
              Your {userPlan.plan} dashboard is coming soon with advanced features and analytics.
            </p>
          </div>
        )}
      </main>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getServerSession(context.req, context.res, authOptions);

  if (!session) {
    return {
      redirect: {
        destination: '/#login',
        permanent: false,
      },
    };
  }

  return {
    props: {
      session,
    },
  };
};