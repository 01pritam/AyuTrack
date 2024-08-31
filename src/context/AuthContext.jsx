import React, { createContext, useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userRole, setUserRole] = useState(null);
  const [userRole1, setUserRole1] = useState(null);
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

  const loginUser = useCallback(async ({ emailAddress, password, role }) => {
    let loginUrl = '';

    switch (userRole1) {
      case 'Manufacturer':
        loginUrl = 'https://med-tech-server.onrender.com/api/manufacturers/auth/login';
        break;
      case 'Distributor':
        loginUrl = 'https://med-tech-server.onrender.com/api/distributors/auth/login';
        break;
      case 'Retailer':
        loginUrl = 'https://med-tech-server.onrender.com/api/retailer/auth/login';
        break;
      default:
        console.error('Invalid role:', userRole1);
        return;
    }

    try {
      const response = await axios.post(loginUrl, {
        emailAddress,
        password
      });
      console.log('Login Response:', response);

      if (response.data && response.data.accessToken) {
        setUser(response.data.user);
        setUserRole(role); // Set the role after login
        setToken(response.data.accessToken);
        localStorage.setItem('user', JSON.stringify(response.data.user));
        localStorage.setItem('role', role); // Store role in localStorage
        navigate('/dashboard');
      } else {
        console.error('Access token not found in response data.');
      }
    } catch (error) {
      console.error('Login failed', error.response ? error.response.data : error.message);
    }
  }, [userRole1, navigate]);

  const registerUser = useCallback(async ({ emailAddress, password, role }) => {
    let registerUrl = '';

    switch (userRole) {
      case 'Manufacturer':
        registerUrl = 'https://med-tech-server.onrender.com/api/manufacturers/auth/register';
        break;
      case 'Distributor':
        registerUrl = 'https://med-tech-server.onrender.com/api/distributors/auth/register';
        break;
      case 'Retailer':
        registerUrl = 'https://med-tech-server.onrender.com/api/retailer/auth/register';
        break;
      default:
        console.error('Invalid role:', userRole);
        return;
    }

    try {
      const response = await axios.post(registerUrl, {
        emailAddress,
        password
      });
      console.log('Registration Response:', response);

      if (response.data && response.data.accessToken) {
        setUser(response.data.user);
        setUserRole(role); // Set the role after registration
        setToken(response.data.accessToken);
        localStorage.setItem('user', JSON.stringify(response.data.user));
        localStorage.setItem('role', role); // Store role in localStorage
        navigate('/dashboard');
      } else {
        console.error('Access token not found in response data.');
      }
    } catch (error) {
      console.error('Registration failed', error.response ? error.response.data : error.message);
    }
  }, [userRole, navigate]);

  const logoutUser = useCallback(() => {
    setUser(null);
    setUserRole(null);
    setToken(null);
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    navigate('/signin');
  }, [navigate]);

  const value = {
    user,
    token,
    isSignedIn: !!user,
    loginUser,
    registerUser,
    logoutUser,
    userRole,
    userRole1,
    setUserRole,
    setUserRole1
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};