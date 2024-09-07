import React, { useState, useContext, useEffect } from 'react';
import { InventoryContext } from '../../context/InventoryContext';
import { AuthContext } from '../../context/AuthContext';
import axios from 'axios';

const Inventory = () => {
  const { InventoryData, loading, fetchInventoryData } = useContext(InventoryContext);
  const { token } = useContext(AuthContext);
  const [searchTerm, setSearchTerm] = useState('');
  const [stockStatusFilter, setStockStatusFilter] = useState('All');
  const [filteredData, setFilteredData] = useState([]);
  const [editableItem, setEditableItem] = useState(null);
  const [showFilterModal, setShowFilterModal] = useState(false);
  
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
          (item.vendor && item.vendor.toLowerCase().includes(searchTerm.toLowerCase()))
        );
      }

      if (stockStatusFilter !== 'All') {
        result = result.filter(item => {
          const qty = Number(item.qty) || 0;
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
    const qty = Number(stock) || 0;
    if (qty === 0) return 'bg-red-400 text-red-900';
    if (qty <= 100) return 'bg-orange-200 text-orange-700';
    return 'bg-teal-200 text-teal-700';
  };

  const getStatusText = (stock) => {
    const qty = Number(stock) || 0;
    if (qty === 0) return 'OUT OF STOCK';
    if (qty <= 100) return 'LOW STOCK';
    return 'IN STOCK';
  };

  const handleFilterSubmit = (status) => {
    setStockStatusFilter(status);
    setShowFilterModal(false);
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

  const inStockCount = filteredData.filter(item => Number(item.qty) > 100).length;
  const lowStockCount = filteredData.filter(item => Number(item.qty) > 0 && Number(item.qty) <= 100).length;
  const outOfStockCount = filteredData.filter(item => Number(item.qty) === 0).length;

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
              <span className={`px-3 py-1 rounded ${getStatusColor(101)}`}>In stock: {inStockCount}</span>
              <span className={`px-3 py-1 rounded ${getStatusColor(50)}`}>Low stock: {lowStockCount}</span>
              <span className={`px-3 py-1 rounded ${getStatusColor(0)}`}>Out of stock: {outOfStockCount}</span>
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
              onClick={() => setShowFilterModal(true)}
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
            <tr key={item._id} className="bg-white border-b">
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
      {showFilterModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
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
      )}
    </div>
  );
};

export default Inventory;