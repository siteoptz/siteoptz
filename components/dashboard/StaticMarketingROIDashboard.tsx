import React from 'react';
import { CleanGoogleAdsData, CleanGoogleAdsConnection } from '@/lib/clean-google-ads';

interface StaticMarketingROIDashboardProps {
  googleAdsData: CleanGoogleAdsData | null;
  googleAdsConnection: CleanGoogleAdsConnection;
  dateRange: string;
}

export default function StaticMarketingROIDashboard({ 
  googleAdsData,
  googleAdsConnection,
  dateRange 
}: StaticMarketingROIDashboardProps) {
  if (!googleAdsData) {
    return (
      <div className="bg-gray-800 rounded-xl p-8">
        <h2 className="text-2xl font-bold text-white mb-6">Marketing ROI Dashboard</h2>
        <div className="text-center py-12">
          <p className="text-gray-400">No data available. Please connect your marketing platforms.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-800 rounded-xl p-8">
      <h2 className="text-2xl font-bold text-white mb-6">Marketing ROI Dashboard</h2>
      
      {/* Static Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-gray-700 rounded-lg p-6">
          <h3 className="text-2xl font-bold text-white mb-1">
            ${googleAdsData.metrics.total_spend.toLocaleString()}
          </h3>
          <p className="text-gray-400 text-sm">Total Spend</p>
        </div>
        
        <div className="bg-gray-700 rounded-lg p-6">
          <h3 className="text-2xl font-bold text-white mb-1">
            {googleAdsData.metrics.total_conversions.toLocaleString()}
          </h3>
          <p className="text-gray-400 text-sm">Total Conversions</p>
        </div>
        
        <div className="bg-gray-700 rounded-lg p-6">
          <h3 className="text-2xl font-bold text-white mb-1">
            {googleAdsData.metrics.total_roas.toFixed(2)}x
          </h3>
          <p className="text-gray-400 text-sm">ROAS</p>
        </div>
        
        <div className="bg-gray-700 rounded-lg p-6">
          <h3 className="text-2xl font-bold text-white mb-1">
            {googleAdsData.metrics.total_conversions.toLocaleString()}
          </h3>
          <p className="text-gray-400 text-sm">Conversions</p>
        </div>
      </div>

      {/* Static Campaigns Table */}
      <div className="bg-gray-700 rounded-lg p-6">
        <h3 className="text-xl font-semibold text-white mb-4">Campaigns</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-600">
                <th className="text-left py-3 px-4 text-gray-300 font-medium">Campaign</th>
                <th className="text-right py-3 px-4 text-gray-300 font-medium">Spend</th>
                <th className="text-right py-3 px-4 text-gray-300 font-medium">Revenue</th>
                <th className="text-right py-3 px-4 text-gray-300 font-medium">ROI</th>
              </tr>
            </thead>
            <tbody>
              {googleAdsData.campaigns.slice(0, 5).map((campaign, index) => (
                <tr key={index} className="border-b border-gray-600">
                  <td className="py-3 px-4 text-white">{campaign.name}</td>
                  <td className="py-3 px-4 text-right text-white">
                    ${campaign.spent.toLocaleString()}
                  </td>
                  <td className="py-3 px-4 text-right text-white">
                    ${(campaign.conversions * campaign.cost_per_conversion).toLocaleString()}
                  </td>
                  <td className="py-3 px-4 text-right text-green-400 font-semibold">
                    {campaign.roas.toFixed(2)}x
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Static Info */}
      <div className="mt-6 text-center text-gray-400 text-sm">
        Last updated: {googleAdsData.lastUpdated.split('T')[0]}
      </div>
    </div>
  );
}
