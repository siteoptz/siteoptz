import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { GetServerSideProps } from 'next';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../api/auth/[...nextauth]';

export default function DashboardRedirect() {
  const router = useRouter();
  
  useEffect(() => {
    // Redirect to optz.siteoptz.ai dashboard
    window.location.href = 'https://optz.siteoptz.ai/dashboard';
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-500 mx-auto mb-4"></div>
        <p className="text-white text-lg">Redirecting to dashboard...</p>
        <p className="text-gray-400 text-sm mt-2">Taking you to optz.siteoptz.ai</p>
      </div>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getServerSession(context.req, context.res, authOptions);
  
  if (!session) {
    return {
      redirect: {
        destination: '/api/auth/signin',
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};