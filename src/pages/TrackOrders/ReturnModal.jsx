// import React, { useState } from 'react';

// const ReturnModal = ({ item, onClose, onSubmit }) => {
//   const [returnQuantity, setReturnQuantity] = useState(0);
//   const [returnReason, setReturnReason] = useState('');

//   const handleReturnQuantityChange = (e) => {
//     setReturnQuantity(parseInt(e.target.value, 10) || 0);
//   };

//   const handleReturnReasonChange = (e) => {
//     setReturnReason(e.target.value);
//   };

//   const handleReturnSubmit = () => {
//     if (returnQuantity <= 0 || !returnReason.trim()) {
//       alert('Please provide both quantity and reason');
//       return;
//     }

//     onSubmit(returnQuantity, returnReason);
//     onClose();
//   };

//   return (
//     <div className="fixed inset-0 flex items-center justify-center z-50">
//       <div className="bg-white p-4 rounded shadow-lg">
//         <h2 className="text-lg font-bold mb-4">Return {item?.medicines[0].name}</h2>
//         <div className="mb-4">
//           <label htmlFor="returnQuantity" className="block mb-2">Return Quantity</label>
//           <input
//             type="number"
//             id="returnQuantity"
//             value={returnQuantity}
//             onChange={handleReturnQuantityChange}
//             className="border rounded p-2 w-full"
//             min="1"
//           />
//         </div>
//         <div className="mb-4">
//           <label htmlFor="returnReason" className="block mb-2">Return Reason</label>
//           <textarea
//             id="returnReason"
//             value={returnReason}
//             onChange={handleReturnReasonChange}
//             className="border rounded p-2 w-full"
//             rows="4"
//           />
//         </div>
//         <button
//           onClick={handleReturnSubmit}
//           className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
//         >
//           Submit Return
//         </button>
//         <button
//           onClick={onClose}
//           className="bg-gray-500 text-white px-4 py-2 rounded"
//         >
//           Close
//         </button>
//       </div>
//     </div>
//   );
// };

// export default ReturnModal;
import React, { useState } from 'react';

const ReturnModal = ({ returnQuantity, setReturnQuantity, returnReason, setReturnReason, onSubmit, onClose }) => {
  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center">
      <div className="bg-white p-6 rounded shadow-lg w-1/3">
        <h2 className="text-xl font-bold mb-4">Request Return</h2>
        <label className="block mb-2">Quantity</label>
        <input
          type="number"
          value={returnQuantity}
          onChange={(e) => setReturnQuantity(e.target.value)}
          className="w-full border rounded p-2 mb-4"
        />
        <label className="block mb-2">Reason</label>
        <textarea
          value={returnReason}
          onChange={(e) => setReturnReason(e.target.value)}
          rows="4"
          className="w-full border rounded p-2 mb-4"
        />
        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="bg-gray-500 text-white px-4 py-2 rounded mr-2"
          >
            Cancel
          </button>
          <button
            onClick={onSubmit}
            className="bg-red-500 text-white px-4 py-2 rounded"
          >
            Submit Return
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReturnModal;