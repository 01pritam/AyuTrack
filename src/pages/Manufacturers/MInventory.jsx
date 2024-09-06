// import React, { useState, useContext, useRef } from 'react';
// import MInventoryRow from '../../components/Manufacturers/MInventoryRow';
// import { InventoryContext } from '../../context/InventoryContext';
// import { UserRoleContext } from '../../context/UserRoleContext';
// import { AuthContext } from '../../context/AuthContext';

// const Inventory = () => {
//   const { InventoryData, loading, fetchInventoryData } = useContext(InventoryContext);
//   const { role } = useContext(UserRoleContext);
//   const [isModalOpen, setModalOpen] = useState(false);
//   const { token } = useContext(AuthContext);
  // const [formData, setFormData] = useState({
  //   name: '',
  //   category: '',
  //   batchNo: '',
  //   expiryDate: '',
  //   mrp: '',
  //   stockStatus: '',
  //   demand: '',
  //   productionDate: '',
  //   qualityCheck: false, // Boolean for quality check
  //   machineNo: '',
  //   barcode: '',
  //   rack: '',
  //   temperature: '',
  //   quantity: '', // Add quantity here
  //   qualityImages: [], // Array to handle multiple files
  // });
  // const fileInputRef = useRef(null);

//   if (loading) {
//     return (
//       <div className="flex justify-center items-center h-screen relative">
//         <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
//         <div className="absolute flex items-center justify-center h-full w-full">
//           <p className="text-xl font-bold text-gray-600">Inventory Loading...</p>
//         </div>
//       </div>
//     );
//   }
//   if (role !== 'Manufacturer') return <div>Access Denied...</div>;

//   const handleInputChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     if (type === 'checkbox') {
//       setFormData({ ...formData, [name]: checked });
//     } else {
//       setFormData({ ...formData, [name]: value });
//     }
//   };

//   const handleFileChange = (e) => {
//     const files = Array.from(e.target.files);
//     setFormData({ ...formData, qualityImages: files });
//   };

//   const handleClearFiles = () => {
//     fileInputRef.current.value = ''; // Clear the file input
//     setFormData({ ...formData, qualityImages: [] }); // Clear the state
//   };

//   const handleSubmit = async () => {
//     const formDataToSend = new FormData();
//     Object.keys(formData).forEach(key => {
//       if (key === 'qualityCheck') {
//         formDataToSend.append(key, formData[key] ? 'true' : 'false'); // Convert Boolean to string
//       } else if (key === 'qualityImages') {
//         formData[key].forEach((file, index) => {
//           formDataToSend.append(`qualityImages[${index}]`, file);
//         });
//       } else if (key === 'quantity') {
//         formDataToSend.append('qty', formData[key]); // Use 'qty' for quantity
//       } else {
//         formDataToSend.append(key, formData[key]);
//       }
//     });
  
//     try {
//       const response = await fetch('https://med-tech-server.onrender.com/api/manufacturers/inv/add-inventory', {
//         method: 'POST',
//         headers: {
//           'Authorization': `Bearer ${token}`, // Include the token in the Authorization header
//           // Do not set Content-Type for FormData
//         },
//         body: formDataToSend,
//       });
  
//       if (!response.ok) {
//         throw new Error(`HTTP error! Status: ${response.status}`);
//       }
  
//       const data = await response.json(); // or response.text() if the response is not JSON
//       console.log('Success:', data);
  
//       setModalOpen(false);
//       fetchInventoryData(); // Refresh inventory data
  
//     } catch (error) {
//       console.error('Error:', error);
//     }
//   };

//   return (
//     <div className="container mx-auto p-4">
//       <div className="flex justify-end mb-4">
//         <button
//           className="bg-blue-500 text-white px-4 py-2 rounded"
//           onClick={() => setModalOpen(true)}
//         >
//           Add Inventory Data
//         </button>
//       </div>

