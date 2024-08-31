import React, { useState, useContext, useEffect } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { useNavigate, useLocation } from 'react-router-dom';
import { FaIndustry, FaTruck, FaStore } from 'react-icons/fa';

const Login = () => {
  const { loginUser, userRole, setUserRole, setUserRole1 } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');
  const location = useLocation();
  const navigate = useNavigate();

  // Handle user type selection and navigate to login form
  const handleUserTypeClick = (userType) => {
    setUserRole(userType);
    navigate(`/signin/${userType}`);
  };

  // Capture the role from the URL on component mount
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const roleParam = queryParams.get('role');
    setRole(roleParam || '');
  }, [location]);

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    setUserRole1(userRole); // Ensure userRole1 is set before calling loginUser
    loginUser({ emailAddress: email, password, role });
  };

  // Render the role selection screen if no role is selected
  if (!userRole) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-blue-200 to-teal-50">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Select Your User Type</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div
            className="flex flex-col items-center cursor-pointer hover:bg-teal-50 p-4 rounded-lg"
            onClick={() => handleUserTypeClick('Manufacturer')}
          >
            <FaIndustry size={50} className="text-teal-600 mb-4" />
            <span className="text-xl font-semibold text-gray-700">Manufacturer</span>
          </div>
          <div
            className="flex flex-col items-center cursor-pointer hover:bg-teal-50 p-4 rounded-lg"
            onClick={() => handleUserTypeClick('Distributor')}
          >
            <FaTruck size={50} className="text-teal-600 mb-4" />
            <span className="text-xl font-semibold text-gray-700">Distributor</span>
          </div>
          <div
            className="flex flex-col items-center cursor-pointer hover:bg-teal-50 p-4 rounded-lg"
            onClick={() => handleUserTypeClick('Retailer')}
          >
            <FaStore size={50} className="text-teal-600 mb-4" />
            <span className="text-xl font-semibold text-gray-700">Retailer</span>
          </div>
        </div>
      </div>
    );
  }

  // Render the login form if a role is selected
  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-b from-blue-200 to-teal-50">
      <div className="w-full max-w-md p-8 bg-white shadow-md rounded-md">
        <h2 className="text-2xl font-semibold mb-6 text-gray-800">
          {role} Login
        </h2>
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
        </form>
      </div>
    </div>
  );
};

export default Login;