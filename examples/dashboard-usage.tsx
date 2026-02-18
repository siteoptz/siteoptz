// Example: How to use qualifying data in your React components

import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';

export default function DashboardExample() {
  const { data: session } = useSession();
  const router = useRouter();
  const [qualifyingData, setQualifyingData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchQualifyingData = async () => {
      if (!session?.user?.email) return;

      try {
        // Method 1: Check if this is a new signup from URL
        const { signup, email } = router.query;
        
        if (signup === 'true') {
          console.log('🔍 New signup detected, fetching qualifying data...');
          
          // Try API bridge first
          const response = await fetch(`/api/qualifying-data?email=${encodeURIComponent(session.user.email)}`);
          
          if (response.ok) {
            const result = await response.json();
            if (result.data) {
              setQualifyingData(result.data);
              console.log('✅ Retrieved qualifying data:', result.data);
              
              // Clean up URL parameters
              router.replace('/dashboard', undefined, { shallow: true });
              return;
            }
          }
          
          // Fallback: Check sessionStorage
          const sessionData = sessionStorage.getItem('signup_qualifying_data');
          if (sessionData) {
            const parsed = JSON.parse(sessionData);
            setQualifyingData(parsed);
            console.log('✅ Retrieved from sessionStorage:', parsed);
            
            // Clean up sessionStorage
            sessionStorage.removeItem('signup_qualifying_data');
            return;
          }
          
          // Fallback: Check URL parameters
          const encodedData = router.query.qualifying;
          if (encodedData && typeof encodedData === 'string') {
            try {
              const decodedData = JSON.parse(decodeURIComponent(encodedData));
              const qualifyingObj = {
                business: decodedData.b,
                bottlenecks: decodedData.bt,
                currentAIUsage: decodedData.ai,
                priorityOutcome: decodedData.po
              };
              setQualifyingData(qualifyingObj);
              console.log('✅ Retrieved from URL:', qualifyingObj);
              
              // Clean up URL
              router.replace('/dashboard', undefined, { shallow: true });
              return;
            } catch (error) {
              console.error('❌ Error parsing URL data:', error);
            }
          }
        }
      } catch (error) {
        console.error('❌ Error fetching qualifying data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchQualifyingData();
  }, [session, router]);

  // Use the qualifying data
  useEffect(() => {
    if (qualifyingData) {
      console.log('📋 User qualifying data available:', qualifyingData);
      
      // Example: Show a welcome message based on their answers
      // Example: Customize dashboard based on their bottlenecks
      // Example: Trigger specific onboarding flow
      
      // Send to analytics, show personalized content, etc.
    }
  }, [qualifyingData]);

  if (loading && router.query.signup === 'true') {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-white">Loading your personalized dashboard...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <h1>Welcome to your dashboard!</h1>
      
      {qualifyingData && (
        <div className="mt-6 p-4 bg-gray-900 rounded-lg">
          <h2 className="text-lg font-bold mb-2">Your Discovery Call Application:</h2>
          <div className="space-y-2 text-sm text-gray-300">
            <p><strong>Business:</strong> {qualifyingData.business || 'Not provided'}</p>
            <p><strong>Main Bottlenecks:</strong> {qualifyingData.bottlenecks}</p>
            <p><strong>Current AI Usage:</strong> {qualifyingData.currentAIUsage}</p>
            <p><strong>Priority Outcome:</strong> {qualifyingData.priorityOutcome}</p>
          </div>
        </div>
      )}
      
      {/* Rest of your dashboard content */}
    </div>
  );
}