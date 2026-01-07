import React from 'react';
import { ComponentProps } from '@/core/types/component';
import { Link } from 'react-router-dom';

interface ButtonProps extends ComponentProps {
  children?: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  isLoading?: boolean;
  to?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  fullWidth?: boolean;
}

const colorClasses = {
  primary:
    'bg-primary-500 text-white hover:bg-primary-600 active:bg-primary-900 disabled:bg-primary-200 disabled:text-gray-600',
  secondary:
    'bg-secondary-500 text-gray-500 hover:bg-secondary-600 hover:text-gray-950 active:bg-secondary-900 disabled:bg-secondary-200 disabled:text-gray-600',
  success:
    'bg-success-500 text-white hover:bg-success-600 active:bg-success-900 disabled:bg-success-200 disabled:text-gray-600',
  info: 'bg-info-500 text-white hover:bg-info-600 active:bg-info-900 disabled:bg-info-200 disabled:text-gray-600',
  warning:
    'bg-warning-500 text-white hover:bg-warning-600 active:bg-warning-900 disabled:bg-warning-200 disabled:text-gray-600',
  danger:
    'bg-error-500 text-white hover:bg-error-600 active:bg-error-900 disabled:bg-error-200 disabled:text-gray-600',
  brand:
    'bg-brand-600 text-white hover:bg-brand-600/90 active:bg-brand-600/80 disabled:bg-brand-50 disabled:text-gray-600',
  neutral:
    'bg-surface-secondary text-white hover:bg-neutral-300 active:bg-neutral-400 disabled:bg-neutral-100 disabled:text-gray-600 border border-border-primary',
  ghost:
    'bg-transparent text-white hover:bg-surface-secondary active:bg-neutral-200 disabled:text-gray-600',
};

const sizeClasses = {
  small: 'text-[12px] px-[12px] py-[10px]',
  medium: 'text-[13px] px-[12px] py-[10px]',
  large: 'text-[14px] px-[12px] py-[10px]',
};

const baseStyles =
  'inline-flex items-center justify-center rounded-[6px] font-medium cursor-pointer line-height-[13px] gap-1 transition-all duration-200 ease-in-out disabled:cursor-not-allowed disabled:bg-opacity-20';

const Button: React.FC<ButtonProps> = ({
  onClick,
  disabled,
  className,
  color = 'primary',
  size = 'medium',
  isLoading = false,
  to,
  children,
  leftIcon,
  rightIcon,
  fullWidth,
}) => {
  const buttonStyles = `${baseStyles} ${colorClasses[color]} ${sizeClasses[size]} ${className || ''} ${fullWidth ? 'w-full' : ''}`;

  const content = (
    <div className="flex items-center">
      {leftIcon && !isLoading && <span className="mr-1">{leftIcon}</span>}
      <>
        {isLoading ? (
          <>
            <LoadingSpinner /> <p className="text-opacity-50 text-black">Loading...</p>
          </>
        ) : (
          children
        )}
      </>
      {rightIcon && !isLoading && <span className="ml-1">{rightIcon}</span>}
    </div>
  );

  if (to && !disabled && !isLoading) {
    return (
      <Link to={to} className={buttonStyles}>
        {content}
      </Link>
    );
  }

  return (
    <button
      type="button"
      className={buttonStyles}
      onClick={onClick}
      disabled={disabled || isLoading}
    >
      {content}
    </button>
  );
};

export default Button;

const LoadingSpinner: React.FC = () => (
  <svg
    className="text-opacity-50 mr-2 h-5 w-5 animate-spin"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
  >
    <circle
      className="opacity-25"
      cx="12"
      cy="12"
      r="10"
      stroke="currentColor"
      strokeWidth="4"
    ></circle>
    <path
      className="opacity-75"
      fill="currentColor"
      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
    ></path>
  </svg>
);
