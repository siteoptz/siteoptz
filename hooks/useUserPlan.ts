import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { UserPlan } from '../types/userPlan';

export const useUserPlan = () => {
  const { data: session, status } = useSession();
  const [userPlan, setUserPlan] = useState<UserPlan | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Only proceed if session status is resolved
    if (status === 'loading') return;
    
    if (session?.user) {
      fetchUserPlan();
    } else {
      setUserPlan(null);
      setLoading(false);
    }
  }, [session?.user?.email, status]); // Use email instead of user object to prevent unnecessary re-renders

  const fetchUserPlan = async () => {
    try {
      console.log('📋 Fetching user plan...');
      
      // Add timeout to prevent hanging
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout
      
      const response = await fetch('/api/user/plan', {
        signal: controller.signal
      });
      
      clearTimeout(timeoutId);
      
      if (!response.ok) {
        throw new Error(`Failed to fetch plan: ${response.status} ${response.statusText}`);
      }
      
      const plan = await response.json();
      console.log('📋 Successfully fetched user plan:', plan.plan);
      setUserPlan(plan);
    } catch (error) {
      console.error('Failed to fetch user plan:', error);
      console.log('📋 Falling back to default free plan');
      // Always fall back to free plan on any error
      setUserPlan(getDefaultFreePlan());
    } finally {
      setLoading(false);
    }
  };

  return { userPlan, loading, refetch: fetchUserPlan };
};

const getDefaultFreePlan = (): UserPlan => ({
  id: 'free',
  plan: 'free',
  status: 'active',
  billingCycle: 'monthly',
  startDate: new Date(),
  userName: 'User',
  features: [
    'Daily AI tool spotlight',
    'Basic tool comparisons',
    'Community support',
    'Basic implementation guides'
  ],
  limitations: [
    'Limited to 3 comparisons/day',
    'No expert consultation',
    'Limited tool access',
    'No team features'
  ],
  usage: { comparisons: 0, consultations: 0, teamMembers: 1 },
  limits: { dailyComparisons: 3, monthlyConsultations: 0, maxTeamMembers: 1 }
});