import React from "react";
import appointment_img from "../../assets/assets_frontend/appointment_img.png";
import { useNavigate } from "react-router-dom";

function Banner() {
  const navigate = useNavigate();
  return (
    <>
      <div className="mt-16 mx-6 md:mx-16 bg-primary justify-between items-center p-4 flex flex-col md:flex-row">
        <div className="gap-6 md:gap-14 md:ml-12 text-center md:text-left">
          <p className="text-[28px] md:text-[40px] text-white">
            Book Appointment <br /> With 100+ Trusted Doctors
          </p>
          <button
            onClick={() => {
              navigate("/login");
              scrollTo(0, 0);
            }}
            className="bg-white rounded-full p-3 md:p-5 mt-6 md:mt-11 text-lg md:text-xl font-semibold"
          >
            Create account
          </button>
        </div>

        <div className="mt-8 md:mt-0">
          <img
            className="w-[200px] md:w-[300px] mr-0 md:mr-14 mx-auto"
            src={appointment_img}
            alt=""
          />
        </div>
      </div>
    </>
  );
}

export default Banner;
