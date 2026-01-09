import React, { useState, useRef, useEffect } from 'react';
import { ComponentProps } from '@/core/types/component';

export interface SelectOption {
  value: string | number;
  label: string;
  disabled?: boolean;
  icon?: React.ReactNode;
}

export interface SelectProps extends Omit<ComponentProps, 'color'> {
  label?: string;
  error?: string;
  helperText?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  fullWidth?: boolean;
  variant?: 'outlined' | 'filled' | 'standard';
  options: SelectOption[];
  placeholder?: string;
  value?: string | number | (string | number)[];
  onChange?: (value: string | number | (string | number)[]) => void;
  disabled?: boolean;
  searchable?: boolean;
  className?: string;
  multiple?: boolean;
}

const ChevronDownIcon = () => <i className="ki-filled ki-down text-[16px]" />;
const CheckIcon = () => <i className="ki-filled ki-check text-[16px]" />;
const SearchIcon = () => <i className="ki-outline ki-magnifier text-[16px]" />;

const normalizeText = (text: string): string => {
  return text
    .toLowerCase()
    .replace(/ğ/g, 'g')
    .replace(/ü/g, 'u')
    .replace(/ş/g, 's')
    .replace(/ı/g, 'i')
    .replace(/ö/g, 'o')
    .replace(/ç/g, 'c')
    .replace(/İ/g, 'i')
    .replace(/Ğ/g, 'g')
    .replace(/Ü/g, 'u')
    .replace(/Ş/g, 's')
    .replace(/Ö/g, 'o')
    .replace(/Ç/g, 'c');
};

const sizeClasses = {
  small: 'text-[12px] px-[12px] py-[8px]',
  medium: 'text-[13px] px-[12px] py-[10px]',
  large: 'text-[14px] px-[16px] py-[12px]',
};

const variantClasses = {
  outlined: 'border border-border-primary bg-white',
  filled: 'border-0 bg-surface-secondary',
  standard: 'border-0 border-b border-border-primary bg-transparent rounded-none',
};

const baseStyles =
  'rounded-[6px] font-medium transition-all duration-200 ease-in-out focus:outline-none disabled:cursor-not-allowed disabled:opacity-60 disabled:bg-neutral-100 cursor-pointer';

