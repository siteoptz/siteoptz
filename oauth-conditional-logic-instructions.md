# 🔐 OAuth Conditional Logic Implementation Instructions for Claude AI

## Overview
This document provides comprehensive instructions for Claude AI to implement conditional logic that validates existing users during OAuth registration attempts on SiteOptz.ai. When an existing user tries to register via OAuth, the system will display "existing user, please sign in instead" message.

## 🎯 Current System Analysis

### Existing Authentication Flow
Based on the codebase analysis, SiteOptz.ai currently uses:
- **NextAuth.js** with Google OAuth provider
- **GoHighLevel CRM integration** for user management
- **Conditional user handling** in `lib/user-management-service.ts`
- **OAuth registration tracking** via `pages/api/check-oauth-registration.ts`

### Current OAuth Flow
1. User clicks "Get Started" → OAuth registration attempt
2. NextAuth.js handles Google OAuth
3. `signIn` callback processes user data
4. `handleUserAction()` checks if user exists in GoHighLevel
5. Creates new contact or updates existing contact

## 🚀 Implementation Strategy

### Phase 1: Enhanced User Detection Logic

#### A. Modify NextAuth SignIn Callback
```typescript
// In pages/api/auth/[...nextauth].ts
async signIn({ user, account, profile }) {
  try {
    console.log('=== ENHANCED OAUTH SIGNIN CALLBACK ===');
    console.log('User:', JSON.stringify(user, null, 2));
    console.log('Provider:', account?.provider);
    
    // Skip GoHighLevel integration for credentials provider
    if (account?.provider === 'credentials') {
      console.log('✅ Credentials sign-in detected - skipping OAuth logic');
      return true;
    }
    
    // Handle OAuth user registration/login with enhanced validation
    if (user?.email) {
      console.log('🔍 Processing OAuth user for:', user.email);
      
      // Step 1: Check if this is a registration attempt vs login attempt
      const isRegistrationAttempt = await checkIfRegistrationAttempt(user.email);
      
      // Step 2: Check if user already exists in GoHighLevel
      const existingUserCheck = await checkExistingUserInGHL(user.email);
      
      // Step 3: Apply conditional logic
      if (isRegistrationAttempt && existingUserCheck.exists) {
        // Existing user trying to register - block and show message
        console.log('❌ Existing user attempting OAuth registration - blocking');
        throw new Error('EXISTING_USER_REGISTRATION_ATTEMPT');
      }
      
      // Step 4: Process user action based on registration vs login
      const userData = createUserDataFromOAuth(user, businessInfo);
      userData.provider = account?.provider || 'oauth';
      userData.isRegistrationAttempt = isRegistrationAttempt;
      
      const userActionResult = await handleUserAction(userData);
      
      if (userActionResult.success) {
        if (userActionResult.isNewUser) {
          console.log('🆕 New OAuth user registered successfully');
        } else {
          console.log('👤 Existing OAuth user signed in successfully');
        }
      } else {
        console.error('❌ Failed to process OAuth user:', userActionResult.error);
      }
    }
    
    return true;
  } catch (error) {
    console.error('💥 Error in enhanced signIn callback:', error);
    
    // Handle specific error types
    if (error.message === 'EXISTING_USER_REGISTRATION_ATTEMPT') {
      // This will be caught by the error page and show appropriate message
      throw error;
    }
    
    // For other errors, still allow sign-in
    return true;
  }
}
```

