import React, { useState, useEffect, useContext } from 'react';
import StepperModal from '../../components/StepperModal';
import { TrackOrderContext } from '../../context/TrackOrderContext';
import OrderForm from './OrderForm';
import { AuthContext } from '../../context/AuthContext';
import FeedbackButton from './FeedbackButton'; // Import the FeedbackButton component

const TrackOrder = () => {
  const { addReturn, returnedItems } = useContext(TrackOrderContext);
  const [retailOrderData, setRetailOrderData] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [feedbackModalOpen, setFeedbackModalOpen] = useState(false);
  const [returnModalOpen, setReturnModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [returnQuantity, setReturnQuantity] = useState(0);
  const [returnReason, setReturnReason] = useState('');
  const [showReturnedTab, setShowReturnedTab] = useState(false);
  const [isOrderFormOpen, setIsOrderFormOpen] = useState(false);
  const { token } = useContext(AuthContext);

  useEffect(() => {
    fetch('https://med-tech-server.onrender.com/api/manufacturers/orders/distributor/orderdetails', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    })
      .then(response => response.json())
      .then(data => setRetailOrderData(data))
      .catch(error => console.error('Error fetching order data:', error));
  }, [token]);

  const handleSearch = (e) => setSearchQuery(e.target.value);

  const handleReturn = (item) => {
    setSelectedItem(item);
    setReturnModalOpen(true);
  };

  const handleReturnQuantityChange = (e) => setReturnQuantity(parseInt(e.target.value, 10));

  const handleReturnReasonChange = (e) => setReturnReason(e.target.value);

  const handleReturnSubmit = () => {
    if (returnQuantity > 0 && returnReason) {
      addReturn(returnQuantity, returnReason);
      setReturnModalOpen(false);
      setReturnQuantity(0);
      setReturnReason('');
    }
  };

  const handleOrderFormOpen = () => setIsOrderFormOpen(true);

  const handleOrderFormClose = () => setIsOrderFormOpen(false);

  const handleDownloadInvoice = (orderId) => {
    const order = retailOrderData.find(item => item._id === orderId);

    if (order && order.billingDetails && order.billingDetails.billingPdf) {
      const billingPdfUrl = order.billingDetails.billingPdf;
      const link = document.createElement('a');
      link.href = billingPdfUrl;
      link.setAttribute('download', `invoice_${order.billingDetails.invoiceNumber}.pdf`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else {
      console.error('Billing details not found or PDF URL is missing');
    }
  };

  const filteredData = retailOrderData.filter(item =>
    item.medicines[0].name.toLowerCase().includes(searchQuery.toLowerCase())
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
                {/* Table headers for returned items */}
              </tr>
            </thead>
            <tbody>
              {/* Table rows for returned items */}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-300">
            <thead>
              <tr>
                <th className="px-4 py-2">Medicine Name</th>
                <th className="px-4 py-2">Batch No</th>
                <th className="px-4 py-2">MRP</th>
                <th className="px-4 py-2">Production Date</th>
                <th className="px-4 py-2">Expiry Date</th>
                <th className="px-4 py-2">Order Status</th>
                <th className="px-4 py-2">Payment Status</th>
                <th className="px-4 py-2">Invoice</th>
                <th className="px-4 py-2">Feedback</th> {/* Added Feedback column */}
                <th className="px-4 py-2">Return</th> {/* Added Return column */}
              </tr>
            </thead>
            <tbody>
              {filteredData.map((item) => (
                <tr key={item._id}>
                  <td className="border px-4 py-2">{item.medicines[0].name}</td>
                  <td className="border px-4 py-2">{item.medicines[0].batchNo}</td>
                  <td className="border px-4 py-2">{item.medicines[0].mrp}</td>
                  <td className="border px-4 py-2">{new Date(item.medicines[0].productionDate).toLocaleDateString()}</td>
                  <td className="border px-4 py-2">{new Date(item.medicines[0].expiryDate).toLocaleDateString()}</td>
                  <td className="border px-4 py-2">{item.orderStatus}</td>
                  <td className="border px-4 py-2">{item.paymentStatus}</td>
                  <td className="border px-4 py-2">
                    <button
                      onClick={() => handleDownloadInvoice(item._id)}
                      className="bg-blue-500 text-white px-4 py-2 rounded"
                    >
                      Download Invoice
                    </button>
                  </td>
                  <td className="border px-4 py-2">
                    {item.orderStatus === 'Delivered' && (
                      <FeedbackButton item={item} />
                    )}
                  </td>
                  <td className="border px-4 py-2">
                    {item.orderStatus === 'Delivered' && (
                      <button
                        onClick={() => handleReturn(item)}
                        className="bg-red-500 text-white px-4 py-2 rounded"
                      >
                        Return
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <button
            onClick={handleOrderFormOpen}
            className="bg-green-500 text-white px-4 py-2 rounded mt-4"
          >
            Order to Manufacturer
          </button>
        </div>
      )}
      {modalOpen && <StepperModal setModalOpen={setModalOpen} />}
      {isOrderFormOpen && <OrderForm onClose={handleOrderFormClose} />}
      {returnModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-white p-4 rounded shadow-lg">
            <h2 className="text-lg font-bold mb-4">Return {selectedItem?.medicines[0].name}</h2>
            <div className="mb-4">
              <label htmlFor="returnQuantity" className="block mb-2">Return Quantity</label>
              <input
                type="number"
                id="returnQuantity"
                value={returnQuantity}
                onChange={handleReturnQuantityChange}
                className="border rounded p-2 w-full"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="returnReason" className="block mb-2">Return Reason</label>
              <textarea
                id="returnReason"
                value={returnReason}
                onChange={handleReturnReasonChange}
                className="border rounded p-2 w-full"
                rows="4"
              />
            </div>
            <button
              onClick={handleReturnSubmit}
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              Submit Return
            </button>
            <button
              onClick={() => setReturnModalOpen(false)}
              className="bg-gray-500 text-white px-4 py-2 rounded ml-2"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TrackOrder;