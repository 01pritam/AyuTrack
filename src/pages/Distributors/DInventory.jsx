// import React, { useState, useContext, useRef, useEffect } from 'react';
// import { InventoryContext } from '../../context/InventoryContext';
// import { UserRoleContext } from '../../context/UserRoleContext';
// import { AuthContext } from '../../context/AuthContext';

// const DInventory = () => {
//   const { InventoryData, setInventoryData, updateInventoryData, loading } = useContext(InventoryContext);
//   const { role } = useContext(UserRoleContext);
//   const { token } = useContext(AuthContext);
//   const [isModalOpen, setModalOpen] = useState(false);
//   console.log("InventoryData: ",InventoryData);
//   const [formData, setFormData] = useState({
//     name: '',
//     category: '',
//     batchNo: '',
//     expiryDate: '',
//     mrp: '',
//     cost: '',
//     qty: '',
//     deliveredDate: '',
//     temperature: '',
//     rack: '',
//     composition: '',
//     image: null,
//   });
//   const [previewImage, setPreviewImage] = useState(null);
//   const fileInputRef = useRef(null);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     if (role === 'Distributor') {
//       setInventoryData(); // Fetch and set inventory data
//     }
//   }, [role, setInventoryData]);

//   if (loading) {
//     return (
//       <div className="flex justify-center items-center h-screen">
//         <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500"></div>
//       </div>
//     );
//   }

//   if (role !== 'Distributor') return (
//     <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
//       <strong className="font-bold">Access Denied</strong>
//     </div>
//   );

//   const handleInputChange = (e) => {
//     const { name, value, type } = e.target;
//     setFormData(prev => ({
//       ...prev,
//       [name]: type === 'number' ? parseFloat(value) : value,
//     }));
//   };

//   const handleFileChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       setFormData(prev => ({ ...prev, image: file }));
//       setPreviewImage(URL.createObjectURL(file));
//     }
//   };

//   const handleClearImage = () => {
//     setFormData(prev => ({ ...prev, image: null }));
//     setPreviewImage(null);
//     if (fileInputRef.current) {
//       fileInputRef.current.value = '';
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError(null);

//     const formDataToSend = new FormData();
//     Object.keys(formData).forEach(key => {
//       if (key === 'image' && formData[key]) {
//         formDataToSend.append('image', formData[key]);
//       } else {
//         formDataToSend.append(key, formData[key]);
//       }
//     });

//     try {
//       const response = await fetch('https://your-api-endpoint.com/api/distributors/inventory/add', {
//         method: 'POST',
//         headers: {
//           'Authorization': `Bearer ${token}`,
//         },
//         body: formDataToSend,
//       });

//       if (!response.ok) {
//         throw new Error('Failed to add inventory item');
//       }

//       const newItem = await response.json();
//       updateInventoryData(newItem); // Add or update the item in the inventory
//       setModalOpen(false);
//       setFormData({
//         name: '',
//         category: '',
//         batchNo: '',
//         expiryDate: '',
//         mrp: '',
//         cost: '',
//         qty: '',
//         deliveredDate: '',
//         temperature: '',
//         rack: '',
//         composition: '',
//         image: null,
//       });
//       setPreviewImage(null);
//     } catch (error) {
//       setError(error.message);
//     }
//   };

