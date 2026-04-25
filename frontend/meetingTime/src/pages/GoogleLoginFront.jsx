import React from "react";
import { useGoogleLogin } from "@react-oauth/google";
import { useDispatch } from "react-redux";
import axios from "axios";
import { data, useNavigate } from "react-router-dom";
import { setUser, setLoading, setError } from "../slices/AuthSlice";
import googleLogo from "../Images/google.png";
function GoogleLoginFront() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const googleResponse = async (authResult) => {
    try {
      dispatch(setLoading(true));

      if (authResult.code) {
        const result = await axios.post(
          "http://localhost:8000/userapi/google",
          {
            code: authResult.code,
          },
          {
            withCredentials: true,
            headers: {
              "Content-Type": "application/json",
            },
          },
        );

        if (result.data.status) {
          const { user, accessToken } = result.data;

          // Store token in localStorage (optional)
          localStorage.setItem("accessToken", accessToken);

          // Dispatch user to Redux store
          dispatch(setUser({ user, accessToken }));

          // Navigate to dashboard or home page
          navigate("/dashboard");
        } else {
          dispatch(setError(result.data.message || "Login failed"));
        }
      }
    } catch (error) {
      console.error("Error during Google login:", error);
      dispatch(setError(error.response?.data?.message || error.message));
    } finally {
      dispatch(setLoading(false));
    }
  };

  const handleGoogleLogin = useGoogleLogin({
    onSuccess: googleResponse,
    onError: (error) => {
      console.error("Google OAuth error:", error);
      dispatch(setError("Google login failed"));
      dispatch(setLoading(false));
    },
    flow: "auth-code",
  });

  return (
    <div className="w-full">
      <button
        onClick={handleGoogleLogin}
        className="w-full h-14 bg-white border border-[#e0e6eb] text-[#2d3337] font-semibold rounded-2xl flex items-center justify-center gap-3 hover:bg-[#f8fafc] hover:shadow-md transition-all duration-200 active:scale-[0.97]"
      >
        <img src={googleLogo} className="w-5 h-5" alt="google" />
        <span>Continue with Google</span>
      </button>
    </div>
  );
}

export default GoogleLoginFront;
