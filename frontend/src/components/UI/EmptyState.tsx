import React from 'react';
import { Button, LinkButton } from './Button';

interface EmptyStateProps {
  icon?: React.ReactNode;
  title: string;
  description?: string;
  action?: {
    label: string;
    onClick?: () => void;
    to?: string;
    variant?: 'primary' | 'secondary';
  };
  secondaryAction?: {
    label: string;
    onClick?: () => void;
    to?: string;
  };
  className?: string;
  children?: React.ReactNode;
}

const EmptyState: React.FC<EmptyStateProps> = ({
  icon,
  title,
  description,
  action,
  secondaryAction,
  className = '',
  children
}) => {
  return (
    <div 
      className={`empty-state ${className}`}
      role="region"
      aria-labelledby="empty-state-title"
    >
      {icon && (
        <div className="empty-state-icon" aria-hidden="true">
          {icon}
        </div>
      )}
      <h3 className="empty-state-title" id="empty-state-title">{title}</h3>
      {description && (
        <p className="empty-state-description">{description}</p>
      )}
      {children && (
        <div className="mt-4">
          {children}
        </div>
      )}
      {(action || secondaryAction) && (
        <div className="mt-5 flex flex-wrap justify-center gap-3">
          {action && (
            action.to ? (
              <LinkButton
                to={action.to}
                variant={action.variant || 'primary'}
                aria-label={`${action.label} - ${title}`}
              >
                {action.label}
              </LinkButton>
            ) : (
              <Button
                onClick={action.onClick}
                variant={action.variant || 'primary'}
                aria-label={`${action.label} - ${title}`}
              >
                {action.label}
              </Button>
            )
          )}
          {secondaryAction && (
            secondaryAction.to ? (
              <LinkButton
                to={secondaryAction.to}
                variant="secondary"
                aria-label={`${secondaryAction.label} - ${title}`}
              >
                {secondaryAction.label}
              </LinkButton>
            ) : (
              <Button
                onClick={secondaryAction.onClick}
                variant="secondary"
                aria-label={`${secondaryAction.label} - ${title}`}
              >
                {secondaryAction.label}
              </Button>
            )
          )}
        </div>
      )}
    </div>
  );
};

export default EmptyState; 