import React, { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { UserRoleContext } from '../../context/UserRoleContext';
import CommonInputs from './CommonInputs';
import RetailerInputs from './RetailerInputs';
import DistributorInputs from './DistributorInputs';
import ManufacturerInputs from './ManufacturerInputs';
import CaptchaVerification from './CaptchaVerification';
import TermsAndConditions from './TermsAndConditions';
//import AlternateContactInformation from './AlternateContactInformation';
import { useNavigate } from 'react-router-dom';

const RegistrationForm = () => {
  const { registerUser, loading } = useContext(AuthContext);
  const { role, setRole } = useContext(UserRoleContext);
  const [formData, setFormData] = useState({
    role: '',
    fullName: '',
    organizationName: '',
    emailAddress: '',
    phoneNumber: {
      countryCode: '',
      number: '',
    },
    password: '',
    address: {
      street: '',
      city: '',
      state: '',
      postalCode: '',
      country: '',
    },
    securityQuestion: '',
    securityAnswer: '',
    captchaVerification: false,
    agreeToTermsAndConditions: false,
    supplierId: '',
    businessRegistrationNumber: '',
    typeOfProductsSupplied: [],
    licenseNumber: '',
    yearsInOperation: '',
    preferredPaymentMethod: '',
    bankAccountDetails: {
      accountNumber: '',
      bankName: '',
      accountHolderName: '',
    },
    distributorId: '',
    warehouseLocations: [],
    vehicleFleetDetails: {
      vehicleType: '',
      quantity: '',
    },
    regionsCovered: [],
    preferredShippingMethod: '',
    retailerId: '',
    storeType: '',
    hoursOfOperation: {
      open: '',
      close: '',
    },
    typesOfProductsSold: [],
    paymentMethodsAccepted: [],
    alternateContactInformation: {
      fullName: '',
      phoneNumber: '',
      emailAddress: '',
    },
  });

  const navigate = useNavigate();

  useEffect(() => {
    setRole(''); // Ensure role is set to an empty string on initial load
  }, [setRole]);

  const handleInputChange = (e) => {
    const { name, type, checked, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };
  

  const handleNestedInputChange = (e, parentKey) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [parentKey]: {
        ...prev[parentKey],
        [name]: value,
      },
    }));
  };

  const handleArrayChange = (e, arrayKey) => {
    const { value } = e.target;
    const newArray = value.split(',').map(item => item.trim());
    setFormData(prev => ({
      ...prev,
      [arrayKey]: newArray,
    }));
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
            src="https://i.pinimg.com/564x/48/ab/6e/48ab6efa0c827b8d81b2e15e7560bf9e.jpg"
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

            <CommonInputs
              formData={formData}
              onInputChange={handleInputChange}
              onNestedInputChange={handleNestedInputChange}
            />

            <label className="block text-base font-medium text-gray-700">
              User Role
              <select
                name="role"
                onChange={handleInputChange}
                value={formData.role}
                className="mt-2 p-3 w-full border border-gray-300 rounded-lg shadow-sm bg-transparent focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              >
                <option value="" disabled>Select a role</option>
                <option value="Retailer">Retailer</option>
                <option value="Distributor">Distributor</option>
                <option value="Manufacturer">Manufacturer</option>
              </select>
            </label>

            {formData.role === 'Retailer' && (
              <RetailerInputs
                formData={formData}
                onInputChange={handleInputChange}
                onNestedInputChange={handleNestedInputChange}
                onArrayChange={handleArrayChange}
              />
            )}
            {formData.role === 'Distributor' && (
              <DistributorInputs
                formData={formData}
                onInputChange={handleInputChange}
                onNestedInputChange={handleNestedInputChange}
                onArrayChange={handleArrayChange}
              />
            )}
            {formData.role === 'Manufacturer' && (
              <ManufacturerInputs
                formData={formData}
                onInputChange={handleInputChange}
                onNestedInputChange={handleNestedInputChange}
                onArrayChange={handleArrayChange}
              />
            )}
            <CaptchaVerification formData={formData} onInputChange={handleInputChange} />
            <TermsAndConditions formData={formData} onInputChange={handleInputChange} />
            <button
              type="submit"
              disabled={loading}
              className={`w-full py-3 mt-6 text-lg font-bold text-white rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 ${loading ? 'bg-gray-400' : 'bg-teal-500 hover:bg-teal-600 focus:ring-teal-500'}`}
            >
              {loading ? 'Submitting...' : 'Submit'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegistrationForm;
