import React, { useState } from 'react';

export type BadgeColor = 'blue' | 'green' | 'red' | 'yellow' | 'gray' | 'purple';
export type BadgeVariant = 'solid' | 'outline';

interface BadgeProps {
  color?: BadgeColor;
  variant?: BadgeVariant;
  children: React.ReactNode;
  className?: string;
  icon?: React.ReactNode;
  onClick?: () => void;
  ariaLabel?: string;
  animated?: boolean;
}

const Badge: React.FC<BadgeProps> = ({
  color = 'gray',
  variant = 'solid',
  children,
  className = '',
  icon,
  onClick,
  ariaLabel,
  animated = true
}) => {
  const [isPressed, setIsPressed] = useState(false);
  
  const getBaseClass = (): string => {
    if (variant === 'outline') {
      return `badge-outline badge-outline-${color}`;
    }
    
    return `badge-${color}`;
  };
  
  const isInteractive = !!onClick;
  
  // Add animation classes
  const animationClass = animated 
    ? 'transition-all duration-150' 
    : '';
  
  const pressedClass = isPressed && animated 
    ? 'transform scale-95' 
    : '';
  
  const interactiveClass = isInteractive && animated
    ? 'hover:shadow-sm hover:scale-105' 
    : '';
  
  const badgeClass = `
    badge 
    ${getBaseClass()} 
    ${isInteractive ? 'cursor-pointer' : ''} 
    ${className}
    ${animationClass}
    ${pressedClass}
    ${interactiveClass}
  `;
  
  // Handle keyboard interaction for interactive badges
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
  
  return (
    <span 
      className={badgeClass}
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
      {icon && (
        <span 
          className={`mr-1 ${animated ? 'inline-block transform transition-transform group-hover:rotate-6' : ''}`} 
          aria-hidden="true"
        >
          {icon}
        </span>
      )}
      <span className={animated ? 'transition-all duration-150' : ''}>
        {children}
      </span>
    </span>
  );
};

export default Badge; 