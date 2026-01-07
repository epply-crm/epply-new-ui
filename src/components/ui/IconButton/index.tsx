import React from 'react';
import { ComponentProps } from '@/core/types/component';
import { Link } from 'react-router-dom';

interface IconButtonProps extends Omit<ComponentProps, 'color'> {
  icon: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  to?: string;
  variant?: 'filled' | 'outlined' | 'ghost';
  color?: 'primary' | 'secondary' | 'success' | 'info' | 'warning' | 'danger' | 'neutral';
  rounded?: boolean;
  ariaLabel?: string;
}

const colorClasses = {
  filled: {
    primary: 'bg-primary-500 text-white hover:bg-primary-600 active:bg-primary-700',
    secondary:
      'bg-secondary-500 text-gray-700 hover:bg-secondary-600 active:bg-secondary-700',
    success: 'bg-success-500 text-white hover:bg-success-600 active:bg-success-700',
    info: 'bg-info-500 text-white hover:bg-info-600 active:bg-info-700',
    warning: 'bg-warning-500 text-white hover:bg-warning-600 active:bg-warning-700',
    danger: 'bg-error-500 text-white hover:bg-error-600 active:bg-error-700',
    neutral: 'bg-gray-200 text-gray-700 hover:bg-gray-300 active:bg-gray-400',
  },
  outlined: {
    primary:
      'border border-primary-500 text-primary-500 hover:bg-primary-50 active:bg-primary-100',
    secondary:
      'border border-secondary-500 text-gray-700 hover:bg-secondary-50 active:bg-secondary-100',
    success:
      'border border-success-500 text-success-500 hover:bg-success-50 active:bg-success-100',
    info: 'border border-info-500 text-info-500 hover:bg-info-50 active:bg-info-100',
    warning:
      'border border-warning-500 text-warning-500 hover:bg-warning-50 active:bg-warning-100',
    danger:
      'border border-error-500 text-error-500 hover:bg-error-50 active:bg-error-100',
    neutral: 'border border-gray-300 text-gray-700 hover:bg-gray-50 active:bg-gray-100',
  },
  ghost: {
    primary: 'text-primary-500 hover:bg-primary-50 active:bg-primary-100',
    secondary: 'text-gray-700 hover:bg-secondary-50 active:bg-secondary-100',
    success: 'text-success-500 hover:bg-success-50 active:bg-success-100',
    info: 'text-info-500 hover:bg-info-50 active:bg-info-100',
    warning: 'text-warning-500 hover:bg-warning-50 active:bg-warning-100',
    danger: 'text-error-500 hover:bg-error-50 active:bg-error-100',
    neutral: 'text-gray-700 hover:bg-gray-100 active:bg-gray-200',
  },
};

const sizeClasses = {
  small: 'h-8 w-8 text-[16px]',
  medium: 'h-10 w-10 text-[18px]',
  large: 'h-12 w-12 text-[20px]',
};

const baseStyles =
  'inline-flex items-center justify-center font-medium cursor-pointer transition-all duration-200 ease-in-out disabled:cursor-not-allowed disabled:opacity-50';

const IconButton: React.FC<IconButtonProps> = ({
  icon,
  onClick,
  disabled,
  className = '',
  color = 'primary',
  size = 'medium',
  variant = 'ghost',
  rounded = false,
  to,
  ariaLabel,
}) => {
  const buttonStyles = `${baseStyles} ${sizeClasses[size]} ${colorClasses[variant][color]} ${
    rounded ? 'rounded-full' : 'rounded-[6px]'
  } ${className}`;

  const content = <span className="inline-flex items-center justify-center">{icon}</span>;

  if (to && !disabled) {
    return (
      <Link to={to} className={buttonStyles} aria-label={ariaLabel}>
        {content}
      </Link>
    );
  }

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={buttonStyles}
      aria-label={ariaLabel}
      type="button"
    >
      {content}
    </button>
  );
};

export default IconButton;
