import React, { useState, useContext, useRef, useEffect } from 'react';
import { InventoryContext } from '../../context/InventoryContext';
import { UserRoleContext } from '../../context/UserRoleContext';
import { AuthContext } from '../../context/AuthContext';

const DInventory = () => {
  const { InventoryData, setInventoryData, updateInventoryData, loading } = useContext(InventoryContext);
  const { role } = useContext(UserRoleContext);
  const { token } = useContext(AuthContext);
  const [isModalOpen, setModalOpen] = useState(false);
  console.log("InventoryData: ",InventoryData);
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    batchNo: '',
    expiryDate: '',
    mrp: '',
    cost: '',
    qty: '',
    deliveredDate: '',
    temperature: '',
    rack: '',
    composition: '',
    image: null,
  });
  const [previewImage, setPreviewImage] = useState(null);
  const fileInputRef = useRef(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (role === 'Distributor') {
      setInventoryData(); // Fetch and set inventory data
    }
  }, [role, setInventoryData]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (role !== 'Distributor') return (
    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
      <strong className="font-bold">Access Denied</strong>
    </div>
  );

  const handleInputChange = (e) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'number' ? parseFloat(value) : value,
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData(prev => ({ ...prev, image: file }));
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const handleClearImage = () => {
    setFormData(prev => ({ ...prev, image: null }));
    setPreviewImage(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    const formDataToSend = new FormData();
    Object.keys(formData).forEach(key => {
      if (key === 'image' && formData[key]) {
        formDataToSend.append('image', formData[key]);
      } else {
        formDataToSend.append(key, formData[key]);
      }
    });

    try {
      const response = await fetch('https://your-api-endpoint.com/api/distributors/inventory/add', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        body: formDataToSend,
      });

      if (!response.ok) {
        throw new Error('Failed to add inventory item');
      }

      const newItem = await response.json();
      updateInventoryData(newItem); // Add or update the item in the inventory
      setModalOpen(false);
      setFormData({
        name: '',
        category: '',
        batchNo: '',
        expiryDate: '',
        mrp: '',
        cost: '',
        qty: '',
        deliveredDate: '',
        temperature: '',
        rack: '',
        composition: '',
        image: null,
      });
      setPreviewImage(null);
    } catch (error) {
      setError(error.message);
    }
  };

  const InventoryTable = () => (
    <table className="min-w-full bg-white border border-gray-300">
      <thead>
        <tr className="bg-gray-100">
          <th className="py-2 px-4 border-b">Name</th>
          {/* <th className="py-2 px-4 border-b">Category</th> */}
          <th className="py-2 px-4 border-b">Batch No</th>
          {/* <th className="py-2 px-4 border-b">Expiry Date</th> */}
          {/* <th className="py-2 px-4 border-b">MRP (₹)</th> */}
          {/* <th className="py-2 px-4 border-b">Cost (₹)</th> */}
          <th className="py-2 px-4 border-b">Quantity</th>
          {/* <th className="py-2 px-4 border-b">Delivered Date</th> */}
          {/* <th className="py-2 px-4 border-b">Temperature</th> */}
          {/* <th className="py-2 px-4 border-b">Rack</th> */}
          {/* <th className="py-2 px-4 border-b">Composition</th> */}
          {/* <th className="py-2 px-4 border-b">Image</th> */}
        </tr>
      </thead>
      <tbody>
        {Array.isArray(InventoryData) && InventoryData.length > 0 ? (
          InventoryData.map((item, index) => (
            <tr key={item._id || index} className="hover:bg-gray-50">
              <td className="py-2 px-4 border-b">{item.name}</td>
              {/* <td className="py-2 px-4 border-b">{item.category}</td> */}
              <td className="py-2 px-4 border-b">{item.batchNo}</td>
              {/* <td className="py-2 px-4 border-b">{new Date(item.expiryDate).toLocaleDateString()}</td> */}
              {/* <td className="py-2 px-4 border-b">{item.mrp}</td> */}
              {/* <td className="py-2 px-4 border-b">{item.cost}</td> */}
              <td className="py-2 px-4 border-b">{item.qty}</td>
              {/* <td className="py-2 px-4 border-b">{new Date(item.deliveredDate).toLocaleDateString()}</td> */}
              {/* <td className="py-2 px-4 border-b">{item.temperature}°C</td> */}
              {/* <td className="py-2 px-4 border-b">{item.rack}</td> */}
              {/* <td className="py-2 px-4 border-b">{item.composition}</td> */}
              {/* <td className="py-2 px-4 border-b">
                {item.image && (
                  <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded" />
                )}
              </td> */}
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan="12" className="py-4 text-center text-gray-500">No inventory data available.</td>
          </tr>
        )}
      </tbody>
    </table>
  );

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Distributor Inventory</h1>
        <button
          onClick={() => setModalOpen(true)}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Add Inventory Item
        </button>
      </div>
      <div className="overflow-x-auto">
        <InventoryTable />
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full" id="my-modal">
          <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
            <div className="mt-3 text-center">
              <h3 className="text-lg leading-6 font-medium text-gray-900">Add New Inventory Item</h3>
              <form onSubmit={handleSubmit} className="mt-2 text-left">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
                    <input type="text" id="name" name="name" value={formData.name} onChange={handleInputChange} required className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                  </div>
                  <div>
                    <label htmlFor="category" className="block text-sm font-medium text-gray-700">Category</label>
                    <input type="text" id="category" name="category" value={formData.category} onChange={handleInputChange} required className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                  </div>
                  {/* Other form fields */}
                  <div className="col-span-2">
                    <label htmlFor="image" className="block text-sm font-medium text-gray-700">Image</label>
                    <input type="file" id="image" ref={fileInputRef} onChange={handleFileChange} accept="image/*" className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100" />
                    {previewImage && (
                      <div className="mt-2">
                        <img src={previewImage} alt="Preview" className="w-32 h-32 object-cover rounded-md" />
                        <button type="button" onClick={handleClearImage} className="mt-2 text-red-500 text-sm">Remove Image</button>
                      </div>
                    )}
                  </div>
                </div>
                {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
                <div className="mt-4">
                  <button type="submit" className="inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-500 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:text-sm">
                    Add Item
                  </button>
                  <button type="button" onClick={() => setModalOpen(false)} className="ml-2 inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-gray-500 text-base font-medium text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:text-sm">
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DInventory;