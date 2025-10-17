import { useEffect } from 'react';
import AuthModal from '../components/AuthModal';
import Navigation from '../components/Navigation';
import { getAuth } from '../utils/auth';
import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    // Initialize authentication system
    const auth = getAuth();
    
    // Optional: Check if user is authenticated on app load
    if (auth && auth.isAuthenticated()) {
      console.log('User is authenticated:', auth.getCurrentUser());
    }
  }, []);

  return (
    <>
      <Navigation />
      <Component {...pageProps} />
      <AuthModal />
    </>
  );
}

export default MyApp;