//       <div className="overflow-x-auto">
//         <table className="min-w-full bg-white border border-gray-300">
//           <thead>
//             <tr>
//               <th className="px-4 py-3 border-b text-left text-xs font-medium text-gray-500 uppercase tracking-wider">S.No</th>
//               <th className="px-4 py-3 border-b text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
//               <th className="px-4 py-3 border-b text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
//               <th className="px-4 py-3 border-b text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Batch No</th>
//               <th className="px-4 py-3 border-b text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Expiry Date</th>
//               <th className="px-4 py-3 border-b text-left text-xs font-medium text-gray-500 uppercase tracking-wider">MRP (₹)</th>
//               <th className="px-4 py-3 border-b text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stock Status</th>
//               <th className="px-4 py-3 border-b text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Demand</th>
//               <th className="px-4 py-3 border-b text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Production Date</th>
//               <th className="px-4 py-3 border-b text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quality Check</th>
//               <th className="px-4 py-3 border-b text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Machine No</th>
//               <th className="px-4 py-3 border-b text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Barcode ID</th>
//               <th className="px-4 py-3 border-b text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rack</th>
//               <th className="px-4 py-3 border-b text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Temperature</th>
//               <th className="px-4 py-3 border-b text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quantity</th> {/* New Column */}
//               <th className="px-4 py-3 border-b text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Upload Quality Images</th>
//             </tr>
//           </thead>
          // <tbody>
          //   {InventoryData.map((item, index) => (
          //     <MInventoryRow
          //       key={item.barcode} // Ensure this is unique
          //       serialNumber={index + 1}
          //       data={item}
          //     />
          //   ))}
          // </tbody>
//         </table>
//       </div>

//       {isModalOpen && (
//         <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75">
//           <div className="bg-white p-6 rounded-lg shadow-lg w-1/2">
//             <h2 className="text-2xl mb-4">Add Inventory Data</h2>
//             <form>
//               <div className="grid grid-cols-2 gap-4">
//                 <input
//                   type="text"
//                   name="name"
//                   placeholder="Name"
//                   value={formData.name}
//                   onChange={handleInputChange}
//                   className="border p-2"
//                 />
//                 <input
//                   type="text"
//                   name="category"
//                   placeholder="Category"
//                   value={formData.category}
//                   onChange={handleInputChange}
//                   className="border p-2"
//                 />
//                 <input
//                   type="text"
//                   name="batchNo"
//                   placeholder="Batch No"
//                   value={formData.batchNo}
//                   onChange={handleInputChange}
//                   className="border p-2"
//                 />
//                 <div className="border p-2">
//                   <label htmlFor="expiryDate">Expiry Date:</label>
//                   <input
//                     id="expiryDate"
//                     type="date"
//                     name="expiryDate"
//                     value={formData.expiryDate}
//                     onChange={handleInputChange}
//                     className="ml-2"
//                   />
//                   <div className="mt-1">
//                     {formData.expiryDate ? new Date(formData.expiryDate).toLocaleDateString() : 'Select a date'}
//                   </div>
//                 </div>
//                 <input
//                   type="number"
//                   name="mrp"
//                   placeholder="MRP (₹)"
//                   value={formData.mrp}
//                   onChange={handleInputChange}
//                   className="border p-2"
//                 />
//                 <input
//                   type="text"
//                   name="stockStatus"
//                   placeholder="Stock Status"
//                   value={formData.stockStatus}
//                   onChange={handleInputChange}
//                   className="border p-2"
//                 />
//                 <input
//                   type="text"
//                   name="demand"
//                   placeholder="Demand"
//                   value={formData.demand}
//                   onChange={handleInputChange}
//                   className="border p-2"
//                 />
//                 <input
//                   type="date"
//                   name="productionDate"
//                   placeholder="Production Date"
//                   value={formData.productionDate}
//                   onChange={handleInputChange}
//                   className="border p-2"
//                 />
//                 <div className="flex items-center">
//                   <input
//                     type="checkbox"
//                     name="qualityCheck"
//                     checked={formData.qualityCheck}
//                     onChange={handleInputChange}
//                     className="mr-2"
//                   />
//                   <label htmlFor="qualityCheck">Quality Check</label>
//                 </div>
//                 <input
//                   type="text"
//                   name="machineNo"
//                   placeholder="Machine No"
//                   value={formData.machineNo}
//                   onChange={handleInputChange}
//                   className="border p-2"
//                 />
//                 <input
//                   type="text"
//                   name="barcode"
//                   placeholder="Barcode ID"
//                   value={formData.barcode}
//                   onChange={handleInputChange}
//                   className="border p-2"
//                 />
//                 <input
//                   type="text"
//                   name="rack"
//                   placeholder="Rack"
//                   value={formData.rack}
//                   onChange={handleInputChange}
//                   className="border p-2"
//                 />
//                 <input
//                   type="text"
//                   name="temperature"
//                   placeholder="Temperature"
//                   value={formData.temperature}
//                   onChange={handleInputChange}
//                   className="border p-2"
//                 />
//                 <input
//                   type="number"
//                   name="quantity"
//                   placeholder="Quantity"
//                   value={formData.qty}
//                   onChange={handleInputChange}
//                   className="border p-2"
//                 />
//                 <input
//                   type="file"
//                   ref={fileInputRef}
//                   multiple
//                   onChange={handleFileChange}
//                   className="border p-2"
//                 />
//                 {formData.qualityImages.length > 0 && (
                  
