import React, { forwardRef, useState } from 'react';
import { ComponentProps } from '@/core/types/component';

interface InputProps
  extends
    Omit<ComponentProps, 'color'>,
    Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size' | 'color'> {
  label?: string;
  error?: string;
  helperText?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  fullWidth?: boolean;
  variant?: 'outlined' | 'filled' | 'standard';
  showPasswordToggle?: boolean;
}

const EyeIcon = () => <i className="ki-filled ki-eye text-[20px]" />;

const EyeOffIcon = () => <i className="ki-filled ki-eye-slash text-[20px]" />;

const sizeClasses = {
  small: 'text-[12px] px-[12px] py-[8px]',
  medium: 'text-[13px] px-[12px] py-[10px]',
  large: 'text-[14px] px-[16px] py-[12px]',
};

const variantClasses = {
  outlined: 'border border-border-primary bg-transparent',
  filled: 'border-0 bg-surface-secondary',
  standard: 'border-0 border-b border-border-primary bg-transparent rounded-none',
};

const baseStyles =
  'w-full rounded-[6px] outline-none focus:border-secondary-500 border border-gray-300 transition-all duration-200 ease-in-out disabled:cursor-not-allowed disabled:bg-gray-100';

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      error,
      helperText,
      className,
      size = 'medium',
      variant = 'outlined',
      leftIcon,
      rightIcon,
      fullWidth = true,
      disabled,
      type,
      showPasswordToggle = true,
      ...props
    },
    ref,
  ) => {
    const [showPassword, setShowPassword] = useState(false);
    const isPasswordType = type === 'password';
    const shouldShowToggle = isPasswordType && showPasswordToggle;

    const inputStyles = `${baseStyles} ${sizeClasses[size]} ${variantClasses[variant]} ${className || ''} ${
      leftIcon ? 'pl-10' : ''
    } ${rightIcon || shouldShowToggle ? 'pr-10' : ''} ${error ? 'border-error-500 focus:ring-error-500' : ''}`;

    const containerStyles = `${fullWidth ? 'w-full' : 'inline-block'}`;

    const togglePasswordVisibility = () => {
      setShowPassword(!showPassword);
    };

    return (
      <div className={containerStyles}>
        {label && (
          <label className="mb-1 block text-sm font-medium text-gray-700">{label}</label>
        )}
        <div className="relative">
          {leftIcon && (
            <span className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-400">
              {leftIcon}
            </span>
          )}
          <input
            ref={ref}
            className={inputStyles}
            disabled={disabled}
            type={isPasswordType && showPassword ? 'text' : type}
            {...props}
          />
          {shouldShowToggle ? (
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute top-1/2 right-3 flex -translate-y-1/2 cursor-pointer items-center text-gray-400 transition-colors focus:outline-none"
              tabIndex={-1}
            >
              {showPassword ? <EyeOffIcon /> : <EyeIcon />}
            </button>
          ) : (
            rightIcon && (
              <span className="absolute top-1/2 right-3 -translate-y-1/2 text-gray-400">
                {rightIcon}
              </span>
            )
          )}
        </div>
        {error && <p className="text-error-500 mt-1 text-xs">{error}</p>}
        {helperText && !error && (
          <p className="mt-1 text-xs text-gray-500">{helperText}</p>
        )}
      </div>
    );
  },
);

Input.displayName = 'Input';

export default Input;
