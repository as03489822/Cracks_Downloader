// lib/dbConnect.js
import mongoose from "mongoose";

let isConnected = false; // track connection

export const connectDB = async () => {
  if (isConnected) {
    console.log("✅ MongoDB already connected");
    return;
  }

  try {
    const conn = await mongoose.connect("mongodb+srv://crack:crack@cluster0.le0hn.mongodb.net/crack?retryWrites=true&w=majority&appName=Cluster0", {
    });

    isConnected = conn.connections[0].readyState === 1;
    console.log("🚀 MongoDB connected");
  } catch (error) {
    console.error("❌ MongoDB connection error:", error);
    throw new Error("MongoDB connection failed");
  }
};
