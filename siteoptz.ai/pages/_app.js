import { useEffect } from 'react';
import { SessionProvider } from 'next-auth/react';
import AuthModal from '../components/AuthModal';
import Navigation from '../components/Navigation';
import { getAuth } from '../utils/auth';
import '../styles/globals.css';

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  useEffect(() => {
    // CRITICAL: Prevent any redirect to optz.siteoptz.ai
    const originalLocation = window.location.replace.bind(window.location);
    const originalHref = Object.getOwnPropertyDescriptor(window.location, 'href');
    
    // Override location.href setter to block optz.siteoptz.ai redirects
    Object.defineProperty(window.location, 'href', {
      set: function(url) {
        if (url && url.includes('optz.siteoptz.ai')) {
          console.error('BLOCKED redirect to optz.siteoptz.ai:', url);
          // Redirect to siteoptz.ai instead
          const newUrl = url.replace('https://optz.siteoptz.ai', 'https://siteoptz.ai')
                           .replace('http://optz.siteoptz.ai', 'https://siteoptz.ai');
          console.log('Redirecting to:', newUrl);
          originalHref.set.call(window.location, newUrl);
        } else {
          originalHref.set.call(window.location, url);
        }
      },
      get: originalHref.get
    });
    
    // Override location.replace to block optz.siteoptz.ai redirects
    window.location.replace = function(url) {
      if (url && url.includes('optz.siteoptz.ai')) {
        console.error('BLOCKED replace to optz.siteoptz.ai:', url);
        const newUrl = url.replace('https://optz.siteoptz.ai', 'https://siteoptz.ai')
                         .replace('http://optz.siteoptz.ai', 'https://siteoptz.ai');
        console.log('Replacing with:', newUrl);
        originalLocation(newUrl);
      } else {
        originalLocation(url);
      }
    };
    
    // Initialize authentication system
    const auth = getAuth();
    
    // Optional: Check if user is authenticated on app load
    if (auth && auth.isAuthenticated()) {
      console.log('User is authenticated:', auth.getCurrentUser());
    }
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