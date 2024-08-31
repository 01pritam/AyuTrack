import React, { useState, useContext } from 'react';
import StepperModal from '../../components/StepperModal'; // Stepper modal component
import { InventoryContext } from '../../context/InventoryContext';

const TrackOrder = () => {
  const { InventoryData } = useContext(InventoryContext);
  const [searchQuery, setSearchQuery] = useState('');
  const [modalOpen, setModalOpen] = useState(false);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredData = InventoryData.filter((item) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="container mx-auto p-4">
      <input
        type="text"
        placeholder="Search by Name"
        value={searchQuery}
        onChange={handleSearch}
        className="border rounded p-2 mb-4 w-full"
      />
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
              <th className="px-4 py-3 border-b text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Buying Price (₹)</th>
              <th className="px-4 py-3 border-b text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order Status</th>
              <th className="px-4 py-3 border-b text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Distributor Name</th>
              <th className="px-4 py-3 border-b text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Feedback</th>
              <th className="px-4 py-3 border-b text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Track Order</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((item, index) => (
              <tr key={item.barcodeId}>
                <td className="px-4 py-3 border-b">{index + 1}</td>
                <td className="px-4 py-3 border-b">{item.name}</td>
                <td className="px-4 py-3 border-b">{item.category}</td>
                <td className="px-4 py-3 border-b">{item.batchNo}</td>
                <td className="px-4 py-3 border-b">{item.expiryDate}</td>
                <td className="px-4 py-3 border-b">{item.mrp}</td>
                <td className="px-4 py-3 border-b">{item.buyingPrice}</td>
                <td className="px-4 py-3 border-b">{item.orderStatus}</td>
                <td className="px-4 py-3 border-b">{item.distributorName}</td>
                <td className="px-4 py-3 border-b">{item.feedback}</td>
                <td className="px-4 py-3 border-b">
                  <button
                    className="bg-blue-500 text-white px-3 py-1 rounded"
                    onClick={() => setModalOpen(true)}
                  >
                    Track Status
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {modalOpen && <StepperModal setModalOpen={setModalOpen} />}
    </div>
  );
};

export default TrackOrder;