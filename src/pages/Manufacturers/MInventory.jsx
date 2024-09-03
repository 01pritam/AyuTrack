import React, { useState, useContext, useRef } from 'react';
import MInventoryRow from '../../components/Manufacturers/MInventoryRow';
import { InventoryContext } from '../../context/InventoryContext';
import { UserRoleContext } from '../../context/UserRoleContext';
import { AuthContext } from '../../context/AuthContext';

const Inventory = () => {
  const { InventoryData, loading, fetchInventoryData } = useContext(InventoryContext);
  const { role } = useContext(UserRoleContext);
  const [isModalOpen, setModalOpen] = useState(false);
  const { token } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    batchNo: '',
    expiryDate: '',
    mrp: '',
    stockStatus: '',
    demand: '',
    productionDate: '',
    qualityCheck: false, // Boolean for quality check
    machineNo: '',
    barcode: '',
    rack: '',
    temperature: '',
    quantity: '', // Add quantity here
    qualityImages: [], // Array to handle multiple files
  });
  const fileInputRef = useRef(null);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen relative">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
        <div className="absolute flex items-center justify-center h-full w-full">
          <p className="text-xl font-bold text-gray-600">Inventory Loading...</p>
        </div>
      </div>
    );
  }
  if (role !== 'Manufacturer') return <div>Access Denied...</div>;

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === 'checkbox') {
      setFormData({ ...formData, [name]: checked });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setFormData({ ...formData, qualityImages: files });
  };

  const handleClearFiles = () => {
    fileInputRef.current.value = ''; // Clear the file input
    setFormData({ ...formData, qualityImages: [] }); // Clear the state
  };

  const handleSubmit = async () => {
    const formDataToSend = new FormData();
    Object.keys(formData).forEach(key => {
      if (key === 'qualityCheck') {
        formDataToSend.append(key, formData[key] ? 'true' : 'false'); // Convert Boolean to string
      } else if (key === 'qualityImages') {
        formData[key].forEach((file, index) => {
          formDataToSend.append(`qualityImages[${index}]`, file);
        });
      } else if (key === 'quantity') {
        formDataToSend.append('qty', formData[key]); // Use 'qty' for quantity
      } else {
        formDataToSend.append(key, formData[key]);
      }
    });
  
    try {
      const response = await fetch('https://med-tech-server.onrender.com/api/manufacturers/inv/add-inventory', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`, // Include the token in the Authorization header
          // Do not set Content-Type for FormData
        },
        body: formDataToSend,
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      const data = await response.json(); // or response.text() if the response is not JSON
      console.log('Success:', data);
  
      setModalOpen(false);
      fetchInventoryData(); // Refresh inventory data
  
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-end mb-4">
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded"
          onClick={() => setModalOpen(true)}
        >
          Add Inventory Data
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr>
              <th className="px-4 py-3 border-b text-left text-xs font-medium text-gray-500 uppercase tracking-wider">S.No</th>
              <th className="px-4 py-3 border-b text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
              <th className="px-4 py-3 border-b text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
              <th className="px-4 py-3 border-b text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Batch No</th>
              <th className="px-4 py-3 border-b text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Expiry Date</th>
              <th className="px-4 py-3 border-b text-left text-xs font-medium text-gray-500 uppercase tracking-wider">MRP (₹)</th>
              <th className="px-4 py-3 border-b text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stock Status</th>
              <th className="px-4 py-3 border-b text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Demand</th>
              <th className="px-4 py-3 border-b text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Production Date</th>
              <th className="px-4 py-3 border-b text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quality Check</th>
              <th className="px-4 py-3 border-b text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Machine No</th>
              <th className="px-4 py-3 border-b text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Barcode ID</th>
              <th className="px-4 py-3 border-b text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rack</th>
              <th className="px-4 py-3 border-b text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Temperature</th>
              <th className="px-4 py-3 border-b text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quantity</th> {/* New Column */}
              <th className="px-4 py-3 border-b text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Upload Quality Images</th>
            </tr>
          </thead>
          <tbody>
            {InventoryData.map((item, index) => (
              <MInventoryRow
                key={item.barcode} // Ensure this is unique
                serialNumber={index + 1}
                data={item}
              />
            ))}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75">
          <div className="bg-white p-6 rounded-lg shadow-lg w-1/2">
            <h2 className="text-2xl mb-4">Add Inventory Data</h2>
            <form>
              <div className="grid grid-cols-2 gap-4">
                <input
                  type="text"
                  name="name"
                  placeholder="Name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="border p-2"
                />
                <input
                  type="text"
                  name="category"
                  placeholder="Category"
                  value={formData.category}
                  onChange={handleInputChange}
                  className="border p-2"
                />
                <input
                  type="text"
                  name="batchNo"
                  placeholder="Batch No"
                  value={formData.batchNo}
                  onChange={handleInputChange}
                  className="border p-2"
                />
                <div className="border p-2">
                  <label htmlFor="expiryDate">Expiry Date:</label>
                  <input
                    id="expiryDate"
                    type="date"
                    name="expiryDate"
                    value={formData.expiryDate}
                    onChange={handleInputChange}
                    className="ml-2"
                  />
                  <div className="mt-1">
                    {formData.expiryDate ? new Date(formData.expiryDate).toLocaleDateString() : 'Select a date'}
                  </div>
                </div>
                <input
                  type="number"
                  name="mrp"
                  placeholder="MRP (₹)"
                  value={formData.mrp}
                  onChange={handleInputChange}
                  className="border p-2"
                />
                <input
                  type="text"
                  name="stockStatus"
                  placeholder="Stock Status"
                  value={formData.stockStatus}
                  onChange={handleInputChange}
                  className="border p-2"
                />
                <input
                  type="text"
                  name="demand"
                  placeholder="Demand"
                  value={formData.demand}
                  onChange={handleInputChange}
                  className="border p-2"
                />
                <input
                  type="date"
                  name="productionDate"
                  placeholder="Production Date"
                  value={formData.productionDate}
                  onChange={handleInputChange}
                  className="border p-2"
                />
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    name="qualityCheck"
                    checked={formData.qualityCheck}
                    onChange={handleInputChange}
                    className="mr-2"
                  />
                  <label htmlFor="qualityCheck">Quality Check</label>
                </div>
                <input
                  type="text"
                  name="machineNo"
                  placeholder="Machine No"
                  value={formData.machineNo}
                  onChange={handleInputChange}
                  className="border p-2"
                />
                <input
                  type="text"
                  name="barcode"
                  placeholder="Barcode ID"
                  value={formData.barcode}
                  onChange={handleInputChange}
                  className="border p-2"
                />
                <input
                  type="text"
                  name="rack"
                  placeholder="Rack"
                  value={formData.rack}
                  onChange={handleInputChange}
                  className="border p-2"
                />
                <input
                  type="text"
                  name="temperature"
                  placeholder="Temperature"
                  value={formData.temperature}
                  onChange={handleInputChange}
                  className="border p-2"
                />
                <input
                  type="number"
                  name="quantity"
                  placeholder="Quantity"
                  value={formData.qty}
                  onChange={handleInputChange}
                  className="border p-2"
                />
                <input
                  type="file"
                  ref={fileInputRef}
                  multiple
                  onChange={handleFileChange}
                  className="border p-2"
                />
                {formData.qualityImages.length > 0 && (
                  
                  <button
                    type="button"
                    onClick={handleClearFiles}
                    className="bg-red-500 text-white px-2 py-1 rounded"
                  >
                    Clear Files
                  </button>
                )}
              </div>
              <div className="mt-4 flex justify-end">
                <button
                  type="button"
                  onClick={handleSubmit}
                  className="bg-blue-500 text-white px-4 py-2 rounded"
                >
                  Submit
                </button>
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="bg-gray-500 text-white px-4 py-2 rounded ml-2"
                >
                  Close
                </button>
              </div>
            </form>
          </div>
        </div>
      )}



    </div>
  );
};

export default Inventory;