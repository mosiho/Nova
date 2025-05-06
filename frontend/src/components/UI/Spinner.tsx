import React from 'react';

export type SpinnerSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
export type SpinnerVariant = 'circle' | 'dots' | 'pulse' | 'wave' | 'bounce';

interface SpinnerProps {
  /**
   * The size of the spinner
   */
  size?: SpinnerSize;
  /**
   * The color of the spinner (any valid CSS color)
   */
  color?: string;
  /**
   * The type of spinner animation
   */
  variant?: SpinnerVariant;
  /**
   * Whether to display a loading text next to the spinner
   */
  withText?: boolean;
  /**
   * Custom loading text
   */
  text?: string;
  /**
   * Additional classes to apply to the spinner container
   */
  className?: string;
}

/**
 * A versatile loading spinner component with multiple animation styles
 */
const Spinner: React.FC<SpinnerProps> = ({
  size = 'md',
  color = 'currentColor',
  variant = 'circle',
  withText = false,
  text = 'Loading...',
  className = '',
}) => {
  // Size maps to dimensions
  const sizeMap = {
    xs: 'w-3 h-3',
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8',
    xl: 'w-12 h-12',
  };

  const sizeClass = sizeMap[size] || sizeMap.md;
  
  // Spinner variants
  const renderSpinner = () => {
    switch (variant) {
      case 'dots':
        return (
          <div className={`flex space-x-1 ${sizeClass}`}>
            <div className="animate-bounce-delay-0 rounded-full" style={{ backgroundColor: color, width: '20%', height: '20%' }}></div>
            <div className="animate-bounce-delay-100 rounded-full" style={{ backgroundColor: color, width: '20%', height: '20%' }}></div>
            <div className="animate-bounce-delay-200 rounded-full" style={{ backgroundColor: color, width: '20%', height: '20%' }}></div>
          </div>
        );
        
      case 'pulse':
        return (
          <div className={`${sizeClass} animate-pulse`} style={{ backgroundColor: color, borderRadius: '50%' }}></div>
        );
        
      case 'wave':
        return (
          <div className={`flex items-end space-x-1 ${sizeClass}`}>
            <div className="animate-wave-delay-0" style={{ backgroundColor: color, width: '15%', height: '60%' }}></div>
            <div className="animate-wave-delay-100" style={{ backgroundColor: color, width: '15%', height: '80%' }}></div>
            <div className="animate-wave-delay-200" style={{ backgroundColor: color, width: '15%', height: '100%' }}></div>
            <div className="animate-wave-delay-300" style={{ backgroundColor: color, width: '15%', height: '80%' }}></div>
            <div className="animate-wave-delay-400" style={{ backgroundColor: color, width: '15%', height: '60%' }}></div>
          </div>
        );
        
      case 'bounce':
        return (
          <div className={`animate-bounce ${sizeClass}`}>
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 4V20M12 20L6 14M12 20L18 14" 
                    stroke={color} 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round" />
            </svg>
          </div>
        );
        
      // Default circle spinner
      default:
        return (
          <div className={`animate-spin ${sizeClass}`}>
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" 
                    fill={color} 
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
              </path>
            </svg>
          </div>
        );
    }
  };

  return (
    <div className={`flex items-center justify-center ${className}`} role="status">
      {renderSpinner()}
      {withText && (
        <span className="ml-2 text-sm font-medium">{text}</span>
      )}
      <span className="sr-only">Loading</span>
    </div>
  );
};

export default Spinner; 