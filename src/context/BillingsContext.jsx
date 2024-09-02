import React, { createContext, useState } from 'react';

export const BillingContext = createContext();

export const BillingProvider = ({ children }) => {
  const [billingDetails, setBillingDetails] = useState(null);
  const [billingNavigation, setBillingNavigation] = useState(false); // New flag

  return (
    <BillingContext.Provider value={{ billingDetails, setBillingDetails, billingNavigation, setBillingNavigation }}>
      {children}
    </BillingContext.Provider>
  );
};