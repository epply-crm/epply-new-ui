import React from 'react';
import { ComponentProps } from '@/core/types/component';

interface ProgressProps extends Omit<ComponentProps, 'size'> {
  value: number;
  max?: number;
  variant?: 'linear' | 'circular';
  size?: 'small' | 'medium' | 'large';
  showLabel?: boolean;
  label?: string;
  striped?: boolean;
  animated?: boolean;
  thickness?: number;
}

const sizeClasses = {
  small: 'h-1',
  medium: 'h-2',
  large: 'h-3',
};

const circularSizes = {
  small: 48,
  medium: 64,
  large: 80,
};

const colorClasses = {
  primary: 'bg-primary-500',
  secondary: 'bg-secondary-500',
  success: 'bg-success-500',
  info: 'bg-info-500',
  warning: 'bg-warning-500',
  danger: 'bg-error-500',
};

const Progress: React.FC<ProgressProps> = ({
  value,
  max = 100,
  variant = 'linear',
  size = 'medium',
  color = 'primary',
  showLabel = false,
  label,
  striped = false,
  animated = false,
  thickness,
  className = '',
}) => {
  const percentage = Math.min(Math.max((value / max) * 100, 0), 100);

  if (variant === 'linear') {
    return (
      <div className={`w-full ${className}`}>
        {(showLabel || label) && (
          <div className="mb-2 flex items-center justify-between text-sm">
            <span className="font-medium text-gray-700">{label || 'Progress'}</span>
            <span className="font-semibold text-gray-900">{Math.round(percentage)}%</span>
          </div>
        )}
        <div
          className={`w-full overflow-hidden rounded-full bg-gray-200 ${sizeClasses[size]}`}
        >
          <div
            className={`${sizeClasses[size]} ${colorClasses[color]} transition-all duration-300 ease-in-out ${
              striped
                ? 'bg-gradient-to-r from-transparent via-white/20 to-transparent bg-[length:20px_100%]'
                : ''
            } ${animated ? 'animate-[progress_1s_linear_infinite]' : ''}`}
            style={{
              width: `${percentage}%`,
              backgroundImage: striped
                ? 'linear-gradient(45deg, rgba(255,255,255,.15) 25%, transparent 25%, transparent 50%, rgba(255,255,255,.15) 50%, rgba(255,255,255,.15) 75%, transparent 75%, transparent)'
                : undefined,
              backgroundSize: striped ? '1rem 1rem' : undefined,
            }}
            role="progressbar"
            aria-valuenow={value}
            aria-valuemin={0}
            aria-valuemax={max}
          />
        </div>
      </div>
    );
  }

  const circularSize = circularSizes[size];
  const strokeWidth = thickness || (size === 'small' ? 4 : size === 'medium' ? 6 : 8);
  const radius = (circularSize - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (percentage / 100) * circumference;

  const getColorStroke = (colorName: keyof typeof colorClasses) => {
    const colorMap = {
      primary: '#db0f67',
      secondary: '#3b82f6',
      success: '#10b981',
      info: '#06b6d4',
      warning: '#f59e0b',
      danger: '#ef4444',
    };
    return colorMap[colorName];
  };

  return (
    <div
      className={`inline-flex items-center justify-center ${className}`}
      style={{ width: circularSize, height: circularSize }}
    >
      <svg width={circularSize} height={circularSize} className="relative">
        <circle
          cx={circularSize / 2}
          cy={circularSize / 2}
          r={radius}
          fill="none"
          stroke="#e5e7eb"
          strokeWidth={strokeWidth}
        />
        <circle
          cx={circularSize / 2}
          cy={circularSize / 2}
          r={radius}
          fill="none"
          stroke={getColorStroke(color)}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          className="transition-all duration-300 ease-in-out"
          style={{
            transform: 'rotate(-90deg)',
            transformOrigin: '50% 50%',
          }}
        />
        {showLabel && (
          <text
            x="50%"
            y="50%"
            dominantBaseline="middle"
            textAnchor="middle"
            className="fill-current text-sm font-semibold text-gray-900"
          >
            {Math.round(percentage)}%
          </text>
        )}
      </svg>
    </div>
  );
};

export default Progress;
