import React from "react";
import arrow from "../../assets/assets_frontend/arrow_icon.svg";
import header from "../../assets/assets_frontend/header_img.png";
import group_img from "../../assets/assets_frontend/group_profiles.png";

function Header() {
  return (
    <>
      <div className="bg-primary mx-4 md:mx-10 flex flex-col md:flex-row justify-between items-center flex-wrap">
        <div className="mx-4 md:mx-8 gap-6 md:gap-10 py-10 text-center md:text-left">
          <p className="text-[2rem] md:text-[3rem] font-bold text-white">
            Book Appointment <br />
            With Trusted Doctors
          </p>
          <div className="flex flex-col md:flex-row gap-3 mt-6 md:mt-10 items-center">
            <img
              className="w-[100px] md:w-auto object-contain"
              src={group_img}
              alt="Group Profiles"
            />
            <span className="text-base md:text-xl font-semibold text-gray-100">
              Simply browse through our extensive list of trusted doctors,{" "}
              <br />
              schedule your appointment hassle-free.
            </span>
          </div>
          <a
            href="#specification"
            className="rounded-full bg-white flex flex-row justify-center items-center mt-6 md:mt-10 p-4 md:p-6 w-[200px] md:w-[250px] gap-2 text-sm md:text-lg font-medium hover:-translate-y-2 transition-all duration-500"
          >
            <p>Book appointment</p>
            <img src={arrow} alt="Arrow Icon" />
          </a>
        </div>

        <div className="mt-6 md:mt-0 flex justify-center w-full">
          <img
            className="w-full md:w-[600px] max-w-full h-auto object-contain"
            src={header}
            alt="Header Image"
          />
        </div>
      </div>
    </>
  );
}

export default Header;