//                   <button
//                     type="button"
//                     onClick={handleClearFiles}
//                     className="bg-red-500 text-white px-2 py-1 rounded"
//                   >
//                     Clear Files
//                   </button>
//                 )}
//               </div>
//               <div className="mt-4 flex justify-end">
//                 <button
//                   type="button"
//                   onClick={handleSubmit}
//                   className="bg-blue-500 text-white px-4 py-2 rounded"
//                 >
//                   Submit
//                 </button>
//                 <button
//                   type="button"
//                   onClick={() => setModalOpen(false)}
//                   className="bg-gray-500 text-white px-4 py-2 rounded ml-2"
//                 >
//                   Close
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}



//     </div>
//   );
// };

// export default Inventory;

// import React, { useState, useContext, useRef } from 'react';
// import MInventoryRow from '../../components/Manufacturers/MInventoryRow';
// import { InventoryContext } from '../../context/InventoryContext';
// import { UserRoleContext } from '../../context/UserRoleContext';
// import { AuthContext } from '../../context/AuthContext';

// const Inventory = () => {
//   const { InventoryData, loading, fetchInventoryData } = useContext(InventoryContext);
//   const { role } = useContext(UserRoleContext);
//   const [isModalOpen, setModalOpen] = useState(false);
//   const { token } = useContext(AuthContext);
//   const [formData, setFormData] = useState({
//     name: '',
//     category: '',
//     batchNo: '',
//     expiryDate: '',
//     mrp: '',
//     demand: '',
//     productionDate: '',
//     qualityCheck: false,
//     machineNo: '',
//     barcode: '',
//     rack: '',
//     temperature: '',
//     quantity: '',
//     qualityImages: [],
//     composition: [{ ingredient: '', quantity: '' }], // Initialize with one empty composition
//   });
//   const fileInputRef = useRef(null);

//   if (loading) {
//     return (
//       <div className="flex justify-center items-center h-screen bg-gray-100">
//         <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-indigo-600"></div>
//       </div>
//     );
//   }
//   if (role !== 'Manufacturer') return <div>Access Denied...</div>;

//   const handleInputChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     if (type === 'checkbox') {
//       setFormData({ ...formData, [name]: checked });
//     } else {
//       setFormData({ ...formData, [name]: value });
//     }
//   };

//   const handleFileChange = (e) => {
//     const files = Array.from(e.target.files);
//     setFormData({ ...formData, qualityImages: files });
//   };

//   const handleClearFiles = () => {
//     fileInputRef.current.value = '';
//     setFormData({ ...formData, qualityImages: [] });
//   };

//   const handleCompositionChange = (index, e) => {
//     const { name, value } = e.target;
//     const newComposition = [...formData.composition];
//     newComposition[index] = { ...newComposition[index], [name]: value };
//     setFormData({ ...formData, composition: newComposition });
//   };

//   const handleAddComposition = () => {
//     setFormData({ ...formData, composition: [...formData.composition, { ingredient: '', quantity: '' }] });
//   };

//   const handleRemoveComposition = (index) => {
//     const newComposition = formData.composition.filter((_, i) => i !== index);
//     setFormData({ ...formData, composition: newComposition });
//   };

//   const handleSubmit = async () => {
//     const formDataToSend = new FormData();
    
//     // Append all fields except `composition` as usual
//     Object.keys(formData).forEach(key => {
//       if (key === 'qualityCheck') {
//         formDataToSend.append(key, formData[key] ? 'true' : 'false');
//       } else if (key === 'qualityImages') {
//         formData[key].forEach((file, index) => {
//           formDataToSend.append(`qualityImages[${index}]`, file);
//         });
//       } else if (key === 'quantity') {
//         formDataToSend.append('qty', formData[key]);
//       } else {
//         formDataToSend.append(key, formData[key]);
//       }
//     });
  
