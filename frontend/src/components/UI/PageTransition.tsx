import React, { useState, useEffect } from 'react';

interface PageTransitionProps {
  children: React.ReactNode;
  location?: string;
  className?: string;
  transitionType?: 'fade' | 'slide-up' | 'slide-down' | 'scale' | 'none';
  duration?: number;
}

/**
 * A wrapper component that adds smooth transitions when navigating between pages
 */
const PageTransition: React.FC<PageTransitionProps> = ({
  children,
  location,
  className = '',
  transitionType = 'fade',
  duration = 300,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [currentChildren, setCurrentChildren] = useState(children);

  useEffect(() => {
    // Make component visible on mount
    setIsVisible(true);
  }, []);

  useEffect(() => {
    // When location/children change, start transition
    if (children !== currentChildren) {
      // Hide component
      setIsVisible(false);

      // After transition duration, update children and show again
      const timer = setTimeout(() => {
        setCurrentChildren(children);
        setIsVisible(true);
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [children, currentChildren, duration]);

  // Generate animation styles
  const animationStyle: React.CSSProperties = {
    transition: `opacity ${duration}ms, transform ${duration}ms`,
    opacity: isVisible ? 1 : 0,
  };

  // Add transform based on transition type
  if (transitionType === 'slide-up') {
    animationStyle.transform = isVisible ? 'translateY(0)' : 'translateY(20px)';
  } else if (transitionType === 'slide-down') {
    animationStyle.transform = isVisible ? 'translateY(0)' : 'translateY(-20px)';
  } else if (transitionType === 'scale') {
    animationStyle.transform = isVisible ? 'scale(1)' : 'scale(0.95)';
  }

  // Use no animation for transitionType === 'none'
  const finalStyle = transitionType === 'none' ? {} : animationStyle;

  return (
    <div className={className} style={finalStyle}>
      {currentChildren}
    </div>
  );
};

export default PageTransition; 