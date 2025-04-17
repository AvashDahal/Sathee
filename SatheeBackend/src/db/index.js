import mongoose from "mongoose";
import { DB_Name } from "../constants.js";

const connectDB = async () => {

  try {
    const connectionInstance = await mongoose.connect(
      `${process.env.MONGODB_URI}`
    );
    console.log(
      `Connected to database : ${connectionInstance.connection.host}`
    );
  } catch (error) {
    console.error("ERROR : ", error);
    process.exit(1);
  }
};

export default connectDB;
