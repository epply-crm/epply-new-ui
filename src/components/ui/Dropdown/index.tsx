//dropdown component
import React, { useState, useRef, useEffect } from 'react';
import { ComponentProps } from '@/core/types/component';
import Button from '../Button';
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
  label: React.ReactNode;
}

const Dropdown: React.FC<DropdownProps> = ({
  label,
  options,
  className,
  color,
  size,
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
      <Button
        onClick={toggleDropdown}
        color={color || 'primary'}
        rightIcon={
          <div
            className={`flex items-center transition-transform duration-300 ease-in-out ${
              isOpen ? 'rotate-180' : 'rotate-0'
            }`}
          >
            <i className="ki-outline ki-down"></i>
          </div>
        }
        size={size}
      >
        {label}
      </Button>
      {isOpen && (
        <div className="absolute right-0 z-50 mt-2 w-48 rounded-md border border-gray-200 bg-white shadow-lg">
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
                  className={`w-full px-4 py-2 text-left hover:bg-gray-100 cursor-pointer${
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
