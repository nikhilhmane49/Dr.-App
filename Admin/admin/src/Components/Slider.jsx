import React, { useContext } from "react";
import { Admincontext } from "../Contex/Admincontex";
import { NavLink } from "react-router-dom";
import home from "../assets_admin/home_icon.svg";
import add_doctor from "../assets_admin/doctor_icon.svg";
import doctor_list from "../assets_admin/list_icon.svg";
import appointment from "../assets_admin/people_icon.svg";

function Slider() {
  const { atoken } = useContext(Admincontext);

  return (
    <>
      {atoken && (
        <div className="flex flex-col bg-primary text-white w-72 h-screen p-8 shadow-lg">
          <h2 className="text-3xl font-semibold text-center mb-10 text-gray-100">
            Admin Panel
          </h2>
          <ul className="flex flex-col space-y-6">
            <NavLink
              to="/dashboard"
              className={({ isActive }) =>
                `flex items-center p-4 rounded-lg transition-all duration-200 ${
                  isActive
                    ? "bg-blue-600 shadow-lg"
                    : "hover:bg-gray-800 hover:shadow-md"
                }`
              }
            >
              <img
                src={home}
                alt="Home"
                className="h-7 w-7 mr-4 filter invert"
              />
              <p className="text-xl">Dashboard</p>
            </NavLink>

            <NavLink
              to="/Add-doctors"
              className={({ isActive }) =>
                `flex items-center p-4 rounded-lg transition-all duration-200 ${
                  isActive
                    ? "bg-blue-600 shadow-lg"
                    : "hover:bg-gray-800 hover:shadow-md"
                }`
              }
            >
              <img
                src={add_doctor}
                alt="Add Doctor"
                className="h-7 w-7 mr-4 text-white bg-white"
              />
              <p className="text-xl">Add Doctors</p>
            </NavLink>

            <NavLink
              to="/doctor-list"
              className={({ isActive }) =>
                `flex items-center p-4 rounded-lg transition-all duration-200 ${
                  isActive
                    ? "bg-blue-600 shadow-lg"
                    : "hover:bg-gray-800 hover:shadow-md"
                }`
              }
            >
              <img
                src={doctor_list}
                alt="Doctor List"
                className="h-7 w-7 mr-4 text-white bg-white"
              />
              <p className="text-xl">Doctor List</p>
            </NavLink>

            <NavLink
              to="/appointments"
              className={({ isActive }) =>
                `flex items-center p-4 rounded-lg transition-all duration-200 ${
                  isActive
                    ? "bg-blue-600 shadow-lg"
                    : "hover:bg-gray-800 hover:shadow-md"
                }`
              }
            >
              <img
                src={appointment}
                alt="Appointments"
                className="h-7 w-7 mr-4 filter invert"
              />
              <p className="text-xl">Appointments</p>
            </NavLink>
          </ul>
        </div>
      )}
    </>
  );
}

export default Slider;
