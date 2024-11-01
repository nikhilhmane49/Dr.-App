import React, { useState, useContext } from "react";
import { Admincontext } from "../Contex/Admincontex";
import axios from "axios";
import { toast } from "react-toastify";

function Login() {
  const [state, setState] = useState("Admin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { atoken, setatoken, backendurl } = useContext(Admincontext);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (state === "Admin") {
        const response = await axios.post(`${backendurl}/api/admin/login`, {
          email,
          password,
        });

        if (!response.data.success) {
          console.log("Showing error toast");
          toast.error(response.data.message || "Login failed");
        } else {
          console.log(response.data.token);
          toast.success(response.data.message);
          setatoken(response.data.token);
          localStorage.setItem("atoken", response.data.token);
        }
      } else {
      }
    } catch (error) {
      console.log(error);
      toast.error("An unexpected error occurred. Please try again.");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md"
      >
        <div className="text-center mb-6 text-xl font-semibold text-gray-700">
          Login as <span className="text-blue-600">{state}</span>
        </div>

        <div className="mb-4">
          <label className="block text-gray-600 mb-2" htmlFor="email">
            Email
          </label>
          <input
            id="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            type="email"
            placeholder="Email"
            required
            className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="mb-6">
          <label className="block text-gray-600 mb-2" htmlFor="password">
            Password
          </label>
          <input
            id="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            type="password"
            placeholder="Password"
            required
            className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700 transition"
        >
          Login
        </button>

        <div className="text-center mt-4 text-gray-600">
          {state === "Admin" ? (
            <div>
              Login as Doctor?{" "}
              <button
                onClick={() => setState("Doctor")}
                className="text-blue-600 hover:underline"
              >
                Click here
              </button>
            </div>
          ) : (
            <div>
              Login as Admin?{" "}
              <button
                onClick={() => setState("Admin")}
                className="text-blue-600 hover:underline"
              >
                Click here
              </button>
            </div>
          )}
        </div>
      </form>
    </div>
  );
}

export default Login;