//   const InventoryTable = () => (
//     <table className="min-w-full bg-white border border-gray-300">
//       <thead>
//         <tr className="bg-gray-100">
//           <th className="py-2 px-4 border-b">Name</th>
//           {/* <th className="py-2 px-4 border-b">Category</th> */}
//           <th className="py-2 px-4 border-b">Batch No</th>
//           {/* <th className="py-2 px-4 border-b">Expiry Date</th> */}
//           {/* <th className="py-2 px-4 border-b">MRP (₹)</th> */}
//           {/* <th className="py-2 px-4 border-b">Cost (₹)</th> */}
//           <th className="py-2 px-4 border-b">Quantity</th>
//           {/* <th className="py-2 px-4 border-b">Delivered Date</th> */}
//           {/* <th className="py-2 px-4 border-b">Temperature</th> */}
//           <th className="py-2 px-4 border-b">Rack</th>
//           {/* <th className="py-2 px-4 border-b">Composition</th> */}
//           {/* <th className="py-2 px-4 border-b">Image</th> */}
//         </tr>
//       </thead>
//       <tbody>
//         {Array.isArray(InventoryData) && InventoryData.length > 0 ? (
//           InventoryData.map((item, index) => (
//             <tr key={item._id || index} className="hover:bg-gray-50">
//               <td className="py-2 px-4 border-b">{item.name}</td>
//               {/* <td className="py-2 px-4 border-b">{item.category}</td> */}
//               <td className="py-2 px-4 border-b">{item.batchNo}</td>
//               {/* <td className="py-2 px-4 border-b">{new Date(item.expiryDate).toLocaleDateString()}</td> */}
//               {/* <td className="py-2 px-4 border-b">{item.mrp}</td> */}
//               {/* <td className="py-2 px-4 border-b">{item.cost}</td> */}
//               <td className="py-2 px-4 border-b">{item.qty}</td>
//               {/* <td className="py-2 px-4 border-b">{new Date(item.deliveredDate).toLocaleDateString()}</td> */}
//               {/* <td className="py-2 px-4 border-b">{item.temperature}°C</td> */}
//               <td className="py-2 px-4 border-b">{item.rack}</td>
//               {/* <td className="py-2 px-4 border-b">{item.composition}</td> */}
//               {/* <td className="py-2 px-4 border-b">
//                 {item.image && (
//                   <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded" />
//                 )}
//               </td> */}
//             </tr>
//           ))
//         ) : (
//           <tr>
//             <td colSpan="12" className="py-4 text-center text-gray-500">No inventory data available.</td>
//           </tr>
//         )}
//       </tbody>
//     </table>
//   );

//   return (
//     <div className="container mx-auto p-4">
//       <div className="flex justify-between items-center mb-6">
//         <h1 className="text-2xl font-bold">Distributor Inventory</h1>
//         <button
//           onClick={() => setModalOpen(true)}
//           className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
//         >
//           Add Inventory Item
//         </button>
//       </div>
//       <div className="overflow-x-auto">
//         <InventoryTable />
//       </div>

//       {isModalOpen && (
//         <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full" id="my-modal">
//           <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
//             <div className="mt-3 text-center">
//               <h3 className="text-lg leading-6 font-medium text-gray-900">Add New Inventory Item</h3>
//               <form onSubmit={handleSubmit} className="mt-2 text-left">
//                 <div className="grid grid-cols-2 gap-4">
//                   <div>
//                     <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
//                     <input type="text" id="name" name="name" value={formData.name} onChange={handleInputChange} required className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
//                   </div>
//                   <div>
//                     <label htmlFor="category" className="block text-sm font-medium text-gray-700">Category</label>
//                     <input type="text" id="category" name="category" value={formData.category} onChange={handleInputChange} required className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
//                   </div>
//                   {/* Other form fields */}
//                   <div className="col-span-2">
//                     <label htmlFor="image" className="block text-sm font-medium text-gray-700">Image</label>
//                     <input type="file" id="image" ref={fileInputRef} onChange={handleFileChange} accept="image/*" className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100" />
//                     {previewImage && (
//                       <div className="mt-2">
//                         <img src={previewImage} alt="Preview" className="w-32 h-32 object-cover rounded-md" />
//                         <button type="button" onClick={handleClearImage} className="mt-2 text-red-500 text-sm">Remove Image</button>
//                       </div>
//                     )}
//                   </div>
//                 </div>
//                 {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
//                 <div className="mt-4">
//                   <button type="submit" className="inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-500 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:text-sm">
//                     Add Item
//                   </button>
//                   <button type="button" onClick={() => setModalOpen(false)} className="ml-2 inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-gray-500 text-base font-medium text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:text-sm">
//                     Cancel
//                   </button>
//                 </div>
//               </form>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default DInventory;


