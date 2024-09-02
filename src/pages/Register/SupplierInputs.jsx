import React from 'react';

const SupplierInputs = ({ onChange }) => (
  <div className="space-y-6">
    <div className="grid gap-6 md:grid-cols-2">
      <label className="block text-sm font-medium text-gray-700">
        Supplier ID
        <input 
          type="text" 
          name="supplierId" 
          onChange={onChange} 
          required 
          className="mt-2 p-3 w-full border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
        />
      </label>
      <label className="block text-sm font-medium text-gray-700">
        Business Registration Number
        <input 
          type="text" 
          name="businessRegNumber" 
          onChange={onChange} 
          required 
          className="mt-2 p-3 w-full border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
        />
      </label>
    </div>

    <label className="block text-sm font-medium text-gray-700">
      Type of Products Supplied
      <select 
        name="productsSupplied" 
        onChange={onChange} 
        multiple 
        className="mt-2 p-3 w-full border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
      >
        <option value="Pharmaceuticals">Pharmaceuticals</option>
        <option value="Medical Devices">Medical Devices</option>
        {/* Add more options as needed */}
      </select>
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

    <label className="block text-sm font-medium text-gray-700">
      Years in Operation
      <input 
        type="number" 
        name="yearsInOperation" 
        onChange={onChange} 
        required 
        className="mt-2 p-3 w-full border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
      />
    </label>

    <label className="block text-sm font-medium text-gray-700">
      Preferred Payment Method
      <select 
        name="paymentMethod" 
        onChange={onChange} 
        required 
        className="mt-2 p-3 w-full border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
      >
        <option value="Bank Transfer">Bank Transfer</option>
        <option value="Credit Card">Credit Card</option>
        {/* Add more options as needed */}
      </select>
    </label>

    <label className="block text-sm font-medium text-gray-700">
      Bank Account Details
      <input 
        type="text" 
        name="bankAccountDetails" 
        onChange={onChange} 
        required 
        className="mt-2 p-3 w-full border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
      />
    </label>
  </div>
);

export default SupplierInputs;
