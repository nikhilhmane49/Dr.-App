import React, { useContext, useEffect } from 'react'
import { Admincontext } from '../../Contex/Admincontex';

function Appointments() {


    const { appointmentlist, appointments, setappointments, atoken } = useContext(Admincontext)
    
    useEffect(() => {
        if (atoken) {
            appointmentlist();
    }
},[atoken])
    

    return (
      <>
        <div className="p-6 bg-gray-100 min-h-screen">
          <h2 className="text-2xl font-semibold mb-6">All Appointments</h2>
          <div className="overflow-x-auto bg-white shadow-md rounded-lg">
            <table className="table-auto w-full border-collapse border border-gray-200">
              <thead className="bg-gray-200">
                <tr>
                  <th className="p-4 border border-gray-300">#</th>
                  <th className="p-4 border border-gray-300">Patient</th>
                  <th className="p-4 border border-gray-300">Age</th>
                  <th className="p-4 border border-gray-300">Date & Time</th>
                  <th className="p-4 border border-gray-300">Doctor</th>
                  <th className="p-4 border border-gray-300">Fees</th>
                  <th className="p-4 border border-gray-300">Actions</th>
                </tr>
              </thead>
              <tbody>
                {Array.isArray(appointments) ? (
                  appointments.map((appointment, index) => (
                    <tr
                      key={index}
                      className={`${
                        index % 2 === 0 ? "bg-white" : "bg-gray-50"
                      } hover:bg-gray-100`}
                    >
                      <td className="p-4 text-center border border-gray-300">
                        {index + 1}
                      </td>
                      <td className="p-4 border border-gray-300 flex items-center">
                        <img
                          src={appointment.userData.image}
                          alt={appointment.userData.name}
                          className="w-10 h-10 rounded-full mr-4"
                        />
                        {appointment.userData.name}
                      </td>
                      <td className="p-4 text-center border border-gray-300">
                        {appointment.age}
                      </td>
                      <td className="p-4 text-center border border-gray-300">
                        {appointment.slotDate} | {appointment.slotTime}
                      </td>
                      <td className="p-4 border border-gray-300 flex items-center">
                        <img
                          src={appointment.docData.image}
                          alt={appointment.docData.name}
                          className="w-10 h-10 rounded-full mr-4"
                        />
                        {appointment.docData.name}
                      </td>
                      <td className="p-4 text-center border border-gray-300">
                        ${appointment.docData.fees}
                      </td>
                      <td className="p-4 text-center border border-gray-300">
                        <button className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">
                          Cancel
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="7"
                      className="p-4 text-center text-gray-500 font-medium"
                    >
                      No Appointments Found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </>
    );
}

export default Appointments
