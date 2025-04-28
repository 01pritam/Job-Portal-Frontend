import React, { createContext, useState, useEffect, useCallback, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const stored = localStorage.getItem('user');
    return stored && stored !== "undefined" ? JSON.parse(stored) : null;
  });
  const [userRole, setUserRole] = useState(() => localStorage.getItem('role') || '');
  const [token, setToken] = useState(() => localStorage.getItem('token') || '');
  const [loading, setLoading] = useState(true);
  const [completeProfile, setCompleteProfile] = useState(false);  // ✅ Track completeProfile state
  const navigate = useNavigate();
  const [profile ,setProfile]=useState([]);
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

  const checkProfileCompletion = useCallback(async () => {
    if (token) {
      try {
        const response = await axios.get('https://jobbackend-kotd.onrender.com/api/profile/profile', {
          headers: {
            Authorization: `Bearer ${token}`, // Send token in the Authorization header
          },
        });
  
        console.log("hi");
        console.log(response);
        console.log(response.data.profile.
          complete_profile); // ✅ Endpoint to check profile completion
        setCompleteProfile(response.data.profile.
          complete_profile); 
          setProfile(response.data.profile);
          setUserRole(response.data.user.role);// ✅ Update completeProfile state
  
      } catch (error) {
        console.error('Error checking profile completion:', error);
      }
    }
  }, [token]);

  // const loginUser = useCallback(async ({ email, password, role }) => {
  //   try {
  //     const response = await axios.post('https://jobbackend-kotd.onrender.com/api/auth/login', {
  //       email,
  //       password,
  //       role
  //     });
  //     console.log("user ",response.data.user);
  //     console.log("resp ",response);
  //     if (response.data && response.data.token) {
  //       setUser(response.data.user);
  //       setToken(response.data.token);
  //       setUserRole(role);
  //       localStorage.setItem('user', JSON.stringify(response.data.user));
  //       localStorage.setItem('role', role);
  //       localStorage.setItem('token', response.data.token);
  //       console.log("tokenPc1: ",response.data.token);
  //       console.log("tokenPc: ",token);
        
  //       await checkProfileCompletion();  // ✅ Check profile completion after login

  //       if (completeProfile) {
  //         navigate('/');
  //       } else {
  //         navigate(`/${role}/profile`);
  //       }

  //       return { success: true };
  //     }
  //     return { success: false, error: 'Invalid credentials' };
  //   } catch (error) {
  //     return { 
  //       success: false, 
  //       error: error.response?.data?.message || 'Failed to login' 
  //     };
  //   }
  // }, [navigate, checkProfileCompletion, completeProfile]);


  const loginUser = useCallback(async ({ email, password, role }) => {
    try {
      const response = await axios.post('https://jobbackend-kotd.onrender.com/api/auth/login', {
        email,
        password,
        role
      });
  
      console.log("login role ",response);
      if (response.data && response.data.token) {
        setUser(response.data.user);
        setToken(response.data.token); // Set token
        
        localStorage.setItem('user', JSON.stringify(response.data.user));
        localStorage.setItem('role', role);
        localStorage.setItem('token', response.data.token);
  
        console.log("tokenPc1: ", response); // Token right after login
  
        // Once token is set, check profile completion
        setCompleteProfile(false); // Reset completeProfile before checking
        // await checkProfileCompletion();  // ✅ Check profile completion after login
  
       
  
        return { success: true };
      }
      return { success: false, error: 'Invalid credentials' };
    } catch (error) {
      return { 
        success: false, 
        error: error.response?.data?.message || 'Failed to login' 
      };
    }
  }, [navigate, checkProfileCompletion, completeProfile]);
  
  useEffect(() => {
    if (token && userRole) {
      console.log("Updated Token: ", token);
      checkProfileCompletion();
      console.log("completeProfile ", completeProfile);
  
      if (!completeProfile) {
        navigate(`/${userRole}/profile`);
      }
    }
  }, [token, userRole]);
  
  useEffect(() => {
    if (completeProfile) {
      navigate(`/`);
    }
  }, [completeProfile]);




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
      const response = await axios.put('https://jobbackend-kotd.onrender.com/api/profile/complete', updates);

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
    navigate('/user-type');
  }, [navigate]);

  const value = {
    user,
    token,
    profile,
    userRole,
    loading,
    completeProfile,
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