#### B. Create Enhanced User Detection Functions
```typescript
// In lib/user-management-service.ts - Add these new functions

// Check if this is a registration attempt vs login attempt
async function checkIfRegistrationAttempt(email: string): Promise<boolean> {
  console.log('🔍 Checking if OAuth attempt is registration for:', email);
  
  try {
    // Check for pending registration data
    const response = await fetch(`${process.env.NEXTAUTH_URL}/api/get-oauth-business-info?email=${encodeURIComponent(email)}`);
    
    if (response.ok) {
      const result = await response.json();
      if (result.success && result.data) {
        console.log('✅ Registration attempt detected - business info found');
        return true;
      }
    }
    
    // Check for registration attempt in localStorage/session
    // This would be set when user clicks "Get Started" button
    const registrationAttempt = await checkRegistrationAttemptInSession(email);
    
    console.log('📊 Registration attempt result:', registrationAttempt);
    return registrationAttempt;
    
  } catch (error) {
    console.error('Error checking registration attempt:', error);
    // Default to false (login attempt) if check fails
    return false;
  }
}

// Check for registration attempt in session/localStorage
async function checkRegistrationAttemptInSession(email: string): Promise<boolean> {
  // This would check for:
  // 1. Pending registration data in API
  // 2. Registration attempt timestamp
  // 3. Business info collection status
  
  // For now, return false (login attempt)
  // In production, implement session-based tracking
  return false;
}

// Enhanced existing user check with detailed response
async function checkExistingUserInGHL(email: string): Promise<{ exists: boolean; contactId?: string; userDetails?: any }> {
  console.log('🔍 Enhanced check for existing user in GoHighLevel:', email);
  
  const isGHLEnabled = process.env.ENABLE_GHL === 'true';
  if (!isGHLEnabled || !process.env.GOHIGHLEVEL_API_KEY || !process.env.GOHIGHLEVEL_LOCATION_ID) {
    console.log('⚠️ GoHighLevel integration disabled');
    return { exists: false };
  }

  try {
    const headers: Record<string, string> = {
      'Authorization': `Bearer ${process.env.GOHIGHLEVEL_API_KEY}`,
      'Content-Type': 'application/json',
      'Version': '2021-07-28'
    };
    
    if (process.env.GOHIGHLEVEL_LOCATION_ID) {
      headers['Location-Id'] = process.env.GOHIGHLEVEL_LOCATION_ID;
    }
    
    // Search for existing contact by email
    const searchResponse = await fetch(
      `https://services.leadconnectorhq.com/contacts/search/duplicate?email=${encodeURIComponent(email)}`,
      {
        method: 'GET',
        headers
      }
    );

    if (searchResponse.ok) {
      const searchResult = await searchResponse.json();
      
      if (searchResult.contact && searchResult.contact.id) {
        console.log('✅ Existing user found in GoHighLevel:', searchResult.contact.id);
        return { 
          exists: true, 
          contactId: searchResult.contact.id,
          userDetails: searchResult.contact
        };
      } else {
        console.log('ℹ️ No existing user found for:', email);
        return { exists: false };
      }
    } else {
      const error = await searchResponse.text();
      console.error('❌ Failed to search for existing user. Status:', searchResponse.status);
      console.error('❌ Error response:', error);
      return { exists: false };
    }
  } catch (error) {
    console.error('💥 Network error searching for existing user:', error);
    return { exists: false };
  }
}
```

### Phase 2: Frontend Integration

#### A. Modify "Get Started" Button Logic
```typescript
// In components/RegisterModal.tsx or similar component
const handleGetStarted = async (email: string) => {
  try {
    setIsProcessing(true);
    
    // Step 1: Check if user already exists
    const existingUserCheck = await checkExistingUser(email);
    
    if (existingUserCheck.exists) {
      // Show existing user message
      setError('You already have an account. Please sign in instead.');
      setShowExistingUserMessage(true);
      return;
    }
    
    // Step 2: Store registration attempt
    await storeRegistrationAttempt(email);
    
    // Step 3: Proceed with OAuth
    await signIn('google', { 
      callbackUrl: '/dashboard',
      redirect: false 
    });
    
  } catch (error) {
    console.error('Get Started error:', error);
    setError('An error occurred. Please try again.');
  } finally {
    setIsProcessing(false);
  }
};

// Check if user exists before OAuth
const checkExistingUser = async (email: string) => {
  try {
    const response = await fetch(`/api/check-existing-user?email=${encodeURIComponent(email)}`);
    const result = await response.json();
    return result;
  } catch (error) {
    console.error('Error checking existing user:', error);
    return { exists: false };
  }
};

