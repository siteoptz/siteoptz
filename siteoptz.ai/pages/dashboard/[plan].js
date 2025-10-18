import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { getCurrentUser } from '../../utils/auth';

export default function PlanDashboard() {
  const router = useRouter();
  const { plan } = router.query;

  useEffect(() => {
    if (!plan) return;

    // Check if user is authenticated
    const user = getCurrentUser();
    
    if (!user || !user.authenticated) {
      // Not authenticated, redirect to login
      console.log('User not authenticated, redirecting to login');
      window.location.href = '/#login';
      return;
    }

    // For now, show the dashboard content
    // In the future, this would load the actual dashboard for the plan
    console.log('Dashboard loaded for plan:', plan);
  }, [plan]);

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Dashboard - {plan?.charAt(0).toUpperCase() + plan?.slice(1)} Plan</h1>
      <p>Welcome to your {plan} dashboard!</p>
      
      <div style={{ marginTop: '2rem', padding: '1rem', background: '#f5f5f5', borderRadius: '8px' }}>
        <h2>Quick Actions</h2>
        <ul>
          <li>View AI Tools</li>
          <li>Manage Settings</li>
          <li>Check Usage</li>
          <li>Get Support</li>
        </ul>
      </div>

      <div style={{ marginTop: '1rem' }}>
        <a href="/" style={{ color: '#4CAF50' }}>← Back to Homepage</a>
      </div>
    </div>
  );
}