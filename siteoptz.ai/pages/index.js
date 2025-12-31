import { useEffect } from 'react';
import { getCurrentUser } from '../utils/auth';

export default function Home() {
  useEffect(() => {
    // Check if user is already authenticated
    const user = getCurrentUser();
    if (user && user.authenticated) {
      // User is logged in, redirect to their dashboard
      const plan = user.plan || 'free';
      window.location.href = `/dashboard/${plan}`;
    }
  }, []);

  return (
    <div style={{ padding: '2rem', textAlign: 'center' }}>
      <h1>Welcome to SiteOptz.ai</h1>
      <p>AI-Powered Tools for Your Business</p>
      
      <div style={{ marginTop: '2rem' }}>
        <a 
          href="https://api.leadconnectorhq.com/widget/booking/yPjkVmsauPst8XlrOQUl" 
          target="_blank" 
          rel="noopener noreferrer"
          style={{ 
            padding: '0.75rem 2rem', 
            background: '#4CAF50', 
            color: 'white', 
            textDecoration: 'none',
            borderRadius: '6px',
            display: 'inline-block'
          }}
        >
          Get Started
        </a>
      </div>
      
      <div style={{ marginTop: '3rem', padding: '1rem', background: '#f5f5f5', borderRadius: '8px' }}>
        <h3>Simple Email/Password Authentication</h3>
        <p>No OAuth, No Google Sign-in - Just enter your email and password to access your dashboard.</p>
        <p>Your plan is determined by your GoHighLevel tags.</p>
      </div>
    </div>
  );
}