import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import ReactStars from "react-rating-stars-component";
import { QRCodeSVG } from 'qrcode.react';
import axios from 'axios';
import { FaCheck, FaDollarSign, FaTruck, FaSearch, FaShoppingCart } from 'react-icons/fa';
import{
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper,
  Button, Chip, Typography, CircularProgress, Box
} from '@mui/material';


function MOrders() {
  const [loading, setLoading] = useState(true);
  const [loading1, setLoading1] = useState(true);
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState('');
  const { token, setBillingDetails } = useContext(AuthContext);
  const navigate = useNavigate();
  const [qrCodeValue, setQrCodeValue] = useState('');
  const [qrCodeLink, setQrCodeLink] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
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
      } catch (error) {
        setError('Failed to load data');
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [token]);

  useEffect(() => {
    console.log("Updated qrCodeValue: ", qrCodeValue);
    console.log("Updated qrCodeLink: ", qrCodeLink);
  }, [qrCodeValue, qrCodeLink]);

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
      console.log("Order Id: ",orderId);
      console.log("Order token: ",token);
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
  // const handleQr = async (id) => {
  //   try {
  //     setLoading1(true);
  //     const response = await axios.get(`https://med-tech-server.onrender.com/api/manufacturers/qrcode/${id}`);
  //     const { qrCodeUrl, qrCode } = response.data;
      
  //     // Set the QR code data
  //     setQrCodeValue(qrCode.qrCode);
  //     setQrCodeLink(qrCode.qrCodeUrl);
  //     openModal();
  //   } catch (error) {
  //     console.error('Error generating QR code:', error);
  //   } finally {
  //     setLoading1(false);
  //   }
  // };

  const handleQr = async (id) => {
    try {
      setLoading1(true);
      const response = await axios.get(`https://med-tech-server.onrender.com/api/manufacturers/qrcode/${id}`);
      const { qrCodeUrl, qrCode } = response.data;
  
      // Prepend the base URL to the QR code
      const baseUrl = 'http://localhost:5173/qrcodes/';
      const qrCodeValue = qrCode.qrCode.startsWith('QR_') ? qrCode.qrCode : `QR_${qrCode.qrCode}`;
      const fullQrCodeUrl = `${baseUrl}${qrCodeValue}`;
  
      // Set the QR code data with the full URL
      console.log("qrCode.qrCode: ", qrCode.qrCode);
      console.log("fullQrCodeUrl: ", fullQrCodeUrl);
      setQrCodeValue(qrCode.qrCode);  // For the raw code if needed
      setQrCodeLink(fullQrCodeUrl);   // Set the full link for the QR code
  
      openModal();
    } catch (error) {
      console.error('Error generating QR code:', error);
    } finally {
      setLoading1(false);
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

    return ratingMap[ratingText] || 3; // Default to 'Neutral' value
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
          <p className="text-4xl font-bold">247</p>
        </div>
        <div className="bg-gradient-to-r from-yellow-400 to-green-500 rounded-lg p-6 text-white">
          <h2 className="text-2xl font-semibold mb-2">Overall Business</h2>
          <p className="text-4xl font-bold">₹ 25,00,000</p>
        </div>
        <div className="bg-gradient-to-r from-red-400 to-yellow-500 rounded-lg p-6 text-white">
          <h2 className="text-2xl font-semibold mb-2">Overall Profit</h2>
          <p className="text-4xl font-bold">+65%</p>
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
              <QRCodeSVG value={qrCodeValue} size={128} />
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






















// import React, { useState, useEffect, useContext } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { AuthContext } from '../../context/AuthContext';
// import ReactStars from "react-rating-stars-component";
// import { FaCheck, FaDollarSign, FaTruck, FaSearch, FaShoppingCart } from 'react-icons/fa';

// const MOrders = () => {
//   const [loading, setLoading] = useState(true);
//   const [orders, setOrders] = useState([]);
//   const [error, setError] = useState('');
//   const { token, setBillingDetails } = useContext(AuthContext);
//   const navigate = useNavigate();
  
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await fetch('https://med-tech-server.onrender.com/api/manufacturers/orders/ordersOfdist', {
//           headers: {
//             authorization: `Bearer ${token}`
//           }
//         });

//         if (!response.ok) {
//           throw new Error('Network response was not ok');
//         }

//         const data = await response.json();
//         setOrders(Array.isArray(data) ? data : []);
//       } catch (error) {
//         setError('Failed to load data');
//         console.error('Error fetching data:', error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, [token]);

//   const handleConfirm = async (orderId) => {
//     // ... (keep existing handleConfirm logic)
//   };

//   const handleBilling = async (order) => {
//     // ... (keep existing handleBilling logic)
//   };

//   const handleDeliver = async (orderId) => {
//     // ... (keep existing handleDeliver logic)
//   };

//   const getRatingText = (ratingText) => {
//     const ratingMap = {
//       'Very Poor': 1,
//       'Poor': 2,
//       'Neutral': 3,
//       'Good': 4,
//       'Excellent': 5,
//     };
  
//     return ratingMap[ratingText] || 0;
//   };

//   if (loading) {
//     return (
//       <div className="flex justify-center items-center h-screen bg-gray-100">
//         <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-indigo-600"></div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="flex justify-center items-center min-h-screen bg-gray-100">
//         <p className="text-red-500 text-xl">{error}</p>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gray-100 p-8">
//       <div className="mb-8 grid grid-cols-3 gap-4">
//         <div className="bg-gradient-to-r from-green-400 to-blue-500 rounded-lg p-6 text-white">
//           <h2 className="text-2xl font-semibold mb-2">Total Business Tie-Ups</h2>
//           <p className="text-4xl font-bold">247</p>
//         </div>
//         <div className="bg-gradient-to-r from-yellow-400 to-green-500 rounded-lg p-6 text-white">
//           <h2 className="text-2xl font-semibold mb-2">Overall Business</h2>
//           <p className="text-4xl font-bold">$ 2,500,000</p>
//         </div>
//         <div className="bg-gradient-to-r from-red-400 to-yellow-500 rounded-lg p-6 text-white">
//           <h2 className="text-2xl font-semibold mb-2">Overall Profit</h2>
//           <p className="text-4xl font-bold">+65%</p>
//         </div>
//       </div>
      
      // <div className="bg-white rounded-lg shadow-md p-6">
      //   <div className="flex justify-between items-center mb-6">
      //     <h1 className="text-2xl font-semibold text-gray-800">Procurements</h1>
      //     <div className="flex items-center">
      //       <div className="relative mr-4">
      //         <input
      //           type="text"
      //           placeholder="Search"
      //           className="pl-10 pr-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
      //         />
      //         <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
      //       </div>
      //       <button className="bg-purple-600 text-white px-4 py-2 rounded-full flex items-center">
      //         <FaShoppingCart className="mr-2" />
      //         <span>Cart</span>
      //       </button>
      //     </div>
      //   </div>
        
//         <table className="min-w-full">
//           <thead>
//             <tr className="text-left text-gray-500 text-sm">
//               <th className="pb-4">ORDER ID</th>
//               <th className="pb-4">CATEGORY</th>
//               <th className="pb-4">QUANTITY</th>
//               <th className="pb-4">SOURCING BUYER / CONSULTANT</th>
//               <th className="pb-4">TIMELINE</th>
//               <th className="pb-4">PAYMENT STATUS</th>
//               <th className="pb-4">DELIVERY STATUS</th>
//               <th className="pb-4">ACTIONS</th>
//               <th className="pb-4">RATING</th>
//             </tr>
//           </thead>
//           <tbody>
//             {orders.map((order) => (
//               <tr key={order._id} className="border-t border-gray-200">
//                 <td className="py-4">
//                   <div className="font-semibold">{order.medicines[0]?.name || 'N/A'}</div>
//                   <div className="text-sm text-gray-500">{order._id}</div>
//                 </td>
//                 <td className="py-4">
//                   <span className="px-2 py-1 bg-purple-100 text-purple-800 rounded-full text-sm">
//                     {order.medicines[0]?.category || 'N/A'}
//                   </span>
//                 </td>
//                 <td className="py-4">
//                   <div className="flex items-center">
//                     <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
//                     <span>{order.medicines[0]?.qty || 'N/A'} PCE</span>
//                   </div>
//                 </td>
//                 <td className="py-4">
//                   <div className="flex items-center">
//                     <img src="/api/placeholder/40/40" alt="User" className="w-10 h-10 rounded-full mr-3" />
//                     <div>
//                       <div className="font-semibold">{order.distributor?.distributorId?.name || 'N/A'}</div>
//                       <div className="text-sm text-gray-500">{order.distributor?.distributorId?.address || 'N/A'}</div>
//                     </div>
//                   </div>
//                 </td>
//                 <td className="py-4">
//                   <div className="w-32 h-2 bg-gray-200 rounded-full overflow-hidden">
//                     <div className="h-full bg-blue-500" style={{width: '60%'}}></div>
//                   </div>
//                   <div className="text-sm text-gray-500 mt-1">
//                     {new Date(order.createdAt).toLocaleDateString()}
//                   </div>
//                 </td>
//                 <td className="py-4">
//                   <span className={`px-2 py-1 rounded-full text-sm ${
//                     order.paymentStatus === 'Warning' ? 'bg-yellow-100 text-yellow-800' :
//                     order.paymentStatus === 'Success' ? 'bg-blue-100 text-blue-800' :
//                     order.paymentStatus === 'Completed' ? 'bg-green-100 text-green-800' :
//                     'bg-gray-100 text-gray-800'
//                   }`}>
//                     {order.paymentStatus}
//                   </span>
//                 </td>
//                 <td className="py-4">
//                   <span className={`px-2 py-1 rounded-full text-sm ${
//                     order.orderStatus === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
//                     order.orderStatus === 'Processing' ? 'bg-blue-100 text-blue-800' :
//                     order.orderStatus === 'Delivered' ? 'bg-green-100 text-green-800' :
//                     'bg-gray-100 text-gray-800'
//                   }`}>
//                     {order.orderStatus}
//                   </span>
//                 </td>
//                 <td className="py-4">
//                   {order.orderStatus === 'Pending' && (
//                     <button
//                       onClick={() => handleConfirm(order._id)}
//                       className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm flex items-center"
//                     >
//                       <FaCheck className="mr-1" /> Confirm
//                     </button>
//                   )}
//                   {order.orderStatus === 'Processing' && order.paymentStatus === 'Completed' && (
//                     <button
//                       onClick={() => handleBilling(order._id)}
//                       className="bg-green-500 text-white px-3 py-1 rounded-full text-sm flex items-center"
//                     >
//                       <FaDollarSign className="mr-1" /> Billing
//                     </button>
//                   )}
//                   {order.orderStatus === 'Success' && order.paymentStatus === 'Completed' && (
//                     <button
//                       onClick={() => handleDeliver(order._id)}
//                       className="bg-purple-500 text-white px-3 py-1 rounded-full text-sm flex items-center"
//                     >
//                       <FaTruck className="mr-1" /> Deliver
//                     </button>
//                   )}
//                 </td>
//                 <td className="py-4">
//   {order.feedback?.comment && (
//     <div className="flex flex-col items-center">
//       <ReactStars
//         count={5}
//         onChange={(newRating) => handleRate(order._id, newRating)}
//         size={24}
//         activeColor="#ffd700"
//         value={getRatingText(order.feedback?.rating) || 0} // Convert rating text to numerical value
//       />
//       <span className="mt-1 text-xs">
//         {order.feedback?.rating || 'No Rating'}
//       </span>
//     </div>
//   )}
// </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default MOrders;