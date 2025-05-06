import React from 'react';

export type ProgressColor = 'blue' | 'green' | 'red' | 'yellow' | 'gray' | 'purple';

interface ProgressProps {
  value: number;
  max?: number;
  color?: ProgressColor;
  showValue?: boolean;
  valueFormat?: (value: number, max: number) => string;
  size?: 'sm' | 'md' | 'lg';
  label?: React.ReactNode;
  className?: string;
}

const Progress: React.FC<ProgressProps> = ({
  value,
  max = 100,
  color = 'blue',
  showValue = false,
  valueFormat,
  size = 'md',
  label,
  className = ''
}) => {
  // Ensure value is between 0 and max
  const clampedValue = Math.max(0, Math.min(value, max));
  const percentage = (clampedValue / max) * 100;
  
  // Format the value display
  const formattedValue = valueFormat 
    ? valueFormat(clampedValue, max) 
    : `${Math.round(percentage)}%`;
  
  // Height based on size
  const heightClass = {
    sm: 'h-1.5',
    md: 'h-2.5',
    lg: 'h-4'
  }[size];
  
  // Color classes
  const colorClass = {
    blue: 'bg-blue-600',
    green: 'bg-green-600',
    red: 'bg-red-600',
    yellow: 'bg-yellow-600',
    gray: 'bg-gray-600',
    purple: 'bg-purple-600'
  }[color];
  
  return (
    <div className={className}>
      {(label || showValue) && (
        <div className="flex justify-between items-center mb-1">
          {label && <div className="text-sm font-medium text-gray-700">{label}</div>}
          {showValue && <div className="text-sm font-medium text-gray-500">{formattedValue}</div>}
        </div>
      )}
      <div className={`progress ${heightClass} overflow-hidden`} role="progressbar" 
          aria-valuenow={clampedValue} aria-valuemin={0} aria-valuemax={max}>
        <div 
          className={`progress-bar ${colorClass} ${heightClass}`} 
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
    </div>
  );
};

export default Progress; 