
import { createContext } from "react";
import axios from "axios";
import { useEffect ,useState } from "react";
import { toast } from "react-toastify";


export const Appcontext = createContext();

const AppProvider = (props) => { 

const[token,settoken]=useState(localStorage.getItem('token')?localStorage.getItem('token'):false)
    const[doctors , setdoctors]=useState([])
    const[data, setData]=useState(false);
     const backendurl = import.meta.env.VITE_BACKEND_URL;


     //####
const listdoctor = async()=>{

    try {

        const response = await axios.get(`${backendurl}/api/doctor/listdoctor`,{});

        if(response.data.success){
            toast.success(response.data.message);
            setdoctors(response.data.data); 
        }else{
            toast.error(response.data.message);
        }
        
    } catch (error) {
        console.log(error);
        toast.error(error.response?.data?.message || "Something went wrong");
    }
}


//#####

const getproile=async()=>{


    try {
        
const response= await axios.get(`${backendurl}/api/user/user-profile`, { headers : {
    token: token,
  }});

if(response.data.success){
    toast.success(response.data.message);
    setData(response.data.data); 
}else{
    toast.error(response.data.message);
}


    } catch (error) {
        console.log(error);
        toast.error(error.response?.data?.message || "Something went wrong");
    }
}




useEffect(()=>{
    listdoctor();
},[]);

useEffect(()=>{
    if(token){
        getproile();
    }
},[token]);

    const value = {
        doctors,
        listdoctor,
        backendurl,
        token,settoken
        ,data,setData,getproile
    }

    return (
        <Appcontext.Provider value={value}>
            {props.children}
        </Appcontext.Provider>
    )
}

export default AppProvider;