const Select: React.FC<SelectProps> = ({
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
  options = [],
  placeholder = 'Seçiniz...',
  value,
  onChange,
  searchable = false,
  multiple = false,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [highlightedIndex, setHighlightedIndex] = useState<number>(-1);
  const containerRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  const selectedValues = multiple
    ? Array.isArray(value)
      ? value
      : value !== undefined
        ? [value]
        : []
    : [];

  const selectedOption = !multiple ? options.find((opt) => opt.value === value) : null;
  const selectedOptions = multiple
    ? options.filter((opt) => selectedValues.includes(opt.value))
    : [];

  const filteredOptions = searchable
    ? options.filter((option) =>
        normalizeText(option.label).includes(normalizeText(searchQuery)),
      )
    : options;

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setSearchQuery('');
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (!isOpen) return;

      switch (event.key) {
        case 'ArrowDown':
          event.preventDefault();
          setHighlightedIndex((prev) =>
            prev < filteredOptions.length - 1 ? prev + 1 : prev,
          );
          break;
        case 'ArrowUp':
          event.preventDefault();
          setHighlightedIndex((prev) => (prev > 0 ? prev - 1 : 0));
          break;
        case 'Enter':
          event.preventDefault();
          if (highlightedIndex >= 0 && highlightedIndex < filteredOptions.length) {
            const option = filteredOptions[highlightedIndex];
            if (!option.disabled) {
              onChange?.(option.value);
              setIsOpen(false);
              setSearchQuery('');
            }
          }
          break;
        case 'Escape':
          setIsOpen(false);
          setSearchQuery('');
          break;
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, highlightedIndex, filteredOptions, onChange]);

  useEffect(() => {
    if (isOpen && searchable && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isOpen, searchable]);

  const handleToggle = () => {
    if (!disabled) {
      setIsOpen(!isOpen);
      setHighlightedIndex(-1);
    }
  };

  const handleSelect = (option: SelectOption) => {
    if (!option.disabled) {
      if (multiple) {
        const newValues = selectedValues.includes(option.value)
          ? selectedValues.filter((v) => v !== option.value)
          : [...selectedValues, option.value];
        onChange?.(newValues);
      } else {
        onChange?.(option.value);
        setIsOpen(false);
        setSearchQuery('');
      }
      setHighlightedIndex(-1);
    }
  };

  const buttonStyles = `${baseStyles} ${sizeClasses[size]} ${variantClasses[variant]} ${className || ''} ${
    leftIcon ? 'pl-3' : ''
  } ${rightIcon || isOpen ? 'pr-3' : 'pr-3'} ${error ? 'border-error-500' : ''} ${
    isOpen ? 'border-primary-500' : ''
  } flex items-center justify-between`;

  const containerStyles = `${fullWidth ? 'w-full' : 'inline-block'}`;

  return (
    <div className={containerStyles} ref={containerRef}>
      {label && (
        <label className="mb-1 block text-sm font-medium text-gray-700">{label}</label>
      )}
      <div className="relative">
        {leftIcon && (
          <span className="pointer-events-none absolute top-1/2 left-3 z-10 -translate-y-1/2 text-gray-400">
            {leftIcon}
          </span>
        )}

        <button
          type="button"
          onClick={handleToggle}
          disabled={disabled}
          className={buttonStyles}
        >
          <span
            className={`flex items-center gap-2 truncate ${
              multiple
                ? selectedOptions.length === 0
                  ? 'text-gray-400'
                  : ''
                : !selectedOption
                  ? 'text-gray-400'
                  : ''
            }`}
          >
            {multiple ? (
              selectedOptions.length > 0 ? (
                <span className="flex flex-wrap gap-1">
                  {selectedOptions.map((opt) => (
                    <span
                      key={opt.value}
                      className="bg-primary-50 text-primary-700 inline-flex items-center gap-1 rounded px-2 py-0.5 text-xs font-medium"
                    >
                      {opt.icon && (
                        <span className="flex h-4 w-4 shrink-0 items-center justify-center">
                          {opt.icon}
                        </span>
                      )}
                      {opt.label}
                    </span>
                  ))}
                </span>
              ) : (
                placeholder
              )
            ) : (
              <>
                {selectedOption?.icon && (
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center">
                    {selectedOption.icon}
                  </span>
                )}
                {selectedOption ? selectedOption.label : placeholder}
              </>
            )}
          </span>
          <span
            className={`flex items-center justify-center transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
          >
            {rightIcon || <ChevronDownIcon />}
          </span>
        </button>

        {isOpen && (
          <div
            className={`border-border-primary absolute z-50 mt-1 w-full overflow-hidden rounded-md border bg-white shadow-lg ${
              variant === 'standard' ? 'border-t' : ''
            }`}
          >
            {searchable && (
              <div className="border-border-primary border-b p-2">
                <div className="relative">
                  <span className="pointer-events-none absolute top-1/2 left-2 -translate-y-1/2 text-gray-400">
                    <SearchIcon />
                  </span>
                  <input
                    ref={searchInputRef}
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Ara..."
                    className="border-border-primary w-full rounded border py-1.5 pr-2 pl-8 text-sm focus:ring-1 focus:outline-none"
                  />
                </div>
              </div>
            )}

            <div className="max-h-60 overflow-y-auto">
              {filteredOptions.length === 0 ? (
                <div className="px-4 py-3 text-center text-sm text-gray-500">
                  Sonuç bulunamadı
                </div>
              ) : (
                filteredOptions.map((option, index) => {
                  const isSelected = multiple
                    ? selectedValues.includes(option.value)
                    : option.value === value;
                  const isHighlighted = index === highlightedIndex;

                  return (
                    <button
                      key={option.value}
                      type="button"
                      onClick={() => handleSelect(option)}
                      disabled={option.disabled}
                      className={`flex w-full cursor-pointer items-center justify-between px-4 py-2.5 text-left text-sm transition-colors disabled:cursor-not-allowed ${
                        option.disabled
                          ? 'cursor-not-allowed bg-gray-50 text-gray-400'
                          : isSelected
                            ? 'bg-primary-50 text-primary-700 font-medium'
                            : isHighlighted
                              ? 'bg-gray-100'
                              : 'hover:bg-gray-50'
                      }`}
                    >
                      <span className="flex items-center gap-2 truncate">
                        {option.icon && (
                          <span className="flex h-5 w-5 shrink-0 items-center justify-center">
                            {option.icon}
                          </span>
                        )}
                        {option.label}
                      </span>
                      {isSelected && (
                        <span className="text-primary-600">
                          <CheckIcon />
                        </span>
                      )}
                    </button>
                  );
                })
              )}
            </div>
          </div>
        )}
      </div>

      {error && <p className="text-error-500 mt-1 text-xs">{error}</p>}
      {helperText && !error && <p className="mt-1 text-xs text-gray-500">{helperText}</p>}
    </div>
  );
};

export default Select;
