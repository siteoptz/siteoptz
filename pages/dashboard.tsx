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
        const userPlan = await response.json();
        
        if (['pro', 'premium', 'enterprise'].includes(userPlan.plan)) {
          // Premium users go to plan-specific dashboard
          router.replace(`/dashboard/${userPlan.plan}`);
        } else {
          // Free/basic users go to plan-specific dashboard
          router.replace(`/dashboard/${userPlan.plan}`);
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