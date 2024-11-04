import React, { useState } from "react";
import logo from "../../assets/assets_frontend/logo.svg";
import profile_pic from "../../assets/assets_frontend/profile_pic.png";
import dropdown from "../../assets/assets_frontend/dropdown_icon.svg";
import { NavLink, useNavigate } from "react-router-dom";
import { useContext } from "react";
import {Appcontext} from "../../Context/Context";

function Navbar() {
  const navigate = useNavigate();
const {token,settoken}=useContext(Appcontext);
  const [menuOpen, setMenuOpen] = useState(false);

const logout = ()=>{

  settoken('');
  localStorage.removeItem('token');

}


  return (
    <>
      <div className="flex flex-row justify-between items-center p-4 m-4 border-b-2 border-gray-500 shadow-lg bg-gray-100">
        {/* Logo */}
        <img
          onClick={() => navigate("/")}
          src={logo}
          alt="logo"
          className="w-28 cursor-pointer"
        />

        {/* Desktop Menu */}
        <div className="hidden md:flex">
          <ul className="flex flex-row items-center justify-between p-3 m-2 gap-6 lg:gap-14">
            <NavLink to="/">
              <li className="text-lg lg:text-xl font-semibold text-gray-700 select-none">
                HOME
              </li>
            </NavLink>

            <NavLink to="/Doctor">
              <li className="text-lg lg:text-xl font-semibold text-gray-700 select-none">
                All DOCTORS
              </li>
            </NavLink>

            <NavLink to="/about">
              <li className="text-lg lg:text-xl font-semibold text-gray-700 select-none">
                ABOUT
              </li>
            </NavLink>

            <NavLink to="/contact">
              <li className="text-lg lg:text-xl font-semibold text-gray-700 select-none">
                CONTACT
              </li>
            </NavLink>
          </ul>
        </div>

        {/* Mobile Hamburger Menu */}
        <div className="md:hidden flex items-center">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="focus:outline-none"
          >
            <svg
              className="w-8 h-8 text-gray-700"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16m-7 6h7"
              />
            </svg>
          </button>
        </div>

        {/* Conditional Profile Menu */}
        {token ? (
          <div className="cursor-pointer group relative hidden md:block">
            <div className="flex flex-row gap-2">
              <img
                src={profile_pic}
                className="rounded-full w-12 lg:w-14"
                alt="profile"
              />
              <img src={dropdown} className="w-6 lg:w-7" alt="dropdown icon" />
            </div>
            <div className="absolute hidden z-20 group-hover:block right-0 w-48 lg:w-56">
              <div className="flex flex-col bg-gray-300 gap-4 p-4">
                <p
                  onClick={() => navigate("/Myprofile")}
                  className="hover:text-black cursor-pointer text-lg lg:text-xl text-gray-500 select-none"
                >
                  My Profile
                </p>
                <p
                  onClick={() => navigate("/My_Appoiment")}
                  className="hover:text-black cursor-pointer text-lg lg:text-xl text-gray-500 select-none"
                >
                  My Appointments
                </p>
                <p
                  onClick={logout}
                  className="hover:text-black cursor-pointer text-lg lg:text-xl text-gray-500 select-none"
                >
                  Logout
                </p>
              </div>
            </div>
          </div>
        ) : (
          <button
            className="bg-primary text-lg lg:text-xl p-2 lg:p-3 text-white rounded-full select-none hidden md:block"
            onClick={() => navigate("/login")}
          >
            Create account
          </button>
        )}
      </div>

      {/* Mobile Dropdown Menu */}
      {menuOpen && (
        <div className="md:hidden flex flex-col bg-gray-100 shadow-lg px-4 py-4 space-y-4">
          <NavLink to="/" onClick={() => setMenuOpen(false)}>
            <li className="text-lg font-semibold text-gray-700">HOME</li>
          </NavLink>
          <NavLink to="/Doctor" onClick={() => setMenuOpen(false)}>
            <li className="text-lg font-semibold text-gray-700">All DOCTORS</li>
          </NavLink>
          <NavLink to="/about" onClick={() => setMenuOpen(false)}>
            <li className="text-lg font-semibold text-gray-700">ABOUT</li>
          </NavLink>
          <NavLink to="/contact" onClick={() => setMenuOpen(false)}>
            <li className="text-lg font-semibold text-gray-700">CONTACT</li>
          </NavLink>

          {/* Conditional Login/Logout in Mobile View */}
          {token ? (
            <div className="flex flex-col gap-4 bg-gray-300 p-4">
              <p
                onClick={() => navigate("/Myprofile")}
                className="hover:text-black cursor-pointer text-lg text-gray-500"
              >
                My Profile
              </p>
              <p
                onClick={() => navigate("/My_Appoiment")}
                className="hover:text-black cursor-pointer text-lg text-gray-500"
              >
                My Appointments
              </p>
              <p
                onClick={() => setToken(false)}
                className="hover:text-black cursor-pointer text-lg text-gray-500"
              >
                Logout
              </p>
            </div>
          ) : (
            <button
              className="bg-primary text-lg p-2 text-white rounded-full"
              onClick={() => navigate("/login")}
            >
              Create account
            </button>
          )}
        </div>
      )}
    </>
  );
}

export default Navbar;