// Store registration attempt
const storeRegistrationAttempt = async (email: string) => {
  try {
    await fetch('/api/check-oauth-registration', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        action: 'store',
        email: email,
        registrationData: {
          isRegistrationAttempt: true,
          timestamp: Date.now(),
          source: 'get-started-button'
        }
      })
    });
  } catch (error) {
    console.error('Error storing registration attempt:', error);
  }
};
```

#### B. Create Existing User Message Component
```typescript
// In components/ExistingUserMessage.tsx
import React from 'react';
import { ExclamationTriangleIcon, ArrowRightIcon } from '@heroicons/react/24/outline';

interface ExistingUserMessageProps {
  isVisible: boolean;
  onClose: () => void;
  onSignIn: () => void;
  userEmail?: string;
}

export const ExistingUserMessage: React.FC<ExistingUserMessageProps> = ({
  isVisible,
  onClose,
  onSignIn,
  userEmail
}) => {
  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
        <div className="flex items-center mb-4">
          <ExclamationTriangleIcon className="h-8 w-8 text-amber-500 mr-3" />
          <h3 className="text-lg font-semibold text-gray-900">
            Account Already Exists
          </h3>
        </div>
        
        <div className="mb-6">
          <p className="text-gray-600 mb-2">
            We found an existing account for {userEmail || 'this email address'}.
          </p>
          <p className="text-gray-600">
            Please sign in to your existing account instead of creating a new one.
          </p>
        </div>
        
        <div className="flex space-x-3">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={onSignIn}
            className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors flex items-center justify-center"
          >
            Sign In Instead
            <ArrowRightIcon className="h-4 w-4 ml-2" />
          </button>
        </div>
      </div>
    </div>
  );
};
```

### Phase 3: API Endpoints

#### A. Create Check Existing User API
```typescript
// In pages/api/check-existing-user.ts
import { NextApiRequest, NextApiResponse } from 'next';

interface ApiResponse {
  success: boolean;
  exists: boolean;
  contactId?: string;
  userDetails?: any;
  error?: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ApiResponse>
) {
  if (req.method !== 'GET') {
    return res.status(405).json({
      success: false,
      exists: false,
      error: 'Method not allowed'
    });
  }

  try {
    const { email } = req.query;
    
    if (!email || typeof email !== 'string') {
      return res.status(400).json({
        success: false,
        exists: false,
        error: 'Email is required'
      });
    }

    // Check if GoHighLevel integration is enabled
    const isGHLEnabled = process.env.ENABLE_GHL === 'true';
    if (!isGHLEnabled || !process.env.GOHIGHLEVEL_API_KEY || !process.env.GOHIGHLEVEL_LOCATION_ID) {
      return res.status(200).json({
        success: true,
        exists: false
      });
    }

    // Search for existing contact
    const headers: Record<string, string> = {
      'Authorization': `Bearer ${process.env.GOHIGHLEVEL_API_KEY}`,
      'Content-Type': 'application/json',
      'Version': '2021-07-28'
    };
    
    if (process.env.GOHIGHLEVEL_LOCATION_ID) {
      headers['Location-Id'] = process.env.GOHIGHLEVEL_LOCATION_ID;
    }
    
    const searchResponse = await fetch(
      `https://services.leadconnectorhq.com/contacts/search/duplicate?email=${encodeURIComponent(email)}`,
      {
        method: 'GET',
        headers
      }
    );

    if (searchResponse.ok) {
      const searchResult = await searchResponse.json();
      
      if (searchResult.contact && searchResult.contact.id) {
        return res.status(200).json({
          success: true,
          exists: true,
          contactId: searchResult.contact.id,
          userDetails: searchResult.contact
        });
      } else {
        return res.status(200).json({
          success: true,
          exists: false
        });
      }
    } else {
      const error = await searchResponse.text();
      console.error('Failed to search for existing user:', error);
      return res.status(500).json({
        success: false,
        exists: false,
        error: 'Failed to check existing user'
      });
    }
  } catch (error) {
    console.error('Error checking existing user:', error);
    return res.status(500).json({
      success: false,
      exists: false,
      error: 'Internal server error'
    });
  }
}
```

#### B. Enhanced OAuth Business Info API
```typescript
// In pages/api/get-oauth-business-info.ts - Add registration attempt tracking
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ApiResponse>
) {
  if (req.method === 'GET') {
    try {
      const { email } = req.query;
      
      if (!email || typeof email !== 'string') {
        return res.status(400).json({
          success: false,
          error: 'Email is required'
        });
      }
      
      // Check for pending registration attempt
      const registrationData = pendingRegistrations.get(email);
      
      if (!registrationData) {
        return res.status(200).json({
          success: true,
          data: null
        });
      }
      
      // Check if expired
      if (Date.now() > registrationData.timestamp) {
        pendingRegistrations.delete(email);
        return res.status(200).json({
          success: true,
          data: null
        });
      }
      
      // Return registration data
      return res.status(200).json({
        success: true,
        data: registrationData
      });
    } catch (error) {
      console.error('Error getting OAuth business info:', error);
      return res.status(500).json({
        success: false,
        error: 'Failed to get business info'
      });
    }
  }
  
  return res.status(405).json({
    success: false,
    error: 'Method not allowed'
  });
}
```

### Phase 4: Error Handling & User Experience

#### A. Custom Error Page for OAuth
```typescript
// In pages/auth/error.tsx
import { useRouter } from 'next/router';
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline';

