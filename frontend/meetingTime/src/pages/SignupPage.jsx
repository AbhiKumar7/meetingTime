import React, { useState } from "react";
import callingpic from "../Images/calling1.png";
// import { GoogleLogin } from "@react-oauth/google";
import useSignUp from "../hooks/useSignupHook";

function SignupPage() {
  const [loginData, setloginData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const { isPending, error, signupMutation } = useSignUp();

  const handleSubmitForm = (e) => {
    e.preventDefault();
    signupMutation(loginData);
  };
  return (
    <>
      <div
        className="grid place-items-center min-h-screen px-4"
        data-theme="pastel"
      >
        <h1 className="text-4xl">Meeting Time</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 w-full max-w-5xl  shadow-xl rounded-2xl overflow-hidden">
          {/* LEFT SIDE (IMAGE) */}
          <div className="flex justify-center items-center p-6  ">
            <img
              src={callingpic}
              alt="login"
              className=" hidden md:block max-w-sm md:max-w-full  object-contain"
            />
          </div>
          {error && (
            <div className="alert alert-error ">
              <span>{error.response}</span>
            </div>
          )}
          {/* RIGHT SIDE (FORM) */}

          <div className="flex flex-col justify-center p-8 space-y-4">
            <h2 className="text-2xl font-bold text-center">Login</h2>
            <form onSubmit={handleSubmitForm}>
              {/* Name */}
              <div>
                <p className="mb-1 text-sm">Your Name</p>
                <input
                  type="text"
                  placeholder="Enter Name"
                  value={loginData.name}
                  onChange={(e) =>
                    setloginData({ ...loginData, name: e.target.value })
                  }
                  className="input input-bordered w-full"
                />
              </div>

              {/* Email */}
              <div>
                <p className="mb-1 text-sm">Email</p>
                <input
                  type="email"
                  placeholder="Enter Email"
                  value={loginData.email}
                  onChange={(e) =>
                    setloginData({ ...loginData, email: e.target.value })
                  }
                  className="input input-bordered w-full"
                />
              </div>

              {/* Password */}
              <div>
                <p className="mb-1 text-sm">Password</p>
                <input
                  type="password"
                  placeholder="Enter Password"
                  value={loginData.password}
                  onChange={(e) =>
                    setloginData({ ...loginData, password: e.target.value })
                  }
                  className="input input-bordered w-full"
                />
              </div>

              {/* Button */}
              <button type="submit" className="btn btn-primary w-full mt-2">
                {isPending ? (
                  <>
                    <span className="loading loading-spinner loading-xs"></span>
                    Loading...
                  </>
                ) : (
                  "Create Account"
                )}
              </button>
            </form>

            {/* <GoogleLogin /> */}
          </div>
        </div>
      </div>
    </>
  );
}

export default SignupPage;
