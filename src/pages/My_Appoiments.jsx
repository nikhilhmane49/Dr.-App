import React, { useContext, useState, useEffect } from "react";
import { Appcontext } from "../Context/Context.jsx";
import axios from "axios";
import { toast } from "react-toastify";

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
      if (data.success && Array.isArray(data.data)) {
        setlistdata(data.data.reverse());
      } else {
        setlistdata([]);
      }
    } catch (error) {
      const message = error.response?.data?.message || error.message;
      toast.error(message);
    }
  };

  const cancelappointment = async (appointmentid) => {
    try {
      const { data } = await axios.post(
        `${backendurl}/api/user/user-cancelappointment`,
        { appointmentid },
        { headers: { token } }
      );
      if (data.success) {
        toast.success("Appointment cancelled successfully");
        getappointmentlist();
      }
    } catch (error) {
      const message = error.response?.data?.message || error.message;
      toast.error(message);
    }
  };

  useEffect(() => {
    if (token) {
      getappointmentlist();
    }
  }, [token]);

  return (
    <div className="p-4 sm:p-6 bg-gray-100 min-h-screen">
      <p className="text-xl sm:text-2xl font-semibold mb-4 sm:mb-6">
        My Appointments
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {Array.isArray(listdata) && listdata.length > 0 ? (
          listdata.map((doctor, index) => (
            <div
              key={index}
              className="flex flex-col md:flex-row bg-white p-4 sm:p-6 rounded-lg shadow-md border hover:shadow-lg transition duration-300"
            >
              <img
                className="w-full md:w-48 h-48 object-cover rounded-md border-2 border-blue-500 bg-blue-200 mb-4 md:mb-0 md:mr-6"
                src={doctor.docData.image}
                alt={doctor.docData.name}
              />
              <div className="flex-grow space-y-3">
                <p className="text-lg font-medium text-gray-800">
                  {doctor.docData.name}
                </p>
                <p className="text-gray-600">{doctor.docData.specialty}</p>
                <div className="text-gray-600 text-sm">
                  <p>Address:</p>
                  <p>{doctor.docData.address.line1}</p>
                  <p>{doctor.docData.address.line2}</p>
                </div>
                <p className="text-gray-700">
                  <span className="font-semibold">Date & Time: </span>
                  {doctor.slotDate} | {doctor.slotTime}
                </p>
              </div>
              <div className="mt-4 md:mt-0 md:ml-4 flex flex-col space-y-2">
                {!doctor.paid && !doctor.cancelled && (
                  <button className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition">
                    Pay Online
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
                    className="bg-gray-100 border border-gray-300 text-gray-600 py-2 px-4 rounded hover:bg-gray-200 transition"
                  >
                    Cancel Appointment
                  </button>
                )}
                {doctor.cancelled && (
                  <button className="text-red-600 border border-red-600 py-2 px-4 rounded cursor-not-allowed">
                    Appointment Cancelled
                  </button>
                )}
              </div>
            </div>
          ))
        ) : (
          <p className="text-center col-span-full">No appointments found.</p>
        )}
      </div>
    </div>
  );
}

export default My_Appoiment;
