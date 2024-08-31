import React, { createContext, useState } from 'react';
import axios from 'axios';
import { dummyUser } from '../data/dummyData';
import { dummyToken } from '../data/dummyData';
export const AuthContext = createContext();
import { useNavigate } from 'react-router-dom';
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const navigate = useNavigate(); 
  const registerUser = async (userData) => {
    try {
      const response = await axios.post('https://med-tech-server.onrender.com/api/auth/register', userData);
      setUser(response.data.user);
      setToken(response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
      localStorage.setItem('token', response.data.token);
    } catch (error) {
      console.error('Registration failed', error);
    }
  };

  const loginUser = async ({ email, password }) => {
    try {
      const response = await axios.post('https://med-tech-server.onrender.com/api/retailer/auth/login', { email, password });
      console.log(response);
      console.log(response.data.accessToken);
      setUser(response.data.user);
      setToken(response.data.accessToken);
      localStorage.setItem('user', JSON.stringify(response.data.user));
      localStorage.setItem('token', response.data.accessToken);
    // console.log(dummyToken);
    // console.log(dummyUser);
    // setUser(dummyUser);
    // setToken(dummyToken);
    // localStorage.setItem('user', JSON.stringify(dummyUser));
    // localStorage.setItem('token', dummyToken);
    navigate('/dashboard'); 
    } catch (error) {
      console.error('Login failed', error);
    }
  };

  const logoutUser = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    navigate('/signin'); 
  };

  const isSignedIn = !!user;

  return (
    <AuthContext.Provider value={{ user, token, isSignedIn, registerUser, loginUser, logoutUser }}>
      {children}
    </AuthContext.Provider>
  );
};