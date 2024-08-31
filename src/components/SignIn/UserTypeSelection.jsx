// src/components/SignIn/UserTypeSelection.js

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaIndustry, FaTruck, FaStore } from 'react-icons/fa';

const UserTypeSelection = () => {
  const navigate = useNavigate();

  const handleUserTypeClick = (userType) => {
    navigate(`/signin/${userType}`);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-blue-200 to-teal-50">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Select Your User Type</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div 
          className="flex flex-col items-center cursor-pointer hover:bg-teal-50 p-4 rounded-lg"
          onClick={() => handleUserTypeClick('manufacturer')}
        >
          <FaIndustry size={50} className="text-teal-600 mb-4" />
          <img src="manufacturer.png" alt="Manufacturer" className="w-32 h-32 mb-4"/>
          <span className="text-xl font-semibold text-gray-700">Manufacturer</span>
        </div>
        <div 
          className="flex flex-col items-center cursor-pointer hover:bg-teal-50 p-4 rounded-lg"
          onClick={() => handleUserTypeClick('distributor')}
        >
          <FaTruck size={50} className="text-teal-600 mb-4" />
          <img src="distributor.png" alt="Distributor" className="w-32 h-32 mb-4"/>
          <span className="text-xl font-semibold text-gray-700">Distributor</span>
        </div>
        <div 
          className="flex flex-col items-center cursor-pointer hover:bg-teal-50 p-4 rounded-lg"
          onClick={() => handleUserTypeClick('retailer')}
        >
          <FaStore size={50} className="text-teal-600 mb-4" />
          <img src="retailer.png" alt="Retailer" className="w-32 h-32 mb-4"/>
          <span className="text-xl font-semibold text-gray-700">Retailer</span>
        </div>
      </div>
    </div>
  );
};

export default UserTypeSelection;