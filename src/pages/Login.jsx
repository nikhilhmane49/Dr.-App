import React, { useState } from 'react'

function Login() {

    const [state, setstate] = useState("Sign up");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const onsubmiite = async (e) => {
        e.preventDefault();
}

    return (
      <div className="flex justify-center items-center h-screen bg-gray-50">
        <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
          <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">
            {state === "Sign up" ? "Create Account" : "Login"}
          </h2>
          <p className="text-gray-600 mb-6 text-center">
            {state === "Sign up"
              ? "Please sign up to book an appointment"
              : "Please login to book an appointment"}
          </p>

          <form onClick={onsubmiite}>
            <div className="mb-4">
              {state === "Sign up" ? (
                <>
                  <label
                    htmlFor="full-name"
                    className="block text-gray-700 text-sm font-semibold mb-2"
                  >
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="full-name"
                    placeholder="Full Name"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    onChange={(e) => setName(e.target.value)}
                    value={name}
                  />
                </>
              ) : null}
            </div>

            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-gray-700 text-sm font-semibold mb-2"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                placeholder="Email"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
              />
            </div>

            <div className="mb-6">
              <label
                htmlFor="password"
                className="block text-gray-700 text-sm font-semibold mb-2"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                placeholder="Password"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-200"
            >
              {state === "Sign up" ? "Create Account" : "Login"}
            </button>

            <p className="text-center text-gray-600 mt-2">
              {state === "Sign up"
                ? "Already have an account?"
                : "Don't have an account?"}{" "}
              <span
                className={`cursor-pointer underline ${
                  state === "Sign up" ? "text-blue-600" : "text-gray-600"
                }`}
                onClick={() =>
                  setstate(state === "Sign up" ? "Login" : "Sign up")
                }
              >
                {state === "Sign up" ? "Login" : "Sign up"}
              </span>
            </p>
          </form>
        </div>
      </div>
    );
}

export default Login;
