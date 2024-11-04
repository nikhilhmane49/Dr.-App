import axios from "axios";
import React, { createContext ,useEffect,useState} from "react";
import { toast } from "react-toastify";

export const Admincontext = createContext();





const AdminProvider = ({ children }) => {
  const [atoken, setatoken] = useState(localStorage.getItem("atoken")?localStorage.getItem("atoken"):"");
const[doctor , setdoctor]=useState([])
  const backendurl = import.meta.env.VITE_BACKEND_URL;



  const getalldoc = async () => {
    try {
      const response = await axios.post(`${backendurl}/api/admin/all-doctors`, {}, {
        headers: {
          atoken: atoken,
        }
      });
      
      if (response.data.success) { 
        toast.success(response.data.message);
        setdoctor(response.data.data); // Use response.data.data if data contains the array of doctors
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };
  

useEffect(()=>{
  if(atoken){
    getalldoc();
  }
},[atoken]);




const changeavaliblity= async(doc_id)=>{

try {
  
  const response = await axios.post(`${backendurl}/api/admin/changeavaliblity`, {doc_id}, {
    headers: {
      atoken: atoken,
    }
  });

  if (response.data.success) { 
    toast.success(response.data.message);
    getalldoc();
  } else {
    toast.error(response.data.message);
  }
} catch (error) {
  console.log(error);
  toast.error(error.response?.data?.message || "Something went wrong");
}


}




  const value = {
    atoken,
    setatoken,
    backendurl,
    doctor,
    changeavaliblity,
  };
  return (
    <Admincontext.Provider value={value}>{children}</Admincontext.Provider>
  );
};

export default AdminProvider;
