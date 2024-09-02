import React, { useState, useContext, useEffect } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { useNavigate, useLocation } from 'react-router-dom';
import { Card } from '../../components/Card';
import { FaIndustry, FaTruck, FaStore } from 'react-icons/fa';

const Login = () => {
  const { loginUser, userRole, setUserRole } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');
  const [error, setError] = useState('');
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const roleParam = queryParams.get('role');
    setRole(roleParam || '');
  }, [location]);

  const handleUserTypeClick = (userType) => {
    setUserRole(userType);
    navigate(`/signin/${userType}`);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!userRole || !email || !password) {
      setError('Please fill out all fields and select a role.');
      return;
    }
    try {
      await loginUser({ emailAddress: email, password, role: userRole });
    } catch (error) {
      setError(error.response ? error.response.data : error.message);
    }
  };

  const handleReturnToSelection = () => {
    setUserRole('');
    navigate('/');
  };

  const handleNotRegisteredClick = () => {
    navigate('/signup');
  };

  if (!userRole) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-white">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Select Your User Type</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card
            icon={FaIndustry}
            title="Manufacturer"
            onClick={() => handleUserTypeClick('Manufacturer')}
          />
          <Card
            icon={FaTruck}
            title="Distributor"
            onClick={() => handleUserTypeClick('Distributor')}
          />
          <Card
            icon={FaStore}
            title="Retailer"
            onClick={() => handleUserTypeClick('Retailer')}
          />
        </div>
        {/* Fancy Quote Section */}
        <blockquote className="mt-16 text-center p-6 bg-gray-100 rounded-lg shadow-lg">
          <p className="text-xl font-semibold text-gray-700">
            "Efficiency is doing things right; effectiveness is doing the right things."
          </p>
          <footer className="mt-4 text-gray-500">- Peter Drucker</footer>
        </blockquote>
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-white">
      <div className="w-full max-w-md p-8 bg-white shadow-md rounded-md">
        <h2 className="text-2xl font-semibold mb-6 text-gray-800">
          {role} Login
        </h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <label className="flex flex-col">
            Email Address
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="mt-1 p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </label>
          <label className="flex flex-col">
            Password
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="mt-1 p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </label>
          <button
            type="submit"
            className="w-full py-2 px-4 bg-teal-500 text-white rounded-md hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-500"
          >
            Login
          </button>
          <button
            onClick={handleReturnToSelection}
            className="mt-4 w-full py-2 px-4 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500"
          >
            Return to User Type Selection
          </button>
        </form>
        <button 
          onClick={handleNotRegisteredClick}
          className="mt-4 w-full py-2 px-4 bg-transparent text-teal-500 hover:underline focus:outline-none"
        >
          Not Registered Yet?
        </button>
        
      </div>
    </div>
  );
};

export default Login;