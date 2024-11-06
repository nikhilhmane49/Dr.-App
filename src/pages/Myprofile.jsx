import React, { useContext, useState } from "react";
import profile from "../assets/assets_frontend/profile_pic.png";
import { Appcontext } from "../Context/Context";
import axios from "axios";
import { toast } from "react-toastify";



function MyProfile() {
  

const {data,setData , token , getproile,backendurl}=useContext(Appcontext);





  const [isEdit, setIsEdit] = useState(false);
  const [image,setimage]=useState(false);

  const updatetheprofile= async()=>{


try {
  const formdata = new FormData();

  formdata.append('name', data.name);
  formdata.append('phone', data.phone);
  formdata.append('address', JSON.stringify(data.address));
  formdata.append('gender', data.gender);
  formdata.append('dob', data.dob);


 image && formdata.append('image', image)

 const response = await axios.post(`${backendurl}/api/user/user-updateprofile`,formdata,{headers:{token}})

if(response.data.success){
toast.success(response.data.message);
 await getproile();
 setIsEdit(false);
 setimage(false);
}
else{
toast.error(response.data.message);
}
} catch (error) {
  console.log(error);
  toast.error(error.response?.data?.message || "Something went wrong");
}

  }

  return data && (
    <div className="max-w-2xl mx-auto p-8 bg-gray-50 rounded-lg shadow-2xl mb-16">
      {/* Profile Picture */}
      <div className="flex items-center justify-center mb-8">


     { isEdit ? (

<label htmlFor="image">
  <div>
<img src={image? URL.createObjectURL(image) :data.image } alt="" />

  </div>

  <input onChange={(e)=>setimage(e.target.files[0])} type="file"  id="image" />
</label>

      ):
       ( <img
          src={data.image}
          alt="Profile"
          className="w-32 h-32 rounded-full border-4 border-blue-500 shadow-lg"
        />)

       }
      </div>

      {/* Profile Info */}
      <div className="space-y-4">
        {/* Name */}
        <div className="flex flex-col items-start">
          <label className="text-sm font-bold text-gray-700 ">Name:</label>
          {isEdit ? (
            <input
              type="text"
              className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
              value={data.name}
              onChange={(e) => setData({ ...data, name: e.target.value })}
            />
          ) : (
            <p className="text-lg font-medium">{data.name}</p>
          )}
        </div>

        {/* Email */}
        <div className="flex flex-col items-start">
          <label className="text-sm font-bold text-gray-700">Email:</label>
          <p className="text-lg font-medium">{data.email}</p>
        </div>

        {/* Phone */}
        <div className="flex flex-col items-start">
          <label className="text-sm font-semibold text-gray-700">Phone:</label>
          {isEdit ? (
            <input
              type="text"
              className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
              value={data.Phone}
              onChange={(e) => setData({ ...data, Phone: e.target.value })}
            />
          ) : (
            <p className="text-lg font-medium">{data.phone}</p>
          )}
        </div>

        {/* Address */}
        <div>
          <p className="text-lg font-semibold">Address:</p>
          <div className="flex flex-col">
            {isEdit ? (
              <>
                <input
                  type="text"
                  className="w-full px-3 py-2 mb-2 border rounded-md focus:ring-2 focus:ring-blue-500"
                  value={data.address?.line1 || ""}
                  onChange={(e) =>
                    setData({
                      ...data,
                      address: { ...data.address, line1: e.target.value },
                    })
                  }
                />
                <input
                  type="text"
                  className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
                  value={data.address?.line2 || ""}
                  onChange={(e) =>
                    setData({
                      ...data,
                      address: { ...data.address, line2: e.target.value },
                    })
                  }
                />
              </>
            ) : (
              <>
                <p>{data.address.line1}</p>
                <p>{data.address.line2}</p>
              </>
            )}
          </div>
        </div>

        {/* Basic Information */}
        <p className="text-lg font-semibold">Basic Information</p>
        <div className="flex flex-col space-y-4">
          {/* Gender */}
          <div className="flex flex-col items-start">
            <label className="text-sm font-semibold text-gray-700">
              Gender
            </label>
            {isEdit ? (
              <select
                value={data.Gender}
                className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
                onChange={(e) => setData({ ...data, Gender: e.target.value })}
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            ) : (
              <p className="text-lg font-medium">{data.gender}</p>
            )}
          </div>

          {/* Birthday */}
          <div className="flex flex-col items-start">
            <label className="text-sm font-semibold text-gray-700">
              Date of Birth
            </label>
            {isEdit ? (
              <input
                type="date"
                className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
                value={data.Birthday}
                onChange={(e) => setData({ ...data, Birthday: e.target.value })}
              />
            ) : (
              <p className="text-lg font-medium">{data.dob}</p>
            )}
          </div>
        </div>

        {/* Edit/Save Button */}
        <div className="mt-6">
          {isEdit ? (
            <button
              onClick={updatetheprofile}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-500"
            >
              Save
            </button>
          ) : (
            <button
              onClick={() => setIsEdit(true)}
              className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-500"
            >
              Edit
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default MyProfile;
