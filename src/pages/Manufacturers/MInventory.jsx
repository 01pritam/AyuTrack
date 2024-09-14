import React, { useState, useContext, useRef, useCallback, useMemo,useEffect } from 'react';
import { InventoryContext } from '../../context/InventoryContext';
import { UserRoleContext } from '../../context/UserRoleContext';
import { AuthContext } from '../../context/AuthContext';
import InventoryAddModal from './InventoryAddModal'; 
import QualityCheckImages from './QualityCheckImages';
import ConfirmModal from '../../components/confirmModal'; // Import the ConfirmModal component

const Inventory = () => {
  const { InventoryData, lowStock,setLowStock,highStock,setHighStock,outOfStock,setOutOfStock, loading, fetchInventoryData } = useContext(InventoryContext);
  const { role } = useContext(UserRoleContext);
  const { token } = useContext(AuthContext);
  const [isModalOpen, setModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('All');
  const [filterDialogOpen, setFilterDialogOpen] = useState(false);
  const [isConfirmModalOpen, setConfirmModalOpen] = useState(false); // Updated state variable
  const [modalMessage, setModalMessage] = useState(''); // Message for the modal

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

  // const handleSubmit = useCallback(async () => {
  //   const formDataToSend = new FormData();
    
  //   Object.entries(formData).forEach(([key, value]) => {
  //     if (key === 'qualityCheck') {
  //       formDataToSend.append(key, value ? 'true' : 'false');
  //     } else if (key === 'quantity') {
  //       formDataToSend.append('qty', value);
  //     } else if (key !== 'composition' && key !== 'file') {
  //       formDataToSend.append(key, value);
  //     }
  //   });

  //   formData.composition.forEach((comp, index) => {
  //     formDataToSend.append(`composition[${index}][ingredient]`, comp.ingredient);
  //     formDataToSend.append(`composition[${index}][quantity]`, comp.quantity);
  //   });

  //   if (formData.file) {
  //     formDataToSend.append('qualityImages', formData.file);
  //   }

  //   https://med-gem.onrender.com/analyze-certificate
  //   try {
  //     const response = await fetch('https://med-tech-server.onrender.com/api/manufacturers/inv/add-inventory', {
  //       method: 'POST',
  //       headers: {
  //         'Authorization': `Bearer ${token}`,
  //       },
  //       body: formDataToSend,anal
  //     });

  //     if (!response.ok) {
  //       throw new Error(`HTTP error! Status: ${response.status}`);
  //     }

  //     const data = await response.json();
  //     console.log('Success:', data);

  //     setModalOpen(false);
  //     fetchInventoryData();
  //   } catch (error) {
  //     console.error('Error:', error);
  //   }
  // }, [formData, token, fetchInventoryData]);

  const handleSubmit = useCallback(async () => {
    const formDataToSend = new FormData();
  
    // Step 1: Send the quality image to the certificate analysis API
    if (formData.file) {
      const certificateFormData = new FormData();
      certificateFormData.append('qualityImages', formData.file);
      
      try {
        const certResponse = await fetch('https://med-gem.onrender.com/analyze-certificate', {
          method: 'POST',
          body: certificateFormData,
        });
  
        if (!certResponse.ok) {
          throw new Error(`HTTP error! Certificate analysis status: ${certResponse.status}`);
        }
  
        const certData = await certResponse.json();
        console.log('Certificate Analysis Result:', certData);
  
        // Step 2: Set qualityCheck based on certificate analysis result
        formData.qualityCheck = certData.certificateDetected === 'Yes';
  
      } catch (certError) {
        console.error('Certificate analysis error:', certError);
        // Handle the error accordingly (you can set qualityCheck to false or alert the user)
        formData.qualityCheck = false;
      }
    }
  
    // Step 3: Prepare the form data to send to the inventory API
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
      formDataToSend.append('qualityImages', formData.file);
    }
  
    // Step 4: Submit the inventory data to the inventory API
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

      setModalMessage('Inventory successfully added!'); // Set modal message
      setConfirmModalOpen(true); // Open the confirmation modal
      // fetchInventoryData();
    } catch (error) {
      console.error('Error:', error);
      setModalMessage('Error submitting inventory. Please try again.');
      setConfirmModalOpen(true); // Open the modal in case of error
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
    outOfStockCount: filteredData.filter(item => item.qty === 0 || !item.qty).length
}), [filteredData]);

// Use useEffect to update the states when counts change
useEffect(() => {
  console.log('Updating stock states:', {
    lowStockCount,
    inStockCount,
    outOfStockCount
  });
  setLowStock(lowStockCount);
  setHighStock(inStockCount);
  setOutOfStock(outOfStockCount);
}, [lowStockCount, inStockCount, outOfStockCount]); // Ensure this array is correctwStockCount, inStockCount,outOfStock]); // Dependencies: update when these counts change

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
        <div className="table-container" style={{ maxHeight: '400px', overflowY: 'auto' }}>
        <table className="min-w-full">
        <thead className="bg-gray-100 sticky top-0">
      <tr className="text-left text-gray-500">
        <th className="py-2 px-4 sticky top-0 bg-gray-100">S.No</th>
        <th className="py-2 px-4 sticky top-0 bg-gray-100">Name</th>
        <th className="py-2 px-4 sticky top-0 bg-gray-100">Category</th>
        <th className="py-2 px-4 sticky top-0 bg-gray-100">Batch No</th>
        <th className="py-2 px-4 sticky top-0 bg-gray-100">Machine No</th>
        <th className="py-2 px-4 sticky top-0 bg-gray-100">MRP (₹)</th>
        <th className="py-2 px-4 sticky top-0 bg-gray-100">Quantity</th>
        <th className="py-2 px-4 sticky top-0 bg-gray-100">Rack</th>
        <th className="py-2 px-4 sticky top-0 bg-gray-100">Selling Price</th>
        <th className="py-2 px-4 sticky top-0 bg-gray-100">Tax</th>
        <th className="py-2 px-4 sticky top-0 bg-gray-100">Expiry Date</th>
        <th className="py-2 px-4 sticky top-0 bg-gray-100">Production Date</th>
        <th className="py-2 px-4 sticky top-0 bg-gray-100">Stock Status</th>
        <th className="py-2 px-4 sticky top-0 bg-gray-100">Demand</th>
        <th className="py-2 px-4 sticky top-0 bg-gray-100">Quality</th>
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
                <td className="py-2">{item.taxRate || 'N/A'}</td>

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
                <td className="py-2 flex items-center justify-center"></td>
                <QualityCheckImages item={item} />
              </tr>
            ))}
          </tbody>
        </table>
        </div>
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
 {isConfirmModalOpen && (
        <ConfirmModal
          isOpen={isConfirmModalOpen}
          onClose={() => setConfirmModalOpen(false)}
          message={modalMessage}
        />
      )}
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

