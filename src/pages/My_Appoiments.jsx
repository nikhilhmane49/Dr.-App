import React, { useContext, useState, useEffect } from "react";
import { Appcontext } from "../Context/Context.jsx";
import axios from "axios";
import { toast } from "react-toastify";
import Appoiment from "./Appoiment.jsx";

function My_Appoiment() {
  const { backendurl, token } = useContext(Appcontext);
  const [listdata, setlistdata] = useState([]);




  const getappointmentlist = async () => {

  

    if (!token) {
      toast.warn("Please log in to view appointments");
      return;
    }

    try {
      const { data } = await axios.get(
        `${backendurl}/api/user/user-appointmentslist`,
        { headers: { token } }
      );
      console.log("API Response:", data);

 if (data.success && Array.isArray(data.data)) {
   setlistdata(data.data.reverse());
 } else {
   console.warn("No data or invalid format");
   setlistdata([]);
 }

    } catch (error) {
      const message = error.response?.data?.message || error.message;
      console.error("Error fetching appointments:", message);
      toast.error(message);
    }

  };

  console.log(listdata);
  
//================================================================
  const cancelappointment = async (appointmentid) => {
    try {
      const { data } = await axios.post(
        `${backendurl}/api/user/user-cancelappointment`,
{appointmentid},
        { headers: { token } }
      );
       if (data.success) {
         toast.success("Appointment cancelled successfully");
         getappointmentlist();
       }
    } catch (error) {
      const message = error.response?.data?.message || error.message;
      console.error("Error is cancel appointment ", message);
      toast.error(message);
    }
  };






  useEffect(() => {
    if (token) {


      getappointmentlist();
    }
  }, [token]);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <p className="text-2xl font-semibold mb-6">My Appointments</p>
      <div className="space-y-6">
        {Array.isArray(listdata) && listdata.length > 0 ? (
          listdata.map((doctor, index) => (
            <div
              key={index}
              className="flex items-center bg-white p-6 rounded-lg shadow-md border hover:shadow-lg transition duration-300"
            >
              <img
                className="w-52 h-52 object-cover border-2 border-blue-500 mr-6 bg-blue-200"
                src={doctor.docData.image}
                alt={doctor.docData.name}
              />
              <div className="flex-grow">
                <p className="text-lg font-medium text-gray-800">
                  {doctor.docData.name}
                </p>
                <p className="text-gray-600">{doctor.docData.specialty}</p>
                <div className="mt-2 text-gray-600">
                  <p>Address:</p>
                  <p>{doctor.docData.address.line1}</p>
                  <p>{doctor.docData.address.line2}</p>
                </div>
                <p className="mt-4 text-gray-700">
                  <span className="font-semibold">Date & Time: </span>
                  {doctor.slotDate} | {doctor.slotTime}
                </p>
              </div>
              <div className="flex flex-col space-y-2">
                {!doctor.paid && !doctor.cancelled && (
                  <button className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition">
                    Pay online
                  </button>
                )}

                {doctor.paid && (
                  <button className="bg-blue-500 text-white py-2 px-4 rounded cursor-not-allowed">
                    Paid
                  </button>
                )}

                {!doctor.cancelled && (
                  <button
                    onClick={() => cancelappointment(doctor._id)}
                    className="bg-gray-100 border border-gray-300 text-gray-600 py-2 px-4 rounded"
                  >
                    Cancel appointment
                  </button>
                )}

                {doctor.cancelled && (
                  <button className="text-red-600 border-red-600 border-2 p-2">
                    Appointment cancelled
                  </button>
                )}
              </div>
            </div>
          ))
        ) : (
          <p>No appointments found.</p>
        )}
      </div>
    </div>
  );
}

export default My_Appoiment;
