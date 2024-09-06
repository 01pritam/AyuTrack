import React from 'react';

const TermsAndConditions = ({ formData, onInputChange }) => {
  return (
    <div className="mt-6">
      <div className="flex items-center">
        <input
          type="checkbox"
          name="agreeToTermsAndConditions"
          checked={formData.agreeToTermsAndConditions || false}
          onChange={onInputChange}
          className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
        />
        <span className="ml-2 text-gray-700">
          I agree to the{' '}
          <a href="/terms" className="text-blue-600 underline">
            Terms and Conditions
          </a>
        </span>
      </div>
    </div>
  );
};

export default TermsAndConditions;
