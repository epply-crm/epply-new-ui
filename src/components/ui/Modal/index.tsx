import React, { useEffect, useRef, useState } from 'react';
import { ComponentProps } from '@/core/types/component';

interface ModalProps extends Omit<ComponentProps, 'color'> {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
  showCloseButton?: boolean;
  closeOnOverlayClick?: boolean;
  closeOnEscape?: boolean;
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full';
}

const maxWidthClasses = {
  sm: 'max-w-sm',
  md: 'max-w-md',
  lg: 'max-w-lg',
  xl: 'max-w-xl',
  '2xl': 'max-w-2xl',
  full: 'max-w-full',
};

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  footer,
  showCloseButton = true,
  closeOnOverlayClick = true,
  closeOnEscape = true,
  maxWidth = 'md',
  size = 'medium',
  className = '',
}) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
      setTimeout(() => setIsAnimating(true), 10);
    } else {
      setIsAnimating(false);
      const timeout = setTimeout(() => setIsVisible(false), 200);
      return () => clearTimeout(timeout);
    }
  }, [isOpen]);

  useEffect(() => {
    if (!isVisible) return;

    const handleEscape = (e: KeyboardEvent) => {
      if (closeOnEscape && e.key === 'Escape') {
        onClose();
      }
    };

    document.body.style.overflow = 'hidden';
    document.addEventListener('keydown', handleEscape);

    return () => {
      document.body.style.overflow = 'unset';
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isVisible, onClose, closeOnEscape]);

  useEffect(() => {
    if (isAnimating && modalRef.current) {
      const focusableElements = modalRef.current.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
      );
      const firstElement = focusableElements[0] as HTMLElement;
      firstElement?.focus();
    }
  }, [isAnimating]);

  if (!isVisible) return null;

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (closeOnOverlayClick && e.target === e.currentTarget) {
      onClose();
    }
  };

  const sizeClasses = {
    small: 'py-3 px-5',
    medium: 'py-4 px-6',
    large: 'py-5 px-7',
  };

  return (
    <div
      className={`fixed inset-0 z-50 flex h-lvh items-center justify-center bg-black/50 p-4 transition-opacity duration-200 ${
        isAnimating ? 'opacity-100' : 'opacity-0'
      }`}
      onClick={handleOverlayClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby={title ? 'modal-title' : undefined}
    >
      <div
        ref={modalRef}
        className={`relative w-full ${maxWidthClasses[maxWidth]} rounded-lg bg-white shadow-xl transition-all duration-200 ${
          isAnimating ? 'scale-100 opacity-100' : 'scale-95 opacity-0'
        } ${className}`}
        role="document"
      >
        {(title || showCloseButton) && (
          <div
            className={`flex items-center justify-between border-b border-gray-200 ${sizeClasses[size]}`}
          >
            {title && (
              <h2 id="modal-title" className="text-lg font-semibold text-gray-900">
                {title}
              </h2>
            )}
            {showCloseButton && (
              <button
                onClick={onClose}
                className="ml-auto flex h-8 w-8 cursor-pointer items-center justify-center rounded-lg text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600"
                aria-label="Kapat"
              >
                <i className="ki-filled ki-cross text-[16px]" />
              </button>
            )}
          </div>
        )}

        <div
          className={`${sizeClasses[size]} ${!title && !showCloseButton ? 'pt-12' : ''}`}
        >
          {children}
        </div>

        {footer && (
          <div
            className={`flex items-center justify-end gap-2 border-t border-gray-200 ${sizeClasses[size]}`}
          >
            {footer}
          </div>
        )}
      </div>
    </div>
  );
};

export default Modal;
