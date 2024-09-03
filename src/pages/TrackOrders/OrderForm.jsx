// import React, { useContext, useState } from 'react';
// import axios from 'axios';
// import { AuthContext } from '../../context/AuthContext';
// const OrderForm = ({ closeForm }) => {
//   const [manufacturerName, setManufacturerName] = useState('');
//   const [medicines, setMedicines] = useState([{ name: '', qty: 1 }]);
//   const [error, setError] = useState('');
//   const {token}=useContext(AuthContext);
//   const handleMedicineChange = (index, field, value) => {
//     const newMedicines = [...medicines];
//     newMedicines[index][field] = value;
//     setMedicines(newMedicines);
//   };

//   const addMedicine = () => {
//     setMedicines([...medicines, { name: '', quantity: 1 }]);
//   };

//   const handleSubmit = async () => {
//     if (!manufacturerName.trim() || medicines.some(m => !m.name.trim() || m.quantity <= 0)) {
//       setError('Please fill out all fields correctly.');
//       return;
//     }

//     setError('');
//     const orderData = {
//       manufacturerName,
//       medicines
//     };

//     try {
//       const response = await axios.post(
//         'https://med-tech-server.onrender.com/api/manufacturers/orders',
//         orderData,
//         {
//           headers: {
//             authorization: `Bearer ${token}`
//           }
//         }
//       );
//       // Handle the response if needed
//       console.log('Order submitted:', response.data);
//     } catch (error) {
//       console.error('Error submitting order:', error);
//       setError('Failed to submit order. Please try again.');
//     }
//   };

//   return (
//     <div className="fixed inset-0 flex items-center justify-center z-50">
//       <div className="bg-white p-4 rounded shadow-lg w-full max-w-md">
//         <h2 className="text-lg font-bold mb-4">Order Form</h2>
//         {error && <p className="text-red-500 mb-4">{error}</p>}
//         <label className="block mb-2">Manufacturer Name</label>
//         <input
//           type="text"
//           value={manufacturerName}
//           onChange={(e) => setManufacturerName(e.target.value)}
//           className="border rounded p-2 mb-4 w-full"
//         />
//         {medicines.map((medicine, index) => (
//           <div key={index} className="mb-4">
//             <label className="block mb-1">Medicine Name</label>
//             <input
//               type="text"
//               value={medicine.name}
//               onChange={(e) => handleMedicineChange(index, 'name', e.target.value)}
//               className="border rounded p-2 mb-2 w-full"
//             />
//             <label className="block mb-1">Quantity</label>
//             <input
//               type="number"
//               value={medicine.quantity}
//               onChange={(e) => handleMedicineChange(index, 'qty', e.target.value)}
//               className="border rounded p-2 mb-2 w-full"
//               min="1"
//             />
//           </div>
//         ))}
//         <button
//           onClick={addMedicine}
//           className="bg-blue-500 text-white px-4 py-2 rounded mb-4"
//         >
//           Add Another Medicine
//         </button>
//         <button
//           onClick={handleSubmit}
//           className="bg-green-500 text-white px-4 py-2 rounded mr-2"
//         >
//           Submit Order
//         </button>
//         <button
//           onClick={closeForm}
//           className="bg-gray-500 text-white px-4 py-2 rounded"
//         >
//           Close
//         </button>
//       </div>
//     </div>
//   );
// };

// export default OrderForm;


import React, { useContext, useState } from 'react';
import axios from 'axios';
import { AuthContext } from '../../context/AuthContext';

const OrderForm = ({ closeForm }) => {
  const [manufacturerName, setManufacturerName] = useState('');
  const [medicines, setMedicines] = useState([{ name: '', qty: 1 }]);
  const [error, setError] = useState('');
  const { token } = useContext(AuthContext);

  const handleMedicineChange = (index, field, value) => {
    const newMedicines = [...medicines];
    newMedicines[index][field] = value;
    setMedicines(newMedicines);
  };

  const addMedicine = () => {
    setMedicines([...medicines, { name: '', qty: 1 }]);
  };

  const removeMedicine = (index) => {
    const newMedicines = medicines.filter((_, i) => i !== index);
    setMedicines(newMedicines);
  };

  const handleSubmit = async () => {
    if (!manufacturerName.trim() || medicines.some(m => !m.name.trim() || m.qty <= 0)) {
      setError('Please fill out all fields correctly.');
      return;
    }

    setError('');
    const orderData = {
      manufacturerName,
      medicines
    };

    try {
      const response = await axios.post(
        'https://med-tech-server.onrender.com/api/manufacturers/orders',
        orderData,
        {
          headers: {
            authorization: `Bearer ${token}`
          }
        }
      );
      // Handle the response if needed
      console.log('Order submitted:', response.data);
      closeForm(); // Close form on successful submission
    } catch (error) {
      console.error('Error submitting order:', error);
      setError('Failed to submit order. Please try again.');
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="bg-white p-4 rounded shadow-lg w-full max-w-md">
        <h2 className="text-lg font-bold mb-4">Order Form</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <label className="block mb-2">Manufacturer Name</label>
        <input
          type="text"
          value={manufacturerName}
          onChange={(e) => setManufacturerName(e.target.value)}
          className="border rounded p-2 mb-4 w-full"
        />
        {medicines.map((medicine, index) => (
          <div key={index} className="mb-4 flex items-center">
            <div className="flex-1 mr-2">
              <label className="block mb-1">Medicine Name</label>
              <input
                type="text"
                value={medicine.name}
                onChange={(e) => handleMedicineChange(index, 'name', e.target.value)}
                className="border rounded p-2 mb-2 w-full"
              />
              <label className="block mb-1">Quantity</label>
              <input
                type="number"
                value={medicine.qty}
                onChange={(e) => handleMedicineChange(index, 'qty', e.target.value)}
                className="border rounded p-2 mb-2 w-full"
                min="1"
              />
            </div>
            <button
              onClick={() => addMedicine()}
              className="bg-blue-500 text-white px-4 py-2 rounded mb-4"
            >
              +
            </button>
            <button
              onClick={() => removeMedicine(index)}
              className="bg-red-500 text-white px-4 py-2 rounded mb-4"
              disabled={medicines.length <= 1}
            >
              -
            </button>
          </div>
        ))}
        <button
          onClick={handleSubmit}
          className="bg-green-500 text-white px-4 py-2 rounded mr-2"
        >
          Submit Order
        </button>
        <button
          onClick={closeForm}
          className="bg-gray-500 text-white px-4 py-2 rounded"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default OrderForm;

// const [showOrderForm, setShowOrderForm] = useState(false);
{/* <button
onClick={() => setShowOrderForm(true)}
className="bg-blue-500 text-white px-4 py-2 rounded mb-4"
>
Or
</button> */}
// {showOrderForm && (
//   <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50">
//     <div className="bg-white p-6 rounded shadow-lg w-1/3">
//       <h2 className="text-xl font-bold mb-4">Order Form</h2>
//       <OrderForm />
//       <button
//         onClick={() => setShowOrderForm(false)}
//         className="bg-gray-500 text-white px-4 py-2 rounded"
//       >
//         Close
//       </button>
//     </div>
//   </div>
// )}