//     // Manually handle `composition` field
//     formData.composition.forEach((comp, index) => {
//       formDataToSend.append(`composition[${index}][ingredient]`, comp.ingredient);
//       formDataToSend.append(`composition[${index}][quantity]`, comp.quantity);
//     });
  
//     try {
//       const response = await fetch('https://med-tech-server.onrender.com/api/manufacturers/inv/add-inventory', {
//         method: 'POST',
//         headers: {
//           'Authorization': `Bearer ${token}`,
//         },
//         body: formDataToSend,
//       });
  
//       if (!response.ok) {
//         throw new Error(`HTTP error! Status: ${response.status}`);
//       }
  
//       const data = await response.json();
//       console.log('Success:', data);
  
//       setModalOpen(false);
//       fetchInventoryData();
//     } catch (error) {
//       console.error('Error:', error);
//     }
//   };

//   return (
//     <div className="container mx-auto p-4">
//       <div className="flex justify-end mb-4">
//         <button
//           className="bg-blue-500 text-white px-4 py-2 rounded"
//           onClick={() => setModalOpen(true)}
//         >
//           Add Inventory Data
//         </button>
//       </div>

//       <div className="overflow-x-auto">
//         <table className="min-w-full bg-white border border-gray-300">
//           <thead>
//             <tr>
//               {/* Your table headers */}
//             </tr>
//           </thead>
//           <tbody>
//             {InventoryData.map((item, index) => (
//               <MInventoryRow
//                 key={item.barcode}
//                 serialNumber={index + 1}
//                 data={item}
//               />
//             ))}
//           </tbody>
//         </table>
//       </div>

      // {isModalOpen && (
      //   <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75">
      //     <div className="bg-white p-6 rounded-lg shadow-lg w-1/2">
      //       <h2 className="text-2xl mb-4">Add Inventory Data</h2>
      //       <form>
      //         <div className="grid grid-cols-2 gap-4">
      //           {/* Your other form fields */}
      //           <input
      //             type="text"
      //             name="name"
      //             placeholder="Name"
      //             value={formData.name}
      //             onChange={handleInputChange}
      //             className="border p-2"
      //           />
      //           <input
      //             type="text"
      //             name="category"
      //             placeholder="Category"
      //             value={formData.category}
      //             onChange={handleInputChange}
      //             className="border p-2"
      //           />
      //           <input
      //             type="text"
      //             name="batchNo"
      //             placeholder="Batch No"
      //             value={formData.batchNo}
      //             onChange={handleInputChange}
      //             className="border p-2"
      //           />
      //           <input
      //             type="date"
      //             name="expiryDate"
      //             placeholder="Expiry Date"
      //             value={formData.expiryDate}
      //             onChange={handleInputChange}
      //             className="border p-2"
      //           />
      //           <input
      //             type="text"
      //             name="mrp"
      //             placeholder="MRP (₹)"
      //             value={formData.mrp}
      //             onChange={handleInputChange}
      //             className="border p-2"
      //           />
        
      //           <input
      //             type="text"
      //             name="demand"
      //             placeholder="Demand"
      //             value={formData.demand}
      //             onChange={handleInputChange}
      //             className="border p-2"
      //           />
      //           <input
      //             type="date"
      //             name="productionDate"
      //             placeholder="Production Date"
      //             value={formData.productionDate}
      //             onChange={handleInputChange}
      //             className="border p-2"
      //           />
      //           <label className="flex items-center">
      //             <input
      //               type="checkbox"
      //               name="qualityCheck"
      //               checked={formData.qualityCheck}
      //               onChange={handleInputChange}
      //               className="mr-2"
      //             />
      //             Quality Check
      //           </label>
      //           <input
      //             type="text"
      //             name="machineNo"
      //             placeholder="Machine No"
      //             value={formData.machineNo}
      //             onChange={handleInputChange}
      //             className="border p-2"
      //           />
      //           <input
      //             type="text"
      //             name="barcode"
      //             placeholder="Barcode ID"
      //             value={formData.barcode}
      //             onChange={handleInputChange}
      //             className="border p-2"
      //           />
      //           <input
      //             type="text"
      //             name="rack"
      //             placeholder="Rack"
      //             value={formData.rack}
      //             onChange={handleInputChange}
      //             className="border p-2"
      //           />
      //           <input
      //             type="text"
      //             name="temperature"
      //             placeholder="Temperature"
      //             value={formData.temperature}
      //             onChange={handleInputChange}
      //             className="border p-2"
      //           />
      //           <input
      //             type="number"
      //             name="quantity"
      //             placeholder="Quantity"
      //             value={formData.quantity}
      //             onChange={handleInputChange}
      //             className="border p-2"
      //           />
      //           <input
      //             type="number"
      //             name="cost"
      //             placeholder="Cost (₹)"
      //             value={formData.cost}
      //             onChange={handleInputChange}
      //             className="border p-2"
      //           />
      //           <input
      //             type="number"
      //             name="sellingPrice"
      //             placeholder="Selling Price (₹)"
      //             value={formData.sellingPrice}
      //             onChange={handleInputChange}
      //             className="border p-2"
      //           />
      //           <div className="col-span-2">
      //             <h3 className="text-xl mb-2">Composition</h3>
      //             {formData.composition.map((comp, index) => (
      //               <div key={index} className="flex items-center mb-2">
      //                 <input
      //                   type="text"
      //                   name="ingredient"
      //                   placeholder="Ingredient"
      //                   value={comp.ingredient}
      //                   onChange={(e) => handleCompositionChange(index, e)}
      //                   className="border p-2 mr-2"
      //                 />
      //                 <input
      //                   type="text"
      //                   name="quantity"
      //                   placeholder="Quantity"
      //                   value={comp.quantity}
      //                   onChange={(e) => handleCompositionChange(index, e)}
      //                   className="border p-2 mr-2"
      //                 />
      //                 <button
      //                   type="button"
      //                   onClick={() => handleRemoveComposition(index)}
      //                   className="bg-red-500 text-white px-2 py-1 rounded"
      //                 >
      //                   Remove
      //                 </button>
      //               </div>
      //             ))}
      //             <button
      //               type="button"
      //               onClick={handleAddComposition}
      //               className="bg-green-500 text-white px-4 py-2 rounded"
      //             >
      //               Add Composition
      //             </button>
      //           </div>
      //           <input
      //             type="file"
      //             multiple
      //             ref={fileInputRef}
      //             onChange={handleFileChange}
      //             className="border p-2"
      //           />
      //           <button
      //             type="button"
      //             onClick={handleClearFiles}
      //             className="text-blue-500"
      //           >
      //             Clear Files
      //           </button>
      //           {/* Your file input and other fields */}
                
      //         </div>
      //         <div className="mt-4 flex justify-end">
      //           <button
      //             type="button"
      //             onClick={handleSubmit}
      //             className="bg-blue-500 text-white px-4 py-2 rounded"
      //           >
      //             Submit
      //           </button>
      //           <button
      //             type="button"
      //             onClick={() => setModalOpen(false)}
      //             className="bg-gray-500 text-white px-4 py-2 rounded ml-2"
      //           >
      //             Close
      //           </button>
      //         </div>
      //       </form>
      //     </div>
      //   </div>
      // )}
