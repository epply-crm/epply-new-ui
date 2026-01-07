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
    'bg-primary-500 hover:bg-primary-700 active:bg-primary-900 disabled:bg-primary-200 disabled:text-neutral-400',
  secondary:
    'bg-secondary-500 hover:bg-secondary-700 active:bg-secondary-900 disabled:bg-secondary-200 disabled:text-neutral-400',
  success:
    'bg-success-500 hover:bg-success-700 active:bg-success-900 disabled:bg-success-200 disabled:text-neutral-400',
  info: 'bg-info-500 hover:bg-info-700 active:bg-info-900 disabled:bg-info-200 disabled:text-neutral-400',
  warning:
    'bg-warning-500 hover:bg-warning-700 active:bg-warning-900 disabled:bg-warning-200 disabled:text-neutral-400',
  danger:
    'bg-error-500 hover:bg-error-700 active:bg-error-900 disabled:bg-error-200 disabled:text-neutral-400',
  brand:
    'bg-brand-600 hover:bg-brand-600/90 active:bg-brand-600/80 disabled:bg-brand-50 disabled:text-neutral-400',
  neutral:
    'bg-surface-secondary hover:bg-neutral-300 active:bg-neutral-400 disabled:bg-neutral-100 disabled:text-neutral-400 border border-border-primary',
  ghost:
    'bg-transparent hover:bg-surface-secondary active:bg-neutral-200 disabled:text-neutral-400',
};

const sizeClasses = {
  small: 'text-[12px] px-[12px] py-[10px]',
  medium: 'text-[13px] px-[12px] py-[10px]',
  large: 'text-[14px] px-[12px] py-[10px]',
};
const baseStyles =
  'inline-flex items-center justify-center rounded-[6px] font-medium text-white cursor line-height-[13px]  transition-all duration-200 ease-in-out disabled:cursor-not-allowed disabled:opacity-60';

const Button: React.FC<ButtonProps> = ({
  onClick,
  disabled,
  className,
  color = 'primary',
  size = 'medium',
  isLoading,
  to,
  children,
  leftIcon,
  rightIcon,
  fullWidth,
}) => {
  const buttonStyles = `${baseStyles} ${colorClasses[color]} ${sizeClasses[size]} ${className || ''} ${fullWidth ? 'w-full' : ''}`;

  const content = (
    <>
      {isLoading ? (
        <span className="loader-border loader-border-white mr-2"></span>
      ) : (
        leftIcon && <span>{leftIcon}</span>
      )}
      <span>{isLoading ? 'Loading...' : children}</span>
      {!isLoading && rightIcon && <span>{rightIcon}</span>}
    </>
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
