import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaIndustry, FaTruck, FaStore, FaUsers, FaCog, FaChartLine } from 'react-icons/fa';

const UserTypeCard = ({ icon: Icon, image, title, onClick }) => (
  <div 
    className="flex flex-col items-center cursor-pointer bg-white p-6 rounded-xl shadow-lg transition-all duration-300 transform hover:scale-105 hover:shadow-xl"
    onClick={onClick}
  >
    <div className="relative mb-6">
      <Icon size={60} className="text-teal-600 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 transition-all duration-300 group-hover:scale-110" />
      <img src={image} alt={title} className="w-40 h-40 rounded-full object-cover" />
    </div>
    <span className="text-2xl font-bold text-gray-800 mb-2">{title}</span>
    <div className="flex space-x-2 mt-2">
      <FaUsers className="text-gray-500" />
      <FaCog className="text-gray-500" />
      <FaChartLine className="text-gray-500" />
    </div>
  </div>
);

const UserTypeSelection = () => {
  const navigate = useNavigate();

  const handleUserTypeClick = (userType) => {
    navigate(`/signin/${userType}`);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 via-teal-50 to-green-100 p-8">
      <h1 className="text-4xl font-extrabold text-gray-800 mb-12 text-center">
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-teal-600 to-blue-600">
          Choose Your Role
        </span>
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-6xl">
        <UserTypeCard
          icon={FaIndustry}
          image="/manufacturer.png"
          title="Manufacturer"
          onClick={() => handleUserTypeClick('manufacturer')}
        />
        <UserTypeCard
          icon={FaTruck}
          image="/distributor.png"
          title="Distributor"
          onClick={() => handleUserTypeClick('distributor')}
        />
        <UserTypeCard
          icon={FaStore}
          image="/retailer.png"
          title="Retailer"
          onClick={() => handleUserTypeClick('retailer')}
        />
      </div>
    </div>
  );
};

export default UserTypeSelection;