import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from './AuthContext';

export const InventoryContext = createContext();

export const InventoryProvider = ({ children }) => {
  const [InventoryData, setInventoryData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { token, user } = useContext(AuthContext);

  const updateInventoryData = (newData) => {
    setInventoryData(newData);
  };

  useEffect(() => {
    const fetchInventoryData = async () => {
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        let url = '';

        switch (user?.role) {
          case 'Manufacturer':
            url = 'https://med-tech-server.onrender.com/api/manufacturers/inv/productsbymanf';
            break;
          case 'Distributor':
            url = 'https://med-tech-server.onrender.com/api/distributor/inventory/items';
            break;
          case 'Retailer':
            url = 'https://med-tech-server.onrender.com/api/retailer/inventory/items';
            break;
          default:
            console.error('Invalid role:', user?.role);
            setLoading(false);
            return;
        }

        console.log("Fetching inventory data from:", url);
        const response = await axios.get(url, {
          headers: {
            authorization: `Bearer ${token}`
          }
        });
        setInventoryData(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching inventory items:', error);
        setError(error.message);
        setLoading(false);
      }
    };

    fetchInventoryData();
  }, [token, user?.role]);

  return (
    <InventoryContext.Provider value={{ InventoryData, setInventoryData, updateInventoryData, loading, error }}>
      {children}
    </InventoryContext.Provider>
  );
};