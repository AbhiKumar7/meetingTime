import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const registerUserApi = createAsyncThunk(
  "auth/registerUserApi",
  async ({name, email, password}, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "userapi/register",
        {name, email, password},
        {
          withCredentials: true,
        }
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const userLoginApi = createAsyncThunk(
  "userapi/userLoginApi",
  async ({ email, password}, { rejectWithValue }) => {

    console.log(email);
    console.log(password);
    
    try {
      const response = await axios.post(
        "userapi/login",
        {email, password},
        {
          withCredentials: true,
        }
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);