// import React, { useState, useContext, useRef, useEffect } from 'react';
// import { InventoryContext } from '../../context/InventoryContext';
// import { UserRoleContext } from '../../context/UserRoleContext';
// import { AuthContext } from '../../context/AuthContext';

// const DInventory = () => {
//   const { InventoryData, setInventoryData, updateInventoryData, loading } = useContext(InventoryContext);
//   const { role } = useContext(UserRoleContext);
//   const { token } = useContext(AuthContext);
//   const [isModalOpen, setModalOpen] = useState(false);
//   const [formData, setFormData] = useState({
//     name: '',
//     category: '',
//     batchNo: '',
//     expiryDate: '',
//     mrp: '',
//     cost: '',
//     qty: '',
//     deliveredDate: '',
//     temperature: '',
//     rack: '',
//     margin: '',
//     composition: [],
//     image: null,
//   });
//   const [previewImage, setPreviewImage] = useState(null);
//   const fileInputRef = useRef(null);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     if (role === 'Distributor') {
//       setInventoryData(); // Fetch and set inventory data
//     }
//   }, [role, setInventoryData]);

//   if (loading) {
//     return (
//       <div className="flex justify-center items-center h-screen">
//         <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500"></div>
//       </div>
//     );
//   }

//   if (role !== 'Distributor') return (
//     <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
//       <strong className="font-bold">Access Denied</strong>
//     </div>
//   );

//   const handleInputChange = (e) => {
//     const { name, value, type } = e.target;
//     setFormData(prev => ({
//       ...prev,
//       [name]: type === 'number' ? parseFloat(value) : value,
//     }));
//   };

//   const handleFileChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       setFormData(prev => ({ ...prev, image: file }));
//       setPreviewImage(URL.createObjectURL(file));
//     }
//   };

//   const handleClearImage = () => {
//     setFormData(prev => ({ ...prev, image: null }));
//     setPreviewImage(null);
//     if (fileInputRef.current) {
//       fileInputRef.current.value = '';
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError(null);

//     const formDataToSend = new FormData();
//     Object.keys(formData).forEach(key => {
//       if (key === 'image' && formData[key]) {
//         formDataToSend.append('image', formData[key]);
//       } else {
//         formDataToSend.append(key, formData[key]);
//       }
//     });

//     try {
//       const response = await fetch('https://your-api-endpoint.com/api/distributors/inventory/add', {
//         method: 'POST',
//         headers: {
//           'Authorization': `Bearer ${token}`,
//         },
//         body: formDataToSend,
//       });

//       if (!response.ok) {
//         throw new Error('Failed to add inventory item');
//       }

//       const newItem = await response.json();
//       updateInventoryData(newItem); // Add or update the item in the inventory

//       // Send margin to a separate API
//       const marginResponse = await fetch('https://your-api-endpoint.com/api/distributors/inventory/margin', {
//         method: 'POST',
//         headers: {
//           'Authorization': `Bearer ${token}`,
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           itemId: newItem._id,
//           margin: formData.margin,
//         }),
//       });

//       if (!marginResponse.ok) {
//         throw new Error('Failed to update margin');
//       }

//       setModalOpen(false);
//       setFormData({
//         name: '',
//         category: '',
//         batchNo: '',
//         expiryDate: '',
//         mrp: '',
//         cost: '',
//         qty: '',
//         deliveredDate: '',
//         temperature: '',
//         rack: '',
//         margin: '',
//         composition: [],
//         image: null,
//       });
//       setPreviewImage(null);
//     } catch (error) {
//       setError(error.message);
//     }
//   };

