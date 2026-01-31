import React, { useState } from 'react';
import { signIn, useSession } from 'next-auth/react';
import { CheckCircle, XCircle, AlertCircle, Loader } from 'lucide-react';

const TestOAuthPage = () => {
  const { data: session, status } = useSession();
  const [debugInfo, setDebugInfo] = useState(null);
  const [loading, setLoading] = useState(false);
  const [testResults, setTestResults] = useState(null);

  const runDiagnostics = async () => {
    setLoading(true);
    try {
      // Test environment variables
      const envResponse = await fetch('/api/debug/env-check?debug=siteoptz-debug-2024');
      const envData = await envResponse.json();

      // Test OAuth configuration
      const oauthResponse = await fetch('/api/debug/oauth-debug?debug=siteoptz-debug-2024');
      const oauthData = await oauthResponse.json();

      // Test OAuth flow readiness
      const flowResponse = await fetch('/api/test/oauth-flow');
      const flowData = await flowResponse.json();

      setDebugInfo({
        env: envData,
        oauth: oauthData,
        flow: flowData
      });

      setTestResults({
        oauth_ready: oauthData.validation.oauth_fully_configured,
        ghl_ready: oauthData.validation.ghl_configured,
        issues: oauthData.potential_issues,
        recommendations: oauthData.recommendations
      });
    } catch (error) {
      console.error('Diagnostics failed:', error);
      setTestResults({
        oauth_ready: false,
        error: error.message
      });
    } finally {
      setLoading(false);
    }
  };

  const testOAuthSignIn = async () => {
    try {
      await signIn('google', {
        callbackUrl: '/test-oauth?oauth=success'
      });
    } catch (error) {
      console.error('OAuth test failed:', error);
    }
  };

  if (process.env.NODE_ENV === 'production') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black flex items-center justify-center p-4">
        <div className="bg-black border border-gray-800 rounded-lg p-8 text-center">
          <h1 className="text-2xl font-bold text-white mb-4">Test Page Not Available</h1>
          <p className="text-gray-400">This test page is only available in development.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black p-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-black border border-gray-800 rounded-lg p-8">
          <h1 className="text-3xl font-bold text-white mb-6">OAuth Configuration Test</h1>
          
          {/* Session Status */}
          <div className="mb-6 p-4 bg-gray-900 rounded-lg">
            <h2 className="text-xl font-semibold text-white mb-2">Current Session</h2>
            {status === 'loading' ? (
              <div className="flex items-center text-gray-400">
                <Loader className="w-4 h-4 animate-spin mr-2" />
                Loading session...
              </div>
            ) : session ? (
              <div className="flex items-center text-green-400">
                <CheckCircle className="w-4 h-4 mr-2" />
                Signed in as: {session.user?.email}
              </div>
            ) : (
              <div className="flex items-center text-gray-400">
                <XCircle className="w-4 h-4 mr-2" />
                Not signed in
              </div>
            )}
          </div>

          {/* Test Buttons */}
          <div className="mb-6 space-y-4">
            <button
              onClick={runDiagnostics}
              disabled={loading}
              className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 disabled:opacity-50"
            >
              {loading ? 'Running Diagnostics...' : 'Run OAuth Diagnostics'}
            </button>

            <button
              onClick={testOAuthSignIn}
              className="w-full bg-green-600 text-white py-3 px-4 rounded-lg hover:bg-green-700"
            >
              Test OAuth Sign In
            </button>
          </div>

          {/* Test Results */}
          {testResults && (
            <div className="mb-6 p-4 bg-gray-900 rounded-lg">
              <h3 className="text-lg font-semibold text-white mb-4">Test Results</h3>
              
              <div className="space-y-2">
                <div className="flex items-center">
                  {testResults.oauth_ready ? (
                    <CheckCircle className="w-5 h-5 text-green-400 mr-2" />
                  ) : (
                    <XCircle className="w-5 h-5 text-red-400 mr-2" />
                  )}
                  <span className="text-white">OAuth Configuration: {testResults.oauth_ready ? 'Ready' : 'Issues Found'}</span>
                </div>

                <div className="flex items-center">
                  {testResults.ghl_ready ? (
                    <CheckCircle className="w-5 h-5 text-green-400 mr-2" />
                  ) : (
                    <AlertCircle className="w-5 h-5 text-yellow-400 mr-2" />
                  )}
                  <span className="text-white">GHL Integration: {testResults.ghl_ready ? 'Configured' : 'Not Configured'}</span>
                </div>
              </div>

              {testResults.issues && testResults.issues.length > 0 && (
                <div className="mt-4">
                  <h4 className="text-white font-semibold mb-2">Issues Found:</h4>
                  <ul className="list-disc list-inside text-red-400 space-y-1">
                    {testResults.issues.map((issue, idx) => (
                      <li key={idx}>{issue}</li>
                    ))}
                  </ul>
                </div>
              )}

              {testResults.recommendations && (
                <div className="mt-4">
                  <h4 className="text-white font-semibold mb-2">Recommendations:</h4>
                  <ul className="list-disc list-inside text-blue-400 space-y-1">
                    {testResults.recommendations.map((rec, idx) => (
                      <li key={idx}>{rec}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}

          {/* Debug Information */}
          {debugInfo && (
            <div className="bg-gray-900 rounded-lg p-4">
              <h3 className="text-lg font-semibold text-white mb-4">Debug Information</h3>
              <pre className="text-xs text-gray-400 overflow-auto max-h-96">
                {JSON.stringify(debugInfo, null, 2)}
              </pre>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TestOAuthPage;