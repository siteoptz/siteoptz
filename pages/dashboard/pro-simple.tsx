import React from 'react';
import { GetServerSideProps } from 'next';
import { getServerSession } from 'next-auth/next';
import { Session } from 'next-auth';
import { authOptions } from '../api/auth/[...nextauth]';

interface SimpleDashboardProps {
  session: Session | null;
}

export default function SimpleDashboard({ session }: SimpleDashboardProps) {
  if (!session) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black flex items-center justify-center">
        <div className="text-white text-xl">Please log in to access the dashboard</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black">
      <div className="container mx-auto px-4 py-8">
        <div className="bg-black border border-gray-800 rounded-lg p-6">
          <h1 className="text-3xl font-bold text-white mb-4">Pro Dashboard</h1>
          <p className="text-gray-300 mb-6">Welcome, {session.user?.name || session.user?.email}</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-gray-800 border border-gray-700 rounded-lg p-4">
              <h3 className="text-lg font-semibold text-white mb-2">Google Ads Integration</h3>
              <p className="text-gray-400 text-sm mb-4">Connect your Google Ads account to track ROI</p>
              <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded hover:from-blue-700 hover:to-purple-700">
                Connect Google Ads
              </button>
            </div>
            
            <div className="bg-gray-800 border border-gray-700 rounded-lg p-4">
              <h3 className="text-lg font-semibold text-white mb-2">Analytics</h3>
              <p className="text-gray-400 text-sm mb-4">View your performance metrics</p>
              <button className="bg-gradient-to-r from-green-600 to-blue-600 text-white px-4 py-2 rounded hover:from-green-700 hover:to-blue-700">
                View Analytics
              </button>
            </div>
            
            <div className="bg-gray-800 border border-gray-700 rounded-lg p-4">
              <h3 className="text-lg font-semibold text-white mb-2">ROI Dashboard</h3>
              <p className="text-gray-400 text-sm mb-4">Track your return on investment</p>
              <button className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-2 rounded hover:from-purple-700 hover:to-pink-700">
                View ROI
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getServerSession(context.req, context.res, authOptions);
  
  if (!session) {
    return {
      redirect: {
        destination: '/auth/signin',
        permanent: false,
      },
    };
  }

  return {
    props: {
      session,
    },
  };
};