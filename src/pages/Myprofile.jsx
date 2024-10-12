import React, { useState } from "react";
import profile from "../assets/assets_frontend/profile_pic.png";

function MyProfile() {
  const [data, setData] = useState({
    name: "Edward Vincent",
    img: profile,
    Email_id: "richardjameswap@gmail.com",
    Phone: "+1 123 456 7890",
    Address: {
      line1: "57th Cross, Richmond",
      line2: "Circle, Church Road",
    },
    Gender: "Male",
    Birthday: "2024-07-20",
  });

  const [isEdit, setIsEdit] = useState(false);

  return (
    <div className="max-w-2xl mx-auto p-8 bg-gray-50 rounded-lg shadow-2xl mb-16">
      {/* Profile Picture */}
      <div className="flex items-center justify-center mb-8">
        <img
          src={data.img}
          alt="Profile"
          className="w-32 h-32 rounded-full border-4 border-blue-500 shadow-lg"
        />
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
          <p className="text-lg font-medium">{data.Email_id}</p>
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
            <p className="text-lg font-medium">{data.Phone}</p>
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
                  value={data.Address.line1}
                  onChange={(e) =>
                    setData({
                      ...data,
                      Address: { ...data.Address, line1: e.target.value },
                    })
                  }
                />
                <input
                  type="text"
                  className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
                  value={data.Address.line2}
                  onChange={(e) =>
                    setData({
                      ...data,
                      Address: { ...data.Address, line2: e.target.value },
                    })
                  }
                />
              </>
            ) : (
              <>
                <p>{data.Address.line1}</p>
                <p>{data.Address.line2}</p>
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
              <p className="text-lg font-medium">{data.Gender}</p>
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
              <p className="text-lg font-medium">{data.Birthday}</p>
            )}
          </div>
        </div>

        {/* Edit/Save Button */}
        <div className="mt-6">
          {isEdit ? (
            <button
              onClick={() => setIsEdit(false)}
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
