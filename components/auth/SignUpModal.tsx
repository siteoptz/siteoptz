import React, { useEffect } from 'react';
import { X } from 'lucide-react';

interface SignUpModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SignUpModal: React.FC<SignUpModalProps> = ({ isOpen, onClose }) => {
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

      return () => {
        // Clean up script when modal closes (optional - could keep for performance)
        const existingScript = document.querySelector('script[src="https://link.msgsndr.com/js/form_embed.js"]');
        if (existingScript) {
          document.head.removeChild(existingScript);
        }
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
        <div className="p-0 overflow-y-auto max-h-[calc(90vh-80px)]">
          <iframe
            src="https://api.leadconnectorhq.com/widget/form/sugm3qdEBmvskAdbKwaS"
            style={{
              width: '100%',
              height: '600px',
              border: 'none',
              borderRadius: '0 0 12px 12px'
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
            data-height="600"
            data-layout-iframe-id="inline-sugm3qdEBmvskAdbKwaS"
            data-form-id="sugm3qdEBmvskAdbKwaS"
            title="Discovery Call Application"
          />
        </div>
      </div>
    </div>
  );
};

export default SignUpModal;