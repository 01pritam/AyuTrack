import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { FaChevronDown, FaChevronUp, FaTruck, FaBoxOpen, FaCheckCircle } from 'react-icons/fa';

const DOrder = () => {
  const [orders, setOrders] = useState([]);
  const [expandedOrders, setExpandedOrders] = useState({});
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showStatusDialog, setShowStatusDialog] = useState(false);
  const [showReturnModal, setShowReturnModal] = useState(false);
  const [returnQuantity, setReturnQuantity] = useState('');
  const [returnReason, setReturnReason] = useState('');
  const [activeTab, setActiveTab] = useState('all');
  const { token } = useContext(AuthContext);

  useEffect(() => {
    fetchOrders();
  }, [token]);

  const fetchOrders = async () => {
    try {
      const response = await fetch('https://med-tech-server.onrender.com/api/distributors/orders', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      if (!response.ok) throw new Error('Failed to fetch orders');
      const data = await response.json();
      setOrders(data);
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };

  const toggleOrderExpansion = (orderId) => {
    setExpandedOrders(prev => ({
      ...prev,
      [orderId]: !prev[orderId]
    }));
  };

  const handleStatusClick = (order) => {
    setSelectedOrder(order);
    setShowStatusDialog(true);
  };

  const handleReturnSubmit = async () => {
    if (selectedOrder && returnQuantity && returnReason) {
      try {
        const response = await fetch(`https://med-tech-server.onrender.com/api/distributors/orders/${selectedOrder._id}/return`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ quantity: returnQuantity, reason: returnReason })
        });
        if (!response.ok) throw new Error('Failed to submit return request');
        alert('Return request submitted successfully');
        fetchOrders(); // Refresh orders
      } catch (error) {
        console.error('Error submitting return:', error);
        alert('Failed to submit return request');
      } finally {
        setShowReturnModal(false);
        setReturnQuantity('');
        setReturnReason('');
      }
    }
  };

  const filteredOrders = activeTab === 'all' 
    ? orders 
    : orders.filter(order => order.orderStatus.toLowerCase() === activeTab);

  const StatusDialog = ({ order, onClose }) => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg w-96">
        <h2 className="text-xl font-bold mb-4">Order Status Timeline</h2>
        <div className="space-y-4">
          <div className="flex items-center">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${order.orderStatus === 'Pending' ? 'bg-blue-500 text-white' : 'bg-gray-300'}`}>
              <FaBoxOpen />
            </div>
            <div className="ml-4">
              <p className="font-semibold">Order Placed</p>
              <p className="text-sm text-gray-500">{new Date(order.createdAt).toLocaleString()}</p>
            </div>
          </div>
          <div className="flex items-center">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${order.orderStatus === 'Processing' ? 'bg-yellow-500 text-white' : 'bg-gray-300'}`}>
              <FaTruck />
            </div>
            <div className="ml-4">
              <p className="font-semibold">In Transit</p>
              <p className="text-sm text-gray-500">{order.orderStatus === 'Processing' ? 'Your order is on the way' : 'Waiting for processing'}</p>
            </div>
          </div>
          <div className="flex items-center">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${order.orderStatus === 'Delivered' ? 'bg-green-500 text-white' : 'bg-gray-300'}`}>
              <FaCheckCircle />
            </div>
            <div className="ml-4">
              <p className="font-semibold">Delivered</p>
              <p className="text-sm text-gray-500">{order.orderStatus === 'Delivered' ? 'Your order has been delivered' : 'Waiting for delivery'}</p>
            </div>
          </div>
        </div>
        <button onClick={onClose} className="mt-6 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Close</button>
      </div>
    </div>
  );

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Distributor Order Management</h1>
      
      <div className="mb-4">
        <button
          onClick={() => setActiveTab('all')}
          className={`px-4 py-2 rounded-l-lg ${activeTab === 'all' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
        >
          All Orders
        </button>
        <button
          onClick={() => setActiveTab('pending')}
          className={`px-4 py-2 ${activeTab === 'pending' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
        >
          Pending
        </button>
        <button
          onClick={() => setActiveTab('processing')}
          className={`px-4 py-2 ${activeTab === 'processing' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
        >
          Processing
        </button>
        <button
          onClick={() => setActiveTab('delivered')}
          className={`px-4 py-2 rounded-r-lg ${activeTab === 'delivered' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
        >
          Delivered
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 text-left">Order ID</th>
              <th className="px-4 py-2 text-left">Status</th>
              <th className="px-4 py-2 text-left">Total Amount</th>
              <th className="px-4 py-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders.map((order) => (
              <React.Fragment key={order._id}>
                <tr className="border-b">
                  <td className="px-4 py-2">{order._id}</td>
                  <td className="px-4 py-2">
                    <button
                      onClick={() => handleStatusClick(order)}
                      className={`px-2 py-1 rounded-full text-xs ${
                        order.orderStatus === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                        order.orderStatus === 'Processing' ? 'bg-blue-100 text-blue-800' :
                        'bg-green-100 text-green-800'
                      }`}
                    >
                      {order.orderStatus}
                    </button>
                  </td>
                  <td className="px-4 py-2">₹{order.totalAmount.toFixed(2)}</td>
                  <td className="px-4 py-2">
                    <button
                      onClick={() => toggleOrderExpansion(order._id)}
                      className="text-blue-500 hover:text-blue-700 mr-2"
                    >
                      {expandedOrders[order._id] ? <FaChevronUp /> : <FaChevronDown />}
                    </button>
                    {order.orderStatus === 'Delivered' && (
                      <button
                        onClick={() => {
                          setSelectedOrder(order);
                          setShowReturnModal(true);
                        }}
                        className="bg-red-500 text-white px-3 py-1 rounded text-sm hover:bg-red-600"
                      >
                        Return
                      </button>
                    )}
                  </td>
                </tr>
                {expandedOrders[order._id] && (
                  <tr>
                    <td colSpan="4" className="px-4 py-2">
                      <table className="min-w-full bg-gray-50">
                        <thead>
                          <tr className="bg-gray-200">
                            <th className="px-4 py-2 text-left text-xs">Medicine Name</th>
                            <th className="px-4 py-2 text-left text-xs">Quantity</th>
                            <th className="px-4 py-2 text-left text-xs">Price</th>
                          </tr>
                        </thead>
                        <tbody>
                          {order.medicines.map((medicine, index) => (
                            <tr key={index}>
                              <td className="px-4 py-2 text-sm">{medicine.name}</td>
                              <td className="px-4 py-2 text-sm">{medicine.qty}</td>
                              <td className="px-4 py-2 text-sm">₹{medicine.mrp.toFixed(2)}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>

      {showStatusDialog && selectedOrder && (
        <StatusDialog order={selectedOrder} onClose={() => setShowStatusDialog(false)} />
      )}

      {showReturnModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg w-96">
            <h2 className="text-xl font-bold mb-4">Request Return</h2>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Quantity</label>
              <input
                type="number"
                value={returnQuantity}
                onChange={(e) => setReturnQuantity(e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Reason</label>
              <textarea
                value={returnReason}
                onChange={(e) => setReturnReason(e.target.value)}
                rows="3"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              ></textarea>
            </div>
            <div className="flex justify-end space-x-2">
              <button
                onClick={() => setShowReturnModal(false)}
                className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={handleReturnSubmit}
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
              >
                Submit Return
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DOrder;