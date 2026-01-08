//dropdown component
import React, { useState, useRef, useEffect } from 'react';
import { ComponentProps } from '@/core/types/component';
import { Link } from 'react-router-dom';

interface Options {
  label: React.ReactNode;
  value: string;
  onClick?: () => void;
  hasLine?: boolean;
  href?: string;
}

interface DropdownProps extends ComponentProps {
  options: Options[];
  children: React.ReactNode;
}

const fontClasses = {
  small: 'text-[13px]',
  medium: 'text-[15px]',
  large: 'text-[17px]',
};

const Dropdown: React.FC<DropdownProps> = ({
  children,
  options,
  className,
  color,
  size = 'medium',
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className={`relative inline-block ${className || ''}`} ref={dropdownRef}>
      <div onClick={toggleDropdown} color={color || 'primary'} className="cursor-pointer">
        {children}
      </div>
      {isOpen && (
        <div
          className={`absolute right-0 z-50 mt-2 w-48 rounded-md border border-gray-200 bg-white shadow-lg ${fontClasses[size]}`}
        >
          {options.map((option, index) => (
            <div key={index}>
              {option.href ? (
                <Link
                  to={option.href}
                  className="block w-full px-4 py-2 text-left hover:bg-gray-100"
                >
                  {option.label}
                </Link>
              ) : (
                <button
                  onClick={() => {
                    if (option.onClick) {
                      option.onClick();
                    }
                    setIsOpen(false);
                  }}
                  className={`w-full cursor-pointer px-4 py-2 text-left hover:bg-gray-100 ${
                    option.hasLine ? 'border-t border-gray-200' : ''
                  }`}
                >
                  {option.label}
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
export default Dropdown;
