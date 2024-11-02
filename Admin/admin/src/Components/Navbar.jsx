import React, { useContext } from "react";
import { Admincontext } from "../Contex/Admincontex";
import { useNavigate } from "react-router-dom";
import logo from "../assets_admin/admin_logo.svg";

function Navbar() {
  const { atoken, setatoken } = useContext(Admincontext);
  const navigate = useNavigate();

  const logout = () => {
    setatoken("");
    localStorage.removeItem("atoken");
    navigate("/");
  };

  return (
    <div className="  flex items-center justify-between bg-gray-100 p-4 shadow-md">
      <div className="flex items-center">
        <img src={logo} alt="Logo" className="h-10 w-auto mr-3" />
        <p className="text-primary text-3xl font-bold">{atoken ? "Admin" : "Doctor"}</p>
      </div>
      <button
        onClick={logout}
        className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-500 transition duration-300"
      >
        Logout
      </button>
    </div>
  );
}

export default Navbar;
