import React ,{useContext} from 'react'
import Login from './Pages/Login'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Admincontext } from "./Contex/Admincontex";
import Navbar from './Components/Navbar';
import Slider from './Components/Slider';
import Dashboard from './Pages/Admin/Dashboard';
import AddDoctors from './Pages/Admin/AddDoctors';
import DoctorList from './Pages/Admin/DoctorList';
import Appointments from './Pages/Admin/Appointments';
import { Routes, Route } from 'react-router-dom';

function App() {

  const {atoken} = useContext(Admincontext);


  return atoken ? (
    <>
      <div>
        <ToastContainer />
        <Navbar />
        <div className='flex items-start'>
          <Slider />

          <Routes>
            <Route path='/dashboard' element={<Dashboard/>} />
            <Route path='/Add-doctors' element={<AddDoctors/>} />
            <Route path='/doctor-list' element={<DoctorList/>} />
            <Route path='/appointments' element={<Appointments/>} />
          </Routes>
        </div>
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
