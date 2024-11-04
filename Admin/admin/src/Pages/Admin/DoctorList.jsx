import React from 'react'
import { useContext } from 'react'
import { Admincontext } from '../../Contex/Admincontex';

function DoctorList() {

const {doctor, changeavaliblity}=useContext(Admincontext);


    return (
       <>
       

       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mr-4 md:mr-11">
              {
              
              
              Array.isArray(doctor) && doctor.map((doctor, index) => (
                <div
                  key={index}
                //   onClick={() => navigate(`/Appoiment/${doctor._id}`)}
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
                    <input onChange={()=>changeavaliblity(doctor._id)} type="checkbox" checked={doctor.available}/>
                    <p className="text-green-500 mt-2">Available</p>
                  </div>
                </div>
              ))}
            </div>
       
       
       
       </>

    )
}

export default DoctorList
