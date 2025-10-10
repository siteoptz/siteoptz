import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { GetServerSideProps } from 'next';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../api/auth/[...nextauth]';
import { getUserPlanServerSide } from '../../lib/server-side-auth';

interface DashboardRedirectProps {
  userPlan: string;
  redirectUrl: string;
}

export default function DashboardRedirect({ userPlan, redirectUrl }: DashboardRedirectProps) {
  const router = useRouter();
  
  useEffect(() => {
    // Redirect to plan-specific dashboard
    router.push(redirectUrl);
  }, [router, redirectUrl]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-500 mx-auto mb-4"></div>
        <p className="text-white text-lg">Redirecting to your {userPlan} dashboard...</p>
        <p className="text-gray-400 text-sm mt-2">Taking you to the right place</p>
      </div>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getServerSession(context.req, context.res, authOptions);
  
  if (!session || !session.user?.email) {
    return {
      redirect: {
        destination: '/api/auth/signin',
        permanent: false,
      },
    };
  }

  // Get user's actual plan from server-side detection with enhanced debugging
  console.log(`🔍 Dashboard Router: Starting plan detection for ${session.user.email}`);
  console.log(`🔍 Session data:`, JSON.stringify(session, null, 2));
  
  const userPlanData = await getUserPlanServerSide(session.user.email);
  const userPlan = userPlanData.plan;
  
  console.log(`🔍 Detected plan data:`, JSON.stringify(userPlanData, null, 2));
  console.log(`🔍 Final plan:`, userPlan);
  
  // Redirect to plan-specific dashboard page
  const planDashboardUrl = `/dashboard/${userPlan}`;
  
  console.log(`🚀 Dashboard router: Redirecting ${session.user.email} with ${userPlan} plan to ${planDashboardUrl}`);
  
  return {
    redirect: {
      destination: planDashboardUrl,
      permanent: false,
    },
  };
};