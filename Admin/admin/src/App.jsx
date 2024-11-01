import React ,{useContext} from 'react'
import Login from './Pages/Login'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Admincontext } from "./Contex/Admincontex";
import Navbar from './Components/Navbar';

function App() {

  const {atoken} = useContext(Admincontext);


  return atoken ? (
    <>
      <div>
        <ToastContainer />
        <Navbar />
      </div>
    </>
  ) : (
    <div>
      <Login />
      <ToastContainer />
    </div>
  );
}

export default App
