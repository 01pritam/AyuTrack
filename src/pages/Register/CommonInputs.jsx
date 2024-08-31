import React from 'react';

const CommonInputs = ({ onChange }) => (
  <div className="space-y-6">
    <div className="grid gap-6 md:grid-cols-2">
      <label className="flex flex-col text-sm font-medium text-gray-700">
        Full Name
        <input 
          type="text" 
          name="fullName" 
          onChange={onChange} 
          required 
          className="mt-2 p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
        />
      </label>
      <label className="flex flex-col text-sm font-medium text-gray-700">
        Organization Name
        <input 
          type="text" 
          name="organizationName" 
          onChange={onChange} 
          required 
          className="mt-2 p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
        />
      </label>
      <label className="flex flex-col text-sm font-medium text-gray-700">
        Email Address
        <input 
          type="email" 
          name="email" 
          onChange={onChange} 
          required 
          className="mt-2 p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
        />
      </label>
      <label className="flex flex-col text-sm font-medium text-gray-700">
        Phone Number
        <input 
          type="tel" 
          name="phoneNumber" 
          onChange={onChange} 
          required 
          className="mt-2 p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
        />
      </label>
    </div>
    
    <div className="grid gap-6 md:grid-cols-2">
      <label className="flex flex-col text-sm font-medium text-gray-700">
        Password
        <input 
          type="password" 
          name="password" 
          onChange={onChange} 
          required 
          className="mt-2 p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
        />
      </label>
      <label className="flex flex-col text-sm font-medium text-gray-700">
        Confirm Password
        <input 
          type="password" 
          name="confirmPassword" 
          onChange={onChange} 
          required 
          className="mt-2 p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
        />
      </label>
    </div>
    
    <label className="flex flex-col text-sm font-medium text-gray-700">
      User Role
      <select 
        name="role" 
        onChange={onChange} 
        required 
        className="mt-2 p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
      >
        <option value="Supplier">Supplier</option>
        <option value="Distributor">Distributor</option>
        <option value="Medical Institution">Medical Institution</option>
      </select>
    </label>
    
    <div className="grid gap-6 md:grid-cols-2">
      <label className="flex flex-col text-sm font-medium text-gray-700">
        Address
        <input 
          type="text" 
          name="street" 
          placeholder="Street" 
          onChange={onChange} 
          required 
          className="mt-2 p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
        />
        <input 
          type="text" 
          name="city" 
          placeholder="City" 
          onChange={onChange} 
          required 
          className="mt-2 p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
        />
        <input 
          type="text" 
          name="state" 
          placeholder="State" 
          onChange={onChange} 
          required 
          className="mt-2 p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
        />
        <input 
          type="text" 
          name="postalCode" 
          placeholder="Postal Code" 
          onChange={onChange} 
          required 
          className="mt-2 p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
        />
        <input 
          type="text" 
          name="country" 
          placeholder="Country" 
          onChange={onChange} 
          required 
          className="mt-2 p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
        />
      </label>
    </div>
    
    <label className="flex flex-col text-sm font-medium text-gray-700">
      Security Question
      <input 
        type="text" 
        name="securityQuestion" 
        onChange={onChange} 
        required 
        className="mt-2 p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
      />
    </label>
    
    <label className="flex flex-col text-sm font-medium text-gray-700">
      Security Answer
      <input 
        type="text" 
        name="securityAnswer" 
        onChange={onChange} 
        required 
        className="mt-2 p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
      />
    </label>
  </div>
);

export default CommonInputs;