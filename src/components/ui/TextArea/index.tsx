//teaxt are component
import React, { useState } from 'react';
import { ComponentProps } from '@/core/types/component';
import Typography from '../Typography';

interface TextAreaProps
  extends
    ComponentProps,
    Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, 'size' | 'color'> {
  label?: string;
  error?: string;
  helperText?: string;
}

const sizeClasses = {
  small: 'p-2 text-[13px]',
  medium: 'p-3 text-[14px]',
  large: 'p-4 text-[15px]',
};

const baseStyles =
  'w-full rounded-[6px] outline-none focus:border-secondary-500 border border-gray-300 transition-all duration-200 ease-in-out disabled:cursor-not-allowed disabled:bg-gray-100';

const TextArea: React.FC<TextAreaProps> = ({
  label,
  error,
  helperText,
  className,
  size = 'medium',
  disabled,
  ...props
}) => {
  const textAreaId = React.useId();
  const [currentCharacterCount, setCurrentCharacterCount] = useState(0);

  return (
    <div className={`relative inline-flex w-full flex-col ${className || ''}`}>
      {label && (
        <label htmlFor={textAreaId} className="mb-1 font-medium text-gray-700">
          {label}
        </label>
      )}
      <textarea
        id={textAreaId}
        onChange={(e) => {
          setCurrentCharacterCount(e.target.value.length);
        }}
        maxLength={props.maxLength}
        className={`${baseStyles} ${sizeClasses[size]} ${
          error ? 'border-error-500 focus:border-error-500 focus:ring-error-500' : ''
        }`}
        disabled={disabled}
        {...props}
      />
      {helperText && !error && (
        <span className="mt-1 text-sm text-gray-500">{helperText}</span>
      )}
      {error && <span className="text-error-500 mt-1 text-sm">{error}</span>}
      <div className="absolute right-3 bottom-2 text-[12px] text-gray-400">
        {props.maxLength && `${currentCharacterCount} / ${props.maxLength}`}
      </div>
    </div>
  );
};

export default TextArea;
