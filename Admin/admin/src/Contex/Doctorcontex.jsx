import React, { createContext } from "react";

export const Doctorcontext = createContext();



const DoctorProvider = ({ children }) => {
  const value = {};
  return (
    <Doctorcontext.Provider value={value}>{children}</Doctorcontext.Provider>
  );
};

export default DoctorProvider;
