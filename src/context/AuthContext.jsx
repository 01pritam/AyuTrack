// import React, { createContext, useState, useEffect } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';

// // Create AuthContext
// export const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null);
//   const [token, setToken] = useState(null);
//   const navigate = useNavigate();

//   // Debug: Log token when it's updated
//   useEffect(() => {
//     console.log('Updated Token:', token);
//   }, [token]);

//   // Register user function
//   const registerUser = async (userData) => {
//     try {
//       const response = await axios.post('https://med-tech-server.onrender.com/api/auth/register', userData);
//       setUser(response.data.user);
//       setToken(response.data.token);
//       localStorage.setItem('user', JSON.stringify(response.data.user));
//       localStorage.setItem('token', response.data.token);
//     } catch (error) {
//       console.error('Registration failed', error);
//     }
//   };

//   // Login user function
//   const loginUser = async ({ email, password }) => {
//     try {
//       const response = await axios.post('https://med-tech-server.onrender.com/api/retailer/auth/login', { email, password });

//       // Debug: Log the entire response
//       console.log('Login Response:', response);

//       // Check if accessToken is present in response data
//       if (response.data && response.data.accessToken) {
//         console.log('Access Token:', response.data.accessToken);

//         // Set user and token in state
//         setUser(response.data.user);
//         setToken(response.data.accessToken);

//         // Store user and token in local storage
//         localStorage.setItem('user', JSON.stringify(response.data.user));
//         localStorage.setItem('token', response.data.accessToken);

//         // Debug: Check local storage values
//         console.log('Stored User:', localStorage.getItem('user'));
//         console.log('Stored User state :', token);
//         console.log('Stored Token:', localStorage.getItem('token'));

//         // Navigate to the dashboard
//         navigate('/dashboard');
//       } else {
//         console.error('Access token not found in response data.');
//       }
//     } catch (error) {
//       console.error('Login failed', error);
//     }
//   };

//   // Logout user function
//   const logoutUser = () => {
//     setUser(null);
//     setToken(null);
//     localStorage.removeItem('user');
//     localStorage.removeItem('token');
//     navigate('/signin');
//   };

//   // Check if user is signed in
//   const isSignedIn = !!user;

//   return (
//     <AuthContext.Provider value={{ user, token, isSignedIn, registerUser, loginUser, logoutUser }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };
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