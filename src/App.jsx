import React, { useContext } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Inventory from './pages/Inventory/Inventory';
import MInventory from './pages/Manufacturers/MInventory';
import Dashboard from './pages/Dashboard/Dashboard';
import ProfilePage from './pages/Profile/ProfilePage';
import Login from './pages/Login/Login';
import TrackOrder from './pages/TrackOrders/TrackOrder';
import RegistrationForm from './pages/Register/RegistrationForm';
import Billings from './pages/Billings/Billings';
import { AuthContext } from './context/AuthContext';
import MOrders from './pages/Manufacturers/MOrders';
import DOrders from './pages/Distributors/DOrders';
import DInventory from './pages/Distributors/DInventory'
import Homepage from './pages/HomePage/Homepage';
import { QrCode } from 'lucide-react';
import QrCodePage from './pages/QrCodePage';
function App() {
  const { token, userRole } = useContext(AuthContext);
  console.log("token:: ",token);
  return (
    <>
      {token && <Navbar />}
      <div className="w-full min-h-screen overflow-auto bg-white">
        <Routes>
          <Route 
            path="/signin" 
            element={token ? <Navigate to="/home" /> : <Login />} 
          />
          <Route 
            path="/signup" 
            element={token ? <Navigate to="/home" /> : <RegistrationForm />} 
          />
          <Route 
            path="/home" 
            element={token ? <Homepage  /> : <Navigate to="/signin" />} 
          />
          <Route 
            path="/dashboard" 
            element={token ? <Dashboard  /> : <Navigate to="/signin" />} 
          />
         <Route 
          path="/qrcodes/:id" 
          element={token ? <QrCodePage /> : <Navigate to="/signin" />} 
        />
          
          {/* Role-Based Routes */}
          
          {userRole === 'Manufacturer' && (
            <>
              <Route path="/minventory" element={<MInventory />} />
              <Route path="/morders" element={<MOrders />} />
              <Route path="/billings" element={<Billings />} />
              <Route path="/profile" element={<ProfilePage />} />
            </>
          )}
          {userRole === 'Distributor' && (
            <>
              <Route path="/dinventory" element={<DInventory />} />
              <Route path="/dorders" element={<DOrders />} />
              <Route path="/track-orders" element={<TrackOrder />} />
              <Route path="/billings" element={<Billings />} />
              <Route path="/profile" element={<ProfilePage />} />

            </>
          )}
          {userRole === 'Retailer' && (
            <>
              <Route path="/inventory" element={<Inventory />} />
              <Route path="/profile" element={<ProfilePage />} />
            </>
          )}
          
          {/* Default Fallback Route */}
          <Route path="*" element={<Navigate to={token ? "/home" : "/signin"} />} />
        </Routes>
      </div>
    </>
  );
}

export default App;