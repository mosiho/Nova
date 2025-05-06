import React from 'react';
import { useAccessibility } from '../App';
import { Button } from './UI/Button';
import {
  LightBulbIcon,
  SearchIcon,
  MinusSmIcon,
  PlusSmIcon,
  RefreshIcon
} from '@heroicons/react/outline';

interface AccessibilityControlsProps {
  className?: string;
}

const AccessibilityControls: React.FC<AccessibilityControlsProps> = ({ className = '' }) => {
  const {
    highContrast,
    toggleHighContrast,
    fontSize,
    increaseFontSize,
    decreaseFontSize,
    resetFontSize
  } = useAccessibility();

  return (
    <div 
      className={`p-4 bg-white rounded-lg shadow ${className}`}
      role="region"
      aria-label="Accessibility controls"
    >
      <h2 className="text-lg font-semibold mb-4">Accessibility Settings</h2>
      
      <div className="space-y-4">
        {/* High contrast toggle */}
        <div className="flex items-center justify-between">
          <label htmlFor="high-contrast" className="text-sm font-medium">
            High Contrast Mode:
          </label>
          <Button
            id="high-contrast"
            onClick={toggleHighContrast}
            aria-pressed={highContrast}
            variant={highContrast ? 'primary' : 'secondary'}
            leftIcon={highContrast ? <LightBulbIcon className="w-4 h-4 transform rotate-180" /> : <LightBulbIcon className="w-4 h-4" />}
          >
            {highContrast ? 'On' : 'Off'}
          </Button>
        </div>
        
        {/* Font size controls */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <label id="font-size-label" className="text-sm font-medium">
              Font Size: {fontSize}%
            </label>
            <Button
              onClick={resetFontSize}
              variant="secondary"
              leftIcon={<RefreshIcon className="w-4 h-4" />}
              aria-label="Reset font size to default"
              aria-controls="font-size-controls"
            >
              Reset
            </Button>
          </div>
          
          <div 
            className="flex items-center space-x-2"
            id="font-size-controls"
            role="group"
            aria-labelledby="font-size-label"
          >
            <Button
              onClick={decreaseFontSize}
              disabled={fontSize <= 80}
              leftIcon={<MinusSmIcon className="w-4 h-4" />}
              aria-label="Decrease font size"
            >
              Smaller
            </Button>
            
            <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
              <div 
                className="h-full bg-blue-600"
                style={{ width: `${((fontSize - 80) / 70) * 100}%` }}
                role="progressbar"
                aria-valuenow={fontSize}
                aria-valuemin={80}
                aria-valuemax={150}
              />
            </div>
            
            <Button
              onClick={increaseFontSize}
              disabled={fontSize >= 150}
              leftIcon={<PlusSmIcon className="w-4 h-4" />}
              aria-label="Increase font size"
            >
              Larger
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccessibilityControls; 