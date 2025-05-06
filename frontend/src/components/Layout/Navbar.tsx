import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  MenuIcon,
  BellIcon,
  ChevronDownIcon,
  LogoutIcon,
  UserCircleIcon,
  CogIcon 
} from '@heroicons/react/outline';
import { useAuth } from '../../contexts/AuthContext';

interface NavbarProps {
  onSidebarToggle: () => void;
  user: any;
  isMobile: boolean;
}

const Navbar: React.FC<NavbarProps> = ({ onSidebarToggle, user, isMobile }) => {
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const userMenuRef = useRef<HTMLDivElement>(null);
  const notificationsRef = useRef<HTMLDivElement>(null);
  const { logout } = useAuth();
  
  const toggleUserMenu = () => {
    setUserMenuOpen(!userMenuOpen);
    if (notificationsOpen) setNotificationsOpen(false);
  };
  
  const toggleNotifications = () => {
    setNotificationsOpen(!notificationsOpen);
    if (userMenuOpen) setUserMenuOpen(false);
  };

  // Close menus when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setUserMenuOpen(false);
      }
      if (notificationsRef.current && !notificationsRef.current.contains(event.target as Node)) {
        setNotificationsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  
  // Mobile navbar: simplified version
  if (isMobile) {
    return (
      <div className="flex items-center space-x-1">
        {/* Notifications icon */}
        <div className="relative" ref={notificationsRef}>
          <button
            onClick={toggleNotifications}
            className="p-2 text-gray-500 rounded-full hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
            aria-expanded={notificationsOpen}
          >
            <span className="sr-only">View notifications</span>
            <BellIcon className="h-6 w-6" />
            {/* Notification indicator */}
            <span className="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full"></span>
          </button>
          
          {/* Mobile notifications dropdown */}
          {notificationsOpen && (
            <div className="origin-top-right absolute right-0 mt-2 w-80 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-50" 
              role="menu" 
              aria-orientation="vertical"
            >
              <div className="py-1" role="none">
                <div className="px-4 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider border-b">
                  Notifications
                </div>
                <div className="max-h-60 overflow-y-auto">
                  <div className="px-4 py-3 border-b">
                    <p className="text-sm text-gray-700">
                      <span className="font-medium">New lab results</span> are ready for your review
                    </p>
                    <p className="text-xs text-gray-500 mt-1">2 hours ago</p>
                  </div>
                  <div className="px-4 py-3 border-b">
                    <p className="text-sm text-gray-700">
                      Your next blood test is <span className="font-medium">due in 7 days</span>
                    </p>
                    <p className="text-xs text-gray-500 mt-1">1 day ago</p>
                  </div>
                </div>
                <div className="px-4 py-2 text-sm text-center text-blue-600 hover:text-blue-700">
                  <Link to="/notifications">View all notifications</Link>
                </div>
              </div>
            </div>
          )}
        </div>
        
        {/* User menu */}
        <div className="relative" ref={userMenuRef}>
          <button
            onClick={toggleUserMenu}
            className="p-2 text-gray-500 rounded-full hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
            aria-expanded={userMenuOpen}
          >
            <span className="sr-only">Open user menu</span>
            <UserCircleIcon className="h-6 w-6" />
          </button>
          
          {/* Mobile user dropdown */}
          {userMenuOpen && (
            <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-50" 
              role="menu" 
              aria-orientation="vertical"
            >
              <div className="px-4 py-2 text-xs text-gray-500 border-b">
                <div className="font-medium text-sm text-gray-700">{user?.firstName} {user?.lastName}</div>
                <div className="text-xs text-gray-500">{user?.email}</div>
                <div className="mt-1">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    user?.subscriptionPlan === 'premium' ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800'
                  }`}>
                    {user?.subscriptionPlan === 'premium' ? 'Premium' : 'Free'}
                  </span>
                </div>
              </div>
              <Link
                to="/account"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                role="menuitem"
              >
                <div className="flex items-center">
                  <UserCircleIcon className="h-4 w-4 mr-2" />
                  Profile
                </div>
              </Link>
              <Link
                to="/account/settings"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                role="menuitem"
              >
                <div className="flex items-center">
                  <CogIcon className="h-4 w-4 mr-2" />
                  Settings
                </div>
              </Link>
              <button
                onClick={logout}
                className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                role="menuitem"
              >
                <div className="flex items-center">
                  <LogoutIcon className="h-4 w-4 mr-2" />
                  Logout
                </div>
              </button>
            </div>
          )}
        </div>
      </div>
    );
  }
  
  // Desktop navbar: full version
  return (
    <header className="bg-white shadow">
      <div className="px-6 flex items-center justify-between h-16">
        <div className="flex items-center">
          <button
            onClick={onSidebarToggle}
            className="lg:hidden text-gray-500 focus:outline-none"
          >
            <MenuIcon className="h-6 w-6" />
          </button>
          <div className="lg:ml-4 lg:flex">
            <h1 className="text-lg font-semibold text-gray-700">
              {/* Dynamic page title based on current route would go here */}
              Nova Health Dashboard
            </h1>
          </div>
        </div>
        
        <div className="flex items-center">
          {/* Notifications dropdown */}
          <div className="relative mr-4" ref={notificationsRef}>
            <button
              onClick={toggleNotifications}
              className="p-1 text-gray-500 rounded-full hover:text-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
              aria-expanded={notificationsOpen}
            >
              <span className="sr-only">View notifications</span>
              <BellIcon className="h-6 w-6" />
              {/* Notification indicator */}
              <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full"></span>
            </button>
            
            {/* Notifications dropdown menu */}
            {notificationsOpen && (
              <div className="origin-top-right absolute right-0 mt-2 w-80 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-50" 
                role="menu" 
                aria-orientation="vertical"
              >
                <div className="py-1" role="none">
                  <div className="px-4 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider border-b">
                    Notifications
                  </div>
                  <div className="max-h-96 overflow-y-auto">
                    <div className="px-4 py-3 border-b">
                      <p className="text-sm text-gray-700">
                        <span className="font-medium">New lab results</span> are ready for your review
                      </p>
                      <p className="text-xs text-gray-500 mt-1">2 hours ago</p>
                    </div>
                    <div className="px-4 py-3 border-b">
                      <p className="text-sm text-gray-700">
                        Your next blood test is <span className="font-medium">due in 7 days</span>
                      </p>
                      <p className="text-xs text-gray-500 mt-1">1 day ago</p>
                    </div>
                    <div className="px-4 py-3 border-b">
                      <p className="text-sm text-gray-700">
                        <span className="font-medium">3 new recommendations</span> based on your latest labs
                      </p>
                      <p className="text-xs text-gray-500 mt-1">3 days ago</p>
                    </div>
                  </div>
                  <div className="px-4 py-2 text-sm text-center text-blue-600 hover:text-blue-700">
                    <Link to="/notifications">View all notifications</Link>
                  </div>
                </div>
              </div>
            )}
          </div>
          
          {/* User menu */}
          <div className="relative ml-3" ref={userMenuRef}>
            <button
              onClick={toggleUserMenu}
              className="flex items-center max-w-xs text-sm bg-white rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              aria-expanded={userMenuOpen}
            >
              <span className="sr-only">Open user menu</span>
              <div className="flex items-center">
                <span className="hidden md:flex md:flex-col md:items-end md:leading-tight mr-2">
                  <span className="text-sm font-medium text-gray-700">{user?.firstName} {user?.lastName}</span>
                  <span className="text-xs text-gray-500">{user?.subscriptionPlan === 'premium' ? 'Premium' : 'Free'}</span>
                </span>
                <span className="h-8 w-8 rounded-full overflow-hidden bg-gray-100">
                  <UserCircleIcon className="h-full w-full text-gray-500" />
                </span>
                <ChevronDownIcon className="ml-1 h-5 w-5 text-gray-400" />
              </div>
            </button>
            
            {/* User dropdown menu */}
            {userMenuOpen && (
              <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-50" 
                role="menu" 
                aria-orientation="vertical"
              >
                <div className="px-4 py-2 text-xs text-gray-500 border-b">
                  <div className="font-medium text-sm text-gray-700">{user?.email}</div>
                  <div className="mt-1">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      user?.subscriptionPlan === 'premium' ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800'
                    }`}>
                      {user?.subscriptionPlan === 'premium' ? 'Premium' : 'Free'}
                    </span>
                  </div>
                </div>
                <Link
                  to="/account"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  role="menuitem"
                >
                  <div className="flex items-center">
                    <UserCircleIcon className="h-4 w-4 mr-2" />
                    Profile
                  </div>
                </Link>
                <Link
                  to="/account/settings"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  role="menuitem"
                >
                  <div className="flex items-center">
                    <CogIcon className="h-4 w-4 mr-2" />
                    Settings
                  </div>
                </Link>
                <button
                  onClick={logout}
                  className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  role="menuitem"
                >
                  <div className="flex items-center">
                    <LogoutIcon className="h-4 w-4 mr-2" />
                    Logout
                  </div>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar; 