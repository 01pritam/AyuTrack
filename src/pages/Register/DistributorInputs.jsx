import React from 'react';

const DistributorInputs = ({ onChange }) => (
  <div className="space-y-6">
    <div className="grid gap-6 md:grid-cols-2">
      <label className="block text-sm font-medium text-gray-700">
        Distributor ID
        <input 
          type="text" 
          name="distributorId" 
          onChange={onChange} 
          required 
          className="mt-2 p-3 w-full border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
        />
      </label>
      <label className="block text-sm font-medium text-gray-700">
        License Number
        <input 
          type="text" 
          name="licenseNumber" 
          onChange={onChange} 
          required 
          className="mt-2 p-3 w-full border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
        />
      </label>
    </div>

    <label className="block text-sm font-medium text-gray-700">
      Warehouse Locations
      <input 
        type="text" 
        name="warehouseLocations" 
        onChange={onChange} 
        className="mt-2 p-3 w-full border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
      />
    </label>

    <label className="block text-sm font-medium text-gray-700">
      Vehicle Fleet Details
      <input 
        type="text" 
        name="vehicleFleet" 
        onChange={onChange} 
        className="mt-2 p-3 w-full border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
      />
    </label>

    <label className="block text-sm font-medium text-gray-700">
      Regions Covered
      <select 
        name="regionsCovered" 
        onChange={onChange} 
        multiple 
        className="mt-2 p-3 w-full border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
      >
        <option value="Region1">Region1</option>
        <option value="Region2">Region2</option>
        {/* Add more options as needed */}
      </select>
    </label>

    <label className="block text-sm font-medium text-gray-700">
      Preferred Shipping Method
      <select 
        name="shippingMethod" 
        onChange={onChange} 
        className="mt-2 p-3 w-full border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
      >
        <option value="Air">Air</option>
        <option value="Road">Road</option>
        <option value="Sea">Sea</option>
      </select>
    </label>
  </div>
);

export default DistributorInputs;