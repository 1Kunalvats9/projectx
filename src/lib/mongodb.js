import mongoose from "mongoose";

const MONGODB_URI = "mongodb+srv://1kvats9:fKiqGAtRAOWOAal9@projectx.7vvnb.mongodb.net/?retryWrites=true&w=majority&appName=projectx"
;

export const connectMongoDB = async () => {
  if (!MONGODB_URI) {
    console.error("MongoDB URI is missing in environment variables");
    return;
  }

  try {
    await mongoose.connect(MONGODB_URI);
    console.log("✅ Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB: ", error);
  }
};