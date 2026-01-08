import React from 'react';
import { ComponentProps } from '@/core/types/component';

interface RadioOption {
  name: string;
  value: string;
}

interface RadioGroupProps extends ComponentProps {
  radios: RadioOption[];
  selectedValue: string;
  onChange: (value: string) => void;
}

const RadioGroup: React.FC<RadioGroupProps> = ({
  radios,
  selectedValue,
  onChange,
  color = 'primary',
}) => {
  return (
    <div role="radiogroup" className="flex flex-col gap-3">
      {radios.map((radio) => {
        const isChecked = selectedValue === radio.value;

        return (
          <div
            key={radio.value}
            role="radio"
            aria-checked={isChecked}
            tabIndex={0}
            onClick={() => onChange(radio.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                onChange(radio.value);
              }
            }}
            className="inline-flex cursor-pointer items-center gap-2"
          >
            {/* Radio circle */}
            <div
              className={`flex h-4 w-4 items-center justify-center rounded-full border ${isChecked ? `border-${color}-500` : 'border-gray-400'} `}
            >
              <div
                className={`bg-${color}-500 h-2 w-2 rounded-full transition-transform duration-200 ${isChecked ? 'scale-100' : 'scale-0'} `}
              />
            </div>

            <span>{radio.name}</span>
          </div>
        );
      })}
    </div>
  );
};

export default RadioGroup;
