import mongoose from "mongoose";
import { dbName } from "../utils/DataBaseName.js";



export const dataBaseConnection = async () => {
  try {
    const connection = await mongoose.connect(
      `${process.env.MONGODB_URL}/${dbName}`,
    );
  
   
    console.log(`data base connected to ${connection.connection.host}`);
  } catch (error) {
    console.log("connection failed", error);
    process.exit(1);
  }
};
