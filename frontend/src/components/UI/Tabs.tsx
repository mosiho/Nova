import React, { useState } from 'react';

export interface TabItem {
  /**
   * Unique identifier for the tab
   */
  id: string;
  /**
   * Tab label text
   */
  label: React.ReactNode;
  /**
   * Tab content
   */
  content: React.ReactNode;
  /**
   * Whether the tab is disabled
   */
  disabled?: boolean;
}

interface TabsProps {
  items: TabItem[];
  defaultTabId?: string;
  onChange?: (tabId: string) => void;
  className?: string;
  orientation?: 'horizontal' | 'vertical';
  variant?: 'default' | 'pills' | 'underline';
}

const Tabs: React.FC<TabsProps> = ({
  items,
  defaultTabId,
  onChange,
  className = '',
  orientation = 'horizontal',
  variant = 'default'
}) => {
  const firstEnabledTab = items.find(item => !item.disabled)?.id;
  const [activeTab, setActiveTab] = useState(defaultTabId || firstEnabledTab);

  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId);
    if (onChange) {
      onChange(tabId);
    }
  };

  // Apply correct classes based on orientation and variant
  const tabContainerClass = () => {
    if (orientation === 'vertical') {
      return 'flex';
    }
    
    return variant === 'underline' 
      ? 'tab-container' 
      : 'border-b border-gray-200 mb-4';
  };

  const tabListClass = () => {
    if (orientation === 'vertical') {
      return 'flex flex-col space-y-2 mr-4 min-w-[150px]';
    }
    
    if (variant === 'pills') {
      return 'flex space-x-2 mb-4';
    }
    
    return 'tab-list';
  };

  const getTabClass = (tabId: string, disabled?: boolean) => {
    const isActive = tabId === activeTab;
    
    if (disabled) {
      return 'opacity-50 cursor-not-allowed';
    }
    
    if (variant === 'pills') {
      return `px-3 py-2 rounded-md text-sm font-medium ${
        isActive 
          ? 'bg-blue-100 text-blue-700' 
          : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
      }`;
    }
    
    if (variant === 'underline') {
      return `tab ${isActive ? 'tab-active' : 'tab-inactive'}`;
    }

    // Default tab style
    return `px-4 py-2 text-sm font-medium border-b-2 ${
      isActive 
        ? 'border-blue-500 text-blue-600' 
        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
    }`;
  };

  return (
    <div className={className}>
      <div className={tabContainerClass()}>
        {/* Tab list */}
        <div className={tabListClass()} role="tablist">
          {items.map((item) => (
            <button
              key={item.id}
              role="tab"
              className={getTabClass(item.id, item.disabled)}
              onClick={() => !item.disabled && handleTabChange(item.id)}
              aria-selected={activeTab === item.id}
              aria-controls={`panel-${item.id}`}
              id={`tab-${item.id}`}
              disabled={item.disabled}
              tabIndex={activeTab === item.id ? 0 : -1}
            >
              {item.label}
            </button>
          ))}
        </div>

        {/* Tab content container - only shown for vertical tabs */}
        {orientation === 'vertical' && (
          <div className="flex-1">
            {items.map((item) => (
              <div
                key={item.id}
                role="tabpanel"
                id={`panel-${item.id}`}
                aria-labelledby={`tab-${item.id}`}
                className={`tab-panel ${activeTab === item.id ? 'block' : 'hidden'}`}
              >
                {item.content}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Tab content - only shown for horizontal tabs */}
      {orientation === 'horizontal' && (
        <div className="mt-2">
          {items.map((item) => (
            <div
              key={item.id}
              role="tabpanel"
              id={`panel-${item.id}`}
              aria-labelledby={`tab-${item.id}`}
              className={`tab-panel ${activeTab === item.id ? 'block' : 'hidden'}`}
            >
              {item.content}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Tabs; 