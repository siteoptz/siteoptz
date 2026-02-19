import React, { useState } from 'react';
import { signIn } from 'next-auth/react';
import { X } from 'lucide-react';
import ExistingUserModal from './ExistingUserModal';

interface SignUpModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SignUpModal: React.FC<SignUpModalProps> = ({ isOpen, onClose }) => {
  const [showExistingUserModal, setShowExistingUserModal] = useState(false);
  const [existingUserData, setExistingUserData] = useState<any>(null);

  // Handle when form detects existing user
  const handleExistingUser = (userEmail: string, userData: any) => {
    setExistingUserData({ email: userEmail, ...userData });
    setShowExistingUserModal(true);
  };

  // Listen for form submission events from the GHL iframe
  React.useEffect(() => {
    const handleMessage = async (event: MessageEvent) => {
      // Check if message is from GHL form
      if (event.origin !== 'https://api.leadconnectorhq.com') return;
      
      try {
        const data = event.data;
        
        // Check if this is a form submission event
        if (data.type === 'form_submit' || data.eventType === 'submit') {
          console.log('🔍 GHL form submitted, checking for existing user...');
          
          const email = data.email || data.formData?.email;
          
          if (email) {
            // Check if user exists before allowing form to proceed
            const response = await fetch('/api/check-user-exists', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ email })
            });

            const result = await response.json();
            
            if (result.exists) {
              console.log('⚠️ Existing user detected, showing sign-in modal');
              handleExistingUser(email, result.contact);
              return; // Prevent form submission
            }
          }
        }
      } catch (error) {
        console.error('Error handling form message:', error);
      }
    };

    if (isOpen) {
      window.addEventListener('message', handleMessage);
    }

    return () => {
      window.removeEventListener('message', handleMessage);
    };
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

        {/* GHL Embedded Form */}
        <div className="overflow-y-auto max-h-[calc(90vh-180px)]">
          <iframe
            src="https://api.leadconnectorhq.com/widget/form/sugm3qdEBmvskAdbKwaS"
            style={{
              width: '100%',
              height: '880px',
              border: 'none',
              borderRadius: '3px'
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
            data-height="880"
            data-layout-iframe-id="inline-sugm3qdEBmvskAdbKwaS"
            data-form-id="sugm3qdEBmvskAdbKwaS"
            title="Discovery Call Application"
          />
        </div>

        {/* Instructions */}
        <div className="p-4 border-t border-gray-800 bg-black rounded-b-xl">
          <p className="text-center text-gray-300 text-sm">
            Complete the form above to submit your discovery call application. You&apos;ll be redirected to create your account after submission.
          </p>
          
          <p className="text-center text-gray-400 text-xs mt-2">
            Existing user?{' '}
            <button
              onClick={() => {
                onClose();
                signIn('google', { callbackUrl: '/dashboard/free' });
              }}
              className="text-cyan-400 hover:text-cyan-300 transition-colors"
            >
              Sign in here
            </button>
          </p>
        </div>
      </div>

      {/* Existing User Modal */}
      {showExistingUserModal && existingUserData && (
        <ExistingUserModal
          isOpen={showExistingUserModal}
          onClose={() => {
            setShowExistingUserModal(false);
            setExistingUserData(null);
          }}
          userEmail={existingUserData.email}
          userName={existingUserData.name}
        />
      )}
    </div>
  );
};

export default SignUpModal;