import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export type ButtonVariant = 'primary' | 'secondary' | 'gray' | 'danger' | 'success' | 'link';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  fullWidth?: boolean;
  animated?: boolean;
}

interface LinkButtonProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  variant?: ButtonVariant;
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  to: string;
  fullWidth?: boolean;
  animated?: boolean;
}

const getButtonClass = (
  variant: ButtonVariant = 'primary',
  isLoading: boolean = false,
  fullWidth: boolean = false,
  animated: boolean = true
): string => {
  const baseClass = {
    primary: 'btn-primary',
    secondary: 'btn-secondary',
    gray: 'btn-gray',
    danger: 'btn-danger',
    success: 'btn-success',
    link: 'btn-link'
  }[variant];
  
  const animationClass = animated ? 'transition-all duration-200 hover:shadow-md active:shadow-inner active:transform active:translate-y-px' : '';
  
  return `${baseClass} ${isLoading ? 'btn-loading' : ''} ${fullWidth ? 'w-full' : ''} ${animationClass}`;
};

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  isLoading = false,
  leftIcon,
  rightIcon,
  children,
  disabled,
  className = '',
  fullWidth = false,
  animated = true,
  ...props
}) => {
  const [isHovered, setIsHovered] = useState(false);
  
  // Loading animation class
  const loadingAnimationClass = isLoading && animated ? 'animate-pulse' : '';
  
  // Icon animation classes
  const iconAnimationClass = animated && isHovered && !isLoading ? 'animate-bounce-subtle' : '';
  
  return (
    <button
      disabled={disabled || isLoading}
      className={`${getButtonClass(variant, isLoading, fullWidth, animated)} ${loadingAnimationClass} ${className}`}
      aria-busy={isLoading}
      aria-disabled={disabled || isLoading}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      {...props}
    >
      {isLoading && <span className="sr-only">Loading</span>}
      {!isLoading && leftIcon && (
        <span 
          className={`mr-2 ${iconAnimationClass}`} 
          aria-hidden="true"
        >
          {leftIcon}
        </span>
      )}
      <span className={animated ? 'transition-all duration-150' : ''}>
        {children}
      </span>
      {!isLoading && rightIcon && (
        <span 
          className={`ml-2 ${iconAnimationClass}`} 
          aria-hidden="true"
        >
          {rightIcon}
        </span>
      )}
    </button>
  );
};

export const LinkButton: React.FC<LinkButtonProps> = ({
  variant = 'primary',
  isLoading = false,
  leftIcon,
  rightIcon,
  children,
  className = '',
  to,
  fullWidth = false,
  animated = true,
  ...props
}) => {
  const [isHovered, setIsHovered] = useState(false);
  
  // Icon animation classes
  const iconAnimationClass = animated && isHovered && !isLoading ? 'animate-bounce-subtle' : '';
  
  return (
    <Link
      to={to}
      className={`${getButtonClass(variant, isLoading, fullWidth, animated)} ${className}`}
      aria-busy={isLoading}
      role="button"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      {...props}
    >
      {isLoading && <span className="sr-only">Loading</span>}
      {!isLoading && leftIcon && (
        <span 
          className={`mr-2 ${iconAnimationClass}`}
          aria-hidden="true"
        >
          {leftIcon}
        </span>
      )}
      <span className={animated ? 'transition-all duration-150' : ''}>
        {children}
      </span>
      {!isLoading && rightIcon && (
        <span 
          className={`ml-2 ${iconAnimationClass}`} 
          aria-hidden="true"
        >
          {rightIcon}
        </span>
      )}
    </Link>
  );
};

export default Button; 