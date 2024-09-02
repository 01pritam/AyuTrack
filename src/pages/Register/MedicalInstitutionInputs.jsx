import React from 'react';

const MedicalInstitutionInputs = ({ onChange }) => (
  <div className="space-y-6">
    <div className="grid gap-6 md:grid-cols-2">
      <label className="block text-sm font-medium text-gray-700">
        Institution ID
        <input 
          type="text" 
          name="institutionId" 
          onChange={onChange} 
          required 
          className="mt-2 p-3 w-full border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
        />
      </label>
      <label className="block text-sm font-medium text-gray-700">
        Medical License Number
        <input 
          type="text" 
          name="medicalLicenseNumber" 
          onChange={onChange} 
          required 
          className="mt-2 p-3 w-full border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
        />
      </label>
    </div>

    <label className="block text-sm font-medium text-gray-700">
      Type of Institution
      <select 
        name="typeOfInstitution" 
        onChange={onChange} 
        required 
        className="mt-2 p-3 w-full border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
      >
        <option value="Hospital">Hospital</option>
        <option value="Clinic">Clinic</option>
        <option value="Pharmacy">Pharmacy</option>
        {/* Add more options as needed */}
      </select>
    </label>

    <label className="block text-sm font-medium text-gray-700">
      Departments or Specialties
      <input 
        type="text" 
        name="departments" 
        onChange={onChange} 
        className="mt-2 p-3 w-full border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
      />
    </label>

    <label className="block text-sm font-medium text-gray-700">
      Drug Storage Capacity
      <input 
        type="text" 
        name="storageCapacity" 
        onChange={onChange} 
        className="mt-2 p-3 w-full border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
      />
    </label>

    <label className="block text-sm font-medium text-gray-700">
      Emergency Contact Information
      <input 
        type="text" 
        name="emergencyContact" 
        onChange={onChange} 
        required 
        className="mt-2 p-3 w-full border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
      />
    </label>
  </div>
);

export default MedicalInstitutionInputs;