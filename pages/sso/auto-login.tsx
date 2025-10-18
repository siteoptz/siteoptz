import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { GetServerSideProps } from 'next';
import Head from 'next/head';
import { Loader2, CheckCircle, AlertCircle } from 'lucide-react';
import CyfeSSOMiddleware from '@/lib/cyfe-sso-middleware';

interface AutoLoginPageProps {
  success: boolean;
  message?: string;
  redirectUrl?: string;
  error?: string;
}

export default function AutoLoginPage({ success, message, redirectUrl, error }: AutoLoginPageProps) {
  const router = useRouter();
  const [countdown, setCountdown] = useState(3);

  useEffect(() => {
    if (success && redirectUrl) {
      // Start countdown
      const interval = setInterval(() => {
        setCountdown(prev => {
          if (prev <= 1) {
            clearInterval(interval);
            // Redirect to dashboard
            window.location.href = redirectUrl;
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [success, redirectUrl]);

  return (
    <>
      <Head>
        <title>Auto Login - SiteOptz Analytics</title>
        <meta name="robots" content="noindex, nofollow" />
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black flex items-center justify-center">
        <div className="max-w-md w-full mx-auto p-6">
          <div className="bg-black border border-gray-800 rounded-xl p-8">
            {success ? (
              <div className="text-center">
                <div className="mb-6">
                  <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full 
                                flex items-center justify-center mx-auto animate-pulse">
                    <CheckCircle className="w-8 h-8 text-white" />
                  </div>
                </div>
                
                <h1 className="text-2xl font-bold text-white mb-2">Login Successful!</h1>
                <p className="text-gray-300 mb-6">
                  {message || 'Your session has been authenticated'}
                </p>
                
                <div className="bg-gray-900 border border-gray-700 rounded-lg p-4 mb-6">
                  <p className="text-gray-400 text-sm">Redirecting in</p>
                  <p className="text-3xl font-bold text-cyan-400">{countdown}</p>
                  <p className="text-gray-400 text-sm mt-2">seconds</p>
                </div>
                
                <button
                  onClick={() => window.location.href = redirectUrl!}
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 
                           hover:to-purple-700 text-white font-medium py-3 px-4 rounded-lg 
                           transition-all duration-200"
                >
                  Go to Dashboard Now
                </button>
              </div>
            ) : (
              <div className="text-center">
                <div className="mb-6">
                  <div className="w-16 h-16 bg-gradient-to-r from-red-500 to-rose-600 rounded-full 
                                flex items-center justify-center mx-auto">
                    <AlertCircle className="w-8 h-8 text-white" />
                  </div>
                </div>
                
                <h1 className="text-2xl font-bold text-white mb-2">Login Failed</h1>
                <p className="text-gray-300 mb-6">
                  {error || 'Unable to authenticate your session'}
                </p>
                
                <div className="bg-red-900/20 border border-red-500/30 rounded-lg p-4 mb-6">
                  <p className="text-red-400 text-sm">
                    The login link may be expired or invalid. Please request a new one.
                  </p>
                </div>
                
                <button
                  onClick={() => router.push('/')}
                  className="w-full bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-700 
                           hover:to-gray-800 text-white font-medium py-3 px-4 rounded-lg 
                           transition-all duration-200"
                >
                  Go to Homepage
                </button>
              </div>
            )}
          </div>
          
          <p className="text-center text-gray-500 text-sm mt-6">
            Secure auto-login powered by SiteOptz SSO
          </p>
        </div>
      </div>
    </>
  );
}

export const getServerSideProps: GetServerSideProps<AutoLoginPageProps> = async (context) => {
  const { sso_token, signature, redirect, auto_login, plan } = context.query;
  
  // Check the current host
  const host = context.req.headers.host;
  
  if (!sso_token || !signature) {
    return {
      props: {
        success: false,
        error: 'Missing authentication parameters'
      }
    };
  }
  
  // Verify signature
  if (!CyfeSSOMiddleware.verifyUrlSignature(sso_token as string, signature as string)) {
    return {
      props: {
        success: false,
        error: 'Invalid authentication signature'
      }
    };
  }
  
  // Verify token
  const tokenData = CyfeSSOMiddleware.verifyToken(sso_token as string);
  if (!tokenData) {
    return {
      props: {
        success: false,
        error: 'Invalid or expired authentication token'
      }
    };
  }
  
  // Set authentication cookies
  const cookies = [
    `optz-sso-email=${tokenData.email}; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=${60 * 60 * 24}`,
    `optz-sso-plan=${tokenData.plan}; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=${60 * 60 * 24}`,
    `optz-sso-username=${tokenData.username}; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=${60 * 60 * 24}`,
    `optz-sso-token=${sso_token}; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=${60 * 60 * 24}`,
    `optz-authenticated=true; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=${60 * 60 * 24}`
  ];
  
  context.res.setHeader('Set-Cookie', cookies);
  
  // Determine redirect URL (ensure it's a string, not an array)
  const redirectParam = Array.isArray(redirect) ? redirect[0] : redirect;
  let redirectUrl = redirectParam || `/dashboard/${plan || tokenData.plan}`;
  
  // Always use siteoptz.ai domain
  if (!redirectUrl.startsWith('http')) {
    redirectUrl = `https://siteoptz.ai${redirectUrl}`;
  }
  
  // If auto_login is true, redirect immediately
  if (auto_login === 'true') {
    return {
      redirect: {
        destination: redirectUrl,
        permanent: false
      }
    };
  }
  
  return {
    props: {
      success: true,
      message: `Welcome back, ${tokenData.username}!`,
      redirectUrl
    }
  };
};