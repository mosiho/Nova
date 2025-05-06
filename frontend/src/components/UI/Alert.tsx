import React from 'react';
import { XIcon } from '@heroicons/react/outline';

export type AlertVariant = 'success' | 'error' | 'warning' | 'info';

interface AlertProps {
  variant: AlertVariant;
  title?: string;
  children: React.ReactNode;
  className?: string;
  icon?: React.ReactNode;
  dismissible?: boolean;
  onDismiss?: () => void;
}

const Alert: React.FC<AlertProps> = ({
  variant,
  title,
  children,
  className = '',
  icon,
  dismissible = false,
  onDismiss
}) => {
  const alertClass = `alert alert-${variant} ${className}`;
  
  return (
    <div className={alertClass} role="alert">
      <div className="flex">
        {icon && (
          <div className="flex-shrink-0 mr-3">
            {icon}
          </div>
        )}
        <div className="flex-1">
          {title && (
            <h3 className="text-sm font-medium mb-1">
              {title}
            </h3>
          )}
          <div className="text-sm">{children}</div>
        </div>
        {dismissible && onDismiss && (
          <button
            type="button"
            className="ml-auto -mx-1.5 -my-1.5 rounded-lg focus:ring-2 p-1.5 inline-flex h-8 w-8 focus:outline-none focus:ring-offset-2"
            onClick={onDismiss}
            aria-label="Dismiss"
          >
            <span className="sr-only">Dismiss</span>
            <XIcon className="w-5 h-5" />
          </button>
        )}
      </div>
    </div>
  );
};

export default Alert; 