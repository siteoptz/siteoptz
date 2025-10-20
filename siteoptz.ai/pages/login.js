import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export default function Login() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  
  useEffect(() => {
    // Check for error in query params
    if (router.query.error) {
      setError(router.query.error);
    }
    
    // Redirect if already logged in
    if (session) {
      router.push('/dashboard');
    }
  }, [session, router]);

  const handleGoogleLogin = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const result = await signIn('google', { 
        callbackUrl: '/dashboard',
        redirect: true 
      });
      
      if (result?.error) {
        setError('Failed to sign in with Google. Please try again.');
        setLoading(false);
      }
    } catch (err) {
      console.error('Google sign-in error:', err);
      setError('An unexpected error occurred. Please try again.');
      setLoading(false);
    }
  };

  if (status === 'loading') {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        minHeight: '100vh',
        background: '#f5f5f5'
      }}>
        <div>Loading...</div>
      </div>
    );
  }

  return (
    <div style={{ 
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '1rem'
    }}>
      <div style={{ 
        background: 'white',
        borderRadius: '12px',
        boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
        padding: '3rem',
        maxWidth: '400px',
        width: '100%'
      }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <h1 style={{ 
            fontSize: '2rem', 
            fontWeight: 'bold',
            marginBottom: '0.5rem',
            color: '#333'
          }}>
            Welcome to SiteOptz.ai
          </h1>
          <p style={{ color: '#666' }}>
            Sign in to access your dashboard
          </p>
        </div>

        {error && (
          <div style={{ 
            padding: '1rem', 
            background: '#fee', 
            color: '#c00', 
            borderRadius: '8px',
            marginBottom: '1.5rem',
            fontSize: '0.9rem',
            textAlign: 'center'
          }}>
            {error === 'OAuthCallback' 
              ? 'OAuth authentication failed. Please check your Google account permissions and try again.'
              : error === 'Configuration'
              ? 'OAuth is not properly configured. Please contact support.'
              : error}
          </div>
        )}

        <button
          onClick={handleGoogleLogin}
          disabled={loading}
          style={{
            width: '100%',
            padding: '1rem',
            background: loading ? '#ccc' : '#4285f4',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            fontSize: '1rem',
            fontWeight: '500',
            cursor: loading ? 'not-allowed' : 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.75rem',
            transition: 'background 0.2s',
            marginBottom: '1rem'
          }}
          onMouseOver={(e) => !loading && (e.target.style.background = '#3367d6')}
          onMouseOut={(e) => !loading && (e.target.style.background = '#4285f4')}
        >
          <svg width="18" height="18" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48">
            <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
            <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
            <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
            <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
          </svg>
          {loading ? 'Signing in...' : 'Continue with Google'}
        </button>

        <div style={{ 
          textAlign: 'center',
          color: '#999',
          fontSize: '0.9rem',
          marginTop: '1.5rem',
          paddingTop: '1.5rem',
          borderTop: '1px solid #eee'
        }}>
          <p>Alternative login options:</p>
          <a 
            href="/auth-login" 
            style={{ 
              color: '#667eea',
              textDecoration: 'none',
              fontWeight: '500'
            }}
          >
            Sign in with email/password
          </a>
        </div>

        <div style={{
          marginTop: '2rem',
          padding: '1rem',
          background: '#f8f9fa',
          borderRadius: '8px',
          fontSize: '0.85rem',
          color: '#666',
          textAlign: 'center'
        }}>
          By signing in, you agree to our Terms of Service and Privacy Policy
        </div>
      </div>
    </div>
  );
}