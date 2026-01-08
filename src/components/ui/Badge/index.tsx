import React from 'react';
import { ComponentProps } from '@/core/types/component';

interface BadgeProps extends Omit<ComponentProps, 'size'> {
  children: React.ReactNode;
  variant?: 'solid' | 'outline' | 'light' | 'dot';
  size?: 'small' | 'medium' | 'large';
  icon?: React.ReactNode;
  onClose?: () => void;
  rounded?: 'default' | 'full';
}

const CloseIcon = () => <i className="ki-filled ki-cross text-[10px]" />;

const sizeClasses = {
  small: 'text-[11px] px-2 py-0.5 gap-1',
  medium: 'text-[12px] px-2.5 py-1 gap-1.5',
  large: 'text-[13px] px-3 py-1.5 gap-2',
};

const iconSizeClasses = {
  small: 'text-[12px]',
  medium: 'text-[14px]',
  large: 'text-[16px]',
};

const dotSizeClasses = {
  small: 'h-1.5 w-1.5',
  medium: 'h-2 w-2',
  large: 'h-2.5 w-2.5',
};

const solidColorClasses = {
  primary: 'bg-primary-500 text-white',
  secondary: 'bg-secondary-500 text-white',
  success: 'bg-success-500 text-white',
  info: 'bg-info-500 text-white',
  warning: 'bg-warning-500 text-white',
  danger: 'bg-error-500 text-white',
};

const outlineColorClasses = {
  primary: 'border-primary-500 text-primary-700 bg-transparent',
  secondary: 'border-secondary-500 text-secondary-700 bg-transparent',
  success: 'border-success-500 text-success-700 bg-transparent',
  info: 'border-info-500 text-info-700 bg-transparent',
  warning: 'border-warning-500 text-warning-700 bg-transparent',
  danger: 'border-error-500 text-error-700 bg-transparent',
};

const lightColorClasses = {
  primary: 'bg-primary-50 text-primary-700',
  secondary: 'bg-secondary-50 text-secondary-700',
  success: 'bg-success-50 text-success-700',
  info: 'bg-info-50 text-info-700',
  warning: 'bg-warning-50 text-warning-700',
  danger: 'bg-error-50 text-error-700',
};

const dotColorClasses = {
  primary: 'bg-primary-500',
  secondary: 'bg-secondary-500',
  success: 'bg-success-500',
  info: 'bg-info-500',
  warning: 'bg-warning-500',
  danger: 'bg-error-500',
};

const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'solid',
  size = 'medium',
  color = 'primary',
  icon,
  onClose,
  rounded = 'default',
  className = '',
}) => {
  const getColorClasses = () => {
    switch (variant) {
      case 'outline':
        return outlineColorClasses[color];
      case 'light':
        return lightColorClasses[color];
      case 'solid':
      case 'dot':
        return solidColorClasses[color];
      default:
        return solidColorClasses[color];
    }
  };

  const baseClasses = `inline-flex items-center font-medium transition-all duration-200 ${
    variant === 'outline' ? 'border' : ''
  } ${rounded === 'full' ? 'rounded-full' : 'rounded-md'} ${sizeClasses[size]} ${getColorClasses()} ${className}`;

  if (variant === 'dot') {
    return (
      <span className={baseClasses}>
        <span
          className={`${dotSizeClasses[size]} ${dotColorClasses[color]} inline-block shrink-0 rounded-full`}
        />
        <span className={lightColorClasses[color].split(' ')[1]}>{children}</span>
        {onClose && (
          <button
            type="button"
            onClick={onClose}
            className="ml-1 inline-flex shrink-0 items-center justify-center transition-opacity hover:opacity-70"
          >
            <CloseIcon />
          </button>
        )}
      </span>
    );
  }

  return (
    <span className={baseClasses}>
      {icon && (
        <span className={`inline-flex shrink-0 items-center ${iconSizeClasses[size]}`}>
          {icon}
        </span>
      )}
      <span className="leading-none">{children}</span>
      {onClose && (
        <button
          type="button"
          onClick={onClose}
          className="ml-1 inline-flex shrink-0 items-center justify-center transition-opacity hover:opacity-70"
        >
          <CloseIcon />
        </button>
      )}
    </span>
  );
};

export default Badge;
