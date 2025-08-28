import React, { useState } from 'react';
import Head from 'next/head';

const APIKeysPage = () => {
  const [email, setEmail] = useState('');
  const [keyName, setKeyName] = useState('');
  const [rateLimit, setRateLimit] = useState(100);
  const [apiKeys, setApiKeys] = useState<any[]>([]);
  const [newApiKey, setNewApiKey] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const loadApiKeys = async () => {
    if (!email) return;
    
    setLoading(true);
    setError('');
    
    try {
      const response = await fetch(`/api/auth/api-keys?email=${encodeURIComponent(email)}`);
      const data = await response.json();
      
      if (data.success) {
        setApiKeys(data.data);
      } else {
        setError(data.message || 'Failed to load API keys');
      }
    } catch (err) {
      setError('Network error occurred');
    } finally {
      setLoading(false);
    }
  };

  const createApiKey = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !keyName) {
      setError('Email and key name are required');
      return;
    }
    
    setLoading(true);
    setError('');
    setSuccess('');
    setNewApiKey('');
    
    try {
      const response = await fetch('/api/auth/api-keys', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: keyName,
          email: email,
          rateLimit: rateLimit
        }),
      });
      
      const data = await response.json();
      
      if (data.success) {
        setNewApiKey(data.data.key);
        setSuccess('API key created successfully!');
        setKeyName('');
        setRateLimit(100);
        loadApiKeys(); // Refresh the list
      } else {
        setError(data.message || 'Failed to create API key');
      }
    } catch (err) {
      setError('Network error occurred');
    } finally {
      setLoading(false);
    }
  };

  const deleteApiKey = async (keyId: string) => {
    if (!confirm('Are you sure you want to delete this API key?')) {
      return;
    }
    
    setLoading(true);
    setError('');
    
    try {
      const response = await fetch(`/api/auth/api-keys?id=${keyId}&email=${encodeURIComponent(email)}`, {
        method: 'DELETE',
      });
      
      const data = await response.json();
      
      if (data.success) {
        setSuccess('API key deleted successfully');
        loadApiKeys(); // Refresh the list
      } else {
        setError(data.message || 'Failed to delete API key');
      }
    } catch (err) {
      setError('Network error occurred');
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setSuccess('API key copied to clipboard!');
  };

  return (
    <>
      <Head>
        <title>API Key Management | SiteOptz.ai</title>
        <meta name="description" content="Manage your SiteOptz API keys for accessing our AI tools data." />
      </Head>

      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-4xl mx-auto px-4">
          
          {/* Header */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              API Key Management
            </h1>
            <p className="text-gray-600 mb-6">
              Create and manage API keys to access the SiteOptz AI Tools API with higher rate limits and usage tracking.
            </p>
            
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h4 className="font-semibold text-blue-900 mb-2">📋 Getting Started</h4>
              <ol className="text-blue-800 text-sm space-y-1">
                <li>1. Enter your email address to manage your API keys</li>
                <li>2. Create a new API key with a descriptive name</li>
                <li>3. Use your API key in requests with the <code className="bg-blue-100 px-1 rounded">X-API-Key</code> header</li>
                <li>4. Monitor your usage and manage your keys below</li>
              </ol>
            </div>
          </div>

          {/* Email Input */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
            <div className="flex gap-4">
              <input
                type="email"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <button
                onClick={loadApiKeys}
                disabled={loading || !email}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
              >
                {loading ? 'Loading...' : 'Load Keys'}
              </button>
            </div>
          </div>

          {/* Create New Key Form */}
          {email && (
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Create New API Key</h2>
              
              <form onSubmit={createApiKey} className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Key Name *
                    </label>
                    <input
                      type="text"
                      placeholder="e.g., My Website Integration"
                      value={keyName}
                      onChange={(e) => setKeyName(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Rate Limit (requests/minute)
                    </label>
                    <select
                      value={rateLimit}
                      onChange={(e) => setRateLimit(Number(e.target.value))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value={100}>100 (Standard)</option>
                      <option value={250}>250 (Enhanced)</option>
                      <option value={500}>500 (Professional)</option>
                      <option value={1000}>1000 (Enterprise)</option>
                    </select>
                  </div>
                </div>
                
                <button
                  type="submit"
                  disabled={loading || !keyName}
                  className="w-full px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50"
                >
                  {loading ? 'Creating...' : 'Create API Key'}
                </button>
              </form>
            </div>
          )}

          {/* Error/Success Messages */}
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
              <p className="text-red-800 text-sm">{error}</p>
            </div>
          )}
          
          {success && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
              <p className="text-green-800 text-sm">{success}</p>
            </div>
          )}

          {/* New API Key Display */}
          {newApiKey && (
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 mb-8">
              <h3 className="text-lg font-semibold text-yellow-900 mb-3">
                🔑 Your New API Key
              </h3>
              <p className="text-yellow-800 text-sm mb-4">
                <strong>Important:</strong> Copy this key now. It will not be shown again for security reasons.
              </p>
              
              <div className="flex gap-2">
                <code className="flex-1 bg-yellow-100 border border-yellow-300 rounded px-3 py-2 text-sm font-mono break-all">
                  {newApiKey}
                </code>
                <button
                  onClick={() => copyToClipboard(newApiKey)}
                  className="px-4 py-2 bg-yellow-600 text-white rounded hover:bg-yellow-700 text-sm"
                >
                  Copy
                </button>
              </div>
              
              <div className="mt-4 p-3 bg-yellow-100 rounded border border-yellow-300">
                <p className="text-yellow-800 text-sm font-medium mb-2">Usage Example:</p>
                <pre className="text-xs text-yellow-900 overflow-x-auto">
{`curl -H "X-API-Key: ${newApiKey}" \\
     "https://siteoptz.ai/api/v1/tools?limit=10"`}
                </pre>
              </div>
            </div>
          )}

          {/* Existing API Keys */}
          {apiKeys.length > 0 && (
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Your API Keys</h2>
              
              <div className="overflow-x-auto">
                <table className="min-w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 px-4 font-medium text-gray-900">Name</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-900">Key</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-900">Rate Limit</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-900">Requests</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-900">Last Used</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-900">Status</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-900">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {apiKeys.map((key) => (
                      <tr key={key.id} className="border-b border-gray-100">
                        <td className="py-3 px-4 font-medium">{key.name}</td>
                        <td className="py-3 px-4">
                          <code className="text-sm bg-gray-100 px-2 py-1 rounded">
                            {key.keyPreview}
                          </code>
                        </td>
                        <td className="py-3 px-4">{key.rateLimit}/min</td>
                        <td className="py-3 px-4">{key.requestCount.toLocaleString()}</td>
                        <td className="py-3 px-4 text-sm text-gray-600">
                          {key.lastUsed ? new Date(key.lastUsed).toLocaleDateString() : 'Never'}
                        </td>
                        <td className="py-3 px-4">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            key.isActive 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-red-100 text-red-800'
                          }`}>
                            {key.isActive ? 'Active' : 'Inactive'}
                          </span>
                        </td>
                        <td className="py-3 px-4">
                          <button
                            onClick={() => deleteApiKey(key.id)}
                            className="text-red-600 hover:text-red-700 text-sm font-medium"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* API Documentation Link */}
          <div className="mt-8 text-center">
            <Link 
              href="/api/docs" 
              className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              📚 View API Documentation
            </Link>
          </div>

        </div>
      </div>
    </>
  );
};

export default APIKeysPage;