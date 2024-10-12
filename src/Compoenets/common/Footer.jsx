import React from "react";
import logo from "../../assets/assets_frontend/logo.svg";

function Footer() {
  return (
    <footer className="bg-gray-100 py-10 shadow-md">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-start md:items-center space-y-8 md:space-y-0 px-4 md:px-10 lg:px-20">
        {/* Logo and Description */}
        <div className="flex flex-col items-start md:w-1/3 space-y-4">
          <img className="w-36 md:w-44" src={logo} alt="logo" />
          <p className="text-sm md:text-base text-gray-600">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s.
          </p>
        </div>

        {/* Company Links */}
        <div className="flex flex-col space-y-4 md:w-1/4">
          <p className="font-semibold text-lg">COMPANY</p>
          <ul className="space-y-2">
            <li className="hover:text-blue-500 cursor-pointer">Home</li>
            <li className="hover:text-blue-500 cursor-pointer">About us</li>
            <li className="hover:text-blue-500 cursor-pointer">Contact us</li>
            <li className="hover:text-blue-500 cursor-pointer">
              Privacy policy
            </li>
          </ul>
        </div>

        {/* Get in Touch */}
        <div className="flex flex-col space-y-4 md:w-1/4">
          <p className="font-semibold text-lg">GET IN TOUCH</p>
          <ul className="space-y-2 text-gray-600">
            <li className="text-sm md:text-base">+1-212-456-7890</li>
            <li className="text-sm md:text-base">greatstackdev@gmail.com</li>
          </ul>
        </div>
      </div>

      <div className="text-center py-4 mt-8 border-t border-gray-300">
        <p className="text-gray-500 text-sm md:text-base">
          Copyright © 2024 NIKHIL_MANE - All Rights Reserved.
        </p>
      </div>
    </footer>
  );
}

export default Footer;
