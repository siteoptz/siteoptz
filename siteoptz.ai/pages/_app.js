import { useEffect } from 'react';
import { SessionProvider } from 'next-auth/react';
import AuthModal from '../components/AuthModal';
import Navigation from '../components/Navigation';
import { getAuth } from '../utils/auth';
import '../styles/globals.css';

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  useEffect(() => {
    // CRITICAL: Prevent any redirect to optz.siteoptz.ai
    // Use a safer approach that doesn't override browser methods
    
    // Function to check and fix URLs
    const checkAndFixRedirects = () => {
      // Monitor for any programmatic redirects in the application
      if (typeof window !== 'undefined') {
        // Log current URL for debugging
        console.log('Current URL:', window.location.href);
        
        // Check if current URL contains optz.siteoptz.ai and redirect if needed
        if (window.location.href.includes('optz.siteoptz.ai')) {
          console.error('BLOCKED: Currently on optz.siteoptz.ai, redirecting to siteoptz.ai');
          const newUrl = window.location.href
            .replace('https://optz.siteoptz.ai', 'https://siteoptz.ai')
            .replace('http://optz.siteoptz.ai', 'https://siteoptz.ai');
          
          // Use a clean redirect approach
          window.location.href = newUrl;
          return;
        }
      }
    };
    
    // Run the check immediately
    checkAndFixRedirects();
    
    // Set up interval to periodically check (as a safety net)
    const intervalId = setInterval(checkAndFixRedirects, 1000);
    
    // Initialize authentication system
    const auth = getAuth();
    
    // Optional: Check if user is authenticated on app load
    if (auth && auth.isAuthenticated()) {
      console.log('User is authenticated:', auth.getCurrentUser());
    }
    
    // Cleanup interval on unmount
    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return (
    <SessionProvider session={session}>
      <Navigation />
      <Component {...pageProps} />
      <AuthModal />
    </SessionProvider>
  );
}

export default MyApp;