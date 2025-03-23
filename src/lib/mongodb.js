import mongoose from "mongoose";
import dotenv from "dotenv"
dotenv.config()

const MONGODB_URI = process.env.MONGODB_URI;

export const connectMongoDB = async () => {
    if (mongoose.connection.readyState >= 1) {
        console.log("✅ MongoDB is already connected");
        return;
    }

    try {
        await mongoose.connect(MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("✅ Connected to MongoDB");
    } catch (error) {
        console.error("❌ MongoDB connection error:", error);
        throw new Error("MongoDB connection failed");
    }
};
