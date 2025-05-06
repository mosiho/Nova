import React from 'react';

export type SkeletonVariant = 'text' | 'circle' | 'rectangle';

interface SkeletonProps {
  variant?: SkeletonVariant;
  width?: string | number;
  height?: string | number;
  count?: number;
  className?: string;
  circle?: boolean;
}

const Skeleton: React.FC<SkeletonProps> = ({
  variant = 'text',
  width,
  height,
  count = 1,
  className = '',
  circle = false
}) => {
  const getClassName = () => {
    // If circle prop is true, override variant to 'circle'
    const finalVariant = circle ? 'circle' : variant;
    
    switch (finalVariant) {
      case 'circle':
        return 'skeleton-circle';
      case 'text':
        return 'skeleton-text';
      default:
        return 'skeleton';
    }
  };
  
  const baseClass = getClassName();
  const style: React.CSSProperties = {};
  
  if (width) {
    style.width = typeof width === 'number' ? `${width}px` : width;
  }
  
  if (height) {
    style.height = typeof height === 'number' ? `${height}px` : height;
  }
  
  // Create the specified number of skeleton items
  const items = [];
  for (let i = 0; i < count; i++) {
    items.push(
      <div
        key={i}
        className={`${baseClass} ${className}`}
        style={style}
        aria-hidden="true"
      />
    );
  }
  
  return <>{items}</>;
};

// Predefined skeleton components
interface SkeletonTextProps {
  lines?: number;
  className?: string;
  lineHeight?: string | number;
  width?: string | number;
}

export const SkeletonText: React.FC<SkeletonTextProps> = ({
  lines = 3,
  className = '',
  lineHeight,
  width
}) => {
  return (
    <div className={className}>
      {Array.from({ length: lines }).map((_, index) => (
        <Skeleton
          key={index}
          variant="text"
          className="mb-2 last:mb-0"
          height={lineHeight}
          width={index === lines - 1 && width ? (typeof width === 'number' ? `${width * 0.8}px` : width) : width}
        />
      ))}
    </div>
  );
};

interface SkeletonCardProps {
  header?: boolean;
  footer?: boolean;
  lines?: number;
  className?: string;
}

export const SkeletonCard: React.FC<SkeletonCardProps> = ({
  header = true,
  footer = false,
  lines = 3,
  className = ''
}) => {
  return (
    <div className={`card ${className}`}>
      {header && (
        <div className="card-header">
          <Skeleton variant="text" width="40%" height={20} />
        </div>
      )}
      <div className="card-body">
        <SkeletonText lines={lines} />
      </div>
      {footer && (
        <div className="card-footer">
          <div className="flex justify-end">
            <Skeleton variant="rectangle" width={100} height={30} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Skeleton; 