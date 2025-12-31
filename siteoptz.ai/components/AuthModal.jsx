import { useEffect } from 'react';

export default function AuthModal() {
  useEffect(() => {
    // Listen for show login/register events and redirect instead
    const handleShowLogin = () => {
      window.open('https://api.leadconnectorhq.com/widget/booking/yPjkVmsauPst8XlrOQUl', '_blank');
    };
    
    const handleShowRegister = () => {
      window.open('https://api.leadconnectorhq.com/widget/booking/yPjkVmsauPst8XlrOQUl', '_blank');
    };
    
    window.addEventListener('siteoptz:show-login', handleShowLogin);
    window.addEventListener('siteoptz:show-register', handleShowRegister);
    
    // Check initial hash and redirect
    const hash = window.location.hash.toLowerCase();
    if (hash === '#login' || hash === '#/login' || hash === '#register' || hash === '#/register') {
      window.open('https://api.leadconnectorhq.com/widget/booking/yPjkVmsauPst8XlrOQUl', '_blank');
    }
    
    return () => {
      window.removeEventListener('siteoptz:show-login', handleShowLogin);
      window.removeEventListener('siteoptz:show-register', handleShowRegister);
    };
  }, []);

  // This component no longer renders any UI
  return null;
}