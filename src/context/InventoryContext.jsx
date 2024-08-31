// // src/context/InventoryContext.js
// import React, { createContext, useState, useEffect } from 'react';
// import axios from 'axios';
// export const InventoryContext = createContext();
// import { useContext } from 'react';
// import { AuthContext } from './AuthContext';



// export const InventoryProvider = ({ children }) => {
//   const [InventoryData, setInventoryData] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const { token} = useContext(AuthContext);

//   useEffect(() => {
//     const fetchInventoryData = async () => {
//       try {
//         const response = await axios.get('https://med-tech-server.onrender.com/api/retailer/inventory/items');
//         setInventoryData(response.data);
//         setLoading(false);
//       } catch (error) {
//         console.error('Error fetching inventory data', error);
//       }
//     };

//     fetchInventoryData();
//   }, []);

//   return (
//     <InventoryContext.Provider value={{ InventoryData, setInventoryData, loading }}>
//       {children}
//     </InventoryContext.Provider>
//   );
// };
// src/context/InventoryContext.js





import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from './AuthContext';

export const InventoryContext = createContext();

export const InventoryProvider = ({ children }) => {
  const [InventoryData, setInventoryData] = useState([]);
  const [loading, setLoading] = useState(true);
  const { token } = useContext(AuthContext);

  useEffect(() => {
    const fetchInventoryData = async () => {
      try {
        const response = await fetch('https://med-tech-server.onrender.com/api/retailer/inventory/items', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            // Add any additional headers if required, like authentication tokens
            // 'Authorization': `Bearer ${token}`
          }
        });
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
      
        const data = await response.json();
        console.log(data);
        // Process the data as needed
      } catch (error) {
        console.error('Error fetching inventory items:', error);
      }
    };

    fetchInventoryData();
  }, [token]); // Include token in the dependency array

  return (
    <InventoryContext.Provider value={{ InventoryData, setInventoryData, loading }}>
      {children}
    </InventoryContext.Provider>
  );
};
