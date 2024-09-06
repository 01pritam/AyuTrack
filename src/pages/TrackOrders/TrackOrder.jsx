import React, { useState, useEffect, useContext } from 'react';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';
import { AuthContext } from '../../context/AuthContext';
import OrderForm from './OrderForm';
const ImprovedOrderTracking = () => {
  const [retailOrderData, setRetailOrderData] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedOrders, setExpandedOrders] = useState({});
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);
  const [showReturnModal, setShowReturnModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [feedback, setFeedback] = useState('');
  const [returnQuantity, setReturnQuantity] = useState('');
  const [returnReason, setReturnReason] = useState('');
  const [loading, setLoading] = useState(false); // Add loading state
  const [showOrderForm, setShowOrderForm] = useState(false);
  const { token } = useContext(AuthContext);
  const [returnStatus, setReturnStatus] = useState({});
  const [returnError, setReturnError] = useState(null);
  const [returnedItems, setReturnedItems] = useState([]);
  const [showReturnedItems, setShowReturnedItems] = useState(false);




  
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

  const toggleOrderExpansion = (orderId) => {
    setExpandedOrders(prev => ({
      ...prev,
      [orderId]: !prev[orderId]
    }));
  };

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
  const handlePay = async (orderId) => {
    console.log("orderid from handle pay",orderId);
    try {
      const response = await fetch(`https://med-tech-server.onrender.com/api/manufacturers/orders/${orderId}/payment-status`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ paymentStatus: 'Completed' })
      });
  
      // Check if the response is JSON
      const contentType = response.headers.get('Content-Type');
      if (contentType && contentType.includes('application/json')) {
        const responseData = await response.json();
        
        if (!response.ok) {
          throw new Error(responseData.message || 'Failed to process the payment');
        }
  
        // Update the state to reflect the payment status change
        setOrders(prevOrders =>
          prevOrders.map(order =>
            order._id === orderId ? { ...order, paymentStatus: 'Completed' } : order
          )
        );
        alert('Payment processed successfully');
      } else {
        throw new Error('Unexpected response format');
      }
    } catch (error) {
      console.error('Error processing payment:', error);
      alert('Failed to process the payment: ' + error.message);
    }
  };

  const handleFeedbackSubmit = async () => {
    if (!feedback.trim()) {
      alert('Please provide feedback');
      return;
    }
    
    setLoading(true); // Set loading state to true
    try {
      const feedbackResponse = await fetch('https://feedback-18k6.onrender.com/analyze-feedback', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text: feedback }),
      });

      if (!feedbackResponse.ok) {
        throw new Error('Error analyzing feedback');
      }

      const feedbackData = await feedbackResponse.json();
      const ratingMap = {
        1: 'Very Poor',
        2: 'Poor',
        3: 'Neutral',
        4: 'Good',
        5: 'Excellent',
      };

      const ratingString = ratingMap[feedbackData.rating] || 'Neutral';
      console.log("ratingString: ", ratingString);

      const response = await fetch(`https://med-tech-server.onrender.com/api/manufacturers/orders/${selectedOrder._id}/feedback`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          comment: feedback,
          rating: ratingString,
        }),
      });

      if (!response.ok) {
        throw new Error('Error submitting feedback');
      }

      alert('Feedback submitted successfully');
      setFeedback(''); // Clear feedback input field
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to submit feedback');
    } finally {
      setLoading(false); // Set loading state to false
      setShowFeedbackModal(false); // Close modal
    }
  };

  const handleReturnSubmit = async () => {
    if (selectedOrder && returnQuantity && returnReason) {
      setLoading(true);
      setReturnError(null);
      try {
        const response = await fetch(`https://med-tech-server.onrender.com/api/manufacturers/orders/return`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            orderId: selectedOrder._id,
            quantity: returnQuantity,
            reason: returnReason
          })
        });

        if (!response.ok) {
          throw new Error('Failed to submit return request');
        }

        const result = await response.json();
        setReturnStatus(prevStatus => ({
          ...prevStatus,
          [selectedOrder._id]: 'Pending'
        }));
        alert('Return request submitted successfully');
      } catch (error) {
        console.error('Error submitting return:', error);
        setReturnError('Failed to submit return request. Please try again.');
      } finally {
        setLoading(false);
        setShowReturnModal(false);
        setReturnQuantity('');
        setReturnReason('');
      }
    }
  };

  const filteredData = Array.isArray(retailOrderData) 
    ? retailOrderData.filter(item =>
        item.medicines.some(medicine => 
          medicine.name.toLowerCase().includes(searchQuery.toLowerCase())
        )
      ) 
    : [];

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'delivered': return 'bg-green-100 text-green-800';
      case 'processing': return 'bg-blue-100 text-blue-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Order Tracking</h1>
      <input
        type="text"
        placeholder="Search by Medicine Name"
        value={searchQuery}
        onChange={handleSearch}
        className="border rounded p-2 mb-4 w-full"
      />
      <button
        onClick={() => setShowOrderForm(true)}
        className="bg-blue-500 text-white px-4 py-2 rounded mb-4"
        >
        Order Now
    </button>

    {/* Returned Items Table */}
    <div className="mb-6">
        <button
          onClick={() => setShowReturnedItems(!showReturnedItems)}
          className="bg-purple-500 text-white px-4 py-2 rounded mb-2"
        >
          {showReturnedItems ? 'Hide' : 'Show'} Returned Items
        </button>
        {showReturnedItems && (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-4 py-2 text-left">Order ID</th>
                  <th className="px-4 py-2 text-left">Medicine Name</th>
                  <th className="px-4 py-2 text-left">Quantity</th>
                  <th className="px-4 py-2 text-left">Reason</th>
                  <th className="px-4 py-2 text-left">Status</th>
                </tr>
              </thead>
              <tbody>
                {returnedItems.map((item, index) => (
                  <tr key={index} className="border-b">
                    <td className="px-4 py-2">{item.orderId}</td>
                    <td className="px-4 py-2">{item.medicineName}</td>
                    <td className="px-4 py-2">{item.quantity}</td>
                    <td className="px-4 py-2">{item.reason}</td>
                    <td className="px-4 py-2">
                      <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(item.status)}`}>
                        {item.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>


      <div className="overflow-x-auto">
        <table className="min-w-full bg-white">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 text-left">Order ID</th>
              <th className="px-4 py-2 text-left">Manufacturer Name</th>
              <th className="px-4 py-2 text-left">Order Status</th>
              <th className="px-4 py-2 text-left">Payment Status</th>
              <th className="px-4 py-2 text-left">Actions</th>
              <th className="px-4 py-2 text-left">Confirm Date</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((order) => (
              <React.Fragment key={order._id}>
                <tr className="border-b">
                  <td className="px-4 py-2">{order._id}</td>
                  <td className="px-4 py-2">{order.manufacturer.name}</td>
                  <td className="px-4 py-2">
                    <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(order.orderStatus)}`}>
                      {order.orderStatus}
                    </span>
                  </td>
                  <td className="px-4 py-2">
                    <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(order.paymentStatus)}`}>
                      {order.paymentStatus}
                    </span>
                  </td>
                  <td className="px-4 py-2">
                    <button
                      onClick={() => toggleOrderExpansion(order._id)}
                      className="text-blue-500 hover:text-blue-700 mr-2"
                    >
                      {expandedOrders[order._id] ? <FaChevronUp /> : <FaChevronDown />}
                    </button>
                    <button
                      onClick={() => handleDownloadInvoice(order._id)}
                      className="bg-blue-500 text-white px-3 py-1 rounded text-sm hover:bg-blue-600"
                    >
                      Download Invoice
                    </button>
                  </td>
                  <td className="px-4 py-2">{order.orderConfirmDate}</td>

                </tr>
                {expandedOrders[order._id] && (
                  <tr>
                    <td colSpan="4" className="px-4 py-2">
                      <table className="min-w-full bg-gray-50">
                        <thead>
                          <tr className="bg-gray-200">
                            <th className="px-4 py-2 text-left text-xs">Medicine Name</th>
                            <th className="px-4 py-2 text-left text-xs">Batch No</th>
                            <th className="px-4 py-2 text-left text-xs">MRP</th>
                            <th className="px-4 py-2 text-left text-xs">Production Date</th>
                            <th className="px-4 py-2 text-left text-xs">Expiry Date</th>
                            <th className="px-4 py-2 text-left text-xs">Quantity</th>
                            <th className="px-4 py-2 text-left text-xs">Order Status</th>
                            <th className="px-4 py-2 text-left text-xs">Payment Status</th>
                          </tr>
                        </thead>
                        <tbody>
                          {order.medicines.map((medicine, index) => (
                            <tr key={index}>
                              <td className="px-4 py-2 text-sm">{medicine.name}</td>
                              <td className="px-4 py-2 text-sm">{medicine.batchNo}</td>
                              <td className="px-4 py-2 text-sm">{medicine.mrp}</td>
                              <td className="px-4 py-2 text-sm">{medicine.productionDate}</td>
                              <td className="px-4 py-2 text-sm">{medicine.expiryDate}</td>
                              <td className="px-4 py-2 text-sm">{medicine.qty}</td>
                              <td className="px-4 py-2 text-sm">{order.orderStatus}</td>
                              <td className="px-4 py-2 text-sm">{order.paymentStatus}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                      <div className="mt-4 flex">
                        {order.orderStatus === 'Delivered' && (
                          <>
                            <button
                              onClick={() => {
                                setSelectedOrder(order);
                                setShowFeedbackModal(true);
                              }}
                              className="bg-green-500 text-white px-4 py-2 rounded mr-2 hover:bg-green-600"
                            >
                              Provide Feedback
                            </button>
                            <button
                              onClick={() => {
                                setSelectedOrder(order);
                                setShowReturnModal(true);
                              }}
                              className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
                            >
                              Request Return
                            </button>
                          </>
                        )}
                        {order.orderStatus === 'Processing' && order.paymentStatus==='Pending'&& (
                          <>
                            <button
                              onClick={() => {
                                handlePay(order._id)
                              }}
                              className="bg-green-500 text-white px-4 py-2 rounded mr-2 hover:bg-green-600"
                            >
                              Payment
                            </button>
                            
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>



            {/* SendFeedback */}
      {showFeedbackModal && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center">
          <div className="bg-white p-6 rounded shadow-lg w-1/3">
            <h2 className="text-xl font-bold mb-4">Submit Feedback</h2>
            <textarea
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              rows="4"
              className="w-full border rounded p-2 mb-4"
            />
            <div className="flex justify-end">
              <button
                onClick={() => setShowFeedbackModal(false)}
                className="bg-gray-500 text-white px-4 py-2 rounded mr-2"
              >
                Cancel
              </button>
              <button
                onClick={handleFeedbackSubmit}
                className="bg-blue-500 text-white px-4 py-2 rounded"
                disabled={loading} // Disable button while loading
              >
                {loading ? 'Submitting...' : 'Submit Feedback'}
              </button>
            </div>
          </div>
        </div>
      )}


      {/* Return Item */}
      {showReturnModal && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center">
          <div className="bg-white p-6 rounded shadow-lg w-1/3">
            <h2 className="text-xl font-bold mb-4">Request Return</h2>
            <label className="block mb-2">Quantity</label>
            <input
              type="number"
              value={returnQuantity}
              onChange={(e) => setReturnQuantity(e.target.value)}
              className="w-full border rounded p-2 mb-4"
            />
            <label className="block mb-2">Reason</label>
            <textarea
              value={returnReason}
              onChange={(e) => setReturnReason(e.target.value)}
              rows="4"
              className="w-full border rounded p-2 mb-4"
            />
            {returnError && (
              <p className="text-red-500 mb-4">{returnError}</p>
            )}
            <div className="flex justify-end">
              <button
                onClick={() => setShowReturnModal(false)}
                className="bg-gray-500 text-white px-4 py-2 rounded mr-2"
              >
                Cancel
              </button>
              <button
                onClick={handleReturnSubmit}
                className="bg-red-500 text-white px-4 py-2 rounded"
                disabled={loading}
              >
                {loading ? 'Submitting...' : 'Submit Return'}
              </button>
            </div>
          </div>
        </div>
      )}
      




      {/* ORDER NOW */}
    {showOrderForm && (
        <OrderForm closeForm={() => setShowOrderForm(false)} />
      )}
    </div>
  );
};

export default ImprovedOrderTracking;