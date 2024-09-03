import React, { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { UserRoleContext } from '../../context/UserRoleContext';
import CommonInputs from './CommonInputs';
import SupplierInputs from './SupplierInputs';
import DistributorInputs from './DistributorInputs';
import MedicalInstitutionInputs from './MedicalInstitutionInputs';
import CaptchaVerification from './CaptchaVerification';
import TermsAndConditions from './TermsAndConditions';
import { useNavigate } from 'react-router-dom';
import leftimg from '../../assets/reg.jpg'
const RegistrationForm = () => {
  const { registerUser, loading } = useContext(AuthContext);
  const { role, setRole } = useContext(UserRoleContext);
  const [formData, setFormData] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    // Ensure role is set to an empty string on initial load
    setRole('');
  }, [setRole]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (e.target.name === "role") {
      setRole(e.target.value); // Update the selected role
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    registerUser(formData);
  };

  const handleBackClick = () => {
    navigate('/signin'); // Navigate back to the sign-in page
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-10 bg-cover bg-center" 
         style={{ backgroundImage: `url('https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/abf30686506551.5d9bc41842824.jpg')` }}>
      <div className="flex w-4/5 lg:w-3/5 h-auto max-h-[80vh] bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="w-2/5 flex-shrink-0">
          <img 
            src={leftimg} 
            alt="Left Side" 
            className="w-full h-full object-cover" 
          />
        </div>
        <div className="w-3/5 p-8 overflow-y-auto glass-effect scrollbar">
  <form onSubmit={handleSubmit} className="space-y-6">
    <div className="flex flex-col mb-6">
      <div className="flex items-center mb-4">
        <button 
          type="button" 
          onClick={handleBackClick}
          className="flex items-center text-black hover:text-gray-800 focus:outline-none text-sm font-medium bg-transparent py-1 px-2 rounded"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 mr-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M15 18l-6-6 6-6" />
          </svg>
          Back to Sign In
        </button>
      </div>
      <h2 className="text-3xl font-extrabold text-gray-900 text-center mt-2 mb-4">Registration Form</h2>
    </div>
            <CommonInputs onChange={handleChange} />
            <label className="block text-base font-medium text-gray-700">
              User Role
              <select 
                name="role" 
                onChange={handleChange} 
                value={role} 
                className="mt-2 p-3 w-full border border-gray-300 rounded-lg shadow-sm bg-transparent focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              >
                <option value="" disabled>Select a role</option>
                <option value="Supplier">Supplier</option>
                <option value="Distributor">Distributor</option>
                <option value="Medical Institution">Medical Institution</option>
              </select>
            </label>
            {role === 'Supplier' && <SupplierInputs onChange={handleChange} />}
            {role === 'Distributor' && <DistributorInputs onChange={handleChange} />}
            {role === 'Medical Institution' && <MedicalInstitutionInputs onChange={handleChange} />}
            <CaptchaVerification />
            <TermsAndConditions />
            <button
              type="submit"
              disabled={loading}
              className={`w-full py-3 mt-6 text-lg font-bold text-white rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 ${loading ? 'bg-gray-400' : 'bg-teal-500 hover:bg-teal-600 focus:ring-teal-500'}`}
            >
              {loading ? "Registering..." : "Register"}
            </button>
          </form>
        </div>
      </div>

      {/* Custom CSS for glass effect and scrollbar */}
      <style jsx>{`
        .glass-effect {
          background: rgba(255, 255, 255, 0.2); /* More transparent background */
          backdrop-filter: blur(15px); /* Stronger blur effect */
          border: 1px solid rgba(255, 255, 255, 0.3); /* Slightly more pronounced border */
        }
        .scrollbar::-webkit-scrollbar {
          width: 8px; /* Width of the scrollbar */
          opacity: 0; /* Hide scrollbar by default */
          transition: opacity 0.3s; /* Smooth transition */
        }
        .scrollbar::-webkit-scrollbar-thumb {
          background: rgba(0, 0, 0, 0.5); /* Scrollbar color */
          border-radius: 4px; /* Rounded scrollbar */
        }
        .scrollbar::-webkit-scrollbar-track {
          background: transparent; /* Track color */
        }
        .scrollbar:hover::-webkit-scrollbar {
          opacity: 1; /* Show scrollbar on hover */
        }
        .scrollbar {
          scrollbar-width: thin; /* Firefox */
          scrollbar-color: rgba(0, 0, 0, 0.5) transparent; /* Scrollbar color in Firefox */
        }
        .scrollbar:hover {
          scrollbar-color: rgba(0, 0, 0, 0.5) transparent; /* Color when hovered */
        }
      `}</style>
    </div>
  );
};

export default RegistrationForm;
