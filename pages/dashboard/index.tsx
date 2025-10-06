import { GetServerSideProps } from 'next';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../api/auth/[...nextauth]';
import { getUserPlan } from '../../utils/planAccessControl';

// This is a server-side router that redirects to the correct dashboard
// It runs on the server, so no client-side errors can occur
export default function DashboardRouter() {
  // This component should never render
  // Server-side redirect happens before reaching here
  return null;
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  try {
    // Get session
    const session = await getServerSession(context.req, context.res, authOptions);
    
    console.log('🚀 Dashboard Router - Session:', session?.user?.email);
    
    // If no session, redirect to signin
    if (!session?.user?.email) {
      console.log('❌ No session, redirecting to signin');
      return {
        redirect: {
          destination: '/auth/signin',
          permanent: false,
        },
      };
    }
    
    // Get user's actual plan from Stripe/GoHighLevel
    const userPlan = await getUserPlan(session.user.email);
    console.log(`✅ User plan detected: ${userPlan} for ${session.user.email}`);
    
    // Handle premium as pro (legacy support)
    const normalizedPlan = userPlan === 'premium' ? 'pro' : userPlan;
    
    // Validate plan
    const validPlans = ['free', 'starter', 'pro', 'enterprise'];
    const finalPlan = validPlans.includes(normalizedPlan) ? normalizedPlan : 'free';
    
    console.log(`🎯 Redirecting to /dashboard/${finalPlan}`);
    
    // Redirect to the correct dashboard
    return {
      redirect: {
        destination: `/dashboard/${finalPlan}`,
        permanent: false,
      },
    };
    
  } catch (error) {
    console.error('❌ Error in dashboard router:', error);
    
    // On error, redirect to free dashboard as fallback
    return {
      redirect: {
        destination: '/dashboard/free',
        permanent: false,
      },
    };
  }
};