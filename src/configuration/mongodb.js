
import mongoose from "mongoose";

const {MONGODB_URI} = process.env

const connectDB = async () => {

    mongoose.connection.on("connected", () => {
    console.log("MongoDB connected successfully");
  });

  mongoose.connection.on("error", (err) => {
    console.error("MongoDB connection error:", err);
  });

  mongoose.connection.on("disconnected", () => {
    console.log("MongoDB disconnected");
  });

    await mongoose.connect(`${MONGODB_URI}`);

}

export default connectDB;