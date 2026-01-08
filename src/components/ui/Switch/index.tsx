import React, { forwardRef } from 'react';
import { ComponentProps } from '@/core/types/component';

interface SwitchProps
  extends
    ComponentProps,
    Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size' | 'color'> {
  label?: string;
  error?: string;
  helperText?: string;
  labelPosition?: 'left' | 'right';
  fullwidth?: boolean;
}

const sizeClasses = {
  small: {
    track: 'h-5 w-9',
    thumb: 'h-4 w-4',
    translate: 'translate-x-4',
  },
  medium: {
    track: 'h-6 w-11',
    thumb: 'h-5 w-5',
    translate: 'translate-x-5',
  },
  large: {
    track: 'h-7 w-14',
    thumb: 'h-6 w-6',
    translate: 'translate-x-7',
  },
};

const colorClasses = {
  primary: 'bg-primary-500',
  secondary: 'bg-secondary-500',
  success: 'bg-success-500',
  info: 'bg-info-500',
  warning: 'bg-warning-500',
  danger: 'bg-error-500',
};

const Switch = forwardRef<HTMLInputElement, SwitchProps>(
  (
    {
      label,
      error,
      helperText,
      className,
      size = 'medium',
      color = 'primary',
      disabled,
      checked,
      labelPosition = 'right',
      fullwidth,
      ...props
    },
    ref,
  ) => {
    const switchId = React.useId();
    const { track, thumb, translate } = sizeClasses[size];

    const switchElement = (
      <div className="relative inline-flex items-center">
        <input
          ref={ref}
          id={switchId}
          type="checkbox"
          className="peer sr-only"
          disabled={disabled}
          checked={checked}
          {...props}
        />
        <div
          className={`${track} ${
            disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'
          } rounded-full transition-colors duration-200 ${
            checked ? colorClasses[color] : 'bg-gray-300'
          } ${error ? 'ring-error-500 ring-2' : ''}`}
        >
          <div
            className={`${thumb} absolute top-1/2 left-0.5 shrink-0 -translate-y-1/2 transform rounded-full bg-white shadow-md transition-transform duration-200 ${
              checked ? translate : 'translate-x-0'
            }`}
          />
        </div>
      </div>
    );

    return (
      <div
        className={`inline-flex flex-col ${className || ''} ${fullwidth ? 'w-full' : ''}`}
      >
        <label
          htmlFor={switchId}
          className={`inline-flex items-center gap-3 ${disabled ? 'cursor-not-allowed opacity-60' : 'cursor-pointer'} ${fullwidth ? 'w-full justify-between' : 'justify-start'} `}
        >
          {label && labelPosition === 'left' && (
            <span
              className={`text-sm font-medium ${
                disabled ? 'text-gray-400' : 'text-gray-700'
              }`}
            >
              {label}
            </span>
          )}
          {switchElement}
          {label && labelPosition === 'right' && (
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

Switch.displayName = 'Switch';

export default Switch;
