import React, { createContext, useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(() => localStorage.getItem('token'));
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      localStorage.setItem('token', token);
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
      localStorage.removeItem('token');
      delete axios.defaults.headers.common['Authorization'];
    }
  }, [token]);

  const loginUser = useCallback(async ({ email, password }) => {
    try {
      const response = await axios.post('https://med-tech-server.onrender.com/api/retailer/auth/login', { email, password });
      console.log('Login Response:', response);

      if (response.data && response.data.accessToken) {
        setUser(response.data.user);
        setToken(response.data.accessToken);
        localStorage.setItem('user', JSON.stringify(response.data.user));
        navigate('/dashboard');
      } else {
        console.error('Access token not found in response data.');
      }
    } catch (error) {
      console.error('Login failed', error);
    }
  }, [navigate]);

  const logoutUser = useCallback(() => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    navigate('/signin');
  }, [navigate]);

  const value = {
    user,
    token,
    isSignedIn: !!user,
    loginUser,
    logoutUser
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};