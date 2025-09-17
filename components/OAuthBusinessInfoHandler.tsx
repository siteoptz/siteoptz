import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';

const OAuthBusinessInfoHandler: React.FC = () => {
  const { data: session, status } = useSession();
  const [processed, setProcessed] = useState(false);

  useEffect(() => {
    if (status === 'authenticated' && session?.user?.email && !processed) {
      // Check if there's pending OAuth business info
      const pendingInfo = sessionStorage.getItem('pendingOAuthBusinessInfo');
      
      if (pendingInfo) {
        try {
          const businessInfo = JSON.parse(pendingInfo);
          
          // Store business info on server for NextAuth callback to retrieve
          fetch('/api/get-oauth-business-info', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              action: 'store',
              email: session.user!.email,
              businessInfo: businessInfo
            }),
          }).then(response => {
            if (response.ok) {
              console.log('✅ Transferred business info to server for OAuth user');
              // Clear from sessionStorage
              sessionStorage.removeItem('pendingOAuthBusinessInfo');
              
              // Trigger a manual call to complete the registration with business info
              fetch('/api/complete-oauth-registration', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                  email: session.user!.email,
                  name: session.user!.name,
                  businessInfo: businessInfo
                }),
              }).then(response => {
                if (response.ok) {
                  console.log('✅ Completed OAuth registration with business info');
                } else {
                  console.error('❌ Failed to complete OAuth registration');
                }
              }).catch(error => {
                console.error('Error completing OAuth registration:', error);
              });
            } else {
              console.error('❌ Failed to store business info on server');
            }
          }).catch(error => {
            console.error('Error storing business info:', error);
          });
          
          setProcessed(true);
        } catch (error) {
          console.error('Error processing OAuth business info:', error);
          setProcessed(true);
        }
      } else {
        setProcessed(true);
      }
    }
  }, [session, status, processed]);

  return null; // This component doesn't render anything
};

export default OAuthBusinessInfoHandler;