import React, { useState, useEffect } from 'react';
import { ComponentProps } from '@/core/types/component';

export interface TabItem {
  id: string;
  label: string;
  icon?: React.ReactNode;
  content?: React.ReactNode;
  disabled?: boolean;
  badge?: string | number;
}

interface TabsProps extends ComponentProps {
  items: TabItem[];
  defaultActiveTab?: string;
  activeTab?: string;
  onChange?: (tabId: string) => void;
  fullWidth?: boolean;
}

const colorClasses = {
  primary: {
    active: 'bg-primary-50 text-primary-500',
    inactive: 'bg-white text-gray-700 hover:bg-gray-50',
  },
  secondary: {
    active: 'bg-secondary-50 text-secondary-500',
    inactive: 'bg-white text-gray-700 hover:bg-gray-50',
  },
  success: {
    active: 'bg-success-50 text-success-500',
    inactive: 'bg-white text-gray-700 hover:bg-gray-50',
  },
  info: {
    active: 'bg-info-50 text-info-500',
    inactive: 'bg-white text-gray-700 hover:bg-gray-50',
  },
  warning: {
    active: 'bg-warning-50 text-warning-500',
    inactive: 'bg-white text-gray-700 hover:bg-gray-50',
  },
  danger: {
    active: 'bg-error-50 text-error-500',
    inactive: 'bg-white text-gray-700 hover:bg-gray-50',
  },
};

const sizeClasses = {
  small: 'text-sm px-2 py-1',
  medium: 'text-sm px-4 py-2',
  large: 'text-base px-6 py-3',
};

const Tabs: React.FC<TabsProps> = ({
  items,
  defaultActiveTab,
  activeTab: controlledActiveTab,
  onChange,
  size = 'medium',
  fullWidth = false,
  color = 'primary',
  className = '',
}) => {
  const [activeTab, setActiveTab] = useState(
    controlledActiveTab || defaultActiveTab || items[0]?.id || '',
  );

  const currentActiveTab =
    controlledActiveTab !== undefined ? controlledActiveTab : activeTab;

  useEffect(() => {
    if (controlledActiveTab !== undefined) {
      setActiveTab(controlledActiveTab);
    }
  }, [controlledActiveTab]);

  const handleTabClick = (tabId: string, disabled?: boolean) => {
    if (disabled) return;

    if (controlledActiveTab === undefined) {
      setActiveTab(tabId);
    }
    onChange?.(tabId);
  };

  const activeContent = items.find((item) => item.id === currentActiveTab)?.content;

  const getTabClasses = (item: TabItem) => {
    const isActive = currentActiveTab === item.id;
    const baseClasses =
      'inline-flex items-center gap-2 font-medium transition-all duration-200 cursor-pointer rounded-lg';
    const disabledClasses = item.disabled
      ? 'opacity-50 cursor-not-allowed pointer-events-none'
      : '';

    return `${baseClasses} ${sizeClasses[size]} ${
      isActive ? colorClasses[color].active : colorClasses[color].inactive
    } ${disabledClasses}`;
  };

  return (
    <div className={className}>
      <div
        className={`inline-flex gap-1 rounded-lg bg-white p-1.5 ${fullWidth ? 'w-full' : ''}`}
        role="tablist"
      >
        {items.map((item) => (
          <button
            key={item.id}
            role="tab"
            aria-selected={currentActiveTab === item.id}
            aria-controls={`tabpanel-${item.id}`}
            tabIndex={currentActiveTab === item.id ? 0 : -1}
            onClick={() => handleTabClick(item.id, item.disabled)}
            className={`${getTabClasses(item)} ${fullWidth ? 'flex-1 justify-center' : ''}`}
            disabled={item.disabled}
          >
            {item.icon && <span className="shrink-0">{item.icon}</span>}
            <span>{item.label}</span>
            {item.badge && (
              <span
                className={`ml-1 inline-flex h-5 min-w-5 items-center justify-center rounded-full px-1.5 text-xs font-semibold ${
                  currentActiveTab === item.id
                    ? 'bg-white/20 text-white'
                    : 'bg-error-500 text-white'
                }`}
              >
                {item.badge}
              </span>
            )}
          </button>
        ))}
      </div>

      {activeContent && (
        <div
          role="tabpanel"
          id={`tabpanel-${currentActiveTab}`}
          aria-labelledby={currentActiveTab}
          className="mt-2"
        >
          {activeContent}
        </div>
      )}
    </div>
  );
};

Tabs.displayName = 'Tabs';

export default Tabs;
