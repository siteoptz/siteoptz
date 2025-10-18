import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { getCurrentUser } from '../utils/auth';

export default function Dashboard() {
  const router = useRouter();

  useEffect(() => {
    // Check if user is authenticated
    const user = getCurrentUser();
    
    if (!user || !user.authenticated) {
      // Not authenticated, redirect to login
      console.log('User not authenticated, redirecting to login');
      window.location.href = '/#login';
      return;
    }

    // User is authenticated, redirect to their plan-specific dashboard
    const plan = user.plan || 'free';
    const dashboardUrl = `https://siteoptz.ai/dashboard/${plan}`;
    
    console.log('Authenticated user detected:', {
      email: user.email,
      plan: plan,
      redirectUrl: dashboardUrl
    });
    
    // Redirect to plan-specific dashboard
    window.location.href = dashboardUrl;
  }, [router]);

  return (
    <div style={{ padding: '2rem', textAlign: 'center' }}>
      <h1>Redirecting to your dashboard...</h1>
      <p>Please wait while we direct you to the appropriate dashboard.</p>
    </div>
  );
}