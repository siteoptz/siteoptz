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
        <h3>AI-Powered Business Tools</h3>
        <p>Get started with our comprehensive suite of AI tools designed for your business growth.</p>
        <p>Book a consultation to learn how we can help transform your operations.</p>
      </div>
    </div>
  );
}