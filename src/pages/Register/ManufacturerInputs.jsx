import React from 'react';

const ManufacturerInputs = ({ formData, onInputChange, onNestedInputChange, onArrayChange }) => {
  return (
    <>
      <label className="block text-base font-medium text-gray-700">
        Supplier ID
        <input
          type="text"
          name="supplierId"
          value={formData.supplierId}
          onChange={onInputChange}
          className="mt-2 p-3 w-full border border-gray-300 rounded-lg shadow-sm"
        />
      </label>
      <label className="block text-base font-medium text-gray-700">
        Business Registration Number
        <input
          type="text"
          name="businessRegistrationNumber"
          value={formData.businessRegistrationNumber}
          onChange={onInputChange}
          className="mt-2 p-3 w-full border border-gray-300 rounded-lg shadow-sm"
        />
      </label>
      <label className="block text-base font-medium text-gray-700">
        Type of Products Supplied
        <input
          type="text"
          name="typeOfProductsSupplied"
          value={formData.typeOfProductsSupplied.join(', ')}
          onChange={(e) => onArrayChange(e, 'typeOfProductsSupplied')}
          placeholder="Comma-separated"
          className="mt-2 p-3 w-full border border-gray-300 rounded-lg shadow-sm"
        />
      </label>
      <label className="block text-base font-medium text-gray-700">
        License Number
        <input
          type="text"
          name="licenseNumber"
          value={formData.licenseNumber}
          onChange={onInputChange}
          className="mt-2 p-3 w-full border border-gray-300 rounded-lg shadow-sm"
        />
      </label>
      <label className="block text-base font-medium text-gray-700">
        Years in Operation
        <input
          type="number"
          name="yearsInOperation"
          value={formData.yearsInOperation}
          onChange={onInputChange}
          className="mt-2 p-3 w-full border border-gray-300 rounded-lg shadow-sm"
        />
      </label>
      <label className="block text-base font-medium text-gray-700">
        Preferred Payment Method
        <input
          type="text"
          name="preferredPaymentMethod"
          value={formData.preferredPaymentMethod}
          onChange={onInputChange}
          className="mt-2 p-3 w-full border border-gray-300 rounded-lg shadow-sm"
        />
      </label>
      <label className="block text-base font-medium text-gray-700">
        Bank Account Details
        <input
          type="text"
          name="accountNumber"
          value={formData.bankAccountDetails.accountNumber}
          onChange={(e) => onNestedInputChange(e, 'bankAccountDetails')}
          placeholder="Account Number"
          className="mt-2 p-3 w-full border border-gray-300 rounded-lg shadow-sm"
        />
        <input
          type="text"
          name="bankName"
          value={formData.bankAccountDetails.bankName}
          onChange={(e) => onNestedInputChange(e, 'bankAccountDetails')}
          placeholder="Bank Name"
          className="mt-2 p-3 w-full border border-gray-300 rounded-lg shadow-sm"
        />
        <input
          type="text"
          name="accountHolderName"
          value={formData.bankAccountDetails.accountHolderName}
          onChange={(e) => onNestedInputChange(e, 'bankAccountDetails')}
          placeholder="Account Holder Name"
          className="mt-2 p-3 w-full border border-gray-300 rounded-lg shadow-sm"
        />
      </label>

      {/* Alternate Contact Information */}
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

export default ManufacturerInputs;
