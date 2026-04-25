import React from "react";
import loginPic from "../Images/login.png";
import { useState } from "react";
import useLogin from "../hooks/useLoginHook";
function LoginPage() {
  const [loginData, setloginData] = useState({
    email: "",
    password: "",
  });

  const { isPending, error, loginMutation } = useLogin();

  const handleLogin = (e) => {
    e.preventDefault();
    loginMutation(loginData);
  };
  return (
    <div
      className="grid place-items-center min-h-screen px-4"
      data-theme="pastel"
    >
      <h1 className="text-4xl">Meeting Time</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 w-full max-w-5xl  shadow-xl rounded-2xl overflow-hidden">
        {/* LEFT SIDE (IMAGE) */}
        <div className="flex justify-center items-center p-6  ">
          <img
            src={loginPic}
            alt="login"
            className=" hidden md:block max-w-sm md:max-w-full  object-contain"
          />
        </div>

        {/* RIGHT SIDE (FORM) */}

        <div className="flex flex-col justify-center p-8 space-y-4">
          <h2 className="text-2xl font-bold text-center">Login</h2>
          <form onSubmit={handleLogin}>
            {/* Email */}
            <div>
              <p className="mb-1 text-sm">Email</p>
              <input
                type="email"
                value={loginData.email}
                onChange={(e) =>
                  setloginData({ ...loginData, email: e.target.value })
                }
                placeholder="Enter Email"
                className="input input-bordered w-full"
              />
            </div>

            {/* Password */}
            <div>
              <p className="mb-1 text-sm">Password</p>
              <input
                type="password"
                value={loginData.password}
                onChange={(e) =>
                  setloginData({ ...loginData, password: e.target.value })
                }
                placeholder="Enter Password"
                className="input input-bordered w-full"
              />
            </div>
            {error && (
              <div className="text-red-500 text-center">
                <span>{error?.response?.data?.message}</span>
              </div>
            )}
            {/* Button */}
            <button type="submit" className="btn btn-primary w-full mt-2">
              login
            </button>
          </form>

          {/* <GoogleLogin /> */}
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
