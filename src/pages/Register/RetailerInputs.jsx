import React from 'react';

const RetailerInputs = ({ formData, onInputChange, onNestedInputChange, onArrayChange }) => {
  return (
    <>
      <label className="block text-base font-medium text-gray-700">
        Retailer ID
        <input
          type="text"
          name="retailerId"
          value={formData.retailerId}
          onChange={onInputChange}
          className="mt-2 p-3 w-full border border-gray-300 rounded-lg shadow-sm"
        />
      </label>
      <label className="block text-base font-medium text-gray-700">
        Store Type
        <input
          type="text"
          name="storeType"
          value={formData.storeType}
          onChange={onInputChange}
          className="mt-2 p-3 w-full border border-gray-300 rounded-lg shadow-sm"
        />
      </label>
      <label className="block text-base font-medium text-gray-700">
        Hours of Operation
        <input
          type="text"
          name="open"
          value={formData.hoursOfOperation.open}
          onChange={(e) => onNestedInputChange(e, 'hoursOfOperation')}
          placeholder="Open Time"
          className="mt-2 p-3 w-full border border-gray-300 rounded-lg shadow-sm"
        />
        <input
          type="text"
          name="close"
          value={formData.hoursOfOperation.close}
          onChange={(e) => onNestedInputChange(e, 'hoursOfOperation')}
          placeholder="Close Time"
          className="mt-2 p-3 w-full border border-gray-300 rounded-lg shadow-sm"
        />
      </label>
      <label className="block text-base font-medium text-gray-700">
        Types of Products Sold
        <input
          type="text"
          name="typesOfProductsSold"
          value={formData.typesOfProductsSold.join(', ')}
          onChange={(e) => onArrayChange(e, 'typesOfProductsSold')}
          placeholder="Comma-separated"
          className="mt-2 p-3 w-full border border-gray-300 rounded-lg shadow-sm"
        />
      </label>
      <label className="block text-base font-medium text-gray-700">
        Payment Methods Accepted
        <input
          type="text"
          name="paymentMethodsAccepted"
          value={formData.paymentMethodsAccepted.join(', ')}
          onChange={(e) => onArrayChange(e, 'paymentMethodsAccepted')}
          placeholder="Comma-separated"
          className="mt-2 p-3 w-full border border-gray-300 rounded-lg shadow-sm"
        />
      </label>
      <label className="block text-base font-medium text-gray-700">
        Alternate Contact Information
        <input
          type="text"
          name="fullName"
          value={formData.alternateContactInformation.fullName}
          onChange={(e) => onNestedInputChange(e, 'alternateContactInformation')}
          placeholder="Full Name"
          className="mt-2 p-3 w-full border border-gray-300 rounded-lg shadow-sm"
        />
        <input
          type="text"
          name="phoneNumber"
          value={formData.alternateContactInformation.phoneNumber}
          onChange={(e) => onNestedInputChange(e, 'alternateContactInformation')}
          placeholder="Phone Number"
          className="mt-2 p-3 w-full border border-gray-300 rounded-lg shadow-sm"
        />
        <input
          type="text"
          name="emailAddress"
          value={formData.alternateContactInformation.emailAddress}
          onChange={(e) => onNestedInputChange(e, 'alternateContactInformation')}
          placeholder="Email Address"
          className="mt-2 p-3 w-full border border-gray-300 rounded-lg shadow-sm"
        />
      </label>
    </>
  );
};

export default RetailerInputs;
