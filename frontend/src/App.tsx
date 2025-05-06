import React, { createContext, useState, useEffect, useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import Layout from './components/Layout/Layout';
import Dashboard from './pages/Dashboard/Dashboard';
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';
import LabTests from './pages/LabTests/LabTests';
import LabTestDetail from './pages/LabTests/LabTestDetail';
import LabTestUpload from './pages/LabTests/LabTestUpload';
import Supplements from './pages/Supplements/Supplements';
import SupplementDetail from './pages/Supplements/SupplementDetail';
import Recommendations from './pages/Recommendations/Recommendations';
import Subscriptions from './pages/Subscriptions/Subscriptions';
import Account from './pages/Account/Account';
import Wearables from './pages/Wearables/Wearables';
import WearableAnalytics from './pages/Wearables/WearableAnalytics';
import ChatAssistant from './pages/ChatAssistant/ChatAssistant';
import NotFound from './pages/NotFound/NotFound';
import ComponentExamples from './pages/ComponentLibrary/ComponentExamples';
import AnimationExamples from './pages/ComponentLibrary/AnimationExamples';

// Create accessibility context
interface AccessibilityContextType {
  highContrast: boolean;
  toggleHighContrast: () => void;
  fontSize: number;
  increaseFontSize: () => void;
  decreaseFontSize: () => void;
  resetFontSize: () => void;
}

const AccessibilityContext = createContext<AccessibilityContextType | undefined>(undefined);

export const useAccessibility = () => {
  const context = useContext(AccessibilityContext);
  if (context === undefined) {
    throw new Error('useAccessibility must be used within an AccessibilityProvider');
  }
  return context;
};

const AccessibilityProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
  const [highContrast, setHighContrast] = useState<boolean>(
    localStorage.getItem('highContrast') === 'true'
  );
  const [fontSize, setFontSize] = useState<number>(
    parseInt(localStorage.getItem('fontSize') || '100', 10)
  );

  useEffect(() => {
    // Apply high contrast mode
    document.documentElement.classList.toggle('high-contrast', highContrast);
    localStorage.setItem('highContrast', highContrast.toString());
    
    // Apply font size
    document.documentElement.style.fontSize = `${fontSize}%`;
    localStorage.setItem('fontSize', fontSize.toString());
  }, [highContrast, fontSize]);

  const toggleHighContrast = () => setHighContrast(prev => !prev);
  
  const increaseFontSize = () => {
    if (fontSize < 150) {
      setFontSize(prev => prev + 10);
    }
  };
  
  const decreaseFontSize = () => {
    if (fontSize > 80) {
      setFontSize(prev => prev - 10);
    }
  };
  
  const resetFontSize = () => {
    setFontSize(100);
  };

  return (
    <AccessibilityContext.Provider value={{
      highContrast,
      toggleHighContrast,
      fontSize,
      increaseFontSize,
      decreaseFontSize,
      resetFontSize
    }}>
      {children}
    </AccessibilityContext.Provider>
  );
};

// Protected route component
const ProtectedRoute: React.FC<{ children: React.ReactNode, premiumRequired?: boolean }> = ({ 
  children, 
  premiumRequired = false 
}) => {
  const { isAuthenticated, user, loading } = useAuth();
  
  if (loading) {
    return <div className="flex h-screen items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
    </div>;
  }
  
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }
  
  if (premiumRequired && user?.subscriptionPlan !== 'premium') {
    return <Navigate to="/subscriptions" />;
  }
  
  return <>{children}</>;
};

const App: React.FC = () => {
  return (
    <AuthProvider>
      <AccessibilityProvider>
        <Router>
          <Routes>
            {/* Auth routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            
            {/* Component Library - accessible without authentication for development */}
            <Route path="/component-library" element={<ComponentExamples />} />
            <Route path="/animation-examples" element={<AnimationExamples />} />
            
            {/* Protected routes */}
            <Route path="/" element={
              <ProtectedRoute>
                <Layout />
              </ProtectedRoute>
            }>
              <Route index element={<Dashboard />} />
              
              {/* Lab Tests */}
              <Route path="lab-tests" element={<LabTests />} />
              <Route path="lab-tests/:id" element={<LabTestDetail />} />
              <Route path="lab-tests/upload" element={<LabTestUpload />} />
              
              {/* Supplements */}
              <Route path="supplements" element={<Supplements />} />
              <Route path="supplements/:id" element={<SupplementDetail />} />
              <Route path="recommendations" element={<Recommendations />} />
              
              {/* Subscriptions */}
              <Route path="subscriptions" element={<Subscriptions />} />
              
              {/* Account */}
              <Route path="account" element={<Account />} />
              
              {/* Wearables */}
              <Route path="wearables" element={<Wearables />} />
              <Route path="wearables/analytics" element={
                <ProtectedRoute premiumRequired={true}>
                  <WearableAnalytics />
                </ProtectedRoute>
              } />
              
              {/* Health Assistant (Premium only) */}
              <Route path="health-assistant" element={
                <ProtectedRoute premiumRequired={true}>
                  <ChatAssistant />
                </ProtectedRoute>
              } />
            </Route>
            
            {/* 404 Not Found */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Router>
      </AccessibilityProvider>
    </AuthProvider>
  );
};

export default App; 