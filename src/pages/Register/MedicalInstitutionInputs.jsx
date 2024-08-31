import React from 'react';

const MedicalInstitutionInputs = ({ onChange }) => (
  <>
    <label>Institution ID
      <input type="text" name="institutionId" onChange={onChange} />
    </label>
    <label>Medical License Number
      <input type="text" name="medicalLicenseNumber" onChange={onChange} />
    </label>
    <label>Type of Institution
      <select name="typeOfInstitution" onChange={onChange}>
        <option value="Hospital">Hospital</option>
        <option value="Clinic">Clinic</option>
        <option value="Pharmacy">Pharmacy</option>
      </select>
    </label>
    <label>Departments or Specialties
      <input type="text" name="departments" onChange={onChange} />
    </label>
    <label>Drug Storage Capacity
      <input type="text" name="storageCapacity" onChange={onChange} />
    </label>
    <label>Emergency Contact Information
      <input type="text" name="emergencyContact" onChange={onChange} />
    </label>
  </>
);

export default MedicalInstitutionInputs;
