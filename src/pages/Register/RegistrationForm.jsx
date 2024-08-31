import React, { useContext, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { UserRoleContext } from '../../context/UserRoleContext';
import CommonInputs from './CommonInputs';
import SupplierInputs from './SupplierInputs';
import DistributorInputs from './DistributorInputs';
import MedicalInstitutionInputs from './MedicalInstitutionInputs';
import CaptchaVerification from './CaptchaVerification';
import TermsAndConditions from './TermsAndConditions';

const RegistrationForm = () => {
  const { registerUser, loading } = useContext(AuthContext);
  const { role } = useContext(UserRoleContext);
  const [formData, setFormData] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    registerUser(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <CommonInputs onChange={handleChange} />
      {role === 'Supplier' && <SupplierInputs onChange={handleChange} />}
      {role === 'Distributor' && <DistributorInputs onChange={handleChange} />}
      {role === 'Medical Institution' && <MedicalInstitutionInputs onChange={handleChange} />}
      <CaptchaVerification />
      <TermsAndConditions />
      <button type="submit" disabled={loading}>Register</button>
    </form>
  );
};

export default RegistrationForm;