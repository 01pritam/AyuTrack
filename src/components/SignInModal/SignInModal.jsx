// src/components/SignInModal/SignInModal.jsx
import React from 'react';

function SignInModal({ onClose }) {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-8 rounded shadow-lg">
        <h2 className="text-lg font-bold">Please Sign In</h2>
        <p className="mt-2">You need to sign in to access this page.</p>
        <button 
          onClick={onClose}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
        >
          Close
        </button>
      </div>
    </div>
  );
}

export default SignInModal;