export default function AuthError() {
  const router = useRouter();
  const { error } = router.query;

  const getErrorMessage = (error: string) => {
    switch (error) {
      case 'EXISTING_USER_REGISTRATION_ATTEMPT':
        return {
          title: 'Account Already Exists',
          message: 'You already have an account with this email address. Please sign in instead.',
          action: 'Sign In',
          actionUrl: '/#login'
        };
      case 'OAuthSignin':
        return {
          title: 'Sign In Error',
          message: 'There was an error signing in with your OAuth provider.',
          action: 'Try Again',
          actionUrl: '/#register'
        };
      default:
        return {
          title: 'Authentication Error',
          message: 'An unexpected error occurred during authentication.',
          action: 'Go Home',
          actionUrl: '/'
        };
    }
  };

  const errorInfo = getErrorMessage(error as string);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <div className="text-center">
            <ExclamationTriangleIcon className="mx-auto h-12 w-12 text-amber-500" />
            <h2 className="mt-4 text-2xl font-bold text-gray-900">
              {errorInfo.title}
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              {errorInfo.message}
            </p>
            <div className="mt-6">
              <button
                onClick={() => router.push(errorInfo.actionUrl)}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                {errorInfo.action}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
```

#### B. Enhanced User Flow Logic
```typescript
// In hooks/useOAuthFlow.ts
import { useState, useCallback } from 'react';
import { signIn, signOut } from 'next-auth/react';

export const useOAuthFlow = () => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGetStarted = useCallback(async (email: string) => {
    try {
      setIsProcessing(true);
      setError(null);

      // Step 1: Check if user exists
      const existingUserCheck = await fetch(`/api/check-existing-user?email=${encodeURIComponent(email)}`);
      const existingUserResult = await existingUserCheck.json();

      if (existingUserResult.exists) {
        setError('EXISTING_USER_REGISTRATION_ATTEMPT');
        return { success: false, error: 'EXISTING_USER_REGISTRATION_ATTEMPT' };
      }

      // Step 2: Store registration attempt
      await fetch('/api/check-oauth-registration', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'store',
          email: email,
          registrationData: {
            isRegistrationAttempt: true,
            timestamp: Date.now(),
            source: 'get-started-button'
          }
        })
      });

      // Step 3: Initiate OAuth
      const result = await signIn('google', { 
        callbackUrl: '/dashboard',
        redirect: false 
      });

      if (result?.error) {
        setError(result.error);
        return { success: false, error: result.error };
      }

      return { success: true };

    } catch (error) {
      console.error('OAuth flow error:', error);
      setError('An unexpected error occurred');
      return { success: false, error: 'UNEXPECTED_ERROR' };
    } finally {
      setIsProcessing(false);
    }
  }, []);

  const handleSignIn = useCallback(async () => {
    try {
      setIsProcessing(true);
      setError(null);

      const result = await signIn('google', { 
        callbackUrl: '/dashboard',
        redirect: false 
      });

      if (result?.error) {
        setError(result.error);
        return { success: false, error: result.error };
      }

      return { success: true };

    } catch (error) {
      console.error('Sign in error:', error);
      setError('An unexpected error occurred');
      return { success: false, error: 'UNEXPECTED_ERROR' };
    } finally {
      setIsProcessing(false);
    }
  }, []);

  return {
    handleGetStarted,
    handleSignIn,
    isProcessing,
    error,
    clearError: () => setError(null)
  };
};
```

## 🎯 Implementation Checklist

### Phase 1: Backend Logic
- [ ] Modify NextAuth signIn callback with enhanced user detection
- [ ] Add `checkIfRegistrationAttempt()` function
- [ ] Add `checkExistingUserInGHL()` function with detailed response
- [ ] Update `handleUserAction()` to handle registration vs login attempts
- [ ] Add error handling for existing user registration attempts

### Phase 2: Frontend Integration
- [ ] Create `ExistingUserMessage` component
- [ ] Modify "Get Started" button logic
- [ ] Add user existence check before OAuth
- [ ] Implement registration attempt tracking
- [ ] Add proper error states and messaging

### Phase 3: API Endpoints
- [ ] Create `/api/check-existing-user` endpoint
- [ ] Enhance `/api/get-oauth-business-info` endpoint
- [ ] Add proper error handling and validation
- [ ] Implement rate limiting for API calls

### Phase 4: Error Handling
- [ ] Create custom OAuth error page
- [ ] Add specific error messages for existing users
- [ ] Implement proper redirect logic
- [ ] Add user-friendly error recovery options

### Phase 5: Testing & Validation
- [ ] Test existing user registration attempt blocking
- [ ] Test new user registration flow
- [ ] Test existing user login flow
- [ ] Validate error messages and user experience
- [ ] Test edge cases and error scenarios

## 🔧 Configuration Requirements

### Environment Variables
```bash
# Existing variables (already configured)
NEXTAUTH_URL=https://siteoptz.ai
NEXTAUTH_SECRET=your-secret-key
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
GOHIGHLEVEL_API_KEY=your-ghl-api-key
GOHIGHLEVEL_LOCATION_ID=your-ghl-location-id
ENABLE_GHL=true
```

### Google OAuth Configuration
- Ensure Google OAuth consent screen is configured
- Add authorized redirect URIs:
  - `https://siteoptz.ai/api/auth/callback/google`
  - `http://localhost:3000/api/auth/callback/google` (for development)

## 📊 Expected Behavior

### Scenario 1: New User Registration
1. User clicks "Get Started"
2. System checks if user exists → Not found
3. OAuth flow proceeds normally
4. New user created in GoHighLevel
5. Welcome email sent
6. User redirected to dashboard

### Scenario 2: Existing User Registration Attempt
1. User clicks "Get Started"
2. System checks if user exists → Found
3. OAuth flow blocked
4. "Existing user, please sign in instead" message shown
5. User redirected to sign-in option

### Scenario 3: Existing User Login
1. User clicks "Sign In"
2. OAuth flow proceeds normally
3. Existing user authenticated
4. No welcome email sent
5. User redirected to dashboard

## 🚀 Deployment Steps

1. **Backend Changes**: Deploy API endpoints and NextAuth modifications
2. **Frontend Changes**: Deploy component updates and error handling
3. **Testing**: Verify all scenarios work correctly
4. **Monitoring**: Set up logging for OAuth flow tracking
5. **Documentation**: Update user guides and support documentation

This implementation provides a robust solution for detecting existing users during OAuth registration attempts while maintaining a smooth user experience for legitimate new registrations and existing user logins.
