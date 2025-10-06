import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import Head from 'next/head';

export default function Dashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [planLoading, setPlanLoading] = useState(true);

  useEffect(() => {
    if (status === 'loading') return; // Still loading

    if (!session) {
      // Not authenticated, redirect to sign in
      router.replace('/auth/signin');
      return;
    }

    // Fetch user plan from API to determine which dashboard to redirect to
    const fetchUserPlan = async () => {
      try {
        const response = await fetch('/api/user/plan');
        
        // Check if the API response is successful
        if (!response.ok) {
          throw new Error(`API error: ${response.status} ${response.statusText}`);
        }
        
        const userPlan = await response.json();
        
        // Validate that userPlan has the expected structure
        if (!userPlan || typeof userPlan.plan !== 'string') {
          throw new Error('Invalid user plan data received from API');
        }
        
        console.log('Dashboard routing - User plan:', userPlan.plan, 'for', session?.user?.email);
        
        // Map any 'premium' plan to 'pro' dashboard since premium dashboard doesn't exist
        const normalizedPlan = userPlan.plan === 'premium' ? 'pro' : userPlan.plan;
        
        // Validate the plan is one we support
        const validPlans = ['free', 'starter', 'pro', 'enterprise'];
        if (validPlans.includes(normalizedPlan)) {
          router.replace(`/dashboard/${normalizedPlan}`);
        } else {
          console.warn('Unknown plan:', userPlan.plan, '- redirecting to free');
          router.replace('/dashboard/free');
        }
      } catch (error) {
        console.error('Error fetching user plan:', error);
        // Fallback to free dashboard
        router.replace('/dashboard/free');
      } finally {
        setPlanLoading(false);
      }
    };

    fetchUserPlan();
  }, [session, status, router]);

  if (status === 'loading' || planLoading) {
    return (
      <>
        <Head>
          <title>Loading Dashboard - SiteOptz.ai</title>
        </Head>
        <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-400 mx-auto mb-4"></div>
            <p className="text-gray-400">
              {status === 'loading' ? 'Loading your session...' : 'Determining your plan...'}
            </p>
          </div>
        </div>
      </>
    );
  }

  // This component will redirect, so we don't render anything meaningful
  return (
    <>
      <Head>
        <title>Redirecting - SiteOptz.ai</title>
      </Head>
      <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-400 mx-auto mb-4"></div>
          <p className="text-gray-400">Redirecting to your dashboard...</p>
        </div>
      </div>
    </>
  );
}