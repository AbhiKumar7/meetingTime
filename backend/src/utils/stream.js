// utils/stream.js
import { StreamChat } from "stream-chat";
import dotenv from "dotenv";
dotenv.config({ path: "./.env" });
const apiKey = process.env.STREAM_API;



const apiSecret = process.env.STREAM_SECRET;

export const streamClient = StreamChat.getInstance(apiKey, apiSecret);

export const upsertStreamUser = async (userData) => {
  try {
    await streamClient.upsertUsers([userData]);
    return userData;
  } catch (error) {
    console.error("Error upserting Stream user:", error);
  }
};

export const generateStreamToken = (userId) => {
  try {
   
    const userIdStr = userId.toString();
    return streamClient.createToken(userIdStr);
  } catch (error) {
    console.error("Error generating Stream token:", error);
  }
};