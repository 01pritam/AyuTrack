import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App.jsx';
import './index.css';
import { AuthProvider } from './context/AuthContext.jsx';
import { InventoryProvider } from './context/InventoryContext.jsx';
import { UserRoleProvider } from './context/UserRoleContext.jsx';
import { TrackOrderProvider } from './context/TrackOrderContext.jsx';
import { BillingProvider } from './context/BillingsContext.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Router>
      <AuthProvider>
        <BillingProvider>
          <TrackOrderProvider>
            <InventoryProvider>
              <UserRoleProvider>
                <App />
              </UserRoleProvider>
            </InventoryProvider>
          </TrackOrderProvider>
        </BillingProvider>
      </AuthProvider>
    </Router>
  </StrictMode>
);