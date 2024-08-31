// 
import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from './AuthContext';

export const InventoryContext = createContext();

export const InventoryProvider = ({ children }) => {
  const [InventoryData, setInventoryData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { token } = useContext(AuthContext);

  useEffect(() => {
    const fetchInventoryData = async () => {
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        console.log("token state=",token);
        const response = await axios.get('https://med-tech-server.onrender.com/api/retailer/inventory/items');
        setInventoryData(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching inventory items:', error);
        setError(error.message);
        setLoading(false);
      }
    };

    fetchInventoryData();
  }, [token]);

  return (
    <InventoryContext.Provider value={{ InventoryData, setInventoryData, loading, error }}>
      {children}
    </InventoryContext.Provider>
  );
};