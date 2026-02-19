import { useEffect } from 'react';
import { signIn, getSession } from 'next-auth/react';
import { useRouter } from 'next/router';

export default function SignUpPage() {
  const router = useRouter();
  
  useEffect(() => {
    const handleOAuth = async () => {
      // Check if user is already signed in
      const session = await getSession();
      
      if (session) {
        // Already signed in, redirect to dashboard
        router.push('/dashboard');
        return;
      }
      
      // Get source from URL parameters
      const { source } = router.query;
      
      if (source === 'ghl') {
        // User came from GHL form - their data is already in GHL
        // Just need to complete OAuth flow
        console.log('🔄 Starting OAuth for GHL form user');
        
        // Start Google OAuth with callback to dashboard/free
        signIn('google', { 
          callbackUrl: '/dashboard/free?signup=true&source=ghl' 
        });
      } else {
        // Redirect to homepage if no source
        router.push('/');
      }
    };
    
    // Only run after router is ready
    if (router.isReady) {
      handleOAuth();
    }
  }, [router]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black flex items-center justify-center">
      <div className="bg-black border border-gray-800 rounded-xl p-8 max-w-md w-full mx-4">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white mb-4">
            Complete Your Sign-Up
          </h1>
          <p className="text-gray-300 mb-6">
            Thank you for filling out our discovery form. We&apos;re now setting up your account...
          </p>
          
          <div className="flex items-center justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
            <span className="ml-3 text-gray-400">Redirecting to Google sign-in...</span>
          </div>
        </div>
      </div>
    </div>
  );
}