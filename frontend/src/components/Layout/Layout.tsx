import React, { useState, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { MenuIcon, XIcon } from '@heroicons/react/outline';
import { useAuth } from '../../contexts/AuthContext';
import Sidebar from './Sidebar';
import Navbar from './Navbar';
import BottomNav from './BottomNav';
import SkipNavigation from '../UI/SkipNavigation';
import '../../styles/animations.css';

const Layout: React.FC = () => {
  const { user } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [pageTransition, setPageTransition] = useState(false);
  const location = useLocation();
  const isPremium = user?.subscriptionPlan === 'premium';
  
  // Close sidebar and trigger page transition when route changes
  useEffect(() => {
    setSidebarOpen(false);
    
    // Trigger page transition animation
    setPageTransition(true);
    const timer = setTimeout(() => {
      setPageTransition(false);
    }, 300);
    
    return () => clearTimeout(timer);
  }, [location]);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="flex h-full bg-gray-50">
      {/* Skip navigation for keyboard users */}
      <SkipNavigation mainContentId="main-content" />
      
      {/* Mobile sidebar overlay */}
      <div 
        className={`fixed inset-0 z-20 bg-gray-600 bg-opacity-75 transition-opacity duration-300 ease-in-out lg:hidden ${
          sidebarOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`} 
        onClick={toggleSidebar}
        aria-hidden="true"
      ></div>

      {/* Mobile sidebar */}
      <div 
        className={`fixed inset-y-0 left-0 z-30 w-64 bg-white transform transition-transform duration-300 ease-in-out lg:hidden ${
          sidebarOpen ? 'translate-x-0 shadow-lg' : '-translate-x-full'
        }`}
        role="navigation"
        aria-label="Mobile navigation"
      >
        <div className="flex items-center justify-between h-16 px-4 border-b">
          <h2 className="text-xl font-bold text-blue-600">Nova Health</h2>
          <button 
            onClick={toggleSidebar}
            className="text-gray-500 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500 transition-colors duration-200"
            aria-label="Close sidebar"
          >
            <span className="sr-only">Close sidebar</span>
            <XIcon className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
        <Sidebar onClose={toggleSidebar} user={user} />
      </div>

      {/* Desktop sidebar */}
      <div 
        className="hidden lg:flex lg:flex-shrink-0 transition-all duration-300" 
        role="navigation" 
        aria-label="Main navigation"
      >
        <div className="w-64 border-r border-gray-200 bg-white">
          <Sidebar onClose={() => {}} user={user} />
        </div>
      </div>

      {/* Main content */}
      <div className="flex flex-col flex-1 w-0 overflow-hidden">
        {/* Mobile navbar */}
        <div 
          className="sticky top-0 z-10 flex-shrink-0 flex h-16 bg-white border-b border-gray-200 lg:hidden shadow-sm"
          role="banner"
        >
          <button
            type="button"
            className="px-4 text-gray-500 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500 transition-colors duration-200"
            onClick={toggleSidebar}
            aria-label="Open sidebar"
          >
            <span className="sr-only">Open sidebar</span>
            <MenuIcon className="h-6 w-6" aria-hidden="true" />
          </button>
          <div className="flex flex-1 justify-center px-4">
            <div className="flex-shrink-0 flex items-center">
              <h1 className="text-lg font-bold text-blue-600">Nova Health</h1>
            </div>
          </div>
          <div className="flex items-center pr-4">
            <Navbar onSidebarToggle={toggleSidebar} user={user} isMobile={true} />
          </div>
        </div>

        {/* Desktop navbar */}
        <div 
          className="hidden lg:flex sticky top-0 z-10 flex-shrink-0 h-16 bg-white border-b border-gray-200 shadow-sm transition-all duration-300"
          role="banner"
        >
          <div className="flex-1 px-4 flex justify-between">
            <div className="flex-1 flex items-center">
              {/* Page title comes from routes */}
            </div>
            <Navbar onSidebarToggle={toggleSidebar} user={user} isMobile={false} />
          </div>
        </div>

        {/* Main content area */}
        <main 
          id="main-content" 
          className={`flex-1 relative overflow-y-auto focus:outline-none pb-16 sm:pb-0 transition-all duration-300 ${
            pageTransition ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'
          }`}
          tabIndex={-1}
          role="main"
        >
          <div className="py-6 px-4 sm:px-6 md:px-8">
            <Outlet />
          </div>
        </main>
        
        {/* Mobile Bottom Navigation */}
        <div 
          className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-top transition-transform duration-300 ease-in-out transform"
          role="navigation" 
          aria-label="Mobile bottom navigation"
        >
          <BottomNav isPremium={isPremium} />
        </div>
      </div>
    </div>
  );
};

export default Layout; 