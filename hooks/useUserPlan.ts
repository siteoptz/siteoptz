import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { UserPlan } from '../types/userPlan';

export const useUserPlan = () => {
  const { data: session } = useSession();
  const [userPlan, setUserPlan] = useState<UserPlan | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Debounce the API call to prevent rapid successive requests
    const timeoutId = setTimeout(() => {
      if (session?.user) {
        fetchUserPlan();
      } else {
        setUserPlan(null);
        setLoading(false);
      }
    }, 100); // 100ms debounce
    
    return () => clearTimeout(timeoutId);
  }, [session]);
  
  // Also refetch when window regains focus to ensure fresh data
  useEffect(() => {
    const handleFocus = () => {
      if (session?.user) {
        console.log('Window focused - refreshing user plan');
        fetchUserPlan();
      }
    };
    
    window.addEventListener('focus', handleFocus);
    return () => window.removeEventListener('focus', handleFocus);
  }, [session]);

  const fetchUserPlan = async () => {
    try {
      // Add cache busting to ensure fresh data
      const response = await fetch(`/api/user/plan?t=${Date.now()}`);
      
      if (!response.ok) {
        throw new Error(`Failed to fetch plan: ${response.status}`);
      }
      
      const plan = await response.json();
      console.log('📋 Fetched user plan:', plan.plan);
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