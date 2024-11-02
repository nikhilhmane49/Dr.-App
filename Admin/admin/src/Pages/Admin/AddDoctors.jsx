import React, { useState } from 'react';
import uploadimg from '../../assets_admin/upload_area.svg';

function AddDoctors() {


const [Docimg , setDocimg]=useState(false);
    const [name , setname]=useState("");
    const [email , setemail]=useState("");
    const [Password , setPassword]=useState("");
    const [Experience , setExperience]=useState("1 Year");
    const [Fees , setFees]=useState("");
    const [Speciality , setSpeciality]=useState("General physician");
    const [Education , setEducation]=useState("");
    const [Address1 , setAddress1]=useState("");
    const [Address2 , setAddress2]=useState("");
    const [about , setabout]=useState("");




const Onclickhandeler = async (e)=>{
    e.preventDefault();
}




  return (

    <form onClick={Onclickhandeler}>
    <div className="p-6 bg-gray-50 rounded-md shadow-md w-full max-w-5xl mx-auto overflow-y-scroll">
      <p className="text-xl font-semibold mb-6">Add Doctor</p>
      <div className="flex gap-6">
        {/* Left Section */}
        <div className="flex flex-col gap-4 w-1/2">
          {/* Upload Image */}
          <div className="flex flex-col items-center">
            <label htmlFor="doc-img" className="flex flex-col items-center cursor-pointer">
              <img src={ Docimg ? URL.createObjectURL(Docimg) : uploadimg} alt="" className="w-24 h-24 mb-2" />
              <p className="text-gray-500 text-sm">Upload doctor picture</p>
            </label>
            <input onChange={(e)=>{setDocimg(e.target.files[0])}} type="file" id="doc-img" required hidden />
          </div>
          {/* Doctor Name */}
          <div>
            <label className="text-gray-700">Doctor name</label>
            <input onChange={(e)=>{setname(e.target.value)}} value={name} type="text" placeholder="Name" className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200" required />
          </div>
          {/* Doctor Email */}
          <div>
            <label className="text-gray-700">Doctor Email</label>
            <input onChange={(e)=>{setemail(e.target.value)}} value={email} type="email" placeholder="Your email"  className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200" required />
          </div>
          {/* Doctor Password */}
          <div>
            <label className="text-gray-700">Doctor Password</label>
            <input onChange={(e)=>{setPassword(e.target.value)}} value={Password} type="password" placeholder="Password" className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200" required />
          </div>
          {/* Experience */}
          <div>
            <label className="text-gray-700">Experience</label>
            <select onChange={(e)=>{setExperience(e.target.value)}} value={Experience} required className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200">
              <option value="1 Year">1 Year</option>
              <option value="2 Year">2 Year</option>
              <option value="3 Year">3 Year</option>
              <option value="4 Year">4 Year</option>
              <option value="5 Year">5 Year</option>
              <option value="6 Year">6 Year</option>
              <option value="7 Year">7 Year</option>
              <option value="8 Year">8 Year</option>
              <option value="9 Year">9 Year</option>
              <option value="10 Year">10 Year</option>
            </select>
          </div>
          {/* Fees */}
          <div>
            <label className="text-gray-700">Fees</label>
            <input onChange={(e)=>{setFees(e.target.value)}} value={Fees} type="number" placeholder="Your fees" className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200" required />
          </div>
        </div>

        {/* Right Section */}
        <div className="flex flex-col gap-4 w-1/2">
          {/* Speciality */}
          <div>
            <label className="text-gray-700">Speciality</label>
            <select onChange={(e)=>{setSpeciality(e.target.value)}} value={Speciality} required className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200">
              <option value="General physician">General physician</option>
              <option value="Gynecologist">Gynecologist</option>
              <option value="Dermatologist">Dermatologist</option>
              <option value="Pediatricians">Pediatricians</option>
              <option value="Neurologist">Neurologist</option>
              <option value="Gastroenterologist">Gastroenterologist</option>
            </select>
          </div>
          {/* Education */}
          <div>
            <label className="text-gray-700">Education</label>
            <input onChange={(e)=>{setEducation(e.target.value)}} value={Education} type="text" placeholder="Education" className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200" required />
          </div>
          {/* Address */}
          <div>
            <label className="text-gray-700">Address</label>
            <input onChange={(e)=>{setAddress1(e.target.value)}} value={Address1} type="text" placeholder="Address 1" className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200" required />
            <input onChange={(e)=>{setAddress2(e.target.value)}} value={Address2} type="text" placeholder="Address 2" className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200" required />
          </div>
        </div>
      </div>

      {/* About Me */}
      <div className="mt-4">
        <label className="text-gray-700">About me</label>
        <textarea onChange={(e)=>{setabout(e.target.value)}} value={about} placeholder="Write about yourself" rows={5} className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"></textarea>
      </div>

      {/* Add Doctor Button */}
      <div className="flex justify-end mt-6">
        <button type='submit' className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-200">Add doctor</button>
      </div>
    </div>
    </form>
  );
}

export default AddDoctors;
