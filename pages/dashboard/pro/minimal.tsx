import React from 'react';
import { GetServerSideProps } from 'next';
import { getCleanDashboardProps, CleanDashboardProps } from '@/lib/server-side-auth';
import { CleanDashboardHeader } from '@/components/dashboard/CleanDashboardHeader';

interface MinimalProDashboardProps extends CleanDashboardProps {
  activeTab: string;
}

export default function MinimalProDashboard({ 
  session, 
  userPlan, 
  isAuthenticated,
  activeTab 
}: MinimalProDashboardProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black">
      <CleanDashboardHeader userPlan={userPlan} currentPage={activeTab} />
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto">
          {/* Simple Static Content */}
          <div className="bg-gray-800 rounded-lg p-8">
            <h1 className="text-2xl font-bold text-white mb-4">Pro Dashboard</h1>
            <p className="text-gray-400 mb-6">
              Welcome to your SiteOptz Pro dashboard. This is a minimal version to test hydration.
            </p>
            
            {/* Simple Static Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-gray-700 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-white mb-2">Overview</h3>
                <p className="text-gray-400 text-sm">Dashboard overview content</p>
              </div>
              
              <div className="bg-gray-700 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-white mb-2">ROI Dashboard</h3>
                <p className="text-gray-400 text-sm">Marketing ROI analytics</p>
              </div>
              
              <div className="bg-gray-700 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-white mb-2">Platforms</h3>
                <p className="text-gray-400 text-sm">Platform connections</p>
              </div>
            </div>
            
            {/* Static Info */}
            <div className="mt-8 p-4 bg-gray-700 rounded-lg">
              <h3 className="text-lg font-semibold text-white mb-2">Current Tab: {activeTab}</h3>
              <p className="text-gray-400 text-sm">User: {userPlan.userName}</p>
              <p className="text-gray-400 text-sm">Plan: {userPlan.plan}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { tab } = context.query;
  const activeTab = (tab as string) || 'overview';

  // Get dashboard props with Pro plan requirement
  const dashboardProps = await getCleanDashboardProps(context, 'pro');
  
  if ('redirect' in dashboardProps) {
    return dashboardProps;
  }

  return {
    props: {
      ...dashboardProps.props,
      activeTab
    }
  };
};
