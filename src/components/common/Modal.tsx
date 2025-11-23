import React, { useEffect } from 'react';
import { CheckCircle, X } from '@phosphor-icons/react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  message: string | React.ReactNode;
  primaryButton?: {
    label: string;
    onClick: () => void;
  };
  secondaryButton?: {
    label: string;
    onClick: () => void;
  };
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  message,
  primaryButton,
  secondaryButton,
}) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 z-300 transition-opacity duration-300 animate-fade-in"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="fixed top-1/2 left-1/2 bg-white rounded-3xl z-301 w-[90%] max-w-[400px] shadow-[0_8px_32px_rgba(0,0,0,0.2)] animate-scale-in" style={{ transform: 'translate(-50%, -50%)' }}>
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 left-4 p-2 rounded-full hover:bg-gray-100 transition-colors duration-200 cursor-pointer border-none bg-transparent z-10"
          aria-label="بستن"
        >
          <X size={20} weight="bold" className="text-gray-600" />
        </button>

        {/* Content */}
        <div className="flex flex-col items-center text-center px-6 py-8">
          {/* Success Icon */}
          <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mb-4">
            <CheckCircle size={40} weight="fill" className="text-green-500" />
          </div>

          {/* Title */}
          <h3 className="text-xl font-bold text-gray-800 mb-2">{title}</h3>

          {/* Message */}
          <div className="text-sm text-gray-600 leading-relaxed mb-6">
            {typeof message === 'string' ? <p>{message}</p> : message}
          </div>

          {/* Buttons */}
          <div className="flex flex-col gap-3 w-full">
            {primaryButton && (
              <button
                onClick={primaryButton.onClick}
                className="w-full px-6 py-3 bg-linear-to-br from-primary-start to-primary-end text-white border-none rounded-xl text-sm font-semibold cursor-pointer transition-all duration-300 hover:shadow-[0_4px_12px_rgba(102,126,234,0.4)] hover:-translate-y-0.5 active:translate-y-0"
              >
                {primaryButton.label}
              </button>
            )}
            {secondaryButton && (
              <button
                onClick={secondaryButton.onClick}
                className="w-full px-6 py-3 bg-gray-100 text-gray-700 border-none rounded-xl text-sm font-semibold cursor-pointer transition-all duration-200 hover:bg-gray-200"
              >
                {secondaryButton.label}
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
