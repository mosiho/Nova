import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import axios from 'axios';

interface User {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  subscriptionPlan: 'free' | 'premium';
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (firstName: string, lastName: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  updateProfile: (firstName: string, lastName: string) => Promise<void>;
  changePassword: (currentPassword: string, newPassword: string) => Promise<void>;
  clearError: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Check for existing auth token in localStorage
    const token = localStorage.getItem('authToken');
    
    if (token) {
      // Set auth header for axios requests
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      
      // Fetch user profile
      fetchUserProfile();
    } else {
      setLoading(false);
    }
  }, []);

  const fetchUserProfile = async () => {
    try {
      // In a real app, this would be a call to your backend API
      // For demo purposes, we're simulating a user
      setTimeout(() => {
        const mockUser: User = {
          _id: '123456',
          firstName: 'John',
          lastName: 'Doe',
          email: 'john.doe@example.com',
          subscriptionPlan: 'free'
        };
        
        setUser(mockUser);
        setLoading(false);
      }, 500);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to fetch user profile');
      setLoading(false);
    }
  };

  const login = async (email: string, password: string) => {
    try {
      setLoading(true);
      setError(null);
      
      // In a real app, this would be a call to your backend API
      // For demo purposes, we're simulating a successful login
      setTimeout(() => {
        const mockToken = 'mock-auth-token';
        const mockUser: User = {
          _id: '123456',
          firstName: 'John',
          lastName: 'Doe',
          email,
          subscriptionPlan: 'free'
        };
        
        // Store token in localStorage
        localStorage.setItem('authToken', mockToken);
        
        // Set auth header for axios requests
        axios.defaults.headers.common['Authorization'] = `Bearer ${mockToken}`;
        
        setUser(mockUser);
        setLoading(false);
      }, 1000);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Invalid email or password');
      setLoading(false);
      throw err;
    }
  };

  const register = async (firstName: string, lastName: string, email: string, password: string) => {
    try {
      setLoading(true);
      setError(null);
      
      // In a real app, this would be a call to your backend API
      // For demo purposes, we're simulating a successful registration
      setTimeout(() => {
        const mockToken = 'mock-auth-token';
        const mockUser: User = {
          _id: '123456',
          firstName,
          lastName,
          email,
          subscriptionPlan: 'free'
        };
        
        // Store token in localStorage
        localStorage.setItem('authToken', mockToken);
        
        // Set auth header for axios requests
        axios.defaults.headers.common['Authorization'] = `Bearer ${mockToken}`;
        
        setUser(mockUser);
        setLoading(false);
      }, 1000);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to register');
      setLoading(false);
      throw err;
    }
  };

  const logout = () => {
    // Remove token from localStorage
    localStorage.removeItem('authToken');
    
    // Remove auth header for axios requests
    delete axios.defaults.headers.common['Authorization'];
    
    // Clear user state
    setUser(null);
  };

  const updateProfile = async (firstName: string, lastName: string) => {
    try {
      setLoading(true);
      setError(null);
      
      // In a real app, this would be a call to your backend API
      // For demo purposes, we're simulating a successful profile update
      setTimeout(() => {
        if (user) {
          const updatedUser = { ...user, firstName, lastName };
          setUser(updatedUser);
        }
        setLoading(false);
      }, 1000);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to update profile');
      setLoading(false);
      throw err;
    }
  };

  const changePassword = async (currentPassword: string, newPassword: string) => {
    try {
      setLoading(true);
      setError(null);
      
      // In a real app, this would be a call to your backend API
      // For demo purposes, we're simulating a successful password change
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to change password');
      setLoading(false);
      throw err;
    }
  };

  const clearError = () => {
    setError(null);
  };

  const value = {
    user,
    isAuthenticated: !!user,
    loading,
    error,
    login,
    register,
    logout,
    updateProfile,
    changePassword,
    clearError
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}; 