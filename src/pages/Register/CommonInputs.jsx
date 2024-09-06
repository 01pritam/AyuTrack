import React from 'react';

// Sample country codes
const countryCodes = [
  { code: '+1', country: 'United States' },
  { code: '+44', country: 'United Kingdom' },
  { code: '+91', country: 'India' },
  // Add more country codes as needed
];

const CommonInputs = ({ formData, onInputChange, onNestedInputChange }) => {
  return (
    <>
      <label className="block text-base font-medium text-gray-700">
        Full Name
        <input
          type="text"
          name="fullName"
          value={formData.fullName}
          onChange={onInputChange}
          className="mt-2 p-3 w-full border border-gray-300 rounded-lg shadow-sm"
        />
      </label>

      <label className="block text-base font-medium text-gray-700">
        Organization Name
        <input
          type="text"
          name="organizationName"
          value={formData.organizationName}
          onChange={onInputChange}
          className="mt-2 p-3 w-full border border-gray-300 rounded-lg shadow-sm"
        />
      </label>

      <label className="block text-base font-medium text-gray-700">
        Email Address
        <input
          type="email"
          name="emailAddress"
          value={formData.emailAddress}
          onChange={onInputChange}
          required
          className="mt-2 p-3 w-full border border-gray-300 rounded-lg shadow-sm"
        />
      </label>

      <label className="block text-base font-medium text-gray-700">
        Phone Number
        <div className="flex space-x-2">
          <select
            name="countryCode"
            value={formData.phoneNumber.countryCode}
            onChange={(e) => onNestedInputChange(e, 'phoneNumber')}
            className="p-3 w-1/5 border border-gray-300 rounded-lg shadow-sm"
          >
            {countryCodes.map(({ code }) => (
              <option key={code} value={code}>
                {code}
              </option>
            ))}
          </select>
          <input
            type="text"
            name="number"
            value={formData.phoneNumber.number}
            onChange={(e) => onNestedInputChange(e, 'phoneNumber')}
            className="p-3 w-4/5 border border-gray-300 rounded-lg shadow-sm"
          />
        </div>
      </label>

      <label className="block text-base font-medium text-gray-700">
        Password
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={onInputChange}
          required
          className="mt-2 p-3 w-full border border-gray-300 rounded-lg shadow-sm"
        />
      </label>

      <label className="block text-base font-medium text-gray-700">
        Address
        <input
          type="text"
          name="street"
          value={formData.address.street}
          onChange={(e) => onNestedInputChange(e, 'address')}
          placeholder="Street"
          className="mt-2 p-3 w-full border border-gray-300 rounded-lg shadow-sm"
        />
        <input
          type="text"
          name="city"
          value={formData.address.city}
          onChange={(e) => onNestedInputChange(e, 'address')}
          placeholder="City"
          className="mt-2 p-3 w-full border border-gray-300 rounded-lg shadow-sm"
        />
        <input
          type="text"
          name="state"
          value={formData.address.state}
          onChange={(e) => onNestedInputChange(e, 'address')}
          placeholder="State"
          className="mt-2 p-3 w-full border border-gray-300 rounded-lg shadow-sm"
        />
        <input
          type="text"
          name="postalCode"
          value={formData.address.postalCode}
          onChange={(e) => onNestedInputChange(e, 'address')}
          placeholder="Postal Code"
          className="mt-2 p-3 w-full border border-gray-300 rounded-lg shadow-sm"
        />
        <input
          type="text"
          name="country"
          value={formData.address.country}
          onChange={(e) => onNestedInputChange(e, 'address')}
          placeholder="Country"
          className="mt-2 p-3 w-full border border-gray-300 rounded-lg shadow-sm"
        />
      </label>

      <label className="block text-base font-medium text-gray-700">
        Security Question
        <input
          type="text"
          name="securityQuestion"
          value={formData.securityQuestion}
          onChange={onInputChange}
          className="mt-2 p-3 w-full border border-gray-300 rounded-lg shadow-sm"
        />
      </label>

      <label className="block text-base font-medium text-gray-700">
        Security Answer
        <input
          type="text"
          name="securityAnswer"
          value={formData.securityAnswer}
          onChange={onInputChange}
          className="mt-2 p-3 w-full border border-gray-300 rounded-lg shadow-sm"
        />
      </label>
    </>
  );
};

export default CommonInputs;
