import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { FaStar } from 'react-icons/fa';

function MOrders() {
  const [loading, setLoading] = useState(true);
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState('');
  const { token } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://med-tech-server.onrender.com/api/manufacturers/orders/ordersOfdist', {
          headers: {
            authorization: `Bearer ${token}`
          }
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();
        setOrders(Array.isArray(data) ? data : []);
      } catch (error) {
        setError('Failed to load data');
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [token]);

  const handleConfirm = async (orderId) => {
    try {
      const response = await fetch(`https://med-tech-server.onrender.com/api/manufacturers/orders/confirm/${orderId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ orderStatus: 'Processing' })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to confirm the order');
      }

      setOrders(prevOrders =>
        prevOrders.map(order =>
          order._id === orderId ? { ...order, orderStatus: 'Processing' } : order
        )
      );
      alert('Order confirmed successfully');
    } catch (error) {
      console.error('Error confirming order:', error);
      alert('Failed to confirm the order: ' + error.message);
    }
  };

  const handleDeliver = async (orderId) => {
    try {
      const foundOrder = orders.find((o) => o._id === orderId);

      if (foundOrder) {
        const response = await fetch(`https://med-tech-server.onrender.com/api/manufacturers/orders/${orderId}/set-status`, {
          method: 'PATCH',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ status: 'Delivered' })
        });

        if (!response.ok) {
          throw new Error('Failed to set delivery details');
        }

        const data = await response.json();
        console.log("Delivery response:", data);
        
      } else {
        throw new Error('Order not found');
      }
    } catch (error) {
      console.error('Error:', error.message);
      alert(error.message);
    }
  };

  const renderStars = (rating) => {
    const starCount = {
      'Very Poor': 1,
      'Poor': 2,
      'Neutral': 3,
      'Good': 4,
      'Excellent': 5
    }[rating] || 0;

    return (
      <div className="flex">
        {[...Array(5)].map((_, index) => (
          <FaStar
            key={index}
            color={index < starCount ? 'gold' : 'gray'}
            className="text-xl"
          />
        ))}
      </div>
    );
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen relative">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
        <div className="absolute flex items-center justify-center h-full w-full">
          <p className="text-xl font-bold text-gray-600">Orders Loading...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-xl font-bold text-red-600">{error}</p>
      </div>
    );
  }

  let serialNumber = 1;

  return (
    <div className='p-6 bg-gray-100 min-h-screen'>
      <h1 className='text-3xl font-bold text-center text-blue-600 mb-6'>
        Manage Orders
      </h1>
      
      <div className='bg-white shadow-lg rounded-lg p-4'>
        <div className="overflow-x-auto">
          <table className='min-w-full table-auto'>
            <thead>
              <tr className='bg-gray-100'>
                <th className='px-2 py-1 text-left text-sm font-semibold'>S.No</th>
                <th className='px-2 py-1 text-left text-sm font-semibold'>Order ID</th>
                <th className='px-2 py-1 text-left text-sm font-semibold'>Distributor ID</th>
                <th className='px-2 py-1 text-left text-sm font-semibold'>Manufacturer ID</th>
                <th className='px-2 py-1 text-left text-sm font-semibold'>Medicine Name</th>
                <th className='px-2 py-1 text-left text-sm font-semibold'>Batch No</th>
                <th className='px-2 py-1 text-left text-sm font-semibold'>Quantity</th>
                <th className='px-2 py-1 text-left text-sm font-semibold'>MRP</th>
                <th className='px-2 py-1 text-left text-sm font-semibold'>Production Date</th>
                <th className='px-2 py-1 text-left text-sm font-semibold'>Expiry Date</th>
                <th className='px-2 py-1 text-left text-sm font-semibold'>Order Status</th>
                <th className='px-2 py-1 text-left text-sm font-semibold'>Payment Status</th>
                <th className='px-2 py-1 text-left text-sm font-semibold'>Created At</th>
                <th className='px-2 py-1 text-left text-sm font-semibold'>Updated At</th>
                <th className='px-2 py-1 text-left text-sm font-semibold'>Actions</th>
                <th className='px-2 py-1 text-left text-sm font-semibold'>Rating</th>
              </tr>
            </thead>
            <tbody>
              {orders.length > 0 ? (
                orders.flatMap((order, orderIndex) => 
                  order.medicines.map((medicine, medIndex) => (
                    <tr key={`${order._id}-${medicine._id}`} className='border-t'>
                      <td className='px-2 py-1 text-sm'>{serialNumber++}</td>
                      <td className='px-2 py-1 text-sm'>{order._id}</td>
                      <td className='px-2 py-1 text-sm'>{order.distributor?.distributorId?._id}</td>
                      <td className='px-2 py-1 text-sm'>{order.manufacturer?.manufacturerId?._id}</td>
                      <td className='px-2 py-1 text-sm'>{medicine.name}</td>
                      <td className='px-2 py-1 text-sm'>{medicine.batchNo}</td>
                      <td className='px-2 py-1 text-sm'>{medicine.qty}</td>
                      <td className='px-2 py-1 text-sm'>₹{medicine.mrp.toFixed(2)}</td>
                      <td className='px-2 py-1 text-sm'>{new Date(medicine.productionDate).toLocaleDateString()}</td>
                      <td className='px-2 py-1 text-sm'>{new Date(medicine.expiryDate).toLocaleDateString()}</td>
                      <td className='px-2 py-1 text-sm'>{order.orderStatus}</td>
                      <td className='px-2 py-1 text-sm'>{order.paymentStatus}</td>
                      <td className='px-2 py-1 text-sm'>{new Date(order.createdAt).toLocaleString()}</td>
                      <td className='px-2 py-1 text-sm'>{new Date(order.updatedAt).toLocaleString()}</td>
                      <td className='px-2 py-1 text-sm'>
                        {order.orderStatus === 'Pending' && (
                          <button
                            onClick={() => handleConfirm(order._id)}
                            className='bg-green-500 text-white px-3 py-1 rounded-md hover:bg-green-600 transition-colors'
                          >
                            Confirm
                          </button>
                        )}
                        {order.orderStatus === 'Processing' && order.paymentStatus === 'Completed' && (
                          <button
                            onClick={() => handleBilling(order._id)}
                            className='bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600 transition-colors'
                          >
                            Billing
                          </button>
                        )}
                        {order.orderStatus === 'Packing' && order.paymentStatus === 'Completed' && (
                          <button
                            onClick={() => handleDeliver(order._id)}
                            className='bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600 transition-colors'
                          >
                            Deliver
                          </button>
                        )}
                      </td>
                      <td className='px-2 py-1 text-sm'>
                        {order.feedback ? renderStars(order.feedback.rating) : ''}
                      </td>
                    </tr>
                  ))
                )
              ) : (
                <tr>
                  <td colSpan="15" className="text-center py-4">No orders available.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default MOrders;