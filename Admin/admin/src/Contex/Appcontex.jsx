import React, { createContext } from "react";

export const Appcontext = createContext();



const AppProvider = ({ children }) => {
    const value = {};

  return (
    <Appcontext.Provider value={value}>
      {children} 
    </Appcontext.Provider>
  );
};

export default AppProvider;
