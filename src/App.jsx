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
import Orders from './pages/Orders/Orders'
function App() {
  const { token } = useContext(AuthContext);

  return (
    <>
       <Navbar />
      <div className="w-full min-h-screen bg-gradient-to-b from-blue-200 to-teal-50">
        <Routes>
          <Route path="/signin" element={token ? <Navigate to="/dashboard" /> : <Login />} />
          <Route path="/signup" element={token ? <Navigate to="/dashboard" /> : <RegistrationForm />} />
          <Route path="/dashboard" element={token ? <Dashboard /> : <Navigate to="/signin" />} />
          <Route path="/inventory" element={token ? <Inventory /> : <Navigate to="/signin" />} />
          <Route path="/profile" element={token ? <ProfilePage /> : <Navigate to="/signin" />} />
          <Route path="/track-orders" element={token ? <TrackOrder /> : <Navigate to="/signin" />} />
          <Route path="/orders" element={token ? <Orders /> : <Navigate to="/signin" />} />
          <Route path="/billings" element={token ? <Billings /> : <Navigate to="/signin" />} />
          <Route path="*" element={<Navigate to="/dashboard" />} />
        </Routes>
      </div>
    </>
  );
}

export default App;