//   const InventoryTable = () => (
//     <table className="min-w-full bg-white border border-gray-300">
//       <thead>
//         <tr className="bg-gray-100">
//           <th className="py-2 px-4 border-b">Name</th>
//           <th className="py-2 px-4 border-b">Batch No</th>
//           <th className="py-2 px-4 border-b">Quantity</th>
//           <th className="py-2 px-4 border-b">Rack</th>
//           <th className="py-2 px-4 border-b">Margin</th>
//         </tr>
//       </thead>
//       <tbody>
//         {Array.isArray(InventoryData) && InventoryData.length > 0 ? (
//           InventoryData.map((item, index) => (
//             <tr key={item._id || index} className="hover:bg-gray-50">
//               <td className="py-2 px-4 border-b">{item.name}</td>
//               <td className="py-2 px-4 border-b">{item.batchNo}</td>
//               <td className="py-2 px-4 border-b">{item.qty}</td>
//               <td className="py-2 px-4 border-b">{item.rack}</td>
//               <td className="py-2 px-4 border-b">{item.margin}</td>
//             </tr>
//           ))
//         ) : (
//           <tr>
//             <td colSpan="5" className="py-4 text-center text-gray-500">No inventory data available.</td>
//           </tr>
//         )}
//       </tbody>
//     </table>
//   );

//   return (
//     <div className="container mx-auto p-4">
//       <div className="flex justify-between items-center mb-6">
//         <h1 className="text-2xl font-bold">Distributor Inventory</h1>
//         <button
//           onClick={() => setModalOpen(true)}
//           className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
//         >
//           Add Inventory Item
//         </button>
//       </div>
//       <div className="overflow-x-auto">
//         <InventoryTable />
//       </div>

//       {isModalOpen && (
//         <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full" id="my-modal">
//           <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
//             <div className="mt-3 text-center">
//               <h3 className="text-lg leading-6 font-medium text-gray-900">Add New Inventory Item</h3>
//               <form onSubmit={handleSubmit} className="mt-2 text-left">
                // <div className="grid grid-cols-2 gap-4">
                //   <div>
                //     <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
                //     <input type="text" id="name" name="name" value={formData.name} onChange={handleInputChange} required className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                //   </div>
                //   <div>
                //     <label htmlFor="category" className="block text-sm font-medium text-gray-700">Category</label>
                //     <input type="text" id="category" name="category" value={formData.category} onChange={handleInputChange} required className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                //   </div>
                //   {/* Other form fields */}
                //   <div className="col-span-2">
                //     <label htmlFor="rack" className="block text-sm font-medium text-gray-700">Rack</label>
                //     <input type="text" id="rack" name="rack" value={formData.rack} onChange={handleInputChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                //   </div>
                //   <div className="col-span-2">
                //     <label htmlFor="margin" className="block text-sm font-medium text-gray-700">Margin</label>
                //     <input type="text" id="margin" name="margin" value={formData.margin} onChange={handleInputChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                //   </div>
                //   {/* File upload */}
                //   <div className="col-span-2">
                //     <label htmlFor="image" className="block text-sm font-medium text-gray-700">Image</label>
                //     <input type="file" id="image" name="image" onChange={handleFileChange} ref={fileInputRef} className="mt-1 block w-full text-sm text-gray-500 file:py-2 file:px-3 file:border file:border-gray-300 file:rounded file:text-sm file:font-semibold file:bg-gray-100 file:text-blue-700 hover:file:bg-gray-200" />
                //     {previewImage && (
                //       <div className="mt-2">
                //         <img src={previewImage} alt="Preview" className="w-full h-auto rounded-md" />
                //         <button type="button" onClick={handleClearImage} className="text-red-500 text-sm">Remove</button>
                //       </div>
                //     )}
                //   </div>
