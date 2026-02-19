import React, { useState } from 'react';

export default function ProductionDebug() {
  const [email, setEmail] = useState('');
  const [results, setResults] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1);

  const testFormData = {
    name: 'Production Test User',
    email: email || 'prod-test@example.com',
    phone: '555-9999',
    business: 'Production Test Business',
    bottlenecks: 'Lead Generation and Qualification',
    currentAIUsage: 'Experimenting personally with AI tools',
    priorityOutcome: 'More qualified leads'
  };

  const handleStoreFormData = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/store-form-data', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...testFormData, email: email || 'prod-test@example.com' })
      });
      const result = await response.json();
      setResults(prev => ({ ...prev, store: result }));
      if (result.success) {
        setStep(2);
      }
    } catch (error) {
      setResults(prev => ({ ...prev, store: { error: error instanceof Error ? error.message : 'Unknown error' } }));
    }
    setLoading(false);
  };

  const handleCheckStored = async () => {
    setLoading(true);
    try {
      const response = await fetch(`/api/store-form-data?email=${encodeURIComponent(email || 'prod-test@example.com')}`);
      const result = await response.json();
      setResults(prev => ({ ...prev, check: result }));
    } catch (error) {
      setResults(prev => ({ ...prev, check: { error: error instanceof Error ? error.message : 'Unknown error' } }));
    }
    setLoading(false);
  };

  const handleSimulateOAuth = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/debug/simulate-oauth-callback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          email: email || 'prod-test@example.com',
          name: 'Production Test User'
        })
      });
      const result = await response.json();
      setResults(prev => ({ ...prev, oauth: result }));
      if (result.success) {
        setStep(3);
      }
    } catch (error) {
      setResults(prev => ({ ...prev, oauth: { error: error instanceof Error ? error.message : 'Unknown error' } }));
    }
    setLoading(false);
  };

  const handleStartRealOAuth = () => {
    // Start the real OAuth flow
    window.location.href = `/auth/signup?source=form&email=${encodeURIComponent(email || 'prod-test@example.com')}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black p-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-black border border-gray-800 rounded-xl p-6">
          <h1 className="text-3xl font-bold text-white mb-6">Production Form Data Flow Debug</h1>
          
          {/* Email Input */}
          <div className="mb-6">
            <label className="block text-gray-300 text-sm mb-2">Test Email Address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your-email@example.com"
              className="w-full p-3 bg-gray-800 border border-gray-600 rounded text-white"
            />
          </div>

          {/* Step Indicators */}
          <div className="flex space-x-4 mb-8">
            <div className={`px-4 py-2 rounded ${step >= 1 ? 'bg-blue-600 text-white' : 'bg-gray-700 text-gray-300'}`}>
              1. Store Form Data
            </div>
            <div className={`px-4 py-2 rounded ${step >= 2 ? 'bg-blue-600 text-white' : 'bg-gray-700 text-gray-300'}`}>
              2. Simulate OAuth
            </div>
            <div className={`px-4 py-2 rounded ${step >= 3 ? 'bg-green-600 text-white' : 'bg-gray-700 text-gray-300'}`}>
              3. Check Results
            </div>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <button
              onClick={handleStoreFormData}
              disabled={loading || !email}
              className="px-4 py-3 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              1. Store Test Form Data
            </button>
            
            <button
              onClick={handleCheckStored}
              disabled={loading || !email}
              className="px-4 py-3 bg-gray-600 text-white rounded hover:bg-gray-700 disabled:opacity-50"
            >
              Check Stored Data
            </button>
            
            <button
              onClick={handleSimulateOAuth}
              disabled={loading || !email}
              className="px-4 py-3 bg-purple-600 text-white rounded hover:bg-purple-700 disabled:opacity-50"
            >
              2. Simulate OAuth Callback
            </button>
            
            <button
              onClick={handleStartRealOAuth}
              disabled={loading || !email}
              className="px-4 py-3 bg-green-600 text-white rounded hover:bg-green-700 disabled:opacity-50"
            >
              3. Test Real OAuth Flow
            </button>
          </div>

          {/* Test Data Preview */}
          <div className="mb-6 p-4 bg-gray-900 rounded border border-gray-700">
            <h3 className="text-white font-medium mb-2">Test Form Data to be Stored:</h3>
            <pre className="text-green-400 text-sm overflow-x-auto">
              {JSON.stringify({ ...testFormData, email: email || 'prod-test@example.com' }, null, 2)}
            </pre>
          </div>

          {/* Results Display */}
          {results && (
            <div className="space-y-4">
              {results.store && (
                <div className="p-4 bg-gray-900 rounded border border-gray-700">
                  <h3 className="text-white font-medium mb-2">Store Result:</h3>
                  <pre className="text-cyan-400 text-sm overflow-x-auto whitespace-pre-wrap">
                    {JSON.stringify(results.store, null, 2)}
                  </pre>
                </div>
              )}
              
              {results.check && (
                <div className="p-4 bg-gray-900 rounded border border-gray-700">
                  <h3 className="text-white font-medium mb-2">Check Stored Result:</h3>
                  <pre className="text-yellow-400 text-sm overflow-x-auto whitespace-pre-wrap">
                    {JSON.stringify(results.check, null, 2)}
                  </pre>
                </div>
              )}
              
              {results.oauth && (
                <div className="p-4 bg-gray-900 rounded border border-gray-700">
                  <h3 className="text-white font-medium mb-2">OAuth Simulation Result:</h3>
                  <pre className="text-green-400 text-sm overflow-x-auto whitespace-pre-wrap">
                    {JSON.stringify(results.oauth, null, 2)}
                  </pre>
                  {results.oauth.formDataRetrieved ? (
                    <div className="mt-2 p-2 bg-green-900 text-green-200 rounded text-sm">
                      ✅ SUCCESS: Form data was retrieved and sent to GHL!
                    </div>
                  ) : (
                    <div className="mt-2 p-2 bg-red-900 text-red-200 rounded text-sm">
                      ❌ ISSUE: No form data was retrieved during OAuth callback
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          {loading && (
            <div className="text-center py-4">
              <div className="inline-flex items-center">
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-500 mr-3"></div>
                <span className="text-gray-300">Processing...</span>
              </div>
            </div>
          )}
          
          {/* Instructions */}
          <div className="mt-8 p-4 bg-gray-800 rounded border border-gray-700">
            <h3 className="text-white font-medium mb-2">How to Use:</h3>
            <ol className="text-gray-300 text-sm space-y-1 list-decimal list-inside">
              <li>Enter your test email address above</li>
              <li>Click "Store Test Form Data" - this simulates filling out the modal form</li>
              <li>Click "Check Stored Data" to verify the data was stored correctly</li>
              <li>Click "Simulate OAuth Callback" - this tests the exact same code path as real OAuth</li>
              <li>Check the results to see if form data was retrieved and sent to GHL</li>
              <li>Optionally: Click "Test Real OAuth Flow" to test with actual Google OAuth</li>
            </ol>
            <div className="mt-4 p-3 bg-yellow-900 border border-yellow-600 rounded">
              <p className="text-yellow-200 text-sm">
                <strong>Note:</strong> This page runs on the real production environment with actual GHL credentials,
                so it will create real contacts in your GHL system when testing.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}