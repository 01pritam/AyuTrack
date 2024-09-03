import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import ReactStars from "react-rating-stars-component";
import { 
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper,
  Button, Chip, Typography, CircularProgress, Box
} from '@mui/material';
import { FaCheck, FaDollarSign, FaTruck } from 'react-icons/fa';

function MOrders() {
  const [loading, setLoading] = useState(true);
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState('');
  const { token, setBillingDetails } = useContext(AuthContext);
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

  const handleBilling = async (order) => {
    try {
      const foundOrder = orders.find((o) => o._id === order);
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

  // const handleRate = (orderId, rating) => {
  //   try {
  //     // Update the orders state locally
  //     setOrders(prevOrders =>
  //       prevOrders.map(order =>
  //         order._id === orderId ? { ...order, rating } : order
  //       )
  //     );
  
  //     // Optionally, you can display a success message or perform any other logic here
  //     console.log('Rating updated successfully');
  //   } catch (error) {
  //     console.error('Error updating rating:', error);
  //     alert('Failed to update rating: ' + error.message);
  //   }
  // };
  const getRatingText = (ratingText) => {
    console.log("ratingTest: ",ratingText);
    const ratingMap = {
      'Very Poor': 1,
      'Poor': 2,
      'Neutral': 3,
      'Good': 4,
      'Excellent': 5,
    };
  
    // Return the corresponding value, default to 3 if the rating text is not valid
    return ratingMap[ratingText] || 3; // Default to 'Neutral' value
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
        <CircularProgress />
      </Box>
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
      <Typography variant="h4" gutterBottom align="center" sx={{ color: 'primary.main', fontWeight: 'bold' }}>
        Manage Orders
      </Typography>
      <TableContainer component={Paper} elevation={3}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Order Details</TableCell>
              <TableCell>Distributor</TableCell>
              <TableCell>Medicine</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Actions</TableCell>
              <TableCell>Rating</TableCell>
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
                  {order.feedback.comment&&(<TableCell>
                     <Box display="flex" flexDirection="column" alignItems="center">
                        <ReactStars
                          count={5}
                          onChange={(newRating) => handleRate(order._id, newRating)}
                          size={24}
                          activeColor="#ffd700"
                          value={getRatingText(order.feedback?.rating) || 0} // Convert rating text to numerical value
                  />
                  <Typography variant="caption" mt={1}>
                    {order.feedback?.rating || 'No Rating'}
                  </Typography>
                  </Box>
                  </TableCell>
                    )}
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