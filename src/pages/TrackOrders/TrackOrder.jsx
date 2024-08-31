import React, { useState, useContext } from 'react';
import StepperModal from '../../components/StepperModal'; // Stepper modal component
import { TrackOrderContext } from '../../context/TrackOrderContext';

const TrackOrder = () => {
  const { retailOrderData, addReturn, returnedItems } = useContext(TrackOrderContext);
  const [searchQuery, setSearchQuery] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [feedbackModalOpen, setFeedbackModalOpen] = useState(false);
  const [returnModalOpen, setReturnModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [feedback, setFeedback] = useState('');
  const [returnQuantity, setReturnQuantity] = useState(0);
  const [returnReason, setReturnReason] = useState('');
  const [showReturnedTab, setShowReturnedTab] = useState(false);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleReturn = (item) => {
    setSelectedItem(item);
    setReturnModalOpen(true);
  };

  const handleReturnQuantityChange = (e) => {
    setReturnQuantity(parseInt(e.target.value, 10));
  };

  const handleReturnReasonChange = (e) => {
    setReturnReason(e.target.value);
  };

  const handleReturnSubmit = () => {
    if (returnQuantity > 0 && returnReason) {
      addReturn(returnQuantity, returnReason);
      setReturnModalOpen(false);
      setReturnQuantity(0);
      setReturnReason('');
    }
  };

  const handleFeedbackChange = (e) => {
    setFeedback(e.target.value);
  };

  const handleFeedbackSubmit = () => {
    console.log('Feedback submitted:', feedback);
    setFeedbackModalOpen(false);
    setFeedback('');
  };

  // Simulate filtered data based on searchQuery
  const filteredData = [retailOrderData].filter(item =>
    item.medicineName.toLowerCase().includes(searchQuery.toLowerCase())
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
      <div className="flex mb-4">
        <button
          className={`px-4 py-2 rounded ${!showReturnedTab ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          onClick={() => setShowReturnedTab(false)}
        >
          Orders
        </button>
        <button
          className={`ml-2 px-4 py-2 rounded ${showReturnedTab ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          onClick={() => setShowReturnedTab(true)}
        >
          Returned Items
        </button>
      </div>
      {showReturnedTab ? (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-300">
            <thead>
              <tr>
                <th className="px-4 py-3 border-b text-left text-xs font-medium text-gray-500 uppercase tracking-wider">S.No</th>
                <th className="px-4 py-3 border-b text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Medicine Name</th>
                <th className="px-4 py-3 border-b text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quantity Returned</th>
                <th className="px-4 py-3 border-b text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Return Reason</th>
                <th className="px-4 py-3 border-b text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Return Date</th>
                <th className="px-4 py-3 border-b text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order Form ID</th>
                <th className="px-4 py-3 border-b text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Refund Status</th>
              </tr>
            </thead>
            <tbody>
              {returnedItems.map((item, index) => (
                <tr key={index}>
                  <td className="px-4 py-3 border-b">{index + 1}</td>
                  <td className="px-4 py-3 border-b">{retailOrderData.medicineName}</td>
                  <td className="px-4 py-3 border-b">{item.quantity}</td>
                  <td className="px-4 py-3 border-b">{item.returnReason}</td>
                  <td className="px-4 py-3 border-b">{item.returnDate.toDateString()}</td>
                  <td className="px-4 py-3 border-b">{retailOrderData.orderFormId}</td>
                  <td className="px-4 py-3 border-b">{retailOrderData.refundStatus}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
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
                <th className="px-4 py-3 border-b text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Qty.</th>
                <th className="px-4 py-3 border-b text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order Status</th>
                <th className="px-4 py-3 border-b text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Distributor Name</th>
                <th className="px-4 py-3 border-b text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Feedback</th>
                <th className="px-4 py-3 border-b text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Track Order</th>
                <th className="px-4 py-3 border-b text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                <th className="px-4 py-3 border-b text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Payment</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((item, index) => (
                <tr key={item.orderFormId}>
                  <td className="px-4 py-3 border-b">{index + 1}</td>
                  <td className="px-4 py-3 border-b">{item.medicineName}</td>
                  <td className="px-4 py-3 border-b">{item.category}</td>
                  <td className="px-4 py-3 border-b">{item.batchNo}</td>
                  <td className="px-4 py-3 border-b">{item.expiryDate.toDateString()}</td>
                  <td className="px-4 py-3 border-b">{item.mrp}</td>
                  <td className="px-4 py-3 border-b">{item.buyingPrice}</td>
                  <td className="px-4 py-3 border-b">{item.totalQuantity}</td>
                  <td className="px-4 py-3 border-b">{item.orderStatus}</td>
                  <td className="px-4 py-3 border-b">{item.distributor}</td>
                  <td className="px-4 py-3 border-b">
                    <button
                      className="bg-yellow-500 text-white px-3 py-1 rounded"
                      onClick={() => {
                        setSelectedItem(item);
                        setFeedbackModalOpen(true);
                      }}
                    >
                      Feedback
                    </button>
                  </td>
                  <td className="px-4 py-3 border-b">
                    <button
                      className="bg-blue-500 text-white px-3 py-1 rounded"
                      onClick={() => setModalOpen(true)}
                    >
                      Track Status
                    </button>
                  </td>
                  <td className="px-4 py-3 border-b">
                    <button
                      className="bg-green-500 text-white px-3 py-1 rounded mr-2"
                      onClick={() => handleReturn(item)}
                    >
                      Return
                    </button>
                  </td>
                  <td className="px-4 py-3 border-b">
                      {item.paymentStatus === 'Completed' ? (
                        item.paymentStatus
                      ) : (
                        <>
                          <button 
                            onClick={() => handlePayment(item.id)}
                            className="ml-2 px-4 py-2 bg-blue-500 text-white rounded"
                          >
                      Payment
                    </button>
                    </>
                  )}
                </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {modalOpen && <StepperModal setModalOpen={setModalOpen} />}
      {feedbackModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-white p-4 rounded shadow-lg">
            <h2 className="text-lg font-bold mb-4">Feedback for {selectedItem?.medicineName}</h2>
            <textarea
              value={feedback}
              onChange={handleFeedbackChange}
              className="border rounded p-2 mb-4 w-full"
              rows="4"
            />
            <button
              onClick={handleFeedbackSubmit}
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              Submit Feedback
            </button>
            <button
              onClick={() => setFeedbackModalOpen(false)}
              className="bg-gray-500 text-white px-4 py-2 rounded ml-2"
            >
              Close
            </button>
          </div>
        </div>
      )}
      {returnModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-white p-4 rounded shadow-lg">
            <h2 className="text-lg font-bold mb-4">Return Quantity for {selectedItem?.medicineName}</h2>
            <label className="block mb-2">Return Quantity</label>
            <input
              type="number"
              value={returnQuantity}
              onChange={handleReturnQuantityChange}
              className="border rounded p-2 mb-4 w-full"
              min="1"
            />
            <label className="block mb-2">Return Reason</label>
            <input
              type="text"
              value={returnReason}
              onChange={handleReturnReasonChange}
              className="border rounded p-2 mb-4 w-full"
            />
            <button
              onClick={handleReturnSubmit}
              className="bg-green-500 text-white px-4 py-2 rounded"
            >
              Submit Return
            </button>
            <button
              onClick={() => setReturnModalOpen(false)}
              className="bg-gray-500 text-white px-4 py-2 rounded ml-2"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TrackOrder;