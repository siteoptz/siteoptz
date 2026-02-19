import React, { useState, useEffect } from 'react';

export default function OAuthLogs() {
  const [logs, setLogs] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [autoRefresh, setAutoRefresh] = useState(false);

  const fetchLogs = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/debug/oauth-logs');
      const data = await response.json();
      setLogs(data.logs || []);
    } catch (error) {
      console.error('Error fetching logs:', error);
    }
    setLoading(false);
  };

  const clearLogs = async () => {
    try {
      await fetch('/api/debug/oauth-logs', { method: 'DELETE' });
      setLogs([]);
    } catch (error) {
      console.error('Error clearing logs:', error);
    }
  };

  useEffect(() => {
    fetchLogs();
  }, []);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (autoRefresh) {
      interval = setInterval(fetchLogs, 2000); // Refresh every 2 seconds
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [autoRefresh]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black p-4">
      <div className="max-w-6xl mx-auto">
        <div className="bg-black border border-gray-800 rounded-xl p-6">
          <h1 className="text-3xl font-bold text-white mb-6">Real-Time OAuth Logs</h1>
          
          <div className="flex space-x-4 mb-6">
            <button
              onClick={fetchLogs}
              disabled={loading}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
            >
              {loading ? 'Loading...' : 'Refresh Logs'}
            </button>
            
            <button
              onClick={() => setAutoRefresh(!autoRefresh)}
              className={`px-4 py-2 rounded text-white ${
                autoRefresh ? 'bg-green-600 hover:bg-green-700' : 'bg-gray-600 hover:bg-gray-700'
              }`}
            >
              {autoRefresh ? 'Auto-Refresh ON' : 'Auto-Refresh OFF'}
            </button>
            
            <button
              onClick={clearLogs}
              className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
            >
              Clear Logs
            </button>
          </div>

          <div className="bg-gray-900 rounded-lg p-4 border border-gray-700">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold text-white">
                OAuth Callback Logs ({logs.length})
              </h2>
              {autoRefresh && (
                <div className="flex items-center text-green-400 text-sm">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse mr-2"></div>
                  Auto-refreshing...
                </div>
              )}
            </div>
            
            <div className="max-h-96 overflow-y-auto">
              {logs.length === 0 ? (
                <div className="text-gray-400 text-center py-8">
                  No OAuth logs yet. Try signing in through your form to see logs appear here.
                </div>
              ) : (
                <div className="space-y-1">
                  {logs.map((log, index) => (
                    <div
                      key={index}
                      className={`p-2 rounded text-sm font-mono ${
                        log.includes('✅') ? 'text-green-400 bg-green-900/20' :
                        log.includes('❌') ? 'text-red-400 bg-red-900/20' :
                        log.includes('🔍') ? 'text-yellow-400 bg-yellow-900/20' :
                        log.includes('🔄') ? 'text-blue-400 bg-blue-900/20' :
                        'text-gray-300'
                      }`}
                    >
                      {log}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="mt-6 p-4 bg-gray-800 rounded border border-gray-700">
            <h3 className="text-white font-medium mb-2">How to Use:</h3>
            <ol className="text-gray-300 text-sm space-y-1 list-decimal list-inside">
              <li>Turn on &quot;Auto-Refresh&quot; to see logs in real-time</li>
              <li>Go to your signup modal and complete the OAuth flow</li>
              <li>Watch the logs appear here to see exactly what happens during OAuth</li>
              <li>Look for &quot;RETRIEVED STORED FORM DATA&quot; messages to confirm data transfer</li>
            </ol>
            <div className="mt-4 p-3 bg-blue-900 border border-blue-600 rounded">
              <p className="text-blue-200 text-sm">
                <strong>Note:</strong> These logs show the actual production OAuth callback process, 
                so you&apos;ll see exactly what happens when users sign up through your real form.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}