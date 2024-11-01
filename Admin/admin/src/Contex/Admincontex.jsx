import React, { createContext ,useState} from "react";

export const Admincontext = createContext();





const AdminProvider = ({ children }) => {
  const [atoken, setatoken] = useState(localStorage.getItem("atoken")?localStorage.getItem("atoken"):"");

  const backendurl = import.meta.env.VITE_BACKEND_URL;

  const value = {
    atoken,
    setatoken,
    backendurl,
  };
  return (
    <Admincontext.Provider value={value}>{children}</Admincontext.Provider>
  );
};

export default AdminProvider;
