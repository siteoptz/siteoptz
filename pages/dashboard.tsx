import { useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import Head from 'next/head';

export default function Dashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'loading') return; // Still loading

    if (!session) {
      // Not authenticated, redirect to sign in
      router.replace('/auth/signin');
      return;
    }

    // Check user plan to determine which dashboard to redirect to
    const userPlan = (session.user as any)?.plan || 'free';
    
    if (['pro', 'premium', 'enterprise'].includes(userPlan)) {
      // Premium users go to premium dashboard
      router.replace('/premium-dashboard');
    } else {
      // Free/basic users go to optz dashboard
      router.replace('/optz/dashboard');
    }
  }, [session, status, router]);

  if (status === 'loading') {
    return (
      <>
        <Head>
          <title>Loading Dashboard - SiteOptz.ai</title>
        </Head>
        <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-400 mx-auto mb-4"></div>
            <p className="text-gray-400">Loading your dashboard...</p>
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