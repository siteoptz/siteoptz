import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { GetServerSideProps } from 'next';
import { Loader2, CheckCircle, XCircle } from 'lucide-react';

interface SSOAuthProps {
  token: string | null;
  error: string | null;
}

export default function SSOAuth({ token, error }: SSOAuthProps) {
  const router = useRouter();
  const [status, setStatus] = useState<'validating' | 'success' | 'error'>('validating');
  const [message, setMessage] = useState('Validating your access...');

  useEffect(() => {
    if (error) {
      setStatus('error');
      setMessage(error);
      return;
    }

    if (!token) {
      setStatus('error');
      setMessage('No authentication token provided');
      return;
    }

    validateTokenAndLogin();
  }, [token, error]);

  const validateTokenAndLogin = async () => {
    try {
      const response = await fetch('/api/optz/validate-sso', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token })
      });

      const result = await response.json();

      if (result.success) {
        setStatus('success');
        setMessage('Access granted! Redirecting to your dashboard...');
        
        // Store session data using the session management utility
        const { setOptzSession } = await import('../../lib/optz-session');
        setOptzSession(result.client);

        // Redirect to dashboard after brief delay
        setTimeout(() => {
          router.push('/dashboard');
        }, 2000);
      } else {
        setStatus('error');
        setMessage(result.error || 'Authentication failed');
      }
    } catch (error) {
      console.error('SSO validation error:', error);
      setStatus('error');
      setMessage('Connection error. Please try again.');
    }
  };

  const handleManualLogin = () => {
    router.push('/optz');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <div className="bg-black border border-gray-800 rounded-xl p-8 text-center">
          {/* Logo/Header */}
          <div className="mb-8">
            <div className="w-16 h-16 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-white font-bold text-xl">SiteOptz</span>
            </div>
            <h1 className="text-2xl font-bold text-white">Dashboard Access</h1>
            <p className="text-gray-400 mt-2">Secure single sign-on authentication</p>
          </div>

          {/* Status Display */}
          <div className="mb-8">
            {status === 'validating' && (
              <div className="flex flex-col items-center space-y-4">
                <Loader2 className="w-12 h-12 text-cyan-400 animate-spin" />
                <p className="text-gray-300">{message}</p>
              </div>
            )}

            {status === 'success' && (
              <div className="flex flex-col items-center space-y-4">
                <CheckCircle className="w-12 h-12 text-green-400" />
                <p className="text-green-400 font-medium">{message}</p>
              </div>
            )}

            {status === 'error' && (
              <div className="flex flex-col items-center space-y-4">
                <XCircle className="w-12 h-12 text-red-400" />
                <p className="text-red-400">{message}</p>
                <button
                  onClick={handleManualLogin}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 
                           text-white font-medium py-2 px-6 rounded-lg transition-all duration-200"
                >
                  Go to Login Page
                </button>
              </div>
            )}
          </div>

          {/* Security Notice */}
          <div className="text-xs text-gray-500 text-center">
            <p>This is a secure authentication session.</p>
            <p>If you did not initiate this login, please close this window.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { token } = context.query;

  // Basic validation
  if (!token || typeof token !== 'string') {
    return {
      props: {
        token: null,
        error: 'Invalid authentication token'
      }
    };
  }

  // Token format validation
  if (token.length < 20 || !/^[a-zA-Z0-9_-]+$/.test(token)) {
    return {
      props: {
        token: null,
        error: 'Malformed authentication token'
      }
    };
  }

  return {
    props: {
      token: token,
      error: null
    }
  };
};