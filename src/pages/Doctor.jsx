import React, { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Appcontext } from "../Context/Context";

function Doctor() {
  const { spcefication } = useParams();
  const navigate = useNavigate();
  const { doctors } = useContext(Appcontext);

  const [filter, setFilter] = useState([]);

  const applyFilter = () => {
    if (spcefication) {
      setFilter(doctors.filter((doc) => doc.speciality === spcefication));
    } else {
      setFilter(doctors);
    }
  };

  useEffect(() => {
    applyFilter();
  }, [spcefication, doctors]);

  const handleNavigation = (speciality) => {
    navigate(spcefication === speciality ? "/doctor" : `/doctor/${speciality}`);
  };

  return (
    <>
      <div className="min-h-screen flex flex-col justify-between">
        <div className="ml-4 md:ml-11">
          <p className="font-semibold text-xl md:text-2xl">
            Browse through the doctors specialist.
          </p>

          <div className="flex flex-col md:flex-row justify-between mt-8">
            {/* Speciality Sidebar */}
            <div className="gap-4 mb-6 md:mb-0">
              <div className="flex flex-col gap-4">
                <p
                  className={`border-2 border-gray-400 rounded-lg p-3 md:p-5 text-lg md:text-xl font-semibold cursor-pointer ${
                    spcefication == "General physician" ? "bg-indigo-100 " : ""
                  }`}
                  onClick={() => handleNavigation("General physician")}
                >
                  General physician
                </p>
                <p
                  onClick={() => handleNavigation("Gynecologist")}
                  className={`border-2 border-gray-400 rounded-lg p-3 md:p-5 text-lg md:text-xl font-semibold cursor-pointer ${
                    spcefication == "Gynecologist" ? "bg-indigo-100 " : ""
                  }`}
                >
                  Gynecologist
                </p>
                <p
                  onClick={() => handleNavigation("Dermatologist")}
                  className={`border-2 border-gray-400 rounded-lg p-3 md:p-5 text-lg md:text-xl font-semibold cursor-pointer ${
                    spcefication == "Dermatologist" ? "bg-indigo-100 " : ""
                  }`}
                >
                  Dermatologist
                </p>
                <p
                  onClick={() => handleNavigation("Pediatricians")}
                  className={`border-2 border-gray-400 rounded-lg p-3 md:p-5 text-lg md:text-xl font-semibold cursor-pointer ${
                    spcefication == "Pediatricians" ? "bg-indigo-100 " : ""
                  }`}
                >
                  Pediatricians
                </p>
                <p
                  onClick={() => handleNavigation("Neurologist")}
                  className={`border-2 border-gray-400 rounded-lg p-3 md:p-5 text-lg md:text-xl font-semibold cursor-pointer ${
                    spcefication == "Neurologist" ? "bg-indigo-100 " : ""
                  }`}
                >
                  Neurologist
                </p>
                <p
                  onClick={() => handleNavigation("Gastroenterologist")}
                  className={`border-2 border-gray-400 rounded-lg p-3 md:p-5 text-lg md:text-xl font-semibold cursor-pointer ${
                    spcefication == "Gastroenterologist" ? "bg-indigo-100 " : ""
                  }`}
                >
                  Gastroenterologist
                </p>
              </div>
            </div>

            {/* Doctors Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mr-4 md:mr-11">
              {filter.map((doctor, index) => (
                <div
                  key={index}
                  onClick={() => navigate(`/Appoiment/${doctor._id}`)}
                  className="border-2 border-gray-200 p-4 md:p-6 rounded-lg cursor-pointer shadow-md hover:-translate-y-2 transition-all duration-500"
                >
                  <img
                    className="w-full h-32 md:h-40 object-cover mb-4 rounded-lg bg-blue-100"
                    src={doctor.image}
                    alt={doctor.name}
                  />
                  <div className="text-center">
                    <p className="font-semibold text-lg md:text-xl mb-2">
                      {doctor.name}
                    </p>
                    <p className="text-gray-500">{doctor.speciality}</p>
                    <p className="text-green-500 mt-2">Available</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Doctor;
