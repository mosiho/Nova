import React from 'react';

interface SkipNavigationProps {
  /**
   * The ID of the main content element to focus on
   */
  mainContentId: string;
  /**
   * Optional link text (defaults to "Skip to main content")
   */
  label?: string;
  /**
   * Optional additional className
   */
  className?: string;
}

/**
 * A component that allows keyboard users to skip navigation and go directly to main content
 * This is especially important for screen reader users and keyboard-only users
 */
const SkipNavigation: React.FC<SkipNavigationProps> = ({
  mainContentId,
  label = 'Skip to main content',
  className = '',
}) => {
  return (
    <a
      href={`#${mainContentId}`}
      className={`sr-only focus:not-sr-only focus:absolute focus:top-0 focus:left-0 focus:z-50 focus:p-4 focus:bg-white focus:text-primary-700 focus:shadow-lg ${className}`}
    >
      {label}
    </a>
  );
};

export default SkipNavigation; 