import React from 'react';

const CaptchaVerification = ({ formData, onInputChange }) => {
  return (
    <div className="mt-4">
      <label className="flex items-center text-base font-medium text-gray-700">
        <input
          type="checkbox"
          name="captchaVerification"
          checked={formData.captchaVerification || false}
          onChange={onInputChange}
          className="mr-2 w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
        />
        I'm not a robot
      </label>
      {formData.captchaVerification && (
        <p className="mt-2 text-sm text-green-600">CAPTCHA verified successfully!</p>
      )}
    </div>
  );
};

export default CaptchaVerification;
