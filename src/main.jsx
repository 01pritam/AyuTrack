import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App.jsx';
import './index.css';
import { InventoryProvider } from './context/InventoryContext.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Router>
      {/* <InventoryProvider> */}
        <App />
      {/* </InventoryProvider> */}
    </Router>
  </StrictMode>
);