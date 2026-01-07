import mongoose from "mongoose";
import dotenv from "dotenv/config";

const url = process.env.URL;

export async function dbConnect() {
  try {
    await mongoose.connect(url);
    console.log("MongoDB connected");
  } catch (error) {
    console.log("MongoDB connected", error);
  }
}
