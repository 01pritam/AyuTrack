import React from 'react';
import Stepper from './Stepper';

const StepperModal = ({ setModalOpen }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-white p-8 rounded shadow-lg w-100">
        <h2 className="text-xl font-bold mb-4">Track Order Status</h2>
        <Stepper />
        <button
          className="mt-4 bg-red-500 text-white px-4 py-2 rounded"
          onClick={() => setModalOpen(false)}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default StepperModal;