import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { 
  HomeIcon,
  BeakerIcon,
  CubeIcon,
  UserIcon,
  ChatAltIcon
} from '@heroicons/react/outline';
import {
  HomeIcon as HomeIconSolid,
  BeakerIcon as BeakerIconSolid,
  CubeIcon as CubeIconSolid,
  UserIcon as UserIconSolid
} from '@heroicons/react/solid';

interface BottomNavProps {
  isPremium: boolean;
}

interface NavItemProps {
  to: string;
  label: string;
  activeIcon: React.ReactNode;
  inactiveIcon: React.ReactNode;
  disabled?: boolean;
}

const NavItem: React.FC<NavItemProps> = ({ to, label, activeIcon, inactiveIcon, disabled = false }) => {
  const location = useLocation();
  const isActive = location.pathname === to || location.pathname.startsWith(`${to}/`);
  
  if (disabled) {
    return (
      <div className="bottom-nav-item opacity-60">
        <div className="bottom-nav-icon text-gray-400">{inactiveIcon}</div>
        <span>{label}</span>
      </div>
    );
  }
  
  return (
    <NavLink 
      to={to} 
      className={({ isActive }) => 
        `bottom-nav-item ${isActive ? 'text-blue-600' : 'text-gray-500'}`
      }
    >
      <div className="bottom-nav-icon">
        {isActive ? activeIcon : inactiveIcon}
      </div>
      <span>{label}</span>
    </NavLink>
  );
};

const BottomNav: React.FC<BottomNavProps> = ({ isPremium }) => {
  return (
    <div className="bottom-nav z-20">
      <NavItem
        to="/"
        label="Home"
        activeIcon={<HomeIconSolid className="h-6 w-6" />}
        inactiveIcon={<HomeIcon className="h-6 w-6" />}
      />
      <NavItem
        to="/lab-tests"
        label="Labs"
        activeIcon={<BeakerIconSolid className="h-6 w-6" />}
        inactiveIcon={<BeakerIcon className="h-6 w-6" />}
      />
      <NavItem
        to="/supplements"
        label="Supplements"
        activeIcon={<CubeIconSolid className="h-6 w-6" />}
        inactiveIcon={<CubeIcon className="h-6 w-6" />}
      />
      <NavItem
        to="/health-assistant"
        label="Assistant"
        activeIcon={<ChatAltIcon className="h-6 w-6 fill-current" />}
        inactiveIcon={<ChatAltIcon className="h-6 w-6" />}
        disabled={!isPremium}
      />
      <NavItem
        to="/account"
        label="Profile"
        activeIcon={<UserIconSolid className="h-6 w-6" />}
        inactiveIcon={<UserIcon className="h-6 w-6" />}
      />
    </div>
  );
};

export default BottomNav; 