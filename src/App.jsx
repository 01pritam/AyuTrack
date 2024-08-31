import React, { useContext } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Inventory from './pages/Inventory/Inventory';
import Dashboard from './pages/Dashboard/Dashboard';
import ProfilePage from './pages/Profile/ProfilePage';
import Login from './pages/Login/Login';
import TrackOrder from './pages/TrackOrders/TrackOrder';
import RegistrationForm from './pages/Register/RegistrationForm';
import Billings from './pages/Billings/Billings';
import { AuthContext } from './context/AuthContext';
import Orders from './pages/Orders/Orders';

function App() {
  const { token, user } = useContext(AuthContext);

  const role = user?.role; // Assuming user object contains role information

  return (
    <>
      <Navbar />
      <div className="w-full min-h-screen bg-gradient-to-b from-blue-200 to-teal-50">
        <Routes>
          <Route path="/signin" element={token ? <Navigate to="/dashboard" /> : <Login />} />
          <Route path="/signup" element={token ? <Navigate to="/dashboard" /> : <RegistrationForm />} />
          <Route path="/dashboard" element={token ? <Dashboard /> : <Navigate to="/signin" />} />
          
          {/* Role-Based Routes */}
          {role === 'Manufacturer' && (
            <>
              <Route path="/inventory" element={<Inventory />} />
              <Route path="/orders" element={<Orders />} />
              <Route path="/billings" element={<Billings />} />
            </>
          )}
          {role === 'Distributor' && (
            <>
              <Route path="/track-orders" element={<TrackOrder />} />
              <Route path="/orders" element={<Orders />} />
            </>
          )}
          {role === 'Retailer' && (
            <>
              <Route path="/inventory" element={<Inventory />} />
              <Route path="/profile" element={<ProfilePage />} />
            </>
          )}
          
          {/* Default Fallback Route */}
          <Route path="*" element={<Navigate to={token ? "/dashboard" : "/signin"} />} />
        </Routes>
      </div>
    </>
  );
}

export default App;