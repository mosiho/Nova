import React, { ReactNode, useState, useRef, useId, useEffect } from 'react';

export type TooltipPlacement = 'top' | 'right' | 'bottom' | 'left';

export interface TooltipProps {
  /**
   * Tooltip text content
   */
  content: string;
  /**
   * Element that triggers the tooltip
   */
  children: ReactNode;
  /**
   * Tooltip position
   */
  placement?: TooltipPlacement;
  /**
   * Additional classes for the tooltip container
   */
  className?: string;
  /**
   * Additional classes for the tooltip text
   */
  tooltipClassName?: string;
  /**
   * Whether to show the tooltip on hover (default true)
   */
  showOnHover?: boolean;
  /**
   * Animation duration in ms
   */
  animationDuration?: number;
  /**
   * Delay before showing tooltip (ms)
   */
  showDelay?: number;
  /**
   * Delay before hiding tooltip (ms)
   */
  hideDelay?: number;
}

const Tooltip: React.FC<TooltipProps> = ({
  content,
  children,
  placement = 'top',
  className = '',
  tooltipClassName = '',
  showOnHover = true,
  animationDuration = 200,
  showDelay = 200,
  hideDelay = 100,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const triggerRef = useRef<HTMLDivElement>(null);
  const tooltipId = useId();
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  
  useEffect(() => {
    return () => {
      // Clean up timers
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  // Position classes
  const positionClasses = {
    top: 'tooltip-top',
    right: 'tooltip-right',
    bottom: 'tooltip-bottom',
    left: 'tooltip-left',
  };

  const handleShow = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
    
    // Add a small delay before showing the tooltip
    timerRef.current = setTimeout(() => {
      setIsAnimating(true);
      setIsVisible(true);
    }, showDelay);
  };

  const handleHide = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
    
    // Add a small delay before hiding the tooltip
    timerRef.current = setTimeout(() => {
      setIsAnimating(false);
      
      // Wait for animation to complete before fully hiding
      setTimeout(() => {
        if (!isAnimating) setIsVisible(false);
      }, animationDuration);
    }, hideDelay);
  };

  const handleMouseEnter = () => {
    if (showOnHover) {
      handleShow();
    }
  };

  const handleMouseLeave = () => {
    if (showOnHover) {
      handleHide();
    }
  };

  const handleFocus = () => {
    handleShow();
  };

  const handleBlur = () => {
    handleHide();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      handleHide();
    }
  };

  // Make sure the children are properly wrapped to handle focus events
  const wrappedChildren = React.Children.map(children, (child) => {
    if (React.isValidElement(child)) {
      return React.cloneElement(child, {
        'aria-describedby': isVisible ? tooltipId : undefined,
        ...child.props,
      });
    }
    return child;
  });

  // Animation styles based on visibility
  const tooltipAnimationStyle = {
    transition: `transform ${animationDuration}ms, opacity ${animationDuration}ms`,
    opacity: isAnimating ? 1 : 0,
    transform: isAnimating 
      ? 'scale(1) translateY(0)' 
      : placement === 'top' || placement === 'bottom'
        ? `scale(0.95) translateY(${placement === 'top' ? '10px' : '-10px'})`
        : `scale(0.95) translateX(${placement === 'left' ? '10px' : '-10px'})`,
  };

  return (
    <div 
      className={`tooltip ${className}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onFocus={handleFocus}
      onBlur={handleBlur}
      onKeyDown={handleKeyDown}
      ref={triggerRef}
      tabIndex={0}
    >
      {wrappedChildren}
      {(isVisible || isAnimating) && (
        <div 
          id={tooltipId}
          className={`tooltip-text ${positionClasses[placement]} ${tooltipClassName}`}
          role="tooltip"
          style={tooltipAnimationStyle}
        >
          {content}
        </div>
      )}
    </div>
  );
};

export default Tooltip; 