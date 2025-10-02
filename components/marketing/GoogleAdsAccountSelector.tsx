// components/marketing/GoogleAdsAccountSelector.tsx
import { useState, useEffect } from 'react';
import { GoogleAdsAccount, GoogleAdsManagerAccount } from '@/lib/google-ads-api';

interface GoogleAdsAccountSelectorProps {
  isOpen: boolean;
  onClose: () => void;
  onAccountSelect: (account: GoogleAdsAccount) => void;
  accounts: GoogleAdsAccount[];
  hierarchy?: GoogleAdsManagerAccount[];
  loading?: boolean;
  error?: string;
}

export default function GoogleAdsAccountSelector({
  isOpen,
  onClose,
  onAccountSelect,
  accounts,
  hierarchy,
  loading = false,
  error
}: GoogleAdsAccountSelectorProps) {
  const [selectedAccount, setSelectedAccount] = useState<GoogleAdsAccount | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  // Filter accounts based on search term
  const filteredAccounts = accounts.filter(account =>
    account.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    account.id.includes(searchTerm) ||
    account.descriptiveName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAccountSelect = (account: GoogleAdsAccount) => {
    setSelectedAccount(account);
  };

  const handleConfirmSelection = () => {
    if (selectedAccount) {
      onAccountSelect(selectedAccount);
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-black border border-gray-800 rounded-lg p-6 w-full max-w-4xl max-h-[80vh] overflow-hidden">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-white">Select Google Ads Account</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {loading && (
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-cyan-400"></div>
            <span className="ml-3 text-gray-300">Loading Google Ads accounts...</span>
          </div>
        )}

        {error && (
          <div className="bg-red-900 border border-red-600 rounded-lg p-4 mb-6">
            <div className="flex items-center">
              <svg className="w-5 h-5 text-red-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="text-red-200">{error}</span>
            </div>
          </div>
        )}

        {!loading && !error && (
          <>
            {/* Search Bar */}
            <div className="mb-6">
              <input
                type="text"
                placeholder="Search accounts by name or ID..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:border-cyan-400 focus:outline-none"
              />
            </div>

            {/* Account Count */}
            <div className="mb-4">
              <p className="text-gray-300">
                Found {filteredAccounts.length} account{filteredAccounts.length !== 1 ? 's' : ''}
                {searchTerm && ` matching "${searchTerm}"`}
              </p>
            </div>

            {/* Accounts List */}
            <div className="max-h-96 overflow-y-auto mb-6">
              {filteredAccounts.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-gray-400">
                    {searchTerm ? 'No accounts match your search.' : 'No Google Ads accounts found.'}
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  {filteredAccounts.map((account) => (
                    <div
                      key={account.id}
                      onClick={() => handleAccountSelect(account)}
                      className={`p-4 border rounded-lg cursor-pointer transition-all ${
                        selectedAccount?.id === account.id
                          ? 'border-cyan-400 bg-cyan-400 bg-opacity-10'
                          : 'border-gray-700 hover:border-gray-600 bg-gray-900 hover:bg-gray-800'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3">
                            <h3 className="text-white font-medium">
                              {account.name || account.descriptiveName || `Account ${account.id}`}
                            </h3>
                            
                            {/* Account Type Badges */}
                            <div className="flex space-x-2">
                              {account.manager && (
                                <span className="px-2 py-1 bg-purple-600 text-purple-100 text-xs rounded-full">
                                  Manager
                                </span>
                              )}
                              {account.testAccount && (
                                <span className="px-2 py-1 bg-yellow-600 text-yellow-100 text-xs rounded-full">
                                  Test
                                </span>
                              )}
                              {account.canManageClients && (
                                <span className="px-2 py-1 bg-blue-600 text-blue-100 text-xs rounded-full">
                                  MCC
                                </span>
                              )}
                            </div>
                          </div>

                          <div className="mt-2 space-y-1">
                            <p className="text-gray-400 text-sm">
                              <span className="font-medium">ID:</span> {account.id}
                            </p>
                            {account.descriptiveName && account.descriptiveName !== account.name && (
                              <p className="text-gray-400 text-sm">
                                <span className="font-medium">Description:</span> {account.descriptiveName}
                              </p>
                            )}
                            <div className="flex space-x-4 text-gray-400 text-sm">
                              <span>
                                <span className="font-medium">Currency:</span> {account.currencyCode}
                              </span>
                              <span>
                                <span className="font-medium">Timezone:</span> {account.timeZone}
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Selection Radio */}
                        <div className="ml-4">
                          <div className={`w-4 h-4 rounded-full border-2 ${
                            selectedAccount?.id === account.id
                              ? 'border-cyan-400 bg-cyan-400'
                              : 'border-gray-500'
                          }`}>
                            {selectedAccount?.id === account.id && (
                              <div className="w-2 h-2 bg-white rounded-full m-0.5"></div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end space-x-4">
              <button
                onClick={onClose}
                className="px-6 py-2 border border-gray-600 text-gray-300 rounded-lg hover:bg-gray-800 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmSelection}
                disabled={!selectedAccount}
                className={`px-6 py-2 rounded-lg transition-colors ${
                  selectedAccount
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700'
                    : 'bg-gray-700 text-gray-400 cursor-not-allowed'
                }`}
              >
                Connect Selected Account
              </button>
            </div>

            {/* Selected Account Summary */}
            {selectedAccount && (
              <div className="mt-4 p-4 bg-cyan-400 bg-opacity-10 border border-cyan-400 rounded-lg">
                <h4 className="text-cyan-400 font-medium mb-2">Selected Account:</h4>
                <p className="text-white">
                  {selectedAccount.name || selectedAccount.descriptiveName} (ID: {selectedAccount.id})
                </p>
                <p className="text-gray-300 text-sm">
                  {selectedAccount.currencyCode} • {selectedAccount.timeZone}
                  {selectedAccount.manager && ' • Manager Account'}
                  {selectedAccount.testAccount && ' • Test Account'}
                </p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}