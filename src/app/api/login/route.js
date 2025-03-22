import { NextResponse } from "next/server";
import bcrypt from "bcryptjs"; // For password hashing
import { connectMongoDB } from "@/lib/mongodb";
import User from "../../../../models/userModel";

export async function POST(req) {
  try {
    await connectMongoDB();
    const { email, password } = await req.json();
    
    // Find user by email
    const user = await User.findOne({ email });

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    // Compare the entered password with the hashed password
    const isPasswordValid = password===user.password ? true:false;
    if (!isPasswordValid) {
      return NextResponse.json({ message: "Incorrect password" }, { status: 401 });
    }

    return NextResponse.json({ message: "Login successful" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}