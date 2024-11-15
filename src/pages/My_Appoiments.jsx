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
        `${backendurl}/api/user-appointmentslist`,
        { headers: { token } }
      );

      // console.log(data.data);
      

   
   
      

      if (data.success) {
        setlistdata(data.listdata.reverse());
      }
    } catch (error) {
      console.error("Error:", error.data?.data || error.message);
      toast.error(error.data?.data?.message || "Fetching appointments failed");
    }
  };

  console.log(listdata);
  

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
                <p className="text-gray-600">{doctor.specialty}</p>
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
                {index === 0 && (
                  <button className="bg-gray-100 border border-gray-300 text-gray-600 py-2 px-4 rounded">
                    Cancel appointment
                  </button>
                )}
                {index === 1 && (
                  <>
                    <button className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition">
                      Pay here
                    </button>
                    <button className="bg-gray-100 border border-gray-300 text-gray-600 py-2 px-4 rounded">
                      Cancel appointment
                    </button>
                  </>
                )}
                {index === 2 && (
                  <>
                    <button className="bg-blue-500 text-white py-2 px-4 rounded cursor-not-allowed">
                      Paid
                    </button>
                    <button className="bg-gray-100 border border-gray-300 text-gray-600 py-2 px-4 rounded">
                      Cancel appointment
                    </button>
                  </>
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
