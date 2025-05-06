import React, { useState } from 'react';

export interface CardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  hoverable?: boolean;
  ariaLabel?: string;
  animated?: boolean;
}

export interface CardHeaderProps {
  children: React.ReactNode;
  className?: string;
  actions?: React.ReactNode;
}

export interface CardBodyProps {
  children: React.ReactNode;
  className?: string;
}

export interface CardFooterProps {
  children: React.ReactNode;
  className?: string;
}

export const Card: React.FC<CardProps> = ({
  children,
  className = '',
  onClick,
  hoverable = false,
  ariaLabel,
  animated = true
}) => {
  const [isPressed, setIsPressed] = useState(false);
  const isInteractive = !!onClick;
  
  // Handle keyboard interaction for clickable cards
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (isInteractive && (e.key === 'Enter' || e.key === ' ')) {
      e.preventDefault();
      setIsPressed(true);
      onClick();
    }
  };
  
  const handleKeyUp = () => {
    if (isInteractive) {
      setIsPressed(false);
    }
  };
  
  const handleMouseDown = () => {
    if (isInteractive) {
      setIsPressed(true);
    }
  };
  
  const handleMouseUp = () => {
    if (isInteractive) {
      setIsPressed(false);
    }
  };
  
  const handleMouseLeave = () => {
    if (isInteractive) {
      setIsPressed(false);
    }
  };
  
  // CSS class that includes transitions and animations based on states
  const cardClasses = `
    card 
    ${hoverable ? 'hover:shadow-lg cursor-pointer' : ''} 
    ${className}
    ${isInteractive && animated ? 'transform transition-all duration-200' : ''}
    ${isPressed && animated ? 'scale-98' : ''}
    ${animated ? 'animate-fade-in' : ''}
  `;
  
  return (
    <div 
      className={cardClasses}
      onClick={onClick}
      onKeyDown={handleKeyDown}
      onKeyUp={handleKeyUp}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseLeave}
      role={isInteractive ? 'button' : undefined}
      tabIndex={isInteractive ? 0 : undefined}
      aria-label={ariaLabel}
      aria-pressed={isInteractive ? isPressed : undefined}
    >
      {children}
    </div>
  );
};

export const CardHeader: React.FC<CardHeaderProps> = ({
  children,
  className = '',
  actions
}) => {
  return (
    <div 
      className={`card-header ${className} ${actions ? 'flex justify-between items-center' : ''}`}
    >
      <div>{children}</div>
      {actions && (
        <div className="card-actions transition-transform duration-100 hover:scale-102">
          {actions}
        </div>
      )}
    </div>
  );
};

export const CardBody: React.FC<CardBodyProps> = ({
  children,
  className = ''
}) => {
  return (
    <div className={`card-body ${className}`}>
      {children}
    </div>
  );
};

export const CardFooter: React.FC<CardFooterProps> = ({
  children,
  className = ''
}) => {
  return (
    <div className={`card-footer ${className}`}>
      {children}
    </div>
  );
};

export default Object.assign(Card, {
  Header: CardHeader,
  Body: CardBody,
  Footer: CardFooter
}); 