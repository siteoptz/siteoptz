import React, { useEffect } from 'react';

interface RegisterModalProps {
  isOpen: boolean;
  onClose: () => void;
  planName?: string;
  [key: string]: any; // Allow any other props
}

const RegisterModal: React.FC<RegisterModalProps> = ({ isOpen, onClose }) => {
  useEffect(() => {
    if (isOpen) {
      // Close the modal and redirect to booking URL
      onClose();
      window.open('https://api.leadconnectorhq.com/widget/booking/yPjkVmsauPst8XlrOQUl', '_blank');
    }
  }, [isOpen, onClose]);

  return null; // This modal no longer renders any UI
};

export default RegisterModal;