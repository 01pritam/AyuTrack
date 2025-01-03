import React from 'react';

const DistributorInputs = ({ formData, onInputChange, onNestedInputChange, onArrayChange }) => {
  return (
    <>
      <label className="block text-base font-medium text-gray-700">
        Distributor ID
        <input
          type="text"
          name="distributorId"
          value={formData.distributorId}
          onChange={onInputChange}
          className="mt-2 p-3 w-full border border-gray-300 rounded-lg shadow-sm"
        />
      </label>

      <label className="block text-base font-medium text-gray-700">
        Warehouse Locations
        <input
          type="text"
          name="warehouseLocations"
          value={formData.warehouseLocations.join(', ')}
          onChange={(e) => onArrayChange(e, 'warehouseLocations')}
          placeholder="Comma-separated"
          className="mt-2 p-3 w-full border border-gray-300 rounded-lg shadow-sm"
        />
      </label>

      <label className="block text-base font-medium text-gray-700">
        Vehicle Fleet Details
        <input
          type="text"
          name="vehicleType"
          value={formData.vehicleFleetDetails.vehicleType}
          onChange={(e) => onNestedInputChange(e, 'vehicleFleetDetails')}
          placeholder="Vehicle Type"
          className="mt-2 p-3 w-full border border-gray-300 rounded-lg shadow-sm"
        />
        <input
          type="number"
          name="quantity"
          value={formData.vehicleFleetDetails.quantity}
          onChange={(e) => onNestedInputChange(e, 'vehicleFleetDetails')}
          placeholder="Quantity"
          className="mt-2 p-3 w-full border border-gray-300 rounded-lg shadow-sm"
        />
      </label>

      <label className="block text-base font-medium text-gray-700">
        Regions Covered
        <input
          type="text"
          name="regionsCovered"
          value={formData.regionsCovered.join(', ')}
          onChange={(e) => onArrayChange(e, 'regionsCovered')}
          placeholder="Comma-separated"
          className="mt-2 p-3 w-full border border-gray-300 rounded-lg shadow-sm"
        />
      </label>

      <label className="block text-base font-medium text-gray-700">
        Preferred Shipping Method
        <input
          type="text"
          name="preferredShippingMethod"
          value={formData.preferredShippingMethod}
          onChange={onInputChange}
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

export default DistributorInputs;
