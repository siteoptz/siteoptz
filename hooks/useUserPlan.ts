import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { UserPlan } from '../types/userPlan';

export const useUserPlan = () => {
  const { data: session } = useSession();
  const [userPlan, setUserPlan] = useState<UserPlan | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (session?.user) {
      fetchUserPlan();
    } else {
      setUserPlan(null);
      setLoading(false);
    }
  }, [session]);

  const fetchUserPlan = async () => {
    try {
      const response = await fetch('/api/user/plan');
      const plan = await response.json();
      setUserPlan(plan);
    } catch (error) {
      console.error('Failed to fetch user plan:', error);
      // Default to free plan
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