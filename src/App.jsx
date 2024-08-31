import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { UserRoleProvider } from './context/UserRoleContext';
import Navbar from './components/Navbar/Navbar';
import Inventory from './pages/Inventory/Inventory';
import Dashboard from './pages/Dashboard/Dashboard';
import ProfilePage from './pages/Profile/ProfilePage';
import Login from './pages/Login/Login';
import TrackOrder from './pages/TrackOrders/TrackOrder';
import { InventoryProvider } from './context/InventoryContext';
import RegistrationForm from './pages/Register/RegistrationForm';
function App() {
  return (
    <AuthProvider>
      <InventoryProvider>
      <UserRoleProvider>
          <Navbar />
          <div className="w-full min-h-screen bg-gradient-to-b from-blue-200 to-teal-50">
            <Routes>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/inventory" element={<Inventory />} />
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/signin" element={<Login />} />
              <Route path="/signup" element={<RegistrationForm />} />
              <Route path="/track-orders" element={<TrackOrder />}/>
            </Routes>
          </div>
      </UserRoleProvider>
      </InventoryProvider>
    </AuthProvider>
  );
}

export default App;