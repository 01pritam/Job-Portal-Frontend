import React, { createContext, useState, useEffect, useCallback, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // Safely parse user from localStorage
  const [user, setUser] = useState(() => {
    const stored = localStorage.getItem('user');
    return stored && stored !== "undefined" ? JSON.parse(stored) : null;
  });
  const [userRole, setUserRole] = useState(() => localStorage.getItem('role') || '');
  const [token, setToken] = useState(() => localStorage.getItem('token') || '');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      localStorage.setItem('token', token);
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
      localStorage.removeItem('token');
      delete axios.defaults.headers.common['Authorization'];
    }
    setLoading(false);
  }, [token]);

  const loginUser = useCallback(async ({ email, password, role }) => {
    try {
      const response = await axios.post('https://jobbackend-kotd.onrender.com/api/auth/login', {
        email,
        password,
        role
      });

      if (response.data && response.data.token) {
        setUser(response.data.user);
        setToken(response.data.token);
        setUserRole(role);
        localStorage.setItem('user', JSON.stringify(response.data.user));
        localStorage.setItem('role', role);
        navigate('/');
        return { success: true };
      }
      return { success: false, error: 'Invalid credentials' };
    } catch (error) {
      return { 
        success: false, 
        error: error.response?.data?.message || 'Failed to login' 
      };
    }
  }, [navigate]);

  const registerUser = useCallback(async (userData) => {
    try {
      const response = await axios.post('https://jobbackend-kotd.onrender.com/api/auth/register', userData);

      if (response.data && response.data.token) {
        setUser(response.data.user);
        setToken(response.data.token);
        setUserRole(userData.role);
        localStorage.setItem('user', JSON.stringify(response.data.user));
        localStorage.setItem('role', userData.role);
        navigate('/login');
        return { success: true };
      }
      return { success: false, error: 'Registration failed' };
    } catch (error) {
      return { 
        success: false, 
        error: error.response?.data?.message || 'Failed to register' 
      };
    }
  }, [navigate]);

  const updateProfile = useCallback(async (updates) => {
    try {
      const response = await axios.put('/api/auth/profile', updates);

      if (response.data) {
        const updatedUser = { ...user, ...response.data };
        setUser(updatedUser);
        localStorage.setItem('user', JSON.stringify(updatedUser));
        return { success: true };
      }
      return { success: false, error: 'Failed to update profile' };
    } catch (error) {
      return { 
        success: false, 
        error: error.response?.data?.message || 'Failed to update profile' 
      };
    }
  }, [user]);

  const logoutUser = useCallback(() => {
    setUser(null);
    setToken(null);
    setUserRole(null);
    localStorage.removeItem('user');
    localStorage.removeItem('role');
    localStorage.removeItem('token');
    delete axios.defaults.headers.common['Authorization'];
    navigate('/login');
  }, [navigate]);

  const value = {
    user,
    token,
    userRole,
    loading,
    isAuthenticated: !!user,
    loginUser,
    registerUser,
    logoutUser,
    updateProfile
  };

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook for using auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};