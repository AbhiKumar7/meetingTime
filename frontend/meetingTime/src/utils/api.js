import { axiosInstance } from "./axios";

export const getAuthUser = async () => {
  try {
    const res = await axiosInstance.get("userapi/me");
    return res.data;
  } catch (error) {
    return null;
  }
};
export const signup = async (loginData) => {
  const response = await axiosInstance.post("userapi/register", loginData);

  return response.data;
};

export const logout = async () => {
  const response = await axiosInstance.post("userapi/logout");
  return response.data;
};
export const login = async (logindata) => {
  const response = await axiosInstance.post("userapi/login", logindata);
  return response.data;
};
export const completeOnboard = async (userdata) => {
  const response = await axiosInstance.post("userapi/onboard", userdata);
  return response.data;
};

export const getUserFriends = async () => {
  const response = await axiosInstance.get("requestapi/Allfriendrequest");

  console.log(response);

  return response.data;
};
export const getMyFriends = async () => {
  const response = await axiosInstance.get("requestapi/myfriends");

  return response.data?.result;
};
export const getRecommededUsers = async () => {
  const response = await axiosInstance.get("requestapi/getusers");

  return response?.data?.result;
};

export const getongoingRequests = async () => {
  const response = await axiosInstance.get("requestapi/outgoingrequest");


  return response.data;
};

export const sendFriendRequest = async (id) => {
  const response = await axiosInstance.post(`requestapi/friendrequest/${id}`);
  return response.data;
};

export const acceptFriendRequest = async (id) => {
  const response = await axiosInstance.post(
    `requestapi/friendrequestaccept/${id}`,
  );
  return response.data;
};

export const getStreamToken = async () => {
  const response = await axiosInstance.get(`streamapi/streamtoken`);
  return response.data;
};