//                   {/* Submit */}
//                   <div className="col-span-2">
//                     {error && <p className="text-red-500 text-sm">{error}</p>}
//                     <button type="submit" className="mt-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Submit</button>
//                     <button onClick={() => setModalOpen(false)} className="mt-2 ml-2 bg-gray-300 hover:bg-gray-400 text-gray-700 font-bold py-2 px-4 rounded">Cancel</button>
//                   </div>
//                 </div>
//               </form>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default DInventory;
import React, { useState, useContext, useEffect } from 'react';
import { InventoryContext } from '../../context/InventoryContext';
import { UserRoleContext } from '../../context/UserRoleContext';
import { AuthContext } from '../../context/AuthContext';
import axios from 'axios';

const Inventory = () => {
  const { InventoryData, loading, fetchInventoryData } = useContext(InventoryContext);
  const { role } = useContext(UserRoleContext);
  const { token } = useContext(AuthContext);
  const [searchTerm, setSearchTerm] = useState('');
  const [stockStatusFilter, setStockStatusFilter] = useState('All');
  const [filteredData, setFilteredData] = useState([]);
  const [editableItem, setEditableItem] = useState(null);
  
  useEffect(() => {
    setFilteredData(InventoryData);
  }, [InventoryData]);

  useEffect(() => {
    const applyFilters = () => {
      let result = [...InventoryData];

      if (searchTerm) {
        result = result.filter(item =>
          item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.sku.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.vendor.toLowerCase().includes(searchTerm.toLowerCase())
        );
      }

      if (stockStatusFilter !== 'All') {
        result = result.filter(item => {
          const qty = item.qty || 0;
          return (
            (stockStatusFilter === 'In Stock' && qty > 100) ||
            (stockStatusFilter === 'Low Stock' && qty > 0 && qty <= 100) ||
            (stockStatusFilter === 'Out of Stock' && qty === 0)
          );
        });
      }

      setFilteredData(result);
    };

    applyFilters();
  }, [searchTerm, stockStatusFilter, InventoryData]);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSave = async () => {
    if (!editableItem) return;
      console.log("editableitem: ",editableItem);
      console.log("editableitemid: ",editableItem._id);
      
    try {
      await axios.put(
        `https://med-tech-server.onrender.com/api/distributors/inv/inventory/${editableItem._id}/rack`,
        { rack: editableItem.rack },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      await axios.put(
        `https://med-tech-server.onrender.com/api/distributors/inv/inventory/${editableItem._id}/margin`,
        // { margin: editableItem.margin },
        { margin: Number(editableItem.margin) },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      await fetchInventoryData();
      setEditableItem(null);
    } catch (error) {
      console.error('Error updating item:', error);
    }
  };
  
  


  const getStatusColor = (stock) => {
    if (stock === 0) return 'bg-red-400 text-red-900';
    if (stock <= 100) return 'bg-orange-200 text-orange-700';
    return 'bg-teal-200 text-teal-700';
  };

  const getStatusText = (stock) => {
    if (stock === 0) return 'OUT OF STOCK';
    if (stock <= 100) return 'LOW STOCK';
    return 'IN STOCK';
  };

  const handleFilterSubmit = (status) => {
    setStockStatusFilter(status);
  };

  const handleEditClick = (item) => {
    setEditableItem({
      ...item,
      rack: item.rack || '',
      margin: item.margin || '',
    });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-indigo-600"></div>
      </div>
    );
  }

  const totalAssetValue = InventoryData.reduce((total, item) => {
    const mrp = Number(item.mrp) || 0;
    const qty = Number(item.qty) || 0;
    return total + (mrp * qty);
  }, 0);

  const inStockCount = filteredData.filter(item => item.qty > 100).length;
  const lowStockCount = filteredData.filter(item => item.qty > 0 && item.qty <= 100).length;
  const outOfStockCount = filteredData.filter(item => item.qty === 0).length;

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
              <span className={`px-3 py-1 rounded ${getStatusColor(inStockCount)}`}>In stock: {inStockCount}</span>
              <span className={`px-3 py-1 rounded ${getStatusColor(lowStockCount)}`}>Low stock: {lowStockCount}</span>
              <span className={`px-3 py-1 rounded ${getStatusColor(outOfStockCount)}`}>Out of stock: {outOfStockCount}</span>
            </div>
          </div>
        </div>
        <div className="flex justify-between items-center">
         
          <div className="flex items-center space-x-2">
            <input
              type="text"
              placeholder="Search Inventory"
              className="pl-10 pr-4 py-2 border rounded-lg"
              value={searchTerm}
              onChange={handleSearch}
            />
            <button
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
              onClick={() => setStockStatusFilter('All')}
            >
              Filter
            </button>
          </div>
        </div>
      </div>

      <table className="min-w-full">
        <thead>
          <tr className="text-left text-gray-500">
            <th className="py-2">S.No</th>
            <th className="py-2">Name</th>
            <th className="py-2">Category</th>
            <th className="py-2">Batch No</th>
            <th className="py-2">MRP</th>
            <th className="py-2">Stock Status</th>
            <th className="py-2">Rack</th>
            <th className="py-2">Margin</th>
            <th className="py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map((item, index) => (
            <tr key={item.sku} className="bg-white border-b">
              <td className="py-2">{index + 1}</td>
              <td className="py-2">{item.name}</td>
              <td className="py-2">{item.category}</td>
              <td className="py-2">{item.batchNo}</td>
              <td className="py-2">₹{item.mrp}</td>
              <td className={`py-2 px-4 ${getStatusColor(item.qty)}`}>
                {getStatusText(item.qty)}
              </td>
              <td className="py-2">
                {editableItem && editableItem._id === item._id ? (
                  <input
                    type="text"
                    value={editableItem.rack || ''}
                    onChange={(e) => setEditableItem({ ...editableItem, rack: e.target.value })}
                    className="w-full border rounded p-1"
                  />
                ) : (
                  item.rack || ''
                )}
              </td>
              <td className="py-2">
                {editableItem && editableItem._id === item._id ? (
                  <input
                  type="number"
                  value={editableItem.margin || ''}
                  onChange={(e) => {
                    const value = e.target.value;
                    // Convert the input to a number or keep it as an empty string if the input is cleared
                    setEditableItem({ 
                      ...editableItem, 
                      margin: value === '' ? '' : Number(value) 
                    });
                  }}
                  className="w-full border rounded p-1"
                />
                ) : (
                  item.margin || ''
                )}
              </td>
              <td className="py-2">
                {editableItem && editableItem._id === item._id ? (
                  <button
                    onClick={handleSave}
                    className="px-2 py-1 bg-green-500 text-white rounded hover:bg-green-600"
                  >
                    Save
                  </button>
                ) : (
                  <button
                    onClick={() => handleEditClick(item)}
                    className="px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                  >
                    Edit
                  </button>
                )}
              </td>
              
            </tr>
          ))}
        </tbody>
      </table>

      {/* Filter Modal */}
      <div
        className={`fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 ${
          stockStatusFilter !== 'All' ? 'block' : 'hidden'
        }`}
      >
        <div className="bg-white p-4 rounded-lg">
          <h3 className="text-lg font-semibold">Filter by Stock Status</h3>
          <div className="flex flex-col space-y-2 mt-4">
            <button
              onClick={() => handleFilterSubmit('All')}
              className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
            >
              All
            </button>
            <button
              onClick={() => handleFilterSubmit('In Stock')}
              className="px-4 py-2 bg-teal-200 rounded hover:bg-teal-300"
            >
              In Stock
            </button>
            <button
              onClick={() => handleFilterSubmit('Low Stock')}
              className="px-4 py-2 bg-orange-200 rounded hover:bg-orange-300"
            >
              Low Stock
            </button>
            <button
              onClick={() => handleFilterSubmit('Out of Stock')}
              className="px-4 py-2 bg-red-200 rounded hover:bg-red-300"
            >
              Out of Stock
            </button>
          </div>
        </div>
      </div>
      
    </div>
  );
};

export default Inventory;