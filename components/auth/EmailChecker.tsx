import React, { useState, useEffect } from 'react';
import { CheckCircle, AlertCircle, Loader2 } from 'lucide-react';

interface EmailCheckerProps {
  onUserExists: (exists: boolean, userData?: any) => void;
}

const EmailChecker: React.FC<EmailCheckerProps> = ({ onUserExists }) => {
  const [email, setEmail] = useState('');
  const [checking, setChecking] = useState(false);
  const [status, setStatus] = useState<'idle' | 'checking' | 'exists' | 'new'>('idle');
  const [existingUser, setExistingUser] = useState<any>(null);

  // Debounced email checking
  useEffect(() => {
    if (!email || !email.includes('@')) {
      setStatus('idle');
      setExistingUser(null);
      onUserExists(false);
      return;
    }

    const timeoutId = setTimeout(async () => {
      await checkUserExists(email);
    }, 800); // Wait 800ms after user stops typing

    return () => clearTimeout(timeoutId);
  }, [email]);

  const checkUserExists = async (emailToCheck: string) => {
    setChecking(true);
    setStatus('checking');

    try {
      console.log('🔍 Checking if user exists:', emailToCheck);
      
      const response = await fetch('/api/check-user-exists', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: emailToCheck })
      });

      const result = await response.json();
      
      if (result.exists) {
        setStatus('exists');
        setExistingUser(result.contact);
        onUserExists(true, result.contact);
        console.log('✅ User exists:', result.contact);
      } else {
        setStatus('new');
        setExistingUser(null);
        onUserExists(false);
        console.log('ℹ️ New user, can proceed');
      }
    } catch (error) {
      console.error('❌ Error checking user:', error);
      setStatus('new'); // Default to allowing signup on error
      setExistingUser(null);
      onUserExists(false);
    } finally {
      setChecking(false);
    }
  };

  const getStatusIcon = () => {
    switch (status) {
      case 'checking':
        return <Loader2 className="w-5 h-5 text-blue-500 animate-spin" />;
      case 'exists':
        return <AlertCircle className="w-5 h-5 text-orange-500" />;
      case 'new':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      default:
        return null;
    }
  };

  const getStatusMessage = () => {
    switch (status) {
      case 'checking':
        return <span className="text-blue-400">Checking...</span>;
      case 'exists':
        return (
          <span className="text-orange-400">
            Account exists with this email. You&apos;ll be prompted to sign in.
          </span>
        );
      case 'new':
        return <span className="text-green-400">Email available for signup</span>;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-3">
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Email Address *
        </label>
        <div className="relative">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 pr-12 bg-gray-900 border border-gray-800 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Enter your email to check availability"
            required
          />
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
            {getStatusIcon()}
          </div>
        </div>
      </div>
      
      {status !== 'idle' && (
        <div className="flex items-center text-sm">
          {getStatusMessage()}
        </div>
      )}
      
      {status === 'exists' && existingUser && (
        <div className="p-3 bg-orange-900/30 border border-orange-700/50 rounded-lg">
          <p className="text-orange-200 text-sm">
            <strong>{existingUser.name}</strong> - We found your account! 
            You&apos;ll be redirected to sign in instead.
          </p>
        </div>
      )}
    </div>
  );
};

export default EmailChecker;