
import { createContext } from "react";
import axios from "axios";
import { useEffect ,useState } from "react";
import { toast } from "react-toastify";


export const Appcontext = createContext();

const AppProvider = (props) => { 

const[token,settoken]=useState(localStorage.getItem('token')?localStorage.getItem('token'):false)
    const[doctors , setdoctors]=useState([])
    
    const backendurl = import.meta.env.VITE_BACKEND_URL;

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

useEffect(()=>{
    listdoctor();
},[])

    const value = {
        doctors,
        backendurl,
        token,settoken
    }

    return (
        <Appcontext.Provider value={value}>
            {props.children}
        </Appcontext.Provider>
    )
}

export default AppProvider;