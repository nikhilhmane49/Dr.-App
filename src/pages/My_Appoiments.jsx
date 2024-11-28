import React, { useContext, useState, useEffect } from "react";
import { Appcontext } from "../Context/Context.jsx";
import axios from "axios";
import { toast } from "react-toastify";

function MyAppointments() {
  const { backendurl, token } = useContext(Appcontext);
  const [listdata, setlistdata] = useState([]);
  const [loading, setLoading] = useState(true);

  const getAppointmentList = async () => {
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
    } finally {
      setLoading(false);
    }
  };

  const cancelAppointment = async (appointmentid) => {
    try {
      const { data } = await axios.post(
        `${backendurl}/api/user/user-cancelappointment`,
        { appointmentid },
        { headers: { token } }
      );
      if (data.success) {
        toast.success("Appointment cancelled successfully");
        getAppointmentList();
      }
    } catch (error) {
      const message = error.response?.data?.message || error.message;
      toast.error(message);
    }
  };

  useEffect(() => {
    if (token) {
      getAppointmentList();
    }
  }, [token]);

  return (
    <div className="p-4 sm:p-6 bg-gray-50 min-h-screen">
      <p className="text-3xl font-bold text-gray-800 mb-6">My Appointments</p>
      {loading ? (
        <div className="flex justify-center items-center min-h-[200px]">
          <div className="loader" />
        </div>
      ) : (
        <div className="relative border-l border-gray-300">
          {Array.isArray(listdata) && listdata.length > 0 ? (
            listdata.map((doctor, index) => (
              <div
                key={index}
                className="relative flex flex-col sm:flex-row bg-white shadow-lg rounded-lg p-6 mb-6 ml-6 hover:shadow-xl transition duration-300"
              >
                {/* Timeline Circle */}
                <div className="absolute left-0 top-6 transform -translate-x-1/2">
                  <div className="w-8 h-8 bg-blue-500 rounded-full border-4 border-white shadow"></div>
                </div>
                {/* Doctor Image */}
                <div className="sm:w-1/4 flex-shrink-0">
                  <img
                    src={doctor.docData.image}
                    alt={doctor.docData.name}
                    className="w-full h-32 sm:h-48 object-cover rounded-lg border border-gray-200"
                  />
                </div>
                {/* Details */}
                <div className="sm:w-3/4 sm:ml-6 mt-4 sm:mt-0">
                  <h3 className="text-xl font-semibold text-gray-800 mb-1">
                    {doctor.docData.name}
                  </h3>
                  <p className="text-sm text-gray-500 mb-3">
                    {doctor.docData.specialty}
                  </p>
                  <p className="text-sm text-gray-700">
                    <strong>Address:</strong> {doctor.docData.address.line1},{" "}
                    {doctor.docData.address.line2}
                  </p>
                  <p className="text-sm text-gray-700 mt-2">
                    <strong>Date & Time:</strong> {doctor.slotDate} |{" "}
                    {doctor.slotTime}
                  </p>
                  {/* Status Badges */}
                  <div className="mt-3 flex items-center space-x-2">
                    {!doctor.paid && !doctor.cancelled && (
                      <span className="px-3 py-1 text-xs font-medium text-blue-600 bg-blue-100 rounded-full">
                        Upcoming
                      </span>
                    )}
                    {doctor.paid && (
                      <span className="px-3 py-1 text-xs font-medium text-green-600 bg-green-100 rounded-full">
                        Paid
                      </span>
                    )}
                    {doctor.cancelled && (
                      <span className="px-3 py-1 text-xs font-medium text-red-600 bg-red-100 rounded-full">
                        Cancelled
                      </span>
                    )}
                  </div>
                  {/* Buttons */}
                  <div className="mt-4 flex space-x-3">
                    {!doctor.paid && !doctor.cancelled && (
                      <button className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition">
                        Pay Online
                      </button>
                    )}
                    {!doctor.cancelled && (
                      <button
                        onClick={() => cancelAppointment(doctor._id)}
                        className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 transition"
                      >
                        Cancel Appointment
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500">
              No appointments found. Please book one to see details here.
            </p>
          )}
        </div>
      )}
    </div>
  );
}

export default MyAppointments;
