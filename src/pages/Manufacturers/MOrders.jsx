import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import ReactStars from "react-rating-stars-component";
import { QRCodeSVG } from 'qrcode.react';
import axios from 'axios';
import { FaCheck, FaDollarSign, FaTruck, FaSearch } from 'react-icons/fa';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper,
  Button, Chip, Typography, Box
} from '@mui/material';

function MOrders() {
  const [loading, setLoading] = useState(true);
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState('');
  const { token, setBillingDetails } = useContext(AuthContext);
  const navigate = useNavigate();
  const [qrCodeValue, setQrCodeValue] = useState('');
  const [qrCodeLink, setQrCodeLink] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [totalBusinessTieUps, setTotalBusinessTieUps] = useState(0);
  const [overallBusiness, setOverallBusiness] = useState(0);
  const [overallProfit, setOverallProfit] = useState(0);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

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
        calculateMetrics(data);
      } catch (error) {
        setError('Failed to load data');
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [token]);

  const calculateMetrics = (ordersData) => {
    const uniqueDistributors = new Set(ordersData.map(order => order.distributor?.distributorId?._id));
    setTotalBusinessTieUps(uniqueDistributors.size);

    let totalBusiness = 0;
    let totalCost = 0;

    ordersData.forEach(order => {
      order.medicines.forEach(medicine => {
        const quantity = Number(medicine.qty) || 0;
        const sellingPrice = Number(medicine.manufacturerId?.sellingPrice) || 0;
        const costPrice = Number(medicine.manufacturerId?.costPrice) || 0;

        totalBusiness += quantity * sellingPrice;
        totalCost += quantity * costPrice;
      });
    });

    setOverallBusiness(totalBusiness);
    const profit = totalBusiness - totalCost;
    setOverallProfit(profit > 0 ? (profit / totalCost) * 100 : 0);
  };

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

  const handleBilling = async (orderId) => {
    try {
      const foundOrder = orders.find((o) => o._id === orderId);
      if (foundOrder) {
        await setBillingDetails(foundOrder);
        navigate('/billings');
      } else {
        throw new Error('Order not found');
      }
    } catch (error) {
      console.error('Error:', error.message);
      alert(error.message);
    }
  };

  const handleDeliver = async (orderId) => {
    try {
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
      
      setOrders(prevOrders =>
        prevOrders.map(order =>
          order._id === orderId ? { ...order, orderStatus: 'Delivered' } : order
        )
      );

    } catch (error) {
      console.error('Error:', error.message);
      alert(error.message);
    }
  };

  const handleQr = async (id) => {
    try {
      const response = await axios.get(`https://med-tech-server.onrender.com/api/manufacturers/qrcode/${id}`);
      const { qrCodeUrl, qrCode } = response.data;
  
      const baseUrl = 'http://localhost:5173/qrcodes/';
      const qrCodeValue = qrCode.qrCode.startsWith('QR_') ? qrCode.qrCode : `QR_${qrCode.qrCode}`;
      const fullQrCodeUrl = `${baseUrl}${qrCodeValue}`;
  
      setQrCodeValue(qrCode.qrCode);
      setQrCodeLink(fullQrCodeUrl);
  
      openModal();
    } catch (error) {
      console.error('Error generating QR code:', error);
    }
  };

  const getRatingText = (ratingText) => {
    const ratingMap = {
      'Very Poor': 1,
      'Poor': 2,
      'Neutral': 3,
      'Good': 4,
      'Excellent': 5,
    };

    return ratingMap[ratingText] || 3;
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-indigo-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
        <Typography variant="h5" color="error">{error}</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3, bgcolor: 'background.default', minHeight: '100vh' }}>
      <div className="mb-8 grid grid-cols-3 gap-4">
        <div className="bg-gradient-to-r from-green-400 to-blue-500 rounded-lg p-6 text-white">
          <h2 className="text-2xl font-semibold mb-2">Total Business Tie-Ups</h2>
          <p className="text-4xl font-bold">{totalBusinessTieUps}</p>
        </div>
        <div className="bg-gradient-to-r from-yellow-400 to-green-500 rounded-lg p-6 text-white">
          <h2 className="text-2xl font-semibold mb-2">Overall Business</h2>
          <p className="text-4xl font-bold">₹ {overallBusiness.toLocaleString()}</p>
        </div>
        <div className="bg-gradient-to-r from-red-400 to-yellow-500 rounded-lg p-6 text-white">
          <h2 className="text-2xl font-semibold mb-2">Overall Profit</h2>
          <p className="text-4xl font-bold">{overallProfit.toFixed(2)}%</p>
        </div>
      </div>

      <div className="bg-white shadow-md p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-semibold text-gray-800">Orders</h1>
          <div className="flex items-center">
            <div className="relative mr-4">
              <input
                type="text"
                placeholder="Search"
                className="pl-10 pr-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>
          </div>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded shadow-lg max-w-md w-full relative">
            <button
              onClick={closeModal}
              className="absolute top-2 right-2 text-gray-600 hover:text-gray-900"
            >
              &times;
            </button>
            <h3 className="text-lg font-semibold mb-4">QR Code:</h3>
            <div className="flex justify-center mb-4">
              <QRCodeSVG value={qrCodeLink} size={128} />
            </div>
           
            <div className="flex justify-center">
              <button
                onClick={() => window.print()}
                className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
              >
                Print QR Code
              </button>
            </div>
          </div>
        </div>
      )}

      <TableContainer component={Paper} elevation={3}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Order Details</TableCell>
              <TableCell>Distributor</TableCell>
              <TableCell>Medicine</TableCell>
              
              <TableCell>Delivery Status</TableCell>
              <TableCell>Payment Status</TableCell>
              <TableCell>Actions</TableCell>
              <TableCell>Rating</TableCell>
              <TableCell>QR Code</TableCell>
              <TableCell>BOX No.</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders.length > 0 ? (
              orders.map((order) => (
                <TableRow key={order._id}>
                  <TableCell>
                    <Typography variant="subtitle2">{order._id}</Typography>
                    <Typography variant="body2" color="textSecondary">
                      Created: {new Date(order.createdAt).toLocaleDateString()}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2">{order.distributor?.distributorId?._id}</Typography>
                  </TableCell>
                  <TableCell>
                    {order.medicines.map((medicine) => (
                      <Box key={`${order._id}-${medicine._id}`} mb={1}>
                        <Typography variant="subtitle2">{medicine.name}</Typography>
                        <Typography variant="body2" color="textSecondary">
                          Qty: {medicine.qty} | MRP: ₹{medicine.mrp.toFixed(2)}
                        </Typography>
                        <Typography variant="body3" color="textTertiary">
                          Selling Price: ₹{medicine.manufacturerId.sellingPrice
                          }
                        </Typography>
                      </Box>
                    ))}
                  </TableCell>
                 
                  <TableCell>
                    <Chip
                      label={order.orderStatus}
                      color={
                        order.orderStatus === 'Pending' ? 'warning' :
                          order.orderStatus === 'Processing' ? 'info' :
                            order.orderStatus === 'Success' ? 'success' : 'default'
                      }
                      size="small"
                    />
                  </TableCell>
                  <TableCell>
                    <Box mt={1}>
                      <Chip
                        label={order.paymentStatus}
                        color={order.paymentStatus === 'Completed' ? 'success' : 'warning'}
                        size="small"
                      />
                    </Box>
                  </TableCell>
                  <TableCell>
                    {order.orderStatus === 'Pending' && (
                      <Button
                        variant="contained"
                        color="primary"
                        startIcon={<FaCheck />}
                        onClick={() => handleConfirm(order._id)}
                        fullWidth
                        sx={{ mb: 1 }}
                      >
                        Confirm
                      </Button>
                    )}
                    {order.orderStatus === 'Processing' && order.paymentStatus === 'Completed' && (
                      <Button
                        variant="outlined"
                        color="primary"
                        startIcon={<FaDollarSign />}
                        onClick={() => handleBilling(order._id)}
                        fullWidth
                        sx={{ mb: 1 }}
                      >
                        Billing
                      </Button>
                    )}
                    {order.orderStatus === 'Success' && order.paymentStatus === 'Completed' && (
                      <Button
                        variant="contained"
                        color="secondary"
                        startIcon={<FaTruck />}
                        onClick={() => handleDeliver(order._id)}
                        fullWidth
                        sx={{ mb: 1 }}
                      >
                        Deliver
                      </Button>
                    )}
                  </TableCell>
                  <TableCell>
                    {order.feedback.comment && (
                      <Box display="flex" flexDirection="column" alignItems="center">
                        <ReactStars
                          count={5}
                          // onChange={(newRating) => handleRate(order._id, newRating)}
                          size={24}
                          activeColor="#ffd700"
                          value={getRatingText(order.feedback?.rating) || 0} // Convert rating text to numerical value
                        />
                        <Typography variant="caption" mt={1}>
                          {order.feedback?.rating || 'No Rating'}
                        </Typography>
                      </Box>
                    )}
                  </TableCell>
                  <TableCell>
                  <Button
                        variant="contained"
                          color="primary"
                          fullWidth
                        sx={{ mb: 1, backgroundColor: 'blue', '&:hover': { backgroundColor: 'blue' } }}
                        onClick={() => handleQr(order.qrCode)}
                          >
                      Show QR
                    </Button>
                  </TableCell>
                  <TableCell></TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} align="center">
                  <Typography variant="subtitle1">No orders available.</Typography>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}

export default MOrders;








