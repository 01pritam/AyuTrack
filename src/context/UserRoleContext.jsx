import React, { createContext, useState, useContext } from 'react';
import { AuthContext } from './AuthContext';

export const UserRoleContext = createContext();

export const UserRoleProvider = ({ children }) => {
  const { user } = useContext(AuthContext);
  const [role, setRole] = useState(user ? user.role : null);

  return (
    <UserRoleContext.Provider value={{ role, setRole }}>
      {children}
    </UserRoleContext.Provider>
  );
};