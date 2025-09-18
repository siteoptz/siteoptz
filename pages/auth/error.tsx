import React from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { AlertCircle, ArrowLeft } from 'lucide-react';

const AuthError: React.FC = () => {
  const router = useRouter();
  const { error, message } = router.query;

  const getErrorMessage = () => {
    switch (error) {
      case 'UserExists':
        return message || 'User already exists. Please sign in instead.';
      case 'OAuthRegistrationDisabled':
        return 'OAuth registration is temporarily disabled. Please use email/password registration instead.';
      case 'Configuration':
        return 'There is a problem with the server configuration.';
      case 'AccessDenied':
        return 'Access denied. You do not have permission to sign in.';
      case 'Verification':
        return 'The sign in link is no longer valid. It may have been used already or it may have expired.';
      default:
        return 'An error occurred during authentication. Please try again.';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-black border border-gray-800 rounded-2xl p-8 text-center">
        {/* Error Icon */}
        <div className="flex justify-center mb-6">
          <div className="w-16 h-16 bg-red-500/10 rounded-full flex items-center justify-center">
            <AlertCircle className="w-8 h-8 text-red-500" />
          </div>
        </div>

        {/* Error Title */}
        <h1 className="text-2xl font-bold text-white mb-4">
          Authentication Error
        </h1>

        {/* Error Message */}
        <p className="text-gray-300 mb-8">
          {getErrorMessage()}
        </p>

        {/* Action Buttons */}
        <div className="space-y-4">
          {error === 'UserExists' && (
            <Link 
              href="/"
              className="block w-full bg-gradient-to-r from-green-600 to-emerald-600 text-white py-3 px-4 rounded-xl font-semibold hover:from-green-700 hover:to-emerald-700 transition-all duration-200"
            >
              Sign In Instead
            </Link>
          )}
          
          <button
            onClick={() => router.back()}
            className="flex items-center justify-center gap-2 w-full bg-gray-800 text-white py-3 px-4 rounded-xl font-semibold hover:bg-gray-700 transition-all duration-200"
          >
            <ArrowLeft className="w-5 h-5" />
            Go Back
          </button>
        </div>

        {/* Additional Help */}
        <div className="mt-8 text-sm text-gray-500">
          <p>
            Need help? Contact{' '}
            <a 
              href="mailto:support@siteoptz.ai" 
              className="text-green-400 hover:text-green-300 transition-colors"
            >
              support@siteoptz.ai
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuthError;