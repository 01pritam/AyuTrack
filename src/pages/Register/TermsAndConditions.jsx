import React from 'react';

const TermsAndConditions = () => (
  <div className="mt-6">
    <label className="flex items-center text-sm font-medium text-gray-700">
      <input 
        type="checkbox" 
        name="agreeTerms" 
        required 
        className="mr-2"
      />
      I agree to the  <a href="/terms" className="text-teal-600 hover:text-teal-800">Terms and Conditions</a>
    </label>
  </div>
);

export default TermsAndConditions;