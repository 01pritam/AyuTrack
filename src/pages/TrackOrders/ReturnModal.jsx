import React, { useState } from 'react';

const ReturnModal = ({ item, onClose, onSubmit }) => {
  const [returnQuantity, setReturnQuantity] = useState(0);
  const [returnReason, setReturnReason] = useState('');

  const handleReturnQuantityChange = (e) => {
    setReturnQuantity(parseInt(e.target.value, 10));
  };

  const handleReturnReasonChange = (e) => {
    setReturnReason(e.target.value);
  };

  const handleReturnSubmit = () => {
    if (returnQuantity > 0 && returnReason) {
      onSubmit(returnQuantity, returnReason);
      onClose();
    } else {
      alert('Please provide both quantity and reason');
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="bg-white p-4 rounded shadow-lg">
        <h2 className="text-lg font-bold mb-4">Return {item?.medicines[0].name}</h2>
        <div className="mb-4">
          <label htmlFor="returnQuantity" className="block mb-2">Return Quantity</label>
          <input
            type="number"
            id="returnQuantity"
            value={returnQuantity}
            onChange={handleReturnQuantityChange}
            className="border rounded p-2 w-full"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="returnReason" className="block mb-2">Return Reason</label>
          <textarea
            id="returnReason"
            value={returnReason}
            onChange={handleReturnReasonChange}
            className="border rounded p-2 w-full"
            rows="4"
          />
        </div>
        <button
          onClick={handleReturnSubmit}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Submit Return
        </button>
        <button
          onClick={onClose}
          className="bg-gray-500 text-white px-4 py-2 rounded ml-2"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default ReturnModal;