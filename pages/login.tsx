import { useEffect } from 'react';
import { useRouter } from 'next/router';

export default function Login() {
  const router = useRouter();
  
  useEffect(() => {
    // Immediately redirect to the booking URL
    window.location.href = 'https://api.leadconnectorhq.com/widget/booking/yPjkVmsauPst8XlrOQUl';
  }, []);

  return (
    <div style={{ 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center', 
      height: '100vh',
      fontFamily: 'Arial, sans-serif',
      flexDirection: 'column'
    }}>
      <div style={{ textAlign: 'center' }}>
        <h2>Redirecting you to our booking system...</h2>
        <p>If you're not redirected automatically, <a href="https://api.leadconnectorhq.com/widget/booking/yPjkVmsauPst8XlrOQUl">click here</a></p>
        <div style={{ fontSize: '24px', animation: 'spin 1s linear infinite' }}>⏳</div>
      </div>
    </div>
  );
}