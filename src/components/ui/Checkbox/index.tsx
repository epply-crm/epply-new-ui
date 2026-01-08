import React, { forwardRef } from 'react';
import { ComponentProps } from '@/core/types/component';

interface CheckboxProps
  extends
    ComponentProps,
    Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size' | 'color'> {
  label?: string;
  error?: string;
  helperText?: string;
  indeterminate?: boolean;
}

const CheckIcon = () => <i className="ki-solid ki-check text-[14px]" />;
const MinusIcon = () => <i className="ki-solid ki-minus text-[14px]" />;

const sizeClasses = {
  small: 'h-4 w-4',
  medium: 'h-5 w-5',
  large: 'h-6 w-6',
};

const colorClasses = {
  primary: 'border-primary-500 bg-primary-500 text-white',
  secondary: 'border-secondary-500 bg-secondary-500 text-white',
  success: 'border-success-500 bg-success-500 text-white',
  info: 'border-info-500 bg-info-500 text-white',
  warning: 'border-warning-500 bg-warning-500 text-white',
  danger: 'border-error-500 bg-error-500 text-white',
};

const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  (
    {
      label,
      error,
      helperText,
      className,
      size = 'medium',
      disabled,
      indeterminate = false,
      color = 'primary',
      checked,
      ...props
    },
    ref,
  ) => {
    const checkboxId = React.useId();

    return (
      <div className={`inline-flex w-fit flex-col ${className || ''}`}>
        <label
          htmlFor={checkboxId}
          className={`inline-flex items-center gap-2 ${
            disabled ? 'cursor-not-allowed opacity-60' : 'cursor-pointer'
          }`}
        >
          <div className="relative inline-flex items-center justify-center">
            <input
              ref={ref}
              id={checkboxId}
              type="checkbox"
              className="peer sr-only"
              disabled={disabled}
              checked={checked}
              {...props}
            />
            <div
              className={` ${sizeClasses[size]} flex items-center justify-center rounded border-2 transition-all duration-200 ${
                checked || indeterminate
                  ? colorClasses[color]
                  : 'border-gray-300 bg-white hover:border-gray-400'
              } ${disabled ? 'cursor-not-allowed' : 'cursor-pointer'} ${error ? 'border-error-500' : ''} `}
            >
              {(checked || indeterminate) && (
                <span className="flex items-center justify-center">
                  {indeterminate ? <MinusIcon /> : <CheckIcon />}
                </span>
              )}
            </div>
          </div>
          {label && (
            <span
              className={`text-sm font-medium ${
                disabled ? 'text-gray-400' : 'text-gray-700'
              }`}
            >
              {label}
            </span>
          )}
        </label>
        {error && <p className="text-error-500 mt-1 text-xs">{error}</p>}
        {helperText && !error && (
          <p className="mt-1 text-xs text-gray-500">{helperText}</p>
        )}
      </div>
    );
  },
);

export default Checkbox;
