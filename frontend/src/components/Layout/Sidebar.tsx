import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { 
  HomeIcon, 
  BeakerIcon, 
  CubeIcon, 
  CreditCardIcon, 
  UserIcon, 
  DeviceMobileIcon, 
  ChatAlt2Icon,
  SparklesIcon,
  LockClosedIcon,
  ChartBarIcon
} from '@heroicons/react/outline';

interface SidebarProps {
  onClose: () => void;
  user: any;
}

interface NavItemProps {
  to: string;
  icon: React.ReactNode;
  text: string;
  isPremiumFeature?: boolean;
  userIsPremium?: boolean;
  count?: number;
}

const NavItem: React.FC<NavItemProps> = ({ 
  to, 
  icon, 
  text, 
  isPremiumFeature = false, 
  userIsPremium = false,
  count
}) => {
  const location = useLocation();
  const isActive = location.pathname === to || location.pathname.startsWith(`${to}/`);
  const isLocked = isPremiumFeature && !userIsPremium;
  
  return (
    <NavLink
      to={isLocked ? '/subscriptions' : to}
      className={`flex items-center px-4 py-3 text-sm font-medium rounded-md my-1 mx-2 transition-colors duration-200 ${
        isActive 
          ? 'bg-blue-100 text-blue-700' 
          : 'text-gray-600 hover:bg-gray-100'
      }`}
      onClick={(e) => isLocked && e.preventDefault()}
    >
      <div className={`w-5 h-5 mr-3 ${isActive ? 'text-blue-600' : 'text-gray-500'}`}>
        {icon}
      </div>
      <span className="flex-1">
        {text}
      </span>
      {count !== undefined && (
        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
          {count}
        </span>
      )}
      {isLocked && (
        <LockClosedIcon className="w-4 h-4 text-gray-400 ml-1" />
      )}
    </NavLink>
  );
};

const Sidebar: React.FC<SidebarProps> = ({ onClose, user }) => {
  const isPremium = user?.subscriptionPlan === 'premium';
  
  return (
    <div className="flex flex-col h-full bg-white overflow-y-auto">
      <div className="flex-1">
        {/* Main navigation */}
        <nav className="px-2 py-4 space-y-1">
          <div className="mb-2 px-4">
            <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Main
            </h3>
          </div>
          <NavItem to="/" icon={<HomeIcon />} text="Dashboard" />
          <NavItem to="/lab-tests" icon={<BeakerIcon />} text="Lab Tests" count={3} />
          <NavItem to="/supplements" icon={<CubeIcon />} text="Supplements" />
          
          <div className="mt-6 mb-2 px-4">
            <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Health
            </h3>
          </div>
          <NavItem to="/recommendations" icon={<SparklesIcon />} text="Recommendations" count={2} />
          <NavItem to="/wearables" icon={<DeviceMobileIcon />} text="Wearables" />
          <NavItem 
            to="/wearables/analytics" 
            icon={<ChartBarIcon />} 
            text="Advanced Analytics"
            isPremiumFeature
            userIsPremium={isPremium}
          />
          
          <div className="mt-6 mb-2 px-4">
            <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Account
            </h3>
          </div>
          <NavItem 
            to="/health-assistant" 
            icon={<ChatAlt2Icon />} 
            text="Health Assistant"
            isPremiumFeature
            userIsPremium={isPremium}
          />
          <NavItem to="/subscriptions" icon={<CreditCardIcon />} text="Subscriptions" />
          <NavItem to="/account" icon={<UserIcon />} text="Account" />
        </nav>
      </div>
      
      {/* Subscription status card */}
      <div className="m-4 p-4 rounded-lg border border-gray-200 bg-white shadow-sm">
        <div className={`text-sm ${isPremium ? 'text-blue-800' : 'text-gray-800'}`}>
          <div className="font-medium flex items-center">
            {isPremium ? (
              <>
                <SparklesIcon className="w-5 h-5 text-blue-500 mr-1" />
                Premium Plan
              </>
            ) : (
              <>Free Plan</>
            )}
          </div>
          <div className="mt-1 text-xs text-gray-500">
            {isPremium ? 'All features unlocked' : 'Upgrade for premium features'}
          </div>
        </div>
        
        {!isPremium && (
          <button
            className="mt-3 w-full inline-flex items-center justify-center px-3 py-2 border border-transparent text-xs font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Upgrade Now
          </button>
        )}
      </div>
    </div>
  );
};

export default Sidebar; 