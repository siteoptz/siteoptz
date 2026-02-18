import React, { useEffect, useState } from 'react';
import { signIn } from 'next-auth/react';
import { X, Loader2 } from 'lucide-react';

interface SignUpModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SignUpModal: React.FC<SignUpModalProps> = ({ isOpen, onClose }) => {
  const [loading, setLoading] = useState(false);

  const handleGoogleOAuth = async () => {
    setLoading(true);
    
    try {
      // Try to trigger form submission in the iframe
      const iframe = document.getElementById('inline-sugm3qdEBmvskAdbKwaS') as HTMLIFrameElement;
      
      if (iframe && iframe.contentWindow) {
        // Try to send a message to the iframe to submit the form
        try {
          iframe.contentWindow.postMessage({
            type: 'SUBMIT_FORM',
            formId: 'sugm3qdEBmvskAdbKwaS'
          }, '*');
          
          // Wait a moment for potential form submission
          setTimeout(() => {
            // Proceed with Google OAuth regardless of form submission success
            signIn('google', {
              callbackUrl: '/dashboard?signup=true',
              redirect: true
            });
          }, 2000);
          
        } catch (postMessageError) {
          console.log('PostMessage failed, proceeding with OAuth');
          // If postMessage fails, proceed with OAuth immediately
          await signIn('google', {
            callbackUrl: '/dashboard?signup=true',
            redirect: true
          });
        }
      } else {
        // If iframe not accessible, proceed with OAuth
        await signIn('google', {
          callbackUrl: '/dashboard?signup=true',
          redirect: true
        });
      }
      
    } catch (error) {
      console.error('Google OAuth error:', error);
      setLoading(false);
    }
  };
  useEffect(() => {
    if (isOpen) {
      // Load the GHL form embed script when modal opens
      const script = document.createElement('script');
      script.src = 'https://link.msgsndr.com/js/form_embed.js';
      script.async = true;
      script.onload = () => {
        console.log('GHL form script loaded');
      };
      document.head.appendChild(script);

      // Listen for messages from the iframe
      const handleMessage = (event: MessageEvent) => {
        // Listen for form submission success from GHL
        if (event.data && event.data.type === 'FORM_SUBMITTED') {
          console.log('GHL form submitted successfully');
        }
      };

      window.addEventListener('message', handleMessage);

      return () => {
        // Clean up script and event listener when modal closes
        const existingScript = document.querySelector('script[src="https://link.msgsndr.com/js/form_embed.js"]');
        if (existingScript) {
          document.head.removeChild(existingScript);
        }
        window.removeEventListener('message', handleMessage);
      };
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[60] p-4" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh' }}>
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
        onKeyDown={(e) => e.key === 'Escape' && onClose()}
        role="button"
        tabIndex={0}
        aria-label="Close modal"
      />
      
      {/* Modal */}
      <div className="relative bg-black border border-gray-800 rounded-xl max-w-2xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-800">
          <h2 className="text-xl font-bold text-white">
            Discovery Call Application
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Embedded GHL Form */}
        <div className="p-0 overflow-y-auto max-h-[calc(90vh-180px)] ghl-form-container">
          <style jsx>{`
            /* Show complete form but hide submit button area */
            .ghl-form-container {
              position: relative;
              overflow: hidden;
              height: 500px;
            }
            .ghl-form-container iframe {
              margin-bottom: -80px !important;
            }
          `}</style>
          <iframe
            src="https://api.leadconnectorhq.com/widget/form/sugm3qdEBmvskAdbKwaS"
            style={{
              width: '100%',
              height: '580px',
              border: 'none',
              marginBottom: '-80px'
            }}
            id="inline-sugm3qdEBmvskAdbKwaS" 
            data-layout="{'id':'INLINE'}"
            data-trigger-type="alwaysShow"
            data-trigger-value=""
            data-activation-type="alwaysActivated"
            data-activation-value=""
            data-deactivation-type="neverDeactivate"
            data-deactivation-value=""
            data-form-name="Discovery Call Application"
            data-height="580"
            data-layout-iframe-id="inline-sugm3qdEBmvskAdbKwaS"
            data-form-id="sugm3qdEBmvskAdbKwaS"
            title="Discovery Call Application"
          />
        </div>

        {/* Google OAuth and Existing User Options */}
        <div className="p-6 border-t border-gray-800 bg-black rounded-b-xl">
          {/* Instruction Text */}
          <p className="text-center text-gray-300 text-sm mb-4">
            Complete all fields above, then click below to submit your application and create your account
          </p>

          {/* Google OAuth Button */}
          <button
            onClick={handleGoogleOAuth}
            disabled={loading}
            className="w-full flex items-center justify-center gap-3 px-4 py-3 bg-white text-gray-900 rounded-lg font-semibold hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed mb-4"
          >
            {loading ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <>
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                Create Account with Google
              </>
            )}
          </button>

          {/* Existing User Link */}
          <p className="text-center text-gray-400 text-sm">
            Existing user?{' '}
            <button
              onClick={() => {
                onClose();
                signIn('google', { callbackUrl: '/dashboard' });
              }}
              className="text-cyan-400 hover:text-cyan-300 transition-colors"
            >
              Sign in here
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUpModal;