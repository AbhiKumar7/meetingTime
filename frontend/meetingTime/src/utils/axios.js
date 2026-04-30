import axios from "axios";
export const axiosInstance = axios.create({
  baseURL: "https://meetingtime-1.onrender.com/",
  withCredentials: true, 
});
