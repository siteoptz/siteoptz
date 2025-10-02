import React from 'react';
import { GetServerSideProps } from 'next';
import { getCleanDashboardProps, CleanDashboardProps } from '@/lib/server-side-auth';
import { CleanDashboardHeader } from '@/components/dashboard/CleanDashboardHeader';

interface StaticProDashboardProps extends CleanDashboardProps {
  activeTab: string;
}

export default function StaticProDashboard({ 
  session, 
  userPlan, 
  isAuthenticated,
  activeTab 
}: StaticProDashboardProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black">
      <CleanDashboardHeader userPlan={userPlan} currentPage={activeTab} />
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto">
          {/* Simple Static Content - No Dynamic Rendering */}
          <div className="bg-gray-800 rounded-xl p-8">
            <h1 className="text-3xl font-bold text-white mb-6">Pro Dashboard</h1>
            <p className="text-gray-400 mb-8">
              Welcome to your SiteOptz Pro dashboard. This is a completely static version to eliminate hydration issues.
            </p>
            
            {/* Static Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <div className="bg-gray-700 rounded-lg p-6">
                <h3 className="text-xl font-bold text-white mb-2">$24,567</h3>
                <p className="text-gray-400 text-sm">Total Revenue</p>
              </div>
              
              <div className="bg-gray-700 rounded-lg p-6">
                <h3 className="text-xl font-bold text-white mb-2">3.2x</h3>
                <p className="text-gray-400 text-sm">Average ROAS</p>
              </div>
              
              <div className="bg-gray-700 rounded-lg p-6">
                <h3 className="text-xl font-bold text-white mb-2">1,247</h3>
                <p className="text-gray-400 text-sm">Conversions</p>
              </div>
              
              <div className="bg-gray-700 rounded-lg p-6">
                <h3 className="text-xl font-bold text-white mb-2">$7,890</h3>
                <p className="text-gray-400 text-sm">Total Spend</p>
              </div>
            </div>
            
            {/* Static Info */}
            <div className="bg-gray-700 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-white mb-4">Dashboard Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-gray-400 text-sm">Current Tab:</p>
                  <p className="text-white font-medium">{activeTab}</p>
                </div>
                <div>
                  <p className="text-gray-400 text-sm">User:</p>
                  <p className="text-white font-medium">{userPlan.userName}</p>
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Plan:</p>
                  <p className="text-white font-medium">{userPlan.plan}</p>
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Status:</p>
                  <p className="text-white font-medium">{userPlan.status}</p>
                </div>
              </div>
            </div>
            
            {/* Static Message */}
            <div className="mt-8 p-6 bg-blue-900/20 border border-blue-500/30 rounded-lg">
              <h3 className="text-lg font-semibold text-blue-400 mb-2">Hydration Test</h3>
              <p className="text-gray-300 text-sm">
                This is a completely static dashboard with no dynamic content, conditional rendering, 
                or client-side state management to eliminate hydration errors.
              </p>
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
