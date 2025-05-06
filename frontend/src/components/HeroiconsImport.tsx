import React from 'react';
// For Heroicons v1.0.6, we import directly from the specific icon file
import { HomeIcon } from '@heroicons/react/solid';
import { BellIcon } from '@heroicons/react/outline';

const HeroiconsImport: React.FC = () => {
  return (
    <div>
      <HomeIcon className="h-6 w-6" />
      <BellIcon className="h-6 w-6" />
    </div>
  );
};

export default HeroiconsImport; 