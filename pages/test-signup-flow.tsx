import React, { useState } from 'react';
import { signIn } from 'next-auth/react';

export default function TestSignupFlow() {
  const [email, setEmail] = useState('test-flow@example.com');
  const [formData, setFormData] = useState({
    name: 'Test Flow User',
    email: 'test-flow@example.com',
    phone: '555-0123',
    business: 'Test Business Website',
    bottlenecks: 'Lead Generation and Qualification',
    currentAIUsage: 'Experimenting personally with AI tools',
    priorityOutcome: 'More qualified leads'
  });
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState('form');

  const handleStoreData = async () => {
    setLoading(true);
    setStep('storing');
    
    try {
      console.log('📦 Storing form data:', formData);
      const response = await fetch('/api/store-form-data', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      
      const result = await response.json();
      console.log('✅ Store result:', result);
      
      if (result.success) {
        setStep('stored');
      } else {
        setStep('error');
      }
    } catch (error) {
      console.error('❌ Store error:', error);
      setStep('error');
    } finally {
      setLoading(false);
    }
  };

  const handleStartOAuth = () => {
    setStep('oauth');
    // Start OAuth with form source
    window.location.href = `/auth/signup?source=form&email=${encodeURIComponent(email)}`;
  };

  const handleCheckStored = async () => {
    try {
      const response = await fetch(`/api/store-form-data?email=${encodeURIComponent(email)}`);
      const result = await response.json();
      console.log('🔍 Check result:', result);
      alert(JSON.stringify(result, null, 2));
    } catch (error) {
      console.error('❌ Check error:', error);
      alert('Error checking stored data');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black p-8">
      <div className="max-w-2xl mx-auto">
        <div className="bg-black border border-gray-800 rounded-xl p-6">
          <h1 className="text-2xl font-bold text-white mb-6">Test Signup Flow</h1>
          
          <div className="space-y-4">
            {/* Step Indicator */}
            <div className="flex space-x-4 mb-6">
              <div className={`px-3 py-1 rounded text-sm ${step === 'form' ? 'bg-blue-600 text-white' : 'bg-gray-700 text-gray-300'}`}>
                1. Form Data
              </div>
              <div className={`px-3 py-1 rounded text-sm ${step === 'storing' || step === 'stored' ? 'bg-blue-600 text-white' : 'bg-gray-700 text-gray-300'}`}>
                2. Store Data
              </div>
              <div className={`px-3 py-1 rounded text-sm ${step === 'oauth' ? 'bg-blue-600 text-white' : 'bg-gray-700 text-gray-300'}`}>
                3. OAuth Flow
              </div>
            </div>

            {/* Form Fields */}
            <div className="space-y-3">
              <div>
                <label className="block text-gray-300 text-sm mb-1">Email</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => {
                    setFormData({...formData, email: e.target.value});
                    setEmail(e.target.value);
                  }}
                  className="w-full p-2 bg-gray-800 border border-gray-600 rounded text-white"
                />
              </div>
              <div>
                <label className="block text-gray-300 text-sm mb-1">Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full p-2 bg-gray-800 border border-gray-600 rounded text-white"
                />
              </div>
              <div>
                <label className="block text-gray-300 text-sm mb-1">Bottlenecks</label>
                <select
                  value={formData.bottlenecks}
                  onChange={(e) => setFormData({...formData, bottlenecks: e.target.value})}
                  className="w-full p-2 bg-gray-800 border border-gray-600 rounded text-white"
                >
                  <option value="Lead Generation and Qualification">Lead Generation and Qualification</option>
                  <option value="Content Creation and Marketing">Content Creation and Marketing</option>
                  <option value="Process Automation and Workflows">Process Automation and Workflows</option>
                </select>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-3 mt-6">
              {step === 'form' && (
                <button
                  onClick={handleStoreData}
                  disabled={loading}
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
                >
                  {loading ? 'Storing...' : 'Store Form Data'}
                </button>
              )}
              
              {step === 'stored' && (
                <>
                  <button
                    onClick={handleStartOAuth}
                    className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                  >
                    Start OAuth Flow
                  </button>
                  <button
                    onClick={handleCheckStored}
                    className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
                  >
                    Check Stored Data
                  </button>
                </>
              )}
              
              {step === 'storing' && (
                <div className="px-4 py-2 text-yellow-400">
                  Storing form data...
                </div>
              )}
              
              {step === 'error' && (
                <div className="px-4 py-2 text-red-400">
                  Error occurred. Check console.
                </div>
              )}
            </div>

            {/* Instructions */}
            <div className="mt-6 p-4 bg-gray-800 rounded border border-gray-700">
              <h3 className="text-white font-medium mb-2">Test Instructions:</h3>
              <ol className="text-gray-300 text-sm space-y-1 list-decimal list-inside">
                <li>Fill out the form data above</li>
                <li>Click &quot;Store Form Data&quot; to simulate the modal form submission</li>
                <li>Click &quot;Start OAuth Flow&quot; to simulate the OAuth redirect</li>
                <li>Complete Google authentication</li>
                <li>Check that form data appears in GHL with all fields</li>
              </ol>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}