import React, { createContext, useContext, useState, useCallback } from 'react';

export interface Toast {
  id: string;
  message: string;
  type: 'primary' | 'secondary' | 'success' | 'error' | 'warning' | 'info';
  duration?: number;
  icon?: React.ReactNode;
}

interface ToastContextType {
  toasts: Toast[];
  addToast: (toast: Omit<Toast, 'id'>) => void;
  removeToast: (id: string) => void;
  primary: (message: string, duration?: number) => void;
  secondary: (message: string, duration?: number) => void;
  success: (message: string, duration?: number) => void;
  error: (message: string, duration?: number) => void;
  warning: (message: string, duration?: number) => void;
  info: (message: string, duration?: number) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};

interface ToastProviderProps {
  children: React.ReactNode;
  position?:
    | 'top-right'
    | 'top-left'
    | 'top-center'
    | 'bottom-right'
    | 'bottom-left'
    | 'bottom-center';
}

export const ToastProvider: React.FC<ToastProviderProps> = ({
  children,
  position = 'top-right',
}) => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  }, []);

  const addToast = useCallback(
    (toast: Omit<Toast, 'id'>) => {
      const id = Math.random().toString(36).substr(2, 9);
      const newToast = { ...toast, id };
      setToasts((prev) => [...prev, newToast]);

      const duration = toast.duration ?? 5000;
      if (duration > 0) {
        setTimeout(() => {
          removeToast(id);
        }, duration);
      }
    },
    [removeToast],
  );

  const primary = useCallback(
    (message: string, duration?: number) => {
      addToast({ message, type: 'primary', duration });
    },
    [addToast],
  );

  const secondary = useCallback(
    (message: string, duration?: number) => {
      addToast({ message, type: 'secondary', duration });
    },
    [addToast],
  );

  const success = useCallback(
    (message: string, duration?: number) => {
      addToast({ message, type: 'success', duration });
    },
    [addToast],
  );

  const error = useCallback(
    (message: string, duration?: number) => {
      addToast({ message, type: 'error', duration });
    },
    [addToast],
  );

  const warning = useCallback(
    (message: string, duration?: number) => {
      addToast({ message, type: 'warning', duration });
    },
    [addToast],
  );

  const info = useCallback(
    (message: string, duration?: number) => {
      addToast({ message, type: 'info', duration });
    },
    [addToast],
  );

  const positionClasses = {
    'top-right': 'top-4 right-4',
    'top-left': 'top-4 left-4',
    'top-center': 'top-4 left-1/2 -translate-x-1/2',
    'bottom-right': 'bottom-4 right-4',
    'bottom-left': 'bottom-4 left-4',
    'bottom-center': 'bottom-4 left-1/2 -translate-x-1/2',
  };

  return (
    <ToastContext.Provider
      value={{
        toasts,
        addToast,
        removeToast,
        primary,
        secondary,
        success,
        error,
        warning,
        info,
      }}
    >
      {children}
      <div className={`fixed z-50 ${positionClasses[position]} flex flex-col gap-2`}>
        {toasts.map((toast) => (
          <ToastItem key={toast.id} toast={toast} onClose={() => removeToast(toast.id)} />
        ))}
      </div>
    </ToastContext.Provider>
  );
};

interface ToastItemProps {
  toast: Toast;
  onClose: () => void;
}

const ToastItem: React.FC<ToastItemProps> = ({ toast, onClose }) => {
  const [isExiting, setIsExiting] = useState(false);
  const [isEntering, setIsEntering] = useState(true);

  React.useEffect(() => {
    const timer = setTimeout(() => setIsEntering(false), 50);
    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    setIsExiting(true);
    setTimeout(onClose, 300);
  };

  const typeStyles = {
    primary: 'bg-primary-500 text-white',
    secondary: 'bg-secondary-500 text-white',
    success: 'bg-success-500 text-white',
    error: 'bg-error-500 text-white',
    warning: 'bg-warning-500 text-white',
    info: 'bg-info-500 text-white',
  };

  const defaultIcons = {
    primary: '',
    secondary: '',
    success: <i className="ki-filled ki-check text-[20px]" />,
    error: <i className="ki-filled ki-cross text-[20px]" />,
    warning: <i className="ki-filled ki-information text-[20px]" />,
    info: <i className="ki-filled ki-information-2 text-[20px]" />,
  };

  return (
    <div
      className={`flex max-w-md min-w-75 items-center gap-3 rounded-lg px-4 py-3 shadow-lg transition-all duration-300 ease-out ${
        typeStyles[toast.type]
      } ${
        isExiting
          ? 'translate-x-full scale-95 opacity-0'
          : isEntering
            ? 'translate-x-8 scale-95 opacity-0'
            : 'translate-x-0 scale-100 opacity-100'
      }`}
      role="alert"
    >
      <span className="shrink-0">{toast.icon || defaultIcons[toast.type]}</span>
      <span className="flex-1 text-sm font-medium">{toast.message}</span>
      <button
        onClick={handleClose}
        className="flex h-6 w-6 shrink-0 cursor-pointer items-center justify-center rounded p-1 transition-colors hover:bg-white/20"
        aria-label="Kapat"
      >
        <i className="ki-filled ki-cross text-[16px]" />
      </button>
    </div>
  );
};
