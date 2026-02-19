import React from 'react';
import { signIn } from 'next-auth/react';
import { X } from 'lucide-react';

interface SignUpModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SignUpModal: React.FC<SignUpModalProps> = ({ isOpen, onClose }) => {

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
    </div>
  );
};

export default SignUpModal;