//     </div>
//   );
// };

// export default Inventory;

import React, { useState, useContext, useRef, useCallback, useMemo } from 'react';
import { InventoryContext } from '../../context/InventoryContext';
import { UserRoleContext } from '../../context/UserRoleContext';
import { AuthContext } from '../../context/AuthContext';
import InventoryAddModal from './InventoryAddModal'; 
const Inventory = () => {
  const { InventoryData, loading, fetchInventoryData } = useContext(InventoryContext);
  const { role } = useContext(UserRoleContext);
  const { token } = useContext(AuthContext);
  const [isModalOpen, setModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('All');
  const [filterDialogOpen, setFilterDialogOpen] = useState(false);
  const fileInputRef = useRef(null);


const [formData, setFormData] = useState({
  name: "",
  category: "",
  batchNo: "",
  expiryDate: "",
  mrp: "",
  demand: "",
  productionDate: "",
  qualityCheck: false,
  machineNo: "",
  barcode: "",
  rack: "",
  temperature: "",
  quantity: "",
  cost: "",
  sellingPrice: "",
  composition: [{ ingredient: "", quantity: "" }],
  file: null,
});

const handleInputChange = (e) => {
  const { name, value, type, checked } = e.target;
  setFormData(prevData => ({
    ...prevData,
    [name]: type === "checkbox" ? checked : value,
  }));
};

const handleFileChange = (e) => {
  setFormData(prevData => ({
    ...prevData,
    file: e.target.files[0],
  }));
};

const handleCompositionChange = (index, field, value) => {
  setFormData(prevData => {
    const newComposition = [...prevData.composition];
    newComposition[index] = { ...newComposition[index], [field]: value };
    return { ...prevData, composition: newComposition };
  });
};

const addCompositionField = () => {
  setFormData(prevData => ({
    ...prevData,
    composition: [...prevData.composition, { ingredient: "", quantity: "" }],
  }));
};

const removeCompositionField = (index) => {
  setFormData(prevData => ({
    ...prevData,
    composition: prevData.composition.filter((_, i) => i !== index),
  }));
};


  



  const handleSubmit = useCallback(async () => {
    const formDataToSend = new FormData();
    
    Object.entries(formData).forEach(([key, value]) => {
      if (key === 'qualityCheck') {
        formDataToSend.append(key, value ? 'true' : 'false');
      } else if (key === 'quantity') {
        formDataToSend.append('qty', value);
      } else if (key !== 'composition' && key !== 'file') {
        formDataToSend.append(key, value);
      }
    });

    formData.composition.forEach((comp, index) => {
      formDataToSend.append(`composition[${index}][ingredient]`, comp.ingredient);
      formDataToSend.append(`composition[${index}][quantity]`, comp.quantity);
    });

    if (formData.file) {
      formDataToSend.append('file', formData.file);
    }

    try {
      const response = await fetch('https://med-tech-server.onrender.com/api/manufacturers/inv/add-inventory', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        body: formDataToSend,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      console.log('Success:', data);

      setModalOpen(false);
      fetchInventoryData();
    } catch (error) {
      console.error('Error:', error);
    }
  }, [formData, token, fetchInventoryData]);

  const handleSearch = useCallback((e) => {
    setSearchTerm(e.target.value.toLowerCase());
  }, []);

  const handleFilterSubmit = useCallback((selectedFilter) => {
    setFilter(selectedFilter);
    setFilterDialogOpen(false);
  }, []);

  const filteredData = useMemo(() => {
    return (InventoryData || []).filter(item => 
      (item.name?.toLowerCase().includes(searchTerm) ||
       item.category?.toLowerCase().includes(searchTerm) ||
       item.batchNo?.toLowerCase().includes(searchTerm) ||
       item.machineNo?.toLowerCase().includes(searchTerm)) &&
      (filter === 'All' ||
       (filter === 'In Stock' && item.qty > 100) ||
       (filter === 'Low Stock' && item.qty > 0 && item.qty <= 100) ||
       (filter === 'Out of Stock' && (item.qty === 0 || !item.qty)))
    );
  }, [InventoryData, searchTerm, filter]);

  const totalAssetValue = useMemo(() => 
    filteredData.reduce((total, item) => total + (Number(item.mrp) || 0) * (Number(item.qty) || 0), 0),
  [filteredData]);

  const { inStockCount, lowStockCount, outOfStockCount } = useMemo(() => ({
    inStockCount: filteredData.filter(item => item.qty > 100).length,
    lowStockCount: filteredData.filter(item => item.qty > 0 && item.qty <= 100).length,
    outOfStockCount: filteredData.filter(item => item.qty === 0 || !item.qty).length,
  }), [filteredData]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-indigo-600"></div>
      </div>
    );
  }

  if (role !== 'Manufacturer') return <div>Access Denied...</div>;

  return (
    <div className="mt-5 mx-auto p-4 bg-gray-50">
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h2 className="text-2xl font-semibold text-gray-800">TOTAL ASSET VALUE</h2>
            <p className="text-4xl font-bold text-blue-600">₹{totalAssetValue.toLocaleString()}</p>
          </div>
          <div className="flex items-center">
            <span className="text-3xl font-semibold mr-4">{filteredData.length} products</span>
            <div className="flex space-x-2">
              <span className="px-3 py-1 rounded bg-teal-200 text-teal-700">In stock: {inStockCount}</span>
              <span className="px-3 py-1 rounded bg-orange-200 text-orange-700">Low stock: {lowStockCount}</span>
              <span className="px-3 py-1 rounded bg-red-200 text-red-700">Out of stock: {outOfStockCount}</span>
            </div>
          </div>
        </div>
        <button
  className="flex px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
  onClick={() => setModalOpen(true)}
>
  Manufacture Medicines
</button>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex justify-between items-center mb-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search Inventory"
              className="pl-10 pr-4 py-2 border rounded-lg"
              value={searchTerm}
              onChange={handleSearch}
            />
            <svg className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <button onClick={() => setFilterDialogOpen(true)} className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300">Filters</button>
        </div>

        <table className="min-w-full">
          <thead>
            <tr className="text-left text-gray-500">
              <th className="py-2">S.No</th>
              <th className="py-2">Name</th>
              <th className="py-2">Category</th>
              <th className="py-2">Batch No</th>
              <th className="py-2">Machine No</th>
              <th className="py-2">MRP (₹)</th>
              <th className="py-2">Quantity</th>
              <th className="py-2">Rack</th>
              <th className="py-2">Selling Price</th>
              <th className="py-2">Expiry Date</th>
              <th className="py-2">Production Date</th>
              <th className="py-2">Stock Status</th>
              <th className="py-2">Demand</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((item, index) => (
              <tr key={item.sku || index} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                <td className="py-2">{index + 1}</td>
                <td className="py-2">{item.name || 'N/A'}</td>
                <td className="py-2">{item.category || 'N/A'}</td>
                <td className="py-2">{item.batchNo || 'N/A'}</td>
                <td className="py-2">{item.machineNo || 'N/A'}</td>
                <td className="py-2">{item.mrp || 'N/A'}</td>
                <td className="py-2">{item.qty || '0'}</td>
                <td className="py-2">{item.rack || 'N/A'}</td>
                <td className="py-2">{item.sellingPrice || 'N/A'}</td>
                <td className="py-2">
                  {item.expiryDate ? new Date(item.expiryDate).toLocaleDateString() : 'N/A'}
                </td>
                <td className="py-2">
                  {item.productionDate ? new Date(item.productionDate).toLocaleDateString() : 'N/A'}
                </td>
                <td className="py-2">
                  <span className={`px-2 py-1 rounded ${getStatusColor(item.qty)}`}>
                    {getStatusText(item.qty)}
                  </span>
                </td>
                <td className="py-2">{item.demand || 'N/A'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <InventoryAddModal 
            isOpen={isModalOpen}
            onClose={() => setModalOpen(false)}
            formData={formData}
            onInputChange={handleInputChange}
            onFileChange={handleFileChange}
            onCompositionChange={handleCompositionChange}
            onAddComposition={addCompositionField}
            onRemoveComposition={removeCompositionField}
            onSubmit={handleSubmit}
        />

      {filterDialogOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg w-1/3 relative">
            <button onClick={() => setFilterDialogOpen(false)} className="absolute top-2 right-2 text-gray-500">
              X
            </button>
            <h3 className="text-lg font-semibold mb-4">Filter Inventory</h3>
            <form onSubmit={(e) => e.preventDefault()}>
              <div className="flex flex-col space-y-2">
                <button
                  onClick={() => handleFilterSubmit('All')}
                  className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
                >
                  All
                </button>
                <button
                  onClick={() => handleFilterSubmit('In Stock')}
                  className="px-4 py-2 bg-teal-200 text-teal-700 rounded hover:bg-teal-300"
                >
                  In Stock
                </button>
                <button
                  onClick={() => handleFilterSubmit('Low Stock')}
                  className="px-4 py-2 bg-orange-200 text-orange-700 rounded hover:bg-orange-300"
                >
                  Low Stock
                </button>
                <button
                  onClick={() => handleFilterSubmit('Out of Stock')}
                  className="px-4 py-2 bg-red-200 text-red-700 rounded hover:bg-red-300"
                >
                  Out of Stock
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

// Helper functions
const getStatusColor = (stock) => {
  if (stock === 0 || !stock) return 'bg-red-200 text-red-700';
  if (stock <= 100) return 'bg-orange-200 text-orange-700';
  return 'bg-teal-200 text-teal-700';
};

const getStatusText = (stock) => {
  if (stock === 0 || !stock) return 'OUT OF STOCK';
  if (stock <= 100) return 'LOW STOCK';
  return 'IN STOCK';
};

export default Inventory;

