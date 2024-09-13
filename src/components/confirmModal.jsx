import React from 'react';
import { FaCheckCircle } from 'react-icons/fa'; // Import the tick mark icon from react-icons

const ConfirmModal = ({ isOpen, onClose, message }) => {
  if (!isOpen) return null; // Don't render if the modal isn't open

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full text-center">
        <FaCheckCircle className="text-green-500 text-6xl mx-auto mb-4" />
        <h2 className="text-2xl font-bold mb-4">Submission Confirmed</h2>
        <p className="text-gray-700 mb-6">{message}</p>
        <button
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          onClick={onClose}
        >
          OK
        </button>
      </div>
    </div>
  );
};

export default ConfirmModal;
